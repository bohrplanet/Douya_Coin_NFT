var Douya = artifacts.require("./Douya.sol");
var DouyaNFT = artifacts.require("./DouyaNFT.sol");

module.exports = function(deployer) {
  deployer.deploy(Douya).then(async () => {
    var nftInstance = await Douya.deployed();
    await deployer.deploy(DouyaNFT, nftInstance.address);
  });
};
