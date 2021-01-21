## O que vamos aprender?

Neste bloco, você vai aprender a melhorar a organização e a divisão de responsabilidades nas suas aplicações Node.js e Express, utilizando um dos padrões arquiteturais mais famosos do mercado: o **MSC**!

Além disso, você verá uma aplicação em que o modelo acessa um banco MongoDB e entenderá o que é a arquitetura de cliente-servidor.

---

### Você será capaz de:

- Estruturar uma aplicação em camadas;

- Delegar responsabilidades específicas para cada parte do seu app;

- Melhorar manutenibilidade e reusabilidade do seu código.

---

## Por que isso é importante?

A intenção desse tema é ampliar sua visão arquitetural. Além disso, dividir sua aplicação em camadas facilita muito a manutenção, a adição de novas funcionalidades e a organização geral do seu código, pois você sabe exatamente onde cada coisa deve ficar.

Quanto mais padrões você conhecer e quanto mais entender em quais cenários cada uma se aplica melhor, maiores as chances de o seu projeto ter sucesso.

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

Isso é exatamente o que acontece nos exemplos de aplicações MVC que você viu no primeiro dia: tudo é feito no servidor; o cliente só recebe um HTML e o renderiza.

Com o advento de tecnologias como Angular, React e Vue.js, esse cenário começou a mudar. Com essas tecnologias, o front-end de uma aplicação é construído no cliente. Ou seja, o browser (ou outros dispositivos) é responsável também por **criar o HTML** que será exibido, além de renderizá-lo.

Isso significa que o back-end fornece APIs (que retornam JSON, normalmente) em vez de retornar um HTML diretamente para o cliente. O cliente consome essas APIs para obter os dados de que precisa. Mesmo usando SSR (Server Side Rendering - uma técnica em que o front-end é renderizado no servidor antes de ser enviado para o browser), as aplicações de front-end e back-end são desacopladas.

O diagrama abaixo demonstra como essa estrutura funciona.

<%= figure(%{class: "rounded mxh-auto d-block", width: "788px", height: "auto", caption: "Arquitetura cliente-servidor", src: "/app/s/msc/images/client-server-model.png", class: "text-center"}) %>

Seguir essa arquitetura traz alguns benefícios:

- A mesma API pode ser consumida por diferentes tipos de clientes, cada um responsável por alguma coisa diferente. Por exemplo, serviços como Netflix e YouTube têm clientes para celulares, desktop e TVs, todos consumindo a mesma API;

- A carga de trabalho no servidor diminui, uma vez que ele agora é responsável somente por prover os dados, delegando tarefas como construção de interfaces para os clientes. Com isso, é possível construir servidores que consomem menos recurso e, portanto, são mais baratos.

Uma outra consequência é que, pelo fato de desacoplarmos o front-end do back-end, abrimos caminhos para **remover a camada de apresentação** de aplicações MVC, já que outra aplicação será responsável por cuidar dessa parte.

Durante todo o conteúdo de front-end com React você desenvolveu aplicações front-end usando essa arquitetura - só que apenas o lado do cliente. 😃



##### Exemplo: enviando emails

Vamos entender melhor como isso funciona com um exemplo. Suponha que, na nossa plataforma, cada vez que um escritor for cadastrado, queremos enviar um email para alguém, comunicando esse evento. Vamos ver como podemos fazer isso funcionar.

Nós não temos um servidor de email para mandar emails reais, mas podemos usar o [Mailtrap,](https://mailtrap.io/) {: .external-link target="_blank" rel="noreferrer noopener" } que é um servidor [SMTP](https://pt.wikipedia.org/wiki/Simple_Mail_Transfer_Protocol) {: .external-link target="_blank" rel="noreferrer noopener" } falso usado para ambientes de desenvolvimento.

Crie uma conta no site gratuitamente. Terminado o cadastro, você deverá ver uma caixa de entrada chamada "Demo inbox". Se isso não acontecer, clique no botão "Create inbox".

<%= figure(%{class: "rounded mxh-auto d-block", width: "800px", height: "auto", src: "/app/s/msc/images/mailtrap.png", class: "text-center"}) %>

Em seguida, clique na sua Demo inbox. Como você ainda não enviou nenhum email, ela estará vazia. No campo "Credentials", você encontrá as credenciais de que precisa para enviar emails para sua caixa de entrada.

<%= figure(%{class: "rounded mxh-auto d-block", width: "800px", height: "auto", src: "/app/s/msc/images/mailtrap-credentials.png", class: "text-center"}) %>

Agora, precisamos de um pacote que nos permita enviar emails pelo Node.js. Vamos instalar o `nodemailer`:

```language-bash
$ npm install nodemailer
```

Adicione o código abaixo ao método `create` do modelo `Author`. Não se esqueça de importar o módulo `nodemailer` no começo do arquivo e colocar suas credenciais do Mailtrap.

> models/Author.js

```language-js
// const { ObjectId } = require('mongodb');
const nodemailer = require('nodemailer');

// ...

const create = async (firstName, middleName, lastName) => {
  /* Armazenamos o novo author em uma variável */
  const author = await connection()
    .then((db) => db.collection('authors').insertOne({ firstName, middleName, lastName }))
    .then(result => getNewAuthor({ id: result.insertedId, firstName, middleName, lastName }));

  /* Criamos uma nova instância do nodemailer, que fará o envio do email */
  const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '' /* Coloque suas credenciais do Mailtrap aqui */,
      pass: '',
    },
  });

  /* Definimos as opções para envio do email */
  const mailOptions = {
    from: 'mario@mushroomkingdom',
    to: 'bowser@mushroomkingdom.com',
    subject: "It's a-me, Mario!",
    text: `Olá, ${author.name}! Boas vindas à nossa plataforma.`,
  };

  /* Realizamos o envio do email, passando um callback que escreverá no console o resultado do envio */
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log('Não foi possível enviar email: ', err);
        return reject(err);
      }

      console.log('Email enviado com sucesso: ', info);
      resolve(author);
    });
  });
};

// ...
```

Com isso, toda vez que um usuário for criado, um email será enviado.

Reinicie o servidor, crie um usuário e verifique sua caixa de email no Mailtrap. Você deverá ver um novo email.

<%= figure(%{class: "rounded mxh-auto d-block", width: "800px", height: "auto", src: "/app/s/msc/images/email-received.png", class: "text-center"}) %>

Mas será que é uma boa ideia colocar esse código no modelo? Isso nos traz vários problemas:

- Nosso código está maior e mais complexo;

- É mais difícil de testar. Como testamos que um email é enviado? Como impedimos um email de ser enviado cada vez que um teste desse modelo rodar? Teremos que fazer um mock do `nodemailer` de alguma forma?

- E se quisermos criar um escritor sem enviar email? Isso poderia acontecer, por exemplo, se nossa aplicação fizesse uma integração com outra plataforma. Poderíamos adicionar um parâmetro como `shouldSendEmail` na função `create`, mas isso a deixaria ainda mais complexa, pois adicionaríamos fluxo de controle condicional.

Uma opção melhor é extrair essa lógica do modelo e mover para um serviço. Vamos fazer isso.

Retire toda a lógica de envio de email que você colocou no modelo. Crie uma pasta `services` e, dentro dela, crie um arquivo `authorService.js`. Coloque nele o código abaixo:

> services/authorService.js

```language-js
const nodemailer = require('nodemailer');
const Author = require('../models/authorModel');

const create = (firstName, middleName, lastName) => {
  /* Criamos o autor com o model */
  const author = await Author.create(firstName, middleName, lastName);

  /* Criamos uma nova instância do nodemailer, que fará o envio do email */
  const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '' /* Coloque suas credenciais do Mailtrap aqui */,
      pass: '',
    },
  });

  /* Definimos as opções para envio do email */
  const mailOptions = {
    from: 'mario@mushroomkingdom',
    to: 'bowser@mushroomkingdom.com',
    subject: "It's a-me, Mario!",
    text: `Olá, ${author.name}! Boas vindas à nossa plataforma.`,
  };

  /* Realizamos o envio do email, passando um callback que escreverá no console o resultado do envio */
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log('Não foi possível enviar email: ', err);
        return reject(err);
      }

      console.log('Email enviado com sucesso: ', info);
      resolve(info);
    });
  });
};

module.exports = {
  create
};
```

E no controller, mude a função `createAuthor`:

> controllers/authorController.js

```language-js
// ...
// const Author = require('../models/Author');
const authorService = require('../services/authorService');

// const createAuthor = async (req, res) => {
//   const { first_name, middle_name, last_name } = req.body;

//   if (!Author.isValid(first_name, middle_name, last_name)) {
//     return res.render('authors/new', { message: 'Dados inválidos' });
//   }

  await authorService.create(first_name, middle_name, last_name);
//   res.redirect('authors');
// };

// ...
```

Agora, o controller chama o service. O service cria um escritor chamando o modelo e envia um email. O modelo permanece com a responsabilidade única de ler e criar escritores. Se precisarmos, podemos usar diretamente o modelo para criar novos escritores, sem que emails sejam enviados.

<%= vimeo "412468451" %>

### Boas Práticas em Arquitetura de Software

Não importa se você vai usar MVC, MSC ou qualquer outro padrão arquitetural. Existem algumas boas práticas que você deve sempre manter em mente, independente do padrão a ser seguido.

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

O **mais longe possível** que citamos no título dessa sessão quer dizer que devemos criar fronteiras claras entre o Express e o "resto da sua aplicação".

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
DB_NAME=mvc_example
```

> index.js

```language-js
require('dotenv').config();
// ...

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
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

Os exercícios a seguir se baseiam na aplicação de consulta de CEP construída no exercício da [aula de MVC](/back-end/architecture/mvc/part-1/) do bloco anterior. É preciso que ela esteja terminada antes de realizar as alterações propostas nos exercícios.

<br>

**Exercício 1**: Modifique sua aplicação, substituindo o MySQL pelo MongoDB, mantendo exatamente o mesmo comportamento. Concentre suas mudanças na camada de modelo e tente alterar o mínimo possível nas outras camadas.

<br>

**Exercício 2**: Remova a camada de view da aplicação, transformando-a em uma API que recebe e retorna `JSON`. Concentre as alterações na camada de controller. Idealmente, o modelo não deve ser alterado.

<br>

**Exercício 3**: Vamos incrementar a API `cep-lookup` com algumas estatísticas. Vamos armazenar informações sobre quantidade de consultas a CEPs, agrupando por estado e cidade. Por exemplo, se houve duas consultas a CEPs de Florianópolis e uma de Joinville, teremos nos banco estas informações:

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

Adicione à API um endpoint que permita consultar estatísticas por cidade ou estado. Armazene os documentos sobre estatísticas em apenas uma coleção no banco. Crie um modelo que forneça uma interface para ler e atualizar essas estatísticas.

Em uma requisição de consulta de CEP, será necessário ler ou salvar o CEP no banco e atualizar as estatísticas. Mantenha os modelos com responsabilidades separadas, ou seja, não coloque lógica de estatística no modelo de CEP ou vice-versa. Crie um serviço que acessará ambos os modelos para realizar as operações necessárias e chame esse serviço no controller.


---

## Recursos adicionais (opcional)

- [Best Practices with NodeJS](https://github.com/goldbergyoni/nodebestpractices#1-project-structure-practices) {: .external-link target="_blank" rel="noreferrer noopener" }

- [The Service Layer - Martin Fowler](https://martinfowler.com/eaaCatalog/serviceLayer.html) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Bulletproof node.js project architecture 🛡️](https://dev.to/santypk4/bulletproof-node-js-project-architecture-4epf) {: .external-link target="_blank" rel="noreferrer noopener" }

- [SMTP: o que é e para o que serve?](https://www.iagente.com.br/blog/smtp-o-que-e/) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
