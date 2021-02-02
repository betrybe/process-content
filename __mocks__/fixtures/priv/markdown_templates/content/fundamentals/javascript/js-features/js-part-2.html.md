## O que vamos aprender?

Nesta segunda parte sobre **_JavaScript_**, você aprenderá duas das principais estruturas de dados disponíveis na linguagem e algumas das formas de iterar sobre elas.

Vamos avançar nossos conhecimentos e entender mais sobre `Array` e `For`.

---

## Você será capaz de:

  * Manipular arrays (listas);
  * Utilizar o comando `for`;

---

## Por que isso é importante?

A manipulação de _Arrays_ estará presente em toda sua carreira como pessoa desenvolvedora. Você irá usar arrays frequentemente para armazenar os dados que achar necessário.

Concentre-se em entender ao máximo o conceito de Array e como manipulá-los, pois essa base será importante para avançar seu conhecimento.

---

## Conteúdos

###### Tempo sugerido para realização: 80 minutos

Cada tópico do conteúdo apresentará o material de estudo e exercícios para fixar o aprendizado. Faça todo o conteúdo com calma e treine bem com os exercícios.

---

### Arrays (listas)

Veja o vídeo abaixo para aprender sobre Arrays em _JavaScript_.

<%= vimeo "483864310" %>

Como vimos no vídeo acima, uma das grandes vantagens dos arrays é o armazenamento de várias informações em uma mesma estrutura. Veja o exemplo e pratique:

```language-javascript
let tasksList = ['Tomar café', 'Reunião', 'Brincar com o cachorro'];

console.log(tasksList.length);
// 3
```
{: .line-numbers}

Sempre que precisar armazenar várias informações, o _Array_ é uma boa alternativa e será uma ferramenta muito útil. Observamos que por meio do `.length`, você consegue ter acesso à quantidade de elementos contidos nele. Agora, como podemos acessar essas informações? Veja este exemplo:

```language-javascript
let tasksList = ['Tomar café', 'Reunião', 'Brincar com o cachorro'];

let searchForFirstTask = tasksList[0];
console.log(searchForFirstTask);
// Tomar café

let searchForLastTask = tasksList[tasksList.length - 1];
console.log(searchForLastTask);
// Brincar com o cachorro
```
{: .line-numbers}

Como podemos observar, é possível acessar os arrays pelo seu índice. O fato curioso é que a primeira posição do array é representada pelo número _0_. Desse modo, para acessarmos o último elemento da estrutura, devemos pegar a quantidade de seus elementos utilizando o `.length` e subtrair _1_.

Vamos agora adicionar uma nova atividade para nossa lista de arrays. Veja e pratique com o exemplo a seguir:

```language-javascript
let tasksList = ['Tomar café', 'Reunião', 'Brincar com o cachorro'];

tasksList.push('Fazer exercícios da Trybe');  // adiciona mais uma tarefa
console.log(tasksList);

// ['Tomar café', 'Reunião', 'Brincar com o cachorro', 'Fazer exercícios da Trybe']
```
{: .line-numbers}

Legal, né!? Repare que o método `.push()` adiciona um novo item no final do array. Se precisarmos adicionar no início, podemos usar o `.unshift()`. Teste em seu console e veja o resultado.

Bacana, já aprendemos a estruturar nosso array, acessar algumas informações e adicionar itens. Espero que esteja animado e se perguntando: _"Ok. Agora como faço para remover?"_. Simples, veja este exemplo:

```language-javascript
let tasksList = ['Tomar café', 'Reunião', 'Brincar com o cachorro'];

tasksList.pop();  // remove a última tarefa
console.log(tasksList);

// [ 'Tomar café', 'Reunião' ]
```
{: .line-numbers}

O método `.pop()` permite que você remova o último item do array. Agora, se precisar remover o primeiro item da lista, você pode usar o `.shift()`. Faça em seu console e veja o resultado.

Outra importante ferramenta é o `indexOf()`, usado para procurar o índice de um item no _Array_. Veja o exemplo:

```language-javascript
let tasksList = ['Tomar café', 'Reunião', 'Brincar com o cachorro'];

let indexOfTask = tasksList.indexOf('Reunião');
console.log(indexOfTask);

// 1
```
{: .line-numbers}

Essas são algumas das possibilidades mais utilizadas para manipular arrays. Caso tenha dúvidas, lembre-se sempre de consultar [a documentação.](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array) {: .external-link target="_blank" rel="noreferrer noopener" }

Para fixar faça os próximos **exercícios**:

#### Exercício 1

* Obtenha o valor _"Serviços"_ do array `menu`:

```language-javascript
let menu = ['Home', 'Serviços', 'Portfólio', 'Links'];
let menuServices = ;

console.log(menuServices);
```
{: .line-numbers}

#### Exercício 2

* Procure o índice do valor _"Portfólio"_ do array `menu`:

```language-javascript
let menu = ['Home', 'Serviços', 'Portfólio', 'Links'];
let indexOfPortfolio = ;

console.log(indexOfPortfolio);
```
{: .line-numbers}

#### Exercício 3

* Adicione o valor _"Contato"_ no final do array `menu`:

```language-javascript
let menu = ['Home', 'Serviços', 'Portfólio', 'Links'];

console.log(menu);
```
{: .line-numbers}

---

### For

No vídeo sobre arrays, você também aprendeu um pouco sobre o `for`. Agora nesta seção, iremos focar em entender melhor como funciona essa estrutura de repetição. Como você viu, os laços podem executar blocos de códigos inúmeras vezes. Vamos aprender o que é o `for` e aproveitar para ver alguns usos comuns de arrays.

Alguns aqui podem já ter visto o vídeo da Ana no curso introdutório da Trybe, mas como vamos repassar esse assunto, veremos o vídeo mais uma vez para refrescar a memória e seguir com nosso conteúdo.
<%= youtube_video "lXsKBDhixXQ" %>

Suponha que você possua uma lista com marcas de carros:

```language-javascript
let cars = ["Saab", "Volvo", "BMW"];
```
{: .line-numbers}

Anteriormente para apresentar esses valores, o código que executa essa tarefa seria:

```language-javascript
let cars = ["Saab", "Volvo", "BMW"];
console.log(cars[0]) // Saab
console.log(cars[1]) // Volvo
console.log(cars[2]) // BMW
```
{: .line-numbers}

Mas, agora que você conhece o `for`, você pode melhorar o código para algo do tipo:

```language-javascript
let cars = ["Saab", "Volvo", "BMW"];
for (let i = 0; i < cars.length; i++) {
  console.log(cars[i])
}
```
{: .line-numbers}

> Os dois códigos geram o mesmo resultado, mas o segundo é muito mais adequado. Pense que, em vez de 3 carros, essa lista possuísse 1000. No primeiro código, você teria que escrever 1000 linhas!

Para fixar faça o próximo **exercício**:

#### Exercício 1

* Utilize o `for` para imprimir os elementos da lista `groceryList` com o `console.log()`:

```language-javascript
let groceryList = ["Arroz", "Feijão", "Alface", "Melancia"];
```
{: .line-numbers}

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

Agora que você já estudou objetos, arrays e loops, que tal fazermos juntos um exercício de programação que precisa de todas essas estruturas para funcionar?

Aula ao vivo! Vamos para o Slack, onde o link estará disponível.

---

## Exercícios

###### Tempo sugerido para realização: 140 minutos

<%= versioning_your_code(@conn) %>

### Agora a prática

#### Vamos colocar mão na massa?

[Preparamos estes exercícios](https://be-trybe.typeform.com/to/nVivcI32) {: .external-link target="_blank" rel="noreferrer noopener" } para você fixar seus conhecimentos em **JavaScript - Array e loop For** 🎯💪. Vamos lá?


#### Aprofunde seus conhecimentos 

Leia atentamente os enunciados e faça o que se pede!
Você irá utilizar esse array para realizar os exercícios do 1 ao 7:

```language-javascript
let numbers = [5, 9, 3, 19, 70, 8, 100, 2, 35, 27];
```
{: .line-numbers}

1. Nesse primeiro exercício, percorra o array imprimindo todos os valores nele contidos com a função `console.log()`;

2. Para o segundo exercício, você deve somar todos os valores contidos no array e imprimir o resultado;

3. Para o terceiro exercício, calcule e imprima a média aritmética dos valores contidos no array;
  * A média aritmética é o resultado da soma de todos os elementos divido pelo número total de elementos.

4. Com o mesmo código do exercício anterior, caso valor final seja maior que 20, imprima a mensagem: "valor maior que 20". Caso não seja, imprima a mensagem: "valor menor ou igual a 20";

5. Utilizando `for`, descubra qual o maior valor contido no array e imprima-o;

6. Descubra quantos valores ímpares existem no array e imprima o resultado. Caso não exista nenhum, imprima a mensagem: "nenhum valor ímpar encontrado";

7. Utilizando `for`, descubra qual o menor valor contido no array e imprima-o;

8. Utilizando `for`, crie uma array que vá de 1 até 25 e imprima o resultado;

9. Utilizando o array criado no exercício anterior imprima o resultado da divisão de cada um dos elementos por `2`.

### Bônus

Para os próximos dois exercícios [leia este artigo](http://devfuria.com.br/logica-de-programacao/introducao-ao-algoritmo-de-ordenacao-bubble-sort/) {: .external-link target="_blank" rel="noreferrer noopener" } e tente entender o que está acontencedo no código abaixo:

```language-javascript
for (let i = 1; i < array.length; i++) {
  for (let j = 0; j < i; j++) {
    if (array[i] < array[j]) {
      let position = array[i];

      array[i] = array[j];
      array[j] = position;
    }
  }
}
```
{: .line-numbers}

1. Ordene o array `numbers` em ordem crescente e imprima seus valores;

2. Ordene o array `numbers` em ordem decrescente e imprima seus valores;

3. Agora você irá criar um novo array a partir do array `numbers`, sem perdê-lo. Cada valor do novo array deverá ser igual ao valor correspondente no array `numbers` multiplicado pelo seguinte. Por exemplo: o primeiro valor do novo array deverá ser 45, pois é a multiplicação de 5 (primeiro valor) e 9 (valor seguinte). Já o segundo valor do novo array deverá ser 27, pois é a multiplicação de 9 (segundo valor) e 3 (valor seguinte), e assim por diante. Caso não haja próximo valor, a multiplicação deverá ser feita por 2. Faça isso utilizando o `for` e o método `push`. O resultado deve ser o array abaixo:

```language-javascript

[45, 27, 57, 1330, 560, 800, 200, 70, 945, 54]
```
{: .line-numbers}

## Recursos adicionais (opcional)

* Quer mais exercícios? Você pode seguir [este link](https://www.hackerrank.com/domains/tutorials/10-days-of-javascript) {: .external-link target="_blank" rel="noreferrer noopener" } e fazer até `Day 3: Arrays`.

* [W3Schools _JavaScript_ Arrays](https://www.w3schools.com/js/js_arrays.asp) {: .external-link target="_blank" rel="noreferrer noopener" }

* [W3Schools _JavaScript_ For Loop](https://www.w3schools.com/js/js_loop_for.asp) {: .external-link target="_blank" rel="noreferrer noopener" }

* [W3Schools _JavaScript_ Tutorial](https://www.w3schools.com/js/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [_JavaScript_ Fundamentals](https://medium.com/nybles/javacript-fundamentals-52cfafda60a2) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Curso Grátis de _JavaScript_ e ECMAScript para Iniciantes](https://www.youtube.com/playlist?list=PLHz_AreHm4dlsK3Nr9GVvXCbpQyHQl1o1) {: .external-link target="_blank" rel="noreferrer noopener" }

* [10 Websites to Learn _JavaScript_ for Beginners](https://hackernoon.com/10-websites-to-learn-javascript-for-beginners-31e13bbdbb5c) {: .external-link target="_blank" rel="noreferrer noopener" }

* [_HTML_, _CSS_ and _JavaScript_ for Web Developers (semana 4 e 5)](https://www.coursera.org/learn/html-css-javascript-for-web-developers/home/welcome) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Learn _JavaScript_](https://learnjavascript.online/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Learn JS](https://www.learn-js.org) {: .external-link target="_blank" rel="noreferrer noopener" }

* [The Modern _JavaScript_ Tutorial](https://javascript.info) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Eloquent _JavaScript_](http://eloquentjavascript.net/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [You Don't Know JS](https://github.com/getify/You-Dont-Know-JS) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
