// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";

import {WhiskySwapFactory} from "./WhiskySwapFactory.sol";
import {WhiskySwapExchange} from "./WhiskySwapExchange.sol";

contract CaskTokenContract is ERC1155, ERC1155Burnable {
    mapping(uint256 => uint256) private _tokenizationTimestamps; // mapping to store the tokenization timestamps
    uint256 public constant annualAppreciationRate = 5; // Fixed annual appreciation rate of the whisky casks (5%)

    struct LiquidityAdditionParams {
        uint256[] maxCurrency;
        uint256 deadline;
    }


    uint256[] private allCasksCreated;
    constructor() ERC1155("") {}

    function newCask(uint256 id) public {
        bytes memory defaultData = hex"12";
        uint256 amount = 1000;
        _mint(msg.sender, id, amount, defaultData);
        WhiskySwapFactory WhiskeyFactory = WhiskySwapFactory(0x50E8dD23dAa38A2C3384c49A90b079426d781838);
        address token = address(this);
        address currency = 0x1D2F0da169ceB9fC7B3144628dB156f3F6c60dBE;
        uint256 LPFee = 10;
        WhiskeyFactory.createExchange(token, currency, LPFee, id);
        address exchangeAddress = WhiskeyFactory.tokensToExchange(token, currency,LPFee, id);
        addLiquidityToExchange(exchangeAddress, id);
    }

    function addLiquidityToExchange(address exchangeAddress, uint256 id) public {
        WhiskySwapExchange exchange = WhiskySwapExchange(exchangeAddress);
        uint256[] memory ids = new uint256[](1);
        uint256[] memory amounts = new uint256[](1);
        uint256[] memory _maxCurrency = new uint256[](1);

        ids[0] = id;
        amounts[0] = 1000;  
        _maxCurrency[0] = 1000; 

        exchange._addLiquidity(msg.sender, ids, amounts, _maxCurrency, block.timestamp + 50 minutes);
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
        uint256 ageInYears = (block.timestamp - _tokenizationTimestamps[tokenId]) / 525600 minutes;
        uint256 valueMultiplier = 1 + (annualAppreciationRate * ageInYears / 100);
        return valueMultiplier;
    }
}