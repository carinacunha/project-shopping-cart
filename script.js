const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';
  
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const final = async () => {
  const response = await fetchProducts('computador');
  const { results } = response;
  results.forEach((item) => {
    const selected = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    const createdSection = createProductItemElement(selected);
    const firstSection = document.getElementsByClassName('items')[0];
    firstSection.appendChild(createdSection);
  });
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  const { target } = event;
  target.parentNode.removeChild(target);
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const fetchItems = async (idProduct) => {
  const response = await fetchItem(idProduct);
  const { id, title, price } = response;
  const item = {
    sku: id,
    name: title,
    salePrice: price,
  };
  const newCart = createCartItemElement(item);
  const ol = document.getElementsByClassName('cart__items')[0];
  ol.appendChild(newCart); 
  return response;
};

// const buttons = document.querySelectorAll('.item__add');
// buttons.forEach((button) => buttonaddEventListener('click', (event) => {

// }));
  
const sectionItems = document.getElementsByClassName('items')[0];
sectionItems.addEventListener('click', (event) => {
  const button = event.target;
  const skuButtonSection = button.parentNode;
  const element = skuButtonSection.firstChild.textContent;
  fetchItems(element);
});

window.onload = () => final();
