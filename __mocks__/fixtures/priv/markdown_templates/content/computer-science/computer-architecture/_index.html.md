## O que vamos aprender

Você já parou para pensar em como os computadores são capazes de fazer tudo que eles fazem através de 0s e 1s? Em como eles, com eletricidade, fazem tudo o que fazem? No conteúdo de hoje você aprenderá os principais conceitos da arquitetura das máquinas que nos acompanham diariamente e dos sistemas que as gerenciam, os Sistemas Operacionais.

---

### Você será capaz de

- Conhecer os principais conceitos da arquitetura básica de computadores;

- Entender o funcionamento básico de uma CPU e suas características;

- Compreender o funcionamento da memória principal do computador;

- Conhecer os tipos de memória e suas diferenças (RAM, HD, SSD, etc.);

- Entender como os sistemas operacionais atuam nas máquinas e seus principais conceitos.

---

## Por que isso é importante?

Ao utilizar o Linux, abrir o terminal, navegar na internet para acessar este conteúdo que você está lendo agora, e em tudo que utilizamos no computador, estamos interagindo com os softwares: a parte lógica dos computadores que acessa a parte física dos mesmos, o hardware.

<%= youtube_video "pNZq8BCS-Bc" %>

Tudo isso funciona a partir de uma arquitetura que permite que diversos componentes eletrônicos se comuniquem sincronizadamente, cada um com sua devida função e comportamento. Isso que dá vida aos computadores. A partir da eletricidade que entra nos computadores os mesmos conseguem realizar diversas operações matemáticas e lógicas. A partir disso, conseguimos gerenciar arquivos em nosso computador, desenvolver novos programas, assistir a um vídeo no youtube, jogar um game online e criar gráficos em uma planilha.

Já imaginou como tudo isso é feito? Como a eletricidade se transforma números e como esses números são convertidos para interfaces gráficas e operações? No conteúdo de hoje, iremos mais a fundo nesses conceitos para entender as bases que permitem que tudo isso seja possível. Veremos com mais detalhes como os seus vários componentes trabalham e o quão incríveis são os computadores, em sua essência, ao permitir fazermos tantas coisas apenas utilizando `0`s e `1`s.

A partir desses conhecimentos, conseguiremos entender melhor o funcionamento dos computadores e como podemos tirar melhor proveito deles em nosso dia-a-dia, além disso seremos aptos a tomar melhores decisões técnicas levando em conta esses conhecimentos.

---

## Conteúdo:

###### Tempo sugerido para realização: 90 minutos

### Um pouco de história!

Antes de entrarmos de cabeça no funcionamento dos computadores e de seus componentes, precisamos antes conhecer o que eles são, como eles surgiram e as principais pessoas que contribuíram com essa história.

<%= figure(%{src: "https:\/\/i.imgur.com/16wAdxY.gif", class: "text-center rounded mx-auto d-block", width: "810px", height: "auto", caption: "Você é uma máquina?"}) %>

#### Alan Turing e os primeiros computadores

Não podemos falar sobre computadores sem falar sobre Alan Turing, considerado o pai da computação. Assista o vídeo abaixo que conta um pouco de sua história.

---

<%= youtube_video "8rRzDQAr7xc" %>

---

Conforme vimos no vídeo, Alan Turing teve um papel fundamental na história dos computadores, sendo o responsável pelo conceito dos computadores modernos. Assista agora o vídeo abaixo que conta um pouco sobre as máquinas que antecederam a _Bombe_ e outros nomes de pessoas que contribuíram com essa história.

---

<%= youtube_video "wyZPsCQd7Uo" %>

---

### Computadores Modernos

#### Modelo de Von Neumann

Quando pensamos na palavra _computador_, logo vem em nossa mente a imagem de um PC ou notebook. Mas, além destes, utilizamos diversas outras máquinas em nosso dia-a-dia que seguem os princípios básicos do que constitui um computador: celulares, tablets, video-games, smartwatches e mais.

A maioria desses dispositivos funciona baseada no modelo inventado em 1945 pelo matemático _John Von Neumann_, o **Modelo de Von Neumann**. Esse modelo define um computador como uma máquina que possui dois elementos principais: uma memória principal (como a memória RAM), onde podemos registrar e ler instruções e dados, e um processador (CPU), responsável por buscar tais informações, realizar os cálculos e armazenar os resultados novamente na memória.

Vamos ver com mais detalhes como cada um desses componentes funcionam juntos e individualmente.

### Lógica binária

Tendo noção de como figuras como Von Neumann e Turing idealizaram e trabalharam na construção dos primeiros computadores, vamos dar um passo atrás pra compreender um conceito fundamental, a lógica binária.

O sistema binário foi inventado pelo matemático alemão Gottfried Leibniz, no século 18.


Os computadores processam informações baseando-se no sistema binário com os que são chamados bits. Um bit é a menor unidade em um sistema digital e pode assumir o valor `0` ou `1`. Eletronicamente esse valor pode ser representado por correntes elétricas de alta (`1`) ou baixa (`0`) tensão.

O bit, que é representado por um "b" (minúsculo) e o agrupamento de 8 bits correspondem à 1 byte, representado por um "B" (maiúsculo). 1 byte é capaz de armazenar um valor decimal entre 0 e 255 (`0000 0000` e `1111 1111`).

Relembre também as unidades de medidas com a tabela abaixo:

<%= figure(%{src: "/computer-science/computer-architecture/images/bits_bytes.png", class: "text-center rounded mx-auto d-block", width: "410px", height: "auto", caption: "unidades de medidas"}) %>

Em resumo:

- A presença de eletricidade pode abrir um caminho para a corrente passar ou fechá-lo. Corrente é verdadeiro, `1`, e sem corrente é falso, `0`. Isso são os chamados **transistores**;

- Transistores podem ser agrupados de maneira a formarem as **portas lógicas** NOT, AND, OR, XOR entre outras. Portas lógicas são tais que, dada uma mesma entrada (conjunto de ~~fios com ou sem eletricidade~~ 0s e 1s), apresenta sempre a mesma saída;

- Portas lógicas podem formar circuitos de soma de bits. Daí temos adição, subtração, multiplicação, divisão, e assim sucessivamente, sempre seguindo a lógica binária.

Temos, após essa longa jornada, um conjunto de circuitos capaz de ler valores, dá-los como saída e capaz de fazer operações com eles. Temos a cabeça leitora da máquina de Turing, ou, os princípios de um processador! Falta aqui só um componente fundamental: a memória!

---

### Memória Principal - RAM

Um dos componentes principais para o funcionamento mais básico do computador é o uso de uma memória principal para armazenamento das instruções e dos dados que serão processados. A memória principal é a famosa memória RAM dos nossos PCs. Não confunda com outros tipos de memória como HDs e pendrives, falaremos desses mais adiante.

#### Uma grande biblioteca

A memória principal pode ser vista como uma grande biblioteca, possuindo diversas prateleiras, cada uma com a capacidade de armazenar alguns livros. Para organizar e tornar fácil a localização de um livro entre os corredores e seções, cada prateleira possui um identificador único, um endereço, que permite que um livro específico seja facilmente localizado.

#### Células

Essas diversas "prateleiras" são as **células** da memória principal, cada uma sendo capaz de armazenar uma informação (ou um fragmento de uma) e, para localizá-las, são utilizados seus endereços, os chamados _ADDRESSES_ ou **ADDR**.

Cada célula pode armazenar diversas informações como dados para serem processados, incluindo endereços de outras células, instruções e resultados de processamentos. Essas informações são armazenadas em _bits_ e as células possuem uma capacidade limitada de armazenamento: por exemplo, 8 bits (1 byte) por célula.

<%= figure(%{src: "/computer-science/computer-architecture/images/RAM_cell.jpg", class: "text-center rounded mx-auto d-block", width: "80px", height: "auto", caption: "Exemplo de uma célula com 1 byte"}) %>

A capacidade total da memória é dada pela quantidade de suas células vezes a capacidade de armazenamento de cada uma. Por exemplo, uma memória com 1024 células de 8 bits (1 byte) tem a capacidade de armazenar 1024 bytes (8192 bits), ou 1KB (você pode imaginar como são formadas aquelas memórias de 4GB ou 8GB).

#### Endereços

Cada célula possui um endereço único que é chamados de _address_ ou _ADDR_, e estes são um conjunto de números que, para o computador, é representado por um número binário como todo o resto, ou seja, utilizando somente os dígitos 0 ou 1.

<%= figure(%{src: "/computer-science/computer-architecture/images/RAM_cell_address.jpg", class: "text-center rounded mx-auto d-block", width: "200px", height: "auto", caption: "Exemplo de duas células, endereçadas 0 e 1, com seus conteúdos"}) %>

A quantidade de dígitos utilizados para representar um endereço varia e, com ela, a quantidade de células endereçáveis. Por exemplo: se utilizarmos apenas 1 dígito, só poderemos localizar duas células: uma com endereço #0 e outra com o endereço #1; agora se tivermos 2 dígitos, poderemos ter os endereços #00, #01, #10 e #11 e assim por diante. Normalmente a memória principal de um computador possui milhares de endereços possíveis e mesmo computadores de pequeno porte possuem algumas centenas de células na memória.

##### ⚠️ Lembre-se que o conceito de computador aqui vai além dos nossos computadores pessoais, estamos seguindo o modelo de Van Neumann, dessa forma, essas características são válidas para diversos dispositivos, como seu smartphone, tablet, alguns computadores de bordo de veículos, entre outros que usam essa arquitetura. As "máquinas de Turing" estão por toda parte!

### Processador - CPU

A CPU, ou unidade central de processamento, funciona em conjunto com a memória principal, lendo e executando as instruções e dados armazenados nela e gravando o resultado de tais processamentos. Um de seus componentes é a `ALU` (unidade lógico-aritmética) que estudamos lá em cima!

O processador possui células internas de memória, chamadas de **registradores**. Neles o processador irá armazenar os dados lidos da memória que está usando no processamento. As operações a serem realizadas também são representados como números na memória, e um conjunto delas forma o que chamamos de uma instrução. Por exemplo: realizar uma soma. A CPU funciona executando um _loop_ desde sua inicialização, onde ela realiza a leitura de algumas instruções pré-definidas, executa elas e então passa a buscar e consequentemente a executar as instruções na memória.

A CPU pode ler da memória uma instrução, por exemplo, indicando para definir o valor do endereço `#1000 0000` para `1000 1010`. A partir disso, ela enviará um comando para a memória principal para atribuir o valor `1000 1010` para a célula de endereço `#1000 0000`. Da mesma forma, o processador consegue realizar outras operações matemáticas básicas buscando os dados de entrada e as instruções na memória e, então, salvando os resultados também na memória principal.

Dessa forma, tudo no computador é sempre tratado como como dados e instruções e tudo utilizando números através da representação binária. Pense no que é um monitor de computador: uma matriz, por exemplo, de pequenas luzinhas que chamamos de **pixels**. Cada pixel é composto por três luzes: uma vermelha (`R`), uma verde (`G`) e uma azul (`B`). Um byte codifica, em oito bits, o quão intensamente cada uma dessas luzinhas deve se acender. Se tivermos 1024x726 bytes reservados para nosso monitor, por exemplo, podemos codificar como cada luz de um monitor dessa resolução deve se acender, e com operações matemáticas podemos mudar a configuração dessas luzes!

Começamos com teoria computacional e sinais elétricos, vimos estes se transformarem em lógica e agora conseguimos ter uma ideia, ainda que um tanto abstrata, de como o nosso computador opera! A seguir vamos trabalhar mais conceitos importantes para fundamentar bem as bases de nossa teoria!

#### Operações por segundo

Para gerenciar todas as atividades e a comunicação entre os componentes do computador existe um componente eletrônico que gera um sinal de "clock". Esse sinal é uma alternância entre tensões altas e baixas a cada fração de tempo, seguindo a mesma ideia de representação de 0 e 1.

A _frequência_ do clock é medida em _herts_ (Hz), ciclos por segundo. Ou seja, o número de operações básicas capazes de serem executadas em 1 segundo. O período de um clock é o tempo entre uma operação e outra.

Dessa forma, um computador com um processador com frequência de 1Hz consegue realizar uma operação básica por segundo. Esse número costuma ser muito maior, como 2GHz, que significa que essa CPU consegue realizar cerca de 2 bilhões de operações básicas (ciclos) por segundo, cada instrução demorando 0,0000000005 segundos ou 0,5 nanossegundos.

Um processador não consegue executar uma **instrução** por ciclo, pois normalmente uma instrução possui de 5 a 10 operações básicas e, cada uma dessas operações são executadas em um ciclo.

Atualmente, existem diversos tipos de processadores com diversos recursos para aumentar seu poder computacional, por exemplo, processadores multi-cores (com mais de um núcleo) com 4 ou 8 cores que conseguem processar muito mais instruções. Um quad-core (4 núcleos) com 2GHz, por exemplo, pode executar por volta de 1 bilhão de instruções por segundo, com algumas operações básicas cada uma.

### Barramentos

Agora que vimos um pouco como cada um desses dois componentes, memória e CPU, se comportam, vamos entrar um pouco mais a fundo no funcionamento dos dois em conjunto, que é o que de fato faz a "magia" acontecer.

Ambos componentes realizam a troca constante de informações: o processador está constantemente buscando por instruções na memória e dados a serem processados e devolvendo os resultados desses processamentos para a memória. E como isso é feito?

Para realizar essa troca são realizados dois tipos de operações, uma sendo a leitura da memória para carregar quais as instruções a serem executadas. Esses dados são lidos e gravados em registradores do processador, esse processo sendo chamado de _load_. E a outra operação é quando o processador precisa armazenar dados na memória, como os resultados dos processamentos e das operações que ele realizou durante uma operação, esse processo é chamado de _store_.

Essas comunicações dos componentes são realizadas a partir de "vias" que ligam os dois componentes. Essas vias são chamadas de **barramentos**, que são, você pode pensar, conjuntos de fios. Conforme vimos, ambos componentes utilizam números binários representados por correntes elétricas, dessa forma, os barramentos conseguem comunicá-los transmitindo essas correntes.

Basicamente a memória principal é ligada a CPU por 3 dessas vias:

- Endereço (ADDR): Indica o endereço da célula de memória para aquela operação;

- Dados (DATA): Transfere a informação da memória para a CPU e vice-versa.

- Controle (CTRL): Indica a "direção" dos dados para a operação, ou seja, se os dados serão transferidos da CPU para a memória (escrita) ou da memória para a CPU (leitura).

Vamos ver um exemplo desse componente com uma de suas vias, o barramento de endereço:

<%= figure(%{src: "/computer-science/computer-architecture/images/RAM_ADDR_BUS.jpg", class: "text-center rounded mx-auto d-block", width: "510px", height: "auto"}) %>

Perceba como há um fio responsável por transferir cada bit, tanto o tamanho dos dados como o tamanho do endereço irá respeitar o limite de suas respectivas vias. No nosso exemplo, a memória está recebendo um comando para operar a célula `1011 0001`, sendo necessários 8 fios para transmitir esse endereço.

Vamos ver como fica a arquitetura com os 3 barramentos. Repare no **sentido das setas**:

<%= figure(%{src: "/computer-science/computer-architecture/images/RAM_buses.jpg", class: "text-center rounded mx-auto d-block", width: "510px", height: "auto"}) %>

Dessa forma, podemos identificar que tanto as vias de endereço como a de controle são unidirecionais, ou seja, a informação sempre irá ser recebida pela memória. Já a via de dados é bidirecional, sendo definida a direção a partir do valor recebido pela via de controle indicando se é uma "escrita" ou uma "leitura".

Abaixo temos um novo exemplo simulando uma operação de leitura e uma de escrita. Perceba que o barramento de controle determina o sentido do barramento de dados:

- Quando `1`, temos uma escrita e consequentemente a nova informação, enviada através do barramento de dados. A informação é enviada para a memória e gravada na célula no endereço informado no devido barramento;

- Quando `0`, temos uma leitura e, então, o barramento de dados retorna com o valor lido na célula de endereço passado.

<%= figure(%{src: "/computer-science/computer-architecture/images/RAM_READ_WRITE.jpg", class: "text-center rounded mx-auto d-block", width: "710px", height: "auto"}) %>

No exemplo abaixo, temos os dois componentes interligados. Perceba como a CPU envia os dados de acordo com o necessário para executar a operação desejada.

<%= figure(%{src: "/computer-science/computer-architecture/images/RAM_CPU.jpg", class: "text-center rounded mx-auto d-block", width: "610px", height: "auto"}) %>

Sabe as linhazinhas que você vê nas placas de circuito? São barramentos como esses ligando as diversas peças de diversas formas!

### Tipos de Memória

Memórias são todos os dispositivos capazes de armazenar dados de maneira temporária ou permanente. Na arquitetura de computadores, dividimos as memórias em dois grandes grupos: **memórias primárias** e **memórias secundárias**.

Memórias primárias são onde os dados e programas em execução são armazenados de maneira temporária para serem processadas pela CPU, conforme vimos no modelo de Von Neumann. São memórias de acesso rápido, com armazenamento de um menor volume de dados, que em geral, não conseguem guardar a informação quando são desligados.

Memórias secundárias são onde os dados (arquivos) são armazenados. Possuem um acesso mais lento, mas são capazes de armazenar permanentemente grandes volumes de dados.

### Hierarquia das memórias

Vimos que a CPU, antes de processar uma instrução, busca as informações da memória principal para seus registradores internos, que usará para realizar as operações. Porém, esse espaço dos registradores internos é bem pequeno, sendo capaz apenas de armazenar o dado para aquela operação que está sendo executada no momento (alguns bytes).

Por isso, a CPU precisa constantemente trocar dados de seus registradores com a memória RAM. Perceba que esse processo precisa ser extramente rápido, caso contrário a CPU ficará ociosa aguardando a transferência de dados com a memória, "desperdiçando" seus ciclos, impactando diretamente na performance dos processamentos.

Para se ter uma ideia, a CPU acessa um dado em seus registradores quase que instantâneamente, em apenas um ciclo. Já para buscar um dado da memória esse tempo é um pouco maior: em computadores modernos, essa operação pode levar algumas centenas de ciclos, o que equivale a 1 microssegundo, o que parece bem rápido, porém, para a quantidade de leituras que são feitas para as execuções esse tempo se torna "uma eternidade"!

Com o avanço das tecnologias a velocidade das CPUs cresceu de maneira exponencial. A velocidade das memórias também, porém, sem conseguir acompanhar a evolução dos processadores. Além disso, a velocidade delas está diretamente relacionadas com seus preços: quanto mais rápidas, mais caras.

Para aumentar o poder dos computadores, os pesquisadores desenvolveram estratégias para lidar com essas questões de memória. A principal foi a criação de uma **hierarquia de memórias**. Essa hierarquia faz com que os dados que são acessados com mais frequência sejam armazenados em memórias de acesso mais rápido. Por exemplos, os dados que estão sendo trabalhados pela CPU. Enquanto isso, os outros dados acessados com menos frequência são armazenados em memórias mais baratas e lentas como, por exemplo, nossos arquivos no HD.

Em geral a hierarquia é composta da seguinte maneira:

<%= figure(%{src: "/computer-science/computer-architecture/images/memory_hierarchy.png", class: "text-center rounded mx-auto d-block", width: "510px", height: "auto"}) %>

Na ponta superior da pirâmide estão os **registradores**, estes são utilizados para armazenar um volume pequeno de dados, possuindo altíssima velocidade.

Na sequência temos os _caches_ **L1**, **L2** e **L3**. Esses componentes são de acesso mais rápido do que a memória principal (sendo o L1 o mais rápido, em seguida o L2 e depois o L3) e são integrados à CPU. As memórias cache são utilizadas para armazenar alguns dados de maneira estratégica, como os dados que são lidos com maior frequência na RAM. Dessa forma, ao terem os dados encontrados nesses dispositivos, não é necessário buscá-la na memória principal, aumentando a performance do computador, tendo em vista que as chamadas a eles são centenas de vezes mais rápidas do que para a RAM. Sabe o _cache do seu navegador_? Lá ficam os dados dos sites que você acessa com mais frequência! O navegador os recupera lá ao invés de ter que buscá-los láááá do servidor para ser mais rápido!

Seguindo a hierarquia temos as memórias RAM e as memórias ROM (Read-Only Memory), sendo essa segunda memória somente leitura, que são um tipo de memória que não permite a escrita de dados, porém seus dados não são perdidos quando ela é desligada. Em geral essas memórias são utilizadas para guardar configurações mais básicas do sistema como, por exemplo, os dados para inicializar alguns componentes do computador.

Por último temos as memórias secundárias, como HDs, SSDs, CD/DVDs, pendrives e afins. Esses dispositivos são mais lentos por fazerem a gravação física das informações nos dispositivos, porém, não perdem informações quando desligados e são capazes de armazenar grande volume de dados.

Vemos então, para concluir, que as memórias tem dois tradeoffs a se considerar:

- Velocidade **versus** estabilidade: memórias de escrita e leitura tendem mais instáveis na medida em que tem a leitura e escrita mais rápidas. Instável, aqui, significa que quando o computador é desligado os dados da memória são **apagados**! Nos HDs isso não acontece. Na memória RAM sim.
- Velocidade **versus** tamanho: quanto mais barato for espaço de armazenamento, mais lento vai ser esse acesso.

### Sistema Operacional

Quando apertamos o botão de ligar do computador, os componentes são ligados e em seguida o Sistema Operacional assume o controle da máquina, gerenciando seus diversos dispositivos e executando os processos básicos para seu funcionamento, normalmente finalizando com a apresentação de sua interface para que possamos interagir com ele.

A partir de então podemos logar no computador, abrir programas, jogar jogos, escrever e executar códigos, navegar na internet e executar diversas outras tarefas. Tudo isso é possível ser feito de maneira simples e amigável graças aos Sistemas Operacionais, de forma que todos os complexos processos que vimos a cima, assim como outros, sejam abstraídos de forma que possamos nos preocupar somente em realizar a tarefa que desejamos, sem mesmo nos preocupar de como tudo isso é feito por debaixo dos panos.

<%= figure(%{src: "/computer-science/computer-architecture/images/SO.png", class: "text-center rounded mx-auto d-block", width: "210px", height: "auto"}) %>

Esse foi o motivo que os sistemas operacionais impulsionaram a revolução dos computadores, permitindo que usuários comuns, sem prévios conhecimentos de ciência da computacional e eletrônica pudessem utilizar de maneira fácil essas poderosas máquinas.

<%= youtube_video "Vb0iORewZDA" %>

### Sistema Operacional - Gerenciamentos

Windows, MacOS, Linux e outros SOs (como Android, iOS, etc!) possuem vantagens, desvantagens e particularidades. Apesar de suas diferenças, os diversos sistemas operacionais compartilham de um conceito principal: realizam a gerência do hardware e dos softwares, controlando os processos, arquivos, memória, rede e os dispositivos conectados ao computador. Dessa forma, ele trabalha como um intermediário, fazendo com que ambos, software e hardware, interajam corretamente e garantindo que todas as partes trabalhem juntas como um "time", agindo como um líder responsável por manter a harmonia entre sistemas de memória, arquivos, processos, dispositivos, etc.

<%= figure(%{src: "/computer-science/computer-architecture/images/SO_managements.png", class: "text-center rounded mx-auto d-block", width: "610px", height: "auto"}) %>

#### Memória

A memória é gerenciada pelo SO: ele realiza a troca de dados com o processador, a memória principal e a memória secundária, buscando por espaços vazios na memória e os preenchendo com dados para o funcionamento de programas e comandos. Esse processo é chamado de alocação. Ao longo da evolução dos computadores, esse processo foi evoluindo para se tornar cada vez mais eficiente, utilizando a arquitetura e as características que vimos.

Veja o vídeo abaixo para entender um pouco mais sobre como esse processo é realizado.

##### ⚠️ O vídeo abaixo está legendado, então ative a legenda. 😉

<%= youtube_video "o3pAMI4ZlRY" %>

#### Processos

O SO também decide como será realizada a distribuição dos diversos processos para serem executados pelo "cérebro" do computador, a CPU. A partir daí ele acompanha os estados da execução desses processo realizando os devidos tratamentos, como voltar ou remover o processo da fila de processamentos.

Mas o que são esses processos? Tudo que você executa no computador é realizado com base em processos: um programa que você abre, um comando que você executa no terminal, enfim! Vamos dar uma olhadinha, na prática, nos processos que estão sendo executados na minha máquina nesse momento. Abra o terminal e execute o comando abaixo:

```language-bash
$ ps auxww
```

O que foi exibido no seu terminal são todos os processos que estão sendo gerenciados nesse momento pelo seu SO. Bastante coisa, né?!

O comando `ps` funciona como se fosse uma fotografia dos processos no momento que você o executa, vamos para um outro comando que nos mostra os processos em tempo real, execute o comando abaixo:

```language-bash
$ top
```

Perceba que no cabeçalho do comando já é exibido os totais por _status_ dos processos em sua máquina, em seguida temos algumas médias do uso dos recursos e em seguida a listagem dos processos. Uma versão mais sofisticada desse comando é o `htop`.

Aqui é legal perceber como os recursos da sua máquina estão sendo explorados e a quantidade de processos constantemente mudando de estado. Você também pode executar alguns comandos ou abrir alguns programas e acompanhar seus processos. 🔝

#### Arquivos

O SO também controla os arquivos do computador, sejam eles arquivos de dados, de programas ou aplicativos instalados. Através da interface do SO, conseguimos navegar entre diretórios armazenados nos diversos dispositivos de memória secundária do nosso computador, seja o HD, um pendrive ou nosso celular que esteja conectado em nossa máquina, sendo possível abrir, criar, deletar, copiar e editar arquivos.

Além disso, o SO é responsável por gerenciar o sistema de permissões desses arquivos, controlando os diversos tipos de acesso, por exemplo, impedindo que um usuário comum execute um comando que precise de permissão de super usuário.

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 50 minutos

Agora que já passamos pelos principais conceitos, está na hora de nos aprofundarmos mais com a nossa aula ao vivo!

Bora pro Slack, onde o link do Zoom estará disponível. 😉

---

## Exercícios

Nos exercícios iremos utilizar diversos conceitos que aprendemos até aqui, praticando como é pensar de uma maneira diferente, agora que sabemos um pouco mais sobre os computadores e como eles funcionam.

**Exercício 1**: Crie um projeto que irá simular a arquitetura que vimos em aula de uma maneira bem simples, ela terá um arquivo principal para a execução do programa que representará nosso _Sistema Operacional_ e duas classes que representarão a _Memória Principal_ e a _Secundária_.

Cada tipo de memória irá armazenar os dados de fato na memória que ela representa, sendo a Principal armazenando tudo em memória RAM e a secundária no disco através do `fs` (File System) e através do NodeJS estaremos fazendo chamadas ao Sistema Operacional para realizar essas tarefas para gente, pois ele melhor do que ninguém saberá utilizar as memórias. O objetivo do nosso script será realizar a soma de um array de números aleatórios utilizando as duas implementações de memória. Os dados serão sempre armazenados como strings!

Vamos lá:

1. Crie um novo diretório na sua máquina para os exercícios (pode chamar ele de `computador` ou `pc` 😎), os próximos arquivos deverão ser criados dentro dela.

2. Vamos começar a nossa memória principal, ou memória RAM, para isso crie um arquivo `MainMemory.js` e adicione o conteúdo abaixo nela. Implemente os métodos `get` e `load`.

    - No get você irá retornar a posição dada (`index`) do array de `loadedMemory`. Não esqueça de converter o valor para numérico (_float_ ou _int_).
    - No load você irá adicionar (`push`) o elemento passado (`value`) ao array `loadedMemory`.

```language-javascript
    class MainMemory {
      constructor () {
        this.loadedMemory = []
      }

      load (value) {
        //
      }

      get (index) {
        //
      }

      clean () {
        this.loadedMemory = []
      }
    }

    module.exports = MainMemory
```

    Perceba que ela de fato ela estará armazenando os valores na memória RAM, através das variáveis que definimos!

3. Agora, crie um arquivo `SecondaryMemory.js` para ser a nossa memória secundária e adicione o conteúdo abaixo. Mais uma vez você será responsável pela implementação dos métodos `get` e `load` porém, agora, utilizaremos o `fs`, para persistir esses dados em disco.

    - No `load`, utilizando o método `writeFileSync` do `fs`, escreva o código que crie um novo arquivo utilizando `nextFileName` como `path` e salve o `value` no conteúdo deste novo arquivo.

    - No `get`, retorne o conteúdo do arquivo `fileName`, utilize o método `readFileSync` do `fs`. Não esqueça de converter o valor para numérico (_float_ ou _int_).

    - Crie, no diretório de onde estiver executando os programas, um diretório `disk` para guardar os dados que você salvará em disco.

```language-javascript
    const fs = require('fs')

    const DISK_PATH = './disk'

    class SecondaryMemory {
      load (value) {
        const disk = fs.readdirSync(DISK_PATH)

        const nextFileName = `${DISK_PATH}/cel${disk.length}`

        //
      }

      get (index) {
        const fileName = `${DISK_PATH}/cel${index}`

        //
      }

      clean () {
        fs.rmdirSync(DISK_PATH, { recursive: true })
        fs.mkdirSync(DISK_PATH)
      }
    }

    module.exports = SecondaryMemory
```

4. Vamos criar nosso arquivo principal para gerenciar as "memórias" que criamos, crie um novo arquivo `operatingSystem.js` e coloque o seguinte conteúdo:

```language-javascript
    const SecondaryMemory = require('./SecondaryMemory')
    const MainMemory = require('./MainMemory')

    const secondaryMemory = new SecondaryMemory()
    const mainMemory = new MainMemory()

    // Conjunto de números aleatórios a serem somados
    const randomNumbers = [
      '36912',
      '84300'
    ]

    // Carregando todos os números em memória (principal e secundária)
    randomNumbers.forEach((number) => {
      secondaryMemory.load(number)
      mainMemory.load(number)
    })

    // Interando sobre os números carregados na MEMORIA PRINCIPAL e realizando a soma
    let initialMainMemoryTime = Date.now()
    let mainMemorySum = 0
    for (let i = 0; i < randomNumbers.length; i++) {
      mainMemorySum += mainMemory.get(i)
    }
    console.log(`Memória Principal\nSoma: ${mainMemorySum} Tempo gasto: ${Date.now() - initialMainMemoryTime}ms\n`)

    // Interando sobre os números carregados na MEMORIA SECUNDARIA e realizando a soma
    let initialSecondaryMemoryTime = Date.now()
    let secondaryMemorySum = 0
    for (let i = 0; i < randomNumbers.length; i++) {
      secondaryMemorySum += secondaryMemory.get(i)
    }
    console.log(`Memória Secundária\nSoma: ${secondaryMemorySum} Tempo gasto: ${Date.now() - initialSecondaryMemoryTime}ms`)
```

    Perceba que o script do nosso Sistema Operacional faz duas coisas: primeiro carrega os valores do array `randomNumbers` para a devida memória utilizando o método `load` de cada classe, então, ele roda um laço de repetição, pelo `length` do array, buscando cada valor na memória utilizando o método `get` de cada uma. Por fim, ele imprime no console o tempo e o valor da soma dos números para cada loop, ou seja, o resultado da operação com cada tipo de memória.

5. Vamos testar nosso script, execute o arquivo `operatingSystem.js` e veja a saída no console. Deu certo?! Como foram os tempos de saída?!

6. Para deixar nosso script ainda mais legal, vamos aumentar a quantidade de números para serem somados, adicione uma grande quantidade de números no array de números aleatórios (bastante mesmo, tipo uns 200). E rode o script novamente. Como foi o tempo de resposta agora? deu diferença? qual foi mais rápido?!

7. Agora, vamos reforçar mais um conteúdo apreendido, comente o trecho do código que carrega os números da memória e execute novamente. Compare os resultados das somas. O que aconteceu?

**Exercício 2**: Agora vamos explorar o papel do sistema operacional e o gerenciamento de recursos, para isso utilizaremos os módulos nativos do NodeJS, para solicitar chamadas do SO que nos mostre informações dos recursos de nossa máquina. Crie um script chamado `resources.js` e utilize-o para exibir no console as seguintes informações:

1. A _plataforma_ que estamos utilizando, por exemplo: `linux`, `win32`, `darwin`, etc., a arquitetura, por exemplo, `x32` ou `x64`, e a versão (release). Para isso utilize o módulo [os do NodeJS](https://nodejs.org/api/os.html) {: .external-link target="_blank" rel="noreferrer noopener" }

2. Adicione o código para exibir a quantidade de _cores_ da sua CPU e o modelo e a velocidade em **gigahertz - GHz** de cada um (utilize o valor vindo em `speed` e faça a conversão 😎).

3. Exiba também a quantidade total de memória RAM disponível em sua máquina **em gigabytes - GB** (faça a conversão também 😉).

**Exercício 3**: Faça um script que, a cada intervalo de segundo, mostre no console a memória utilizada do sistema operacional _vs_ a memória total (ambos em **megabytes**).

**Exercício 4**: Faça um script que exibe o seu respectivo `process id` utilizando o módulo [process do NodeJS](https://nodejs.org/api/process.html) {: .external-link target="_blank" rel="noreferrer noopener" } e então fique em execução por um determinado tempo. Agora utilizando os comandos de monitoramento visto no conteúdo, exiba os processos em execução e então identifique o seu processo.

### Bônus

**Exercício 5**: Faça um script que realize operações que requerem alta quantidade dos diversos recursos da máquina, processamento, leitura e escrita e memória, então, localize seu processo através dos `PID` utilizando as ferramentas vistas no conteúdo.

---

## Recursos Adicionais

- [O Jogo da Imitação - Alan Turing quebra a criptografia da Enigma](https://www.youtube.com/watch?v=zZuqLLdx2YQ) {: .external-link target="_blank" rel="noreferrer noopener" }

- [O Mapa da Ciência da Computação](https://www.youtube.com/watch?v=SzJ46YA_RaA) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Os Computadores Quânticos - por Kurzgesagt](https://www.youtube.com/watch?v=JhHMJCUmq28) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Vídeo - Evolução dos Processadores Intel](https://www.youtube.com/watch?v=TqOCC65HkCQ) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Vídeo - Evolução dos Processadores AMD](https://www.youtube.com/watch?v=-S3fm9OAlZ8) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Vídeo - Como os circuitos realizam uma soma simples](https://www.youtube.com/watch?v=wvJc9CZcvBc) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Vídeo - Transistores - A invenção que mudou o mundo](https://www.youtube.com/watch?v=OwS9aTE2Go4) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Lógica Booleana e portas lógicas](https://www.youtube.com/watch?v=gI-qXk7XojA) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Bases numéricas](https://www.youtube.com/watch?v=J5q7s7l2EuI) {: .external-link target="_blank" rel="noreferrer noopener" }

- [ALU - Unidade lógica e aritmética](https://www.youtube.com/watch?v=1I5ZMmrOfnA) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Simulador - CPU](http://www.buthowdoitknow.com) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Uma máquina de Turing construída 100% no Minecraft](https://www.youtube.com/watch?v=1X21HQphy6I) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
