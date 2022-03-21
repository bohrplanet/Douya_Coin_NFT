var Douya = artifacts.require("./Douya.sol");
var DouyaNFT = artifacts.require("./DouyaNFT.sol");
var Market = artifacts.require("./Market.sol");

module.exports = function(deployer) {
  deployer.deploy(Douya).then(async () => {
    var nftInstance = await Douya.deployed();
    await deployer.deploy(DouyaNFT, nftInstance.address).then(async () => {
      var marketInstance = await DouyaNFT.deployed();
      await deployer.deploy(Market, nftInstance.address, marketInstance.address);
    });
  });
};
