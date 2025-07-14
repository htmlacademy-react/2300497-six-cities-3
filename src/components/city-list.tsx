import { useDispatch } from 'react-redux';
import { changeCity } from '../store/reducer';

export const cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

function CityList() {
  const dispatch = useDispatch();

  const handleCityClick = (city: string) => {
    dispatch(changeCity(city));
  };

  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <li key={city} className="locations__item">
          <a
            className="locations__item-link tabs__item"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleCityClick(city);
            }}
          >
            <span>{city}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default CityList;
