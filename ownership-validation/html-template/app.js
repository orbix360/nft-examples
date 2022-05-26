
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

function handleTokenOwnershipValidated(isOwner) {
  const ownedMessage = document.getElementById('owned-message');
  const notOwnedMessage = document.getElementById('not-owned-message');
  if(isOwner){
    /* this is an example of showing or hiding content based on the token ownership */
    if (ownedMessage && notOwnedMessage) {
      ownedMessage.style.display = 'block';
      notOwnedMessage.style.display = 'none';
    }
  } else {
    if (ownedMessage && notOwnedMessage) {
      ownedMessage.style.display = 'none';
      notOwnedMessage.style.display = 'block';
    }
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams) {
    const viewer = urlParams.get('viewer');
    const contract = urlParams.get('contract');
    const objkt = urlParams.get('objkt');
    const owner = await getTokenOwner(viewer, contract, objkt);
    const isOwner = viewer && owner && viewer === owner;
    handleTokenOwnershipValidated(isOwner);
  }
});
