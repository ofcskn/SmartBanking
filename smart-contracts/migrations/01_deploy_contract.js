const SecureBanking = artifacts.require('SecureBanking');

module.exports = function (deployer) {
  deployer.deploy(SecureBanking);
};
