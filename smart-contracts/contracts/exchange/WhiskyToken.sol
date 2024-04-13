// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";

import {WhiskySwapFactory} from "./WhiskySwapFactory.sol";

contract CaskTokenContract is ERC1155, Ownable, ERC1155Burnable {
    mapping(uint256 => uint256) private _tokenizationTimestamps; // mapping to store the tokenization timestamps
    uint256 public constant annualAppreciationRate = 5; // Fixed annual appreciation rate of the whisky casks (5%)

    uint256[] private allCasksCreated;
    constructor(address initialOwner) ERC1155("") Ownable(initialOwner) {

    }

    function mintNewCask(uint256 id) public {
        bytes memory defaultData = hex"12";
        uint256 amount = 1000;
        address factoryAddress = 0xEc51A870f5397f6eC42D92A62E87b3Bc890B0DD9;
        _mint(factoryAddress, id, amount, defaultData);

        _tokenizationTimestamps[id] = block.timestamp; // Record the tokenization timestamp

        WhiskySwapFactory WhiskeyFactory = WhiskySwapFactory(factoryAddress);
        WhiskeyFactory.createExchange(0xD5Cb53f53A2920C4e5e62908aEE103f702a0BDE5, 0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE, id);

        allCasksCreated.push(id);

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

        // record tokenization time stamps
        for (uint256 i = 0; i < ids.length; i++){
            _tokenizationTimestamps[ids[i]] = block.timestamp;
            allCasksCreated.push(ids[i]);
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
    
    // calculate the current value of a cask based on its age
    function getCurrentValue(uint256 tokenId) public view returns (uint256) {
        require(_tokenizationTimestamps[tokenId] != 0, "Cask has not been tokenized");
        uint256 ageInYears = (block.timestamp - _tokenizationTimestamps[tokenId]) / 1 years;
        uint256 valueMultiplier = 1 + (annualAppreciationRate * ageInYears / 100);
        return valueMultiplier;
    }
}