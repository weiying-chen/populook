import { useState, ChangeEvent } from 'react';
import { css, Global } from '@emotion/react';
import { City } from './types';
import useFetch from './hooks/useFetch';
import SearchInput from './components/SearchInput';
import SuggestionsList from './components/SuggestionsList';
import { globalStyles } from './styles';
import logo from './assets/logo.svg';

const style = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  margin: auto;
  padding: 20px;

  .error {
    color: #ff0000;
  }
`;

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: cities, error } = useFetch<City>('/data.json');

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredCities = cities.filter(city =>
    city.city.toLowerCase().includes(searchTerm.toLowerCase()) || 
    city.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Global styles={globalStyles}/>
      <div className="app" css={style}>
        <img src={logo} alt="Populook" />
        <SearchInput value={searchTerm} onChange={handleSearch} />
        {error ? (
          <p className="error">{error}</p>
        ) : searchTerm ? (
          <SuggestionsList cities={filteredCities} searchTerm={searchTerm}/>
        ) : (
          <p>Welcome to Populook! Enter a city or state name to find its population.</p>
        )}
      </div>
    </>
  );
}

export default App;
