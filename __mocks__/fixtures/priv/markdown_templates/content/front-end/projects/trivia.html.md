## O que vamos fazer?

Hoje e os próximos dias serão de **projeto em grupo**! O objetivo é colocar em prática tudo o que você aprendeu sobre _React e Redux ⚛️_ até aqui, enquanto pratica a organização de um projeto em equipe com a metodologia agile **Kanban**.

---

## Por que isso é importante?

Projetos raramente são individuais. Eles são sempre o resultado do esforço conjunto de um time que precisa gerenciar demandas mais e menos prioritárias, que dependem umas das outras para entregar um produto rápido e bem feito.

Além disso, projetos muitas vezes não chegam organizados e guiados para fazermos. Cabe a quem programa tomar decisões técnicas e organizar a arquitetura dos componentes e do código como um todo para ter um projeto legível, fácil de manter e expandir.

---

## Especificação

###### Tempo sugerido para realização: 5 dias

### O que vamos avaliar?

* Aderência do código à especificação. Seu programa deve se comportar como especificado na próxima seção.

* Organização do seu código. Quebre seu site em componentes. Prefira componentes pequenos, simples e bem definidos a componentes grandes e complexos.

* Cobertura de testes. Seu código deve ser _testável_, e deve possuir uma suite de testes robusta e com alta cobertura.

### O que devo desenvolver?

Você deverá desenvolver um jogo de perguntas e respostas baseado no jogo Trivia, parecido um show do milhão americano, utilizando React e Redux.

O app começa com uma tela onde a pessoa que joga coloca seu nome e seu e-mail. O e-mail será usado para buscar a foto associada no site Gravatar, se houver.

Logo após, ela é redirecionada para o jogo onde deve escolher uma das respostas disponíveis para cada uma das perguntas. A resposta deve ser marcada antes de o contador de tempo chegar a zero, caso contrário a resposta deve ser considerada como errada.

Cada acerto dá à pessoa que joga pontos que deverão ser computados num placar no header da aplicação. Após 5 perguntas respondidas, a pessoa que joga é redirecionada para uma tela de score, onde o texto mostrado vai depender do número de acertos. No final de cada jogo, a pessoa que joga pode acessar o ranking com as melhores pontuações.

A pessoa que joga pode configurar algumas opções para o jogo em uma tela de configurações acessível a partir do header do app.

As demandas devem ser feitas em paralelo, quando possível, pelas pessoas do grupo. Dividam-se em pares ou façam individualmente as demandas. **Caso contrário, não haverá tempo hábil para terminar o trabalho!** Separar as tarefas entre as pessoas do grupo com cuidado e combinar a arquitetura do projeto com antecedência será essencial para o bom andamento do trabalho!

⚠️ Atenção para a **cobertura de testes**! É importante que cada funcionalidade desenvolvida tenha testes unitários para garantir uma boa cobertura de testes do projeto.

Separamos algumas **dicas**, caso você precise, para te auxiliar no desenvolvimento:

- [Como se organizar para estruturar um projeto React?](https://pt-br.reactjs.org/docs/thinking-in-react.html) {: .external-link target="_blank" rel="noreferrer noopener" }
- [Como posso estruturar os testes unitários do projeto?](https://pt-br.reactjs.org/docs/testing-recipes.html) {: .external-link target="_blank" rel="noreferrer noopener" }
- [O que é o Kanban?](/agile)
- [Como utilizar o ***Projects*** do Github para nos auxiliar no Kanban?](https://help.github.com/pt/github/managing-your-work-on-github/about-project-boards) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Entregáveis

Para entregar o projeto, o seu grupo deverá implementar as funcionalidades no repositório correspondente até a data-limite da avaliação.

Somente o código que estiver **mergeado na branch `master`** será considerado.

_Pull Requests_ que ainda estiverem abertos, bem como _commits_ feitos após o término da data-limite, não serão considerados na avaliação.

O fluxo de trabalho para cada funcionalidade deve ser parecido com:

- Uma pessoa do grupo pega para si um card da lista de `To-do` do quadro do seu grupo.

- Abre-se uma branch para essa demanda. **Ela deve ser aberta a partir da branch master do repositório**.

- Feita a demanda, deve-se marcar o _Pull Request_ para Code Review. Ao menos duas pessoas do grupo devem revisar, sugerir alterações e melhorias e aprovar a _Pull Request_ para ela poder seguir adiante.

- Uma vez aprovada, a _Pull Request_ deve ser _mergeada_ **na branch master**.

Consulte o **canal do Slack da turma** para obter o endereço do repositório do seu grupo.

##### Fique atento e siga as instruções no README.md do repositório! 🧐

Qualquer dúvida, procure a monitoria.

Lembre-se: você pode consultar nosso conteúdo sobre [Git & GitHub](/fundamentals/git) sempre que quiser!

---

## Próximo

Depois deste projeto incrível, você vai aprender sobre algumas das mais recentes _(e incríveis)_ funcionalidades do React! 🤩

<%= next_button(@conn) %>

---
