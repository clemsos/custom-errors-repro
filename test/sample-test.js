const { reverts } = require('truffle-assertions')
const { readJSON } = require('fs-extra');
const { ethers } = require('hardhat');

contract("B", function () {
  let b
  before(async () => {
    const { address } = await readJSON('deployed.json')
    b = await ethers.getContractAt('B', address)
  })

  it("Should return the new greeting once it's changed", async function () {
    await reverts(
      b.shouldRevert(), 
      "VM Exception while processing transaction: reverted with custom error 'Unauthorized()'"
    )
  });
});
