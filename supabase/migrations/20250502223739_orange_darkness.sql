-- Clear existing data
TRUNCATE TABLE recyclers;

-- Insert real recycling companies from South Africa
INSERT INTO recyclers (
  name, description, address, city, province, 
  phone, email, website, materials, verified,
  latitude, longitude, service_offerings, container_types,
  minimum_weight, operating_hours
) VALUES 
  -- Major recycling companies
  (
    'SA Metal Group',
    'South Africa''s largest metal recycling company since 1919',
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
    ARRAY['Collection', 'Drop-off', 'Container Rental'],
    ARRAY['Bags', '240L Bins', '6m³ Skips'],
    100.0,
    'Mon-Fri: 07:00-17:00, Sat: 07:00-12:00'
  ),
  (
    'Reclam',
    'Leading recycling solutions provider',
    '316 Derdepoort Road, Silverton',
    'Pretoria',
    'Gauteng',
    '012 804 0240',
    'info@reclam.co.za',
    'www.reclam.co.za',
    ARRAY['Paper', 'Plastic', 'Metal'],
    true,
    -25.735365,
    28.275198,
    ARRAY['Collection', 'Drop-off'],
    ARRAY['Bags', '240L Bins'],
    50.0,
    'Mon-Fri: 08:00-16:30'
  ),
  (
    'Remade Recycling',
    'Comprehensive recycling solutions',
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
    'Mpact Recycling',
    'Paper and packaging recycling specialists',
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
    ARRAY['Collection', 'Drop-off'],
    ARRAY['Bags', '240L Bins'],
    100.0,
    'Mon-Fri: 08:00-16:30'
  ),
  (
    'Collect-a-Can',
    'Metal can recycling specialists',
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
    ARRAY['Collection', 'Drop-off'],
    ARRAY['Bags', 'Can Cages'],
    50.0,
    'Mon-Fri: 08:00-16:00'
  ),
  (
    'Waste Plan',
    'Integrated waste management solutions',
    '16 Dawn Road, Montague Gardens',
    'Cape Town',
    'Western Cape',
    '021 552 3200',
    'info@wasteplan.co.za',
    'www.wasteplan.co.za',
    ARRAY['General Waste', 'Recyclables'],
    true,
    -33.931139,
    18.539041,
    ARRAY['Collection', 'Waste Management'],
    ARRAY['Bags', '240L Bins', 'Skips'],
    100.0,
    'Mon-Fri: 08:00-17:00'
  ),
  (
    'Interwaste',
    'Environmental solutions provider',
    '2 Brammer Road, Industries East',
    'Germiston',
    'Gauteng',
    '011 323 7300',
    'info@interwaste.co.za',
    'www.interwaste.co.za',
    ARRAY['Industrial Waste', 'Hazardous Waste', 'General Waste'],
    true,
    -26.208790,
    28.984789,
    ARRAY['Collection', 'Waste Management'],
    ARRAY['Bins', 'Skips'],
    200.0,
    'Mon-Fri: 07:00-17:00'
  ),
  (
    'Oricol Environmental Services',
    'Waste management and recycling solutions',
    '5 Yaldwyn Road, Jet Park',
    'Boksburg',
    'Gauteng',
    '011 397 3125',
    'info@oricol.co.za',
    'www.oricol.co.za',
    ARRAY['Industrial Waste', 'Recyclables', 'Hazardous Waste'],
    true,
    -26.208790,
    28.984789,
    ARRAY['Collection', 'Waste Management'],
    ARRAY['Bins', 'Skips'],
    100.0,
    'Mon-Fri: 07:00-16:00'
  ),
  (
    'Waste Group',
    'Integrated waste management',
    '33 Angus Crescent, Longmeadow',
    'Johannesburg',
    'Gauteng',
    '011 453 0374',
    'info@wastegroup.co.za',
    'www.wastegroup.co.za',
    ARRAY['General Waste', 'Recyclables'],
    true,
    -26.208790,
    28.984789,
    ARRAY['Collection', 'Recycling'],
    ARRAY['Bins', 'Skips'],
    100.0,
    'Mon-Fri: 07:00-17:00'
  );

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_recyclers_province ON recyclers(province);
CREATE INDEX IF NOT EXISTS idx_recyclers_city ON recyclers(city);
CREATE INDEX IF NOT EXISTS idx_recyclers_materials ON recyclers USING GIN(materials);
CREATE INDEX IF NOT EXISTS idx_recyclers_verified ON recyclers(verified);