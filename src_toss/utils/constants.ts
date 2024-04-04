// 은행/카드/증권/포인트-페이머니/보험/할부금융(캐피탈)/부동산/자동차/통신사/현금(직접입력)

import {ibk_icon, kb_icon, toss_icon, woori_icon} from './icons';

export type AssetListParams = {
  id?: number;
  name: string;
  iconName: string;
};

export const assetLists: AssetListParams[] = [
  {
    id: 1,
    name: '은행',
    iconName: 'landmark',
  },
  {
    id: 2,
    name: '카드',
    iconName: 'credit-card',
  },
  {
    id: 3,
    name: '증권',
    iconName: 'chart-line',
  },
  {
    id: 4,
    name: '포인트',
    iconName: 'circle-dollar-to-slot',
  },
  {
    id: 6,
    name: '보험',
    iconName: 'shield-halved',
  },
  {
    id: 7,
    name: '할부금융',
    iconName: 'money-check-dollar',
  },
  {
    id: 8,
    name: '부동산',
    iconName: 'house',
  },
  {
    id: 9,
    name: '자동차',
    iconName: 'car',
  },
  {
    id: 10,
    name: '통신사',
    iconName: 'phone',
  },
  {
    id: 11,
    name: '현금',
    iconName: 'pencil',
  },
];

export type BankInfoProps = {
  id: string;
  name: string;
  iconName: string;
  amount: number;
};

export const bankInfoList: BankInfoProps[] = [
  {
    id: 'kb',
    name: 'KB국민ONE통장-보통예금',
    iconName: kb_icon,
    amount: 18320000,
  },
  {
    id: 'woori',
    name: '우리은행-보통예금',
    iconName: woori_icon,
    amount: 2400000,
  },
  {
    id: 'ibk',
    name: 'IBK기업은행-보통예금',
    iconName: ibk_icon,
    amount: 1000000,
  },
  {
    id: 'toss',
    name: '토스뱅크 통장',
    iconName: toss_icon,
    amount: 2432,
  },
];
