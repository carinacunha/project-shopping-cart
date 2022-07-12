const fetchItem = async (idProduct) => {
  const response = await fetch(`https://api.mercadolibre.com/items/${idProduct}`);
  const data = await response.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
