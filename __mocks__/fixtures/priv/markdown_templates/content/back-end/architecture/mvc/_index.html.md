## O que vamos aprender?

Hoje, você vai aprender uma outra forma de organização e divisão de responsabilidades nas suas aplicações Node.js e Express, utilizando um dos padrões arquiteturais mais famosos do mercado: o **MVC**!

### Você será capaz de:

- Estender a arquitetura MSC criando novas camadas;

- Estruturar um modelo em camadas sem a camada de serviço (`service`).

---

## Por que isso é importante?

O MVC é um dos padrões arquiteturais mais utilizados no mercado. Inclusive, frameworks como [Ruby on Rails](https://rubyonrails.org/) {: .external-link target="_blank" rel="noreferrer noopener" } e [Cake PHP](https://cakephp.org/) {: .external-link target="_blank" rel="noreferrer noopener" } adotam o MVC como estrutura para suas aplicações. Além disso, quanto mais padrões você conhecer e quanto mais entender em quais cenários cada um se aplica melhor, maiores as chances de o seu projeto ter sucesso.

Lembre-se: **uma arquitetura pobre pode matar um projeto conforme ele vai crescendo.**

---

## Conteúdos

###### Tempo sugerido para realização: 80 minutos

### O que é MVC?

MVC é uma sigla para `Model-View-Controller`, um dos mais antigos e mais utilizados padrões de arquitetura de software.

O padrão foi criado nos anos 1980, dentro da Xerox, para o desenvolvimento de interfaces gráficas, mas o que o tornou mais popular foi a sua adoção em aplicações web.

Como todo padrão de arquitetura, o MVC organiza e divide o código de uma aplicação em camadas, cada uma com suas responsabilidades. Ele é composto por três camadas, duas das quais você já conhece: a camada de modelo (`Model`), a camada de apresentação/visão (`View`) e a camada de controle (`Controller`).

Essa divisão permite que as regras de negócio fiquem longe da camada de apresentação, tornando possível uma maior reutilização de código.

<%= figure(%{caption: "Arquitetura MVC", src: "https:\/\/res.cloudinary.com/drdpedroso/image/upload/c_scale,w_600/v1587419422/1_xz-ROnwiDsjLPumoV5RotA_medxbn.png", class: "text-center"}) %>

O que o MVC provê é um guia geral de como organizar uma aplicação que suporta interação com usuário.

Antes de prosseguir, assista ao vídeo abaixo para saber um pouco mais sobre o MVC, sua história e seus principais prós e contras:

<%= youtube_video "jyTNhT67ZyY" %>

### Model e Controller

Anteriormente você aprendeu sobre essas duas camadas no contexto da arquitetura `MSC`. Apesar de agora estarmos falando no contexto do `MVC` o `model` ainda é onde nós manipulamos e definimos a estrutura dos nossos dados, sendo que todo acesso aos dados deve passar por essa camada. E o `controller` ainda é responsável por receber as requisições e enviar as respostas, mas agora ele faz a ponte entre a `view` e o `model`, recebendo as ações da `view` e decidindo o que deve ser mostrado para a pessoa realizando a ação, após consultar o modelo, se necessário.

Mas agora que não temos mais a camada de `service`, onde devem ficar nossas regras de negócio? Bem, no `MVC` o responsável pelas regras de negócio da aplicação é o `model`, sendo nele feitas as validações e tratamentos de dados.

Assim como no `MVC` a camada de `model` deve se manter desacoplada das demais, `views` e `controllers`, não devendo ter nenhum conhecimento dessas camadas.

### View

A `view` é a camada de apresentação, ou seja, a parte que tem contato com a pessoa que está usando nosso sistema. Serve basicamente como input e output de dados. Ela é responsável por duas coisas: criar a visualização dos dados vindos do `model` e fornecer meios para que a pessoa possa interagir com o sistema.

A `view` se comunica com o `controller` (recebendo ordens do que exibir e comunicando eventos que ocorrem à medida que a pessoa interage com o sistema) e com o `model`, recebendo os dados que deve apresentar.

Aqui, mais uma vez, vemos os benefícios da separação de responsabilidades: como a `view` se encarrega somente de exibir uma representação dos dados, ela não precisa saber como eles são armazenados.

Imagine se, toda vez que precisássemos mudar a view (mudar o layout de uma página HTML, por exemplo), também tivéssemos que mudar nossos modelos ou, o que é pior, o nosso esquema do banco de dados! Como o `model` abstrai todos esses detalhes atrás de uma API, não precisamos nos preocupar com isso.

Essa separação permite, inclusive, que mais de uma apresentação dos mesmos dados seja criada para contextos diferentes.

Em aplicações web, a view geralmente é uma página `HTML`, mas também pode assumir outros formatos, como `JSON` e `XML`.

### Comunicação entre camadas

Da maneira como foi explicado acima, nossa camada de apresentação deve sempre ficar separada da nossa lógica de negócios.

Um forma interessante de utilizar o MVC é da maneira que o `Ruby on Rails` o implementa (e te força a usar, no bom sentido). Vamos ver um pouco sobre isso no vídeo abaixo:

<%= vimeo "412468760" %>

### MVC com Express

Ok, vimos um monte de teoria sobre o que é o MVC, mas como funciona isso na prática? Vamos construir uma pequena aplicação em Node.js e Express, seguindo o padrão MVC.

Vamos fazer isso "na mão", ou seja, não usaremos nenhum framework além do express. O motivo de fazermos isso é que muitos frameworks "têm opinião": eles já fornecem uma estrutura básica, já resolvem para você muitos problemas e o lugar onde as coisas devem ficar já está mais ou menos definido. Construir uma aplicação `MVC` do zero será trabalhoso, como você verá, mas vai te permitir ter uma melhor apreciação dos conceitos da arquitetura `MVC` aplicados na prática.

Lembra da `API` que desenvolvemos quando estávamos aprendendo sobre a arquitetura `MSC`? Caso não lembre, nela construímos um CRUD simples, onde era possível cadastrar escritores, mas só com o "C" e o "R". Em outras palavras, poderemos criar e visualizar escritores. Nesse projeto, usaremos o `MySQL` como banco de dados.

Não se preocupe em não ter a aplicação já desenvolvida em sua máquina, vamos passar por todas as etapas de desenvolvimento no conteúdo, da criação do banco até a renderização da `view`.

Sem mais delongas, mãos à obra!

##### Criando e populando o banco de dados

Como utilizaremos o MySQL nesse pequeno projeto, vamos começar criando e populando nosso banco de dados com alguns dados.

Antes de mais nada, precisamos ter o `MySQL` instalado e configurado na nossa máquina. Se precisar, consulte [o conteúdo sobre MySQL](/back-end/sql/introduction#instalando-mysql-server) para fazer a instalação.

Vamos criar um banco chamado `mvc_example`. Por enquanto, só teremos a tabela `authors`, com informações de escritores. A tabela terá as seguintes colunas:

- Nome. Obrigatório;

- Nome do meio. Opcional;

- Sobrenome. Obrigatório;

- Data de nascimento. Opcional;

- Nacionalidade. Opcional;

Agora, utilizando o `MySQL Workbench` ou o console do MySQL, execute o script SQL abaixo para criar o banco, a tabela e popular o banco com nosso dados iniciais:

```language-sql
CREATE DATABASE IF NOT EXISTS mvc_example;

USE mvc_example;

CREATE TABLE authors (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    middle_name VARCHAR(30),
    last_name VARCHAR(30) NOT NULL,
    birthday DATE,
    nationality VARCHAR(100),
    PRIMARY KEY(id)
);

INSERT INTO authors (first_name, middle_name, last_name, birthday, nationality)
VALUES
    ('George', 'R. R.', 'Martin', '1948-09-20', 'norte-americano'),
    ('J.', 'R. R.', 'Tolkien', '1892-01-03', 'britânico'),
    ('Isaac', NULL, 'Asimov', '1920-01-20', 'russo-americano'),
    ('Frank', NULL, 'Herbert', '1920-02-11', 'norte-americano'),
    ('Júlio', NULL, 'Verne', '1905-03-24', 'francês');
```

##### Estabelecendo uma conexão com o banco

Com o banco criado e populado, vamos criar nosso projeto Node.js.

Comece criando uma nova pasta para conter o projeto. Dê o nome que você quiser a ela, mas aqui vamos chamá-la de `mvc-example`:

```language-bash
$ mkdir mvc-example
$ cd mvc-example
```

Agora, iniciamos um novo projeto Node.js, passando a flag `-y` para pular as perguntas e gerar um projeto com as opções padrão:

```language-bash
$ npm init -y
```

Como vimos anteriormente, para nos comunicarmos com o MySQL, precisamos de um **driver**. Para seguirmos com o desenvolvimento, instale o `Node MySQL 2`:

```language-bash
$ npm install mysql2
```

Agora, crie uma pasta `models` e, dentro dela, crie um arquivo `connection.js` na raiz do projeto e coloque nele o código abaixo.

> models/connection.js

```language-js
const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'senha123',
  database: 'mvc_example'});

module.exports = connection;
```

##### Criando o model

Agora, podemos de fato começar a escrever nossa aplicação. A primeira coisa que faremos é criar uma rota que renderizará uma lista com os nomes de todos os autores. **Queremos também que seja exibido o nome completo do escritor, que será a concatenação do primeiro nome, nome do meio (se houver) e sobrenome**. Vamos pensar um pouco sobre o que serão nossa `view`, `controller` e `model`.

A `view`, no momento, será uma página HTML que a pessoa poderá visualizar. Por enquanto, só mostraremos o nome (completo) de um escritor.

O `model` funcionará exatamente como na aplicação que desenvolvemos anteriormente, quando estávamos aprendendo sobre MSC. Sendo assim, ele deverá se encarregar de todos os detalhes de baixo nível, como se conectar com o banco, montar e executar as queries necessárias para buscar e retornar os dados desejados, fazendo o mapeamento dos dados para um formato que seja mais adequado para o domínio da aplicação.

Dando continuidade à nossa aplicação, crie o arquivo `Author.js`, dentro da pasta `models`. Adicione o código abaixo ao arquivo criado:

> models/Author.js

```language-js
const connection = require('./connection');

// Cria uma string com o nome completo do autor

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

// Serializa o nome dos campos de snake_case para camelCase

const serialize = (authorData) => ({
  id: authorData.id,
  firstName: authorData.first_name,
  middleName: authorData.middle_name,
  lastName: authorData.last_name});

// Busca todos os autores do banco.

const getAll = async () => {
  const [authors] = await connection.execute(
    'SELECT id, first_name, middle_name, last_name FROM authors;',
  );
  return authors.map(serialize).map(getNewAuthor);
};

module.exports = {
  getAll,
};
```

##### Criando o controller

Com o `model` criado, é hora de criar nosso `controller`. Como você já sabe, um controller é uma função usada como callback para responder a requisições que chegam a uma rota.

Para começar, vamos instalar o express:

```language-bash
$ npm install express
```

Agora, crie uma nova pasta `controllers` na raiz do projeto. Dentro dela, crie um novo arquivo `authorController.js` e coloque o código abaixo:

> controllers/authorController.js

```language-js
const Author = require('../models/Author');

const listAuthors = async (req, res) => {
 // Já vamos voltar para adicionar a lógica aqui
};

module.exports = {
  listAuthors
}
```

Em seguida, substitua o conteúdo de `index.js` pelo seguinte:

> index.js

```language-js
const express = require('express');

const authorController = require('./controllers/authorController');

const app = express();

app.get('/authors', authorController.listAuthors);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
```

Como já sabemos, a responsabilidade de criar e manipular a lista de autores cadastrados é do model, mas e a responsabilidade de criar o HTML?

É da **view**! A view é responsável por receber as informações do model (via controller) e exibi-las para o usuário.

Vamos criar nossa view agora!

##### Criando a view

**Nota**: Nos exemplos abaixo, destacamos as alterações feitas deixando descomentado somente o código que for novo no momento.

Agora, vamos criar a view. Poderíamos criar funções para fazer esse trabalho, e essas funções seriam somente chamadas no controller. O HTML em si nós poderíamos criar em um arquivo separado, e fazer com que essas funções, ou o controller, o lessem, usando as técnicas de leitura de arquivos que já conhecemos. Mas, dessa forma, teríamos que ficar construindo strings manualmente, interpolando ou substituindo partes da string antes de a resposta poder ser enviada. É exatamente isso que estamos fazendo no momento ao montar o HTML que será enviado para o cliente.

Em vez disso, vamos usar uma `template engine`.

Uma _template engine_ permite a criação de HTML (ou outros tipos de documentos) de forma dinâmica. Ela nos permite inserir trechos de código dentro de um arquivo. A engine então é capaz de reconhecer e executar esses códigos embutidos e de substituir o que for retornado por esse código no arquivo, criando assim um documento dinâmico. Ficará mais claro quando mostrarmos como funciona na prática.

O express suporta diversas _template engines_ nativamente. Veja [aqui](https://expressjs.com/en/resources/template-engines.html) {: .external-link target="_blank" rel="noreferrer noopener" } uma lista com todas as template engines suportadas. Nesse exemplo, usaremos o [`EJS`](https://ejs.co/) {: .external-link target="_blank" rel="noreferrer noopener" }. EJS é um acrônimo para **E**mbedded **J**ava**S**cript. Isso traduz exatamente o que ele faz: permite embutir JavasScript em documentos.

Primeiro, precisamos instalar o EJS:

```language-bash
$ npm install ejs
```

Agora, crie uma pasta `views` na raiz do projeto. Dentro dela, crie uma pasta `author` e, dentro dela, um arquivo `index.ejs`. Note que a extensão é `ejs`. Coloque nesse arquivo o seguinte código:

> views/authors/index.ejs

```language-html
<!doctype html>
<html>
  <head>
    <title>MVC - Exemplo</title>
  </head>
  <body>
    <ul>
      <%% authors.forEach((author) => { %>
        <li><%%= author.name %></li>
      <%% }) %>
    </ul>
  </body>
</html>
```

Note que no nosso template existem as tags `<%%`, `<%%=` e `%>`. Quando mandarmos o EJS renderizar esse arquivo, ele simplesmente copiará tudo que não estiver dentro dessas tags para a saída. Ao encontrar essas tags especiais, o código JavaScript que está dentro delas será executado. A diferença é que o que for retornado pelo código que está entre `<%%` e `%>` será ignorado, enquanto o retorno de códigos entre `<%%=` e `%>` será embutido no resultado.

Como você pode ver no código acima, cada linha de `JavaScript` deve estar entre `<% %>` ou entre `<%= %>`. O primeiro caso (`<% %>`) é utilizado para quando precisamos que um código seja apenas executado, como é o caso do nosso `map`. Já o segundo caso (`<%= %>`) é quando precisamos modificar o HTML com o retorno da função, como, por exemplo, adicionar a tag `li` como o nome de cada um dos autores ao documento.

Então, ao renderizar esse arquivo, o EJS vai executar o seguinte código:

```language-js
authors.forEach((author) => {
  ...
})
```

E para cada iteração do `forEach`, será gerada no resultado uma nova tag `li` contendo o nome de um escritor.

Agora vamos configurar o express para utilizar o EJS:

> index.js

```language-js
// const express = require('express');

// const authorController = require('./controllers/authorController');

// const app = express();

app.set('view engine', 'ejs');

app.set('views', './views');

// app.get('/authors', authorController.listAuthors);

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Ouvinndo a porta ${PORT}`);
// });
```

Para finalizar, vamos criar a implementação do controller `listAuthors` que definimos anteriormente:

> controllers/authorController.js

```language-js
// const Author = require('../models/Author');

// const listAuthors = async (req, res) => {
     const authors = await Author.getAll();

     res.status(200).render('authors/index', { authors });
// };

// module.exports = {
//  listAuthors
// }
```

A linha `app.set('view engine', 'ejs');` configura o express para utilizar o EJS por padrão como _template engine_. Dessa forma, não precisamos especificar a extensão do arquivo que queremos utilizar.

A linha `app.set('views', './views');` adiciona o diretório `/views` à lista de diretórios em que o expresss vai procurar um arquivo com o nome especificado pelo método `render`. Assim, não precisamos especificar o caminho completo do arquivo em todos os momentos.

No controller, tudo que precisamos fazer é chamar `res.render`, passando o caminho do arquivo. Os dados necessários para renderizar o template são passados como um objeto no segundo parâmetro. Como o JavaScript que embutimos na view espera que exista uma variável `authors`, passamos nesse objeto uma propriedade `authors` contendo a lista de escritores.

Agora, observe como as responsabilidades estão distribuídas conforme sugere o padrão MVC. O controller não sabe como recuperar os dados e nem como criar a view HTML que será enviada para o cliente. Ele só age como um maestro, controlando o fluxo de dados. Ele pede ao model para recuperar os dados de que precisa e os passa para a view, que sabe como se renderizar. A view recebe os dados e faz seu trabalho. O model não tem conhecimento de nenhuma das outras camadas.

Todas as três camadas se comunicam, quando muito, através de interfaces bem definidas, sem precisar conhecer seus detalhes internos. Dessa forma, poderíamos facilmente mudar qualquer uma delas sem afetar muito as demais. E também temos código modularizado e reutilizável: o model pode ser utilizado por qualquer um que precise recuperar dados do banco, enquanto a view poderia também ser utilizada em outro lugar, se necessário.

Reinicie o servidor e recarregue a página. Nossa lista deve renderizar sem problemas. 🤙

##### Adicionando uma página de detalhes de um escritor

O que nós temos até o momento é uma página de "index", que mostra a lista completa de escritores cadastrados. Vamos criar uma página de detalhes, onde será possível ver informações detalhadas a respeito de um escritor. Na prática, continuaremos mostrando só o nome, pois o foco aqui é a estrutura do MVC, mas você entende a ideia. 😉

A página de detalhes será acessada pelo endpoint `/authors/:id`, onde `id` é o id do escritor.

Faça as alterações abaixo nos arquivos indicados:

> index.js

```language-js
// const express = require('express');

// const authorController = require('./controllers/authorController');

// const app = express();

// app.set('view engine', 'ejs');

// app.set('views', './views');

// app.get('/authors', authorController.listAuthors);

app.get('/authors/:id', authorController.showAuthor);

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Ouvinndo a porta ${PORT}`);
// });
```

> controllers/authorController.js

```language-js
// const Author = require('../models/Author');

// const listAuthors = async (req, res) => {
//   const authors = await Author.getAll();

//   res.status(200).render('authors/index', { authors });
// };

const showAuthor = async (req, res) => {
  const { id } = req.params;
  const author = await Author.findById(id);

  if (!author) return res.status(404).render('404');

  res.status(200).render('authors/show', { author });
};

// module.exports = {
//   listAuthors,
     showAuthor
// }
```

> models/Authors.js

```language-js
// const connection = require('./connection');

// Cria uma string com o nome completo do autor

// const getNewAuthor = (authorData) => {
// const { id, firstName, middleName, lastName } = authorData;
//
// const fullName = [firstName, middleName, lastName]
//  .filter((name) => name)
//  .join(' ');
//
// return {
//   id,
//   firstName,
//   middleName,
//   lastName,
//   name: fullName,
//  };
// };

// Serializa o nome dos campos de snake_case para camelCase

// const serialize = (authorData) => ({
//   id: authorData.id,
//   firstName: authorData.first_name,
//   middleName: authorData.middle_name,
//   lastName: authorData.last_name,
// });

// Busca todos os autores do banco.

// const getAll = async () => {
//   const [authors] = await connection.execute(
//     'SELECT id, first_name, middle_name, last_name FROM authors;',
//   );
//   return authors.map(serialize).map(getNewAuthor);
// };

/*
Busca um autor específico, a partir do seu ID
@param {String} id ID do autor a ser recuperado
*/

const findById = async (id) => {
  const [
    authorData,
  ] = await connection.execute(
    'SELECT  first_name, middle_name, last_name FROM authors WHERE id = ?',
    [id]
  );

  if (!authorData.length) return null;

  const { firstName, middleName, lastName } = authorData.map(serialize)[0];

  return getNewAuthor({
    id,
    firstName,
    middleName,
    lastName,
  });
};

// module.exports = {
// getAll,
findById,
// };
```

No `index.js`, registramos uma nova rota para a página de detalhes. Em `authorController`, adicionamos uma função controller para responder a requisições para essa rota. Ela funciona de forma muito semelhante a `listAuthors`. A diferença é que ela extrai o parâmetro id da URL e o usa para consultar o model pelo escritor requisitado. Caso o model não encontre um escritor, setamos o código de status para `404` (Not Found) e renderizamos uma view específica para esse caso. Caso um escritor seja encontrado, a view de detalhes (`show.ejs`) é renderizada.

Agora crie as novas views `show.ejs` e `404.ejs`:

> views/authors/show.ejs

```language-html
<!doctype html>
<html>
  <head>
    <title>MVC com Express</title>
  </head>
  <body>
    <div>
      <p>Nome: <%%= author.name %></p>
    </div>
    <a href="/authors">Voltar para página inicial</a>
  </body>
</html>
```

> views/404.ejs

```language-html
<!doctype html>
<html>
  <head>
    <title>MVC com Express</title>
  </head>
  <body>
    <h1>Página não encontrada!</h1>
  </body>
</html>
```

E, na view `index.ejs`, adicionamos um link para cada escritor que levará para sua respectiva página de detalhes:

> views/authors/index.ejs

```language-html
<!-- <!doctype html>
<html>
  <head>
    <title>MVC - Exemplo</title>
  </head>
  <body>
    <ul>
      <%% authors.forEach((author) => { %>
        <li><%%= author.name %></li> -->
        <a href=<%%= `/authors/${author.id}` %>>Ver detalhes</a>
      <!-- <%% }) %>
    </ul>
  </body>
</html> -->
```

Nos códigos acima você viu que também é possível adicionar um determinado conteúdo e/ou atributo a uma tag HTML com o EJS, para isso é necessário você colocar o código que você deseja entre `<%= %>`, dessa forma uma está falando que determinado atributo e/ou conteúdo é igual ao retorno do que código entre as tags `<%= %>`.

Reinicie o servidor e recarregue a página. Cada escritor agora possui um link junto a seu nome. Ao clicar nesse link, você é levado para a página de detalhes. Se mudarmos a URL colocando um id que não existe, é exibida a mensagem "Página não encontrada!".

##### Criando um novo escritor

Agora vamos incrementar nossa aplicação para permitir a criação de novos escritores.

Primeiro, vamos adicionar dois métodos no nosso model.

> models/Authors.js

```language-js
// const connection = require('./connection');

// Cria uma string com o nome completo do autor

// const getNewAuthor = (authorData) => {
// const { id, firstName, middleName, lastName } = authorData;

// const fullName = [firstName, middleName, lastName]
//  .filter((name) => name)
//  .join(' ');

// return {
//  id,
//  firstName,
//  middleName,
//  lastName,
//  name: fullName,
//  };
// };

// Serializa o nome dos campos de snake_case para camelCase

// const serialize = (authorData) => ({
//   id: authorData.id,
//   firstName: authorData.first_name,
//   middleName: authorData.middle_name,
//   lastName: authorData.last_name,
// });

// Busca todos os autores do banco.

// const getAll = async () => {
//   const [authors] = await connection.execute(
//     'SELECT id, first_name, middle_name, last_name FROM authors;',
//   );
//   return authors.map(serialize).map(getNewAuthor);
// };

//
// Busca um autor específico, a partir do seu ID
// @param {String} id ID do autor a ser recuperado
//
// const findById = async (id) => {
//   const [
//     authorData,
//   ] = await connection.execute(
//     'SELECT  first_name, middle_name, last_name FROM authors WHERE id = ?',
//     [id],
//   );

// if (!authorData) return null;

// const { firstName, middleName, lastName } = authorData.map(serialize)[0];

// return getNewAuthor({ id, firstName, middleName, lastName });
// };

const isValid = (firstName, middleName, lastName) => {
  if (!firstName || typeof firstName !== 'string') return false;
  if (!lastName || typeof lastName !== 'string') return false;
  if (middleName && typeof middleName !== 'string') return false;

  return true;
};

const create = async (firstName, middleName, lastName) => connection.execute(
  'INSERT INTO mvc_example.authors (first_name, middle_name, last_name) VALUES (?,?,?)',
  [firstName, middleName, lastName],
);

// module.exports = {
// getAll,
// findById,
   isValid,
   create,
// };
```

A função `create` funciona exatamente igual a que viemos no conteúdo de MSC, assim como a função `isValid` que retorna um boolean indicando se os dados são válidos, checando se `firstName` e `lastName` são strings não vazias, e se `middleName`, caso seja informado, é uma string.

Agora, precisamos criar o formulário que permitirá criar novos escritores. O formulário será renderizado na rota `/authors/new` e, ao ser submetido, fará uma requisição `POST` para `/authors`.

Como agora teremos requisições POST, precisaremos fazer o _parsing_ do corpo da requisição. O middleware `body-parser` é capaz de fazer isso automaticamente para nós.

```language-bash
$ npm install body-parser
```

> index.js

```language-js
// const express = require('express');
const bodyParser = require('body-parser');

// const authorController = require('./controllers/authorController');

// const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// app.set('view engine', 'ejs');

// app.set('views', './views');

// app.get('/authors', authorController.listAuthors);

app.get('/authors/new', authorController.newAuthor);

// app.get('/authors/:id', authorController.showAuthor);

app.post('/authors', authorController.createAuthor);

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Ouvinndo a porta ${PORT}`);
// });
```

Note que a rota `/authors/new` deve ficar antes de `/authors/:id`. Como você já sabe, ao receber uma requisição, o express compara o caminho da URL com as rotas existentes, na ordem em que foram definidas. Se você inverter a ordem das rotas, ao entrar em `localhost:3000/authors/new`, a rota `/authors/:id` será a primeira a dar _match_, como se você estivesse procurando um escritor com o id `new`, e receberá como resposta a página `404`. Experimente!

Um outra coisa que você deve ter notado é que existem duas rotas para `/authors/new`, sendo uma `GET` e outra `POST`, isso precisa ser feito, pois através da rota `GET` se irá obter o formulário, para que assim sejá possivel cadastrar o novo autor, enquanto na rota `POST` é para onde os dados do autor a ser criado são enviados e então cadastrados no banco. E é por isso que teremos dois controllers diferentes, você entenderá mais sobre eles logo mais.

Em `authorController.js`, adicionamos as funções controller que responderão a essas rotas.

> controllers/authorController.js

```language-js
// const Author = require('../models/Author');

// exports.listAuthors = async (req, res) => {
//   const authors = await Author.getAll();

//   res.render('authors/index', { authors });
// };

// exports.showAuthor = async (req, res) => {
//   const { id } = req.params;
//   const author = await Author.findById(id);

//   if (author) {
//     res.status(200).render('authors/show', { author });
//   } else {
//     res.status(404).render('404');
//   }
// };

const newAuthor = (req, res) => {
  res.render('authors/new', { message: null });
};

const createAuthor = async (req, res) => {
  const { first_name, middle_name, last_name } = req.body;

  if (!Author.isValid(first_name, middle_name, last_name)) {
    return res.render('authors/new', { message: 'Dados inválidos' });
  }

  await Author.create(first_name, middle_name, last_name);
  res.redirect('authors');
};

//module.exports = {
//  listAuthors,
//  showAuthor,
    newAuthor,
    createAuthor,
// }
```

`newAuthor` simplesmente renderiza o formulário. Explicaremos o porquê do segundo parâmetro `{ message: null }` em um instante.

`createAuthor` extrai os parâmetros do formulário que chegam em `req.body`, verifica se os dados enviados são válidos. Caso não sejam, o formulário é renderizado novamente, passando uma mensagem indicando que os dados fornecidos são inválidos. Caso os dados sejam válidos, pede ao modelo para criar um novo escritor e redireciona a pessoa para a lista completa em `/authors`.

Agora criamos o formulário:

> views/authors/new.ejs

```language-html
<!doctype html>
<html>
  <head>
    <title>MVC com Express</title>
  </head>
  <body>
    <%% if (message) { %>
      <div><%%= message %></div>
    <%% } %>
    <form action="/authors" method="POST">
      <label for="first_name">Nome:</label>
      <input id="first_name" name="first_name" type="text" />
      <label for="middle_name">Nome do meio:</label>
      <input id="middle_name" name="middle_name" type="text" />
      <label for="last_name">Sobrenome:</label>
      <input id="last_name" name="last_name" type="text" />
      <button type="submit">Criar novo autor!</button>
    </form>
    <a href="/authors">Voltar para página inicial</a>
  </body>
</html>
```

E adicionamos um link na página inicial:

> views/authors/index.ejs

```language-html
<!-- <!doctype html>
<html>
  <head>
    <title>MVC - Exemplo</title>
  </head>
  <body>
    <ul>
      <%% authors.forEach((author) => { %>
        <li><%%= author.name %></li>
        <a href=<%%= `/authors/${author.id}` %>>Ver detalhes</a>
      <%% }) %>
    </ul> -->
    <a href="/authors/new">Criar novo autor</a>
  <!-- </body>
</html> -->
```

Na view `new.ejs`, verificamos se a variável `message` contém um valor não nulo e, caso tenha, renderizamos uma div com a mensagem recebida. É por isso que no controller `newAuthor` precisamos passar `{ message: null }` como segundo parâmetro. Se não fizéssemos isso, ocorreria um erro ao tentar renderizar a view, pois a variável `message` não estaria definida.

Recarregue o servidor e insira alguns novos escritores. Tente inserir algum escritor com dados inválidos.

##### Finalizando

O objetivo desse exemplo foi mostrar como se constrói uma aplicação web MVC "na mão", de forma que você possa ver na prática a aplicação dos conceitos do MVC. Embora funcional, essa aplicação pode ter vários problemas: bugs, falhas de segurança, duplicidade de código HTML etc.

Em aplicações de mercado, no entanto, é possível utilizar um framework MVC. Esses frameworks automatizam e facilitam várias tarefas que você realizará no dia a dia, como autenticação e autorização de usuário, geração de APIs HTTP e consultas ao banco de dados, por exemplo.

Contudo, quando você for utilizar um desses frameworks, entenderá melhor como suas camadas se comunicam e quais as motivações por trás das decisões arquiteturais tomadas, em vez de simplesmente aceitar que as coisas "são do jeito que são".

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

Os exercícios estão localizados [nesse repositório](https://github.com/tryber/exercise-mvc) {: .external-link target="_blank" rel="noreferrer noopener" }. Leia com atenção o **README**, que contém as instruções para a realização correta dos exercícios.

### Bônus

**Exercício 1**: Lembra do exercício que você desenvolveu no segunda dia de `MSC`? Então, agora você terá a oportunidade de refatorá-lo para `MVC`, caso você não tenha o feito você pode partir desse exercício, fazendo a construção da aplicação utilizando a arquitetura `MVC` do zero.

Nesse exercício, você vai desenvolver uma aplicação MVC para consulta de CEPs, chamada `cep-lookup`. Você utilizará uma API para buscar os dados relacionados a um CEP e salvará esses dados no MySQL, caso você esteja refatorando a aplicação deverá substituir o MongoDB pelo MySQL.

Um CEP válido é composto por 8 dígitos, com um hífen opcional separando os três últimos dígitos. Por exemplo, 30310-030 e 30310030 são CEPs válidos. 303100308 e AB897453 não são.

Para consultar um CEP, você deve utilizar a API [CEP lá.](http://cep.la/api) {: .external-link target="_blank" rel="noreferrer noopener" } A página contém instruções sobre como utilizar a API.

O modelo deve fornecer uma interface para consultar CEPs. Primeiramente, o modelo deve consultar o banco de dados pelo CEP procurado. Se o CEP for encontrado, seus dados são retornados sem consultar a API. Caso contrário, o modelo deve fazer uma requisição a API. O modelo então deverá salvar no MySQL os dados da primeira API que responder com sucesso. Em outras palavras, o banco de dados funcionará como um cache de CEPs, enquanto a API só será consultada se um CEP não for encontrado localmente. Inicialmente, o banco deve estar vazio.

O banco de dados só precisa armazenar as seguintes informações: **CEP**, **UF**, **cidade**, **bairro** e **logradouro**. Um CEP salvo no banco deve conter somente números, sem hífens, e essa coluna deve ter um índice único para evitar que o mesmo CEP seja cadastrado duas vezes e otimizar a busca.

A página inicial da sua aplicação deve ter um input, onde a pessoa poderá digitar um CEP, e um botão, que realizará a busca. Se o CEP for válido, seus dados devem ser exibidos abaixo do input. Se o CEP não for encontrado, deve ser exibido o texto `CEP não encontrado`. Se for digitado um CEP com formato inválido, deve ser exibida a mensagem `CEP inválido`.

Note que o CEP pode ser digitado no input com ou sem hífen, mas deve ser salvo no banco sem hífens.

Lembre-se de organizar sua aplicação seguindo a arquitetura MVC, separando as responsabilidades em camadas.

---

## Recursos adicionais

- [O que é MVC?](https://tableless.com.br/mvc-afinal-e-o-que/) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Introdução ao Padrão MVC](https://www.devmedia.com.br/introducao-ao-padrao-mvc/29308) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Software Architecture Guide - Martin Fowler](https://martinfowler.com/architecture/) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Arquitetura Multicamadas](https://pt.wikipedia.org/wiki/Arquitetura_multicamada) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Como estruturar uma aplicação em Node com MVC](https://vizir.com.br/2016/06/como-estruturar-uma-aplicacao-node-js/) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Embedded JavaScript templating.](https://ejs.co/) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
