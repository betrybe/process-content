 

## O que é?

Um portfólio de uma pessoa desenvolvedora é mais do que um simples currículo. Em essência, é uma vitrine que prova que você pode fazer o que fala em seu currículo.

Em vez de contar às pessoas recrutadoras sobre suas habilidades, você pode criar um portfólio de pessoas desenvolvedora de software para mostrá-las. Como já vimos no conteúdo [exercícios](/real-life-engineer/exercise-portfolio.md).

---

## Por que isso é importante?

Então, por que você deve criar um site de portfólio de pessoa desenvolvedora? Vale a pena o esforço?

Um site de portfólio de pessoa desenvolvedora não apenas atua como uma vitrine para seus exemplos de trabalho anteriores, mas o próprio site é um exemplo do que você pode fazer!

Bora ver como podemos criar um e o que devemos usar ?

---

## Criando seu portfólio com GitHub Pages

[GitHub Pages](https://pages.github.com/) {: .external-link target="_blank" rel="noreferrer noopener" } é um serviço grátis disponibilizado pelo próprio GitHub, no qual você pode hospedar aplicações web e publicá-las por meio do GitHub. Existe a possibilidade de modificar o conteúdo e o estilo das suas páginas do GitHub remotamente, pela web ou localmente em seu computador.

### Como organizar meus projetos em meu portfólio ?

A ideia é que cada um de seus projetos seja um repositório para que você possa subi-los individualmente no `GitHub Pages`. Porém, o seu portfólio deve ser criado em um repositório com seu nome de usuário, `username.github.io`.

<%= figure(%{src: "/career/personal_portfolio/images/create_portfolio.png", class: "text-center rounded mx-auto d-block", width: "100%", height: "auto"}) %>

Em seguida, basta fazer um clone do repositório criado em sua _maquina_ e começar a desenvolver seu portfólio!

### Pontos chaves para abordar

Um portfólio deve sempre incluir os seguintes pontos:

- `Sobre mim`: as pessoas não te conhecem ainda, então certifique-se de que seu portfólio inclua alguns detalhes sobre isso. Inclua seu nome, uma foto e uma breve sinopse sobre o que você fez e onde espera chegar em sua carreira. É uma boa ideia refinar essa narrativa ao longo do tempo, à medida que sua carreira progride. Desenvolver a história da sua marca leva tempo, mas é um ativo único que você pode cultivar para ajudar no crescimento de sua carreira;

- `Projetos`: o ponto crítico de qualquer portfólio de programação será o lar dos melhores exemplos de seu trabalho. Esta seção deve ser o mais cativante possível, então seja criativo com suas habilidades, _GIFs_, _design_ e texto atraentes são bem vindos aqui;

- `Contato`: sem isso você pode estar prejudicando suas chances de obter ofertas de emprego. Idealmente você deve incluir um formulário de contato e seus canais de mídia social. Se você não fizer isso, no mínimo, adicione seu endereço de e-mail e links para seus perfis do LinkedIn e GitHub.

---

## Subindo projetos GitHub Pages

Agora que já sabemos como criar nosso portfólio, como podemos colocar nossos projetos nele? Bom, então esse é o motivo pelo qual cada projeto deve estar em um repositório separado, dessa forma, você hospeda cada um em uma `URL` diferente!

Exemplos:

- `https://username.github.io/app-recipes/`;

- `https://username.github.io/trybeer/`;

- `https://username.github.io/tech-news/`.

### Subindo seu projeto React no GitHub Pages

Mas afinal de contas, como fazemos isso? Bora por a mão na massa!

<%= figure(%{src: "https:\/\/media.giphy.com/media/LmNwrBhejkK9EFP504/giphy.gif", class: "text-center rounded mx-auto d-block", width: "60%", height: "60%"}) %>

#### Passo a Passo

1. Instale o pacote [gh-pages](https://github.com/tschaub/gh-pages) {: .external-link target="_blank" rel="noreferrer noopener" } no seu projeto:

```language-sh
$ npm install gh-pages
```

2. Adicione os as seguintes propriedades no seu arquivo `package.json`:

```language-javascript
"homepage": "https:\/\/username.github.io/app-toot-name",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build",
},
```

3. Execute o deploy da sua aplicação:

```language-sh
$ npm run deploy
```

4. Por fim, é necessário habilitar a configuração do `GitHub Pages` em seu repositório. É importante que a branch habilitada seja a **gh-pages**.
<%= figure(%{src: "/career/personal_portfolio/images/github_pages_config.png", class: "text-center rounded mx-auto d-block", width: "100%", height: "auto"}) %>

5. E _voilá_, basta acessar a **URL** do seu portfólio `github_user_name.github.io`

<%= figure(%{src: "https:\/\/media.giphy.com/media/iILWthRkRKiSEs06Bo/giphy.gif", class: "text-center rounded mx-auto d-block", width: "60%", height: "60%"}) %>

### Exemplos

Nessa seção você encontra alguns portfólios de projetos de Trybers, desse modo você poderá ver as possibilidades e também ter uma noção do resultado que obterá.

- [Portfólio de Projetos - Johnatas Henrique (SD-02);](https://johnatas-henrique.github.io/) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Portfólio de Projetos - Douglas Henrique (SD-02).](https://douglas-he.github.io/) {: .external-link target="_blank" rel="noreferrer noopener" }
