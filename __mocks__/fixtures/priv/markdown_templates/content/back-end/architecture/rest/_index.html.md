## O que vamos aprender?

Nesse bloco, vamos nos aprofundar em um dos padrões mais famosos ao se construir uma API: o **REST**!

E vamos também aprender como aplicar esse padrão nas nossas APIs.

---

### Você será capaz de:

- Entender e aplicar os padrões REST;

- Escrever assinaturas para APIs intuitivas e facilmente entendíveis.

---

## Por que isso é importante?

O padrão REST vai delimitar como sua API deve se comportar ao se comunicar com o mundo.

Pense nisso como a "etiqueta" da sua API, tipo aquele negócio de usar a faca certa pra comer o peixe, sabe?

Saber essas práticas vai fazer total diferença quando pessoas forem integrar seus endpoints nas aplicações que elas forem construir. Da mesma maneira, vai facilitar quando você estiver do outro lado, fazendo a integração. 🙂

---

## Conteúdos

###### Tempo sugerido para realização: 60 minutos

### REST

Antes de começarmos: **RESTful = aplicar todos os princípios REST**. RESTful é, basicamente, um web service que implementa a arquitetura definida pelo padrão REST.

Pronto, agora vamos à definição formal:

Representational State Transfer (REST), em português Transferência Representacional de Estado, é um estilo de arquitetura de software, controlado pelo `W3C`, que define um conjunto de restrições a serem usadas para a criação de APIs.

Uma maneira interessante de explicar é a seguinte:

Imagine que você está em um jantar. Existem algumas coisas que você deveria fazer, como:

- Comer com a boca fechada;

- Não colocar os cotovelos na mesa;

- User os talheres corretamente;

- Não arrotar.

O REST deve ser visto da mesma forma: um conjunto de boas práticas. Quando você está construindo uma API, existem algumas normas que você deve seguir para ser "educado" (Restful).

Ele, o REST, vê cada aplicação como um conjunto de recursos que representam o estado. Ao consumir esses recursos, você está de alguma forma transferindo esse estado para o cliente (uma requisição `GET`, por exemplo) ou fazendo uma alteração nele (um `POST`, `PUT` ou `DELETE`).

### As 6 restrições para ser RESTful

A arquitetura REST define seis restrições, chamadas **constraints**, que devem ser respeitadas para que sua API seja `RESTful`.

#### 1 - Interface uniforme (_Uniform Interface_)

A interface de comunicação entre seu servidor e seu cliente deve ser definida e seguida à risca, através de um padrão, para que ela se mantenha consistente. Dessa forma, essa "constraint", se seguida à risca, simplifica e desacopla a sua arquitetura.

Essa interface inclui o **endpoint**, o **tipo de retorno** e o uso dos **verbos HTTP**.

##### Recursos

Um recurso, em REST, é uma abstração da informação. Dito isso, qualquer coisa que possa ser nomeada pode ser um recurso. Por exemplo:

- Usuários;

- Produtos;

- Compras;

- Etc.

Todos os exemplos acima podem ser considerados recursos.

No universo de Star Wars existem vários planetas. Na [SWAPI](https://swapi.dev/) {: .external-link target="_blank" rel="noreferrer noopener" }, podemos chamar um endpoint para listar todos os planetas ou apenas um. Nesse caso, **um planeta é um recurso**, e **planetas é uma coleção de recursos**.

O recurso a ser acessado/alterado deve ser identificado pelo endpoint da requisição. Exemplo: `https://swapi.dev/api/planets/:id`. Nessa URL, vemos que o recurso que queremos acessar, `planet`, é facilmente identificado.

Usar plural ou singular? Não importa. O importante é manter o padrão.

##### Tipo do retorno

Talvez você já tenha visto um header chamado `Content-type` nas respostas de requisições. Ele serve para dizer, para o nosso cliente, que tipo de conteúdo estamos retornando.

Se estamos retornando um JSON, enviamos o header como `Content-type: application/json`. Se fosse HTML, seria `Content-type: text/html`, e por aí vai.

Esse tópico é, literalmente, sobre manter esses retornos consistentes. Se o cliente pede ou envia informação no formato JSON, você deve processar e retornar mantendo o formato JSON.

Alguns formatos comums são `JSON`, `XML` e `JavaScript`.

##### Ações/Verbos

A ação que vamos realizar no recurso deve ser identificada pelo **verbo HTTP** da requisição.

Exemplos:

- POST/PUT: cria ou altera um recurso.

- GET: lê um recurso.

- DELETE: deleta um recurso.

Então, uma requisição `GET https://swapi.dev/api/planets/3` vai nos retornar o planeta com id = 3.

Já uma requisição `POST` ou `PUT` para `https://swapi.dev/api/planets/3` espera receber um corpo com dados para alterar o planeta com id = 3.

A mesma coisa acontece para um `DELETE https://swapi.dev/api/planets/3`, que deleta esse recurso.

Existem desenvolvedores que preferem usar apenas `GET` e `POST`, então é possivel vermos o `POST` substituindo os verbos `PUT` e `DELETE`.

##### Respostas

Respostas são sempre obrigatórias. Nunca deixe seu cliente sem resposta, mesmo que ela não tenha um corpo.

Existem boas práticas em relação aos `status code` que nosso servidor envia como resposta. Temos uma variedade de códigos que devemos utilizar em situações específicas:

- 1xx: Informação;

- 2xx: Sucesso;

- 3xx: Redirecionamento;

- 4xx: Erro do cliente;

- 5xx: Erro no servidor.

Existe [uma lista](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status) {: .external-link target="_blank" rel="noreferrer noopener" } completa e detalhada sobre códigos de status HTTP disponibilizada pela Mozilla.

#### 2 - Arquitetura cliente-servidor

Você já ouviu falar muito de arquitetura cliente-servidor, não é? De termos uma API e um cliente desacoplados? É exatamente o que o REST prega.

Não importa quem é nosso cliente, as nossas APIs têm que conseguir retornar dados para ele. O cliente pode ser um app mobile, web, tv, arduíno etc.

Lembra-se dos projetos que você fez no módulo de front-end, em que você consumia APIs externas, como a [SWAPI](https://swapi.dev/) {: .external-link target="_blank" rel="noreferrer noopener" }? Então, você poderia facilmente mudar as APIs com que esses projetos se comunicam para outras, desde que os contratos (os endpoints, os formatos das requisições, o que é retornado etc.) sejam mantidos.

Imagine como seria se o Mercado Livre não tivesse um padrão na API deles. Seria um caos para conseguir integrar no front-end que estávamos construindo.

O princípio básico aqui é a separação de responsabilidades em duas partes. O cliente se preocupa com a exibição dos dados, experiência do usuário etc. O servidor se preocupa com armazenamento e acesso dos dados, cache, log e por aí vai.

Isso permite que as duas partes se desenvolvam de forma independente. Você pode trocar o cliente ou adicionar um novo sem mudar nada no servidor. Você pode mover o servidor para uma outra plataforma, escalá-lo etc. Pode até mesmo mudar completamente sua arquitetura interna, desde que a API que você fornece para seus clientes não mude (endpoint, resposta etc.).

<%= figure(%{src: "/back-end/architecture/rest/images/client-server.png", class: "text-center rounded mx-auto d-block", width: "788px", height: "auto", caption: "Arquitetura cliente-servidor"}) %>

#### 3 - Sem estado (_Stateless_)

Essa constraint é um pouco mais complicada, mas nós temos um bom exemplo no React! Lembra-se quando criamos componentes que não tinham estado, e apenas recebiam props?

Esse é um dos conceitos mais importantes do REST. Ele que vai tornar possível nossa API responder a múltiplos clientes.

Não manter estado significa que **toda requisição deve conter todas as informações necessárias (ser autossuficiente) para nossa API realizar uma ação**. Desse jeito, não podemos reutilizar nenhum contexto que está armazenado no servidor (uma váriavel, por exemplo).

_Exemplo_:

Em um app em que você faz uma requisição para se logar, o servidor inicia sua sessão e te retorna um token.

Na próxima requisição, você precisa enviar o token novamente, pois o servidor "não se lembra" de você.

Esse ponto é importante, pois nos dá alguns benefícios:

- **Transparência**: facilita o trabalho do lado do servidor, pois todas as informações necessárias já estão na requisição;

- **Escalabilidade**: sem precisar manter estado, nosso servidor pode desalocar recursos que foram alocados para realizar uma ação específica e alocá-los apenas quando necessário.

#### 4 - _Cacheable_

Primeiro, precisamos saber o que é `cache`. Cache é simplesmente um "depósito de informações". O exemplo mais próximo disso é quando seu navegador armazena imagens e arquivos para não precisar pedi-los para o servidor novamente toda vez que você revisitar uma página.

Esse cache é feito no lado do cliente, no browser.

O princípio aqui é que **as respostas dadas pela nossa API devem dizer, explicitamente, se podem ou não ser cacheadas e por quanto tempo**. Com isso, evita-se que clientes forneçam respostas "velhas" ou inapropriadas.

Vale ressaltar que o cache deve ser usado sabiamente. Usá-lo demais faz sua API perder a confiabilidade, e usá-lo de menos pode sobrecarregar seu servidor desnecessariamente.

> Uma camada de cache bem gerenciada pode reduzir ou eliminar iterações do lado do cliente, aumentando a escalabilidade e a performance da nossa API.

No HTTP, o cache é definido pelo header `Cache-Control: max-age=120`. Nesse caso, o cliente "cacheia" a resposta da requisição por 120 segundos. Durante esse tempo, o cliente fornecerá a resposta cacheada, sem precisar consultar o servidor.

#### 5 - Sistema em camadas (_Layered System_)

No caso do REST, essa divisão em camadas **não tem nada a ver** com a organização do nosso código diretamente. Esse princípio é sobre **abstrair do cliente as camadas necessárias para responder a uma requisição**.

Não importa se voce tem uma "API A" que se comunica com a "API B" que se comunica com uma fila ou um arquivo num "local C", ou se consulta um banco de dados, ou se esse banco de dados é local ou está armazenado em outro lugar. Quem consome a API não precisa saber de onde essas coisas estão vindo. Só precisa receber a resposta esperada.

#### 6 - Código sob demanda (_Code on Demand_)

Esse princípio consiste em dar a possibilidade de o nosso servidor enviar código (JavaScript, por exemplo) ao nosso cliente, onde será executado. Assim, você consegue customizar o comportamento do cliente.

Um exemplo prático: enviar um "widget" para colocar na página um chat para que o cliente possa conversar com alguém.

Você não precisa implementar código sob demanda para ser RESTful, logo esse item é considerado opcional.

### Ser ou não ser, eis a questão

Agora que vimos as restrições do REST, vale ressaltar: **Você não precisa aplicar todas elas, a não ser que você realmente queira ser RESTful!**

Cenários diferentes exigem soluções diferentes. Em Software, nada é escrito em pedra. Os princípios podem ser quebrados, desde que a justificativa para tal seja plausível.

<%= youtube_video "S7MduKwvVGk" %>

### REST no Express

De maneira geral, usar o Express ou qualquer outro framework não deve fazer muita diferença. Os princípios devem ser seguidos independente da tecnologia que você usar na implementação da sua API. Ela pode ser escrita em Node.js, em Python, em Perl, tanto faz.

Uma das vantagens de se usar o Express para construção de APIs é a organização das rotas. Podemos definir N controllers (funções callback que lidam com as requisições) para a mesma rota, separando-as apenas pelo verbo HTTP da requisição.

Além disso, é simples retornar um formato específico solicitado pelo cliente, da mesma maneira que é simples retornar um status HTTP.

```language-javascript
app.route('/user')
  .get((req, res) => {
    // Realiza uma operação
    res.status(401).send({
      message: 'Usuário não autorizado'
    })
  })
  .post(...)
  .put(...)
  .delete(...)
```

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

Agora que já passamos pelos conceitos mais básicos, está na hora de arregaçar as mangas e colocar a mão na massa com a nossa aula ao vivo!

Bora pro slack, onde o link estará disponível. 😉

---

## Exercícios

###### Tempo sugerido para realização: 160 minutos

Hora de pôr a mão na massa!

<%= versioning_your_code(@conn) %>

### Instruções para realização dos exercícios

Esse exercício vai ser um pouco diferente. Vamos trabalhar com uma técnica de desenvolvimento de software chamada de **refactoring**.

Essa técnica consiste em alterar um pedaço de código que já existe e deixá-lo melhor. É exatamente isso que vamos fazer!

Vamos refatorar uma API que faz gestão de produtos para deixá-la mais elegante e respeitando os padrões impostos pelo REST. Quem sabe até deixá-la **RESTful**?

##### Detalhes do projeto

1. Primeiro, crie um novo diretório para nosso projeto;

2. Crie um novo projeto:

```language-bash
npm init -y
```

3. Instale o pacote `express`:

```language-bash
npm install express
```

4. Instale o pacote `body-parser` para parsear o corpo das requisições:

```language-bash
npm install body-parser
```

5. Instale o pacote `nodemon` para criar um servidor que se atualize em cada alteração salva nos arquivos:

```language-bash
npm install nodemon
```

Adicione a linha abaixo no seu package.json, no objeto `"scripts"` para rodar o nodemon com o comando `npm run debug`:

```language-javascript
"debug": "nodemon index.js"
```

Não se esqueça de incluir uma vírgula na linha anterior para se adequar a sintaxe do `package.json`.


6. Por fim, instale o pacote `mysql2` para conectar com o banco:

```language-bash
npm install mysql2
```

Se preferir instalar todas as dependecias de uma vez, use o comando a baixo:

```language-bash
npm install mysql2 nodemon body-parser express
```

7. Na raiz do nosso projeto, crie o arquivo `index.js` para configurarmos o express:

```language-javascript
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/products', require('./controllers/productController'));

app.listen(3000, () => {
  console.log("App listening on port 3000!");
});
```

8. Vamos criar uma conexão com o `mysql`, crie uma pasta `models` e um arquivo `connection.js`:

```language-javascript
const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost', // Se necessário, substitua pelo seu host, `localhost` é o comum
  user: 'root', // Se necessário, substitua pelo seu usuário para conectar ao banco na sua máquina
  password: 'senha123', // Se necessário, substitua pela sua senha para conectar ao banco na sua máquina
  database: 'rest_exercicios'});

module.exports = connection;
```


Ainda na pasta `models`, dentro dela, crie o arquivo `productModel.js`. Dentro desse arquivo, vamos ter um CRUD completo utilizando uma conexão com o MySQL:

```language-javascript
const connection = require('./connection');

const add = async (name, brand) => {
  try {
    const [
      result,
    ] = await connection.query(
      `INSERT INTO products (name, brand) VALUES (?, ?);`,
      [name, brand]
    );

    return { id: result.insertId, name, brand };
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
};

const getAll = async () => {
  try {
    const [rows] = await connection.query('SELECT * FROM products');
    return rows;
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
};

const getById = async (id) => {
  try {
    const [result] = await connection.query('SELECT * FROM products WHERE id = ?', [id]);
    if (!result.length) return null
    return result[0];
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
};

const update = async (id, name, brand) => {
  try {
    await connection.query('UPDATE products SET name = ?, brand = ? WHERE id = ?', [name, brand, id])
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
};

const exclude = async (id) => {
  try {
    const product = await getById(id);
    if (!product) return {};
    await connection.query('DELETE FROM products WHERE id = ?', [id])
    return product;
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
};

module.exports = { add, getAll, getById, update, exclude };
```

7. Execute esse script para subir o banco do exercício:

```language-bash
DROP DATABASE IF EXISTS rest_exercicios;
CREATE DATABASE IF NOT EXISTS rest_exercicios;
USE rest_exercicios;

CREATE TABLE IF NOT EXISTS products (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    brand VARCHAR(100) NOT NULL
);

INSERT INTO products (name, brand)
VALUES ('Cerveja Skol', 'Ambev'),
       ('Monitor AGON', 'AOC'),
       ('MacBook Air', 'Apple');
SELECT * FROM products;
```

8. Por último, vamos criar uma pasta `controllers` e, dentro dela, o arquivo `productController.js`. Esse será o local onde utilizaremos a técnica de refactoring:

```language-javascript
const express = require('express');
const ProductModel = require('../models/productModel');

const router = express.Router();

router.get('/list-products', async (req, res, next) => {
  const products = await ProductModel.getAll();

  res.send(products);
});

router.get('/get-by-id/:id', async (req, res, next) => {
  const product = await ProductModel.getById(req.params.id);

  res.send(product);
});

router.post('/add-user', async (req, res) => {
  const { name, brand } = req.body;

  const newProduct = await ProductModel.add(name, brand);

  res.send(newProduct);
});

router.post('/delete-user/:id', async (req, res) => {
  const products = await ProductModel.exclude(req.params.id);

  res.send(products);
});

router.post('/update-user/:id', async (req, res) => {
  const { name, brand } = req.body;

  const products = await ProductModel.update(req.params.id, name, brand);

  res.send(products);
});

module.exports = router;
```

### Agora é sua vez!

**Exercício 1**: Pense qual é o recurso que estamos trabalhando e altere os endpoints para que fiquem padronizados.

**Exercício 2**: Padronize todos os retornos para JSON.

**Exercício 3**: Utilize os verbos (POST, PUT, GET etc.) corretos para cada ação do CRUD.

**Exercício 4**: Garanta que todos os endpoints tenham as respostas (status code) corretas, ou seja, código para quando der tudo certo, código pra quando ocorrer erro etc.

**Dica**: Para testar suas requisições você pode utilizar o [Postman](https://www.postman.com/).

#### Bônus

1. Refatore a API para que utilize MongoDB como banco de dados.

---

## Recursos Adicionais

- [What is REST](https://restfulapi.net/) {: .external-link target="_blank" rel="noreferrer noopener" }

- [What are Resources](https://restful-api-design.readthedocs.io/en/latest/resources.html) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Software Architecture Guide - Martin Fowler](https://martinfowler.com/architecture/) {: .external-link target="_blank" rel="noreferrer noopener" }

- [https://pt.wikipedia.org/wiki/Arquitetura_multicamada](Arquitetura Multicamadas) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Embedded JavaScript templating.](https://ejs.co/) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Lista de MIME Types no MDN](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Basico_sobre_HTTP/MIME_types) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Documentação do Content-Type no MDN](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/Content-Type) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
