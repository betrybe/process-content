## Gabarito dos exercícios

A seguir encontra-se uma sugestão de solução para os exercícios propostos.

## Exercícios de fixação

### Tabela **vazia**? Vamos resolver isso ae! `INSERT` na prática

**Exercício 1:** Insira um novo funcionário na tabela `sakila.staff`.

Para saber quais campos são obrigatórios, clique com o botão direito na tabela `sakila.staff` e selecione "Table Inspector". Clique na aba "columns" e verifique quais campos aceitam nulos para te guiar. Lembre-se de que valores que são gerados automaticamente não precisam ser inseridos manualmente. Boa explorada!

```language-sql
INSERT INTO `sakila`.`staff`
    (first_name, last_name, address_id, email, store_id, active, username, password)
VALUES
    ('Geralt', 'of Rivia', 2, 'tossacoin@gmail.com', 1, 1, 'geralt', 'theWhiteWolf');
```

**Exercício 2:** Feito o exercício anterior, vamos agora para o nível 2. Insira 2 funcionários novos em apenas uma *query*.

```language-sql
INSERT INTO `sakila`.`staff`
    (first_name, last_name, address_id, email, store_id, active, username, password)
VALUES
    ('Jeff', 'Bezos', 2, 'jeffbezos@gmail.com', 1, 1, 'jeffb', 'ImTheChamp'),
    ('Sekiro', 'Okami', 2, 'sekirowolf@gmail.com', 1, 1, 'okami', 'SekiroTheSamurai');
```

**Exercício 3:** Selecione os 5 primeiros nomes e sobrenomes da tabela `sakila.customer` e cadastre essas pessoas como atores na tabela `sakila.actor`.

```language-sql
INSERT INTO sakila.actor(first_name, last_name)
	SELECT first_name, last_name
    FROM sakila.customer
    ORDER BY customer_id
    LIMIT 5;
```

**Exercício 4:** Cadastre 3 categorias de uma vez só na tabela `sakila.category`.

```language-sql
INSERT INTO sakila.category (name)
VALUES
    ('Sci-Fi'),
    ('Fantasy'),
    ('Biography');
```

**Exercício 5:** Cadastre 1 nova loja na tabela `sakila.store`.

```language-sql
INSERT INTO sakila.store (manager_staff_id, address_id)
VALUES (3, 3);
```

### Digitou algo errado? De boa, vamos dar um `UPDATE`

Rode o seguinte comando em uma janela de *query* dentro do MySQL Workbench **sempre** que abri-lo, para desabilitar essa funcionalidade antes de executar seus comandos `UPDATE` ou `DELETE`:

```language-sql
SET SQL_SAFE_UPDATES = 0;
```

**Exercício 1:** Atualize o primeiro nome de todas as pessoas da tabela `sakila.actor`, que possuem o primeiro nome "JULIA", para "JULES".

```language-sql
UPDATE sakila.actor
SET first_name = 'JULES'
WHERE first_name = 'JULIA';
```

**Exercício 2:** Foi exigido que a categoria "Sci-Fi" seja alterada para "Science Fiction".

```language-sql
UPDATE sakila.category
SET name = 'Science Fiction'
WHERE name = 'Sci-Fi';
```

**Exercício 3:** Atualize o valor do aluguel para $25 de todos os filmes com duração maior que 100 minutos e que possuem a classificações **"G"**, **"PG"** ou **"PG-13"** e um custo de substituição maior que $20.

```language-sql
UPDATE sakila.film
SET rental_rate = 25
WHERE length > 100
AND (rating = 'G' OR rating = 'PG' OR rating = 'PG-13')
AND replacement_cost > 20;
```

**Exercício 4:** Foi determinado pelo setor financeiro que haverá um reajuste em todos os preços dos filmes, com base em sua duração. Para todos os filmes com duração entre 0 e 100, o valor do aluguel passará a ser $10,00, e o aluguel dos filmes com duração acima de 100 passará a ser de $20,00.

```language-sql
UPDATE sakila.film
SET rental_rate = (
    CASE
        WHEN length BETWEEN 1 AND 100 THEN 10
        WHEN length > 100 THEN 20
    END
);
```

### Como assim, alguém te cadastrou **sem você deixar**? Vamos dar um `DELETE` nisso!

**Exercício 1:** Exclua do banco de dados o ator com o nome de "KARL".

```language-sql
-- Primeiro descubra os IDs relacionados ao nome
SELECT actor_id
FROM sakila.actor
WHERE first_name = 'KARL';

-- Em seguida, apague suas referências
DELETE FROM sakila.film_actor
WHERE actor_id = 12;

-- Depois exclua o item original
DELETE FROM sakila.actor
WHERE first_name = 'KARL';
```

**Exercício 2:** Exclua do banco de dados o ator com o nome de "MATTHEW".

```language-sql
-- Primeiro descubra os IDs relacionados ao nome
SELECT actor_id
FROM sakila.actor
WHERE first_name = 'MATTHEW';

-- Em seguida, apague as referências
DELETE FROM sakila.film_actor
WHERE actor_id IN (8, 103, 181);

-- Depois exclua o item original
DELETE FROM sakila.actor
WHERE first_name = 'MATTHEW';
```

**Exercício 3:** Exclua da tabela `film_text` todos os registros que possuem a palavra "saga" em suas descrições.

```language-sql
DELETE FROM sakila.film_text
WHERE DESCRIPTION LIKE '%saga%';
```

**Exercício 4:** Apague da maneira mais performática possível todos os registros das tabelas `film_actor` e `film_category`.

```language-sql
TRUNCATE sakila.film_actor;
TRUNCATE sakila.film_category;
```

**Exercício 5:** Inspecione todas as tabelas do banco de dados `sakila` e analise quais restrições `ON DELETE` foram impostas em cada uma. Use o Table Inspector para fazer isso (aba DDL).

Basta inspecionar e analisar uma a uma.

**Exercício 6:** Exclua o banco de dados e o recrie (use as instruções do início desta aula).

1. Abra o **MySQL Workbench** e se conecte a ele.

2. Selecione o banco `sakila` na lista de bancos de dados com o botão direito e clique em "**Drop Schema**".

3. Selecione **"Drop Now"**.

4. Clique com o botão direito [neste link](/back-end/sakila.sql) {: .external-link target="_blank" rel="noreferrer noopener" } e salve como arquivo `.sql`.

5. Selecione todo o conteúdo do arquivo **(CTRL + A)** e cole-o dentro de uma janela de nova *query* no **MySQL Workbench**.

6. Clique em executar para restaurar o banco de dados.

    <%= figure(%{src: "/back-end/sql/images/RestoringDatabase.png", caption: "Restaurando o banco \`sakila\`", class: "text-center rounded mx-auto d-block", width: "500px", height: "auto"}) %>
