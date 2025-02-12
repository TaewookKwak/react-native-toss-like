// 은행/카드/증권/포인트-페이머니/보험/할부금융(캐피탈)/부동산/자동차/통신사/현금(직접입력)

import {
  apartment_icon,
  car_sell,
  ibk_icon,
  kb_icon,
  support,
  toss_icon,
  woori_icon,
} from './icons';

export type AssetListParams = {
  id: string;
  name: string;
  iconName: string;
};

export const assetLists: AssetListParams[] = [
  {
    id: '1',
    name: '은행',
    iconName: 'landmark',
  },
  {
    id: '2',
    name: '카드',
    iconName: 'credit-card',
  },
  {
    id: '3',
    name: '증권',
    iconName: 'chart-line',
  },
  {
    id: '4',
    name: '포인트',
    iconName: 'circle-dollar-to-slot',
  },
  {
    id: '6',
    name: '보험',
    iconName: 'shield-halved',
  },
  {
    id: '7',
    name: '할부금융',
    iconName: 'money-check-dollar',
  },
  {
    id: '8',
    name: '부동산',
    iconName: 'house',
  },
  {
    id: '9',
    name: '자동차',
    iconName: 'car',
  },
  {
    id: '10',
    name: '통신사',
    iconName: 'phone',
  },
  {
    id: '11',
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
    amount: 183200000,
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

type BankServiceListProps = {
  id: string;
  name: string;
  to: string;
};

// 계좌개설/카드발급/대출받기
export const bankServiceList: BankServiceListProps[] = [
  {
    id: 'account_open',
    name: '계좌개설',
    to: 'ModalAccountOpen',
  },
  {
    id: 'card_issue',
    name: '카드발급',
    to: 'ModalCardIssue',
  },
  {
    id: 'loan',
    name: '대출받기',
    to: 'ModalLoan',
  },
];

type EtcServiceListProps = {
  id: string;
  name: string;
  to: string;
  iconName?: string;
};

// /중고차 대출 알아보기/내 보험 상담하기/ 주택담보대출 찾기
export const etcServiceList: EtcServiceListProps[] = [
  {
    id: 'used_car_loan',
    name: '중고차 대출 알아보기',
    to: 'ModalUsedCarLoan',
    iconName: car_sell,
  },
  {
    id: 'insurance',
    name: '내 보험 상담하기',
    to: 'ModalInsurance',
    iconName: support,
  },
  {
    id: 'mortgage_loan',
    name: '주택담보대출 찾기',
    to: 'ModalMortgageLoan',
    iconName: apartment_icon,
  },
];
