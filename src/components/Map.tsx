import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

interface MapProps {
  center: {
    lat: number;
    lng: number;
  };
  markers?: Array<{
    position: {
      lat: number;
      lng: number;
    };
    title: string;
  }>;
  zoom?: number;
}

const Map: React.FC<MapProps> = ({ center, markers = [], zoom = 12 }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  });

  const mapStyles = {
    height: '400px',
    width: '100%'
  };

  if (!isLoaded) {
    return <div className="h-[400px] bg-gray-100 flex items-center justify-center">Loading map...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={mapStyles}
      zoom={zoom}
      center={center}
    >
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={marker.position}
          title={marker.title}
        />
      ))}
    </GoogleMap>
  );
};

export default Map;