//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

interface IMain {
  function sayHello() pure external returns(string memory);
  function shouldRevert() external;
}