import './ListItem.scss';
import arrowRightIcon from '../../assets/icons/Arrow_Right.svg';
import { Property } from '../Poperty/Property';
import { useCallback, useState } from 'react';

export const ListItem = () => {
  const [isHovered, setIsHovered] = useState<boolean>();

  const setHovered = useCallback(() => {
    setIsHovered(true);
  }, []);

  const resetTouchAndHover = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <div
      className={'list-item '}
      onMouseOver={setHovered}
      onMouseOut={resetTouchAndHover}
      onTouchEnd={resetTouchAndHover}
    >
      <div className='list-item__payload'>
        <h2 className='list-item__title'>Hello</h2>
        <div className='list-item__properties'>
          <Property name='Property1' value='Value1' />
          <Property name='Property1' value='Value1' />
        </div>
      </div>
      <img
        src={arrowRightIcon}
        className={
          'go-icon ' + (isHovered ? 'go-icon_visible' : 'go-icon_hidden')
        }
      />
    </div>
  );
};
