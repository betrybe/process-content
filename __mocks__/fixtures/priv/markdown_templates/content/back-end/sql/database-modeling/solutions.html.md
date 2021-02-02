## Gabarito dos exercícios

A seguir encontra-se uma sugestão de solução para os exercícios propostos.

## Exercícios de fixação

### O que é e como lidar com uma `VIEW`

**Exercício 1:** Monte uma `VIEW`, usando as tabelas `film` e `language`, que exiba o **título do filme**, o **id do idioma** e o **idioma do filme**, como na imagem a seguir. Dê o nome de "**movies_languages**" à sua `VIEW`.

<%= figure(%{src: "/back-end/sql/images/view_challenge1.png", caption: "Resultado de \`SELECT * FROM movies_languages\`", class: "text-center rounded mx-auto d-block", width: "350px", height: "auto"}) %>

```language-sql
CREATE VIEW movies_languages AS
    SELECT f.title, f.language_id, l.name AS language
    FROM sakila.film f
    INNER JOIN sakila.language l ON l.language_id = f.language_id;
```

### Tudo que você deve saber sobre o `ALTER TABLE`

**Exercício 1:** Adicione uma coluna `memoria_ram` que deve armazenar um valor inteiro, mas não deve permitir valores nulos.

```language-sql
ALTER TABLE computador ADD COLUMN memoria_ram INT NOT NULL;
```

**Exercício 2:** A coluna `computador_id` deve ser o identificador da tabela computador. Transforme-a em uma `primary key`.

```language-sql
ALTER TABLE computador MODIFY COLUMN computador_id INT PRIMARY KEY;
```

**Exercício 3:** A coluna `computador_id` deve ser incrementada automaticamente a cada nova inserção de dados. Altere-a para refletir isso.

```language-sql
ALTER TABLE computador MODIFY computador_id INT auto_increment;
```

**Exercício 4:** A coluna `preco` precisa guardar valores decimais com valores de até R$99.999,99. Altere o tipo para se adequar a esse requisito.

```language-sql
ALTER TABLE computador MODIFY preco DECIMAL(7, 2);
```

**Exercício 5:** Modifique o nome da coluna `preco` para `valor`.

```language-sql
ALTER TABLE computador CHANGE COLUMN preco valor DECIMAL(7, 2);
```

### Como usar um `INDEX`

**Exercício 1:** Adicione um índice à coluna `district` da tabela `sakila.address`. Esse índice deve ser não textual e permitir registros duplicados. Mensure o resultado utilizando a seguinte query:

```language-sql
SELECT *
FROM sakila.address
WHERE district = 'Alberta';
```

```language-sql
CREATE INDEX district_index ON sakila.address (district);

SELECT *
FROM sakila.address
WHERE district = 'Alberta';

DROP INDEX district_index ON sakila.address;

SELECT *
FROM sakila.address
WHERE district = 'Alberta';
```

**Exercício 2:** Adicione um `FULLTEXT INDEX` à coluna `description` da tabela `sakila.film` e depois compare o custo da query abaixo com e sem índice.

```language-sql
-- Query para verificar custo com o uso de índice:
SELECT *
FROM sakila.film
WHERE
    MATCH(description)
    AGAINST('a Man And a Monkey who must Discover a Man in The First');

-- Query para verificar custo sem o uso índice:
SELECT *
FROM sakila.film
WHERE
    description LIKE '%a Man And a Monkey who must Discover a Man in The First%';
```

```language-sql
CREATE FULLTEXT INDEX description_index ON sakila.film (description);

SELECT *
FROM sakila.film
WHERE
    MATCH(description)
    AGAINST('a Man And a Monkey who must Discover a Man in The First');

DROP INDEX description_index ON sakila.film;

SELECT *
FROM sakila.film
WHERE
    description LIKE '%a Man And a Monkey who must Discover a Man in The First%';
```


## Exercícios

### Desafios sobre `VIEW`

**Exercício 1:** Crie uma view chamada `film_with_categories` utilizando as tabelas `category`, `film_category` e `film` do banco de dados `sakila`. Essa view deve exibir o `título` do filme, o `id` da categoria e o `nome` da categoria, conforme a imagem abaixo. Os resultados devem ser ordenados pelo `título` do filme.

<%= figure(%{src: "/back-end/sql/images/viewexercise1.png", caption: "Resultado de exemplo para uma consulta na view do exercício 1", class: "text-center rounded mx-auto d-block", width: "400px", height: "auto"}) %>

```language-sql
CREATE VIEW film_with_categories AS
    SELECT f.title, fc.category_id, c.name
    FROM sakila.film_category fc
    INNER JOIN sakila.film f ON f.film_id = fc.film_id
    INNER JOIN sakila.category c ON fc.category_id = c.category_id
    ORDER BY f.title;
```

**Exercício 2:** Crie uma view chamada `film_info` utilizando as tabelas `actor`, `film_actor` e `film` do banco de dados `sakila`. Sua view deve exibir o `actor_id`, o nome completo do ator ou da atriz em uma coluna com o `ALIAS` `actor` e o título dos filmes. Os resultados devem ser ordenados pelos nomes de atores e atrizes. Use a imagem a seguir como referência.

<%= figure(%{src: "/back-end/sql/images/view_challenge2.png", caption: "Resultado de exemplo para uma consulta na view do exercício 2", class: "text-center rounded mx-auto d-block", width: "400px", height: "auto"}) %>

```language-sql
CREATE VIEW film_info AS
    SELECT
        fa.actor_id,
        CONCAT(a.first_name, ' ', a.last_name) AS actor,
        f.title
    FROM sakila.film_actor fa
    INNER JOIN sakila.film f ON f.film_id = fa.film_id
    INNER JOIN sakila.actor a ON a.actor_id = fa.actor_id
    ORDER BY actor;
```

**Exercício 3:** Crie uma view chamada `address_info` que faça uso das tabelas `address` e `city` do banco de dados `sakila`. Sua view deve exibir o `address_id`, o `address`, o `district`, o `city_id` e a `city`. Os resultados devem ser ordenados pelo nomes das cidades. Use a imagem abaixo como referência.

<%= figure(%{src: "/back-end/sql/images/view_challenge3.png", caption: "Resultado de exemplo para uma consulta na view do exercício 3", class: "text-center rounded mx-auto d-block", width: "700px", height: "auto"}) %>

```language-sql
CREATE VIEW address_info AS
    SELECT a.address_id, a.address, a.district, a.city_id, c.city
    FROM sakila.address a
    INNER JOIN sakila.city c ON c.city_id = a.city_id
    ORDER BY c.city;
```

### Desafios sobre `INDEX`

**Exercício 1:** Verifique o impacto de um `FULLTEXT INDEX` na tabela `category` (banco de dados `sakila`) adicionando-o na coluna `name`. Após ter adicionado o índice, mensure o custo da query utilizando o execution plan, como já foi feito em lições anteriores. Após ter criado e mensurado o custo da query, exclua o índice e mensure novamente esse custo.

```language-sql
-- Após ter criado o índice, mensure o custo com a seguinte query:
SELECT *
FROM sakila.category
WHERE MATCH(name) AGAINST('action');

-- Após ter excluído o índice, mensure o custo com a seguinte query:
SELECT *
FROM sakila.category
WHERE name LIKE '%action%';
```

```language-sql
CREATE FULLTEXT INDEX category_name_index ON category(name);

SELECT *
FROM sakila.category
WHERE MATCH(name) AGAINST('action');

DROP INDEX category_name_index ON category;

SELECT *
FROM sakila.category
WHERE name LIKE '%action%';
```

**Exercício 2:** Verifique o impacto de um `INDEX` na tabela `address` (banco de dados `sakila`) adicionando-o na coluna `postal_code`. Após ter adicionado o índice, mensure o custo da query utilizando o execution plan, como já foi feito em lições anteriores. Após ter criado e mensurado o custo da query, exclua o índice e mensure novamente esse custo.

```language-sql
-- Mensure o custo com a seguinte query:
SELECT *
FROM sakila.address
WHERE postal_code = '36693';
```

```language-sql
CREATE INDEX postal_code_index ON address(postal_code);

SELECT *
FROM sakila.address
WHERE postal_code = '36693';

DROP INDEX postal_code_index ON address;

SELECT *
FROM sakila.address
WHERE postal_code = '36693';
```

