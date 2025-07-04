import { useDispatch, useSelector } from 'react-redux';
import { setSortType } from '../store/reducer';
import { useState } from 'react';

function SortOptions() {
  const dispatch = useDispatch();
  const currentSortType = useSelector((state: any) => state.sortType);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleSortChange = (sortType:string) => {
    dispatch(setSortType(sortType));
    setOpen(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setOpen((prev) => !prev)}
      >
        {currentSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${
          isOpen ? 'places__options--opened' : ''
        }`}
      >
        <li
          className="places__option places__option--active"
          tabIndex={0}
          onClick={() => handleSortChange('Popular')}
        >
          Popular
        </li>
        <li
          className="places__option"
          tabIndex={0}
          onClick={() => handleSortChange('Price: low to high')}
        >
          Price: low to high
        </li>
        <li
          className="places__option"
          tabIndex={0}
          onClick={() => handleSortChange('Price: high to low')}
        >
          Price: high to low
        </li>
        <li
          className="places__option"
          tabIndex={0}
          onClick={() => handleSortChange('Top rated first')}
        >
          Top rated first
        </li>
      </ul>
    </form>
  );
}

export default SortOptions;
