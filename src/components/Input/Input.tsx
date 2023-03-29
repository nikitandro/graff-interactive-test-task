import { useCallback, useState } from 'react';
import './Input.scss';
import { Check } from '../Check/Check';

export const Input = ({ title, type, placeholder }: IInputProps) => {
  const [isFocused, setIsFocused] = useState<boolean>();
  const setFocus = useCallback(() => {
    setIsFocused(true);
  }, []);
  return (
    <div className='input'>
      <p className='input__title'>{title}</p>
      <div className='input__wrapper'>
        {/* <input
          type='search'
          className='input__input_search'
          placeholder={placeholder}
        /> */}
        <ListInput />
      </div>
    </div>
  );
};

export interface IInputProps {
  title?: string;
  type: 'search' | 'list';
  placeholder?: string;
}

const ListInput = () => {
  return (
    // <ul className='input__input input__input_list'>
    //   {/* <li className='list-value'>1</li>
    //   <li>2</li> */}

    // </ul>
    <></>
  );
};
