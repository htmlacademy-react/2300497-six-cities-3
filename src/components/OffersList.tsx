import { useState } from 'react';
import CitiesCard from './cities-cards';
import { OfferTypes } from '../mocks/offer';


type OffersListProps = {
  offersType: OfferTypes[];
  onActiveCardChange?: (id: number | null) => void;
};

function OffersList({ offersType, onActiveCardChange }: OffersListProps) {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  
  const handleMouseEnter = (id: number) => {
    setActiveCard(id);
    if (onActiveCardChange) {
      onActiveCardChange(id);
    }
  };

  const handleMouseLeave = () => {
    setActiveCard(null);
    if (onActiveCardChange) {
      onActiveCardChange(null);
    }
  };

  if (!offersType || offersType.length === 0) {
    return null;
  }

  return (
    <div className="cities__places-list places__list tabs__content">
      {offersType.map((offer) => (
        <CitiesCard
          key={offer.id}
          offer={offer}
          isActive={activeCard === offer.id}
          onMouseEnter={() => handleMouseEnter(offer.id)}
          onMouseLeave={() => handleMouseLeave}
        />
      ))}
    </div>
  );
}
export default OffersList;
