## O que vamos aprender?

Hoje você vai aprender os conceitos fundamentais sobre um **banco de dados** e sobre como o **SQL** é usado na criação de tabelas. Além disso, aprenderá a usar a ferramenta **MySQL Workbench** para praticar os comandos **SQL**.

---

### Você será capaz de:

- Entender o que são **bancos de dados**;
- Entender como a linguagem de consulta estruturada (**SQL**) é usada;
- Compreender como as *tabelas* se encaixam no conceito de *banco de dados*;
- Montar um ambiente de desenvolvimento local para praticar **SQL**;
- Entender como usar o **MySQL Workbench**.

---

## Por que isso é importante?

Atualmente, a análise de dados é indispensável para as empresas e pessoas em seu processo de tomada de decisão. Essa é uma das maneiras mais eficientes de gerar conhecimento, tanto utilizando dados passados quanto fazendo projeções futuras.

Feita uma análise inicial dos dados, seus resultados serão transformados em *informações* que, depois de estudadas, podem vir a gerar *conhecimentos* que, por sua vez, se tornam uma vantagem competitiva para as empresas, além de um norte para as decisões individuais das pessoas.

Uma das formas como nós, profissionais da tecnologia da informação, podemos contribuir para isso é gerando e disponibilizando os dados necessários através de tabelas e consultas criadas dentro de um **banco de dados** utilizando **SQL**.

<%= figure(%{src: "/back-end/sql/images/diagrama2.png", caption: "diagrama front x back", class: "text-center rounded mx-auto d-block", width: "100%", height: "auto"}) %>

Quando trabalhamos com backend e banco de dados, de maneira geral, o fluxo funciona assim:
O front faz a requisição para o back, o back faz a conexão e consulta o banco de dados. Então o banco retorna alguma informação para o back, e é aqui que a API (Application Programming Interface) trabalha, sendo responsável por processar essas informações, recebendo requisições, enviando respostas e, por sua vez, alimentando o front.


---

## Conteúdos:

###### Tempo sugerido para realização: 120 minutos

### O que é e quais são os tipos de bancos de dados

Vamos ter uma visão de águia de como é divido esse mundo:

<%= vimeo "391600001" %>

### O que é SQL?

**SQL** é a linguagem usada para criar, pesquisar, extrair e também manipular dados dentro de um *banco de dados relacional.* Para que isso seja possível, existem comandos como o SELECT, UPDATE, DELETE, INSERT e WHERE, entre outros, que você aprenderá ao longo do curso.

### Como essas informações (tabelas) são armazenadas?

Todas as pesquisas realizadas dentro de um banco de dados são feitas em tabelas.
Tabelas possuem linhas e colunas.
Linhas representam um exemplo, ou instância, daquilo que se deseja representar, ao passo que colunas descrevem algum aspecto da entidade representada.

Por exemplo, a imagem a seguir apresenta uma tabela com dados sobre pessoas. Cada linha na tabela representa uma pessoa específica. As colunas descrevem uma característica que queremos armazenar sobre as pessoas; nesse caso, são nome, sobrenome e email.

<%= figure(%{src: "/back-end/sql/images/columns.png", caption: "Ilustração de linhas e colunas em uma tabela", class: "text-center rounded mx-auto d-block", width: "588px", height: "auto"}) %>

### _Constraints_ (restrições), chaves primárias e chaves estrangeiras

Uma das grandes vantagens de armazenar seus dados em um banco de dados é que é possível criar regras e restrições (_constraints_, em inglês), que ditam exatamente como os dados podem ou não ser inseridos em suas tabelas. Vamos ver um resumo de como isso funciona:

<%= vimeo "486166954" %>

Então, depois de ter assistido ao conteúdo acima, vamos tentar chegar a algumas conclusões utilizando como exemplo a tabela a seguir:

<%= figure(%{src: "/back-end/sql/images/table1.png", caption: "Conteúdo da tabela address", class: "text-center rounded mx-auto d-block", width: "770px", height: "auto"}) %>

Sem ter acesso à estrutura interna de como essa tabela foi criada, tente responder ao seguinte:

1. Quais _constraints_ a coluna `address_id` poderia ter? Por quê?
2. A coluna `city_id` é um número. Consegue identificar que tipo de _constraint_ foi aplicado a ela?
3. A coluna `address` (endereço) possui uma _constraint_. Qual tipo de _constraint_ seria interessante ser aplicado a ela para que sempre exista um valor na coluna quando uma nova linha for criada?

Temos aqui uma outra tabela:

<%= figure(%{src: "/back-end/sql/images/table2.png", caption: "Conteúdo da tabela \`city\`", class: "text-center rounded mx-auto d-block", width: "479px", height: "auto"}) %>

1. Que tipo de _constraint_ a coluna `city_id` possui?
2. Qual é o motivo de a coluna `country_id` não possuir nomes de _country_ (país)? Ela é algum tipo de chave primária ou estrangeira?

Na tabela a seguir:

<%= figure(%{src: "/back-end/sql/images/table3.png", caption: "Conteúdo da tabela \`film\`", class: "text-center rounded mx-auto d-block", width: "349px", height: "auto"}) %>

1. Qual coluna possui uma ***primary key***?
2. Qual coluna possui uma ***foreign key***?

### Instalando MySQL Server

Agora vamos instalar as ferramentas que você usará neste curso: o **MySQL Server** e o **MySQL Workbench**.
#### Linux

**Observação:** Em função das diversas distribuições do Linux, é recomendado pesquisar as instruções de instalação específicas para sua distribuição.
Exemplo: "How to install MySQL Workbench on {Nome da sua distribuição}". Nosso curso dá preferência para utilização das últimas versões [**LTS** *(Long-term Support, Suporte de longo prazo)* do **Ubuntu**](https://wiki.ubuntu.com/Releases) {: .external-link target="_blank" rel="noreferrer noopener" } *(Assim como das variantes descritas no manual da pessoa estudante)* ainda suportadas. Verifique o suporte do seu S.O. [na pagina oficial](https://www.mysql.com/support/supportedplatforms/database.html) {: .external-link target="_blank" rel="noreferrer noopener" }.


1. Digite `sudo apt update` na linha de comando:

```language-shell
sudo apt update
```

2. Digite `sudo apt install mysql-server` e aperte enter, logo em seguida aceite a instalação digitando `y` e tecle enter.

```language-shell
sudo apt install mysql-server
```

#### macOS

**Observação:** Verifique se a sua versão do macOS é suportada [através desse link](https://www.mysql.com/support/supportedplatforms/database.html) {: .external-link target="_blank" rel="noreferrer noopener" }. Versões mais antigas do macOS podem implicar na instalação de versões mais antigas do mysql-server, onde o Homebrew pode não ser a solução ideal.

1. Utilizado o [Homebrew](https://brew.sh/index_pt-br) {: .external-link target="_blank" rel="noreferrer noopener" }, digite `brew install mysql` na linha de comando:

```language-shell
brew install mysql
```

### Verificando o status da instalação

Uma instância de um banco de dados é similar à instalação de um software (mais especificamente um serviço) que roda em segundo plano no seu computador. Existem serviços que rodam tanto localmente em sua máquina quanto em servidores remotos ao redor do mundo.

Com isso em mente, vamos ver agora como você pode verificar manualmente se o serviço do **MySQL** está rodando corretamente. Isso pode ser útil, caso tenha problemas ao se conectar à instância que acabou de instalar:

1. Abra o terminal e digite o seguinte comando (deve ser exibido o status de **active** no Linux / **started** no macOS)

```language-shell
# Linux
sudo systemctl status mysql
# macOS
brew services list
```
<%= figure(%{src: "/back-end/sql/images/mysqlinstallation11.gif", caption: "Instalação correta", class: "text-center rounded mx-auto d-block", width: "80%", height: "auto"}) %>

#### Visualmente no macOS
Através do menu **Preferências do Sistema**:
<%= figure(%{src: "/back-end/sql/images/mysqlinstallation13.gif", caption: "Exibir status do MySQL no macOS", class: "text-center rounded mx-auto d-block", width: "80%", height: "auto"}) %>

2. Caso o serviço esteja parado, você pode usar o comando a seguir para iniciá-lo:

```language-shell
# Linux
systemctl start mysql
# macOS
brew services run mysql
```

3. Para parar o serviço do **MySQL**, você pode usar o comando stop

```language-shell
# Linux
systemctl stop mysql
# macOS
brew services stop mysql
```

4. Para sair, aperte ctrl+c.

### Configurando a inicialização e senha do servidor MYSQL

Por padrão, após a instalação, seu servidor vai estar configurado para iniciar junto ao sistema. Caso não queira que isso aconteça, para poupar memória RAM, você pode desativar o início automático utilizando o comando:

```language-shell
# Linux
sudo systemctl disable mysql

# macOS
brew services stop mysql
# Esse comando remove os serviços não utilizados
brew services cleanup
```

A primeira vez que for utilizar após iniciar o computador, será necessário iniciar o servidor com o comando:

```language-shell
# Linux
sudo systemctl start mysql

# macOS
brew services run mysql
```

Se desejar ativar novamente que ele inicie junto ao computador, basta usar o comando:

```language-shell
# Linux
sudo systemctl enable mysql

# macOS
brew services start mysql
```

#### Definir uma senha para acesso ao banco de dados

**Tanto para segurança quanto pra utilização no workbench** (logo mais), será preciso entrar com a senha que você definir. Note que estamos falando aqui da **senha do seu servidor** mysql, e não da sua senha de super-usuário (root). Para isso, você rodará o seguinte comando:

```language-bash
 mysql -u root -p
```

Como não há senha definida ainda, nenhuma senha deve ser digitada. Continue dando 'Enter'.

Aqui, você está navegando pelo **MySQL monitor** que é a **interface padrão do mysql no terminal**. E a partir daqui, você já tem o mysql instalado no seu computador e consegue executar os comandos do curso nessa interface.

<%= figure(%{src: "/back-end/sql/images/mysqlinstallation9.png", caption: "MySQL Monitor", class: "text-center rounded mx-auto d-block", width: "80%", height: "auto"}) %>

Rode o comando, atentando para parte `'sua_senha_aqui'`, que deve ser alterada para senha que vc definir *(podendo também ser vazia `''`, assumindo um ambiente de testes e desenvolvimento)*:

```language-sql
 ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'sua_senha_aqui'; flush privileges;
 -- EX: ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '1234'; flush privileges;
```
<%= figure(%{src: "/back-end/sql/images/mysqlinstallation10.gif", caption: "Exemplo da execução do código", class: "text-center rounded mx-auto d-block", width: "80%", height: "auto"}) %>
### Desinstalando o MySQL Server

#### Linux

Caso sua instalação tenha retornado algum problema, siga os passos a seguir para desinstalar e tente realizar a instalação novamente.

**Preste muita atenção aos comandos.**

Primeiro remova todos os pacotes instalados:

```language-shell
sudo apt-get remove mysql-server mysql-client mysql-common
```

Agora remova os arquivos de dependências que não são mais necessários e, em seguida, remova as versões antigas dos arquivos de pacotes.

```language-shell
sudo apt-get autoremove
```

```language-shell
sudo apt-get autoclean
```

Na sequência, remova os arquivos do mysql que podem ter ficado para trás.

```language-shell
sudo rm -rf /var/lib/mysql
```

```language-shell
sudo rm -rf /etc/mysql
```

Se a desinstalação for concluída com sucesso, o comando `mysql --version` **não** deve retornar a versão do seu mysql.

#### macOS

Rode qualquer um dos comandos para remover o mysql:

```language-shell
brew uninstall mysql
# ou
brew remove mysql
```

### MySQL na linha de comando

Após seguir os passos anteriores, você poderá agora acessar seu servidor pela linha de comando. Para visualizar quais bancos de dados estão disponíveis, você deve usar o comando:

```language-shell
mysql -u root -p
```

É possível ver todos os bancos de dados que estão instalados atualmente digitando o seguinte comando (não se esqueça do ponto e vírgula):

```language-sql
SHOW DATABASES;
```

<%= figure(%{src: "/back-end/sql/images/mysqlinstallation12.gif", caption: "SHOW DATABASES;", class: "text-center rounded mx-auto d-block", width: "80%", height: "auto"}) %>

#### Comandos mais comuns

*Por convenção, utilizamos as palavras chave do SQL em caixa alta para diferenciar das indicações de tabelas e colunas.*

1. O comando `USE` serve pra definir a **referência do banco de dados utilizada nas queries**:

```language-sql
USE nome_do_banco_de_dados_que_quer_conectar;
-- EX: USE information_schema;
```
1.1 Uma outra forma de fazer referência ao banco, sem ter que rodar o `USE` é no formato `banco_de_dados.tabela`:

```language-sql
SELECT * FROM banco_de_dados.tabela;
-- EX: SELECT * FROM information_schema.statistics;
```

2. Para retornar todas as tabelas inicializadas no seu server:

```language-sql
SHOW TABLES;
```

3. Visualizar estrutura de uma tabela:

```language-sql
DESCRIBE nome_da_tabela;
-- EX: DESCRIBE statistics;
```

4. Criar um banco de dados:

```language-sql
CREATE DATABASE meu_banco_de_dados;
```

#### Vamos treinar!

Usando os comandos que você acabou de ver, resolva os seguintes desafios:

1. Entre no banco de dados `mysql`.
2. Visualize todas as tabelas desse banco.
3. Visualize a estrutura de pelo menos 10 tabelas diferentes e tente entender o tipo de estrutura que costuma ser utilizada.
4. Crie um novo banco de dados com o seu nome e depois entre nele!
5. Pronto!

Agora você pode executar comandos **SQL** dentro do seu banco de dados sem usar a interface gráfica, o que pode ser útil em alguns cenários em que você não tem acesso ao **MySQL Workbench**. Para executar comandos, lembre-se de finalizá-los com o `;` (ponto e vírgula).

### Instalando uma interface gráfica (MySQL Workbench)

Ainda que haja uma grande adesão de ferramentas não gráficas no mundo back-end, é possível "visualizar" as nossas queries com o auxílio de alguns softwares. Aqui, vamos fazer a instalação do **MySQL Workbench**, a interface gráfica mais utilizada para o **MySQL**.

#### Linux

**Observação:** Em função das diversas distribuições do Linux, é recomendado pesquisar as instruções de instalação específicas para sua distribuição.
Exemplo: "How to install MySQL Workbench on {Nome da sua distribuição}". Nosso curso dá preferência para utilização das últimas versões [**LTS** *(Long-term Support, Suporte de longo prazo)* do **Ubuntu**](https://wiki.ubuntu.com/Releases) {: .external-link target="_blank" rel="noreferrer noopener" } *(Assim como das variantes descritas no manual da pessoa estudante)* ainda suportadas. Verifique o suporte do seu S.O. [na pagina oficial](https://www.mysql.com/support/supportedplatforms/database.html) {: .external-link target="_blank" rel="noreferrer noopener" }.

1. Por exemplo, para fazer essa instalação no **Ubuntu 20.04 LTS**, basta ir até [este link](https://downloads.mysql.com/archives/workbench) {: .external-link target="_blank" rel="noreferrer noopener" } e selecionar a opção "Ubuntu Linux".
2. Em seguida, **selecionando a versão correspondente da distribuição**, no caso, a 20.04 e, na lista a seguir, clicar em "Download".

<%= figure(%{src: "/back-end/sql/images/mysqlinstallation8.gif", caption: "Opção de download para Ubuntu Linux", class: "text-center rounded mx-auto d-block", width: "80%", height: "auto"}) %>

*Caso em algum momento surja uma página pedindo por login, não é necessário criar uma conta. Procure pelo link "No thanks, just start my download" e faça o download.*

3. Navegue até a pasta onde foi feito o download, rode o comando a seguir e aceite a instalação:

```language-bash
sudo apt install ./nome-do-arquivo
#ex no Ubuntu 20.04: sudo apt install ./mysql-workbench-community_8.0.21-1ubuntu20.04_amd64.deb
```



#### macOS

O processo de instalação no macOS é bastante simples, acesse [este link](https://downloads.mysql.com/archives/workbench) {: .external-link target="_blank" rel="noreferrer noopener" } e selecione a versão correspondente:

<%= figure(%{src: "/back-end/sql/images/mysqlinstallation14.gif", caption: "Fluxo de download macOS", class: "text-center rounded mx-auto d-block", width: "80%", height: "auto"}) %>

*Caso em algum momento surja uma página pedindo por login, não é necessário criar uma conta. Procure pelo link "No thanks, just start my download" e faça o download.*

O fluxo de instalação no macOS segue conforme ilustrado:

<%= figure(%{src: "/back-end/sql/images/mysqlinstallation15.gif", caption: "Fluxo de instalação macOS", class: "text-center rounded mx-auto d-block", width: "80%", height: "auto"}) %>

#### Solução de problemas *(Ubuntu-based distros)*

É possível que algumas [**flavours**](https://ubuntu.com/download/flavours) {: .external-link target="_blank" rel="noreferrer noopener" }*("sabores", as variantes)* do Ubuntu não contenham o pacote `gnome-keyring` por padrão (como o caso do Kubuntu). Esse pacote é requerido pelo workbench nas distros baseadas em ubuntu para gerenciamento de senhas. Caso, nessas condições, seu workbench apresente problemas durante a configuração de usuário/senha, execute o comando `sudo apt install gnome-keyring`;

#### Inicialização do aplicativo

Pronto, agora abra o **MySQL Workbench** através do seu menu de aplicativos. Após abri-lo, você estará na tela inicial, na qual você deverá selecionar o servidor em que quer entrar.

*Em geral, o workbench identifica seu server instalado, retornando um "Local instance" referente a ele, no nosso caso aqui, por termos apenas um server instalado, ele retorna um "Local instance" na porta padrão 3306.*

Ao clicar na instância será pedida uma senha. Você deve digitar seu [**password do servidor, definido anteriormente**](http://localhost:1313/back-end/sql/introduction/#configurando-a-inicializa%C3%A7%C3%A3o-e-senha-do-servidor-mysql) {: .external-link target="_blank" rel="noreferrer noopener" }, marque a opção *Save password in keychain* pra não precisar repetir sua senha novamente a cada conexão.

<%= figure(%{src: "/back-end/sql/images/mysqlinstallation16.gif", caption: "Tela inicial do Workbench", class: "text-center rounded mx-auto d-block", width: "80%", height: "auto"}) %>
### Restaurando o banco de dados de prática `sakila`

Após fazer a instalação do **MySQL Workbench**, faça o download do arquivo de backup [aqui](/back-end/sakila.sql) {: .external-link target="_blank" rel="noreferrer noopener" }.

1. Agora abra o **MySQL Workbench**.

2. Vá até File->Open SQL Script.

    <%= figure(%{src: "/back-end/sql/images/workbench1.png", caption: "Instalação do Workbench - passo 1", class: "text-center rounded mx-auto d-block", width: "500px", height: "auto"}) %>

3. Navegue até o local em que você fez o download do arquivo e selecione-o.

    <%= figure(%{src: "/back-end/sql/images/workbench2.png", caption: "Instalação do Workbench - passo 2", class: "text-center rounded mx-auto d-block", width: "600px", height: "auto"}) %>

4. Execute o script **SQL** clicando no botão a seguir:

    <%= figure(%{src: "/back-end/sql/images/workbench3.png", caption: "Instalação do Workbench - passo 3", class: "text-center rounded mx-auto d-block", width: "700px", height: "auto"}) %>

5. Aguarde até a finalização. Possivelmente seu computador vai travar por alguns segundos. Depois disso, clique no botão a seguir para verificar se o banco foi restaurado corretamente:

    <%= figure(%{src: "/back-end/sql/images/workbench4.png", caption: "Instalação do Workbench - passo 4", class: "text-center rounded mx-auto d-block", width: "700px", height: "auto"}) %>

6. Caso você veja a seguinte estrutura, então tudo ocorreu corretamente:

<%= figure(%{src: "/back-end/sql/images/workbench5.png", caption: "Instalação do Workbench - passo 5", class: "text-center rounded mx-auto d-block", width: "600px", height: "auto"}) %>

### Utilizando as principais features do workbench (Crash course do workbench)

Entenda em menos de 5 minutos as principais funcionalidades que você deve saber para continuar o curso:

<%= vimeo "391603002" %>

### O que é uma entidade?

Quando se fala de entidades de um banco de dados, estamos normalmente falando de uma tabela que representa algum conceito do mundo real que você quer descrever (pessoa, eventos, acontecimentos) e suas propriedades (altura, horário do evento, nome do acontecimento). A entidade ***pessoa***, por exemplo, pode ter as propriedades de altura, peso e idade. Uma entidade ***festa*** pode possuir as propriedades horário do evento, público-alvo e data da festa. Por fim, uma entidade ***venda*** pode possuir as propriedades valor da venda, dia da venda, produto vendido etc.

Em alguns desses casos, as entidades são individuais e não se relacionam entre si, porém às vezes elas são ligadas umas com as outras através de relacionamentos. Vamos ver mais sobre isso a seguir.

### Como os dados são ligados?

Existem quatro tipos de relacionamento em um banco de dados.

##### Um para Um

Uma linha da Tabela **A** só deve possuir uma linha correspondente na tabela **B** ou vice-versa.

<%= figure(%{src: "/back-end/sql/images/relacionamentos1.2.png", caption: "Exemplo de relacionamento um para um", class: "text-center rounded mx-auto d-block", width: "600px", height: "auto"}) %>

Na imagem acima, um empregado só pode estar relacionado a um pagamento, e um pagamento deve estar relacionado a apenas um empregado.

Apesar de ser possível inserir essas informações em apenas uma tabela, esse tipo de relacionamento é usado normalmente quando se quer dividir as informações de uma tabela maior em tabelas menores por questões de performance, a fim de evitar tabelas com dezenas de colunas, ou por várias outras questões específicas de um negócio.

##### Um para Muitos ou Muitos para Um

Esse é um dos tipos mais comuns de relacionamento. Em cenários assim, uma linha na tabela **A** pode ter várias linhas correspondentes na tabela **B**, mas uma linha da tabela **B** só pode possuir uma linha correspondente na tabela **A**.

<%= figure(%{src: "/back-end/sql/images/relacionamentos2.png", caption: "Exemplo de relacionamento um para muitos ou muitos para um", class: "text-center rounded mx-auto d-block", width: "600px", height: "auto"}) %>

Na imagem acima, uma categoria pode estar ligada a vários livros; porém um livro deve possuir apenas uma categoria.

##### Muitos para Muitos

O tipo de relacionamento muitos para muitos acontece quando uma linha na tabela **A** pode possuir muitas linhas correspondentes na tabela **B** e vice-versa.

<%= figure(%{src: "/back-end/sql/images/relacionamentos3.jpg", caption: "Exemplo de relacionamento muitos para muitos", class: "text-center rounded mx-auto d-block", width: "600px", height: "auto"}) %>

O relacionamento muitos para muitos pode ser visto também como dois relacionamentos um para muitos ligados por uma tabela intermediária, como é o caso da tabela `filme_ator` do banco `sakila`. Podemos chamar essa tabela intermediária de tabela de junção. Ela é usada para guardar informações de como as tabelas se relacionam entre si.

Dessa maneira, quando queremos demostrar que um filme pode contar com vários atores, e também que os atores podem atuar em vários filmes, surge a necessidade de um relacionamento muitos para muitos.

Vamos ver alguns outros exemplos no vídeo abaixo:

<%= vimeo "391604002" %>

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

Vamos agora bater um papo sobre isso na nossa aula ao vivo.

O link estará disponível no Slack.

---

## Exercícios

###### Tempo sugerido para realização: 40 minutos

Agora vamos abrir o **Workbench** e fazer uma análise prática do banco de dados `sakila`, que já deve estar instalado, caso você tenha feito a instalação do **MySql Workbench** de forma padrão. Caso o banco `sakila` não esteja disponível, volte até a seção `Restaurando o banco de dados de prática sakila` e siga as instruções listadas. Com esse banco disponível na sua instalação do **Workbench**, sua missão agora é tentar finalizar os exercícios a seguir!

**Exercício 1**: Descubra como fazer uma pesquisa em qualquer tabela sem utilizar uma linha de código usando o **MySql Workbench**.

**Exercício 2**: Descubra como é possível criar uma tabela sem usar código **SQL** usando o **MySql Workbench**.

**Exercício 3**: Feito isso, crie uma tabela com as seguintes restrições:

Nome da tabela: `Filme`

Colunas:

* ***FilmeId*** - primary key, tipo int, incrementa por 1 cada vez que um valor é inserido automaticamente;
* ***Descricao*** - não permite nulos, tipo texto (varchar(100);
* ***AnoLancamento*** - não permite nulos, tipo int;
* ***Nota*** - permite nulos, tipo int;

**Exercício 4**: Analise a tabela `city` e encontre a tabela à qual a coluna `country_id` faz referência.

**Exercício 5**: Após resolver o exercício anterior, responda: qual tipo de relacionamento a tabela city faz com a tabela country?

**Exercício 6**: Qual tipo de relacionamento a tabela `country` faz com a tabela `city`?

**Exercício 7**: Abra tabela por tabela do banco `sakila` e encontre no mínimo 3 exemplos de um relacionamentos 1:N ou N:1.

---

## Recursos adicionais (opcional)

- [Diferença entre dados, informação e conhecimento](https://www.estrategiaconcursos.com.br/blog/dados-informacao-conhecimento-uma-apresentacao) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Importância dos bancos de dados na sociedade](https://tecnoblog.net/245120/banco-de-dados-importancia) {: .external-link target="_blank" rel="noreferrer noopener" }

- [O que é um banco de dados](https://www.homehost.com.br/blog/tutoriais/mysql/o-que-e-um-banco-de-dados) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Explicação e exercícios sobre tipos de chaves](https://www.blogson.com.br/chave-primaria-estrangeira-e-composta-no-mysql) {: .external-link target="_blank" rel="noreferrer noopener" }

- [SQL vs NoSQL, como são diferentes?](https://www.treinaweb.com.br/blog/sql-vs-nosql-qual-usar) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
