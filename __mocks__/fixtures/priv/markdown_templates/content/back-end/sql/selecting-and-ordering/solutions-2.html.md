## Gabarito dos exercícios

A seguir encontra-se uma sugestão de solução para os exercícios propostos.

---

### Solução dos exercícios bônus

1. Escreva uma query para exibir todas as informações de todos os cientistas que possuam a letra e em seu nome.

```language-sql
SELECT * FROM scientists WHERE Name LIKE "%e%";
```

2. Escreva uma query para exibir o nome de todos os projetos cujo o código inicie com a letra A . Ordene o resultado em ordem alfabética.

```language-sql
SELECT * FROM projects WHERE Name LIKE "a%" ORDER BY name ASC;
```

3. Escreva uma query para exibir o código e nome de todos os projetos que possuam em seu código o número 3 . Ordene o resultado em ordem alfabética.

```language-sql
SELECT * FROM projects WHERE Code LIKE "%3%";
```

4. Escreva uma query para exibir todos os cientistas cujos projetos sejam AeH3 , Ast3 ou Che1 .

```language-sql
SELECT * FROM Scientists WHERE SSN in (SELECT Scientist FROM AssignedTo WHERE Project in ('AeH3', 'Ast3', 'Che1'));
```

5. Escreva uma query para exibir todas as informações de todos os projetos com mais de 500 horas.

```language-sql
SELECT * FROM projects WHERE Hours > 500;
```

6. Escreva uma query para exibir todas as informações de todos os projetos cujas horas sejam maiores que 250 e menores 800.

```language-sql
SELECT * FROM projects WHERE Hours > 250 AND Hours < 800; // ou
SELECT * FROM projects WHERE Hours BETWEEN 250 AND 800;
```

7. Escreva uma query para exibir o nome e o código de todos os projetos cujo nome NÃO inicie com a A .

```language-sql
SELECT * FROM projects WHERE Name NOT LIKE 'A%';
```

8. Escreva uma query para exibir o nome de todos os projetos cujo código contenha a letra H .

```language-sql
SELECT * FROM projects WHERE Code LIKE '%H%';
```
