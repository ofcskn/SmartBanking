const SecureBanking = artifacts.require('SecureBanking');

module.exports = function (deployer) {
  deployer.deploy(SecureBanking, { value: 5000000000000000000 });
};
