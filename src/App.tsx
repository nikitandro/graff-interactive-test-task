import './App.scss';
import { ItemPage } from './pages/ItemPage/ItemPage';
import { ListPage } from './pages/ListPage/ListPage';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <Router />
    </div>
  );
}

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/ships/1' />} />
      <Route path='ships/:pageNumber' element={<ListPage />} />
      <Route path='ship/:id' element={<ItemPage />} />
    </Routes>
  );
};

export default App;
