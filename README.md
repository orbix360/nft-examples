# Interactive NFT Examples

This repository contains examples that you can use to create Zip Archive for NFTs without that you can then upload on  [Minterverse.io](https://minterverse.io)


## Installation

Clone this git repository

`git clone git@github.com:orbix360/nft-examples.git`

Or download it directly from github's interface

## Examples

[Basic HTML with ownership validation](ownership-validation/html-template/README.md)

## Reading the URL Parameters

Some of the NFT examples demonstrate to add code to an NFT 
to enable verification of the ownership of the NFT. 

Adding ownership verification to your Interactive NFT enables such use cases as:
* Show/hide content within the NFT
* Unlock additional functionality within the interactive NFT

In order to enable NFT ownership verification, the Minterverse.io NFT viewer 
passes the following URL parameters to the NFT:

* `viewer` - the wallet address of who is viewing the NFT
* `contract` - the address of the NFT contract that was used to mint the NFT
* `objkt` - the NFT token id

As shown in the examples, these parameters can then be read by adding simple
Javascript code to your NFT:

```javascript
const urlParams = new URLSearchParams(window.location.search);
if (urlParams) {
    const viewer = urlParams.get('viewer');
    const contract = urlParams.get('contract');
    const objkt = urlParams.get('objkt');
    const owner = await getTokenOwner(viewer, contract, objkt);
    const isOwner = viewer && owner && viewer === owner;
    if (isOwner) {
        // show content
    }
}
```

## Querying the Tzkt API

The above example uses a function `getTokenOwner` to get the owner of the NFT:

```javascript
async function getTokenOwner(viewer, contract, objkt){
  return new Promise((resolve, reject) => {
    const url = `https://api.tzkt.io/v1/contracts/${contract}/bigmaps/assets.ledger/keys?key.eq=${objkt}&limit=1&select=value`
    if (contract && objkt && viewer) {
      fetch(url)
        .then(response => response.text())
        .then(resultText => {
          const resultList = JSON.parse(resultText);
          if (resultList && resultList.length > 0) {
            const result = resultList[0];
            resolve(result);
          } else {
            resolve(null);
          }
        });
    } else {
      resolve(null);
    }
  });
}
```

