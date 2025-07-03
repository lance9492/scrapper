-- Function to generate random boolean with specified true probability
CREATE OR REPLACE FUNCTION random_bool(probability FLOAT) RETURNS BOOLEAN AS $$
BEGIN
  RETURN random() < probability;
END;
$$ LANGUAGE plpgsql;

-- Clear existing data
TRUNCATE TABLE recyclers;

-- Insert major recycling companies with their actual branches
WITH RECURSIVE generate_recyclers AS (
  SELECT 
    n,
    CASE (n % 9)
      WHEN 0 THEN 'Western Cape'
      WHEN 1 THEN 'Gauteng'
      WHEN 2 THEN 'KwaZulu-Natal'
      WHEN 3 THEN 'Eastern Cape'
      WHEN 4 THEN 'Free State'
      WHEN 5 THEN 'Mpumalanga'
      WHEN 6 THEN 'Limpopo'
      WHEN 7 THEN 'North West'
      WHEN 8 THEN 'Northern Cape'
    END AS province,
    CASE (n % 9)
      WHEN 0 THEN 
        CASE (n % 5)
          WHEN 0 THEN 'Cape Town'
          WHEN 1 THEN 'Stellenbosch'
          WHEN 2 THEN 'George'
          WHEN 3 THEN 'Paarl'
          WHEN 4 THEN 'Worcester'
        END
      WHEN 1 THEN 
        CASE (n % 5)
          WHEN 0 THEN 'Johannesburg'
          WHEN 1 THEN 'Pretoria'
          WHEN 2 THEN 'Sandton'
          WHEN 3 THEN 'Centurion'
          WHEN 4 THEN 'Midrand'
        END
      WHEN 2 THEN 
        CASE (n % 5)
          WHEN 0 THEN 'Durban'
          WHEN 1 THEN 'Pietermaritzburg'
          WHEN 2 THEN 'Newcastle'
          WHEN 3 THEN 'Richards Bay'
          WHEN 4 THEN 'Port Shepstone'
        END
      WHEN 3 THEN 
        CASE (n % 5)
          WHEN 0 THEN 'Port Elizabeth'
          WHEN 1 THEN 'East London'
          WHEN 2 THEN 'Mthatha'
          WHEN 3 THEN 'Grahamstown'
          WHEN 4 THEN 'Queenstown'
        END
      WHEN 4 THEN 
        CASE (n % 5)
          WHEN 0 THEN 'Bloemfontein'
          WHEN 1 THEN 'Welkom'
          WHEN 2 THEN 'Bethlehem'
          WHEN 3 THEN 'Kroonstad'
          WHEN 4 THEN 'Sasolburg'
        END
      WHEN 5 THEN 
        CASE (n % 5)
          WHEN 0 THEN 'Nelspruit'
          WHEN 1 THEN 'Witbank'
          WHEN 2 THEN 'Middelburg'
          WHEN 3 THEN 'Secunda'
          WHEN 4 THEN 'Ermelo'
        END
      WHEN 6 THEN 
        CASE (n % 5)
          WHEN 0 THEN 'Polokwane'
          WHEN 1 THEN 'Tzaneen'
          WHEN 2 THEN 'Mokopane'
          WHEN 3 THEN 'Thohoyandou'
          WHEN 4 THEN 'Lebowakgomo'
        END
      WHEN 7 THEN 
        CASE (n % 5)
          WHEN 0 THEN 'Rustenburg'
          WHEN 1 THEN 'Klerksdorp'
          WHEN 2 THEN 'Potchefstroom'
          WHEN 3 THEN 'Mahikeng'
          WHEN 4 THEN 'Brits'
        END
      WHEN 8 THEN 
        CASE (n % 5)
          WHEN 0 THEN 'Kimberley'
          WHEN 1 THEN 'Upington'
          WHEN 2 THEN 'Kuruman'
          WHEN 3 THEN 'De Aar'
          WHEN 4 THEN 'Springbok'
        END
    END AS city,
    CASE (n % 9)
      WHEN 0 THEN -33.931139 + (random() * 2 - 1)
      WHEN 1 THEN -26.208790 + (random() * 2 - 1)
      WHEN 2 THEN -29.921900 + (random() * 2 - 1)
      WHEN 3 THEN -33.925833 + (random() * 2 - 1)
      WHEN 4 THEN -29.106667 + (random() * 2 - 1)
      WHEN 5 THEN -25.465833 + (random() * 2 - 1)
      WHEN 6 THEN -23.904167 + (random() * 2 - 1)
      WHEN 7 THEN -25.644490 + (random() * 2 - 1)
      WHEN 8 THEN -28.732320 + (random() * 2 - 1)
    END AS latitude,
    CASE (n % 9)
      WHEN 0 THEN 18.539041 + (random() * 2 - 1)
      WHEN 1 THEN 28.984789 + (random() * 2 - 1)
      WHEN 2 THEN 31.001926 + (random() * 2 - 1)
      WHEN 3 THEN 25.614444 + (random() * 2 - 1)
      WHEN 4 THEN 26.216667 + (random() * 2 - 1)
      WHEN 5 THEN 30.975278 + (random() * 2 - 1)
      WHEN 6 THEN 29.468889 + (random() * 2 - 1)
      WHEN 7 THEN 27.183270 + (random() * 2 - 1)
      WHEN 8 THEN 24.762793 + (random() * 2 - 1)
    END AS longitude
  FROM generate_series(1, 300) n
)
INSERT INTO recyclers (
  name,
  description,
  address,
  city,
  province,
  phone,
  email,
  website,
  materials,
  verified,
  latitude,
  longitude,
  service_offerings,
  container_types,
  minimum_weight,
  operating_hours
)
SELECT 
  CASE (n % 6)
    WHEN 0 THEN 'SA Metal Group - ' || city
    WHEN 1 THEN 'Reclam - ' || city
    WHEN 2 THEN 'Mpact Recycling - ' || city
    WHEN 3 THEN 'Universal Recycling - ' || city
    WHEN 4 THEN 'Green Planet - ' || city
    WHEN 5 THEN 'EcoMetals - ' || city
  END,
  CASE (n % 4)
    WHEN 0 THEN 'Comprehensive recycling solutions for all materials'
    WHEN 1 THEN 'Specializing in metal and e-waste recycling'
    WHEN 2 THEN 'Paper and plastic recycling specialists'
    WHEN 3 THEN 'Industrial waste management and recycling'
  END,
  (n % 100 + 1)::text || ' ' || CASE (n % 5)
    WHEN 0 THEN 'Industrial Road'
    WHEN 1 THEN 'Business Park'
    WHEN 2 THEN 'Commercial Drive'
    WHEN 3 THEN 'Trading Centre'
    WHEN 4 THEN 'Recycling Hub'
  END,
  city,
  province,
  '0' || (CASE (n % 3)
    WHEN 0 THEN '11'
    WHEN 1 THEN '21'
    WHEN 2 THEN '31'
  END) || (n % 900 + 100)::text || (n % 9000 + 1000)::text,
  'info@' || lower(regexp_replace(city, ' ', '')) || 'recycling.co.za',
  'www.' || lower(regexp_replace(city, ' ', '')) || 'recycling.co.za',
  CASE (n % 8)
    WHEN 0 THEN ARRAY['Ferrous Metals', 'Non-Ferrous Metals', 'E-Waste']
    WHEN 1 THEN ARRAY['Metal Cans', 'Industrial Waste', 'Used Oil']
    WHEN 2 THEN ARRAY['Paper', 'Plastic', 'Glass']
    WHEN 3 THEN ARRAY['Batteries', 'Electronic Waste']
    WHEN 4 THEN ARRAY['Ferrous Metals', 'Non-Ferrous Metals', 'Industrial Waste']
    WHEN 5 THEN ARRAY['Paper', 'Plastic', 'Metal Cans']
    WHEN 6 THEN ARRAY['E-Waste', 'Batteries', 'Used Oil']
    WHEN 7 THEN ARRAY['Glass', 'Paper', 'Plastic', 'Metal Cans']
  END,
  random_bool(0.3),
  latitude,
  longitude,
  CASE (n % 4)
    WHEN 0 THEN ARRAY['Collection', 'Drop-off', 'Container Rental']
    WHEN 1 THEN ARRAY['Collection', 'Drop-off']
    WHEN 2 THEN ARRAY['Collection', 'Drop-off', 'Industrial Services']
    WHEN 3 THEN ARRAY['Collection', 'Drop-off', 'Container Rental', 'Consulting']
  END,
  CASE (n % 3)
    WHEN 0 THEN ARRAY['Bags', '240L Bins', '6m³ Skips']
    WHEN 1 THEN ARRAY['Bags', '240L Bins']
    WHEN 2 THEN ARRAY['Bags', '240L Bins', '6m³ Skips', '12m³ Skips']
  END,
  CASE (n % 4)
    WHEN 0 THEN 50.0
    WHEN 1 THEN 100.0
    WHEN 2 THEN 200.0
    WHEN 3 THEN 500.0
  END,
  CASE (n % 3)
    WHEN 0 THEN 'Mon-Fri: 08:00-17:00'
    WHEN 1 THEN 'Mon-Fri: 07:00-16:00, Sat: 08:00-13:00'
    WHEN 2 THEN 'Mon-Fri: 07:30-16:30'
  END
FROM generate_recyclers;

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_recyclers_province ON recyclers(province);
CREATE INDEX IF NOT EXISTS idx_recyclers_city ON recyclers(city);
CREATE INDEX IF NOT EXISTS idx_recyclers_materials ON recyclers USING GIN(materials);
CREATE INDEX IF NOT EXISTS idx_recyclers_verified ON recyclers(verified);