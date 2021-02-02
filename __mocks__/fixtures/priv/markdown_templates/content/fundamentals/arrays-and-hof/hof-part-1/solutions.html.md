## Gabarito dos exercícios

Utilize os dados referentes a `books` para os exercícios. A seguir, temos possíveis soluções para cada um.

```language-javascript
const books = [
  {
    id: 1,
    name: 'As Crônicas de Gelo e Fogo',
    genre: 'Fantasia',
    author: {
      name: 'George R. R. Martin',
      birthYear: 1948
    },
    releaseYear: 1991,
  },
  {
    id: 2,
    name: 'O Senhor dos Anéis',
    genre: 'Fantasia',
    author: {
      name: 'J. R. R. Tolkien',
      birthYear: 1892,
    },
    releaseYear: 1954,
  },
  {
    id: 3,
    name: 'Fundação',
    genre: 'Ficção Científica',
    author: {
      name: 'Isaac Asimov',
      birthYear: 1920,
    },
    releaseYear: 1951,
  },
  {
    id: 4,
    name: 'Duna',
    genre: 'Ficção Científica',
    author: {
      name: 'Frank Herbert',
      birthYear: 1920,
    },
    releaseYear: 1965,
  },
  {
    id: 5,
    name: 'A Coisa',
    genre: 'Terror',
    author: {
      name: 'Stephen King',
      birthYear: 1947
    },
    releaseYear: 1986,
  },
  {
    id: 6,
    name: 'O Chamado de Cthulhu',
    genre: 'Terror',
    author: {
      name: 'H. P. Lovecraft',
      birthYear: 1890,
    },
    releaseYear: 1928,
  },
];
```

### Exercício 1

Encontre o nome da primeira pessoa autora do livro nascida no ano de 1947

* `exercise1.js`

```language-javascript
function authorBornIn1947() {
  return books.find(book => book.author.birthYear === 1947).author.name;
}
```


### Exercício 2

Retorne o nome do livro de menor nome.

  * `exercise2.js`

```language-javascript

function smallerName() {
  let nameBook;
  // escreva aqui o seu código
  books.forEach((book) => {
    if (!nameBook || book.name.length < nameBook.length) {
      nameBook = book.name;
    }
  });
  // Variável nameBook que receberá o valor do menor nome;
  return nameBook;
}
```

### Exercício 3

Encontre o livro cujo nome possui 26 caracteres.

   * `exercise3.js`

```language-javascript

function getNamedBook() {
  return books.find((book) => book.name.length === 26);
}
```

### Exercício 4

Ordene os livros por data de lançamento em ordem descrescente.

   * `exercise4.js`

```language-javascript

function booksOrderedByReleaseYearDesc() {
  return books.sort((bookA, bookB) => bookB.releaseYear - bookA.releaseYear);
}
```


### Exercício 5

Faça uma função que retorne `true`, se todas as pessoas autoras nasceram no século XX, ou `false`, caso contrário.

  * `exercise5.js`

```language-javascript

function everyoneWasBornOnSecXX() {
  return books.every(book => (
    book.author.birthYear > 1900 && book.author.birthYear <= 2000
  ));
}
```

### Exercício 6

Faça uma função que retorne `true`, se algum livro foi lançado na década de 80, e `false`, caso contrário.

   * `exercise6.js`

```language-javascript

function someBookWasReleaseOnThe80s() {
  return books.some(book => book.releaseYear >= 1980 && book.releaseYear <= 1989);
}
```

### Exercício 7

Faça uma função que retorne `true`, caso nenhum author tenha nascido no mesmo ano, e `false`, caso contrário.

   * `exercise7.js`

```language-javascript

function authorUnique() {
  return books.every((book)=>
    !books.some((bookSome)=> 
      (bookSome.author.birthYear === book.author.birthYear) && (bookSome.author.name !== book.author.name)
  ));
}
```
