## O que vamos aprender?

Hoje você estará focado em aprender, da forma mais sucinta possível, todo o processo de **como modelar um banco de dados**. Dentro desse processo de modelagem, vamos abordar como idealizar uma estrutura ideal, tendo em mente um problema que precisa ser resolvido. Será ensinado ainda como identificar entidades, como montar um diagrama de entidade-relacionamento e como produzir uma estrutura adequada a partir disso.

---

### Você será capaz de:

* Modelar um banco de dados;

* Identificar **entidades**, **atributos** e **relacionamentos**;

* Construir um **diagrama entidade-relacionamento** (diagrama ER);

* Criar um banco de dados;

* Criar e modelar tabelas com base em um diagrama ER.

---

## Por que isso é importante?

A frequência com a qual você interage com um banco de dados está, em muitas das vezes, ligada diretamente com a sua área de atuação. Entretanto, de que maneira as principais áreas de atuação no mercado hoje estão ligadas com o conhecimento de banco de dados?

* **Desenvolvimento de Software** - Onde o trabalho de criação de banco de dados e tabelas é feito com mais frequência, nos momentos iniciais de um novo projeto. Contudo, durante o processo de desenvolvimento, é natural estar sempre atualizando sistemas e, consequentemente, criando tabelas para se adequar a novas funcionalidades. Em cargos como esse, o seu foco normalmente estará mais em criar queries para realizar consultas e gerar relatórios e menos na porção de criação de tabelas e bancos de dados;

* **DBA ou Database Administrator** - Nessa profissão você estará trabalhando muito mais focado em todos os aspectos que englobam a criação e manutenção de uma ou mais instâncias de bancos de dados, sendo comum atuar com diferentes servidores, como **SQL Server**, **PostgresSQL**, **MySQL**, **SQLite**, entre outros. Esse profissional deve possuir um conhecimento mais profundo sobre as limitações e diferenças entre servidores, sintaxe, gerenciamento de memória, instalação de servidores, otimização de queries e outros aspectos relacionados;

* **Data Scientists** - São profissionais que atuam no campo de [Data Science](https://www.linkedin.com/jobs/data-scientist-vagas/?originalSubdomain=br) {: .external-link target="_blank" rel="noreferrer noopener" }, e seu foco está centrado principalmente em análise de dados e na capacidade de montar queries de grande complexidade, com o intuito de extrair algo útil de dentro de uma quantidade enorme de dados, a fim de ser usado para algum campo de estudo;

**Algo comum entre todas essas profissões** é a necessidade de saber transformar ideias, problemas ou situações em um banco de dados.

Portanto, serão providas as ferramentas e o conhecimento necessários para que você possa dar o passo inicial e, mais tarde, escolher qual área se adequa mais ao seu perfil.

Vamos lá!

---

## Conteúdos

###### Tempo sugerido para realização: 120 minutos

### Como transformar uma ideia em banco de dados?

Uma ideia que eventualmente será transformada em um banco de dados começa com uma história ou problema a ser resolvido. É isso que será coberto hoje: um cenário fictício que precisa ser resolvido e como ir da idealização para a sua solução.

### O problema - Catálogo de Álbuns

Suponha que seja necessário criar um banco de dados para armazenar informações sobre um catálogo de álbuns musicais. As informações a serem armazenadas sobre cada álbum são:

* Título;

* Preço;

* Estilo Musical;

* Canções.

Cada álbum também terá um artista, e cada artista pode produzir vários álbuns. As canções devem ter título e duração (em segundos).

### Database Design - Como modelar um banco de dados

Existem alguns passos a serem seguidos durante a modelagem e criação de um banco de dados. Um fluxo bastante comum nesse processo consiste em:

1. Identificar as **entidades**, **atributos** e **relacionamentos** com base na descrição do problema;

2. Construir um **diagrama entidade-relacionamento** para representar as entidades encontradas no passo 1;

3. **Criar um banco de dados** para conter suas tabelas;

4. **Criar e modelar tabelas** tendo o diagrama do passo 2 como base.

A seguir você verá como realizar cada um desses passos.

##### 1) Identificando entidades, atributos e relacionamentos

Primeiramente você deve identificar as **entidades**, **atributos** e **relacionamentos** com base na descrição do problema. Porém, antes disso é necessário entender o significado de cada um deles.

##### **Entidades:**

São uma representação de algo do mundo real dentro do banco de dados. Elas normalmente englobam toda uma ideia e são armazenadas em formato de tabelas em um banco de dados.

**Antes de expandir o código a seguir:** Volte à descrição do problema acima e busque identificar quais objetos devem se tornar entidades. Depois expanda o código abaixo para verificar.
    
<details>
    <summary>
        Ver entidades
    </summary>
    Se sua interpretação foi diferente, não se preocupe. A maneira como você modelará o banco de dados varia de acordo com a sua escala.
    <ul>
        <li>Entidade 1: `Álbum`;</li>
        <li>Entidade 2: `Artista`;</li>
        <li>Entidade 3: `Estilo Musical`;</li>
        <li>Entidade 4: `Canção`.</li>
    </ul>
</details>

##### **Atributos:**

Os atributos são tudo aquilo que pode ser usado para descrever algo. Por exemplo, uma entidade pessoa pode ter nome, altura, peso e idade.

**Antes de expandir o código a seguir:** Considerando a história anterior sobre um catálogo de álbuns musicais, tente deduzir quais propriedades descrevem cada uma das entidades encontradas anteriormente.

    
<details>
    <summary>
        Ver atributos
    </summary>
    Se sua interpretação foi diferente, não se preocupe, você praticará mais hoje para que melhore essa percepção.
    <ul>
        <li>Álbum: `album_id`, `titulo`, `preco`, `estilo_id` e `artista_id`;</li>
        <li>Artista: `artista_id` e `nome`;</li>
        <li>Estilo Musical: `estilo_id` e `nome`;</li>
        <li>Canção: `cancao_id`, `nome` e `album_id`.</li>
    </ul>

    <p>
        Algo a ser notado aqui é que algumas informações precisam ser deduzidas, como, por exemplo, a coluna que armazena o identificador único dos registros (aqui chamado de id), que todas tabelas precisam ter.
    </p>
</details>

##### **Relacionamentos:**

Os relacionamentos servem para representar como uma entidade deve estar ligada com outra(s) no banco de dados. Há três tipos de relacionamentos possíveis em um banco de dados, que são:

* **Relacionamento Um para Um (1..1):**

    Nesse tipo de relacionamento, uma linha da `Tabela A` deve possuir apenas uma linha correspondente na `Tabela B` e vice-versa. Veja o exemplo abaixo:

    <%= figure(%{src: "/back-end/sql/images/relacionamentos1.2.png", caption: "Exemplo de relacionamento um para um", class: "text-center rounded mx-auto d-block", width: "400px", height: "auto"}) %>

    Apesar de ser possível inserir essas informações em apenas uma tabela, esse tipo de relacionamento é usado normalmente quando se quer dividir as informações de uma tabela maior em tabelas menores, evitando que as tabelas tenham dezenas de colunas.

* **Relacionamento Um para Muitos ou Muitos para Um (1..N):**

    Esse é um dos tipos mais comuns de relacionamento. Em cenários assim, uma linha na `Tabela A` pode ter várias linhas correspondentes na `Tabela B`, mas uma linha da `Tabela B` só pode possuir uma linha correspondente na `Tabela A`. Veja o exemplo abaixo:

    <%= figure(%{src: "/back-end/sql/images/relacionamentos2.png", caption: "Exemplo de relacionamento um para muitos ou muitos para um", class: "text-center rounded mx-auto d-block", width: "400px", height: "auto"}) %>

    Nesse exemplo, uma categoria pode estar ligada a vários livros, embora um livro deva possuir apenas uma categoria.

* **Relacionamento Muitos para Muitos (N..N):**

    O relacionamento muitos para muitos acontece quando uma linha na `Tabela A` pode possuir muitas linhas correspondentes na `Tabela B` e vice-versa. Veja o exemplo abaixo:

    <%= figure(%{src: "/back-end/sql/images/relacionamentos3.jpg", caption: "Exemplo de relacionamento muitos para muitos", class: "text-center rounded mx-auto d-block", width: "600px", height: "auto"}) %>

    Esse tipo de relacionamento pode ser visto também como dois relacionamentos um para muitos ligados por uma tabela intermediária, como é o caso da tabela *filme_ator*. Pode-se chamar essa tabela intermediária de **tabela de junção**. Ela é usada para guardar informações de como as tabelas se relacionam entre si.

    Desta maneira, quando se quer demonstrar que um filme pode contar com vários atores e também que os atores podem atuar em vários filmes, surge a necessidade de um relacionamento muitos para muitos.

**Antes de expandir o código a seguir:** Volte à estrutura de tabelas do **Catálogo de Álbuns** e tente identificar quais tipos de relacionamentos existem entre as tabelas. Escreva-os em algum lugar e depois expanda abaixo para ver os relacionamentos. Praticar essa habilidade é crucial.


<details>
    <summary>
        Ver Relacionamentos
    </summary>
    Os relacionamentos identificados foram:

    <ul>
        <li>Um artista pode possuir um ou mais álbuns;</li>
        <li>Um estilo musical pode estar contido em um ou mais álbuns;</li>
        <li>Um álbum pode possuir uma ou mais canções.</li>
    </ul>
</details>

##### 2) Construindo um diagrama entidade-relacionamento

No segundo passo, será construído um **diagrama entidade-relacionamento** para representar as entidades encontradas no passo 1.

Existem [diversas ferramentas](https://www.holistics.io/blog/top-5-free-database-diagram-design-tools/) {: .external-link target="_blank" rel="noreferrer noopener" } para modelar os relacionamentos em um banco de dados. Hoje será usada a [**draw.io**](https://draw.io) {: .external-link target="_blank" rel="noreferrer noopener" } para criar os modelos. Você pode aprender como utilizar essa ferramenta assistindo a [este vídeo.](https://www.youtube.com/watch?v=VgTRNqn2fn0) {: .external-link target="_blank" rel="noreferrer noopener" }

Agora é preciso montar um diagrama de relacionamento básico que demonstra como uma entidade é relacionada com a outra, usando o modelo `EntidadeA` + verbo + `EntidadeB`.

Considerando as entidades `Álbum`, `Artista`, `Estilo Musical` e `Canção`, foi construído o seguinte diagrama:

<%= figure(%{src: "/back-end/sql/images/relationship1.png", caption: "Relacionamento entre as entidades \`Álbum\`, \`Artista\`, \`Estilo Musical\` e \`Canção\`", class: "text-center rounded mx-auto d-block", width: "600px", height: "auto"}) %>

O que você deve fazer quando estiver construindo seu próprio banco de dados é entender quantas vezes uma entidade pode se relacionar com uma outra, para, a partir disso, você poder criar esse primeiro diagrama, como o do exemplo acima, que mostra como as entidades estão relacionadas entre si.

**Montando um diagrama mais detalhado**

Para diagramas ER mais detalhados, deve-se incluir o nome das tabelas, suas chaves primárias e estrangeiras, suas colunas e seus relacionamentos.

**Curiosidade:** Por questão de convenções e [boas práticas](https://www.devmedia.com.br/padronizacao-de-nomenclatura-revista-sql-magazine-100/24710) {: .external-link target="_blank" rel="noreferrer noopener" } na criação de tabelas, não serão usados acentos ou espaços entre os nomes das tabelas.

**Lembre-se:** Existem várias maneiras de se modelar um banco de dados. Então, caso pense diferente do modelo abaixo, entenda que existem diversas formas de se resolver um mesmo problema.

<%= figure(%{src: "/back-end/sql/images/relationship2.png", caption: "Relacionamento detalhado entre as tabelas \`Artista\`, \`Album\`, \`EstiloMusical\` e \`Cancao\`", class: "text-center rounded mx-auto d-block", width: "800px", height: "auto"}) %>

**Relacionamentos presentes entre as tabelas acima:**

* Tabelas `Artista` e `Album`:

    As tabelas `Artista` e `Album` possuem um relacionamento de **um para muitos** (1..N), em que um artista pode possuir um ou mais álbuns.

    <%= figure(%{src: "/back-end/sql/images/relationship3.png", caption: "Tabelas \`Artista\` e \`Album\`", class: "text-center rounded mx-auto d-block", width: "600px", height: "auto"}) %>

* Tabelas `Album` e `Cancao`:

    A tabela `Album` possui um relacionamento de **um para muitos** com a tabela `Cancao`, uma vez que um álbum pode conter várias canções.

    <%= figure(%{src: "/back-end/sql/images/relationship4.png", caption: "Tabelas \`Album\` e \`Cancao\`", class: "text-center rounded mx-auto d-block", width: "600px", height: "auto"}) %>

* Tabelas `Album` e `EstiloMusical`:

    A tabela `EstiloMusical` também possui um relacionamento de **um para muitos** com a tabela `Album`, uma vez que um estilo musical pode estar contido em vários álbuns.

    <%= figure(%{src: "/back-end/sql/images/relationship5.png", caption: "Tabelas \`Album\` e \`EstiloMusical\`", class: "text-center rounded mx-auto d-block", width: "600px", height: "auto"}) %>

##### Ponto importante sobre diagramas ER

A ideia de um diagrama ER é prover uma representação gráfica para a estrutura de seu banco de dados, descrevendo suas entidades com seus atributos e como elas se relacionam. Essa visualização pode te ajudar tanto a criar e modelar seu banco de dados quanto a entender se sua modelagem precisa ser alterada ou se houve algum erro ao pensar na organização de suas entidades. Com esse diagrama você consegue pensar um pouco mais antes de começar a escrever as queries para criar as tabelas.

Hora de voltar ao **MySQL Workbench** e criar um banco de dados!

##### 3) Criando um banco de dados para conter suas tabelas

Agora que você já tem um diagrama que representa as tabelas que precisam ser criadas, já pode botar a mão no código.

Ao lidar com a criação e gerenciamento de um banco de dados, você encontrará os seguintes comandos:

```language-sql
-- Cria um banco de dados com o nome especificado.
CREATE DATABASE nome_do_banco_de_dados;

-- Sinônimo de CREATE DATABASE, também cria um banco de dados.
CREATE SCHEMA nome_do_banco_de_dados;

-- Verifica se o banco de dados ainda não existe.
-- Essa verificação é comumente utilizada junto ao CREATE DATABASE para evitar
-- a tentativa de criar um banco de dados duplicado, o que ocasionaria um erro.
IF NOT EXISTS nome_do_banco_de_dados;

-- Lista todos os bancos de dados existentes.
SHOW DATABASES;

-- Define o banco de dados escolhido como ativo.
USE nome_do_banco_de_dados;
```

Os comandos `CREATE DATABASE` ou `CREATE SCHEMA` fazem a mesma coisa, no entanto eles normalmente são utilizados em conjunto com o comando `IF NOT EXISTS`. Essa verificação é feita para evitar a tentativa de criar um banco de dados duplicado, o que ocasionaria um erro.

Considerando o problema que precisa ser resolvido, hora de nomear o banco de dados de `albuns`.

```language-sql
CREATE DATABASE IF NOT EXISTS albuns;
```

<%= figure(%{src: "/back-end/sql/images/createtable.png", caption: "Banco de dados \`albuns\` criado com sucesso", class: "text-center rounded mx-auto d-block", width: "600px", height: "auto"}) %>

##### Como definir um banco como ativo

Talvez você já tenha notado que, até agora, todas as queries têm sido prefixadas ou precedidas do nome do banco de dados, como, por exemplo:

```language-sql
SELECT * FROM sakila.actor;
```

No entanto, pode-se usar também o comando `USE nome_do_do_banco_de_dados`, que define um banco de dados como ativo. Com ele, é eliminada a necessidade de utilizar nome do banco de dados como prefixo nas queries. Veja o exemplo a seguir:

```language-sql
USE sakila;
SELECT * FROM actor;
```

Com o banco de dados `albuns` criado, resta apenas o quarto passo, pelo qual serão criadas as tabelas.

##### 4) Criando e modelando tabelas de acordo com um diagrama ER

O objetivo para essa seção é criar as seguintes tabelas:

<%= figure(%{src: "/back-end/sql/images/relationship2.png", caption: "Relacionamento detalhado entre tabelas \`Artista\`, \`Album\`, \`EstiloMusical\` e \`Cancao\`", class: "text-center rounded mx-auto d-block", width: "800px", height: "auto"}) %>

E para isso é necessário entender:

* **Quais são os principais tipos de dados no MySQL**

    Hora de assistir ao vídeo abaixo, para escolher melhor o tipo de dados durante a criação de uma tabela.

    <%= vimeo "392283629" %>

* **O que é uma primary e foreign key**

    No vídeo abaixo você vai entender, em menos de 8 minutos, o que são primary key e foreign key.

    <%= youtube_video "9iVNrhFldeo" %>

* **Como criar uma tabela no MySQL**

    Hora de aprender como criar tabelas enquanto são montadas as quatro tabelas do banco de dados `albuns` neste vídeo.

    <%= vimeo "392281823" %>

##### Resumão

Hoje você teve a oportunidade de vivenciar as seguintes etapas, necessárias para dar vida a um banco de dados:

* Como modelar um banco de dados do zero;

* Identificar entidades, atributos e relacionamentos;

* Construir um diagrama entidade-relacionamento;

* Criar um banco de dados;

* Criar e modelar tabelas com base em um diagrama ER.

##### Hora de mexer os dedos

Após ter visto todo o processo de como sair de um problema e chegar até a criação de um banco de dados, é preciso um certo tempo para internalizar esse conteúdo. Com isso em mente, segue a proposta:

Com o intuito de te dar mais tempo para absorver o material de hoje, tente refazer o banco de dados `albuns`, caso já o tenha criado no decorrer da aula de hoje. Então, apague o banco de dados e recarregue a página para que as respostas sobre como criar o banco de dados e tabelas não estejam visíveis e expandidas.

Tente, com a ajuda do material de hoje, criar o diagrama e o banco novamente por conta própria, sem olhar as respostas, que estão encapsuladas.

<%= figure(%{src: "/back-end/sql/images/datacreationchallenge.png", caption: "Blocos de respostas", class: "text-center rounded mx-auto d-block", width: "600px", height: "auto"}) %>

É crucial que você tente chegar às suas próprias conclusões após assistir a este conteúdo. Somente assim você terá uma chance melhor de absorver esse material.

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

Vamos bater um papo sobre SQL? Hora da aula ao vivo! Vamos para o Slack, onde o link estará disponível.

---

## Exercícios

###### Tempo sugerido para realização: 40 minutos

<%= versioning_your_code(@conn) %>

---

### Agora, a prática:

1. Caso não tenha feito ainda, refaça o banco de dados `albuns` por conta própria, como está descrito na seção "**Hora de mexer os dedos**".

2. Faça [este quiz](https://www.sanfoundry.com/sql-mcqs-mysql-datatypes-1/) {: .external-link target="_blank" rel="noreferrer noopener" } sobre tipos de dados no MySQL.

3. Faça [este quiz](https://www.sanfoundry.com/sql-mcqs-mysql-datatypes-2/) {: .external-link target="_blank" rel="noreferrer noopener" } sobre como escolher tipos de dados no MySQL.

4. Um zoológico precisa de um banco de dados para armazenar informações sobre os seus animais. As informações a serem armazenadas sobre cada animal são:

    * Nome;

    * Espécie;

    * Sexo;

    * Idade;

    * Localização.

    Cada animal também possui **um** cuidador, e cada cuidador pode ser responsável por mais de um animal. Além disso, cada cuidador possui **um** gerente, sendo que cada gerente pode ser responsável por mais de um cuidador.

    Siga os passos aprendidos no dia de hoje para modelar essa base de dados.

---

## Recursos adicionais (opcional)

* [Modelo ER e Diagrama ER](https://www.devmedia.com.br/modelo-entidade-relacionamento-mer-e-diagrama-entidade-relacionamento-der/14332) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Como modelar um banco de dados gratuitamente através do **draw.io**](https://drawio-app.com/entity-relationship-diagram-erd/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [SQL Data Types](https://www.w3schools.com/sql/sql_datatypes.asp) {: .external-link target="_blank" rel="noreferrer noopener" }

* [MySQL Data Types](https://www.mysqltutorial.org/mysql-data-types.aspx) {: .external-link target="_blank" rel="noreferrer noopener" }

* [MySQL Schema Best Practices](https://www.percona.com/live/17/sites/default/files/slides/michael-benshoof-schema%20best-practices.pdf) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
