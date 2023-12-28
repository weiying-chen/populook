import { useState, ChangeEvent } from 'react';
import { css, Global } from '@emotion/react';
import { City } from './types';
import useFetch from './hooks/useFetch';
import SearchInput from './components/SearchInput';
import SuggestionsList from './components/SuggestionsList';
import { fgColor, bgColor } from './styles';
import logo from './assets/logo.svg';

const globalStyles = css`
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap');

  body {
    font-family: "Nunito", sans-serif;
    background-color: ${bgColor};
    color: ${fgColor};
    margin: 0;
    padding: 0;
  }

  img {
    width: 289px;
    height: 69px;
    margin-bottom: 1em;
  }

  p {
    margin-bottom: 0;  
  }

  #root {
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
  }  
`;

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
  const { data: cities, error } = useFetch<City[]>('/data.json');

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
