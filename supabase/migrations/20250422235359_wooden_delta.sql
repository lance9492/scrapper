/*
  # Add more recycler entries

  1. Changes
    - Insert 1000+ recycler entries across different provinces
    - Add diverse material types and specializations
    - Include mix of verified and non-verified recyclers
    - Ensure wide geographic coverage
*/

-- Function to generate random boolean with specified true probability
CREATE OR REPLACE FUNCTION random_bool(probability FLOAT) RETURNS BOOLEAN AS $$
BEGIN
  RETURN random() < probability;
END;
$$ LANGUAGE plpgsql;

-- Insert 1000+ recyclers
WITH RECURSIVE generate_recyclers AS (
  SELECT 
    'Recycler ' || n AS name,
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
    n
  FROM generate_series(1, 1000) n
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
  verified
)
SELECT 
  name || ' ' || CASE (n % 6)
    WHEN 0 THEN 'Recycling'
    WHEN 1 THEN 'Metals'
    WHEN 2 THEN 'Scrap'
    WHEN 3 THEN 'Trading'
    WHEN 4 THEN 'Solutions'
    WHEN 5 THEN 'Industries'
  END,
  CASE (n % 4)
    WHEN 0 THEN 'Specializing in metal recycling and processing'
    WHEN 1 THEN 'Full-service recycling facility'
    WHEN 2 THEN 'Industrial waste management and recycling'
    WHEN 3 THEN 'Comprehensive recycling solutions'
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
  'info@' || lower(regexp_replace(name, ' ', '')) || '.co.za',
  'www.' || lower(regexp_replace(name, ' ', '')) || '.co.za',
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
  random_bool(0.3) -- 30% chance of being verified
FROM generate_recyclers;