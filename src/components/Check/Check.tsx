import './Check.scss';
import noCheckIcon from '../../assets/icons/CheckBox_No.svg';
import yesCheckBoxIcon from '../../assets/icons/CheckBox_Yes.svg';
import { useState, useCallback } from 'react';

export const Check = () => {
  const [isChosen, setIsChosen] = useState<boolean>(true);
  const toggleIsChosen = useCallback(() => {
    setIsChosen((state) => !state);
  }, []);

  return (
    <div className='check' onClick={toggleIsChosen}>
      <img
        src={isChosen ? yesCheckBoxIcon : noCheckIcon}
        className={
          'check__icon ' + (isChosen ? 'check__icon_yes' : 'check__icon_no')
        }
      />
      <p className='check__name'>Name</p>
    </div>
  );
};
