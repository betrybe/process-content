## O que vamos aprender?

Hoje você vai aprender o que é o **NodeJS**, por que utilizá-lo e como criar um script simples com ele. Além disso, você também aprenderá sobre o sistema de módulos e sobre o **NPM**, que é o gerenciador de pacotes do **NodeJS**, e como podemos importar outros arquivos e módulos. Por último, você verá como inicializar um projeto **NodeJS** com o comando `npm init` e o que são os arquivos e pastas criados por esse comando.

---

### Você será capaz de:

- Utilizar os comandos do `npm` para criar e gerenciar pacotes e dependências;

- Utilizar o comando `node` para executar scripts;

- Utilizar o sistema de módulos do NodeJS;

- Criar scripts simples, com interação do usuário, com NodeJS.

---

## Por que isso é importante?

O conhecimento de NodeJS enquanto ferramenta tem sido cada vez mais valorizado.
Cada vez mais empresas vêm utilizando essa tecnologia para desenvolver suas aplicações back-end. Como resultado, a demanda por profissionais capacitados tem aumentado.

Não é à toa que a adoção do NodeJS como tecnologia back-end vem crescendo. O JavaScript, linguagem utilizada pela ferramenta, é extremamente versátil, simples e poderoso, permitindo uma curva de aprendizado relativamente menor que outras grandes linguagens de propósito semelhante disponíveis no mercado e, ao mesmo tempo, agrega grande valor a quem a utiliza.

Sendo assim, o conhecimento da correta utilização do NodeJS torna-se de extrema importância para pessoas que buscam fazer parte do mercado do desenvolvimento web moderno.

---

## Conteúdo

###### Tempo sugerido para realização: 80 minutos

### O que é NodeJS?

Como dito anteriormente, o NodeJS surgiu do V8, que é a ferramenta do Google Chrome responsável por ler e executar as instruções que escrevemos em JavaScript, processo comumente chamado de *interpretar* o código. Ao software responsável por interpretar o código, dá-se o nome de **interpretador**, **engine** e, por vezes, de **runtime**. Por isso, é comum dizer que o NodeJS é um *runtime* JavaScript.

Apesar de ser baseado no V8, o NodeJS possui algumas diferenças em relação ao interpretador que funciona nos navegadores. Dentre elas, as principais são a ausência de métodos para manipulação de páginas web e a presença de métodos que permitem acessar o sistema de arquivos e a rede de forma mais direta.

### Por que usar NodeJS

##### Ele está por toda a parte

Como dito anteriormente, o uso do NodeJS pelo mercado de tecnologia vem crescendo muito nos últimos anos. Dados do site [ModuleCounts.com](https://modulecounts.com) {: .external-link target="_blank" rel="noreferrer noopener" } mostram que, atualmente, o `npm`, que é onde os pacotes NodeJS são disponibilizados, é o repositório com mais pacotes quando comparado a repositórios de outras grandes linguagens, como mostra o gráfico abaixo:

<%= figure(%{src: "/back-end/nodejs/images/modulecounts.png", caption: "Gráfico extraído no dia 2 de Fevereiro de 2020, mostrando a quantidade de pacotes em vários repositórios.", class: "text-center"}) %>

Ter muitos pacotes publicados no repositório atual nos dá uma ideia de duas grandes vantagens que o NodeJS tem sobre tecnologias concorrentes: uma comunidade extremamente ativa e uma grande quantidade de ferramentas para resolver os mais diversos tipos de problema.

**Curiosidade**: Existe um *drinking game* no qual o desafio é escolher uma palavra do dicionário em inglês, buscar um pacote no `npm` com aquela palavra e, se tal pacote existir, todos bebem. As chances de encontrar os pacotes são altíssimas, tamanha a quantidade de bibliotecas existente no repositório.

##### Performance

Quando comparado a outras grandes tecnologias, NodeJS nos permite escrever softwares servidores de requisições HTTP de forma muito mais eficiente. Isso se dá pelo fato de que toda leitura e escrita que ele realiza, tanto no disco quanto na rede, é feita de forma **não bloqueante**. Ou seja, quando o servidor recebe uma requisição e precisa, por exemplo, buscar dados no banco de dados, as demais requisições não precisam esperar que a primeira termine para que possam ser atendidas. Em outras palavras, o NodeJS realiza todas as suas operações de entrada e saída de dados de forma **assíncrona**, utilizando processamento concorrente (veremos mais sobre fluxo assíncrono nos próximos dias).

Por serem mais eficientes e otimizadas que outras tecnologias, as aplicações feitas em NodeJS acabam por consumir menos recursos dos servidores que as executam, tornando-o, assim, uma tecnologia, em geral, mais barata que seus concorrentes.

##### Aplicações em tempo real

A natureza não-bloqueante do NodeJS permite que alguns recursos sejam implementados na plataforma para facilitar o trabalho com operações em tempo real.

Bibliotecas como o [socket.io](https://socket.io) {: .external-link target="_blank" rel="noreferrer noopener" } permitem que, com poucas linhas de código, aplicações em tempo real relativamente complexas (como chats com suporte a múltiplos usuários, conversas privadas e em grupo e outros recursos) sejam criadas por completo.

Num mundo em que a tecnologia está cada vez mais inserida em diversas áreas, ter suporte nativo da plataforma que utilizamos para aplicações em tempo real com certeza é muito bem vindo.

##### JavaScript

Muitas das vantagens do NodeJS vêm do fato de que a linguagem executada por ele é o JavaScript.

Como já falamos antes, o JavaScript tem se mostrado uma linguagem extremamente versátil, estando presente em diversos ambientes, como a Web, Desktop, Mobile, dispositivos IoT (internet das coisas) e, até mesmo, em aparelhos televisores!

A versatilidade e baixa curva de aprendizado do JavaScript conferem ao Node um poder incrível para resolver as mais diversas situações.

##### Então NodeJS é a melhor tecnologia para tudo?

Esses são alguns dos motivos pelos quais o NodeJS é a ferramenta ideal para vários tipos de projeto. No entanto, é importante lembrar que não existe *bala de prata* quando o assunto é tecnologia: a melhor ferramenta **sempre** depende do caso de uso e dos recursos disponíveis para desempenhar uma determinada tarefa.

### Sistema de módulos

Já citamos acima que uma das grandes vantagens do NodeJS é a grande quantidade de pacotes e bibliotecas disponíveis publicamente no `npm`; agora chegou a hora de aprendermos o que é um pacote Node e como podemos utilizá-los no nosso código.

Pra começar, vamos entender o que é um módulo em NodeJS: um módulo é um "pedaço de código" que pode ser organizado em um ou mais arquivos, e que possui escopo próprio, ou seja: suas variáveis, funções, classes e afins só estão disponíveis nos arquivos que fazem parte daquele módulo. Em outras palavras, um módulo é uma funcionalidade ou um conjunto delas que se encontram isoladas do restante do código.

O NodeJS possui três tipos de módulos: internos, locais e de terceiros.

##### Módulos internos

Os módulos internos (ou _core modules_) são inclusos no NodeJS e instalados junto com ele quando baixamos o *runtime*. Alguns exemplos de core modules são:

**Clique no nome de cada módulo para abrir a documentação oficial (em inglês).**

- [`fs`](https://nodejs.org/api/fs.html) {: .external-link target="_blank" rel="noreferrer noopener" }: Fornece uma API para interagir com o sistema de arquivos de forma geral;

- [`url`](https://nodejs.org/api/url.html) {: .external-link target="_blank" rel="noreferrer noopener" }: Provê utilitários para ler e manipular URLs;

- [`querystring`](https://nodejs.org/api/querystring.html) {: .external-link target="_blank" rel="noreferrer noopener" }: Disponibiliza ferramentas para leitura e manipulação de parâmetros de URLs;

- [`util`](https://nodejs.org/api/util.html) {: .external-link target="_blank" rel="noreferrer noopener" }: Oferece ferramentas e funcionalidades comumente úteis aos programadores.

##### Módulos locais

Módulos locais são aqueles definidos juntamente à nossa aplicação. Representam funcionalidades ou partes do nosso programa que foram separados em arquivos diferentes.

Módulos locais podem ser publicados no `npm` para que outras pessoas possam baixá-los e utilizá-los, o que nos leva ao nosso próximo e último tipo de módulo.

##### Módulos de terceiros

Módulos de terceiros são aqueles criados por outras pessoas e disponibilizados para uso através do `npm`. Como dito anteriormente, nós também podemos criar e publicar nossos próprios módulos,
quer seja para utilizarmos em diversas aplicações diferentes, ou para permitir que outras pessoas os utilizem. Veremos como fazer isso ainda hoje.

### Importando módulos

Quando queremos utilizar um módulo ou pacote externo ao arquivo em que estamos no NodeJS, precisamos **importar** esse módulo / pacote para o contexto atual no qual estamos.

Existem dois padrões de módulos utilizados no back-end:

- Módulos **ES6**;

- Módulos **CommonJS**.

##### ES6

O nome ES6 vem de ECMAScript 6, que é a especificação seguida pelo JavaScript.

Na especificação do ECMAScript 6, os módulos são importados utilizando a palavra-chave `import`, tendo como contrapartida a palavra-chave `export` para exportá-los.

Exemplos:

- Importando um módulo:

```language-javascript
import meuModulo from './meuModulo';

meuModulo.fazerAlgo();
```

- Exportando um módulo:

```language-javascript
export function fazerAlgo () {
  console.log('fazendo');
}

export default { fazerAlgo };
```

Note o uso das palavras-chaves `export default` e o uso da palavra-chave `export` antes da declaração da função.

Ao primeiro caso, que utiliza apenas `export`, damos o nome de **named export**, ou seja, um export que possui um nome. Named exports nos permitem importar apenas parte do módulo, e não ele como um todo. Por exemplo:

```language-javascript
import { fazerAlgo } from './meuModulo';

// Ao segundo caso, que utiliza o `export default`, damos o nome de **default export** (hehe 😁). Ele é o que será carregado quando importarmos um módulo utilizando apenas o nome que queremos atribuir a ele, conforme visto no primeiro exemplo.

fazerAlgo();
```

O NodeJS não possui suporte a módulos ES6 por padrão, sendo necessário o uso de [transpiladores,](https://scotch.io/tutorials/javascript-transpilers-what-they-are-why-we-need-them) {: .external-link target="_blank" rel="noreferrer noopener" } como o [Babel,](https://babeljs.io/) {: .external-link target="_blank" rel="noreferrer noopener" } ou supersets da linguagem, como o [TypeScript,](https://www.typescriptlang.org/) {: .external-link target="_blank" rel="noreferrer noopener" } para que esse recurso esteja disponível.

Para saber mais sobre módulos ES6, dê uma olhada nos recursos adicionais.

##### CommonJS

O CommonJS é o sistema de módulos implementado pelo NodeJS nativamente e, portanto, o sistema que utilizaremos daqui pra frente.

Para importar um módulo CommonJS, utilizamos a função `require`. O `require` procura pelo pacote informado e carrega seu conteúdo, retornando o(s) módulo(s) exportado(s) por ele. Para que isso aconteça, é necessário informarmos o nome do pacote para a função `require`.

Você verá, a seguir, como utilizar o `require` para importar cada tipo de módulo.

##### Módulos internos

Para utilizarmos um módulo interno, devemos passar o nome do pacote como parâmetro para a função `require`. Por exemplo, `require('fs')` importa o pacote responsável pelo sistema de arquivos.

Uma vez que importamos um pacote, podemos utilizá-lo no nosso código como uma variável, mais ou menos assim:

```language-javascript
const fs = require('fs');

fs.readFileSync('./meuArquivo.txt');
```

Repare que o nome da variável pode ser qualquer um que escolhermos; o que importa mesmo é o nome do pacote que passamos como parâmetro para o `require`.

##### Módulos locais

Quando queremos importar um módulo local, precisamos passar para o require o caminho do módulo, seguindo a mesma assinatura. Por exemplo, `require('./meuModulo')`. Note que a extensão (`.js`) não é necessária, uma vez que o Node já procura, por padrão, por arquivos terminados em `.js` ou `.json` e os considera como módulos.

Além de importarmos um arquivo como módulo, podemos importar uma pasta. Isso é útil pois, muitas vezes, um módulo está dividido em vários arquivos, mas desejamos importar todas as suas funcionalidades de uma vez só. Nesse caso, a pasta precisa conter um arquivo chamado `index.js`, que importa cada um dos arquivos do módulo e os exporta da forma mais conveniente.

Por exemplo:

```language-javascript
// meuModulo/funcionalidade-1.js

module.exports = function () {
  console.log('funcionalidade1');
}
```

```language-javascript
// meuModulo/funcionalidade-2.js

module.exports = function () {
  console.log('funcionalidade2');
}
```

```language-javascript
// meuModulo/index.js
const funcionalidade1 = require('./funcionalidade-1');
const funcionalidade2 = require('./funcionalidade-2');

module.exports = { funcionalidade1, funcionalidade2 };
```

Note como utilizamos as palavras-chaves `module.exports`. Como vimos anteriormente, um módulo possui um escopo isolado, ou seja, suas funções, variáveis, classes e demais definições existem somente dentro do módulo. O `module.exports` nos permite definir quais desses "objetos" internos ao módulo serão **exportados**, ou seja, serão acessíveis a arquivos que importarem aquele módulo. O `module.exports` pode receber qualquer valor válido em JavaScript, incluindo objetos, classes, funções e afins. No exemplo acima, isso quer dizer que, quando importarmos o módulo `meuModulo`, teremos um objeto contendo duas propriedades, que são as funcionalidades que exportamos dentro de `meuModulo/index.js`.

Para importarmos e utilizarmos o módulo `meuModulo`, basta passar o caminho da pasta como argumento para a função `require`, assim:

```language-javascript
// minha-aplicacao/index.js

const meuModulo = require('./meuModulo');

console.log(meuModulo); // { funcionalidade1: [Function: funcionalidade1], funcionalidade2: [Function: funcionalidade2] }

meuModulo.funcionalidade1();
```

##### Módulos de terceiros

Módulos de terceiros são importados da mesma forma que os módulos internos: passando seu nome como parâmetro para a função `require`. A diferença é que, como esses módulos não são inclusos junto com o NodeJS, precisamos primeiro instalá-los na pasta do projeto em que queremos utilizá-los. O registro oficial do NodeJS, onde milhares de pacotes estão disponíveis para serem instalados é o `npm`. Além disso, `npm` também é o nome da ferramenta de linha de comando (CLI - _command line interface_) responsável por baixar e instalar esses pacotes. O CLI `npm` é instalado juntamente com o NodeJS.

Quando importamos um módulo que não é nativo do NodeJS em um arquivo local, o Node inicia uma busca por esse módulo. Essa busca acontece na pasta `node_modules`. Caso um módulo não seja encontrado na `node_modules` mais próxima do arquivo que o chamou, o Node procurará por uma pasta `node_modules` na pasta que contém a pasta atual. Caso encontrado, o módulo é carregado. Do contrário, o processo é repetido em um nível de pasta acima. Isso acontece até que o módulo seja encontrado, ou até que uma pasta `node_modules` não exista no local em que o Node está procurando.

### NPM

O `npm` (sigla para *Node Package Manager*) é, como dito no tópico anterior, o repositório oficial para publicação de pacotes NodeJS. É para ele que realizamos upload dos arquivos de nosso pacote quando queremos disponibilizá-lo para uso de outras pessoas ou em diversos projetos. Atualmente, uma média de 659 pacotes são publicados no `npm` todos os dias, segundo o site [ModuleCounts.com](https://modulecounts.com) {: .external-link target="_blank" rel="noreferrer noopener" }

Um pacote é um conjunto de arquivos que exportam um ou mais módulos Node. Nem todo pacote Node é uma biblioteca, visto que uma API desenvolvida em Node também tem um pacote.

Você entenderá mais sobre o que compõe um pacote mais à frente.

##### Utilizando o CLI do `npm`

O CLI do `npm` é uma ferramenta oficial que nos auxilia no gerenciamento de pacotes, sejam esses pacotes dependências da nossa aplicação ou nossos próprios pacotes. É através dele que criamos um projeto, instalamos e removemos pacotes, publicamos e gerenciamos versões dos nossos próprios pacotes. Publicar um pacote público no `npm` é gratuito e não há um limite de pacotes que se pode publicar. Existem, no entanto, taxas de assinaturas, caso desejemos hospedar pacotes de forma privada, ou seja, pacotes sob os quais só nós temos o controle de acesso.

Para entender melhor o `npm` e seu uso na prática, assista ao vídeo a seguir:

<%= vimeo "412829366" %>

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

Agora que já passamos pelos conceitos mais básicos, está na hora de arregaçarmos as mangas e colocarmos a mão na massa com a nossa aula ao vivo!

Bora pro slack, onde o link estará disponível. 😉

---

## Exercícios

###### Tempo sugerido para realização: 80 minutos

<%= versioning_your_code(@conn) %>

---

### Agora a prática

Agora vamos juntar tudo o que aprendemos até aqui e criar mais um script.

1. O script deve calcular o [IMC](https://pt.wikipedia.org/wiki/%C3%8Dndice_de_massa_corporal) {: .external-link target="_blank" rel="noreferrer noopener" } de uma pessoa e exibi-lo na tela. Crie um novo pacote chamado `calcula-imc`, e utilize o [script `start`](https://docs.npmjs.com/cli/start) {: .external-link target="_blank" rel="noreferrer noopener" } do npm para executar nosso arquivo `index.js`. Siga utilizando o pacote `readline-sync` para coletar os dados do usuário. A fórmula para cálculo do IMC é `peso / altura²`.

    **Observação**: Lembre-se que peso e altura não são sempre números inteiros e, portanto, não podemos utilizar a função `questionInt` do pacote `readline-sync`. No entanto, o mesmo pacote possui uma função para tratar números com casas decimais. Encontre essa função na documentação do `readline-sync` e não se esqueça de utilizar o `toFixed(2)` nos números decimais!

    **Dica:** Para utilizar o `npm start`, lembre-se de configurar seu **package.json**, adicionando a seus scripts um `start: "node index.js"`, por exemplo. Nesse exemplo, o `index.js` representa o arquivo `main` do seu **package.json**.

2. Agora, modifique o script acima para que ele informe se a pessoa, cujo IMC foi calculado, possui algum nível de obesidade. Considere a seguinte tabela para saber qual situação deve ser apresentada para cada resultado:

    |        IMC                                |          Situação         |
    | ----------------------------------------- | ------------------------- |
    | Abaixo de 18,5                            | Abaixo do peso (magreza)  |
    | Entre 18,5 e 24,9&nbsp;&nbsp;&nbsp;&nbsp; |        Peso normal        |
    | Entre 25,0 e 29,9                         | Acima do peso (sobrepeso) |
    | Entre 30,0 e 34,9                         |      Obesidade grau I     |
    | Entre 35,0 e 39,9                         |     Obesidade grau II     |
    | 40,0 e acima                              |  Obesidade graus III e IV |

3. Por último, modifique o script do exercício anteriror para que ele utilize o pacote [inquirer](https://npmjs.com/package/inquirer) {: .external-link target="_blank" rel="noreferrer noopener" } para solicitar as informações ao usuário no terminal. Para entender como utilizar o `inquirer`, consulte a documentação no site do `npm`. Além disso, você pode precisar relembrar o que já aprendemos sobre Promises em [outra aula](https://app.betrybe.com/course/fundamentals/js-asynchronous/promises/conteudos/promises) {: .external-link target="_blank" rel="noreferrer noopener" }


    **Observação**: Utilize a propriedade `validate` das perguntas do inquirer para verificar se os valores digitados são números válidos.

### Bônus

1. Crie um script que, utilizando recursão, realize o [fatorial](https://matematicabasica.net/fatorial/) {: .external-link target="_blank" rel="noreferrer noopener" } de um número `n`.
   1. Utilize o pacote `inquirer` para solicitar o valor de `n` ao usuário;
   2. Utilize a propriedade `validate` do inquirer para validar o valor informado para `n`. A função de validação deve utilizar outras duas funções para garantir que `n` atenda às condições abaixo:
      1. Ser um número;
      2. Ser um inteiro.
    3. Lembre-se de converter o valor retornado pelo inquirer para inteiro utilizando `parseInt()`. Não esqueça de informar a **base 10** como segundo parâmetro.

2. Crie um script que, sem utilizar recursão, exiba o valor dos `n` primeiros elementos da [sequência de fibonacci](https://super.abril.com.br/mundo-estranho/o-que-e-a-sequencia-de-fibonacci/) {: .external-link target="_blank" rel="noreferrer noopener" }.
   1. Não imprima o valor `0`, uma vez que ele não está incluso na sequência;
   2. Quando `n = 10`, exatamente 10 elementos devem ser exibidos;
   3. Utilize o pacote `inquirer` para solicitar o valor de `n` ao usuário;
   4. Utilize a propriedade `validate` do inquirer para validar o valor informado para `n`. A função de validação deve utilizar outras duas funções para garantir que `n` atenda às condições abaixo:
      1. Ser um número;
      2. Ser um inteiro.
   5. Lembre-se de converter o valor retornado pelo inquirer para inteiro utilizando `parseInt()`. Não esqueça de informar a **base 10** como segundo parâmetro.

---

## Recursos Adicionais (opcional)

* [Documentação oficial do NodeJS](https://nodejs.org/en/docs/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Documentação oficial do NPM](https://docs.npmjs.com) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Vídeo: Node.js // Dicionário do Programador](https://www.youtube.com/watch?v=vYekSMBCCiM&t=426s) {: .external-link target="_blank" rel="noreferrer noopener" }

* [O guia completo do package.json do Node.js](https://www.luiztools.com.br/post/o-guia-completo-do-package-json-do-node-js/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Tudo que você queria saber sobre o package-lock.json mas estava com vergonha de perguntar](https://medium.com/trainingcenter/tudo-que-você-queria-saber-sobre-o-package-lock-json-mas-estava-com-vergonha-de-perguntar-e70589f2855f) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Entendendo módulos ES6](https://medium.com/trainingcenter/entendendo-módulos-no-javascript-73bce1d64dbf) {: .external-link target="_blank" rel="noreferrer noopener" }

* [JavaScript Transpilers: What They Are & Why We Need Them](https://scotch.io/tutorials/javascript-transpilers-what-they-are-why-we-need-them) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
