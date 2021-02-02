## Gabarito dos exercícios

Você irá utilizar esse array nos exercícios:

```language-shell
let numbers = [5, 9, 3, 19, 70, 8, 100, 2, 35, 27];
```
{: .line-numbers}

#### Exercício 1

Nesse primeiro exercício, percorra o array imprimindo todos os valores nele contidos com a função `console.log()`;

**Solução**:

```language-javascript
let numbers = [5, 9, 3, 19, 70, 8, 100, 2, 35, 27];

for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i]);
}
```

---

#### Exercício 2

Para o segundo exercício, você deve somar todos os valores contidos no array e imprimir o resultado;

**Solução**:

```language-javascript
let numbers = [5, 9, 3, 19, 70, 8, 100, 2, 35, 27];
let result = 0;

for (let i = 0; i < numbers.length; i++) {
  result += numbers[i];
}

console.log(result);
```

---

#### Exercício 3

Para o terceiro exercício, calcule e imprima a média aritmética dos valores contidos no array;

**Solução**:

```language-javascript
let numbers = [5, 9, 3, 19, 70, 8, 100, 2, 35, 27];
let sum = 0;

for (let i = 0; i < numbers.length; i++) {
  sum += numbers[i];
}

let average = sum / numbers.length;

console.log(average);
```

---

#### Exercício 4

Com o mesmo código do exercício anterior, caso valor final seja maior que 20, imprima a mensagem: "valor maior que 20". Caso não seja, imprima a mensagem: "valor menor ou igual a 20";

**Solução**:

```language-javascript
let numbers = [5, 9, 3, 19, 70, 8, 100, 2, 35, 27];
let result = 0;

for (let i = 0; i < numbers.length; i++) {
  result += numbers[i];
}

result = result / numbers.length;

if (result > 20) {
  console.log('valor maior que 20');
} else {
  console.log('valor menor ou igual a 20');
}
```

---

#### Exercício 5

Utilizando `for`, descubra qual o maior valor contido no array e imprima-o;

**Solução**:

```language-javascript
let numbers = [5, 9, 3, 19, 70, 8, 100, 2, 35, 27];
let higherNumber = 0;

for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] > higherNumber) {
    higherNumber = numbers[i];
  }
}

console.log(higherNumber);
```

---

#### Exercício 6

Descubra quantos valores ímpares existem no array e imprima o resultado. Caso não exista nenhum, imprima a mensagem: "nenhum valor ímpar encontrado";

**Solução**:

```language-javascript
let numbers = [5, 9, 3, 19, 70, 8, 100, 2, 35, 27];
let result = 0;

for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] % 2 !== 0) {
    result += 1;
  }
}

if (result === 0) {
  console.log('nenhum valor ímpar encontrado');
} else {
  console.log(result);
}
```

---

#### Exercício 7

Utilizando `for`, descubra qual o menor valor contido no array e imprima-o;

**Solução**:

```language-javascript
let numbers = [5, 9, 3, 19, 70, 8, 100, 2, 35, 27];

// o valor da variável smallestNumber poderia ser qualquer um, desde que fosse maior que o maior número do array numbers. Caso atribuíssemos o valor 1 para a variável, nosso algoritmo estaria errado, pois ele nunca acharia um número menor que 1 no array.

let smallestNumber = 1000;

for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] < smallestNumber) {
    smallestNumber = numbers[i];
  }
}

console.log(smallestNumber);
```

---

#### Exercício 8

Utilizando `for`, crie uma array que vá de 1 até 25 e imprima o resultado.

**Solução**:

```language-javascript
let numbers = [];

for (let i = 1; i <= 25; i += 1) {
  numbers.push(i);
}

console.log(numbers);
```

---

#### Exercício 9

Utilizando o array criado no exercício anterior imprima o resultado da divisão de cada um dos elementos por `2`.

**Solução**:

```language-javascript
for (let i = 0; i < numbers.length; i += 1) {
  console.log(numbers[i] / 2);
};
```

---

### Bônus

#### Exercício 1

Ordene o array `numbers` em ordem crescente e imprima seus valores;

**Solução**:

```language-javascript
let numbers = [5, 9, 3, 19, 70, 8, 100, 2, 35, 27];

for (let i = 1; i < numbers.length; i++) {
  for (let j = 0; j < i; j++) {
    if (numbers[i] < numbers[j]) {
      let position = numbers[i];

      numbers[i] = numbers[j];
      numbers[j] = position;
    }
  }
}

console.log(numbers);
```

---

#### Exercício 2

Ordene o array `numbers` em ordem decrescente e imprima seus valores;

**Solução**:

```language-javascript
let numbers = [5, 9, 3, 19, 70, 8, 100, 2, 35, 27];

for (let i = 1; i < numbers.length; i++) {
  for (let j = 0; j < i; j++) {
    if (numbers[i] > numbers[j]) {
      let position = numbers[i];

      numbers[i] = numbers[j];
      numbers[j] = position;
    }
  }
}

console.log(numbers);
```

---

#### Exercício 3

Agora você irá criar um novo array a partir do array `numbers`, sem perdê-lo. Cada valor do novo array deverá ser igual ao valor correspondente do array anterior multiplicado pelo próximo. Por exemplo: o primeiro valor do novo array deverá ser 45, pois é a multiplicação de 5 (valor correspondente) e 9 (próximo valor). Caso não haja próximo valor, a multiplicação deverá ser feita por 2. Faça isso utilizando o `for` e o método `push`.

**Solução**:

```language-javascript
let numbers = [5, 9, 3, 19, 70, 8, 100, 2, 35, 27];
let newArray = [];

for (let i = 0; i < numbers.length; i++) {
  if (numbers[i + 1]) {
    newArray.push(numbers[i] * numbers[i + 1]);
  } else {
    newArray.push(numbers[i] * 2);
  }
}

console.log(newArray);
```
