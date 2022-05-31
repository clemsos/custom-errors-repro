//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol';
import '@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol';
import './Main.sol';

// mixin contract
contract Deployer {
  
  // store proxy admin
  ProxyAdmin private proxyAdmin;
  Main impl;

  event NewProxy(address indexed newAddress);

  function initialize() public {
    proxyAdmin = new ProxyAdmin();
    impl = new Main();
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