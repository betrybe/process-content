## Gabarito dos exercícios

A seguir temos uma possível solução para os exercícios:

---

1. Crie uma classe com o nome `A`:

```language-javascript
const assert = require('assert')
class A {}

assert.strictEqual(typeof A.prototype, "object")
```

2. Crie uma classe com o nome `Person` que possua dois atributos, `name` e `age`.
Os dois atributos devem ser configurados através de parametros passados durante a criação do objeto:

```language-javascript
const assert = require('assert')

class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
}

let person = new Person("Diana", 34)

assert.strictEqual(typeof Person.prototype, "object")
assert.ok(person instanceof Person)
assert.strictEqual(person.name, "Diana")
assert.strictEqual(person.age, 34)
```

3. Crie uma classe com o nome `Dog` que possua o atributo `name`.
Inicialize o valor de `name` com o valor `""` (string vazia).
**Não** deve ser possível definir o valor de `name` durante a instanciação da classe.

```language-javascript
const assert = require('assert')

class Dog {
  constructor() {
    this.name = ""
  }
}

let dog = new Dog("Dog!!!")

assert.strictEqual(typeof Dog.prototype, "object")
assert.ok(dog instanceof Dog)
assert.strictEqual(dog.name, "")
dog.name = "Peter"
assert.strictEqual(dog.name, "Peter")
```

4. Crie uma classe com o nome `User` que possua os atributos `name` e `active`.
Os dois atributos devem ser configurados através de parametros passados durante a criação do objeto.
Caso nenhum valor seja passado para `active`, o valor `false` deve ser configurado como valor padrão:

```language-javascript
const assert = require('assert')

class Robot {
  constructor(name, active) {
    this.name = name
    if (active == undefined || active == null) {
      this.active = false
    } else {
      this.active = active
    }
  }
}

let robot1 = new Robot("Tars", true)

assert.strictEqual(typeof Robot.prototype, "object")
assert.ok(robot1 instanceof Robot)
assert.strictEqual(robot1.name, "Tars")
assert.strictEqual(robot1.active, true)

let robot2 = new Robot("Case")

assert.strictEqual(typeof Robot.prototype, "object")
assert.ok(robot2 instanceof Robot)
assert.strictEqual(robot2.name, "Case")
assert.strictEqual(robot2.active, false)

let robot3 = new Robot("Kipp", null)

assert.strictEqual(typeof Robot.prototype, "object")
assert.ok(robot3 instanceof Robot)
assert.strictEqual(robot3.name, "Kipp")
assert.strictEqual(robot3.active, false)
```

5. Criei a classe `Dog` que possua o atributo `name`.
Esse atributo deve ser configurado durante a instanciação do objeto.
Crie a função `bark` que retorna a string composta pelo atributo `name` concatenada com `" is barking"`.

```language-javascript
const assert = require('assert')

class Dog {
  constructor(name) {
    this.name = name
  }

  bark() {
    return `${this.name} is barking`
  }
}

let dog1 = new Dog("Apolo")

assert.strictEqual(typeof Dog.prototype, "object")
assert.ok(dog1 instanceof Dog)
assert.strictEqual(dog1.name, "Apolo")
assert.strictEqual(dog1.bark(), "Apolo is barking")

let dog2 = new Dog("Arcos")

assert.strictEqual(typeof Dog.prototype, "object")
assert.ok(dog2 instanceof Dog)
assert.strictEqual(dog2.name, "Arcos")
assert.strictEqual(dog2.bark(), "Arcos is barking")
```

6. Crie a classe com o nome `BankTransaction`.
Crie o método estático chamado `transfer` que receba 3 parametros: 1) um objeto da classe `BankAccount` que terá o dinheiro retirado da conta; 2) um objeto da classe `BankAccount` que terá o dinheiro depositado na conta; 3) um valor inteiro referente ao valor da transferência bancária:

```language-javascript
const assert = require('assert')

class BankAccount {
  constructor(identifier, balance) {
    this.identifier = identifier
    if (balance > 0) {
      this.balance = balance
    } else {
      this.balance = 0
    }
  }

  deposit(amount) {
    this.balance = this.balance + amount
    return this.balance
  }

  withdrawal(amount) {
    this.balance = this.balance - amount
    return this.balance
  }
}

class BankTransaction {
  static transfer(from, to, amount) {
    from.withdrawal(amount)
    to.deposit(amount)
  }
}

let account1 = new BankAccount(1, 300)
let account2 = new BankAccount(2, 500)

assert.strictEqual(typeof BankAccount.prototype, "object")
assert.ok(account1 instanceof BankAccount)
assert.strictEqual(typeof BankAccount.prototype, "object")
assert.ok(account2 instanceof BankAccount)

BankTransaction.transfer(account1, account2, 100)
assert.strictEqual(account1.balance, 200)
assert.strictEqual(account2.balance, 600)
```

7. Crie a classe `User` que possua o atributo `name`.
Inicialize o valor de `name` com o valor `""` (string vazia).
**Não** deve ser possível definir o valor de `name` durante a instanciação da classe. Antes de definir o valor de `name`, se o valor recebido for `undefined` ou `null` o valor de `name` deve ser `""`, caso contrário basta configura-lo com o valor recebido. Analise os `asserts` presentes para direcionar sua solução:

```language-javascript
const assert = require('assert')

class User {
  constructor() {
    this._name = ""
  }

  get name() {
    return this._name
  }

  set name(name) {
    if (name != undefined && name != null) {
      this._name = name
    }
  }
}

let user1 = new User("Trybe")

assert.strictEqual(typeof User.prototype, "object")
assert.ok(user1 instanceof User)
assert.strictEqual(user1.name, "")

user1.name = undefined;
assert.strictEqual(user1.name, "")

user1.name = null
assert.strictEqual(user1.name, "")

user1.name = "Tryber"
assert.strictEqual(user1.name, "Tryber")
```

8. Transforme a função `A` para a classe `B`:

```language-javascript
const assert = require('assert')

function A(name) {
  this.name = name
  this.color = "red"
}

A.prototype.describe = function() {
  return `${this.name} - ${this.color}`
}

A.info = function() {
  return "This is a class"
}

class B {
  constructor(name) {
    this.name = name
    this.color = "red"
  }

  describe() {
    return `${this.name} - ${this.color}`
  }

  static info() {
    return "This is a class"
  }
}

let a = new A("Bastian")

assert.strictEqual(typeof A.prototype, "object")
assert.ok(a instanceof A)
assert.strictEqual(a.name, "Bastian")
assert.strictEqual(a.color, "red")
assert.strictEqual(a.describe(), "Bastian - red")
a.color = "yellow"
assert.strictEqual(a.color, "yellow")
assert.strictEqual(A.info(), "This is a class")

let b = new B("Bastian")

assert.strictEqual(typeof B.prototype, "object")
assert.ok(b instanceof B)
assert.strictEqual(b.name, "Bastian")
assert.strictEqual(b.color, "red")
assert.strictEqual(b.describe(), "Bastian - red")
b.color = "yellow"
assert.strictEqual(b.color, "yellow")
assert.strictEqual(B.info(), "This is a class")
```

9. Agora é hora de criar duas classes, elas simularão uma mensagem e um servidor de email. Os requisitos para cada uma delas são:

A primeira classe deve ser chamada de `EmailMessage`, possuir os atributos `from`, `to`, `subject` e `content`, representando respectivamento o email de quem envia, o email de quem recebe, o assunto e o conteúdo da mensagem. Na construção de um objeto do tipo `EmailMessage` o atributo `from` deve ser configurado para o valor `undefined` e todos os outros serão recebidos via parametro e na ordem em que foram descritos.

A segunda classe deve ser chamada de `EmailServer`, possuir os atributos `owner` e `sent_messages`, representando respectivamente o email de quem envia e a lista de mensagens enviadas. Na construção de um objeto do tipo `EmailServer` o atributo `sent_messages` deve ser configurado para o valor de uma lista vazia e `owner` será recebido via parametro.

`EmailServer` deve possuir a função `createMessage` que recebe como parâmetro o email de quem receberá a mensagem, o assunto e conteúdo da mensagem. Esta função deve retornar um objeto do tipo `EmailMessage` com os atributos configurados.

`EmailServer` deve possuir a função `sendMessage` que recebe como parâmetro um objeto do tipo `EmailMessage`. Esta função deve retornar a mensagem enviada, mas antes deve configurar o atributo no objeto `EmailMessage` referente ao email de quem envia e adicionar a mensagem à lista de mensagens enviadas.

```language-javascript
const assert = require("assert")

class EmailMessage {
  constructor(to, subject, content) {
    this.from = undefined
    this.to = to
    this.subject = subject
    this.content = content
  }
}

class EmailServer {
  constructor(owner) {
    this.owner = owner
    this.sent_messages = []
  }

  createMessage(to, subject, content) {
    return new EmailMessage(to, subject, content)
  }

  sendMessage(msg) {
    let message = new EmailMessage(msg.to, msg.subject, msg.content)
    message.from = this.owner
    this.sent_messages.push(message)
    return message
  }
}

assert.strictEqual(typeof EmailMessage.prototype, "object")
let msg1 = new EmailMessage("tryber@betrybe.com", "Email Message", "Esse aqui é o conteúdo da mensagem")
assert.strictEqual(msg1.from, undefined)
assert.strictEqual(msg1.to, "tryber@betrybe.com")
assert.strictEqual(msg1.subject, "Email Message")
assert.strictEqual(msg1.content, "Esse aqui é o conteúdo da mensagem")

assert.strictEqual(typeof EmailServer.prototype, "object")
let server1 = new EmailServer("my-email@betrybe.com")
assert.strictEqual(server1.owner, "my-email@betrybe.com")
assert.strictEqual(server1.sent_messages.length, 0)
let msg2 = server1.createMessage("destination@betrybe.com", "HAHAHA", "hehehe")
assert.ok(msg2 instanceof EmailMessage)
assert.strictEqual(msg2.from, undefined)
assert.strictEqual(msg2.to, "destination@betrybe.com")
assert.strictEqual(msg2.subject, "HAHAHA")
assert.strictEqual(msg2.content, "hehehe")
assert.strictEqual(server1.sent_messages.length, 0)
msg2 = server1.sendMessage(msg2)
assert.ok(msg2 instanceof EmailMessage)
assert.strictEqual(msg2.from, "my-email@betrybe.com")
assert.strictEqual(msg2.to, "destination@betrybe.com")
assert.strictEqual(msg2.subject, "HAHAHA")
assert.strictEqual(msg2.content, "hehehe")
assert.strictEqual(server1.sent_messages.length, 1)
```
