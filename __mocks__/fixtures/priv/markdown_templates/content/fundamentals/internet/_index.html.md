## O que vamos aprender?

<%= vimeo "476722053" %>

Antes de você aprender como desenvolver para a web, você precisa de um conhecimento mais profundo sobre como ela funciona.

Esses conceitos te darão um entendimento geral do ecossistema em que você irá trabalhar, tornando-o capaz de conversar de igual pra igual com as outras pessoas desenvolvedoras sobre o seu trabalho. 🗣🌎

---

### Você será capaz de:

- Explicar de forma simples como a internet funciona;

- Entender o modelo Cliente & Servidor e identificar suas partes;

- Compreender como funcionam os protocolos HTTP e HTTPS;

- Identificar quais os tipos de requisição podem ser feitos através desses protocolos.

---

## Por que isso é importante?

Como uma pessoa que irá desenvolver software para a internet, conhecer o seu funcionamento é um requisito primordial.

É importante ter uma noção de como a rede da internet é estruturada, pois quando você for pensar no design de uma aplicação web, por exemplo, terá que considerar fatores como a latência da rede, a geolocalização dos servidores, a velocidade e/ou disponibilidade de conexão dos usuários, enfim. 🔮

Atualmente, a grande maioria das aplicações web são desenvolvidas usando o modelo _Cliente & Servidor_. Você precisa entender esse modelo para entender como o software que você irá desenvolver se encaixa nele. Você precisa, em suma, saber como os servidores funcionam, para quando for colocar um projeto "no ar", ou "em produção". 🖥

---

## Conteúdos - Parte 1

###### Tempo sugerido para realização: 120 minutos

### As peças que montam a Internet

Ao longo da sua carreira como desenvolvedor, você fará páginas incríveis que estarão disponíveis para usuários do mundo todo na Internet. Mas você já se perguntou como esse processo acontece? Antes de prosseguir na leitura, reflita um pouco sobre como você acredita que as suas páginas web funcionam!

O mundo Web é tão presente no nosso dia a dia que esquecemos o quão complexo ele é. Conhecê-lo será fundamental quando você começar a arquitetar o _backend_  da sua aplicação, e muito importante para que você desenvolva páginas web que funcionem de fato.

Entender a Internet pode parecer intimidador pois há muitos termos específicos que são constantemente utilizados. Vamos começar a desmistificá-los fazendo aquilo que fazemos praticamente todos os dias ao abrir o nosso navegador: acesse _www.google.com_.  O que está por trás desse acesso? Vamos listar primeiro os conceitos básicos para entendê-lo:

- Cliente: Firefox, Mozilla, Chrome... qual o navegador você utilizou para fazer a sua pesquisa? O termo técnico para ele é **cliente**. O cliente é uma aplicação que está conectada à Internet. A sua principal função é receber a interação do usuário e traduzi-la em uma requisição para outro computador chamado Servidor Web. Apesar de usarmos o navegador para acessar à Internet, você pode pensar no seu computador como sendo o Cliente no modelo Cliente-Servidor. Todo computador tem um número único, como o seu CPF, chamado endereço IP. É através desse endereço que computadores, celulares e tablets são identificados.

- Servidor: Como vimos no exemplo acima, nossa busca por _www.google.com_ será enviada para um **Servidor**. O Servidor é um super computador conectado à Internet. Ele também tem o seu próprio endereço IP, assim como o seu computador. O Servidor espera por requisições de outras máquinas (clientes). Diferente do seu computador, um Servidor tem um software específico em execução que irá dizer como ele deve responder a uma requisição do seu navegador. A principal função do Servidor é **armazenar, processar e entregar** páginas web para os Clientes. Há diversos tipos de servidores, como _Web Servers, Database Servers, File Servers, Application Servers_. O servidor que usamos para fazer a busca por _www.google.com_ é um _Web Server_.

- Endereço IP: A sigla IP refere-se a _Internet Protocol_. O endereço IP é um identificador numérico para um dispositivo (computador, celular, tablet, impressora, roteador, servidor...) conectado à rede TCP/IP. Todo dispositivo conectado à Internet tem um endereço IP **único** que irá identificá-lo, e será usado para comunicar com outros dispositivos. Os edereços IP tem quatro campos de dígitos separados por pontos (exemplo: 244.155.65.2). Esses números são chamados de endereço lógico. Para localizar um dispositivo conectado à Internet o endereço lógico é convertido em um endereço físico por um software. Esse endereço físico faz parte do seu _hardware_ e é conhecido por endereço de controle de acesso à mídia (MAC address).

- TCP/IP: Essa sigla refere-se à _Transmission Control Protocol/Internet Protocol_. Um protocolo é um conjunto de regras, e o protocolo TCP/IP é utilizado para transmitir dados na rede. Ele também é o protocolo de comunicação mais utilizado no mundo Web.

- ISP: ISP ou _Internet Service Provider_ é o seu provedor de Internet. É qualquer empresa que nos fornece acesso ao maravilhoso mundo Web. Sem os seus serviços, não conseguiríamos fazer a nossa busca por _www.google.com_ pois não estaríamos conectados à Internet.

- DNS: DNS ou _Domain Name System_ é um dispositivo com uma base de dados distribuída que gerencia os nomes de serviços, computadores ou qualquer dispositivo conectado à Internet. Ele é usado para relacionar o endereço nominal (google.com) com o endereço IP. Os servidores DNS são responsáveis por localizar e traduzir para números (um endereço IP) as buscas por sites que digitamos no navegador.

- Port Number: O número de porta é um número de 16 bits utilizado para identificar uma porta específica no servidor, e está sempre associado ao endereço IP. O _Port number_ é uma forma de identificar um processo específico encaminhado para o servidor.

- Host: O _Host_ é qualquer computador conectado à rede, seja como cliente, servidor ou qualquer outro tipo de dispositivo. Cada host tem um endereço IP único. Para o site que estamos buscando, _www.google.com_, o host é o servidor web que hospeda a página na web. É comum confundir o host com o servidor. Lembre-se que eles são coisas diferentes! O Servidor é um tipo de host - uma máquina específica com endereço IP. Por outro lado, o host pode ser também uma organização inteira que fornece um serviço de hospedagem para manter inúmeros servidores web.

- HTTP: _Hyper-text Transfer Protocol_ é o protocolo utilizado para a comunicação entre navegadores e servidores na Internet.

- URL: O URL é a sigla para _Uniform Resource Locators_ e identifica um recurso web específico. Podemos, como exemplo, mudar a nossa busca para _https://www.google.com/travel/flights_ para pesquisar por preços de passagens aéreas. O URL identifica o protocolo que será utilizado para comunicarmos com o servidor (https), o nome do host (google.com) e o recurso que queremos acessar (travel/flights). 

Depois responda ao quiz, lembrando que ele serve para **fixação dos conteúdos** e **não** tem **caráter avaliativo**, não se preocupe!

- [Quiz - Como a internet funciona](https://forms.gle/hjD5H35BhgUj5zoaA) {: .external-link target="_blank" rel="noreferrer noopener" }

### O modelo cliente-servidor e a estrutura de uma aplicação web

Agora você vai entender como funciona uma aplicação web, e como é possível torná-la escalável. Para isso, você precisa conhecer um pouco mais sobre o modelo Cliente-Servidor e sobre a estrutura de uma página Web. Até aqui você já aprendeu alguns conceitos básicos sobre o mundo Web. Você já tem uma ideia de como o cliente (seu computador) interage com um servidor. O próximo passo será ir um pouco mais a fundo para entender como todas as partes que vimos se relacionam para nos permitir navegar na Internet.

O modelo cliente-servidor é utilizado para descrever a forma com que um cliente (um computador conectado à Web) e um servidor se comunicam na rede. Você pode visualizar essa ideia no diagrama simplificado abaixo:

<%= figure(%{src: "/fundamentals/internet/images/cliente-servidor.png", class: "text-center rounded mx-auto d-block", height: "auto", caption: "Modelo Cliente-Servidor"}) %>

No entanto, essa representação é apenas um modelo. Há outras partes envolvidas que são importantes e que permitem com que você tenha acesso a esse conteúdo que está estudando agora, por exemplo. Para isso, vamos entender como as peças desse quebra cabeça se encaixam em uma aplicação web.

Aplicações web, como essa que você está usando em seus estudos aqui na Trybe, seguem uma estrutura básica muito similar. Elas são compostas por um cliente, um servidor e uma base de dados.

O cliente é responsável por interagir com o usuário. Em uma aplicação Web o cliente é responsável por definir a **estrutura**, a **aparência** e mecanismos para lidar com as **interações do usuário** (como um click, ou um campo para preenchimento).

A **estrutura** da sua página é definida por uma linguagem chamada HTML, que é a sigla para _Hyper text markup language_. O HTML te permite configurar a estrutura física da sua página web. Cada tag do HTML descreve um elemento específico do documento, como podemos ver abaixo:

```language-html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <header>
    <h1>Minha página Web!</h1>
  </header>
  <p>Bem vindos! Essa é a estrutura básica da minha primeira página</p>
  <ul>O que estou aprendendo:
    <li>Git & GitHub</li>
    <li>Internet</li>
    <li>Shell</li>
  </ul>
</body>
</html>
```

- O conteúdo dentro de `<h1><h1>` descreve o título principal (_heading_). Níveis diferentes de título são descritos por `<h2>`, `<h3>` e assim por diante;
- O conteúdo dentro de uma tag `<p>` descreve um parágrafo;
- O conteúdo dentro de uma tag `<ul>` descreve uma lista não ordenada (_unordered list_), e cada item da lista está contido na tag `<li>`;

Há vários tipos de tags para descrever elementos diferentes da sua página web, como listas, imagens, links para navegação, botões...mas não se preocupe! Você irá utilizá-los com ~~muita~~ frequência, e a fluência virá com a prática.

A **aparência** da página é definida por uma outra linguagen chamada CSS, que significa _Cascading Style Sheets_. O CSS é uma linguagem que te permite descrever como os elementos definidos pelo HTML devem ser estilizados. O CSS te permite alterar a fonte, a cor, o tamanho e até mesmo incluir recursos como animações e áudio. Você pode adicionar um estilo para a sua página como no exemplo:

```language-css
body {
  background-color: blue;
}

h1 {
  color: purple;
  font-size: large;
}

p {
  color: green;
  font-weight: bold;
}

h2 {
  color: red;
  border: 3px solid black;
}
```

As **interações com o usuário** são definidas por uma terceira linguagem: o JavaScript. É o JavaScript que confere à página um comportamento dinâmico. Imagine que você esteja em uma página de e-commerce. Você pode clicar nos items que quer comprar e salvá-los em um carrinho, você pode adicionar filtros nas suas buscas, navegar entre as sessões do site, tudo isso graças ao Javascript! Você deve estar se perguntando: Beleza, eu consigo visualizar tudo o que está acontecendo no momento que faço as compras na loja online. Mas para onde vai o meu pedido no momento em que efetuo o pagamento? O que acontece por trás dos bastidores de um e-commerce?

```language-javascript
// Limpar o leitor com um click duplo
const clearButton = document.querySelector('.limpar');
clearButton.addEventListener('dblclick', function () {
  inputResultado.value = "";
});
```

O seu pedido é enviado como uma requisição para um servidor, que irá **armazenar, processar e encaminhar** as suas compras.

O **servidor** em uma aplicação Web é quem recebe as requisições do cliente. Lembra-se do protocolo HTTP? Pois bem, é aqui que ele entra em cena. É esse protocolo que define uma linguagem para que clientes e servidores se comuniquem. O servidor espera por requisições HTTP de uma porta específica, sempre associada a um endereço IP. Com as requisições, ele vai realizar ações e enviar a resposta via HTTP. Todos os dados que viajam entre o cliente e o servidor são enviados através da rede Internet usando o protocolo TCP/IP.

E por fim, o **banco de dados** de uma aplicação web é onde a informação é armazenada de forma acessível, gerenciável e em constante atualização. Imagine que você está lançando uma nova rede social, que em cinco anos contará com 500 milhões de usuários ativos no mundo todo. Você certamente irá precisar usar um banco de dados para armazenar informações sobre usuários, _posts_, comentários. E quando um visitante fizer uma requisição para acessar a página, as informações que serão retornadas para a página virão de um banco de dados. Assim, interações em tempo real, como vemos hoje no Instagram e Facebook, serão viáveis.

Passamos pelos conceitos chaves de uma aplicação Web, e vimos de forma simplificada o seu funcionamento. Mas a medida que a aplicação cresce, como um único servidor conseguirá lidar com milhares - ou até mesmo milhões! - de requisições de usuários em tempo real? 

Agora, vamos entender como escalonar uma aplicação web. Uma forma para lidarmos com um grande volume de dados é distribuir o tráfego de informações entre servidores no backend. O responsável por gerenciar o trânsito de informações de uma aplicação entre vários servidores backend é o que chamamos de balanceador de carga.

"Balanceamento de carga" é um termo genérico para uma série de algoritmos que distribuem as requisições para o servidor. Caso você tenha curiosidade em conhecer alguns desses algoritmos, pesquise por dois que são muito populares no design de sistemas distribuídos: Round Robin e Least Connections. Resumidamente, através de algoritmos o balanceador de cargas divide para qual host as requisições serão direcionadas em um sistema de serviços distribuídos.

<%= figure(%{src: "/fundamentals/internet/images/balanceador-carga.png", class: "text-center rounded mx-auto d-block", height: "auto", caption: "Balanceador de carga."}) %>

Tudo tranquilo até aqui, certo?! O balanceador de cargas resolve o problema de tréfego de dados distribuindo as requisições para servidores backend. Mas replicar esse modelo ainda pode gerar problemas a medida que a sua aplicação cresce. À medida que adicionamos mais funcionalidades para a aplicação, sua complexidade é aumentada e a carga de trabalho solicitada ao servidor também cresce, este conjunto de fatores pode sobrecarrega-lo. Assim, para resolver esse problema, é necessário separar o servidor por funcionalidade. É aqui que **serviços** entra em ação.

Um serviço é apenas outro servidor capaz de interagir com servidores, o que não acontece com um servidor Web, que interage apenas com o cliente. Cada serviço tem uma funcionalidade, como um serviço para autenticação de usuário ou serviços de busca. Assim, é possível quebrar o servidor Web da sua aplicação em múltiplos serviços, cada um com uma funcionalidade específica. A grande vantagem dos serviços é que você pode escaloná-los de forma independente. Além disso, os times de uma empresa também podem trabalhar de forma independente em um determinado serviço, ao invés de ter uma equipe numerosa trabalhando em um único servidor, o que poderia se tornar um grande problema de gestão de projeto.

Tudo o que vimos até agora funciona muito bem para escalonar o tráfego de dados. Mas a sua aplicação ainda está centralizada em um único lugar. Quando usuários do mundo todo começarem a acessar o seu site, eles podem ter um tempo de resposta maior devido à grande distância entre cliente e servidor. Uma forma de resolvermos esse problema é usando o que chamamos de Rede de Distribuição de Conteúdo, ou _Content Delivery Network (CDN)_. O CDN é um sistema de distribuição de servidores "proxy". Podemos entender um servidor proxy como sendo um intermediário entre cliente e servidor.

Empresas com uma grande quantidade de tráfego distribuído no mundo todo pode pagar por companhias que oferecem serviços de CDN. Assim, usuários de diversas localidades poderão acessar a aplicação com um tempo de resposta menor. Um exemplo é a [Akamai](https://www.akamai.com/br/pt/) {: .external-link target="_blank" rel="noreferrer noopener" }, que tem sedes em pontos estratégicos no mundo todo para garantir uma melhor experiência ao usuário. Se o conteúdo da sua aplicação Web não precisa cruzar o oceano para que um usuário na China possa utilizá-lo, o tempo de resposta é muito menor. A Akamai, por exemplo, consegue reduzir esse tempo de latência ao armazenar cópias do conteúdo da aplicação (arquivos como o HTML, CSS, mídia) do servidor dos seus clientes. Assim, a Akamai consegue fornecer a aplicação para o usuário de seus clientes sem precisar ter acesso ao seu servidor de quem a contratou.


Vamos fixar o que aprendemos? Responda ao _Quiz_ para verificar sua compreensão do texto:

- [Quiz - O modelo _Cliente & Servidor_ e a estrutura de uma aplicação web](https://forms.gle/3MjtaiWMWQhQH6oS6) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 60 minutos

Ufa! Depois de ler tanto, que tal fazermos um encontro ao vivo pelo Zoom para discutirmos o assunto?

Aula ao vivo! Vamos pro Slack, onde o link estará disponível.

---

## Conteúdos - Parte 2

###### Tempo sugerido para realização: 60 minutos

### O protocolo HTTP

<%= vimeo "476734728" %>

Como vimos no vídeo acima, o funcionamento da Internet depende de regras, que são os protocolos. É através desses protocolos que conseguimos acessar páginas, fazer downloads, enviar emails. Dentre os protocolos, há dois que são frequentemente utilizados: o protocolo TCP/IP e o protocolo HTTP.

O Protocolo TCP/IP, como vimos, é a base de envio e recebimento de dados de toda a Internet. É um conjunto de regras que permite a comunicação entre todas as máquinas conectadas à Internet.  

Vamos nos aprofundar um pouco mais sobre o que é o protocolo HTTP, quais seus principais verbos e o que significa ser **RESTful**? 

Você já aprendeu que, no modelo Cliente-Servidor, a troca de mensagens acontece através de requisições e respostas: o Cliente envia uma requisição ao Servidor, que irá lhe retornar uma resposta. Com o grande volume de dados envolvidos nessa operação, gerenciar essas mensagens não é uma tarefa fácil. Assim, Cliente e Servidor aderem a uma linguagem comum, com regras que alinham as expectativas de ambas as partes, de forma que eles sabem exatamente o que esperar. Essa linguagem é o que chamamos de protocolo HTTP.

Cada requisição e resposta trocada entre Cliente e Servidor é uma única transação HTTP. O HTTP é uma linguagem de texto, o que significa que as mensagens trocadas são quantificadas em bits. Cada mensagem é dividida em duas partes: o _header_ e o _body_.

É importante ter em mente que o HTTP por si só não consegue transmitir dados. Ele ainda depende do protocolo TCP/IP para pegar as requisições e respostas entre duas máquinas. O HTTP é uma camada de abstração que padroniza a forma com que os hosts se comunicam.

Uma requisição ou resposta HTTP pura não é encriptada, sendo vulnerável a vários tipos de ataques. Por outro lado, HTTPS é uma forma mais segura de comunicação que utiliza a encriptação. Para adicionar mais essa camada de segurança, o HTTPS utiliza um segundo mecanismo de segurança: o SSL. Não se preocupe em entender os detalhes e as diferenças entre cada protocolo. Por hora, é interessante saber que eles existem. Websites grandes com milhares de usuários, como o Google e o Facebook, utilizam o protocolo HTTPS para manter as nossas senhas, informações pessoais e até mesmo detalhes de cartão de crédito em segurança na rede.

Vamos fazer uma segunda busca para entender sobre o protocolo HTTP. No seu navegador, busque por https://github.com/. Clique com o botão direito, selecione "Inspecionar" e procure por Network na barra superior. Navegue para o repositório da Trybe na sua barra de navegação com a janela de inspecionar aberta: https://github.com/betrybe. Selecione o primeiro nome e a aba _Headers_. Você verá uma tela como a que é mostrada abaixo: 

<%= figure(%{src: "/fundamentals/internet/images/header-http.png", class: "text-center rounded mx-auto d-block", height: "auto", caption: "Header."}) %>

#### HTTP Headers

Como vimos, o protocolo HTTP é composto por Header e Body. O Header contém _metadata_ (dados sobre dados) que incluem o tipo de requisição (GET, POST, PUT, DELETE), o caminho URL, o endereço IP dentre outros. Para a página que estamos usando como exemplo, na sessão _Response Headers_ os mais importantes são:

- Content-Type: text/plain
Especifica como os dados são representados. Nesse exemplo, temos o texto sendo enviado como resposta no formato HTML.

- Server: GitHub.com
Servidor Web para onde as requisições estão sendo feitas.

- Status: 200 OK
Forma padrão para o servidor comunicar ao cliente sobre o resultado da requisição. O código 200 significa que o servidor encontrou o recurso e está enviando o resultado da requisição.

- Host: api.github.com
Host da aplicação

- cookie: _octo=GH1.1.358825508.1593780201; _ga=GA1.2.60245099.1593780202; logged_in=yes; dotcom_user=isabellavjs; tz=America%2FSao_Paulo

Novamente, você não precisa saber todos os pares de nome-valor. Saber onde encontrá-los no seu navegador é o suficiente para você começar a explorá-los conforme a sua necessidade.

#### HTTP Body

O servidor armazena então os dados (metadados) mais importantes para estabelecer uma comunicação com o cliente. O _Body_ refere-se ao corpo da mensagem que está sendo transmitida. Você pode acessá-lo clicando em _Response_ na barra superior. Para a requisição que fizemos, acessar a página https://github.com/, o _body_ contém o HTML para a página que estamos querendo acessar. Para praticar, experimente navegar nos outros arquivos que foram retornados para o navegador após a requisição! Você pode acessá-los no menu disponível na barra lateral esquerda.

<%= figure(%{src: "/fundamentals/internet/images/response-http.png", class: "text-center rounded mx-auto d-block", height: "auto", caption: "Body."}) %>

#### Métodos HTTP

Os métodos HTTP são os verbos que dizem ao servidor o que fazer com os dados no URL. Como vimos, o endereço URL identifica recursos específicos. Quando o cliente utiliza o endereço URL combinado a um verbo HTTP, o servidor saberá qual será a ação necessária para cada recurso. Os exemplos mais comuns são:

##### GET

O método GET é o mais comum, e é utilizado para ler informações encaminhadas pelo servidor para uma URL específica. As requisições GET são apenas para **leitura**, o que significa que os dados nunca poderão ser modificados no servidor. O servidor irá apenas retornar os dados, sem modificá-los. Assim, esse tipo de requisição é considerada uma operação segura, pois o efeito retornado será sempre o mesmo, independentemente do número de requisições feitas. Assim sendo, dizemos que requisições GET são **idempotentes**, o que significa que o efeito da requisição no servidor será sempre o mesmo - fazer milhões de requisições GET para o mesmo URL tem o mesmo efeito que uma única requisição. O método GET apenas retorna dados.

Requisições GET são respondidas com status 200 (OK) se o recurso que estamos querendo acessar for encontrado com sucesso, ou 404 (NOT FOUND) se a página não for encontrada.

<%= figure(%{src: "/fundamentals/internet/images/not-found.png", class: "text-center rounded mx-auto d-block", height: "auto", caption: "404 - Page not found."}) %>

##### POST

O método POST é utilizado para criar um novo recurso, como um formulário para login. Você usará o método POST para criar um recurso subordinado (ex: novo usuário) para a aplicação pai (ex: http://exemplo.com/usuario). Ao contrário do método GET, o método POST não é nem seguro e nem idempotente. Fazer duas ou mais requisições POSTS resultará em novos recursos criados (mesmo que idênticos). Requisições POST são retornadas com o status code 201 (CREATED) e um novo caminho no header com o Link do recurso criado.

##### PUT

O método PUT é utilizado para atualizar o recurso identificado pelo URL. Esse método também pode ser utilizado para criar um novo recurso. Requisições PUT não são consideradas operações seguras, pois o estado da aplicação é modificado no servidor. No entanto, o método PUT é idempotente porque múltiplas requisições PUT para atualizar um recurso têm o mesmo efeito que uma única requisição.

A resposta a requisição é o status code 200 (OK) se o recurso foi atualizado com sucesso, ou 404 (NOT FOUND) se ele não for encontrado.

##### DELETE

DELETE é utilizado para deletar um recurso identificado pelo URL. As requisições DELETE são idempotentes, pois quando deletamos um recurso ele será deletado. Você pode fazer milhares de requisições com o método DELETE que no fim o resultado será o mesmo: um recurso deletado.

A resposta requisição é o status code 200 (OK) se o recurso for deletado com sucesso, ou 404 (NOT FOUND) se o recurso que será deletado não existir.

#### REST

Você pode já ter ouvido falar do termo **RESTful** para descrever uma aplicação. REST é a sigla para _Representational State Transfer_. É um estilo de arquitetura utilizado no design de aplicações Web. O estado da aplicação são os dados necessários para que o servidor possa atender a uma determinada requisição. As regras do REST nos guiam a desenvolver sistemas mais performáticos, escaláveis, simples, de fácil manutenção e modificação, portátil e confiável. Dentre elas, podemos destacar:

- Interface uniforme: define a interface entre cliente e servidor de forma a desacoplar a arquiterura da aplicação. Os verbos que vimos acima descrevem a grande maioria das regras para interface uniforme. Dentre as definições previstas pelo REST, as mais importantes são:
    - Recursos, como dados de um banco de dados, devem ser identificados na requisição e o cliente terá acesso apenas a representação do recurso (ex: JSON, HTML)
    - O cliente deve ter informações suficientes para manipular recursos no servidor utilizando representações
    - As mensagens trocadas entre cliente e servidor devem ser auto-descritivas
- Stateless: Essa regra define que todos os dados do estado da aplicação que precisam ser manipulados em uma requisição devem estar contidos na própria requisição (URL, HTTP body, HTTP header) e o servidor deve encaminhar para o cliente todos os dados referentes ao estado na resposta (HTTP headers, status code, HTTP response body).

O protocolo HTTP é uma peça chave na comunicação entre cliente-servidor. Para construir aplicações RESTFul é necessário compreender o básico de HTTP. Assim, você será capaz de criar páginas performáticas e escaláveis que farão a diferença na vida de muitos usuários! 

Agora responda ao quiz, lembrando que ele serve para **fixação dos conteúdos** e **não** tem **caráter avaliativo**, não se preocupe! 😉

- [Quiz - Protocolo HTTP & REST](https://forms.gle/aax5y5QTF3UV7ARXA) {: .external-link target="_blank" rel="noreferrer noopener" }

#### Curl

Por fim, você vai aprender sobre o comando `curl`, abreviação para _Client URL_. Ele é um comando disponível na maioria dos sistemas baseados em Unix que serve para verificar conectividade, além transferir dados via terminal.

Antes de avançarmos no conteúdo, é necessário verificar a versão instalada do `curl`. Para isto, abra o terminal e utilize o comando abaixo.

1. Para `Linux`:

```language-shell
curl --version
```
2. Para `MacOS`:

```language-shell
curl -V
```

Se o `curl` estiver dvidamente instalado, seu terminal exibirá uma mensagem similar a:

1. Para `Linux`:

```language-shell
curl 7.68.0 (x86_64-pc-linux-gnu) libcurl/7.68.0 OpenSSL/1.1.1f zlib/1.2.11 brotli/1.0.7 libidn2/2.2.0 libpsl/0.21.0 (+libidn2/2.2.0) libssh/0.9.3/openssl/zlib nghttp2/1.40.0 librtmp/2.3
Release-Date: 2020-01-08
Protocols: dict file ftp ftps gopher http https imap imaps ldap ldaps pop3 pop3s rtmp rtsp scp sftp smb smbs smtp smtps telnet tftp 
Features: AsynchDNS brotli GSS-API HTTP2 HTTPS-proxy IDN IPv6 Kerberos Largefile libz NTLM NTLM_WB PSL SPNEGO SSL TLS-SRP UnixSockets
```
2. Para `MacOS`:

```language-shell
curl 7.68.0 (x86_64-apple-darwin16.0) libcurl/7.68.0 SecureTransport zlib/1.2.8
Protocols: dict file ftp ftps gopher http https imap imaps ldap ldaps pop3 pop3s rtsp smb smbs smtp smtps telnet tftp Features: AsynchDNS IPv6 Largefile GSS-API Kerberos SPNEGO NTLM NTLM_WB SSL libz UnixSockets
```

Caso você ainda não possua o comando `curl` instalado, seguiremos um passo a passo para realizarmos a instalação tanto em `Linux` quanto em `MacOS`.

#### Linux

1. Este comando irá atualizar a lista de pacotes e programas que podem ser instalados, em seguida, irá baixar e instalar os pacotes de atualização dos programas que estão instalados.

```language-shell
sudo apt update && sudo apt upgrade
```
2. Agora utilizaremos o comando que fará a instalação do `curl`.

```language-shell
sudo apt install curl
```
3. Por fim cheque novamente a versão do `curl` para garatirmos que tudo foi instalado corretamente.

```language-shell
curl --version
```

#### MacOS

Por padrão o comando `curl` já vem instalado. No entanto, pode ser que algum problema tenha acontecido e o comando não esteja instalado. Caso esta seja sua situação, siga os comandos abaixo. 😉

1. No terminal, execute o comando abaixo.
  * Caso seja solicidata uma senha, utilize a sua senha de usuário. Ela não aparecerá na tela, porém, o sistema irá identificá-la. Ao terminar aperte a tecla `enter`.

```language-shell
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)" < /dev/null 2> /dev/null
```
2. Faça a instalação do `curl` utilizando este comando.

```language-shell
brew install curl
```
3. Por fim cheque novamente a versão do `curl` para garatirmos que tudo foi instalado corretamente.

```language-shell
curl -V
```

Assim como você fará com toda nova tecnologia que aprender em programação, o primeiro passo na maioria das vezes é dar uma olhada na [documentação!](https://curl.se/docs/) {: .external-link target="_blank" rel="noreferrer noopener" } A documentação contém muitas informações úteis que podem nos poupar tempo de pesquisa se a analizarmos.

Com a etapa de instalação concluida e a documentação em mãos, vamos conhecer um pouco mais sobre o comando rodando exemplos práticos no terminal!

1. Sintaxe básica do `curl`.

```language-shell
curl [OPTIONS] [URL]
```
  *  `Options` aqui podemos especificar diversas opções que nos permitem acessar informações e definir comportamentos/configuralções, como por exemplo:
    * `-u` ou `--user`: Permite especificar nome de usuário e senha para autenticação no servidor.
    * `-T` ou `--upload-file`: Permite transferir arquivos locais para uma URL remota.
    * `-s` ou `--silent`: Coloca o `curl` em modo silencioso. Este comando fará com que mensagens de erro e status de progressão não gerem nenhum tipo de notificação.
    * Caso você queira conhecer mais opções, é possível acessar o manual completo do `curl` através do comando `curl --manual`.
  * `URL` é o endereço WEB ao qual vamos nos referir para fazer nosas requisições via comando `curl`.
2. Agora faremos nossa primeira requisição para um site.

```language-shell
curl testdomain.com
```
  * Note que a resposta que você receberá no terminal será um código `HTML` que como vimos anteriormente, permite configurar a estrutura física da página web.
  * Além disto, observe também que as tags `<html>`, `<head>`, `<title>`, `<body>` e `<h1>` estão presentes na resposta. A tag `<h1>` foi vista anteriormente no conteúdo e representa o título principal. As demais tags nós veremos com mais detalhes no próximo bloco de conteúdo. 🚀
3. Nesta próxima etapa, utilizaremos uma **option** do comando `curl`, conhecida como `--head`. Ela nos permitirá ter acesso a todo cabeçalho da página. Não se preocupe em entender todos os detalhes, vários pontos que estão presentes nesta resposta serão vistos por você com profundidade ao longo do curso!

```language-shell
curl --head https://www.betrybe.com/
```
  * Nesta requisição ao site da trybe, recebemos algumas informações como por exemplo:
      * **Status da requisição**: está representado pelo número 200, e nos informa que nossa requisição foi feita com sucesso.
      * **Server**: Servidor Web para onde as requisições estão sendo feitas.
      * **Content-type**: Especifica como os dados são representados. Neste caso, `text/html`.
4. Por fim, veremos como podemos fazer uma requisição de download para uma URL específica, utilizando a option `-O`. A partir desta requisição você terá acesso ao arquivo localmente, no diretório em que o terminal está rodando.

```language-shell
curl -O https://uploads-ssl.webflow.com/5dbd9ce75ad64f24b67f0932/5dbdd9165ad64f5e29811c52_BRAND3.png
```
  * Note que o arquivo em sua máquina terá o mesmo nome do arquivo remoto. É comum que as nomenclaturas de arquivos remotos não sejam descritivas. Para resolver este problema, podemos utilizar uma segunda option do comando `curl` que nos permitirá nomear o arquivo da forma que desejarmos.

```language-shell
curl -o trybe_logo.png https://uploads-ssl.webflow.com/5dbd9ce75ad64f24b67f0932/5dbdd9165ad64f5e29811c52_BRAND3.png
```
  * Observe que agora o download foi feito com o nome `trybe_logo.png`.

Interessante quanta informação conseguimos acessar através de comandos simples no terminal não é mesmo? Existem diversas outras options que podem ser utilizadas via comando `curl`, porém, não nos aprofndaremos neste conteúdo por agora.

Se você quiser se aprofundar mais, alguns exercícios e um artigo sobre `curl` foram separados na na seção de **_Recursos Adicionais_**. A leitura do artigo e realização dos exercícios é opcional, e é mais uma forma de você colocar em prática todos os conceitos que viu até aqui, além de refletir sobre eles enquanto cria as requisições usando o terminal. 💻🐁

---

## Dinâmica com Post-its

###### Tempo sugerido para realização: 60 minutos

Agora você irá se juntar aos seus colegas, em grupos, para fazer uma dinâmica de forma bem interativa! 🎎

Vai ser assim:

Vocês irão se juntar em grupos via Zoom e utilizar uma ferramenta online para desenhar em conjunto um diagrama de como a internet funciona! Vá para o Slack para instruções sobre qual ferramenta utilizar!🗯\_\_

Vocês devem utilizar a ferramenta para descrever as partes _(protocolos, recursos, mecanismos, etc)_ envolvidas quando enviamos uma requisição a partir de um cliente para um servidor.

Use o exemplo abaixo para se inspirar. 😉

<%= figure(%{src: "/fundamentals/internet/images/post-it-internet.jpeg", caption: "Exemplo de diagrama com post-its. Nesta foto os post-its com um ❓ indicam onde você deveria preencher com o termo correto.", class: "standard-screenshot"}) %>

O importante agora é usar a criatividade e trabalhar em equipe para criar um diagrama o mais detalhado possível, utilizando o conhecimento adquirido hoje.

Depois de montar seu diagrama, cada membro do grupo deverá enviar uma resposta no formulário abaixo, utilizando o resultado da dinâmica para montar sua resposta.

[Enviar a resposta da dinâmica](https://forms.gle/3eqR1gR2gZg11uVa9) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Recursos Adicionais (opcional)

E aí, gostou do que aprendeu até aqui? Nesta parte, nós colocamos outras referências para você se aprofundar no tema. Artigos, tutoriais, livros etc...

- [O Que é Comando Curl e Como Usar?](https://www.hostinger.com.br/tutoriais/comando-curl-linux/) {: .external-link target="_blank" rel="noreferrer noopener" }

- [21 exercícios sobre `cURL` 👈](https://jvns.ca/blog/2019/08/27/curl-exercises/) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Tutorial sobre como inspecionar a atividade de uma página na rede](https://developers.google.com/web/tools/chrome-devtools/network/?hl=pt-br) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Como a internet funciona - playlist em português](https://www.youtube.com/watch?v=HNQD0qJ0TC4&list=PLQq8-9yVHyOYMFAc9v7Yb_cqmNMksEdrk) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Como a internet funciona - vídeo 5 min](https://www.youtube.com/watch?v=7_LPdttKXPc&feature=youtu.be&t=46s) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Como a internet funciona - texto](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/How_does_the_Internet_work) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Como funciona o DNS - vídeo 6 min](https://www.youtube.com/watch?v=72snZctFFtA&feature=youtu.be&t=45s) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Como funciona o DNS - texto](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_domain_name#How_does_a_DNS_request_work) {: .external-link target="_blank" rel="noreferrer noopener" }

- [O que é um navegador - vídeo 1 min](https://www.youtube.com/watch?v=BrXPcaRlBqo&feature=youtu.be) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Um conto de pacotes. Como funciona a internet? - vídeo 3 min](https://www.youtube.com/watch?v=ewrBalT_eBM&feature=) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

Chegou a hora do desenvolvimento web! 🎉

<%= next_button(@conn) %>
