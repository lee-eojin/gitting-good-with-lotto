import Money from "../../src/domain/Money.js";

describe("Money 테스트", () => {
  describe("생성자 검증", () => {
    test("1000원 미만이면 에러를 발생시킨다", () => {
      expect(() => new Money(900)).toThrow("[ERROR]");
    });

    test("1000원 단위가 아니면 에러를 발생시킨다", () => {
      expect(() => new Money(1500)).toThrow("[ERROR]");
      expect(() => new Money(1100)).toThrow("[ERROR]");
    });

    test("1000원은 정상 생성된다", () => {
      expect(() => new Money(1000)).not.toThrow();
    });

    test("1000원 배수는 정상 생성된다", () => {
      expect(() => new Money(5000)).not.toThrow();
    });

    test("최대 구매 한도(50장 = 50000원)를 초과하면 에러를 발생시킨다", () => {
      expect(() => new Money(51000)).toThrow("[ERROR]");
    });

    test("최대 한도인 50000원은 정상 생성된다", () => {
      expect(() => new Money(50000)).not.toThrow();
    });
  });

  describe("fromString 검증", () => {
    test("빈 문자열이면 에러를 발생시킨다", () => {
      expect(() => Money.fromString("")).toThrow("[ERROR]");
    });

    test("공백 문자열이면 에러를 발생시킨다", () => {
      expect(() => Money.fromString("   ")).toThrow("[ERROR]");
    });

    test("숫자가 아닌 문자열이면 에러를 발생시킨다", () => {
      expect(() => Money.fromString("abc")).toThrow("[ERROR]");
    });

    test("정상 문자열로 생성된다", () => {
      expect(() => Money.fromString("3000")).not.toThrow();
    });
  });

  describe("getMaximumLottoCount 테스트", () => {
    test.each([
      [2000, 2],
      [8000, 8],
      [10000, 10],
    ])("%d원으로 %d장을 구매한다", (amount, expected) => {
      expect(new Money(amount).getMaximumLottoCount()).toBe(expected);
    });
  });
});
