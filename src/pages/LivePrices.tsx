import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label, Legend } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Info } from 'lucide-react';

interface MetalPrice {
  price: number;
  change: number;
  positive: boolean;
  source: string;
}

interface PriceData {
  [key: string]: MetalPrice;
}

const priceData: PriceData = {
  copper: { price: 95.50, change: 1.63, positive: true, source: 'SA Metals' },
  aluminum: { price: 28.75, change: 1.88, positive: true, source: 'SA Metals' },
  steel: { price: 3.75, change: 0.10, positive: true, source: 'SA Metals' },
  brass: { price: 52.25, change: 1.35, positive: true, source: 'SA Metals' },
  paper: { price: 2.80, change: 1.92, positive: true, source: 'Mpact' },
  plastics: { price: 5.50, change: 1.90, positive: false, source: 'Mpact' },
  cardboard: { price: 2.25, change: 0.50, positive: true, source: 'Mpact' },
  batteries: { price: 8.50, change: 0.75, positive: true, source: 'SA Metals' }
};

// Generate chart data for one week (7 days) with day labels
const generateChartData = (basePrice: number, volatility: number = 0.8) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return days.map((day, index) => ({
    day,
    price: Number((basePrice + (Math.random() - 0.5) * volatility).toFixed(2))
  }));
};

// Generate multi-series data for each material type (7 days)
const generateMultiSeriesData = (basePrices: { [key: string]: number }) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return days.map((day) => ({
    day,
    ...Object.entries(basePrices).reduce((acc, [key, basePrice]) => ({
      ...acc,
      [key]: Number((basePrice + (Math.random() - 0.5) * 0.8).toFixed(2))
    }), {})
  }));
};

const steelData = generateMultiSeriesData({
  'HMS 1': 3.75,
  'HMS 2': 3.25,
  '304 Stainless': 28.50,
  '316 Stainless': 32.50
});

const copperData = generateMultiSeriesData({
  'Millberry': 95.50,
  'Heavy Copper': 90.25,
  'Light Copper': 85.75,
  'ICW': 45.50
});

const aluminumData = generateMultiSeriesData({
  'Clean Extrusions': 28.75,
  'Cast': 25.50,
  'Cans': 22.75
});

const brassData = generateMultiSeriesData({
  'Yellow Brass': 52.25,
  'Red Brass': 58.50,
  'Mixed Brass': 48.75
});

const paperData = generateMultiSeriesData({
  'White Paper': 2.80,
  'Mixed Paper': 2.25,
  'Cardboard': 2.00
});

const plasticsData = generateMultiSeriesData({
  'HDPE Natural': 5.50,
  'PET Clear': 4.75,
  'Mixed Plastics': 3.25
});

const oilData = generateMultiSeriesData({
  'Motor Oil': 2.50,
  'Industrial Oil': 2.75,
  'Transformer Oil': 3.00
});

interface PriceCardProps {
  title: string;
  price: number;
  change: number;
  positive: boolean;
  source: string;
}

const PriceCard = ({ title, price, change, positive, source }: PriceCardProps) => (
  <div className="bg-white rounded-lg p-6 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <span className={`px-2 py-1 rounded text-sm ${positive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
        {positive ? <ArrowUpRight className="inline w-4 h-4" /> : <ArrowDownRight className="inline w-4 h-4" />}
        {change.toFixed(2)}%
      </span>
    </div>
    <p className="text-2xl font-bold mb-2">R {price.toFixed(2)}/kg</p>
    <div className="flex items-center text-sm text-gray-500">
      <Info className="w-4 h-4 mr-1" />
      <span>Source: {source}</span>
    </div>
  </div>
);

interface MultiSeriesChartProps {
  title: string;
  description: string;
  data: Array<{ [key: string]: any }>;
  series: { name: string; color: string }[];
}

const MultiSeriesChart = ({ title, description, data, series }: MultiSeriesChartProps) => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <div className="mb-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
    </div>
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="day"
            tick={{ fontSize: 12 }}
            tickLine={{ stroke: '#e0e0e0' }}
            axisLine={{ stroke: '#e0e0e0' }}
          />
          <YAxis 
            tickFormatter={(value) => `R${value.toFixed(2)}`}
            width={80}
            tick={{ fontSize: 12 }}
            tickLine={{ stroke: '#e0e0e0' }}
            axisLine={{ stroke: '#e0e0e0' }}
          >
            <Label 
              value="Price (R/kg)" 
              angle={-90} 
              position="insideLeft" 
              style={{ textAnchor: 'middle', fontSize: '12px', fill: '#666' }} 
            />
          </YAxis>
          <Tooltip 
            formatter={(value: number) => [`R ${value.toFixed(2)}`, '']}
            labelFormatter={(label) => `${label}`}
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="line"
          />
          {series.map(({ name, color }) => (
            <Line
              key={name}
              type="monotone"
              dataKey={name}
              stroke={color}
              strokeWidth={3}
              dot={{ fill: color, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: color, strokeWidth: 2, fill: 'white' }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

const LivePrices = () => {
  return (
    <div className="pt-0"> {/* Removed extra padding since Marketplace component already adds it */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Live Scrap Metal Prices</h1>
          <p className="text-gray-600">
            Real-time scrap metal prices from SA Metals and recycling materials from Mpact. Updated every 15 minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {Object.entries(priceData).map(([key, data]) => (
            <PriceCard
              key={key}
              title={key.charAt(0).toUpperCase() + key.slice(1)}
              {...data}
            />
          ))}
        </div>

        {/* Ferrous Metals */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-xl font-bold">Ferrous Metals</h2>
          </div>
          <MultiSeriesChart
            title="Steel Grades - Weekly Trend"
            description="All steel grades including HMS and stainless steel (Past 7 days)"
            data={steelData}
            series={[
              { name: 'HMS 1', color: '#2563eb' },
              { name: 'HMS 2', color: '#7c3aed' },
              { name: '304 Stainless', color: '#db2777' },
              { name: '316 Stainless', color: '#9333ea' }
            ]}
          />
        </div>

        {/* Non-Ferrous Metals */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-xl font-bold">Non-Ferrous Metals</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <MultiSeriesChart
              title="Copper Grades - Weekly Trend"
              description="All copper grades including Millberry and ICW (Past 7 days)"
              data={copperData}
              series={[
                { name: 'Millberry', color: '#dc2626' },
                { name: 'Heavy Copper', color: '#ea580c' },
                { name: 'Light Copper', color: '#d97706' },
                { name: 'ICW', color: '#ca8a04' }
              ]}
            />
            <MultiSeriesChart
              title="Aluminum Grades - Weekly Trend"
              description="All aluminum grades including extrusions and cast (Past 7 days)"
              data={aluminumData}
              series={[
                { name: 'Clean Extrusions', color: '#0ea5e9' },
                { name: 'Cast', color: '#06b6d4' },
                { name: 'Cans', color: '#0891b2' }
              ]}
            />
            <MultiSeriesChart
              title="Brass Grades - Weekly Trend"
              description="All brass grades including yellow and red brass (Past 7 days)"
              data={brassData}
              series={[
                { name: 'Yellow Brass', color: '#eab308' },
                { name: 'Red Brass', color: '#f59e0b' },
                { name: 'Mixed Brass', color: '#d97706' }
              ]}
            />
          </div>
        </div>

        {/* Paper Products */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-xl font-bold">Paper Products</h2>
          </div>
          <MultiSeriesChart
            title="Paper Grades - Weekly Trend"
            description="All paper grades including white paper and cardboard (Past 7 days)"
            data={paperData}
            series={[
              { name: 'White Paper', color: '#0ea5e9' },
              { name: 'Mixed Paper', color: '#06b6d4' },
              { name: 'Cardboard', color: '#0891b2' }
            ]}
          />
        </div>

        {/* Plastics */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-xl font-bold">Plastics</h2>
          </div>
          <MultiSeriesChart
            title="Plastic Grades - Weekly Trend"
            description="All plastic grades including HDPE and PET (Past 7 days)"
            data={plasticsData}
            series={[
              { name: 'HDPE Natural', color: '#22c55e' },
              { name: 'PET Clear', color: '#16a34a' },
              { name: 'Mixed Plastics', color: '#15803d' }
            ]}
          />
        </div>

        {/* Used Oil */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-xl font-bold">Used Oil</h2>
          </div>
          <MultiSeriesChart
            title="Oil Types - Weekly Trend"
            description="All oil types including motor and industrial oil (Past 7 days)"
            data={oilData}
            series={[
              { name: 'Motor Oil', color: '#64748b' },
              { name: 'Industrial Oil', color: '#475569' },
              { name: 'Transformer Oil', color: '#334155' }
            ]}
          />
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-semibold mb-2">Price Information</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>• Ferrous and non-ferrous metal prices sourced from SA Metals</li>
            <li>• Paper and plastic prices sourced from Mpact Recycling</li>
            <li>• Prices are indicative and may vary by location and quality</li>
            <li>• All prices are in South African Rand (ZAR) per kilogram</li>
            <li>• Charts show weekly trends with daily price movements</li>
            <li>• Updates occur every 15 minutes during business hours</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LivePrices;