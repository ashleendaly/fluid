// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Counter {
    uint private count;  // private variable to store the count

    // Event that is emitted whenever the count is updated
    event CountUpdated(uint newCount);

    // Constructor to initialize the counter
    constructor() {
        count = 0;
    }

    // Function to get the current count
    function getCount() public view returns (uint) {
        return count;
    }

    // Function to increment the count by 1
    function increment() public {
        count += 1;
        emit CountUpdated(count);  // Emitting event after updating the count
    }

    // Function to decrement the count by 1
    function decrement() public {
        require(count > 0, "Counter: decrement overflow");
        count -= 1;
        emit CountUpdated(count);  // Emitting event after updating the count
    }
}
