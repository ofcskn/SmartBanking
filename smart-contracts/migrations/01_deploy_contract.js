const SecureBanking = artifacts.require('SecureBanking');

module.exports = function (deployer) {
  deployer.deploy(SecureBanking, { value: 1000000000000000000 });
};
