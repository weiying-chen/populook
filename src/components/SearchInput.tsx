import { ChangeEvent } from 'react';

interface SearchInputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function SearchInput({ value, onChange }: SearchInputProps) {
  return <input type="text" value={value} onChange={onChange} placeholder="City or State" />;
}

export default SearchInput;
