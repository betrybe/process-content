## O que vamos aprender?

Você já aprendeu como instalar, configurar e utilizar os principais _matchers_ do _Jest_, certo?

Agora você irá aprender como testar códigos assíncronos, como reaproveitar configurações entre testes e como separá-las por escopo.

---

### Você será capaz de:

* Escrever testes para códigos assíncronos com diferentes padrões;

* Reaproveitar configurações para diversos testes através do uso de `beforeEach` e `afterEach`;

* Dividir seus testes e suas respectivas configurações em grupos separados por escopos através do uso de `describe`;

---

## Por que isso é importante?

* Códigos assíncronos são comuns em _JavaScript_, e você certamente vai precisar escrevê-los com frequência, e consequentemente testá-los. Por exemplo, quando você faz uma chamada a uma API para buscar dados, você está fazendo uma requisição assíncrona.

* Repetir código é ruim, pois não só você está escrevendo mais do que precisa, mas também está correndo o risco de cometer um erro e replicá-lo em diferentes pontos, tornando sua correção difícil. Além disso, não é fácil replicar o código em sua exatidão, de forma que você, possivelmente, irá deixar alguma coisa para trás (dando mais margens pra erros). Com as configurações dos testes, isso não é diferente — você não quer ter que replicá-las em cada teste que escrever.

---

## Conteúdos

###### Tempo sugerido para realização: 80 minutos

### Testando códigos assíncronos

É comum encontrarmos em JavaScript linhas de código que possuem comportamento assíncrono. Você já conhece três casos em que comportamentos assíncronos acontecem: `callbacks`, `promises` e `async/await`. Para que possamos testar estes casos, o Jest nos fornece algumas soluções com objetivo de que nossos testes saibam o momento em que a função a ser testada foi concluída, e a informação necessária foi retornada. Isto evita que falsos positivos aconteçam e garante seguraça para a aplicação. Vamos analisar cada caso separadamente abaixo:

1. Callbacks: para testar `callbacks` utilizamos a função `done`. Ela é chamada para sinalizar ao Jest que o teste deverá aguardar o retorno da função `callback` para que a validação aconteça.
2. Promises: quando testamos `promises` devemos **retorná-la** dentro do teste. Lembre-se de utilizar `then` quando o retorno for um `resolve` e `catch` quando o retorno for um `reject`.
3. Async/Await: para testar funções com `async` e `await` devemos utilizar a palavra chave `async` na função passada para teste e `await` onde esperamos algum retorno assíncrono. Lembre-se que o `async/await` é apenas uma alternativa de sintaxe mais simples para testar `promises`. 

A seguir você conhecerá de forma detalhada todos os conceitos apresentados acima. Não se preocupe, existem exemplos e exercícios para que você possa colocar a teoria em prática e consolidar o aprendizado! 😉

---

#### Callbacks

Ao realizar testes assíncronos, é necessário ter cuidado com falso-positivos, pois o Jest não sabe, por padrão, quando é necessário esperar o término da execução de uma função assíncrona. Ou seja, você roda o teste, o Jest analisa as funções síncronas, não espera as assíncronas terminarem e, dado o final do teste, gera um resultado positivo antes de um eventual problema numa função assíncrona acusar um erro.

O exemplo abaixo gera um falso-positivo:

```language-javascript
test("Não deveria passar!", () => {
  setTimeout(() => {
    expect(10).toBe(5);
    console.log('Deveria falhar!')
  }, 500);
});
```

Execute-o na sua máquina para ver! Como o `setTimeout` é uma função assíncrona, o teste retorna um resultado falso-positivo quando executado dessa forma — note, inclusive, que  a frase 'Deveria falhar!' sequer aparece no console. O Jest não espera o test acabar, gerando esse resultado falso-positivo.

Para o Jest esperar a função assíncrona ser finalizada, é necessário utilizar uma callback própria da biblioteca, chamada `done`, que precisa ser chamada após os testes assíncronos.

Agora o Jest no exemplo abaixo consegue identificar o erro.

```language-javascript
test("Não deveria passar!", done => {
  setTimeout(() => {
    expect(10).toBe(5);
    console.log('Deveria falhar!')
    done();
  }, 500);
});
```

Outro exemplo para fixar melhor:

```language-javascript
const SumNumbers = (a, b, callback) => {
  setTimeout(() => {
    const result = a + b;
    callback(result);
  }, 500)
}

test('Testando SumNumbers, soma 5 mais 10', done => {
  SumNumbers(5, 10, (result) => {
    expect(result).toBe(15);
    done();
  });
})
```

Quando estiver realizando testes, sempre procure verificar se o seu teste não está exibindo resultados falso-positivos. No exemplo acima, em que o teste está passando, basta mudar o valor final do expect de `.toBe(15)` para analisar outros cenários.

Mude o valor `.toBe(15)` para `.toBe(10)` e verifique. O esperado é o teste identificar o erro. Caso isso ocorra, quer dizer que o seu teste está correto; caso continue passando e não encontre o erro, provavelmente seu teste está com algum falso-positivo.

---

#### Promises

Para testar uma promise será usado o código abaixo. Ele possui um array `Animals`, contendo animais com seu nome, idade e tipo.

Observe que a função `findAnimalsByType` é uma promise, responsável por buscar os animais de determinado tipo no array. Em caso de sucesso, ela retornará um `resolve` com um array de dados. Em caso de falha, retornará um `reject` com um objeto com a chave error, possuindo uma mensagem.

```language-javascript
const Animals = [
  { name: 'Dorminhoco', age: 1, type: 'Dog' },
  { name: 'Soneca', age: 2, type: 'Dog' },
  { name: 'Preguiça', age: 5, type: 'Cat' },
];

const findAnimalsByType = (type) => (
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const arrayAnimals = Animals.filter((animal) => animal.type === type);
      if (arrayAnimals.length !== 0) {
        return resolve(arrayAnimals);
      }

      return reject({ error: 'Não possui esse tipo de animal.' });
    }, 100);
  })
);

const getListAnimals = (type) => (
  findAnimalsByType(type).then(list => list)
);
```

O primeiro teste desse código verificará se, ao chamar a função `getListAnimals` com `Dog` como parâmetro, o seu retorno será os dois cachorros do array `Animals`.

```language-javascript
const Animals = [
  { name: 'Dorminhoco', age: 1, type: 'Dog' },
  { name: 'Soneca', age: 2, type: 'Dog' },
  { name: 'Preguiça', age: 5, type: 'Cat' },
];

const findAnimalsByType = (type) => (
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const arrayAnimals = Animals.filter((animal) => animal.type === type);
      if (arrayAnimals.length !== 0) {
        return resolve(arrayAnimals);
      }

      return reject({ error: 'Não possui esse tipo de animal.' });
    }, 100);
  })
);

const getListAnimals = (type) => (
  findAnimalsByType(type).then(list => list)
);

describe('Quando o tipo do animal existe', () => {
  test('Retorne a lista de animais', () => {
    expect.assertions(2);
    return getListAnimals('Dog').then(listDogs => {
      expect(listDogs[0].name).toEqual('Dorminhoco');
      expect(listDogs[1].name).toEqual('Soneca');
    });
  });
});
```

Rode o teste e verifique se ele não está dando algum falso-positivo. Mude o `Dorminhoco` para `Agitado`.
Viu? O teste não passou, logo não possui falso-positivos.

Agora veja o passo a passo de como o teste foi feito.

Primeiro criamos o describe, onde os testes serão executados.

```language-javascript
describe('Quando o tipo do animal, existe', () => {
  test('Retorne a lista de animais', () => {

  });
});
```

Agora, adicione a função a ser testada. Como ela retorna uma _Promise_, é necessário adicionarmos o `.then` para pegar o seu resultado.

```language-javascript
describe('Quando o tipo do animal, existe', () => {
  test('Retorne a lista de animais', () => {
    getListAnimals('Dog').then(listDogs => {

    });
  });
});
```

Agora adicione os testes e os execute.

```language-javascript
describe('Quando o tipo do animal, existe', () => {
  test('Retorne a lista de animais', () => {
    getListAnimals('Dog').then(listDogs => {
      expect(listDogs[0].name).toEqual('Dorminhoco');
      expect(listDogs[1].name).toEqual('Soneca');
    });
  });
});
```

Verifique se deu algum falso-positivo, mude o nome do `Dorminhoco` para `Bob`. Observe:

```language-javascript
describe('Quando o tipo do animal, existe', () => {
  test('Retorne a lista de animais', () => {
    getListAnimals('Dog').then(listDogs => {
      expect(listDogs[0].name).toEqual('Bob');
      expect(listDogs[1].name).toEqual('Soneca');
    });
  });
});
```

O teste continuou passando sem encontrar o erro (o que não era o esperado), o que indica que ele está com um falso-positivo.

Para resolver esse problema, é necessário inserir um `return` antes da função e, em seguida, adicionar a quantidade de expect esperadas por meio do comando `expect.assertions(2)`.

```language-javascript
describe('Quando o tipo do animal, existe', () => {
  test('Retorne a lista de animais', () => {
    expect.assertions(2);
    return getListAnimals('Dog').then(listDogs => {
      expect(listDogs[0].name).toEqual('Bob');
      expect(listDogs[1].name).toEqual('Soneca');
    });
  });
});
```

Agora o teste conseguiu identificar o erro, retornando dois erros. Um dos erros é o que esperava `Bob`, mas recebeu o `Dorminhoco`. Como o Jest apenas recebeu `1` assertion, mas eram esperados `2`, surge o segundo erro no nosso teste. Agora, desfaça as alterações para o teste voltar a funcionar. Como esse teste conseguiu encontrar o erro, fica claro que o problema de resultados falso-positivos foi resolvido.

Se quiser, remova o `expect.assertions(2)` e veja que o teste passa!

```language-javascript
describe('Quando o tipo do animal, existe', () => {
  test('Retorne a lista de animais', () => {
    return getListAnimals('Dog').then(listDogs => {
      expect(listDogs[0].name).toEqual('Dorminhoco');
      expect(listDogs[1].name).toEqual('Soneca');
    });
  });
});
```

Essa promise possui dois casos: quando ela funciona, ocorre o `resolve` e, no erro, ocorre o `reject`. Como o `resolve` já foi testado, faltam apenas os testes do erro.

O código abaixo testa, exatamente, o caso de erro.

```language-javascript
describe('Quando o tipo do animal, não existe', () => {
  test('Retorne a lista de animais', () => {
    return getListAnimals('Lion').catch(error =>
      expect(error).toEqual({ error: "Não possui esse tipo de animal." })
    );
  });
});
```

Como o array `Animals` não possui nenhum `Lion` (tipo inserido no teste), será disparada a `reject`, que retornará um objeto com uma chave `error` com o valor `Não possui esse tipo de animal.`. A diferença entre esse teste e os outros é o `.catch` no lugar do `.then`. O `.catch` trabalha o resultado da promise quando ocorre um `reject`; já o `.then`, quando ocorre o `resolve`.

---

#### Async/Await

Para testar o código `Async/Await`, será usado o mesmo código anterior, mas com pequenas mudanças. Observe:

```language-javascript
test('Testando com async/await', async () => {
  const listDogs = await getListAnimals('Dog');
  expect(listDogs[0].name).toEqual('Dorminhoco');
  expect(listDogs[1].name).toEqual('Soneca');
});
```

Perceba que a diferença entre elas é o `async`. Como existe uma promise a ser testada, é necessário o uso do `await`, para que o teste espere a finalização da promise e, em seguida, execute o teste remanescente. A variável `listDogs` recebe o retorno da promise e executa os testes.

Abaixo está o código para quando ocorre o `reject` da promise. É necessário adicionar o bloco `try/catch`.

```language-javascript
test('Testando com async/await, testando o reject', async () => {
  try {
    await getListAnimals('Lion');
  } catch (error) {
    expect(error).toEqual({ error: "Não possui esse tipo de animal." })
  }
});
```

### Matcher .resolves / .rejects

No Jest 20.0.0, para simplificar ainda mais os testes, foram adicionados os matchers `.resolves` e `.rejects`.

O `.resolves` espera a promise ser resolvida. Caso a promise seja rejeitada, o teste automaticamente irá falhar.

O `.rejects` espera a promise ser rejeitada. Caso a promise seja resolvida, o teste automaticamente irá falhar.

Com promise:

```language-javascript
describe('Testando promise - findAnimalsByType', () => {
  describe('Quando o tipo do animal existe', () => {
    test('Retorne a lista de animais', () => {
      const listDogs = [
        { name: 'Dorminhoco', age: 1, type: 'Dog' },
        { name: 'Soneca', age: 2, type: 'Dog' },
      ]
      expect.assertions(1);
      return expect(getListAnimals('Dog')).resolves.toEqual(listDogs)
    });
  });

  describe('Quando o tipo de animal não existe', () => {
    test('Retorna um erro', () => {
      expect.assertions(1);
      return expect(getListAnimals('Lion')).rejects.toEqual({ error: 'Não possui esse tipo de animal.' })
    });
  });
});
```

Com Async/Await:

```language-javascript
describe('Testando Async/Await - findAnimalsByType', () => {
  describe('Quando o tipo do animal existe', () => {
    test('Retorne a lista de animais', async () => {
      const listDogs = [
        { name: 'Dorminhoco', age: 1, type: 'Dog' },
        { name: 'Soneca', age: 2, type: 'Dog' },
      ]
      expect.assertions(1);
      await expect(getListAnimals('Dog')).resolves.toEqual(listDogs)
    });
  });

  describe('Quando o tipo de animal não existe', () => {
    test('Retorna um erro', async () => {
      expect.assertions(1);
      await expect(getListAnimals('Lion')).rejects.toEqual({ error: 'Não possui esse tipo de animal.' })
    });
  });
});
```

---

### Setup e Teardown

Agora veremos um vídeo que mostra como reaproveitar configurações para diversos testes.

<%= vimeo "454449869" %>

Vamos recapitular o que você aprendeu até então com esse vídeo:

1. O `beforeEach` é executado antes de cada teste, evitando que você tenha que repetir trechos de código, como por exemplo a criação de usuários utilizada no vídeo, dentro de cada teste. Dessa forma, você escreve o trecho de código uma única vez e garante que o "ambiente" esteja preparado para os testes que precisarem.

2. Além do `beforeEach`, temos também o `afterEach` que foi citado no vídeo e que executa um trecho de código após cada teste. Ele é especialmente útil para resetar configurações, dados, entre outras coisas.

3. Assim como vimos que pode acontecer dentro dos testes, durante o vídeo tivemos a execução de código assíncrono no `beforeEach`. Isso reforça, novamente, que é importante sempre se atentar a esse fator e que ele pode aparecer em diferentes cenários.

Outra maneira de tunar o uso do `beforeEach` e do `afterEach` é agrupá-los através do `describe`, para que executem apenas para um determinado conjunto de testes, ao invés de executá-los para todos os testes, pois frequentemente um trecho de código se aplica a alguns testes, mas não a outros.

Por exemplo, digamos que vários testes interagem com um banco de dados de cidades, mas apenas alguns testes interagem com um banco de dados de comidas, que estão relacionadas às cidades por serem típicas de lá. Neste caso, podemos fazer uma configuração diferente para diferentes testes, conforme o exemplo abaixo:

```language-javascript
// Este beforeEach e este afterEach serão aplicados a todos os testes
beforeEach(() => {
  retrieveCitiesFromCache();
});

afterEach(() => {
  resetCities();
});

it("should have only 1 city after remove Belo Horizonte", () => {
  removeCity("Belo Horizonte");
  expect(getCities().length).toBe(1);
});

it("should have the city of Belo Horizonte", () => {
  expect(isCity("Belo Horizonte")).toBeTruthy();
});

describe('Requesting cities from api', () => {
  // Este beforeEach e este afterEach serão aplicados apenas aos testes
  // do bloco do describe
  beforeEach(() => {
    return requestCities();
  });
  
  afterEach(() => {
    resetCities();
  });

  it("should have 8 cities after request", () => {
    let cities = getCities();
    expect(cities.length).toBe(8);
  });

  it("should have the city of Belo Horizonte", () => {
    expect(isCity("Belo Horizonte")).toBeTruthy();
  });

  it("should have the city of Fortaleza", () => {
    expect(isCity("Fortaleza")).toBeTruthy();
  });
});
```

Como puderam ver através desse exemplo, o `describe`, além de separar os testes por contexto, pode separar configurações também, te ajudando a reutilizar ainda mais código. Legal, né?

---

## Vamos fazer juntos

###### Tempo sugerido para realização: 80 minutos

É hora de colocar em prática todo esse conhecimento. Vamos para o Slack, onde estará disponível o link da nossa aula ao vivo de hoje.

---

## Exercícios

###### Tempo sugerido para realização: 140 minutos

<%= versioning_your_code(@conn) %>

### Agora a prática

1. Escreva um teste que verifique a chamada do _callback_ de uma função `uppercase`, que transforma as letras de uma palavra em letras maiúsculas. Lembre-se de ter cuidado com os falso-positivos em testes assíncronos.

```language-javascript
const uppercase = (str, callback) => {
  callback(str.toUpperCase());
};
```

**Código-base para os exercícios 2 e 3:**

O código a seguir simula uma chamada ao banco de dados para buscar usuários. O resultado dessa busca é uma _Promise_, que é utilizada pelo método `getUserName`.

```language-javascript
const users = {
  4: { name: 'Mark' },
  5: { name: 'Paul' }
};

const findUserById = (id) => {
  return new Promise((resolve, reject) => {
      if (users[id]) {
        return resolve(users[id]);
      };

      return reject({ error: 'User with ' + id + ' not found.' });
  });
};

const getUserName = (userID) => {
  return findUserById(userID).then(user => user.name);
};
```

2. Utilizando a sintaxe de _Promise_, faça um teste que verifique o resultado da função `getUserName` para o caso em que o usuário é encontrado, e também um teste para o caso em que o usuário não é encontrado.

    _Dica_: Veja os dados falsos utilizados no banco de dados, disponíveis na variável `users`, para saber quais IDs existem.

3. Reescreva o teste do exercício anterior, desta vez utilizando a sintaxe de _async/await_.

    _Dica:_ Utilize o [try/catch](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/try...catch) {: .external-link target="_blank" rel="noreferrer noopener" } para o caso de erro.

4. O código abaixo busca no _GitHub_ de um usuário, de acordo com a URL, seus repositórios, e retorna uma lista como resultado. Dada a URL `'https://api.github.com/orgs/tryber/repos'`, faça um teste que verifique que os repositórios `'sd-01-week4-5-project-todo-list'` e `'sd-01-week4-5-project-meme-generator'` se encontram nessa lista.

```language-javascript
const fetch = require('node-fetch');

const getRepos = (url) => {
  return fetch(url)
    .then(response => response.json())
    .then((data) => {
      return data.map((repo) => repo.name);
    });
};
```

5. Para este exercício, tente adivinhar a saída dos `console.log` dos testes abaixo sem executá-los, e veja se compreendeu bem o funcionamento do `beforeEach` e do `afterEach`.

```language-javascript
beforeEach(() => console.log('1 - beforeEach'));
afterEach(() => console.log('1 - afterEach'));

test('', () => console.log('1 - test'));

describe('Scoped / Nested block', () => {
  beforeEach(() => console.log('2 - beforeEach'));
  afterEach(() => console.log('2 - afterEach'));

  test('', () => console.log('2 - test'));
});
```

Após escrever o que imagina que será o resultado, execute os testes e veja se acertou.

6. Nesse exercício, você irá criar funções parecidas com código abaixo - o mesmo que foi usado como exemplo sobre os testes de promise.

```language-javascript
const Animals = [
  { name: 'Dorminhoco', age: 1, type: 'Dog' },
  { name: 'Soneca', age: 2, type: 'Dog' },
  { name: 'Preguiça', age: 5, type: 'Cat' },
];

const findAnimalsByType = (type) => (
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const arrayAnimals = Animals.filter((animal) => animal.type === type);
      if (arrayAnimals.length !== 0) {
        return resolve(arrayAnimals);
      };

      return reject({ error: 'Não possui esse tipo de animal.' });
    }, 100);
  })
);

const getListAnimals = (type) => (
  findAnimalsByType(type).then(list => list)
);
```

Use como base para os exercícios a seguir:

  6.1. Adicione uma funcionalidade para buscar pelo nome do animal - crie uma função que deverá passar no teste abaixo.

  Dica: use o código do exemplo dado para criar uma nova função, analise os testes antes de iniciar.

```language-javascript
const Animals = [
  { name: 'Dorminhoco', age: 1, type: 'Dog' },
  { name: 'Soneca', age: 2, type: 'Dog' },
  { name: 'Preguiça', age: 5, type: 'Cat' },
];

const findAnimalByName = (name) => (
  // Adicione o código aqui.
);

const getAnimal = (name) => {
  // Adicione o código aqui.
};
// ---------------------

describe('Testando promise - findAnimalByName', () => {
  describe('Quando existe o animal com o nome procurado', () => {
    test('Retorne o objeto do animal', () => {
      expect.assertions(1);
      return getAnimal('Dorminhoco').then(animal => {
        expect(animal).toEqual({ name: 'Dorminhoco', age: 1, type: 'Dog' });
      });
    });
  });

  describe('Quando não existe o animal com o nome procurado', () => {
    test('Retorna um erro', () => {
      expect.assertions(1);
      return getAnimal('Bob').catch(error =>
        expect(error).toEqual('Nenhum animal com esse nome!');
      );
    });
  });
});
```

6.2. Adicione uma nova funcionalidade para buscar pela idade dos animais. O retorno deve ser um array de objetos, mas, caso não ache nenhum, retorne uma mensagem de erro. Escreva tanto a função como o seu teste.

---

## Recursos adicionais (opcional)

* [Jest - Testing Asynchronous Code - Video](https://www.youtube.com/watch?v=Y4PHrT6Cc_A) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Jest - Testing Asynchronous Code - Leitura](https://deltice.github.io/jest/docs/pt-BR/asynchronous.html#content) {: .external-link target="_blank" rel="noreferrer noopener" } 

* [Testing Asynchronous Code](https://jestjs.io/docs/en/asynchronous) {: .external-link target="_blank" rel="noreferrer noopener" }

* [An Async Example](https://jestjs.io/docs/en/tutorial-async) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Setup and Teardown](https://jestjs.io/docs/en/setup-teardown) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Jest - Setup and Teardown - Video](https://www.youtube.com/watch?v=wWx9uZa-Wnk) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

Na próxima aula, você verá mais sobre o Jest, focando na parte de _simular comportamentos_ de funções, bibliotecas e APIs!

<%= next_button(@conn) %>
