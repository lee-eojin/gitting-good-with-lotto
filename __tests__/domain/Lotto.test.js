import Lotto from "../../src/domain/Lotto.js";

describe("Lotto 테스트", () => {
  describe("생성자 검증", () => {
    test("6개가 아니면 에러를 발생시킨다", () => {
      expect(() => new Lotto([1, 2, 3, 4, 5, 6, 7])).toThrow("[ERROR]");
      expect(() => new Lotto([1, 2, 3, 4, 5])).toThrow("[ERROR]");
    });

    test("중복 번호가 있으면 에러를 발생시킨다", () => {
      expect(() => new Lotto([1, 1, 2, 3, 4, 5])).toThrow("[ERROR]");
    });

    test("범위를 벗어난 번호는 에러를 발생시킨다 (최소 미만)", () => {
      expect(() => new Lotto([0, 1, 2, 3, 4, 5])).toThrow("[ERROR]");
    });

    test("범위를 벗어난 번호는 에러를 발생시킨다 (최대 초과)", () => {
      expect(() => new Lotto([1, 2, 3, 4, 5, 46])).toThrow("[ERROR]");
    });
  });

  describe("fromString 검증", () => {
    test("쉼표 구분 문자열로 Lotto를 생성한다", () => {
      expect(Lotto.fromString("1,2,3,4,5,6").getNumbers()).toEqual([1, 2, 3, 4, 5, 6]);
    });

    test("공백이 포함된 문자열도 파싱한다", () => {
      expect(Lotto.fromString("1, 2, 3, 4, 5, 6").getNumbers()).toEqual([1, 2, 3, 4, 5, 6]);
    });

    test("숫자가 아닌 값이 포함되면 에러를 발생시킨다", () => {
      expect(() => Lotto.fromString("1,2,3,4,5,a")).toThrow("[ERROR]");
    });
  });

  test("번호를 오름차순으로 반환한다", () => {
    const lotto = new Lotto([6, 5, 4, 3, 2, 1]);
    expect(lotto.getNumbers()).toEqual([1, 2, 3, 4, 5, 6]);
  });

  describe("hasNumber 테스트", () => {
    const lotto = new Lotto([1, 2, 3, 4, 5, 6]);

    test("포함된 번호는 true를 반환한다", () => {
      expect(lotto.hasNumber(1)).toBe(true);
    });

    test("포함되지 않은 번호는 false를 반환한다", () => {
      expect(lotto.hasNumber(45)).toBe(false);
    });
  });
});
