// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";

import {WhiskySwapFactory} from "./WhiskySwapFactory.sol";

contract CaskTokenContract is ERC1155, Ownable {
    uint256[] private allCasksCreated;
    constructor(address initialOwner) ERC1155("") Ownable(initialOwner) {

    }

    function mintNewCask(uint256 id) public {
        bytes memory defaultData = hex"12";
        uint256 amount = 1000;
        address factoryAddress = 0xEc51A870f5397f6eC42D92A62E87b3Bc890B0DD9;
        _mint(factoryAddress, id, amount, defaultData);

        WhiskySwapFactory WhiskeyFactory = WhiskySwapFactory(factoryAddress);

        // WhiskeyFactory.createExchange(0xD5Cb53f53A2920C4e5e62908aEE103f702a0BDE5, currencyaddress (dont know what these are), id)

    }
    
    function mintBatch(address to, uint256[] memory ids, bytes memory data) public {
        // get the size of the ids list
        uint256 numberOfCasksinBatch = ids.length;
        // amounts = size of the id list * 1000
        uint256[] memory amounts = new uint256[] (numberOfCasksinBatch);
        for (uint256 i = 0; i < numberOfCasksinBatch; i++){
            amounts[i] = 1000;
        }
        _mintBatch(to, ids, amounts, data);
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