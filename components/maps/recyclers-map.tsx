"use client"

import { useState } from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import { recyclers, type Recycler } from '@/lib/data/recyclers'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Phone, Mail, Globe, CheckCircle } from 'lucide-react'

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''

const mapContainerStyle = {
  width: '100%',
  height: '600px'
}

const center = {
  lat: -29.0,
  lng: 24.0
}

export function RecyclersMap() {
  const [selectedRecycler, setSelectedRecycler] = useState<Recycler | null>(null)

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={6}
        options={{
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }]
            }
          ]
        }}
      >
        {recyclers.map((recycler) => (
          <Marker
            key={recycler.id}
            position={recycler.coordinates}
            onClick={() => setSelectedRecycler(recycler)}
          />
        ))}

        {selectedRecycler && (
          <InfoWindow
            position={selectedRecycler.coordinates}
            onCloseClick={() => setSelectedRecycler(null)}
          >
            <Card className="p-4 min-w-[300px]">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{selectedRecycler.name}</h3>
                {selectedRecycler.verified && (
                  <Badge variant="secondary">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                {selectedRecycler.description}
              </p>
              <div className="text-sm space-y-2">
                <div>{selectedRecycler.address}</div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <a href={`tel:${selectedRecycler.phone}`} className="text-primary hover:underline">
                    {selectedRecycler.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <a href={`mailto:${selectedRecycler.email}`} className="text-primary hover:underline">
                    {selectedRecycler.email}
                  </a>
                </div>
                {selectedRecycler.website && (
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <a 
                      href={selectedRecycler.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Visit Website
                    </a>
                  </div>
                )}
              </div>
            </Card>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  )
}