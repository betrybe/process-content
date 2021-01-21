## Gabarito dos exercícios

Vamos realizar as seguintes alterações no projeto:

1. Criar as seguintes novas camadas:
    - Domain;
    - Infrastructure.

2. Criar as seguintes entidades dentro de `Domain`:
    - User;
    - Account.

3. Configurar banco de dados dentro da camada `infrastructure`;

4. Criar os seguintes repositórios e mappers:
    - UserRepository;
    - UserMapper;
    - AccountRepository;
    - AccountMapper.

5. Criar o seguinte serviço dentro da camada `Domain`:
    - UserService (responsável por criar usuário e conta corrente).

6. Remover camada `Model` e `Services`;

7. O controller `userController` deverá chamar diretamente o `userService` de dentro da camada `Domain`.

#### Bonus

1. Transforme seu controller numa API Restful;

2. Configurar o ODM mongoose na camada `Infrastructure`.

---

**Dica**: desenhe suas camadas e o que deve ir em cada uma, e como uma se liga com a outra! Isso irá deixar o seu trabalho menos confuso. Posteriormente, faça um exercício mental: para novas funcionalidades e regras de negócio, que código iria para cada lugar? Imagine algo novo (por exemplo, algo para uma pessoa investir dinheiro) e pense em como isso ficaria estruturado!

## Solução

A seguir temos uma possível solução para os exercícios:

> controller/userController.js

```language-javascript
import userService from "../domain/services/userService";

const express = require('express');
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("register", { title: "Cadastrar Usuário", response: null });
});

router.post('/', (req, res) => {
  const { email, password, birthYear } = req.body

  try {
    const newUser = userService.add(email, password, birthYear)

    res.status(200).send({ data: newUser })
  } catch (e) {
    res.status(500).send({ message: 'Algo deu errado' })
  }
});
```

> domain/user/user.js

```language-javascript
class User {
  constructor(email, password, birthYear) {
    this.email = email
    this.password = password
    this.age = new Date().getFullYear() - birthYear
  }
}
module.exports = User
```

> domain/account/account.js

```language-javascript
class Account {
  constructor(email, balance) {
    this.email = email;
    this.balance = balance ? balance : 0;
  }
}

module.exports = User
```

> domain/service/userService.js

```language-javascript
import UserModel from "../domain/User";
import AccountModel from "../domain/Account";
import userRepository from "../infrastructure/user/User";
import accountRepository from "../infrastructure/account/Account";

export default class UserService {
  add(email, password, birthYear) {
    try {
      const newUser = new UserModel(email, password, birthYear);
      const createdUser = userRepository.create(newUser);
      const newAccount = new AccountModel(newUser.email);
      const createdAccount = accountRepository.create(newAccount);

      return { user: createdUser, account: createdAccount };
    } catch (e) {
      throw new Error(e);
    }
  }
}
```

> infrastructure/database/models/userModel.js

```language-javascript
module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define(
    "user",
    {
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      age: DataTypes.INTEGER,
    },
    {
      classMethods: {
        associate() {
          // associations can be defined here
        },
      },
    }
  );

  return User;
};
```

> infrastructure/repositories/user/userRepository.js

```language-javascript
const UserMapper = require("./UserMapper");

class UserRepository {
  constructor({ UserModel }) {
    this.UserModel = UserModel;
  }

  create(user) {
    const newUser = this.UserModel.create(UserMapper.toDatabase(user));

    return UserMapper.toEntity(newUser);
  }
}

module.exports = UserRepository;
```

> infrastructure/repositories/user/userMapper.js

```language-javascript
const User = require("../domain/user/User");

const UserMapper = {
  toEntity({ dataValues }) {
    const { email, password, age } = dataValues;

    return new User({ email, password, age });
  },

  toDatabase(survivor) {
    const { email, password, age } = survivor;

    return { email, password, age };
  },
};

module.exports = UserMapper;
```

> infrastructure/database/models/accountModel.js

```language-javascript
module.exports = function (sequelize, DataTypes) {
  const Account = sequelize.define(
    "account",
    {
      email: DataTypes.STRING,
      balance: DataTypes.FLOAT,
    },
    {
      classMethods: {
        associate() {
          // associations can be defined here
        },
      },
    }
  );

  return User;
};
```

> infrastructure/repositories/account/accountRepository.js

```language-javascript
const AccountMapper = require("./AccountMapper");

class AccountRepository {
  constructor({ AccountModel }) {
    this.AccountModel = AccountModel;
  }

  create(account) {
    const newAccount = this.AccountModel.create(
      AccountMapper.toDatabase(account)
    );

    return AccountMapper.toEntity(newAccount);
  }
}

module.exports = AccountRepository;
```

> infrastructure/repositories/account/accountMapper.js

```language-javascript
const Account = require("../domain/account/Account");

const AccountMapper = {
  toEntity({ dataValues }) {
    const { email, balance } = dataValues;

    return new Account({ email, balance });
  },

  toDatabase(survivor) {
    const { email, balance } = survivor;

    return { email, balance };
  },
};

module.exports = AccountMapper;
```
