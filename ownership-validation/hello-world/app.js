
/*
    A function handleTokenOwnershipValidated needs to be defined which takes a single boolean parameter
    which is true if the token is owned by the user and false if not.  Inside of this function you can
    write the conditional logic based on the value of the boolean.
 */
function handleTokenOwnershipValidated(tokenOwnershipValidated) {
  console.log('**** handleTokenOwnershipValidated ****');
  window.helloWorldValidated = tokenOwnershipValidated;
  const ownedMessage = document.getElementById('owned-message');
  const notOwnedMessage = document.getElementById('not-owned-message');
  if(tokenOwnershipValidated){
    /* this is an example of showing or hiding content based on the token ownership */
    console.log('**** token ownership validated, show hidden content ****');
    if (ownedMessage && notOwnedMessage) {
      ownedMessage.style.display = 'block';
      notOwnedMessage.style.display = 'none';
    }
  } else {
    console.log('**** token ownership not validated, hide hidden content ****');
    if (ownedMessage && notOwnedMessage) {
      ownedMessage.style.display = 'none';
      notOwnedMessage.style.display = 'block';
    }
  }
}
