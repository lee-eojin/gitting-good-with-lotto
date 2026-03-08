import generateLottos from "../domain/generateLottos.js";
import InputView from "../view/InputView.js";
import OutputView from "../view/OutputView.js";

class PurchaseLottoController {
  #lottos;
  #purchaseAmount;

  async run() {
    const money = await InputView.readPurchaseAmount();
    const count = money.getMaximumLottoCount();
    this.#purchaseAmount = money.getAmount();
    this.#lottos = generateLottos(count);

    OutputView.printPurchaseCount(count);
    OutputView.printLottos(this.#lottos.map((lotto) => lotto.getNumbers()));
  }

  getLottos() {
    return this.#lottos;
  }

  getPurchaseAmount() {
    return this.#purchaseAmount;
  }
}

export default PurchaseLottoController;
