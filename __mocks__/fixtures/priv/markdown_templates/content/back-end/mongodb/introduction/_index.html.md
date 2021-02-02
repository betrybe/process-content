## O que vamos aprender?

Hoje você vai aprender o que é o **MongoDB**, como instalá-lo, conectar-se a ele e executar comandos de leitura/escrita. Também vai aprender sobre tipos de instalação, conceitos de databases, coleções, operadores e documentos.

---

### Você será capaz de:

* Instalar e conectar-se ao **MongoDB**

* Listar databases e coleções

* Executar operações de escrita (_inserts_) no banco de dados

* Utilizar o método `find()`;

* Utilizar o método `count()`;

* Utilizar filtros simples;

* Limitar a quantidade de documentos retornados;

* "Pular" documentos;

* Utilizar a projeção;

* Fazer uma paginação simples combinando o métodos `limit()` e o `skip()`.

---

## Por que isso é importante?

O modelo relacional é maduro, sólido e bastante difundido. Ele está presente há décadas, suportando milhões de aplicações de todo tipo, e é provável que jamais perca sua relevância. No entanto, como qualquer solução, ele possui suas limitações.

Essas limitações levaram ao desenvolvimento de outros modelos de bancos de dados que não necessariamente seguem à risca o modelo relacional. Existem vários tipos de bancos de dados NoSQL, e cada um, com seus prós e contras, é adequado a certos tipos de aplicações e problemas.

Nos últimos anos, o conhecimento de algum banco de dados NoSQL tem se tornado cada vez mais importante e requisitado pelo mercado. Neste bloco, você aprenderá sobre o MongoDB: o banco de dados NoSQL mais utilizado do mundo. E esse conhecimento tornará você uma pessoa capacitada a lidar com uma variedade ainda maior de problemas.

---

## Conteúdos

###### Tempo sugerido para realização: 120 minutos

**Atenção!** O **MongoDB Shell** será utilizado neste e nos demais blocos, então tenha certeza de que ele está instalado adequadamente.

### O MongoDB

Neste módulo, você utilizará como banco de dados **NoSQL** o **MongoDB**, que é o banco de dados NoSQL mais utilizado do mundo. O MongoDB está enquadrado na classe de banco de **Documentos**, descrita [na introdução deste módulo](/back-end/nosql).

O MongoDB começou a ser desenvolvido em 2007 e nasceu a partir de uma necessidade de três desenvolvedores de software que não encontraram nenhum banco de dados à época que suprisse os requisitos do seu projeto. Em 2009, esse projeto se tornou *Open Source* e continuou sua evolução até abrir capital em 2017 e se tornar a primeira empresa de banco de dados, depois de 40 anos, a entrar para a *NASDAQ*. Desde então, a MongoDB vem liderando o mercado de NoSQL, oferecendo um produto Open Source com várias *features* para o mercado corporativo, através de sua versão *Enterprise*.

O MongoDB vem evoluindo muito rapidamente desde sua criação, e hoje é o banco de dados NoSQL mais utilizado do mundo, ocupando também o quinto lugar no ranking geral de uso de bancos de dados. Veja o ranking [aqui](https://db-engines.com/en/ranking) {: .external-link target="_blank" rel="noreferrer noopener" }.

### Tipos de instalação

O **MongoDB** disponibiliza três tipos de instalação:

1. **Standalone**
    - Apenas indicada para ambientes de desenvolvimento.

2. **Replica Set**
    - Mínimo indicado para ambientes de produção. Nesse modelo, os dados são replicados em cada um dos servidores do **cluster** e temos apenas um ponto de escrita. Em alguns casos, podemos utilizar os demais servidores para escalar a leitura.

3. **Shard**
    - Esse é um modelo de instalação no qual podemos escalar a escrita de informações no banco. Os dados são divididos no cluster através de chaves de partição que chamamos de *shard key*. Essa chave pode ser composta por um ou mais atributos do documento, e sua escolha pode afetar a performance, eficiência e escalabilidade do banco. Escalar escritas significa dar mais capacidade para que o banco de dados processe mais dessas operações, aumentando assim a performance para essas operações.

---

### Instalação

###### Tempo sugerido para realização: 20 minutos

Agora você vai aprender a instalar uma instância local *standalone* do **MongoDB** e deixá-la pronta para utilização.

Veja como é simples a instalação no vídeo abaixo, depois siga o passo a passo para instalar em seu computador:

<%= vimeo "396940976" %>

### Escolhendo a distribuição

O **MongoDB** está disponível para os seguintes sistemas operacionais:

* Linux
* Windows
* MacOS

Você utilizará a versão 4.2 *Community Edition* para Linux, mais especificamente para a distribuição **Ubuntu 18.04 LTS**. Ela também funciona para o sistema Elementary normalmente. Caso você esteja utilizando MacOS, siga as instruções [deste link](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/) {: .external-link target="_blank" rel="noreferrer noopener" }

### Instalando o MongoDB Community Edition

Seguindo os passos abaixo, você instalará o MongoDB utilizando o **apt** *package manager*.

#### 1. Importando a chave pública utilizada pelo gerenciamento de pacotes

Abra o terminal e utilize o comando abaixo para importar chave pública GPG do MongoDB.

```language-bash
wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -
```

Esse comando deve retornar um **OK**.

Porém, se você receber um erro indicando que **gnupg** não está instalado, faça como abaixo:

1. Instalar o **gnupg** e as bibliotecas necessárias através do comando:

```language-bash
sudo apt-get install gnupg
```

2. Após a instalação, tente importar a chave outra vez:

```language-bash
wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -
```

#### 2. Crie o arquivo de lista (*list file*) para o MongoDB

Crie o arquivo **/etc/apt/sources.list.d/mongodb-org-4.2.list** para o Ubuntu 18.04 (Bionic):

```language-bash
echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list
```

#### 3. Recarregue o banco de dados local de pacotes

```language-bash
sudo apt-get update
```

#### 4. Instale os pacotes do MongoDB

Você pode instalar a última versão estável do MongoDB ou uma versão específica.

Para instalar a última versão estável, utilize o comando abaixo:

```language-bash
sudo apt-get install -y mongodb-org
```

Pronto! Agora você já tem a última versão estável do **MongoDB** instalada e pronta para ser executada, mas antes vamos dar uma olhada nos pacotes que foram instalados.

### Os pacotes instalados

Você deve ter notado que, durante a instalação, alguns pacotes adicionais foram instalados:

1. **mongodb-org-server**: esse pacote contém o que podemos chamar de "servidor" do MongoDB. Contém todos os recursos necessários para que uma instância do banco seja executada;

2. **mongodb-org-shell**: o *shell* é onde você se conecta com o MongoDB, através do terminal. É uma interface que suporta **JavaScript** e é super completa para administração de instâncias e clusters;

3. **mongodb-org-mongos**: pronuncia-se "Mongo S" e só se faz necessário em ambientes *Shard*. Não entraremos em detalhes sobre ele agora;

4. **mongodb-org-tools**: esse pacote contém algumas ferramentas nativas do MongoDB. Por exemplo:

    * **mongodump**: ferramenta para extrair dados no formato **BSON** (falaremos deles mais adiante). Em alguns ambientes, pode fazer parte da estratégia de backup

    * **mongorestore**: ferramenta para restaurar backups gerados pelo *mongodump*

    * **mongoimport**: ferramenta para importar arquivos **JSON**, **CSV** ou **TSV** para uma instância do MongoDB

    * **mongoexport**: exporta dados de uma instância do MongoDB para arquivos **JSON** ou **CSV**

### Executando o MongoDB Community Edition

#### Considerações sobre o *ulimit*

Alguns sistemas operacionais baseados em *UNIX* limitam os recursos de sistema que uma sessão pode utilizar. Esses limites têm grande impacto negativo para a operação do MongoDB, e em ambientes de produção devem ser observados com muita atenção. Veja a seção [UNIX ulimit Settings](https://docs.mongodb.com/manual/reference/ulimit/) {: .external-link target="_blank" rel="noreferrer noopener" } da documentação do MongoDB para maiores informações.

#### Diretórios de trabalho

Se você instalou o MongoDB via `apt` (gerenciador de pacotes), então algumas configurações são executadas e mantidas em diretórios do sistema operacional. Por *default*, no Linux, os dados ficarão armazenados em `/var/lib/mongodb`, e o log de funcionamento, em `/var/log/mongodb`. No MacOS, os dados e os logs ficam em `/usr/local/var/mongodb` e `/usr/local/var/log/mongodb`, respectivamente.

Por padrão, o MongoDB roda utilizando a conta de usuário `mongodb`, que também foi criada durante a instalação. Se você quiser rodar uma instância com outro usuário, deverá dar as permissões para ele nos diretórios de dados e log.

#### Arquivo de configuração

O pacote oficial inclui um [arquivo de configuração](https://docs.mongodb.com/manual/reference/configuration-options/#conf-file) {: .external-link target="_blank" rel="noreferrer noopener" } (`/etc/mongod.conf`). Essas configurações (como especificação dos caminhos dos diretórios de dados e log) têm efeito após o *startup* da instância. Logo, se você fizer qualquer modificação nesse arquivo com a instância do MongoDB rodando, deverá reiniciá-la para que tenha efeito.

### Mãos à obra, vamos executar!

##### 1. Iniciando o MongoDB

No Linux:

```language-bash
sudo service mongod start
```

No MacOS:

```language-bash
brew services start mongodb-community
```

##### 2. Verifique se o MongoDB foi iniciado com sucesso

No Linux:

```language-bash
sudo service mongod status
```

No MacOS:

```language-bash
brew services list | grep mongodb-community
```

Você também pode checar o arquivo de log que, por default, é localizado em `/var/log/mongodb/mongod.log`, no Linux, ou em `/usr/local/var/log/mongodb`, no Mac. Você pode verificar se a instância está rodando e pronta para conexões através da linha abaixo:

**[initanlisten] waiting for connections on port 27017**

##### Parando a instância

No Linux:

```language-bash
sudo service mongod stop
```

No MacOS:

```language-bash
brew services stop mongodb-community
```

##### Reiniciando a instância

No Linux:

```language-bash
sudo service mongod restart
```

No MacOS:

```language-bash
brew services restart mongodb-community
```

#### Configurando a inicialização do servidor MONGODB

Por padrão, após a instalação, seu servidor vai estar configurado para **não** iniciar junto ao sistema. Caso queira ativar o início automático quando ligar o computador, utilize o comando:

```language-PowerShell
sudo systemctl enable mongod.service
```

Caso não queira mais que isso aconteça para poupar memória RAM, você pode desativar o início automático utilizando o comando:

```language-PowerShell
sudo systemctl disable mongod.service
```

Na primeira vez que for utilizar após iniciar o computador, será necessário iniciar o servidor com o comando:

```language-PowerShell
sudo service mongod start
```

### Desinstalando o MONGODB

Caso sua instalação tenha retornado algum problema, siga os passos abaixo para desinstalar e tente realizar a instalação novamente.

**Preste muita atenção aos comandos.**
Pare sua instância do mongodb:

```language-PowerShell
sudo service mongod stop
```

Primeiro remova todos os pacotes instalados:

```language-PowerShell
sudo apt-get purge mongodb-org*
```

Agora remova os arquivos de dependências que não são mais necessários, e em seguida, remova as versões antigas dos arquivos de pacotes.

```language-PowerShell
sudo apt-get autoremove
```

```language-PowerShell
sudo apt-get autoclean
```

Após, remova os arquivos do mongodb que podem ter ficado para trás.

```language-PowerShell
sudo rm -rf /var/log/mongodb
```

```language-PowerShell
sudo rm -rf /var/lib/mongodb
```

Se a desinstalação for concluída com sucesso, o comando `mongod --version` **não** deve retornar a versão do seu mongodb.

#### Informação importante

Por *default*, o MongoDB só permite conexões locais, ou seja, apenas de *clients* que estejam rodando na mesma máquina onde a instância estiver sendo executada. Para alterar essa configuração e permitir conexões remotas, veja [IP Binding](https://docs.mongodb.com/manual/core/security-mongodb-configuration/) {: .external-link target="_blank" rel="noreferrer noopener" }.


### Conectando

Você vai aprender como se conectar ao **MongoDB** através do *Shell*.

#### Conectando-se ao Mongo via Shell

Veja no vídeo como você pode se conectar ao **MongoDB Shell**:

<%= vimeo "396938195" %>

Como você viu durante a instalação, um dos componentes do pacote do MongoDB é o **MongoDB Shell**. Esse componente é uma interface de linha de comando que lhe permite conectar-se a e administrar uma instância do MongoDB.

Para acessar o **MongoDB Shell** é muito simples. Com a instância rodando, basta executar o comando abaixo:

```language-bash
mongo
```

Assim você já estará dentro da instância, que por *default* está rodando na porta 27017 (a porta padrão para instâncias MongoDB). Se você quiser acessar uma instância em outra porta, basta passar o parâmetro *port*:

```language-bash
mongo --port 19000
```

O retorno deve ser algo parecido com:

```language-bash
MongoDB shell version v4.2.2
connecting to: mongodb://127.0.0.1:19000/?compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("f0c79e43-ead0-42d9-bd7d-c8d6857e7221") }
MongoDB server version: 4.2.2
>
```

Você tem duas informações importantes:

* na primeira linha, é exibida a versão do **MongoDB Shell**. Nesse caso, é v4.2.2
* na penúltima linha, é exibida a versão do **MongoDB Server**, que também é a mesma: v4.2.2

A partir de agora, tudo o que você digitar será dentro da instância MongoDB. Veremos alguns comandos ao longo do bloco.

Para sair da instância e voltar ao terminal da sua máquina, basta digitar:

```language-bash
exit
```

Veja mais parâmetros permitidos no **MongoDB Shell** [aqui](https://docs.mongodb.com/manual/reference/mongo-shell/) {: .external-link target="_blank" rel="noreferrer noopener" }.

Existem outras interfaces visuais para o **MongoDB** como o [**Compass**](https://www.mongodb.com/try/download/compass) {: .external-link target="_blank" rel="noreferrer noopener" }, porém o **MongoDB Shell** ja contempla tudo que será utilizado durante o curso, tornando o **Compass** totalmente opcional.

---

### Databases, Coleções e Documentos

O **MongoDB** armazena [documentos BSON](https://docs.mongodb.com/manual/core/document/#bson-document-format) {: .external-link target="_blank" rel="noreferrer noopener" } dentro de coleções e coleções dentro de *databases*.

<%= figure(%{src: "/back-end/mongodb/introduction/collection.png", class: "rounded mx-auto d-block", width: "600px", height: "auto", alt: "Coleções"}) %>

#### Databases

Assim como nos bancos de dados relacionais, dentro de uma mesma instância do banco você pode ter um ou vários databases. Uma grande diferença no **MongoDB** é que não temos a formalidade de criar um database antes de fazer uma operação nele, como por exemplo um `insert`. O MongoDB cuida disso para você, criando o database, a coleção e por fim o documento a partir do primeiro insert.

Uma vez conectado a uma instância MongoDB através do **MongoDB Shell**, você só precisa especificar o contexto em que essa escrita acontecerá. Nesse caso, o contexto é o nome do banco de dados que você quer criar:

```language-js
use meuBanco
db.minhaColecao1.insertOne( { x: 1 })
```

Feito! A função insertOne() cria tanto o banco de dados `meuBanco` como a coleção `minhaColecao1`, se eles não existirem. Uma dica para nomear bancos e coleções é seguir [este guia.](https://docs.mongodb.com/manual/reference/limits/#restrictions-on-db-names) {: .external-link target="_blank" rel="noreferrer noopener" }

#### Coleções

Os **documentos** no MongoDB são armazenados dentro das **coleções**. Fazendo um paralelo com os bancos de dados relacionais, uma coleção é equivalente a uma **tabela**.

##### Criando uma coleção

Como você viu, se uma coleção não existe, o MongoDB cria essa coleção no momento do primeiro *insert*.

```language-js
db.minhaColecao2.insertOne({ x: 1 })
db.minhaColecao3.createIndex({ y: 1 })
```

Veja que tanto as operações insertOne() e createIndex() criam a coleção (se ela não existir).

##### Criação Explícita

Você também pode utilizar o método [db.createCollection()](https://docs.mongodb.com/manual/reference/method/db.createCollection/#db.createCollection) {: .external-link target="_blank" rel="noreferrer noopener" } para criar uma coleção e especificar uma série de parâmetros, como o **tamanho máximo do documento** ou as **regras de validação para os documentos**. Se você não quiser especificar algum desses parâmetros, o uso do método para criação não é necessário. O exemplo abaixo cria uma coleção, especificando sua [Collation.](https://docs.mongodb.com/manual/reference/collation/#collation-document-fields) {: .external-link target="_blank" rel="noreferrer noopener" }

```language-js
db.createCollection( "minhaColecao4", { collation: { locale: "fr" } } );
```

Você pode fazer modificações nos parâmetros de uma coleção através do [collMod](https://docs.mongodb.com/manual/reference/command/collMod/#dbcmd.collMod) {: .external-link target="_blank" rel="noreferrer noopener" }.

#### Documentos

Os **documentos** são equivalentes aos registros ou linhas de uma tabela nos bancos de dados relacionais. Cada atributo (campo) é equivalente a uma coluna de uma linha da tabela. Sua diferença é que **documentos** podem conter estruturas mais ricas e armazenar muito mais informações do que você consegue em uma "linha simples" de uma tabela relacional. Abaixo temos uma representação de um registro numa tabela e também o seu correspondente em um **documento**:

<%= figure(%{src: "/back-end/mongodb/introduction/table.png", class: "rounded mx-auto d-block", width: "600px", height: "auto", alt: "Tabela"}) %>

```language-json
{
    "_id": 1,
    "nome": "Jose",
    "endereco": {
        "logradouro": "Rua 1",
        "cidade": "São Paulo",
        "uf": "SP"
    }
},
{
    "_id": 2,
    "nome": "Maria",
    "endereco": {
        "logradouro": "Rua 2",
        "cidade": "Belo Horizonte",
        "uf": "MG"
    }
}
```

Como você viu acima, um *insert* recebe como parâmetro um **JSON**. Esse parâmetro define os dados e a estrutura do documento. É importante ressaltar que, por ser *schemaless*, ou seja, sem esquema por *default*, a estrutura não faz parte da coleção, e sim do **documento**. Com isso, você pode ter várias "estruturas" por coleção, e quando você fizer uma alteração, faça-a em nível de documento. Por exemplo, a criação, alteração ou remoção de um campo será válida para um conjunto de documentos, que serão especificados através do parâmetro de filtro da query (veremos isso mais à frente).

##### Validação de Documentos

Você pode aplicar uma validação para que cada operação de escrita em sua coleção respeite uma estrutura. Utilize o [Schema Validation](https://docs.mongodb.com/manual/core/schema-validation/) {: .external-link target="_blank" rel="noreferrer noopener" } para isso.

##### BSON Types

Por mais que o *insert* ocorra recebendo um documento **JSON**, internamente, o MongoDB armazena os dados em um formato chamado **BSON** ou **Binary JSON**. Esse formato é uma extensão do **JSON** e permite que você tenha mais tipos de dados armazenados no MongoDB, não somente os tipos permitidos pelo JSON.

---

### Insert

###### Tempo sugerido para realização: 20 minutos

Você vai fazer algumas inserções no **MongoDB** utilizando duas funções específicas e também com *schemas* diferentes e mais "ricos"!

Os métodos `insertOne` e `insertMany` têm suas particularidades e limitações. Enquanto um faz o insert de um único documento por vez, o outro pode inserir milhares em uma única operação! Portanto, saber quando e onde aplicar fará toda a diferença quando você estiver codificando!

Os documentos mais "ricos" são as representações de estruturas bem complexas que você pode armazenar em suas `collections`, deixando os seus dados mais complexos e com muitas informações, sem a necessidade de `joins` para acessá-los.

Você já viu como os dados são armazenados no **MongoDB**, viu o conceito de `databases`, `coleções` e `documentos`. Agora você vai aprender como efetivamente criar esses `databases`, suas `coleções` e seus `documentos`.

#### insertOne()

Veja este vídeo e entenda um pouco mais sobre o `insertOne`.

<%= vimeo "396939793" %>

Agora crie um documento na **coleção** `products`, no **database** `sample`, com os seguintes atributos e valores:

```language-json
{
    "productName": "Caixa",
    "price": 20
}
```

Agora assuma o controle do campo `_id`, passando um valor qualquer para ele e crie um novo documento com os mesmos atributos e valores do documento anterior.

#### insertMany()

Veja este vídeo sobre o `insertMany`.

<%= vimeo "396939005" %>

Insira mais três documentos na coleção `products` em uma única operação:

```language-json
[
    { "productName": "Lapis", "stock": 10, "price": 20,"status":"A"},
    { "productName": "Tesoura", "price": 5, "status": "B" },
    { "productName": "Borracha", "price": 15, "status": "A" }
]
```

### db.collection.find()

###### Tempo sugerido para realização: 40 minutos

Após inserir documentos em seu banco de dados, você com certeza vai querer recuperá-los! Assim como nos bancos de dados relacionais, no **MongoDB** temos um método específico para essa operação: o `find()`.

### Parâmetros do find()

#### db.collection.find(query, projection)

O método `find()` serve para selecionar os documentos de uma *coleção* ou de uma *view* e retorna um *cursor* com esses documentos.

Esse método recebe dois parâmetros:

* `query`:
    - Tipo: Documento;
    - Descrição: Opcional. Especifica os filtros da seleção usando os *query operators*. Para retornar todos os documentos da coleção, é só omitir esse parâmetro ou passar um documento vazio ({}).
* `projection`:
    - Tipo: Documento;
    - Descrição: Opcional. Especifica quais campos serão retornados nos documentos selecionados pela *query*. Para retornar todos os campos desses documentos, é só omitir esse parâmetro.

Esse método retorna um **cursor** para os documentos que correspondem aos critérios de consulta.

### Projeção (projection)

O parâmetro **projection** determina quais campos serão retornados dos documentos que atendam aos critérios de filtro. O formato recebido por ele é algo como:

```language-js
{ "campo1": <valor>, "campo2": <valor> ... }
```

O `<valor>` pode ser um dos seguintes:

* **1** ou **true** para incluir um campo nos documentos retornados;

* **0** ou **false** para excluir um campo;

* Uma expressão usando [Projection Operators](https://docs.mongodb.com/manual/reference/operator/projection/) {: .external-link target="_blank" rel="noreferrer noopener" }.

Você pode escolher exibir no resultado da query apenas certos campos, sem a necessidade de exibir sempre todos os campos dos documentos.

A **projeção** é sempre o segundo parâmetro do método `find()`.

Veja só este exemplo:

```language-js
db.movies.insertOne(
    {
        "title" : "Forrest Gump",
        "category" : [ "drama", "romance" ],
        "imdb_rating" : 8.8,
        "filming_locations" : [
            { "city" : "Savannah", "state" : "GA", "country" : "USA" },
            { "city" : "Monument Valley", "state" : "UT", "country" : "USA" },
            { "city" : "Los Anegeles", "state" : "CA", "country" : "USA" }
        ],
        "box_office" : {
            "gross" : 557, "opening_weekend" : 24, "budget" : 55
        }
    }
)
```

A operação acima insere um documento na coleção `movies` com vários campos. Com a operação abaixo, selecionamos esse documento na coleção `movies`, passando como parâmetro de **projeção** apenas os campos `title` e `imdb_rating`:

```language-js
db.movies.findOne(
    { "title" : "Forrest Gump" },
    { "title" : 1, "imdb_rating" : 1 }
)
```

Como resultado, teremos o seguinte:

```language-js
{
    "_id" : ObjectId("5515942d31117f52a5122353"),
    "title" : "Forrest Gump",
    "imdb_rating" : 8.8
}
```

Note que o campo `_id` também foi retornado. Isso acontece porque ele é o único campo que você não precisa especificar para que seja retornado. Se você não quiser vê-lo no retorno, é só suprimi-lo da seguinte forma:

```language-js
db.movies.findOne(
    { "title" : "Forrest Gump" },
    { "title" : 1, "imdb_rating" : 1, "_id": 0 }
)
```

### Gerenciamento do cursor

Ao executar o método `db.collection.find()`, o mongo itera automaticamente o cursor para exibir os 20 primeiros documentos. Digite `it` para continuar a iteração. Assim, mais 20 documentos serão exibidos até o final do cursor.

Um método bastante interessante que é utilizado num `cursor` é o `count()`. O método `count()` retorna o número de documentos de uma coleção, e também pode receber um critério de seleção para retornar apenas o número de documentos que atendam a esse critério.

Você pode retornar o número de documentos de uma coleção com a seguinte operação:

```language-js
db.movies.count()
```

Veremos adiante mais utilizações para o método `count()`.

### Tipos e comparações

O **MongoDB** trata alguns tipos de dados como equivalentes para fins de comparação. Por exemplo, tipos numéricos sofrem conversão antes da comparação. No entanto, para a maioria dos tipos de dados, os [operadores de comparação](https://docs.mongodb.com/manual/reference/operator/query-comparison/) {: .external-link target="_blank" rel="noreferrer noopener" } realizam comparações apenas em documentos em que o [tipo BSON](https://docs.mongodb.com/manual/reference/bson-type-comparison-order/#bson-types-comparison-order) {: .external-link target="_blank" rel="noreferrer noopener" } do campo destino do documento corresponde ao tipo do operando da query.

Para compreender melhor esse conceito, veja o exemplo abaixo, considerando a seguinte coleção:

```language-json
{ "_id": "apples", "qty": 5 }
{ "_id": "bananas", "qty": 7 }
{ "_id": "oranges", "qty": { "in stock": 8, "ordered": 12 } }
{ "_id": "avocados", "qty": "fourteen" }
```

A query abaixo usa o operador de comparação $gt( _greater than_, maior que, >) para retornar os documentos em que o valor do campo `qty` seja maior do que `4`:

```language-js
db.collection.find( { qty: { $gt: 4 } } )
```

A query trará como retorno os seguintes documentos:

```language-json
{ "_id": "apples", "qty": 5 }
{ "_id": "bananas", "qty": 7 }
```

O documento com o `_id` igual a `"avocados"` não foi retornado porque o valor do campo `qty` é do tipo **string**, enquanto o operador `$gt` é do tipo **integer**.

O documento com o `_id` igual a `"oranges"` também não foi retornado porque `qty` é do tipo **object**.

Nesses casos, vemos o *schemaless* funcionando na prática!

### Utilizando o find()

#### Exemplos

Para esses exemplos você vai utilizar os documentos de uma coleção chamada [bios](https://docs.mongodb.com/manual/reference/bios-example-collection/) {: .external-link target="_blank" rel="noreferrer noopener" }. Caso você queira executar os exemplos localmente, copie o *snippet* e execute no seu cliente para inserir essa coleção em sua instância local do **MongoDB**.

Os documentos dessa coleção de maneira geral têm esse formato:

```language-js
{
    "_id" : <value>,
    "name" : { "first" : <string>, "last" : <string> },       // documento embedado ou subdocumento
    "birth" : <ISODate>,
    "death" : <ISODate>,
    "contribs" : [ <string>, ... ],                           // Array de Strings
    "awards" : [
        { "award" : <string>, year: <number>, by: <string> }  // Array de subdocumentos
        ...
    ]
}
```

### Selecionando todos os documentos da coleção

O método `find()`, quando utilizado sem parâmetros, retorna todos os documentos da coleção juntamente com todos os seus campos. Por exemplo, a operação abaixo retorna todos os documentos da coleção [bios](https://docs.mongodb.com/manual/reference/bios-example-collection/) {: .external-link target="_blank" rel="noreferrer noopener" }:

```language-js
db.bios.find()
```

Essa operação corresponde à seguinte query **SQL**:

```language-sql
SELECT * FROM bios;
```

### Selecionando documentos com critérios de busca

#### Query por igualdade

A operação abaixo retorna os documentos da coleção bios em que o campo `_id` é igual a `5`:

```language-js
db.bios.find( { _id: 5 } )
```

Essa operação corresponde à seguinte declaração **SQL**:

```language-sql
SELECT * FROM bios WHERE _id = 5;
```

Agora, a operação abaixo retorna todos os documentos da coleção bios em que o campo `last` do subdocumento `name` é igual a `"Hopper"`:

```language-js
db.bios.find( { "name.last": "Hopper" } )
```

Note que, para acessar campos em subdocumentos, utilizamos [_dot notation_](https://docs.mongodb.com/manual/core/document/#document-dot-notation-embedded-fields) {: .external-link target="_blank" rel="noreferrer noopener" } (por exemplo, **"sub-documento.campo"**).

### Projetando somente os campos requeridos:

Através do segundo parâmetro do método `find()`, podemos especificar quais campos serão retornados. O exemplo abaixo retorna todos os documentos da coleção bios, trazendo apenas o campo `name` de cada documento, que é um subdocumento:

```language-js
db.bios.find({}, { name: 1 })
```

Essa operação corresponde à seguinte query **SQL**:

```language-sql
SELECT name FROM bios;
```

**Procure utilizar a projeção para diminuir a quantidade de campos retornados pelo cursor. Isso ajuda muito no que se refere ao tráfego desses dados na rede!**

### Limitando o número de documentos retornados

#### cursor.limit()

Você pode limitar o número de documentos retornados por uma query utilizando o método `limit()`. Esse método é semelhante à declaração `LIMIT` em um banco de dados **SQL**. Uma utilização comum do `limit()`
é para maximizar a performance e evitar que o **MongoDB** retorne mais resultados do que o necessário para o processamento.

O método `cursor.limit()` é utilizado da seguinte forma:

```language-js
db.collection.find(<query>).limit(<número>)
```

Note que você deve especificar um valor numérico para o `limit()`.

Um exemplo utilizando a coleção bios:

```language-js
db.bios.find().limit(5)
```

A operação acima retornará os **cinco** primeiros documentos da coleção bios.

Essa operação corresponde à seguinte query **SQL**:

```language-sql
SELECT * FROM bios LIMIT 5;
```

#### cursor.pretty()

Com o método `pretty()`, você pode deixar os resultados exibidos no `shell` um pouco mais legíveis. Esse método aplica uma indentação na exibição dos resultados no console, de forma que fica bem melhor de ler!

Exemplo de utilização do método `pretty()`, usando a coleção bios:

```language-js
db.bios.find().limit(5).pretty()
```

Utilize o método `pretty()` à vontade!

### "Pulando" documentos

#### cursor.skip(número)

Acione o método `cursor.skip()` para controlar a partir de que ponto o **MongoDB** começará a retornar os resultados. Essa abordagem pode ser bastante útil para realizar paginação dos resultados.

O método `cursor.skip()` precisa de um **parâmetro numérico** que determinará **quantos documentos** serão **"pulados"** antes de começar a retornar.

O exemplo abaixo na coleção bios pulará os dois primeiros documentos e retornará o cursor a partir daí:

```language-js
db.bios.find().skip(2)
```

Você pode combinar os métodos `cursor.limit()` e `cursor.skip()`:

```language-js
db.bios.find().limit(10).skip(5)
```

Essa operação corresponde à seguinte query **SQL**:

```language-sql
SELECT * FROM bios LIMIT 10 OFFSET 5;
```

---

## Vamos fazer juntos

###### Tempo sugerido para realização: 80 minutos

Vamos para o Slack, onde estará disponível o link da nossa aula ao vivo de hoje.

---

## Exercícios

###### Tempo sugerido para realização: 60 minutos

<%= versioning_your_code(@conn) %>

---

### Agora, a prática!

O MongoDb possui diversas ferramentas como, por exemplo, `mongo`, `mongosh`, `Compass` e outras ferramentas de terceiros.
Você pode utilizar o que achar melhor para executar as *queries*, o importante é realizá-las.

Utilizando a coleção `bios`, construa queries para retornar os seguintes itens:

**Exercício 1**: Retorne o documento com `_id` igual a 8.

**Exercício 2**: Retorne o documento com `_id` igual a 8, mas só exiba os campos: `_id` e  `name`.

**Exercício 3**: Retorne apenas os campos `name` e `birth` do documento com `_id` igual a 8.

**Exercício 4**: Retorne todos os documentos em que o campo `name.first` seja igual a **John**, utilizando o método `pretty()`.

**Exercício 5**: Retorne os 3 primeiros documentos da coleção `bios` utilizando o método `pretty()`.

**Exercício 6**: Retorne 2 documentos da coleção `bios` pulando os 5 primeiros documentos.

Utilizando o [`mongoimport`](https://docs.mongodb.com/manual/reference/program/mongoimport/) {: .external-link target="_blank" rel="noreferrer noopener" }, importe o arquivo [books.json](/back-end/mongodb/books.json) {: .external-link target="_blank" rel="noreferrer noopener" } para a sua instância local do MongoDB e utilize a coleção `books` para construir queries para as seguintes questões:

**Exercício 7**: Retorne a quantidade de documentos da coleção `books`.

**Exercício 8**: Conte quantos livros existem com o `status` `"PUBLISH"`.

**Exercício 9**: Exiba os campos `title`, `isbn` e `pageCount` dos 3 primeiros livros. NÃO retorne o campo `_id`.

**Exercício 10:** Pule 5 documentos e exiba os campos `_id`, `title`, `authors` e `status` do livros com `status` `"MEAP"`, limitando-se a 10 documentos.

---

## Recursos adicionais

* [Find](https://docs.mongodb.com/manual/reference/method/db.collection.find/index.html) {: .external-link target="_blank" rel="noreferrer noopener" }
* [Projection Operators](https://docs.mongodb.com/manual/reference/operator/projection/) {: .external-link target="_blank" rel="noreferrer noopener" }
* [operadores de comparação](https://docs.mongodb.com/manual/reference/operator/query-comparison/) {: .external-link target="_blank" rel="noreferrer noopener" }
* [BSON Types](https://docs.mongodb.com/manual/reference/bson-type-comparison-order/#bson-types-comparison-order) {: .external-link target="_blank" rel="noreferrer noopener" }
* [mongoimport](https://docs.mongodb.com/manual/reference/program/mongoimport/index.html) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
