## Gabarito dos exercícios

### Parte I

Objeto para os exercícios:

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
```

### Exercício 1

1. Complete a função `customerInfo()` para que seu retorno seja similar a "Olá Ana Silveira, entrega para: Rafael Andrade, Telefone: 11-98763-1416, R. Rua das Flores, Nº: 389, AP: 701".
  * Note que o parâmetro da função já está sendo passado na chamada da função.

```language-javascript
const customerInfo = (order) => {
  const address = 'address';
  const deliveryPerson = order.order.delivery.deliveryPerson;
  const customerName = order['name'];
  const customerPhone = order['phoneNumber'];
  const street = order[address].street;
  const number = order[address].number;
  const apartment = order[address].apartment;

  console.log(`Olá ${deliveryPerson}, entrega para: ${customerName}, Telefone: ${customerPhone}, R. ${street}, Nº: ${number}, AP: ${apartment}`);
}

customerInfo(order);
```

### Exercício 2

Complete a função `orderModifier()` para que seu retorno seja similar a "Olá Luiz Silva, o total do seu pedido de muzzarella,calabresa e Coca-Cola Zero é R$ 50,00."
  * Modifique o nome da pessoa compradora.
  * Modifique o valor total da compra para R$ 50,00.

```language-javascript

const orderModifier = (order) => {
  const newBuyer = order.name = 'Luiz Silva';
  const pizzas = Object.keys(obj.order.pizza);
  const drinks = order.order.drinks.coke.type;
  const newTotal = order.payment.total = '50';

  console.log(`Olá ${newBuyer}, o total do seu pedido de ${pizzas} e ${drinks} é R$ ${newTotal},00.`);
}

orderModifier(order);
```

### Parte II

Objeto para os exercícios:

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

### Exercício 1

Crie uma função para adicionar o turno da manhã na `lesson2`. Essa função deve possuir três parâmetros, sendo eles: o objeto a ser modificado, a chave que deverá ser adicionada e o valor dela.

```language-javascript
const addNewKey = (obj, key, value) => {
  obj[key] = value;
};

addNewKey(lesson2, 'turno', 'noite');
```

### Exercício 2

Crie uma função para listar as keys de um objeto. Essa função deve receber um objeto como parâmetro.

```language-javascript
const listKeys = (obj) =>  Object.keys(obj);
console.log(listKeys(lesson1));
```

### Exercício 3

Crie uma função para mostrar o tamanho de um objeto.

```language-javascript
const sizeObj = (obj) =>  Object.keys(obj).length;
console.log(sizeObj(lesson1));
```


### Exercício 4

Crie uma função para listar os valores de um objeto. Essa função deve receber um objeto como parâmetro.

```language-javascript
const listValues = (obj) =>  Object.values(obj);
console.log(listValues(lesson1));
```


### Exercício 5

5. Crie um objeto de nome `allLessons`, que deve agrupar todas as aulas através do `Object.assign`. Cada chave desse novo objeto será uma aula, sendo essas chaves: `lesson1`, `lesson2` e `lesson3`. Ao executar o comando `console.log(allLessons)`, a saída deverá ser a seguinte:

```language-javascript
const allLessons = Object.assign({}, { lesson1, lesson2, lesson3 });
```


### Exercício 6

Usando o objeto criado no exercício 5, crie uma função que retorne o número total de estudantes em todas as aulas.

```language-javascript
const getNumberOfStudents = (obj) => {
  let total = 0;
  const array = Object.keys(obj);
  for (i in array) {
    total += obj[array[i]].numeroEstudantes;
  }
  return total;
};
console.log(getNumberOfStudents(allLessons));
```


### Exercício 7

Crie uma função que obtenha o valor da chave de acordo com a sua posição no objeto. Por exemplo:

```language-javascript
const getValueByNumber = (obj,number) => Object.values(obj)[number];
console.log(getValueByNumber);
```


### Exercício 8

Crie uma função que verifique se o par (chave / valor) existe na função. Essa função deve possuir três parâmetros, sendo eles: o objeto, o nome da chave e o valor da chave. Exemplo:

```language-javascript
const verifyPair = (obj, key, value) => {
  const arr = Object.entries(obj);
  let isEqual = false;
  for (let i in arr) {
    if (arr[i][0] === key && arr[i][1] === value) isEqual = true;
  }
  return isEqual;
};
console.log(verifyPair(lesson2,'professor','Carlos'));
```

### Bônus

### Exercício 1

Crie uma função para contar quantos estudantes assistiram às aulas de matemática. Use o objeto criado no exercício 5.

```language-javascript
const getNumberOfStudentsMath = (obj) => {
  let total = 0;
  const array = Object.keys(obj);
  for (i in array) {
    if(obj[array[i]].materia === 'Matemática'){
    total += obj[array[i]].numeroEstudantes;
    }
  }
  return total;
}
console.log(getNumberOfStudents(allLessons));
```

### Exercício 2

Crie uma função que deverá retornar um objeto que representa o relatório do professor ou professora, as aulas que ele ou ela ministrou e o número total de estudantes. Use o objeto criado no exercício 5:

```language-javascript
const getInfo = (obj, name) => {
  const allLessons = [];
  let allStudent = 0;
  const array = Object.values(obj);
  for (i in array) {
    if (array[i].professor === name) {
      allLessons.push(array[i].materia)
      allStudent += array[i].numeroEstudantes;
    }
  }
  return { lessons: allLessons, estudantes: allStudent };
}

const createReport = (allLessons, name) => {
  const report = {};
  report.professor = name;
  Object.assign(report, getInfo(allLessons, name));
  return report;
}
console.log(createReport(allLessons, 'Maria Clara'));
```
