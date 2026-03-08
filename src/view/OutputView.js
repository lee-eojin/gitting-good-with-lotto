import { Console } from "@woowacourse/mission-utils";
import { OUTPUT } from "../constants/messages.js";

class OutputView {
  static printPurchaseCount(count) {
    Console.print(OUTPUT.PURCHASE_COUNT(count));
  }

  static printLottos(lottoList) {
    lottoList.forEach((lotto) => Console.print(`[${lotto.join(", ")}]`));
  }

  static printStatistics({ prizeList, profitRate }) {
    Console.print(OUTPUT.WINNING_STATS_HEADER);
    Console.print(OUTPUT.LINE_SPLITTER);
    prizeList.forEach(({ rank, count, prize }) => {
      Console.print(this.#formatRank(rank, count, prize));
    });
    Console.print(OUTPUT.PROFIT_RATE(profitRate));
  }

  static #formatRank(rank, count, prize) {
    const { matchCount, hasBonus } = rank.getResult();
    const formatPrize = prize.toLocaleString();
    if (hasBonus) {
      return OUTPUT.RANK_BONUS(matchCount, formatPrize, count);
    }
    return OUTPUT.RANK_NORMAL(matchCount, formatPrize, count);
  }
}

export default OutputView;
