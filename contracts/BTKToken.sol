pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/token/StandardToken.sol';

contract BetokenToken is StandardToken {

    string public name = "Betoken";
    string public symbol = "BTK";
    uint8 public decimals = 9;
    uint256 public INITIAL_SUPPLY = 200000000 * (10 ** decimals);

    function BetokenToken() public {
        totalSupply = INITIAL_SUPPLY;
        balances[msg.sender] = INITIAL_SUPPLY;
    }
}
