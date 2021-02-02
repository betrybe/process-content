## O que vamos aprender?

Em MySQL você aprendeu a criar relações entre tabelas, utilizar _Foreign Keys_ e _Primary Keys_, e fazer requisições com os _temidos_ maravilhosos `JOIN's`.

Hoje você verá como o `Sequelize` adaptou essas ferramentas e como usá-las!

---

### Você será capaz de:

- Utilizar o sequelize para criar relacionamentos entre tabelas;

- Utilizar métodos que simulam comandos de integração de tabelas;

---

## Por que isso é importante?

Já vimos anteriormente quanto o `Sequelize` facilita a vida das pessoas programadoras que utilizam aplicações em NodeJS para interagir com o banco de dados.

Uma das principais utilidades de bancos relacionais como o MySQL é a criação de relação entre as tabelas, que aumenta sua performance e organize os dados, além de outros benefícios.

O `Sequelize` também possui ferramentas para criar, manipular e ler as tabelas e seus relacionamentos, então mãos à obra!.

---

## Conteúdos

###### Tempo sugerido para realização: 120 minutos

### Relacionamentos 1:1

Antes de começar, analise o diagrama abaixo. Esse será o banco de dados que utilizaremos no primeiro exemplo.

<%= figure(%{src: "/back-end/orm/images/diagrama1.png", class: "text-center rounded mx-auto d-block", width: "800px", height: "auto", caption: "Representação de um banco 1:1"}) %>

Podemos notar que existem duas tabelas nesse banco, `Employees` e `Addresses`. Cada _employee_ possui um _address_, assim como cada _address_ pertence a um _employee_.

Vamos criar um novo projeto para demonstrar esse exemplo. No dia anterior você viu todos os comandos que vamos utilizar, mas vamos relembrá-los.

Primeiro, abra seu terminal, depois crie um diretório, acesse-o e rode os comandos abaixo:

```language-bash
npm init -y

npm i express nodemon sequelize mysql2

npm i -D sequelize-cli

npx sequelize-cli init
```

Agora, realize as configurações necessárias no arquivo `config/config.json`, para fazer o exemplo, você utilizará a chave `development`, então altere os valores dessa chave caso necessário, os valores são:

1. **Username** da sua instalação do MySQL.
2. **Senha** da sua instalação do MySQL.
3. **Database**, que é o nome do schema que será criado, em nosso exemplo, iremos utilizar `associations`.
4. **Host** é o IP do seu servidor, no nosso caso, iremos manter `127.0.0.1`.
5. **Dialect** que é o tipo de banco SQL que será utilizado (exemplos são:  MySQL, MariaDB, PostgreSQL e outros). Vamos utilizar _MySQL_, então manteremos a opção que vem por padrão.

Após configurar o seu `config.json`, precisamos criar o schema que irá conter as nossas tabelas, para fazer isso, utilize o comando abaixo. O schema será criado com o nome que digitamos na chave `development.database` do `config.json`:

```language-bash
npx sequelize db:create
```

Agora vamos criar as migrations e para criar a migration que será responsável pela tabela `Employees`, basta utilizar o comando:

```language-bash
npx sequelize migration:generate --name create-employees
```

Abra a migration e adicione o seguinte código:

```language-javascript
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const EmployeesTable = queryInterface.createTable('Employees', {
      employee_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      first_name: { allowNull: false, type: Sequelize.STRING },
      last_name: { allowNull: false, type: Sequelize.STRING },
      age: { allowNull: false, type: Sequelize.INTEGER },
    });
    return EmployeesTable;
  },

  down: async (queryInterface) => queryInterface.dropTable('Employees'),
};
```

Agora vamos criar a migration responsável pela tabela `Addresses` utilizando o comando:

```language-bash
npx sequelize migration:generate --name create-addresses
```

Abra a migration e adicione o seguinte código:

```language-javascript
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const AddressesTable = queryInterface.createTable('Addresses', {
      address_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      city: { allowNull: false, type: Sequelize.STRING },
      street: { allowNull: false, type: Sequelize.STRING },
      number: { allowNull: false, type: Sequelize.INTEGER },
      employee_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'Employees', key: 'employee_id' },
      },
    });

    return AddressesTable;
  },

  down: async (queryInterface) => queryInterface.dropTable('Addresses'),
};
```

Repare que, agora, temos algumas informações novas sendo passadas para o sequelize no momento de adicionar a coluna. Essas informações informam ao Sequelize que aquele campo deve ser uma _foreign key_. Vamos passar por cada um deles:

- `references.model`: Indica qual tabela nossa FK está referenciando, utilizando o **nome do `Model`** que **representa** aquela tabela no código.
- `references.key`: Indica qual coluna da tabela estrangeira deve ser utilizada para nossa _foreign key_.
- `onUpdate` e `onDelete`: Configura o que deve acontecer ao atualizar ou excluir um usuário. Nesse caso, todos os produtos daquele usuário serão alterados ou excluídos.

Essa migration cria uma FK na tabela `Addresses`, que relaciona o campo `employee_id` dessa tabela ao campo `employee_id` da tabela `Employees`.

Vamos executar o comando para gerar as migrations:

```language-bash
npx sequelize db:migrate
```

> Ok, mas como criamos essa associação no sequelize?

Com as migrations criadas, vamos para os `models`!

O model de `Employees` será da seguinte maneira:

```language-javascript
// models/Employees.js
const createEmployees = (sequelize, DataTypes) => {
  const Employees = sequelize.define('Employees', {
    employee_id: { type: DataTypes.INTEGER, primaryKey: true },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    age: DataTypes.INTEGER,
  },
  {
    timestamps: false,
  });

  Employees.associate = (models) => {
    Employees.hasOne(models.Addresses,
      { foreignKey: 'employee_id', as: 'addresses' });
  };

  return Employees;
};

module.exports = createEmployees;
```

A função `Employees.associate = (models) => {}`, que criamos é onde iremos declarar as associações daquele Model. No nosso caso, estamos dizendo que a tabela `Employees` possui um Address, referenciado pela foreign key `employee_id`, e que o model `Employees` deve chamar de `addresses` (note a letra minúscula), como definido na propriedade `as`.

Essa função é chamada pelo arquivo `models/index.js`, criado pelo comando `npx sequelize-cli init` que você já executou ao começar o exemplo.

Os métodos de criação de associações  que o sequelize disponibiliza são:

  - **hasOne**
  - **belongsTo**
  - **hasMany**
  - **belongsToMany**

No caso de relacionamentos 1:1, utilizamos os métodos `hasOne` e `belongsTo`. A tradução literal desses métodos facilita o seu entendimento.

> `hasOne` = _tem um_

> `belongsTo` = _pertencente a_

No model `Addresses`, por sua vez, temos que fazer o caminho inverso, declarando que os _address_ pertencem a `Employees`.

```language-javascript
// models/Addresses.js
const createAddresses = (sequelize, DataTypes) => {
  const Addresses = sequelize.define('Addresses', {
    address_id: { type: DataTypes.INTEGER, primaryKey: true },
    city: DataTypes.STRING,
    street: DataTypes.STRING,
    number: DataTypes.INTEGER,
    employee_id: { type: DataTypes.INTEGER, foreignKey: true },
  },
  {
    timestamps: false,
  });

  Addresses.associate = (models) => {
    Addresses.belongsTo(models.Employees,
      { foreignKey: 'employee_id', as: 'addresses' });
  };

  return Addresses;
};

module.exports = createAddresses;
```

#### Testando relacionamentos 1:1

Agora, vamos testar o relacionamento, para isso precisaremos criar seeders para inserirmos dados nas tabelas e um servidor para responder as requisições.

Para criar os dois seeders, utilize os comandos abaixo:

```language-bash
npx sequelize seed:generate --name employees
npx sequelize seed:generate --name addresses
```

Depois, abra o arquivo `employees` dentro da pasta `seeders` e copie o código abaixo. Todas as seeds quando criadas, tem um timestamp antes do nome do arquivo, lembre-se disso ao procurá-lo:

```language-javascript
module.exports = {
  up: async (queryInterface, _Sequelize) => queryInterface
    .bulkInsert(
      'Employees',
      [
        {
          first_name: 'Marcos',
          last_name: 'Zuck',
          age: 49,
        },
        {
          first_name: 'Fred',
          last_name: 'Mercurio',
          age: 19,
        },
        {
          first_name: 'Ayrton',
          last_name: 'Keno',
          age: 51,
        },
        {
          first_name: 'Robin',
          last_name: 'Mathias',
          age: 63,
        },
        {
          first_name: 'Antonio',
          last_name: 'Augusto',
          age: 18,
        },
      ],
      {},
    ),

  down: async (queryInterface, _Sequelize) => queryInterface
    .bulkDelete('Employees', null, {}),
};
```

Faça o mesmo para o arquivo `addresses` da pasta `seeds`:

```language-javascript
module.exports = {
  up: async (queryInterface, _Sequelize) => queryInterface
    .bulkInsert(
      'Addresses',
      [
        {
          city: 'Belo Horizonte',
          street: 'Rua Flórida',
          number: 1080,
          employee_id: 1,
        },
        {
          city: 'São Paulo',
          street: 'Avenida Paulista',
          number: 1980,
          employee_id: 2,
        },
        {
          city: 'Fortaleza',
          street: 'Rua das Enseadas',
          number: 95,
          employee_id: 3,
        },
        {
          city: 'Belo Horizonte',
          street: 'Rua Andaluzita',
          number: 131,
          employee_id: 4,
        },
        {
          city: 'Curitiba',
          street: 'Rua Fria',
          number: 101,
          employee_id: 5,
        },
      ],
      {},
    ),

  down: async (queryInterface, _Sequelize) => queryInterface
    .bulkDelete('Addresses', null, {}),
};
```

Depois, utilize o comando abaixo para executar os seeders:

```language-bash
npx sequelize db:seed:all
```

Por último, vamos criar o servidor para testarmos nossas `associations`. Para diminuirmos a complexidade do exercício, não seguiremos a arquitetura MSC, lembrando que isso **não é uma boa prática e deve ser evitada**.

```language-javascript
// index.js
const express = require('express');
const { Addresses, Employees } = require('./models');

const app = express();

app.get('/employees', (_req, res) => Employees
  .findAll({ include: { model: Addresses, as: 'addresses' } })
  .then((answer) => res.status(200).json(answer))
  .catch(() => res.status(500).json({ message: 'Algo deu errado' })));

const PORT = 3000;
app.listen(PORT, () => console.log(`Port: ${PORT}`));
```

A grande diferença quando vamos fazer uma requisição que necessite de utilizar uma association com o Sequelize, é o campo `include`. Esse campo diz ao Sequelize quais serão as configurações da requisição. A propriedade `model` se refere a qual tabela será utilizada. Já a propriedade `as` deve ser igual ao que declaramos no momento da criação da associação no respectivo model.

Agora inicie o servidor, como instalamos o `nodemon` anteriormente, iremos utilizar o `npx` para executá-lo agora, para isso utilize o comando:

```language-bash
npx nodemon index.js
```

Por último, faça uma requisição do tipo `GET` para o endpoint `localhost:3000/employees` e verifique a resposta, onde em cada um dos empregados (employees), aparecerá o respectivo endereço (address).

### Relacionamentos 1:N

No caso dos relacionamentos **1:N**, não há grande diferença na maneira como criamos as associações. Caso cada _employee_ possuísse vários _address_, bastaria declarar seu model da seguinte forma:

```language-javascript
// models/Employees.js
// const createEmployees = (sequelize, DataTypes) => {
//   const Employees = sequelize.define('Employees', {
//     employee_id: { type: DataTypes.INTEGER, primaryKey: true },
//     first_name: DataTypes.STRING,
//     last_name: DataTypes.STRING,
//     age: DataTypes.INTEGER,
//   },
//   {
//     timestamps: false,
//   });

//   Employees.associate = (models) => {
    Employees.hasMany(models.Addresses,
      { foreignKey: 'employee_id', as: 'addresses' });
//   };

//   return Employees;
// };

// module.exports = createEmployees;
```

> `hasMany`: _tem muitos_

Mudamos apenas o método de declaração da associação para `hasMany`, indicando que cada _employee_ pode possuir muitos _address_.

No model _addresses_, por sua vez, não há necessidade de alterarmos nada, pois cada _address_ continua pertencendo a apenas um _employee_, o que justifica o uso do método `belongsTo`.

### Utilizando os relacionamentos

Em seguida, veremos os dois métodos de utilização dos relacionamentos:

  * _Eager loading_, ou carregamento antecipado (que utilizamos no exemplo acima).
  * _Lazy loading_, ou carregamento tardio.

Nesse caso, vamos aprender a utilizar cada um desses dois modos e como eles acontecem no código, usando o relacionamento 1:N que criamos acima.

### Eager Loading

Esse método carrega todos os dados na mesma request. Logo, ao utilizar eager loading, todas as informações são trazidas, independente se vamos usá-las ou não. Este modo é útil para cenários em que sabemos, já de antemão, que sempre vamos precisar de todos os dados das entidades envolvidas.

Antes de prosseguirmos, vamos alterar as informações nas tabelas. Para isso, utilizaremos os _seeders_ já criados.

Abra o arquivo `employees` dentro da pasta `seeders` apague tudo que havíamos colocado antes e copie o código abaixo:

```language-javascript
module.exports = {
  up: async (queryInterface, _Sequelize) => queryInterface
    .bulkInsert(
      'Employees',
      [
        { first_name: 'Marcos', last_name: 'Zuck', age: 49 },
        { first_name: 'Fred', last_name: 'Mercurio', age: 19 },
        { first_name: 'Ayrton', last_name: 'Keno', age: 51 },
        { first_name: 'Robin', last_name: 'Mathias', age: 63 },
        { first_name: 'Antonio', last_name: 'Augusto', age: 18 },
      ],
      {},
    ),

  down: async (queryInterface, _Sequelize) => queryInterface
    .bulkDelete('Employees', null, {}),
};
```

Depois, abra o arquivo `addresses` dentro da pasta `seeders`, limpe-o e copie o código abaixo:

```language-javascript
module.exports = {
  up: async (queryInterface, _Sequelize) => queryInterface
    .bulkInsert(
      'Addresses',
      [
        {
          city: 'Belo Horizonte',
          street: 'Rua Florida',
          number: 1080,
          employee_id: 1,
        },
        {
          city: 'São Paulo',
          street: 'Avenida Paulista',
          number: 1980,
          employee_id: 2,
        },
        {
          city: 'Fortaleza',
          street: 'Rua das Enseadas',
          number: 95,
          employee_id: 3,
        },
        {
          city: 'Belo Horizonte',
          street: 'Rua Andaluzita',
          number: 131,
          employee_id: 4,
        },
        {
          city: 'Belo Horizonte',
          street: 'Rua Vicente Alvarenga',
          number: 80,
          employee_id: 1,
        },
        {
          city: 'Curitiba',
          street: 'Rua Fria',
          number: 101,
          employee_id: 5,
        },
      ],
      {},
    ),

  down: async (queryInterface, _Sequelize) => queryInterface
    .bulkDelete('Addresses', null, {}),
};
```

Por último, utilize o comando abaixo para dropar as tabelas antigas, depois recriá-las e por último, executar as seeders:

```language-bash
npx sequelize db:migrate:undo:all
npx sequelize db:migrate
npx sequelize db:seed:all
```

Vamos ver, agora, como utilizar o eager loading na prática. Voltaremos no arquivo `index.js` e criaremos mais uma rota:

```language-js
// const express = require('express');
// const { Addresses, Employees } = require('./models');

// const app = express();

// app.get('/employees', (_req, res) => Employees
//   .findAll({ include: { model: Addresses, as: 'addresses' } })
//   .then((answer) => res.status(200).json(answer))
//   .catch(() => res.status(500).json({ message: 'Algo deu errado' })));

app.get('/employees/:id', (req, res) => Employees
  .findAll({
    where: { employee_id: req.params.id },
    include: [{ model: Addresses, as: 'addresses' }],
  })
  .then((employee) => {
    if (!employee.length) {
      return res.status(404).send({ message: 'Funcionário não encontrado' });
    }
    return res.status(200).json(employee);
  })
  .catch(() => res.status(500).json({ message: 'Algo deu errado' })));

// const PORT = 3000;
// app.listen(PORT, () => console.log(`Port: ${PORT}`));
```

Agora, faça uma requisição do tipo `GET` para o endpoint `http://localhost:3000/employees/1` e veja como o resultado é retornado.

Além das propriedades que já citamos, o campo `include` pode manipular os dados que serão retornados. Por exemplo, se não quisermos o acesso ao número do endereço, bastaria alterar o código, adicionando a propriedade `attributes` e dentro dela o que queremos fazer:

```language-javascript
// const express = require('express');
// const { Addresses, Employees } = require('./models');

// const app = express();

// app.get('/employees', (_req, res) => Employees
//   .findAll({ include: { model: Addresses, as: 'addresses' } })
//   .then((answer) => res.status(200).json(answer))
//   .catch(() => res.status(500).json({ message: 'Algo deu errado' })));

// app.get('/employees/:id', (req, res) => Employees
//   .findAll({
//     where: { employee_id: req.params.id },
    include: [{
      model: Addresses, as: 'addresses', attributes: { exclude: ['number'] },
    }],
//   })
//   .then((employee) => {
//     if (!employee.length) {
//       return res.status(404).send({ message: 'Funcionário não encontrado' });
//     }
//     return res.status(200).json(employee);
//   })
//   .catch(() => res.status(500).json({ message: 'Algo deu errado' })));

// const PORT = 3000;
// app.listen(PORT, () => console.log(`Port: ${PORT}`));
```

Dessa maneira, o campo `number` será excluído do retorno da requisição.

### Lazy Loading

Agora vamos ver como funciona a outra forma de carregar dados de associações: o _lazy loading_. Esse método consiste, basicamente, em não especificar uma propriedade `includes` no momento de realizar a query no banco e aí, termos dois usos para o endpoint:

  * Caso o parâmetro `includeAddresses` esteja presente, os endereços daquele funcionário também sejam retornados.



Imagine que exista a função `getAddress` que tem como responsabilidade buscar todos os endereços de acordo com o `employee_id`.

```language-javascript
// const express = require('express');
// const { Addresses, Employees } = require('./models');

// const app = express();

// app.get('/employees', (_req, res) => Employees
//   .findAll({ include: { model: Addresses, as: 'addresses' } })
//   .then((answer) => res.status(200).json(answer))
//   .catch(() => res.status(500).json({ message: 'Algo deu errado' })));

// app.get('/employees/:id', (req, res) => Employees
  .findAll({ where: { employee_id: req.params.id } })
  // .then((employee) => {
  //   if (!employee.length) {
  //     return res.status(404).send({ message: 'Funcionário não encontrado' });
  //   }
    if (req.query.includeAddresses === 'true') {
      return Addresses.findAll({ where: { employee_id: req.params.id } })
        .then((address) => res.status(200).json(
          { employee: employee[0], address },
        ));
    }
//     return res.status(200).json(employee);
//   })
//   .catch(() => res.status(500).json({ message: 'Algo deu errado' })));

// const PORT = 3000;
// app.listen(PORT, () => console.log(`Port: ${PORT}`));
```

Reinicie a aplicação e realiza uma requisição do tipo `GET` para o endpoint `http://localhost:3000/employees/1?includeAddresses=true`. Depois, retire o `?includeAddresses=true` e veja seu retorno.

Como pudemos ver, o lazy loading é muito útil em situações em que não sabemos se vamos, de fato, precisar buscar todas as informações de uma só vez. Aqui, se tivéssemos utilizado eager loading, teríamos buscado os dados dos funcionários mesmo quando `includeAddresses` não era informado, e precisaríamos excluir a chave `addresses` do resultado do banco caso esse parâmetro não fosse informado. Com o lazy loading, podemos carregar apenas os dados do funcionário, e carregar os dados dos endereços apenas quando necessário, economizando recursos do banco.

### Relacionamentos N:N

Nos relacionamentos N:N, existem algumas significativas diferenças ao se criar as associações.

O diagrama abaixo será usado como exemplo:

<%= figure(%{src: "/back-end/orm/images/diagrama2.png", class: "text-center rounded mx-auto d-block", width: "800px", height: "auto", caption: "Representação de um banco 1:1"}) %>

Esse banco possui 3 tabelas: `Users`, `Books` e `UserBooks`. A tabela `UserBooks` possui um relacionamento N:N com as demais tabelas.

> Como criamos uma associação que passa por 3 tabelas?

Primeiro, vamos criar o model de `Users`:

```language-javascript
// models/Users.js
const createUsers = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    user_id: { type: DataTypes.INTEGER, primaryKey: true },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    age: DataTypes.INTEGER,
  },
  {
    timestamps: false,
  });

  return Users;
};

module.exports = createUsers;
```

Agora vamos ao model de `Books`:

```language-javascript
// models/Books.js
const createBooks = (sequelize, DataTypes) => {
  const Books = sequelize.define('Books', {
    book_id: { type: DataTypes.INTEGER, primaryKey: true },
    name: DataTypes.STRING,
    release_year: DataTypes.INTEGER,
    number_pages: DataTypes.INTEGER,
  },
  {
    timestamps: false,
  });

  return Books;
};

module.exports = createBooks;
```

Certo, nada demais até o momento.

Vamos agora criar o model de `UserBooks`:

```language-javascript
// models/UserBooks.js
const createUserBooks = (sequelize, _DataTypes) => {
  const UserBooks = sequelize.define(
    'UserBooks',
    {},
    { timestamps: false },
  );

  UserBooks.associate = (models) => {
    models.Books.belongsToMany(models.Users, {
      as: 'users',
      through: UserBooks,
      foreignKey: 'book_id',
      otherKey: 'user_id',
    });
    models.Users.belongsToMany(models.Books, {
      as: 'books',
      through: UserBooks,
      foreignKey: 'user_id',
      otherKey: 'book_id',
    });
  };

  return UserBooks;
};

module.exports = createUserBooks;
```

Primeiro de tudo, note que não temos nenhum atributo nesse model. Isso é possível porque quando estabelecemos os relacionamentos usando `UserBooks` como tabela de associação, o Sequelize já entende que esse model precisa ter os IDs das duas tabelas sendo associadas.

Depois, temos um novo tipo de relacionamento: o `belongsToMany`. Esse relacionamento cria um relacionamento do tipo N:N, utilizando o model especificado na opção `through` como tabela de associação. Temos também o alias daquela associação, na chave `as` e, por último, temos os parâmetros `foreignKey` e `otherKey`. Esses dois parâmetros dizem ao Sequelize qual campo utilizar na tabela de associação para identificar cada uma das entidades.

> Lembre-se: `foreignKey` sempre se refere ao model em que chamamos `belongsToMany`, enquanto `otherKey` se refere ao model com o qual estamos criando a associação.

Para testar a aplicação, você deve fazer as devidas alterações nos _controllers_, criar as migrations e os seeders.

Para criar as migrations, utilize os seguintes comandos:

```language-bash
npx sequelize migration:generate --name create-books
npx sequelize migration:generate --name create-users
npx sequelize migration:generate --name create-user-books
```

E copie o conteúdo abaixo para seus respectivos arquivos de migration, `create-books`, `create-users` e `create-user-books`:

```language-javascript
// cole esse código dentro do arquivo da migration "books"

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Books', {
      book_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: { allowNull: false, type: Sequelize.STRING },
      release_year: { allowNull: false, type: Sequelize.INTEGER },
      number_pages: { allowNull: false, type: Sequelize.INTEGER },
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('Books');
  },
};
```

```language-javascript
// cole esse código dentro do arquivo da migration "users"

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      user_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      first_name: { allowNull: false, type: Sequelize.STRING },
      last_name: { allowNull: false, type: Sequelize.STRING },
      age: { allowNull: false, type: Sequelize.INTEGER },
    });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('Users');
  },
};
```

```language-javascript
// cole esse código dentro do arquivo da migration "user-books"

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('UserBooks', {
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'user_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true,
      },
      book_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Books',
          key: 'book_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true,
      },
    });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('UserBooks');
  },
};
```

Depois disso, teremos que criar as seeds com informações para podermos enfim, testar nossa nova association:

```language-bash
npx sequelize seed:generate --name books
npx sequelize seed:generate --name users
```

```language-bash
npx sequelize seed:generate --name user-books
```

Copie os códigos abaixo para seus respectivos arquivos dentro da pasta `seeders`:

```language-javascript
// cole esse código dentro do arquivo da seed "books"

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface
    .bulkInsert('Books', [
      { name: 'Livro A', release_year: 2020, number_pages: 111 },
      { name: 'Livro B', release_year: 2019, number_pages: 222 },
      { name: 'Livro C', release_year: 2018, number_pages: 333 },
      { name: 'Livro D', release_year: 2017, number_pages: 444 },
    ],
    {}),

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Books', null, {});
  },
};
```

```language-javascript
// cole esse código dentro do arquivo da seed "users"

module.exports = {
  up: async (queryInterface, _Sequelize) => queryInterface
    .bulkInsert('Users', [
      {
        first_name: 'Bárbara',
        last_name: 'Silva',
        age: 16,
      },
      {
        first_name: 'Carlos',
        last_name: 'Santos',
        age: 24,
      },
      {
        first_name: 'Danilo',
        last_name: 'Henrique',
        age: 32,
      },
    ], {}),

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
```

```language-javascript
// cole esse código dentro do arquivo da seed "user-books"

module.exports = {
  up: async (queryInterface, _Sequelize) => queryInterface
    .bulkInsert('UserBooks', [
      { user_id: 1, book_id: 1 },
      { user_id: 1, book_id: 3 },
      { user_id: 2, book_id: 1 },
      { user_id: 2, book_id: 2 },
      { user_id: 3, book_id: 1 },
      { user_id: 3, book_id: 2 },
      { user_id: 3, book_id: 3 },
    ],
    {}),

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('UserBooks', null, {});
  },
};
```

Depois, utilize o comando abaixo para executar as migrations e as seeds:

```language-bash
npx sequelize db:migrate
npx sequelize db:seed:all
```

Para fazer a requisição, bastaria acrescentar ao `index.js` as seguintes linhas:

```language-javascript
const { Books, Users } = require('./models');
// ...
  app.get('/usersbooks/:id', (req, res) => Users
  .findAll({
    where: { user_id: req.params.id },
    include: [{ model: Books, as: 'books', through: { attributes: [] } }],
  })
  .then((usersbooks) => {
    if (!usersbooks.length) {
      return res.status(404).send({ message: 'Usuário não encontrado' });
    }
    return res.status(200).json(usersbooks);
  })
  .catch(() => res.status(500).json({ message: 'Algo deu errado' })));
// ...
```

Agora, faça uma requisição do tipo `GET` para o endpoint `localhost:3000/usersbooks/1` e verifique a resposta para o usuário.

**Nota:** a propriedade `through: { attributes: [] }` deve estar presente, pois sem ela, em cada _book_, apareceriam todos seus respectivos _users_. Tente fazê-lo sem e veja a diferença no resultado!

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

Agora que já passamos pelos conceitos mais básicos, está na hora de arregaçarmos as mangas e colocarmos a mão na massa com a nossa aula ao vivo!

Bora pro slack, onde o link estará disponível. 😉

---

## Exercícios

###### Tempo sugerido para realização: 100 minutos

Hora de por a mão na massa!

<%= versioning_your_code(@conn) %>

### Instruções para realização dos exercícios


Você pode encontrar o repositório com os exercícios no link [Exercício Sequelize Associations,](https://github.com/tryber/exercise-sequelize-associations) {: .external-link target="_blank" rel="noreferrer noopener" } leia o readme e siga as instruções.

---

## Recursos Adicionais

- [Manual de Associations](https://sequelize.org/master/manual/assocs.html) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Sequelize relationships — Ultimate guide](https://medium.com/@eth3rnit3/sequelize-relationships-ultimate-guide-f26801a75554) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Relacionamento Many to Many usando Sequelize + ExpressJS | Higo Ribeiro](https://www.youtube.com/watch?v=p83qrlaCRw4) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
