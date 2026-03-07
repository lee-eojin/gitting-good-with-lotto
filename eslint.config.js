import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    rules: {
      "no-unused-vars": "error",       // 선언만 하고 사용 안 한 변수
      "no-undef": "error",             // 선언하지 않은 변수 사용
      "no-console": "warn",            // console.log 남겨둔 거 경고
      "eqeqeq": "error",              // == 대신 === 써야 함
      "no-var": "error",              // var 사용 금지 (let/const 써야 함)
      "prefer-const": "error",        // 재할당 없으면 const 써야 함
    },
  },
];
