## Gabarito dos exercícios

A seguir encontra-se uma sugestão de solução para os exercícios propostos.

---

## Exercícios de fixação

### Criando queries mais dinâmicas através do `EXISTS`

**Exercício 1:** Usando o `EXISTS` na tabela `books_lent` e `books`, exiba o **id** e **título** dos livros que ainda não foram emprestados.

```language-sql
SELECT id, title
FROM hotel.books AS b
WHERE NOT EXISTS(
    SELECT *
    FROM hotel.books_lent
    WHERE b.Id = book_id
);
```

**Exercício 2:** Usando o `EXISTS` na tabela `books_lent` e `books`, exiba o **id** e **título** dos livros estão atualmente emprestados e que contem a palavra "lost" no título.

```language-sql
SELECT id, title
FROM hotel.books b
WHERE EXISTS(
    SELECT *
    FROM hotel.books_lent
    WHERE b.Id = book_id AND b.title like '%lost%'
);
```

**Exercício 3:** Usando a tabela `carsales` e `customer`, exiba apenas o nome dos clientes que ainda não compraram um carro.

```language-sql
SELECT name
FROM hotel.customers c
WHERE NOT EXISTS(
    SELECT *
    FROM carsales
    WHERE customerid = c.customerid
);
```

**Exercício 4:** Usando o comando `EXISTS` em conjunto com `JOIN` e as tabelas `cars`, `customer` e `carsales`, exiba o **nome do cliente** e o **modelo do carro** de todos os clientes que fizeram compras de carros.

```language-sql
SELECT cus.name, car.name
FROM cars car
INNER JOIN customers cus
WHERE EXISTS(
    SELECT *
    FROM hotel.carsales
    WHERE CustomerID = cus.CustomerId
    AND carID = car.ID
);
```


### Stored Procedures

**Exercício 1:** Monte uma procedure que exiba os 10 atores mais populares, baseado em sua quantidade de filmes. Essa procedure não deve receber parâmetros de entrada ou saída e, quando chamada, deve exibir o **id do ator ou atriz** e a **quantidade de filmes** atuados.

```language-sql
USE sakila;
DELIMITER $$

CREATE PROCEDURE ShowTop10Actors()
BEGIN
    SELECT actor_id, COUNT(*) AS 'quantidade de filmes'
    FROM film_actor
    GROUP BY actor_id
    ORDER BY COUNT(*) DESC
    LIMIT 10;
END $$

DELIMITER ;

-- Como usar:

CALL ShowTop10Actors();
```

**Exercício 2:** Monte uma procedure que receba como parâmetro o nome da categoria desejada em uma `string` e que exiba o **id do filme**, seu **titulo**, o **id de sua categoria** e o **nome da categoria** selecionada. Use as tabelas `film`, `film_category` e `category` para montar essa procedure.

```language-sql
USE sakila;
DELIMITER $$

CREATE PROCEDURE FindMovieByCategory(IN category VARCHAR(100))
BEGIN
    SELECT f.film_id, f.title, fc.category_id, c.name
    FROM sakila.film f
    INNER JOIN sakila.film_category fc ON f.film_id = fc.film_id
    INNER JOIN sakila.category c ON c.category_id = fc.category_id
    WHERE c.name = category;
END $$

DELIMITER ;

-- Como usar:

CALL FindMovieByCategory('Action');
```

**Exercício 3:** Monte uma procedure que receba o email de um cliente como parâmetro de entrada e diga se o cliente está ou não ativo, através de um parâmetro de saída.

```language-sql
USE sakila;
DELIMITER $$

CREATE PROCEDURE CheckIfActiveClient(
    IN client_email VARCHAR(200),
    OUT isActive BOOL
)
BEGIN
    SET isActive = (
        SELECT active
        FROM sakila.customer
        WHERE email = client_email
    );
END $$

DELIMITER ;

-- Como usar:

SELECT @ActiveStatus;
CALL CheckIfActiveClient('MARY.SMITH@sakilacustomer.org', @ActiveStatus);
SELECT @ActiveStatus;
```

### Stored Functions

**Exercício 1:** Utilizando a tabela `sakila.payment`, monte uma function que retorna a **quantidade total de pagamentos** feitos até o momento por um determinado `customer_id`.

```language-sql
USE sakila;
DELIMITER $$

CREATE FUNCTION GetTotalPayments(id INT)
RETURNS INT READS SQL DATA
BEGIN
    DECLARE total_payments INT;
    SELECT COUNT(*)
    FROM sakila.payment
    WHERE customer_id = id INTO total_payments;
    RETURN total_payments;
END $$

DELIMITER ;

-- Como usar:

SELECT GetTotalPayments(2);
```

**Exercício 2:** Crie uma function que, dado o parâmetro de entrada `inventory_id`, retorna o **nome do filme** vinculado ao registro de inventário com esse id.

```language-sql
USE sakila;
DELIMITER $$

CREATE FUNCTION GetCorrespondingFilm(id INT)
RETURNS VARCHAR(500) READS SQL DATA
BEGIN
    DECLARE movie_title VARCHAR(500);
    SELECT distinct F.title
    FROM sakila.inventory I
    INNER JOIN sakila.film F
    ON F.film_id = I.film_id
    WHERE I.inventory_id = id INTO movie_title;
    RETURN movie_title;
END $$

DELIMITER ;

-- Como usar:

SELECT GetCorrespondingFilm(2);
```

**Exercício 3:** Crie uma function que receba uma determinada **categoria de filme** em formato de texto (ex: `'Action'`, `'Horror'`) e retorna a **quantidade total de filmes** registrados nessa categoria.

```language-sql
USE sakila;
DELIMITER $$

CREATE FUNCTION GetMovieAmountInCategory(category VARCHAR(100))
RETURNS INT READS SQL DATA
BEGIN
    DECLARE movie_amount INT;
    SELECT COUNT(*)
    FROM sakila.category c
    INNER JOIN sakila.film_category fc ON fc.category_id = c.category_id
    WHERE c.name = category INTO movie_amount;
    RETURN movie_amount;
END $$

DELIMITER ;

-- Como usar:

SELECT GetMovieAmountInCategory('Horror');
```

### Criando reações dinâmicas com `Triggers`

**Exercício 1:** Crie um `TRIGGER`, que a cada nova inserção feita na tabela `carros`, defina o valor da coluna `data_atualizacao` para o momento do ocorrido, a `acao` para `'INSERÇÃO'` e a coluna `disponivel_em_estoque` para `1`.

```language-sql
USE betrybe_automoveis;

DELIMITER $$
CREATE TRIGGER trigger_carro_insert
    BEFORE INSERT ON carros
    FOR EACH ROW
BEGIN
    SET NEW.data_atualizacao = NOW(),
        NEW.acao = 'INSERÇÃO',
        NEW.disponivel_em_estoque = 1;
END; $$
DELIMITER ;
```

**Exercício 2:** Crie um `TRIGGER` que, a cada atualização feita na tabela `carros`, defina o valor da coluna `data_atualizacao` para o momento do ocorrido e a `acao` para para `'ATUALIZAÇÃO'`.

```language-sql
USE betrybe_automoveis;

DELIMITER $$
CREATE TRIGGER trigger_carro_update
    BEFORE UPDATE ON carros
    FOR EACH ROW
BEGIN
    SET NEW.data_atualizacao = NOW(),
        NEW.acao = 'ATUALIZAÇÃO';
END; $$
DELIMITER ;
```

**Exercício 3:** Crie um `TRIGGER` que, a cada exclusão feita na tabela `carros`, envie para a tabela `log_operacoes` as informações do `tipo_operacao` como `'EXCLUSÃO'` e a `data_ocorrido` como o momento da operação.

```language-sql
USE betrybe_automoveis;

DELIMITER $$
CREATE TRIGGER trigger_perfil_delete
    AFTER DELETE ON carros
    FOR EACH ROW
BEGIN
    INSERT INTO log_operacoes(tipo_operacao, data_ocorrido)
    VALUES ('EXCLUSÃO', NOW());
END; $$
DELIMITER ;
```

### Desafios sobre `Triggers`

Para realizar os exercícios a seguir, execute este script:

```language-sql
CREATE DATABASE IF NOT EXISTS BeeMovies;

USE BeeMovies;

CREATE TABLE movies(
    movie_id INT PRIMARY KEY auto_increment,
    ticket_price DECIMAL(12, 2) NOT NULL DEFAULT 0,
    ticket_price_estimation VARCHAR(15),
    release_year YEAR
) engine = InnoDB;

CREATE TABLE movies_logs(
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    movie_id INT NOT NULL,
    action VARCHAR(15) NOT NULL,
    log_date DATE NOT NULL
) engine = InnoDB;
```

**Exercício 1:** Crie um `Trigger` para `INSERT` que deve definir o valor do campo `release_year` da tabela `movies` como o ano atual de forma dinâmica, sem haver a necessidade de digitar manualmente o valor do ano. Além disso, crie um outro `Trigger` para `INSERT` que adiciona um novo registro na tabela `movies_logs`, informando o `movie_id` do filme que acaba de ser inserido na tabela `movies`, a `action` como `'INSERT'` e a `log_date` como a data atual.

```language-sql
USE BeeMovies;

DELIMITER $$

CREATE TRIGGER trigger_movie_insert
    BEFORE INSERT ON movies
    FOR EACH ROW
BEGIN
    SET NEW.release_year = YEAR(NOW());
END; $$

CREATE TRIGGER trigger_movie_log_insert
    AFTER INSERT ON movies
    FOR EACH ROW
BEGIN
    INSERT INTO movies_logs(movie_id, action, log_date)
    VALUES(NEW.movie_id, 'INSERT', NOW());
END; $$

DELIMITER ;
```

**Exercício 2:** Crie um `Trigger` para `UPDATE` que, ao receber uma alteração na tabela `movies`, deve comparar o valor anterior de `ticket_price` com o valor sendo inserido nesta atualização. Caso o valor seja maior que o anterior, insira na coluna `ticket_price_estimation` o valor de `'Increasing'`. Caso contrário, insira o valor `'Decreasing'`. Adicionalmente, insira um novo registro na tabela `movies_logs`, contendo informações sobre o registro alterado (`movie_id`, `action` e `log_date`).

```language-sql
USE BeeMovies;

DELIMITER $$
CREATE TRIGGER trigger_movie_update
    BEFORE UPDATE ON movies
    FOR EACH ROW
BEGIN
    SET NEW.ticket_price_estimation = IF(NEW.ticket_price > OLD.ticket_price, 'Increasing', 'Decreasing');
    INSERT INTO movies_logs(movie_id, action, log_date)
    VALUES(NEW.movie_id, 'UPDATE', NOW());
END; $$
DELIMITER ;
```

**Exercício 3:** Crie um `Trigger` na tabela `movies` que, ao ter algum de seus registros excluídos, deve enviar uma informação para a tabela `movies_logs`, onde deve ser guardada a data da exclusão, a `action` `'DELETE'` e o id do filme excluído.

```language-sql
USE BeeMovies;

DELIMITER $$
CREATE TRIGGER trigger_movie_delete
    BEFORE DELETE ON movies
    FOR EACH ROW
BEGIN
    INSERT INTO movies_logs(movie_id, action, log_date)
    VALUES(OLD.movie_id, 'DELETE', NOW());
END; $$
DELIMITER ;
```