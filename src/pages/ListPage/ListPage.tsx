import { Button } from '../../components/Button/Button';
import { ListItem } from '../../components/ListItem/ListItem';
import './ListPage.scss';
import filtersIcon from '../../assets/icons/Filters.svg';
import { Input } from '../../components/Input/Input';

export const ListPage = () => {
  return (
    <div className='page'>
      <div className='list-page'>
        <aside>
          <div className='filter-section'>
            <h1 className='filter-section__title'>Фильтры</h1>
            <div className='filter-section__inputs'>
              <Input type='text' placeholder='Название' title='Поиск' />
              <Input
                type='list'
                checkList={{
                  a: { isChecked: false, title: 'aaaa' },
                  b: { isChecked: false, title: 'bbbb' },
                }}
                title='Выбор'
              />
            </div>
          </div>
        </aside>
        <main className='list-page__main'>
          <div className='list-section'>
            <h1 className='list-section__title'>Game Of Thrones Characters</h1>
            <Button icon={filtersIcon} className='list-section__filter-button'>
              Фильтры
            </Button>
            <div className='list'>
              <ListItem />
              <ListItem />
              <ListItem />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
