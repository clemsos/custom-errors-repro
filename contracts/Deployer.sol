//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol';
import '@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol';
import './B.sol';

// mixin contract
contract Deployer {
  
  // store proxy admin
  ProxyAdmin private proxyAdmin;
  B impl;

  event NewProxy(address indexed newAddress);

  function initialize() public {
    proxyAdmin = new ProxyAdmin();
    impl = new B();
  }

  function create() public {
    // deploy a proxy pointing to impl
    TransparentUpgradeableProxy proxy = new TransparentUpgradeableProxy(
      address(impl), 
      address(proxyAdmin), 
      ''
    );
    address payable proxyAddress = payable(address(proxy));
    emit NewProxy(proxyAddress);
  }

}