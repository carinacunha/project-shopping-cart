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
  const msg = document.createElement('section');
  msg.className = 'loading';
  msg.innerText = 'carregando';
  document.querySelector('.container').appendChild(msg);
  const response = await fetchProducts('computador');
  msg.remove();
  const { results } = response;
  results.forEach((item) => {
    const selected = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
    };
    const createdSection = createProductItemElement(selected);
    const firstSection = document.querySelector('.items');
    firstSection.appendChild(createdSection);
  });
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cart = document.querySelector('.cart');
const totalPrice = document.createElement('h3');
totalPrice.className = 'total-price';
cart.appendChild(totalPrice);

const getTotalPrice = () => {
  const itemsCart = document.querySelector('.cart__items');
  const arr = [];
  [...itemsCart.children].forEach((item) => {
    const price = Number(item.textContent.split('$')[1]);
    arr.push(price);
  });
  const total = arr.reduce((acc, value) => acc + value, 0);
  totalPrice.innerText = `${total}`;
};

const trasformData = () => {
  const itemsCart = document.querySelectorAll('li');
  const arr = [];
  itemsCart.forEach((item) => {
    const text = item.textContent;
    arr.push(text);
  });
  const toString = JSON.stringify(arr);
  saveCartItems(toString);
};

const cartItemClickListener = (event) => {
  const { target } = event;
  target.parentNode.removeChild(target);
  getTotalPrice();
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
  const items = document.getElementsByClassName('cart__items')[0];
  items.appendChild(newCart);
  getTotalPrice();
  trasformData();
};

const sectionItems = document.getElementsByClassName('items')[0];
sectionItems.addEventListener('click', (event) => {
  const button = event.target;
  const skuButtonSection = button.parentNode;
  const element = skuButtonSection.firstChild.textContent;
  fetchItems(element);
});

const clearCart = () => {
  const items = document.querySelector('.cart__items');
  items.innerText = ''; 
  getTotalPrice();
};

const buttonClear = document.querySelector('.empty-cart');
buttonClear.addEventListener('click', clearCart);

const transferDatatoCart = () => {
  if (getSavedCartItems('cartItems')) {
    const fromStorage = JSON.parse(getSavedCartItems('cartItems'));
    fromStorage.forEach((item) => {
      const itemsCart = document.querySelector('ol');
      const list = document.createElement('li');
      list.className = 'cart__item';
      itemsCart.appendChild(list);
      list.innerText = item;
    });
  }
};

window.onload = () => {
  final();
  transferDatatoCart();
};
