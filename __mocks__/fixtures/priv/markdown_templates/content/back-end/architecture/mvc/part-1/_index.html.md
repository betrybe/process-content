## O que vamos aprender?
Neste bloco, você vai aprender a melhorar a organização e a divisão de responsabilidades nas suas aplicações Node.js e Express, utilizando um dos padrões arquiteturais mais famosos do mercado: o **MVC**!

### Você será capaz de:

- Estruturar uma aplicação em camadas;

- Delegar responsabilidades específicas para cada parte do seu app;

- Melhorar manutenibilidade e reusabilidade do seu código.

---

## Por que isso é importante?

O MVC é um dos padrões arquiteturais mais utilizados no mercado. Inclusive, frameworks como [Ruby on Rails](https://rubyonrails.org/) {: .external-link target="_blank" rel="noreferrer noopener" } e [Cake PHP](https://cakephp.org/) {: .external-link target="_blank" rel="noreferrer noopener" } adotam o MVC como estrutura para suas aplicações. Além disso, dividir sua aplicação em camadas facilita muito a manutenção, a adição de novas funcionalidades e a organização geral do seu código, pois você sabe exatamente onde cada coisa deve ficar.

Este bloco vai servir como base para você tomar decisões de arquitetura mais assertivas e criar aplicações "parrudas" que se mantenham organizadas.

Lembre-se: **uma arquitetura pobre pode matar um projeto conforme ele vai crescendo.**

---

## Conteúdos

###### Tempo sugerido para realização: 80 minutos

### O que é "Arquitetura de Software"?

Existem várias definições formais para essa pergunta. Uma ótima definição foi dada por Martin Fowler:

> Arquitetura é um conhecimento compartilhado por desenvolvedores experientes sobre como organizar um sistema de software.

É a maneira como o sistema se organiza, quais são seus componentes, como eles conversam entre si, como as responsabilidades são distribuídas etc.

Podemos, inclusive, fazer um paralelo com a arquitetura civil.

Se você tem uma casa na neve, provavelmente o telhado dessa casa terá um formato de "V" bastante inclinado para que a neve não se acumule no topo da residência.

Já uma casa para um clima quente não necessariamente precisa seguir esse padrão de telhado, visto que ele nunca vai ver neve na vida.

Se a casa fica em um local com alta criminalidade, vamos ver mais muros do que numa área com menos criminalidade. E por aí vai.

Se você trabalhasse com engenharia civil e fosse construir uma casa, você com certeza não tentaria fazê-lo "da sua cabeça". Quais materiais você usaria, como iria integrá-los, que técnicas utilizaria para construir a casa, onde cada coisa ficaria - para tudo isso já existem padrões e métodos testados. Você pode combinar soluções, adaptá-las, estendê-las, mas utilizará um conhecimendo testado e compartilhado por outras pessoas profissionais da área.

A mesma coisa se aplica à arquitetura de um software. **Existem padrões de arquitetura específicos para problemas específicos.**

Mas uma coisa que podemos ver quase sempre, independente da arquitetura utilizada, é a **divisão de responsabilidades por camadas**. É nisso que o MVC se baseia.

### Arquitetura em três camadas: o que é MVC?

MVC é uma sigla para `Model-View-Controller`, um dos mais antigos e mais utilizados padrões de arquitetura de software.

O padrão foi criado nos anos 1980, dentro da Xerox, para o desenvolvimento de interfaces gráficas, mas o que o tornou mais popular foi a sua adoção em aplicações web.

Como todo padrão de arquitetura, o MVC organiza e divide o código de uma aplicação em camadas, cada uma com suas responsabilidades. Ele é composto por três camadas: a camada de modelo (`Model`), a camada de apresentação/visão (`View`) e a camada de controle (`Controller`).

Essa divisão permite que as regras de negócio fiquem longe da camada de apresentação, tornando possível uma maior reutilização de código.

<%= figure(%{caption: "Arquitetura MVC", src: "https:\/\/res.cloudinary.com/drdpedroso/image/upload/c_scale,w_600/v1587419422/1_xz-ROnwiDsjLPumoV5RotA_medxbn.png", class: "text-center"}) %>

O que o MVC provê é um guia geral de como organizar uma aplicação que suporta interação com usuário.

Antes de prosseguir, assista ao vídeo abaixo para saber um pouco mais sobre o MVC, sua história e seus principais prós e contras:

<%= youtube_video "jyTNhT67ZyY" %>

### Regras de negócio

Antes de falarmos das três camadas do MVC, precisamos falar de regras de negócios, pois é um conceito essencial para entender a motivação por trás dessa arquitetura. Você, provavelmente, já ouviu ou leu bastante essa expressão, mas sabe o que ela significa?

Como o próprio nome dá a entender, regras de negócio **definem ou restringem algum aspecto de um negócio**. São elas que definem como o negócio deve se comportar, quando uma ação deve ser tomada etc. As regras de negócio devem ser muito bem definidas e documentadas, pois guiam a tomada de decisões e moldam processos.

Em princípio, as regras de negócio podem ser executadas manualmente, mas tem se tornado cada vez mais comum automatizá-las com a ajuda de sistemas de software.

Se está muito abstrato, vamos a alguns exemplos.

Imagine um sistema que permite cadastro de usuários. Estas são algumas regras de negócio que o sistema poderia ter:

- Um usuário deve necessariamente informar seu nome, sobrenome e email;

- O email deve ser único, ou seja, não pode haver outro usuário no sistema com o mesmo email;

- Por conter material sensível, a pessoa deve ser maior de 18 anos e declarar estar de acordo com os termos de uso da plataforma;

- Sempre que um novo usuário se cadastrar, um email de confirmação deve ser enviado para o email cadastrado. Novos usuários somente poderão acessar a plataforma após serem verificados.

Como outro exemplo, imagine uma rede social *fictícia* em que as pessoas podem fazer posts sobre os mais diferentes assuntos. Algumas regras de negócio que essa rede social poderia ter:

- Cada post pode ter, no máximo, 300 caracteres;

- Pessoas podem comentar nas postagens umas das outras;

- Um pessoa só pode editar ou excluir suas próprias postagens;

- Contudo, ela pode bloquear outros usuários, impedindo-os de comentar e ver as suas postagens.

Naturalmente, em sistemas de software, as regras de negócio se traduzem em códigos que controlam o comportamento das aplicações.

Com o conceito de regras de negócio bem entendido, podemos falar das três camadas do MVC e quais são as responsabilidades de cada uma.

### Model

O `model` é onde nós manipulamos e definimos a estrutura dos nossos dados. Todo acesso aos dados deve passar por essa camada.

Os dados que a aplicação utiliza podem estar armazenados em um banco de dados, acessados através de uma API externa, arquivos ou outros dispositivos de armazenamento.

O `model` é responsável por abstrair completamente os detalhes de acesso e armazenamento, fornecendo somente uma API que permita requisitar e manipular esses dados. Por exemplo, é responsabilidade da camada de models estabelecer uma conexão com o banco de dados.

As demais camadas não devem saber, por exemplo, se o banco utilizado é `MySQL` ou `MongoDB`, ou se sequer há um banco de dados. O model se encarrega de fazer o **mapeamento** dos dados armazenados para as entidades existentes no domínio do seu negócio.

Nas aplicações que demos como exemplos na seção anterior, entidades possíveis são `usuário`, `post` e `comentário`. Esse mapeamento depende da linguagem e/ou *framework* utilizados, mas normalmente se dá através de classes ou outras estruturas de dados que fornecem atributos, funções e métodos capazes de acessar e manipular os dados.

É no model, também, que ficam as regras de negócio da aplicação. É aqui que fazemos validações, tratamentos de dados e por aí vai.

Retomando nossos exemplos anteriores, é no `model` que verificaríamos se o novo usuário que estamos tentando criar é válido (de acordo com as regras de negócio definidas), ou se a pessoa que está tentando apagar um post tem permissão para tal.

Essa camada deve ser completamente desacoplada das `views` e dos `controllers`. Ou, dito de outra maneira, o `model` não pode ter conhecimento dessas camadas. Isso favorece a manutenibilidade código, pois alterações em outras camadas não terão impacto nos seus modelos.

Outro benefício é uma maior reusabilidade de código. Por exemplo, com uma camada de modelo bem definida, nós poderíamos criar uma versão CLI da nossa aplicação somente utilizando a API que ela define, sem nenhuma duplicação de código.

### View

A `view` é a camada de apresentação, ou seja, a parte que tem contato com a pessoa que está usando nosso sistema. Serve basicamente como input e output de dados. Ela é responsável por duas coisas: criar a visualização dos dados vindos do `model` e fornecer meios para que a pessoa possa interagir com o sistema.

A `view` se comunica com o `controller` (recebendo ordens do que exibir e comunicando eventos que ocorrem à medida que a pessoa interage com o sistema) e com o `model`, recebendo os dados que deve apresentar.

Aqui, mais uma vez, vemos os benefícios da separação de responsabilidades: como a `view` se encarrega somente de exibir uma representação dos dados, ela não precisa saber como eles são armazenados.

Imagine se, toda vez que precisássemos mudar a view (mudar o layout de uma página HTML, por exemplo), também tivéssemos que mudar nossos modelos ou, o que é pior, o nosso esquema do banco de dados! Como o `model` abstrai todos esses detalhes atrás de uma API, não precisamos nos preocupar com isso.

Essa separação permite, inclusive, que mais de uma apresentação dos mesmos dados seja criada para contextos diferentes.

Em aplicações web, a view geralmente é uma página `HTML`, mas também pode assumir outros formatos, como `JSON` e `XML`.

### Controller

O `controller` faz a ponte entre a `view` e o `model`. Ele recebe as ações da `view` e decide o que deve ser mostrado para a pessoa realizando a ação, após consultar o modelo, se necessário.

Uma ótima analogia para o `controller` é que ele seria como um garçom em um restaurante.

O garçom não sabe como preparar os pratos e nem como recepcionar as pessoas na porta.

Ele apenas anota o pedido, sabe para que parte do restaurante levar o pedido e para qual mesa entregá-lo depois de pronto.

Quando você monta seu software em uma camada só, é como se o garçom fizesse todas as funções dentro do seu restaurante (recepcionar, anotar os peditos, preparar os pratos etc.).

Em aplicações web, essa comunicação ocorre através de requisições HTTP que a `view` (o browser do cliente) envia para o servidor onde sua aplicação está rodando. O `controller` pode consultar o `model` para buscar ou atualizar dados. Com base na resposta do modelo ou outros fatores, o `controller` define o que fazer: renderizar uma nova `view`, enviar uma mensagem de redirecionamento etc.

### Comunicação entre camadas

Da maneira como foi explicado acima, nossa camada de apresentação deve sempre ficar separada da nossa lógica de negócios.

Um forma interessante de utilizar o MVC é da maneira que o `Ruby on Rails` o implementa (e te força a usar, no bom sentido). Vamos ver um pouco sobre isso no vídeo abaixo:

<%= vimeo "412468760" %>

### MVC com Express

Ok, vimos um monte de teoria sobre o que é o MVC, mas como funciona isso na prática? Vamos construir uma pequena aplicação em Node.js e Express, seguindo o padrão MVC.

Vamos fazer isso "na mão", ou seja, não usaremos nenhum framework além do express. O motivo de fazermos isso é que muitos frameworks "têm opinião": eles já fornecem uma estrutra básica, já resolvem para você muitos problemas e o lugar onde as coisas devem ficar já está mais ou menos definido. Construir uma aplicação MVC do zero será trabalhoso, como você verá, mas vai te permitir ter uma melhor apreciação dos conceitos da arquitetura MVC aplicados na prática.

A aplicação que vamos construir será um CRUD simples, onde poderemos cadastrar escritores, mas só com o "C" e o "R". Em outras palavras, poderemos criar e visualizar escritores. Nesse projeto, usaremos o `MySQL` como banco de dados.

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

Essa modelagem um tanto quanto estranha vai nos permitir ressaltar algumas características interessantes da arquitetura MVC. 😉

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

Para nos comunicarmos com o MySQL, precisamos de um **driver**. Um driver é um software que permite que você se comunique com o banco de dados a partir de uma aplicação. Qual driver usar depende tanto da linguagem quanto do banco de dados que você está utilizando. Vamos instalar o `MySQL Connector/Node.js`, um driver de MySQL para Node.js oficialmente suportado e mantido pela Oracle:

```language-bash
$ npm install @mysql/xdevapi
```

Agora, crie uma pasta `models` e, dentro dela, crie um arquivo `connection.js` na raiz do projeto e coloque nele o código abaixo. Para criar uma conexão recorrente com o banco de dados, vamos usar um padrão de design chamado *singleton*, que nesse caso é usado para criar apenas uma instância de conexão.  Lembre-se de substituir os campos `user` e `password` pelo usuário e senha que você utiliza para acessar o banco:

> models/connection.js

```language-js
const mysqlx = require('@mysql/xdevapi');
let schema; /* Aqui entra a variável que salva à conexão, começa como undefined */
const connection = () => {
  return schema ? /* Se schema já existir: */
    Promise.resolve(schema) : /* Retorna o schema numa Promise: */
    mysqlx.getSession({ /* Se não, criamos uma nova conexão */
      user: 'root',
      password: 'senha123',
      host: 'localhost',
      port: 33060,
      schema: 'mvc_example',
    })
    .then((session) => { /* Quando terminamos de abrir a conexão: */
      schema = session.getSchema('mvc_example'); /* Armazenamos a conexão na variável `schema`*/
      return schema; /* E retornamos o schema de dentro da Promise */
    })
    .catch((err) => { /* Caso um erro ocorra: */
      console.error(err); /* Exibimos o erro no console */
      process.exit(1); /* E encerramos o processo */
    });
};

module.exports = connection;
```

Usando o padrão de singleton, evitamos que o banco abra mais conexões que necessário.

O método `getSession` cria uma conexão com o banco de dados. Ele recebe uma string URI, como `root@senha123@localhost:33060/mvc_example`, ou um objeto com as credenciais necessárias para estabelecer a conexão. Entre as opções possíveis, estão:

- `host`: local onde o servidor do MySQL está armazenado. Como estamos executando localmente, usamos `localhost`;

- `user`: usuário que vamos utilizar para acessar o banco. Estamos usando o usuário `root` nesse exemplo;

- `password`: senha do usuário especificado. Coloque `''` se não houver senha para o usuário;

- `schema`: nome do banco ao qual queremos nos conectar;

- `port`: porta que o MySQL está escutando. Se não especificado, será usada a porta `33306`.

O método `getSession` retorna uma Promise que, quando resolvida, retorna um objeto que representa uma sessão com o banco. Encadeamos uma segunda Promise que chama o método `getSchema`. Esse método basicamente seleciona qual banco de dados (schema) vamos utilizar. O objeto retornado por `getSchema` é que fornece uma interface que vamos utilizar para fazer nossas queries.

Para não ser necessário criar uma sessão e selecionar o schema sempre que precisarmos acessar o banco, criamos uma função `connection` que encapsula essa lógica. Também encadeamos na Promise uma chamada ao método `catch` para lidar com erros de conexão com o banco. No caso, simplesmente logamos o erro no console e terminamos o processo.

Vamos testar se a conexão está funcionando. Crie um arquivo `index.js` na raiz do projeto e adicione o código abaixo:

> index.js

```language-js
const connection = require('./models/connection');

connection().then((session) => {
  console.log('Conectado ao MySQL!');
});
```

Agora, execute nosso script para verificar se conseguimos nos conectar com o banco.

```language-bash
$ node index.js
```

Se você viu a mensagem "`Conectado ao MySQL!`" no terminal, quer dizer que nossa conexão com o banco foi estabelecida com sucesso!

##### Criando o model

Agora, podemos de fato começar a escrever nossa aplicação. A primeira coisa que faremos é criar uma rota que renderizará uma lista com os nomes de todos os autores. **Queremos também que seja exibido o nome completo do escritor, que será a concatenação do primeiro nome, nome do meio (se houver) e sobrenome**. Vamos pensar um pouco sobre o que serão nossa `view`, `controller` e `model`.

A `view`, no momento, será uma página HTML que a pessoa poderá visualizar. Por enquanto, só mostraremos o nome (completo) de um escritor.

O `model` deverá expor alguma interface que seja capaz de buscar essa lista do banco de dados e retorná-la. Ele deverá se encarregar de todos os detalhes de baixo nível, como se conectar com o banco, montar e executar as queries necessárias para buscar e retornar os dados desejados. Ele também fará o mapeamento dos dados para um formato que seja mais adequado para o domínio da aplicação. Esse mapeamento pode envolver conversão de dados, renomear campos, esconder ou criar novos campos derivados dos dados existentes, por exemplo.

A camada de modelo pode ser implementada de várias formas. Aqui, vamos seguir esta abordagem:

- Haverá uma entidade chamada `Author` na aplicação;

- A entidade vai conter os campos `firstName`, `middleName` e `lastName`. Note que os nomes estão em `camelCase`, enquanto as colunas do banco estão em `snake_case`;

- No código, um objeto contendo os campos mencionados acima será utilizado para representar um autor.

- Existirão funções para ler e criar escritores do banco de dados;

- As demais camadas só vão interagir com os dados através da interface do model `Author`.

Poderíamos retornar os dados diretamente como eles vêm do banco, mas uma das vantagens do padrão MVC é que podemos desacoplar a modelagem do banco de dados da representação dos dados na aplicação.

Dando continuidade à nossa aplicação, crie o arquivo `Author.js`, dentro da pasta `models`. Adicione o código abaixo ao arquivo criado:

> models/Author.js

```language-js
const connection = require("./connection");

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

// Busca todos os autores do banco.

const getAll = async () =>
  connection()
    .then((db) =>
      db
        .getTable("authors")
        .select(["id", "first_name", "middle_name", "last_name"])
        .execute()
    )
    .then((results) => results.fetchAll())
    .then((authors) =>
        authors.map(([id, firstName, middleName, lastName]) =>
          getNewAuthor({
            id,
            firstName,
            middleName,
            lastName,
          })
        )
    );
module.exports = {
  getAll,
};
```

O model `Author` exporta uma função `getAll`. Essa função retornará todos os escritores cadastrados no banco de dados. Primeiro, selecionamos a tabela `authors` com o método `getTable`. O objeto que `getTable` retorna fornece uma API com métodos que permitem construir e executar uma query. Esses métodos têm nomes que refletem os comandos SQL que conhecemos.

Por exemplo, `select` seleciona as colunas na tabela. Recebe um array de strings com os nomes das colunas. Se nenhum parâmetro for utilizado, todas as colunas são retornadas. Há métodos para os principais comandos SQL, como `where`, `groupBy`, `limit` e `offset`. Utilizando esses métodos, você pode construir exatamente a query de que precisa. Veja a seção de recuros adicionais para exemplos de utilização desses métodos.

A query só é de fato executada quando `execute` é chamado. Ele retorna uma Promise que será resolvida para o resultado da query. Para consumir o resultado, usamos o método `fetchAll`, que retorna um array de arrays com os dados retornados do banco.

Por exemplo, no nosso caso, `fetchAll` vai retornar o seguinte resultado:

```language-js
[
  ['George', 'R. R.', 'Martin']
  ['J.', 'R. R.', 'Tolkien']
  ['Isaac', null, 'Asimov']
  ['Frank', null, 'Herbert']
  ['Júlio', null, 'Verne']
]
```

A função `getAll` retorna uma *Promise* que será resolvida para um array em que cada item é um objeto do tipo `Author`.

Repare que a função `getAll` faz o mapeamento dos dados do banco para a aplicação, convertendo os nomes de `snake_case` para `camelCase`, como dissemos anteriormente. Note também que ela formata os dados para que seja exibido o nome completo do autor em uma única string.

##### Criando o controller

Com o `model` criado, é hora de criar nosso `controller`. Mas o que é um controller? No `express`, um controller é uma função usada como callback para responder a requisições que chegam a uma rota. Ela será responsável por orquestrar o fluxo da aplicação no que diz respeito àquela rota: extrair parâmetros da URL ou do *body* da requisição, se comunicar com o modelo para ler ou atualizar dados e decidir o que deve ser enviado de volta para a pessoa que está usando a aplicação.

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

Em `index.js`, importamos o `express` e iniciamos uma nova aplicação. A essa aplicação, adicionamos uma nova rota `GET /authors`. Passamos como callback a função controller.

Para deixar nosso código organizado, decidimos que todas as funções que lidam com operações na entidade `authors` ficarão no arquivo `authorController.js`. Dessa forma, passamos como callback `authorController.listAuthors`.

O controller `listAuthors` deve requisitar ao model uma lista com todos os escritores cadastrados e enviar um HTML como resposta.

Como vimos, a responsabilidade de criar e manipular a lista de autores cadastrados é do model, mas e a responsabilidade de criar o HTML?
É da **view**! A view é resposável por receber as informações do model (via controller) e exibi-las para o usuário.
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

Note que no nosso template existem as tags `<%%`, `<%%=` e `%>`. Quando mandarmos o EJS renderizar esse arquivo, ele simplesmente copiará tudo que não estiver dentro dessas tags para a saída. Ao encontrar essas tags especiais, o código JavaScript que está dentro delas será excutado. A diferença é que o que for retornado pelo código que está entre `<%%` e `%>` será ignorado, enquanto o retorno de códigos entre `<%%=` e `%>` será embutido no resultado.

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

     res.render('authors/index', { authors });
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

//   res.render('authors/index', { authors });
// };

const showAuthor = async (req, res) => {
  const { id } = req.params;
  const author = await Author.findById(id);

  if (!author) return res.status(404).render('404');

  res.render('authors/show', { author });
};

// module.exports = {
//   listAuthors,
     showAuthor
// }
```

> models/Authors.js

```language-js
// const connection = require('./connection');
//
// const getNewAuthor = (authorData) => {
//   const { id, firstName, middleName, lastName } = authorData;
//
//   const fullName = [firstName, middleName, lastName]
//     .filter((name) => name)
//     .join(' ');
//
//   return {
//     id,
//     firstName,
//     middleName,
//     lastName,
//     name: fullName,
//   };
//};
//
///**
// * Busca todos os autores do banco.
// */
//const getAll = async () =>
//  connection()
//    .then((db) =>
//      db
//        .getTable('authors')
//        .select(['id', 'first_name', 'middle_name', 'last_name'])
//        .execute()
//    )
//    .then((results) => results.fetchAll())
//    .then((authors) =>
//      authors.map(([id, firstName, middleName, lastName]) =>
//        getNewAuthor({
//          id,
//          firstName,
//          middleName,
//          lastName,
//        })
//      )
//    );

/**
 * Busca um autor específico, a partir do seu ID
 * @param {String} id ID do autor a ser recuperado
 */
const findById = async (id) => {
  const authorData = await connection()
    .then((db) =>
      db
        .getTable('authors')
        .select(['first_name', 'middle_name', 'last_name'])
        .where('id = :id')
        .bind('id', id)
        .execute()
    )
    .then((results) => results.fetchAll())
    .then((authors) => authors[0]);

  if (!authorData) return null;

  const [firstName, middleName, lastName] = authorData;

  return getNewAuthor({ id, firstName, middleName, lastName });
};

// module.exports = {
//   getAll,
     findById,
// };
```

No `index.js`, registramos uma nova rota para a página de detalhes. Em `authorController`, adicionamos uma função controller para responder a requisições para essa rota. Ela funciona de forma muito semelhante a `listAuthors`. A diferença é que ela extrai o parâmetro id da URL e o usa para consultar o model pelo escritor requisitado. Caso o model não encontre um escritor, setamos o código de status para `404` (Not Found) e renderizamos uma view específica para esse caso. Caso um escritor seja encontrado, a view de detalhes (`show.ejs`) é renderizada.

No model, adicionamos o método `findById`. Esse método é muito semelhante a `getAll`. A grande diferença é que usamos o método `where` para limitar o escopo da busca ao escritor procurado. Em vez de passar valores diretamente na string, fazendo interpolação, é uma boa prática separar os valores da string. Fazemos isso usando parâmetros na string e usando o método `bind` para ligar parâmetros e valores. A notação para usar um parâmetro é `:<nome>`. Para cada parâmetro de string, fazemos uma chamada a `bind`, passando o nome do parâmetro e seu valor. Veja mais exemplos de *binding* [aqui](https://dev.mysql.com/doc/x-devapi-userguide/en/parameter-binding.html) {: .external-link target="_blank" rel="noreferrer noopener" }.

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

Reinicie o servidor e recarregue a página. Cada escritor agora possui um link junto a seu nome. Ao clicar nesse link, você é levado para a página de detalhes. Se mudarmos a URL colocando um id que não existe, é exibida a mensagem "Página não encontrada!".

##### Criando um novo escritor

Agora vamos incrementar nossa aplicação para permitir a criação de novos escritores.

Primeiro, vamos adicionar dois métodos no nosso model.

> models/Authors.js

```language-js
// const connection = require('./connection');

// const getNewAuthor = (authorData) => {
//   const { id, firstName, middleName, lastName } = authorData;

//   const fullName = [firstName, middleName, lastName]
//     .filter((name) => name)
//     .join(' ');

//   return {
//     id,
//     firstName,
//     middleName,
//     lastName,
//     name: fullName,
//   };
// };

// /**
//  * Busca todos os autores do banco.
//  */
// const getAll = async () =>
//   connection()
//     .then((db) =>
//       db
//         .getTable('authors')
//         .select(['id', 'first_name', 'middle_name', 'last_name'])
//         .execute()
//     )
//     .then((results) => results.fetchAll())
//     .then((authors) =>
//       authors.map(([id, firstName, middleName, lastName]) =>
//         getNewAuthor({
//           id,
//           firstName,
//           middleName,
//           lastName,
//         })
//       )
//     );

// /**
//  * Busca um autor específico, a partir do seu ID
//  * @param {String} id ID do autor a ser recuperado
//  */
// const findById = async (id) => {
//   const authorData = await connection()
//     .then((db) =>
//       db
//         .getTable('authors')
//         .select(['first_name', 'middle_name', 'last_name'])
//         .where('id = :id')
//         .bind('id', id)
//         .execute()
//     )
//     .then((results) => results.fetchAll())
//     .then((authors) => authors[0]);

//   if (!authorData) return null;

//   const [firstName, middleName, lastName] = authorData;

//   return getNewAuthor({ id, firstName, middleName, lastName });
// };

const isValid = (firstName, middleName, lastName) => {
  if (!firstName || typeof firstName !== 'string') return false;
  if (!lastName || typeof lastName !== 'string') return false;
  if (middleName && typeof middleName !== 'string') return false;

  return true;
};

const create = async (firstName, middleName, lastName) =>
  connection().then((db) =>
    db
      .getTable('authors')
      .insert(['first_name', 'middle_name', 'last_name'])
      .values(firstName, middleName, lastName)
      .execute()
  );

// module.exports = {
//   getAll,
//   findById,
     isValid,
     create,
// };
```

`isValid` é uma função que retorna um boolean indicando se os dados são válidos, checando se `firstName` e `lastName` são strings não vazias, e se `middleName`, caso seja informado, é uma string. `create` é uma função que salva um autor no banco, utilizando os métodos `insert` e `values`. `insert`, assim como `select`, recebe um array de strings com os nomes das colunas, enquanto `values` recebe os valores a serem inseridos.

Agora, precisamos criar o formulário que permitirá criar novos escritores. O formulário será renderizado na rota `/authors/new` e, ao ser submetido, fará uma requisição `POST` para `/authors`.

Como agora teremos requisições POST, precisaremos fazer o *parsing* do corpo da requisição. O middleware `body-parser` é capaz de fazer isso automaticamente para nós.

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

Note que a rota `/authors/new` deve ficar antes de `/authors/:id`. Ao receber uma requisição, o express compara o caminho da URL com as rotas existentes, na ordem em que foram definidas. Se você inverter a ordem das rotas, ao entrar em `localhost:3000/authors/new`, a rota `/authors/:id` será a primeira a dar *match*, como se você estivesse procurando um escritor com o id `new`, e receberá como resposta a página `404`. Experimente!

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
//     res.render('authors/show', { author });
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

`newAuthor` simplesmente renderiza o formuário. Explicaremos o porquê do segundo parâmetro `{ message: null }` em um instante.

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

Os exercicios estão localizados [nesse repositório](https://github.com/tryber/exercise-mvc) {: .external-link target="_blank" rel="noreferrer noopener" }. Leia com atenção o **README**, que contém as instruções para a realização correta dos exercícios.

### Bônus

**Exercício 1**: Nesse exercício, você vai desenvolver uma aplicação MVC para consulta de CEPs, chamada `cep-lookup`. Você utilizará uma API para buscar os dados relacionados a um CEP e salvará esses dados no MySQL.

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

- [Entenda o que são e confira 10 exemplos de regras de negócio](https://www.heflo.com/pt-br/definicoes/regra-de-negocio/) {: .external-link target="_blank" rel="noreferrer noopener" }

- [O que são regras de negócio e quais as vantagens de aplicá-las em uma empresa](https://www.heflo.com/pt-br/automacao-processos/o-que-sao-regras-de-negocio/) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Embedded JavaScript templating.](https://ejs.co/) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Parameter Binding](https://dev.mysql.com/doc/x-devapi-userguide/en/parameter-binding.html) {: .external-link target="_blank" rel="noreferrer noopener" }

- [MySQL X DevAPI Tutorial: Working with Relational Tables](https://dev.mysql.com/doc/dev/connector-nodejs/8.0/tutorial-Working_with_Tables.html) {: .external-link target="_blank" rel="noreferrer noopener" }

- [MySQL X DevAPI Documentaion: Working with Relational Tables](https://dev.mysql.com/doc/x-devapi-userguide/en/devapi-users-working-with-relational-tables.html) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
