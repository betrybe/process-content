## O que vamos aprender?

Hoje você vai conhecer os primeiros conceitos do [***React***](https://github.com/facebook/react) {: .external-link target="_blank" rel="noreferrer noopener" }, os pilares sobre os quais a equipe do ***Facebook/Instagram*** o fez, assim como o motivo de essa tecnologia ter tido adoção tão massiva nos últimos anos.

Vamos ver o que diferencia ***React*** de ***JavaScript*** e depois vamos ver um pouco sobre classes. Ao final do dia vamos ter todas as informações para codar um componente básico em ***React***!

---

### Você será capaz de:

  * Saber a melhor forma para instalar um gerenciador de pacotes.

  * Inicializar um projeto em ***React***

  * Utilizar JSX no ***React***

  * Utilizar o `ReactDOM.render` para renderizar elementos numa página web.

  * Utilizar o `import` para usar código externo junto ao seu.

---

## Por que isso é importante?

Como dito anteriormente, o ***React*** é a principal biblioteca de construção de UI's atualmente.
Mas por quê? Quando falamos em ***React*** estamos geralmente nos referindo a todo o ecossistema que o envolve.

* React

* JSX

* ES6

* Webpack

* Flux/Redux

* axios/fetch

* Jest/Mocha

A lista acima mostra algumas das tecnologias que fazem parte desse ecossistema e que te permitem criar aplicações Web de alta qualidade.

Por razões óbvias, desenvolver uma aplicação Web sem biblioteca/framework alguma é um problema que coloca em risco a produtividade de um time. Mas isso significa que vamos utilizar qualquer coisa? Definitivamente não! A escolha do ***React*** para o nosso curso tem a ver com a sua adoção, estabilidade, oportunidades e potencial longevidade.

---

## Conteúdos

###### Tempo sugerido para realização: 80 minutos

<%= vimeo "455997601" %>

### Gerenciador de pacotes

Vamos lá, esse é um momento importante!
Agora você vai iniciar a sua jornada através da tecnologia, que, certamente, vai te apresentar para o mercado.

Aperte o cinto e dedique 100% do seu foco para aprender ***React*** de maneira _hardcore_. Você certamente não vai se arrepender!

Antes de tudo, veremos sobre o gerenciador de pacotes que utilizaremos durante o curso, que é o `npm`.

A primeira coisa a se saber é que `npm` é o gerenciador de pacotes em si, ou seja, ele é quem será utilizado para instalar os pacotes em nossas aplicações React, enquanto o `npx` executa o comando de um pacote sem instalá-lo em si.

Como o `create-react-app` é um pacote que a única coisa que faz é criar todos os arquivos necessários para termos um app React, não rodamos ele mais de uma vez por projeto, nem precisamos do pacote instalado em nossas máquinas, por isso **SEMPRE** executamos ele com o `npx` e não com o `npm`.

Antes de iniciarmos o conteúdo vamos testar se temos o `npm` e o `npx` funcionando corretamente? Para isso, vamos criar uma pasta, em qualquer lugar, e vamos acessá-la através do terminal. Uma vez que estamos dentro da pasta, no terminal, vamos executar o comando abaixo:

```language-bash
npx create-react-app testando-meu-computador
```


Em seguida acesse a pasta:

```language-bash
cd testando-meu-computador
```



 ⚠️ **Atenção** ⚠️

Caso tenha ocorrido algum erro, **verifique qual foi seu tipo de erro** e siga algum dos passos a seguir, caso contrário **pule essa parte** e siga para a parte **Continuando o teste**.

* Se seu problema foi com versionamento, siga para `Instalando o nvm`

* Se seu problema é ao digitar `npm start`, em geral esse erro ocorre porque existe uma pasta node_modules no diretório pai. Verifique se no erro ele indica um caminho parecido com /home/minhaPastaPessoal/node_modules/babel-jest, acesse a minhaPastaPessoal, delete a node_modules, acesse a pasta testando-meu-computador e rode o comando `npm start` novamente.


#### Instalando o nvm

**Atenção:** Só realize esse passo se você teve algum problema de versionamento ao rodar o comando do passo anterior. Caso contrário siga para `"Continuando o teste"`.

Para instalar o `nvm` vamos seguir quatro passos (o segundo é muito importante, **não deixe de fazer**!)

1) Primeiro vamos rodar o comando abaixo no terminal.

_Nota:_ Caso você utilize outro terminal que não seja o `bash`, troque, no comando, o `bash` pelo nome do terminal que está utilizando. Por exemplo, se você está usando o `zsh`, troque **bash** por **zsh**.

```language-bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

Para ficar mais evidente vamos ver como rodar o comando no `zsh` também:

```language-bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | zsh
```

2) Vamos fechar **TODAS** as abas abertas do terminal. Elas precisam ser fechadas para que o script do passo anterior seja carregado no terminal.

3) Agora vamos abrir novamente o terminal e rodar o comando abaixo. Esse comando retornará a versão do `nvm` que acabamos de instalar, como o da foto na sequência:

```language-bash
nvm --version
```

<%= figure(%{src: "/front-end/react/introduction/nvm-version.png", caption: "Imagem que mostra a versão do nvm instalada", width: "800em", heigh: "auto"}) %>

Caso apareça a mensagem listada abaixo, volte ao segundo passo e o faça corretamente, fechando **todas** as abas de terminal que estiverem abertas.

```language-bash
bash: command not found: nvm
```

4) Por fim, após todos os procedimentos bem sucedidos, vamos rodar o último comando:

```language-bash
nvm install node
```

Antes de seguir para a parte `"Continuando o teste"`, vamos rodar o comando abaixo, o mesmo que tinha dado erro antes, agora ele dará certo e poderemos prosseguir:

```language-bash
npx create-react-app testando-meu-computador
```

#### Continuando o teste

Após o `npx` terminar de executar, ele nos mostra um mini tutorial, em que teremos uma explicação sobre os principais comandos, como na foto abaixo.

<%= figure(%{src: "/front-end/react/introduction/npm-commands.png", caption: "Imagem que demonstra os comandos básicos do npm para usar o create-react-app", width: "800em", heigh: "auto"}) %>

Para finalizarmos os testes, vamos utilizar os comandos que estão sendo sugeridos no final do tutorial (certifique-se de que está dentro da pasta que rodou o comando `npx`):

```language-bash
$ npm start
```

Após o `npm start` terminar de carregar (pode demorar um pouco), ele irá abrir uma aba em seu navegador e você verá algo parecido com o exemplo abaixo, o que significa que tudo está funcionando corretamente.

<%= figure(%{src: "/front-end/react/introduction/all-done.png", caption: "Imagem que demonstra que tudo funciona corretamente, mostrada no navegador", width: "800em", heigh: "auto"}) %>

### Conceitos iniciais

Como dito anteriormente, o ***React*** é, atualmente, uma das principais bibliotecas `Javascript` para construção de interfaces de usuário. Esta poderosa ferramenta foi criada pelos times de desenvolvimento do **Facebook** com objetivo de organizar, componentizar e, consequentemente, tornar muito mais eficiente cada parte das aplicações que a utilizam.

A idéia principal é tornar possível dividir a sua aplicação em pequenos blocos, reutilizáveis ou não, que podem fazer a gestão das suas próprias informações através do seu estado, ou seja, reagir a eventos, interações, dados, etc. Toda vez que houver uma mudança em um componente, o **React** atua especificamente na renderização dele, sem que seja necessário atualizar os outros blocos.

A componentização permite ainda utilizar funções específicas, estilizações, testes e outras tecnologias no exato local em que ela será utilizada, permitindo que qualquer possível refatoração do código se torne simples, bem endereçada e fácil de se encontrar.

O exemplo mais prático de uma aplicação **React** é a própria [documentação](https://pt-br.reactjs.org/) dela. Além de ser possivel visualizar as principais componentizações, como header, menu lateral, conteúdo principal, barra lateral, submenus e footer, conseguimos acessar menus diferentes sem que a página recarregue. Super eficiente, certo? Existem diversas outras ferramentas, como o próprio Facebook e o Slido, que funcionam da mesma forma dinâmica.

Legal, não é mesmo? Vamos conhecer agora o ecossistema que envolve essa tecnologia, começando pelo `JSX`.

### JSX

O `JSX`, ou `Javascript Extension`, como o próprio nome sugere, é uma extensão de sintaxe para Javascript. Sua utilização é recomendada pela documentação do React, pois ela demonstra como a interface deverá se comportar, de forma lógica e descritiva.

Vamos ver um exemplo:

```jsx
const element = <h1>Hello, world!</h1>;
```

A construção de um elemento JSX é bem parecida com um elemento HTML, com pequenas diferenças para que não haja conflito do HTML com o JS. Um exemplo disso é a declaração de uma `class` no HTML, que é substituída por `className` no JSX, pois haveria conflito de sintaxe com as classes do JS.

Caso fossemos declarar a mesma variável sem o JSX, precisaríamos utilizar funções como o `createElement` que recebe como parâmetro um componente, um objeto com as `props` (veremos mais sobre elas nos próximos dias) e o conteúdo que será encapsulado por este componente. Seriam necessárias sequências relativamente longas de instruções de código para conseguirmos montar e manipular uma árvore de componentes. Para visualizarmos essa complexidade, vamos refazer o código acima sem o JSX:

```js
const element = React.createElement("h1", null, "Hello, world")
```

Agora imagine uma aplicação inteira sendo construída dessa forma. Ficaria muito mais difícil de ser compreendida, certo? O JSX encaixa-se perfeitamente para resolver este dilema.

É importante frisar que o uso do JSX em aplicações React não é obrigatório, mas a complexidade da construção de uma aplicação fica menor e o código fica mais intuitivo quando o utilizamos.

#### Incorporando expressões no JSX

Por ser um código Javascript, o JSX permite que se faça injeções de algoritmos dentro da estrutura HTML. Portanto, é possivel que se aplique diretamente na estrutura códigos que renderizarão outras diversas expressões, por exemplo:

```jsx
const nome = 'Jorge Maravilha';
const element = <h1>Hello, {nome}</h1>;
```

E se aprofundarmos um pouco mais chamando uma função na nossa constante element?

```jsx
function nomeCompleto (nome, sobrenome) {
  return `${nome} ${sobrenome}`;
}

const element = <h1>Hello, {nomeCompleto("Jorge", "Maravilha")}</h1>;
```

Agora, vamos incorporar a nossa constante `element` na função `helloWorld`, retornar um código JSX e encapsulá-la em uma `div`:

```jsx
function helloWorld (nome, sobrenome) {
  return <h1>Hello, {`${nome} ${sobrenome}`}</h1>;
}

const container = <div>{element}</div>;
```

Lembra que falamos sobre a substituição de `class` por `className` em JSX? Podemos também utilizar expressões `Javascript` para atribuir valor à este atributo.

```jsx
const nome = 'Jorge Maravilha';
const classe = 'hello-class';
const element = <h1 className={classe}>Hello, {nome}</h1>;
```

Bom demais, né?

Para fixar, crie um elemento JSX que recebe o valor "Hello, JSX" de uma constante chamada `textJSX`, e o incorpora em uma tag `h1`.

### ReactDOM.render

O `ReactDOM.render` é o responsável por renderizar e atualizar seu código dentro do ***HTML***, exibindo seus elementos `React`.

Todas as vezes que fizermos alguma alteração no código, seja através de uma função ou interação de quem usa, o React DOM compara o elemento novo e seus elementos filhos com os anteriores e aplica mudanças somente onde é necessário para levar a aplicação ao estado desejado. Vamos ver um exemplo:

```jsx
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(element, document.getElementById('root'));
}

setInterval(tick, 1000);
```

Neste exemplo, estamos chamando a função `tick` que chama o `ReactDOM.render` a cada segundo, e injeta no elemento pai com id `root` um 'Hello World' e o horário. Inspecionando o codigo em execução no navegador visualizamos o seguinte evento:

<%= figure(%{src: "/front-end/react/introduction/ReactDOM.gif", caption: "Imagem que demonstra que tudo funciona corretamente, mostrada no navegador", class: "rounded mx-auto d-block text-center", width: "300px", heigh: "auto"}) %>

Diferente de elementos DOM do navegador, elementos React são objetos simples e utilizam menos recursos. Pela atualização precisa do DOM, e pela sua composição, o React apresenta grandes avanços na velocidade de processamento. 

### CSS e Import

Você deve estar se perguntando: mas e como fica o CSS nesse contexto?

Não é nada muito diferente do que você já vem fazendo. Assim como fazia no `HTML` você deve criar um arquivo para manter todo o seu `CSS` e então deverá importá-lo onde você deseja utiliza-lo e colocar as `classes` e `ids` que você criou nos elementos da sua página. Para facilitar o entendimento veja o exemplo abaixo:

```language-css
/* App.css */
.App {
  background-color: #282c34;
  text-align: center;
}
```

```language-jsx
// App.js
import React from 'react';
import './App.css';

function App() {
  return (
    <div className='App'>
      <h1>APP</h1>
    </div>
  );
}

export default App;
```

Se quiser ver um exemplo maior da importação e utilização do `CSS` retorne ao app `testando-meu-computador` que você criou na seção de instalação, ao observar a estrutura você verá que não é nada muito diferente do que você já estava fazendo. Caso se queria se aprofundar mais na utilização do CSS no ***React*** e também no `import` utilizado no arquivo `App.js` vá até a seção de `Recursos adicionais` e dê uma olhada nas documentações sobre esses tópicos.

### Criação de componentes funcionais e de classe

Como dito acima, o React nos permite criar uma tela como uma junção de diferentes pequenas peças reutilizáveis e com lógica isolada - os componentes.

Esses componentes podem ser criados de duas formas: mediante funções ou com a criação de classes - uma das inovações trazidas pelo ES2015 (ES6). As classes surgiram como um "açúcar sintático" sobre funções, dando a possibilidade de criar novos objetos. Você pode se aprofundar mais nesses conceitos acessando a documentação oficial disponível na seção de `Recursos adicionais`.

### Métodos

Até o presente momento, você deve estar achando que uma classe e uma função são exatamente a mesma coisa, afinal, ambas recebem atributos e nós as chamamos em seguida. Porém, uma classe pode possuir `métodos`, que nada mais são do que ações que toda entidade criada a partir de uma classe pode realizar.

Podemos atribuir vários `métodos` - os quais podem, inclusive, alterar o próprio estado do objeto. Por enquanto, só precisamos saber que `métodos` existem e não precisamos nos preocupar, pois veremos com detalhes os `métodos de classe` mais adiante em `React`, junto com `estado da aplicação`.

Em `React`, classe é uma das formas de renderizar os componentes na página. Então quando um componente precisa ser alterado, utilizamos componentes de classe, para que possamos utilizar seus estados para realizar essas alterações. Mas não se preocupe, você verá isso em breve com muito mais detalhamento.

<%= vimeo "455999516" %>

### Classes e React

Talvez você já tenha percebido, mas a principal diferença entre o uso de componentes por classe e o uso de componentes por função reside no fato daqueles gerados por classe terem acesso a métodos e ao estado próprios de qualquer componente React gerado via classe, como o método `render()`, que te permite renderizar todo o conteúdo criado na tela, os quais são acessíveis somente por componentes criados por classe na maior parte das versões do React. A sintaxe para criar um componente com classes é a seguinte:

```language-jsx
import React from 'react';

class ReactClass extends React.Component {
  render() {
    return (
      <h1>My first React Class Component!</h1>
    )
  }
}
```

<%= vimeo "456001191" %>

Para fixar tudo o que você aprendeu siga os passos à seguir para criar o seu primeiro componente React de classe:

1. Crie um novo projeto utilizando `npx create-react-app nome-app`

  * ⚠️ **Substitua o `nome-app` pelo que você desejar para seu app** ⚠️

2. Na pasta `src`, acesse `App.js` e remova todo o seu conteúdo do função `App`, de modo que ela fique assim:

```language-jsx
    import React from 'react';
    import logo from './logo.svg';
    import './App.css';

    function App() {
      return ();
    }

    export default App;
```

3. Na pasta `src`, crie um arquivo chamado `Component.js` crie um componente que retorne um `<h1>` com o seu nome um paragráfo, `<p>`, com uma breve descrição sobre você.

  * Lembre-se, quando vamos retornar mais de um elemento é preciso que eles estejam dentro de um `<div>`.

4. Importe seu componente em `App.js` de modo que ele seja renderizado na tela quando a aplicação for iniciada, `npm start`.

  * Para isso você precisará utilizar o `export default` para exportar seu componente, o `export default` é sempre utilizado quando queremos exportar apenas um elemento de um arquivo, seja uma função, um componente ou uma variável. A penúltima linha do arquivo `Component.js` deverá ficar da seguinte forma:

```language-jsx
    export default Component;
```

5. Execute sua aplicação, `npm start`, e verifique se tudo ocorreu como o esperado. Ao finalizar esse exercício você terá feito o seu primeiro componente React de classe. Parabéns 🎉

### Conclusão

Vimos que `React` funciona mais ou menos como um monta-monta, você tem várias peças pequenas (os componentes) que são combinados para fazer uma tela completa.

Esses componentes podem ser componentes de função (que não podem alterar seus estados) e componentes de classe (que podem alterar seus estados).

Para alterar os estados dos componentes de classe, utilizamos os métodos, que vamos ver a sintaxe com detalhes mais adiante no curso.

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

Agora é hora de fazermos nosso primeiro App em ***React*** auuuuu! `Let's rule them all`!

O link estará disponível no Slack.

---

## Exercícios

###### Tempo sugerido para realização: 140 minutos

<%= versioning_your_code(@conn) %>

### Exercícios React

1. Crie um novo projeto utilizando `npx create-react-app nome-app` e acesse a pasta `nome-app`

  * ⚠️ **Substitua o `nome-app` pelo que você desejar para seu app** ⚠️

2. Crie uma lista de tarefas simples seguindo os passos abaixo:

  * insira a função a seguir acima do seu `App`:

```language-jsx
const task = (value) => {
  return (
    <li>{value}</li>
  );
}
```

  * agora, chame a função dentro do seu componente `App` (não se esqueça da sintaxe JSX!). Insira o valor que você quiser, salve a página e inicie-a rodando o comando `npm start`.

  * por fim, crie uma array de compromissos e use a função `map` para que cada item do array apareça, como um item de lista, no seu componente `App`.

3. Acesse [este link](https://www.freecodecamp.org/learn/front-end-libraries/react/) {: .external-link target="_blank" rel="noreferrer noopener" } e faça cada um dos exercícios em ordem, sendo o último o "Create a Component with Composition"

4. **Bônus** Por último, entenda como funciona o código [deste link](https://codepen.io/nathansebhastian/pen/qgOJKe) {: .external-link target="_blank" rel="noreferrer noopener" }. Adicione mais dois `cards` com descrição e link a sua escolha.

---

## Recursos adicionais (opcional)

* [As diferentes formas de utilizar CSS no ***React***](https://www.w3schools.com/react/react_css.asp) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Documentação Oficial - `Import`](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/import) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Documentação Oficial - Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Criando um app com consumo de `API` local utilizando ***React***](https://medium.com/better-programming/creating-a-simple-app-with-react-js-f6aa88998952) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Guia completo de React](https://tableless.com.br/guia-completo-react-ecossistema/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Pesquisa anual do _StackOverflow_ sobre frameworks mais amados, requisitados e odiados](https://insights.stackoverflow.com/survey/2019#technology-_-most-loved-dreaded-and-wanted-web-frameworks) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
