## O que vamos aprender?

Olá, pessoal! Bem-vindos à continuação da nossa jornada para dominar os bancos de dados ⚔️.
Após aprofundar sobre os conceitos de chaves primária e secundária, relacionamentos e entidade, hoje você vai aprender um importante conceito que vai deixá-lo pronto para enfrentar os desafios de modelagem, design e, principalmente, desempenho de banco de dados.

O foco de hoje é a normalização de bancos de dados. A normalização evita desperdícios de espaço e garante bancos mais simples de se entender e manter! Seu conhecimento diferencia os profissionais iniciantes dos profissionais mais experientes, além de agregar mais valor a nossos futuros projetos.

_Let's do it!_

---

### Você será capaz de:

* Entender o que é a `normalização`
* Saber discernir se uma tabela está ou não `normalizada`
* Aplicar a `1ª Forma Normal`
* Aplicar a `2ª Forma Normal`
* Aplicar a `3ª Forma Normal`
* Aprender a criar e restaurar *backups* usando o *MySQL Workbench* e também o comando `dump`;

---

## Por que isso é importante?

Os conceitos de normalização permitem que você aprofunde seus conhecimentos nas estruturas relacionais fundamentais, o que colabora para a tomada de decisões mais assertivas e seguras. Essa confiança será importantíssima no momento de fazer modificações em estruturas de bancos de dados existentes ou criar novas estruturas do zero.

---

## Conteúdos

###### Tempo sugerido para realização: 80 minutos

### O que é a Normalização?

Para que você possa ter uma ideia do que é e de como funciona a normalização, assista ao vídeo abaixo:

**Obs.:** É recomendado assistir a todos os vídeos em sequência.

<%= vimeo "395197312" %>

Assim, com essa informação, podemos começar a aprender sobre normalização com a `Primeira Forma Normal`.

### 1ª Forma Normal

Para iniciar a organização de um banco de dados, devemos nos atentar para a primeira forma normal - base de todas as outras. Seus preceitos são:

* Colunas devem possuir apenas um valor
* Valores em uma coluna devem ser do mesmo tipo de dados
* Cada coluna deve possuir um nome único
* A ordem dos dados registrados em uma tabela não deve afetar a integridade dos dados

Vamos descobrir se as estruturas que criamos estão dentro da `Primeira Forma Normal`? Veja o vídeo a seguir:

<%= vimeo "395195514" %>

### 2ª Forma Normal

Para a `Segunda Forma Normal`, devemos atentar para o seguinte:

* A tabela deve estar na 1ª Forma Normal
* A tabela não deve possuir dependências parciais. 

Uma dependência parcial pode ser considerada como qualquer coluna que não depende exclusivamente da chave primária da tabela para existir. Por exemplo, considere uma tabela **Pessoa Estudantes**  que possui as seguintes colunas


|id | nome  | data_matricula  | curso  | 
|---|---|---|---|
| 1 | Samuel  | 2020-09-01  | Física  |
| 2 | Joana   | 2020-08-15  | Biologia  |
| 3  | Taís  | 2020-07-14  |  Contabilidade |
| 4 | André   | 2020-06-12  | Biologia  |

A coluna curso pode ser considerada uma dependência parcial pois poderiámos mover os valores dessa coluna para uma outra tabela e os dados dessa tabela podem existir independente de existir uma pessoa estudante vinculada a esse curso ou não. Dessa forma depois de normalizar teríamos duas tabelas:

**Cursos** 

|id | nome  |
|---|---|
| 1 | Física  |
| 2 | Biologia  |
| 3  | Contabilidade |

**Pessoas Estudantes**

|id | nome  | data_matricula  | curso_id  |
|---|---|---|---|
| 1 | Samuel  | 2020-09-01  | 1  |
| 2 | Joana   | 2020-08-15  | 2  |
| 3  | Taís  | 2020-07-14  |  3 |
| 4 | André   | 2020-06-12  | 2  |


Dessa forma, aplicamos a segunda forma normal na tabela **Pessoas Estudantes**. Lembre-se que a função da normalização não é necessariamente reduzir o número de colunas mas remover redundâncias e possíveis anomalias de inclusão/alteração ou remoção. 


Caso queira você também pode conferir como aplicar a segunda forma normal assistindo o vídeo a seguir:

<%= vimeo "395198632" %>

### 3ª Forma Normal

Por fim, a `Terceira Forma Normal` estabelece que:

* A tabela deve estar na 1ª e 2ª Formas Normais;
* A tabela não deve conter atributos (colunas) que não sejam totalmente dependentes na _PK_ (chave primária).

Para entender sobre a `Terceira Forma Normal`, assista ao seguinte vídeo:

<%= vimeo "395228007" %>

Você pode conferir [aqui](https://docs.microsoft.com/pt-br/office/troubleshoot/access/database-normalization-description#normalizing-an-example-table) {: .external-link target="_blank" rel="noreferrer noopener" } um resumo dos pontos mencionados nos vídeos sobre cada uma das Formas Normais, bem como sua aplicação na prática.

### Exercícios de fixação - normalização de dados

Vamos consolidar toda a explicação passada até o momento através de alguns desafios.

**Exercício 1:** Normalize a tabela a seguir para a 1ª Forma Normal.

Não se preocupe em montar a estrutura em código `SQL` neste primeiro momento. Crie apenas uma planilha (Excel, Google Sheets, Open Office Calc ou semelhantes) da estrutura esperada.

<table class="table table-striped table-bordered">
    <thead class="thead-dark">
    <tr>
        <th title="Field #2">Funcionario_id</th>
        <th title="Field #2">Nome</th>
        <th title="Field #3">Sobrenome</th>
        <th title="Field #3">Contato</th>
        <th title="Field #4">Contato</th>
        <th title="Field #5">DataCadastro</th>
        <th title="Field #5">Setor</th>
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
        <td class="table">Administração, Vendas</td>
    </tr>
    <tr>
        <td class="table">13</td>
        <td class="table">André</td>
        <td class="table">Freeman</td>
        <td class="table">andre1990@gmail.com</td>
        <td class="table">(47)99522-4996</td>
        <td class="table">5 de Fevereiro de 2020</td>
        <td class="table">Operacional</td>
    </tr>
    <tr>
        <td class="table">14</td>
        <td class="table">Cíntia</td>
        <td class="table">Duval</td>
        <td class="table">cindy@outlook.com</td>
        <td class="table">(33)99855-4669</td>
        <td class="table">2020-05-05 10:55:35</td>
        <td class="table">Estratégico, Vendas</td>
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

**Exercício 2:** Usando a estrutura (já normalizada para 1ª Forma Normal) da tabela anterior, transforme-a agora na 2ª Forma Normal.

**Exerício 3:** Monte uma query que:

* Crie um banco de dados chamado `normalization`;
* Crie todas as tabelas resultantes do exercício 2 (na 2ª Forma Normal);
* Popule todas as tabelas com os dados fornecidos nos exercícios.

### O que é um dump?

Um `dump` (despejo, em português), no contexto de banco de dados, é o ato de pegar o esquema do banco de dados (estrutura de tabelas, banco de dados e suas restrições) e, opcionalmente, também os dados de cada uma dessas tabelas e salvá-las em arquivos de texto, geralmente na forma de instruções `SQL`.

O intuito desse processo é possibilitar que esses arquivos `SQL` sejam utilizados em algum outro lugar.

Por exemplo: você pode precisar restaurar um banco corrompido, a partir de um backup do banco feito em determinado momento, para retorná-lo a um estado anterior ao problema. Ou pode querer executar no seu servidor local uma parte de seu banco de dados de produção. Esse último caso é útil, por exemplo, quando você precisa solucionar bugs difíceis de serem reproduzidos de outra forma.

### Como criar um `dump` de um banco de dados com o MySQL Workbench

Abra o **MySQL Workbench** e conecte-se ao seu servidor local.

Clique na aba ***Administration*** e selecione ***Data Export***.

<%= figure(%{src: "/back-end/sql/projects/images/export1.png", caption: "Passo 1", class: "text-center rounded mx-auto d-block", width: "350px", height: "auto"}) %>

Para exportar schema e/ou dados, siga as instruções abaixo:

1. Escolha quais bancos de dados devem ser incluídos no backup;

2. Escolha quais tabelas deve ser incluídas no backup;

3. Escolha se `Stored Procedures` e `Stored Functions` devem ou não ser incluídas;

4. Escolha se gostaria de exportar apenas estrutura (_Structure Only_), apenas os dados (_Data Only_) ou ambos (_Structure and Data_);

5. Escolha se gostaria de incluir os `triggers` no arquivo de backup;

6. Escolha se gostaria de incluir o esquema (código para criar banco de dados. Ex.: `CREATE DATABASE`);

7. Selecione o local para onde exportar o arquivo.

<%= figure(%{src: "/back-end/sql/projects/images/export_steps.png", caption: "Passo 2", class: "text-center rounded mx-auto d-block", width: "750px", height: "auto"}) %>

Você deve escolher as opções de acordo com suas necessidades.

Feito isso, basta clicar no botão ***Start Export***.

<%= figure(%{src: "/back-end/sql/projects/images/export_steps2.png", caption: "Passo 2", class: "text-center rounded mx-auto d-block", width: "750px", height: "auto"}) %>

Seu arquivo de dump será salvo no local que você definiu anteriormente.

<%= figure(%{src: "/back-end/sql/projects/images/export3.png", caption: "Passo 3", class: "text-center rounded mx-auto d-block", width: "350px", height: "auto"}) %>

### Restaurando um banco de dados a partir de um `dump` com o MySQL Workbench

O modo mais simples de restaurar um `dump` é executá-lo como um script dentro do **MySQL Workbench**, algo que você já fez algumas vezes nos dias anteriores.

1. Abra o **MySQL Workbench**.

2. Vá até File -> Open SQL Script.

    <%= figure(%{src: "/back-end/sql/images/workbench1.png", caption: "Restaurando a partir de um arquivo .sql - passo 1", class: "text-center rounded mx-auto d-block", width: "500px", height: "auto"}) %>

3. Navegue até o local onde o arquivo de dump foi salvo.

    <%= figure(%{src: "/back-end/sql/projects/images/export3.png", caption: "Passo 2", class: "text-center rounded mx-auto d-block", width: "350px", height: "auto"}) %>

4. Execute o script **SQL** clicando no botão com formato de trovão:

    <%= figure(%{src: "/back-end/sql/images/workbench3.png", caption: "Restaurando a partir de um arquivo .sql - passo 3", class: "text-center rounded mx-auto d-block", width: "700px", height: "auto"}) %>

5. Aguarde até a finalização. Após finalizar a execução do script, clique no botão indicado na imagem a seguir para verificar se o banco foi restaurado corretamente:

    <%= figure(%{src: "/back-end/sql/images/workbench4.png", caption: "Restaurando a partir de um arquivo .sql - passo 4", class: "text-center rounded mx-auto d-block", width: "700px", height: "auto"}) %>

### Como criar e restaurar um `dump` de um banco de dados através da linha de comando

Às vezes você não tem acesso a uma ferramenta gráfica como o Workbench e precisa fazer um `dump` de um banco de dados. Nesses casos, esse mesmo processo pode ser executado via linha de comando.

Veja o vídeo a seguir com um tutorial que descreve as partes mais comuns desse processo. Lembre-se de que você pode ativar a legenda do vídeo, marcar a opção de tradução automática e depois selecionar o idioma português.

<%= youtube_video "BsKXzm6qbcM" %>

### Exercícios de fixação - dump

Selecione um dos bancos de dados já existentes no seu servidor local (`w3schools`, `northwind`, `sakila`, `hr` etc.) e faça os passos a seguir:

1. Exporte **a estrutura e os dados** (tabelas, triggers, procedures, functions e o *schema*) para um dump em formato de arquivo SQL, como foi exibido nas instruções anteriores. Faça o dump através da linha de comando e usando o **MySQL Workbench**.

2. Após ter feito isso, abra o arquivo usando algum editor de texto e altere as duas linhas iniciais, mudando o nome do banco a ser criado e do banco a ser usado. Assim seu script vai restaurar um banco novo e não sobrescrever o atual.

    No exemplo abaixo, foi feito o backup do banco de dados `hotel`. Após ser gerado o backup, o arquivo foi aberto, e o nome do banco a ser criado foi alterado para `hotel2`. A linha ``USE `hotel` `` também foi alterada para ``USE `hotel2` ``.

    <%= figure(%{src: "/back-end/sql/projects/images/dump1.png", class: "text-center rounded mx-auto d-block", width: "650px", height: "auto"}) %>

3. Confira que, ao executar os comandos para restaurar o `dump`, um novo banco de dados foi criado, como na imagem abaixo.

<%= figure(%{src: "/back-end/sql/projects/images/dump2.png", class: "text-center rounded mx-auto d-block", width: "350px", height: "auto"}) %>

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

Vamos bater um papo sobre normalização? Hora da aula ao vivo! Vamos para o Slack, onde o link estará disponível.

---

## Exercícios

###### Tempo sugerido para realização: 80 minutos

<%= versioning_your_code(@conn) %>

### Agora, a prática:

Os exercícios abaixo estão disponibilizados em arquivos no formato Excel (.xlsx). Eles podem ser abertos em softwares livres como Google Sheets, Open Office e Libre Office. 
Não é necessário montar queries para resolver os exercícios. Crie novas planilhas com suas respostas.

**Exercício 1:** Converta [esta tabela](/back-end/sql/normalization/tables/0-Tabela-Nao-Normalizada.xlsx) {: .external-link target="_blank" rel="noreferrer noopener" } para a 1ª Forma Normal. Após tentar resolver, consulte [aqui](/back-end/sql/normalization/tables/1-Primeira-Forma-Normal.xlsx) {: .external-link target="_blank" rel="noreferrer noopener" } a resposta.

**Exercício 2:** Converta a tabela construída no exercício anterior (que já deve estar na 1ª Forma Normal) para a 2ª Forma Normal. Após tentar resolver, consulte [aqui](/back-end/sql/normalization/tables/2-Segunda-Forma-Normal.xlsx) {: .external-link target="_blank" rel="noreferrer noopener" } aqui a resposta.

**Exercício 3:** Agora, converta essa nova tabela (que já deve estar na 2ª Forma Normal) para a 3ª Forma Normal. Após tentar resolver, consulte [aqui](/back-end/sql/normalization/tables/3-Terceira-Forma-Normal.xlsx) {: .external-link target="_blank" rel="noreferrer noopener" } a resposta.

**Exercício 4:** Converta para a 3ª Forma Normal a tabela [deste exercício do site Gitta](http://www.gitta.info/LogicModelin/en/html/DataConsiten_selfAssessment5.html) {: .external-link target="_blank" rel="noreferrer noopener" }.

### Bônus

**Exercício 5:** Faça os exercícios sobre normalização (em inglês) [deste link](https://www.javaguicodexample.com/normalizationnotes.pdf) {: .external-link target="_blank" rel="noreferrer noopener" }.

---

## Recursos adicionais (opcional)

- Mais informações sobre normalização de banco de dados [neste artigo do Medium ](https://medium.com/@diegobmachado/normaliza%C3%A7%C3%A3o-em-banco-de-dados-5647cdf84a12) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Conceitos Gerais sobre normalização](https://www.luis.blog.br/normalizacao-de-dados-e-as-formas-normais.html) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
