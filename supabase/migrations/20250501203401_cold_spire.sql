/*
  # Update recyclers table with service offerings

  1. Changes
    - Add service_offerings column to store available services
    - Add container_types column to store available container types
    - Add minimum_weight column for collection requirements
    - Add payment_terms column for payment information
    - Add operating_hours column for business hours
    - Update existing recyclers with new information
*/

-- Add new columns
ALTER TABLE recyclers 
ADD COLUMN service_offerings text[] DEFAULT ARRAY['Collection', 'Drop-off'],
ADD COLUMN container_types text[] DEFAULT ARRAY['Bags', '240L Bins', 'Skips'],
ADD COLUMN minimum_weight numeric DEFAULT 100.0,
ADD COLUMN payment_terms text DEFAULT 'Payment on collection/delivery',
ADD COLUMN operating_hours text DEFAULT 'Mon-Fri: 08:00-17:00, Sat: 08:00-13:00';

-- Update existing recyclers with service information
UPDATE recyclers
SET 
  service_offerings = ARRAY['Collection', 'Drop-off', 'Container Rental', 'Sorting'],
  container_types = ARRAY['Bags (100L)', '240L Bins', '6m³ Skips', '12m³ Skips'],
  minimum_weight = CASE 
    WHEN RANDOM() < 0.3 THEN 50.0
    WHEN RANDOM() < 0.6 THEN 100.0
    ELSE 200.0
  END,
  payment_terms = CASE 
    WHEN RANDOM() < 0.5 THEN 'Payment on collection/delivery'
    ELSE 'EFT within 24 hours'
  END;

-- Insert additional recyclers for Gauteng
INSERT INTO recyclers (
  name, description, address, city, province, phone, email, website,
  materials, verified, service_offerings, container_types, minimum_weight
) VALUES 
  (
    'Midrand Recycling Hub',
    'Full-service recycling center specializing in industrial and commercial waste',
    '45 Industry Road, Midrand',
    'Midrand',
    'Gauteng',
    '011 123 4567',
    'info@midrandrecycling.co.za',
    'www.midrandrecycling.co.za',
    ARRAY['Ferrous Metals', 'Non-Ferrous Metals', 'Paper', 'Plastic'],
    true,
    ARRAY['Collection', 'Drop-off', 'Container Rental', 'Sorting'],
    ARRAY['Bags (100L)', '240L Bins', '6m³ Skips', '12m³ Skips'],
    100.0
  ),
  (
    'Centurion Scrap Solutions',
    'Leading metal recycling facility with container rental services',
    '78 West Avenue, Centurion',
    'Centurion',
    'Gauteng',
    '012 345 6789',
    'info@centurionscrap.co.za',
    'www.centurionscrap.co.za',
    ARRAY['Ferrous Metals', 'Non-Ferrous Metals', 'E-Waste'],
    true,
    ARRAY['Collection', 'Drop-off', 'Container Rental'],
    ARRAY['Bags (100L)', '240L Bins', '6m³ Skips'],
    50.0
  );

-- Insert additional recyclers for Mpumalanga
INSERT INTO recyclers (
  name, description, address, city, province, phone, email, website,
  materials, verified, service_offerings, container_types, minimum_weight
) VALUES 
  (
    'Emalahleni Metal Traders',
    'Industrial recycling specialists with comprehensive collection services',
    '25 Mining Road, Witbank',
    'Emalahleni',
    'Mpumalanga',
    '013 656 7890',
    'info@emalahlenirecycling.co.za',
    'www.emalahlenirecycling.co.za',
    ARRAY['Ferrous Metals', 'Non-Ferrous Metals', 'Industrial Waste'],
    true,
    ARRAY['Collection', 'Drop-off', 'Container Rental', 'Industrial Services'],
    ARRAY['Bags (100L)', '240L Bins', '6m³ Skips', '12m³ Skips', '20m³ Skips'],
    200.0
  ),
  (
    'Mbombela Green Solutions',
    'Eco-friendly recycling center with flexible collection options',
    '56 Riverside Drive, Nelspruit',
    'Mbombela',
    'Mpumalanga',
    '013 789 0123',
    'info@mbombelagreen.co.za',
    'www.mbombelagreen.co.za',
    ARRAY['Paper', 'Plastic', 'Glass', 'Metal Cans'],
    true,
    ARRAY['Collection', 'Drop-off', 'Container Rental', 'Sorting'],
    ARRAY['Bags (100L)', '240L Bins', '6m³ Skips'],
    100.0
  );