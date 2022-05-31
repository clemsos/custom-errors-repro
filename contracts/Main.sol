//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import './Partial.sol';

contract Main is Partial {
  // main contract
  function sayHello() pure external returns(string memory) {
    return 'hello';
  }
}