## O que vamos aprender?

Hoje você vai aprender alguns métodos para interagir com **objetos**. Esses métodos te ajudarão bastante quando for necessária alguma leitura de seus valores ou chaves, ou quando precisar copiá-los. Esse é um passo muito importante para o uso bom e mais avançado do **JavaScript**. Objetos são muito presentes em todas as lógicas do **ES6**. Os métodos que veremos são:

* `Object.keys`;

* `Object.entries`;

* `Object.assign`;

* `Object.values`.

---

### Você será capaz de:

  * Acessar todas as chaves de um objeto com o método `Object.keys`;

  * Acessar os pares chave-valor de um objeto com o método `Object.entries`;

  * Acessar todos os valores de um objeto com o método `Object.values`;

  * Copiar um objeto com o método `Object.assign`;

  * Adicionar propriedades a um objeto.

---

## Por que isso é importante?

Em JavaScript, o uso de objetos é essencial, você se deparará com eles frequentemente. Esses métodos servem para melhorar o uso do objetos, facilitando o acesso a suas informações e te permitindo adicionar novas funcionalidades a ele. Um exemplo prático disso é que você não precisará mais utilizar um `for` para percorrer um objeto para pegar sua lista de chaves ou de valores.

---

## Conteúdos

###### Tempo sugerido para realização: 80 minutos

Até aqui, você já viu e utilizou bastante os objetos no JavaScript. Hoje vamos aprender ainda mais sobre eles e mostrar como são úteis para a lógica do seu código. No decorrer do conteúdo, execute os exemplos na sua máquina para ver melhor como cada método funciona. Sinta-se livre para mudar os objetos ou o código para explorar mais cada exemplo.

### Parte I - Adicionando novas chaves (keys)

Para começar, veja o exemplo abaixo de um objeto que contém as informações de um cliente de uma loja:

```language-javascript
const customer = {
  firstName: 'Roberto',
  age: 22,
  job: 'Teacher',
};
```

Imagine um cenário em que você precisa completar as informações do cliente adicionando uma nova propriedade para armazenar seu sobrenome.
Uma das formas já vistas até então é reescrever o objeto, dessa vez já com a nova propriedade `lastName`.

```language-javascript
const customer = {
  firstName: 'Roberto',
  lastName: 'Faria', // Propriedade adicionada.
  age: 22,
  job: 'Teacher',
};
```

Existem também outras formas de adicionar essa propriedade de maneira muito mais simples e prática, sem a necessidade de reescrever o objeto e suas propriedades. Veja o exemplo abaixo:

```language-javascript
const customer1 = {
  firstName: 'Roberto',
  age: 22,
  job: 'Teacher',
};

console.log(customer1);

customer1.lastName = 'Faria';
console.log(customer1);

const customer2 = {
  firstName: 'Maria',
  age: 23,
  job: 'Medic',
};

console.log(customer2);
customer2['lastName'] = 'Silva';
console.log(customer2);
```

No exemplo acima, ao invés de reescrever o objeto inteiro, apenas adicionamos a nova propriedade. Para isso, basta seguir a sintaxe abaixo:

 * `objeto.nomeDaPropriedade`.

 * `objeto[variavelQueContemONomeDaPropriedade]`.

Agora, suponha que seja necessário adicionar algumas novas propriedades ao objeto, como a naturalidade, a data de nascimento e o estado civil.

Essas novas propriedades serão adicionadas de acordo com o valor de algumas variáveis.

```language-javascript
const customer = {
  firstName: 'Roberto',
  age: 22,
  job: 'Teacher',
};

let newKey = 'lastName';
const lastName = 'Ferreira';
customer[newKey] = lastName;
newKey = 'fullName';
const fullName = `${customer.firstName} ${customer.lastName}`;
customer[newKey] = fullName;
console.log(customer);
```

No exemplo acima, você viu que há diferentes formas de associar chaves e valores a um objeto.

Agora, para praticar, crie uma função que receba três parâmetros, sendo eles: um objeto, o nome de uma chave e o seu valor. O retorno dessa função deve ser o objeto já com a nova chave adicionada nele.

### Parte II - `Object.keys`

Agora, você aprenderá sobre o método `Object.keys`. Ele é utilizado para listar as chaves de um objeto, retornando-as em um array.

Leia com atenção esse [artigo](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) {: .external-link target="_blank" rel="noreferrer noopener" } até a seção sobre Polyfill. Embora o artigo seja um pouco denso, ele explica muito bem o método `Object.keys`.

Caso tenha dúvidas, leia também esse [artigo.](https://levelup.gitconnected.com/learn-about-object-keys-in-javascript-cf2967ba6401) {: .external-link target="_blank" rel="noreferrer noopener" }

Após a leitura, veja o exemplo abaixo, que mostra  como usar o `Object.keys` na prática. Nesse exemplo estão listadas as habilidades de uma pessoa desenvolvedora.

```language-javascript
const student1 = {
  Html: 'Muito Bom',
  Css: 'Bom',
  JavaScript: 'Ótimo',
  SoftSkills: 'Ótimo',
};

const student2 = {
  Html: 'Bom',
  Css: 'Ótimo',
  JavaScript: 'Ruim',
  SoftSkills: 'Ótimo',
  Git: 'Bom', // chave adicionada
};
```


Tente criar uma função que exiba as habilidades do objeto `student`. Cada habilidade deve ser exibida no formato "Nome da habilidade, Nível: valor da chave referente à habilidade". Após tentar criar a função, veja a sugestão de resposta logo abaixo e compare com a sua solução.

```language-javascript
const student1 = {
  Html: 'Muito Bom',
  Css: 'Bom',
  JavaScript: 'Ótimo',
  SoftSkills: 'Ótimo',
};

const student2 = {
  Html: 'Bom',
  Css: 'Ótimo',
  JavaScript: 'Ruim',
  SoftSkills: 'Ótimo',
  Git: 'Bom', // chave adicionada
};

const listSkills = (student) => {
  const arrayOfSkills = Object.keys(student);
  for(i in arrayOfSkills){
    console.log(`${arrayOfSkills[i]}, Nível: ${student[arrayOfSkills[i]]}`);
  }
};

console.log('Estudante 1');
listSkills(student1);

console.log('Estudante 2');
listSkills(student2);
```

Verifique que usamos a mesma função para mostrar os dois objetos, mesmo o segundo tendo uma chave a mais que o outro.


### Parte III - `Object.values`

O `Object.values` segue a mesma lógica que o `Object.keys`, a diferença está em que ele lista os valores de cada chave.

Leia esse [artigo](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Object/values) {: .external-link target="_blank" rel="noreferrer noopener" } para entender melhor seu funcionamento.

Veja como fica muito mais fácil obter os valores de um objeto com o uso do `Object.values` através do exemplo abaixo, em que foram implementadas, de formas diferentes, duas funções que retornam a mesma lista de valores.

```language-javascript
const student = {
  Html: 'Muito Bom',
  Css: 'Bom',
  JavaScript: 'Ótimo',
  SoftSkill: 'Ótimo',
};

const listSkillsWithFor = (student) => {
  const skills = [];
  for(skill in student) {
    skills.push(student[skill]);
  }

  return skills;
};

const listSkillsWithValues = (student) => Object.values(student);

// Sem Object.values
console.log(listSkillsWithFor(student));

// Com Object.values
console.log(listSkillsWithValues(student));
```

 Observe como a função `listSkillsWithValues` é bem mais simples e resolve o problema da listagem de valores de forma mais direta.

### Parte IV - `Object.entries`

Leia esse [link](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Object/entries) {: .external-link target="_blank" rel="noreferrer noopener" } até a seção "Convertendo um Object em um Map". Fique mais atento à seção "Descrição", esse método funciona de forma diferente dos anteriores.

O método `Object.entries` retorna um array com os pares chave / valor do objeto. Para visualizar seu retorno, veja o exemplo abaixo:

```language-javascript
const países = {
  França: 'Paris',
  Brasil: 'Brasília',
  Espanha: 'Madrid',
  Portugal: 'Lisboa',
};
const pairKeyValue = Object.entries(países);
console.log(pairKeyValue);
```

Observe que o retorno dele é um array e que cada um de seus elementos é um outro array com apenas dois dados, a chave do objeto e o seu valor. Para ver os valores separadamente, adicione o for abaixo ao código anterior e execute-o novamente.

```language-javascript
for(i in pairKeyValue) {
  console.log('--------');
  console.log('Pais:', pairKeyValue[i][0]);
  console.log('Capital:', pairKeyValue[i][1]);
};
```

### Parte V - `Object.assign`

Esse método é utilizado para copiar os valores de todas as propriedades de um ou mais objetos para um objeto destino. Sua estrutura é:

```language-javascript
// A função recebe um número qualquer de parâmetros. Todos são agregados como valores para adicionar ao objeto de destino!

Object.assign(destino, objeto1);
Object.assign(destino, objeto1, objeto2);
Object.assign(destino, objeto1, objeto2, objeto3, objeto4);
```

Como você pode ver, ele recebe pelo menos dois parâmetros, de forma que o primeiro sempre será o objeto de destino, e os parâmetros restantes serão os valores que serão adicionados a esse objeto destino.

Veja o exemplo abaixo:

```language-javascript
const person = {
  name: 'Alberto',
  lastName: 'Gomes',
  age: 20,
};

const info = {
  age: 23,
  job: 'engenheiro',
};

const family = {
  children: ['Maria', 'João'],
  wife: 'Ana',
};

Object.assign(person, info, family)
console.log(person)

/* Output
  { name: 'Alberto',
  lastName: 'Gomes',
  age: 23,
  job: 'engenheiro',
  child: [ 'Maria', 'João' ],
  wife: 'Ana'
  } */
```

Como você pode ver, o método `Object.assign` adicionou as propriedades de `info` e de `family` ao objeto `person`. Observe também que a chave `age` aparece tanto em `person` como em `info` e é sobrescrita pelo valor contido em `info`. Isso acontece quando há propriedades repetidas entre o objeto destino e os objetos passados por parâmetro, de forma que a propriedade do objeto destino sempre utilizará o último valor disponível.

Agora, observe o exemplo abaixo.

```language-javascript
const person = {
  name: 'Roberto',
};

const lastName = {
  lastName: 'Silva',
};

const clone = Object.assign(person, lastName);

console.log(clone); // { name: 'Roberto', lastName: 'Silva' }
console.log(person); // { name: 'Roberto', lastName: 'Silva' }
```

Como pôde ver acima, o clone é exatamente igual ao objeto `person`, e se você mudar qualquer propriedade nele, observará que o objeto `person` também será modificado. Isso ocorre devido ao fato de que o objeto retornado pelo método `Object.assign` é o próprio objeto destino, que foi alterado adicionando as novas propriedades.

Que tal fazer um teste para confirmar isso?

```language-javascript
clone.name = 'Maria';

console.log('Mudando a propriedade name através do objeto clone')
console.log(clone); // Output: { name: 'Maria', lastName: 'Silva' }
console.log(person); // Output: { name: 'Maria', lastName: 'Silva' }
console.log('--------------');

person.lastName = 'Ferreira';

console.log('Mudando a propriedade lastName através do objeto person');
console.log(clone); // Output: { name: 'Maria', lastName: 'Ferreira' }
console.log(person); // Output: { name: 'Maria', lastName: 'Ferreira' }
```

Quando se faz o que foi feito no exemplo mais acima, ao criar uma nova variável para armazenar o retorno do método `Object.assign`, cria-se apenas um outro "caminho" para modificar ou acessar os dados do objeto destino (nesse caso, `person`).
No exemplo abaixo, é apresentada outra forma de se copiar um objeto.

```language-javascript
const obj = { value1: 10, value2: 11 };
const cloneObj = obj;
```

Se você modificar o `cloneObj`, verá que novamente teremos o mesmo resultado anterior, de forma que o `obj` também é alterado. Ok, tendo isso em vista, como faremos para mudar os dados do novo objeto criado sem modificar o objeto inicial?

Para resolver esse problema, podemos passar como primeiro parâmetro do `Object.assign` um objeto vazio `{}` e armazenar seu retorno em uma nova variável. Veja como fazer isso no exemplo abaixo.

```language-javascript

const person = {
  name:'Roberto',
};

const lastName = {
  lastName: 'Silva',
};

const newPerson = Object.assign({},person,lastName);
newPerson.name = 'Gilberto';
console.log(newPerson);
console.log(person);
```

Agora, apenas o objeto newPerson será modificado.


---


## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

Agora que você já ficou fera nos usos do `Object`, que tal vermos algumas aplicações para eles juntos? 💚

Aula ao vivo! Vamos para o Slack, onde o link estará disponível.

---

## Exercícios

###### Tempo sugerido para realização: 100 minutos

Hora de pôr a mão na massa!

<%= versioning_your_code(@conn) %>

---

### Agora a prática

### Parte I

Para os exercícios a seguir, use o seguinte código.

```language-javascript
const order = {
  name: 'Rafael Andrade',
  phoneNumber: '11-98763-1416',
  address: {
    street: 'Rua das Flores',
    number: '389',
    apartment: '701',
  },
  order: {
    pizza: {
      margherita: {
        amount: 1,
        price: 25,
      },
      pepperoni: {
        amount: 1,
        price: 20,
      }
    },
    drinks: {
      coke: {
        type: 'Coca-Cola Zero',
        price: 10,
        amount: 1,
      }
    },
    delivery: {
      deliveryPerson: 'Ana Silveira',
      price: 5,
    }
  },
  payment: {
    total: 60,
  },
};

const customerInfo = (order) => {
  // Adicione abaixo as informações necessárias.

}

customerInfo(order);

const orderModifier = (order) => {
  // Adicione abaixo as informações necessárias.

}

orderModifier(order);
```

Agora você vai fazer alguns exercícios de fixação.

1. Complete a função `customerInfo()` para que seu retorno seja similar a "Olá Ana Silveira, entrega para: Rafael Andrade, Telefone: 11-98763-1416, R. Rua das Flores, Nº: 389, AP: 701".
  * Note que o parâmetro da função já está sendo passado na chamada da função.

2. Complete a função `orderModifier()` para que seu retorno seja similar a "Olá Luiz Silva, o total do seu pedido de muzzarella, calabresa e Coca-Cola Zero é R$ 50,00."
  * Modifique o nome da pessoa compradora.
  * Modifique o valor total da compra para R$ 50,00.


### Parte II

Para os exercícios a seguir, use o seguinte código.

```language-javascript
const lesson1 = {
  materia: 'Matemática',
  numeroEstudantes: 20,
  professor: 'Maria Clara',
  turno: 'manhã',
};

const lesson2 = {
  materia: 'História',
  numeroEstudantes: 20,
  professor: 'Carlos',
};

const lesson3 = {
  materia: 'Matemática',
  numeroEstudantes: 10,
  professor: 'Maria Clara',
  turno: 'noite',
};
```

1. Crie uma função para adicionar o turno da manhã na `lesson2`. Essa função deve possuir três parâmetros, sendo eles: o objeto a ser modificado, a chave que deverá ser adicionada e o valor dela.

2. Crie uma função para listar as keys de um objeto. Essa função deve receber um objeto como parâmetro.

3. Crie uma função para mostrar o tamanho de um objeto.

4. Crie uma função para listar os valores de um objeto. Essa função deve receber um objeto como parâmetro.

5. Crie um objeto de nome `allLessons`, que deve agrupar todas as aulas através do `Object.assign`. Cada chave desse novo objeto será uma aula, sendo essas chaves: `lesson1`, `lesson2` e `lesson3`. Ao executar o comando `console.log(allLessons)`, a saída deverá ser a seguinte:

```language-javascript
console.log(allLessons);
/*
{
  lesson1:
   { materia: 'Matemática',
     numeroEstudantes: 20,
     professor: 'Maria Clara',
     turno: 'manhã' },
  lesson2:
   { materia: 'História',
     numeroEstudantes: 20,
     professor: 'Carlos',
     turno: 'noite' },
  lesson3:
   { materia: 'Matemática',
     numeroEstudantes: 10,
     professor: 'Maria Clara',
     turno: 'noite' }
};
*/
```

6. Usando o objeto criado no exercício 5, crie uma função que retorne o número total de estudantes em todas as aulas.

7. Crie uma função que obtenha o valor da chave de acordo com a sua posição no objeto. Por exemplo:

```language-javascript
console.log(getValueByNumber(lesson1, 0));
// Output: 'Matématica'
```

8. Crie uma função que verifique se o par (chave / valor) existe na função. Essa função deve possuir três parâmetros, sendo eles: o objeto, o nome da chave e o valor da chave. Exemplo:

```language-javascript
console.log(verifyPair(lesson3, 'turno', 'noite'));
// Output: true,
console.log(verifyPair(lesson3, 'materia', 'Maria Clara'));
// Output: false
```


### Bônus

1. Crie uma função para contar quantos estudantes assistiram às aulas de Matemática. Use o objeto criado no exercício 5.

2. Crie uma função que deverá retornar um objeto que representa o relatório do professor ou professora, as aulas que ele ou ela ministrou e o número total de estudantes. Use o objeto criado no exercício 5:

```language-javascript
console.log(createReport(allLessons, 'Maria Clara'))
/* {
  professor: 'Maria Clara',
  aulas: [ 'Matemática', 'Matemática' ],
  estudantes: 30
} */
```

---

## Recursos adicionais (opcional)

* [Convertendo objetos em arrays](https://www.samanthaming.com/tidbits/76-converting-object-to-array/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Como usar métodos Object no JavaScript | DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-use-object-methods-in-javascript-pt) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Video sobre `Object.assign`](https://www.youtube.com/watch?v=JmGJUzNsGFs) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

Na próxima aula, você aprenderá sobre `Testes unitários`.

<%= next_button(@conn) %>
