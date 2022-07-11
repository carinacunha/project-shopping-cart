require('../mocks/fetchSimulator');
const { TestScheduler } = require('jest');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  // implemente seus testes aqui
  test('Testa se fetchProducts é uma função', () => {
    expect.assertions(1);
    expect(typeof(fetchProducts)).toEqual('function');
  })

  test('Testa se fetch foi chamado ao chamar a função com o argumento "computador"' , async () => {
    expect.assertions(1);
    const response = await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledTimes(1);
  })

  test('Testa se ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint', async () => {
    expect.assertions(1);
    const response = await fetchProducts('computador');
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    expect(fetch).toHaveBeenCalledWith(url);
  })

  test('Testa ao chamar a função fetchProducts sem argumento, retorna um erro com a mensagem: "You must provide an url"', async () => {
    expect.assertions(1);
    const response = await fetchProducts();
    await expect(Promise.reject(new Error('You must provide an url'))).rejects.toThrow('You must provide an url');
  })

   test('Teste se o retorno da função fetchProducts com o argumento "computador" é igual ao objeto computadorSearch', async () => {
    expect.assertions(1);
    const response = await fetchProducts('computador');
    const search = computadorSearch;
    expect(response).toEqual(search);
  })
});

