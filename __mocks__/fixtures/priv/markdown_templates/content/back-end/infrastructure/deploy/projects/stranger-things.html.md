## O que vamos fazer?

Nesse bloco, você aprender como fazer deploy de suas aplicações no `Heroku` e como manter e aproveitar melhor os recursos de nossos servidores com o `PM2`. Agora, você vai configurar e fazer o `deploy` de um projeto utilizando esses conhecimentos.

Dessa forma, você reforçará vários conceitos que aprendemos. Verá na prática como é preparar uma aplicação para seu deploy e colocá-la no ar.

---

## Por que isso é importante?

Como vimos durante as últimas aulas, é fundamental saber como funciona o processo de deploy.

Durante a fase de desenvolvimento de uma aplicação, devemos nos preocupar em tornar nossa aplicação preparada para ser publicada. Por exemplo, podemos deixar "portas" ou outros comportamentos parametrizáveis e definir os processos para rodá-las.

Apesar de ser comum haver pessoas especialistas na área de operações e infraestrutura no time, é importante que ambas as partes consigam se comunicar e ajudar. Dessa forma, o time torna-se mais eficiente.

Além dos pontos apresentados acima, também queremos ser capazes de desenvolver e colocar no ar nossas próprias aplicações. Para isso, saber o processo de deploy é fundamental, pois ele é uma parte importante do ciclo de vida de uma aplicação.

---

## Especificação

###### Tempo sugerido para realização: 2 dias

### O que vamos avaliar?

- Os arquivos de específicações deverão especificar exatamente as configurações pedidas;

- Os códigos deverão ser adaptados conforme proposto;

- A organização e a aderência do código à especificação. Existem dois projetos-base que deverão ser atualizados, um front-end e outro back-end, seguindo seus padrões;

- Os arquivos README.md deverão conter os comandos e os passo a passos para realizar os deploys, de acordo com o que foi solicitado na especificação;

- Todas as adaptações e configurações deverão ser funcionais, de maneira a agir conforme o esperado.

### O que devo desenvolver?

Este trabalho será individual.

Conforme dito anteriormente, existem dois projetos-base que deverão ser atualizados. Um projeto consiste em uma API que traz uma lista com os personagens da série _Stranger Things_. O outro projeto é um front-end que exibe as informações retornadas pela API em uma tabela, fornecendo também um campo para filtrar pelo nome dos personagens.

Você deverá adaptar e configurar esses projetos-base (front-end e back-end) para ser feito o deploy no `Heroku`. Você vai utilizar, também, o `PM2` para gerenciar e monitorar os processos.

Além disso, você terá que parametrizar algumas configurações através de variáveis de ambientes, além de configurar a comunicação entre back-end e front-end, utilizando multiambientes.

Leia o arquivo `README.md` do projeto principal com atenção para uma explicação detalhada de como desenvolver e entregar seu projeto.

---

## Entregáveis

Para entregar o seu projeto, você deverá criar dois _Pull Requests_ para os repositórios de back-end e front-end no **GitHub**. Consulte o **canal do Slack da turma** para obter os endereços dos repositórios.

Esses _Pull Requests_ deverão conter os projetos com o back-end e o front-end alterados, com os seus respectivos arquivos de configurações e READMEs alterados, conforme proposto **no `README.md` do projeto principal**.

##### Fique atento e siga as instruções no README.md do repositório do projeto principal! 🥺

Qualquer dúvida, procure a monitoria.

Lembre-se: você pode consultar nosso conteúdo sobre [Git & GitHub](/fundamentals/git) sempre que quiser!

---

## Próximo

<%= next_button(@conn) %>
