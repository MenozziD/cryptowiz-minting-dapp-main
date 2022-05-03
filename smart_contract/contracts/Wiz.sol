// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./ERC721Tradable.sol";

/**
 * @title Creature
 * Creature - a contract for my non-fungible creatures.
 */
contract Wiz is ERC721Tradable {
    constructor(address _proxyRegistryAddress)
        ERC721Tradable("Wiz", "WIZ", _proxyRegistryAddress)
    {}

    function baseTokenURI() override public pure returns (string memory) {
        return "ipfs://QmPCk4CoHFcoGjhEGebWsWtZy6CBZ8Qr4zxu1pQvy8Uhtu/";
    }

    function contractURI() public pure returns (string memory) {
        return "";
    }
}