import './Check.scss';
import noCheckIcon from '../../assets/icons/CheckBox_No.svg';
import yesCheckBoxIcon from '../../assets/icons/CheckBox_Yes.svg';
import { useState, useCallback, useEffect } from 'react';

export const Check = ({
  title,
  valueName,
  onCheck,
  isChecked,
}: ICheckBoxProps) => {
  const [innerIsChecked, setInnerIsChecked] = useState<boolean>(isChecked);
  const toggleinnerIsChecked = useCallback(
    () => setInnerIsChecked((prev) => !prev),
    []
  );

  useEffect(() => {
    if (onCheck) {
      onCheck(valueName, innerIsChecked);
    }
  }, [innerIsChecked]);

  return (
    <div className='checkbox unselectable' onClick={toggleinnerIsChecked}>
      <img
        src={innerIsChecked ? yesCheckBoxIcon : noCheckIcon}
        className='checkbox__icon'
      />
      <p className='checkbox__name'>{title}</p>
    </div>
  );
};

export interface ICheckBoxProps {
  title: string;
  onCheck?: (valueName: string, isChecked: boolean) => void;
  isChecked: boolean;
  valueName: string;
}
