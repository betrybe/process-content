## Gabarito dos exercícios

A seguir encontra-se uma sugestão de solução para os exercícios propostos.

---

## Exercícios de fixação

### Como utilizar o `INNER JOIN`

**Exercício 1:** Monte uma _query_ que exiba o **id do ator**, **nome do ator** e **id do filme** em que ele já atuou usando as tabelas `actor` e `film_actor`.

```language-sql
SELECT A.actor_id, A.first_name, F.film_id
FROM sakila.actor AS A
INNER JOIN sakila.film_actor AS F ON A.actor_id = F.actor_id;
```

**Exercício 2:** Use o `JOIN` para exibir o **nome**, **sobrenome** e **endereço** de cada um dos funcionários do banco. Use as tabelas `staff` e `address`.

```language-sql
SELECT first_name, last_name, address
FROM sakila.staff AS S
INNER JOIN sakila.address AS A ON S.address_id = A.address_id;
```

**Exercício 3:**  Exiba o **id do cliente**, **nome** e **email** dos primeiros 100 clientes, ordenados pelo nome em ordem decrescente, juntamente com o **id do endereço** e o **nome da rua** onde o cliente mora. Essas informações podem ser encontradas nas tabelas `customer` e `address`.

```language-sql
SELECT C.customer_id, C.first_name, C.email, C.address_id, A.address
FROM sakila.customer AS C
INNER JOIN sakila.address AS A ON C.address_id = A.address_id
ORDER BY C.first_name DESC
LIMIT 100;
```

**Exercício 4:** Exiba o **nome**, **email**, **id do endereço**, **endereço** e **distrito** dos clientes que moram no distrito da California e que contêm "rene" em seus nomes. As informações podem ser encontradas nas tabelas `address` e `customer`.

```language-sql
SELECT C.first_name, C.email, C.address_id, A.address, A.district
FROM sakila.customer AS C
INNER JOIN sakila.address AS A ON C.address_id = A.address_id
WHERE
    A.district = 'California'
    AND C.first_name LIKE '%rene%';
```

**Exercício 5:** Exiba o **nome** e a **quantidade de endereços** dos clientes cadastrados. Ordene seus resultados por nomes de forma decrescente. Exiba somente os clientes ativos. As informações podem ser encontradas na tabela `address` e `customer`.

```language-sql
SELECT c.first_name, count(a.address)
FROM sakila.customer c
INNER JOIN address a ON a.address_id = c.address_id
WHERE c.active = 1
GROUP BY c.first_name
ORDER BY first_name DESC;
```

**Exercício 6:** Monte uma _query_ que exiba o **nome**, **sobrenome** e a **média de valor** (`amount`) paga aos funcionários no ano de 2006. Use as tabelas `payment` e `staff`. Os resultados devem estar agrupados pelo nome e sobrenome do funcionário.

```language-sql
SELECT stf.first_name, stf.last_name, AVG(pay.amount)
FROM staff AS stf
INNER JOIN payment pay ON stf.staff_id = pay.staff_id
WHERE year(pay.payment_date) = 2006
GROUP BY stf.first_name, stf.last_name;
```

**Exercício 7:** Monte uma _query_ que exiba o **id do ator**, **nome**, **id do filme** e **titulo do filme**, usando as tabelas `actor`, `film_actor` e `film`. Dica: você precisará fazer mais de um `JOIN` na mesma _query_.

```language-sql
SELECT A.actor_id, A.first_name, F.film_id, F.title
FROM sakila.actor AS A
INNER JOIN sakila.film_actor AS FA ON A.actor_id = FA.actor_id
INNER JOIN sakila.film AS F ON F.film_id = FA.film_id;
```

### O que é `SELF JOIN` e quando utilizá-lo

**Exercício 1:** Queremos saber os **ids** e **custos de substituição** dos filmes que possuem o mesmo custo de substituição.

```language-sql
SELECT A.film_id, A.replacement_cost, B.film_id, B.replacement_cost
FROM sakila.film AS A, sakila.film AS B
WHERE A.replacement_cost = B.replacement_cost;
```

**Exercício 2:** Exiba o **titulo** e a **duração de empréstimo** dos filmes que possuem a mesma duração. Exiba apenas os filmes com a duração de empréstimo entre 2 a 4 dias.

```language-sql
SELECT A.title, A.rental_duration, B.title, B.rental_duration
FROM sakila.film AS A, sakila.film AS B
WHERE A.rental_duration = B.rental_duration
HAVING A.rental_duration BETWEEN 2 AND 4;
```

### Como unir resultados com o `UNION` e o `UNION ALL`

**Exercício 1:** Todos os funcionários foram promovidos a atores. Monte uma _query_ que exiba a união da tabela `staff` com a tabela `actor`, exibindo apenas o `nome` e o `sobrenome`. Seu resultado não deve excluir nenhum funcionário ao unir as tabelas.

```language-sql
SELECT first_name, last_name FROM sakila.actor
UNION ALL
SELECT first_name, last_name FROM sakila.staff;
```

**Exercício 2:** Monte uma _query_ que una os resultados das tabelas `customer` e `actor`, exibindo os nomes que contém a palavra "tracy" na tabela `customer` e os que contém "je" na tabela `actor`. Exiba apenas os resultados únicos.

```language-sql
SELECT first_name FROM customer WHERE first_name LIKE '%tracy%'
UNION
SELECT first_name FROM actor WHERE first_name LIKE '%je%';
```

**Exercício 3:** Monte uma _query_ que exiba a união dos 5 últimos **nomes** da tabela `actor`, o primeiro nome da tabela `staff` e 5 **nomes** a partir da 15ª posição da tabela `customer`. Não permita que dados repetidos sejam exibidos. Ordene os resultados em ordem alfabética.

```language-sql
(SELECT first_name from sakila.actor ORDER BY actor_id DESC LIMIT 5)
UNION
(SELECT first_name from sakila.staff LIMIT 1)
UNION
(SELECT first_name FROM sakila.customer LIMIT 5 OFFSET 15)
ORDER BY first_name;
```

**Exercício 4:** Você quer exibir uma lista paginada com os **nomes** e **sobrenomes** de todos os clientes e atores do banco de dados, em ordem alfabética. Considere que a paginação está sendo feita de 15 em 15 resultados e que você está na 4ª página. Monte uma _query_ que simule esse cenário.

```language-sql
(SELECT first_name, last_name
 FROM   sakila.customer
 ORDER  BY first_name, last_name
 LIMIT  60)
UNION
(SELECT first_name, last_name
 FROM   sakila.actor
 ORDER  BY first_name, last_name
 LIMIT  60)
ORDER  BY first_name, last_name
LIMIT 15
OFFSET 45;
```
