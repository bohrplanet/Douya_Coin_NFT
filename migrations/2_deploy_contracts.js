var Douya = artifacts.require("./Douya.sol");
var DouyaNFT = artifacts.require("./DouyaNFT.sol");
var Market = artifacts.require("./Market.sol");
var TokenBank = artifacts.require("./TokenBank.sol");

module.exports = async function(deployer) {

  await deployer.deploy(Douya)
  const douyaToken = await Douya.deployed()

  await deployer.deploy(TokenBank, douyaToken.address)
  // const tokenBank = await TokenBank.deployed()

  await deployer.deploy(DouyaNFT, douyaToken.address)
  const douyaNFT = await DouyaNFT.deployed()

  await deployer.deploy(Market, douyaToken.address, douyaNFT.address)
  const market = await Market.deployed()

  // grant role
  await douyaToken.setRole(douyaNFT.address)
  await douyaToken.setRole(market.address)
  await douyaNFT.setRole(market.address)

  // set BaseURI
  await douyaNFT.setBaseURI("https://gateway.pinata.cloud/ipfs/QmZcdctuSNaW4Eyo1xD3ueE4HKXwHsMmZeyGq5Gq5Zk55v/")
  await douyaNFT.setNotRevealedURI("https://gateway.pinata.cloud/ipfs/QmRmuhXvmiojStoVrHhmLh8ihsQv2m8Af5ftGEKKoN8FEw")

  // open sale active and open reveal
  await douyaNFT.flipSaleActive()
  await douyaNFT.flipReveal()
};
