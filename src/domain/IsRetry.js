class IsRetry {
  static ERROR = Object.freeze({
    INVALID: "[ERROR] y 또는 n을 입력해야 합니다.",
  });

  #isRetry;

  constructor(input) {
    this.#validate(input);
    this.#isRetry = ["y", "Y"].includes(input);
  }

  #validate(input) {
    if (!["y", "Y", "n", "N"].includes(input)) {
      throw new Error(IsRetry.ERROR.INVALID);
    }
  }

  get() {
    return this.#isRetry;
  }
}

export default IsRetry;
