const { ethers, upgrades } = require("hardhat");
const { outputJSON } = require('fs-extra')

module.exports = async () => {
  console.log('deploying contract...')
  const Deployer = await ethers.getContractFactory("Deployer");
  const f = await upgrades.deployProxy(Deployer)
  await f.deployed()

  const tx = await f.create()
  const { events } = await tx.wait()
  const { args } = events.find(({ event }) => event === 'NewProxy')
  
  // save addresses
  await outputJSON('deployed.json', { 
    address: args.newAddress,
    deployer: f.address,
  })
}
