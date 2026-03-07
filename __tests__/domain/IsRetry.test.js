import IsRetry from "../../src/domain/IsRetry.js";

describe("IsRetry 테스트", () => {
  test.each(["y", "Y"])("'%s' 입력 시 true를 반환한다", (input) => {
    expect(new IsRetry(input).get()).toBe(true);
  });

  test.each(["n", "N"])("'%s' 입력 시 false를 반환한다", (input) => {
    expect(new IsRetry(input).get()).toBe(false);
  });

  test.each(["a", "1", " ", "yes", "no"])("'%s' 입력 시 에러를 발생시킨다", (input) => {
    expect(() => new IsRetry(input)).toThrow("[ERROR]");
  });
});
