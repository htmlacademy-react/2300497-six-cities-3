import { useDispatch } from 'react-redux';
import { changeCity } from '../store/reducer';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

function CityList() {
  const dispatch = useDispatch();
  const currentCity = useSelector((state: RootState) => state.city);

  const handleCityClick = (city: string) => {
    dispatch(changeCity(city));
  };

  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <li key={city} className="locations__item">
          <Link
            className={`locations__item-link tabs__item ${currentCity === city ? 'tabs__item--active' : ''
              }`}
            to={`/${city}`}
            onClick={(e) => {
              e.preventDefault();
              handleCityClick(city);
            }}
          >
            <span>{city}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default CityList;
