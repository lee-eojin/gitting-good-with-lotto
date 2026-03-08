class LottoNumber {
  static MIN = 1;
  static MAX = 45;

  static ERROR = Object.freeze({
    BLANK: "[ERROR] 숫자 입력은 공백이 아니어야 합니다.",
    NOT_NUMBER: "[ERROR] 입력은 숫자여야 합니다.",
    NOT_INTEGER: "[ERROR] 입력은 정수여야 합니다.",
    OUT_OF_RANGE: `[ERROR] 로또 번호는 ${LottoNumber.MIN}~${LottoNumber.MAX} 사이의 숫자여야 합니다.`,
  });

  #number;

  constructor(num) {
    this.#validateInteger(num);
    this.#validateRange(num);
    this.#number = num;
  }

  static fromString(numStr) {
    LottoNumber.#validateBlank(numStr);
    LottoNumber.#validateNotNumber(numStr);
    return new LottoNumber(Number(numStr));
  }

  static #validateBlank(numStr) {
    if (!numStr || !numStr.trim()) {
      throw new Error(LottoNumber.ERROR.BLANK);
    }
  }

  static #validateNotNumber(numStr) {
    if (isNaN(numStr)) {
      throw new Error(LottoNumber.ERROR.NOT_NUMBER);
    }
  }

  #validateInteger(num) {
    if (!Number.isInteger(num)) {
      throw new Error(LottoNumber.ERROR.NOT_INTEGER);
    }
  }

  #validateRange(num) {
    if (num < LottoNumber.MIN || num > LottoNumber.MAX) {
      throw new Error(LottoNumber.ERROR.OUT_OF_RANGE);
    }
  }

  getNumber() {
    return this.#number;
  }
}

export default LottoNumber;
