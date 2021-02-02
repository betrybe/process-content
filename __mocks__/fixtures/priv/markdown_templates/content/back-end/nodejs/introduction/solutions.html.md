## Gabarito dos exercícios

A seguir encontra-se uma sugestão de solução para os exercícios propostos.

**Exercício 1**: O script deve calcular o [IMC](https://pt.wikipedia.org/wiki/%C3%8Dndice_de_massa_corporal) {: .external-link target="_blank" rel="noreferrer noopener" } de uma pessoa e exibi-lo na tela. Crie um novo pacote chamado `calcula-imc`, e utilize o [script `start`](https://docs.npmjs.com/cli/start) {: .external-link target="_blank" rel="noreferrer noopener" } do npm para executar nosso arquivo `index.js`. Siga utilizando o pacote `readline-sync` para coletar os dados do usuário. A fórmula para cálculo do IMC é `peso / altura²`.

**Resolução**:

1. Criar uma nova pasta onde o script será criado (use o comando mkdir se preferir);

2. Executar `npm init` e passar as informações solicitadas;

3. Instalar o pacote `readline-sync` com o comando `npm install readline-sync`;

4. Criar o script, que deve ficar mais ou menos assim:

```language-js
const readline = require('readline-sync');

function calculaImc () {
  const peso = readline.questionFloat('Qual o seu peso (kg)? ').toFixed(2);
  const altura = readline.questionFloat('Qual sua altura (m)? ').toFixed(2);

  console.log('Peso: %s, altura: %s', peso, altura);

  const imc = (peso / Math.pow(altura, 2)).toFixed(2);

  console.log('IMC: %s', imc);
}

calculaImc();
```

5. Criar o script `start` no `package.json`, contendo o comando `node index.js`;

6. Executar o script utilizando `npm start` e certificar-se de que os valores retornados estão corretos. Você pode utilizar [esta calculadora](https://www.programasaudefacil.com.br/calculadora-de-imc) {: .external-link target="_blank" rel="noreferrer noopener" } para validar o resultado.

<br />

**Exercício 2**: Agora, modifique o script acima para que ele informe se a pessoa cujo IMC foi calculado possui algum nível de obesidade. Considere a seguinte tabela para saber qual situação deve ser apresentada para cada resultado:

|        IMC                                |          Situação         |
| ----------------------------------------- | ------------------------- |
| Abaixo de 18,5                            | Abaixo do peso (magreza)  |
| Entre 18,5 e 24,9&nbsp;&nbsp;&nbsp;&nbsp; |        Peso normal        |
| Entre 25,0 e 29,9                         | Acima do peso (sobrepeso) |
| Entre 30,0 e 34,9                         |      Obesidade grau I     |
| Entre 35,0 e 39,9                         |     Obesidade grau II     |
| 40,0 e acima                              |  Obesidade graus III e IV |

<br />

**Resolução**:

1. Adicionar, depois da linha que exibe o IMC calculado, os operadores condicionais para verificar qual a situação do IMC. O código a ser adicionado deve ser parecido com este:

```language-js
if (imc < 18.5) {
  console.log('Situação: Abaixo do peso (magreza)');
  return;
}

if (imc >= 18.5 && imc < 25) {
  console.log('Situação: Peso normal');
  return;
}

if (imc >= 25 && imc < 30) {
  console.log('Situação: Acima do peso (sobrepeso)');
  return;
}

if (imc >= 30 && imc < 35) {
  console.log('Situação: Obesidade grau I');
  return;
}

if (imc >= 35 && imc < 40) {
  console.log('Situação: Obesidade grau II');
  return;
}

console.log('Situação: Obesidade graus III e IV');
```

2. Execute novamente o script e verifique se os valores estão corretos.

<br />

**Exercício 3**: Por último, modifique o script para que ele utilize o pacote [inquirer](https://npmjs.com/package/inquirer) {: .external-link target="_blank" rel="noreferrer noopener" } para solicitar as informações ao usuário no terminal. Para entender como utilizar o `inquirer`, consulte a documentação no site do `npm`. Além disso, você pode precisar relembrar o que já aprendemos sobre Promises em [outra aula](/back-end/nodejs/introduction/fundamentals/js-asynchronous/promises.md#promises).

**Resolução**:

1. Instale o pacote `inquirer` utilizando o comando `npm install inquirer`;

2. Importe o inquirer, armazenando-o numa variável chamada `inquirer`;

3. Remova a importação do `readline-sync` e desinstale o pacote com `npm rm readline-sync`;

4. Adicione o modificador `async` à função `calculaImc`, para que possamos usar o inquirer de forma mais fácil;

5. Modifique a declaração das variáveis `peso` e `altura` para que chamem a função `prompt` do inquirer passando uma função à propriedade `validate` que verifica se o valor inserido é um número válido (não é `NaN`). Lembre-se de converter os valores vindos do `inquirer` para float, pois as respostas vêm como string;

6. O código modificado deve ficar mais ou menos assim:

```language-js
const inquirer = require('inquirer');

function validateFloat (input) {
  return !isNaN(parseFloat(input)) || 'Por favor, digite um número válido';
}

async function calculaImc () {
  const answers = await inquirer.prompt([
    { name: 'peso', type: 'input', message: 'Qual o seu peso (kg)?', validate: validateFloat },
    { name: 'altura', type: 'input', message: 'Qual a sua altura (m)?', validate: validateFloat }
  ]);

  const peso = parseFloat(answers.peso);
  const altura = parseFloat(answers.altura);

  console.log('Peso: %s, altura: %s', peso, altura);

  const imc = (peso / Math.pow(altura, 2)).toFixed(2);

  console.log('IMC: %s', imc);

  if (imc < 18.5) {
    console.log('Situação: Abaixo do peso (magreza)');
    return;
  }

  if (imc >= 18.5 && imc < 25) {
    console.log('Situação: Peso normal');
    return;
  }

  if (imc >= 25 && imc < 30) {
    console.log('Situação: Acima do peso (sobrepeso)');
    return;
  }

  if (imc >= 30 && imc < 35) {
    console.log('Situação: Obesidade grau I');
    return;
  }

  if (imc >= 35 && imc < 40) {
    console.log('Situação: Obesidade grau II');
    return;
  }

  console.log('Situação: Obesidade graus III e IV');
}

calculaImc();
```

### Bônus

**Exercício 1**: Crie um script que, utilizando recursão, realize o [fatorial](https://matematicabasica.net/fatorial/) {: .external-link target="_blank" rel="noreferrer noopener" } de um número `n`.

1. Utilize o pacote `inquirer` para solicitar o valor de `n` ao usuário;

2. Utilize a propriedade `validate` do inquirer para validar o valor informado para `n`. A função de validação deve utilizar outras duas funções para garantir que `n` atenda às condições abaixo:
    1. Ser um número;
    2. Ser um inteiro.

3. Lembre-se de converter o valor retornado pelo inquirer para inteiro utilizando `parseInt()`. Não se esqueça de informar a **base 10** como segundo parâmetro.

**Resolução**:

1. Criar uma nova pasta onde o script será criado;

2. Executar `npm init` e passar as informações solicitadas;

3. Instalar o pacote `inquirer` com o comando `npm install inquirer`;

4. Criar o script, que deve ficar mais ou menos assim:

```language-js
const inquirer = require('inquirer');

function isInteger (number) {
  return parseInt(number) === parseFloat(number);
}

function validaX (value) {
  if (value < 0) return 'Informe um número maior ou igual a 0';
  if (Number.isNaN(value) || !isInteger(value)) return 'Informe um número inteiro';
  return true;
}

function realizaFatoracao (x) {
  return [0, 1].includes(x) ? 1 : x * realizaFatoracao(x - 1);
}

async function realizaCalculo () {
  const answers = await inquirer.prompt([{
    type: 'input',
    validate: validaX,
    name: 'x',
    message: 'Informe o valor de x:'
  }]);

  const x = parseInt(answers.x, 10);

  console.log('x: %s', x);

  const resultado = realizaFatoracao(x);

  console.log('Resultado: %s', resultado);
}

realizaCalculo();
```

5. Criar o script `start` no `package.json`, contendo o comando `node index.js`;

6. Executar o script utilizando `npm start` e certificar-se de que os valores retornados estão corretos. Você pode digiar o valor de `n` seguido por `!` no google para conferir o resultado. Exemplo: `10!`.

<br />

**Exercício 2**: Crie um script que, sem utilizar recursão, exiba o valor dos `n` primeiros elementos da [sequência de fibonacci](https://super.abril.com.br/mundo-estranho/o-que-e-a-sequencia-de-fibonacci/) {: .external-link target="_blank" rel="noreferrer noopener" }.

1. Não imprima o valor `0`, uma vez que ele não está incluso na sequência;

2. Quando `n = 10`, exatamente 10 elementos devem ser exibidos;

3. Utilize o pacote `inquirer` para solicitar o valor de `n` ao usuário;

4. Utilize a propriedade `validate` do inquirer para validar o valor informado para `n`. A função de validação deve utilizar outras duas funções para garantir que `n` atenda às condições abaixo:
    1. Ser um número;
    2. Ser um inteiro.

5. Lembre-se de converter o valor retornado pelo inquirer para inteiro utilizando `parseInt()`. Não se esqueça de informar a **base 10** como segundo parâmetro.

**Resolução**:

1. Criar uma nova pasta onde o script será criado;

2. Executar `npm init` e passar as informações solicitadas;

3. Instalar o pacote `inquirer` com o comando `npm install inquirer`;

4. Criar o script, que deve ficar mais ou menos assim:

```language-js
const inquirer = require('inquirer');

function isInteger (number) {
  return parseInt(number) === parseFloat(number);
}

function validaN (value) {
  if (value < 0) return 'Informe um número maior ou igual a 0';
  if (Number.isNaN(value) || !isInteger(value)) return 'Informe um número inteiro';
  return true;
}

function calculaElemento (n) {
  let a = 1;
  let b = 1;

  for (; n >= 0; n--) {
    if (b) console.log(b);
    const temp = a;
    a = a + b;
    b = temp;
  }

  console.log(b);
  return b;
}

async function realizaCalculo () {
  const answers = await inquirer.prompt([{
    type: 'input',
    validate: validaN,
    name: 'n',
    message: 'Informe o valor de n:'
  }]);

  const n = parseInt(answers.n, 10);

  console.log('n: %s', n);

  calculaElemento(n - 2);
}

realizaCalculo();
```

5. Criar o script `start` no `package.json`, contendo o comando `node index.js`;

6. Executar o script utilizando `npm start` e certificar-se de que os valores retornados estão corretos. Você pode utilizar [este site](https://www.browserling.com/tools/fibonacci-numbers) {: .external-link target="_blank" rel="noreferrer noopener" } para validar seus resultados.
