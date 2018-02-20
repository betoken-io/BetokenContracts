pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/token/ERC20/StandardToken.sol';

contract BTKToken is StandardToken {

    string public name = "Betoken";
    string public symbol = "BTK";
    uint8 public decimals = 9;
    uint256 public INITIAL_SUPPLY = 200000000 * (10 ** uint256(decimals));

    function BTKToken() public {
        totalSupply_ = INITIAL_SUPPLY;
        balances[msg.sender] = INITIAL_SUPPLY;
    }
}
