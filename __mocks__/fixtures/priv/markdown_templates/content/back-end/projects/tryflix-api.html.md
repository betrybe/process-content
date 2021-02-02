## O que vamos fazer?

Você vai aproveitar todos o conhecimento que absorveu nesse bloco para fazer uma API e um front-end de uma aplicação.

Você colocará em prática o conhecimento sobre padrões arquiteturais que adquiriu, usando a arquitetura MSC (model-service-controller) no o back-end. Já no front-end, você colocará em prática o SSR com `Next.js`! 🎉

Nossa API vai ser utilizada por uma plataforma de streaming, onde pessoas vão para poder ver séries. Bem parecido com o [Netflix](https://www.netflix.com/) {: .external-link target="_blank" rel="noreferrer noopener" }. 😜

---

## Por que isso é importante?

Estudamos bastante sobre Arquitetura de Software. Contudo, para que possamos escolher e aplicar a solução arquitetural mais adequada, precisamos entender 100% do que precisamos desenvolver. Se não entendermos o real objetivo da aplicação, fica mais complicado aplicar a melhor solução.

Esse exercício é exatamente essa situação: você recebe um conjunto de requisitos e, com base neles, você decidirá qual a melhor forma de modelar seu banco de dados e de construir a sua aplicação.

Lembre-se de seguir, **sempre**, a normalização de dados no momento de modelar seu banco de dados. Além disso, você deverá seguir o padrão arquitetural `MSC` para construir seu back-end.

---

## Especificação

###### Tempo sugerido para realização: 2 dias

### O que vamos avaliar?

- Aderência do código à especificação. Seu programa deve se comportar como especificado na próxima seção;

- Back-end seguindo o padrão arquitetural `MSC`;

- Banco de dados modelado de acordo com as [formas normais](/back-end/sql/normalization);

- Fron-end renderizado com SSR;

- Aderência ao padrão REST.

### O que devo desenvolver?

Este trabalho será individual.

Você vai arquitetar e desenvolver tanto a API com um banco de dados `MySQL` quanto o front-end de uma plataforma de streaming. O front-end deverá utilizar SSR para ser _renderizado no servidor_. Use o protótipo para ter uma base de como componentizar a sua aplicação front-end. Acesse o protótipo [aqui.](https://www.figma.com/file/oDtjI43OdYIhhA7yWlSSsR/Tryflix?node-id=0%3A1) {: .external-link target="_blank" rel="noreferrer noopener" }

Você desenvolverá endpoints para exibir e favoritar as séries da plataforma.

Algumas inspirações para você entender um pouco da ideia geral do projeto:

- [Netflix;](https://www.netflix.com/) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Amazon Prime Video.](https://www.primevideo.com/) {: .external-link target="_blank" rel="noreferrer noopener" }

Leia o arquivo `README.md` do projeto com atenção para uma explicação detalhada de como desenvolver e entregar seu projeto.

---

## Entregáveis

Para entregar o seu projeto, você deverá criar um Pull Request para um repositório no GitHub. Consulte o canal do Slack da turma para obter o endereço do repositório.

Este Pull Request deverá conter a implementação da API, do front-end e o script `SQL` com os comandos para criar e popular o banco de dados, como especificado no README.md do projeto.

Fique atento e siga as instruções no README.md do repositório! 🥺 Qualquer dúvida procure a monitoria.

Lembre-se que você pode consultar nosso conteúdo sobre [Git & GitHub](/fundamentals/git) sempre que quiser!

---

## Próximo

<%= next_button(@conn) %>
