import { useCallback, useEffect, useMemo, useState } from 'react';
import './Input.scss';
import { Check } from '../Check/Check';
import {
  IFilterOptions,
  IRadioButtonValues,
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

const SearchInput = ({ title, type, placeholder }: ISearchInputProps) => {
  const [isFocused, setIsFocused] = useState<boolean>();
  const setFocus = useCallback(() => {
    setIsFocused(true);
  }, []);
  const unsetFocus = useCallback(() => {
    setIsFocused(false);
  }, []);
  return (
    <div className='input'>
      <p className='input__title'>{title}</p>
      <div className='input__wrapper'>
        <input
          type='text'
          className='input__input'
          placeholder={placeholder}
          onFocus={setFocus}
          onBlur={unsetFocus}
        />
      </div>
    </div>
  );
};

const ListInput = ({ title, onSelect, checkList }: IListInputProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [checkedOptions, setCheckedOptions] = useState<IFilterOptions>(
    checkList ? checkList : {}
  );

  const toggleIsOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);
  const unsetIsOpen = useCallback(() => {
    setIsOpen(false);
  }, []);
  const checkedOptionsAmount = useMemo(() => {
    return Object.entries(checkedOptions)
      .map(([_, isChecked]) => {
        return Number(isChecked ? 1 : 0);
      })
      .reduce((prev, curr) => {
        return prev + curr;
      }, 0);
  }, [checkedOptions]);

  useEffect(() => {
    const filterOptions: IFilterOptions = { ...checkList };
    setCheckedOptions(filterOptions);
  }, [checkList]);
  return (
    <>
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
              {checkedOptionsAmount
                ? `Выбрано ${checkedOptionsAmount}`
                : 'Любой'}
            </div>
            <img
              src={chevronDownIcon}
              className={'chevron ' + (isOpen ? 'chevron_up' : 'chevron_down')}
            />
          </div>
          <div
            className={
              'input__options ' + (isOpen ? 'input__options_open' : '')
            }
          >
            {Object.entries(checkedOptions).map(([key, filterOption]) => {
              return (
                <Check
                  title={filterOption.title}
                  isChecked={filterOption.isChecked}
                  key={key}
                  valueName={key}
                  onCheck={(key, isChecked) => {
                    const newCheckedOptions: IFilterOptions = {
                      ...checkedOptions,
                    };
                    newCheckedOptions[key] = {
                      ...newCheckedOptions[key],
                      isChecked,
                    };
                    setCheckedOptions(newCheckedOptions);
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

const RadioInput = ({ title, onSelect, radios }: IRadioInputProps) => {
  const [radiosState, setRadiosState] = useState<IRadioButtonValues>(
    radios ? radios : {}
  );
  const [currentCheckedRadioButton, setCurrentCheckedRadioButton] = useState<
    string | undefined
  >(undefined);

  useEffect(() => {
    onSelect && onSelect(currentCheckedRadioButton);
  }, [currentCheckedRadioButton]);
  return (
    <div className='radio-input'>
      <p className='input__title'>{title}</p>
      <div className='radio-input__buttons'>
        {Object.entries(radiosState).map(([valueName, title]) => {
          return (
            <RadioButton
              title={title}
              key={valueName}
              onCheck={(checkedValueName) => {
                setCurrentCheckedRadioButton(checkedValueName);
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
}

export type IInputProps =
  | ISearchInputProps
  | IListInputProps
  | IRadioInputProps;

export interface IListInputProps {
  title?: string;
  type: 'list';
  onSelect?: (filterOptions: IFilterOptions) => void;
  checkList?: IFilterOptions;
}

export interface IRadioInputProps {
  title?: string;
  type: 'radio';
  onSelect?: (selectedRadioButton: string | undefined) => void;
  radios?: IRadioButtonValues;
}
