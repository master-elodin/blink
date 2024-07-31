import './App.css';
import * as React from 'react';
import SearchPage from './SearchPage.tsx';
import { IConceptProperties } from './types.ts';
import ResultsPage from './ResultsPage.tsx';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [selectedDrug, setSelectedDrug] = React.useState<IConceptProperties | undefined>();

  useEffect(() => {
    if (pathname === '/') {
      navigate('/drugs/search');
    }
  }, [pathname, navigate]);

  const onHomeClick = () => {
    navigate('/drugs/search');
  };

  const onSelect = (newVal: IConceptProperties) => {
    setSelectedDrug(newVal);
    navigate(`/drugs/${newVal.rxcui}`);
  };

  return (
    <div className='root'>
      <div className={'header'}>
        <div className={'header__home'} onClick={onHomeClick}>Blink Takehome</div>
        <div className={'header__current'}>Drug {pathname.endsWith('/search') ? 'Search' : 'Results'}</div>
      </div>
      <div className={'body'}>
        <Routes>
          <Route path={'/drugs/search'} element={<SearchPage onSelect={onSelect} />} />
          <Route path={'/drugs/:id'} element={<ResultsPage selected={selectedDrug} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
