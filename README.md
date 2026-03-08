## gitting-good-with-lotto

로또로 Git 브랜칭과 OOP 설계 폐관수련

## 도메인 구조
LottoNumber → Lotto → WinningNumber
Money
Rank → LottoResult
IsRetry

## 컨트롤러 구조
MainController
├── PurchaseLottoController  (구입 금액 → 로또 생성)
└── WinningLottoController   (당첨 확인 → 결과 출력)
