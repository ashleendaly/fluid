// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CaskTokenContract is ERC1155, Ownable {
    unit265[] private allCasksCreated;
    constructor(address initialOwner) ERC1155("") Ownable(initialOwner) {

    }

    function mintNewCask(address accountTokenBeingSentTo, uint256 id, bytes memory data) public {
        bytes memory defaultData = hex"12";
        uint256 amount = 1000;
        _mint(accountTokenBeingSentTo, id, amount, data);
        // call liquidity pool factory
    }
    
    function generatePortfolio(address owner) public view returns (uint256[] memory) {
        // get the number of cask token types that this person has
        uint265 caskTokenTypeCount = 0;
         
    }
    
}
