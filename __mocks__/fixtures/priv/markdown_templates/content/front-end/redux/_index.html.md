## O que vamos aprender?

Hoje vamos aprender sobre uma biblioteca que possui ampla adoção entre as pessoas que desenvolvem em ***React***. Essa biblioteca é o ***Redux***. Ela é utilizada para ajudar no gerenciamento de estado. Vamos entender um pouco mais sobre o que é, como nasceu e como funciona o ***Redux***.

<%= vimeo "470943166" %>

---

### Você será capaz de:

  * Criar uma `Store` para armazenar o estado de uma aplicação.

  * Utilizar `Reducers` e `Actions` para atualizar a `Store`

---

## Por que isso é importante?

Como dito anteriormente, ***Redux*** é uma biblioteca com ampla adoção na comunidade ***React***, além de contar com implementações que superam as fronteiras do ***JavaScript***, como arquiteturas para desenvolvimento ***Android*** e ***iOS*** que se baseiam na estrutura de gerenciamento de estado que o ***Redux*** traz.

Imagine que você precisa transitar diversas informações entre os mais diversos componentes em ***React***. Imagine também que estas informações descem níveis e mais níveis na hierarquia de componentes. Você concorda que essa manipulação, quando o estado é guardado por componente, é extremamente difícil? Suponha que você tenha um componente `X` que possui um dado que precisa ser repassado para um componente `Y`, que está 10 níveis abaixo da hierarquia de componentes. Você precisa passar esse dado para vários componentes no meio, sendo que nenhum deles precisa de tal dado! E se você passar o dado errado de um componente para outro no meio do caminho? Esse problema se chama `prop threading` (ou drilling), e é um dos problemas que o ***Redux*** ataca! 🚀

Quando você, enquanto pessoa que desenvolve software passa a adotar uma abordagem como a do ***Redux***, significa que você está levando a um outro nível a organização do seu código, endereçando a problemática do parágrafo acima, se preocupando em como transitar as informações entre os componentes e deixando seu código mais organizado e com maior confiabilidade.

## Conteúdos

###### Tempo sugerido para realização: 120 minutos

É importante dizer que o ***Redux*** vem para resolver problemas de fluxo de informação dentro da sua aplicação, assim como o gerenciamento de seus dados. Você verá que ele ajuda na comunicação entre componentes.

<%= vimeo "470949264" %>

Assim como na vida cotidiana ou no trabalho existem vários fluxos e rotinas que podemos chamar de "modelo de negócio". Por exemplo, quando você vai à padaria, quais são os processos que ocorrem desde a hora que você entra no estabelecimento até sair? Existe todo um fluxo de ações e divisões de responsabilidades das pessoas funcionárias e seus clientes, correto?

Por essa perspectiva, podemos dizer que existe muita similaridade entre as nossas rotinas e os fluxos de uma aplicação. Cada componente, estado e função têm seus papéis e demandas que precisam ser executadas conforme o "modelo de negócio" do sistema. Isso envolve transmissão de informação - de componentes pais para componentes filhos, filhos dos filhos, filhos para pais, enfim! Nós já vimos que, quando nossa aplicação cresce, a transmissão de informações começa a ficar complicada de se fazer, não é mesmo?

O ***Redux*** existe para auxiliar o fluxo de dados dentro da sua aplicação! Com ele você consegue ter, além do estado local de cada componente, um estado **global**, **acessível a todos os componentes**, onde se pode armazenar e recuperar informações que precisam ser compartilhadas. Essa ferramenta pode ser dividida em três partes principais - `actions`, `stores` e `reducers`.

Podemos dizer que cada parte tem suas responsabilidades bem definidas, vamos explicar brevemente uma a uma e depois faremos uma analogia para ficar mais fácil compreender.

##### Actions

As `actions`, como o nome indica, são as possíveis ações que seu sistema pode executar na `store`. Elas atuam como uma regra de negócio para manter os dados dos estados da aplicação e as suas mudanças previsíveis e consistentes. É bem comum ouvirmos que as `actions` são ***intenções*** (grave esse termo) de mudança de estado (para usar um termo mais técnico).

##### Store

A `store` é onde o estado da sua aplicação fica registrado e protegido. As mudanças ou consultas feitas na `store` precisam estar definidas anteriormente numa `action`. Isso garante a integridade dos dados, como explicado anteriormente.

##### Reducers

Os `reducers` são responsáveis por manipular a `store` seguindo as regras definidas pelas `actions`. Os `reducers` são importantes para evitar a manipulação direta da `store` e facilitam a manutenção do código.

#### Para entendermos melhor

Para facilitar o entendimento do funcionamento das `actions`, `stores` e `reducers`, podemos usar algumas analogias com o nosso dia-a-dia. Voltemos ao exemplo da padaria.

Se o ***Redux*** fosse uma padaria, a `store` seria o forno de assar pão, o `reducer` seria o padeiro, as `actions` seriam as responsabilidades do padeiro e o cliente seria a aplicação ou o componente (no caso do React) que precisasse de um serviço.

Para a padaria funcionar bem, é importante que cada pessoa e equipamento tenham suas responsabilidades bem definidas, sendo assim, suponhamos que o cliente queira comprar pão.

Primeiramente ele entra na padaria com a ***intenção*** de comprar o pão - isso poderia ser assimilado a uma `action` - ao requisitar pro padeiro, a ***intenção*** é executada.

Logo após o pedido, o padeiro - que na nossa analogia é o `reducer` - vai até o forno (`store`) e finalmente retira um pão de lá. Note que agora o estado do forno mudou, ele possui um pão a menos; o pagamento é feito e o fluxo encerra!

Observe que durante todo o processo, cada agente cumpriu seu papel e não houve conflitos no processo! Exatamente para isso que o ***Redux*** foi desenvolvido assim, com as partes bem definidas.

Agora vamos fazer três exercícios:

* [Criando um ***Redux*** store](https://www.freecodecamp.org/learn/front-end-libraries/redux/create-a-redux-store) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Buscando o estado dentro de um ***Redux*** store](https://www.freecodecamp.org/learn/front-end-libraries/redux/get-state-from-the-redux-store) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Definindo uma `Action`](https://www.freecodecamp.org/learn/front-end-libraries/redux/define-a-redux-action) {: .external-link target="_blank" rel="noreferrer noopener" }

#### Combinando Reducers

Como podemos notar, o Redux auxilia bastante o desenvolvimento do nosso projeto, especialmente quando a aplicação se torna muito complexa.

Imagine que a sua aplicação tenha dezenas de componentes e actions diferentes com lógicas específicas e complicadas. Agora suponha que você precise organizar tudo isso em vários `reducers`, e pior, depois ainda precise passar todos os `reducers` para um único `store`! :fearful:

O problema que você pode já ter notado é justamente esse, como poderíamos unir vários `reducers` numa aplicação que, normalmente, possui apenas um `store`?

O Redux já possui uma função para resolver isso, a `combineReducers()`. Essa função recebe um `objeto` como parâmetro contendo cada um dos seus `reducers` como elementos, por exemplo:

```language-jsx
// Arquivo index.js

import { combineReducers } from 'redux';
import meuReducer from './meuReducer';
import meuOutroReducer from './meuOutroReducer';

const reducerCombinado = combineReducers({
  meuReducer,
  meuOutroReducer});

export default reducerCombinado;
```
{: .line-numbers}

Agora basta fazer a sua importação no seu `store` para a mágica acontecer!

```language-jsx

import { createStore } from 'redux';
// Importando o reducer combinado que fizemos logo acima
import reducerCombinado from './reducers/index';

const store = createStore(reducerCombinado);
...
```
{: .line-numbers}

Você pode conferir uma explicação mais detalhada neste, [tópico da documentação](https://redux.js.org/api/combinereducers/) {: .external-link target="_blank" rel="noreferrer noopener" } sobre a combinação de múltiplos `reducers`. Guarde para ler depois!

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

É hora de colocar em prática todo esse conhecimento. 💪 Vamos ver como utilizar tudo que aprendemos sobre `Redux`.

Aula ao vivo! Vamos para o Slack onde o link estará disponível.

---

## Exercícios

###### Tempo sugerido para realização: 140 minutos

<%= versioning_your_code(@conn) %>

---

### Instruções para realização dos exercícios

### Agora a prática

Você irá fazer 14 exercícios propostos pelo site `freecodecamp`, com objetivo de consolidar seus conhecimentos acerca dos conceitos presentes no ***Redux***.

1. [Definindo um `action creator`](https://www.freecodecamp.org/learn/front-end-libraries/redux/define-an-action-creator) {: .external-link target="_blank" rel="noreferrer noopener" }

2. [Enviando uma `action` para um `reducer`](https://www.freecodecamp.org/learn/front-end-libraries/redux/dispatch-an-action-event) {: .external-link target="_blank" rel="noreferrer noopener" }

3. [Criando um `Reducer` para receber e manipular uma `action`](https://www.freecodecamp.org/learn/front-end-libraries/redux/handle-an-action-in-the-store) {: .external-link target="_blank" rel="noreferrer noopener" }

4. [Criando um `reducer` que aceita `actions` de tipos distintos](https://www.freecodecamp.org/learn/front-end-libraries/redux/use-a-switch-statement-to-handle-multiple-actions) {: .external-link target="_blank" rel="noreferrer noopener" }

5. [Usando `const` para os `action types`](https://www.freecodecamp.org/learn/front-end-libraries/redux/use-const-for-action-types/) {: .external-link target="_blank" rel="noreferrer noopener" }

6. [Registrando um `listener` para no `store`](https://www.freecodecamp.org/learn/front-end-libraries/redux/register-a-store-listener) {: .external-link target="_blank" rel="noreferrer noopener" }

7. [Combinando múltiplos `reducers`](https://www.freecodecamp.org/learn/front-end-libraries/redux/combine-multiple-reducers) {: .external-link target="_blank" rel="noreferrer noopener" }

8. [Enviando dados através das `actions`](https://www.freecodecamp.org/learn/front-end-libraries/redux/send-action-data-to-the-store) {: .external-link target="_blank" rel="noreferrer noopener" }

9. [Criando um contador com ***Redux***](https://www.freecodecamp.org/learn/front-end-libraries/redux/write-a-counter-with-redux) {: .external-link target="_blank" rel="noreferrer noopener" }

10. [Por que nunca modificar um `state`?](https://www.freecodecamp.org/learn/front-end-libraries/redux/never-mutate-state) {: .external-link target="_blank" rel="noreferrer noopener" }

11. [Utilizando o `spread operator` como ferramenta para manter a imutabilidade do `state`](https://www.freecodecamp.org/learn/front-end-libraries/redux/use-the-spread-operator-on-arrays) {: .external-link target="_blank" rel="noreferrer noopener" }

12. [Removendo itens de um array preservando a imutabilidade](https://www.freecodecamp.org/learn/front-end-libraries/redux/remove-an-item-from-an-array) {: .external-link target="_blank" rel="noreferrer noopener" }

13. [Trabalhando com `Object.assign`](https://www.freecodecamp.org/learn/front-end-libraries/redux/copy-an-object-with-object-assign) {: .external-link target="_blank" rel="noreferrer noopener" }

### Bônus

Agora você irá incrementar o código que foi feito durante a aula ao vivo.

  * Faça um campo que recebe um valor e esse será o valor aplicado ao botão incremento.

  * Faça um campo que recebe um valor e esse será o valor aplicado ao botão decremento.

  * Armazene um outro valor no `state`, chamado `clickCount`. Este campo vai contar o número de vezes que qualquer botão na tela foi clicado.

  * Armazene um `array` no `state` que guarda o valor individual que foi adicionado a cada click em qualquer um dos três botões.

---

## Recursos adicionais

* [Redux utilizando apenas JS!](https://medium.com/jaguaribetech/introdu%C3%A7%C3%A3o-ao-redux-usando-apenas-javascript-6d6d55bd9be4) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Conceitos do ***Redux***](https://alligator.io/redux/redux-intro/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [5 motivos para aprender Redux](https://blog.getty.io/5-motivos-para-aprender-redux-6ac730f3f1f2) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Tutorial da página da documentação do ***Redux***](https://redux.js.org/basics/basic-tutorial) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Introdução ao `Flux`](https://www.freecodecamp.org/news/an-introduction-to-the-flux-architectural-pattern-674ea74775c9/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Curso feito pelo criador do `Redux`](https://egghead.io/courses/getting-started-with-redux) {: .external-link target="_blank" rel="noreferrer noopener" }

* [O que são `funções puras`?](https://www.freecodecamp.org/news/why-redux-needs-reducers-to-be-pure-functions-d438c58ae468/) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

Na próxima aula você irá aprender mais sobre ***Redux***, mas agora com ***React***!

<%= next_button(@conn) %>
