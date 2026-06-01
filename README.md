# Solidity Payment Lab

Solidity payment flow를 아주 작은 단계로 실습하는 저장소입니다.

## Goal

1. 로컬 블록체인을 실행합니다.
2. 간단한 Solidity 결제 컨트랙트를 배포합니다.
3. 스크립트로 컨트랙트의 결제 함수를 호출합니다.
4. 트랜잭션 해시와 컨트랙트 잔액을 확인합니다.

## Practice Flow

```text
Hardhat local node
  -> deploy Solidity contract
  -> call payment function
  -> confirm transaction and balance
```

## Local Payment Walkthrough

### 1. 의존성 설치

```bash
npm install
```

### 2. Solidity 컴파일

```bash
npm run compile
```

### 3. 로컬 블록체인 실행

첫 번째 터미널에서 Hardhat 로컬 노드를 실행합니다.

```bash
npm run node
```

이 터미널은 계속 켜둡니다. 배포와 결제는 같은 로컬 블록체인에 보내야 합니다.

### 4. 컨트랙트 배포

두 번째 터미널에서 컨트랙트를 배포합니다.

```bash
npm run deploy
```

예상 출력:

```text
배포 지갑: 0xf39...
SimplePayment 배포 주소: 0x5Fb...
```

배포 주소는 `deployed.localhost.json`에 저장됩니다. 이 파일은 실행 결과물이므로 Git에는 올리지 않습니다.

### 5. 결제 실행

같은 두 번째 터미널에서 결제 스크립트를 실행합니다.

```bash
npm run pay
```

예상 출력:

```text
결제 지갑: 0x709...
결제 대상 컨트랙트: 0x5Fb...
결제 트랜잭션: 0x...
확인된 블록: 2
컨트랙트 잔액: 0.000001 ETH
```

## Why Keep The Node Running?

`npm run node`로 실행한 Hardhat 로컬 노드는 하나의 임시 블록체인입니다.

`npm run deploy`는 이 블록체인에 컨트랙트를 올리고, `npm run pay`는 같은 블록체인에 있는 컨트랙트를 호출합니다.

노드를 끄면 로컬 블록체인 상태가 사라집니다. 그러면 이전에 배포한 컨트랙트 주소도 더 이상 유효하지 않습니다.

## Base Sepolia 준비

로컬 실습이 끝나면 같은 컨트랙트를 Base Sepolia 테스트넷에도 배포할 수 있습니다.

### 1. 테스트넷 전용 지갑 준비

Base Sepolia 배포에는 테스트넷 전용 지갑을 사용합니다.

실제 자산이 들어 있는 메인넷 지갑 개인키는 절대 사용하지 않습니다.

권장 방식:

```text
새 테스트 지갑 생성
-> Base Sepolia ETH 충전
-> 이 실습 저장소의 .env에만 개인키 입력
```

### 2. 환경변수 파일 생성

```bash
cp .env.example .env
```

`.env`에 테스트넷 배포용 지갑 개인키를 넣습니다.

```text
BASE_SEPOLIA_RPC_URL=https://sepolia.base.org
PRIVATE_KEY=테스트넷_지갑_개인키
```

`PRIVATE_KEY`는 `0x`로 시작하는 형식이어도 되고, `0x` 없이 넣어도 됩니다.

`.env`는 `.gitignore`에 포함되어 있으므로 Git에 올라가지 않습니다.

### 3. 테스트넷 ETH 준비

Base Sepolia에 배포하려면 배포 지갑에 Base Sepolia ETH가 필요합니다.

배포 전에 지갑에 테스트넷 ETH가 있는지 확인합니다.

```text
배포 지갑 주소 복사
-> faucet에서 Base Sepolia 선택
-> 테스트넷 ETH 받기
-> 지갑 잔액 확인
```

사용할 수 있는 faucet:

```text
https://console.optimism.io/faucet
```

faucet에서 네트워크가 `Base Sepolia`로 선택되어 있는지 확인합니다.

### 4. Base Sepolia 배포

컴파일을 먼저 확인합니다.

```bash
npm run compile
```

Base Sepolia에 배포합니다.

```bash
npx hardhat run scripts/deploy.js --network baseSepolia
```

예상 출력:

```text
배포 지갑: 0x...
SimplePayment 배포 주소: 0x...
```

배포 주소는 `deployed.baseSepolia.json`에 저장됩니다.

### 5. Base Sepolia 결제 호출

Base Sepolia에 배포한 컨트랙트의 `pay` 함수를 호출할 수도 있습니다.

```bash
npx hardhat run scripts/pay.js --network baseSepolia
```

이 명령은 테스트넷 ETH를 실제로 전송합니다.

현재 스크립트는 `0.000001 ETH`를 보내도록 되어 있습니다. 테스트넷이지만 지갑 잔액이 부족하면 실패합니다.

### 6. Basescan에서 확인

배포 또는 결제 후 출력된 트랜잭션 해시를 Base Sepolia Basescan에서 확인합니다.

```text
https://sepolia.basescan.org/tx/트랜잭션_해시
```

컨트랙트 주소는 아래 주소에서 확인할 수 있습니다.

```text
https://sepolia.basescan.org/address/컨트랙트_주소
```

### 7. 이번 실습 결과

이번 실습에서 Base Sepolia에 배포한 컨트랙트 주소입니다.

```text
0xfd1e91B1C44AAcB1a2294B492eBBe6D17C65fDad
```

컨트랙트 확인 링크:

```text
https://sepolia.basescan.org/address/0xfd1e91B1C44AAcB1a2294B492eBBe6D17C65fDad
```

결제 트랜잭션 해시입니다.

```text
0xce65dfda936837437386dd396692a6780555bb8ad5bbca782be54edd8a2ef458
```

결제 트랜잭션 확인 링크:

```text
https://sepolia.basescan.org/tx/0xce65dfda936837437386dd396692a6780555bb8ad5bbca782be54edd8a2ef458
```

확인 결과:

```text
결제 금액: 0.000001 ETH
컨트랙트 잔액: 0.000001 ETH
트랜잭션 상태: 성공
```

### 8. 자주 나는 오류

`insufficient funds for intrinsic transaction cost`

```text
배포 지갑에 Base Sepolia ETH가 부족합니다.
```

`invalid private key`

```text
.env의 PRIVATE_KEY 값이 잘못되었습니다.
공백이나 따옴표가 들어갔는지 확인합니다.
```

`network does not support ENS`

```text
주소 자리에 실제 0x 주소가 아닌 이름이나 빈 값이 들어갔을 가능성이 큽니다.
```

`could not detect network`

```text
RPC URL에 연결하지 못했습니다.
BASE_SEPOLIA_RPC_URL 값을 확인합니다.
```

## Commit Message Rule

커밋 메시지는 gitmoji와 한국어 설명을 사용합니다.

```text
✨ feat(contract): 간단 결제 컨트랙트 추가

간단한 ETH 결제 컨트랙트를 추가합니다.
```
