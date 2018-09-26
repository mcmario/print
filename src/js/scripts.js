function copyToClipboard(elem) {
  let parent = elem.parentNode.parentNode;
  let toCopy = parent.getElementsByTagName('h1')[0];
  let aux = document.createElement('input');
  aux.setAttribute('value', toCopy.innerHTML);
  document.body.appendChild(aux);
  aux.select();
  document.execCommand('copy');
  document.body.removeChild(aux);
}




