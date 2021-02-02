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

function formatedBookNames() {
  return books.map(book => `${book.name} - ${book.genre} - ${book.author.name}`);
}
console.log(formatedBookNames());

function nameAndAge() {
  return books
    .map(book => (
      {
        author: book.author.name,
        age: book.releaseYear - book.author.birthYear
      }
    ))
    .sort((obj1, obj2) => obj1.age - obj2.age);
}
console.log(nameAndAge());

function fantasyOrScienceFiction() {
  // escreva seu código aqui
  return books.filter(book => (
    book.genre === 'Fantasia' || book.genre === 'Ficção Científica'
  ));
};

console.log(fantasyOrScienceFiction());

function oldBooks() {
  const currentYear = new Date().getFullYear();
  return books.filter(book => (
    book.releaseYear < currentYear - 60
  )).sort((bookA, bookB) => bookA.releaseYear - bookB.releaseYear);
}

console.log(oldBooks());

function fantasyOrScienceFictionAuthors() {
  const wantedGenres = ['Fantasia', 'Ficção Científica'];
  return books
    .filter(book => wantedGenres.includes(book.genre))
    .map(book => book.author.name).sort();
}

console.log(fantasyOrScienceFictionAuthors());

function filterOldBooks() {
  const currentYear = new Date().getFullYear();
  return books
    .filter(book => currentYear - book.releaseYear > 60)
    .map(book => book.name);
}

console.log(filterOldBooks());

function authorWith3DotsOnName() {
  return books.find(book => (
    book.author.name.split(' ').filter(word => word.endsWith('.')).length === 3
  )).name;
}
console.log(authorWith3DotsOnName());
