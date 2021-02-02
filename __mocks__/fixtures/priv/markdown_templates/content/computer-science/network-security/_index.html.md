## O que vamos aprender

Nesse conteúdo abordaremos conceitos já vistos nas aulas anteriores com uma perspectiva de segurança. Iremos conhecer algumas ferramentas, recursos e conceitos que nos possibilitam agregar segurança à nossas aplicações nas diversas redes às quais elas pertencem, incluindo na internet.

---

### Você será capaz de

- Entender o funcionamento de ataques como o DDoS;

- Entender o que é e como realizar uma conexão segura utilizando SSH;

- Entender o que são certificados e como a criptografia é utilizada na internet;

- Entender o que são proxies;

- Entender o que é e como utilizar um firewall;

- Gerenciar regras no firewall padrão do linux.

---

## Por que isso é importante?

Já somos capazes de desenvolver aplicações com front-end e back-end para diferentes propósitos, utilizando diversos recursos. Além disso, já somos capazes de publicar essas aplicações também!

Na última aula, vimos como funcionam as redes de computadores e a internet, com seus protocolos e modelos que permitem que qualquer pessoa, de sua casa, troque informações com outras pessoas de vários lugares do mundo, de maneira fácil e rápida.

Seguindo a mesma ideia, quando publicamos um site, uma plataforma ou um conteúdo na internet, estamos tornando-o acessível ao mundo inteiro. Isso é incrível não é?!

Porém, temos que lembrar que nem todas as pessoas na internet são bem intencionadas e, ao tornar algo público na internet, seja um site ou um servidor, expomos esse algo a essas pessoas.

<%= figure(%{src: "https:\/\/media.giphy.com/media/YQitE4YNQNahy/giphy.gif", caption: "Hacker em ação", class: "text-center rounded mx-auto d-block", width: "510px", height: "auto"}) %>

Mas calma! Essas questões já são alvo de diversos estudos e existem diversos padrões, protocolos e ferramentas que nos ajudam a ter uma boa experiência na internet, contribuindo com a nossa segurança, dos nossos dados e das nossas aplicações.

Aliás, como já vimos no conteúdo sobre computadores e um pouquinho da sua história, um dos primeiros computadores, a máquina `"Bombe"`, foi criada por Alan Turing justamente para resolver problemas com criptografia. No caso, aliás, para quebrá-la 🧐. Entretanto, esse  caso, além de contribuir para a origem de um dos primeiros computadores, também permitiu com que a guerra tomasse outros rumos.

Desta forma, podemos ver que desde seus primórdios a criptografia e segurança na comunicação é assunto de interesse e estudos e, para nós, como pessoas desenvolvemos e lidamos com o desenvolvimento e manutenção de sistemas nesse universo, seja de aplicações ou de outras arquiteturas de computação, precisamos saber utilizá-las.

Além disso, ao prover segurança em nossas aplicações, também geramos confiança às pessoas que irão utilizá-la: imagine que você criou um _e-commerce_: as pessoas irão fornecer dados pessoais extremamente sensíveis para efetuar compras nele, como CPF e o número do cartão de crédito. Dessa maneira, elas precisam se sentir seguras para utilizar a plataforma. Além de toda a segurança que precisamos pensar para manipular, armazenar e processar os dados fornecidos, também precisamos ter os cuidados para que uma pessoa mal intencionada não intercepte a comunicação entre a aplicação _cliente_ e nossos servidores e cause algum problema.

Dessa forma, saber utilizar e explicar o funcionamento de um certificado, uma criptografia ou uma ferramenta que seja capaz de nos dar uma camada a mais de segurança é fundamental!

---

## Conteúdo:

###### Tempo sugerido para realização: 120 minutos

### Protocolos Seguros

Na última aula aprendemos o que são os protocolos e quais são os principais e como eles são utilizados nas redes na arquitetura TCP/IP.

Hoje vamos aprender sobre os protocolos HTTPS, SSH, TLS e SSL, que são protocolos projetados para fornecer segurança.

#### SSL/TLS e HTTPS

Tanto o SSL (_Secure Sockets Layer_) quanto o TLS (_Transport Layer Security_) são protocolos que implementam uma camada (layer) de segurança na rede e, de maneira simples, o TLS é o sucessor do SSL.

Já o HTTPS (Hyper Text Transfer Protocol Secure) nada mais é do que o protocolo HTTP que vimos anteriormente, mas com uma camada adicional de segurança que utiliza o protocolo SSL/TLS.

Vamos ver o vídeo abaixo explicando um pouco mais sobre o assunto:

##### ⚠️ Não se preocupe em entender todos os detalhes que é falado na parte "acelerada" do vídeo. O importante é entender o porquê e como eles são utilizados.

<%= youtube_video "eOsGqXy2vmA" %>

#### SSH

Agora vamos falar um pouquinho de outro protocolo, o SSH. Com ele conseguimos realizar um acesso seguro a um servidor mesmo em uma rede não segura.

Assista o vídeo abaixo:

<%= youtube_video "v_cVEpESG3g" %>

#### Resumo SSH, HTTPS e TLS

Com certificados, e utilizando os protocolos HTTPS e TLS, conseguimos fornecer um ambiente muito mais seguro para publicar nossas aplicações na internet, transmitindo confiança às pessoas que as utilizarão e aumentando sua segurança.

Com o SSH conseguimos "fechar" uma conexão segura entre _client_ e _server_, evitando que nosso tráfego seja interceptado por pessoas terceiras e que tenhamos dados ou informações roubadas, por exemplo.

Com esses protocolos conseguimos garantir que somos quem somos e também que estamos de fato nos comunicando com quem queremos, evitando que alguém se passe por um dos lados da comunicação ou intercepte nossas conexões.

Tudo isso é possível graças aos algoritmos de criptografia, que estão presentes na história dos computadores desde seu início. Lembra da "Bombe", de Alan Turing, que comentamos agora a pouco? Para relembrar e/ou se aprofundar nesses conceitos assista aos vídeos abaixo:

- [Vídeo - Criptografia | Nerdologia](https://www.youtube.com/watch?v=_Eeg1LxVWa8) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Vídeo - Criptografia de Chave pública | Khan Academy](https://www.youtube.com/watch?v=63H4Idhn1Kc) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Vídeo - A máquina de criptografia enigma | Khan Academy](https://www.youtube.com/watch?v=7Pk4ILrd_oI) {: .external-link target="_blank" rel="noreferrer noopener" }

Graças aos avanços que tivemos a partir desses estudos conseguimos, hoje, realizar diversos tipos de transações com segurança na internet.

Outro exemplo legal de utilização desses protocolos em nosso dia-a-dia é, por exemplo, ao _clonarmos_ um repositório do git. Quando queremos trocar dados entre nossa máquina e o servidor, podemos fazê-lo utilizando tanto via HTTPS como através de SSH, utilizando as chaves SSH.

### Firewall e Proxy

Agora que já sabemos como lidar com certificados e com alguns dos principais protocolos de segurança para a internet, vamos ver outro problema bem comum que podemos ter que lidar com.

#### DoS / DDoS

Imagine que temos uma aplicação publicada. Estamos utilizando as melhores práticas de desenvolvimento e também já estamos utilizando um certificado e o protocolo HTTPS.

Nosso site está hospedado em um servidor, um computador com memória, processador, disco, enfim. Esses recursos, como sabemos, são limitados, como com qualquer máquina. Nossa aplicação, porém, recebe relativamente poucos acessos por dia e esses recursos são o suficiente para ela funcionar normalmente.

Entretanto, nossa aplicação está publicada na internet e, dessa forma, exposta ao mundo inteiro. Então vamos imaginar que mais uma vez uma pessoa mal intencionada resolva "bombardear" nossa aplicação com diversos acessos simultâneos. Isso pode ser feito de diversas maneiras, e esse ataque é chamado de DDoS (_Distributed Denial of Service_), ou ataque distribuído de negação de serviço. Esse ataque tem como objetivo tirar o serviço do ar, tornando-o temporariamente indisponível.

O gif abaixo exemplifica bem o conceito desse ataque:

<%= figure(%{src: "https:\/\/thumbs.gfycat.com/GreedySafeHammerheadshark-size_restricted.gif", caption: "Analogia a DDoS. Cada peixe é um acesso.", class: "text-center rounded mx-auto d-block", width: "310px", height: "auto"}) %>

Um exemplo desse ataque foi o [sofrido pelo github em 2018](https://www.tecmundo.com.br/seguranca/127777-ddos-github-maior-ataque-negacao-servico-historia.htm) {: .external-link target="_blank" rel="noreferrer noopener" }, considerado um dos maiores já registrados. Para se ter uma ideia, foram **1,35 terabit** recebidos por segundo de tráfego, porém, devido a infraestrutura, o serviço só ficou fora por cerca de 10 minutos e, depois, sofreu algumas instabilidades ao longo do dia.

Veja o vídeo abaixo falando um pouco mais sobre o assunto:

<%= youtube_video "MZEYzYDJAkQ" %>

O gif abaixo exemplifica como um ataque desses acontecem, utilizando diversas máquinas para enviar tráfego para alguns servidores:

<%= figure(%{src: "https:\/\/i.makeagif.com/media/10-05-2015/x300Ym.gif", caption: "Exemplo DDoS", class: "text-center rounded mx-auto d-block", width: "810px", height: "auto"}) %>

Precisamos, também, estar atentos contra esse tipo de ataque. Provavelmente não teremos que lidar com ataques de terabits, porém, aplicações menores utilizam máquinas menores. Assim sendo, nesses cenários há menos capacidade para enfrentar esse tipo de ataque, tendo a possibilidade de ficarem indisponíveis com ataques de escala bem menores do que este que estamos utilizando de exemplo.

#### Brute Force

Um outro ataque ao qual podemos estar vulneráveis é o conhecido como "brute force", ou ataque de "força bruta", onde indivíduos, robôs ou scripts maliciosos que tentam diversas combinações de usuário e senha, por exemplo, com o objetivo de encontrar as corretas e acessar indevidamente um sistema. Existem diversos métodos de tornar esse ataque mais efetivo. Por exemplo, o uso de listas de palavras com senhas e usuários comuns, tal como usuário "admin" e senha "123456" (por incrível que pareça as pessoas utilizam esse tipo de senha fraca até hoje).

Além de sempre utilizarmos senhas fortes e outros métodos de segurança pessoais com os nossos logins (uso de segundo fator de autenticação e outros cuidados com as senhas), podemos também configurar camadas de proteção extra em nossos servidores para mitigar essas vulnerabilidades.

Agora que já entendemos um pouco dos riscos e a importância da nossa atenção para isso, vamos ver como podemos proteger nossa aplicação contra esses ataques. É aqui que entram os firewalls!

#### O que são firewalls?

Firewall, em uma tradução mais livre, significa muro de fogo, ou porta corta fogo, aquelas portas "de escada", utilizadas para evitar a passagem de fogo em caso de incêndios. De maneira semelhante, os firewalls são responsáveis por impedir ou permitir a passagem de determinados tráfegos em uma rede, seja de entrada ou saída.

Veja o vídeo abaixo que define o que são os firewalls e suas principais características:

<%= youtube_video "Qg7mhOXH7QY" %>

#### Iptables e Netfilter

Na maioria dos sistemas operacionais existem subsistemas de filtragem de pacotes e ferramentas para gerenciamento de firewall. O sistema padrão para filtragem de pacotes do linux é o [**Netfilter**](http://netfilter.org/) {: .external-link target="_blank" rel="noreferrer noopener" }. Existe uma ferramenta utilizada para configurar o Netfilter chamada **Iptables**, que opera nas camadas 2 e 3 do modelo OSI. O Iptables é, então, o firewall padrão do linux e está presente na maioria das distros.

Como funciona o Iptables?

Ele compara o tráfego de rede que recebe ou envia com um conjunto de regras pré estabelecidas. Essas regras definem as características que um pacote deve possuir e a ação que deve ser tomada para esse tipo de pacote. Podemos criar regras por protocolo, porta de origem/destino, endereço IP, entre outros. Quando ocorre a correspondência de um pacote a uma característica estabelecida em uma regra é então tomada a ação, que pode ser, por exemplo, se aquele pacote será aceito, rejeitado ou registrado em um arquivo de log.

Como diz o próprio nome, a arquitetura do Iptables é formada por "tabelas". Essas tabelas também são conhecidas como cadeias e cada uma possui tipos de regras específicas. Por exemplo, a cadeia "filter" que possui todas políticas (regras) responsáveis por controlar o tráfego que entra ou sai do computador.

#### Fail2ban

O fail2ban é um IPS (_Intrusion Prevention System_ - Sistema de Prevenção de intrusos). Essa ferramenta, de maneira simples, monitora os logs da rede e, de maneira proativa, ao detectar comportamento suspeito, como diversas requisições de um mesmo IP ou diversas tentativas de login SSH, ele criar regras `noiptables`, de modo a rejeitar aquele endereço de IP específico por determinado tempo.

Vamos a mais um vídeo com um exemplo dessa ferramenta em ação:

<%= youtube_video "IPyEGc2hXog" %>

### Proxy

Outro componente que pode fornecer mais uma camada de segurança quando falamos de redes é o proxy. O proxy provém uma camada a mais de controle entre a internet e os dispositivos da rede, e pode ser utilizados para diversos fins.

Um uso comum dos proxies é como uma espécie de filtro que, através de características de uma conexão, ou tráfego, consegue determinar se esse tráfego deve ser feito ou não. Por exemplo, para evitar acessos a redes sociais em escritórios o proxy pode ser utilizado para reconhecer palavras chaves em URLs e então recusá-la. Além disso, eles podem impedir que pessoas usuárias acessem sites com conteúdos impróprios ou com potencial de ser uma página maliciosa.

Veja o vídeo abaixo explicando um pouco mais sobre eles:

<%= youtube_video "_Uyify7zOsA" %>

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

Vamos juntar tudo o que aprendemos até aqui e exercitar mais ainda nosso aprendizado!

#### Considerações MacOS

Se você está utilizando MacOS, por favor, leias essas considerações. Caso contrário, pode seguir adiante para os exercícios.

Conforme explicado na aula ao vivo, como o uso avançado de firewalls é mais comum em servidores, sendo esses mais comuns estarem utilizando linux ou windows, demos uma atenção maior ao `iptables`, que provavelmente será o firewall com o qual iremos lidar no nosso dia-a-dia.

Porém, não podemos te deixar de fora da prática! Sendo assim, iremos passar um passo a passo sobre como você irá configurar uma máquina Linux no seu computador através do `docker`. Para começar, você precisa de instalar o `docker` no seu computador. Para isso, utilize o comando `brew` para auxiliar:

```language-bash
$ brew cask install docker
```

Em seguida, execute o aplicativo do `docker`, que foi instalado na sua máquina através do **brew cask**, dê privilegio para o `docker` passando a sua senha e pronto! O docker já está rodando! Para testar, execute o comando abaixo:

```language-bash
$ docker ps
```

Tudo certo até então? Agora rode o comando abaixo para subir uma máquina Linux com a distro `ubuntu 20.4`. Estamos passando a tag `--privileged` para que você consiga executar os comandos dos exercícios sem problemas de permissão de `host`:

```language-bash
$ docker run --privileged -it ubuntu:20.04 bash
```

Beleza, com a máquina Linux rodando, execute os comandos abaixo para instalar o `iptables`, o `ping` e o `traceroute`:

```language-bash
$ apt-get update && apt-get install iputils-ping

$ apt-get update && apt-get install traceroute

$ apt-get update && apt-get install iptables
```

Agora rode os comandos abaixo para testar se está tudo certo:

```language-bash
$ ping google.com

$ traceroute google.com

$ iptables -L
```

Se algum deles não funcionar, reinicie o `docker` através do ícone na barra de tarefas, próximo à data e hora do computador. Em seguida, teste novamente.

Feito tudo isso, você já tem uma máquina linux sendo executada no seu computador e já está apta ou apto a fazer os exercícios abaixo!

#### Exercícios

Agora vamos colocar em prática todo o conteúdo que vimos. Para isso faremos alguns exercícios práticos utilizando nossos conhecimentos sobre firewall.

**Exercício 1**: Defina uma regra de firewall utilizando o comando `iptables -A`, que bloqueie (`block` ou `REJECT/DROP`) toda a entrada (`in` ou `INPUT`) de pacotes utilizando o protocolo `ICMP`, impedindo assim que a máquina responda ao comando `ping`. Lembre-se, você pode executar o comando `ping` para validar se sua regra está funcionando corretamente: `ping 127.0.0.1` (você pode adicionar o parâmetro `-O` para exibir os pings rejeitados também 😉).

**Exercício 2**: Exclua a regra anterior utilizando o parâmetro `-D`.

**Exercício 3**: Agora vamos criar uma regra para bloquear o tráfego HTTPS. Para isso, iremos bloquear a saída de pacotes (`out` ou `OUTPUT`). Lembre-se, a porta padrão para esse protocolo é a `443`, para especificá-la utilize o parâmetro `--sport`. Ele utiliza também o protocolo `tcp`. Para testar sua regra, tente acessar um site pelo navegador que use o protocolo, como o Youtube, o Google ou o Facebook.

**Exercício 4**: Bloqueie agora o tráfego de saída para HTTP. Lembre-se, também é utilizado o protocolo `tcp` e a porta `80`. Para testar sua regra, tente acessar um site pelo navegador que use `HTTP`.

**Exercício 5**: Para finalizar, vamos limpar todas as regras. Para isso, utilize o comando `--flush` do iptables (Linux).

**Exercício 6**: Agora, vamos utilizar um tipo de proxy bem legal que pode ser bastante útil no nosso dia como pessoas desenvolvedoras: o [_NGROK_](https://ngrok.com/) {: .external-link target="_blank" rel="noreferrer noopener" }. Com ele conseguimos criar um túnel para o nosso `localhost`.

1. Crie um servidor HTTP em sua máquina executando na porta `80`, pode ser um front-end ou um back-end criado em aulas anteriores.

2. Baixe o ngrok e extraia o arquivo baixado em uma pasta de sua preferência, conforme instruções no [site oficial](https://ngrok.com/download) {: .external-link target="_blank" rel="noreferrer noopener" }.

3. Conforme instruções do site, crie um túnel para a porta `80` de sua máquina.

4. Acesse o o link disponibilizado em seu navegador. Utilize ele para acessar de outros dispositivos, como seu smartphone ou outro computador 😎.

<%= figure(%{src: "/computer-science/network-security/images/hackerman.jpg", class: "rounded mx-auto d-block", width: "800px", height: "auto", alt: "Hackerman"}) %>

**Exercício 7**: No conteúdo vimos o que são os protocolos SSL e TLS. Vamos subir nosso próprio servidor HTTPS, utilizando nosso próprio certificado!

1. Vamos utilizar a ferramenta [OpenSSL](https://www.openssl.org/) {: .external-link target="_blank" rel="noreferrer noopener" } para gerar nossos certificados. Ela já vem instalada na maioria das distro Linux.

2. Para gerar nosso próprio certificado auto-assinado, utilize os comandos abaixo. Lembrando que, como nós estamos gerando o certificado, ele não será reconhecido por nenhuma entidade certificadora, de modo que ele só nos servirá para utilizar o protocolo TLS com o HTTPS, não sendo capaz de ser aceito pelo navegador.

```language-bash
$ openssl genrsa -out key.pem
$ openssl req -new -key key.pem -out csr.pem
$ openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
$ rm csr.pem
```

3. Acabamos de gerar dois arquivos, o `cert.pem` (o certificado) e o `key.pem` (chave privada). Copie os dois arquivos para um diretório onde iremos criar nosso server HTTPS, utilizando o [modulo HTTPS do Node.js](https://nodejs.org/api/https.html) {: .external-link target="_blank" rel="noreferrer noopener" }.

4. Siga [a documentação do módulo](https://nodejs.org/api/https.html#https_https_createserver_options_requestlistener) {: .external-link target="_blank" rel="noreferrer noopener" } para criar seu servidor HTTPS.

5. Acesse o servidor utilizando o navegador. Perceba que ele irá informar que o certificado não é reconhecido por ele, pois não foi assinado por nenhuma entidade da confiança dele.

6. Acesse o servidor novamente, porém, desta vez utilizando cURL.

7. Por último, vamos utilizar um recurso do cURL, somente para testes (somente utilize, caso realmente você esteja esperando por aquilo), que é o parâmetro `-k` ou `--insecure`. Com ele, falamos para o nosso cURL prosseguir a request mesmo sabendo que a conexão não é "confiável".

### Bônus

**Exercício 8**: Crie uma conta no _Ngrok_ e explore o dashboard disponibilizado por ele para monitorar seus túneis. Aproveite e explore outros recursos dessa poderosa ferramenta.

---

## Recursos Adicionais

- [Vídeo - Beginners Guide To SSH](https://www.youtube.com/watch?v=qWKK_PNHnnA) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Vídeo - SSH Tunneling Explained](https://www.youtube.com/watch?v=AtuAdk4MwWw) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Vídeo - SSH Tunneling - Local & Remote Port Forwarding (by Example)](https://www.youtube.com/watch?v=N8f5zv9UUMI) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Artigo - Como Configurar um Firewall no Ubuntu 18.04 com UFW](https://www.hostinger.com.br/tutoriais/firewall-ubuntu-ufw) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Artigo - SSH, Como funciona e técnicas de criptografia](https://www.hostinger.com.br/tutoriais/como-funciona-o-ssh) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Artigo - Guia completo sobre o protocolo SSH](https://www.valuehost.com.br/blog/protocolo-ssh/) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Artigo - SSH: o acesso remoto aos servidores | Alura](https://www.alura.com.br/artigos/como-acessar-servidores-remotamente-com-ssh) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Artigo - Protegendo seu servidor com IPTables | Alura](https://www.alura.com.br/artigos/protegendo-seu-servidor-com-iptables) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Artigo - O que é SSL / TLS e HTTPS?](https://www.hostinger.com.br/tutoriais/o-que-e-ssl-tls-https) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Vídeo - A importância do DNS nas redes, explicada pelo NIC.br.](https://www.youtube.com/watch?v=epWv0-eqRMw) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Artigo - Mitigando ataques de força bruta no Linux com fail2ban](https://kamarada.github.io/pt/2019/12/14/mitigando-ataques-de-forca-bruta-no-linux-com-fail2ban/) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Artigo - Proteja-se com o firewall iptables](https://kamarada.github.io/pt/2019/11/18/proteja-se-com-o-firewall-iptables/) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Dica - ngrok | Publicando seu localhost com túneis seguros](https://ngrok.com/) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Vídeo - Como HTTPS funciona?](https://www.youtube.com/watch?v=T4Df5_cojAs) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
