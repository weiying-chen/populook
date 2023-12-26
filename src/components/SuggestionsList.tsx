import { City } from '../types';

interface SuggestionsListProps {
  cities: City[];
  searchTerm: string;
}

function highlightMatch(text: string, searchTerm: string) {
  const regex = new RegExp(searchTerm, 'gi');
  return text.replace(regex, match => `<span class="highlight">${match}</span>`);
}

function SuggestionsList({ cities, searchTerm }: SuggestionsListProps) {
  return (
    <ul>
      {cities.map(city => (
        <li key={city.rank}>
          <span className="name" dangerouslySetInnerHTML={{ __html: highlightMatch(city.city, searchTerm) + ', ' + highlightMatch(city.state, searchTerm) }}></span>
          <span className="population">{city.population}</span>
        </li>
      ))}
    </ul>
  );
}

export default SuggestionsList;
