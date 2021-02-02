## O que vamos aprender?

Seguindo os estudos sobre qualidade de software, vamos falar de testes! Você aprendeu a escrever testes já faz algum tempo. Testar a aplicação é uma das partes mais difíceis e críticas do processo de desenvolvimento, e certamente pensar em como escrevê-los e estruturá-los é algo que já te deu bastante dor de cabeça. Hoje vamos aprender mais sobre testes, mais especificamente sobre como estruturá-los, como escrevê-los e como organizá-los da melhor maneira possível. Isso vai te ajudar tanto na hora de manter quanto na hora de escrever novos testes, além de te trazer paz de espírito toda vez que você subir alguma funcionalidade nova para produção.

---

### Você será capaz de:

- Escrever testes seguindo boas práticas.

---

## Por que isso é importante?

Testar é a essência de um software bem escrito. Sem testes, a chance de o seu código estar acoplado e sujeito a falhas é alta. Além disso, testes também necessitam ser mantidos, refatorados, modificados e adicionados conforme sua aplicação cresce e se modifica. Se eles não estiverem bem escritos, você vai chegar num ponto em que seus testes dão mais trabalho do que sua aplicação em si, e isso não pode acontecer.

---

## Conteúdos

###### Tempo sugerido para realização: 60 minutos

### Introdução

Testes precisam ser óbvios. Eles precisam "dizer" exatamente o motivo de estarem ali logo quando alguém bater o olho nele. **Você precisa olhar para um teste e dizer o que ele faz/testa logo na primeira olhada. Além disso, os testes `não` devem adicionar complexidade extra ao projeto.** Todos os dias você já enfrenta desafios para implementar/melhorar alguma funcionalidade do sistema. A intenção é que seus testes não deixem seu trabalho ainda mais complexo.

### Um teste se parece com o que?

#### Nomes e agrupamentos

A primeira coisa com que devemos nos preocupar, quando falamos de teste, é com o nome dele. Pelo nome, deve ser possível saber **exatamente** o que ele testa.

Imagine que você está testando uma função que cria um usuário. Quando esse teste rodar no seu [CI/CD](https://www.redhat.com/pt-br/topics/devops/what-is-ci-cd) {: .external-link target="_blank" rel="noreferrer noopener" } e quebrar, você tem que conseguir saber qual função de teste está quebrando para entender qual parte do sistema não está funcionando.

Basicamente, em uma olhada o seu teste deve responder a três perguntas. Imagine um exemplo: temos um sistema onde existe um cadastro de usuário. Estamos fazendo um teste em cima do cadastro do usuário e, propositalmente, forçamos um erro para testar se a função `addUser`, do controller `userController`, funciona devidamente quando submetida a uma situação de erro. Dito isso, vamos às três perguntas:

- "O que está sendo testado?". A função `addUser` dentro de `userController`;

- "Em qual contexto esse teste está sendo rodado?". Um usuário sendo criado, através da função `addUse`, sem um nome;

- "Qual o resultado esperado desse teste?". O usuário não deve ser criado.

Abaixo podemos ver código do exemplo acima apenas para tornarmos a situação lúdica.

```language-javascript
/* Qual o arquivo ou classe ou component estamos testando */
describe("UserController", () => {
  /* Qual a função/ação sendo testada */
  describe("Add new user", () => {
    /* contexto: Quando um nome não é passado ----- Resultado esperado: usuário não deve ser criado */
    test("When no name is provided, then the user should not be created", () => {
      const user = { name: null, email: "email@email.com", password: "123456" };
      const response = new UserController().addUser(user);

      expect(response.status).toEqual(500);
      expect(response.body.message).toEqual("Something went wrong");
    });
  });
});
```

Podemos perceber que quebramos o teste em partes. Dessa maneira, podemos agrupar diferentes testes dentro de um mesmo grupo. Dentro da suíte de testes do describe `UserController`, podemos colocar o restante dos testes de _CRUD_ como, por exemplo, o `removeUser`, `editUser` etc. Lembre-se, também, de usar uma linguagem similar à de produto. Isso significa que suas entidades devem ser nomeadas da mesma forma que o time de produto/negócio as nomeia.

#### Estruturando testes: arrange, act, assert!

Vamos ver agora como estruturamos o código dos testes. Existe uma técnica legal para essa parte chamada de "3A": **A**rrange, **A**ct & **A**ssert.

- **Arrange**/Organização: É nessa parte que fica todo o código de que seu teste precisa para simular um cenário real. Por exemplo: um mock, uma inserção/limpeza de dados num banco de dados de teste etc.

- **Act**/Ação: Lugar onde é executada a ação que queremos testar.

- **Assert**/Afirmação: Garante que o resultado do teste é o que estamos esperando.

Vamos colocar em prática essa técnica com um exemplo. Imaginem que temos uma aplicação onde existem conteúdos sensíveis para menores de 18 anos. No nosso projeto temos um arquivo de utilidades chamado `userUtils`. Nesse arquivo de utilidades, temos uma função chamada `isUserAnAdult` para validar se uma pessoa usuária em específico é, realmente, maior de idade.

Queremos testar, então, se a função `isUserAnAdult` funciona quando submetida a uma situação em que a pessoa usuária é maior de idade. Utilizando a técnica dos "3A", uma função de teste ficaria estruturada da seguinte forma:

```language-javascript
test("When user's age is bigger than 18, should be tagged as an adult", () => {
  /* Arrange/Organização: inicia o usuário como um mock */
  const user = { name: "Eduardo Pedroso", age: 21, email: "mail@mail.com" };

  /* Act/Ação: chama uma função e guarda o retorno, aqui é onde o teste acontece de fato */
  const isUserAnAdult = userUtils.isUserAnAdult(user);

  /* Assert/Afirmação: a flag major realmente voltou true? É aqui que vamos ter a resposta para essa pergunta */
  expect(isUserAnAdult).toEqual(true);
});
```

#### O que eu devo testar?

É muito impostante saber o que vale a pena testar e o que não vale. Um ponto **importante** que devemos ter em mente é: faça o possível para testar tudo como se fosse uma caixa preta. Não interessa como algo está implementado, nós queremos saber o que o alvo do teste recebe e o que ele devolve. Todo o resto é uma _caixa preta_: não sabemos como a coisa funciona lá dentro nem queremos saber.

Uma pessoa usuária vai executar uma ação e vai esperar uma resposta. Ela não se importa com o modo como o código está escrito ou se a implementação mudou ou não. Ela se importa com o _I/O_ da funcionalidade, ou seja, com o seu comportamento. É daí que vem um termo famoso: o `Behavioral Testing`, ou, como chamamos aqui no Brasil, **Teste de comportamento**. Esse termo fala por si só: vamos testar o comportamento de uma função e não a implementação. Lá no módulo de front-end estudamos a React Testing Library, que abraça em 100% essa filosofia! Aqui, ao invés de testar componentes, testamos módulos e funções.

O motivo de utilizarmos o teste de comportamento é o seguinte: _caso os internos da nossa função mudem mas o comportamento não, meus testes não deveriam quebrar._ Isso dá a liberdade de refatorar seu código à vontade. Seus testes continuarão funcionando se a funcionalidade das coisas se mantiver inalterada.

Vamos ver mais um exemplo para termos um entendimento menos abstrato. Imaginem que temos um loja online onde alguns produtos, de tempos em tempos, são colocados em promoção. Para que isso aconteça, temos um atributo chamado `discount` para ter controle dessa funcionalidade. Além disso temos, de novo, um arquivo de utilidades chamado `productUtils`. Nesse arquivo temos uma função para fazer o cálculo do preço final do produto, quando posto em promoção.

Dito isso, vamos ver como ficaria a implementação dessa situação e como ficaria o teste da função, fazendo uso do `teste de comportamento`:

```language-javascript
const calculateDiscount = (price, discount) => {
  return price - price * discount;
};
```

```language-javascript
test("When the discount is 15% and the discount flag is true, then the product price should be dicreased by 15%", () => {
  const product = { name: "Coca-cola", discount: 0.15, price: 10 };

  const finalPrice = productUtils.calculateDiscount(
    product.price,
    product.discount
  );

  expect(finalPrice).to.equals(8.5);
});
```

No caso que vimos de exemplo acima, não importa a forma com que o desconto é cálculado, 15% de 10 vai ser **sempre** 1,50. Com isso, o valor final do produto, com desconto, vai ser **sempre** 8,50. Ou seja: se, por algum motivo, decidirmos que é melhor mudarmos a maneira que estamos fazendo o cálculo do desconto, o nosso teste **tem** que continuar funcionando, pois o resultado **tem** que continuar sendo o mesmo.

Portanto, mesmo se mudarmos a maneira que estamos fazendo o cálculo, ou seja, se mudarmos os _internos da nossa função_, o comportamento esperado **tem** que ser o mesmo. Então dá pra refatorar à vontade sem temer pelos testes! Por isso que o `Behavioral Testing` é bastante utilizado.

#### Stubs e spies

Volte aos "3A", que comentamos anteriormente. No primeiro dos três "A", vulgo `Arrange`, nós fazemos o setup dos nossos testes. Parte desse setup envolve simular interações com APIs, bancos de dados e outras partes do código que não queremos ativar só para testar uma funcionalidade específica. Para isso, temos `spies` e `stubs`.

- **Spies**: um `spy` é um objeto que grava as interações com outros objetos. Eles são utilizados quando temos que usar alguma função que chama outra função e sabem dizer quantas vezes uma função foi chamada, quais parâmetros recebeu etc.;

- **Stubs**: `stubs` estabelecem um retorno esperado para uma chamada do que se está simulando, com determinados parâmetros. Múltiplos cenários de chamadas diferentes com parâmetros diferentes podem ser simulados.

Muitas vezes você verá outros nomes para essa prática de simular algo no contexto de testes: `fake`, `double`, `dummy`, `mock` etc. Uma boa prática é sempre favorecer `stubs e spies`. No **Jest**, inclusive, o que se chama de `mock` é o que tradicionalmente se conhece como `stub`. Viu como pode ser confuso? É preciso ter atenção! Para confundir um pouco mais, a palavra _mockar_, inclusive, um aportuguesamento da palavra em inglês para _simular_, "mock", é muitas vezes usada quando nos referimos a fakes, spies, stubs, doubles, todo o resto também.

Uma coisa interessante do _Jest_ é que a função `jest.fn()` gera um spy, porque podemos usar o `toHaveBeenCalled`, por exemplo, para saber se uma função foi chamada e até saber qual o parâmetro passado para ela. Ou seja, o spy verifica que determinada interação aconteceu! Podemos inclusive simular arquivos da nossa própria aplicação. Caso você tenha um controller que, por exemplo, chame um modelo para fazer alguma coisa, não queremos que nosso teste de controller teste o modelo também indiretamente. Ele tem um teste próprio para si, e se nossos testes têm _dependências_ assim, fica difícil sabermos onde está o problema quando algum deles quebra. Nesse caso, simulamos o comportamento esperado do modelo e testamos somente o controller!

```language-javascript
/* Como não vamos testar se o módulo de arquivos do Node funciona (esperamos que alguém já tenha feito isso), podemos simulá-lo */
jest.mock("fs");

/* Dentro do teste, podemos simular o método que nosso módulo deve chamar e qual o retorno */
fs.readFileSync = jest.fn().mockReturnValue({ id: 3 });
```

Nesse exemplo, quando alguém dentro do nosso teste chamar a função `fs.readFileSync`, vamos retornar um objeto `{id: 3}`. É importante ressaltar que devemos simular apenas dependências diretas dos nossos testes. Se nosso modelo já é simulado, não faz sentido simularmos uma dependência do modelo, ou uma dependência dessa dependência etc., certo? Vamos ver abaixo alguns exemplos de utilização dos tipos de setup que estamos comentando:

```language-javascript
const utils = require("./utils");

/* Mocka a função validateDate de dentro do objeto utils e retorna true */
const validateDateSpy = jest
  .spyOn(utils, "validateDate")
  .mockReturnValueOnce(true);
```

```language-javascript
/* É necessario importar o modelo que será mockado */
const UserModel = require("./model");

/* Mocka o método getById da classe UserModel */
const getById = jest
  .spyOn(UserModel.prototype, "getById")
  .mockReturnValueOnce(users);
```

### Dados nos testes

Os dados que você usa nos seus testes precisam ter nome, ser explícitos e o mais próximos da realidade possível. Isso inclui suas funções e variáveis. Imagine que queremos testar se o nosso sistema está recebendo o nome do usuário corretamente e passamos o seguinte valor para o nome: `name: 'xasdad123vd_l'`. Não é bom fazermos desse jeito, pois não é uma circunstância realista - nós não iremos receber dados dessa maneira, então por que testá-los assim?

Para testarmos com dados próximos dos reais, podemos utilizar bibliotecas que geram dados "pseudo-reais", como o [FakerJS](https://www.npmjs.com/package/faker).

```language-javascript
const addProduct = (name) => {
  const productNameRegexNoSpace = /^\S*$/; /* não permitimos espaços em branco */

  if (!productNameRegexNoSpace.test(name)) {
    /* Nesse código, a lógica nunca entrará no if, pois testamos manualmente um produto com apenas um nome, por exemplo */
    return false;
  }

  /* Alguma lógica de negócio qualquer nesse espaço */

  return true;
};
```

```language-javascript
it("When adding new valid product, get successful confirmation", async () => {
  /* Gera um retorno aleatório, tipo: 'Sleek Cotton Computer' */
  const addProductResult = await addProduct(faker.commerce.productName());
  expect(addProductResult).to.be.false;
  /* Acabamos de encontrar um bug, pois nosso produto tem múltiplos nomes (tem espaço em branco) */
});
```

Outra coisa a se pensar: "Como nós vamos conseguir testar todos os cenários diferentes possíveis para uma aplicação?". Essa é uma ótima pergunta! Porque nós conseguimos testar, "de cabeça", alguns cenários do tipo: esse campo vazio, aquele campo preenchido, com mais letras e por ai vai. Mas pense: em produção, podemos receber milhares de combinações de dados diferentes, muitas vezes coisas que nem imaginamos receber. Para lidar com isso, podemos usar uma técnica que se chama `Property-based testing`. Nela, usamos uma biblioteca, independente de usarmos [Jest](https://jestjs.io/) {: .external-link target="_blank" rel="noreferrer noopener" } ou [Mocha](https://mochajs.org/) {: .external-link target="_blank" rel="noreferrer noopener" }, que simula todos os cenários de produção, e não precisamos ficar pensando em "N" modos de nossas funções serem chamadas.

O nome dessa biblioteca é [fast-check](https://github.com/dubzzz/fast-check).

```language-javascript
import fc from "fast-check";

describe("Product service", () => {
  describe("Add new", () => {
    /* Isso vai rodar 100 vezes com propriedades aleatórias */
    it("Add new product with random valid properties, always successful", () =>
      fc.assert(
        /* Passamos um id e um nome para a função fc.property */
        fc.property(fc.integer(), fc.string(), (id, name) => {
          /* Aqui verificamos se o teste passou */
          expect(addNewProduct(id, name).status).toEqual("approved");
        })
      ));
  });
});
```

Outro ponto, para fecharmos essa parte dos dados nos testes, é **não usar variáveis globais para dados**. Seus testes devem ter **dentro deles** (ou seja, dentro dos respectivos escopos de `it`, `describe` etc.) tudo que é necessario para rodarem.

### Tests Colocation

Existe um conceito em engenharia de software que se chama `Colocation`, ou [Colocação](https://eduardopedroso.com.br/colocacao-de-codigo-melhorando-a-manutencao-e-performance-de-suas-aplicacoes/) {: .external-link target="_blank" rel="noreferrer noopener" }, em português. Ele nos diz que, dependendo de como os arquivos são editados, eles devem estar em um local específico.

> Vou precisar mudar esse pedaço de código junto com outro pedaço de código? Ele vai ser relevante aqui?

Esse conceito faz bastante sentido quando falamos de testes. Quando temos uma pasta `/src` e uma pasta `/test`, que replica a mesma estrutura de `src`, nós provavelmente vamos ter que mudar os arquivos de teste conforme formos editando os arquivos de código produtivo, certo? Se temos duas ou três pastas, tudo bem, mas imagina que tenhamos muitos níveis de pastas e com muitas pastas. É muito fácil se perder numa IDE com trinta arquivos abertos editando um pouquinho de cada pra fazer algo simples. Um exemplo de uma estrutura de pastas para seus testes que lida bem com isso é:

```language-md
└── src
│   └── User
│   │   └── controllers
│   │   │   ├── UserController.js
│   │   │   └── UserController.test.js
```

Dessa maneira fica mais fácil editarmos o teste junto com o arquivo principal, caso isso se mostre necessário. Lembrando que essa é apenas uma sugestão! Existem diversas maneiras de estruturar/arquitetar as pastas do seu projeto. A decisão fica a critério de quem está desenvolvendo. O importante é que faça sentido e que tenha consistência. **Arquitetura de código deve sempre ajudar, nunca atrapalhar**. Tenha essas técnicas como ferramentas na sua _toolbox_ e use-as conforme achar que faz sentido!

### Particularidades dos testes de back-end
#### A pirâmide de testes

É comum se deparar com uma situação análoga à da foto abaixo. Ela demonstra uma pirâmide de testes, em que os testes do topo são mais lentos e mais abrangentes, e a base faz o oposto. Essa piramide foi concebida já tem quase 10 anos. Apesar de ainda ser bastante relevante, de lá pra cá muitas novas técnicas de teste de software foram criadas, e as que já existiam foram melhoradas consideravelmente. Isso significa que nem todas as aplicações deveriam considerá-la como "a verdade absoluta". No final das contas, **qualquer modelo aplicado em 100% dos cenários vai estar errado em algum momento.** Estamos falando disso bastante, não estamos?

<%= figure(%{class: "rounded mxh-auto d-block", width: "788px", height: "auto", src: "https:\/\/res.cloudinary.com/drdpedroso/image/upload/v1590111900/test-pyramid_nsgye0.png", class: "text-center"}) %>

Os próximos tópicos vão te dar uma ideia de técnicas de testes que podem ser aplicadas em contextos específicos.

#### Testes de integração

Vamos falar agora de uma filosofia de testes oposta à de se testar cada parte do código separadamente. Vamos falar de **testes de integração**! Assim como na React Testing Library, por exemplo, podemos testar nosso código de maneira integrada. Ao invés de testar cada parte separadamente, testamos cada comportamento separadamente e, indiretamente, cobrimos toda a aplicação com testes asim!

Podemos, por exemplo, simular uma requisição para nossa API e conferir que a resposta é o que queremos, similar à forma com que nós fazemos no Postman. Nesse caso, mudamos um pouco a estrutura dos testes, já que não estamos testando uma unidade de código somente.

```language-javascript
describe("/login", () => {
  test("When request is sent only incorrect password, should return 400 and invalid fields message", () => {
    /* Envia o request */
    return request("http://localhost:3001")
      .post("/login")
      .send({ email: "email@mail.com", password: "1234A" })
      .then((response) => {
        /* Espera a resposta */
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Campos inválidos");
      });
  });
});
```

Mas então que tipo de teste usar? Os testes de unidade, que vimos antes, ou os de integração? Pois é. Não há resposta para isso. Depende da sua aplicação, do seu tempo, das suas necessidades, de tudo. É possível usar uma filosofia, a outra ou as duas. Cada uma tem vantagens e desvantagens: testes de integração reproduzem melhor o cenário real ao testar comportamentos, mas quando eles quebram fica difícil saber diretamente onde está o problema. Com qual complexidade você quer lidar? Com a de ter que descobrir com mais dificuldade onde está um problema ou com a de garantir que um conjunto de testes unitários testa com sucesso todos os comportamentos possíveis da API? Reúna-se com o seu time e tome a decisão!

#### Testando Express

Uma das coisas mais complicadas quando testamos uma aplicação escrita com `Express` é saber onde os middlewares se encaixam em todo esse negócio de teste. A resposta é: **teste seu middleware sempre em isolamento.** Apesar de serem pequenos, os middlewares desempenham uma função importantíssima e podem quebrar toda a aplicação, caso tenham algum erro.

**Um bug no seu middleware = um bug em todas ou quase todas as suas requisições.**

Vamos usar o Middleware a seguir como exemplo:

```language-javascript
async function checkAuth(req, res, next) {
  if (!req.session.data) {
    return res.status(401);
  }
  next();
}

app.use(checkAuth);
```

E então o testamos completamente isolado do restante da aplicação:

```language-javascript
describe("Middlewares", () => {
  describe("Check Auth", () => {
    it("Request received without session data, should return a 401", () => {
        /* Fazemos o setup. Como nossas funções não chamam outras funções, podemos usar um mock com jest.fn */
        const req = { session: {data: null}};
        const res = { status: jest.fn() };
        const next = jest.fn();
        /* Rodamos o teste */
        checkAuth(req, res, next);
        /* Verificamos se a chamada deu certo */
        expected(res.status).toHaveBeenCalledWith(401);
        /* E se a função next não foi chamada */
        expected(next).not.toHaveBeenCalled();
    }
  });
});
```

### Conclusão

O que vimos na aula hoje foi muito a respeito de **como organizar nossos testes**. Falamos sobre boas práticas para simular dados e módulos, sobre organização de arquivos de teste, sobre testes unitários e de integração, sobre o código dos testes em si. Lembre-se: testes são um assunto em aberto na comunidade e não existe forma absolutamente certa de fazer as coisas sempre. A forma correta de estruturar seus testes é as que os deixam mais legíveis, mais simples e que mais facilitem o seu trabalho.

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

Agora que já passamos pelos conceitos, está na hora de arregaçar as mangas e colocar a mão na massa com a nossa aula ao vivo!

Bora pro Slack, onde o link estará disponível. 😉

---

## Exercícios

###### Tempo sugerido para realização: 160 minutos

Hora de pôr a mão na massa!

<%= versioning_your_code(@conn) %>

### Instruções para realização dos exercícios

Nesse exercício, vamos utilizar uma aplicação já criada como base para escrever nossos testes.

##### Detalhes do projeto

1. Primeiro, crie um novo diretório para nosso projeto;

2. Crie um novo projeto:

```language-bash
$ npm init -y
```

3. Instale o pacote `express`:

```language-bash
$ npm install express
```

4. Instale o pacote `body-parser` para _parsear_ o corpo das requisições:

```language-bash
$ npm install body-parser
```

5. Na raiz do nosso projeto, crie o arquivo `index.js` para configurarmos o Express:

```language-javascript
const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('./controllers/productController.js')
const middlewares = require('./middlewares.js')

const app = express();

app.use(express.json());
app.use(middlewares.log)
app.use(middlewares.checkAuthToken)

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/products', controllers.getAllProducts);

app.get('/product/:id', controllers.getProductById);

app.post('/product', controllers.createProduct);

app.delete('/product/:id', controllers.deleteProductById);

app.put('/product/:id', controllers.editProductById);

app.listen(3000, () => {
  console.log("App listening on port 3000!");
});
```

6. Não vamos nos preocupar com acesso ao banco de dados. Crie uma pasta `models` e, dentro dela, o arquivo `productModel.js`. Dentro desse arquivo, vamos ter um CRUD completo utilizando como "banco" um arquivo JSON local:

```language-javascript
const fs = require('fs');

function getAll() {
  const rawData = fs.readFileSync('./products.json');
  const products = JSON.parse(rawData);

  return products;
}

function getById(id) {
  const rawData = fs.readFileSync('./products.json');

  const product = JSON.parse(rawData).find(
    (product) => product.id === parseInt(id)
  );

  return product;
}

function add(name, brand) {
  const rawData = fs.readFileSync('./products.json');
  const products = JSON.parse(rawData);

  const id = products[products.length - 1].id + 1;

  const product = { id, name, brand };
  products.push(product);

  fs.writeFile('./products.json', JSON.stringify(products), 'utf8', (err) => {
    if (err) throw err;
    console.log('write file ok');
  });

  return product;
}

function remove(id) {
  const rawData = fs.readFileSync('./products.json');
  const products = JSON.parse(rawData).filter(
    (product) => product.id !== parseInt(id)
  );

  fs.writeFile('./products.json', JSON.stringify(products), 'utf8', (err) => {
    if (err) throw err;
    console.log('write file ok');
  });

  return products;
}

function addOrUpdate(id, name, brand) {
  const rawData = fs.readFileSync('./products.json');
  const products = JSON.parse(rawData);

  const product = products.find((product) => product.id === parseInt(id));

  if (product) {
    product.name = name;
    product.brand = brand;

  } else {
    const newId = products[products.length - 1].id + 1;
    const newProduct = { id: newId, name, brand };
    products.push(newProduct);
  }

  fs.writeFile('./products.json', JSON.stringify(products), 'utf8', (err) => {
    if (err) throw err;
    console.log('write file ok');
  });

  return products;
}

module.exports = { add, remove, getAll, getById, addOrUpdate };


module.exports = Product;
```

7. Na raiz do nosso projeto, vamos criar o arquivo `products.json`. Esse será nosso "banco de dados":

```language-json
[
  { "id": 1, "name": "Cerveja Skol", "brand": "Ambev" },
  { "id": 2, "name": "Monitor AGON", "brand": "AOC" },
  { "id": 3, "name": "MacBook Air", "brand": "Apple" }
]
```

8. Vamos criar uma pasta `controllers` e, dentro dela, o arquivo `productController.js`:

```language-javascript
const ProductModel = require('./models/productModel.js');

const getAllProducts = (req, res) => {
  const products = ProductModel.getAll();

  res.status(200);
  res.json(products);
};

const getProductById = (req, res) => {
  const product = ProductModel.getById(req.params.id);

  if (product === null) {
    res.status(404);
    return res.send({ message: 'Produto não encontrado' });
  }

  res.status(200);
  res.json(product);
};

const createProduct = (req, res) => {
  const { id, name, brand } = req.body;

  try {
    const newProduct = ProductModel.add(id, name, brand);

    res.status(200);
    res.json(newProduct);
  } catch (e) {
    res.status(500);
    res.send({ message: 'Algo deu errado' });
  }
};

const deleteProductById = (req, res) => {
  try {
    const products = ProductModel.remove(req.params.id);

    res.status(200);
    res.json(products);
  } catch (e) {
    res.status(500);
    res.send({ message: 'Algo deu errado' });
  }
};

const editProductById = (req, res) => {
  const { name, brand } = req.body;

  try {
    const products = ProductModel.addOrUpdate(req.params.id, name, brand);

    res.status(200);
    res.json(products);
  } catch (e) {
    res.status(500);
    res.send({ message: 'Algo deu errado' });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProductById,
  editProductById,
};
```

9. Por último Crie agora o arquivo ``middlewares``, na raiz do projeto:

```language-javascript
const isTokenValid = (token = '') => {
  const regex = /^([a-zA-Z0-9 _-]+)$/;
  return token.length === 16 && regex.test(token);
};

const log = (req, res, next) => {
  console.log(req.body, new Date())
  next()
}

const checkAuthToken = (req, res, next) => {
  if (isTokenValid(req.headers.authorization)) {
    next();
  } else {
    res.status(401).json({ message: 'Token inválido!' });
  }
};

module.exports = {
  checkAuthToken,
  log
}
```

### Agora é sua vez!

**Exercício 1**: Vamos fazer o setup do Jest. Para isso, instale o `jest` como dependência de desenvolvimento `npm install jest` e crie um script no `package.json` do tipo `"test": "jest"`.

**Exercício 2**: Crie o arquivo com a extensão `.test.js` para testar seu controller e escreva um teste qualquer apenas para testar o setup.

**Exercício 3**: Crie também os arquivos de teste para o `model` e uma para o `middlewares` (que vai testar nossa função de validação de token também).

**Exercício 4**: Agora vamos escrever testes unitários para os controllers, pensando que cada uma das funções é uma unidade. Pense em todas as boas práticas da aula para escrever testes bons e simples!

**Exercício 5**: Agora que temos todas os controllers testados, está na hora de testarmos nosso modelo.

**Dica**: Preste bastante atenção nos mocks usando `jest.fn` e `jest.spyOn`, essas funções serão extremamente poderosas e podem te ajudar muito na hora de mockar coisas.

#### Bônus

**Bônus 1**: Utilize a biblioteca `FakerJS` para mockar seus dados mais próximos de um cenário real.

**Bônus 2**: Adicione testes de integração usando `supertest`, um para cada endpoint da nossa API, para aumentar ainda mais nosso _coverage_.

**Bônus 3**: Aplique `Property-based testing` utilizando a biblioteca `fast-check`.

---

## Recursos Adicionais

- [Mocks Aren't Stubs, por Martin Fowler](https://martinfowler.com/articles/mocksArentStubs.html) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Unit testing middlewares](https://medium.com/@morrissinger/unit-testing-express-middleware-behavior-in-ecmascript-2015-f1641ebb8040) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Jest mock functions](https://jestjs.io/docs/en/mock-function-api) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Node.js & JavaScript Testing Best Practices](https://medium.com/@me_37286/yoni-goldberg-javascript-nodejs-testing-best-practices-2b98924c9347) {: .external-link target="_blank" rel="noreferrer noopener" }

- [TDD em Nodejs: conhecendo o Jest](https://imasters.com.br/back-end/tdd-em-nodejs-conhecendo-o-jest) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Understanding Jest Mocks](https://medium.com/@rickhanlonii/understanding-jest-mocks-f0046c68e53c) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
