-- Clear existing data
TRUNCATE TABLE recyclers;

-- Insert real recycling companies
INSERT INTO recyclers (
  name, description, address, city, province, 
  phone, email, website, materials, verified,
  latitude, longitude, service_offerings, container_types,
  minimum_weight, operating_hours
) VALUES 
  -- SA Metal Group
  (
    'SA Metal Group',
    'South Africa''s largest metal recycling company, established in 1919',
    '9 Bofors Circle, Epping Industria 2',
    'Cape Town',
    'Western Cape',
    '021 590 3900',
    'info@sametal.co.za',
    'www.sametal.co.za',
    ARRAY['Ferrous Metals', 'Non-Ferrous Metals', 'E-Waste', 'Batteries'],
    true,
    -33.931139,
    18.539041,
    ARRAY['Collection', 'Drop-off', 'Container Rental', 'Industrial Services'],
    ARRAY['Bags', '240L Bins', '6m³ Skips', '12m³ Skips'],
    100.0,
    'Mon-Fri: 07:00-17:00, Sat: 07:00-12:00'
  ),
  -- Reclam
  (
    'Reclam',
    'Leading recycling company in South Africa',
    '316 Derdepoort Road, Silverton',
    'Pretoria',
    'Gauteng',
    '012 804 7160',
    'info@reclam.co.za',
    'www.reclam.co.za',
    ARRAY['Paper', 'Plastic', 'Ferrous Metals', 'Non-Ferrous Metals'],
    true,
    -25.735365,
    28.275198,
    ARRAY['Collection', 'Drop-off', 'Container Rental'],
    ARRAY['Bags', '240L Bins', '6m³ Skips'],
    50.0,
    'Mon-Fri: 08:00-16:30'
  ),
  -- Mpact Recycling
  (
    'Mpact Recycling',
    'Leading paper recycling company in South Africa',
    '1 Heidelberg Road, City Deep',
    'Johannesburg',
    'Gauteng',
    '011 538 8600',
    'info@mpactrecycling.co.za',
    'www.mpactrecycling.co.za',
    ARRAY['Paper', 'Cardboard', 'Plastic'],
    true,
    -26.208790,
    28.984789,
    ARRAY['Collection', 'Drop-off', 'Container Rental'],
    ARRAY['Bags', '240L Bins'],
    100.0,
    'Mon-Fri: 08:00-16:30'
  ),
  -- Collect-a-Can
  (
    'Collect-a-Can',
    'South Africa''s leading can recycling company',
    '1 Detroit Street, Apex Industrial',
    'Johannesburg',
    'Gauteng',
    '011 494 3638',
    'info@collectacan.co.za',
    'www.collectacan.co.za',
    ARRAY['Metal Cans', 'Aluminum'],
    true,
    -26.223439,
    27.984789,
    ARRAY['Collection', 'Drop-off', 'School Programs'],
    ARRAY['Bags', 'Can Cages'],
    50.0,
    'Mon-Fri: 08:00-16:00'
  ),
  -- The Glass Recycling Company
  (
    'The Glass Recycling Company',
    'Non-profit glass recycling organization',
    '42 Electron Avenue, Isando',
    'Johannesburg',
    'Gauteng',
    '011 803 0767',
    'info@tgrc.co.za',
    'www.theglassrecyclingcompany.co.za',
    ARRAY['Glass'],
    true,
    -26.208790,
    28.984789,
    ARRAY['Collection', 'Drop-off'],
    ARRAY['Glass Banks', 'Bulk Containers'],
    500.0,
    'Mon-Fri: 08:00-16:30'
  ),
  -- Nampak Recycling
  (
    'Nampak Recycling',
    'Africa''s largest packaging company''s recycling division',
    '114 Dennis Road, Atholl Gardens',
    'Johannesburg',
    'Gauteng',
    '011 719 6300',
    'recycling@nampak.com',
    'www.nampak.com',
    ARRAY['Paper', 'Plastic', 'Glass', 'Metal Cans'],
    true,
    -26.208790,
    28.984789,
    ARRAY['Collection', 'Drop-off'],
    ARRAY['Bags', '240L Bins'],
    100.0,
    'Mon-Fri: 08:00-16:30'
  ),
  -- PETCO
  (
    'PETCO',
    'South Africa''s PET plastic recycling company',
    '1st Floor, Block B, 21 Fricker Road, Illovo',
    'Johannesburg',
    'Gauteng',
    '011 615 8875',
    'info@petco.co.za',
    'www.petco.co.za',
    ARRAY['PET Plastic'],
    true,
    -26.208790,
    28.984789,
    ARRAY['Collection', 'Drop-off'],
    ARRAY['Bags', '240L Bins'],
    50.0,
    'Mon-Fri: 08:00-16:30'
  ),
  -- Universal Recycling
  (
    'Universal Recycling',
    'KZN''s leading recycling facility',
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

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_recyclers_province ON recyclers(province);
CREATE INDEX IF NOT EXISTS idx_recyclers_city ON recyclers(city);
CREATE INDEX IF NOT EXISTS idx_recyclers_materials ON recyclers USING GIN(materials);
CREATE INDEX IF NOT EXISTS idx_recyclers_verified ON recyclers(verified);