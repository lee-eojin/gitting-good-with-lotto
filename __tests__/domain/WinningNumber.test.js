import Lotto from "../../src/domain/Lotto.js";
import WinningNumber from "../../src/domain/WinningNumber.js";

describe("WinningNumber 테스트", () => {
  const winningLotto = new Lotto([1, 2, 3, 4, 5, 6]);

  describe("생성자 검증", () => {
    test("NaN을 전달하면 에러를 발생시킨다", () => {
      expect(() => new WinningNumber(winningLotto, NaN)).toThrow("[ERROR]");
    });

    test("소수를 전달하면 에러를 발생시킨다", () => {
      expect(() => new WinningNumber(winningLotto, 1.5)).toThrow("[ERROR]");
    });

    test("보너스 번호가 범위를 벗어나면 에러를 발생시킨다", () => {
      expect(() => new WinningNumber(winningLotto, 0)).toThrow("[ERROR]");
      expect(() => new WinningNumber(winningLotto, 46)).toThrow("[ERROR]");
    });

    test("보너스 번호가 당첨 번호와 중복되면 에러를 발생시킨다", () => {
      expect(() => new WinningNumber(winningLotto, 6)).toThrow("[ERROR]");
    });

    test("정상적인 값으로 생성된다", () => {
      expect(() => new WinningNumber(winningLotto, 7)).not.toThrow();
    });
  });

  describe("fromString 검증", () => {
    test("빈 문자열이면 에러를 발생시킨다", () => {
      expect(() => WinningNumber.fromString(winningLotto, "")).toThrow("[ERROR]");
    });

    test("숫자가 아닌 문자열이면 에러를 발생시킨다", () => {
      expect(() => WinningNumber.fromString(winningLotto, "abc")).toThrow("[ERROR]");
    });

    test("소수 문자열이면 에러를 발생시킨다", () => {
      expect(() => WinningNumber.fromString(winningLotto, "1.5")).toThrow("[ERROR]");
    });

    test("정상 문자열로 생성된다", () => {
      expect(() => WinningNumber.fromString(winningLotto, "7")).not.toThrow();
    });
  });

  describe("getResult 테스트", () => {
    const winningNumber = new WinningNumber(winningLotto, 7);

    test.each([
      { numbers: [1, 2, 3, 4, 5, 6], expected: { matchCount: 6, hasBonus: false } },
      { numbers: [1, 2, 3, 4, 5, 7], expected: { matchCount: 5, hasBonus: true } },
      { numbers: [1, 2, 3, 4, 5, 8], expected: { matchCount: 5, hasBonus: false } },
      { numbers: [1, 2, 3, 4, 9, 10], expected: { matchCount: 4, hasBonus: false } },
      { numbers: [1, 2, 3, 9, 10, 11], expected: { matchCount: 3, hasBonus: false } },
      { numbers: [1, 2, 9, 10, 11, 12], expected: { matchCount: 2, hasBonus: false } },
      { numbers: [9, 10, 11, 12, 13, 14], expected: { matchCount: 0, hasBonus: false } },
    ])(
      "$numbers → matchCount: $expected.matchCount, hasBonus: $expected.hasBonus",
      ({ numbers, expected }) => {
        expect(winningNumber.getResult(new Lotto(numbers))).toEqual(expected);
      },
    );
  });
});
