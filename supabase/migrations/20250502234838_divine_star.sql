/*
  # Create listings and bids tables

  1. New Tables
    - `listings`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `user_id` (uuid, references auth.users)
      - `title` (text)
      - `description` (text)
      - `type` (text) - 'recycle' or 'salvage'
      - `category` (text)
      - `price` (numeric)
      - `location` (text)
      - `images` (text[])
      - `status` (text)
      - `expires_at` (timestamp)
      
    - `bids`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `listing_id` (uuid, references listings)
      - `user_id` (uuid, references auth.users)
      - `amount` (numeric)
      - `status` (text)
      - `message` (text)

  2. Security
    - Enable RLS on both tables
    - Add policies for CRUD operations
*/

-- Create listings table
CREATE TABLE public.listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  type text NOT NULL CHECK (type IN ('recycle', 'salvage')),
  category text NOT NULL,
  price numeric NOT NULL,
  location text NOT NULL,
  images text[] DEFAULT ARRAY[]::text[],
  status text DEFAULT 'active' CHECK (status IN ('active', 'sold', 'expired', 'cancelled')),
  expires_at timestamptz NOT NULL
);

-- Create bids table
CREATE TABLE public.bids (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  listing_id uuid REFERENCES public.listings(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  amount numeric NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  message text
);

-- Enable RLS
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bids ENABLE ROW LEVEL SECURITY;

-- Listings policies
CREATE POLICY "Anyone can view active listings"
  ON public.listings
  FOR SELECT
  USING (status = 'active');

CREATE POLICY "Users can create listings"
  ON public.listings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own listings"
  ON public.listings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own listings"
  ON public.listings
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Bids policies
CREATE POLICY "Listing owners and bidders can view bids"
  ON public.bids
  FOR SELECT
  USING (
    auth.uid() IN (
      SELECT user_id FROM public.listings WHERE id = listing_id
      UNION
      SELECT user_id FROM public.bids WHERE listing_id = bids.listing_id
    )
  );

CREATE POLICY "Authenticated users can place bids"
  ON public.bids
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id AND
    auth.uid() != (SELECT user_id FROM public.listings WHERE id = listing_id)
  );

CREATE POLICY "Users can update their own bids"
  ON public.bids
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes
CREATE INDEX idx_listings_user_id ON public.listings(user_id);
CREATE INDEX idx_listings_type ON public.listings(type);
CREATE INDEX idx_listings_status ON public.listings(status);
CREATE INDEX idx_listings_expires_at ON public.listings(expires_at);
CREATE INDEX idx_bids_listing_id ON public.bids(listing_id);
CREATE INDEX idx_bids_user_id ON public.bids(user_id);