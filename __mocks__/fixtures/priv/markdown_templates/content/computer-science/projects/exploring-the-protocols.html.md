## O que vamos fazer?

Nesse bloco aprendemos os principais conceitos sobre a arquitetura dos computadores e de redes, como os recursos de hardware são utilizados e gerenciados pelo sistema operacional e como a internet e as diversas redes funcionam com seus diversos protocolos. Agora, você irá configurar uma API que utilizará esses conhecimentos.

Dessa forma reforçaremos vários conceitos e habilidades que vimos durante esse conteúdo, vendo na prática como funciona o modelo de cliente servidor e alguns dos principais protocolos de rede.

---

## Por que isso é importante?

Conforme aprendemos nas últimas aulas, conhecer a base do funcionamento dos computadores e das redes e suas arquiteturas nos permite utilizá-los melhor e de maneira mais eficiente, entendendo de fato o porquê de fazer algo de uma maneira ou de outra que envolva esses conceitos.

Diariamente estamos lidando com diversas máquinas e seus recursos, assim como as diversas redes.

Afinal, em nossa jornada até aqui, desenvolvemos diversos aplicativos feitos para rodar na WEB, que utilizam os diversos protocolos e outros conceitos, assim como utilizam o SO e a arquitetura dos computadores.

Além disso, teremos conhecimento para desenvolver soluções melhores, assim como lidar com ambientes/servidores publicados na internet, conhecendo alguns dos perigos de ter uma aplicação exposta a internet e sabendo como agregar segurança a ela.

---

## Especificação

###### Tempo sugerido para realização: 1 dia

### O que vamos avaliar?

- Os arquivos de especificações deverão conter exatamente as configurações pedidas;

- Os códigos deverão ser adaptados conforme proposto;

- A organização e a aderência do código à especificação.

- O arquivo com as instruções para execução do projeto deverá conter os comandos e o passo-a-passo conforme especificação;

- Todas as adaptações e configurações deverão ser funcionais, de maneira a se comportarem conforme o esperado.

### O que devo desenvolver?

Este trabalho será individual.

O projeto consiste em um servidor HTTP que deverá ser refatorado para responder à requisições com algumas informações do _client_. Entretanto, o _server_ não utilizará nenhum módulo HTTP, somente o módulo para a camada de transporte **TCP**, sendo assim necessário interpretar e responder as informações do HTTP "manualmente".

Durante o projeto, iremos passar pelas camadas da pilha de protocolos **TCP/IP**, explorando os protocolos HTTP, TCP, IP e Ethernet.

Utilizaremos, também, o _ngrok_ como um proxy, criando um túnel para o nosso projeto, permitindo o acesso ao nosso `localhost` a partir de outros dispositivos e redes.

Leia o arquivo `README.md` do projeto com atenção para uma explicação detalhada de como desenvolver e entregar seu projeto.

---

## Entregáveis

Para entregar o seu projeto, você deverá criar um _Pull Request_ para o repositório no **GitHub**. Consulte o **canal do Slack da turma** para obter os endereços dos repositórios.

Esse _Pull Request_ deverá conter o projeto com as alterações solicitadas, conforme proposto **no `README.md` do projeto principal**.

##### Fique atento e siga as instruções no README.md do repositório do projeto principal! 🥺

Qualquer dúvida procure a monitoria.

Lembre-se que você pode consultar nosso conteúdo sobre [Git & GitHub](/fundamentals/git) sempre que quiser!

---

## Próximo

<%= next_button(@conn) %>
