## O que vamos aprender?

Sua aplicação de back-end muitas vezes vai se comunicar com um banco de dados. O _mapeamento objeto-relacional_, ou ORM, na sigla em inglês, provê uma forma de, através de código JavaScript, alterar e interagir com um banco de dados de qualquer forma que for necessária. Você passa a poder, então, criar e alterar tabelas, fazer consultas, inserir e extrair dados do seu banco de dados sem nunca fazer nada que não escrever código JavaScript.

---

### Você será capaz de:

- Utilizar o sequelize para interagir com seu banco de dados;

- Criar migrações utilizando o sequelize;

- Criar seeds utilizando o sequelize.

---

## Por que isso é importante?

As bibliotecas que trabalham com ORM, como a sequelize que mencionaremos aqui, abstraem muitas funções do banco de dados. Isto é: elas ocultam parte de sua complexidade e a envelopam numa função de uso mais ágil e intuitivo. Isso facilita o seu trabalho, a manutenção do código e o deixa menos propenso a erros. Como falamos no dia de SOLID, o objetivo aqui é escrevermos um código **simples**! Isso facilita (ou seja, barateia) a manutenção e extensão de códigos! É mais um passo no rumo do conhecimento avançado em qualidade de código que estamos vendo nesse bloco!

---

## Conteúdos

###### Tempo sugerido para realização: 120 minutos

Mapeamento objeto-relacional ou ORM (`Object Relational Mapper`) é uma técnica/camada de mapeamento que permite fazer uma relação de estruturas de dados da nossa aplicação com os dados do banco de dados que as mesmas representam. O mapeamento objeto-relacional abstrai as diferenças entre os dois paradigmas, da aplicação e do banco de dados.

<%= figure(%{src: "/back-end/orm/images/orm1.png", class: "text-center rounded mx-auto d-block", width: "370px", height: "auto", caption: "ORM Mapper"}) %>

Vamos trazer isso pra prática! Suponha que temos uma aplicação que gerencia clientes. Nela teremos um objeto que chama _Pessoas_. Esta é a representação da entidade _Pessoas_ na aplicação:

```language-json
{
"id": 1,
"name": "Leonardo",
"age": 30,
"heigth": 180
}
```

Já para representar _Pessoas_ no banco de dados relacional, nós usamos tabelas, em que cada linha vai representar uma entidade. Essa é a representação de _Pessoas_ no nosso banco de dados:

<%= figure(%{src: "/back-end/orm/images/table_pessoas.png", class: "text-center rounded mx-auto d-block", width: "370px", height: "auto", caption: "Representação da entidade 'Pessoas' no banco de dados"}) %>

Até aí tudo bem, certo? Agora imagine que nosso sistema recebe informações de uma nova pessoa e precisa salvar isso no banco de dados. Para isso, precisamos implementar, em algum lugar do nosso projeto, funções que "falem", entre outras coisas, que o nome que recebemos para salvar pode ser armazenado na coluna `name` do banco de dados. Além disso, precisaríamos escrever "na mão" o código SQL que faz a inserção dos dados no banco, de acordo com o banco de dados que estamos utilizando (MySQL, PostgreSQL etc). Agora, pense em ter 15 tabelas, cada uma com oito colunas, múltiplos relacionamentos se cruzando e por aí vai. Imagine o quão complexo pode ficar nosso projeto ao longo do tempo.

Para facilitar um pouco o nosso trabalho, existem várias bibliotecas de mapeamento objeto-relacional que podemos utilizar para _abstrair essa complexidade_, colocando sobre ela uma camada mais simples de código com a qual podemos interagir para lidar com banco de dados. Dessa forma, não precisamos mais escrever uma query SQL "crua" para cada vez que formos inserir um registro na tabela. A própria biblioteca fica responsável por isso, você apenas passa o objeto JavaScript para ela e ela insere os dados no banco de dados.

No `Node.js`, uma das bibliotecas mais famosas é o `Sequelize`, que tem suporte aos banco de dados PostgreSQL, MariaDB, MySQL, SQLite e Microsoft SQL Server.

### Mapeamentos

No mercado, existem dois padrões que são mais utilizados para realizar os mapeamentos. Esses padrões são o **Data Mapper** e o **Active Record**. Ambos os padrões foram definidos por _Martin Fowler_ em seu livro `Padrões de Arquitetura de Aplicações Corporativas`. Vamos ver um pouco sobre ambos abaixo.

#### Data Mapper

Nesse padrão, a classe que representa a tabela do banco de dados não deve conhecer os recursos necessários para realizar as transações com o banco de dados:

<%= figure(%{src: "/back-end/orm/images/orm2.png", class: "text-center rounded mx-auto d-block", width: "auto", height: "auto", caption: "ORM Data Mapper"}) %>

No `Data Mapper`, como podemos ver acima, a entidade `Pessoa` está desacoplada do banco de dados. As informações e os comportamentos relacionadas à `Pessoa` no contexto específico do nosso negócio ficam em um lugar, e em um outro, o `Mapeador Pessoa`, temos a camada responsável por criar as transações das informações com o banco de dados.

Isso significa que, enquanto o `Mapeador Pessoa` está fortemente acoplado ao banco de dados e deve ser refatorado ou refeito sempre que houver mudança na estrutura do banco de dados, a entidade `Pessoa` está completamente independente - a ela não interessa como o banco de dados está. Essa complexidade é absorvida pelo mapeador.

#### Active Record

Diferentemente do anterior, a classe que representa a tabela conhece os recursos necessários para realizar as transações no banco de dados:

<%= figure(%{src: "/back-end/orm/images/orm3.png", class: "text-center rounded mx-auto d-block", width: "auto", height: "auto", caption: "ORM Active Record"}) %>

No `Active Record` o _model_ está diretamente acoplado ao banco de dados. Dessa forma, o nosso próprio model descreve as operações do banco de dados e tem conhecimento de como salvar os dados, atualizá-los, deletá-los etc.

#### Qual devo usar?

A resposta, como sempre, é "depende". O estilo Active Record é mais simples de se implementar, mas o Data Mapper facilita atualizações e mudanças na estrutura do banco de dados. Se seu banco de dados é simples ou complexo, mas não deve ser alterado no futuro, somente ampliado, o Active Record é melhor - é mais rápido de ser implementado, e a complexidade extra do Data Mapper não se compensa.

### Sequelize

Agora, vamos utilizar o Sequelize, que segue a linha Active Record, juntamente com uma aplicação simples Node.js. Para banco de dados iremos utilizar o MySQL. Vale ressaltar que a maioria dos métodos fornecidos pelo Sequelize são assíncronos e, portanto, retornam _promises_. Podemos usar **then**, **catch** etc. para tratar os retornos. Ou podemos utilizar, também, **async** e **await**.

Para começar, vamos iniciar uma aplicação Node.js e instalar o Sequelize:

```language-bash
\$ npm init

\$ npm install sequelize
```

Feito isso, vamos criar agora o banco de dados a ser utilizado para esse exemplo:

```language-sql
CREATE DATABASE IF NOT EXISTS orm_example;
```

Notem que não criamos tabelas no banco, pois faremos isso através de uma _migration_/migração. **Atenção!** Vá fazendo cada passo junto conosco, são seus exercícios de fixação.

#### Configurações + banco de dados

O primeiro passo para começarmos a realmente utilizar o sequelize é instalar um `CLI` que é responsável por gerar e executar as operações. Além de instalar o CLI, precisamos instalar também o `mysql2`, uma dependência necessária para usarmos o `MySQL` juntamente com o sequelize.

```language-bash
\$ npm install --save-dev sequelize-cli

\$ npm install mysql2
```

Depois que instalamos o CLI, precisamos iniciar um "empty project" do sequelize. Para isso, vamos executar o seguinte comando dentro da pasta raiz:

```language-bash
\$ npx sequelize-cli init
```

Esse comando irá criar as seguintes pastas:

- **config**: contém um arquivo de configuração, que "fala" para o CLI como conectar-se com o nosso banco de dados;

- **models**: contém todos os modelos da nossa aplicação;

- **migrations**: contém todos os arquivos de migração da nossa aplicação;

- **seeders**: contém todos os arquivos de "seeds".

Vamos entender esses dois últimos diretórios logo mais. A última parte da configuração é alterarmos o arquivo `config.json` gerado pelo `init` do CLI. Ao alterar o arquivo `config.json`, estamos configurando o acesso da aplicação ao nosso banco de dados. Vamos alterar somente o objeto `development`, não vamos nos preocupar com os demais:

> config/config.json

```language-json
{
"development": {
"username": "root",
"password": "",
"database": "orm_example",
"host": "127.0.0.1",
"dialect": "mysql",
"operatorsAliases": false
}

// ...
}
```

**Nota**: se necessário, troque o usuário e a senha do exemplo pelos seus.

Vamos entender melhor as informações que estamos passando:

- `Usuário` de acesso ao banco de dados;

- `Senha` de acesso ao banco de dados;

- `Nome do banco de dados` no qual queremos conectar;

- `Host` que estamos conectando - por ser local, utilizamos o `127.0.0.1`;

- `Dialect` é, nada mais nada menos, qual banco estamos utilizando. Dito isso, passamos "mysql".

- `operatorsAliases`: não precisa se preocupar muito com essa chave, porém, se quiser saber um pouco mais sobre, acessem este [link](https://sequelize.org/v4/manual/tutorial/querying.html#operators-aliases) {: .external-link target="_blank" rel="noreferrer noopener" }.

Vale lembrar que passar as credenciais dessa forma não é uma boa prática, pois nossos dados de acesso ao banco de dados ficam totalmente visíveis para qualquer pessoa que tenha acesso ao código da nossa aplicação. Nesse caso, seria melhor se armazenássemos esses dados em variáveis de ambiente configurada no GitHub. Não estamos fazendo nada para colocar em produção, no entanto, então não vamos nos preocupar com isso por agora.

_Curiosidade_: Hoje o `Sequelize` suporta os bancos `MySQL`, `MariaDB`, `PostgreSQL`, `SQLite` e `Microsoft SQL Server`.

#### Migrações

Um banco de dados relacional nada mais é do que uma coleção de dados organizados, de forma estruturada, com linhas e colunas com seus tipos predefinidos. Imagine que nós e nosso time estamos trabalhando em um banco de dados que possui uma tabela chamada `produtos`. Nessa tabela existem as informações `nome`, `descrição`, `categoria` e `preço`.

Nossa tarefa nesse momento é adicionar mais uma informação nessa tabela para controlar se um produto deve aparecer no site ou não. Portanto, vamos adicionar um campo chamado `ativo` com o tipo `boolean` na tabela e que será de preenchimento obrigatório. Feito isso, vamos publicar nossa alteração e finalizaremos nossa tarefa.

Imagine, no entanto, que outras pessoas estão mexendo no mesmo projeto e, consequentemente, na mesma tabela que você. Se isso acontecer, e _vai_ acontecer, logo após publicarmos nossa alteração outras pessoas do time começarão a ver algum erro, pois elas não terão, no código delas, esse novo campo `ativo` que acabamos de adicionar.

Isso se dá porque cada banco de dados é configurado _localmente_ na sua máquina, certo? Como, então, uma atualização do banco na sua máquina alcança as máquinas do restante do time? Para resolver esse problema surgem as **migrations**. 🔥

Certo, mas então o que é uma `Migration`?

Uma migration é uma forma de **versionar** o _schema_ do banco de dados, ou seja, cada migration conterá um pedaço de código que representa, no conjunto, todas as alterações feitas no histórico do nosso banco de dados.

Imagine assim: você escreve um código definindo como um banco de dados deve ser criado, e esse código fica salvo num arquivo na pasta **migrations**. Após um tempo, uma atualização é feita, e uma coluna é acrescentada em uma tabela. O que você faz? Escreve em **outro arquivo** o código para acrescentar essa coluna. Cada arquivo é marcado com uma estampa _datetime_, então ao longo do tempo esse código, que é mantido no controle de versão do git, vai empilhando dezenas, às vezes centenas de arquivos, e cada um marca uma versão do banco de dados e o seu histórico de mudanças e evoluções. Quem clona um projeto pela primeira vez roda suas migrations para configurar, sem ter que fazer mais nada, o banco de dados no formato mais recente enviado para _master_. Aí é possível trabalhar localmente no banco de dados da aplicação sem medo de ele ser diferente da versão mais nova que encontramos em _master_.

Usando migrations, o mapeador objeto-relacional sabe exatamente quais alterações executar no banco de dados, tanto para criar algo novo quanto para restaurar o banco para uma versão mais antiga. Além disso, uma migration tem dois códigos conhecidos como `Up` e `Down`. Ou seja: toda migration, além de saber o que fazer para executar as mudanças no banco de dados (`Up`), também deve saber como reverter essas mudanças (`Down`). Isso significa que as migrations têm o poder de avançar ou reverter o seu banco de dados para qualquer um dos estados que ele já teve.

Chega de explicações! Vamos ver em código como fazemos uma migration. Antes de começarmos a falar de migrations, nós criamos o banco de dados, fizemos sua conexão com a nossa aplicação, instalamos o CLI e demos o pontapé inicial. Agora, podemos seguir em frente e fazer nossa primeira migration para criar uma tabela. Vamos executar um comando para criar uma migration:

```language-bash
\$ npx sequelize migration:generate --name create-users
```

Repare que, após executarmos o comando acima, foi criado um arquivo com um formato parecido com `20200623175538-create-users.js`, dentro da pasta `migrations`. Os números, no início do nome do arquivo, significam a data e a hora de criação dele, seguindo o formato `yyyy-MM-dd:hh:mm:ss`.

Com a migration criada, devemos adicionar o que ela de fato irá fazer, tanto na execução (`Up`), quanto na reversão (`Down`). **Atenção!** Se seu código aqui contiver erros ou ficar ruim, no `Up` ou no `Down`, as suas migrations podem não executar direito nos processos de ida ou volta na versão do banco. É sua responsabilidade escrever código de configuração de banco que funcione bem. Vamos praticar isso bastante!

Ao abrir o arquivo, você já irá se deparar com a estrutura correta de uma migration. O conteúdo do arquivo deve ser parecido com isso:

```language-javascript
"use strict";

module.exports = {
up: async (queryInterface, Sequelize) => {
/\*
Add altering commands here.
Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

},

down: async (queryInterface, Sequelize) => {
/\*
Add reverting commands here.
Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */

},
};
```

Iremos mexer apenas dentro das funções `up` e `down`, como dito anteriormente. Reparem que ambas as funções recebem dois parâmetros: um é o `queryInterface`, e o outro é o `Sequelize`. Ambos os parâmetros são objetos que armazenam dados e operações. O `queryInterface` é usado pelo sequelize para modificar o banco de dados, seguindo o "dialeto" do banco que estamos utilizando. O objeto `Sequelize` armazena os tipos de dados disponíveis no contexto do banco, por exemplo _varchar_, _string_, _integer_, _date_ etc.

No código abaixo, iremos criar uma tabela chamada `Users`, com os campos _id_, _fullName_, _email_, _createdAt_ e _updateAt_. Caso precisemos reveter essa operação, o código irá apenas apagar a tabela. Assim escrevemos uma migration perfeitamente reversível!

> migrations/[timestamp]-create-users.js

```language-javascript
"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const UsersTable = queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      fullName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
    });

    return UsersTable;

  },

  down: async (queryInterface) => queryInterface.dropTable("Users"),
};
```

Com a migration criada, basta executarmos pelo CLI:

```language-bash
\$ npx sequelize db:migrate
```

Caso queira reveter uma migration:

```language-bash
\$ npx sequelize db:migrate:undo
```

Teste os dois comandos para analisar o funcionamento! É seu exercício de fixação! Experimente, também, usar os comandos que aprendemos para criar uma nova migração reversível. Rode-as, reverta-as, brinque com as migrations. Assim você começará a dominá-las! 💥

#### Seeders

Agora que sabemos de um jeito seguro de criar e recriar um banco de dados, além de acrescentar/excluir tabelas e colunas, nós entramos numa outra etapa. Pense, agora, que toda vez que executamos as migrations, nosso banco de dados é criado do zero, ou seja, sem informações dentro das tabelas.

Vamos supor que estamos trabalhando num projeto que é um e-commerce. Acabamos de entrar nesse projeto e estamos montando nosso ambiente. Executamos as migrations e nosso banco de dados foi criado. Em seguida, executamos o projeto localmente. Quando entramos na home do site não existe nenhum produto, nenhuma categoria, nenhuma marca, nenhum usuário cadastrado e por aí vai.

Os _seeders_ chegam pra resolver problemas como esse! As bibliotecas de mapeamento objeto-relacional permitem que controlemos informações que devem ser criadas assim que nosso banco de dados/tabelas forem criadas. Ou seja, podemos configurar nosso banco para ser automaticamente criado **e** povoado!

No exemplo do e-commerce acima, poderíamos criar seeds responsáveis por gerar informações de produtos, marcas, categorias e etc. toda vez que um banco de dados fosse criado. Com isso, sempre que criássemos o banco de dados do zero e executássemos o projeto, teríamos um e-commerce com as informações básicas para que fosse possível navegar. Isso é especialmente útil quando, num contexto de testes automatizados, precisamos criar um banco e povoar com dados para testá-los! Aprenderemos sobre isso mais adiante nesse bloco.

Conclusão: um seeder é usado para, basicamente, alimentar o banco de dados com informações necessárias para o funcionamento mínimo da aplicação. Bom, vamos ver agora um pouco da prática de como fazer isso em código. Os seeds seguem a mesma linha das migrations.

Primeiramente vamos precisar executar pelo CLI a criação de um novo seed:

```language-bash
\$ npx sequelize seed:generate --name users
```

Reparem que o arquivo foi criado dentro da pasta `seeders` com o mesmo formato de um arquivo de uma migration. Agora, devemos adicionar, ao arquivo criado, quais informações aquele _seed_ irá gerar. O código abaixo irá adicionar dois usuários ao banco de dados:

> seeders/[timestamp]-users.js

```language-javascript
"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "Users",
      [
        {
          fullName: "Leonardo",
          email: "leo@test.com",
        },
        {
          fullName: "JEduardo",
          email: "edu@test.com",
        },
      ],
      {}
    ),

  down: async (queryInterface) => queryInterface.bulkDelete("Users", null, {}),
};
```

Na função acima, estamos utilizando o parâmetro recebido pela função `queryInterface` para conversar com o banco de dados. Dessa forma conseguimos inserir os dados que queremos. Estamos adicionando os dados, que estão na estrutura de uma array de objetos, na tabela `Users`. O queryInterface tem a função `bulkInsert`, a qual estamos utilizando, que insere múltiplos dados na tabela.

Note que o seed segue o mesmo princípio de `Up` e `Down`, ou seja, devemos colocar, também, o que o seed deve fazer caso precise reverter a operação. Aqui, também, um código ruim pode quebrar o fluxo de uso/reversão dos seeds, então escreva com atenção! Para executar o seed, basta rodarmos o comando:

```language-bash
\$ npx sequelize db:seed:all
```

E para reverter:

```language-bash
\$ npx sequelize db:seed:undo:all
```

Teste os dois comandos para analisar o funcionamento! Povoe a outra tabela que você criou no exemplo anterior com alguns seeds. Rode-os e reverta-os! 💥

#### Definindo um modelo

Um modelo, como já começamos a ver no módulo, representa uma tabela do banco de dados. Uma **instância** de `User` abaixo, por exemplo, representa uma linha da tabela do banco de dados. Vamos criar nosso modelo do Sequelize:

> models/User.js

```language-javascript
const User = (sequelize, DataTypes) => {
const User = sequelize.define("User", {
fullname: DataTypes.STRING,
email: DataTypes.STRING});

return User;
};

module.exports = User;
```

Nesse exemplo temos um model que, no banco de dados, representa a nossa tabela `User` com as colunas `fullName` e `email`.

Vale lembrar que existe também um comando para gerar um model pelo CLI. Contudo, se você deseja utilizar esse comando, saiba que, além de criar o model, ele também cria uma migration para criar uma tabela no banco de dados. Logo, como já temos uma migration para criação da nossa tabela, nós não precisamos de executar o comando CLI para criar o model.

Se quiser experimentar depois, o comando para criação de um modelo é, por exemplo:

```language-bash
\$ npx sequelize model:generate --name NomeDoModel --attributes nomeDoAtributo:string
```

Um ponto **importante** de mudança estrutural que o sequelize traz é que, da forma que aprendemos antes, sem o sequelize, nossa lógica de validações, interação com o banco de dados (get, insert etc.), entre outras, se centralizavam no model. Com o Sequelize, essa lógica se centraliza nos controllers. O modelo fica responsável apenas por representar a estrutura do banco de dados, para ajudar o sequelize a realizar as operações. O mundo do back-end é cheio de diferentes formas e filosofias para o organizar de um código! Essa é uma delas!

#### Operações

Com o _model_ implementado, caso precisemos gravar/ler algum dado do banco de dados, conseguimos faze-lo também. Caso precisemos buscar todas as pessoas usuárias, por exemplo, basta fazermos algo parecido com o exemplo de código abaixo:

> controllers/userControllerExample.js

```language-javascript
const express = require('express');
const { User } = require('../models');
const router = express.Router();

router.get('/', (req, res, next) => {
  User.findAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((e) => {
      console.log(e.message);
      res.status(500).json({ message: 'Algo deu errado' });
    });
});

// ...

module.exports = router;
```

Note que não precisamos escrever uma query SQL para buscar os dados, pois o `Sequelize` _abstrai_ isso para nós. Ele oculta essa complexidade e nos provê uma forma menos trabalhosa de escrever esse código.

Reparem que estamos importando o modelo que criamos do arquivo `index.js` da pasta models, e não diretamente do arquivo `User.js`. Quando executamos o comando `npx sequelize init`, o arquivo `index.js` é gerado dentro da pasta models.

O código desse arquivo `index.js` é responsável por, basicamente, realizar a conexão com o banco de dados, através do arquivo `config.json`, coletar todos os modelos definidos dentro da pasta `models` e, caso necessário, associar um modelo a algum outro. O caso que mostramos acima foi para buscar todas as pessoas usuárias, mas conseguimos realizar todas as outras operações de consulta, inserção e deleção também.

> controllers/userControllerExample.js

```language-javascript
const express = require('express');
const { User } = require('../models');
const router = express.Router();

// ...

/_ Busca um usuário _/
router.get('/:id', (req, res, next) => {
  User.findByPk(req.params.id)
    .then((user) => {
      if (user === null) {
        return res.status(404).send({ message: 'Usuário não encontrado' });
      }
      return res.status(200).json(user);
    })
    .catch((e) => {
      console.log(e.message);
      res.status(500).json({ message: 'Algo deu errado' });
    });

});

/_ Cria um novo usuário _/
router.post('/', (req, res) => {
  const { fullname, email } = req.body;

  User.create({ fullname, email }).then((user) => res.status(200).json(user))
    .catch((e) => {
      console.log(e.message);
      res.status(500).send({ message: 'Algo deu errado' });
    });
});

/_ Atualiza um usuário _/
router.put('/:id', (req, res) => {
  const { fullname, email } = req.body;

  User.update(
    { fullname, email },
    {
      where: { id: req.params.id },
    }
  ).then((result) => {
    res.status(200).send({ message: 'Usuário atualizado com sucesso!' });
  })
    .catch((e) => {
      console.log(e.message);
      res.status(500).send({ message: 'Algo deu errado' });
    });
});

/_ Remove um usuário _/
router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((user) => {
      res.status(200).send({ message: `Usuário excluído com sucesso.` });
    })
    .catch((e) => {
      console.log(e.message);
      res.status(500).send({ message: 'Algo deu errado' });
    });
});

module.exports = router;
```

As funções apresentadas nessa sessão precisam de ter o `express` instalado no projeto para serem funcionais. Porém, o intuito do conteúdo de hoje é apresentar para vocês o Sequelize e suas funcionalidades. O importante é que vocês entendam as diferenças da forma que vocês faziam, antes do Sequelize, para essa nova forma, e onde devem usar.

Vocês entenderão melhor como utilizar essa forma de criar rotas na aula ao vivo! 😉

#### Transações

Uma transação simboliza uma unidade de trabalho _indivisível_ executada do banco de dados de forma confiável e independente de outras transações. As ações dessa unidade de trabalho não podem ser mescladas com ações de outras transações. O conceito de uma unidade de trabalho _indivisível_ (ou todo o trabalho é feito, ou nada é) é chamado de _atomicidade_. Uma unidade de trabalho _atômica_ é indivisível dessa forma.

Em outras palavras, uma transação de banco de dados relacional pode conter um ou mais comandos SQL, que por sua vez deverá ser executada por completo para ter sucesso, ou seja, caso algum comando dentro do bloco dê errado, a transação falha.

Trazendo para um cenário real, o exemplo mais comum para explicar uma transação seria uma transferência de dinheiro entre duas contas correntes. Vamos imaginar que o usuário A vai transferir `R$ 100,00` para o usuário B.

Note que, para realizar a transferência, você precisa de duas operações. Você precisa de uma operação para retirar `R$ 100,00` da conta do usuário A e uma operação para adicionar `R$ 100,00` na conta do usuário B. Esse processo completo é uma operação _atômica_. Ou as duas acontecem, ou nada acontece.

Imagine que, quando executamos essa transferência, por algum motivo não foi possível adicionar os `R$ 100,00` na conta do usuário B. Porém já haviamos removido os `R$ 100,00` da conta do usuário A. Teríamos um baita problema, correto? Com o uso de transações, as operações só seriam executadas no banco de dados caso todas as operações resultassem em sucesso. Caso alguma operação falhe, automaticamente o banco de dados reverte as demais operações. Com isso garantimos a integridade dos dados.

<%= figure(%{src: "/back-end/orm/images/transacao.gif", class: "text-center rounded mx-auto d-block",  height: "auto", caption: "DB Transactions"}) %>

Uma transação de banco de dados relacional, por definição, deve ser atômica, consistente, isolada e durável, mais conhecida pela sigla **ACID**:

- **A**tomicidade: todas as operações definidas na transação devem ser concluídas com sucesso. Se algo falhar, a transação inteira falha;

- **C**onsistência: todas as regras do banco de dados devem ser respeitadas, ou seja, estrutura de tabelas, chaves estrangeiras, campos restritos etc.;

- **I**solamento: uma transação não pode interferir em outra transação. Cada transação deve se comportar de forma totalmente isolada das demais transações do banco de dados;

- **D**urabilidade: uma vez que a transação foi finalizada, os dados ali modificados devem ser armazenados de forma permanente, ou seja, só será possível alterá-los caso uma nova transação seja executada posteriormente.

Resumindo, sempre que possível, tente utilizar transações, pois irá fornecer dados mais confiáveis, diminuindo as chances de erro. O Sequelize não usa, por default, transações. Portanto, precisa-se configurá-lo para utilizar as transações.

Existem dois tipos de transações dentro do Sequelize: `Unmanaged transactions` e `Managed transactions`.

##### Unmanaged transactions

Para esse tipo de _transaction_, é preciso indicar manualmente a circunstância em que uma transação deve ser finalizada ou revertida. Exemplo de código:

```language-javascript
/_ Primeiro iniciamos a transação _/
const t = await sequelize.transaction();

try {
/_ Depois executamos as operações _/

const user = await User.create(
{
firstName: "Bart",
lastName: "Simpson",
},
{ transaction: t }
);

await user.addSibling(
{
firstName: "Lisa",
lastName: "Simpson",
},
{ transaction: t }
);

/_ Se chegou até essa linha, quer dizer que nenhum erro ocorreu.
Com isso, podemos finalizar a transação. _/
await t.commit();
} catch (error) {
/_ Se entrou nesse bloco é porque alguma operação falhou.
Portanto, revertemos todas as operações anteriores _/
await t.rollback();
}
```

##### Managed transactions

O próprio Sequelize controla quando deve finalizar ou reverter uma transação:

Exemplo de código:

```language-javascript
try {
  const result = await sequelize.transaction(async (t) => {
    const user = await User.create(
      {
        firstName: "Abraham",
        lastName: "Lincoln",
      },
      { transaction: t }
    );

    await user.setShooter(
      {
        firstName: "John",
        lastName: "Boothe",
      },
      { transaction: t }
    );

    return user;

  });
/_ Se chegou até aqui é porque as operações foram concluídas com sucesso,
não sendo necessário finalizar a transação manualmente.
`result` terá o resultado da transação, no caso um user criado _/
} catch (error) {
/_ Se entrou nesse bloco é porque alguma operação falhou.
Nesse caso, o sequelize irá reverter as operações anteriores, não sendo necessário fazer manualmente _/
}
```

### Conclusão

Vimos **bastante conteúdo** hoje! Exploramos muitos conceitos e ferramentas que, de forma bem completa, nos permitem criar, alterar, configurar e operar com um banco de dados na nossa aplicação utilizando código JavaScript adicionável ao nosso controle de versão. A ideia de buscar o domínio de cada uma dessas ferramentas pode parecer intimidador agora, mas você praticará isso bastante! Não hesite em voltar aqui futuramente caso precise reforçar alguma explicação!

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

Agora que já passamos pelos conceitos mais básicos, está na hora de arregaçar as mangas e colocar a mão na massa com a nossa aula ao vivo!

Bora pro slack, onde o link estará disponível. 😉

---

## Exercícios

###### Tempo sugerido para realização: 100 minutos

Hora de pôr a mão na massa!

<%= versioning_your_code(@conn) %>

### Instruções para realização dos exercícios

Neste exercício vamos criar uma API simples, onde será possível criar um livro ou listar todos os livros da base de dados. Vamos utilizar MySQL como banco de dados e Sequelize como nosso ORM.

##### Detalhes do projeto

1. Crie uma nova pasta e inicie um projeto com Express:

```language-bash
   \$ npm init -y

\$ npm install express body-parser
```

2. Crie o arquivo `index.js`;

3. Instale o pacote `sequelize` e o `mysql2`:

```language-bash
   \$ npm install sequelize mysql2
```

4. Instale o pacote `sequelize-cli` como uma dependência de desenvolvimento:

```language-bash
   \$ npm install --save-dev sequelize-cli
```

5. Use o `Sequelize-CLI` para iniciar a configuração do ORM:

```language-bash
   \$ npx sequelize init
```

Esse comando irá gerar as pastas `models`, `seeder`, `config` e `migration` dentro do seu projeto.

6. Agora, aproveitando a CLI, vamos criar nossa primeira `migration` para `books` usando:

```language-bash
   \$ npx sequelize migration:generate --name create-books
```

7. Dentro do `up`, crie uma tabela `Books` com os atributos: `id` (nossa chave primária), `title` (string e não pode ser nulo), `author` (string e não pode ser nulo), `pageQuantity`(integer e pode ser nulo) e `createdAt`(date e não pode ser nulo).

8. Dentro do `down`, drope a tabela `Books`.

9. Crie seu banco de dados e coloque todas as configurações dentro do arquivo `config/config.js`.

10. Agora você pode rodar as migrations (seu banco precisa estar configurado certinho para isso funcionar):

```language-bash
    \$ npx sequelize db:migrate
```

11. Crie um arquivo `Book.js` dentro da pasta `models` e crie seu modelo lá dentro, respeitando os atributos que definimos nas migrations.
    **Dica** - Preste atenção em como o arquivo `models/index.js` é definido, ele vai te ajudar a importar seus modelos mais facilmente.

### Agora é sua vez!

**Exercício**: Crie os controllers do seu projeto com as seguintes rotas:

- `GET /books` - lista todos os livros;

- `GET /book/:id` - pega o livro com o id especificado;

- `POST /book` - cria um novo livro;

- `POST /book/:id` - sobrescreve o livro com ID selecionado;

- `DELETE /book/:id` - deleta um livro;

- Em caso de erro, os endpoints devem retornar status code `500` com a mensagem: 'Algo deu errado'.

**Dica**: Para testar suas requisições você pode utilizar o [Postman](https://www.postman.com/).

### Bônus

- Crie um `seeder` usando o `Sequelize-CLI`, populando a sua base com pelo menos um livro;

- Crie um endpoint para buscar o livro por `author` (pode adaptar algum que já exista);

- Crie uma ordenação no endpoint `GET /books` para ordenar por orderm alfabética e por data de criação;

- Adicione, também, uma data de update nos atributos do livro que se altera sempre que o livro for atualizado.

---

## Recursos Adicionais

- [Iniciando com Sequelize](https://sequelize.org/v5/manual/getting-started.html) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Transações Banco de Dados](https://pt.wikipedia.org/wiki/Transa%C3%A7%C3%A3o_(banco_de_dados)) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Apresentando e usando o Sequelize](http://www.macoratti.net/17/01/node_sequelize1.html) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Sequelize Oficial Docs](https://sequelize.org/master/index.html) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Sequelize CLI](https://github.com/sequelize/cli) {: .external-link target="_blank" rel="noreferrer noopener" }

- [CRUD com Sequelize](https://dev.to/nedsoft/performing-crud-with-sequelize-29cf) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Mongoose](https://mongoosejs.com/) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Introdução ao Mongoose](https://developer.mozilla.org/pt-BR/docs/Learn/Server-side/Express_Nodejs/mongoose) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
