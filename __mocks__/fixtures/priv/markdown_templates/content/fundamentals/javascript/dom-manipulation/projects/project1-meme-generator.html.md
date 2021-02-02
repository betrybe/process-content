## O que vamos fazer?


Hoje você criará um **_Gerador de Memes_**!

A ideia é simples: faça upload de uma imagem para a sua página e adicione algum texto sobre ela.

---

## Por que isso é importante?

Para resolver este desafio, você precisará utilizar bem o **_HTML_** para estruturar a sua página e o **_CSS_** para estilizar e posicionar o texto sobre a imagem; com o **_JavaScript_**, você fará com que o texto e a imagem fornecidos sejam transformados em meme.

---

## Especificação

###### Tempo sugerido para realização: 270 minutos

### O que vamos avaliar?

* Aderência do código à especificação. Seu programa deve se comportar como especificado na próxima seção.

* Organização do seu código. Quebre seu código em funções. Prefira funções pequenas, simples e bem definidas a funções grandes e complexas.

* Sua capacidade de estruturar corretamente uma página HTML. Utilize as tags corretas nos contextos apropriados. Feche sempre suas tags e aninhe-as corretamente.

* A estruturação do seu CSS. Evite repetição. Combine e agrupe classes CSS bem definidadas.

### O que devo desenvolver?

Você deve criar um site que permita o upload de uma imagem e a inserção de um texto sobre ela, estilizado de forma apropriada.

Os requisitos detalhados do projeto estão no `README.md` do repositório.

### Dicas

* Para fazer este trabalho, você deverá atribuir ao texto que vai sobre a imagem o estilo `position: absolute;`. Leia mais sobre ele [aqui](https://www.w3schools.com/css/css_positioning.asp) {: .external-link target="_blank" rel="noreferrer noopener" }.

* Para receber os dados de quem usa o site, é preciso utilizar a tag [`<input>`](https://www.w3schools.com/tags/tag_input.asp) {: .external-link target="_blank" rel="noreferrer noopener" }. Ela faz parte do conteúdo sobre _forms_, que veremos mais adiante. Por hora, basta saber que você pode colocá-la dentro de um elemento `<form></form>` para que ela funcione. A partir daí, o desafio é fazer o resto! E [aqui](https://www.w3schools.com/html/html_form_input_types.asp) {: .external-link target="_blank" rel="noreferrer noopener" } temos mais conteúdo sobre o `<input>`

* Para colocar sua página no [GitHub Pages](https://pages.github.com/) {: .external-link target="_blank" rel="noreferrer noopener" }, **não** é necessário remover o conteúdo que já está lá, você pode apenas adicionar essa nova página. Para isso, todo o conteúdo desse projeto deve ser colocado na pasta `/projetos/meme-generator`.


---

## Entregáveis

Para entregar o seu projeto, você deverá criar um _Pull Request_ para um repositório no **GitHub**. Consulte o **canal do Slack da turma** para obter o endereço do repositório.

##### Fique atento e siga as instruções no README.md do repositório! 🥺

Qualquer dúvida, procure a monitoria.

Lembre-se de que você pode consultar nosso conteúdo sobre [Git & GitHub](/fundamentals/git) sempre que quiser!

---

## Recursos adicionais (opcional)

- [Página do W3Schools sobre o atributo css 'position'](https://www.w3schools.com/cssref/pr_class_position.asp) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Tipos de input no HTML](https://www.w3schools.com/html/html_form_input_types.asp) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Criando um gerador de memes avançado](https://css-tricks.com/creating-your-own-meme-generator/) {: .external-link target="_blank" rel="noreferrer noopener" }

- [HTML forms](https://www.w3schools.com/html/html_forms.asp) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Mais detalhes sobre a tag input](https://html.com/tags/input/) {: .external-link target="_blank" rel="noreferrer noopener" }


---

## Próximo

No próximo projeto vamos fazer arte com pixels! Bora lá?!

<%= next_button(@conn) %>
