import { Console } from "@woowacourse/mission-utils";
import { INFO } from "../constants/messages.js";
import IsRetry from "../domain/isRetry.js";
import Lotto from "../domain/Lotto.js";
import Money from "../domain/Money.js";
import WinningNumber from "../domain/WinningNumber.js";

class InputView {
  static async #robustInput(readline, factory) {
    while (true) {
      try {
        const input = await readline();
        return factory(input);
      } catch (e) {
        Console.print(e.message);
      }
    }
  }

  static readPurchaseAmount() {
    return this.#robustInput(
      () => Console.readLineAsync(INFO.PURCHASE_AMOUNT),
      (input) => Money.fromString(input),
    );
  }

  static readWinningNumbers() {
    return this.#robustInput(
      () => Console.readLineAsync(INFO.WINNING_NUMBERS),
      (input) => Lotto.fromString(input),
    );
  }

  static readBonusNumber(winningLotto) {
    return this.#robustInput(
      () => Console.readLineAsync(INFO.BONUS_NUMBER),
      (input) => WinningNumber.fromString(winningLotto, input),
    );
  }

  static readIsRetry() {
    return this.#robustInput(
      () => Console.readLineAsync(INFO.ASK_RETRY),
      (input) => new IsRetry(input.trim()).get(),
    );
  }
}

export default InputView;
