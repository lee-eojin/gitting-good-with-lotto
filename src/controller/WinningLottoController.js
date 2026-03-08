import LottoResult from "../domain/LottoResult.js";
import InputView from "../view/InputView.js";
import OutputView from "../view/OutputView.js";

class WinningLottoController {
  #lottos;
  #purchaseAmount;

  constructor(lottos, purchaseAmount) {
    this.#lottos = lottos;
    this.#purchaseAmount = purchaseAmount;
  }

  async run() {
    const winningLotto = await InputView.readWinningNumbers();
    const winningNumber = await InputView.readBonusNumber(winningLotto);

    const result = new LottoResult(this.#lottos, winningNumber);
    const prizeList = result.getPrizeList();
    const profitRate = result.getProfitRate(this.#purchaseAmount);

    OutputView.printStatistics({ prizeList, profitRate });
  }
}

export default WinningLottoController;
