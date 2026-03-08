import InputView from "../view/InputView.js";
import PurchaseLottoController from "./PurchaseLottoController.js";
import WinningLottoController from "./WinningLottoController.js";

class MainController {
  async run() {
    while (true) {
      await this.#playOnce();
      if (!(await InputView.readIsRetry())) return;
    }
  }

  async #playOnce() {
    const purchaseController = new PurchaseLottoController();
    await purchaseController.run();

    const winningController = new WinningLottoController(
      purchaseController.getLottos(),
      purchaseController.getPurchaseAmount(),
    );
    await winningController.run();
  }
}

export default MainController;
