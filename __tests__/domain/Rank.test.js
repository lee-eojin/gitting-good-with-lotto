import Rank from "../../src/domain/Rank.js";

describe("Rank 테스트", () => {
  describe("getRank - matchCount/hasBonus로 등수를 반환한다", () => {
    test.each([
      [{ matchCount: 6, hasBonus: false }, Rank.FIRST],
      [{ matchCount: 5, hasBonus: true }, Rank.SECOND],
      [{ matchCount: 5, hasBonus: false }, Rank.THIRD],
      [{ matchCount: 4, hasBonus: false }, Rank.FOURTH],
      [{ matchCount: 3, hasBonus: false }, Rank.FIFTH],
      [{ matchCount: 2, hasBonus: false }, Rank.MISS],
      [{ matchCount: 0, hasBonus: false }, Rank.MISS],
    ])("%o → %s", (input, expected) => {
      expect(Rank.getRank(input)).toBe(expected);
    });
  });

  describe("getPrize - 등수별 상금을 반환한다", () => {
    test.each([
      [Rank.FIRST, 2_000_000_000],
      [Rank.SECOND, 30_000_000],
      [Rank.THIRD, 1_500_000],
      [Rank.FOURTH, 50_000],
      [Rank.FIFTH, 5_000],
      [Rank.MISS, 0],
    ])("%s 상금은 %d원이다", (rank, expected) => {
      expect(rank.getPrize()).toBe(expected);
    });
  });
});
