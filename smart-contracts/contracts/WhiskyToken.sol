// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CaskTokenContract is ERC1155, Ownable {
    uint256[] private allCasksCreated;
    constructor(address initialOwner) ERC1155("") Ownable(initialOwner) {

    }

    function mintNewCask(address accountTokenBeingSentTo, uint256 id) public {
        bytes memory defaultData = hex"12";
        uint256 amount = 1000;
        _mint(accountTokenBeingSentTo, id, amount, defaultData);
        // call liquidity pool factory to create a new liquidity pool for this token type.
    }
    
    function generatePortfolio(address owner) public view returns (uint256[] memory) {
        // get the number of cask token types that this person has
        uint256 caskTokenCount = 0;

        for (uint256 i = 0; i < allCasksCreated.length; i++) {
            if (balanceOf(owner, allCasksCreated[i]) > 0) {
                caskTokenCount++;
            }
        }
        
        uint256[] memory heldCasks = new uint256[](caskTokenCount);

        uint256 resultIndex = 0;
        for (uint256 i = 0; i < allCasksCreated.length; i++) {
            if (balanceOf(owner, allCasksCreated[i]) > 0) {
                heldCasks[resultIndex] = allCasksCreated[i];
                resultIndex++;
            }
        }

        return heldCasks;
         
    }
    
}
