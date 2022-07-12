const fetchItem = async () => {
  const response = await fetch('https://api.mercadolibre.com/items/MLB1615760527');
  const data = await response.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
