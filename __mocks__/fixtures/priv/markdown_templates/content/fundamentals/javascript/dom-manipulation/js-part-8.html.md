## O que vamos aprender?

Você aprenderá sobre **Web Storage**.
**Web Storage** provê mecanismos para que as aplicações _web_ possam salvar dados nos _browsers_ das pessoas.

Antes do **HTML 5**, as aplicações tinham que salvar os dados locais em cookies, que eram enviados para o servidor a cada requisição do _browser_.
**Web Storage** é mais seguro e tem a capacidade de salvar uma quantidade maior de dados sem afetar o desempenho da página.

Ao contrário dos **Cookies**, o limite de armazenamento é muito maior (pelo menos 5MB), e as informações não são transferidas para o servidor durante as requisições.

**Web Storage** é por origem (por domínio e protocolo). Todas as páginas de uma origem podem salvar e acessar os mesmos dados. Por exemplo, se o domínio `betrybe.com` salva o dado `X` no **Web Storage**, o domínio `course.betrybe.com` consegue ler esse dado `X`.

---

### Você será capaz de:

  * Manipular o objeto `localStorage`;

  * Manipular o objeto `sessionStorage`.

---

## Por que isso é importante?

Salvar dados no _browser_ das pessoas que acessam uma determinada página _web_ é muito útil, pois podemos fazer com que essa página consuma esses dados e apresente diferentes conteúdos e ações para diferentes pessoas.

Quando você inicia um vídeo no _YouTube_ e depois retorna, o vídeo continua de onde parou. Um carrinho de compras de um site permanece com os itens que você adicionou durante semanas e uma página é apresentada já com o seu nome, e você nem fez login.

Esses são exemplos de aplicações que utilizam o _browser_ para salvar esses dados e facilitar a criação de tais funcionalidades.

Esse armazenamento local é o conteúdo de hoje, **Web Storage**.

---

## Conteúdos

###### Tempo sugerido para realização: 80 minutos

### Cookies

**Cookies** são dados salvos em pequenos arquivos de texto no computador da pessoa que utiliza a _Internet_.

Quando o servidor envia a página _Web_ para o _browser_, a conexão é desligada e o servidor não tem mais acesso às informações da requisição - como os items que o usuário adicionou a um carrinho de compras ou o e-mail que lhe dará acesso a sua conta. **Cookies** foram inventados para salvar dados dos usuários no próprio _browser_, pois, dessa forma, uma página conseguirá acessá-los para executar uma lógica com os parâmetros personalizados por pessoa.

Cookies são salvos no formato `chave-valor`. Quando o navegador faz a requisição ao servidor para acessar uma página Web, os _cookies_ dessa página são adicionados à requisição. Dessa forma, o servidor tem acesso aos dados do usuário. Nos exemplos a seguir, você irá aprender a criar e manipular _cookies_. Para testá-los, é importante que o seu navegador tenha o suporte a _cookie_ habilitado. Para visualizar os cookies de uma aplicação, abra a janela para inspecionar a página. No menu superior, clique em Application e na barra lateral esquerda, na sessão Storage, clique em Cookies. 

O Javascript permite com que a gente crie, leia e delete cookie através da propriedade `document.cookie`.

Para criar um cookie, você só precisa de atribuir à propriedade `document.cookie` uma `string` contendo o nome e o valor do que se pretende armazenar:

```language-javascript
document.cookie = "email=isabella@email.com";
```

Por definição, o `cookie` é deletado quando fechamos o navegador. Para que isso não aconteça, você pode adicionar uma data para expiração como no exemplo abaixo:

```language-javascript
document.cookie = "email=isabella@email.com; expires=Thu, 17 Dec 2020 12:00:00 UTC";
```

Você pode adicionar também o parâmetro `path` que dirá ao navegador qual caminho o cookie que você criou pertence. Por padrão, o cookie pertence à página atual.

```language-javascript
document.cookie = "email=isabella@email.com; expires=Thu, 17 Dec 2020 12:00:00 UTC; path=/";
```

O Javascript permite com que você atribua `document.cookie` a uma variável. Assim, você conseguirá ler as informações que estão armazenadas. No exemplo abaixo, ao imprimirmos no `console` o valor de myCookie, o que será retornado é uma `string` contendo o o nome e o valor do cookie. Quando temos mais de um par chave-valor, a variável armazenará em uma única `string` os pares separados por ponto-vírgula.

```language-javascript
const myCookie = document.cookie;
console.log(myCookie) // email=isabella@email.com
```

E você pode também alterar o valor do cookie da mesma forma que o criamos. Basta atribuir a `document.cookie` a nova informação que você quer armazenar.

```language-javascript
document.cookie = "email=cleyton@email.com; expires=Thu, 17 Dec 2020 12:00:00 UTC";
```

Para deletar o cookie, você não precisa especificar o valor que pretende deletar. Você pode deletá-lo passando uma data que já expirou:

```language-javascript
document.cookie = "email=; expires=Tue, 01 Dec 2020 12:00:00 UTC;"
```

### Local e Session Storage

_HTML Web Storage_ provê dois objetos para armazenamento de dados no cliente (_browser_ da pessoa), no formato de _key/value_ de um modo mais intuitivo do que nos **Cookies**:

* `localStorage` - salva os dados **sem data de expiração**. Os dados não serão removidos quando o _browser_ for fechado, ou seja, eles ficarão disponíveis enquanto não forem explicitamente removidos.

Exemplo de utilização:

```language-javascript
console.log(localStorage.length) // não possui nada salvo, então o retorno é o valor: 0
localStorage.setItem("firstname", "Adam") //salva uma entrada com a key = "firstname" e value = "Adam"
localStorage.setItem("lastname", "Smith") //salva uma entrada com a key = "lastname" e value = "Smith"
console.log(localStorage.getItem("lastname")) // retorna o valor "Smith"
console.log(localStorage.length) // possui duas entradas, então o retorno é o valor: 2
localStorage.removeItem("lastname") // remove a entrada referente a key = "lastname"
console.log(localStorage.length) // possui uma entrada, então o retorno é o valor: 1
localStorage.clear() // limpa todas as entradas salvas em localStorage
console.log(localStorage.length) // não possui nada salvo, então o retorno é o valor: 0
```

* `sessionStorage` - salva os dados apenas para a sessão atual. Os dados são removidos assim que a pessoa fecha a aba (_tab_) ou o _browser_.

Exemplo de utilização:

```language-javascript
console.log(sessionStorage.length) // não possui nada salvo, então o retorno é o valor: 0
sessionStorage.setItem("firstname", "Adam") //salva uma entrada com a key = "firstname" e value = "Adam"
sessionStorage.setItem("lastname", "Smith") //salva uma entrada com a key = "lastname" e value = "Smith"
console.log(sessionStorage.getItem("lastname")) // retorna o valor "Smith"
console.log(sessionStorage.length) // possui duas entradas, então o retorno é o valor: 2
sessionStorage.removeItem("lastname") // remove a entrada referente a key = "lastname"
console.log(sessionStorage.length) // possui uma entrada, então o retorno é o valor: 1
sessionStorage.clear() // limpa todas as entradas salvas em sessionStorage
console.log(sessionStorage.length) // não possui nada salvo, então o retorno é o valor: 0
```

É possível salvar outras estruturas em `localStorage` e `sessionStorage`:

```language-javascript
let organization = {
  name: "trybe",
  since: 2019
}

// object "storage" can be localStorage or sessionStorage

storage.setItem("trybe", JSON.stringify(organization))
let org = JSON.parse(storage.getItem("trybe"))
console.log(org) // { name: "trybe", since: 2019 }

let classes = ["2019/set", "2019/oct"]
storage.setItem("classes", JSON.stringify(classes))
let cls = JSON.parse(storage.getItem("classes"))
console.log(cls) // ["2019/set", "2019/oct"]
```

Veja o vídeo mostrando o uso de `localStorage` e `sessionStorage`:

<%= vimeo "504531956" %>

No vídeo, a pessoa acessa a aba _"Resources"_ para ver a parte de **Local Storage** e **Session Storage**, mas esta é uma versão antiga do _Google Chrome_. Hoje a aba correta é a aba _"Application"_. Você pode ver como acessá-la com o auxílio do _GIF_ abaixo:

<img class="rounded mx-auto d-block" src="/fundamentals/web-storage/google-chrome-application-tab.gif" alt="Gif exibindo o acesso à aba Application no Google Chrome" width="auto" height="300px">

É muito mais simples utilizar `localStorage` e `sessionStorage` do que **Cookies**, mas os **Cookies** são enviados para o servidor a cada requisição. Dessa forma, o uso de **Cookies** **não** é totalmente dispensável.

Em regra geral, utilizamos **Cookies** quando precisamos dos dados no cliente (_browser_) e no servidor. Caso contrário, utilizamos `localStorage` e `sessionStorage`.

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

É hora de colocar em prática todo esse conhecimento. 💪 Vamos ver como utilizar tudo o que aprendemos sobre `Web storage`.

Aula ao vivo! Vamos para o Slack, onde o link estará disponível.

---

## Exercícios

###### Tempo sugerido para realização: 140 minutos

<%= versioning_your_code(@conn) %>

### Agora a prática

#### Bora fixar o conteúdo de hoje?! 🎯 💪

[Preparamos estes exercícios](https://be-trybe.typeform.com/to/mICz25e3) {: .external-link target="_blank" rel="noreferrer noopener" } para você fixar seus conhecimentos sobre **JavaScript - Web Storage.** Eles já contam com feedback na hora e são rapidinhos! Vamos lá?



### Aprofunde seus conhecimentos


Imagine que você é a pessoa responsável por desenvolver uma página que servirá como um leitor de conteúdo escrito.

Esse conteúdo escrito pode ser uma página de livro, uma reportagem de revista ou uma nota de jornal online. Para que você não tenha que pensar no conteúdo da página, utilize [este link](https://www.lipsum.com/) {: .external-link target="_blank" rel="noreferrer noopener" } para gerar o texto para sua página.

Até aqui, nenhuma novidade, mas essa demanda exige que você aplique preferências das pessoas leitoras na página para melhorar a experiência de leitura dessas pessoas.

As pessoas devem ter o poder de alterar:

- Cor de fundo da tela;
- Cor do texto;
- Tamanho da fonte;
- Espaçamento entre as linhas do texto;
- Tipo da fonte (_Font family_).

Essas preferências devem ser salvas de forma que, ao retornar à página, as preferências que foram previamente configuradas possam ser aplicadas na tela.

#### Bônus

- As propriedades descritas acima são **obrigatórias**, mas você é livre para adicionar qualquer outra propriedade que julgar válida e que tenha como objetivo a melhora da experiência da pessoa que lê em sua página.

---

## Recursos adicionais

  * [JSON.stringify documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) {: .external-link target="_blank" rel="noreferrer noopener" }

  * [JSON.parse documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) {: .external-link target="_blank" rel="noreferrer noopener" }

  * [Cookie advanced documentation](https://javascript.info/cookie) {: .external-link target="_blank" rel="noreferrer noopener" }

  * [Web Storage advanced documentation](https://javascript.info/localstorage) {: .external-link target="_blank" rel="noreferrer noopener" }

  * [Cookies vs LocalStorage vs SessionStorage](https://www.youtube.com/watch?v=AwicscsvGLg) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

No próximo passo, você irá colocar tudo o que aprendeu em prática. Vamos aos Projetos da **Semana JavaScript**.

<%= next_button(@conn) %>
