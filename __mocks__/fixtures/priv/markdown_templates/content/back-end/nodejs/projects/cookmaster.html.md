## O que vamos fazer?

Hoje, utilizando todos os conceitos que aprendeu nos últimos dias, autenticação via JWT e upload de arquivos com o Multer, você vai implementar essas funcionalidades a um CRUD de receitas.

---

## Por que isso é importante?

Uma das partes mais importantes de uma aplicação é a sua segurança. A autenticação via JWT nos permite manter usuários logados por certo tempo definido, armazenar dados do usuário para serem transferidos com segurança e impedir possíveis fraudes nas requisições. O Multer, por outro lado, é uma ferramenta extremamente necessária no cenário das APIs, pois é muito comum trafegarmos arquivos em requisições, e o Multer soluciona esse problema!

Por último, mas não menos importante, a habilidade de refatorar códigos é necessária na vida de uma pessoa desenvolvedora, haja vista que grande parte dos códigos que você irá encontrar ao longo da carreira será legado.

---

## Especificação

###### Tempo sugerido para realização: 2 dias

### O que vamos avaliar?

- Aderência do código à especificação. Seu programa deve se comportar como especificado na próxima seção.

- Organização do código. Já existe uma estrutura sendo utilizada no repositório do projeto. Siga essa estrutura, modularizando seu código o máximo possível.

### O que devo desenvolver

Este trabalho será individual.

Você vai desenvolver uma aplicação back-end de um sistema de cadastro e pesquisa de receitas, utilizando tudo o que aprendemos nas aulas sobre JWT, Multer, MSC e arquitetura REST!

Nela, será possível cadastrar usuários do tipo cliente e admin. Apenas usuários do tipo admin terão acesso a todas as receitas cadastradas; já os usuários do tipo client devem ter permissão para disparar qualquer tipo de ação apenas em suas próprias receitas cadastradas.

Leia o arquivo `README.md` do projeto com atenção para uma explicação detalhada de como desenvolver e entregar seu projeto.

---

## Entregáveis

Para entregar o seu projeto você deverá criar um _Pull Request_ para um repositório no **GitHub**. Consulte o **canal do Slack da turma** para obter o endereço do repositório.

##### Fique atento e siga as instruções no README.md do repositório! 🧐

Qualquer dúvida, procure a monitoria.

Lembre-se de que você pode consultar nosso conteúdo sobre [Git & GitHub](/fundamentals/git) sempre que quiser!

---

## Próximo

<%= next_button(@conn) %>
