/*
  # Fix listings and profiles relationship

  1. Database Changes
    - Add foreign key constraint between listings.user_id and profiles.id
    - This allows direct joining between listings and profiles tables
  
  2. Security
    - No RLS changes needed as existing policies are sufficient
  
  3. Notes
    - This creates a direct relationship path for the Supabase query builder
    - The profiles table already has the correct foreign key to users table
*/

-- Add foreign key constraint to allow direct relationship between listings and profiles
-- Since both tables reference users.id, we can create a direct relationship
DO $$
BEGIN
  -- Check if the foreign key constraint doesn't already exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'listings_user_id_profiles_fkey'
    AND table_name = 'listings'
  ) THEN
    -- Add the foreign key constraint
    ALTER TABLE listings 
    ADD CONSTRAINT listings_user_id_profiles_fkey 
    FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE;
  END IF;
END $$;