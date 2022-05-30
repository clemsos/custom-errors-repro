//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import './Errors.sol';

// mixin contract
contract B is Errors {
  function shouldRevert() external {
    revert Unauthorized();
  }
}