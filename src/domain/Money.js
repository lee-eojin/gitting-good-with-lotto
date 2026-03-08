class Money {
  static UNIT = 1000;
  static MAX_TICKETS = 50;

  static ERROR = Object.freeze({
    NOT_NUMBER: "[ERROR] 입력은 숫자여야 합니다.",
    INSUFFICIENT_AMOUNT: `[ERROR] 구입금액은 ${Money.UNIT}원 이상이어야 합니다.`,
    NOT_MULTIPLE: `[ERROR] 구입금액은 ${Money.UNIT}원 단위여야 합니다.`,
    EXCEEDED_MAX: `[ERROR] 로또는 최대 ${Money.MAX_TICKETS}장까지 구매할 수 있습니다.`,
  });

  #amount;

  static fromString(input) {
    const trimmedInput = input?.trim() ?? "";
    if (!trimmedInput) throw new Error(Money.ERROR.NOT_NUMBER);
    return new Money(Number(trimmedInput));
  }

  constructor(amount) {
    this.#validate(amount);
    this.#amount = amount;
  }

  #validate(amount) {
    if (isNaN(amount)) {
      throw new Error(Money.ERROR.NOT_NUMBER);
    }
    if (amount < Money.UNIT) {
      throw new Error(Money.ERROR.INSUFFICIENT_AMOUNT);
    }
    if (amount % Money.UNIT) {
      throw new Error(Money.ERROR.NOT_MULTIPLE);
    }
    if (amount > Money.UNIT * Money.MAX_TICKETS) {
      throw new Error(Money.ERROR.EXCEEDED_MAX);
    }
  }

  //생성자에서 이미 1000원 단위 검사를 통과해서 Math.floor 안썼음
  getMaximumLottoCount() {
    return this.#amount / Money.UNIT;
  }

  getAmount() {
    return this.#amount;
  }
}

export default Money;
