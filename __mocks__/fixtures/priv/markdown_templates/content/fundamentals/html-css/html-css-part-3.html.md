## O que vamos aprender?

Na terceira parte da sua jornada através do **HTML & CSS**, você vai aprender na prática como alterar o _layout_ da página utilizando o _CSS_.

---
### Você será capaz de:

  * Compreender como funciona o _Box Model_ do CSS e como utilizá-lo nos seus elementos;
  * Posicionar elementos na página de diferentes formas;
  * Combinar e agrupar seletores de CSS para criar regras bem definidas.

---

## Conteúdos

###### Tempo sugerido para realização: 80 minutos

Para que você aprenda na prática, a partir de agora, teremos vários conteúdos interativos, o que permite seguir a teoria e fazer exercícios ao mesmo tempo. Vamos lá!

Você irá desenvolver alguns desafios (challenges), para subi-los para o seu repositório de exercícios, siga as instruções abaixo:

1. Acesse seu repositório de exercícios, `trybe-exercises`. Caso ainda não tenha um crie-o e então siga para os próximos passos;

```language-sh
$ cd trybe-exercises
```
2. Então crie uma `branch` para os desafios de hoje, a partir da `master`;

```language-sh
$ git checkout -b exercises/3.3
```
3. Já dentro dá `branch exercises/3.3` crie uma pasta para o bloco em que você se encontra, caso ainda não tenha o feito, e então dentro dessa pasta crie uma outra pasta para os arquivos dos desafios de hoje;

```language-sh
$ mkdir bloco_3
$ cd bloco_3
$ mkdir dia_3
$ cd dia_3
```
  * A estrutura das pastas será assim:
  <%= figure(%{src: "/fundamentals/html-css/images/estrutura-pastas.png", class: "rounded mx-auto d-block", caption: "Estrutura das pastas", width: "auto", height: "auto"}) %>
4. Desenvolva o desafio na página do `Khan Academy`;
5. A cada desafio finalizado e aprovado, crie um arquivo com a extensão `.html` dentro da pasta dos desafios e copie o que você desenvolveu no `Khan Academy`, cole e salve o arquivo. Repita esse processo para cada desafio que for desenvolvendo;
6. Após finalizar os desafios propostos para hoje commite tudo o que fez e abra um PR no seu repositório de exercícios no `GitHub`.

```language-sh
$ git add .
$ git commit -m "Desafio Khan Academy"
$ git push -u origin exercises/3.3
```

`PS: Peça ajuda no Slack caso tenha dúvida nesse passo!`

##### Cada parte possui o vídeo em português e também em inglês, caso você prefira assistir os vídeos em inglês com legenda em português, clique no link "Watch on Youtube" no vídeo e selecione as legendas após o vídeo carregar. 😉

### Parte I

Primeiro, você vai aprender sobre o posicionamento de elementos na página usando o CSS:

⚠ **Atenção:** você deve começar no vídeo com o título **"_Agrupamento de elementos CSS_"**/**"_CSS grouping elements_"** e terminar no exercício com o título **"_Praticar: Quiz: Layout CSS_"**/**"_Practice: Using CSS layout properties_"**.

  * [CSS - Agrupando elementos - Português](https://pt.khanacademy.org/computing/computer-programming/html-css/css-layout-properties/pt/css-grouping-elements) {: .external-link target="_blank" rel="noreferrer noopener" }
  * [CSS - Agrupando elementos - Inglês](https://www.khanacademy.org/computing/computer-programming/html-css/css-layout-properties/pt/css-grouping-elements) {: .external-link target="_blank" rel="noreferrer noopener" }

---

### Parte II

Agora, você vai ver como agrupar, combinar e utilizar múltiplos seletores de CSS para estilizar apenas os elementos corretos:

⚠ **Atenção:** você deve começar no vídeo com o título **"_Uso de várias classes CSS_"**/**"_Using multiple CSS classes_"** e terminar no exercício com o título **"_Praticar: Regras de especificidade CSS_"**/**"_Practice: CSS specificity rules_"**.

  * [Usando múltiplas classes CSS - Português](https://pt.khanacademy.org/computing/computer-programming/html-css/more-css-selectors/pt/using-multiple-css-classes) {: .external-link target="_blank" rel="noreferrer noopener" }
  * [Usando múltiplas classes CSS - Inglês](https://www.khanacademy.org/computing/computer-programming/html-css/more-css-selectors/pt/using-multiple-css-classes) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

Agora que você já começou a praticar com o **HTML**, que tal fazermos um encontro ao vivo pelo Zoom para colocarmos juntos a mão na massa?

Aula ao vivo! Vamos para o Slack, onde o link estará disponível.

---

## Exercícios

###### Tempo sugerido para realização: 140 minutos

Hoje vamos finalizar a primeira versão do seu _Portfólio Web_ adicionando seletores e CSS de layout.

Com este exercício, você será capaz de:

* Aplicar layout mais consistente usando elementos de _bloco_ e _inline_ aplicando todo o conhecimento que você construiu hoje;

* Salvar todas as alterações dentro de um arquivo externo `style.css`;

* Usar _Box Model_ para organizar melhor os elementos no seu _Portfólio Web_!;

* Atualizar seu _Portfólio Web_ no [GitHub Pages](https://pages.github.com/) {: .external-link target="_blank" rel="noreferrer noopener" }.

### Layout e Box Model no seu Portfólio Web

Antes de começar, você deve seguir estas instruções e fazer o setup para o exercício de hoje:

1. Entre no diretório que você criou no dia anterior;
2. Procure a tag `<style></style>`, onde você fez as alterações ontem. Mova todo o conteúdo da tag `style` e coloque em um arquivo `style.css`;
3. Adicione as novas alterações dentro do arquivo `style.css`;
4. Não se esqueça de importar esse arquivo na sua página;
5. Depois de importar o arquivo `style.css`, você já pode remover a tag `style` do seu documento.
6. Lembre-se que para executar o seu código enquanto o desenvolve você deve utilizar a extensão `Live Server`, para saber mais sobre ela acesse nosso [conteúdo](/real-life-engineer/vscode) {: .external-link target="_blank" rel="noreferrer noopener" } sobre isso.

---

### Requisitos

Seu Portfólio Web deve ter ter um layout usando _Box Model_ com as informações a seguir:

* Coloque seu nome, sua foto e a descrição que você escreveu sobre você dentro de blocos;

* A descrição deve ficar _ao lado_ da foto;

* Centralize seu nome na página;

* Use `padding` e coloque uma cor de fundo na sua foto que seja diferente da cor de fundo do resto da página;

* Adicione `margin` e `padding` nos elementos que julgue necessário

* Coloque estilo somente nos ítens ímpares da lista das suas habilidades.

---

### Dicas

* Use a função de "Inspecionar" do browser para analisar o estilo de outras páginas web;

* Você pode fazer alterações direto no _console_ do browser, depois de inspecionar algum elemento na página:
  * Na aba "Elementos", à direita, tem uma lista com os seletores CSS aplicados ao elemento;
  * Você pode adicionar novas regras CSS a esse elemento especificamente, escrevendo-as dentro de `element.style` no _console_ do browser;
  * Lembre-se de que as alterações não são salvas, então se você recarregar a página elas vão se perder.

---

### Atualizando seu Portfólio Web para o mundo ver!

Agora que você usou layout e _Box Model_ no seu _Portfólio Web_, chegou o momento de atualizar tudo que você fez e colocar no seu GitHub Pages! 🎉

Para isso, basta você atualizar seu projeto usando o que você aprendeu de `Git`.

---

## Recursos adicionais (opcional)

E aí, gostou do que aprendeu até aqui? Nesta parte, nós colocamos outras referências para você se aprofundar no tema. Artigos, tutoriais, livros etc…

* [Tutorial - Como utilizar as ferramentas de desenvolvedor do browser](https://www.khanacademy.org/computing/computer-programming/html-css/web-development-tools/a/using-the-browser-developer-tools) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Artigo - GitHub Pages](http://jmcglone.com/guides/github-pages/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Playlist - Curso de HTML 5 - Gustavo Guanabara](https://www.youtube.com/playlist?list=PLHz_AreHm4dlAnJ_jJtV29RFxnPHDuk9o) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Curso Online Gratuito - Introdução ao HTML - Scrimba](https://scrimba.com/g/ghtml) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Curso Online Gratuito - HTML, CSS, e JavaScript para desenvolvedores web](https://www.coursera.org/learn/html-css-javascript-for-web-developers/home/welcome) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Tutorial - Série de artigos ensinando HTML & CSS](https://internetingishard.com/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Tutorial - Aprenda a estilizar o HTML com CSS - Mozilla](https://developer.mozilla.org/en-US/docs/Learn/CSS) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Site - CSS Tricks](https://css-tricks.com/) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

Chegou a hora de usar a sua _criatividade_ e colocar o conhecimento em prática!

<%= next_button(@conn) %>

---
