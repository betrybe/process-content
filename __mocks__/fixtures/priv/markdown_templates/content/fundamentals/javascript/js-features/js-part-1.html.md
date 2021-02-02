## O que vamos aprender?

Temos certeza de que a maioria de vocês estavam a fim de chegar nessa parte 😁

Agora que você já entendeu como funciona uma página web utilizando somente _HTML_ e _CSS_, você vai aprender sobre _JavaScript_ (JS) e como isso vai te ajudar na construção de um site mais completo e interativo.

Mas, antes, precisamos pavimentar a nossa estrada, entendendo um pouco sobre a proposta da linguagem e seus conceitos. Para isso, vamos aprender:

* O que é o _JavaScript_ (JS)?

* De onde surgiu?

* Qual o seu uso?

* Variáveis.

* Constantes.

* Tipos primitivos.

* Tipagem dinâmica.

* Operadores aritméticos.

* Operadores de atribuição.

* Operadores lógicos.

* Estruturas condicionais como if/else e switch case.

---

### Você será capaz de:

  * Escrever códigos em _JavaScript_ que usam variáveis, constantes e tipos primitivos;

  * Utilizar conceitos da linguagem como a tipagem dinâmica e _operadores lógicos/aritméticos/de atribuição_ no seu código;

  * Criar códigos que usam estruturas condicionais, como o `if/else`.

---

## Por que isso é importante?

O _JavaScript_ é [a linguagem mais popular do mundo segundo o Stack Overflow](https://insights.stackoverflow.com/survey/2019#technology) {: .external-link target="_blank" rel="noreferrer noopener" } e, além de ser utilizada em diversos contextos, faz páginas em toda a web terem comportamentos dinâmicos! Sabe quando a página de notícias atualiza sozinha após algum tempo? Então! Isso é um comportamento dinâmico.

Por esse motivo, é muito importante ter um bom conhecimento de JS, já que você vai utilizá-lo com frequência no desenvolvimento web.

Pensando nisso, o uso de operadores matemáticos e atribuições vão se tornar corriqueiros em sua vida, assim como a criação de lógicas condicionais. Esses conhecimentos são fundamentais e não só vão desenvolver a sua lógica de programação como vão engrenar o seu aprendizado em JavaScript.

---

## Conteúdos

###### Tempo sugerido para realização: 70 minutos

Agora é hora de você aprender os fundamentos de JS com um apanhado de conteúdos que vão te dar a base necessária para criar seus primeiros programas. 😁

Mas, antes de darmos início ao conteúdo, vamos instalar um pacote de que será muito útil durante toda a nossa caminhada no _JavaScript_, o _Node.js_. 

Como o JS nasceu como uma linguagem de navegador, não podíamos executá-lo fora do navegador, mas o [_Node.js_](https://nodejs.org/en/) {: .external-link target="_blank" rel="noreferrer noopener" } foi criado para resolver esse problema. É por causa dele que não dependeremos do navegador para executar códigos JS.

Para instalá-lo, [acesse esse link](https://nodejs.org/en/download/package-manager/) {: .external-link target="_blank" rel="noreferrer noopener" }, identifique o sistema operacional que você está usando e siga o passo a passo disponível.

---

### Parte I

Vamos começar com este vídeo, que fala um pouco sobre a história e os objetivos do _JavaScript_.

<%= vimeo "483616127" %>

---

### Parte II

Agora vamos aprender como funcionam e o que são variáveis e constantes.

<%= vimeo "471184137" %>

Vamos praticar o que aprendemos no vídeo? 💪

Abra o seu VS Code e faça os seguintes exercícios de fixação. *Dica: Com o plugin code runner que vimos no vídeo você pode executar o seu código no VS Code com o atalho ctrl + alt + n. Confira mais dicas sobre o VS Code [aqui](https://app.betrybe.com/course/real-life-engineer/vscode) {: .external-link target="_blank" rel="noreferrer noopener" }!*

1. Crie uma constante chamada `name` e atribua a ela o seu nome;
2. Crie uma constante chamada `birthCity` e atribua a ela a sua cidade natal;
3. Crie uma variável chamada `birthYear` e atribua a ela o ano em que você nasceu;
4. Utilize o `console.log()` para imprimir as constantes e variáveis que você criou;
5. Altere o valor atribuído à variável `birthYear` para 2020. Faça um `console.log(birthYear)` novamente para ver o que acontece!
6. Altere o valor atribuído a constante `birthCity`. Faça um `console.log(birthCity)` novamente! Você saberia explicar porque recebemos uma mensagem de erro?

---

### Parte III

Agora que você já sabe o que são variáveis e constantes, vamos entender quais são os `tipos primitivos` e como o JS escolhe o tipo de uma variável através da `tipagem dinâmica` e `operações aritméticas`.

<%= vimeo "471212424" %>

Agora é a hora da mão ~~na massa~~ no código! No exemplo abaixo, temos as informações de um paciente. Utilize o operador `typeof` para imprimir qual o tipo das variáveis `patientId`, `isEnrolled`, `patientInfo` e `patientEmail`. Esse operador retorna qual o tipo de uma variável, objeto, função ou expressão. Exemplo: `console.log(typeof patientId)` retornará `number`.

```language-javascript
let patientId = 50;
let isEnrolled = true;
const patientInfo = {
  firstName: 'Ana',
  lastName: 'Santos',
};
const patientEmail = 'ana@email.com';
```

O que aconteceria se tentássemos checar qual o tipo da variável `patientAge`? Experimente executar o comando `console.log(typeof patientAge)` e veja o que acontece! Ué...mas não declaramos essa variável, não é mesmo? É exatamente por esse motivo que o seu tipo é `undefined`, como você pode observar no retorno do `console.log(typeof patientAge)`. Experimente também trocar o valor de `patientId = 50` para `patientId = '50'`. Execute novamente um `console.log()` para imprimir o tipo dessa variável após a modificação. Você verá que o retorno agora é uma `string` pois colocamos o número 50 dentro das aspas. O JavaScript interpreta como `string` tudo o que estiver entre aspas.

Agora que você já conhece os operadores aritméticos básicos do JavaScript, vamos praticá-los? Você pode consultar a lista de operadores na tabela *JavaScript Arithmetic Operators* disponível [nesse link](https://www.w3schools.com/js/js_operators.asp) {: .external-link target="_blank" rel="noreferrer noopener" } se tiver dúvidas. Vamos fazer algumas operações simples para encontrarmos a área e o perímetro de um retângulo de base 5 e altura 8.

1. Crie uma variável chamada `base` e uma variável chamada `altura` e atribua os seus respectivos valores: 5 e 8;
2. Crie uma variável chamada `area` e atribua a ela o resultado a multiplicação da base pela altura. Dica: lembre-se de usar ~~sempre~~ o `console.log()` para imprimir as variáveis e checar os resultados das operações!
3. Crie uma variável chamada `perimetro` e atribua a ela a soma de todos os lados do retângulo;

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 60 minutos

Agora que já estudamos um pouco do básico de _JavaScript_, que tal ver como podemos trabalhar com a linguagem usando o VSCode?

Aula ao vivo! Vamos pro Slack, onde o link estará disponível.

---

## Mais Conteúdos

###### Tempo sugerido para realização: 60 minutos

Depois dessa super aula ao vivo, você vai continuar aprendendo sobre o _JavaScript_:

---

### Parte IV

Hora de aprender sobre `operadores de atribuição e operadores lógicos`. Vamos lá?

<%= vimeo "471406322" %>

Criar estruturas condicionais com operadores `if/else` e operadores lógicos será algo muito comum na sua carreira de desenvolvedor. Então vamos praticar o que aprendemos no vídeo?

1. Crie uma variável que receba a nota de um candidato em um desafio técnico, e atribua a ela um valor entre 1 a 100;
2. Implemente uma lógica que verifique se o candidato foi aprovado, reprovado ou se ele está na lista de espera. Para isso, considere as seguintes informações:
  * Se a nota for maior que 80, imprima "Parabéns, você foi aprovado!"
  * Se a nota for menor que 80 e maior que 60, imprima "Você está na nossa lista de espera"
  * Se a nota for menor que 60, imprima "Você foi reprovado"
3. Crie uma estrutura condicional utilizando o `if`, `else if` e `else` para criar o seu algoritmo, e os operadores lógicos que se aplicam a cada situação.
4. Altere o valor da nota para verificar se as condições que você implementou funcionam;

---

### Parte V

E, no final do conteúdo de hoje, você vai aprender uma outra forma de criarmos `estruturas condicionais` com o `switch/case`.

<%= vimeo "471412490" %>

Você com certeza está super feliz com seus novos conhecimentos sobre JS, não é?! Então vamos praticar mais um pouco antes de chegar na sessão de exercícios. **Vamos!!!**

1. Crie uma variável para armazenar o estado do candidato ao processo seletivo, que pode ser: `'aprovado'`, `'lista'` ou `'reprovado'`;
2. Crie uma estrutura condicional com o `switch/case` que irá imprimir as mensagens do exercício anterior se o estado do candidato for `'aprovado'`, `'lista'` ou `'reprovado'`. Como `default`, imprima a mensagem de `'não se aplica'`.

A estrutura `switch/case` é utilizada quando queremos executar diferentes ações. A expressão que passamos para o `switch` é avaliada apenas uma vez, e o seu valor é comparado em cada caso. Se essa comparação for verdadeira, o código de bloco do caso avaliado é executado. Se nenhum valor satisfaça os casos listados, é executado o código em `default`.

---

## Exercícios

###### Tempo sugerido para realização: 110 minutos

A seguir você verá uma seção orientando a como realizar o versionamento do seu código. Além disso, também temos um conteúdo focado nisso e em como organizar seus exercícios, você pode acessá-lo [aqui](/real-life-engineer/exercise-portfolio).

No conteúdo que criamos você será apresentado a uma estrutura de organização utilizando pastas para módulos e para blocos. Essa estrutura é diferente da que você verá a seguir na seção de versionamento do código, fica a seu critério decidir qual a melhor forma de organizar seus exercícios!

<%= versioning_your_code(@conn) %>

### Agora a prática

Nos exercícios de hoje, você vai fazer quinze pequenos programas. Todos trabalham a lógica condicional (`if/else` e `switch`), operadores aritméticos (`+`, `-`, `*`, `/`, `%`) e operadores lógicos (`>`, `<`, `&&`, `||`). Para que consiga executar seus códigos recomendamos que utilize a extensão `Code Runner`, você pode ver mais sobre ela no conteúdo que fizemos sobre o uso do [VS Code](/real-life-engineer/vscode).

1. Faça cinco programas, um para cada operação aritmética básica. Seu programa deve ter duas variáveis, `a` e `b`, definidas no começo com os valores que serão operados. Faça programas para:

  * Adição
  * Subtração
  * Multiplicação
  * Divisão
  * Módulo

2. Faça um programa que retorne o maior de dois números. Defina no começo do programa duas variáveis com os valores que serão comparados.

3. Faça um programa que retorne o maior de três números. Defina no começo do programa três variáveis com os valores que serão comparados.

4. Faça um programa que, dado um valor definido numa variável, retorne "positive" se esse valor for positivo, "negative" se for negativo e "zero" caso contrário.

5. Faça um programa que defina três variáveis com os valores dos três ângulos internos de um triângulo. Retorne `true` se os ângulos representarem os ângulos de um triângulo e `false` caso contrário.

  * [Para os ângulos serem de um triângulo válido, a soma dos três deve ser 180 graus.](https://blogdoenem.com.br/triangulos-propriedades/) {: .external-link target="_blank" rel="noreferrer noopener" } Caso os ângulos estejam inválidos, o programa deve retornar uma mensagem de erro.

6. Escreva um programa que receba o nome de uma peça de xadrez e retorne os movimentos que ela faz.

  * Como desafio, faça o programa funcionar tanto se receber o nome de uma peça com letras maiúsculas quanto com letras minúsculas, _sem_ aumentar a quantidade de condicionais.

  * Como dica, você pode pesquisar uma função que faz uma _string_ ficar com todas as letras minúsculas _(lower case)_.

  * Se a peça passada for inválida, o programa deve retornar uma mensagem de erro.

  * Exemplo: `bishop` -> `diagonals`

7. Escreva um programa que converte uma nota dada em porcentagem (de 0 a 100) em conceitos de A a F. Siga essas regras:

  * Porcentagem >= 90 -> A

  * Porcentagem >= 80 -> B

  * Porcentagem >= 70 -> C

  * Porcentagem >= 60 -> D

  * Porcentagem >= 50 -> E

  * Porcentagem < 50 -> F

  * O programa deve retornar uma mensagem de erro e encerrar se a nota passada for menor que 0 ou maior que 100.

8. Escreva um programa que defina três números em variáveis no seu começo e retorne `true` se pelo menos uma das três for par. Caso contrário, ele retorna `false`.

  * _**Bonus:** use somente um `if`._

9. Escreva um programa que defina três números em variáveis no seu começo e retorne `true` se pelo menos uma das três for ímpar. Caso contrário, ele retorna `false`.

  * _**Bonus:** use somente um `if`._

10. Escreva um programa que se inicie com dois valores em duas variáveis diferentes: o custo de um produto e seu valor de venda. A partir dos valores, calcule quanto de lucro (valor de venda descontado o custo do produto) a empresa terá ao vender mil desses produtos.

  * Atente que, sobre o custo do produto, incide um imposto de 20%.

  * Seu programa também deve emitir uma mensagem de erro e encerrar caso algum dos seus valores de entrada seja menor que zero.

  * O lucro de um produto é o resultado da subtração do valor de venda pelo custo do mesmo, sendo que o imposto de 20% também faz parte do valor de custo.
      * valorCustoTotal = valorCusto + impostoSobreOCusto
      * lucro = valorVenda - valorCustoTotal (lucro de um produto)

11. Uma pessoa que trabalha de carteira assinada no Brasil tem descontados de seu salário bruto o INSS e o IR. Faça um programa que, dado um salário bruto, calcule o líquido a ser recebido.

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

  **Exemplo**: Uma pessoa possui o salário bruto de R$ 3.000,00. O cálculo será:

  * O salário bruto está entre R$ 2.594,93 e R$ 5.189,82, então sua alíquota para INSS é de 11%. O INSS será 11% de R$ 3.000, ou seja, R$ 330,00.
  * Para descobrir o salário-base, subtraia do salário bruto a alíquota do INSS: R$ 3.000,00 - R$ 330,00 = R$ 2.670,00.

  * Para pegar o valor do IR, temos um salário (já deduzido o INSS) entre R$ 1.903,99 e 2.826,65, sendo a alíquota, então, de 7.5%, com parcela de R$ 142,80 a deduzir do imposto. Assim, temos:
    * R$ 2.670,00: salário com INSS já deduzido;
    * 7.5%: alíquota de imposto de renda;
    * R$ 142,00 parcela a se deduzir do imposto.

  * Fazendo a conta, temos: (7,5% de R$ 2.670,00) - R$ 142,80 = R$ 57,45

  * O último cálculo para conseguir o salário líquido é R$ 2.670,00 - R$ 57,45 (salário-base - valor IR) = R$ 2.612,55.

  Resultado: R$ 2.612,55.

_**Dica:** que tal identificar as alíquotas com variáveis de nomes explicativos?_

---

## Recursos adicionais (opcional)

Amou o conteúdo de hoje? Tenho certeza de que você vai querer praticar mais e mais! Aqui vão alguns recursos adicionais para que você se prepare ainda mais.

* [Manual de JS](https://tableless.github.io/iniciantes/manual/js/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Artigo com muitos fundamentos de JS](https://www.freecodecamp.org/news/learn-these-javascript-fundamentals-and-become-a-better-developer-2a031a0dc9cf/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Curso online de _JavaScript_](https://learnjavascript.online) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Tutoriais de JS](https://www.learn-js.org/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Lista de conteúdos sobre _JavaScript_](https://github.com/denysdovhan/wtfjs) {: .external-link target="_blank" rel="noreferrer noopener" }

* [_If-else programming practice for C_](https://codeforwin.org/2015/05/if-else-programming-practice.html) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

Ainda temos muito **_JavaScript_** pela frente, vamos lá?

<%= next_button(@conn) %>
