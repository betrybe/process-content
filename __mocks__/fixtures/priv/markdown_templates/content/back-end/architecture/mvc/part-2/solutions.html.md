## Gabarito dos exercícios

A seguir temos uma possível solução para os exercícios:

## Solução

#### Estrutura da solução:

<%= figure(%{src: "/back-end/architecture/images/structure.png", caption: "Estrutura da solução.", class: "text-center"}) %>

```javascript
//controller/userController.js
import userService from "../services/userService";

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('register', {title: 'Cadastrar Usuário', response: null});
});


router.post('/', (req, res) => {
    const {email, password, birthYear} = req.body

    try {
        const newUser = userService.add(email, password, birthYear)
        res.status(200).send({data: newUser})
    } catch (e) {
        res.status(500).send({message: 'Algo deu errado'})
    }

});

```

```javascript
//model/userModel.js
const url = 'mongodb://127.0.0.1:27017'
const mongoClient = require("mongodb").MongoClient;
mongoClient.connect(url)
    .then(conn => global.conn = conn.db("mvcdb"))
    .catch(err => console.log(err))

class User {
    constructor(email, password, birthYear) {
        this._colletion = global.conn.collection("users")
        this.email = email
        this.password = password
        this.age = new Date().getFullYear() - birthYear
    }

    save() {
        if (this.age > 18) {
            this._colletion.insertOne({"email": this.email, "password": this.password, "age": this.age})
            return {error: false, message: "Usuário adicionado com sucesso!"}
        } else {
            return {error: true, message: "Usuário menor de idade!"}
        }
    }
}

module.exports = User
```

```javascript
//service/userService.js
import SlackService from "./slackService";
import UserModel from '../models/user'

export default class UserService {
    add(email, password, birthYear) {
        try {
            const newUser = new UserModel(email, password, birthYear)
            const createdUser = newUser.save()

            SlackService.sendMessage('new-users', 'Usuário {} criado com sucesso'.format(newUser.email))

            return {user: createdUser}
        } catch (e) {
            throw new Error(e)
        }

    }
}
```

```javascript
//service/slackService.js
const request = require('request')

export default class SlackService {
    sendMessage(channel, message) {
        request.post(
            'https://slack.com/api',
            {
                channel: channel,
                message: message
            },
            (error, res, body) => {
                if (error) {
                    console.error(error)
                    return {status: true}
                }
                console.log(`statusCode: ${res.statusCode}`)
                console.log(body)
                return {status: false}
            }
        )
    }
}
```
