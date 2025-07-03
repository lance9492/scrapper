/*
  # Create container requests table

  1. New Tables
    - `container_requests`
      - `id` (uuid, primary key)
      - `created_at` (timestamptz)
      - `name` (text)
      - `email` (text)
      - `phone` (text)
      - `address` (text)
      - `container_type` (text)
      - `quantity` (integer)
      - `status` (text)
      - `notes` (text)

  2. Security
    - Enable RLS
    - Add policy for authenticated users to read all requests
    - Add policy for public users to create requests
*/

CREATE TABLE container_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  address text NOT NULL,
  container_type text NOT NULL,
  quantity integer NOT NULL,
  status text DEFAULT 'pending',
  notes text
);

-- Enable RLS
ALTER TABLE container_requests ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read all requests
CREATE POLICY "Allow authenticated users to read all requests"
  ON container_requests
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow public users to create requests
CREATE POLICY "Allow public users to create requests"
  ON container_requests
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow authenticated users to update request status
CREATE POLICY "Allow authenticated users to update requests"
  ON container_requests
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);