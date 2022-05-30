const { reverts } = require('truffle-assertions')
const { readJSON } = require('fs-extra');
const { ethers } = require('hardhat');

contract("B", function () {
  let b
  
  describe('Using ethers', () => {
    it("Should return the new greeting once it's changed", async function () {
      const { address } = await readJSON('deployed.json')
      b = await ethers.getContractAt('B', address)

      await reverts(
        b.shouldRevert(), 
        "VM Exception while processing transaction: reverted with custom error 'Unauthorized()'"
      )
    });
  })
  
  describe('Using truffle/web3', () => {
    it("Should return the new greeting once it's changed", async function () {
      const { address } = await readJSON('deployed.json')
      const B = artifacts.require('B')

      b = await B.at(address)
      await reverts(
        b.shouldRevert(), 
        "VM Exception while processing transaction: reverted with custom error 'Unauthorized()'"
      )
    });
  })
});
