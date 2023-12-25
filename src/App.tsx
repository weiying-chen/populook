import { useState, useEffect, ChangeEvent } from 'react';
import './App.css';
import axios from 'axios';

interface City {
  rank: number;
  city: string;
  state: string;
  population: string;
}

interface SearchInputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function SearchInput({ value, onChange }: SearchInputProps) {
  return <input type="text" value={value} onChange={onChange} placeholder="City or State" />;
}

interface SuggestionsListProps {
  cities: City[];
}

function SuggestionsList({ cities }: SuggestionsListProps) {
  return (
    <ul>
      {cities.map(city => (
        <li key={city.rank}>
          <span className="name">{city.city}, {city.state}</span>
          <span className="population">{city.population}</span>
        </li>
      ))}
    </ul>
  );
}

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
      <SuggestionsList cities={filteredCities} />
    </div>
  );
}

export default App;
