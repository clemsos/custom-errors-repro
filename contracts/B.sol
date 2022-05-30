//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import './A.sol';

contract B is A {
  function shouldRevert() external {
    revert Unauthorized();
  }
}