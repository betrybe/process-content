## Gabarito dos exercícios

A seguir encontra-se uma sugestão de solução para os exercícios propostos.

---

### Solução dos exercícios

1. Escreva uma query para exibir todas as peças que começam com `GR`.

```language-sql
USE PecasFornecedores;
SELECT * FROM Pecas WHERE name LIKE 'GR%';
```

2. Escreva uma query para exibir todos os fornecimentos que contenham a peça com code 2. Organize o resultado por alfabética de fornecedor.

```language-sql
USE PecasFornecedores;
SELECT * FROM Fornecimentos WHERE peca = 2 ORDER BY fornecedor;
```

3. Escreva uma query para exibir as peças e o preço de todos os fornecimentos em que o código do fornecedor tenha a letra `N`.

```language-sql
USE PecasFornecedores;
SELECT peca, preco FROM Fornecimentos WHERE fornecedor LIKE '%N%';
```

4. Escreva uma query para exibir todas as informações dos fornecedores que são empresas limitadas (LTDA). Ordene os resultados em ordem alfabética decrescente.

```language-sql
USE PecasFornecedores;
SELECT * FROM Fornecedores WHERE name LIKE '%LTDA' ORDER BY name DESC;
```

5. Escreva uma query para exibir o número de empresas (fornecedores) que contém a letra `F` no código.

```language-sql
USE PecasFornecedores;
SELECT count(*) FROM Fornecedores WHERE code LIKE '%F%';
```

6. Escreva uma query para exibir os fornecimentos onde as peças custam mais de `R$15,00` e menos de `$40,00`. Ordene os resultados por ordem crescente.

```language-sql
USE PecasFornecedores;
SELECT * FROM Fornecimentos WHERE preco BETWEEN 15 AND 40 ORDER BY preco;
```

7. Escreva uma query para exibir o número de vendas feitas entre o dia `15/04/2018` e o dia `30/07/2019`.

```language-sql
USE PecasFornecedores;
SELECT count(*) FROM Vendas WHERE DATE(order_date) BETWEEN '2018-04-15' AND '2019-07-30';
```

---

### Solução dos exercícios bônus

1. Escreva uma query para exibir todas as informações de todos os cientistas que possuam a letra e em seu nome.

```language-sql
SELECT * FROM Scientists WHERE Name LIKE "%e%";
```

2. Escreva uma query para exibir o nome de todos os projetos cujo o código inicie com a letra A . Ordene o resultado em ordem alfabética.

```language-sql
SELECT * FROM Projects WHERE Name LIKE "a%" ORDER BY name ASC;
```

3. Escreva uma query para exibir o código e nome de todos os projetos que possuam em seu código o número 3 . Ordene o resultado em ordem alfabética.

```language-sql
SELECT * FROM Projects WHERE Code LIKE "%3%" ORDER BY Name;
```

4. Escreva uma query para exibir todos os cientistas cujos projetos sejam AeH3 , Ast3 ou Che1 .

```language-sql
SELECT Scientist FROM AssignedTo WHERE Project in ('AeH3', 'Ast3', 'Che1');
```

5. Escreva uma query para exibir todas as informações de todos os projetos com mais de 500 horas.

```language-sql
SELECT * FROM Projects WHERE Hours > 500;
```

6. Escreva uma query para exibir todas as informações de todos os projetos cujas horas sejam maiores que 250 e menores 800.

```language-sql
SELECT * FROM Projects WHERE Hours > 250 AND Hours < 800; // ou
SELECT * FROM Projects WHERE Hours BETWEEN 250 AND 800;
```

7. Escreva uma query para exibir o nome e o código de todos os projetos cujo nome NÃO inicie com a A .

```language-sql
SELECT * FROM Projects WHERE Name NOT LIKE 'A%';
```

8. Escreva uma query para exibir o nome de todos os projetos cujo código contenha a letra H .

```language-sql
SELECT * FROM Projects WHERE Code LIKE '%H%';
```
