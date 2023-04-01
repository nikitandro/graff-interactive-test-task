import './ItemPage.scss';
import { Button } from '../../components/Button/Button';
import arrowLeftIcon from '../../assets/icons/Arrow_Left.svg';
import { Property } from '../../components/Poperty/Property';
import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

export const ItemPage = () => {
  const [shipInfo, setShipInfo] = useState<IShipInfo>({} as IShipInfo);
  const navigate = useNavigate();
  const goBack = useCallback(() => {
    navigate(-1);
  }, []);
  const params = useParams();

  useEffect(() => {
    axios
      .get(`https://api.spacexdata.com/v4/ships/${params.id}`, {})
      .then((data) => {
        console.log(data.data);
        setShipInfo(data.data as IShipInfo);
      });
  }, []);
  return (
    <div className='page'>
      <div className='item-page'>
        <Button
          icon={arrowLeftIcon}
          onClick={goBack}
          className='item-page__go-back-button'
        >
          Вернуться
        </Button>
        <h1 className='list-page__title item-page__title'>{shipInfo.name}</h1>
        <div className='item-page__grid'>
          <Property
            name='Тип'
            value={shipInfo.type ? shipInfo.type.toString() : 'Неизвестно'}
            style={{ gridArea: 'A' }}
          />
          <Property
            name='Порт'
            value={shipInfo.home_port ? shipInfo.home_port : 'Неизвестно'}
            style={{ gridArea: 'B' }}
          />
          <Property
            name='Вес'
            value={
              shipInfo.mass_kg
                ? `${shipInfo.mass_kg.toString()} кг`
                : 'Неизвестно'
            }
            style={{ gridArea: 'C' }}
          />
          <Property
            name='Год'
            value={
              shipInfo.year_built
                ? shipInfo.year_built.toString()
                : 'Неизвестно'
            }
            style={{ gridArea: 'D' }}
          />
          <Property
            name='Роли'
            value={
              shipInfo.roles?.length
                ? shipInfo.roles?.join(' / ')
                : 'Неизвестно'
            }
            style={{
              gridArea: 'E',
              flexDirection: 'column',
              alignItems: 'start',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export interface IShipInfo {
  launches: string[] | null | undefined;
  name: string | null | undefined;
  type: string | null | undefined;
  year_built: number | null | undefined;
  home_port: string | null | undefined;
  mass_kg: number | null | undefined;
  roles: string[] | null | undefined;
}
