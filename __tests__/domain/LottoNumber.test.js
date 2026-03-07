import LottoNumber from "../../src/domain/LottoNumber.js";

describe("LottoNumber 테스트", () => {
  describe("fromString 생성", () => {
    test("정상적인 숫자 문자열로 생성된다", () => {
      expect(() => LottoNumber.fromString("27")).not.toThrow();
    });

    test("공백을 입력하면 에러를 발생시킨다", () => {
      expect(() => LottoNumber.fromString("")).toThrow("[ERROR]");
    });

    test.each(["a", "!"])("숫자가 아닌 문자는 에러를 발생시킨다", (input) => {
      expect(() => LottoNumber.fromString(input)).toThrow("[ERROR]");
    });
  });

  describe("생성자 범위 검증", () => {
    test.each([46, 9999])("45 초과하면 에러를 발생시킨다", (num) => {
      expect(() => new LottoNumber(num)).toThrow("[ERROR]");
    });

    test.each([0, -5])("1 미만이면 에러를 발생시킨다", (num) => {
      expect(() => new LottoNumber(num)).toThrow("[ERROR]");
    });

    test("경계값 1은 정상 생성된다", () => {
      expect(() => new LottoNumber(1)).not.toThrow();
    });

    test("경계값 45는 정상 생성된다", () => {
      expect(() => new LottoNumber(45)).not.toThrow();
    });
  });

  describe("생성자 정수 검증", () => {
    test.each([1.2, -3.3])("소수는 에러를 발생시킨다", (num) => {
      expect(() => new LottoNumber(num)).toThrow("[ERROR]");
    });
  });

  test("getNumber()는 숫자를 반환한다", () => {
    expect(new LottoNumber(7).getNumber()).toBe(7);
  });
});
