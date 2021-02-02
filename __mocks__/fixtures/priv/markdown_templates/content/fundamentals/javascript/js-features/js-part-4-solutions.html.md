## Gabarito dos exercícios

### Parte I - Objetos e For/In

### Exercício Fixação - 1

* Crie um objeto `player` contendo as variáveis listadas abaixo.

```language-javascript
let name = 'Marta';
let lastName = 'Silva';
let age = 34;
let medals = { golden: 2, silver: 3 };

let player = {
  name: 'Marta',
  lastName: 'Silva',
  age: 34,
  medals: { golden: 2, silver: 3 },
};
```

* Acesse a chave `name`, `lastName` e `age`. Concatene as informações para fazer um `console.log` no seguinte formato: "A jogadora Marta Silva tem 34 anos de idade".

```language-javascript
console.log('A jogadora ' + player.name + ' ' + player.lastName + ' tem ' + player.age + ' anos de idade.');
```

* Adicione ao objeto a chave `bestInTheWorld` e atribua a esta chave um `array` contendo as datas em que a jogadora Marta foi considerada a melhor do mundo.

```language-javascript
let bestInTheWorld = [2006, 2007, 2008, 2009, 2010, 2018];

player['bestInTheWorld'] = [2006, 2007, 2008, 2009, 2010, 2018];
```

* Acesse a chave `bestInTheWorld` e faça um `console.log` no seguinte formato: "A jogadora Marta Silva foi eleita a melhor do mundo por 6 vezes".

```language-javascript
console.log('A jogadora ' + player.name + ' ' + player.lastName + ' foi eleita a melhor do mundo por ' + player.bestInTheWorld.length + ' vezes.');
```

* Acesse a chave `medals` e faça um `console.log` no seguinte formato: "A jogadora possui 2 medalhas de ouro e 3 medalhas de prata".

```language-javascript
console.log('A jogadora possui ' + player.medals.golden + ' medalhas de ouro e ' + player.medals.silver + ' medalhas de prata.');
```

### Exercício 1

Objeto-base para realização dos exercícios a seguir:

```language-javascript
let info = {
  personagem: "Margarida",
  origem: "Pato Donald",
  nota: "Namorada do personagem principal nos quadrinhos do Pato Donald",
};
```


1. Imprima no console uma mensagem de boas-vindas para a personagem acima, incluindo seu nome.

- Valor esperado no console: `Bem-vinda, Margarida`

**Solução**:

```language-javascript
//Duas formas de resolver o exercício
console.log('Bem-vinda, '+ info.personagem);

console.log('Bem-vinda, '+ info['personagem']);
```

### Exercício 2

2. Insira no objeto uma nova propriedade com o nome de chave "recorrente" e o valor "Sim" e, em seguida, imprima o objeto no console.

- Valor esperado no console:

```language-javascript
  {
    personagem: 'Margarida',
    origem: 'Pato Donald',
    nota: 'Namorada do personagem principal nos quadrinhos do Pato Donald',
    recorrente: 'Sim'
  };
```

**Solução**:

```language-javascript
//Duas formas de resolver o exercício
info.recorrente = "Sim";

info['recorrente'] = "Sim";

console.log(info);
```

### Exercício 3

3. Faça um `for/in` que mostre todas as chaves do objeto.

- Valor esperado no console:

```language-html
  personagem
  origem
  nota
  recorrente
```

**Solução**:

```language-javascript
let info = {
  personagem: "Margarida",
  origem: "Pato Donald",
  nota: "Namorada do personagem principal nos quadrinhos do Pato Donald",
  recorrente: "Sim"
};

for(let properties in info){
  console.log(properties);
}
```

### Exercício 4

4. Faça um novo `for/in`, mas agora mostre todos os valores das chaves do objeto.

- Valor esperado no console:

```language-bash
  Margarida
  Pato Donald
  Namorada do personagem principal nos quadrinhos do Pato Donald
  Sim
```

**Solução**:

```language-javascript
let info = {
  personagem: "Margarida",
  origem: "Pato Donald",
  nota: "Namorada do personagem principal nos quadrinhos do Pato Donald",
  recorrente: "Sim",
};

for(let properties in info){
  console.log(info[properties]);
}
```

### Exercício 5

5. Agora, defina um segundo objeto com a mesma estrutura, as mesmas chaves do primeiro e os seguintes valores: "Tio Patinhas", "Christmas on Bear Mountain, Dell's Four Color Comics #178", "O último MacPatinhas", "Sim".

- Valor esperado no console:

```language-bash
Margarida e Tio Patinhas
Pato Donald e Christmas on Bear Mountain, Dell's Four Color Comics #178
Namorada do personagem principal nos quadrinhos do Pato Donald e O último MacPatinhas
Ambos recorrentes // Atenção para essa última linha!
```

**Solução**:

```language-javascript
let info = {
  personagem: "Margarida",
  origem: "Pato Donald",
  nota: "Namorada do personagem principal nos quadrinhos do Pato Donald",
  recorrente: "Sim"
};

let info2 = {
  personagem: "Tio Patinhas",
  origem: "Christmas on Bear Mountain, Dell’s Four Color Comics #178",
  nota: "O último MacPatinhas",
  recorrente: "Sim"
};

for (let properties in info) {
  if (
    info[properties] === info.recorrente &&
    info[properties] === "Sim" &&
    info2[properties] === "Sim"
  ) {
    console.log("Ambos recorrentes");
  } else {
    console.log(info[properties] + " e " + info2[properties]);
  }
}
```

---

### Parte II - Funções


### Exercício 1

1. Crie uma função que receba uma `string` e retorne `true` se for um [palíndromo](https://pt.wikipedia.org/wiki/Pal%C3%ADndromo) {: .external-link target="_blank" rel="noreferrer noopener" }, ou `false`, se não for.

  - Exemplo de palíndromo: _arara_.

  - `verificaPalindrome("arara")`;

  - Retorno esperado: `true`

  - `verificaPalindrome("desenvolvimento")`;

  - Retorno esperado: `false`

**Solução**:

```language-javascript
//Duas formas de resolver o exercício
function verificaPalindrome(palavra) {
  let arrayLetras = palavra.split("");
  let isPalindrome = true;
  for (let index in arrayLetras) {
    if (arrayLetras[index] != palavra[(palavra.length - 1) - index]) {
      isPalindrome = false;
    }
  }
  return isPalindrome;
}

function verificaPalindrome(string) {
  let reverse = string.split("").reverse().join("");
  if (reverse === string) {
    return true;
  } else {
    return false;
  }
}

console.log(verificaPalindrome('arara')); //true
console.log(verificaPalindrome('desenvolvimento')); //false
```


### Exercício 2

2. Crie uma função que receba um `array` de inteiros e retorne o índice do maior valor.

  - Array de teste: _`[2, 3, 6, 7, 10, 1];`_.

  - Valor esperado no retorno da função: `4`.

**Solução**:

```language-javascript
function indiceDoMaior(numeros) {
  let indiceMaior = 0;
  for (let indice in numeros) {
    if (numeros[indiceMaior] < numeros[indice]) {
      indiceMaior = indice;
    }
  }
  return indiceMaior;
}

console.log(indiceDoMaior([2, 3, 6, 7, 10, 1])); //4
```

### Exercício 3

3. Crie uma função que receba um `array` de inteiros e retorne o índice do menor valor.

  - Array de teste: _`[2, 4, 6, 7, 10, 0, -3];`_.

  - Valor esperado no retorno da função: `6`.

**Solução**:

```language-javascript
function indiceDoMenor(numeros) {
  let indiceMenor = 0;
  for (let indice in numeros) {
    if (numeros[indiceMenor] > numeros[indice]) {
      indiceMenor = indice;
    }
  }
  return indiceMenor;
}

console.log(indiceDoMenor([2, 4, 6, 7, 10, 0, -3])); //6
```

### Exercício 4

4. Crie uma função que receba um `array` de nomes e retorne o nome com a maior quantidade de caracteres.

  - Array de teste: _`['José', 'Lucas', 'Nádia', 'Fernanda', 'Cairo', 'Joana'];`_.

  - Valor esperado no retorno da função: `Fernanda`.

**Solução**:

```language-javascript
function maiorPalavra(palavras) {
  let maiorPalavra = palavras[0];
  for (let indice in palavras) {
    if (maiorPalavra.length < palavras[indice].length) {
      maiorPalavra = palavras[indice];
    }
  }
  return maiorPalavra;
}

console.log(maiorPalavra(['José', 'Lucas', 'Nádia', 'Fernanda', 'Cairo', 'Joana'])); //Fernanda
```


### Exercício 5

5. Crie uma função que receba um `array` de inteiros e retorne o inteiro que mais se repete.

  - Array de teste: _`[2, 3, 2, 5, 8, 2, 3];`_.

  - Valor esperado no retorno da função: `2`.

**Solução**:

```language-javascript
//Duas formas de resolver o exercício
function maisRepetido(numeros) {
  let contRepetido = 0;
  let contNumero = 0;
  let indexNumeroRepetido = 0;
  for (let index in numeros) {
    let verificaNumero = numeros[index];
    for (let index2 in numeros) {
      if (verificaNumero === numeros[index2]) {
        contNumero++;
      }
    }
    if (contNumero > contRepetido) {
      contRepetido = contNumero;
      indexNumeroRepetido = index;
    }
    contNumero = 0;
  }
  return numeros[indexNumeroRepetido];
}

function maisRepetido(numeros) {
  let num = {};

  for (let i = 0; i < numeros.length; i += 1) {
    let valor = numeros[i];
    if (num[valor] === undefined) {
      num[valor] = 1;
    } else {
      num[valor] = num[valor] + 1;
    }
  }

  let contRepetido = 0;
  let contNumero = 0;

  for (let prop in num) {
    if (contRepetido < num[prop]) {
      contRepetido = num[prop];
      contNumero = prop;
    }
  }

  return contNumero;
}

console.log(maisRepetido([2, 3, 2, 5, 8, 2, 3])); //2
```

### Exercício 6

6. Crie uma função que receba um número inteiro N e retorne o somatório de todos os números de 1 até N.

  - Valor de teste: _`N = 5`_.

  - Valor esperado no retorno da função: _1+2+3+4+5 =_ `15`.

**Solução**:

```language-javascript
function somaTodosNumeros(numeros) {
  let total = 0;
  for (let index = 1; index <= numeros; index++) {
    total = total + index;
  }
  return total;
}
console.log(somaTodosNumeros(5)); //15
```


### Exercício 7

7. Crie uma função que receba uma `string word`, e outra, uma `string ending`. Verifique se a `string ending` é o final da `string word`. Considere que a `string ending` sempre será menor que a `string word`.

  - Valor de teste: `"trybe" e "be"`

  - Valor esperado no retorno da função: `true`

  - `verificaFimPalavra("trybe", "be")`;

  - Retorno esperado: `true`

  - `verificaFimPalavra("joaofernando", "fernan")`;

  - Retorno esperado: `false`

**Solução**:

```language-javascript
//Duas formas de resolver o exercício
function verificaFimPalavra(palavra, fimPalavra) {
  palavra = palavra.split("");
  fimPalavra = fimPalavra.split("");
  controle = true;
  for (let i = 0; i < fimPalavra.length; i++) {
    if (palavra[palavra.length-fimPalavra.length+i] != fimPalavra[i]) {
      controle = false;
    }
  }
  return controle;
}

function verificaFimPalavra(palavra, fimPalavra) {
  let inversoPalavra = palavra.split("").reverse().join("");
  let inversoFimPalavra = fimPalavra.split("").reverse().join("");

  for (let i = 0; i < inversoFimPalavra.length; i += 1) {
    if (inversoPalavra[i] != inversoFimPalavra[i]) {
      return false;
    } else {
      return true;
    }
  }
}

console.log(verificaFimPalavra("trybe", "be")); //true
console.log(verificaFimPalavra("joaofernando", "fernan")); //false
```

### Bônus


1. (Difícil) Faça um programa que receba uma string em algarismos romanos e retorne o número que a string representa.

- **Atenção! Esse exercício já apareceu no processo seletivo de uma grande multinacional!**

- Dicas:

  - Uma string é um array de caracteres, então cada elemento do array é uma letra.
  - O valor de cada numeral romano é:

```
    | I   | 1    |
    | --- | ---- |
    | IV  | 4    |
    | V   | 5    |
    | IX  | 9    |
    | X   | 10   |
    | XL  | 40   |
    | L   | 50   |
    | XC  | 90   |
    | C   | 100  |
    | CD  | 400  |
    | D   | 500  |
    | CM  | 900  |
    | M   | 1000 |
```

  * Que tal criar um objeto que associa cada letra a um numeral para fácil consulta?

  * **Atenção! Quando você tem um número pequeno à direita de um número grande, eles devem ser somados. Exemplo: XI = 10 + 1 = 11. No entanto, se o número pequeno está à esquerda de um número maior que ele, ele deve ser subtraído. Exemplo: IX = 10 - 1 = 9.**

**Solução**:

```language-javascript
function Romanos(roma) {
  let romanos = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  let arrayNumbers = [];
  let result = 0;

  for (let indice in roma) {
    arrayNumbers[indice] = romanos[roma[indice]];
  }

  for (let indice in arrayNumbers) {
    if (arrayNumbers[indice] < arrayNumbers[indice + 1]) {
      arrayNumbers[indice + 1] = arrayNumbers[indice + 1] - arrayNumbers[indice];
    } else {
      result += arrayNumbers[indice];
    }
  }

  return result;
}

console.log(Romanos(MMXVIII));
```

2. CodeWars - Desafio 16 + 8 = 214

```language-javascript
function add(num1, num2) {
  const arrNum1 = num1.toString().split("").reverse();
  const arrNum2 = num2.toString().split("").reverse();
  let lessArr;
  let bigArr;
  const output = [];

  if (arrNum1.length > arrNum2.length) {
    bigArr = arrNum1;
    lessArr = arrNum2;
  } else {
    bigArr = arrNum2;
    lessArr = arrNum1;
  }

  for (let i = 0; i < bigArr.length; i += 1) {
    if (lessArr[i] !== undefined) {
      output[i] = parseInt(bigArr[i]) + parseInt(lessArr[i]);
    } else {
      output[i] = parseInt(bigArr[i]);
    }
  }

  return parseInt(output.reverse().join(""));
}
```
