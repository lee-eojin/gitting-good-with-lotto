export const INFO = {
  PURCHASE_AMOUNT: "\n> 구입금액을 입력해 주세요.",
  WINNING_NUMBERS: "\n> 당첨 번호를 입력해 주세요. ",
  BONUS_NUMBER: "\n> 보너스 번호를 입력해 주세요. ",
  ASK_RETRY: "\n> 다시 시작하시겠습니까? (y/n) ",
};

export const OUTPUT = {
  WINNING_STATS_HEADER: "\n당첨 통계",
  LINE_SPLITTER: "--------------------",
  PURCHASE_COUNT: (count) => `\n${count}개를 구매했습니다.`,
  PROFIT_RATE: (profitRate) => `총 수익률은 ${profitRate}%입니다.`,
  RANK_NORMAL: (matchCount, formatPrize, count) => `${matchCount}개 일치 (${formatPrize}원) - ${count}개`,
  RANK_BONUS: (matchCount, formatPrize, count) =>
    `${matchCount}개 일치, 보너스 볼 일치 (${formatPrize}원) - ${count}개`,
};
