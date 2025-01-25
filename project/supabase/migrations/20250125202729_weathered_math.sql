/*
  # Initial Schema Setup for SubletConnect

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key) - matches auth.users id
      - `email` (text) - user's email
      - `full_name` (text) - user's full name
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `listings`
      - `id` (uuid, primary key)
      - `user_id` (uuid) - references profiles.id
      - `title` (text)
      - `description` (text)
      - `price` (numeric)
      - `location` (text)
      - `room_type` (text)
      - `start_date` (date)
      - `end_date` (date)
      - `amenities` (text[])
      - `images` (text[])
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `status` (text) - active/inactive/rented

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  email text NOT NULL,
  full_name text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create listings table
CREATE TABLE listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) NOT NULL,
  title text NOT NULL,
  description text,
  price numeric NOT NULL,
  location text NOT NULL,
  room_type text NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  amenities text[],
  images text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'rented'))
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Listings policies
CREATE POLICY "Anyone can view active listings"
  ON listings FOR SELECT
  USING (status = 'active');

CREATE POLICY "Users can insert own listings"
  ON listings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own listings"
  ON listings FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Functions
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Triggers
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE handle_new_user();