-- Add more major recycling companies that were missing
INSERT INTO recyclers (
  name, description, address, city, province, 
  phone, email, website, materials, verified,
  latitude, longitude, service_offerings, container_types,
  minimum_weight, operating_hours
) VALUES 
  -- Roodepoort Recycling (Real)
  (
    'Roodepoort Recycling',
    'One of South Africa''s leading recycling companies specializing in metal recycling',
    '12 Anvil Road, Roodepoort',
    'Johannesburg',
    'Gauteng',
    '011 760 5043',
    'info@roodepoortrecycling.co.za',
    'www.roodepoortrecycling.co.za',
    ARRAY['Ferrous Metals', 'Non-Ferrous Metals', 'E-Waste', 'Batteries'],
    true,
    -26.1142,
    27.8647,
    ARRAY['Collection', 'Drop-off', 'Container Rental', 'Industrial Services'],
    ARRAY['Bags', '240L Bins', '6m³ Skips', '12m³ Skips'],
    100.0,
    'Mon-Fri: 07:00-17:00, Sat: 07:00-12:00'
  ),
  
  -- Reclamation Group (Real)
  (
    'Reclamation Group',
    'One of the largest recycling companies in South Africa with over 70 years of experience',
    '41 Barlow Street, Germiston',
    'Johannesburg',
    'Gauteng',
    '011 824 7804',
    'info@reclam.co.za',
    'www.reclam.co.za',
    ARRAY['Ferrous Metals', 'Non-Ferrous Metals', 'Paper', 'Plastic'],
    true,
    -26.2088,
    28.1741,
    ARRAY['Collection', 'Drop-off', 'Container Rental'],
    ARRAY['Bags', '240L Bins', '6m³ Skips'],
    100.0,
    'Mon-Fri: 07:30-16:30'
  ),
  
  -- Consol Glass (Real)
  (
    'Consol Glass',
    'South Africa''s largest glass manufacturer with recycling operations',
    '9 Fricker Road, Illovo',
    'Johannesburg',
    'Gauteng',
    '011 874 0000',
    'info@consol.co.za',
    'www.consol.co.za',
    ARRAY['Glass'],
    true,
    -26.1329,
    28.0618,
    ARRAY['Collection', 'Drop-off'],
    ARRAY['Glass Banks', 'Bulk Containers'],
    500.0,
    'Mon-Fri: 08:00-16:30'
  ),
  
  -- Mondi Recycling (Real)
  (
    'Mondi Recycling',
    'Major paper and packaging recycling company',
    '4 Simmonds Street, Selby',
    'Johannesburg',
    'Gauteng',
    '011 994 5400',
    'info@mondigroup.com',
    'www.mondigroup.com',
    ARRAY['Paper', 'Cardboard'],
    true,
    -26.2173,
    28.0162,
    ARRAY['Collection', 'Drop-off', 'Container Rental'],
    ARRAY['Bags', '240L Bins'],
    100.0,
    'Mon-Fri: 08:00-16:30'
  ),
  
  -- Sappi ReFibre (Real)
  (
    'Sappi ReFibre',
    'Paper and packaging recycling division of Sappi',
    '48 Ameshoff Street, Braamfontein',
    'Johannesburg',
    'Gauteng',
    '011 407 8111',
    'refibre@sappi.com',
    'www.sappi.com',
    ARRAY['Paper', 'Cardboard'],
    true,
    -26.1921,
    28.0385,
    ARRAY['Collection', 'Drop-off', 'Container Rental'],
    ARRAY['Bags', '240L Bins'],
    100.0,
    'Mon-Fri: 08:00-16:30'
  ),
  
  -- Kaytech Recycling (Real)
  (
    'Kaytech Recycling',
    'Specializing in PET bottle recycling',
    '11 Livingstone Road, Pinetown',
    'Durban',
    'KwaZulu-Natal',
    '031 717 2300',
    'info@kaytech.co.za',
    'www.kaytech.co.za',
    ARRAY['PET Plastic', 'Plastic'],
    true,
    -29.8144,
    30.8491,
    ARRAY['Collection', 'Drop-off'],
    ARRAY['Bags', '240L Bins'],
    50.0,
    'Mon-Fri: 08:00-16:30'
  ),
  
  -- Lothlorien Recycling (Real)
  (
    'Lothlorien Recycling',
    'Comprehensive recycling solutions',
    '10 Impala Road, Chloorkop',
    'Johannesburg',
    'Gauteng',
    '011 976 2710',
    'info@lothlorienrecycling.co.za',
    'www.lothlorienrecycling.co.za',
    ARRAY['Paper', 'Plastic', 'Glass', 'Metal Cans'],
    true,
    -26.0075,
    28.1890,
    ARRAY['Collection', 'Drop-off', 'Container Rental'],
    ARRAY['Bags', '240L Bins', '6m³ Skips'],
    50.0,
    'Mon-Fri: 07:00-16:00, Sat: 08:00-13:00'
  ),
  
  -- Envirowaste (Real)
  (
    'Envirowaste',
    'Waste management and recycling solutions',
    '16 Diesel Road, Isando',
    'Johannesburg',
    'Gauteng',
    '011 974 8727',
    'info@envirowaste.co.za',
    'www.envirowaste.co.za',
    ARRAY['General Waste', 'Recyclables', 'Hazardous Waste'],
    true,
    -26.1307,
    28.2236,
    ARRAY['Collection', 'Waste Management'],
    ARRAY['Bins', 'Skips'],
    100.0,
    'Mon-Fri: 07:00-17:00'
  ),
  
  -- Desco Electronic Recyclers (Real)
  (
    'Desco Electronic Recyclers',
    'E-waste recycling specialists',
    '20 Diesel Road, Isando',
    'Johannesburg',
    'Gauteng',
    '011 974 2001',
    'info@desco.co.za',
    'www.desco.co.za',
    ARRAY['E-Waste', 'Electronic Waste', 'Batteries'],
    true,
    -26.1307,
    28.2236,
    ARRAY['Collection', 'Drop-off', 'Data Destruction'],
    ARRAY['Secure Containers'],
    50.0,
    'Mon-Fri: 08:00-16:30'
  ),
  
  -- Waste Plan (Real)
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
    -33.8539,
    18.5197,
    ARRAY['Collection', 'Waste Management'],
    ARRAY['Bags', '240L Bins', 'Skips'],
    100.0,
    'Mon-Fri: 08:00-17:00'
  );