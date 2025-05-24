import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { OfferTypes } from '../mocks/offer';

type MapProps = {
  city: {
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
  };
  offers: OfferTypes[];
};

function Map({ city, offers }: MapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current).setView(
        [city.location.latitude, city.location.longitude],
        city.location.zoom
      );

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);

      markersRef.current = L.layerGroup().addTo(mapRef.current);
    }
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView(
        [city.location.latitude, city.location.longitude],
        city.location.zoom
      );
    }

    if (markersRef.current) {
      markersRef.current.clearLayers();

      offers.forEach((offer) => {
        L.marker([offer.location.latitude, offer.location.longitude]).addTo(markersRef.current!);
      });
    }
  }, [city, offers]);

  return <section
    className="cities__map map"
    ref={mapContainerRef}
    style={{ height: '500px', width: '100%' }}
  />
}

export default Map;
