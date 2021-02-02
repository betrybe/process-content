## O que vamos aprender

Hoje você vai aprender o que é _deploy_, seus principais conceitos, os serviços de deploy mais populares e como configurar e publicar seus projetos de maneira simples e rápida utilizando o `Heroku`.

---

### Você será capaz de

- Conhecer o que é um **deploy** e os principais serviços utilizados;

- Publicar aplicações através do `Heroku`;

- Visualizar logs das suas aplicações publicadas;

- Monitorar suas aplicações publicadas;

- Utilizar variáveis de ambiente dentro do `Heroku`.

---

## Por que isso é importante?

Além de saber desenvolver aplicações, é muito importante saber como publicá-las em um ambiente. Isso significa praticamente dar vida a elas. É essa etapa do desenvolvimento que permite que outras pessoas acessem e utilizem sua aplicação.

<%= figure(%{src: "https:\/\/media.giphy.com/media/3oEjI6hkw6nbYNQkz6/giphy.gif", class: "text-center rounded mx-auto d-block", width: "600px", height: "auto"}) %>

Por ser parte fundamental do fluxo de vida de uma aplicação, os conceitos de deploy, geralmente, são parte da rotina de uma pessoa desenvolvedora.

Além do mais, estamos passando por um forte movimento de aproximação entre as áreas de tecnologia. Uma dessas aproximações é entre desenvolvimento e operações, em que as pessoas da área de desenvolvimento participam ativamente dos processos relacionados a publicação, atualização e gerenciamento das aplicações.

Com a aproximação dessas duas áreas, foi criado o termo _DevOps_ para descrever o conjunto de práticas de ambas as áreas.

Você pode ler mais sobre DevOps [aqui.](https://azure.microsoft.com/pt-br/overview/what-is-devops/) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Conteúdo:

###### Tempo sugerido para realização: 120 minutos

### O que é deploy?

A palavra _deploy_ tem vários significados. No nosso caso, nós a utilizamos para representar o processo de publicar uma aplicação em um servidor, tornando-a disponível para ser acessada local ou externamente.

### Serviços em Nuvem

Para facilitar o processo de publicação, existem diversos serviços em nuvem que abstraem as complexidades de se administrar um servidor e suas diversas camadas (rede, disco, recursos etc.); como o nosso foco agora não é entrar nesses níveis, utilizaremos um desses serviços.

Exemplos de serviços em nuvem, populares:

- Heroku;

- Google GCE;

- Amazon AWS;

- Microsoft Azure;

- IBM Cloud.

**Nota:** Vale lembrar que cada serviço tem suas particularidades.

### Introdução ao Heroku

Para nosso primeiro _deploy_, vamos utilizar o `Heroku`. O Heroku é um _PaaS_ (Platform as a Service), o que significa que ele provém de uma plataforma em nuvem para configurarmos e realizarmos nosso _deploy_ de maneira simples e fácil.

O Heroku executa e gerencia aplicações escritas em `Node.js`, `Ruby`, `Java`, `Python`, `Clojure`, `Scala`, `Go` e `PHP`. Por ser uma plataforma "poliglota", ele vai se comportar de maneira similar, independente da linguagem.

Para o Heroku, uma aplicação é um conjunto de códigos escritos em uma dessas linguagens citadas anteriormente, provavelmente utilizando um _framework_, com algumas dependências e descrições que indicam como rodá-la.

Um termo importante para ter na ponta da língua é `build`. No contexto de _deploys_, o `build` é como chamamos todo o processo cujo código é preparado para posteriormente ser executado.

##### Como funciona?

Para fazer um _deploy_ com o `Heroku`, não é necessário realizar muitas alterações no projeto. O mais importante é o Heroku saber qual linguagem está sendo utilizada na sua aplicação e, caso esteja utilizando algum, qual o framework.

A partir dessas informações, o Heroku saberá, por exemplo, que é um projeto em `Node.js` e que, para executá-lo, ele terá que efetuar o comando descrito no campo `scripts.start` dentro do `package.json` (mais conhecido por `npm start`).

Ou seja, pelo seu código, o Heroku vai saber qual linguagem e framework você está utilizando na sua aplicação e, a partir daí, saberá como executá-la.

<%= figure(%{src: "https:\/\/media.giphy.com/media/12NUbkX6p4xOO4/giphy.gif", class: "text-center rounded mx-auto d-block", width: "450px", height: "auto"}) %>

Algumas linguagens não definem explicitamente o que deve ser feito para executar a aplicação. Pode acontecer, também, por algum motivo, de o Heroku não conseguir inferir como executar a aplicação. Para esses dois casos citados e outros, deve ser adicionado um **Procfile** à sua aplicação.

#### Procfile

O **Procfile** é um arquivo que especifica o comando que deve ser executado para _iniciar_ o projeto. Além disso, o arquivo também especifica algumas características da sua aplicação, como, por exemplo, se seu projeto é um _servidor web_ ou um _job_, se possui múltiplos processos ou apenas um etc.

O **Procfile** é definido em um arquivo chamado `Procfile` (exatamente assim, sem extensão 🤙) e deve localizar-se na **raiz** da sua aplicação. Caso o `Heroku` não encontre esse arquivo no momento do _build_, ele vai, conforme vimos anteriormente, tentar _iniciar_ seu projeto da maneira padrão da linguagem/framework utilizada.

<%= figure(%{src: "/back-end/infrastructure/deploy/heroku/images/Procfile-dirs-tree.png", caption: "Estrutura de pastas com um Procfile", class: "text-center rounded mx-auto d-block", width: "300px", height: "auto"}) %>

A estrutura do arquivo segue o seguinte padrão:

```language-yml
<process type>: <command>
```

Onde:

- `<process type>` Define o tipo daquele processo. Por exemplo, se é um _servidor web_ ou um _job_.

- `<command>` É o comando para _iniciar_ o projeto.

Segue um exemplo de um Procfile para um _servidor web_ em `Node.js`:

```language-yml
web: node index.js
```

**Importante!** O tipo `web` é especial, pois ele é o **único** tipo que pode receber tráfego HTTP externo pelas rotas do `Heroku`. A cada _deploy_, uma porta é gerada e fica disponível na variável de ambiente `PORT`. O Heroku fica responsável por redirecionar o tráfego HTTP que sua aplicação recebe para essa porta. Por isso, verifique se sua aplicação está parametrizada para definir qual porta utilizar a partir dessa variável de ambiente.

#### Dynos

O `Heroku` utiliza os conceitos de **container**, em que as responsabilidades de gerenciar máquinas virtuais ou físicas são abstraídas. Isso significa que, em vez de se preocupar com a máquina onde você irá rodar seu código, você pode focar em desenvolver aplicações mais poderosas.

Ao fazer o _deploy_ no Heroku, você estará colocando sua aplicação dentro de um "container". O container é um ambiente isolado e leve que provê os recursos necessário de CPU, memória RAM, um sistema operacional (Linux, no caso do Heroku) e um sistema temporário de arquivos para rodar seu código. No Heroku, os "containers" são chamados de **"dynos"**.

Os containers normalmente rodam em ambientes compartilhados, porém isolados um dos outros.

O conceito de containers não é exclusivo do Heroku. Na verdade, esse conceito é utilizado por diversas soluções e possui várias vantagens. Entre elas, estão a possibilidade maior de uma abstração da infraestrutura e facilidade para escalar seus projetos.

No Heroku, por exemplo, é possível escalar sua aplicação facilmente. Para escalá-lo verticalmente, basta alterar o tipo do _dyno_ para um que possua mais recursos. Para fazer um "_scaling_" horizontal, você pode aumentar o número de dynos.

<%= figure(%{src: "/back-end/infrastructure/deploy/heroku/images/heroku-scaling.svg", class: "text-center rounded mx-auto d-block", width: "600px", height: "auto", alt: "tipos de escalonamento Heroku", caption: "Heroku scaling"}) %>

O _scaling_ pode ser feito via linha de comando ou pelo dashboard do Heroku. Esse processo possibilita a configuração do **_autoscaling_**, em que você consegue escalar seus _dynos_, para mais ou para menos, automaticamente, baseando-se em alguns parâmetros, como, por exemplo, tempo de resposta de sua API.

#### Criando uma conta

Para utilizarmos os serviços do Heroku, é necessário criar uma conta na plataforma. Se ainda não possui uma conta, acesse o [site oficial](https://heroku.com) {: .external-link target="_blank" rel="noreferrer noopener" } e se cadastre.

#### Instalação do CLI

Para começar, vamos instalar o Heroku CLI (Command Line Interface). Com ele, conseguiremos gerenciar e escalar nossas aplicações, prover _add-ons_, observar _logs_ e rodar nossos projetos localmente, simulando o servidor (se você não entendeu alguma dessas funções, calma, veremos cada uma adiante).

Para a instalação no Linux, o CLI está disponível como _Snap_ para diversas distros. Para utilizá-la, seguiremos os seguintes passos:

##### 1. Instalando o Snapd.

Abra o terminal e execute o seguinte comando:

```language-bash
sudo snap install hello-world
```

O comando deverá responder da seguinte maneira:

`hello-world 6.3 from Canonical✓ installed`

Caso o comando retorne sucesso, siga para o próximo passo.

Caso retorne que o comando snap não é conhecido, instale-o utilizando o **apt**:

```language-bash
apt-get update && apt-get install snapd
```

Após a instalação, execute novamente o comando `snap install` acima para validar se a instalação foi concluída com sucesso.

##### 2. Instalando o CLI

Para sistemas **Linux**, instale o _snap_ do Heroku CLI, executando o seguinte comando:

```language-bash
sudo snap install heroku --classic
```

Para sistemas **macOS**, instale o Heroku CLI, executando o seguinte comando:

```language-bash
brew tap heroku/brew && brew install heroku
```

##### 3. Logando no Heroku

###### ⚠️ Atenção: é necessário autenticar o CLI para que os comandos funcionem corretamente.

Após a instalação ser concluída, você poderá acessar o Heroku por meio do seu terminal.

Use o seguinte comando para logar com a sua conta:

```language-bash
heroku login
```

A seguir, o console solicitará que você pressione qualquer tecla para abrir o navegador e prosseguir com o login nele. Feito isso, será exibida no terminal a mensagem de sucesso conforme abaixo:

<%= figure(%{src: "/back-end/infrastructure/deploy/heroku/images/heroku-cli-login.gif", caption: "Heroku CLI Login", class: "text-center rounded mx-auto d-block", width: "800px", height: "auto"}) %>

### Utilizando o Heroku

##### Executando localmente

Para rodar um projeto localmente utilizando o CLI do `Heroku`, basta instalar as dependências do projeto e utilizar o CLI da seguinte maneira:

```language-bash
npm install # Instalando as dependências em um exemplo NodeJs utilizando o npm.

heroku local web
```

Seu projeto rodará na porta `5000`. Rodar localmente pode ajudar a garantir que seu código está pronto para o **deploy**.

##### Recapitulando sobre git…

Recapitulando o que aprendemos no módulo sobre [git](/fundamentals/git), ao versionar nossos projetos, nós os associamos a repositórios remotos (_remotes_). Por padrão, o nome deste repositório remoto do git é `origin`. Para visualizá-lo, basta executar o comando `git remote -v`.

Para realizar o deploy pelo Heroku, precisamos adicionar mais um _remote_, dessa vez apontando para o servidor do `Heroku`.

Vamos ver, passo a passo, como fazer isso.

##### Criando um projeto para deploy

Vamos fazer nosso primeiro deploy no Heroku! 🎉

Para isso, inicie um projeto React:

```language-bash
npx create-react-app meu-primeiro-deploy-heroku
```

Em seguida, entre na pasta do projeto. Normalmente, o `CRA` já inicia um projeto git, mas, caso isso não aconteça, execute o comando para iniciar o projeto:

```language-bash
git init
git add .
git commit -m ‘Initialize project using Create React App’
```

##### Listando os remotes

Para listar os _remotes_ de seu projeto, execute o seguinte comando:

```language-bash
git remote -v
```

Como acabamos de iniciar o projeto `git`, não temos nenhum `remote` vinculado à nossa aplicação. Com isso, vá no seu GitHub e crie um repositório `meu-primeiro-deploy-heroku`.

Após ter criado o repositório, vá ao terminal e execute o comando para vincular a sua aplicação ao repositório criado no GitHub. Para isso, você pode:

Utilizar chave ssh:

```language-bash
git remote add origin git@github.com:[SEU_USUARIO_GITHUB]/meu-primeiro-deploy-heroku.git
```

Ou, se preferir, utilizar HTTPS também:

```language-bash
git remote add origin https://github.com/[SEU_USUARIO_GITHUB]/meu-primeiro-deploy-heroku.git
```

Por fim, execute novamente o comando `git remote -v`. Você verá que, dessa vez, aparecerá algo parecido com:

```language-bash
origin git@github.com:[SEU_USUARIO_GITHUB]/meu-primeiro-deploy-heroku.git (fetch)
origin git@github.com:[SEU_USUARIO_GITHUB]/meu-primeiro-deploy-heroku.git (push)
```

##### Heroku _remote_

Para adicionar o **remote do Heroku**, basta usar o comando `create` do CLI dentro da pasta da aplicação, da seguinte maneira:

```language-bash
heroku create
```

Após esse comando, liste novamente os _remotes_ e você verá um novo _remote_ chamado `heroku`, apontando para um repositório em `https://git.heroku.com/`.

Heroku gera automaticamente um nome aleatório para o repositório, de forma que o nome seja único. Algo parecido com `nameless-plateau-10138`.

**Nota** : Antes de executar novamente o comando `heroku create`, remova o `heroku` que já existe no _remote_ da aplicação, caso contrário será criado um novo repositório no Heroku sem a associação a nenhum _remote_. Para excluir um remote:

```language-bash
git remote rm heroku
```

Para dar um nome específico para o repositório, você pode informá-lo logo após o comando `heroku create`, como mostrado no exemplo abaixo:

```language-bash
heroku create meu-primeiro-deploy-2930
```

Como esse nome deve ser único, caso já exista algum repositório com este nome no `Heroku`, será retornado um erro solicitando que seja escolhido um novo. Por isso, um número aleatório no final pode evitar que esse erro ocorra. 😉

Ao executar o comando `heroku create` em seu projeto, ele passa a ser um `app` do Heroku. Isso significa que o Heroku pode entendê-lo e gerenciá-lo. E neste caso qual será o _remote_ associado a este novo app? Como você excluiu o _remote_ anterior, ele é associado a um _remote_ chamado `heroku`, como no início.


##### Nomeação do _remote_

Por padrão, o CLI vai nomear todos os _remotes_ criados como `heroku`. Porém, podemos criar o nosso _remote_ passando um nome diferente. Isso pode ser feito utilizando a _flag_ `--remote`:

```language-bash
heroku create meu-deploy-de-testes-29302 --remote heroku-homolog
```

Com o comando acima, nós mantemos o remote `heroku` e adicionamos o novo remote `heroku-homolog` com o nome `meu-deploy-de-testes-29302`. 🙂

<%= figure(%{src: "/back-end/infrastructure/deploy/heroku/images/git-remote-v.png", caption: "Repositórios Remotos Atuais", class: "text-center rounded mx-auto d-block"}) %>

Podemos, também, renomeá-los utilizando o comando `git remote rename`. Vale lembrar que o comando abaixo **não** vai manter o remote `heroku`, ele vai renomear o remote `heroku` para `heroku-origin`.

```language-bash
git remote rename heroku heroku-origin
```

Criar um outro _remote_ da forma que fizemos ou renomear seu _remote_ pode ser útil se você tiver múltiplos _apps_ do Heroku usando o mesmo código fonte. Por exemplo, uma versão para o ambiente de testes e outra para um ambiente de produção. Nesse caso, cada app do Heroku tem seu próprio remote no seu repositório local.

**Nota:** Mantenha os remotes do seu projeto como `heroku` e `heroku-homolog`.

##### Vincular um _app_ existente a um novo _remote_

Você já sabe renomear e até remover um _remote_ que estava associado a um _app_ do Heroku. Suponhamos que agora seja necessário vincular um _app_ a um outro _remote_, pois ao removê-lo anteriormente com `git remote rm nome-do-remote`, o _app_ que estava associado a ele, ficou sem um _remote_. 

Utilize a sintaxe `heroku git:remote -a nome-do-seu-app-heroku --remote nome-do-seu-remote`.

```language-bash
heroku git:remote -a meu-deploy-de-testes-29302 --remote heroku-test
```

>app _meu-deploy-de-testes-29302_ associado a um novo remote chamado _heroku-test_

##### Buildpack

Em alguns casos, precisamos rodar algum script ou realizar alguma configuração para publicar nosso app. Por exemplo, para publicar uma aplicação **React** precisamos "servi-la" com um _server-side app_ (back-end), como, por exemplo, um server com `express`.

Porém, para facilitar esses processos, existem os `buildpacks`, que automatizam esses e outros processos. Os buildpacks pode ser oficiais ou criados e publicados pela comunidade, e podem agregar muito em nosso processo de _Deploy_.

Com um buildpack, conseguimos fazer facilmente o deploy da nossa aplicação criada em React, mantendo as páginas de "maneira estática" e sem precisar de um back-end server-side. Faremos isso utilizando o buildpack [mars/create-react-app-buildpack](https://github.com/mars/create-react-app-buildpack#usage) {: .external-link target="_blank" rel="noreferrer noopener" }. Além disso, ele utilizará [Nginx,](https://nginx.org/en/) {: .external-link target="_blank" rel="noreferrer noopener" }, o que vai prover uma otimização da performance e da segurança ao nosso _app_.

Legal, né? E o melhor: é muito simples utilizá-los.

Vamos mostrar no próximo tópico como usaremos o buildpack que mencionamos com nosso exemplo em React.

Você pode consultar o catálogo de _buildpack_ [aqui.](https://elements.heroku.com/buildpacks) {: .external-link target="_blank" rel="noreferrer noopener" }


### Fazendo deploy

Para fazer deploy do seu app Heroku, basta você utilizar o comando `git push` de seu repositório local para a _branch_ **master** do _remote_ do Heroku;

```language-bash
git push heroku master
```

Feito isso, caso seu _build_ tenha sido feito com sucesso, no terminal será logada uma mensagem parecida com a seguinte:

```language-bash
[…]
remote: Released v3
remote: https://nome-do-seu-app-123.herokuapp.com/ deployed to Heroku
remote:
remote: Verifying deploy… done.
[…]
```

Pronto! Acesse a URL retornada pelo Heroku e você verá que sua aplicação está no ar!

Podemos fazer o push do nosso remote `heroku-homolog` também! Dessa forma, execute o mesmo comando acima, apenas mudando o nome do remote:

```language-bash
git push heroku-homolog master
```

Pronto! Acesse a URL e verá que sua aplicação do remote `heroku-homolog` está no ar!

Repare que a URL do remote `heroku-homolog` é diferente da url do remote `heroku`. Dessa forma, conseguimos manter duas aplicações no ar, uma sendo a master, que nossos usuários utilizarão, e outra para testes.

<%= figure(%{src: "/back-end/infrastructure/deploy/heroku/images/deploy-heroku-homolog.png", caption: "Deploy feito do remote heroku-homolog. O endereço do app é o nome que você deu a ele quando criou", class: "text-center rounded mx-auto d-block"}) %>

Sempre que você der `push` na _branch_ master do Heroku (`remote heroku`), seu último _commit_ será publicado. Caso você dê `push` em qualquer outro _remote_ adicionado, ou em outra branch que não seja o _master_, não terá efeito nenhum no Heroku. Sendo assim, é preciso realizar esse processo a cada vez que for feita alguma alteração na aplicação.

Por exemplo, se você estiver em um branch chamado `meu-branch` e executar `git push heroku meu-branch`, o heroku vai ignorar esse push, pois ele foi realizado num branch diferente do `master`.

Podemos publicar uma versão que não está na branch `master` local. A versão que queremos publicar, na realidade, está, por exemplo, em uma branch de uma feature nova para a aplicação que você está desenvolvendo. Para isso, crie uma nova branch a partir da master:

```language-bash
git checkout -b branch-teste
```

Nessa branch, você vai alterar o conteúdo de `App.js` para:

> meu-primeiro-deploy-hekoru/src/App.js

```language-jsx
import React from ‘react’;
import './App.css’;

function App() {
return (

<div className="App">
Meu primeiro deploy no Heroku!
</div>
);
}

export default App;
```

Em seguida, rode os seguintes comandos do git:

```language-bash
git add .
git commit -m ‘Meu primeiro deploy no Heroku!’
```

Após ter realizado o commit das alterações, utilize o seguinte comando para realizar o deploy:

```language-bash
git push heroku branch-teste:master
```

Observe que foi necessário informar, ao final do comando, que o deploy deve ser realizado na branch master do _remote_ `heroku`. Isto é necessário sempre que você estiver trabalhando em uma branch que não seja a sua master. No exemplo mostrado, estamos trabalhando na branch de nome _branch-teste_ e realizamos o push **com destino ao** _remote_ `heroku`.

Dessa forma, a versão da branch **branch-teste** foi publicada.

Além disso, é importante que saiba que ao setar variáveis de ambiente no front-end, essas variáveis já precisam existir no momento do `build`, pois a forma como elas funcionam é diferente de como funcionam no back-end.

No back-end, quando utilizamos `process.env.ALGUMA_COISA`, ele vai considerar o valor de `ALGUMA_COISA` que está definido na máquina atual. Já no front-end, quando se executa o comando `npm start` ou `npm run build`, ele vai pegar todos os `process.env.*` e irá trocar pelo valor daquela variável naquele momento.

Então, caso se tenha um `process.env.REACT_APP_API_URL` no front-end, e `REACT_APP_API_URL` tenha o valor `"xablau"` naquele momento, ele vai apagar `process.env.REACT_APP_API_URL` e irá substituir por `"xablau"`. Por esse motivo, na hora de subir o front-end no `Heroku`, **é preciso setar as variáveis de ambiente _antes_ de executar o comando de `push`**, pois é no momento do `push` que o `npm run build` é executado e que os `process.env.*` são convertidos para os valores das variáveis.

##### ⚠️ Atenção: Quando você executa um push para o Heroku, por mais que você pare o processo utilizando `Ctrl + C`, o _deploy_ `não` será cancelado. Uma vez iniciado o processo no Heroku, ele continuará a ser executado até o fim em _background_ no servidor.

#### Lidando com vários deploys

É possível iniciar um novo _deploy_ mesmo que um outro, do mesmo _app_, já esteja executando e ainda não tenha finalizado. Por exemplo, duas pessoas estão contribuindo para o mesmo projeto e executam `push` de _commits_ diferentes quase ao mesmo tempo. Se isso ocorrer, ambos os processos serão iniciados paralelamente e, conforme os processos forem finalizando, as versões serão publicadas.

**Importante:** Note que as versões serão publicadas na ordem em que os processos forem concluídos, e não na ordem em que os comandos `push` forem realizados. Por exemplo:

Imagine um cenário em que duas pessoas estão contribuindo para o mesmo projeto. Vamos nomeá-las de A e B. Ambas realizaram um `push` na _branch_ **master** do Heroku quase ao mesmo tempo. Nesse caso, os servidores do Heroku vão iniciar os dois processos paralelamente e vão publicá-los na sequência em que forem terminando.

Isso significa que, por mais que o processo A tenha se iniciado antes de B, se B terminar antes, ele será publicado e, posteriormente, quando o processo A finalizar, A será publicado, sobrescrevendo B.

<%= figure(%{src: "https:\/\/media.giphy.com/media/6Z3D5t31ZdoNW/giphy.gif", caption: "Não importa quem larga primeiro, e sim a ordem de chegada.", class: "text-center rounded mx-auto d-block", width: "500px", height: "auto"}) %>

### Acompanhando sua aplicação

##### Gerenciado seus _apps_

Após o deploy, seu serviço fica disponível em uma URL do Heroku, e o _app_ pode ser gerenciado pelo CLI. Para listar os serviços que você tem em execução, utilize o comando `apps`:

```language-bash
heroku apps
```

Para ver os detalhes de um _app_ específico, utilize o comando `apps:info`:

```language-bash
heroku apps:info nome-do-seu-app-12345
```

##### Variáveis de ambiente

Caso o seu projeto possua variáveis de ambiente, você pode setá-las utilizando o comando `config:set`.

```language-bash
heroku config:set TESTE="texto qualquer" --app nome-do-seu-app-12345
```

Para listar as variáveis de ambiente, basta utilizar o comando `config`.

```language-bash
heroku config --app nome-do-seu-app-12345
```

##### Logs

Para monitorar os logs dos _apps_, utilize `logs`:

```language-bash
heroku logs --app nome-do-seu-app-12345
```

Por padrão, o comando retorna as últimas 100 linhas de logs. Caso você queira mudar isso, utilize o parâmetro `--num` our `-n`:

```language-bash
heroku logs -n 200 --app nome-do-seu-app-12345
```

O parâmetro `--tail` ou `-t` abre uma sessão para mostrar em tempo real os últimos logs. Para retornar ao _prompt_, basta executar `Ctrl+C`:

```language-bash
heroku logs --tail --app nome-do-seu-app-12345
```

##### Removendo um app do Heroku

Anteriormente você viu como remover um _remote_ para que ele não aponte mais para um _app_ no Heroku. De maneira semelhante é possível remover também um _app_ que você publicou lá. Para isto utilize o comando `heroku destroy` através da sintaxe:

`heroku destroy --app nome-do-app-12345 --confirm nome-do-app-12345`

Vamos remover o app _meu-deploy-de-testes-29302_:

```language-bash
heroku destroy --app meu-deploy-de-testes-29302 --confirm meu-deploy-de-testes-29302
```


### Vendo tudo isso na prática

Agora vamos ver tudo isso na prática. Esses dois vídeos mostram como fazer deploy no Heroku de uma API em Express e de um projeto React criado com o CRA.

<%= vimeo "418413363" %>

<%= vimeo "418254501" %>

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

Agora que já passamos pelos conceitos mais básicos, está na hora de colocar a mão na massa com a nossa aula ao vivo!

Bora pro slack, onde o link estará disponível. 😉

---

## Exercícios

###### Tempo sugerido para realização: 80 minutos

Hora de pôr a mão na massa!

<%= versioning_your_code(@conn) %>

### Agora, a prática

Vamos juntar tudo o que aprendemos até aqui e exercitar mais ainda nosso aprendizado! Para isso, vamos fazer o processo de _deploy_.

**Exercício 1**: Crie uma API simples no _node_ utilizando _express_. No arquivo `index.js`, crie uma rota do tipo _get_ com o endereço raiz `/` que entregue como resposta o texto "Está vivo!!!" num `console.log`. Faça o deploy no `Heroku` utilizando o CLI.

<br>

**Exercício 2**: Agora, modifique a API para responder a uma nova mensagem:

1. Crie uma nova variável de ambiente com um texto qualquer;

2. Modifique o código da sua API para que ela responda na rota _get_ `/` com o mesmo texto contido na variável criada no passo anterior.

<br>

**Exercício 3**: Agora vamos criar um Procfile.

1. Crie uma cópia do arquivo `index.js` com o nome `indexProcfile.js`;

2. No novo arquivo, altere a mensagem de resposta da API para `"Procfile funciona mesmo!"`;

3. Crie um `Procfile` para iniciar sua aplicação a partir do novo arquivo de `indexProcfile.js`.

<br>

**Exercício 4**. Simule o deploy em multiambientes (produção e homologação). Para isso:

1. Renomeie o _remote_ do _deploy_ dos exercícios anteriores para `homolog`;

2. Crie um novo _remote_ a partir do mesmo projeto. Dessa vez, o _remote_ deverá se chamar `prod`;

3. Em seguida, configure as variáveis de ambiente para terem valores diferentes por ambiente.

<br>

**Exercício 5**: Faça deploy de uma aplicação React.

1. Crie uma aplicação React utilizando `create-react-app`;

2. Crie um novo _app_ utilizando o _buildpack_ [mars/create-react-app;](https://github.com/mars/create-react-app-buildpack#quick-start) {: .external-link target="_blank" rel="noreferrer noopener" }

3. Então, faça o deploy do _app_ no Heroku.

#### Bônus

**Exercício 6**: Agora que você chegou até aqui, pegue os projetos que você criou anteriormente e faça deploy deles no Heroku! Compartilhe suas URLs com a turma para que as pessoas possam acessá-los de outros lugares.

<br>

**Exercício 7**: Simule a estratégia de se terem multiambientes utilizando variáveis de ambiente específicas. Para isso:

1. Crie outros ambientes a partir dos códigos dos exercícios anteriores;

2. Faça alterações para que os projetos se comportem de maneiras diferentes em ambientes diferentes, de acordo com uma variável de ambiente. Pode ser uma mensagem diferente, ou um comportamento alterado, por exemplo;

3. Teste seus _apps_ acessando cada um dos ambientes.

---

## Recursos Adicionais

- [Qual a diferença entre escalonamento vertical e horizontal?](https://pt.stackoverflow.com/questions/160142/qual-a-diferen%C3%A7a-entre-escalonamento-vertical-e-horizontal) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Documentação oficial Heroku - Deploy com Nodejs](https://devcenter.heroku.com/articles/deploying-nodejs) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Vídeo: Deploy // Dicionário do Programador](https://www.youtube.com/watch?v=gJw7l2JKpuQ) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Vídeo: DevOps // Dicionário do Programador](https://www.youtube.com/watch?v=iwf6kcvxeD4&list=PLVc5bWuiFQ8GgKm5m0cZE6E02amJho94o&index=21) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Blog oficial Heroku - Deployando React com 0 configuração](https://blog.heroku.com/deploying-react-with-zero-configuration) {: .external-link target="_blank" rel="noreferrer noopener" }

- [O que é container e suas vantagens](https://www.redhat.com/pt-br/topics/containers/whats-a-linux-container) {: .external-link target="_blank" rel="noreferrer noopener" }

- [O que é computação em nuvem? Exemplo Azure](https://azure.microsoft.com/pt-br/overview/what-is-cloud-computing/#uses) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Site oficial Heroku - Buildpacks](https://www.heroku.com/elements/buildpacks) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Documentação oficial Heroku - Add-ons](https://devcenter.heroku.com/categories/add-ons) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Documentação oficial Heroku - Scaling](https://devcenter.heroku.com/articles/scaling) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Documentação oficial Heroku - Tipos de Dyno](https://devcenter.heroku.com/articles/dyno-types) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Documentação oficial Heroku - Buildpacks](https://devcenter.heroku.com/articles/buildpacks) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
