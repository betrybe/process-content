## Gabarito dos exercícios

### Exercício 1

Faça cinco programas, um para cada operação aritmética básica. Seu programa deve ter duas variáveis `a` e `b` definidas no começo com os valores que serão operados. Faça programas para:

* Adição
* Subtracão
* Multiplicação
* Divisão
* Módulo

```language-javascript

let a = 10;
let b = 5;

console.log('Soma: ' + (a + b));
console.log('Subtração: ' + (a - b));
console.log('Multiplicação: ' + (a * b));
console.log('Divisão: ' + (a / b));
console.log('Módulo: ' + (a % b));
```

### Exercício 2

Faça um programa que retorne o maior de dois números. Defina, no começo do programa, duas variáveis com os valores que serão comparados.

```language-javascript

let a = 20;
let b = 21;

if (a > b) {
  console.log(''a' é maior que 'b'');
} else {
  console.log(''b' é maior que 'a'');
};
```

### Exercício 3

Faça um programa que retorne o maior de três números. Defina, no começo do programa, três variáveis com os valores que serão comparados.

```language-javascript

let a = 6;
let b = 4;
let c = 2;

if (a > b && a > c) {
  console.log('O maior número é: ' + a + ' (a)');
} else if (b > a && b > c) {
  console.log('O maior número é: ' + b + ' (b)');
} else {
  console.log('O maior número é: ' + c + ' (c)');
};
```

### Exercício 4

Faça um programa que, dado um valor definido numa variável, retorne "positive" se esse valor for positivo, "negative" se for negativo e "zero", caso contrário.

```language-javascript

let number = 4;

if (number > 0) {
  console.log('positive');
} else if (number < 0) {
  console.log('negative');
} else {
  console.log('zero');
};
```

### Exercício 5

Faça um programa que defina três variáveis com os valores dos três ângulos internos de um triângulo. Retorne `true` se os ângulos representarem os ângulos de um triângulo e `false`, caso contrário.

```language-javascript

let degreeAngleA = 65;
let degreeAngleB = 100;
let degreeAngleC = 15;

let sumOfAngles = degreeAngleA + degreeAngleB + degreeAngleC;

if (sumOfAngles === 180) {
  console.log('Ângulos válidos!');
} else {
  console.log('Ângulos válidos!');
};
```

### Exercício 6

Escreva um programa que receba o nome de uma peça de xadrez e retorne os movimentos que ela faz.

```language-javascript
let chessPiece = 'bispo';

switch (chessPiece.toLowerCase()) {
  case 'rei':
    console.log('Rei-> Uma casa apenas para qualquer direção.');
    break;
  case 'bispo':
    console.log('Bispo-> Diagonal.');
    break;
  case 'rainha':
    console.log('Rainha-> Diagonal e horizontal.');
    break;
  case 'cavalo':
    console.log('Cavalo -> "L" pode pular sobre as peças.');
    break;
  case 'torre':
    console.log('Torre -> Horizontal.');
    break;
  case 'peão':
    console.log("Peão -> Apenas uma casa para frente, no primeiro movimento podem ser duas casas.");
    break;
  default:
    console.log('Erro, peça inválida!');
    break;
};
```

### Exercício 7

Escreva um programa que converta uma nota dada em porcentagem (de 0 a 100) em conceitos de A a F. Siga essas regras:

* Porcentagem >= 90 -> A

* Porcentagem >= 80 -> B

* Porcentagem >= 70 -> C

* Porcentagem >= 60 -> D

* Porcentagem >= 50 -> E

* Porcentagem < 50 -> F

* O programa deve retornar uma mensagem de erro e encerrar se a nota passada for menor que 0 ou maior que 100.

```language-javascript

let grade = 76;

if (grade < 0 || grade > 100) {
  console.log("Erro, nota incorreta!");
} else if (grade >= 90) {
  console.log("A");
} else if (grade >= 80) {
  console.log("B");
} else if (grade >= 70) {
  console.log("C");
} else if (grade >= 60) {
  console.log("D");
} else if (grade >= 50) {
  console.log("E");
} else {
  console.log("F");
}
```

### Exercício 8

Escreva um programa que defina três números em variáveis no seu começo e retorne `true` se pelo menos uma das três for par. Caso contrário, ele deve retornar `false`.

```language-javascript

let a = 1;
let b = 3;
let c = 5;

let isEven = false;

if ((a % 2 == 0 || b % 2 == 0 || c % 2 == 0)) {
  isEven = true;
};
console.log(isEven);
```

### Exercício 9

Escreva um programa que defina três números em variáveis no seu começo e retorne `true` se pelo menos uma das três for ímpar. Caso contrário, ele deve retornar `false`.

```language-javascript

let a = 1;
let b = 3;
let c = 5;

let isOdd = false;

if ((a % 2 != 0 || b % 2 != 0 || c % 2 != 0)) {
  isOdd = true;
};
console.log(isOdd);
```

### Exercício 10

Escreva um programa que se inicie com dois valores em duas variáveis diferentes: o custo de um produto e seu valor de venda. A partir dos valores, calcule quanto de lucro (valor de venda descontado o custo do produto) a empresa terá ao vender mil desses produtos.

* Atente que, sobre o custo do produto, incide um imposto de 20%, que deve ser considerado no cálculo do lucro.

* Seu programa também deve emitir uma mensagem de erro e encerrar, caso algum dos seus valores de entrada seja menor que zero.

* O lucro de um produto é o resultado da subtração do valor de venda pelo custo do mesmo, sendo que o imposto de 20% também faz parte do valor de custo.
    * valorCustoTotal = valorCusto + impostoSobreOCusto
    * lucro = valorVenda - valorCustoTotal (lucro de um produto)

```language-javascript

let costOfProduct = 1;
let saleValue = 3;

if (costOfProduct >= 0 && saleValue >= 0) {
  let totalCostOfProduct = costOfProduct * 1.2;
  let totalProfit = (saleValue - totalCostOfProduct) * 1000;
  console.log(totalProfit);
} else {
  console.log("Error, os valores não podem ser negativos");
};
```

### Exercício 11

Uma pessoa de carteira assinada no Brasil tem descontados de seu salário bruto o INSS e o IR. Faça um programa que, dado um salário bruto, calcule o líquido a ser recebido por ela.

  * A notação para um salário de R$1500,10, por exemplo, deve ser 1500.10. Para as faixas de impostos, use as seguintes referências:

    * **INSS**

      * Salário bruto até R$ 1.556,94: alíquota de 8%

      * Salário bruto de R$ 1.556,95 a R$ 2.594,92: alíquota de 9%

      * Salário bruto de R$ 2.594,93 a R$ 5.189,82: alíquota de 11%

      * Salário bruto acima de R$ 5.189,82: alíquota máxima de R$ 570,88

    * **IR**

      * Até R$ 1.903,98: isento de imposto de renda

      * De R$ 1.903,99 a 2.826,65: alíquota de 7,5% e parcela de R$ 142,80 a deduzir do imposto

      * De R$ 2.826,66 a R$ 3.751,05: alíquota de 15% e parcela de R$ 354,80 a deduzir do imposto

      * De R$ 3.751,06 a R$ 4.664,68: alíquota de 22,5% e parcela de R$ 636,13 a deduzir do imposto

      * Acima de R$ 4.664,68: alíquota de 27,5% e parcela de R$ 869,36 a deduzir do imposto.

```language-javascript

let aliquotINSS;
let aliquotIR;

let grossSalary = 2000.00;

if (grossSalary <= 1556.94) {
  aliquotINSS = grossSalary * 0.08;
} else if (grossSalary <= 2594.92) {
  aliquotINSS = grossSalary * 0.09;
} else if (grossSalary <= 5189.82) {
  aliquotINSS = grossSalary * 0.11;
} else {
  aliquotINSS = 570.88;
}

let baseSalary = grossSalary - aliquotINSS;

if (baseSalary <= 1903.98) {
  aliquotIR = 0;
} else if (baseSalary <= 2826.65) {
  aliquotIR = baseSalary * 0.075 - 142.80;
} else if (baseSalary <= 3751.05) {
  aliquotIR = baseSalary * 0.15 - 354.80;
} else if (baseSalary <= 4664.68) {
  aliquotIR = baseSalary * 0.225 - 636.13;
} else {
  aliquotIR = baseSalary * 0.275 - 869.36;
};

console.log("Salário: " + (baseSalary - aliquotIR));
```
