/*
  # Create recyclers table

  1. New Tables
    - `recyclers`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `address` (text)
      - `city` (text)
      - `province` (text)
      - `phone` (text)
      - `email` (text)
      - `website` (text)
      - `materials` (text[])
      - `latitude` (numeric)
      - `longitude` (numeric)
      - `verified` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `recyclers` table
    - Add policy for public read access
    - Add policy for authenticated users to create/update their own records
*/

CREATE TABLE IF NOT EXISTS recyclers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  address text NOT NULL,
  city text NOT NULL,
  province text NOT NULL,
  phone text,
  email text,
  website text,
  materials text[],
  latitude numeric,
  longitude numeric,
  verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE recyclers ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access"
  ON recyclers
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to create/update their own records
CREATE POLICY "Allow authenticated users to create records"
  ON recyclers
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update their own records"
  ON recyclers
  FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (
    SELECT auth.uid()
    FROM auth.users
    WHERE auth.users.email = recyclers.email
  ));