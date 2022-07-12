require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  // implemente seus testes aqui
  test('Testa se fetchItem é uma função', () => {
    expect.assertions(1);
    expect(typeof(fetchItem)).toEqual('function');
  });

  test('Testa se fetch foi chamado ao chamar a função com o argumento "MLB1615760527"' , async () => {
    expect.assertions(1);
    const response = await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledTimes(1);
  })

  test('Testa se ao chamar a função com o argumento "MLB1615760527" fetch usa o endpoint' , async () => {
    expect.assertions(1);
    const response = await fetchItem('MLB1615760527');
    const url = 'https://api.mercadolibre.com/items/MLB1615760527'
    expect(fetch).toHaveBeenCalledWith(url);
  });

  test('Teste se o retorno da função fetchItem com o argumento "MLB1615760527" é igual ao objeto item', async () => {
    expect.assertions(1);
    const response = await fetchItem('MLB1615760527');
    expect(response).toEqual(item);
  })

  test('Testa ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: "You must provide an url"', async () => {
    expect.assertions(1);
    const response = await fetchItem();
    await expect(Promise.reject(new Error('You must provide an url'))).rejects.toThrow('You must provide an url');
  })
});
