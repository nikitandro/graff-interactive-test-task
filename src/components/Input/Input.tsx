import { useCallback, useEffect, useMemo, useState } from 'react';
import './Input.scss';
import { CheckBox } from '../Check/CheckBox';
import {
  IListFilterOptions,
  IRadioFilterOptions,
} from '../../store/slices/filterSlice/filterSlice.types';
import chevronDownIcon from '../../assets/icons/Chevron_Down.svg';
import { RadioButton } from '../RadioButton/RadioButton';

export const Input = (props: IInputProps) => {
  if (props.type === 'list') {
    return <ListInput {...props} />;
  } else if (props.type === 'text') {
    return <SearchInput {...props} />;
  } else if (props.type === 'radio') {
    return <RadioInput {...props} />;
  }
  throw new Error('Incorrect input type.');
};

const SearchInput = ({ title, placeholder, onChange }: ISearchInputProps) => {
  const [inputState, setInputState] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const setFocus = useCallback(() => {
    setIsFocused(true);
  }, []);
  const unsetFocus = useCallback(() => {
    setIsFocused(false);
  }, []);

  useEffect(() => {
    onChange && onChange(inputState);
  }, [inputState]);

  return (
    <div className='input'>
      <p className='input__title'>{title}</p>
      <div className='input__wrapper'>
        <input
          type='text'
          className='input__input'
          placeholder={placeholder}
          value={inputState}
          onChange={(event) => {
            setInputState(event.currentTarget.value);
          }}
          onFocus={setFocus}
          onBlur={unsetFocus}
        />
      </div>
    </div>
  );
};

const ListInput = ({ title, onSelect, checkList }: IListInputProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [filterOptions, setFilterOptions] = useState<IListFilterOptions>(
    checkList ? checkList : {}
  );

  const toggleIsOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const unsetIsOpen = useCallback(() => {
    setIsOpen(false);
  }, []);

  const checkedOptionsAmount = useMemo(() => {
    return Object.entries(filterOptions)
      .map(([_, filterOption]) => {
        return Number(filterOption.isChecked ? 1 : 0);
      })
      .reduce((prev, curr) => {
        return prev + curr;
      }, 0);
  }, [filterOptions]);

  useEffect(() => {
    const filterOptions: IListFilterOptions = { ...checkList };
    setFilterOptions(filterOptions);
  }, []);

  useEffect(() => {
    onSelect && onSelect(filterOptions);
  }, [filterOptions]);

  return (
    <div className='input'>
      <p className='input__title'>{title}</p>
      <div className='input__wrapper'>
        <div
          className={
            'input__input input__input_list unselectable ' +
            (isOpen ? 'input__input_open' : '')
          }
          onClick={toggleIsOpen}
        >
          <div>
            {checkedOptionsAmount ? `Выбрано ${checkedOptionsAmount}` : 'Любой'}
          </div>
          <img
            src={chevronDownIcon}
            className={'chevron ' + (isOpen ? 'chevron_up' : 'chevron_down')}
          />
        </div>
        <div
          className={'input__options ' + (isOpen ? 'input__options_open' : '')}
        >
          {Object.entries(filterOptions).map(([key, filterOption]) => {
            return (
              <CheckBox
                title={filterOption.title}
                isChecked={filterOption.isChecked}
                key={key}
                valueName={key}
                onCheck={(key, isChecked) => {
                  const newCheckedOptions: IListFilterOptions = {
                    ...filterOptions,
                  };
                  newCheckedOptions[key] = {
                    ...newCheckedOptions[key],
                    isChecked,
                  };
                  setFilterOptions(newCheckedOptions);
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const RadioInput = ({
  title,
  onSelect,
  radios,
  currentCheckedRadioButton,
}: IRadioInputProps) => {
  return (
    <div className='radio-input'>
      <p className='input__title'>{title}</p>
      <div className='radio-input__buttons'>
        {Object.entries(radios ? radios : []).map(([valueName, title]) => {
          return (
            <RadioButton
              title={title}
              key={valueName}
              onCheck={(checkedValueName) => {
                onSelect && onSelect(checkedValueName);
              }}
              currentCheckedRadioButton={currentCheckedRadioButton}
              valueName={valueName}
            />
          );
        })}
      </div>
    </div>
  );
};

export interface ISearchInputProps {
  title?: string;
  type: 'text';
  placeholder?: string;
  onChange?: (value: string) => void;
}

export type IInputProps =
  | ISearchInputProps
  | IListInputProps
  | IRadioInputProps;

export interface IListInputProps {
  title?: string;
  type: 'list';
  onSelect?: (filterOptions: IListFilterOptions) => void;
  checkList?: IListFilterOptions;
}

export interface IRadioInputProps {
  title?: string;
  type: 'radio';
  onSelect?: (selectedRadioButton: string | undefined) => void;
  radios?: IRadioFilterOptions;
  currentCheckedRadioButton?: string;
}
