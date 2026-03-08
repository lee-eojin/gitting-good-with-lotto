import LottoNumber from "./LottoNumber.js";

class WinningNumber {
  static ERROR = Object.freeze({
    NOT_NUMBER: "[ERROR] 보너스 번호는 숫자여야 합니다.",
    NOT_INTEGER: "[ERROR] 보너스 번호는 정수여야 합니다.",
    INVALID_RANGE: `[ERROR] 보너스 번호는 ${LottoNumber.MIN}~${LottoNumber.MAX} 사이의 숫자여야 합니다.`,
    DUPLICATE: "[ERROR] 보너스 번호는 당첨 번호와 중복될 수 없습니다.",
  });

  #winningLotto;
  #bonusNumber;

  static fromString(winningLotto, input) {
    const trimmed = input?.trim() ?? "";
    if (!trimmed) throw new Error(WinningNumber.ERROR.NOT_NUMBER);
    return new WinningNumber(winningLotto, Number(trimmed));
  }

  constructor(lotto, bonusNumber) {
    this.#validate(lotto, bonusNumber);
    this.#winningLotto = lotto;
    this.#bonusNumber = bonusNumber;
  }

  #validate(lotto, bonusNumber) {
    if (Number.isNaN(bonusNumber)) {
      throw new Error(WinningNumber.ERROR.NOT_NUMBER);
    }
    if (!Number.isInteger(bonusNumber)) {
      throw new Error(WinningNumber.ERROR.NOT_INTEGER);
    }
    if (bonusNumber < LottoNumber.MIN || bonusNumber > LottoNumber.MAX) {
      throw new Error(WinningNumber.ERROR.INVALID_RANGE);
    }
    if (lotto.hasNumber(bonusNumber)) {
      throw new Error(WinningNumber.ERROR.DUPLICATE);
    }
  }

  getResult(lotto) {
    const matchCount = this.#winningLotto.getNumbers().filter((num) => lotto.hasNumber(num)).length;
    const hasBonus = lotto.hasNumber(this.#bonusNumber);
    return { matchCount, hasBonus };
  }
}

export default WinningNumber;
