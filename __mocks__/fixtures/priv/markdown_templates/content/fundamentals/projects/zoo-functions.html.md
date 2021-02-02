## O que vamos fazer?

Você irá simular um sistema de relatório de um zoológico. O sistema possui informações a respeito dos animais presentes no zoológico, colaboradores, horários de funcionamento e uma tabela de preços que varia de acordo com a idade das pessoas que o visitam.

Você desenvolverá um conjunto de funções capazes de recuperar vários tipos de informações acerca do zoológico e de seu funcionamento, utilizando os conceitos de ***JavaScript*** que aprendeu nesta semana.

---

## Por que isso é importante?

Nos últimos blocos, você expandiu bastante seus conhecimentos em ***JavaScript***. Você aprendeu:

   * A utilizar novas funcionalides do *ES6*, como `arrow functions`, `template literals`, `spread operator`, `parâmetro rest` e `object destructuring`;

   * A compor objetos e ler suas informações com diferentes métodos;

   * A manipular arrays com funções como `map`, `filter` e `reduce`.

Agora você colocará em prática todo esse aprendizado, implementando um conjunto de funções para recuperar informações de um zoológico. Além de poder exercitar, em conjunto, todas as novas habilidades que você adquiriu durante a semana, é importante que você se acostume a resolver problemas mais complexos, semelhantes aos que encontrará no seu dia a dia de desenvolvimento.

Além disso, você perceberá que os testes do seu código são automáticos e já estão feitos. Essa técnica de escrever os testes de uma funcionalidade antes mesmo de implementá-la é conhecida como _TDD - Test Driven Development_, e traz vários benefícios ao desenvolvimento de software.

---

## Especificação

###### Tempo sugerido para realização: 2 dias

### O que vamos avaliar?

* Aderência do código à especificação. Seu programa deve se comportar como especificado na próxima seção.

* Organização do seu código. Quebre seu código em funções. Prefira funções pequenas, simples e bem definidas a funções grandes e complexas.

### O que devo desenvolver?

O arquivo `src/zoo.js` contido no repositório do projeto contém a *assinatura* (nome e parâmetros recebidos) de todas as funções que você precisa implementar. Você deve completar essas funções de modo que todos os testes contidos no arquivo `src/zoo.test.js` passem sem erros, de forma análoga ao que vem fazendo nos exercícios diários.

Os requisitos obrigatórios do projeto estão listados abaixo:

* Todos os *asserts* contidos no diretório `tests` devem ser executados sem erros. Isso garantirá que suas funções estão corretas. Você pode executar esses arquivos abrindo-os no _Visual Studio Code_, clicando no código com o botão direito e escolhendo a opção `Run Code` ou, de forma alternativa, digitando no terminal o comando `node test/arquivo.test.js`.

* Todos os problemas apontados pelo [Code Climate](https://docs.codeclimate.com/docs) {: .external-link target="_blank" rel="noreferrer noopener" } devem ser adereçados antes de seu _Pull Request_ ser colocado em **_Code Review_**.

* Seu código deverá conter, **ao menos uma vez**, cada um dos conceitos de **JavaScript** aprendidos nesta semana, listados a seguir. Você pode escolher onde e como utilizar cada conceito, desde que esteja no contexto apropriado. Por exemplo, você não deve utilizar `let` para declarar uma constante, ou utilizar `default params` em uma função que nunca o utilizará. Dessa forma, você estará demonstrando seu domínio sobre os conceitos aprendidos nesta semana.

   * `let`;
   * `const`;
   * `arrow functions`;
   * `template literals`;
   * `spread operator`;
   * `parâmetro rest`;
   * `object destructuring`;
   * `array destructuring`;
   * `default destructuring`;
   * `abbreviation object literal`;
   * `default params`;
   * `higher order functions`;

---

## Entregáveis

Para entregar o seu projeto, você deverá criar um _Pull Request_ para um repositório no **GitHub**. Consulte o **canal do Slack da turma** para obter o endereço do repositório.

Este _Pull Request_ deverá conter a implementação das funções contidas no diretório `src`.

Caso julgue necessário, você poderá criar outros arquivos ou funções auxiliares, mas não deverá remover/alterar **nenhum** *assert* contido nos arquivos de teste dentro da pasta `test`. Se quiser, poderá **adicionar** *asserts*, mas lembre-se de que seu código deve passar em todos para ser considerado correto.

##### Fique atento e siga as instruções no README.md do repositório! 🥺

Qualquer dúvida procure a monitoria.

Lembre-se de que você pode consultar nosso conteúdo sobre [Git & GitHub](/fundamentals/git) sempre que quiser!

---

## Recursos adicionais

  * [Uma introdução ao TDD](https://www.devmedia.com.br/test-driven-development-tdd-simples-e-pratico/18533) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>

---
