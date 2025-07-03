/*
  # Sales Agent Assignment System

  1. New Tables
    - `sales_agents`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `name` (text)
      - `email` (text)
      - `phone` (text)
      - `specialization` (text[]) - areas of expertise
      - `is_active` (boolean)
      - `max_clients` (integer)
      - `current_clients` (integer)
      - `rating` (numeric)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `client_agent_assignments`
      - `id` (uuid, primary key)
      - `client_id` (uuid, references auth.users)
      - `agent_id` (uuid, references sales_agents)
      - `listing_id` (uuid, references listings)
      - `assignment_type` (text) - 'sell' or 'buy'
      - `status` (text) - 'active', 'completed', 'cancelled'
      - `assigned_at` (timestamptz)
      - `completed_at` (timestamptz)
      - `notes` (text)

    - `agent_communications`
      - `id` (uuid, primary key)
      - `assignment_id` (uuid, references client_agent_assignments)
      - `from_agent` (boolean)
      - `message` (text)
      - `message_type` (text) - 'text', 'email', 'call_log'
      - `created_at` (timestamptz)

  2. Functions
    - Auto-assign agent when listing is created
    - Load balancing for agent assignments
    - Agent performance tracking

  3. Security
    - Enable RLS on all tables
    - Add appropriate policies
*/

-- Create sales_agents table
CREATE TABLE IF NOT EXISTS sales_agents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  phone text,
  specialization text[] DEFAULT ARRAY['General'],
  is_active boolean DEFAULT true,
  max_clients integer DEFAULT 50,
  current_clients integer DEFAULT 0,
  rating numeric DEFAULT 5.0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create client_agent_assignments table
CREATE TABLE IF NOT EXISTS client_agent_assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  agent_id uuid REFERENCES sales_agents(id) ON DELETE CASCADE,
  listing_id uuid REFERENCES listings(id) ON DELETE CASCADE,
  assignment_type text NOT NULL CHECK (assignment_type IN ('sell', 'buy')),
  status text DEFAULT 'active' CHECK (status IN ('active', 'completed', 'cancelled')),
  assigned_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  notes text
);

-- Create agent_communications table
CREATE TABLE IF NOT EXISTS agent_communications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id uuid REFERENCES client_agent_assignments(id) ON DELETE CASCADE,
  from_agent boolean DEFAULT false,
  message text NOT NULL,
  message_type text DEFAULT 'text' CHECK (message_type IN ('text', 'email', 'call_log')),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE sales_agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_agent_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_communications ENABLE ROW LEVEL SECURITY;

-- Sales agents policies
CREATE POLICY "Public can view active agents"
  ON sales_agents
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Agents can update their own profile"
  ON sales_agents
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Client agent assignments policies
CREATE POLICY "Users can view their assignments"
  ON client_agent_assignments
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = client_id OR 
    auth.uid() IN (SELECT user_id FROM sales_agents WHERE id = agent_id)
  );

CREATE POLICY "System can create assignments"
  ON client_agent_assignments
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Agent communications policies
CREATE POLICY "Assignment participants can view communications"
  ON agent_communications
  FOR SELECT
  TO authenticated
  USING (
    assignment_id IN (
      SELECT id FROM client_agent_assignments 
      WHERE client_id = auth.uid() OR 
            agent_id IN (SELECT id FROM sales_agents WHERE user_id = auth.uid())
    )
  );

CREATE POLICY "Assignment participants can add communications"
  ON agent_communications
  FOR INSERT
  TO authenticated
  WITH CHECK (
    assignment_id IN (
      SELECT id FROM client_agent_assignments 
      WHERE client_id = auth.uid() OR 
            agent_id IN (SELECT id FROM sales_agents WHERE user_id = auth.uid())
    )
  );

-- Function to get available agent for assignment
CREATE OR REPLACE FUNCTION get_available_agent(listing_category text, listing_type text)
RETURNS uuid AS $$
DECLARE
  selected_agent_id uuid;
BEGIN
  -- Find an active agent with capacity, preferring those with relevant specialization
  SELECT id INTO selected_agent_id
  FROM sales_agents
  WHERE is_active = true 
    AND current_clients < max_clients
    AND (
      listing_category = ANY(specialization) OR
      listing_type = ANY(specialization) OR
      'General' = ANY(specialization)
    )
  ORDER BY 
    -- Prioritize agents with relevant specialization
    CASE 
      WHEN listing_category = ANY(specialization) THEN 1
      WHEN listing_type = ANY(specialization) THEN 2
      ELSE 3
    END,
    -- Then by workload (fewer clients first)
    current_clients ASC,
    -- Then by rating (higher rating first)
    rating DESC,
    -- Finally by random to distribute evenly among equal agents
    random()
  LIMIT 1;

  RETURN selected_agent_id;
END;
$$ LANGUAGE plpgsql;

-- Function to auto-assign agent when listing is created
CREATE OR REPLACE FUNCTION auto_assign_sales_agent()
RETURNS TRIGGER AS $$
DECLARE
  agent_id uuid;
BEGIN
  -- Get an available agent
  SELECT get_available_agent(NEW.category, NEW.type) INTO agent_id;
  
  IF agent_id IS NOT NULL THEN
    -- Create the assignment
    INSERT INTO client_agent_assignments (
      client_id,
      agent_id,
      listing_id,
      assignment_type,
      status
    ) VALUES (
      NEW.user_id,
      agent_id,
      NEW.id,
      'sell',
      'active'
    );
    
    -- Update agent's current client count
    UPDATE sales_agents 
    SET current_clients = current_clients + 1,
        updated_at = now()
    WHERE id = agent_id;
    
    -- Send welcome message
    INSERT INTO agent_communications (
      assignment_id,
      from_agent,
      message,
      message_type
    ) VALUES (
      (SELECT id FROM client_agent_assignments WHERE listing_id = NEW.id AND client_id = NEW.user_id),
      true,
      'Hello! I''m your assigned sales agent and I''m here to help you with your listing. I''ll assist you throughout the entire process to ensure you get the best results. Feel free to reach out if you have any questions!',
      'text'
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for auto-assignment
CREATE TRIGGER auto_assign_agent_on_listing
  AFTER INSERT ON listings
  FOR EACH ROW
  EXECUTE FUNCTION auto_assign_sales_agent();

-- Function to handle assignment completion
CREATE OR REPLACE FUNCTION complete_agent_assignment(assignment_uuid uuid)
RETURNS void AS $$
DECLARE
  agent_uuid uuid;
BEGIN
  -- Get the agent ID
  SELECT agent_id INTO agent_uuid
  FROM client_agent_assignments
  WHERE id = assignment_uuid;
  
  -- Update assignment status
  UPDATE client_agent_assignments
  SET status = 'completed',
      completed_at = now()
  WHERE id = assignment_uuid;
  
  -- Decrease agent's current client count
  UPDATE sales_agents
  SET current_clients = GREATEST(current_clients - 1, 0),
      updated_at = now()
  WHERE id = agent_uuid;
END;
$$ LANGUAGE plpgsql;

-- Insert sample sales agents
INSERT INTO sales_agents (name, email, phone, specialization, max_clients, rating) VALUES
  ('Sarah Johnson', 'sarah.johnson@scrapper.co.za', '+27 11 123 4567', ARRAY['Ferrous Metals', 'Non-Ferrous Metals', 'Industrial Waste'], 75, 4.9),
  ('Michael Chen', 'michael.chen@scrapper.co.za', '+27 21 234 5678', ARRAY['E-Waste', 'Electronic Waste', 'Batteries'], 60, 4.8),
  ('Priya Patel', 'priya.patel@scrapper.co.za', '+27 31 345 6789', ARRAY['Paper', 'Plastic', 'Glass'], 80, 4.7),
  ('David Williams', 'david.williams@scrapper.co.za', '+27 12 456 7890', ARRAY['Vehicles', 'Machinery', 'Parts'], 50, 4.9),
  ('Lisa Thompson', 'lisa.thompson@scrapper.co.za', '+27 41 567 8901', ARRAY['General', 'Industrial Waste'], 70, 4.6),
  ('Ahmed Hassan', 'ahmed.hassan@scrapper.co.za', '+27 51 678 9012', ARRAY['Used Oil', 'Batteries', 'Industrial Waste'], 65, 4.8),
  ('Jennifer Smith', 'jennifer.smith@scrapper.co.za', '+27 13 789 0123', ARRAY['Salvage', 'Equipment', 'Tools'], 55, 4.7),
  ('Robert Brown', 'robert.brown@scrapper.co.za', '+27 15 890 1234', ARRAY['Metal Cans', 'Aluminum', 'General'], 60, 4.5),
  ('Maria Rodriguez', 'maria.rodriguez@scrapper.co.za', '+27 14 901 2345', ARRAY['Paper', 'Cardboard', 'Plastic'], 75, 4.8),
  ('James Wilson', 'james.wilson@scrapper.co.za', '+27 53 012 3456', ARRAY['Ferrous Metals', 'Vehicles', 'Machinery'], 45, 4.9);

-- Create indexes for performance
CREATE INDEX idx_sales_agents_active ON sales_agents(is_active);
CREATE INDEX idx_sales_agents_specialization ON sales_agents USING GIN(specialization);
CREATE INDEX idx_sales_agents_workload ON sales_agents(current_clients, max_clients);
CREATE INDEX idx_client_assignments_client ON client_agent_assignments(client_id);
CREATE INDEX idx_client_assignments_agent ON client_agent_assignments(agent_id);
CREATE INDEX idx_client_assignments_listing ON client_agent_assignments(listing_id);
CREATE INDEX idx_client_assignments_status ON client_agent_assignments(status);
CREATE INDEX idx_agent_communications_assignment ON agent_communications(assignment_id);