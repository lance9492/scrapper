export const PROVINCES = [
  'Eastern Cape',
  'Free State',
  'Gauteng',
  'KwaZulu-Natal',
  'Limpopo',
  'Mpumalanga',
  'North West',
  'Northern Cape',
  'Western Cape'
] as const;

export const MATERIAL_TYPES = [
  'Ferrous Metals',
  'Non-Ferrous Metals',
  'Paper',
  'Plastic',
  'Glass',
  'E-Waste',
  'Batteries',
  'Used Oil',
  'Metal Cans',
  'Industrial Waste',
  'Electronic Waste'
] as const;

export const CONTAINER_TYPES = [
  'Bags (100L)',
  '240L Bins',
  '6m³ Skips',
  '12m³ Skips',
  '20m³ Skips'
] as const;

export const LISTING_CATEGORIES = {
  recycle: [
    'Ferrous Metals',
    'Non-Ferrous Metals',
    'Paper',
    'Plastic',
    'Glass',
    'E-Waste',
    'Batteries',
    'Used Oil'
  ],
  salvage: [
    'Vehicles',
    'Machinery',
    'Parts',
    'Equipment',
    'Tools',
    'Industrial'
  ]
} as const;

export const LISTING_STATUS = [
  'active',
  'sold',
  'expired',
  'cancelled'
] as const;

export const BID_STATUS = [
  'pending',
  'accepted',
  'rejected'
] as const;

export const CONTAINER_REQUEST_STATUS = [
  'pending',
  'approved',
  'delivered',
  'rejected'
] as const;

export const SERVICE_OFFERINGS = [
  'Collection',
  'Drop-off',
  'Container Rental',
  'Industrial Services',
  'Sorting',
  'Consulting',
  'Waste Management',
  'Data Destruction',
  'School Programs'
] as const;

export const PAYMENT_TERMS = [
  'Payment on collection/delivery',
  'EFT within 24 hours',
  'Cash on delivery',
  'Bank transfer',
  'Escrow service'
] as const;

export const DEFAULT_OPERATING_HOURS = 'Mon-Fri: 08:00-17:00, Sat: 08:00-13:00';

export const LISTING_DURATION_OPTIONS = [
  { value: '7', label: '7 days' },
  { value: '14', label: '14 days' },
  { value: '30', label: '30 days' }
] as const;

export const MINIMUM_WEIGHTS = [
  50,
  100,
  200,
  500,
  1000
] as const;

export const CURRENCY = 'ZAR';
export const CURRENCY_SYMBOL = 'R';

export const CONTACT_INFO = {
  phone: '0800 SCRAP (72727)',
  email: 'support@scrapper.co.za',
  emergencyHotline: '+27 80 911 0000'
} as const;

export const COMPANY_INFO = {
  name: 'Scrapper',
  tagline: 'Your One-Stop Platform for Recycling and Salvage',
  description: 'South Africa\'s premier marketplace for recyclable materials and salvage items',
  foundedYear: 2025
} as const;