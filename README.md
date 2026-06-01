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

배포 주소는 `deployed.json`에 저장됩니다. 이 파일은 실행 결과물이므로 Git에는 올리지 않습니다.

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
컨트랙트 잔액: 0.01 ETH
```

## Why Keep The Node Running?

`npm run node`로 실행한 Hardhat 로컬 노드는 하나의 임시 블록체인입니다.

`npm run deploy`는 이 블록체인에 컨트랙트를 올리고, `npm run pay`는 같은 블록체인에 있는 컨트랙트를 호출합니다.

노드를 끄면 로컬 블록체인 상태가 사라집니다. 그러면 이전에 배포한 컨트랙트 주소도 더 이상 유효하지 않습니다.

## Commit Message Rule

커밋 메시지는 gitmoji와 한국어 설명을 사용합니다.

```text
✨ feat(contract): 간단 결제 컨트랙트 추가

간단한 ETH 결제 컨트랙트를 추가합니다.
```
