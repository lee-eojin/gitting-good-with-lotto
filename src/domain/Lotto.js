import LottoNumber from "./LottoNumber.js";

class Lotto {
  static ERROR = Object.freeze({
    INVALID_SIZE: "[ERROR] 로또 번호는 6개여야 합니다.",
    DUPLICATE: "[ERROR] 로또 번호는 중복될 수 없습니다.",
  });

  static SIZE = 6;

  #numbers;

  static fromString(input) {
    return new Lotto(input.split(",").map((n) => LottoNumber.fromString(n.trim()).getNumber()));
  }

  constructor(numbers) {
    this.#validateSize(numbers);
    this.#validateDuplicates(numbers);
    this.#numbers = numbers.map((num) => new LottoNumber(num)).sort((a, b) => a.getNumber() - b.getNumber());
  }

  #validateSize(numbers) {
    if (numbers.length !== Lotto.SIZE) {
      throw new Error(Lotto.ERROR.INVALID_SIZE);
    }
  }

  #validateDuplicates(numbers) {
    if (new Set(numbers).size !== numbers.length) {
      throw new Error(Lotto.ERROR.DUPLICATE);
    }
  }

  hasNumber(number) {
    return this.#numbers.some((lottoNum) => lottoNum.getNumber() === number);
  }

  getNumbers() {
    return this.#numbers.map((lottoNum) => lottoNum.getNumber());
  }
}

export default Lotto;
