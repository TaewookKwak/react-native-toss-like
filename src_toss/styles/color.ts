export interface ColorProps {
  bg: string;
  bg_setion: string;
  bg_bottom_sheet: string;
  bg_bottom_tab: string;
  bg_button: string;
  indicator_bottom_sheet: string;
  text: string;
  text_title: string;
  text_list: string;
  text_button: string;
  text_more: string;
  text_info: string;
  text_bottom_tab: string;
  text_money: string;
  icon: string;
  divider: string;
  red: string;
  [key: string]: string; // 추가 속성을 위한 인덱스 시그니처
}

export const light: ColorProps = {
  bg: '#F2F4F6',
  bg_setion: '#ffffff',
  bg_bottom_sheet: '#FFFFFF',
  bg_bottom_tab: '#FFFFFF',
  bg_button: '#e6e9ed',
  bg_button_focus: '#d9dce1',
  indicator_bottom_sheet: '#E5E8EB',
  text: '#6b7684',
  text_title: '#191f28',
  text_list: '#4E5968',
  text_button: '#4E5968',
  text_more: '#6b7684',
  text_info: '#8b95a1',
  text_bottom_tab_active: '#191f28',
  text_bottom_tab: '#B0B8C1',
  text_money: '#333D4B',
  icon: '#B0B8C1',
  divider: '#E5E8EB',
  red: '#F04452',
  logo: '#1B64DA',
};

export const dark: ColorProps = {
  bg: '#101013',
  bg_setion: '#17171C',
  bg_bottom_sheet: '#17171C',
  bg_bottom_tab: '#17171C',
  bg_button: '#3B3B46',
  bg_button_focus: '#2C2C35',
  indicator_bottom_sheet: '#3C3C47',
  text: '#FFFFFF',
  text_title: '#FFFFFF',
  text_list: '#C3C3C6',
  text_button: '#C3C3C6',
  text_more: '#9E9EA4',
  text_info: '#7E7E87',
  text_bottom_tab_active: '#FFFFFF',
  text_bottom_tab: '#62626D',
  text_money: '#E4E4E5',
  icon: '#62626D',
  divider: '#2C2C35',
  red: '#F04452',
  logo: '#4593FC',
};

export const colors = {dark, light};
