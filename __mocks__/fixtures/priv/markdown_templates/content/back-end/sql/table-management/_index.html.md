## O que vamos aprender?

Nos últimos dias temos visto principalmente como fazer _queries_ para encontrar e filtrar dados em um banco usando os diversos comandos do **SQL**. Porém, hoje será um pouco diferente. Vamos focar em aprender a fazer a **inserção**, **alteração** e **exclusão** de dados nas tabelas de um banco de dados. Em uma ~~futura~~ aula não tão distante, aprenderemos também a criar tabelas (**No Spoilers!!!**).

---

### Você será capaz de:

* Inserir dados em tabelas com `INSERT`
* Atualizar dados em tabelas com `UPDATE`
* Apagar dados em tabelas com `DELETE`

---

## Por que isso é importante?

O acrônimo ***CRUD (Create, Read, Update, Delete)*** faz parte da sopa de letrinhas que todas as pessoas desenvolvedoras devem saber. Em função das rotinas recorrentes utilizadas dentro do desenvolvimento, todo software, independente da plataforma ou tecnologia utilizada, terá que, em algum ponto da sua existência, lidar com a criação, leitura, alteração ou exclusão de dados.

---

## Conteúdos:

###### Tempo sugerido para realização: 120 minutos

### Apagou informação que não devia ou terminou todos exercícios do dia?

Como agora você começará a mexer na estrutura do banco de dados `sakila`, você deve saber recriar o banco de dados quantas vezes for necessário, em caso de alterações acidentais ou por alguma outra necessidade. Os passos para recriar o banco podem ser lidos a seguir.

Como apagar (_dropar_) o banco `sakila` e recriá-lo do zero:

1. Abra o **MySQL Workbench** e se conecte a ele.

2. Selecione o banco `sakila` na lista de bancos de dados com o botão direito e clique em "**Drop Schema**".

3. Selecione **"Drop Now"**.

4. Clique com o botão direito [neste link](/back-end/sakila.sql) {: .external-link target="_blank" rel="noreferrer noopener" } e salve como arquivo `.sql`.

5. Selecione todo o conteúdo do arquivo **(CTRL + A)** e cole-o dentro de uma janela de nova _query_ no **MySQL Workbench**.

6. Clique em executar para restaurar o banco de dados.

<%= figure(%{src: "/back-end/sql/images/RestoringDatabase.png", caption: "Restaurando o banco \`sakila\`", class: "text-center rounded mx-auto d-block", width: "500px", height: "auto"}) %>

7. _That's IT!_ Está pronto para ~~**quebrar**~~ brincar com ele de novo!

### Tabela **vazia**? Vamos resolver isso ae! `INSERT` na prática

##### Informação importante sobre os tipos de aspas

**Backticks ou crase (``` `` ```)**: São usadas para identificar nome de **tabelas** e **colunas**. São **necessárias apenas** quando o identificador for uma palavra reservada do **MySQL**, ou quando o nome da tabela ou coluna contiver espaços em branco.

**Aspas simples (`''`)**:  Devem ser usadas em valores do tipo **string**. Aspas simples são aceitas na maioria dos sistemas de gerenciamento de banco de dados. Sendo assim, é preferível usar aspas simples no lugar das aspas duplas.

Só usaremos os **backticks** aqui nos exemplos caso sejam absolutamente necessários. Caso contrário, eles serão omitidos.

Vamos começar a dar vida ao banco `sakila`. Uma pesquisa rápida na tabela `sakila.staff` nos informa de que a empresa possui apenas dois funcionários. Acho que ela pode contar com nossa ajuda para melhorar isso.
A sintaxe para inserir dados em uma tabela é a seguinte:

```language-sql
INSERT INTO nome_da_tabela (coluna1, coluna2)
VALUES ('valor_coluna1', 'valor_coluna2');
```

Isso vai inserir na coluna `nome_da_tabela` os valores em suas colunas correspondentes. Apesar de ser possível inserir novos valores sem especificar os nomes das colunas, é uma boa prática sempre especificá-los porque:

1. Caso a estrutura da tabela tenha mudado enquanto se escreve a _query_, você será alertado.
2. Melhora a compreensão para quem estiver lendo sua _query_ futuramente.

##### Inserindo várias linhas de uma vez

É possível inserir múltiplas linhas em uma tabela com uma única _query_:

```language-sql
INSERT INTO nome_da_tabela (coluna1, coluna2) VALUES
('valor_1','valor_2'),
('valor_3','valor_4'),
('valor_5','valor_6');
```

Dessa maneira, podemos ganhar muito tempo, tanto em tecladas como em performance de inserção. Em média, 100 linhas inseridas dessa maneira podem ser até 10 vezes mais rápidas que fazendo inserções de forma individual.

##### Ignorando linhas existentes

Quando for importar uma quantidade grande de dados, pode ser preferível, em alguns cenários, que você simplesmente ignore os erros e pule os dados problemáticos, que normalmente interromperiam a _query_ em função de alguma restrição imposta na tabela. Ex: ***duplicidade de primary keys***. Podemos ignorar os erros durante a inserção usando o `INSERT IGNORE`.

Considere a tabela e a _query_ a seguir:

<%= figure(%{src: "/back-end/sql/images/SimpleTableData1.png", caption: "Tabela \`pessoas\`", class: "text-center rounded mx-auto d-block", width: "200px", height: "auto"}) %>

```language-sql
INSERT IGNORE INTO pessoas (id, name) VALUES
(4,'Gloria'), -- Sem o IGNORE, essa linha geraria um erro e o INSERT não continuaria.
(5,'Amanda');

-- Pesquisando agora, você verá que a informação duplicada não foi inserida.
-- Porém os dados corretos foram inseridos com sucesso.
SELECT * FROM pessoas;
```

<%= figure(%{src: "/back-end/sql/images/SimpleTableData2.png", caption: "Tabela pessoas", class: "text-center rounded mx-auto d-block", width: "200px", height: "auto"}) %>

O importante aqui é lembrar que o `INSERT IGNORE` vai pular os outros erros silenciosamente também.

##### Inserindo valores em colunas com auto_increment

Primeiramente, é preciso saber que o **auto_increment** é uma funcionalidade que todos os bancos de dados possuem. Ela permite que valores sejam gerados automaticamente cada vez que uma nova linha é inserida em uma tabela que tem essa restrição ativa. Ao inserir um novo ator na tabela `sakila.actor`, caso outros atores ainda não tenham sido inseridos desde que o banco foi restaurado, o próximo valor que será gerado para `actor_id` será o valor do último id registrado acrescido de um (201 + 1).

<%= figure(%{src: "/back-end/sql/images/AutoIncrement.png", caption: "Tabela \`sakila.actor\` com restrição auto_increment", class: "text-center rounded mx-auto d-block", width: "400px", height: "auto"}) %>

Com isso em mente, a coluna que possui **auto_increment** é omitida no `INSERT`, uma vez que o valor já é gerado automaticamente:

```language-sql
INSERT INTO sakila.actor (first_name, last_name)
VALUES('Marcelo','Santos');
```

<%= figure(%{src: "/back-end/sql/images/SimpleTableData3.png", caption: "Resultado do \`INSERT\` em \`sakila.actor\`", class: "text-center rounded mx-auto d-block", width: "500px", height: "auto"}) %>

##### INSERT SELECT (Inserindo dados de uma outra tabela)

É possível inserir dados a partir de outra tabela usando `INSERT INTO SELECT`:

```language-sql
INSERT INTO tabelaA (coluna1, coluna2)
    SELECT tabelaB.coluna1, tabelaB.coluna2
    FROM tabelaB
    WHERE tabelaB.nome_da_coluna <> 'algumValor'
    ORDER BY tabelaB.coluna_de_ordenacao;
```

Assim, estaríamos extraindo a **colunaA** e a **colunaB** da **tabelaB** e as inserindo na **tabelaA**, de acordo com a condição que for passada no `WHERE`.

É possível usar também `SELECT * FROM` e copiar todos os dados de todas as colunas de uma tabela para outra, mas nessa situação a **tabelaA** e a **tabelaB** precisam **obrigatoriamente** possuir a mesma quantidade de colunas, e os tipos de dados das colunas correspondentes devem ser iguais.

Com essa funcionalidade, é fácil criar tabelas temporárias para testes ou por necessidade. Por exemplo, para trazer os dados da tabela `sakila.staff` para a tabela `sakila.actor`, poderíamos fazer:

```language-sql
INSERT INTO sakila.actor (first_name, last_name)
	SELECT first_name, last_name FROM sakila.staff;
```

<%= figure(%{src: "/back-end/sql/images/SimpleTableData4.png", caption: "Resultado do \`INSERT\` em \`sakila.actor\` a partir de \`sekila.staff\`", class: "text-center rounded mx-auto d-block", width: "800px", height: "auto"}) %>

Um grande filósofo uma vez disse: ***"Practice Makes Perfect"***. Não sabemos quem ele é, mas ele tem razão! Vamos praticar!

1. Insira um novo funcionário na tabela `sakila.staff`.

    Para saber quais campos são obrigatórios, clique com o botão direito na tabela `sakila.staff` e selecione "Table Inspector". Clique na aba "columns" e verifique quais campos aceitam nulos para te guiar. Lembre-se de que valores que são gerados automaticamente não precisam ser inseridos manualmente. Boa explorada!

2. Feito o exercício anterior, vamos agora para o nível 2. Insira dois funcionários novos em apenas uma _query_.

3. Selecione os cinco primeiros nomes e sobrenomes da tabela `sakila.customer` e cadastre essas pessoas como atores na tabela `sakila.actor`.

4. Cadastre três categorias de uma vez só na tabela `sakila.category`.

5. Cadastre uma nova loja na tabela `sakila.store`.

### Digitou algo errado? De boa, vamos dar um `UPDATE`

Você avisou na recepção que seu nome é *Rannveig*, mas, quando foi ver em seu documento, foi registrado como *Ravein*! __"Poxa, será que meu nome é tão difícil assim de se escrever?"__ Sua sorte é que o `UPDATE` te permite alterar valores de uma tabela com base em alguma condição. **Vamos resolver isso!**

<%= figure(%{src: "/back-end/sql/images/update1.png", caption: "Tabela \`sakila.staff\` com \`first_name\` errado", class: "text-center rounded mx-auto d-block", width: "300px", height: "auto"}) %>

```language-sql
UPDATE sakila.staff
SET first_name = 'Rannveig'
WHERE first_name = 'Ravein';
```

<%= figure(%{src: "/back-end/sql/images/update2.png", caption: "Tabela \`sakila.staff\` com \`first_name\` correto", class: "text-center rounded mx-auto d-block", width: "300px", height: "auto"}) %>

Como foi exibido no código acima, a sintaxe geral para fazer um update é:

```language-sql
UPDATE nome_da_tabela
SET propriedade_a_ser_alterada = 'novo valor para coluna'
WHERE alguma_condicao; -- importantíssimo aplicar o WHERE para não alterar a tabela inteira!
```

Uma curiosidade sobre o `UPDATE` e o `DELETE` no **MySQL Server** é que, por padrão, existe uma configuração chamada **safe updates mode** que só vai te permitir executá-los caso eles incluam quais IDs devem ser modificados. Então, caso você tente fazer a _query_ abaixo, ela não funcionaria por não incluir o ID.

```language-sql
UPDATE sakila.staff
SET first_name = 'Rannveig'
WHERE first_name = 'Ravein';
```

Para evitar essa restrição, rode o seguinte comando em uma janela de _query_ dentro do MySQL Workbench **sempre** que abri-lo para desabilitar essa funcionalidade, antes de executar seus comandos de `UPDATE` ou `DELETE`:

```language-sql
SET SQL_SAFE_UPDATES = 0;
```

#### Alterando mais de uma coluna ao mesmo tempo

```language-sql
UPDATE sakila.staff
SET first_name = 'Rannveig', last_name = 'Jordan'
WHERE staff_id = 4;
```

##### `UPDATE` em massa

Por questões de performance, para que apenas uma solicitação de _query_ seja enviada ao servidor, podemos fazer uma atualização em massa.

```language-sql
-- Opção 1 - Incluindo a lista de condições fixas
UPDATE sakila.actor
SET first_name = 'JOE'
WHERE actor_id IN (1,2,3);

-- Opção 2 - Especificando como cada entrada será alterada individualmente
UPDATE sakila.actor
SET first_name = (
CASE actor_id WHEN 1 THEN 'JOE' -- se actor_id = 1, alterar first_name para 'JOE'
              WHEN 2 THEN 'DAVIS' -- se actor_id = 2, alterar first_name para 'DAVIS'
              WHEN 3 THEN 'CAROLINE' -- se actor_id = 3, alterar first_name para 'CAROLINE'
END);
```

Você pode ver mais informações sobre como usar o `CASE` [neste link](https://www.w3schools.com/sql/func_mysql_case.asp) {: .external-link target="_blank" rel="noreferrer noopener" }.

##### Fazendo um UPDATE de forma sequencial

Se o comando `ORDER BY` for usado juntamente com o `UPDATE`, os resultados serão alterados na ordem em que forem encontrados.

Se o comando `LIMIT` for usado em conjunto com o `UPDATE`, um limite será imposto na quantidade de resultados que podem ser alterados. Caso contrário, todos os resultados que satisfizerem a condição serão atualizados.

Veja a sintaxe abaixo. Lembre-se de que os valores entre colchetes (`[]`) são opcionais:

```language-sql
UPDATE nome_da_tabela
SET coluna1 = valor1, coluna2 = valor2
[WHERE condições]
[ORDER BY expressao [ ASC | DESC ]]
[LIMIT quantidade_resultados];

-- Exemplo:
UPDATE sakila.staff
SET password = 'FavorResetarSuaSenha123'
WHERE active = 1
ORDER BY last_update
LIMIT 2;
```

Essas são as maneiras mais comuns de utilizar o `UPDATE` no dia a dia. Agora está na hora de praticar!

##### Dê um `UPDATE` em seus conhecimentos com estes desafios

**P.S.** Como dito anteriormente, o [safe updates mode](https://dev.mysql.com/doc/refman/8.0/en/mysql-tips.html#safe-updates) {: .external-link target="_blank" rel="noreferrer noopener" } é habilitado por padrão no **MySQL Workbench**. Ele exige que você inclua os IDs dos itens a serem atualizados ou apagados para poder executar o `UPDATE` ou o `DELETE`. Essa camada de segurança é importante em bancos reais executando em ambientes de produção, mas torna-se inconveniente em ambientes de aprendizado, como é o caso aqui. Como o banco pode ser apagado e recriado infinitamente, vamos desabilitá-lo nos exercícios. Além disso, esse modo pode ser habilitado novamente quando necessário.

<%= figure(%{src: "/back-end/sql/images/mysqlsafeupdatemode.png", caption: "Erro devido ao Safe Updates Mode estar habilitado", class: "text-center rounded mx-auto d-block", width: "800px", height: "auto"}) %>

Rode o seguinte comando em uma janela de _query_ dentro do MySQL Workbench **sempre** que abri-lo para desabilitar essa funcionalidade, antes de executar seus comandos `UPDATE` ou `DELETE`:

```language-sql
SET SQL_SAFE_UPDATES = 0;
```

1. Atualize o primeiro nome de todas as pessoas da tabela `sakila.actor` que possuem o primeiro nome "JULIA" para "JULES".

2. Foi exigido que a categoria "Sci-Fi" seja alterada para "Science Fiction".

3. Atualize o valor do aluguel para $25 de todos os filmes com duração maior que 100 minutos e que possuem a classificações **"G"**, **"PG"** ou **"PG-13"** e um custo de substituição maior que $20.

4. Foi determinado pelo setor financeiro que haverá um reajuste em todos os preços dos filmes, com base em sua duração. Para todos os filmes com duração entre 0 e 100, o valor do aluguel passará a ser $10,00, e o aluguel dos filmes com duração acima de 100 passará a ser de $20,00.

### Como assim, alguém te cadastrou **sem você deixar**? Vamos dar um `DELETE` nisso!

Antes de aprender a excluir dados de uma tabela, é importante entender que nem sempre que você clicar em excluir, em um sistema ou em um site, a informação terá sido **de fato** excluída do banco de dados. Em muitos casos, a funcionalidade de **"excluir"** apenas marcará a informação como inativa ou excluída, ou algum campo equivalente.

Isso ocorre pela necessidade de seguir normas ou regulamentos sobre disponibilidade e segurança de dados. Relatórios podem necessitar de informações que já foram "excluídas" ou pode ser necessário manter logs de uso (históricos de acontecimentos no sistema) de seu software.

##### Excluindo dados de uma tabela

Para excluir dados de forma básica, temos a seguinte sintaxe:

```language-sql
DELETE FROM banco_de_dados.tabela
WHERE coluna = 'valor'
-- O WHERE é opcional. Porém, sem ele, todas as linhas da tabela seriam excluídas.
```

Exemplo no banco `sakila`:

```language-sql
DELETE FROM sakila.film_text
WHERE title = 'ACADEMY DINOSAUR';
```

**P.S.** Novamente, caso o [safe update mode](https://dev.mysql.com/doc/refman/8.0/en/mysql-tips.html#safe-updates) {: .external-link target="_blank" rel="noreferrer noopener" } esteja habilitado, os comandos `DELETE` só funcionariam se os IDs fossem incluídos em suas _queries_. Para fins de prática, vamos desabilitá-lo.

Rode o seguinte comando em uma janela de _query_, dentro do MySQL Workbench, **sempre** que abri-lo, para desabilitar essa funcionalidade antes de executar seus comandos `DELETE`:

```language-sql
SET SQL_SAFE_UPDATES = 0;
```

##### Meu `DELETE` não foi permitido...

Caso haja relações entre as tabelas (**primary key** e **foreign keys**) e existam restrições aplicadas a elas, ao executar o `DELETE` ocorrerá uma ação de acordo com a restrição que tiver sido imposta na criação da **foreign key**. Essas restrições podem ser as seguintes:

```language-sql
-- Rejeita o comando DELETE.
ON DELETE NO ACTION

-- Rejeita o comando DELETE.
ON DELETE RESTRICT

-- Permite a exclusão dos registros da tabela pai, e seta para NULL os registros da tabela filho.
ON DELETE SET NULL

-- Exclui a informação da tabela pai e registros relacionados.
ON DELETE CASCADE
```

Vamos analisar um exemplo prático:

```language-sql
DELETE FROM sakila.actor
WHERE first_name = 'GRACE';
```

Se tentar rodar essa _query_, você vai se deparar com o erro exibido na imagem abaixo:

<%= figure(%{src: "/back-end/sql/images/ondeleterestrict.png", caption: "Erro ON DELETE RESTRICT", class: "text-center rounded mx-auto d-block", width: "500px", height: "auto"}) %>

O banco de dados não vai permitir que você delete o ator chamado "GRACE". Isso acontece porque a coluna `actor_id` da tabela `film_actor` é uma chave estrangeira (_foreign key_) que aponta para a coluna `actor_id` na tabela `actor`, e essa chave estrangeira possui a restrição `ON DELETE RESTRICT`. Se essa restrição não existisse, o ator seria deletado, deixando nosso banco de dados em um estado inconsistente, pois haveria linhas na tabela `film_actor` com um `actor_id` que não mais existiria!

Para conseguir excluir este ator em `actors`, precisamos primeiro excluir todas as referências a ele na tabela `sakila.film_actor`:

```language-sql
DELETE FROM sakila.film_actor
WHERE actor_id = 7; -- actor_id = 7 é o Id de GRACE
```

Após excluir as referências, podemos excluir o ator com o nome "GRACE":

```language-sql
DELETE FROM sakila.actor
WHERE first_name = 'GRACE';
```

Antes de excluir dados que possuem restrições de chave estrangeira, como o exemplo que acabamos de ver, analise se você realmente deve excluir essa informação do banco de dados e depois, caso precise, faça de acordo com as restrições que foram impostas durante a criação da tabela. Elas são colocadas lá para garantir [a integridade de seus dados](https://pt.wikipedia.org/wiki/Integridade_de_dados) {: .external-link target="_blank" rel="noreferrer noopener" }. Se existem restrições, normalmente não faria sentido simplesmente ignorá-las.

##### `DELETE` VS `TRUNCATE`

Se tem certeza absoluta de que quer excluir os registros de uma tabela de uma maneira mais rápida, para efeitos de testes ou necessidade, o `TRUNCATE` é mais rápido que o `DELETE`. A função principal e única do `TRUNCATE` é de limpar (excluir todos os registros) de uma tabela, não sendo possível especificar o `WHERE`. Por isso, o `TRUNCATE` só pode ser usado nesse cenário.

```language-sql
TRUNCATE banco_de_dados.tabela;
```

Caso precise excluir condicionalmente, usando regras e especificações, use sempre o comando `DELETE` juntamente com o `WHERE`.

##### Vamos praticar o `DELETE`

1. Exclua do banco de dados o ator com o nome de "KARL".

2. Exclua do banco de dados os atores com o nome de "MATTHEW".

3. Exclua da tabela `film_text` todos os registros que possuem a palavra "saga" em suas descrições.

4. Apague da maneira mais performática possível todos os registros das tabelas `film_actor` e `film_category`.

5. Inspecione todas as tabelas do banco de dados `sakila` e analise quais restrições `ON DELETE` foram impostas em cada uma. Use o Table Inspector para fazer isso (aba DDL).

6. Exclua o banco de dados e o recrie (use as instruções no início desta aula).

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

Vamos bater um papo sobre **SQL**? Hora da aula ao vivo! Vamos para o Slack, onde o link estará disponível.

---

## Exercícios

###### Tempo sugerido para realização: 40 minutos

Os exercícios propostos possuem níveis variáveis de dificuldade. Tente fazer o máximo que conseguir.

**Exercício 1**: Faça o exercício sobre `INSERT` [deste link](https://sqlbolt.com/lesson/inserting_rows) {: .external-link target="_blank" rel="noreferrer noopener" }.

**Exercício 2**: Faça o exercício sobre `UPDATE`[deste link](https://sqlbolt.com/lesson/updating_rows) {: .external-link target="_blank" rel="noreferrer noopener" }

Crie uma conta no [Vertabelo Academy](https://academy.vertabelo.com/) {: .external-link target="_blank" rel="noreferrer noopener" } para conseguir fazer os próximos exercícios.

**Exercício 3**: Faça [este exercício](https://academy.vertabelo.com/course/operating-on-data-in-sql/insert/insert/insert) {: .external-link target="_blank" rel="noreferrer noopener" } sobre `INSERT`.

**Exercício 4**: Faça [este exercício](https://academy.vertabelo.com/course/operating-on-data-in-sql/update/update/update) {: .external-link target="_blank" rel="noreferrer noopener" } sobre `UPDATE`.

**Exercício 5**: Faça [este exercício](https://academy.vertabelo.com/course/operating-on-data-in-sql/delete/delete/delete) {: .external-link target="_blank" rel="noreferrer noopener" } sobre `DELETE`.

### Bônus

Para fazer os exercícios a seguir, restaure o backup do banco de dados `HR`, disponível clicando [neste link](/back-end/HR_database_backup.sql) {: .external-link target="_blank" rel="noreferrer noopener" } com o botão direito e escolhendo a opção "Salvar como".

1. Execute o conteúdo deste arquivo `.sql` em seu banco de dados local.
2. Leia o enunciado do exercício.
3. Monte uma _query_ em seu banco local, que você acabou de restaurar, e veja se seu resultado resolve o desafio.
4. Caso não consiga resolver os exercícios, consulte as respostas clicando em "Click me to see the solution" na página do desafio.

**Exercício 6**: Faça os exercícios sobre `INSERT` [deste link](https://www.w3resource.com/mysql-exercises/insert-into-statement/) {: .external-link target="_blank" rel="noreferrer noopener" }.

**Exercício 7**: Faça os exercícios sobre `UPDATE` [deste link](https://www.w3resource.com/mysql-exercises/update-table-statement/) {: .external-link target="_blank" rel="noreferrer noopener" }.

---

## Recursos adicionais (opcional)

- [Tutorial sobre `INSERT` do Guru99](https://www.guru99.com/insert-into.html) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Tutorial sobre `INSERT` do MySQL Tutorial](https://www.mysqltutorial.org/mysql-insert-statement.aspx) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Tutorial sobre `UPDATE` do MySQL Tutorial](https://www.mysqltutorial.org/mysql-update-data.aspx) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Tutorial sobre `DELETE` e `UPDATE` do Guru99](https://www.guru99.com/delete-and-update.html) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Tutorial sobre `DELETE` do MySQL Tutorial](https://www.mysqltutorial.org/mysql-delete-statement.aspx) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Tutorial sobre `DELETE` do Tech On The Net](https://www.techonthenet.com/mysql/delete.php) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Documentação sobre restrições de chaves estrangeiras no MySQL](https://dev.mysql.com/doc/refman/5.7/en/create-table-foreign-keys.html) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
