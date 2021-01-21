## O que vamos aprender?

Hoje voce vai entender o conceito de Server Side Rendering (SSR)!

Vamos delegar a responsabilidade de renderizar nossas páginas HTML para o nosso servidor.

---

### Você será capaz de:

- Escrever aplicações que renderizam diretamente no servidor (SSR).

- Utilizar frameworks como `React` e `Next.js` para construir aplicações front-end que utilizam SSR.

---

## Por que isso é importante?

Delegar a responsabilidade de renderizar sua página para o servidor pode ser uma escolha inteligente em cenários de aplicações que precisam ser performáticas e indexáveis.

Essa técnica é chamada de **S**erver **S**ide **R**endering. Ela tem diversos benefícios e é amplamente usada, tornando-se cada vez mais importante para aplicações "customer facing".

Conhecer sobre ela e em quais cenários ela se aplica pode ser extremamente valioso na hora de tomar decisões técnicas.

---

## Conteúdos

###### Tempo sugerido para realização: 120 minutos

### Server Side Rendering (SSR)

SSR é o processo de carregar todos os arquivos CSS e JavaScript no servidor. Esses arquivos normalmente são carregados no browser, em requisições subsequentes ao carregamendo inicial da página.

Com o SSR, o servidor retorna apenas um arquivo estático para o browser, com estilos e scripts inclusos, melhorando o tempo de carregamento da página.

Aplicações desenvolvidas em PHP, WordPress ou Ruby on Rails, por exemplo, utilizam SSR. Isso significa que as páginas são populadas com contéudo no servidor, antes de serem enviadas via HTTP para o browser. O browser recebe estas páginas prontas e só precisa renderizá-las.

Uma aplicação [SPA](https://blog.locaweb.com.br/artigos/desenvolvimento-artigos/o-que-e-single-page-application/) {: .external-link target="_blank" rel="noreferrer noopener" }, como as desenvolvidas em `React` ou `Vue`, utilizam CSR (**C**lient **S**ide **R**endering). Nelas, o HTML inicial, enviado para o browser, é muito simples. Há um arquivo `JS` que é o app inteiro. Esse JavaScript é responsável por construir sua página dinamicamente, no cliente. Quaisquer dados necessários para preencher o conteúdo da página vêm de uma ou mais APIs.

O CSR possui inúmeras vantagens, mas também possui algumas desvantagens importantes. Entre as desvantagens, as principais são: o maior tempo de carregamento na requisição inicial, o que faz com que a página demore mais para se tornar interativa, e o desempenho pior em indexadores, como o Google.

Estas são algumas **vantagens de se usar SSR**:

- Melhora o tempo de carregamento de seu site;

- Melhoraria no SEO (**S**earch **E**ngine **O**ptimization);

- Facilita a "leitura" do site por *crawlers* e indexadores;

- Melhora o "social sharing".

Os diagramas abaixo ilustram a diferença no tempo de carregamento entre apicações React que utilizam CSR e aplicações que utilizam SSR.

<%= figure(%{caption: "Client Side Rendering", src: "https:\/\/res.cloudinary.com/drdpedroso/image/upload/c_scale,w_600/v1584283210/1_rexeXZ9OOTPDqbcAY_c2_w_vospel.png", class: "text-center"}) %>

<%= figure(%{caption: "Server Side Rendering", src: "https:\/\/res.cloudinary.com/drdpedroso/image/upload/c_scale,w_600/v1584283211/1_vqhwJbAmYIOQ20Va8RI6zg_mmi7yu.png", class: "text-center"}) %>

##### Performance

Para entender o motivo de o SSR melhorar o tempo de carregamento de uma aplicação, precisamos entender um pouco sobre como o browser renderiza páginas web.

De forma geral, o ponto de entrada em uma aplicação web é um arquivo HTML que diz ao browser quais recursos serão necessários para exibir a página. Esses recursos podem ser arquivos JavaScript, CSS, fontes etc.

```language-html
<!-- tag link para o CSS do bootstrap, vindo de uma CDN -->
<link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
/>
```

No exemplo acima, enquanto começa a construir a página, o navegador irá até a CDN baixar o arquivo CSS do Bootstrap.

Após os estilos serem baixados, é a vez do JavaScript (normalmente, os maiores arquivos de um projeto). No exemplo a seguir, o código do React será baixado de uma CDN.

```language-html
<!-- Javascript do React vindo de uma CDN -->
<script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
```

Sem o React, uma aplicação SPA não funciona. Isso porque, em vez de enviarmos o HTML pronto para o browser, enviamos código JavaScript (gerado pelo React) que, quando executado, construirá o HTML da página.

Isso significa que, até o download e execução do React serem finalizados, uma pessoa que acessa nossa página não conseguirá ver nada nela. 😢

É ai que entra o SSR: renderizando a página no servidor, o JavaScript necessário para a construção do HTML também é executado no servidor e monta o HTML inicial que, agora, pode ser enviado para o cliente.

Dessa maneira, conseguimos entregar para o browser uma página que ainda não é interativa, mas já pode ser visualizada antes de o JavaScript ser executado. Uma vez que o browser recebe esse HTML, ele executa o JavaScript restante, que é responsável por adicionar os _event listeners_ aos elementos do HTML, dentre outras tarefas que tornam a página interativa.

Sem SSR, portanto, fica muito mais difícil para um crawler ou indexador de um motor de busca lerem nosso site e entenderem seu conteúdo. Vamos ver melhor porque isso acontece!

### SEO e Crawlers

As aplicações web modernas são, basicamente, JavaScript. Existe apenas uma página HTML simples que é inicialmente carregada pelo browser. Após carregar essa página, o JavaScript é carregado e, a partir daí, ele toma o controle, encarregando-se de modificar a página conforme necessário, adicionando, alterando e removendo elementos.

Se você entrar em uma aplicação escrita em React, por exemplo, e olhar a estrutura do HTML, você verá algo parecido com isso:

```language-html
<html lang="en">
  <head>
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run `npm start` or `yarn start`.
      To create a production bundle, use `npm run build` or `yarn build`.
    -->
  </body>
</html>
```

A mesma coisa acontecerá se um crawler ou um indexador tentar ler esse arquivo. Não há nenhuma informação na página que diga sobre o que ela se trata. Isso significa que, para esse indexador ou crawler, sua página consiste somente desse arquivo HTML. Dessa forma, sua página não obteria uma boa classificação no Google, por exemplo.

Agora, se esse arquivo é renderizado no servidor, mesmo que sua página HTML seja simples como a do exemplo acima, o JavaScrit será executado no servidor e o cliente receberá todo o contéudo já renderizado dentro do HTML. Isso significa que o indexador conseguirá ler e nos dizer sobre o que se trata essa webpage.

Hoje em dia, o Google alega conseguir ler Single Page Applications (como as escritas com React, por exemplo), mas não dá para dizer o quão bem essa leitura é feita quando a comparamos com uma página estática.

Por esse motivo, aplicações web renderizadas no servidor são consideradas superiores quando é necessário fazer [SEO.](https://resultadosdigitais.com.br/especiais/o-que-e-seo/) {: .external-link target="_blank" rel="noreferrer noopener" }

### SSR e Express

O Express se tornou bastante utilizado para renderizar páginas no servidor em JavaScript, principalmente em conjunto com algum framework, como React ou Vue.

O motivo é bem simples: Express permite flexibilidade.

O problema com React, mais especificamente, é que usamos `JSX` para construir a aplicação. Isso significa que precisamos de uma ferramenta para transformar esse JSX em HTML, já que nosso navegador não entende JSX.

Para fazer isso, precisamos configurar ferramentas como `Webpack` e `Babel`, o que aumenta muito a complexidade (principalmente na hora de lidar com rotas). Por isso, existem frameworks que facilitam bastante o desenvolvimento de aplicações SSR com React.

##### Pontos de atenção ❗

Existem alguns pontos de atenção que devem ser considerados caso você queira usar SSR com JavaScript:

- Agora existe um possível gargalo na sua aplicação. Todo o trabalho que antes era realizado pelos clientes agora é feito no servidor. Isso significa que, se tem muita gente acessando seu site, o seu servidor vai precisar escalar para servir as páginas para todos os clientes.

- Manter um servidor vai gerar custos extras com infraestrutura e será mais uma coisa para dar manutenção.

- Funcionalidades utilizadas no browser, como `localStorage` e `fetch`, não estarão sempre disponivéis, visto que sua apilcação estará operando em um ambiente **Node**, e não em um browser. Contudo, existem alguns momentos, no ciclo de vida da aplicação, em que ainda conseguimos utilizar esses recursos.

### Next.js - SSR com React

A maneira mais simples de fazer _Server Side Rendering_ com React é utilizando um framework que cuida das N particularidades de se renderizar páginas no servidor.

O mais famoso e amplamente utilizado é o Next.js.

Algumas das vantagens:

- Parte mais complexa do servidor é abstraída;

- Uma CLI muito rica e fácil de usar. Podemos, inclusive, iniciar um projeto com apenas alguns comandos;

- Dispensa preocupações com a configuração de ferramentas de build como, por exemplo, o Webpack;

- Oferece um sistema de rotas simples;

- É totalmente open source, mas criado e mantido por uma empresa, a Vercel (antiga ZEIT). Tem também empresas, como a Google, colaborando diretamente com o framework;

- Pronto para ir para produção!

##### Começando com Next.js

O Next.js tem uma CLI muito completa. Ele tem um `create-next-app` bem parecido com o _Create React App_.

Você pode iniciar um projeto rodando:

```language-bash
npm init next-app

# ou

yarn create next-app
```

Selecione `Example from Next.js repo` e, depois, `active-class-name` para que possamos ver algo mais completo.

Isso vai gerar uma estrutura similar a esta:

```language-bash
.
└── my-app
├── components
│   ├── ActiveLink.js
│   └── Nav.js
├── node_modules
└── pages
│   ├── about.js
│   └── index.js
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```

A pasta `pages` é onde vão ficar suas páginas. O Next.js é um framework com "opniões fortes". Isso significa que voce deve seguir o padrão para tudo funcionar de acordo.

Todas as páginas que você colocar dentro de `pages` viram rotas automaticamente dentro do Next.js.

Caso você queira que uma rota receba um parametro tipo `post/:id`, ela é mapeada para o arquivo `pages/post/[id].js`.

Dentro de `public`, você pode colocar seus arquivos estáticos. Eles serão servidos na rota raiz (`/`). É aqui que você coloca imagens, fontes, icones e por aí vai.

A pasta `components` é onde você coloca seus componentes. Sem segredo aqui. Nada muda em relação a um app React tradicional.

Para rodar a aplicação utilize o comando `yarn dev` ou `npm run dev`. Em seguida, aguarde a compilação finalizar e acesse a URL `localhost:3000`. Com isso, podemos ver a aplicação rodando, navegar nos links e ver as rotas mudando.

##### Criando novas páginas

Uma das vantagens de ter um framework que segue uma convenção é que em qualquer projeto que você entre, as coisas serão parecidas.

Com o Next.js, basta criarmos um novo arquivo na pasta `pages`! Então vamos fazer isso.

Ao criar o arquivo `list.js` dentro de `pages`, automaticamente uma rota é criada para essa página:

> my-app/pages/list.js

```language-jsx
/* Não precisamos importar o React nessa página como fariamos normalmente */
const ListPage = () => (
  <div>
    <p>Eu sou a List Page!</p>
  </div>
);

/* É necessário exportar como default */
export default ListPage;
```

Pronto! Se visitarmos `http://localhost:3000/list` veremos nossa página lá!

##### Imagens e arquivos estáticos

É agora que criamos nossa pasta `public`. É nela que nossas imagens e arquivos estáticos vão ficar.

O processo é relativamente simples. Sempre pense que os caminhos da sua imagem começam na raiz (que vai ser a pasta `public`).

Então, se adicionarmos a imagem `react.png` na raiz da pasta `public`, poderemos acessá-la na nossa pasta da seguinte maneira:

> my-app/pages/list.js

```language-jsx
// /* Não precisamos importar o React nessa página como fariamos normalmente */
// const ListPage = () => (
//   <div>
       <img src="react.png" />
//     <p>Eu sou a List Page!</p>
//   </div>
// );

// /* É necessário exportar como default */
// export default ListPage;
```

##### Consumindo dados

Consumir dados de uma API não deveria ser nada muito difícl, certo? Certo!

O Next.js nos da alguns métodos que podemos utilizar para consumir uma API. O principal é o `getServerSideProps`. Para utilizá-lo, precisamos exportar uma função com o nome `getServerSideProps` no arquivo da nossa página. Quando o servidor for renderizar aquela página, ele vai, primeiro, executar nossa função e utilizar seu retorno para renderizar o componente.

Para ver isso sendo aplicado, vamos construir uma página que mostra todos os livros de `Game of Thrones`, consultando a API [An API of Ice And Fire](https://anapioficeandfire.com) {: .external-link target="_blank" rel="noreferrer noopener" }.

Primeiro, instale o `node-fetch`, para poder utilizar uma API semelhante à Fetch API, mas no contexto do servidor.

Para o servidor que está sendo executado e rode o comando abaixo:

```language-bash
npm i node-fetch
```

Agora, crie um novo arquivo chamado `books.js` dentro da sua pasta `pages`, e preencha-o com o seguinte conteúdo:

> my-app/pages/books.js

```language-jsx
/* Nossa função será executada no contexto do servidor, onde não existe Fetch API.
   Por isso, usamos uma biblioteca externa para prover essa funcionalidade. */
import fetch from 'node-fetch';

/* Recebe um livro e retorna um objeto contendo apenas seu nome */
const getBookName = ({ name }) => ({ name });

/* Esta função precisa ser exportada para que o Next.js consiga utilizá-la */
export async function getServerSideProps() {
  /* Buscamos a lista dos livros de Game of Thrones */
  const response = await fetch(
    'https://anapioficeandfire.com/api/books?pageSize=12'
  );
  const books = await response
    .json()
    /* Removemos as outras propriedades do objeto livro, pois só precisamos do nome */
    .then((books) => books.map(getBookName));

  /* Retornamos os livros recebidos da API em forma de props, para o componente */
  return {
    props: {
      books,
    },
  };
}

/* O componente recebe os livros como uma prop */
const BooksPage = ({ books }) => (
  <div>
    <h1>Livros de Game of Thrones:</h1>
    <ul>
      {books.map(({ name }) => (
        <li key={name}>{name}</li>
      ))}
    </ul>
  </div>
);

export default BooksPage;
```

Agora, execute o servidor e navegue para `localhost:3000/books`. Repare que os nomes dos livros foram impressos na tela!

A vantagem de usar esse método é que o servidor já retorna para o browser todo o HTML e os dados necessários para renderizar a página solicitada. Você pode comprovar isso clicando com o botão direito na página e escolhendo a opção `View Page Source` ou `Exibir código fonte da página`. Você verá que o browser recebeu do servidor o HTML completo, com a lista e tudo! 😉

##### Utilizando parâmetros nas rotas

Agora, vamos ver como podemos fazer para consumir parâmetros que passamos na rota. Para isso, vamos criar uma rota `/books/:id`, que mostra os detalhes de um livro específico.

Crie, dentro de `pages`, uma nova pasta, chamada `books` e, dentro dela, crie um arquivo chamado `[id].js`. No final, você terá a estrutura `pages/books/[id].js` que, como vimos anteriormente, criará uma rota `books/:id`.

Agora, preencha `books/[id].js` com o seguinte conteúdo:

> my-app/pages/books/[id].js

```language-jsx
import Link from 'next/link';

/* Recebe una string e retorna a mesma string, com a primeira letra em maiúscula */
const capitalizeFirstLetter = (string) =>
  `${string.charAt(0).toUpperCase()}${string.slice(1)}`;

/* Removemos as propriedades que não queremos exibir. */
const getBookProperties = ({ name, characters, povCharacters, ...book }) => {
  return Object.entries(book).map(([key, value]) => [
    capitalizeFirstLetter(key),
    value,
  ]);
};

export async function getServerSideProps({ params: { id: bookId } }) {
  /* Buscamos as informações do livro informado */
  const url = `https://anapioficeandfire.com/api/books/${bookId}`;
  const response = await fetch(url);

  const book = await response.json();

  /* Retornamos o livro recebido da API em forma de props, para o componente */
  return {
    props: {
      book,
    },
  };
}

const BookPage = ({ book }) => (
  <div>
    <h1>{book.name}</h1>
    <ul>
      {getBookProperties(book).map(([key, value]) => (
        <li key={key}>
          {key}: {value}
        </li>
      ))}
    </ul>

    <Link href="/books"><a>Voltar para a listagem de livros</a></Link>
  </div>
);

export default BookPage;
```

Perceba que, na declaração da função `getServerSideProps`, estamos utilizando _object destructuring_ para obter uma propriedade `params` e, de dentro dela, uma propriedade `id`, que estamos renomeando para `bookId`.

Podemos fazer isso pois o Next.js passa para essa função um objeto de *context*, que contém algumas coisas interessantes que foram passadas para a página. Dentre as propriedades desse objeto, as mais interessantes para nós no momento são:

- **params**: Contém os parâmetros passados por meio da rota. Por exemplo, na nossa rota `books/[id].js`, que é criada pelo Next.js como `books/:id`, `params` é um objeto com uma propriedade `id`, cujo valor é o valor que passarmos na URL. Ou seja, se montarmos uma rota `books/1`, por exemplo, params teria o valor `{ id: 1 }`;

- **query**: Contém parâmetros passados por meio da query string. Por exemplo: ao adicionar `?name='A Game of Thrones` no final da URL de uma rota, `query` conterá um objeto com uma propriedade `name`, cujo valor será a string `A Game of Thrones`.

Agora, navege até `/books/1`, e veja que os detalhes do livro _A Game of Thrones_ estão sendo exibidos na página.

Por último, para deixarmos essa demonstração um pouco mais dinâmica, vamos voltar à nossa listagem de livros e adicionar links para cada um dos livros exibidos.

> my-app/pages/books.js

```language-jsx
// /* Como o servidor, onde nossa função será executada, não possui o fetch,
//    precisamos importà-lo de uma bibliteca externa */
// import fetch from 'node-fetch';
import Link from 'next/link';

// /* Recebe um livro e retorna um objeto contendo apenas seu nome */
// const getBookName = ({ name }) => ({ name });

// /* Esta função precisa ser exportada para que o Next.js consiga utilizá-la */
// export async function getServerSideProps() {
//   /* Buscamos a lista dos livros de Game of Thrones */
//   const response = await fetch(
//     'https://anapioficeandfire.com/api/books?pageSize=12'
//   );
//   const books = await response
//     .json()
//     /* Removemos as outras propriedades do objeto livro, pois só precisamos do nome */
//     .then((books) => books.map(getBookName));

//   /* Retornamos os livros recebidos da API em forma de props, para o componente */
//   return {
//     props: {
//       books,
//     },
//   };
// }

/* O componente recebe os livros como uma prop */
const BooksPage = ({ books }) => (
  <div>
    <h1>Livros de Game of Thrones:</h1>
    <ul>
      {books.map(({ name }, index) => (
        <li key={name}>
          <Link href={`books/${index + 1}`}>
            <a>{name}</a>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

// export default BooksPage;
```

E pronto! Agora, se você navegar até `/books`, verá que cada um dos itens da lista é um link para a página daquele livro específico.

Show de bola! ⚽️ Agora entendemos como fazer caso precisemos buscar os dados de uma API para poder renderizar a página!

No entanto, existem alguns casos em que não precisamos que os dados sejam carregados antes de renderizar a página. Para esses casos, você pode utilizar o método que preferir para realizar a requisição, como o `axios` ou a própria _Fetch API_.

No entanto, é importante prestar atenção, pois nem todos os hooks de lifecycle do react serão executados do lado do cliente. Quando precisar realizar uma request do lado do cliente, procure utilizar o hook `componentDidMount`, que sempre será executado pelo React, já no navegador.

### Mais sobre o Next.js

O que exploramos aqui é só a _ponta do iceberg_ do que o Next.js nos oferece. Para ter uma ideia melhor das funcionalidades, diferentes modos de renderização, e outras coisas que o Next.js oferece, consulte a [documentação oficial.](https://nextjs.org/docs/getting-started) {: .external-link target="_blank" rel="noreferrer noopener" } E não se esqueça: a documentação é a melhor amiga da pessoa desenvolvedora 😉.

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

É hora de colocar em prática todo esse conhecimento. 💪 Vamos ver alguns exemplos de como fazer o setup de _uma aplicação React sendo renderizada pelo Express, no servidor_.

Aula ao vivo! Vamos para o Slack, onde o link estará disponível.

---

## Exercícios

###### Tempo sugerido para realização: 100 minutos

Hora de por a mão na massa!

<%= versioning_your_code(@conn) %>

### Agora, a prática

Nesse exercício, você vai criar uma aplicação SSR em React e uma API. Ambas serão feitas utilizando Express. Na API, serão disponibilizadas imagens e um arquivo JSON com algumas informações. A aplicação SSR consumirá essa API para renderizar uma lista de imagens no servidor.

##### API

Primeiro, crie uma aplicação Express e instale `cors` como dependencia. Depois cole esse trecho de código no `index.js`:

> index.js

```language-javascript
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.use(express.static('images'));

const responseMock = [
  {
    "id": "ba3ebadf-db38-4f94-9f61-adfc2e9827b9",
    "path": "/img-1.jpg",
    "photographer": "Lian Von Ah",
    "title": "A winter sunshine in Amsterdam",
    "category": "Nature",
    "created_at": "2016-05-03T11:00:28-04:00"
  },
  {
    "id": "0daf2d18-4624-4fd0-8004-633d115a8ec9",
    "path": "/img-2.jpg",
    "photographer": "Alex Jones",
    "title": "NYC",
    "category": "City",
    "created_at": "2016-05-03T11:00:28-04:00"
  },
  {
    "id": "680637a6-7c1d-4992-96af-952a278eae23",
    "path": "/img-3.jpg",
    "photographer": "Arthur Ferreira Neto",
    "title": "Amazon as is",
    "category": "Nature",
    "created_at": "2019-12-03T11:00:23-00:00"
  },
  {
    "id": "de0f8bbb-1d30-475d-85f6-706808092597",
    "path": "/img-4.jpg",
    "photographer": "Fernando Alcan",
    "title": "A nice landscape",
    "category": "Nature",
    "created_at": "2019-12-03T12:00:23-00:00"
  },
  {
    "id": "d93c63d7-408d-48cb-890d-db2353b2002a",
    "path": "/img-5.jpg",
    "photographer": "Felix Mayer",
    "title": "Untitled",
    "category": "Portrait",
    "created_at": "2020-01-03T11:00:23-00:00"
  },
  {
    "id": "30dcb28c-0194-47f8-b26d-2969e7a9bff1",
    "path": "/img-6.jpg",
    "photographer": "Andrey Stan Jones",
    "title": "UK for us",
    "category": "City",
    "created_at": "2019-12-04T11:00:23-00:00"
  },
  {
    "id": "21109cf3-3c88-4b69-9048-f90f7f10b698",
    "path": "/img-7.jpg",
    "photographer": "Carla Miran",
    "title": "Greek sun",
    "category": "Animals",
    "created_at": "2001-12-03T11:00:23-00:00"
  },
  {
    "id": "bba2204b-09a4-45df-b9a0-3247409b8e69",
    "path": "/img-8.jpg",
    "photographer": "Ana Lisa Wandersen",
    "title": "Follow the river down",
    "category": "Nature",
    "created_at": "2019-12-03T11:00:23-00:00"
  },
  {
    "id": "b8bb5ba2-d555-4a07-b504-47fbd0bad2b4",
    "path": "/img-9.jpg",
    "photographer": "Alex Nelson",
    "title": "Amazon as is 2",
    "category": "Cars",
    "created_at": "2019-12-03T11:00:23-00:00"
  },
  {
    "id": "456b4b53-8127-4758-9a11-37dcb909148e",
    "path": "/img-10.jpg",
    "photographer": "Nova Supra",
    "category": "Universe",
    "title": "Universe in a nutshell",
    "created_at": "2019-09-01T11:00:01-30:00"
  }
];

app.get('/images', (req, res) => {
  res.send(responseMock);
});

app.get('/image/:id', (req, res) => {
  // Criar/construir endpoint
});

app.get('/images/:category', (req, res) => {
  // Criar/construir endpoint
});

app.listen(3001, () => {
  console.log('Ouvindo a porta 3001!');
});
```

Faça download das [imagens](images.zip) {: .external-link target="_blank" rel="noreferrer noopener" } e coloque dentro de uma pasta `images` na raiz do seu projeto.

Essa API vai te retornar todas as imagens no endpoint `/images` e os detalhes de uma imagem no endpoint `/image/:id`.

- Nessa API, crie o endpoint para filtrar a imagem baseado no ID na URL `image/:id`.

##### Front-end (Aplicação SSR)

O front-end deverá ser uma aplicação separada usando Next.js. Vamos construir três rotas, uma com a listagem das fotos, outra com os detalhes e uma página de 404.

Uma dica para esse projeto é utilizar a CLI do Next.js para iniciar o projeto.

**Listagem**:

- A rota de listagem deverá mostrar as dez fotos retornadas pela API. Você pode escolher como exibir as fotos (grid, lista etc). Cada foto deve montar seu endereço utilizando o campo `path`     retornado na API;

- Em cada uma das fotos, mostre o título sob ela;

- Ao passar o mouse por cima dessas imagens, as dimensões do card devem aumentar e depois diminuir quando o mouse sair de cima do card;

- Ao clicar em uma foto, faça a página ser redirecionada para a rota `/image/:id`.

**Detalhes**:

- Na página de detalhes, mostre a foto, as informações de título, a categoria que a foto pertence, dados de quem fotografou e a data, no padrão `DD/MM/YYYY`;

- Ao clicar na categoria, levar para a listagem novamente, mas mostrando apenas as fotos daquela categoria.

---

## Recursos adicionais

- [O que é Server Side Rendering](https://medium.com/techbloghotmart/o-que-%C3%A9-server-side-rendering-e-como-usar-na-pr%C3%A1tica-a840d76a6dca) {: .external-link target="_blank" rel="noreferrer noopener" }

- [React Server Side Rendering Introduction For Beginners](https://www.youtube.com/watch?v=NwyQONeqRXA) {: .external-link target="_blank" rel="noreferrer noopener" }

- [What is Server-Side Rendering (and Why Create React App doesn't support it)](https://www.youtube.com/watch?v=8_RzRQXSHcg) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Por que você precisa conhecer o Next.js](https://medium.com/matilha-est%C3%BAdio/porque-voc%C3%AA-precisa-conhecer-o-next-js-358f6ba4c1ee) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
