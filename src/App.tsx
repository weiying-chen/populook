import { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import './App.css';
import { City } from './types';
import SearchInput from './components/SearchInput';
import SuggestionsList from './components/SuggestionsList';

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
    <div className="App">
      <SearchInput value={searchTerm} onChange={handleSearch} />
      {searchTerm && <SuggestionsList cities={filteredCities} searchTerm={searchTerm}/>}
    </div>
  );
}

export default App;
