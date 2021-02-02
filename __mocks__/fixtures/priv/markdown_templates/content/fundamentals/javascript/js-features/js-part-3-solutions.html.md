## Gabarito dos exercícios

### Exercício 1

#### Enunciado

Para o primeiro exercício de hoje, faça um programa que, dado um valor `n` qualquer, seja `n > 1`, imprima na tela um quadrado feito de asteriscos de lado de tamanho `n`. Por exemplo:

```language-shell
n = 5

*****
*****
*****
*****
*****
```
{: .line-numbers}

**Solução**:

```language-javascript

let n = 5;
let lineIndex;
let symbol = '*';
let inputLine = '';

for (lineIndex = 0; lineIndex < n; lineIndex += 1) {
  inputLine = inputLine + symbol;
};
for (lineIndex = 0; lineIndex < n; lineIndex += 1) {
  console.log(inputLine);
};
```

### Exercício 2

Para o segundo exercício, faça o mesmo que antes, mas que imprima um triângulo retângulo com `5` asteriscos de base. Por exemplo:

```language-shell
n = 5

*
**
***
****
*****
```
{: .line-numbers}

**Solução**:

```language-javascript

let size = 5;
let lineIndex;
let symbol = '*';
let inputLine = '';

for (lineIndex = 0; lineIndex <= size; lineIndex += 1) {
  console.log(inputLine);
  inputLine = inputLine + symbol;
};
```

### Exercício 3

Agora inverta o lado do triângulo. Por exemplo:

```language-shell
n = 5

    *
   **
  ***
 ****
*****
```
{: .line-numbers}

**Solução**:

```language-javascript

let n = 5;
let lineIndex;
let columnIndex;
let symbol = '*';
let inputLine = '';
let inputPosition = n;

for (lineIndex = 0; lineIndex < n; lineIndex += 1) {
  for (columnIndex = 0; columnIndex <= n; columnIndex += 1) {
    if (columnIndex < inputPosition) {
      inputLine = inputLine + ' ';
    } else {
      inputLine = inputLine + symbol;
    }
  }
  console.log(inputLine);
  inputLine = '';
  inputPosition -= 1;
};
```

### Exercício 4

Por fim, faça uma pirâmide com `n` asteriscos de base:

```language-shell
n = 5

  *
 ***
*****
```
{: .line-numbers}

**Solução**:

```language-javascript

let n = 5;
let lineIndex;
let lineColumn;
let lineInput = '';
let symbol = '*';

let midOfMatrix = (n + 1) / 2;
let controlLeft = midOfMatrix;
let controlRight= midOfMatrix;

for (lineIndex = 0; lineIndex <= midOfMatrix; lineIndex += 1) {
  for (lineColumn = 1; lineColumn <= n; lineColumn += 1) {
    if (lineColumn > controlRight && lineColumn < controlLeft) {
      lineInput = lineInput + symbol;
    } else {
      lineInput = lineInput + ' ';
    }
  }
  console.log(lineInput);
  lineInput = '';
  controlRight -= 1;
  controlLeft += 1;
};
```

### Bônus

### Exercício 5

Faça uma pirâmide com `n` asteriscos de base, que seja vazia no meio:

**Solução**:

```language-javascript
let n = 7;
let middle = (n + 1) / 2;
let controlLeft = middle;
let controlRight = middle;
let symbol = '*';
for (let line = 1; line <= middle; line += 1) {
  let outputLine = '';
  for (let col = 1; col <= n; col += 1) {
    if (col == controlLeft || col == controlRight || line == middle) {
      outputLine += symbol;
    } else {
      outputLine += ' ';
    }
  }
  controlLeft -= 1;
  controlRight += 1;
  console.log(outputLine);
}
```


### Exercício 6

Faça um programa que diz se um número definido numa variável é primo ou não.

* Um número primo é um número que só é divisível por 1 e por ele mesmo, ou seja, a divisão dele com quaisquer outros números dá resto diferente de zero.

```language-javascript
let divisors;
let numberToCheck = 25;

for (let number = 2; number < numberToCheck && divisors !== 1; number += 1) {
  divisors = 0;
  if (numberToCheck % number == 0) divisors += 1;
}

if (divisors === 0) console.log(numberToCheck + ' é primo');
else console.log(numberToCheck + ' não é primo');
```
