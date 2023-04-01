import { Button } from '../../components/Button/Button';
import { ListItem } from '../../components/ListItem/ListItem';
import './ListPage.scss';
import filtersIcon from '../../assets/icons/Filters.svg';
import arrowLeftIcon from '../../assets/icons/Arrow_Left.svg';
import chevronLeftIcon from '../../assets/icons/Chevron_Left.svg';
import chevronRightIcon from '../../assets/icons/Chevron_Right.svg';
import { Input } from '../../components/Input/Input';
import { useCallback, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
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

  const setTitleFilterState = useCallback((value: string) => {
    dispatch(setTitleFilter({ title: value }));
  }, []);

  const setPortOptionsFilter = useCallback((value: IListFilterOptions) => {
    dispatch(setPortOptions({ portOptions: value }));
  }, []);

  const selectShipType = useCallback((value: string | undefined) => {
    dispatch(setSelectedShipType({ selectedShipType: value }));
  }, []);

  const [isMobileFilterModalOpen, setIsMobileFilterModalOpen] =
    useState<boolean>(false);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post('https://api.spacexdata.com/v4/ships/query', {
        options: {
          select: [
            'id',
            'name',
            'type',
            'home_port',
            'launches',
            'year_built',
            'mass_kg',
          ],
          limit: 5,
          page: params.pageNumber,
          populate: [{ path: 'launches', select: ['name'] }],
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
  }, [params.pageNumber]);

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
