export interface Recycler {
  id: string;
  name: string;
  description: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  materials: string[];
  phone: string;
  email: string;
  website?: string;
  verified: boolean;
}

export const recyclers: Recycler[] = [
  {
    id: "1",
    name: "Cape Metal Recyclers",
    description: "Large-scale recycling facility specializing in ferrous and non-ferrous metals",
    address: "12 Industrial Road, Epping Industria, Cape Town",
    coordinates: {
      lat: -33.927544,
      lng: 18.539016
    },
    materials: ["Copper", "Aluminum", "Steel", "Brass"],
    phone: "+27 21 534 5555",
    email: "info@capemetal.co.za",
    website: "https://capemetal.co.za",
    verified: true
  },
  {
    id: "2",
    name: "Gauteng Scrap Solutions",
    description: "Premier scrap metal dealer in Johannesburg",
    address: "45 Main Reef Road, Roodepoort",
    coordinates: {
      lat: -26.204103,
      lng: 27.858172
    },
    materials: ["Steel", "Iron", "Aluminum"],
    phone: "+27 11 766 4444",
    email: "info@gautengscrap.co.za",
    website: "https://gautengscrap.co.za",
    verified: true
  },
  {
    id: "3",
    name: "Durban Metal Exchange",
    description: "KZN's largest metal recycling facility",
    address: "78 South Coast Road, Durban",
    coordinates: {
      lat: -29.915872,
      lng: 31.006004
    },
    materials: ["All Metals", "Electronic Waste"],
    phone: "+27 31 465 3333",
    email: "info@durbanmetal.co.za",
    verified: true
  }
]