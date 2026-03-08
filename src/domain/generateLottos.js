import { Random } from "@woowacourse/mission-utils";
import Lotto from "./Lotto.js";
import LottoNumber from "./LottoNumber.js";

const generateLottos = (count) =>
  Array.from(
    { length: count },
    () => new Lotto(Random.pickUniqueNumbersInRange(LottoNumber.MIN, LottoNumber.MAX, Lotto.SIZE)),
  );

export default generateLottos;
