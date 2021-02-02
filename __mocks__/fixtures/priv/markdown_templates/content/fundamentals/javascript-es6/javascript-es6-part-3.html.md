## O que vamos aprender?

Você vai aprender sobre classes no _JavaScript_.
Classes em _JavaScript_ são introduzidas no ECMAScript 2015 e são simplificações da linguagem para as heranças baseadas nos protótipos.

A sintaxe para classes **não** introduz um novo modelo de herança de orientação a objetos em _JavaScript_.
Classes em _JavaScript_ provêm uma maneira simples e clara de criar objetos e lidar com herança.

---

### Você será capaz de:

  * Criar classes em _JavaScript_;
  * Utilizar atributos em classes;
  * Utilizar métodos de instâncias de classes;
  * Utilizar métodos estáticos de classes;

---

## Por que isso é importante?

As classes são a base para a [programação orientada a objetos.](https://pt.wikipedia.org/wiki/Programa%C3%A7%C3%A3o_orientada_a_objetos) {: .external-link target="_blank" rel="noreferrer noopener" }

Além disso, as classes servem para agrupar atributos e funções relacionadas.
Dessa forma, encapsulamos atributos e funções em uma estrutura a fim de construir um código conciso e com muito mais significado.

---

## Conteúdos

###### Tempo sugerido para realização: 80 minutos

### Declarando classes

Uma maneira de definir uma classe é usando uma declaração de classe.
Para declarar uma classe, você deve usar a palavra-chave `class` seguida pelo nome da classe:

```language-javascript
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}
```

O método `constructor` é um tipo especial de método para criar e iniciar um objeto criado pela classe.
Este método é chamado automaticamente quando um objeto é criado.
Só pode existir um método especial com o nome "constructor" dentro da classe.
Um erro de [sintaxe](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError) {: .external-link target="_blank" rel="noreferrer noopener" } será lançado se a classe possuir mais do que uma ocorrência do método `constructor`.
É possível enviar qualquer número de parâmetros para `constructor`:

```language-javascript
class Rectangle {
  constructor() {
    this.height = 10;
    this.width = 40;
  }
}

...

class Rectangle {
  constructor(side) {
    this.height = 10;
    this.width = side;
  }
}
```

Agora é possível criar objetos (ou instâncias) da classe `Rectangle`:

```language-javascript
let r = new Rectangle(500, 300);
console.log(r.height) // 500
console.log(r.width) // 300
```

Veja um exemplo de implementação de classe e criação de objeto [aqui](https://www.w3schools.com/js/tryit.asp?filename=tryjs_classes_init) {: .external-link target="_blank" rel="noreferrer noopener" }

#### Hoisting (uso antes da declaração)

Uma diferença importante entre **declarações de funções** das **declarações de classes**, é que declarações de funções são [hoisted](https://developer.mozilla.org/pt-BR/docs/Glossario/Hoisting) {: .external-link target="_blank" rel="noreferrer noopener" } e declarações de classes não são.
Primeiramente, deve-se declarar a classe, para só então acessá-la, pois do contrário o código a seguir irá lançar uma exceção: [ReferenceError](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/ReferenceError) {: .external-link target="_blank" rel="noreferrer noopener" }.

```language-javascript
const p = new Rectangle(); // Erro de referência (ReferenceError)

class Rectangle {}
```

### Atributos ou propriedades

As classes podem possuir atributos/propriedades:

```language-javascript
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}
```

A classe `Rectangle` possui os atributos `height` e `width`.
A palavra-chave `this` é utilizada para acessar atributos/propriedades e métodos presentes na classe.

Faça [este](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/es6/use-class-syntax-to-define-a-constructor-function) {: .external-link target="_blank" rel="noreferrer noopener" } exercício sobre classes e atributos.

### Métodos

Além dos atributos, as classes contem métodos, que por sua vez podem ser **métodos de instância** ou **métodos estáticos**.

#### Métodos de instância

Métodos de instâncias são aqueles acessados a partir dos objetos de uma classe:

```language-javascript
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }

  area() {
    return this.height * this.width;
  }
}

let r1 = new Rectangle(10, 30)
let r2 = new Rectangle(20, 5)

console.log(r1.area()) // 300
console.log(r2.area()) // 100
```

Perceba que os métodos de instância agem em cima das propriedades do objeto alvo, ou seja, o método `area()` calcula o valor `300` para instância `r1` porque `height` tem o valor `10` e `width` possui o valor `30`.
Já para `r2`, `height` tem o valor `20` e `width` possui o valor `5` e o retorno do método `area()` é `100`.

Veja um exemplo de criação e uso de métodos de instância [aqui](https://www.w3schools.com/js/tryit.asp?filename=tryjs_classes_method2) {: .external-link target="_blank" rel="noreferrer noopener" }.

#### Métodos estáticos (Métodos de classe)

A palavra-chave `static` define um método estático de uma classe.
Métodos estáticos são chamados sem a instanciação da sua classe e não podem ser chamados em uma instância da classe.
Métodos estáticos são, geralmente, usados para criar funções de utilidades por uma aplicação.

```language-javascript
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;

    return Math.hypot(dx, dy);
  }
}

const p1 = new Point(5, 5);
const p2 = new Point(10, 10);

p1.distance; // undefined
p2.distance; // undefined

console.log(Point.distance(p1, p2)) // 7.0710678118654755
```

Veja um exemplo de criação e uso de métodos de classe [aqui](https://www.w3schools.com/js/tryit.asp?filename=tryjs_classes_static) {: .external-link target="_blank" rel="noreferrer noopener" }.

### Getters e Setters

As classes em _JavaScript_ permitem o uso de _getters_ e _setters_.
Estas são funções especializadas em retornar ou atribuir valores para os atributos.
_Getters_ e _setters_ são um padrão utilizado em várias linguagens para prover proteção dos dados através da criação de um meio de acesso.
Para cada atributo é implementado um _getter_ e um _setter_ que define a lógica referente ao retorno, configuração e atualização do atributo.
Utilizando _getters_ e _setters_ você consegue, por exemplo, garantir a validação antes de configurar o valor de um atributo.
Pode ser inteligente o uso de _getters_ e _setters_ para suas propriedades, especialmente se você quiser fazer algo especial com o valor antes de retorna-lo ou antes de defini-lo.

Para adicionar _getters_ e _setters_ à sua classe, use as palavras-chave `get` e `set`:

```language-javascript
class Car {
  constructor(brand) {
    this.carname = brand;
  }

  get cnam() {
    return this.carname;
  }

  set cnam(x) {
    this.carname = x;
  }
}

let mycar = new Car("Ford");
console.log(mycar.carname); // Ford
console.log(mycar.cnam); // Ford
mycar.cnam = "BMW";
console.log(mycar.cnam); // BMW
```

O nome dos métodos _getters_ e _setters_ não podem ser os mesmos nomes das propriedades da classe.
Para contornar esse problema, muitos programadores adicionam o caracter "`_`" antes do nome da propriedade:

```language-javascript
class Car {
  constructor(brand) {
    this._carname = brand;
  }

  get carname() {
    return this._carname;
  }

  set carname(x) {
    this._carname = x;
  }
}
```

Apesar dos _getters_ e _setters_ serem métodos, não se faz uso de parenteses em suas chamadas.

Faça [este](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/es6/use-getters-and-setters-to-control-access-to-an-object) {: .external-link target="_blank" rel="noreferrer noopener" } exercício sobre _getters_ e _setters_.

### Transformando funções em classes

Como mencionado no início deste conteúdo, as classes representam apenas uma maneira mais simples para criar objetos e lidar com herança.
Antes do **ECMAScript 6**, estas "classes" eram definidas através de funções:

```language-javascript
function Bird(name, color) {
  this.name = name;
  this.color = color;
}

Bird.prototype.sing = function() {
  return "singing"
}

Bird.species = function() {
  return ["Sicalis canaria", "Sicalis flaveola"]
}

let pet = new Bird("Rupert", "blue");
```

para atualizar a função `Bird` para a nova forma de declaração de classe você deve:

1. Alterar `function` para `class`:

```language-javascript
function Bird(name, color) {
  ...
}

class Bird(name, color) {
  ...
}
```

2. Criar o método `constructor` com os parâmetros já definidos no nome da função:

```language-javascript
class Bird(name, color) {
  ...
}

class Bird {
  constructor(name, color) {

  }
}
```

3. Adicionar a lógica presente dentro de `function` ao método `constructor`:

```language-javascript
function Bird(name, color) {
  this.name = name;
  this.color = color;
}

class Bird {
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }
}
```

4. Adicionar as funções com escopo `Bird.prototype` à classe:

```language-javascript
function Bird(name, color) {
  this.name = name;
  this.color = color;
}

Bird.prototype.sing = function() {
  return "singing"
}

class Bird {
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }

  sing() {
    return "singing"
  }
}
```

5. Adicionar as funções com espoco `Bird` à classe com a palavra-chave `static`:

```language-javascript
function Bird(name, color) {
  this.name = name;
  this.color = color;
}

Bird.species = function() {
  return ["Sicalis canaria", "Sicalis flaveola"]
}

class Bird {
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }

  static species() {
    return ["Sicalis canaria", "Sicalis flaveola"]
  }
}
```

Veja um exemplo no vídeo abaixo:

<%= youtube_video "JvpG_hX0-_0" %>

### Prototypes

Agora veja o que são _Prototypes_ e como o _JavaScript_ faz herança entre objetos.

<%= youtube_video "Uk2MT1WyG4k" %>

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

Agora que você estudou sobre classes em _JavaScript_, vamos para aula ao vivo.

O link estará disponível no Slack.

---

## Exercícios

###### Tempo sugerido para realização: 140 minutos

<%= versioning_your_code(@conn) %>

### Instruções para realização dos exercícios

Todos os exercícios contêm um código base.
Você deverá copiar esse código e salvá-lo em um arquivo nomeado conforme especificado no exercício.
Em cada exercício existe uma ou mais chamadas de função do módulo [assert](https://www.w3schools.com/nodejs/ref_assert.asp) {: .external-link target="_blank" rel="noreferrer noopener" }.
Estas funções checarão automaticamente se seu código retorna o resultado esperado.
Sua solução só será considerada correta se **todos** os _asserts_ do arquivo forem executados sem erros.
No _Visual Studio Code_, você pode executar o código do exemplo clicando com o botão direito e escolhando a opção `Run Code`.

Quando todos os _asserts_ passam, isto é, nenhum deles encontra um resultado diferente do esperado, nada de diferente do normal é reportado:

```language-javascript
const assert = require('assert');

function foo() {
  return 'bar';
}

assert.strictEqual(foo(), 'bar');
```

```language-sh
[Running] node "/Users/tryber/example.js"

[Done] exited with code=0 in 0.087 seconds
```

Quando algum _assert_ falha, é exibido, entre outras coisas, a linha onde o erro aconteceu e sua causa:

```language-javascript
const assert = require('assert');

function foo() {
  return 'bar';
}

assert.strictEqual(foo(), 'baz');
```

```language-sh
[Running] node "/Users/tryber/example.js"
assert.js:92
  throw new AssertionError(obj);
  ^

AssertionError [ERR_ASSERTION]: 'bar' == 'baz'
    at Object.<anonymous> (/Users/tryber/example.js:7:8)
    at Module._compile (internal/modules/cjs/loader.js:956:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:973:10)
    at Module.load (internal/modules/cjs/loader.js:812:32)
    at Function.Module._load (internal/modules/cjs/loader.js:724:14)
    at Function.Module.runMain (internal/modules/cjs/loader.js:1025:10)
    at internal/main/run_main_module.js:17:11 {
  generatedMessage: true,
  code: 'ERR_ASSERTION',
  actual: 'bar',
  expected: 'baz',
  operator: '=='
}

[Done] exited with code=1 in 0.075 seconds
```

Atente para a linha que diz por que a execução falhou: `AssertionError [ERR_ASSERTION]: 'bar' == 'baz'`.
Isso significa que o resultado da função `foo` (`bar`) é diferente do esperado (`baz`).

### Agora a prática

1. Crie uma classe com o nome `A`:

```language-javascript
const assert = require('assert')

// escreva aqui o seu código

assert.strictEqual(typeof A.prototype, "object")
```

2. Crie uma classe com o nome `Person` que possua dois atributos, `name` e `age`.
Os dois atributos devem ser configurados através de parametros passados durante a criação do objeto:

```language-javascript
const assert = require('assert')

// escreva aqui o seu código

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

// escreva aqui o seu código

let dog = new Dog("Dog!!!")

assert.strictEqual(typeof Dog.prototype, "object")
assert.ok(dog instanceof Dog)
assert.strictEqual(dog.name, "")
dog.name = "Peter"
assert.strictEqual(dog.name, "Peter")
```

4. Crie uma classe com o nome `Robot` que possua os atributos `name` e `active`.
Os dois atributos devem ser configurados através de parametros passados durante a criação do objeto.
Caso nenhum valor seja passado para `active`, o valor `false` deve ser configurado como valor padrão:

```language-javascript
const assert = require('assert')

// escreva aqui o seu código

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

5. Crie a classe `Dog` que possua o atributo `name`.
Esse atributo deve ser configurado durante a instanciação do objeto.
Crie a função `bark` que retorna a string composta pelo atributo `name` concatenada com `" is barking"`.

```language-javascript
const assert = require('assert')

// escreva aqui o seu código

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

// escreva aqui o seu código

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

// escreva aqui o seu código

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

// escreva aqui o seu código

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

// escreva aqui o seu código

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

---

## Recursos adicionais (opcional)

* [W3Schools JavaScript classes](https://www.w3schools.com/js/js_classes.asp) {: .external-link target="_blank" rel="noreferrer noopener" }

* [MDN JavaScript classes](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Classes) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Converting a function to a class](https://www.youtube.com/watch?v=JvpG_hX0-_0) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
