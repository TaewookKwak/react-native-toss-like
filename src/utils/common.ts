// amount : 100000 -> amount: 100,000원 으로 변경하는 함수 intl 써서 작성해줘
export function formatAmount(amount: number): string {
  if (!amount) {
    return '';
  }
  return new Intl.NumberFormat().format(amount) + '원';
}

// d day 계산하는 함수. return -15 or +15
export function calculateDday(date: Date): string {
  const today = new Date();
  const diff = date.getTime() - today.getTime();
  // - or + 로 return
  if (diff < 0) {
    return `${Math.ceil(diff / (1000 * 60 * 60 * 24))}`;
  } else {
    return '+' + Math.floor(diff / (1000 * 60 * 60 * 24));
  }
}

// 오늘 날짜 요일을 return 하는 함수 (ex. 1월 1일 토요일)
export function getToday(): string {
  const today = new Date();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const day = today.getDay();
  const dayList = ['일', '월', '화', '수', '목', '금', '토'];
  return `${month}월 ${date}일 ${dayList[day]}요일`;
}
