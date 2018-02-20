var BTKToken = artifacts.require("./BTKToken.sol");
var BetokenICO = artifacts.require("./BetokenICO.sol");

module.exports = function(deployer, network, accounts) {
	var beneficiary = accounts[accounts.length - 1];
	deployer.deploy(BTKToken).then(function(){
		return deployer.deploy(BetokenICO, beneficiary, 100, 86400*30, 10, BTKToken.address);
	});
}