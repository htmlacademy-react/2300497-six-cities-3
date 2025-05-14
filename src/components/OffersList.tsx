import { useState } from 'react';
import CitiesCard from './cities-cards';
import { OfferTypes } from '../mocks/offer';

type OffersListProps = {
  offersType: OfferTypes[];
};

function OffersList({ offersType }: OffersListProps) {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <div className="cities__places-list places__list tabs__content">
      {offersType.map((offer) => (
        <CitiesCard
          key={offer.id}
          offer={offer}
          isActive={activeCard === offer.id}
          onMouseEnter={() => setActiveCard(offer.id)}
          onMouseLeave={() => setActiveCard(null)}
        />
      ))}
    </div>
  );
}
export default OffersList;
