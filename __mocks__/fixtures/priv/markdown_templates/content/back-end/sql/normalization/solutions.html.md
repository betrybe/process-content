## Gabarito dos exercícios

A seguir encontra-se uma sugestão de solução para os exercícios propostos.

## Exercícios de fixação

**Exercício 1:** Analise as tabelas `actor`, `address`, `city` e `film` do banco de dados `sakila` e determine se elas estão ou não dentro de alguma das formas normais.

##### Tabela `actor`

Está na 3ª Forma Normal.

Motivo:

***1ª Forma Normal***

* Colunas possuem apenas um valor
* Valores em uma coluna são do mesmo tipo de dados
* Cada coluna possuem um nome único
* A ordem dos dados registrados em uma tabela não afeta a integridade dos dados

***2ª Forma Normal***

* Tabela está na 1ª Forma Normal
* A tabela não possui dependências parciais

***3ª Forma Normal***

* Tabela está na 1ª e 2ª Formas Normais
* Tabela não contém atributos (colunas) que não são totalmente dependentes na *PK* (chave primária)

##### Tabela `address`

Está na 3ª Forma Normal.

Motivo:

***1ª Forma Normal***

* Colunas possuem apenas um valor
* Valores em uma coluna são do mesmo tipo de dados
* Cada coluna possuem um nome único
* A ordem dos dados registrados em uma tabela não afeta a integridade dos dados

***2ª Forma Normal***

* Tabela está na 1ª Forma Normal
* A tabela não possui dependências parciais

***3ª Forma Normal***

* Tabela está na 1ª e 2ª Formas Normais
* Tabela não contém atributos (colunas) que não são totalmente dependentes na *PK* (chave primária)

##### Tabela `city`

Está na 3ª Forma Normal.

Motivo:

***1ª Forma Normal***

* Colunas possuem apenas um valor
* Valores em uma coluna são do mesmo tipo de dados
* Cada coluna possuem um nome único
* A ordem dos dados registrados em uma tabela não afeta a integridade dos dados

***2ª Forma Normal***

* Tabela está na 1ª Forma Normal
* A tabela não possui dependências parciais

***3ª Forma Normal***

* Tabela está na 1ª e 2ª Formas Normais
* Tabela não contém atributos (colunas) que não são totalmente dependentes na *PK* (chave primária)

##### Tabela `film`

Não está normalizada corretamente.

Motivo:

Coluna `special_features` possui mais de 1 valor, o que viola uma das regras da 1ª Forma Normal.

---

**Exercício 2:** Normalize a estrutura a seguir para a 1ª Forma Normal

**Obs.:** Lembre-se de que existem diversas maneiras de resolver o mesmo problema, desde que todas as condiçoes da 1ª Forma Normal sejam atendidas.

***1ª Forma Normal***

* Colunas devem possuir apenas um valor
* Valores em uma coluna devem ser do mesmo tipo de dados
* Cada coluna deve possuir um nome único
* A ordem dos dados não deve after a integridade dos dados

Tabela `funcionario`

<table class="table table-striped table-bordered">
    <thead class="thead-dark">
    <tr>
        <th title="Field #2">funcionario_id</th>
        <th title="Field #2">nome</th>
        <th title="Field #3">sobrenome</th>
        <th title="Field #3">contato</th>
        <th title="Field #4">telefone</th>
        <th title="Field #5">data_cadastro</th>
        <th title="Field #5">setor</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td class="table">12</td>
        <td class="table">Joseph</td>
        <td class="table">Rodrigues</td>
        <td class="table">jo@gmail.com</td>
        <td class="table">(35)998552-1445</td>
        <td class="table">2020-05-05 08:50:25</td>
        <td class="table">Administração</td>
    </tr>
    <tr>
        <td class="table">12</td>
        <td class="table">Joseph</td>
        <td class="table">Rodrigues</td>
        <td class="table">jo@gmail.com</td>
        <td class="table">(35)998552-1445</td>
        <td class="table">2020-05-05 08:50:25</td>
        <td class="table">Vendas</td>
    </tr>
    <tr>
        <td class="table">13</td>
        <td class="table">André</td>
        <td class="table">Freeman</td>
        <td class="table">andre1990@gmail.com</td>
        <td class="table">(47)99522-4996</td>
        <td class="table">2020-02-05 00:00:00</td>
        <td class="table">Operacional</td>
    </tr>
    <tr>
        <td class="table">14</td>
        <td class="table">Cíntia</td>
        <td class="table">Duval</td>
        <td class="table">cindy@outlook.com</td>
        <td class="table">(33)99855-4669</td>
        <td class="table">2020-05-05 10:55:35</td>
        <td class="table">Estratégico</td>
    </tr>
    <tr>
        <td class="table">14</td>
        <td class="table">Cíntia</td>
        <td class="table">Duval</td>
        <td class="table">cindy@outlook.com</td>
        <td class="table">(33)99855-4669</td>
        <td class="table">2020-05-05 10:55:35</td>
        <td class="table">Vendas</td>
    </tr>
    <tr>
        <td class="table">15</td>
        <td class="table">Fernanda</td>
        <td class="table">Mendes</td>
        <td class="table">fernandamendes@yahoo.com</td>
        <td class="table">(33)99200-1556</td>
        <td class="table">2020-05-05 11:45:40</td>
        <td class="table">Marketing</td>
    </tr>
    </tbody>
</table>

---

**Exercício 3:** Usando a estrutura (já normalizada para 1ª Forma Normal) da tabela anterior, transforme-a agora na 2° Forma Normal.

Novamente, há diferentes maneiras de resolver esse problema. Desde que se atenda aos requisitos a seguir, considere o exercício correto.

***2ª Forma Normal***

* Tabela deve estar na 1ª Forma Normal
* A tabela não deve possuir dependências parciais

Tabela `funcionario`

<table class="table table-striped table-bordered">
    <thead class="thead-dark">
    <tr>
        <th title="Field #2">funcionario_id</th>
        <th title="Field #2">nome</th>
        <th title="Field #3">sobrenome</th>
        <th title="Field #3">contato</th>
        <th title="Field #4">telefone</th>
        <th title="Field #5">data_cadastro</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td class="table">12</td>
        <td class="table">Joseph</td>
        <td class="table">Rodrigues</td>
        <td class="table">jo@gmail.com</td>
        <td class="table">(35)998552-1445</td>
        <td class="table">2020-05-05 08:50:25</td>
    </tr>
    <tr>
        <td class="table">13</td>
        <td class="table">André</td>
        <td class="table">Freeman</td>
        <td class="table">andre1990@gmail.com</td>
        <td class="table">(47)99522-4996</td>
        <td class="table">2020-02-05 00:00:00</td>
    </tr>
    <tr>
        <td class="table">14</td>
        <td class="table">Cíntia</td>
        <td class="table">Duval</td>
        <td class="table">cindy@outlook.com</td>
        <td class="table">(33)99855-4669</td>
        <td class="table">2020-05-05 10:55:35</td>
    </tr>
    <tr>
        <td class="table">15</td>
        <td class="table">Fernanda</td>
        <td class="table">Mendes</td>
        <td class="table">fernandamendes@yahoo.com</td>
        <td class="table">(33)99200-1556</td>
        <td class="table">2020-05-05 11:45:40</td>
    </tr>
    </tbody>
</table>

Tabela `setor`

<table class="table table-striped table-bordered">
    <thead class="thead-dark">
    <tr>
        <th title="Field #2">setor_id</th>
        <th title="Field #2">nome</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td class="table">1</td>
        <td class="table">Administração</td>
    </tr>
    <tr>
        <td class="table">2</td>
        <td class="table">Vendas</td>
    </tr>
    <tr>
        <td class="table">3</td>
        <td class="table">Operacional</td>
    </tr>
    <tr>
        <td class="table">4</td>
        <td class="table">Estratégico</td>
    </tr>
    <tr>
        <td class="table">5</td>
        <td class="table">Marketing</td>
    </tr>
    </tbody>
</table>

Tabela `setor_funcionario` ou `funcionario_setor` (ou algum nome que represente claramente os dados presentes nessa tabela)

<table class="table table-striped table-bordered">
    <thead class="thead-dark">
    <tr>
        <th title="Field #2">funcionario_id</th>
        <th title="Field #2">setor_id</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td class="table">12</td>
        <td class="table">1</td>
    </tr>
    <tr>
        <td class="table">12</td>
        <td class="table">2</td>
    </tr>
    <tr>
        <td class="table">13</td>
        <td class="table">3</td>
    </tr>
    <tr>
        <td class="table">14</td>
        <td class="table">4</td>
    </tr>
    <tr>
        <td class="table">14</td>
        <td class="table">2</td>
    </tr>
    <tr>
        <td class="table">15</td>
        <td class="table">5</td>
    </tr>
    </tbody>
</table>

---

**Exerício 4:** Monte uma query que:

* Crie um banco de dados chamado `normalization`;
* Crie todas as tabelas resultantes do exercício 3 (na 2ª Forma Normal);
* Popule todas as tabelas com os dados fornecidos nos exerícios.

```language-sql
CREATE DATABASE IF NOT EXISTS normalization;
USE normalization;

CREATE TABLE setor(
    setor_id INT primary key,
    nome VARCHAR(100)
) engine=InnoDB;

INSERT INTO setor(setor_id, nome) VALUES(1, 'Administração');
INSERT INTO setor(setor_id, nome) VALUES (2, 'Vendas');
INSERT INTO setor(setor_id, nome) VALUES(3, 'Operacional');
INSERT INTO setor(setor_id, nome) VALUES(4, 'Estratégico');
INSERT INTO setor(setor_id, nome) VALUES(5, 'Marketing');

CREATE TABLE funcionario(
    funcionario_id INT primary key,
    nome VARCHAR(100),
    sobrenome VARCHAR(100),
    contato VARCHAR(100),
    telefone VARCHAR(100),
    data_cadastro VARCHAR(100)
) engine=InnoDB;

INSERT INTO funcionario(funcionario_id, nome, sobrenome, contato, telefone, data_cadastro) VALUES(12, 'Joseph', 'Rodrigues', 'jo@gmail.com', '(35)998552-1445', '2020-05-05 08:50:25');
INSERT INTO funcionario(funcionario_id, nome, sobrenome, contato, telefone, data_cadastro) VALUES(13, 'André', 'Freeman', 'andre1990@gmail.com', '(47)99522-4996', '2020-02-05 00:00:00');
INSERT INTO funcionario(funcionario_id, nome, sobrenome, contato, telefone, data_cadastro) VALUES(14, 'Cíntia', 'Duval', 'cindy@outlook.com', '(33)99855-4669', '2020-05-05 10:55:35');
INSERT INTO funcionario(funcionario_id, nome, sobrenome, contato, telefone, data_cadastro) VALUES(15, 'Fernanda', 'Mendes', 'fernandamendes@yahoo.com', '(33)99200-1556', '2020-05-05 11:45:40');

CREATE TABLE funcionario_setor(
    funcionario_id INT NOT NULL,
    setor_id INT NOT NULL,
    foreign key (funcionario_id) references funcionario(funcionario_id),
    foreign key (setor_id) references setor(setor_id)
) engine=InnoDB;

INSERT INTO funcionario_setor(funcionario_id, setor_id) VALUES(12, 1);
INSERT INTO funcionario_setor(funcionario_id, setor_id) VALUES(12, 2);
INSERT INTO funcionario_setor(funcionario_id, setor_id) VALUES(13, 3);
INSERT INTO funcionario_setor(funcionario_id, setor_id) VALUES(14, 4);
INSERT INTO funcionario_setor(funcionario_id, setor_id) VALUES(14, 2);
INSERT INTO funcionario_setor(funcionario_id, setor_id) VALUES(15, 5);
```
