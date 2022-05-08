/**
 *  This script will calculate the constructor arguments for the `verify` function and call it.
 *  You can use this script to verify the contract on etherscan.io.
 */

require('@nomiclabs/hardhat-etherscan')
const hre = require('hardhat')
const { MerkleTree } = require('merkletreejs')
const keccak256 = require('keccak256')
const whitelist = require('./whitelist.js')

const BASE_URI = 'ipfs://Qmb1XBc2VTJH6CYR2eCZTMTMRuTEin6c5vhiAz9V8F9GmR/' // X ITEM
//const BASE_URI = 'ipfs://QmWBtCxqf21RqW3k6f8ENEqg5e8kKnt9tSjcZM4vNeytN5/' // X PG

const proxyRegistryAddressRinkeby = '0xf57b2c51ded3a29e6891aba85459d600256cf317'
const proxyRegistryAddressMainnet = '0xa5409ec958c83c3f309868babaca7c86dcb077c1'

async function main() {
  // Calculate merkle root from the whitelist array
  const leafNodes = whitelist.map((addr) => keccak256(addr))
  const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true })
  const root = merkleTree.getRoot()

  await hre.run('verify:verify', {
    address: '0x9B9d547A6D4f4eba05d7049e38DeF0c9e0269e55', // Deployed contract address
    //constructorArguments: [BASE_URI, root, proxyRegistryAddressRinkeby] // X PG
    constructorArguments: [BASE_URI] // X ITEM
  })
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
