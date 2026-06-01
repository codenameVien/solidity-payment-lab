const { ethers } = require("hardhat");
const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const deployed = JSON.parse(
    fs.readFileSync(`deployed.${hre.network.name}.json`, "utf8")
  );
  const contractAddress = deployed.SimplePayment;

  const [, payer] = await ethers.getSigners();

  console.log("결제 지갑:", payer.address);
  console.log("결제 대상 컨트랙트:", contractAddress);

  // 배포된 SimplePayment 컨트랙트를 결제 지갑으로 연결합니다.
  const simplePayment = await ethers.getContractAt(
    "SimplePayment",
    contractAddress,
    payer
  );

  // pay 함수에 0.01 ETH를 함께 보내 결제를 실행합니다.
  const tx = await simplePayment.pay("첫 번째 로컬 결제", {
    value: ethers.parseEther("0.01")
  });

  console.log("결제 트랜잭션:", tx.hash);

  const receipt = await tx.wait();
  console.log("확인된 블록:", receipt.blockNumber);

  const balance = await simplePayment.getBalance();
  console.log("컨트랙트 잔액:", ethers.formatEther(balance), "ETH");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
