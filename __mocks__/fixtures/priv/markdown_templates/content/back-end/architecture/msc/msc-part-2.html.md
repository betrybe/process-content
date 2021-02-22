## O que vamos aprender?

Hoje você continuará a aprender a melhorar a organização e divisão de responsabilidades nas suas aplicações Node.js e Express, utilizando um dos padrões arquiteturais mais famosos do mercado: o **MSC**!

Além disso, você verá uma aplicação em que o modelo acessa um banco MongoDB e entenderá o que é a arquitetura de cliente-servidor.

<%= vimeo "511127937" %>

---

### Você será capaz de:

- Estruturar uma aplicação em camadas;

- Delegar responsabilidades específicas para cada parte do seu app;

- Melhorar manutenibilidade e reusabilidade do seu código.

---

## Por que isso é importante?

Ontem iniciamos o desenvolvimento de sua visão arquitetural, para ampliar esse conhecimento é preciso que você conheça e entenda outras camadas de uma aplicação. Desse modo você terá mais insumos para decidir como organizar seu código, facilitando a manutenção e a adição de novas funcionalidades;

Outro ponto é que arquiteturas mais focadas em APIs estão sendo cada vez mais utilizadas. É o que vamos focar hoje.

---

## Conteúdos

###### Tempo sugerido para realização: 80 minutos

### A arquitetura Cliente-Servidor

Hoje em dia, grande parte das aplicações web são construídas usando a arquitetura `cliente-servidor`.

A arquitetura cliente-servidor, ou modelo cliente-servidor, é uma **arquitetura de aplicações distribuídas** em que as tarefas são distribuídas entre módulos que fornecem algum recurso ou serviço, chamados de **servidores**, e módulos que requisitam os serviços, chamados de **clientes**.

Geralmente, servidores e clientes estão localizados em computadores diferentes, se comunicando através de uma rede de computadores, como a Internet, mas também é possível que residam no mesmo computador.

Você já utiliza aplicações com esse modelo, talvez até sem saber. Por exemplo, o **MySQL** segue esse modelo. Se você digitar `ps aux | grep mysqld` no terminal, verá que existe um processo chamado `mysqld` em execução na sua máquina (desde que o MySQL esteja instalado e iniciado). Esse é o **servidor do MySQL**, que armazena os dados, processa suas consultas e retorna resultados. O comando `mysql` que você utiliza é o **cliente do MySQL**. Ele se comunica com o servidor, enviando suas consultas e formatando os resultados recebidos. O mesmo se aplica ao MongoDB.

Como dissemos, cliente e servidor não precisam estar no mesmo computador. Se você tiver uma instância do MySQL executando na AWS ou no Heroku, utilizando o cliente, você é capaz de conectar-se a ela e utilizá-la da mesma forma que faz com seu servidor local.

Aplicações web, até algum tempo atrás, não utilizavam esse modelo. Armazenamento, regras de negócio e visualização ficavam a cargo do servidor. O cliente, que na grande maioria dos casos, era um usuário utilizando um browser, interagia com o servidor através de requisições HTTP e recebia como resposta o **HTML pronto** da página requisitada. Cabia ao browser apenas o trabalho de **renderizar esse HTML** recebido.

Com o advento de tecnologias como Angular, React e Vue.js, esse cenário começou a mudar. Com essas tecnologias, o front-end de uma aplicação é construído no cliente. Ou seja, o browser (ou outros dispositivos) é responsável também por **criar o HTML** que será exibido, além de renderizá-lo.

Isso significa que o back-end fornece APIs (que retornam JSON, normalmente) em vez de retornar um HTML diretamente para o cliente. O cliente consome essas APIs para obter os dados de que precisa. Mesmo usando SSR (Server Side Rendering - uma técnica em que o front-end é renderizado no servidor antes de ser enviado para o browser), as aplicações de front-end e back-end são desacopladas.

O diagrama abaixo demonstra como essa estrutura funciona.

<%= figure(%{class: "rounded mxh-auto d-block", width: "788px", height: "auto", caption: "Arquitetura cliente-servidor", src: "/back-end/architecture/msc/images/client-server-model.png", class: "text-center"}) %>

Seguir essa arquitetura traz alguns benefícios:

- A mesma API pode ser consumida por diferentes tipos de clientes, cada um responsável por alguma coisa diferente. Por exemplo, serviços como Netflix e YouTube têm clientes para celulares, desktop e TVs, todos consumindo a mesma API;

- A carga de trabalho no servidor diminui, uma vez que ele agora é responsável somente por prover os dados, delegando tarefas como construção de interfaces para os clientes. Com isso, é possível construir servidores que consomem menos recurso e, portanto, são mais baratos.

Durante todo o conteúdo de front-end com React você desenvolveu aplicações front-end usando essa arquitetura - só que apenas o lado do cliente. 😃

### A camada de controle

O `controller` recebe as requisições do `cliente` e então consulta o `service` enviando para o `cliente` aquilo que o `service` retornar, podendo ser uma mensagem de erro em caso de falha ou as informações requisitas em caso de sucesso. Em uma aplicação Node com Express, o controller vai ser a camada onde iremos definir nossos middlewares para rotas, geralmente em um escopo definido para um contexto bem específico.

Ao se comunicar com o `service`, o `controller` deve passar apenas as informações necessárias, sendo assim não é uma boa prática passar toda a `request` para o `service`, as informações devem ser extraídas e então apenas o que for necessário para determinada ação deve ser transferido.

Uma ótima analogia para o `controller` é que ele seria como um garçom em um restaurante.

O garçom não sabe como preparar os pratos e nem como recepcionar as pessoas na porta.

Ele apenas anota o pedido, sabe para que parte do restaurante levar o pedido e para qual mesa entregá-lo depois de pronto.

Quando você monta seu software em uma camada só, é como se o garçom fizesse todas as funções dentro do seu restaurante (recepcionar, anotar os pedidos, preparar os pratos etc.).

### A camada de serviço

Até agora, temos dito que regras de negócio ficam no modelo. E isso é verdade em outros padrões arquiteturais.

Mas é comum que, à medida que projetos vão crescendo, os modelos vão ficando cada vez maiores e mais complexos, pois vão acumulando cada vez mais regras de negócio.

Por isso, é comum vermos uma nova camada sendo adicionada em projetos que exigem uma lógica de negócio um pouco mais complexa e, principalmente, em APIs.

Essa camada é chamada de **service**. Ela fica situada entre as camadas de controller e model e é responsável pela nossa lógica de negócio. O modelo, então, passa a ser responsável somente pelo acesso a dados.

Você pode ver isso de outra forma: para evitar que o modelo fique grande demais, ele é quebrado em duas outras camadas, cada uma com parte da responsabilidade.

Pense nessa camada como o chef da cozinha do nosso restaurante. Ele é quem sabe as receitas e delega as funções para os funcionários depois de receber o pedido do garçom.

O diagrama abaixo mostra um exemplo de como isso funcionaria em um cenário em que temos apenas uma API exposta a requisições.

<%= figure(%{class: "rounded mxh-auto d-block", width: "600px", height: "auto", caption: "model-service-controller", src: "/back-end/architecture/msc/images/model-service-controller.png", class: "text-center"}) %>

Uma boa camada de serviço:

- Deve centralizar acesso a dados e funções externas. Exemplo: chamar um evento que dispara uma mensagem no Slack;

- Deve abstrair lógica de negócio complexa do seu modelo;

- Não deve ter nenhum tipo de informação sobre o acesso a camada de dados. Exemplo: não ter nenhuma query SQL;

- Não deve receber nada relacionado ao HTTP, seja o `request` ou o `response`. O controller deve mandar apenas o necessário para o `service`.

### Praticando

Para colocar em prática os conceitos de `controller` e `service` vamos adicionar essas camadas aplicação de autores que você viu ontem no conteúdo.

> Para essa prática usaremos a última versão da aplicação, isso é, aquela em que a aplicação acessa ao MongoDB

Vamos começar abstraindo toda a lógica do nosso `model`, mantendo nele apenas a conexão com o banco. Para isso substitua o conteúdo do arquivo pelo código abaixo ou assista o vídeo:

<%= vimeo "511128106" %>

> models/Author.js

```language-js
const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () =>
  connection()
    .then((db) => db.collection('authors').find().toArray())
    .then((authors) =>
      authors.map(({ _id, firstName, middleName, lastName }) => ({
        id: _id,
        firstName,
        middleName,
        lastName,
      }))
    );

const findById = async (id) =>
  connection().then((db) => db.collection('authors').findOne(ObjectId(id)));

const create = async (firstName, middleName, lastName) =>
  connection()
    .then((db) =>
      db.collection('authors').insertOne({ firstName, middleName, lastName })
    )
    .then((result) => result);

module.exports = {
  getAll,
  findById,
  create,
};
```

Note que removemos todas as lógicas que existiam nos `models`, agora a única responsabilidades deles é se conectarem com o banco. A partir de agora nosso `service` será responsável pelas lógicas que estavam no arquivo.

Crie a pasta `services` e dentro dela o arquivo `Authors.js`, adicione o código abaixo no arquivo:

```language-js
const Author = require('../models/Author');

const getNewAuthor = (authorData) => {
const { id, firstName, middleName, lastName } = authorData;

const fullName = [firstName, middleName, lastName]
  .filter((name) => name)
  .join(' ');

return {
  id,
  firstName,
  middleName,
  lastName,
  name: fullName,
 };
};

const isValid = (firstName, middleName, lastName) => {
  if (!firstName || typeof firstName !== 'string') return false;
  if (!lastName || typeof lastName !== 'string') return false;
  if (middleName && typeof middleName !== 'string') return false;

  return true;
};

const getAll = async () => {
  const authors = await Author.getAll();

  return authors.map(getNewAuthor);
};

const findById = async (id) => {
  const authorData = await Author.findById(id);

  if (!author) return null;

  const { firstName, middleName, lastName } = authorData;

  return getNewAuthor({ id, firstName, middleName, lastName });
}

const create = async (firstName, middleName, lastName) => {
  const userValid = isValid(firstName, middleName, lastName);

  if(!userValid) return false;

  const { insertedId } = await Author.create(firstName, middleName, lastName);

  return getNewAuthor({
    id: insertedId,
    firstName,
    middleName,
    lastName
  });
}

module.exports = {
  getAll,
  findById,
  create,
};
```

Agora nosso `service` guarda toda a lógica que se encontrava no `model`, é ele quem válida os dados e também quem os formata. Viu como nosso `model` ficou mais limpo e com apenas uma responsabilidade?

Por último vamos criar nosso `controller`. Você deve criar a pasta `controller` e dentro dela o arquivo `Author.js`, depois adicione o código a seguir:

```language-js
const Author = require('../services/Author');

const getAll = async (req, res) => {
  const authors = await Author.getAll();

  res.status(200).json(authors);
}

const findById = async (req, res) => {
  const { id } = req.params;

  const author = await Author.findById(id);

  if (!author) return res.status(404).json({ message: 'Not found' });

  res.status(200).json(author);
}

const create = async (req, res) => {
  const { first_name, middle_name, last_name } = req.body;

  const author = await Author.create(first_name, middle_name, last_name);

  if (!author) return res.status(400).json({ message: 'Dados inválidos' });

  res.status(201).json({ message: 'Autor criado com sucesso! '});
}

module.exports = {
  getAll,
  findById,
  create,
};
```

Você deve estar pensando "Esse não é o mesmo código que se encontra no index.js?", e bem, você tem toda a razão. É o `controller` quem lida com as `requests` e as `responses`, desse modo, ao invés de mantermos toda essa lógica no `index.js`, separamos ela no `controller` e então o usamos como middleware em nossas rotas no `index.js`, assim o arquivo fica responsável apenas por configurar e iniciar aplicação.

Assista o vídeo abaixo e depois veja o código para ver as mudanças de criar a camada de controller.

<%= vimeo "511128225" %>

> index.js

```language-js
const express = require('express');
const bodyParser = require('body-parser');

const Author = require('../controllers/Author');

const app = express();

app.use(bodyParser.json());

app.get('/authors', Author.getAll);

app.get('/authors/:id', Author.findById);

app.post('/authors', Author.create);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
```

##### Vamos praticar

Ontem, criamos um CRUD para a entidade `Books`. Vamos refatorar o código da aula de ontem aplicando a arquitetura MSC. Para isso:

1. Crie um arquivo `services/Book.js` e aplique as regras de negócio definidos no modelo `Book` para dentro do service. (lembre-se de remover de models/Book.js o que não vai ser mais utilizado na camada de modelo).
2. Crie um arquivo `controllers/BooksController.js` e transfira os middlewares relacionados ao nosso CRUD de livros para esse controller.

### Boas Práticas em Arquitetura de Software

Indiferente de qual padrão arquitetural você vai usar, existem algumas boas práticas que você deve sempre manter em mente, independente do padrão a ser seguido.

##### Pense antes de escrever código!

A primeira coisa é você entender qual é o problema que será resolvido e, a partir daí, começar a pensar em uma solução em nível de arquitetura.

Imagine o seguinte cenário:

> "Quero criar uma aplicação que mostra todas as fotos que as pessoas tiraram com base na localização. As versões mobile native e web serão parecidas, mas apenas a mobile poderá tirar fotos." - Cliente, Seu

Beleza! Pensando que vamos ter múltiplos clientes com funcionalidades semelhantes, faz sentido termos uma API, certo?

Pensando mais a fundo na arquitetura da API, é de se imaginar que vamos ter que subir as fotos em algum serviço de hospedagem (em vez de armazená-las nós mesmos), e vamos salvar no banco apenas a URL gerada após o _upload_. Nesse caso, faz bastante sentido termos uma camada de serviço que vai orquestrar essa parte de hospedagem.

Claro que, na prática, não é tão simples assim. 😬 Mas isso é só um exemplo de como você deve pensar em qual arquitetura faz mais sentido para o problema que está tentando resolver para, só depois, começarmos a codificar!

##### Pense em Componentes

Isso é bem parecido com o que nós fazemos com React! Você se lembra do princípio por trás dos componentes?

A intenção é que nossas aplicações sejam construídas com pequenos pedacinhos de código sem dependências entre si. A mesma coisa se aplica numa API também!

Dentro das suas camadas, mantenha cada controller, cada model e cada serviço pequeno e o mais desacoplado possível das outras partes. Faça com que eles se comuniquem somente através de interfaces muito bem definidas. Não deixe que um componente acesse diretamente o que está dentro de outro. Isso vai facilitar muito na hora de dar manutenção, reutilizar e testar seu código.

##### Mantenha suas pastas organizadas

Existem algumas maneiras de organizar as pastas em um projeto, mas vamos citar duas: por **domínio/correlação** e por **papel técnico**.

- **Por domínio/correlação**, nós mantemos todos os arquivos que têm relação com um `Author`, por exemplo, na mesma pasta, independente da responsabilidade de cada arquivo:

```language-bash
└── author
│   ├── authorController.js
│   ├── authorService.js
│   └── authorModel.js
└── book
│   └── bookController.js
│   └── bookService.js
│   └── bookModel.js
```

* **Por papel técnico** é como temos exemplificado até agora (não que seja necessariamente melhor). Todos os controllers em uma pasta, todos os services em outra e por aí vai:

```language-bash
└── controllers
│   ├── authorController.js
│   └── bookController.js
└── services
│   ├── authorService.js
│   └── bookService.js
└── models
│   ├── authorModel.js
│   └── bookModel.js
```

Muitas vezes, você vai utilizar um framework em que essa decisão já foi tomada. Nesse caso, siga com o padrão.

##### Mantenha o Express o **mais longe possível**.

O **mais longe possível** quer dizer que devemos criar fronteiras claras entre o Express e o "resto da sua aplicação".

Isso significa manter os objetos `req` e `res` dentro do escopo do controller e **nunca** passá-los inteiros para as partes do app que cuidam da lógica de negócio.

Tomando essa precaução simples, você vai evitar ficar criando mocks para esses objetos quando for escrever testes unitários, por exemplo.

Se o seu modelo precisa apenas dos campos `user` e `password` para fazer o login de alguém, para que passar para ele o objeto `req` e mandar todos os headers que vieram na requisição?

Observe este exemplo:

```language-javascript
const userController = async (req, res) => {
  try {
    // ruim 😧
    await UserService.create(req);

    // bom! 😊
    const { email, password } = req.body;
    await UserService.create(email, password);

    res.send({ message: 'Tudo certo!' });
  } catch (e) {
    res.status(500).send({ message: 'Algo deu errado' });
  }
};
```

Usando essas fronteiras como exemplo, **nada além da camada de controle deveria saber que o Express existe**.

##### Mantenha sua configuração separada (e segura)

Nos exemplos de aula, vimos que as informações sensíveis, como credenciais de acesso ao banco de dados, estavam todas expostas no nosso código. 😱

Só fizemos isso para fins didáticos. Uma ótima prática é usar variáveis de ambiente para controlar coisas relacionadas à configuração geral da sua aplicação (em qual banco se conectar, para qual URL apontar etc.). Variáveis de ambiente são variáveis que podem ser definidas no sistema operacional e, portanto, podem ser diferentes para cada ambiente (computador). Por exemplo, no seu computador local, a _URL_ do banco é uma, mas, no servidor da aplicação, a _URL_ do banco é outra. Para fazer isso funcionar, você pode utilizar uma variável de ambiente chamada `DB_URL` e utilizar valores diferentes para ela no servidor e na sua máquina local.

**OK, e como eu acesso essa variável no código?**

O ambiente Node tem uma variável global que se chama `process`; dentro dela temos um objeto `env` que armazena os valores de todas as variáveis de ambiente definidas no sistema operacional.

Podemos setar variáveis de ambiente pelo terminal:

```language-bash
DB_URL="mongodb://localhost:27017" node index.js
```

```language-js
console.log(process.env.DB_URL) // mongodb://localhost:27017
```

No entanto, uma forma melhor e mais fácil, quando temos muitas variáveis, é criar um arquivo `.env` na raiz do projeto e usar a biblioteca `dotenv`, que basicamente pega o conteúdo desse arquivo e o deixa acessível via `process.env`.

```language-bash
npm install dotenv
```

> .env

```language-bash
PORT=3000
DB_URL=mongodb://localhost:27017
DB_NAME=model_example
```

> index.js

```language-js
require('dotenv').config();
// ...

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
// Server listening on port 3000
```

> models.connection.js

```language-js
const mongoClient = require('mongodb').MongoClient;

const connection = () => {
  return mongoClient
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db(process.env.DB_NAME))
    .catch((err) => {
      console.error(err);
      process.exit(1);
   });
};

module.exports = connection;
```

Por último, não se esqueça de colocar o `.env` no `.gitignore`, pois não vamos querer versionar esse arquivo.

Dessa forma, as configurações da sua aplicação podem mudar de acordo com o ambiente, ou até mesmo com o tempo ficam separadas do código, que é o mesmo em qualquer ambiente. Além disso, você não estará mais adicionando dados sensíveis ao seu repositório, visto que o arquivo `.env` contém esses valores e não será versionado.

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

Agora que já passamos pelos conceitos mais básicos, está na hora de arregaçar as mangas e colocar a mão na massa com a nossa aula ao vivo!

Bora pro slack, onde o link estará disponível. 😉

---

## Exercícios

###### Tempo sugerido para realização: 80 minutos

Hora de pôr a mão na massa!

<%= versioning_your_code(@conn) %>

### Agora, a prática

**Exercício 1**: Nesse exercício, você vai desenvolver uma aplicação MSC para consulta de CEPs, chamada `cep-lookup`. Você utilizará uma API para buscar os dados relacionados a um CEP e salvará esses dados no MongoDB.

Um CEP válido é composto por 8 dígitos, com um hífen opcional separando os três últimos dígitos. Por exemplo, 30310-030 e 30310030 são CEPs válidos. 303100308 e AB897453 não são.

Para consultar um CEP, você deve utilizar a API [CEP lá.](http://cep.la/api) {: .external-link target="_blank" rel="noreferrer noopener" } A página contém instruções sobre como utilizar a API.

O service deve fornecer uma interface para consultar CEPs. Primeiramente, o service deve chamar o modelo para consultar o banco de dados pelo CEP procurado. Se o CEP for encontrado, seus dados são retornados sem consultar a API. Caso contrário, o service deve fazer uma requisição a API. O service então deverá enviar os dados para o modelo, para que ele possa salvar no MongoDB os dados da primeira API que responder com sucesso. Em outras palavras, o banco de dados funcionará como um cache de CEPs, enquanto a API só será consultada se um CEP não for encontrado localmente. Inicialmente, o banco deve estar vazio.

O banco de dados só precisa armazenar as seguintes informações: **CEP**, **UF**, **cidade**, **bairro** e **logradouro**. Um CEP salvo no banco deve conter somente números, sem hífens, e essa chave deve ser única para evitar que o mesmo CEP seja cadastrado duas vezes e otimizar a busca.

O CEP deve ser passado através da rota do endpoint da aplicação como uma `query`, da seguinte forma:

```language-bash
http :3000/lookup?cep=303100308
```

Se o CEP for válido, seus dados devem ser retornados em um `JSON`. Se o CEP não for encontrado, deve ser retornado um `JSON` com o campo mensagem com o texto `CEP não encontrado`. Se for digitado um CEP com formato inválido, deve ser retornado um `JSON` com o campo mensagem com o texto mensagem `CEP inválido`.

> Não se esqueça de enviar também o status da requisição de acordo com a situação.

Note que o CEP pode ser digitado no input com ou sem hífen, mas deve ser salvo no banco sem hífens.

Lembre-se de organizar sua aplicação seguindo a arquitetura MSC, separando as responsabilidades em camadas.

**Exercício 2**: Vamos incrementar a API `cep-lookup` com algumas estatísticas. Vamos armazenar informações sobre quantidade de consultas a CEPs, agrupando por estado e cidade. Por exemplo, se houve duas consultas a CEPs de Florianópolis e uma de Joinville, teremos nos banco estas informações:

```language-json
{
  "uf": "SC",
  "quantidade" 3
}
{
  "cidade": "Florianópolis",
  "quantidade" 2
}
{
  "uf": "Joinville",
  "quantidade" 1
}
```

Sempre que um CEP for consultado, os documentos relacionados a sua cidade e a seu estado devem ser atualizados, incrementando o contador.

Adicione à API um endpoint que permita consultar estatísticas por cidade e ou estado. Armazene os documentos sobre estatísticas em coleções diferentes no banco. Crie um modelo que forneça uma interface para ler e atualizar essas estatísticas.

As consultas devem ser feitas da seguinte forma:

```language-bash
# Consulta por estado:
http :3000/statistic?uf=MG

# Consulta por cidade:
http :3000/statistic?cidade=Belo Horizonte
```

Em uma requisição de consulta de CEP, será necessário ler ou salvar o CEP no banco e atualizar as estatísticas. Mantenha os modelos com responsabilidades separadas, ou seja, não coloque lógica de estatística no modelo de CEP ou vice-versa. Crie um serviço que acessará ambos os modelos para realizar as operações necessárias e chame esse serviço no controller.

---

## Recursos adicionais (opcional)

- [Best Practices with NodeJS](https://github.com/goldbergyoni/nodebestpractices#1-project-structure-practices) {: .external-link target="_blank" rel="noreferrer noopener" }

- [The Service Layer - Martin Fowler](https://martinfowler.com/eaaCatalog/serviceLayer.html) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Bulletproof node.js project architecture 🛡️](https://dev.to/santypk4/bulletproof-node-js-project-architecture-4epf) {: .external-link target="_blank" rel="noreferrer noopener" }

- [SMTP: o que é e para o que serve?](https://www.iagente.com.br/blog/smtp-o-que-e/) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

No próximo passo, vamos aprender sobre as outras camadas de uma aplicação e então ter total conhecimento sobre o **MSC**, um modelo de arquitetura bastante utilizado.

<%= next_button(@conn) %>
