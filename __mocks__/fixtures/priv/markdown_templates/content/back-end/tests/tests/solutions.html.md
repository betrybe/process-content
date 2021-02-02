## Gabarito do exercício

1. O primeiro é o arquivo `productController.test.js` que testa nosso controller em isolamento, mockando toda a parte referente ao model.

```language-javascript
const ProductModel = require('./model');
const controllers = require('./controller');
const faker = require('faker');

describe('ProductController', () => {
  describe('Get all products', () => {
    test('When requesting all products, should return a JSON with all the available products', () => {
      const mockData = {
        data: [
           {
            id: 1,
            name: faker.commerce.productName(),
            brand: faker.commerce.productMaterial()
          },
          {
            id: 2,
            name: faker.commerce.productName(),
            brand: faker.commerce.productMaterial()
          },
        ],
      };

      const getAllSpy = jest
        .spyOn(ProductModel, 'getAll')
        .mockReturnValueOnce(mockData);
      const mockReq = {};
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      controllers.getAllProducts(mockReq, mockRes);
      expect(getAllSpy).toBeCalledTimes(1);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith(mockData);
      getAllSpy.mockRestore();
    });
  });
  describe('Get product by id', () => {
    test('When requesting a product with the id 1, should return a single product with ID equal to 1', () => {
      const mockData = {
        data: [
           {
            id: 1,
            name: faker.commerce.productName(),
            brand: faker.commerce.productMaterial()
          },
          {
            id: 2,
            name: faker.commerce.productName(),
            brand: faker.commerce.productMaterial()
          },
          {
            id: 3,
            name: faker.commerce.productName(),
            brand: faker.commerce.productMaterial()
          },
        ],
      };

      const getByIdSpy = jest
        .spyOn(ProductModel, 'getById')
        .mockReturnValueOnce(mockData.data[0]);
      const mockReq = {
        params: {
          id: 1,
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      controllers.getProductById(mockReq, mockRes);
      expect(getByIdSpy).toBeCalledTimes(1);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith(mockData.data[0]);
      getByIdSpy.mockRestore();
    });

    test('When requesting a product with the id 5, should return a 404 and a error message since the id does not exists', () => {
      const getByIdSpy = jest
        .spyOn(ProductModel, 'getById')
        .mockReturnValueOnce(null);
      const mockReq = {
        params: {
          id: 5,
        },
      };

      const mockRes = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      controllers.getProductById(mockReq, mockRes);
      expect(getByIdSpy).toBeCalledTimes(1);
      expect(mockRes.status).toBeCalledWith(404);
      expect(mockRes.send).toBeCalledWith({
        message: 'Produto não encontrado',
      });
      getByIdSpy.mockRestore();
    });

    test('When requesting a product with no ID at all, should return a 404 and a error message', () => {
      const getByIdSpy = jest
        .spyOn(ProductModel, 'getById')
        .mockReturnValueOnce(null);
      const mockReq = {
        params: {},
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      controllers.getProductById(mockReq, mockRes);
      expect(getByIdSpy).toBeCalledTimes(1);
      expect(mockRes.status).toBeCalledWith(404);
      expect(mockRes.send).toBeCalledWith({
        message: 'Produto não encontrado',
      });
      getByIdSpy.mockRestore();
    });
  });

  describe('Create Product', () => {
    test('When creating a product, should return a 200 with the create product', () => {
      const mockData = {
        name: faker.commerce.productName(),
        brand: faker.commerce.productMaterial()
      };

      const addProductSpy = jest
        .spyOn(ProductModel, 'add')
        .mockReturnValueOnce(mockData);
      const mockReq = {
        body: mockData,
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      controllers.createProduct(mockReq, mockRes);
      expect(addProductSpy).toBeCalledTimes(1);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith(mockData);
      addProductSpy.mockRestore();
    });

    test('When something went wrong, should return a 500 with and error message', () => {
      const mockData = {
        id: null,
        name: faker.commerce.productName(),
        brand: faker.commerce.productMaterial(),
      };

      const addProductSpy = jest
        .spyOn(ProductModel, 'add')
        .mockImplementation(() => {
          throw new Error();
        });
      const mockReq = {
        body: mockData,
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      controllers.createProduct(mockReq, mockRes);
      expect(addProductSpy).toBeCalledTimes(1);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.send).toBeCalledWith({
        message: 'Algo deu errado',
      });
      addProductSpy.mockRestore();
    });
  });

  describe('Delete Product by id', () => {
    test('When deleting a product with id 1, should return a 200 with the remaining products', () => {
      const mockData = {
        data: [
           {
            id: 1,
            name: faker.commerce.productName(),
            brand: faker.commerce.productMaterial()
          },
          {
            id: 2,
            name: faker.commerce.productName(),
            brand: faker.commerce.productMaterial()
          },
          {
            id: 3,
            name: faker.commerce.productName(),
            brand: faker.commerce.productMaterial()
          },
        ],
      };

      const deleteProductSpy = jest
        .spyOn(ProductModel, 'remove')
        .mockReturnValueOnce([mockData[1], mockData[2]]);
      const mockReq = {
        params: {
          id: 1,
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      controllers.deleteProductById(mockReq, mockRes);
      expect(deleteProductSpy).toBeCalledTimes(1);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith([mockData[1], mockData[2]]);
      deleteProductSpy.mockRestore();
    });

    test('When deleting a product with a unexistent id, should return a 200 with an array with all the products and no deletion', () => {
      const deleteProductSpy = jest
        .spyOn(ProductModel, 'remove')
        .mockReturnValueOnce([]);
      const mockReq = {
        params: {
          id: 5,
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      controllers.deleteProductById(mockReq, mockRes);
      expect(deleteProductSpy).toBeCalledTimes(1);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith([]);
      deleteProductSpy.mockRestore();
    });

    test('When something went wrong while deleting a product, should return a 500 with and error message', () => {
      const mockData = {
        data: [
           {
            id: 1,
            name: faker.commerce.productName(),
            brand: faker.commerce.productMaterial()
          },
          {
            id: 2,
            name: faker.commerce.productName(),
            brand: faker.commerce.productMaterial()
          },
          {
            id: 3,
            name: faker.commerce.productName(),
            brand: faker.commerce.productMaterial()
          },
        ],
      };

      const deleteProductSpy = jest
        .spyOn(ProductModel, 'remove')
        .mockReturnValueOnce([mockData[1], mockData[2]]);
      const mockReq = {
        params: {
          id: 1,
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      controllers.deleteProductById(mockReq, mockRes);
      expect(deleteProductSpy).toBeCalledTimes(1);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.send).toBeCalledWith({
        message: 'Algo deu errado',
      });
      deleteProductSpy.mockRestore();
    });
  });

  describe('Edit Product by id', () => {
    test('When editing a product with id 1, should return a 200 with an array with all the products and the one edited', () => {
      const mockData = {
        data: [
           {
            id: 1,
            name: faker.commerce.productName(),
            brand: faker.commerce.productMaterial()
          },
          {
            id: 2,
            name: faker.commerce.productName(),
            brand: faker.commerce.productMaterial()
          },
          {
            id: 3,
            name: faker.commerce.productName(),
            brand: faker.commerce.productMaterial()
          },
        ],
      };

      const editProductByIdSpy = jest
        .spyOn(ProductModel, 'addOrUpdate')
        .mockReturnValueOnce(mockData);
      const mockReq = {
        params: {
          id: 1,
        },
        body: {
          name: faker.commerce.productName(),
          brand: faker.commerce.productMaterial(),
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      controllers.editProductById(mockReq, mockRes);
      expect(editProductByIdSpy).toBeCalledTimes(1);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith(mockData);
      editProductByIdSpy.mockRestore();
    });

    test('When something went wrong while editing a product, should return a 500 with and error message', () => {
      const editProductByIdSpy = jest
        .spyOn(ProductModel, 'addOrUpdate')
        .mockImplementation(() => {
          throw new Error();
        });
      const mockReq = {
        params: {
          id: 1,
        },
        body: {
          name: faker.commerce.productName(),
          brand: faker.commerce.productMaterial(),
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      controllers.editProductById(mockReq, mockRes);
      expect(editProductByIdSpy).toBeCalledTimes(1);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.send).toBeCalledWith({
        message: 'Algo deu errado',
      });
      editProductByIdSpy.mockRestore();
    });
  });
});
```

2. O segundo arquivo é o `model.test.js` que testa nosso model. Nele vamos mockar o `fs` do Node (uma dependencia direta do nosso Modelo).

```language-javascript
const fs = require('fs');
const ProductModel = require('./model.js');
const faker = require('faker');
jest.mock('fs');

describe('Product Model', () => {
  describe('Get all products', () => {
    test('When getting all products, should return an array with all the available products', () => {
      const mockData = JSON.stringify([
        {
          id: 1,
          name: faker.commerce.productName(),
          brand: faker.commerce.productMaterial(),
        },
        {
          id: 2,
          name: faker.commerce.productName(),
          brand: faker.commerce.productMaterial(),
        },
        {
          id: 3,
          name: faker.commerce.productName(),
          brand: faker.commerce.productMaterial(),
        },
      ]);
      fs.readFileSync = jest.fn().mockReturnValueOnce(mockData);
      const res = ProductModel.getAll();
      expect(res).toStrictEqual(JSON.parse(mockData));
      fs.readFileSync.mockRestore();
    });
  });

  describe('Get product by ID', () => {
    test('When sending ID 1 as parameter, should only the product with id 1 be returned', () => {
      const mockData = JSON.stringify([
        {
          id: 1,
          name: faker.commerce.productName(),
          brand: faker.commerce.productMaterial(),
        },
        {
          id: 2,
          name: faker.commerce.productName(),
          brand: faker.commerce.productMaterial(),
        },
        {
          id: 3,
          name: faker.commerce.productName(),
          brand: faker.commerce.productMaterial(),
        },
      ]);
      fs.readFileSync = jest.fn().mockReturnValueOnce(mockData);
      const res = ProductModel.getById(1);
      expect(res).toStrictEqual(JSON.parse(mockData)[0]);
    });

    test('When sending ID 4 as parameter, should return undefined, since theres no product with id 4', () => {
      const mockData = JSON.stringify([
        {
          id: 1,
          name: faker.commerce.productName(),
          brand: faker.commerce.productMaterial(),
        },
        {
          id: 2,
          name: faker.commerce.productName(),
          brand: faker.commerce.productMaterial(),
        },
        {
          id: 3,
          name: faker.commerce.productName(),
          brand: faker.commerce.productMaterial(),
        },
      ]);
      fs.readFileSync = jest.fn().mockReturnValue(mockData);
      const res = ProductModel.getById(4);
      expect(res).toStrictEqual(undefined);
    });

    test('When sending no ID as parameter, should return undefined', () => {
      const mockData = JSON.stringify([
        {
          id: 1,
          name: faker.commerce.productName(),
          brand: faker.commerce.productMaterial(),
        },
        {
          id: 2,
          name: faker.commerce.productName(),
          brand: faker.commerce.productMaterial(),
        },
        {
          id: 3,
          name: faker.commerce.productName(),
          brand: faker.commerce.productMaterial(),
        },
      ]);
      fs.readFileSync = jest.fn().mockReturnValue(mockData);
      const res = ProductModel.getById();
      expect(res).toStrictEqual(undefined);
    });
  });

  describe('Add product', () => {
    test('When adding a new Product, should write in the file and return the created product', () => {
      const mockData = [
        {
          id: 1,
          name: faker.commerce.productName(),
          brand: faker.commerce.productMaterial(),
        },
        {
          id: 2,
          name: faker.commerce.productName(),
          brand: faker.commerce.productMaterial(),
        },
        {
          id: 3,
          name: faker.commerce.productName(),
          brand: faker.commerce.productMaterial(),
        },
      ];
      fs.readFileSync = jest.fn().mockReturnValue(JSON.stringify(mockData));
      fs.writeFile = jest.fn();

      const newProduct = {
        id: 4,
        name: faker.commerce.productName(),
        brand: faker.commerce.productMaterial(),
      };
      const res = ProductModel.add(newProduct.name, newProduct.brand);
      mockData.push(newProduct);

      expect(fs.writeFile).toHaveBeenCalledWith(
        './products.json',
        JSON.stringify(mockData),
        'utf8',
        expect.any(Function)
      );
      expect(res.id).toStrictEqual(4);
    });

    test('When something went wrong while writing the file, should throw an error', () => {
      const mockData = [
        {
          id: 1,
          name: faker.commerce.productName(),
          brand: faker.commerce.productMaterial(),
        },
        {
          id: 2,
          name: faker.commerce.productName(),
          brand: faker.commerce.productMaterial(),
        },
        {
          id: 3,
          name: faker.commerce.productName(),
          brand: faker.commerce.productMaterial(),
        },
      ];
      fs.readFileSync = jest.fn().mockReturnValue(JSON.stringify(mockData));
      let callback;
      jest.spyOn(fs, 'writeFile').mockImplementation((path, data, type, cb) => {
        callback = cb;
      });
      const err = 'something went wrong';

      const newProduct = {
        id: 1,
        name: faker.commerce.productName(),
        brand: faker.commerce.productMaterial(),
      };
      ProductModel.add(newProduct.name, newProduct.brand);

      expect(fs.writeFile).toHaveBeenCalled();
      expect(() => callback(err)).toThrowError(err);
    });
  });

  describe('Delete product by id', () => {
    test('When deleting a product with ID 1, should write in the file the products without the one with ID 1 and the file content after deletion', () => {
      const mockData = [
        {
          id: 1,
          name: faker.commerce.productName(),
          brand: faker.commerce.productMaterial(),
        },
        {
          id: 2,
          name: faker.commerce.productName(),
          brand: faker.commerce.productMaterial(),
        },
        {
          id: 3,
          name: faker.commerce.productName(),
          brand: faker.commerce.productMaterial(),
        },
      ];
      fs.readFileSync = jest.fn().mockReturnValue(JSON.stringify(mockData));
      fs.writeFile = jest.fn();

      const deleteResponse = ProductModel.remove(1);
      const expectedProductsAfterDeletion = [mockData[1], mockData[2]];

      expect(fs.writeFile).toHaveBeenCalledWith(
        './products.json',
        JSON.stringify(expectedProductsAfterDeletion),
        'utf8',
        expect.any(Function)
      );
      expect(deleteResponse.length).toBe(2);
      expect(deleteResponse[0].id).toBe(2);
      expect(deleteResponse[1].id).toBe(3);
    });

    test('When something went wrong while writing the file, should throw an error', () => {
      const mockData = [
        {
          id: 1,
          name: faker.commerce.productName(),
          brand: faker.commerce.productMaterial(),
        },
        {
          id: 2,
          name: faker.commerce.productName(),
          brand: faker.commerce.productMaterial(),
        },
        {
          id: 3,
          name: faker.commerce.productName(),
          brand: faker.commerce.productMaterial(),
        },
      ];
      fs.readFileSync = jest.fn().mockReturnValue(JSON.stringify(mockData));
      let callback;
      jest.spyOn(fs, 'writeFile').mockImplementation((path, data, type, cb) => {
        callback = cb;
      });
      const err = 'something went wrong';

      ProductModel.remove(1);

      expect(fs.writeFile).toHaveBeenCalled();
      expect(() => callback(err)).toThrowError(err);
    });
  });

  describe('Add Or Update Product by id', () => {
    test('When editing a product that exists, should write in the file and return all products after edition', () => {
      const mockData = [
        {
          id: 1,
          name: faker.commerce.productName(),
          brand: faker.commerce.productMaterial(),
        },
        {
          id: 2,
          name: faker.commerce.productName(),
          brand: faker.commerce.productMaterial(),
        },
        {
          id: 3,
          name: faker.commerce.productName(),
          brand: faker.commerce.productMaterial(),
        },
      ];
      fs.readFileSync = jest.fn().mockReturnValue(JSON.stringify(mockData));
      fs.writeFile = jest.fn();
      const mockUpdate = { id: 1, name: 'Novo Nome', brand: 'Nova marca' };
      const newProduct = ProductModel.addOrUpdate(1, 'Novo Nome', 'Nova marca');

      const expectedProductsAfterEdition = [
        mockUpdate,
        mockData[1],
        mockData[2],
      ];

      expect(fs.writeFile).toHaveBeenCalledWith(
        './products.json',
        JSON.stringify(expectedProductsAfterEdition),
        'utf8',
        expect.any(Function)
      );
      expect(newProduct[0].id).toStrictEqual(1);
      expect(newProduct[0].name).toStrictEqual(mockUpdate.name);
      expect(newProduct[0].brand).toStrictEqual(mockUpdate.brand);
    });

    test('When the product is not an edition, should add that product and save in the file and return all the products after insertion', () => {
      const mockData = [
        {
          id: 1,
          name: faker.commerce.productName(),
          brand: faker.commerce.productMaterial(),
        },
        {
          id: 2,
          name: faker.commerce.productName(),
          brand: faker.commerce.productMaterial(),
        },
        {
          id: 3,
          name: faker.commerce.productName(),
          brand: faker.commerce.productMaterial(),
        },
      ];
      fs.readFileSync = jest.fn().mockReturnValue(JSON.stringify(mockData));
      fs.writeFile = jest.fn();

      const mockProduct = {
        id: 4,
        name: faker.commerce.productName(),
        brand: faker.commerce.productMaterial(),
      };
      const res = ProductModel.addOrUpdate(
        8,
        mockProduct.name,
        mockProduct.brand
      );
      mockData.push(mockProduct);

      expect(fs.writeFile).toHaveBeenCalledWith(
        './products.json',
        JSON.stringify(mockData),
        'utf8',
        expect.any(Function)
      );
      expect(res.length).toBe(4);
      expect(res[3].id).toStrictEqual(4);
      expect(res[3].name).toStrictEqual(mockProduct.name);
      expect(res[3].brand).toStrictEqual(mockProduct.brand);
    });

    test('When something went wrong while writing the file, should throw an error', () => {
      const mockData = [
        {
          id: 1,
          name: faker.commerce.productName(),
          brand: faker.commerce.productMaterial(),
        },
        {
          id: 2,
          name: faker.commerce.productName(),
          brand: faker.commerce.productMaterial(),
        },
        {
          id: 3,
          name: faker.commerce.productName(),
          brand: faker.commerce.productMaterial(),
        },
      ];

      fs.readFileSync = jest.fn().mockReturnValue(JSON.stringify(mockData));
      let callback;
      jest.spyOn(fs, 'writeFile').mockImplementation((path, data, type, cb) => {
        callback = cb;
      });
      const err = 'something went wrong';

      ProductModel.addOrUpdate(null);

      expect(fs.writeFile).toHaveBeenCalled();
      expect(() => callback(err)).toThrowError(err);
    });
  });
});
```

3. Agora é a vez dos testes dos `middlewares` , onde mockamos os requests e as resposes e tambem testamos as datas.

```language-javascript
const middlewares = require('./middlewares');

describe('Middlewares', () => {
  describe('Token validation', () => {
    it('When passing an invalid token, should return a 401 with a invalid token message in JSOn format', () => {
      const mockReq = {
        headers: {
          authorization: '334412321321lee',
        },
      };

      const mockJson = jest.fn();
      
      const mockRes = {
        status: jest.fn().mockReturnValue({ json: mockJson }),
      };

      const mockNext = jest.fn();
      middlewares.checkAuthToken(mockReq, mockRes, mockNext);
      expect(mockNext).not.toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockJson).toHaveBeenCalledWith({
        message: 'Token inválido!',
      });
    });

    it('When passing a valid token, should call the next function', () => {
      const mockReq = {
        headers: {
          authorization: '1234567890123456',
        },
      };
      const mockRes = {
        status: jest.fn(),
        send: jest.fn(),
      };

      const mockNext = jest.fn();
      middlewares.checkAuthToken(mockReq, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalled();
      expect(mockRes.status).not.toHaveBeenCalled();
      expect(mockRes.send).not.toHaveBeenCalled();
    });
  });

  describe('Log', () => {
    it('When using the log middleware, should console log the date and teh request body', () => {
      const mockReq = {
        body: {
          key: '334412321321lee',
        },
      };

      const mockRes = {};
      const mockNext = jest.fn();
      const consoleSpy = jest.spyOn(console, 'log');
      middlewares.log(mockReq, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith(mockReq.body, expect.any(Date));
    });

    it('When using the log middleware is called in a request without a body, should console log the date and the request body as undefined', () => {
      const mockReq = {};
      const mockRes = {};
      const mockNext = jest.fn();
      const consoleSpy = jest.spyOn(console, 'log');
      middlewares.log(mockReq, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith(undefined, expect.any(Date));
    });
  });
});
```
