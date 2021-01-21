## O que vamos aprender?

Você está vendo cada vez mais, que um grande desafio no desenvolvimento de software é **organizar o seu projeto**. O objetivo, como sempre, é deixá-lo **fácil de se entender, manter e expandir**. Em arquiteturas como a MSC, estudamos formas de se organizar o código de um projeto para que ele fique estruturado e cumpra esse objetivo. Como tudo no desenvolvimento, no entanto, há diversas formas de se resolver um problema, e umas são mais adequadas para alguns contextos e outras para outros.

Hoje estudaremos o **Domain Driven Design**, Design Orientado a Domínio, uma forma de organizar um projeto especialmente adequada para software que precisa de lidar com regras de negócio vastas, complexas e em constante mudança!

---

### Você será capaz de:

- Desenvolver sua arquitetura de software em domínios - adequada para implementação de regras e processos de negócios mais complexos.

---

## Por que isso é importante?

Muito do que estamos fazendo neste bloco é **colocar ferramentas no seu portfólio**! Desenvolver software de qualidade e fácil de se entender, manter e expandir é uma área de estudo enorme e em constante mudança. Cada forma de estruturar seu software, ou seja, de estruturar o seu raciocínio, a sua abstração de determinado problema, tem vantagens e desvantagens. Podemos encontrar diversos tipos de **arquiteturas de software** ao longo da carreira, e ter conhecimento sobre elas pode nos ajudar muito, além de nos ajudar a tomar nossas próprias decisões arquiteturais no futuro.

Esta aula vai colocar no seu portfólio uma importante forma de se estruturar um software: o Design Orientado a Domínio, uma abordagem voltada para descrever com precisão e flexibilidade o seu negócio na forma como seu software se organiza. Se seu negócio tem regras complexas, multifacetadas, com muitas entidades, e em constante mudança, essa arquitetura permite que seu software reflita essas regras e essas mudanças sem comprometer sua estabilidade ou exigir retrabalho de partes sensíveis a mudanças, como a estrutura do banco de dados.

---

## Conteúdos

###### Tempo sugerido para realização: 60 minutos

### O que é DDD?

Essa metodologia de desenvolvimento de software foi criada por Erick Evans em 2003, inicialmente para ajudar no desenvolvimento de aplicações complexas onde o time de tecnologia teria grande contato e interface com regras de negócio. Ela se baseia, principalmente, em **modelagem** de domínio. O tópico em si é bastante extenso, abrangendo uma gama gigantesca de temas. A intenção é que você absorva os pontos principais e consiga aplicar isso a qualquer software que estiver escrevendo.

Podemos considerar **domínio** como algo que seu negócio faz. Por exemplo, se sua empresa organiza eventos de música ao vivo, seu domínio principal é `organização de eventos musicais ao vivo`. Dentro do seu domínio principal, existem **subdomínios** que têm conexão com o principal. Por exemplo. dentro de organização de eventos você teria um subdomínio de `ingressos`. 💸 🎫

<%= figure(%{src: "https:\/\/res.cloudinary.com/drdpedroso/image/upload/c_scale,w_600/v1591318598/1_gPbUeWsOuBIadYF2ujX5Vg_lqr5dg.png", class: "rounded mxh-auto d-block text-center"}) %>

DDD é independente de linguagens, frameworks, bancos de dados e afins.

O primeiro passo para se fazer um bom projeto orientado a domínio é ter uma forma comum de descrever todos os seus domínios e entidades. Uma vez que é possível falar uma mesma coisa de várias maneiras diferentes, é preciso que se *convencione* quais serão suas entidades, seus serviços, enfim. Como _o programa descreverá o seu negócio_. Imagine que durante uma conversa alguém que usa o sistema diga: "Precisamos emitir uma cobrança para uma pessoa antes da data de vencimento". Possivelmente, teremos no nosso código algo parecido com:

- Uma **entidade** para representar um `Cliente`;

- Uma **entidade** para representar uma `Cobrança` com um `atributo` para representar a `Data de Vencimento`;

- Um **serviço** para que seja possível emitir essa cobrança.

Note que, do mesmo jeito que falamos das coisas, nós as descreveremos em código. Como o próprio nome diz, o DDD é um design orientado pelo domínio, ou seja, é uma abordagem de modelagem de software que segue uma série de boas práticas com o objetivo de facilitar a criação de projetos com regras complexas. Eric Evans escreveu um livro sobre como você pode fazer o design do seu software corresponder ao seu modelo mental do domínio do problema que você está abordando.

Não existe uma receita de bolo para implementar DDD, porém podemos listar algumas coisas que podem ajudar nesse processo:

– **Conhecer o negócio**: o time de desenvolvimento precisa necessariamente conhecer todos os responsáveis pelo negócio, ou seja, quem mais conhece suas regras e processos. Só assim será possível definir os domínios a serem trabalhados no software.

– **Conseguir a linguagem ubíqua**: a linguagém úbiqua é a linguagem comum que vai ser utilizada tanto pelo time de desenvolvimento quanto pelo time de negócio. Por esse motivo, após entendermos do négocio, precisamos escrever o código usando essa mesma linguagem.

– **Definir a modelagem**: tendo a linguagem extraída e o conhecimento do negócio adquirido, será muito mais fácil modelar os domínios do seu projeto.

– **Construir a arquitetura**: a programação orientada pelo domínio não exige uma arquitetura específica, portanto cabe ao time de desenvolvimento definir quais entidades, classes e etc. seu software terá, baseando-se sempre no problema a resolver.

Uma arquitetura que está sendo muito utilizada no mercado é a divisão em quatro camadas, representada abaixo:

<%= figure(%{class: "rounded mxh-auto d-block text-center", width: "800px", height: "auto", src: "/app/s/ddd/images/4camadas.png"}) %>

- **Interface de usuário**: responsável pela comunicação com o usuário, tanto pela exibição quanto pela interpretação de dados;

- **Aplicação**: responsável por conectar a camada de interface de usuário com a camada de domínio;

- **Domínio**: responsável por representar nossas entidades, regras e lógicas de negócio (coração do projeto);

- **Infraestrutura**: responsável por dar suporte às demais camadas, sendo aqui a responsabilidade de se conectar com o banco de dados, acesso ao disco ou coisas do tipo.

Um ponto importante neste ponto é a **separação das camadas**. Não é bom termos, por exemplo, uma camada extremamente voltada para as nossas regras de negócio, ou uma camada que tem código acoplado ao nosso banco de dados ou a aspectos mais técnicos da nossa solução que vão dividir nossa atenção e atrapalhar o nosso entendimento. **Cada camada só pode conter código do que lhe é pertinente**. Na camada de infraestrutura você coloca código que não está relacionado **diretamente** com as suas regras de negócio.

O código de uma camada só deve exigir entendimento acerca do que concerne àquela camada. Esse é o ponto fundamental. A lógica de uma camada deve estar *desacoplada* da lógica da outra.

### Devemos utilizar DDD sempre?

É preciso sempre avaliar a situação para decidir se vale a pena ou não iniciar um projeto orientado pelo domínio. Vamos exemplificar isso: imagine que você será responsável por decidir a arquitetura a ser usada e o negócio em questão é super simples, ou seja, será uma aplicação responsável por um CRUD de produtos. Você não terá muitas operações de negócio, não irão existir muitas regras e é muito provável que não existirá complexidade futura. Bom, já deu pra perceber que gastar tempo se guiando pelo domínio não seria interessante aqui.

Agora imagine que, além desse CRUD de produtos, teremos diversas outras regras e recursos a serem implementados e que muitos desses você nem conhece de fato ainda. É só um fato previsível que mais regras e circunstâncias virão. Imagine que o negócio irá evoluir com frequência e que diversas regras novas serão criadas. Nesse caso, ainda não se tem 100% de certeza de que seria necessário criar esse projeto orientado pelo domínio, porém já pode ser interessante trabalhar com o time de negócio para entender os domínios e entender se o projeto será complexo nesse sentido ou não. A chance de o DDD ser interessante aqui é bem maior.

### Camadas do DDD

Decidir por criar seu projeto orientado pelo domínio pode ser excelente, algo que ajudará você a entender melhor o negócio, tendo muito mais facilidade para conhecer todas as complexidades e regras. E, claro: não divida sua aplicação em camadas e chame de DDD. Aprofunde-se bastante no tema, se essa possibilidade estiver no seu radar, estude mais tanto na parte teórica quanto prática para tomar as melhores decisões. Agora que conhecemos um pouco do DDD, vamos nos aprofundar na camada de domínio, como mostrada acima, e também na camada de infraestrutura, as duas em que o diferencial do DDD se mostra de maneira mais evidente.

#### Camada de Domínio

Nesta camada você irá definir as entidades e regras que se relacionam diretamente com o seu domínio. Por exemplo, numa aplicação que contém usuários que possuem contas corrente, teríamos no mínimo a classe *User* e a classe *Account*. Esta é a camada mais isolada e importante do seu software, e será utilizada pela camada de aplicação para definir os casos de uso. Toda a lógica e complexidade do software nessa camada deve se ater às regras de negócio. O restante deve ser abstraído e detalhado em outras camadas.

##### Entidades

Entidade é uma classe que traduz o mundo real, ou seja, se existe no négocio, existe no código. Por exemplo, se nossa cliente está falando de conta corrente, teremos uma entidade chamada `ContaCorrente`. São objetos de domínio que queremos identificar com exclusividade, como por exemplo usuárias, clientes, trabalhos, pedidos etc., que possuam métodos e comportamentos que permitem que elas sejam criadas, atualizadas, recuperadas, excluídas, ou o que quer que o negócio exija que aconteça.

Exemplo de uma entidade para representar uma conta corrente:

```language-javascript
class Account {
  constructor(number, balance) {
    this.number = number;
    this.balance = balance;
  }

  deposit(amount) {
    this.balance = this.balance + amount;
  }

  withdraw(amount) {
    this.balance = this.balance - amount;
  }
}

module.exports = Account;
```

O código de exemplo acima é **uma** das **diversas** maneiras que existem para representar uma entidade.

##### Serviços

Serviços são classes que possuem toda lógica de negócio que não pertence a nenhuma Entidade em específico. Serviços não armazenam estado. Ou seja: toda chamada a um mesmo serviço, tendo a mesma pré-condição, irá retornar sempre o mesmo resultado. Ele executa algo conforme é pedido sempre da mesma forma, não controla o contexto do software. Ele é meramente um executor. Uma classe de serviço deve controlar as regras do domínio quando não é trivial ou lógico declarar diretamente no modelo de domínio.

Imagine que precisamos implementar uma função de transferir dinheiro entre contas. Essa operação não pertence a uma conta em específico, ou seja, não pertence a uma entidade `ContaCorrente`, pois envolve mais de uma conta corrente. Para resolver esse problema, utilizamos um serviço parecido com o abaixo:

```language-javascript
export default class AccountService {
  transfer(fromAccount, toAccount, amount) {
    if (fromAccount.balance < amount) {
      return false;
    } else {
      fromAccount.withdraw(amount);
      toAccount.deposit(amount);
      return true;
    }
  }
}
```

### Camada de Infraestrutura

Como dito anteriormente, essa camada tem como objetivo dar suporte às demais camadas do projeto. É aqui que será configurado o acesso ao banco de dados, acesso a APIs externas, serviços de mensageria, logs e por aí vai. Tudo que é estritamente técnico e não relacionado diretamente com regras de negócio vai aqui. É nessa camada que iremos determinar a conexão com banco de dados e a definição das nossas tabelas, removendo essa responsabilidade do arquivo de configuração que estávamos utilizando previamente.

Além da configuração do nosso banco de dados nessa camanda, é extremamente comum vermos no mercado a utilização, aqui, do padrão de projeto `Repository`. Por esse motivo, vamos entender como funciona e para que serve, pois irá ajudar muito no nosso desenvolvimento. A estrutura de nossa camada de infraestrutura deveria ficar, inicialmente, assim:

```language-md
└── infrastructure
│   └── database
│   │   └── models
│   │       ├── example.js
│   │       └── index.js
│   └── repositories
│   │   └── exampleRepository.js
```

##### Repositórios

Repositórios são classes que encapsulam a lógica necessária para acessar fontes de dados. Aqui ficam centralizadas as funcionalidades comuns de acesso a dados, desacoplando a infraestrutura ou a tecnologia usada para acessar os bancos de dados da camada do modelo de domínio. Isso permite que você se concentre na lógica de persistência de dados e não nos detalhes técnicos do acesso a dados.

Usando uma arquitetura em camadas, podemos projetá-la de maneira que possamos tomar facilmente decisões de arquitetura para alternar entre um repositório em memória para teste, por exemplo, ou para uma implementação Postgres para hoje e, quem sabe, um MongoDB daqui a dois anos. Ou seja, vemos os seguintes benefícios:

- Permitir a troca de banco de dados sem afetar o sistema, ou seja, você pode trocar do PostgreSQL para o MySQL ou outro, sem precisar encostar no código de regras de negócio;

- Reduz duplicidade de código, já que estará tudo centralizado em único lugar;

- Permite realizar o mock do banco de dados sem estresse, facilitando a criação de testes unitários.

<%= figure(%{class: "rounded mxh-auto d-block text-center", width: "800px", height: "auto", src: "/app/s/ddd/images/with-repo-without.png", caption: "Sem repositório x Com repositório"}) %>

As implementações do repositório também devem retornar algo que permita ao domínio e às camadas de aplicação ter acesso ao banco, e é por isso que usamos mapeadores: os repositórios recebem dados do banco de dados e os convertem em objetos da camada de domínio. Um exemplo de um repositório utilizando Sequelize como ORM:

```language-javascript
const AccountMapper = require('./AccountMapper');

class AccountRepository {
  constructor({ AccountModel }) {
    this.AccountModel = AccountModel;
  }

  async getByNumber(number) {
    const account = await this.getByNumber(number);

    return AccountMapper.toEntity(account);
  }
}

module.exports = AccountRepository;
```

E, aqui, um exemplo da classe responsável por mapear dados do banco de dados para objetos de domínio:

```language-javascript
const Account = require('src/domain/account/Account');

const AccountMapper = {
  toEntity({ dataValues }) {
    const { number, balance } = dataValues;

    return new Account({ number, balance });
  },

  toDatabase(survivor) {
    const { number, balance } = survivor;

    return { number, balance };
  },
};

module.exports = AccountMapper;
```

Se fôssemos fazer uma aplicação de cadastro de usuário, a estrutura final das pastas ficaria assim:

```language-md
└── application
│   └── user
│   │   └── userController.js
└── domain
│   └── user.js
└── infrastructure
│   └── database
│   │   └── config
│   │   │   └── config.json
│   │   └── migrations
│   │   │   └── [timestamp]-create-user-table.js
│   │   └── models
│   │   │   ├── index.js
│   │   │   └── User.js
│   │   └── seeders
│   │   │   └── [timestamp]-create-first-user.js
│   └── user
│   │   ├── UserMapper.js
│   │   └── UserRepository.js
```

Percebam que todas as pastas que são geradas pelo `sequelize init` vão para dentro da pasta `infrastructure`, pois é lá que ocorrem as interações com o banco de dados! Por conta disso, precisamos de avisar ao `sequelize` que mudamos os arquivos/pastas de lugar, informando a nova locação dos mesmos. Para isso, cria-se um arquivo na raiz da aplicação chamado `.sequelizerc`. É nele que fazemos tal configuração. O arquivo ficaria da seguinte forma:

```language-javascript
let path = require('path');

module.exports = {
  config: path.resolve(__dirname, 'infrastructure', 'database', 'config', 'config.json'),
  'migrations-path': path.resolve(__dirname, 'infrastructure', 'database', 'migrations'),
  'models-path': path.resolve(__dirname, 'infrastructure', 'database', 'models'),
  'seeders-path': path.resolve(__dirname, 'infrastructure', 'database', 'seeders'),
};
```

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

Agora que já passamos pelos conceitos mais básicos, está na hora de arregaçar as mangas e colocar a mão na massa com a nossa aula ao vivo!

Bora pro slack, onde o link estará disponível. 😉

---

## Exercícios

###### Tempo sugerido para realização: 80 minutos

Hora de pôr a mão na massa!

<%= versioning_your_code(@conn) %>

### Instruções para realização dos exercícios

Nesse exercício, vamos aprimorar o projeto criado utilizando MVC como arquitetura. Você pode clonar o *starter* do projeto [aqui](https://github.com/betrybe/ddd-exercise-starter) {: .external-link target="_blank" rel="noreferrer noopener" }

Vamos evoluir um pouco nossa estrutura e adicionar algumas novas regras. Agora, quando criarmos uma pessoa usuária, devemos criar uma conta corrente para ela. Para resolver esse exercício, vamos utilizar o que aprendemos nessa aula, ou seja, vamos inserir uma camada de domínio e uma camada de apresentação no software. Vamos deixar nossa camada de apresentação contendo apenas a `controller`, ou seja, vamos deixá-la responsável apenas por devolver dados pro usuário.

#### Detalhes do projeto

Vamos realizar as seguintes alterações no projeto:

1. Criar as seguintes novas camadas:
    - Domain;
    - Infrastructure.

2. Criar as seguintes entidades dentro de `Domain`:
    - User;
    - Account.

3. Configurar banco de dados dentro da camada `infrastructure`;

4. Criar os seguintes repositórios e mappers:
    - UserRepository;
    - UserMapper;
    - AccountRepository;
    - AccountMapper.

5. Criar o seguinte serviço dentro da camada `Domain`:
    - UserService (responsável por criar usuário e conta corrente).

6. Remover camada `Model` e `Services`;

7. O controller `userController` deverá chamar diretamente o `userService` de dentro da camada `Domain`.

#### Bônus

1. Transforme seu controller numa API Restful;

2. Configure o ODM mongoose na camada `Infrastructure`.

---

**Dica**: desenhe suas camadas e o que deve ir em cada uma, e como uma se liga com a outra! Isso irá deixar o seu trabalho menos confuso. Posteriormente, faça um exercício mental: para novas funcionalidades e regras de negócio, que código iria para cada lugar? Imagine algo novo (por exemplo, algo para uma pessoa investir dinheiro) e pense em como isso ficaria estruturado!

## Recursos adicionais (opcional)

- [Desmistificando o DDD](https://www.lambda3.com.br/2017/10/desmistificando-o-ddd/) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Domain-Driven Design: Tackling Complexity in the Heart of Software](https://www.amazon.com.br/Domain-Driven-Design-Tackling-Complexity-Software/dp/0321125215) {: .external-link target="_blank" rel="noreferrer noopener" }

- [DDD uma abordagem prática](https://medium.com/@fabio.delgado2/domain-driven-design-75b15393067d) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Documentação moongose](https://mongoosejs.com/docs/guide.html) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Nodejs e MongoDB – Introdução ao Mongoose](http://nodebr.com/nodejs-e-mongodb-introducao-ao-mongoose/) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Domain-Driven Design: Tackling Complexity in the Heart of Software](https://www.amazon.com.br/Domain-Driven-Design-Tackling-Complexity-Software/dp/0321125215) {: .external-link target="_blank" rel="noreferrer noopener" }

- [ORM x ODM](https://medium.com/@julianam.tyler/what-is-the-difference-between-odm-and-orm-267bbb7778b0) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
