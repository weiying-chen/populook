import { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { css, Global } from '@emotion/react';
import { City } from './types';
import SearchInput from './components/SearchInput';
import SuggestionsList from './components/SuggestionsList';
import { fgColor, bgColor } from './styles';

const globalStyles = css`
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap');

  body {
    font-family: "Nunito", sans-serif;
    background-color: ${bgColor};
    color: ${fgColor};
    margin: 0;
    padding: 0;
  }

  h1 {
    margin-top: 0;
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
`

const style = css`
  max-width: 1200px;
  margin: auto;
  padding: 20px;
`

function App() {
  const [cities, setCities] = useState<City[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json');
      setCities(result.data);
    };

    fetchData();
  }, []);

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
        <h1>Populook</h1>
        <SearchInput value={searchTerm} onChange={handleSearch} />
        {searchTerm ? (
          <SuggestionsList cities={filteredCities} searchTerm={searchTerm}/>
        ) : (
          <p>Welcome to Populook! Enter a city or state name to find its population.</p>
        )}
      </div>
    </>
  );
}

export default App;
