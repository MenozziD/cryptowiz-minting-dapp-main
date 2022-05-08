pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

//SPDX-License-Identifier: Test

contract CryptoWiz_ITMb is ERC1155, Ownable {

    using Strings for uint256;
    
    string public name;
    string public symbol;
    string public baseURI; 
    string public baseExtension = ".json";
    uint256 private selTokenID = 1;

    mapping(uint256 => uint256) private _supply;
    uint256 private gen_index = 0;

    constructor(string memory uri) ERC1155("") {
        name = "CryptoWiz_ITMb";
        symbol = "CWIZitmb";
        setBaseURI(uri);
    }

    function mint(
        address _to,
        uint256 _quantity,
        string memory _hash
    ) public onlyOwner virtual {
        _supply[selTokenID] += _quantity;
        _mint(_to, selTokenID, _quantity, "");
    }

    function MyMint(
        address _to
    )     
    external 
    payable {
        _supply[selTokenID] += 1;
        _mint(_to, selTokenID, 1, "");
    }

    function exists(uint256 _id) public view returns (bool) {
        return _supply[_id] > 0;
    }

    function totalSupply(uint256 _id) public view returns (uint256) {
        return _supply[_id];
    }

    function uri(uint256 tokenId) public view virtual override returns (string memory) 
    {
        require(
            _supply[tokenId] > 0 ,
            "ERC721Metadata: URI query for nonexistent token"
        );

        string memory currentBaseURI = _baseURI();
    
        return
            bytes(currentBaseURI).length > 0
                ? string(
                    abi.encodePacked(
                        currentBaseURI,
                        tokenId.toString(),
                        baseExtension
                    )
                )
                : "";
    }

    function burn(address from, uint256 id, uint256 amount) public onlyOwner {
        _burn(from, id, amount);
    }

    function setSelTokenID(uint256 _tokenId) public onlyOwner {
        selTokenID = _tokenId;
    }    

    function setBaseURI(string memory _tokenBaseURI) public onlyOwner {
        baseURI = _tokenBaseURI;
    }

    function _baseURI() internal view returns (string memory) {
        return baseURI;
    }

}