// amount : 100000 -> amount: 100,000원 으로 변경하는 함수 intl 써서 작성해줘
export function formatAmount(amount: number): string {
  if (!amount) {
    return '';
  }
  return new Intl.NumberFormat().format(amount) + '원';
}
