import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { OfferTypes } from '../mocks/offer';

export type MapProps = {
  city: {
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
  };
  offers: OfferTypes[];
  activeOfferId?: string | null;
};

function createCustomIcon(isActive: boolean) {
  return new L.DivIcon({
    className: 'custom-div-icon',
    html: `<img src="img/${
      isActive ? 'pin-active.svg' : 'pin.svg'
    }" alt="pin" />`,
    iconSize: [24, 30],
    iconAnchor: [12, 30],
  });
}

function Map({ city, offers, activeOfferId }: MapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(mapRef.current);
    }
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView(
        [city.location.latitude, city.location.longitude],
        city.location.zoom
      );
    }
  }, [city]);

  useEffect(() => {
    const currentMarkers = markersRef.current;

    if (currentMarkers) {
      Object.values(currentMarkers).forEach((marker) =>
        marker.removeFrom(mapRef.current!)
      );
    }

    offers.forEach((offer) => {
      const isActive = activeOfferId === offer.id;
      const marker = L.marker(
        [offer.location.latitude, offer.location.longitude],
        {
          icon: createCustomIcon(isActive),
        }
      ).addTo(mapRef.current!);

      currentMarkers[offer.id] = marker;
    });

    return () => {

      Object.values(currentMarkers).forEach((marker) =>
        marker.removeFrom(mapRef.current!)
      );
    };
  }, [offers, activeOfferId]);

  return (
    <section
      className="cities__map map"
      ref={mapContainerRef}
      style={{ height: '100%', width: '100%' }}
    />
  );
}

export default Map;
