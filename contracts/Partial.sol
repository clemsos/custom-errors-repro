//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import './Errors.sol';

// mixin contract
contract Partial is Errors {
  function _isAuthorized() internal view {
    if(msg.sender != address(0)) {
      revert Unauthorized();
    }
  }

  function shouldRevert() external {
    _isAuthorized();
  }
}