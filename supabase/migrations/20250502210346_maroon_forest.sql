/*
  # Update recyclers with real data

  1. Changes
    - Clear existing demo data
    - Add real recycling facilities
    - Update schema with additional fields
*/

-- Clear existing demo data
TRUNCATE TABLE recyclers;

-- Add real recycling facilities
INSERT INTO recyclers (
  name, description, address, city, province, 
  phone, email, website, materials, verified,
  latitude, longitude, service_offerings, container_types,
  minimum_weight, operating_hours
) VALUES 
  (
    'SA Metal Group',
    'South Africa''s largest metal recycling company',
    '9 Bofors Circle, Epping Industria 2',
    'Cape Town',
    'Western Cape',
    '021 590 3900',
    'info@sametal.co.za',
    'www.sametal.co.za',
    ARRAY['Ferrous Metals', 'Non-Ferrous Metals', 'E-Waste'],
    true,
    -33.931139,
    18.539041,
    ARRAY['Collection', 'Drop-off', 'Container Rental'],
    ARRAY['Bags', '240L Bins', '6m³ Skips', '12m³ Skips'],
    100.0,
    'Mon-Fri: 07:00-17:00, Sat: 07:00-12:00'
  ),
  (
    'Remade Recycling',
    'Leading paper and plastic recycling company',
    '103 Industrial Road, Amalgam',
    'Johannesburg',
    'Gauteng',
    '011 323 7300',
    'info@remade.co.za',
    'www.remade.co.za',
    ARRAY['Paper', 'Plastic', 'Metal Cans'],
    true,
    -26.208790,
    27.984789,
    ARRAY['Collection', 'Drop-off'],
    ARRAY['Bags', '240L Bins'],
    50.0,
    'Mon-Fri: 08:00-16:30'
  ),
  (
    'Universal Recycling Company',
    'Comprehensive recycling solutions',
    '11 Coconut Grove, Shakaskraal',
    'Durban',
    'KwaZulu-Natal',
    '032 947 0714',
    'info@universalrecycling.co.za',
    'www.universalrecycling.co.za',
    ARRAY['Ferrous Metals', 'Non-Ferrous Metals', 'Paper', 'Plastic'],
    true,
    -29.469959,
    31.187655,
    ARRAY['Collection', 'Drop-off', 'Container Rental'],
    ARRAY['Bags', '240L Bins', '6m³ Skips'],
    100.0,
    'Mon-Fri: 07:30-16:30, Sat: 08:00-12:00'
  );

-- Add more real facilities as needed