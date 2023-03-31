import './ListItem.scss';
import arrowRightIcon from '../../assets/icons/Arrow_Right.svg';
import { Property } from '../Poperty/Property';
import { useCallback, useState } from 'react';
import { IListItem } from '../../store/slices/listSlice/listSlice.types';

export const ListItem = ({
  portName,
  onClick,
  shipName,
  id,
  shipType,
}: IListItemProps) => {
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
      onClick={onClick}
    >
      <div className='list-item__payload'>
        <h2 className='list-item__title'>{shipName}</h2>
        <div className='list-item__properties'>
          <Property name='Тип' value={shipType} />
          <Property name='Порт' value={portName} />
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

export interface IListItemProps
  extends Omit<IListItem, 'launches' | 'massKg' | 'yearBuild'> {
  onClick?: () => void;
}
