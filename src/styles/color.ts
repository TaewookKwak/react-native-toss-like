export interface ColorProps {
  charcoal: string;
  coolGray: string;
  darkSlate: string;
  lightGray: string;
  lightSlate: string;
  mediumGray: string;
  mutedGray: string;
  primary: string;
  red: string;
  slateGray: string;
  softGray: string;
  white: string;
  [key: string]: string; // 추가 속성을 위한 인덱스 시그니처
}

export const light: ColorProps = {
  white: '#ffffff',
  lightGray: '#F2F4F6',
  softGray: '#e6e9ed',
  mutedGray: '#6b7684',
  charcoal: '#333D4B',
  coolGray: '#8b95a1',
  lightSlate: '#B0B8C1',
  slateGray: '#4E5968',
  darkSlate: '#191f28',
  mediumGray: '#d9dce1',
  primary: '#1B64DA',
  red: '#F04452',
};

export const dark: ColorProps = {
  white: '#17171C',
  lightGray: '#101013',
  softGray: '#3B3B46',
  mutedGray: '#9E9EA4',
  charcoal: '#E4E4E5',
  coolGray: '#7E7E87',
  lightSlate: '#62626D',
  slateGray: '#C3C3C6',
  darkSlate: '#FFFFFF',
  mediumGray: '#2C2C35',
  primary: '#4593FC',
  red: '#F04452',
};

export const colors = {dark, light};
