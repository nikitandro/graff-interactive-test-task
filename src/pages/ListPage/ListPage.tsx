import { Button } from '../../components/Button/Button';
import { ListItem } from '../../components/ListItem/ListItem';
import './ListPage.scss';
import filtersIcon from '../../assets/icons/Filters.svg';
import arrowLeftIcon from '../../assets/icons/Arrow_Left.svg';
import chevronLeftIcon from '../../assets/icons/Chevron_Left.svg';
import chevronRightIcon from '../../assets/icons/Chevron_Right.svg';
import { Input } from '../../components/Input/Input';
import { useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setTitleFilter } from '../../store/slices/filterSlice/filtersSlice';

export const ListPage = () => {
  const shipList = useAppSelector((state) => state.shipList);
  const filters = useAppSelector((state) => state.filters);
  const dispatch = useAppDispatch();
  const setTitleFilterState = useCallback((value: string) => {
    dispatch(setTitleFilter({ title: value }));
  }, []);
  // const [radioFilterOptions, setRadioFilterOptions] =
  //   useState<IRadioFilterOptions>({ a: 'a', b: 'b' });
  // const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);

  // const [listFilterOptions, setListFilterOptions] =
  //   useState<IListFilterOptions>({
  //     a: { isChecked: false, title: 'a' },
  //     b: { isChecked: false, title: 'b' },
  //   });

  // const [checkedRadioButton, setCheckedRadioButton] = useState<
  //   string | undefined
  // >(undefined);

  const [isMobileFilterModalOpen, setIsMobileFilterModalOpen] =
    useState<boolean>(false);

  return (
    <div className='page'>
      <div className='list-page'>
        <aside
          className='filter-wrapper'
          style={{ zIndex: isMobileFilterModalOpen ? 1000 : -1000 }}
        >
          <div
            className={
              'filter-section ' +
              (isMobileFilterModalOpen ? 'filter-section_open' : '')
            }
          >
            <h1 className='filter-section__title'>
              <Button
                icon={arrowLeftIcon}
                className='filter-section__title-icon'
                onClick={() => {
                  setIsMobileFilterModalOpen(false);
                }}
              />
              <span>Фильтры</span>
            </h1>
            <div className='filter-section__inputs'>
              <Input
                type='text'
                placeholder='Название'
                title='Название'
                onChange={setTitleFilterState}
              />
              <Input type='list' checkList={filters.portOptions} title='Порт' />
              <Input type='radio' radios={filters.shipTypes} title='Тип' />
            </div>
          </div>
        </aside>
        <main className='list-page__main'>
          <div className='list-section'>
            <h1 className='list-section__title'>SpaceX Ships</h1>
            <Button
              icon={filtersIcon}
              className='list-section__filter-button'
              onClick={() => {
                setIsMobileFilterModalOpen(true);
              }}
            >
              Фильтры
            </Button>
            <div className='list'>
              {shipList.map((value) => {
                return (
                  <ListItem
                    shipType={value.shipType}
                    portName={value.portName}
                    shipName={value.shipName}
                    id={value.id}
                  />
                );
              })}
            </div>
            <div className='pagination'>
              <Button icon={chevronLeftIcon} />
              <Button>{1}</Button>
              <Button icon={chevronRightIcon} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
