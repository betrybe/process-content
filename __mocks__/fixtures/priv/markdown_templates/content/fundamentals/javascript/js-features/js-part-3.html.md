## O que vamos aprender?

Hoje você vai aprender sobre algoritmos e lógica de programação, a base de tudo que faremos daqui pra frente.

Assim como em uma receita de bolo, na programação, devemos passo a passo utilizar comandos para resolver um problema. Essa sequência de comandos se chama **algoritmo**. Para criar um algoritmo, temos que desenvolver uma capacidade analítica para transformar grandes problemas em pequenos e encadeados comandos lógicos. Desenvolvemos essa forma de raciocinar com a **lógica de programação**.

---

### Você será capaz de:

- Quebrar grandes problemas em pequenos;

- Utilizar a lógica de programação na resolução de problemas.

---

## Conteúdos

###### Tempo sugerido para a realização: 80 minutos

### Lógica de Programação

A lógica de programação consiste em uma série de regras e normas baseadas na lógica matemática e em teorias da computação, que tem como objetivo facilitar o raciocínio no momento da criação de uma cadeia de comandos.

Antes de adentrar os requisitos mais técnicos, tenha em mente que aprender a teoria sobre esse assunto não é suficiente. O processo de utilização da lógica de programação demanda tempo e repetição, até que se torne automático. Você desenvolverá essa habilidade aos poucos ao longo de todo o curso!

Outro ponto importante é que a lógica de programação não se restringe a uma linguagem específica. Você irá aprender a partir de _JavaScript_, mas a lógica é aplicável a todas as outras linguagens. Por isso costuma-se dizer que, a cada linguagem que aprendemos, fica mais fácil aprender a próxima, pois já exercitamos nosso raciocínio e temos apenas que adaptar nossos _algoritmos_, que veremos mais a frente, às particularidades de determinada linguagem.

Assista esse vídeo para entender os conceitos da lógica:

<%= youtube_video "JaTf3dhx464" %>

### Algoritmos

O algoritmo é uma série de comandos encadeados de forma lógica, que busca resolver algum problema.

Utilizamos lógica em muitos momentos do nosso dia a dia de forma automática. Pense no leite com achocolatado que você toma pela manhã. Simples fazê-lo, não? Vejamos o passo a passo:

    1. Pegar um copo
    2. Colocar o copo em cima da mesa
    3. Abrir a porta da geladeira
    4. Pegar o leite
    5. Fechar a porta da geladeira
    6. Colocar determinada quantidade de leite no copo
    7. Abrir o armário
    8. Pegar o achocolatado
    9. Fechar a porta do armário
    10. Colocar determinada quantidade de achocolatado no copo
    11. Pegar uma colher
    12. Mexer no copo com a colher

Imagine se tivéssemos que pensar em todo esse passo a passo toda manhã. Felizmente, já conseguimos interpretar essa série de instruções de forma lógica e automática.

> Lembre-se: os computadores são burros.

Os computadores não tem esse poder. Para o bem ou para o mal, computadores são isentos de vieses e interpretações. Eles levam tudo "ao pé da letra". Por isso, cada comando deve ser cirurgicamente determinado. Caso, no passo 4, estivesse escrito "Pegar o lete", o que seria pra nós um simples erro ortográfico, mas que não traria danos à execução do processo, para o computador seria um erro de sintaxe, que inviabilizaria o funcionamento do algoritmo. Provavelmente um erro como `lete is not defined` seria retornado.

Porém, algumas ordens poderiam ser trocadas sem prejuízo na execução. Por exemplo, poderíamos utilizar os passos 7, 8, 9 e 10 antes dos 3, 4, 5 e 6. Ou seja, colocar o achocolatado no copo antes do leite. Esse tipo de decisão é comum na vida das pessoas desenvolvedoras. 

Quando nos deparamos com problemas, devemos raciocinar e enxergar quais os caminhos possíveis para a sua resolução. Muitas vezes esses caminhos são múltiplos, o que nos leva a decidir qual percorrer. Alguns fatores como performance, propriedades da linguagem utilizada, legibilidade do código e tempo devem ser levados em consideração no momento da decisão. No exemplo do leite com achocolatado, existem pessoas que vão preferir do jeito como está, e existem pessoas que optarão por colocar o achocolatado antes do leite, e desde que não haja prejuízo nos fatores citados acima, tudo bem!

Agora, pegue papel e caneta ou abra um bloco de texto e gaste 5 minutos escrevendo um algoritmo sobre como se vestir para uma festa.

Após escrever o algoritmo, responda as seguintes perguntas:

- Eu resolvi o problema?
- Havia outras maneiras de resolver o problema?
- A maneira que eu escolhi foi a mais eficiente possível, ou havia como fazer a mesma coisa com menos passos?
- Seria possível inverter ou retirar algum passo?
- Se eu fosse um computador, conseguiria entender todas as instruções?

Existe também, no processo de criação de um algoritmo, um conceito muito importante chamado `baby steps` ou "passos de bebê". 

Antes de falarmos dos `baby steps`, vamos analisar o seguinte exercício:

O enunciado diz:

> Utilizando o array abaixo, percorra-o somando todos os valores. Caso o valor final seja maior que 15, imprima-o. Caso seja igual ou menor que 15, imprima a mensagem: "valor menor que 16":

```language-javascript
let fruits = [3, 4, 10, 1, 12];
```

A resolução do problema acontece em 3 etapas:

1. Interpretação;
2. Criação do algoritmo;
3. Codificação do algoritmo.

Portanto, primeiro vamos interpretar o que está sendo pedido, e essa etapa é crucial para solucionar o problema. Se interpretarmos errado, o algoritmo e consequentemente o código estará errado.

Analisando o enunciado, sabemos que:

* devemos utilizar o array `fruits`;
* o termo "_percorra_" indica uma estrutura de repetição, ou loop;
* "_somando todos os valores_" mostra que devemos ter uma variável que guarda o valor da soma dos valores;
* o termo "_caso_" indica uma estrutura condicional, ou `if`;
* "_imprima o valor final_" indica um `console.log`;

Pode parecer um pouco bobo, mas em enunciados complexos, analisar friamente o enunciado nos afasta de cometermos erros e termos que escrever todo os passos seguintes novamente.

Agora vamos criar o algoritmo, e pra isso faremos uso dos `baby steps`. Eles nos estimulam a dividir grandes e complexos problemas em pequenos e simples.

1. Adicionar o array;
2. Criar uma variável com valor 0;
3. Criar um loop que percorre o array;
4. Incrementar a variável com o valor correspondente a cada loop;
5. Criar um if com a condição da variável ser maior que 15;
6. Caso a variável obedeça a condição;
    1. Imprimir a variável
7. Caso não obedeça a condição;
    1. Imprimir a mensagem "valor menor que 16";

No momento já interpretamos o problema e já criamos um algoritmo, baseado nos `baby steps`, para ele. Como última etapa, vamos codificá-lo, seguindo nosso algoritmo:

Adicionar o array;

```language-javascript
//exercise.js
let fruits = [3, 4, 10, 1, 12];
```
Criar uma variável com valor 0;

```language-javascript
//exercise.js
let fruits = [3, 4, 10, 1, 12];
let sum = 0;
```
Criar um loop que percorre o array;

```language-javascript
//exercise.js
let fruits = [3, 4, 10, 1, 12];
let sum = 0;

for (let i = 0; i < fruits.length; i+= 1) {

}
```
Incrementar a variável com o valor correspondente a cada loop;

```language-javascript
//exercise.js
let fruits = [3, 4, 10, 1, 12];
let sum = 0;

for (let i = 0; i < fruits.length; i+= 1) {
  sum += fruits[i];
}
```
Criar um if com a condição da váriavel ser maior que 15;

```language-javascript
//exercise.js
let fruits = [3, 4, 10, 1, 12];
let sum = 0;

for (let i = 0; i < fruits.length; i+= 1) {
  sum += fruits[i];
}

if (sum > 15) {

} else {

}
```
Caso a varíavel obedeça a condição:
Imprimir a varíavel;

```language-javascript
//exercise.js
let fruits = [3, 4, 10, 1, 12];
let sum = 0;

for (let i = 0; i < fruits.length; i+= 1) {
  sum += fruits[i];
}

if(sum > 15) {
  console.log(sum);
} else {

}
```
Caso não obedeça a condição:
Imprimir a mensagem “valor menor que 16”;

```language-javascript
//exercise.js
let fruits = [3, 4, 10, 1, 12];
let sum = 0;

for (let i = 0; i < fruits.length; i+= 1) {
  sum += fruits[i];
}

if (sum > 15) {
  console.log(sum);
} else {
  console.log('valor menor que 16');
}
```

Com o tempo e repetição, muitas dessas etapas se tornam automáticas. Porém, é extremamente útil sabermos construir um algoritmo sem codificá-lo. Por isso, até o momento da aula ao vivo, volte aos exercícios do dia anterior, 4.2, e crie um algoritmo para cada.

Após escrever cada algoritmo, responda novamente as seguintes perguntas:

- Eu resolvi o problema?
- Havia outras maneiras de resolver o problema?
- A maneira que eu escolhi foi a mais eficiente possível?
- Seria possível inverter ou retirar algum passo?
- Se eu fosse um computador, conseguiria entender todas as intruções?

Lembre-se sempre: **se você travar em algum exercício, recomece seu raciocínio com baby steps!** Certamente você será capaz de dividir algum passo em outros passos menores. Isso ajudará _muito_ na hora de resolver problemas.

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

Partiu praticar esses conceitos todos juntos?!

Aula ao vivo! Vamos para o Slack, onde o link estará disponível.

---

## Exercícios

###### Tempo sugerido para realização: 140 minutos

<%= versioning_your_code(@conn) %>

### Agora a prática

#### Bora fixar o conteúdo de hoje?! 🎯 💪

[Preparamos estes exercícios](https://be-trybe.typeform.com/to/Gt4QoTA9) {: .external-link target="_blank" rel="noreferrer noopener" } para você fixar seus conhecimentos em sobre **Lógica de Programação e Algoritmos**. Eles já contam com feedback na hora e são rapidinhos! Vamos lá? 


#### Aprofunde seus conhecimentos

Leia atentamente os enunciados e faça o que se pede!

> Recomendamos que você utilize o `debugger` durante a realização dos exercícios, desse modo será mais fácil acompanhar o comportamento do código e entender o que ocorre em cada uma das linhas. Para saber mais sobre como utilizar o `debugger`, acesse nosso [conteúdo](/real-life-engineer/vscode) sobre isso.

1- Para o primeiro exercício de hoje, faça um programa que, dado um valor `n` qualquer, seja `n > 1`, imprima na tela um quadrado feito de asteriscos de lado de tamanho `n`. Por exemplo:

```language-shell
n = 5

*****
*****
*****
*****
*****
```
{: .line-numbers}

---

2- Para o segundo exercício, faça o mesmo que antes, mas que imprima um triângulo retângulo com `5` asteriscos de base. Por exemplo:

```language-shell
n = 5

*
**
***
****
*****
```
{: .line-numbers}

---

3- Agora inverta o lado do triângulo. Por exemplo:

```language-shell
n = 5

    *
   **
  ***
 ****
*****
```
{: .line-numbers}

Atenção! Note que esse exercício é _bem mais complexo que o anterior!_ Não basta, aqui, imprimir somente asteriscos. Você precisará de uma lógica para imprimir espaços também.

---

4- Depois, faça uma pirâmide com `n` asteriscos de base:

```language-shell
n = 5

  *
 ***
*****
```
{: .line-numbers}

---

### Bônus

5- Faça uma pirâmide com `n` asteriscos de base que seja vazia no meio. Assuma que o valor de `n` será sempre ímpar:

```language-shell
Por último, façamos com que a variável seja incrementada com o valor correspondente a cada loop;
n = 7

   *
  * *
 *   *
*******
```
{: .line-numbers}

---

6- Faça um programa que diz se um número definido numa variável é primo ou não.

* Um número primo é um número que só é divisível por 1 e por ele mesmo, ou seja, a divisão dele com quaisquer outros números dá resto diferente de zero.

* Dica: você vai precisar de fazer um loop que vá de 0 ao número definido; Além disso, vai precisar de fazer uma checagem a cada iteração e armazenar os resultados em algum lugar.

---

## Recursos adicionais (opcional)


* [W3Schools _JavaScript_ Arrays](https://www.w3schools.com/js/js_arrays.asp) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Grasshopper - um aplicativo para praticar o básico de programação](https://grasshopper.app/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Step up your coding game - The new way to improve your programming skills while having fun and getting noticed](https://www.codingame.com/start) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Code.org - treinando lógica de programação de maneira lúdica](https://code.org/learn) {: .external-link target="_blank" rel="noreferrer noopener" }

* [The 9 Best Coding Games to Build Your Programming Skills](https://www.makeuseof.com/tag/best-programming-games/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [CheckiO - Coding games for beginners and advanced programmers](https://checkio.org/) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
