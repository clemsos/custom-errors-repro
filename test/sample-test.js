const { reverts } = require('truffle-assertions')
const { readJSON } = require('fs-extra');
const { ethers } = require('hardhat');
const { assert } = require('chai');

contract("Main", function () {
  
  
  describe('Using ethers', () => {
    it("Should return the new greeting once it's changed", async function () {
      const { address } = await readJSON('deployed.json')
      const b = await ethers.getContractAt('IMain', address)
      
      await assert.equal(await b.sayHello(), 'hello')
      await reverts(
        b.shouldRevert(), 
        "VM Exception while processing transaction: reverted with custom error 'Unauthorized()'"
      )
    });
  })
  
  describe('Using truffle/web3', () => {
    it("Should return the new greeting once it's changed", async function () {
      const { address } = await readJSON('deployed.json')

      // parse using truffle
      const B = artifacts.require('IMain')
      const b = await B.at(address)

      await assert.equal(await b.sayHello(), 'hello')
      await reverts(
        b.shouldRevert(), 
        "VM Exception while processing transaction: reverted with custom error 'Unauthorized()'"
      )
    });
  })
});
