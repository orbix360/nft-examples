# Basic Ownership Verification

This example shows a very basic example of an NFT that shows or hides content 
based on verifying the ownership of the NFT.

## Contents

This project contains the following files:

- `index.html` - Simple HTML that defines 2 divs that are hidden or shown based on ownership of NFT.
- `app.js` - contains simple javascript to read the URL parameters and use those to query the Tzkt API
to determine if the NFT is owned by the current user.

## Reading the URL Parameters

In order to enable NFT ownership verification, the Minterverse.io NFT viewer
passes the following URL parameters to the NFT:

* `viewer` - the wallet address of who is viewing the NFT
* `contract` - the address of the NFT contract that was used to mint the NFT
* `objkt` - the NFT token id

These parameters can then be read by adding simple
Javascript code to your NFT:

```javascript
const urlParams = new URLSearchParams(window.location.search);
if (urlParams) {
    const viewer = urlParams.get('viewer');
    const contract = urlParams.get('contract');
    const objkt = urlParams.get('objkt');
    const owner = await getTokenOwner(viewer, contract, objkt);
    const isOwner = viewer && owner && viewer === owner;
    handleTokenOwnershipValidated(isOwner);
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
