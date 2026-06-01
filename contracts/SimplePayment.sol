// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract SimplePayment {
    // 결제가 발생할 때마다 지갑 주소, 금액, 메모를 기록합니다.
    event Paid(address indexed from, address indexed to, uint256 amount, string memo);

    // 컨트랙트를 배포한 지갑을 결제 수신자로 저장합니다.
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    // ETH를 컨트랙트로 보내고 결제 이벤트를 남깁니다.
    function pay(string calldata memo) external payable {
        require(msg.value > 0, "Payment amount must be greater than zero");
        emit Paid(msg.sender, owner, msg.value, memo);
    }

    // 컨트랙트에 쌓인 ETH 잔액을 확인합니다.
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
