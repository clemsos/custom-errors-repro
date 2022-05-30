const { ethers, upgrades } = require("hardhat");
const { outputJSON } = require('fs-extra')

module.exports = async () => {
  console.log('deployong contract...')
  const B = await ethers.getContractFactory("B");
  const b = await upgrades.deployProxy(B)
  await b.deployed()
  await outputJSON('deployed.json', { address: b.address })
}
