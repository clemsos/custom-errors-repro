const { reverts } = require('truffle-assertions')
const { readJSON } = require('fs-extra');
const { ethers } = require('hardhat');
const { assert } = require('chai');

contract("Main", function () {
  describe('Using ethers', () => {
    it("Should return the new greeting once it's changed", async function () {

      // get deployer
      const { deployer : deployerAddress } = await readJSON('deployed.json')
      const f = await ethers.getContractAt('Deployer', deployerAddress)

      // create instance
      const tx = await f.create()
      const { events } = await tx.wait()
      const { args } = events.find(({ event }) => event === 'NewProxy')
      const {newAddress} = args

      const b = await ethers.getContractAt('IMain', newAddress)
      
      await assert.equal(await b.sayHello(), 'hello')
      await reverts(
        b.shouldRevert(), 
        "VM Exception while processing transaction: reverted with custom error 'Unauthorized()'"
      )
    });
  })
  
  describe('Using truffle/web3', () => {
    it("Should return the new greeting once it's changed", async function () {

      // get deployer
      const { deployer : deployerAddress } = await readJSON('deployed.json')
      const Deployer = artifacts.require('Deployer')
      const d = await Deployer.at(deployerAddress)

      // create instance
      const tx = await d.create()
      const { args } = tx.logs.find(({ event }) => event === 'NewProxy')
      const { newAddress} = args

      // create instance
      const B = artifacts.require('Main')
      const b = await B.at(newAddress)

      await assert.equal(await b.sayHello(), 'hello')
      await reverts(
        b.shouldRevert(), 
        "VM Exception while processing transaction: reverted with custom error 'Unauthorized()'"
      )
    });
  })
});
