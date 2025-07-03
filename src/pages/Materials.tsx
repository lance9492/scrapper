import React from 'react';

interface MaterialGrade {
  name: string;
  description: string;
  grade: string;
  examples: string[];
}

interface Material {
  name: string;
  description: string;
  image: string;
  grades: MaterialGrade[];
}

const materials: Material[] = [
  {
    name: 'Plastics',
    description: 'Various recyclable plastics sorted by type and color.',
    image: 'https://cdn.pixabay.com/photo/2013/05/31/19/30/plastic-bottles-115069_1280.jpg',
    grades: [
      {
        name: 'HDPE Natural',
        description: 'Clean HDPE containers and bottles',
        grade: 'A',
        examples: [
          'Milk bottles',
          'Water containers',
          'Detergent bottles',
          'Shampoo bottles',
          'Bleach containers',
          'Motor oil bottles',
          'Antifreeze containers',
          'Chemical storage containers',
          'Juice containers',
          'Cleaning product bottles'
        ]
      },
      {
        name: 'PET Clear',
        description: 'Clear beverage bottles',
        grade: 'A',
        examples: [
          'Soft drink bottles',
          'Water bottles',
          'Juice containers',
          'Food packaging',
          'Salad containers',
          'Peanut butter jars',
          'Medicine bottles',
          'Household cleaner bottles',
          'Cooking oil bottles',
          'Condiment containers'
        ]
      },
      {
        name: 'Mixed Plastics',
        description: 'Assorted plastic materials',
        grade: 'B',
        examples: [
          'Shopping bags',
          'Food packaging',
          'Bubble wrap',
          'Plastic films',
          'Storage containers',
          'Plastic cutlery',
          'CD cases',
          'Plant pots',
          'Plastic toys',
          'Office supplies'
        ]
      }
    ]
  },
  {
    name: 'Paper and cardboard paper',
    description: 'Various recyclable paper products.',
    image: 'https://media.istockphoto.com/id/1193312195/photo/cardboard-boxes-on-blur-storage-warehouse-shelves-background-3d-illustration.jpg?s=612x612&w=0&k=20&c=J5fy62PB8e10cZvhKbVydnC8PBmR9C59ZWX0B0QldJo=',
    grades: [
      {
        name: 'White paper',
        description: 'Clean paper',
        grade: 'A',
        examples: [
          'school books',
          'text books',
          'printing ryms of paper',
          'News papers',
          'Novels',
        ]
      },
      {
        name: 'K4',
        description: 'Cardboard paper',
        grade: 'A',
        examples: [
          'packing boxes',
        ]
      },
     
    ]
  },
  {
    name: 'Batteries',
    description: 'Various types of recyclable batteries from automotive to industrial applications.',
    image: 'https://media.istockphoto.com/id/167208673/photo/old-batteries.jpg?s=612x612&w=0&k=20&c=SvPWYB6UJNO-iYJ7jvyUvQtc-agntM3CLxpgmfkir0Y=',
    grades: [
      {
        name: 'Lead-Acid (Automotive)',
        description: 'Car and truck batteries',
        grade: 'A',
        examples: [
          'Car batteries',
          'Truck batteries',
          'Motorcycle batteries',
          'Marine batteries',
          'Golf cart batteries',
          'UPS batteries',
          'Solar storage batteries',
          'Emergency lighting batteries',
          'Forklift batteries',
          'Generator batteries'
        ]
      },
      {
        name: 'Industrial Batteries',
        description: 'Forklift and UPS batteries',
        grade: 'A+',
        examples: [
          'Forklift batteries',
          'Electric pallet jack batteries',
          'Industrial UPS systems',
          'Telecom backup batteries',
          'Data center batteries',
          'Railway signaling batteries',
          'Solar farm storage',
          'Wind farm storage',
          'Mining equipment batteries',
          'Emergency power systems'
        ]
      }
    ]
  },
  {
    name: 'Aluminum',
    description: 'Lightweight, versatile metal used in various industries.',
    image: 'https://media.istockphoto.com/id/459142145/photo/cubes-of-recyled-cans.jpg?s=612x612&w=0&k=20&c=Bw_fkQPfk0C2cQtsxUpzlbiy05GOoF0Bj1cBUgbX9AQ=',
    grades: [
      {
        name: 'Clean Extrusions',
        description: 'Clean aluminum profiles and sheets',
        grade: 'A',
        examples: [
          'Window frames',
          'Door frames',
          'Curtain wall systems',
          'Solar panel frames',
          'Heat sinks',
          'Industrial profiles',
          'Architectural trims',
          'Display systems',
          'Shower enclosures',
          'Railing systems',
          'Signage frames',
          'Light fixtures'
        ]
      },
      {
        name: 'Cast Aluminum',
        description: 'Clean cast aluminum parts',
        grade: 'B',
        examples: [
          'Engine blocks',
          'Transmission cases',
          'Wheel rims',
          'Machinery housings',
          'Pump housings',
          'Industrial equipment parts',
          'Marine components',
          'Aircraft parts',
          'Power tool casings',
          'Automotive components'
        ]
      }
    ]
  },
  {
    name: 'Copper',
    description: 'High-value non-ferrous metal essential for electrical and plumbing applications.',
    image: 'https://media.istockphoto.com/id/496193141/photo/copper-wires-recycling.jpg?s=612x612&w=0&k=20&c=grBwOznD0MvQb7Iut0T8Prbn_AZywLLQN1MAjGR0Boc=',
    grades: [
      {
        name: 'Millberry Copper',
        description: 'Clean, bare bright copper wire',
        grade: 'A+',
        examples: [
          'Electrical wire',
          'Communication cables',
          'Power distribution cables',
          'Building wire',
          'Transformer windings',
          'Motor windings',
          'Circuit board traces',
          'Industrial controls',
          'Appliance wiring',
          'Computer cables'
        ]
      },
      {
        name: 'Copper Tubing',
        description: 'Clean copper pipes and tubes',
        grade: 'A',
        examples: [
          'Plumbing pipes',
          'HVAC tubing',
          'Refrigeration lines',
          'Solar water heaters',
          'Industrial process piping',
          'Medical gas lines',
          'Heat exchangers',
          'Boiler tubes',
          'Condenser coils',
          'Hydraulic lines'
        ]
      }
    ]
  },
  {
    name: 'Steel',
    description: 'Most commonly recycled metal, essential for construction and manufacturing.',
    image: 'https://media.istockphoto.com/id/868926884/photo/old-rusty-corroded-car-parts-in-car-scrapyard-car-recycling-wrecking-machinery-parts-wait-for.jpg?s=612x612&w=0&k=20&c=obvE6XGx8o9mBU6fkWbhOv0FN4-4zEUy14MCbrhwmJA=',
    grades: [
      {
        name: 'HMS 1',
        description: 'Heavy Melting Steel, clean thick steel',
        grade: 'A',
        examples: [
          'Steel beams',
          'Heavy plates',
          'Railroad tracks',
          'Ship parts',
          'Heavy machinery',
          'Construction equipment',
          'Industrial tanks',
          'Steel pipes',
          'Bridge components',
          'Heavy automotive parts'
        ]
      },
      {
        name: 'HMS 2',
        description: 'Mixed steel grades',
        grade: 'B',
        examples: [
          'Light structural steel',
          'Sheet metal',
          'Auto body parts',
          'Steel drums',
          'Appliance shells',
          'Metal furniture',
          'Fencing material',
          'Roofing sheets',
          'Storage containers',
          'Light machinery parts'
        ]
      }
    ]
  },
  {
    name: 'Used Oil',
    description: 'Collected used motor and industrial oils for recycling.',
    image: 'https://media.istockphoto.com/id/1942373468/photo/pour-used-motor-oil-from-a-can-into-a-metal-bucket.jpg?s=612x612&w=0&k=20&c=aqwTWe9I_kZP5sK8-YysXw2TBHAnSa6ByDbMlCG2nCs=',
    grades: [
      {
        name: 'Motor Oil',
        description: 'Used automotive and machinery oil',
        grade: 'A',
        examples: [
          'Car engine oil',
          'Truck engine oil',
          'Motorcycle oil',
          'Generator oil',
          'Transmission fluid',
          'Differential oil',
          'Power steering fluid',
          'Hydraulic oil',
          'Gear oil',
          'Marine engine oil'
        ]
      },
      {
        name: 'Industrial Oil',
        description: 'Used industrial and manufacturing oils',
        grade: 'A',
        examples: [
          'Machine lubricants',
          'Cutting oils',
          'Transformer oil',
          'Compressor oil',
          'Heat transfer oil',
          'Turbine oil',
          'Metalworking fluids',
          'Quenching oils',
          'Rolling oils',
          'Process oils'
        ]
      }
    ]
  }
];

const MaterialImage = ({ image }: { image: string }) => {
  return (
    <div className="relative h-64 md:h-auto overflow-hidden">
      <img
        src={image}
        alt="Material"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

const Materials = () => {
  return (
    <div className="pt-24 pb-8"> {/* Added pt-24 for navbar spacing */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-2xl font-bold mb-2">Recyclable Materials Guide</h1>
          <p className="text-gray-600">
            Learn about different types of recyclable materials and their grades.
          </p>
        </div>

        <div className="space-y-16">
          {materials.map((material) => (
            <div key={material.name} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3">
                <MaterialImage image={material.image} />
                <div className="col-span-2 p-8">
                  <h2 className="text-2xl font-bold mb-2">{material.name}</h2>
                  <p className="text-gray-600 mb-6">{material.description}</p>
                  <div className="space-y-8">
                    {material.grades.map((grade) => (
                      <div key={grade.name} className="border-b border-gray-100 pb-6">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{grade.name}</h3>
                          <span className={`px-2 py-0.5 text-xs rounded ${
                            grade.grade === 'A+' ? 'bg-purple-100 text-purple-800' :
                            grade.grade === 'A' ? 'bg-green-100 text-green-600' :
                            grade.grade === 'B' ? 'bg-blue-100 text-blue-600' :
                            'bg-gray-100 text-gray-600'
                          }`}>
                            Grade {grade.grade}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">{grade.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {grade.examples.map((example, index) => (
                            <div key={index} className="flex items-center text-sm text-gray-600">
                              <span className="w-1.5 h-1.5 bg-pink-500 rounded-full mr-2"></span>
                              {example}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Materials;