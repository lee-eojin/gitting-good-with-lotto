import { Console, Random } from "@woowacourse/mission-utils";
import MainController from "../src/controller/MainController.js";

const mockInputs = (inputs) => {
  jest.spyOn(Console, "readLineAsync").mockImplementation(() =>
    Promise.resolve(inputs.shift()),
  );
};

const mockRandoms = (numbers) => {
  jest.spyOn(Random, "pickUniqueNumbersInRange").mockImplementation(() =>
    numbers.shift(),
  );
};

const getPrintSpy = () => {
  const spy = jest.spyOn(Console, "print").mockImplementation(() => {});
  return spy;
};

describe("로또 게임 통합 테스트", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("8000원 구매 시 당첨 통계와 수익률을 올바르게 출력한다", async () => {
    const INPUTS = ["8000", "1,2,3,4,5,6", "7", "n"];
    const RANDOM_NUMBERS = [
      [8, 21, 23, 41, 42, 43], // 0개 일치
      [3, 5, 11, 16, 32, 38],  // 2개 일치 (3, 5)
      [7, 11, 16, 35, 36, 44], // 0개 일치
      [1, 8, 11, 31, 41, 42],  // 1개 일치 (1)
      [13, 14, 16, 38, 42, 45],// 0개 일치
      [7, 11, 30, 40, 42, 43], // 0개 일치
      [2, 13, 22, 32, 38, 45], // 1개 일치 (2)
      [1, 3, 5, 14, 22, 45],   // 3개 일치 (1,3,5) → 5등
    ];
    // 예상: 5등 1개, 수익률 62.5%

    const printSpy = getPrintSpy();
    mockInputs(INPUTS);
    mockRandoms(RANDOM_NUMBERS);

    await new MainController().run();

    const EXPECTED = [
      "3개 일치 (5,000원) - 1개",
      "4개 일치 (50,000원) - 0개",
      "5개 일치 (1,500,000원) - 0개",
      "5개 일치, 보너스 볼 일치 (30,000,000원) - 0개",
      "6개 일치 (2,000,000,000원) - 0개",
      "총 수익률은 62.5%입니다.",
    ];

    EXPECTED.forEach((expected) => {
      expect(printSpy).toHaveBeenCalledWith(expect.stringContaining(expected));
    });
  });

  test("보너스 볼 일치(2등)가 올바르게 집계된다", async () => {
    const INPUTS = ["1000", "1,2,3,4,5,6", "7", "n"];
    const RANDOM_NUMBERS = [
      [1, 2, 3, 4, 5, 7], // 5개 일치 + 보너스 → 2등
    ];

    const printSpy = getPrintSpy();
    mockInputs(INPUTS);
    mockRandoms(RANDOM_NUMBERS);

    await new MainController().run();

    expect(printSpy).toHaveBeenCalledWith(
      expect.stringContaining("5개 일치, 보너스 볼 일치 (30,000,000원) - 1개"),
    );
    expect(printSpy).toHaveBeenCalledWith(
      expect.stringContaining("총 수익률은 3000000.0%입니다."),
    );
  });

  test("1등 당첨 시 올바르게 집계된다", async () => {
    const INPUTS = ["1000", "1,2,3,4,5,6", "7", "n"];
    const RANDOM_NUMBERS = [
      [1, 2, 3, 4, 5, 6], // 6개 일치 → 1등
    ];

    const printSpy = getPrintSpy();
    mockInputs(INPUTS);
    mockRandoms(RANDOM_NUMBERS);

    await new MainController().run();

    expect(printSpy).toHaveBeenCalledWith(
      expect.stringContaining("6개 일치 (2,000,000,000원) - 1개"),
    );
  });

  test("y 입력 시 게임이 재시작되고 통계가 두 번 출력된다", async () => {
    const INPUTS = [
      "2000", "1,2,3,4,5,6", "7", "y",
      "2000", "1,2,3,4,5,6", "7", "n",
    ];
    const RANDOM_NUMBERS = [
      [8, 9, 10, 11, 12, 13], // 1회차 1번 티켓
      [14, 15, 16, 17, 18, 19], // 1회차 2번 티켓
      [8, 9, 10, 11, 12, 13], // 2회차 1번 티켓
      [14, 15, 16, 17, 18, 19], // 2회차 2번 티켓
    ];

    const printSpy = getPrintSpy();
    mockInputs(INPUTS);
    mockRandoms(RANDOM_NUMBERS);

    await new MainController().run();

    // 당첨 통계 헤더가 두 번 출력되어야 함
    const statisticsHeaderCalls = printSpy.mock.calls.filter(
      (call) => call[0] === "\n당첨 통계",
    );
    expect(statisticsHeaderCalls).toHaveLength(2);
  });

  test("잘못된 구매금액 입력 시 재입력을 받는다", async () => {
    const INPUTS = ["abc", "500", "1500", "2000", "1,2,3,4,5,6", "7", "n"];
    const RANDOM_NUMBERS = [
      [8, 9, 10, 11, 12, 13],
      [14, 15, 16, 17, 18, 19],
    ];

    const printSpy = getPrintSpy();
    mockInputs(INPUTS);
    mockRandoms(RANDOM_NUMBERS);

    await new MainController().run();

    const errorCalls = printSpy.mock.calls.filter(
      (call) => typeof call[0] === "string" && call[0].startsWith("[ERROR]"),
    );
    // abc(숫자아님), 500(최소미만), 1500(배수아님) → 3번 에러
    expect(errorCalls.length).toBeGreaterThanOrEqual(3);
  });

  test("잘못된 당첨번호 입력 시 재입력을 받는다", async () => {
    const INPUTS = [
      "1000",
      "1,2,3,4,5",     // 6개 미만
      "1,2,3,4,5,5",   // 중복
      "1,2,3,4,5,6",   // 정상
      "7",
      "n",
    ];
    const RANDOM_NUMBERS = [[8, 9, 10, 11, 12, 13]];

    const printSpy = getPrintSpy();
    mockInputs(INPUTS);
    mockRandoms(RANDOM_NUMBERS);

    await new MainController().run();

    const errorCalls = printSpy.mock.calls.filter(
      (call) => typeof call[0] === "string" && call[0].startsWith("[ERROR]"),
    );
    expect(errorCalls.length).toBeGreaterThanOrEqual(2);
  });
});
