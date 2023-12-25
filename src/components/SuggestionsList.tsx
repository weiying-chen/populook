import { City } from '../types';

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

export default SuggestionsList;
