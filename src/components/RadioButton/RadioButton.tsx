import { useState, useCallback, useEffect } from 'react';
import './RadioButton.scss';
import radioButtonNo from '../../assets/icons/RadioButton_No.svg';
import radioButtonYes from '../../assets/icons/RadioButton_Yes.svg';

export const RadioButton = ({
  title,
  currentCheckedRadioButton,
  onCheck,
  valueName,
}: IRadioButtonProps) => {
  const toggleIsChecked = useCallback(() => {
    const emitedValueName =
      currentCheckedRadioButton === valueName ? undefined : valueName;
    onCheck && onCheck(emitedValueName);
  }, [currentCheckedRadioButton]);
  useEffect(() => {
    console.log(currentCheckedRadioButton);
  }, [currentCheckedRadioButton]);
  return (
    <div className='radio-button unselectable' onClick={toggleIsChecked}>
      <img
        src={
          currentCheckedRadioButton === valueName
            ? radioButtonYes
            : radioButtonNo
        }
      />
      <p className='radio-button__title'>{title}</p>
    </div>
  );
};

export interface IRadioButtonProps {
  title?: string;
  valueName: string;
  currentCheckedRadioButton: string | undefined;
  onCheck?: (valueName: string | undefined) => void;
}
