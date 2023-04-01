import { Button } from '../../components/Button/Button';
import { ListItem } from '../../components/ListItem/ListItem';
import './ListPage.scss';
import filtersIcon from '../../assets/icons/Filters.svg';
import arrowLeftIcon from '../../assets/icons/Arrow_Left.svg';
import chevronLeftIcon from '../../assets/icons/Chevron_Left.svg';
import chevronRightIcon from '../../assets/icons/Chevron_Right.svg';
import { Input } from '../../components/Input/Input';
import { useCallback, useState, useEffect, useMemo } from 'react';
import { debounce, useAppDispatch, useAppSelector } from '../../hooks';
import { setTitleFilter } from '../../store/slices/filterSlice/filtersSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { IListItem } from '../../store/slices/listSlice/listSlice.types';
import axios from 'axios';
import { IListFilterOptions } from '../../store/slices/filterSlice/filterSlice.types';
import {
  setPortOptions,
  setSelectedShipType,
} from '../../store/slices/filterSlice/filtersSlice';

export const ListPage = () => {
  const [shipList, setShipList] = useState<IListItem[]>([]);
  const [pageInfo, setPageInfo] = useState<IPageInfo>({} as IPageInfo);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const filters = useAppSelector((state) => state.filters);
  const dispatch = useAppDispatch();

  const setTitleFilterState = useCallback(
    debounce((value: string) => {
      dispatch(setTitleFilter({ title: value }));
    }, 500),
    []
  );

  const selectedPorts = useMemo(
    () =>
      Object.entries(filters.portOptions)
        .map((value) => {
          console.log(value);
          if (value[1].isChecked) return value[0];
        })
        .filter((value) => value),
    [filters.portOptions]
  );

  const setPortOptionsFilter = useCallback((value: IListFilterOptions) => {
    dispatch(setPortOptions({ portOptions: value }));
  }, []);

  const selectShipType = useCallback((value: string | undefined) => {
    dispatch(setSelectedShipType({ selectedShipType: value }));
  }, []);

  const selectRequestOptions = [
    'id',
    'name',
    'type',
    'home_port',
    'launches',
    'year_built',
    'mass_kg',
  ];

  const [isMobileFilterModalOpen, setIsMobileFilterModalOpen] =
    useState<boolean>(false);

  const params = useParams();
  const navigate = useNavigate();

  // Этот код я писал торопясь.
  useEffect(() => {
    console.log(selectedPorts);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    axios
      .post('https://api.spacexdata.com/v4/ships/query', {
        query: {
          type: filters.selectedShipType,
          name: { $regex: `${filters.title ? filters.title : '.'}` },
          home_port: selectedPorts.length
            ? { $in: [...selectedPorts] }
            : { $regex: '.' },
        },
        options: {
          select: selectRequestOptions,
          limit: 5,
          page: params.pageNumber,
        },
      })
      .then((data) => {
        console.log(data.data);
        return data;
      })
      .then((data) => {
        setShipList(data.data.docs);
        setPageInfo(data.data as IPageInfo);
        setIsLoading(false);
      });
  }, [
    params.pageNumber,
    filters.selectedShipType,
    filters.title,
    filters.portOptions,
  ]);

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
              <Input
                type='list'
                checkList={filters.portOptions}
                title='Порт'
                onSelect={setPortOptionsFilter}
              />
              <Input
                type='radio'
                radios={filters.shipTypes}
                title='Тип'
                onSelect={selectShipType}
                currentCheckedRadioButton={filters.selectedShipType}
              />
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
                    onClick={() => {
                      navigate(`/ship/${value.id}`);
                    }}
                    type={value.type}
                    home_port={value.home_port}
                    name={value.name}
                    id={value.id}
                    key={value.id}
                  />
                );
              })}
            </div>
            <div className='pagination'>
              <Button
                icon={chevronLeftIcon}
                style={{
                  visibility: pageInfo.hasPrevPage ? 'visible' : 'hidden',
                }}
                onClick={
                  pageInfo.hasPrevPage && !isLoading
                    ? () => {
                        navigate(`/ships/${Number(params.pageNumber) - 1}`);
                        setIsLoading(true);
                      }
                    : () => {}
                }
              />
              <Button>{params.pageNumber}</Button>
              <Button
                icon={chevronRightIcon}
                style={{
                  visibility: pageInfo.hasNextPage ? 'visible' : 'hidden',
                }}
                onClick={
                  pageInfo.hasNextPage && !isLoading
                    ? () => {
                        navigate(`/ships/${Number(params.pageNumber) + 1}`);
                        setIsLoading(true);
                      }
                    : () => {}
                }
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export interface IPageInfo {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  nextPage: number | null;
  page: number;
  prevPage: number | null;
  totalPages: number;
}
