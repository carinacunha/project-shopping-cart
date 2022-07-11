const fetchProducts = async () => {
  // seu código aqui
  const response = await fetch('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  const data = await response.json();
  return data;
};

const createProductItemElement = async () => {
  const items = await fetchProducts();
  const itemsList = document.getElementsByClassName('items')[0];
  items.results.forEach((item) => {
    const block = document.createElement('div');
    block.className = 'item';
    const ident = document.createElement('ul');
    const name = document.createElement('ul');
    const image = document.createElement('img');
    const { id, title, thumbnail } = item;
    ident.innerText = id;
    name.innerHTML = title;
    image.src = thumbnail;
    itemsList.appendChild(block);
    block.appendChild(ident);
    block.appendChild(name);
    block.appendChild(image);
  });
};

console.log(createProductItemElement());
if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
