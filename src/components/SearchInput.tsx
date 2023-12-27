import { ChangeEvent } from 'react';
import { css } from '@emotion/react';
import { fgColor } from '../styles';

interface SearchInputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const style = css`
  color: ${fgColor};
  background: #fff;
  width: 100%;
  padding: 1em;
  font-family: "Nunito", sans-serif;
  font-size: 20px;
  border: 2px solid ${fgColor};
  box-sizing: border-box;
  border-radius: 0;

  &:focus {
    border-radius: 0;
    outline: none;
  }
`

function SearchInput({ value, onChange }: SearchInputProps) {
  return <input type="text" value={value} onChange={onChange} placeholder="City or State" css={style} />;
}

export default SearchInput;
