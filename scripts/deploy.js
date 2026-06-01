const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("배포 지갑:", deployer.address);

  // SimplePayment 컨트랙트 배포 준비 객체를 가져옵니다.
  const SimplePayment = await ethers.getContractFactory("SimplePayment");

  // 로컬 Hardhat 네트워크에 컨트랙트를 배포합니다.
  const simplePayment = await SimplePayment.deploy();
  await simplePayment.waitForDeployment();

  const address = await simplePayment.getAddress();
  console.log("SimplePayment 배포 주소:", address);

  // 다음 실습 단계에서 결제 스크립트가 주소를 읽을 수 있도록 저장합니다.
  fs.writeFileSync(
    "deployed.json",
    JSON.stringify({ SimplePayment: address }, null, 2)
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

