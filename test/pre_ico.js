const BTKToken = artifacts.require("./BTKToken.sol");
const BetokenICO = artifacts.require("./BetokenICO.sol");

const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));

const timeTravel = function (time) {
  return new Promise((resolve, reject) => {
    web3.currentProvider.sendAsync({
      jsonrpc: "2.0",
      method: "evm_increaseTime",
      params: [time], // 86400 is num seconds in day
      id: new Date().getTime()
    }, (err, result) => {
      if(err){ return reject(err) }
      return resolve(result)
    });
  })
}

const mineBlock = function () {
  return new Promise((resolve, reject) => {
    web3.currentProvider.sendAsync({
      jsonrpc: "2.0",
      method: "evm_mine"
    }, (err, result) => {
      if(err){ return reject(err) }
      return resolve(result)
    });
  })
}

contract('BetokenICO', function(accounts) {
	var ownerAddress = accounts[0];
  	var missingBeneficiaryAddress = accounts[5];
  	var beneficiaryAddress = accounts[accounts.length-1];

  	it("owner is the first account", async function(){

    	let meta = await BetokenICO.deployed();
    	let owner = await meta.owner.call();
   		assert.equal(owner, ownerAddress, "owner isn't the first account");
  	})

  	it("should put 20000000 BTK in the contract account", async function() {
	    let tokenMeta = await BTKToken.deployed();
	    let meta = await BetokenICO.deployed();
	    let metaTokensBalance = await tokenMeta.balanceOf.call(meta.address);
	    await tokenMeta.transfer(meta.address, web3.toWei("20000000", 'ether'));
	    let currentContractTokenBalance = await tokenMeta.balanceOf.call(meta.address);
	    assert.equal(web3.fromWei(currentContractTokenBalance.valueOf()), "20000000", "20000000 wasn't in the contract balance");
  	})




	it("try check goal reached and make sure that crowdsale is closed", async function () {

	  let meta = await BetokenICO.deployed();

	  let days_31 = 86400 * 31;

	  await timeTravel(days_31) // 31 days later
	  await mineBlock()
	  let status = await meta.checkGoalReached();
	  let close = await meta.crowdsaleClosed.call();
	  assert.isTrue(close, "crowdsale closed");
	});


	it("user can withdraw funds if the goal is not reached", async function() {
	  let tokenMeta = await BTKToken.deployed();
	  let meta = await BetokenICO.deployed();

	  let status = await meta.checkGoalReached();
	  let close = await meta.crowdsaleClosed.call();
	  let fundingGoalReached = await meta.fundingGoalReached.call();
	  assert.isTrue(close, "crowdsale closed");

	  let contractBalance = await web3.eth.getBalance(meta.address);

	  let testAccount = accounts[7];
	  let testAccountBalance = await web3.eth.getBalance(testAccount);
	  await meta.safeWithdrawal({from: testAccount});

	  testAccountBalance1 = await web3.eth.getBalance(testAccount);

	})
});