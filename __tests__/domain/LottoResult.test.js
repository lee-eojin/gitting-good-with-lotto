import Lotto from "../../src/domain/Lotto.js";
import WinningNumber from "../../src/domain/WinningNumber.js";
import LottoResult from "../../src/domain/LottoResult.js";
import Rank from "../../src/domain/Rank.js";

describe("LottoResult 테스트", () => {
  const winningLotto = new Lotto([1, 2, 3, 4, 5, 6]);
  const winningNumber = new WinningNumber(winningLotto, 7);

  const lottos = [
    new Lotto([8, 9, 10, 11, 12, 13]),   // 0개 일치 → MISS
    new Lotto([1, 2, 3, 8, 9, 10]),      // 3개 일치 → FIFTH
    new Lotto([1, 2, 3, 4, 9, 10]),      // 4개 일치 → FOURTH
    new Lotto([1, 2, 3, 4, 5, 10]),      // 5개 일치 → THIRD
    new Lotto([1, 2, 3, 4, 5, 7]),       // 5개 + 보너스 → SECOND
    new Lotto([1, 2, 3, 4, 5, 6]),       // 6개 일치 → FIRST
  ];

  const result = new LottoResult(lottos, winningNumber);

  test("getPrizeList는 FIFTH~FIRST 순서로 반환한다", () => {
    const prizeList = result.getPrizeList();
    expect(prizeList[0].rank).toBe(Rank.FIFTH);
    expect(prizeList[4].rank).toBe(Rank.FIRST);
  });

  test("각 등수의 당첨 개수를 정확히 계산한다", () => {
    const prizeList = result.getPrizeList();
    const byRank = Object.fromEntries(prizeList.map(({ rank, count }) => [rank, count]));

    expect(byRank[Rank.FIFTH]).toBe(1);
    expect(byRank[Rank.FOURTH]).toBe(1);
    expect(byRank[Rank.THIRD]).toBe(1);
    expect(byRank[Rank.SECOND]).toBe(1);
    expect(byRank[Rank.FIRST]).toBe(1);
  });

  test("getProfitRate는 수익률을 소수점 1자리로 반환한다", () => {
    const purchaseAmount = 6000;
    const profitRate = result.getProfitRate(purchaseAmount);
    expect(typeof profitRate).toBe("string");
    expect(profitRate).toMatch(/^\d+\.\d$/);
  });
});
