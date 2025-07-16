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
  activeOfferId?: number | null;
};

function createCustomMarkerIcon(color = '#007AFF') {
  return new L.DivIcon({
    className: 'custom-div-icon',
    html: `
      <div style="
        position: relative;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          background-color: ${color};
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        "></div>

        <div style="
          background-color: white;
          border-radius: 50%;
          width: 8px;
          height: 8px;
          position: absolute;
        "></div>

        <div style="
          position: absolute;
          bottom: -6px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 6px solid ${color};
        "></div>
      </div>
    `,
    iconSize: [24, 30],
    iconAnchor: [12, 30]
  });
}

function Map({ city, offers, activeOfferId }: MapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: number]: L.Marker }>({});

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

    if (markersRef.current) {
      Object.values(markersRef.current).forEach(marker => marker.removeFrom(mapRef.current!));
    }


    offers.forEach((offer) => {
      const isHighlighted = activeOfferId === offer.id;

      const marker = L.marker([offer.location.latitude, offer.location.longitude], {
        icon: createCustomMarkerIcon(isHighlighted ? 'orange' : '#007AFF'),
      }).addTo(mapRef.current!);

      markersRef.current[offer.id] = marker;
    });

    return () => {

      Object.values(markersRef.current).forEach(marker => marker.removeFrom(mapRef.current!));
    };
  }, [offers, activeOfferId]);

  return (
    <section
      className="cities__map map"
      ref={mapContainerRef}
      style={{ height: '600px', width: '100%' }}
    />
  );
}

export default Map;
