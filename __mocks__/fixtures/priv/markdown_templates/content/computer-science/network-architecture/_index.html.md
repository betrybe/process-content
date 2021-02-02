## O que vamos aprender

No conteúdo de hoje iremos nos aprofundar mais em redes de computadores, entendendo um pouco melhor como funcionam as diversas redes e como utilizamos isso no nosso dia-a-dia, seja para acessar uma aplicação ou para desenvolver uma aplicação que explore essa arquitetura.

Aprenderemos também sobre os diversos protocolos e como eles são utilizados, assim como os diversos componentes que formam as redes de computadores como, por exemplo, _clients_ e _servers_.

---

### Você será capaz de

- Entender um pouco mais como a internet funciona;

- Conhecer os conceitos básicos de redes de computadores;

- Entender os modelos de _cliente-servidor_ e _P2P_;

- Entender como funciona a estrutura de camadas nas redes;

- Conhecer as camadas que formam o principal modelo de rede;

- Aprender o que são os protocolos e como os utilizamos no nosso dia-a-dia.

---

## Por que isso é importante?

No início de nossa jornada aprendemos alguns conceitos básicos de como funciona a internet. Esses conceitos nos acompanharam durante os outros conteúdos e foram fundamentais para aprendê-los. Ao longo dessa jornada utilizamos os conceitos de _cliente-servidor_ para desenvolvermos servidores _NodeJS_ ou páginas _React_, onde era possível consumí-las pelo navegador; utilizamos os conceitos do protocolo HTTP ao trafegar dados e ao explorá-los utilizamos o _REST_ com _Express_.

O conteúdo de hoje será para aumentarmos nossa bagagem sobre esses assuntos, aprofundando um pouco mais no tema para que possamos utilizá-lo de maneira ainda mais efetiva no nosso dia-a-dia, já que estamos em um mundo cada vez mais conectado.

Estamos em um momento em que mais pessoas estão tendo acesso a internet, assim como cada vez mais dispositivos estão sendo criados para se comunicar através dessas redes. Temos computadores, celulares, fones, relógios, carros e até geladeiras capazes de se comunicar através de redes e tudo isso é possível porquê todos eles são capazes de "falar a mesma língua", seguindo padrões que permitem a comunicação e troca de informações entre eles.

E antes de iniciar os estudos, um aviso, o conteúdo é desafiador de uma forma diferente da que estamos acostumados, aqui queremos entender o fluxo de como a arquitetura de redes funciona, então o mais importante aqui não são os códigos, mas sim entender o que eles estão fazendo, todo o código está aqui para nos ajudar a entender os conceitos de redes, pois o código em si nós já conhecemos e o que ainda não soubermos, será demonstrado. Em outras palavras, não se preocupe com o código, mas sim com o conceito passado.

---

## Conteúdo:

###### Tempo sugerido para realização: 120 minutos

### Internet

Antes de começarmos a falar sobre rede computadores e sua arquitetura precisamos falar sobre a internet, a rede mundial de computadores que permite a troca de informações globalmente. A internet nada mais é que uma implementação de uma rede ~~gigantesca~~ de computadores.

Veja o vídeo abaixo. Nele, é falado sobre alguns conceitos que serão fundamentais para entendermos o conteúdo de hoje:

<%= youtube_video "dJfa-btLRAs" %>

Legal, né?! Você já tinha ouvido falar que a internet era interligada entre os continentes através de cabos submarinos?

Se quiser ver um pouco mais sobre como a internet sai das operadoras e chega até a sua casa, assista a [segunda parte do vídeo](https://www.youtube.com/watch?v=fYJl-7jRzuw) {: .external-link target="_blank" rel="noreferrer noopener" } como conteúdo extra.

E, caso queira saber um pouco da história da internet, tem [esse vídeo da TecMundo](https://www.youtube.com/watch?v=pKxWPo73pX0) {: .external-link target="_blank" rel="noreferrer noopener" } como conteúdo extra também. Você já leu um tanto sobre arquitetura de redes no bloco de **Sockets**. Vamos rever parte desse conteúdo aqui e vamos nos aprofundar nele, para termos um entendimento sólido de tudo!

### Redes de computadores

Redes de computadores são conjuntos de software e hardware que permitem a comunicação entre diversos dispositivos como computadores, celulares e impressoras, sendo capazes de compartilhar e transmitir dados uns com os outros.

As redes de computadores podem ser de diversos tamanhos. Como exemplo, temos a rede local que interliga os dispositivos em sua casa através de um roteador. Bom, já que pensamos em uma rede pequena, e agora? Qual rede é considerada grande? Oras, que tal uma rede mundial de computadores que liga dispositivos por todo o globo terrestre? 😁

Existe uma classificação quanto a escala dessa rede, sendo que uma rede de escala menor pode fazer parte de uma rede de escala maior:

- **PAN (Personal Area Network):** Chamamos de _PAN_ as redes que abrangem uma pequena área física, com dispositivos que se comunicam de forma bem próxima. Como exemplo, temos a rede que permite que seu fone bluetooth se conecte com seu smartphone ou seu mouse sem fio funcione no seu computador.

- **LAN (Local Area Network):** Rede local de um escritório, casa ou prédio, normalmente abrangendo um área com algumas salas ou blocos. Interliga computadores, roteadores, smartphones, impressoras, entre outros.

- **MAN (Metropolitan Area Network):** Interliga diversas redes e dispositivos em uma área metropolitana como, por exemplo, vários locais situados em diversos pontos de uma cidade ou bairro. Outra classificação é a **NAN** (Neighborhood Area Network), que se restringe a uma área de uma bairro ou vizinhança.

- **WAN (Wide Area Network):** Rede geográficamente distribuída, interligando redes e dispositivos em âmbito global (estados, países e continentes).

---

<%= figure(%{src: "/computer-science/network-architecture/images/network-types.jpeg", caption: "Exemplo de escalas de Redes", class: "text-center rounded mx-auto d-block", width: "510px", height: "auto"}) %>

As redes são compostas tanto de componentes físicos (hardware) como cabos, roteadores e switches, quanto de softwares que permitem o tráfego de informações.

### Pacotes

Temos diversos dispositivos interligados em vários níveis, desde localmente até globalmente, utilizando redes sem fios e cabos. Mas como que essas informações são enviadas, trafegadas e recebidas por outro dispositivos nessas redes?

Isso é feito através do que chamamos de **pacotes**. Para trafegar um dado em uma rede, esse dado é convertido para binários e então dividido em diversos pedaços, e esses pedaços são os chamados "pacotes" que são enviados pela rede. Os pacotes possuem diversos dados, além da informação em si, como quem está enviando aquele pacote, qual o seu destino e indicações para que o destinatário saiba se alguma parte da informação se perdeu no caminho e se é necessário solicitar um reenvio, dentre outras funções.

Mas há a pergunta: como devemos adicionar esse monte de informação para enviar os pacotes? E como o outro lado irá saber entender essas informações? Como o outro lado irá juntar cada pedacinho para formar uma coisa só?

Para isso existem os **protocolos**.

### Protocolos

Um protocolo é um conjunto de regras e ações a serem tomadas em uma determinada situação.

De maneira semelhante, nas redes de computadores, os protocolos são conjuntos de regras que controlam como os dados são trocados. Dessa forma é possível que, ao enviar um dado através da rede seguindo esses padrões, tenhamos a garantia de que os demais dispositivos da rede saberão lê-lo.

Essa padronização é o que permite que diversos dispositivos sejam criados e produzidos a cada dia, todos capazes de se conectarem e trocarem informações com o mundo inteiro através das redes já existentes.

### Modelo de Rede

Existem diversos protocolos, cada um responsável por definir as regras para um objetivo específico. Por exemplo, temos protocolos que definem como o dado será trafegado, outros para definir como traduzir os dados recebidos no pacote.

Essa separação é feita para permitir a modularização, de modo que cada protocolo defina regras específicas para a parte pela qual ele é responsável e para que seja possível utilizar combinações de protocolo de acordo com a nossa necessidade.

Dividimos então os protocolos em grupos, agrupando cada tipo no que chamamos de camadas. Por exemplo, precisamos de uma camada para identificar quem está enviando a informação e pra quem ela se destina, precisamos de outra camada para traduzir os dados a serem trafegados, etc.

Um conjunto dessas camadas forma o que chamamos de modelo, que basicamente define quais as camadas necessárias para a montagem de um pacote.

#### Modelo ISO/OSI

O modelo **ISO/OSI** (em inglês _Open Systems Interconnection_), foi lançado com o objetivo de ser um padrão entre os diversos dispositivos de comunicação. Esse modelo divide as redes de computadores em 7 camadas:

<%= figure(%{src: "/computer-science/network-architecture/images/osi.png", caption: "Modelo OSI", class: "text-center rounded mx-auto d-block", width: "210px", height: "auto"}) %>

Cada camada é responsável pela inserção de uma funcionalidade ao modelo:

**1. Física:** Estabelece a comunicação entre os dispositivos no sentido físico. Responsável pelo cabeamento, pelas características elétricas como tensão, ópticas (quando se der por meio óptico) ou eletromagnéticas em uma rede sem fio. Tudo isso garantindo que ocorra a transmissão dos dados pelos meios físicos (hardware), sem perder `0`s e `1`s.

**2. Enlace:** Também chamada de "link de dados", essa camada é responsável pela detecção e eventualmente pela correção de erros que tenham ocorrido no nível físico. Ela também realiza o controle do fluxo da transmissão entre um dispositivo e outro.

**3. Rede:** Responsável pelo endereçamento dos dispositivos na rede, assim como pela rota (caminho) que os pacotes deverão percorrer para chegarem da origem até destino.

**4. Transporte:** Responsável pela detecção e correção de erros que tenham ocorrido nas camadas anteriores, assim como pela ordenação, garantindo que os dados saídos da origem sejam os mesmos no destino. Além disso, ela define a conexão que será usada e como estabelecê-la, assim como controla o fluxo e congestionamento de dados.

**5. Sessão:** Responsável pela comunicação entre dois processos que estão em máquinas diferentes, controlando o status, definindo quando deve começar, terminar ou reiniciar a comunicação entre origem e destino.

**6. Apresentação:** Responsável pela conversão entre os formatos de caracteres para que possam ser utilizados na transmissão, também responsável pela compressão e criptografia desses dados.

**7. Aplicação:** Essa camada diz respeito dos protocolos de comunicação, controlando sintaxe e semântica da mensagem, traduzindo de fato as informações trafegadas.

Bastante coisa?! O importante aqui é saber que o dado é encapsulado por essas diversas camadas, como se fossem aquelas "bonecas russas":

<%= figure(%{src: "https:\/\/media.giphy.com/media/Ud5r7tzmG4De0/giphy.gif", caption: "Encapsulamento dos dados", class: "text-center rounded mx-auto d-block", width: "510px", height: "auto"}) %>

A informação passa por uma primeira camada, sendo formatada e tendo informações adicionadas de acordo com sua regra. Em seguida, o resultado desse primeiro encapsulamento é passado para a outra camada, onde a informação é novamente tratada e são adicionadas as informações pertinentes àquela camada. Esse processo é repetido por todas as camadas até que os dados estejam aptos para serem trafegados ao seu destino.

Da maneira inversa, o destinatário realiza o desencapsulamento, compreendendo os dados de cada camada e então prosseguindo para a camada seguinte.

#### Modelo Internet - TCP/IP

O modelo ISO/OSI, como o nome já diz, é um "modelo": isso quer dizer que ele define camadas abstratas a serem tratadas. É necessária, portanto, uma implementação que aplique esses conceitos. Uma das implementações desse modelo é a TCP/IP, que é um conjunto de protocolos de comunicação: TCP (_Transmission Control Protocol_ - Protocolo de Controle de Transmissão) e o IP (_Internet Protocol_ - Protocolo de Internet).

Veja o vídeo abaixo.

<%= youtube_video "V4XZ81vRGtM" %>

O TCP/IP define 4 camadas mesclando as 7 do modelo OSI:

---

<%= figure(%{src: "/computer-science/network-architecture/images/iso-osi-tcp-ip.png", caption: "ISO/OSI e TCP/IP", class: "text-center rounded mx-auto d-block", width: "810px", height: "auto"}) %>

##### Aplicação

A camada de aplicação contém os protocolos responsáveis por dar significado as informações, sendo a primeira camada passada para a mensagem.

Como exemplos de protocolos dessa camada temos o **SMTP** (_Simple Mail Transfer Protocol_ - Transmissão de envios), **FTP** (_File Transfer Protocol_ - Transferência de arquivos) e o nosso velho amigo **HTTP** (_Hypertext Transfer Protocol_ - Comunicação WEB).

Tomando como exemplo o HTTP, quando subimos um front-end e temos um servidor capaz de servir páginas web, esse processo é realizado utilizando HTTP. Ao subirmos o servidor, o mesmo ficará aguardando por um pedido, por requisições. Quando acessamos aquele serviço pelo navegador, por exemplo, o navegador está fazendo uma chamada `HTTP` ao servidor, ou seja: o pedido é feito seguindo os padrões desse protocolo, de modo que o servidor saberá como interpretá-lo, processá-lo e devolver a devida resposta. Essa resposta também seguirá as regras do protocolo, de modo que o navegador (_client_) também saiba entender o que foi retornado e, além do conteúdo das páginas (o _html_, _css_ e o _js_), também são entregues na resposta outros dados do protocolo, como os _headers_.

Dessa mesma forma, outros protocolos podem ser utilizados nessa camada, SMTP, FTP, DHCP, entre outros. Cada um terá suas regras e padrões de modo que, ambos os lados, cliente e servidor, saibam interpretar as informações.

##### Transporte

A camada de transporte, como o próprio nome indica, é a camada responsável pela transferência de dados entre diferentes máquinas (seja um servidor ou um computador pessoal). Os principais protocolos dessa camada são o **TCP** e o **UDP**.

Os protocolos possuem diferentes aplicabilidades. Por exemplo, para criarmos um servidor para servir uma página web não podemos ter perda de informações, caso contrário a página não chegará por completo a quem pediu. Da mesma forma que, ao construirmos uma API, temos que garantir que os dados enviados, como o conteúdo de um formulário de cadastro, chegue até o servidor, assim como garantir que os dados respondidos em uma consulta feita ao _servidor_, por exemplo, sejam entregues por inteiro ao _cliente_ que fez essa solicitação. Nesses casos o **TCP** é o protocolo mais adequado.

Por outro lado, ao assistirmos uma _live_ ou jogarmos algum jogo online, alguns dados podem ser perdidos, por exemplo, parte da transmissão do vídeo, de maneira que perceberemos apenas uma oscilação na transmissão. Nesse caso, o **UDP** é mais indicado, já que com TCP, caso essa perda de pacote ocorra, será necessário aguardar o reenvio para então ser dado continuidade no processo. Além disso o UDP permitirá uma maior velocidade na transmissão e também que o conteúdo seja transmitido para diversos clientes ao mesmo tempo, permitindo que diversas pessoas assistam àquele conteúdo em tempo real.

Se quiser ver mais sobre o assunto [aqui tem um artigo](https://www.alura.com.br/artigos/quais-as-diferencas-entre-o-tcp-e-o-udp) {: .external-link target="_blank" rel="noreferrer noopener" } que faz um exemplo de uma aplicação dos protocolos em um chat.

##### Rede

O principal protocolo utilizado nessa camada é o **IP - Internet Protocol**, que inclusive dá nome ao modelo. Outras opções de protocolos dessa camada temos o ICMP, NAT, ARP. Todos eles lidam com o endereçamento da comunicação. Mas o que seria o endereçamento?!

Imagine que você vai enviar uma mensagem para alguém através de uma carta. Você então escreve a mensagem em uma folha e a coloca em um envelope. Nesse envelope é necessário que você coloque o endereço para o destinatário a qual você está enviando a mensagem, de modo que seja possível entregá-la. Da mesma maneira você precisa informar o seu endereço para que o destinatário possa enviar uma mensagem de resposta para você.

A camada de rede do TCP/IP é utilizada para isso. Ela irá identificar o remetente e o destinatário para que o pacote possa ser transmitido na rede. Na aula de TCP/UDP & NET do bloco de Sockets vimos um vídeo muito bom a respeito. Vale a pena ver de novo! E caso queira conhecer um pouco mais sobre o `IPv6` assista ao vídeo: ['Os endereços IP não são todos iguais do NIC.br'](https://www.youtube.com/watch?v=jnuHODaLcO8) {: .external-link target="_blank" rel="noreferrer noopener" }

##### DNS

Estamos falando constantemente de endereços IP: que toda máquina possui um para poder se comunicar na rede e ao endereçar um pacote nós o utilizamos. Porém, a realidade é que não costumamos ver muitos esses números ao utilizar a internet e você deve estar se perguntando que, se eles são essenciais para se navegar, onde eles ficam?

Nós utilizamos um sistema de nomes para identificar pontos da rede, ao invés de usar números, já que nomes são mais fáceis de serem utilizados por pessoas. Por exemplo: imagine que, para acessar o `google.com` fosse necessário digitar no navegador "8.8.8.8", ou para acessar o site da Trybe fosse necessário digitar "34.193.204.92". Seria muito complexo e nada fácil, certo? Para simplificar isso existe o sistema de **DNS**.

Dessa forma, de maneira bem resumida, conseguimos atribuir um "nome" a um endereço IP específico. Veja o vídeo abaixo do "NIC.br" sobre o tema:

<%= youtube_video "ACGuo26MswI" %>

##### Interface / Acesso ao Meio

Por último, mas não menos importante, temos a camada física ou de abstração do hardware, também chamada de camada de interface ou de acesso ao meio.

A principal função dessa camada é realizar a interface do modelo TCP/IP com os diversos modelos de rede, por exemplo o protocolo _Ethernet_, transmitindo os dados através dos meios físicos, encontrando e transmitindo tudo pelo melhor caminho possível. Esta camada lida com os meios de comunicação, corresponde ao nível de hardware, ou meio físico, que trata dos sinais eletrônicos, conector, pinagem, níveis de tensão, dimensões físicas, características mecânicas e elétricas, etc.

#### Recapitulando

Para recapitular todas as camadas vamos utilizar o exemplo de um front-end, aqueles que fizemos nos conteúdos anteriores e conseguimos acessar pelo navegador. Vamos imaginar que este front-end está publicado em um servidor diferente da nossa máquina.

Ao rodar o projeto é criado um servidor **HTTP**, ou seja, camada de aplicação do modelo. O navegador entende esse protocolo e, quando tentamos acessar o site pela sua url, é feita uma requisição HTTP ao servidor. Esse nosso "pedido" pelo conteúdo do site é complementado com as informações de controle daquela camada, por exemplo, com os `headers` e com o `método` HTTP daquela chamada, no caso um _get_. Dessa forma o servidor saberá interpretar o que está sendo solicitado.

Antes de enviar essa informação ao servidor, os dados, já dentro do "envelope" do HTTP, passam pela próxima camada, a camada de transporte. A camada de transporte irá estabelecer a conexão com o servidor. No nosso caso, como não podemos ter perda de pacotes na transmissão, utilizamos o protocolo **TCP** para isso. Os "envelopes" então tem os dados de controle dessa camada adicionados para que o _cliente_ possa avisar ao _servidor_ que será feita uma transmissão e estabelecer a conexão. Além disso, caso a informação seja muito grande, os dados podem ser divididos em vários pacotes. Essa camada também irá colocar informações de controle para que esse "quebra cabeça" seja montado do outro lado.

Depois disso os dados, agora já encapsulados pelas duas camadas anteriores, passam pela camada de rede, para identificar o remetente e o destinatário, é então utilizado o protocolo **IP**, adicionando suas informações de controle, como um identificador único para cada um dos lados, de modo que a mensagem possa ser roteada pela internet e entregue ao seu destinatário.

Por último, a mensagem então é encapsulada pela última camada, responsável por "traduzí-la" para os meios físicos, utilizando, por exemplo, o protocolo **Ethernet**, passando pelo cabeamento do seu computador até o roteador e de lá seguindo várias rotas, cada pacote seguindo por um lado, atravessando bairros, cidades, países e até o oceano até chegar no servidor onde seu site está hospedado.

Chegando lá o mesmo processo é realizado, porém no sentido contrário. Primeiro o pacote deverá ser entendido pela camada física, traduzindo a mensagem entregue pelo hardware.

Em seguida a mensagem é então entregue ao servidor correto, devidamente identificado pela camada de rede e então a informação passa pela camada de transporte, aceitando a conexão solicitada pelo cliente e reorganizando os diversos pacotes que estão chegando. Esses pacotes então, depois de reordenados, são interpretados pela camada de aplicação.

O server então compreende que deve responder com o _HTML_, o _CSS_ e o _JS_ do site. Então ele pega todo esse conteúdo, encapsula novamente, utilizando o protocolo TCP/IP, passando por todas as camadas novamente e o processo se repete até o seu navegador receber o conteúdo a ser renderizado para carregar a página solicitada.

Para quem quiser ver mais, entre [nesse link](https://www.youtube.com/watch?v=jMZF5ZjbA7A) {: .external-link target="_blank" rel="noreferrer noopener" } em que ele é uma video aula que recapitula os principais conceitos de redes que vimos hoje e alguns outros pontos que são interessantes termos conhecimento também!

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

Agora que já passamos pelos conceitos mais básicos, está na hora de colocarmos a mão na massa com a nossa aula ao vivo!

Bora pro Slack, onde o link estará disponível. 😉

---

## Exercícios

###### Tempo sugerido para realização: 80 minutos

Hora de por a mão na massa!

<%= versioning_your_code(@conn) %>

### Agora, a prática

Vamos juntar tudo o que aprendemos até aqui e exercitar mais ainda nosso aprendizado! Para isso iremos criar _servers_ Node.js utilizando alguns dos protocolos vistos e, então, vamos explorá-los. Se tiver dúvidas ao utilizar alguma das ferramentas que mencionamos nos exercícios, exercite suas habilidades de busca no Google ou experimente o comando `man`!

**Exercício 1**: O primeiro server que iremos utilizar é o nosso velho amigo HTTP, na camada de aplicação. Você pode tanto criar um quanto utilizar um dos projetos ou exercícios dos módulos anteriores. A ideia é utilizarmos os conhecimentos do conteúdo e a ferramenta cURL para realizarmos uma chamada HTTP para ele. 
A ideia aqui é que o projeto tenha rotas GET e POST, para que seja possível enviar requisições para os endpoints e receber respostas, assim como já nos acostumamos a receber via browser ou utilizando programas como o Postman.

Caso tenha dificuldades maiores, você pode utilizar o Postman para converter uma requisição em cURL, é só fazer a requisição nele como você já sabe e depois clicar no botão code (que fica embaixo do save) e escolher cURL.

1. Faça uma chamada GET, utilizando o cURL.

2. Faça uma chamada POST, utilizando o cURL, passando um JSON no body da requisição.

3. Faça uma chamada qualquer, utilizando o cURL, passando um header na requisição.

**Exercício 2**: Ainda utilizando o cURL, vamos explorar mais alguns conceitos do HTTP. Relembre que falamos que o HTTP organiza e dá significado aos dados encapsulados nessa camada. Por exemplo: ao vermos um 200 tanto nós quanto um client HTTP sabemos que aquela request foi realizada com sucesso. Vamos explorar isso com o cURL.

1. Faça uma chamada GET, utilizando o cURL, para "google.com".

2. Perceba que foi retornado um `301`. Isso quer dizer que existem diversos redirecionamentos que nos encaminham para o lugar certo. No caso, o caminho certo para a página do google é `www.google.com`. Ao acessarmos pelo navegador, não percebemos isso porquê ele faz o redirecionamento para a página certa para nós ao encontrar o `301`, porém, se você inspecionar a network você irá identificar esse redirecionamento. Faça uma nova chamada a "google.com", porém agora utilizando o parâmetro `-L` ou `--location`, que serve para "seguir redirecionamentos".

**Exercício 3**: Agora utilizando o wget, pegue o conteúdo da página do site da Trybe, depois abra o arquivo HTML baixado em seu navegador. Faça o mesmo processo com outras páginas web.

**Exercício 4**: Agora iremos para a camada de transporte. Vamos criar um server TCP, utilizando o módulo `NET` do Node.js. Como dissemos antes, o importante aqui é entender o conceito, aqui vão algumas ajudas:

1. A sintaxe do módulo `NET` é muito parecida com a do `socket.io` que conhecemos anteriormente.

2. Na documentação, temos um exemplo que se olhado com calma, podemos perceber que ele lembra bastante a sintaxe do socket.io, procure por **createServer** [neste link](https://nodejs.org/api/net.html) {: .external-link target="_blank" rel="noreferrer noopener" } que contêm a documentação do `NET`.

3. Perceba que o servidor sozinho, não faz nada, ele precisa que alguém se conecte a ele, então para testá-lo, você pode utilizar o comando `telnet localhost 8085`, onde telnet é a aplicação que iremos utilizar, localhost é o local onde o servidor está (no caso, o seu próprio PC) e 8085 é a porta em que o servidor está escutando conexões.

4. Assim como no socket.io, onde cada evento recebe um nome, aqui também é assim, então pesquise por **Event: 'data'** para saber como tratar corretamente o evento de receber informações e deixá-las de forma legível para humanos.

Com essas dicas, crie um server com as seguintes especificações:

1. Responder com um "Olá, client", logo quando estabelecer uma conexão.

2. Imprimir no console todo dado recebido (não esqueça de converter o `data` para string para a informação ficar legível para nós, humanos).

3. Utilize a porta 8085.

**Exercício 5**: Utilizando o comando telnet ou o Netcat (nc):

1. Conecte no server do exercício anterior e envie informações. O server deverá imprimir as mensagens enviadas no console.

2. Pare o servidor e verifique o que aconteceu com a conexão que estava aberta com o comando telnet ou nc.

**Exercício 6**: Reinicie o servidor TCP e agora faça uma requisição utilizando o cURL (HTTP). Perceba o que é exibido no console do _server_, já que não estamos utilizando o HTTP nele. Perceba também que o comando cURL não recebe uma resposta HTTP com sentido (um status code 200, por exemplo), de modo que ele não sabe que aquela requisição chegou ao fim.

**Exercício 7**: Agora iremos explorar o outro protocolo de transporte que aprendemos, o UDP. Crie um servidor utilizando o módulo `dgram` do Node.js. Para isso, as dicas que vimos no exercício 4 se aplicam aqui, procure na [documentação](https://nodejs.org/api/dgram.html) {: .external-link target="_blank" rel="noreferrer noopener" } o módulo que cria o servidor e como o evento deve ser nomeado. 
Uma coisa importante a se lembrar, é que enquanto o TCP faz controle de fluxo, o UDP não, então algumas diferenças serão percebidas no código também, nosso server deverá:

1. Imprimir no console toda mensagem recebida (não esqueça de converter também para string).

2. Utilize a versão 4 do protocolo (`udp4`).

3. Utilize a porta 8084.

**Exercício 8**: Envie pacotes para o servidor UDP utilizando o Netcat (nc). Em seguida pare o servidor e perceba que como não há conexão nada é sentido pelo _client_.

**Exercício 9**: Faça uma chamada ao server utilizando o `cURL`. Lembre que, além do HTTP, o comando utiliza o protocolo TCP e não o UDP. Repare o que acontece.

#### Bônus

**Exercício 10**: Identifique o IP interno e externo da sua máquina.

**Exercício 11**: Identifique as interfaces de redes utilizadas por sua máquina e identifique qual está em uso agora.

---

## Recursos Adicionais

- [Documentação NodeJS - net | TCP](https://nodejs.org/api/net.html#net_net) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Documentação NodeJS - dgram | UDP](https://nodejs.org/api/dgram.html#dgram_udp_datagram_sockets) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Vídeo - Governança da Internet | nic.br](https://www.youtube.com/watch?v=ZYsjMEISR6E) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Vídeo - Desenvolvendo servidores TCP e UDP com NodeJS](https://www.youtube.com/watch?v=1acKGwbby-E) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Vídeo - Desenvolvendo servidores TCP e UDP com NodeJS | Vídeo completo](https://www.youtube.com/watch?v=qqRYkcta6IE) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Documentação NodeJS - http | HTTP](https://nodejs.org/api/http.html#http_http) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Artigo - O que é um backbone?](https://tecnoblog.net/277282/o-que-e-um-backbone/) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Artigo - Cabos submarinos](https://canaltech.com.br/telecom/cabos-submarinos-como-funciona-a-tecnologia-que-conecta-pessoas-e-continentes-133033/) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Vídeo - A história da Internet no Brasil - TecMundo](https://www.youtube.com/watch?v=k_inQhpKprg) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Comando telnet](https://www.linuxforce.com.br/comandos-linux/comandos-linux-comando-telnet/) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Comando nc](https://www.linuxforce.com.br/comandos-linux/comandos-linux-comando-nc/) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Comando wget](https://www.hostinger.com.br/tutoriais/wget-o-que-e-como-instalar-comandos-wget) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Comando cURL](https://www.hostinger.com.br/tutoriais/comando-curl-linux/) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
