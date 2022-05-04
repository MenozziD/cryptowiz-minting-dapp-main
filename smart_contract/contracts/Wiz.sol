// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./ERC721Tradable.sol";

/**
 * @title Creature
 * Creature - a contract for my non-fungible creatures.
 */
contract Wiz is ERC721Tradable {
    constructor(address _proxyRegistryAddress)
        ERC721Tradable("Wiz1", "WIZ", _proxyRegistryAddress)
    {}

    function baseTokenURI() override public pure returns (string memory) {
        return "ipfs://Qmc4Hi6riJWvqEBM4eokvYjUUXyxTYjkM6SiiWxEVxzHk3/";
    }

    function contractURI() public pure returns (string memory) {
        return "";
    }
}