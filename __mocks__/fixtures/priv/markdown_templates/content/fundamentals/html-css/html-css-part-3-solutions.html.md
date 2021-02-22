## Gabarito dos exercícios

A seguir temos uma possível solução para os exercícios:

---

### Agrupamento de Seletores e Pseudoclasses

#### CSS para Agrupando Seletores

```language-css

h1, p {
  text-align: center;
}

li:hover {
  background-color: teal;
}

li:active {
  color: white;
}

ul, ol {
  list-style: none;
}
```

#### CSS para Pseudoclasses

```language-css

div:hover {
  border: 2px solid black;
}

div:nth-of-type(1) {
  background-color: royalblue;
}

div:nth-of-type(2) {
  background-color: aqua;
}

div:nth-of-type(3) {
  background-color: orange;
  height: 50px;
}

div:nth-of-type(4) {
  background-color:skyblue;
}

div:nth-of-type(5) {
  background-color: darkblue;
}

div:nth-of-type(2n+1) h3 {
  font-style: italic;
}
```
