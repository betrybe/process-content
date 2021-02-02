## O que vamos aprender?

Olá, boas vindas de volta! Hoje veremos como criar blocos de código reutilizáveis através da criação de `STORED PROCEDURES` e `STORED FUNCTIONS`, além de lidar com as `TRIGGERS`, que também são blocos de código SQL mas que podem ser disparados automaticamente.

---

### Você será capaz de:

- Montar blocos de código SQL reutilizáveis com `STORED PROCEDURES` e `STORED FUNCTIONS`;

- Criar reações dinâmicas com `TRIGGERS`.

---

## Por que isso é importante?

As `STORED PROCEDURES` e `STORED FUNCTIONS` podem te ajudar a seguir um conceito de programação chamado [DRY](https://pt.wikipedia.org/wiki/Don%27t_repeat_yourself) {: .external-link target="_blank" rel="noreferrer noopener" }, que preza pela redução de código repetido, quando possível.

Isso é viabilizado pelo fato de esses comandos te permitirem criar blocos de código SQL reutilizáveis, que podem se comunicar com outros frameworks e linguagens de programação, como NodeJS, C#, Python, Java e PHP, entre outras.

---

## Conteúdos

###### Tempo sugerido para realização: 120 minutos

### Montando blocos de código SQL reutilizáveis com stored procedures e stored functions

Temos duas maneiras de armazenar blocos de códigos (queries) para serem usados posteriormente no MySQL:

* Stored procedure;
* Stored function.

A palavra `stored` significa armazenado. Como o próprio nome já indica, o código fica armazenado no servidor de banco de dados para que possa ser utilizado sem a necessidade de reescrever uma funcionalidade.

##### Dica sobre como nomear suas procedures e functions

Para tornar a leitura do seu código mais fácil e sua manutenção mais simples, siga o seguinte padrão ao nomear suas procedures e functions:

```language-sql
-- Verbo + Resultado

ObterTotalDeVendas
ExibirRankMaximo
ObterClienteMaisAtivo
CalcularNivelEngajamento
MontarNomeCompleto
```

##### Stored Procedures

Caso queira uma breve introdução, sugerimos assitir ao vídeo abaixo. Caso não goste desse tipo de mídia e/ou queira uma explicação mais detalhada, prossiga com a leitura.

<%= youtube_video "w3F4JQ8ndJ0" %>

**Pontos fortes quanto ao uso de Stored Procedures**

* Centraliza o código SQL em um servidor de banco de dados, o que possibilita que a manutenção das queries seja feita diretamente no servidor. Assim, mudanças são refletidas imediatamente em aplicações que utilizam o banco de dados sem haver a necessidade de refazer o [deploy](https://www.youtube.com/watch?v=gJw7l2JKpuQ) {: .external-link target="_blank" rel="noreferrer noopener" };
* Evita a necessidade de reescrever algo específico para cada linguagem, plataforma ou framework;
* Propaga mudanças feitas em uma `stored procedure` imediatamente para todas as aplicações que a usam, reduzindo a necessidade de refatorar o código em todos os ambientes que utilizam o banco de dados.

**Pontos fracos quanto ao uso de Stored Procedures**

* Viola um dos princípios de [separation of concerns](https://www.devmedia.com.br/amadurecendo-com-separation-of-concerns/18699) {: .external-link target="_blank" rel="noreferrer noopener" }, que diz que sua regra de negócio, dados e apresentação devem estar separados e desacoplados, uma vez que `stored procedures` podem conter regras de negócio e ficam armazenadas no banco de dados;
* Debugar esse código armazenado é mais difícil;
* Não há como versionar o código de uma stored procedure tão facilmente.

**Elementos das Stored Procedures:**

**1 - Delimiter**

A palavra-chave `DELIMITER` é usada para definir qual símbolo representa o final da declaração da sua procedure. Aqui estamos usando **$$**, porém é permitido [usar outros símbolos](https://www.mysqltutorial.org/mysql-stored-procedure/mysql-delimiter/) {: .external-link target="_blank" rel="noreferrer noopener" }.

O `DELIMITER` precisa ser usado para que o **MySQL** não interprete o primeiro ponto e vírgula encontrado como o final da declaração da sua procedure.

**2 - Variáveis**

O **MySQL** possui a funcionalidade de criar e usar [variáveis](https://stackoverflow.com/questions/11754781/how-to-declare-a-variable-in-mysql) {: .external-link target="_blank" rel="noreferrer noopener" }, assim como em outras linguagens de programação. Essas variáveis também podem ser usadas em `procedures`.

Para criar variáveis e atribuir valores a elas, faça o seguinte:

```language-sql
SET @my_school = 'BeTrybe';
SELECT @my_school;
```

<%= figure(%{src: "/back-end/sql/images/variables.png", caption: "Resultado da query \`SELECT @my_school\`", class: "text-center rounded mx-auto d-block", width: "170px", height: "auto"}) %>

**3 - Tipos de dados**

Existem [vários tipos de dados](https://www.mysqltutorial.org/mysql-data-types.aspx) {: .external-link target="_blank" rel="noreferrer noopener" }  no **MySQL**. Eles serão vistos mais a fundo na próxima aula. Contudo, é bom que você corra o olho no assunto para ter uma noção básica dos [tipos de dados](https://www.mysqltutorial.org/mysql-data-types.aspx) {: .external-link target="_blank" rel="noreferrer noopener" } existentes antes de continuar aqui.

**Estrutura padrão de uma stored procedure**

```language-sql
USE banco_de_dados; -- obrigatório para criar a procedure no banco correto
DELIMITER $$ -- definindo delimitador

CREATE PROCEDURE nome_da_procedure(@parametro1, @parametro2, ..., @parametroN) -- parâmetros
BEGIN -- delimitando o início do código SQL

END $$ -- delimitando o final do código SQL

DELIMITER ; -- muda o delimitador de volta para ; - o espaço entre DELIMITER e o ';' é necessário
```

**Procedure sem parâmetros:**

Normalmente é utilizada para realizar queries mais simples.

**Exemplo:** Aqui estamos apenas executando uma busca na tabela `actor` e exibindo os resultados.

```language-sql
USE sakila;
DELIMITER $$

CREATE PROCEDURE ShowAllActors()
BEGIN
	SELECT * FROM sakila.actor;
END $$

DELIMITER ;

-- Como usar:

CALL ShowAllActors();
```

<%= figure(%{src: "/back-end/sql/images/storedprocedure0.png", caption: "Resultado da procedure ShowAllActors", class: "text-center rounded mx-auto d-block", width: "670px", height: "auto"}) %>

##### Sua primeira stored procedure

Vamos criar nossas primeiras `stored procedures`. Temos os seguintes tipos:

* Procedure sem parâmetros;
* Procedure com parâmetros de entrada **(IN)**;
* Procedure com parâmetros de saída **(OUT)**;
* Procedure com parâmetros de entrada e saída **(IN-OUT)**.

**Procedure com parâmetros de entrada (IN):**

Para criar procedures com funcionalidades mais elaboradas, podemos passar parâmetros de entrada. Ao definir um parâmetro do tipo `IN`, podemos usá-lo e modificá-lo dentro da nossa procedure.

**Exemplo:** Foi criada uma procedure que recebe como parâmetro uma sílaba (syllable) e busca na tabela actor todos atores quem contêm aquela sílaba no nome.

```language-sql
USE sakila;
DELIMITER $$

CREATE PROCEDURE ShowActorsWithSyllable(IN syllable VARCHAR(100))
BEGIN
    SELECT *
    FROM sakila.actor
    WHERE first_name LIKE CONCAT('%', syllable, '%');
END $$

DELIMITER ;

-- Como usar:

CALL ShowActorsWithSyllable('lope');
```

<%= figure(%{src: "/back-end/sql/images/storedprocedure1.png", caption: "Resultado da procedure ShowActorsWithSyllable", class: "text-center rounded mx-auto d-block", width: "670px", height: "auto"}) %>

**Procedure com parâmetros de saida (OUT):**

O parâmetro `OUT` é útil quando você precisa que algo seja avaliado ou encontrado dentro de uma query e te retorne esse valor para que algo adicional possa ser feito com ele.

**Exemplo:** Estamos recebendo aqui o título de um filme como valor de entrada e depois buscando dentro da procedure a duração média de um empréstimo daquele filme. Feito isso, ele é inserido em uma variável que pode ser usada posteriormente.

```language-sql
USE sakila;
DELIMITER $$

CREATE PROCEDURE ShowAverageRentalDurationOfMovie(
    IN film_name VARCHAR(300),
    OUT media_aluguel_em_dias DOUBLE
)
BEGIN
    SELECT AVG(rental_duration) INTO media_aluguel_em_dias
    FROM sakila.film
    WHERE title = film_name;
END $$

DELIMITER ;

-- Como usar:

CALL ShowAverageRentalDurationOfMovie('ACADEMY DINOSAUR', @media_de_dias);
SELECT @media_de_dias;
```

<%= figure(%{src: "/back-end/sql/images/storedprocedure2.png", caption: "Resultado da procedure ShowAverageRentalDurationOfMovie", class: "text-center rounded mx-auto d-block", width: "270px", height: "auto"}) %>

**Procedure com parâmetros de entrada-saida (IN-OUT):**

O `IN-OUT` deve ser usado quando é necessário que um parâmetro possa ser modificado tanto antes como durante a execução de uma procedure.

**Exemplo:** Estamos gerando um novo nome para um filme, usando como base a variável `film_name`, que deve ser criada e passada como parâmetro para a procedure. O parâmetro sofrerá alterações dentro da procedure, podendo ser usado posteriormente com o novo nome.

```language-sql
USE sakila;
DELIMITER $$

CREATE PROCEDURE NameGenerator(INOUT film_name VARCHAR(300))
BEGIN
    SELECT CONCAT('ULTRA ', film_name, ' THE BEST MOVIE OF THE CENTURY')
    INTO film_name;
END $$

DELIMITER ;

-- Como usar:

SELECT 'ACE GOLDFINGER' INTO @movie_title;
CALL NameGenerator(@movie_title);
SELECT @movie_title;
```

<%= figure(%{src: "/back-end/sql/images/in_out_procedure_result.png", caption: "Resultado da procedure ShowAverageRentalDurationOfMovie", class: "text-center rounded mx-auto d-block", width: "470px", height: "auto"}) %>

Após ter visto essas **4 maneiras** de como montar uma procedure, você deve ter uma noção melhor de como elas podem te ajudar a agilizar diversos aspectos de suas consultas a um banco de dados.

Para consolidar esse conhecimento, vamos tentar resolver algumas questões.

##### Desafios stored procedure

Para todos os desafios abaixo, certifique-se de que a função possa ser chamada e o resultado dela seja usado corretamente. Utilize o banco de dados `sakila`.

1. Monte uma procedure que exiba os 10 atores mais populares, baseado em sua quantidade de filmes. Essa procedure não deve receber parâmetros de entrada ou saída e, quando chamada, deve exibir o **id do ator ou atriz** e a **quantidade de filmes** em que atuaram.

2. Monte uma procedure que receba como parâmetro de entrada o nome da categoria desejada em uma `string` e que exiba o **id do filme**, seu **titulo**, o **id de sua categoria** e o **nome da categoria** selecionada. Use as tabelas `film`, `film_category` e `category` para montar essa procedure.

3. Monte uma procedure que receba o email de um cliente como parâmetro de entrada e diga se o cliente está ou não ativo, através de um parâmetro de saída.

##### Stored Functions

Na área de programação, temos uma boa prática chamada [DRY (Don't Repeat Yourself)](http://www.macoratti.net/16/04/net_dry1.htm) {: .external-link target="_blank" rel="noreferrer noopener" } que, em resumo, sugere que
você não se repita ou reescreva o mesmo código várias vezes.

Nesse ponto, temos uma das principais ferramentas para combater esse problema no SQL: as `stored functions`.

Através delas, podemos encapsular nossas queries usadas mais frequentemente dentro de um bloco de código nomeado e parametrizável.

Caso queira uma breve introdução, sugerimos assitir ao vídeo abaixo. Caso não goste desse tipo de mídia e/ou queira uma explicação mais detalhada, prossiga com a leitura.

<%= youtube_video "WTTGml9Co90" %>

##### Sua primeira stored function

Stored functions podem ser executadas com o comando `SELECT`. Ao criá-las, temos que definir o tipo de retorno que sua função possui.

**Tipos de retorno comuns:**

* `DETERMINISTIC` - Sempre retorna o mesmo valor ao receber os mesmos dados de entrada;
* `READS SQL DATA` - Indica para o MySQL que sua função somente lerá dados.

Em muitas situações, sua function estará apenas lendo e retornando dados. Nesses casos, a opção `READS SQL DATA` deve ser usada. No entanto, sempre avalie o tipo mais adequado à sua função.

**Estrutura padrão de uma stored function**

```language-sql
USE banco_de_dados; -- obrigatório para criar a função no banco correto
DELIMITER $$

CREATE FUNCTION nome_da_function(parametro1, parametro2, ..., parametroN)
RETURNS tipo_de_dado tipo_de_retorno
BEGIN
    query_sql
    RETURN resultado_a_ser_retornado;
END $$

DELIMITER ;
```

**Exemplo:** Uma `stored function` que exibe a quantidade de filmes em que um determinado ator ou atriz atuou:

```language-sql
USE sakila;
DELIMITER $$

CREATE FUNCTION MoviesWithActor(actor_id int)
RETURNS INT READS SQL DATA
BEGIN
    DECLARE movie_total INT;
    SELECT COUNT(*)
    FROM sakila.film_actor
    WHERE sakila.film_actor.actor_id = actor_id INTO movie_total;
    RETURN movie_total;
END $$

DELIMITER ;

-- Como usar:

SELECT MoviesWithActor(1);
```

<%= figure(%{src: "/back-end/sql/images/store_function1.png", caption: "Resultado da stored function MoviesWithActor", class: "text-center rounded mx-auto d-block", width: "270px", height: "auto"}) %>

**Exemplo:** Uma `stored function` que exibe o **nome completo** de um ator ou de uma atriz, dado seu **id** como parâmetro:

```language-sql
USE sakila;
DELIMITER $$

CREATE FUNCTION GetFullName(id INT)
RETURNS VARCHAR(200) READS SQL DATA
BEGIN
    DECLARE full_name VARCHAR(200);
    SELECT concat(first_name, ' ', last_name)
    FROM sakila.actor
    WHERE actor_id = id
    LIMIT 1
    INTO full_name ;
    RETURN full_name;
END $$

DELIMITER ;

SELECT GetFullName(51);
```

<%= figure(%{src: "/back-end/sql/images/store_function2.png", caption: "Resultado da function GetFullName", class: "text-center rounded mx-auto d-block", width: "230px", height: "auto"}) %>

Assim como no caso das fuções de agregação `AVG`, `MIN`, `MAX` e `SUM`, entre outras, as `stored functions` são extremamente úteis e devem ser criadas sempre que percebermos que o mesmo tipo de código está sendo repetido em vários lugares diferentes.

Isso ajuda a reduzir a quantidade de duplicação de código em seu servidor de banco de dados e deixa seu código mais legível e limpo, além de contribuir para uma melhor experiência para outras pessoas desenvolvedoras que possam ter que dar manutenção no seu código.

##### Agora você vai desenvolver algumas functions

1. Utilizando a tabela `sakila.payment`, monte uma function que retorna a **quantidade total de pagamentos** feitos até o momento por um determinado `customer_id`.

2. Crie uma function que, dado o parâmetro de entrada `inventory_id`, retorna o **nome do filme** vinculado ao registro de inventário com esse id.

3. Crie uma function que receba uma determinada **categoria de filme** em formato de texto (ex: `'Action'`, `'Horror'`) e retorna a **quantidade total de filmes** registrados nessa categoria.

### Stored Functions VS Store Procedures

Vamos comparar no gráfico a seguir às principais diferenças entre functions e procedures.

<%= figure(%{src: "/back-end/sql/images/stored_procedure_vs_stored_function.png", caption: "Functions VS Procedures", class: "text-center rounded mx-auto d-block", width: "550px", height: "auto"}) %>

Ou seja:

* Stored Procedures podem ser chamadas através do comando `CALL`, e o retorno de um valor é opcional;
* Já as Stored Functions são executadas com o comando `SELECT` e obrigatoriamente retornam algum valor.

Ainda restam dúvidas com relação à diferença das duas na prática? Que tal dar uma lida na resposta mais votada [aqui?](https://pt.stackoverflow.com/questions/60323/qual-a-diferen%C3%A7a-entre-function-e-procedure) {: .external-link target="_blank" rel="noreferrer noopener" }

### Criando reações dinâmicas com `Triggers`

##### O que são triggers?

`Triggers` são blocos de código SQL que são disparados em reação a alguma atividade que ocorre no banco de dados. Eles podem ser disparados em dois momentos distintos, e é possível definir condições para esse disparo.

##### Momentos em que um trigger pode ser disparado

* `BEFORE`: antes que alguma ação seja executada;

* `AFTER`: após alguma ação já ter sido executada.

##### O que pode ativar um Trigger?

* `INSERT`;

* `UPDATE`;

* `DELETE`.

##### O que pode ser acessado dentro de um trigger?

* O valor `OLD` de uma coluna: valor presente em uma coluna antes de uma operação;

* O valor `NEW` de uma coluna: valor presente em uma coluna após uma operação.

##### Em quais operações os valores `OLD` e `NEW` estão disponíveis?

<table class="table table-striped table-bordered">
    <thead class="thead-dark">
        <tr>
            <th width="20%" title="Field #1">Operação</th>
            <th title="Field #2">OLD</th>
            <th title="Field #3">NEW</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="table-info">INSERT</td>
            <td class="table-danger">Não</td>
            <td class="table-success">Sim</td>
        </tr>
        <tr>
            <td class="table-info">UPDATE</td>
            <td class="table-success">Sim</td>
            <td class="table-success">Sim</td>
        </tr>
        <tr>
            <td class="table-info">DELETE</td>
            <td class="table-success">Sim</td>
            <td class="table-danger">Não</td>
        </tr>
    </tbody>
</table>

##### Sintaxe

```language-sql
DELIMITER $$

CREATE TRIGGER nome_do_trigger
[BEFORE | AFTER] [INSERT | UPDATE | DELETE] ON tabela
FOR EACH ROW
BEGIN
    -- o código SQL entra aqui
END;

DELIMITER $$ ;
```

##### Exemplos das três operações

Para os próximos exemplos, considere as seguintes tabelas e banco de dados:

```language-sql
CREATE DATABASE IF NOT EXISTS rede_social;

USE rede_social;

CREATE TABLE perfil(
    perfil_id INT PRIMARY KEY auto_increment,
    saldo DECIMAL(10, 2) NOT NULL DEFAULT 0,
    ultima_atualizacao DATETIME,
    acao VARCHAR(50),
    ativo BOOLEAN DEFAULT 1
) engine = InnoDB;

CREATE TABLE log_perfil(
    acao_id INT PRIMARY KEY AUTO_INCREMENT,
    acao VARCHAR(300),
    data_acao DATE
) engine = InnoDB;
```

* **Exemplo de trigger para o `INSERT`:**

    Considerando a tabela `perfil`, hora de montar um `Trigger` que define a data de inserção e o tipo de operação, quando um novo registro é inserido.

```language-sql
USE rede_social;

DELIMITER $$
CREATE TRIGGER trigger_perfil_insert
    BEFORE INSERT ON perfil
    FOR EACH ROW
BEGIN
    SET NEW.ultima_atualizacao = NOW(),
        NEW.acao = 'INSERT';
END; $$
DELIMITER ;
```

    No `trigger` acima, o valor da coluna `ultima_atualizacao` está sendo definido para a data atual com o comando `NOW()` e, na sequência, definindo o valor da coluna `acao` para "INSERT". A palavra-chave `NEW` é utilizada para acessar e modificar as propriedades da tabela.

    Para ver o resultado do uso do `Trigger` na prática, execute o exemplo abaixo:

```language-sql
INSERT INTO perfil(saldo) VALUES (2500);

SELECT * FROM perfil;
```

    <%= figure(%{src: "/back-end/sql/database-modeling/images/trigger1Result.png", caption: "Colunas \`ultima_atualizacao\` e \`acao\` preenchidas dinamicamente pelo \`Trigger\`", class: "text-center rounded mx-auto d-block", width: "500px", height: "auto"}) %>

* **Exemplo de trigger para o `UPDATE`:**

    Considerando a tabela `perfil`, hora de montar um `Trigger` que define a data de atualização e o tipo de operação, quando algum registro for modificado.

```language-sql
USE rede_social;

DELIMITER $$
CREATE TRIGGER trigger_perfil_update
    BEFORE UPDATE ON perfil
    FOR EACH ROW
BEGIN
    SET NEW.ultima_atualizacao = NOW(),
        NEW.acao = 'UPDATE';
END; $$
DELIMITER ;
```

    No `Trigger` acima, o valor da coluna `ultima_atualizacao` está sendo atualizado para a data atual com o comando `NOW()` e, na sequência, definindo o valor da coluna `acao` para "UPDATE". Novamente, a palavra-chave `NEW` é utilizada para acessar e modificar as propriedades da tabela.

    Para ver o resultado do uso do `Trigger` na prática, execute o exemplo abaixo:

```language-sql
UPDATE perfil
SET saldo = 3000
WHERE perfil_id = 1;

SELECT * FROM perfil;
```

* **Exemplo de trigger para o `DELETE`:**

    Considerando a tabela `log_perfil`, hora de criar um trigger que envia informações para essa tabela quando um registro da tabela `perfil` é excluído.

```language-sql
USE rede_social;

DELIMITER $$
CREATE TRIGGER trigger_perfil_delete
    AFTER DELETE ON perfil
    FOR EACH ROW
BEGIN
    INSERT INTO log_perfil(acao, data_acao)
    VALUES ('exclusão', NOW());
END; $$
DELIMITER ;
```

    O trigger acima envia informações para a tabela `log_perfil`, dizendo qual foi o tipo da operação e o horário do ocorrido.

    Pode-se confirmar o seu funcionamento excluindo um registro do banco de dados e depois fazendo uma pesquisa na tabela `log_perfil`. Veja o exemplo abaixo:

```language-sql
DELETE FROM perfil WHERE perfil_id = 1;

SELECT * FROM log_perfil;
```

    <%= figure(%{src: "/back-end/sql/database-modeling/images/trigger3Result.png", caption: "Colunas \`acao\` e \`data_acao\` preenchidas dinamicamente pelo \`trigger\`", class: "text-center rounded mx-auto d-block", width: "300px", height: "auto"}) %>

##### It's Trigger Time

Alright, people! Hora de montar uns triggers.

Considerando as tabelas e os banco de dados abaixo:

```language-sql
CREATE DATABASE IF NOT EXISTS betrybe_automoveis;

USE betrybe_automoveis;

CREATE TABLE carros(
    id_carro INT PRIMARY KEY auto_increment,
    preco DECIMAL(12, 2) NOT NULL DEFAULT 0,
    data_atualizacao DATETIME,
    acao VARCHAR(15),
    disponivel_em_estoque BOOLEAN DEFAULT 0
) engine = InnoDB;

CREATE TABLE log_operacoes(
    operacao_id INT AUTO_INCREMENT PRIMARY KEY,
    tipo_operacao VARCHAR(15) NOT NULL,
    data_ocorrido DATE NOT NULL
) engine = InnoDB;
```

1. Crie um `TRIGGER` que, a cada nova inserção feita na tabela `carros`, defina o valor da coluna `data_atualizacao` para o momento do ocorrido, a `acao` para `'INSERÇÃO'` e a coluna `disponivel_em_estoque` para `1`.

2. Crie um `TRIGGER` que, a cada atualização feita na tabela `carros`, defina o valor da coluna `data_atualizacao` para o momento do ocorrido e a `acao` para `'ATUALIZAÇÃO'`.

3. Crie um `TRIGGER` que, a cada exclusão feita na tabela `carros`, envie para a tabela `log_operacoes` as informações do `tipo_operacao` como `'EXCLUSÃO'` e a `data_ocorrido` como o momento da operação.

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

Vamos bater um papo sobre SQL?

Hora da aula ao vivo! Vamos para o Slack, onde o link estará disponível.

---

## Exercícios

###### Tempo sugerido para realização: 40 minutos

<%= versioning_your_code(@conn) %>

---

### Agora a prática

##### Desafios sobre `Triggers`

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

1. Crie um `Trigger` para `INSERT` que deve definir o valor do campo `release_year` da tabela `movies` como o ano atual de forma dinâmica, sem haver a necessidade de digitar manualmente o valor do ano. Além disso, crie um outro `Trigger` para `INSERT` que adiciona um novo registro na tabela `movies_logs`, informando o `movie_id` do filme que acaba de ser inserido na tabela `movies`, a `action` como `'INSERT'` e a `log_date` como a data atual.

2. Crie um `Trigger` para `UPDATE` que, ao receber uma alteração na tabela `movies`, deve comparar o valor anterior de `ticket_price` com o valor sendo inserido nesta atualização. Caso o valor seja maior que o anterior, insira na coluna `ticket_price_estimation` o valor de `'Increasing'`. Caso contrário, insira o valor `'Decreasing'`. Adicionalmente, insira um novo registro na tabela `movies_logs`, contendo informações sobre o registro alterado (`movie_id`, `action` e `log_date`).

3. Crie um `Trigger` na tabela `movies` que, ao ter algum de seus registros excluídos, deve enviar uma informação para a tabela `movies_logs`, onde devem ser guardados a data da exclusão, a `action` `'DELETE'` e o id do filme excluído.

---

## Recursos adicionais(Opcional)

* [Diferenças entre JOIN e SUBQUERY](https://www.essentialsql.com/what-is-the-difference-between-a-join-and-subquery) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Como utilizar subqueries](https://qhmit.com/mysql/examples/mysql_subquery.cfm) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Como utilizar Stored Procedures](https://qhmit.com/mysql/tutorial/mysql_stored_procedures.cfm) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Tutorial sobre Stored Procedures do MySQL Tutorial](https://www.mysqltutorial.org/getting-started-with-mysql-stored-procedures.aspx) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Vantagens e desvantagens das Stored Procedures](https://www.devmedia.com.br/stored-procedures-no-mysql/29030) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
