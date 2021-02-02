## Gabarito dos exercícios

##### Parte I

Refaça os exercícios 1 a 5 do conteúdo de [Testes unitários em JavaScript](/fundamentals/js-unit-tests/js-unit-tests/exercicios/agora-a-pratica) {: .external-link target="_blank" rel="noreferrer noopener" }, dessa vez utilizando **Jest**.

1. A função `sum(a, b)` retorna a soma do parâmetro `a` com o `b`
  1. Teste se o retorno de `sum(4, 5)` é `9`
  2. Teste se o retorno de `sum(0, 0)` é `0`
  3. Teste se a função `sum` lança um erro quando os parâmetros são `4` e `"5"`(string 5)
  4. Teste se a mensagem de erro é "parameters must be numbers" quando realizar a chamada `sum(4, "5")`

```language-javascript
// sum.js
const sum = (a, b) => {
  if (typeof (a) !== 'number' || typeof (b) !== 'number') {
    throw new Error('parameters must be numbers');
  };
  return a + b;
};

module.exports = sum;
```

```language-javascript
// sum.test.js
const sum = require('./sum');

describe('sum', () => {
  test('4 plus 5 equals 9', () => {
    expect(sum(4, 5)).toBe(9);
  });

  test('throws an error when a string is passed', () => {
    expect(() => {
      sum(4, '5');
    }).toThrow();
  });

  test('0 plus 0 equals 0', () => {
    expect(sum(0, 0)).toBe(0);
  });

  test('error message is "parameters must be numbers"', () => {
    expect(() => {
      sum(4, '5');
    }).toThrow(/parameters must be numbers/);
  });
});
```

##### Parte II

1. Para as funções `encode` e `decode` crie os seguintes testes:
  1. Teste se `encode` e `decode` são funções;
  2. Para a função `encode` teste se as vogais **a, e, i, o, u** são convertidas em 1, 2, 3, 4 e 5, respectivamente;
  3. Para a função `decode` teste se os números 1, 2, 3, 4 e 5 são convertido nas vogais **a, e, i, o, u**, respectivamente;
  4. Teste se as demais letras/números não são convertidos para cada caso;
  5. Teste se a `string` que é retornada pelas funções têm o mesmo número de caracteres que a `string` passada como parâmetro.

```language-javascript
// encode-decode.js
const encode = (string) => {
  const splitString = string.split('');

  const encodeString = splitString.map((character, index) => {
    if (character === 'a') return splitString[index] = 1;
    if (character === 'e') return splitString[index] = 2;
    if (character === 'i') return splitString[index] = 3;
    if (character === 'o') return splitString[index] = 4;
    if (character === 'u') return splitString[index] = 5;
    else return character;
  });
  return encodeString.join('');
};

const decode = (string) => {
  const splitString = string.split('');

  const decodeString = splitString.map((number, index) => {
    if (number === '1') return splitString[index] = 'a';
    if (number === '2') return splitString[index] = 'e';
    if (number === '3') return splitString[index] = 'i';
    if (number === '4') return splitString[index] = 'o';
    if (number === '5') return splitString[index] = 'u';
    else return number;
  });
  return decodeString.join('');
};

const functions = { encode, decode };
module.exports = functions;
```

```language-javascript
// encode-decode.test.js
const { encode, decode } = require('./encode-decode.js');

describe('Testa a função encode e decode', () => {
  it('a função encode é definida', () => {
    expect(encode).toBeDefined();
  });
  it('encode é uma função', () => {
    expect(typeof encode).toEqual('function');
  });
  it('converte apenas a vogal "a" no número 1', () => {
    expect(encode('ana')).toEqual('1n1');
  });
  it('converte a vogal "e" no número 2', () => {
    expect(encode('ele')).toEqual('2l2');
  });
  it('converte a vogal "i" no número 3', () => {
    expect(encode('xixi')).toEqual('x3x3');
  });
  it('converte a vogal "o" no número 4', () => {
    expect(encode('ovo')).toEqual('4v4');
  });
  it('converte a vogal "u" no número 5', () => {
    expect(encode('nu')).toEqual('n5');
  });
  it('checa se o retorno da função tem o mesmo número de caracteres', () => {
    expect(encode('trybe').length).toEqual(5);;
  });

  it('a função decode é definida', () => {
    expect(decode).toBeDefined();
  });
  it('decode é uma função', () => {
    expect(typeof decode).toEqual('function');
  });
  it('converte apenas o número 1 na vogal a', () => {
    expect(decode('1n1')).toEqual('ana');
  });
  it('converte apenas o número 2 na vogal e', () => {
    expect(decode('2l2')).toEqual('ele');
  });
  it('converte apenas o número 3 na vogal i', () => {
    expect(decode('x3x3')).toEqual('xixi');
  });
  it('converte apenas o número 4 na vogal o', () => {
    expect(decode('4v4')).toEqual('ovo');
  });
  it('converte apenas o número 5 na vogal u', () => {
    expect(decode('n5')).toEqual('nu');
  });
  it('checa se o retorno da função tem o mesmo número de caracteres', () => {
    expect(decode('trybe').length).toEqual(5);
  });
});
```
2. A função `techList` recebe como parâmetros um array contendo uma lista de tecnologias e uma string com um nome. Para cada tecnologia no array a função cria, em ordem alfabética, um objeto com a seguinte estrutura:

```language-javascript
{
  tech: "NomeTech",
  name: name,
}
```

Implemente a função `techList` a partir dos testes dados. **É importante nunca alterar os testes ou as variáveis já escritas no código**.

```language-javascript
// techList.js
const techList = (arrayTechnologies, name) => {
  if (arrayTechnologies.length === 0) return 'Vazio!';

  const technologyList = arrayTechnologies
    .sort()
    .map((technology) => ({
    tech: technology,
    name,
    }));
  return technologyList;
};


module.exports = techList;
```
3. A função `hydrate` recebe uma string no formato "numero bebida", e retorna a sugestão de quantos copos de água você deve beber para se hidratar. Para cada bebida, deve-se tomar um copo de água para não ter ressaca. Exemplo:

```language-javascript
// string recebida
'1 cerveja'
// retorno da função
'1 copo de água'

// string recebida
'1 cerveja, 2 shots e 1 catuaba'
// retorno da função
'4 copos de água'

// string recebida
'2 caipirinhas'
// retorno da função
'2 copos de água'
```

Implemente a função `hydrate` a partir dos testes abaixo. Experimente refatorar a função que você criou para o projeto Playground Function! **É importante nunca alterar os testes ou as variáveis já escritas no código**.

```language-javascript
// hydrate.js
const hydrate = (string) => {
  const splitString = string.split('');
  const result = splitString.reduce((glassesOfWater, character) => {
    let parsedCharacter = parseInt(character);
    let checkCharacter = isNaN(parsedCharacter) === false;
    if (checkCharacter) { return glassesOfWater + parsedCharacter };
    return glassesOfWater;
  }, 0);

  const pluralGlass = result === 1 ? 'copo' : 'copos';
  return `${result} ${pluralGlass} de água`;
};

module.exports = hydrate;
```

#### Bônus

1. Considere os dados abaixo. Você deve criar uma função que receba dois parâmetros: o `id` do funcionário e a informação disponível sobre ele (`firstName`, `lastName`, `specialities`). Você também deverá criar os testes para essa função. Sua função deverá então retornar os resultados da busca pelo `id` para aquele funcionário e a informação consultada. Caso o `id` não conste no quadro de funcionários, sua função deve retornar o erro `ID não identificada`. Se a informação que se quer acessar não existir, a função deve retornar o erro `Indisponível`.

```language-javascript
// Dados
const professionalBoard = [
  {
    id: '8579-6',
    firstName: 'Ana',
    lastName: 'Gates',
    specialities: ['UX', 'Design'],
  },
  {
    id: '5569-4',
    firstName: 'George',
    lastName: 'Jobs',
    specialities: ['Frontend', 'Redux', 'React', 'CSS'],
  },
  {
    id: '4456-4',
    firstName: 'Leila',
    lastName: 'Zuckerberg',
    specialities: ['Context API', 'RTL', 'Bootstrap'],
  },
  {
    id: '1256-4',
    firstName: 'Linda',
    lastName: 'Bezos',
    specialities: ['Hooks', 'Context API', 'Tailwind CSS'],
  },
  {
    id: '9852-2-2',
    firstName: 'Jeff',
    lastName: 'Cook',
    specialities: ['Ruby', 'SQL'],
  },
  {
    id: '4678-2',
    firstName: 'Paul',
    lastName: 'Dodds',
    specialities: ['Backend'],
  },
];

// Pesquisa
const searchEmployee = (id, detail) => {
  // Implemente seu código aqui
};
```

Teste para a função `searchEmployee`:

```language-javascript
// exercise-bonus.test.js

const searchEmployee = require('./exercise-bonus');

describe('Testa a função searchEmployee', () => {
  it('Testa se searchEmployee é uma função', () => {
    expect(typeof searchEmployee).toBe('function');
  });
  it('Testa se searchEmployee(id, "firstName") retorna o primeiro nome do usuário da id consultada', () => {
    const actual = searchEmployee('1256-4', 'firstName');
    const expected = 'Linda';

    expect(actual).toBe(expected);
  });
  it('Testa se searchEmployee(id, "lastName") retorna o segundo nome do usuário da id consultada', () => {
    const actual = searchEmployee('1256-4', 'lastName');
    const expected = 'Bezos';

    expect(actual).toBe(expected);
  });
  it('Testa se searchEmployee(id, "specialities") retorna um array com todas as habilidades do id pesquisado', () => {
    const actual = searchEmployee('1256-4', 'specialities');
    expect(actual).toContain('Hooks', 'Context API', 'Tailwind CSS');
  });
  it('Testa se um erro com a mensagem "ID não identificada" é retornado quando a ID não existir', () => {
    expect(() => { searchEmployee('1256-8', 'specialities') }).toThrow();
  });
  it('Testa a mensagem do erro para ID inexistente', () => {
    expect(() => { searchEmployee('1256-8', 'specialities') }).toThrowError(new Error("ID não identificada"));
  });
  it('Testa se lança um erro quando a informação e o ID são inexistentes', () => {
    expect(() => { searchEmployee() }).toThrow();
  });
  it('Testa a mensagem do erro para informação inexistente', () => {
    expect(() => { searchEmployee('4678-2', 'shift') }).toThrowError(new Error("Informação indisponível"));
  });
});
```

Implementação da função:

```language-javascript
// exercise-bonus.js

const searchEmployee = (id, detail) => {
  const employee = professionalBoard.find(employee => employee.id === id);

  if (!employee) {
    throw new Error("ID não identificada");
  };
  if (!employee[detail]) {
    throw new Error("Informação indisponível");
  };

  return employee[detail];
};


module.exports = searchEmployee;
```
