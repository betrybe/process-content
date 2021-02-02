## O que vamos fazer?

Hoje e os próximos dias serão de **projeto em grupo**!

O objetivo é colocar em prática os últimos conteúdos que você aprendeu aplicando todos eles em um único projeto!

Este será um projeto de refatoração e inclusão de novas features na aplicação, a partir do que foi desenvolvido por você no último projeto `Trybeer`. A refatoração inclui tanto o **back-end** quanto o **front-end**, e o **banco de dados** também! As features incluem a implementação de um chat dentre outras funcionalidades. Veja o `README` do projeto para mais detalhes.

---

## Por que isso é importante?

Até agora, na maioria dos projetos, escrevemos aplicações do zero, mas poucas vezes paramos para refatorar uma ou adicionar novas funcionalidades para torná-la mais robusta. E isso é super importante, pois é o trabalho diário de uma pessoa desenvolvedora de software.

Todo _sprint_ terá novos _bugs_ para serem corrigidos, fazendo com que, em alguns casos, haja refatoração de algum pedaço do sistema. Além dos bugs, um _sprint_ adiciona novas features, inclusas no produto pelo(a) _PM_ para que a experiência da pessoa usuária, utilizando o sistema, seja cada vez melhor.

---

## Especificação

###### Tempo sugerido para realização: 5 dias

### O que vamos avaliar?

- Aderência do código à especificação. Seu programa deve se comportar como especificado no repositório;

- Organização do seu código e a arquitetura geral da aplicação (tanto da API quando do front-end);

- Aderência à abordagem DDD;

- Aderência aos princípios SOLID;

- Cobertura de testes no back-end e no front-end. Seu código deve ser _testável_, e deve possuir uma suíte de testes robusta e com alta cobertura.

### O que devo desenvolver?

Você deverá passar a seguir a abordagem DDD no projeto `Trybeer` feito anteriormente por vocês. Além do _DDD_, o _Sequelize_ deve passar a ser utilizado. Um chat deve ser criado, utilizando _sockets_, dentre outras features de funcionalidades.

Terminada toda a parte em código da aplicação, você deve fazer o _deploy_ de sua aplicação através do `heroku` e utilizar o `PM2` como gerenciador de processo.

A aplicação continua sendo dividida em três partes, contendo a API e os dois front-end's. Porém, uma diferença que você irá reparar é que agora, além de utilizar o `MySQL`, você irá utilizar o `MongoDB`.

No repositório do projeto, você vai encontrar os requisitos e um link para o protótipo. Preste bastante atenção para incluir as novas funcionalidades de forma correta.

⚠️ Atenção para a **cobertura de testes**! É importante que cada funcionalidade desenvolvida tenha testes unitários para garantir uma boa cobertura de testes do projeto. Além disso, testes dão segurança na refatoração: se o projeto é bem testado, basta garantir que os testes continuam passando para se ter certeza de que tudo ainda funciona como deve!


---

## Entregáveis

Para entregar o projeto, o seu grupo deverá implementar as funcionalidades no repositório correspondente até a data-limite da avaliação.

Somente o código que estiver **mergeado na branch `master`** será considerado.

_Pull Requests_ que ainda estiverem abertos, bem como _commits_ feitos após o término da data-limite não serão considerados na avaliação.

O fluxo de trabalho para cada funcionalidade deve ser parecido com:

- Uma pessoa do grupo pega para si um card da lista de `To-do` do quadro de seu grupo;

- Abre-se uma branch para essa demanda. **Ela deve ser aberta a partir da branch master do repositório**;

- Feita a demanda, deve-se marcar o _Pull Request_ para `Code Review`. Ao menos outra pessoa do grupo deve revisar, sugerir alterações, melhorias e aprovar o _Pull Request_ para que a tarefa siga adiante;

- Uma vez aprovada, o _Pull Request_ deve ser _mergeado_ **na branch master**.

Consulte o **canal do Slack da turma** para obter o endereço do repositório do seu grupo.

##### Fique atento e siga as instruções no README.md do repositório! 🧐

Qualquer dúvida, procure a monitoria.


Lembre-se de que você pode consultar nosso conteúdo sobre [Git & GitHub](/fundamentals/git) sempre que quiser!

---

## Próximo

<%= next_button(@conn) %>
