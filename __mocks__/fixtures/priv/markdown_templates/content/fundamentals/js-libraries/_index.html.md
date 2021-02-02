## O que vamos aprender?

Hoje você aprenderá como adicionar bibliotecas ***JavaScript*** e ***CSS*** aos seus sites.

Existem literalmente milhares de bibliotecas ***JavaScript*** e ***CSS*** disponíveis gratuitamente na Internet, com os mais diversos propósitos. À medida que os sites que você desenvolve se tornam mais complexos, será preciso encontrar e integrar ferramentas que facilitem e acelerem o desenvolvimento.

---

### Você será capaz de:

- Adicionar e utilizar bibliotecas ***JavaScript*** e ***CSS*** em seus sites;

- Utilizar bibliotecas ***JavaScript*** externas a partir de uma [CDN](https://www.gocache.com.br/cdn/) {: .external-link target="_blank" rel="noreferrer noopener" }.

---

## Por que isso é importante?

No dia a dia do desenvolvimento de software, você vai precisar encontrar, selecionar e incorporar bibliotecas aos programas que você desenvolve. É muito importante conhecer os fundamentos de uma tecnologia, mas é importante também não reinventar a roda a todo momento. Por exemplo, imagine que você, toda vez que precisasse calcular a raiz quadrada de um número, tivesse que escrever uma função para isso, talvez utilizando uma fórmula matemática complexa! 😨Para que isso não seja necessário, outras pessoas já se deram o trabalho de escrever esse tipo de função de forma extremamente otimizada e disponibilizar para que outras pessoas utilizem.

O mesmo princípio se aplica ao desenvolvimento web. Existem muitos problemas que aparecem com frequência, à medida que a complexidade dos seus sites aumenta. Por exemplo, na aula anterior você aprendeu a construir formulários ***HTML***. Imagine que, em um formulário de cadastro, você quer garantir que o nome e sobrenome sempre sejam preenchidos, que o email da pessoa tenha um formato válido e que seja impossível selecionar uma data de nascimento inexistente. Além disso, você acha que ficar digitando a data manualmente é cansativo, e quer colocar um campo que, ao ser clicado, abre um calendário para escolher a data. Como você faria isso? Com ***JavaScript*** (e ~~um pouco de~~ muito ***CSS***, no caso do calendário). Isso, porém, é algo tão comum que já existem bibliotecas que fornecem essas funcionalidades prontas para você.

Da mesma forma, existem muitos _frameworks_ ***CSS*** que facilitam a construção de sites dinâmicos, acessíveis e responsivos, coisas com as quais você deve se preocupar sempre daqui para frente. Alguns exemplos mais famosos: [Bulma](https://bulma.io/) {: .external-link target="_blank" rel="noreferrer noopener" }, [Bootstrap](https://getbootstrap.com) {: .external-link target="_blank" rel="noreferrer noopener" }, [Semantic UI](https://semantic-ui.com) {: .external-link target="_blank" rel="noreferrer noopener" } e [Materialize](https://materializecss.com) {: .external-link target="_blank" rel="noreferrer noopener" }.

---

## Conteúdo

###### Tempo sugerido para realização: 80 minutos

Quais páginas Web você já visitou hoje? É bem provável que em pelo menos uma delas você precisou interagir com a aplicação de alguma forma - como preenchendo um formulário para ter acesso, visualizando imagens a medida que a página carrega, validando um campo de e-mail/senha.

Essas interações são bastante repetitivas e a grande maioria das pessoas desenvolvedoras reutilizam códigos para evitar perder tempo implementando funcionalidades já desenvolvidas. Para isso, utilizamos **bibliotecas**, que são arquivos em Javascript com funções que podem ser reutilizadas.   

No vídeo você pode ter uma noção da variedade de bibliotecas ***JavaScript*** disponíveis e de como elas podem te ajudar nas mais variadas tarefas.

<%= vimeo "477772147" %>

Como vimos, a **documentação** da biblioteca contém as instruções sobre como instalá-la e uma lista com as funções disponíveis para você utilizar. A documentação deve ser ~~sempre~~ a sua principal fonte de informação, e saber ler documentações é fundamental na sua carreira como pessoa desenvolvedora. Quando um programador cria uma biblioteca, a sua intenção é compartilhá-la com todos nós e, para isso, ele irá se esforçar para escrever uma documentação com bons exemplos para podermos reutilizar funções que são corriqueiras - como manipular datas, exibir alertas, validar campos, dentre outras.

Algumas bibliotecas têm o seu próprio servidor. Outras, são distribuídas a partir de uma _CDN_ externa. Uma CDN (_Content Delivery Network_) é uma rede de servidores para a distribuição de conteúdos. Ela armazena réplicas de conteúdos de outros sites e os entrega para o usuário. Essa distribuição é baseada na localização geográfica do visitante. Assim, a pessoa usuária irá ser conectada ao servidor mais próximo, diminuindo o tempo de latência (transferência de dados).

A biblioteca que vimos no vídeo, Moment, também está disponível via CDN e você pode acessá-la [aqui](hhttps://cdnjs.com/libraries/moment.js) {: .external-link target="_blank" rel="noreferrer noopener" }. A [cdnjs](https://cdnjs.com/libraries) {: .external-link target="_blank" rel="noreferrer noopener" } hospeda várias bibliotecas que você aprenderá mais para frente, como _React JS_. O grande benefício de se utilizar uma biblioteca através de CDNs é que os seus servidores são otimizados para servir arquivos estáticos como bibliotecas Javascript rapidamente. No entanto, a maioria dos sites que disponibilizam bibliotecas preferem hospedá-las em servidores próprios para ter mais controle sobre o conteúdo e otimizá-los, como incorporando mais de uma biblioteca em um arquivo para se ter mais recursos e performance.

Há milhares de bibliotecas JavaScript que irão te auxiliar em diversas tarefas, como:

- Layout da página;
- Acessibilidade;
- Manipulação DOM;
- Efeitos e animação;
- Gráficos e quadros;
- Suporte para dispositivos móveis;

Diante de tantas opções e funcionalidades, como decidir qual biblioteca utilizar? A verdade é que não há uma resposta correta para essa pergunta, e a escolha de qual biblioteca usar é fundamental no trabalho de uma pessoa desenvolvedora - afinal, você começará a escrever códigos tendo como base qual biblioteca utilizar e mudar de ideia quando a página já está em desenvolvimento pode ser uma tarefa difícil.

Para ajudá-lo a tomar a melhor decisão, você pode pensar na sua aplicação a partir da sua composição. Uma página Web é composta por uma interface com o usuário (HTML e CSS), por elementos de interatividade (Javascript e DOM) e por um banco de dados (que também pode ser acessado por Javascript). Algumas bibliotecas são específicas para a interface com o usuário, enquanto que outras podem ser utilizadas em diferentes partes da aplicação, como podemos ver no esquema abaixo:

<%= figure(%{src: "/fundamentals/js-libraries/images/diagrama-bibliotecas.png", class: "text-center rounded mx-auto d-block", width: "800px", height: "auto", caption: "Diagrama bibliotecas Javascript."}) %>

Bibliotecas que "fazem de tudo" são chamadas de frameworks. Elas atuam desde a recuperação de dados até a manipulação do DOM e interface com o usuário. Por outro lado, por fazer coisas demais, em algumas situações usar bibliotecas menores pode ser mais vantajoso, pois elas são focadas em tarefas específicas. Ainda assim, há muitas vantagens em se usar frameworks. No vídeo abaixo, você aprenderá um pouco mais sobre um Framework CSS muito utilizado para criar páginas com design responsivo: o `Bootstrap`.

Você aprenderá a adicionar o `Bootstrap` ao seu site, fazendo download dos arquivos ***JavaScript*** e ***CSS*** para seu computador.

<%= vimeo "477785603" %>

Além do `Bootsrap`, você também pode usar bibliotecas que melhoram a experiência de navegação do usuário. A biblioteca mais popular para manipulação do DOM é a [jQuery](https://jquery.com/) {: .external-link target="_blank" rel="noreferrer noopener" }, que vimos no vídeo.

Conforme as suas páginas crescem, você sentirá a necessidade de usar bibliotecas que te auxiliarão na definição da arquiterura da sua aplicação. Logo mais, quando chegarmos no módulo Frontend, você irá aprender uma biblioteca que é muito utilizada para construir _user interfaces_: o [React JS](https://reactjs.org/) {: .external-link target="_blank" rel="noreferrer noopener" }.

Algumas bibliotecas são bem pontuais, e são utilizadas para tarefas específicas. Alguns exemplos de microbibliotecas são:

- [moment.js](https://momentjs.com/) {: .external-link target="_blank" rel="noreferrer noopener" }, que já vimos no primeiro vídeo, tem funções para validação, manipulação e visualização de data e hora;
- [highcharts](https://www.highcharts.com/) {: .external-link target="_blank" rel="noreferrer noopener" } é utilizado para criar gráficos interativos;
- Bibliotecas de teste, como a ~~spoiler alert~~ [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) {: .external-link target="_blank" rel="noreferrer noopener" }. Aprenderemos mais sobre ela no módulo de Frontend!

Como você pode perceber, há milhares de bibliotecas disponíveis e não tem uma resposta correta para qual biblioteca você deve usar. No entanto, você pode fazer algumas considerações na hora de definir qual biblioteca mais se adequa ao produto que você está desenvolvendo. É interessante ponderar como será a experiência do time de desenvolvimento com a biblioteca e como será a experiência do usuário:

##### A biblioteca trará uma boa experiência para quem a desenvolve?
- **Bem documentada**: a biblioteca deve ser de fácil entendimento, com demonstrações de uso real e um guia sobre como utilizá-la. Se uma biblioteca não tem uma documentação, este pode ser um indício de que ela pode não ser tão amigável assim para o desenvolvedor. Prefira bibliotecas com uma documentação acessível;
- **Flexível**: é fácil alterar as opções de configuração da funcionalidade que você gostaria de usar? Muitas vezes, a biblioteca pode ter demonstrações impressionantes, mas ser engessada para um uso específico;
- **Atualizada**: o mundo da Internet está em constante mudança. Bibliotecas podem parar de funcionar por depender de alguma característica específica de um navegador que foi atualizado. Verifique se a biblioteca que você quer utilizar está sempre ativa e atualizada;
- **Testada**: todas as bibliotecas devem incluir testes que garantem que as suas funcionalidades são executadas como o esperado.
- **Código limpo**: algumas vezes tratamos a biblioteca como uma caixa preta, e não damos tanta importância para o código que implementa as suas funcionalidades. Mas pode acontecer de você precisar entendê-lo, caso você encontre algum bug que pode estar relacionado a biblioteca, por exemplo. Dê uma olhada nos códigos da biblioteca e veja se ele é fácil de ser lido, com trechos comentados.
- **Comunidade ativa**: você _vai_ ter dúvidas, e você _irá_ encontrar bugs nas bibliotecas que usará como pessoa desenvolvedora. A melhor forma de tirar dúvidas e resolver bugs é junto com outros desenvolvedores em uma comunidade ativa.

Se a biblioteca é hospeda em sites como o GitHub, algumas dicas para conferir se a biblioteca é uma boa escolha é olhar o **número de Forks** ou o **número de estrelas**. Esses números são um bom indicativo sobre a quantidade de desenvolvedores e programadores que estão utilizando a biblioteca. Algumas podem atingir milhares de Forks! Você pode conferir também se há muitos **problemas em aberto**. Se sim, isso pode ser um sinal de que a comunidade não está muito empenhada em resolvê-los.

Além dessas dicas, observe também como a comunidade externa está utilizando a biblioteca. As perguntas no StackOverflow são respondidas? Não deixe de buscar na Internet pelo nome da biblioteca que você quer utilizar e analise bem os resultados retornados.

##### A biblioteca trará uma boa experiência para o usuário?
- **Acessibilidade**: verifique se a biblioteca que você quer usar tem recursos que tornarão a sua aplicação acessível para qualquer usuário - inclusive pessoas portadoras de alguma deficiência.
- **Responsividade**: se o usuário for utilizar a aplicação em um dispositivo móvel, a biblioteca deve funcionar bem para o dispositivo. Os botões são grandes o bastante e respondem ao toque?
- **Suporte ao navegador**: algumas bibliotecas podem não suportar todos os navegadores. Elas podem ter sido projetadas para navegadores de dispositivos móveis, ou simplesmente não são compatíveis com navegadores mais antigos. Verifique se a sua biblioteca funciona bem para o navegador que você deseja.

Com ~~muita~~ prática, experiência e conversando com outros desenvolvedores você criará uma lista com as suas bibliotecas favoritas!  

---

Vamos ver na prática como estilizar um formulário, como o que criamos na última aula, com o `Bootstrap`? Você verá como bibliotecas **CSS** facilitam (e muito!) a nossa vida 😉. Aproveite para colocar em prática o que você aprendeu sobre bibliotecas em alguma página que você já criou!

<%= vimeo "477792897" %>

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

Agora que você já entendeu como utilizar bibliotecas _JavaScript_ nas suas páginas, é hora de praticarmos juntos!

Aula ao vivo! Vamos para o Slack, onde o link estará disponível.

---

## Exercícios

###### Tempo sugerido para realização: 140 minutos

<%= versioning_your_code(@conn) %>

### Agora a prática

1. Adicione um _framework_ ***CSS*** de sua escolha ao formulário que você construiu na última aula e o utilize para estilizar o formulário.
  * Sugestões: [Bulma](https://bulma.io/) {: .external-link target="_blank" rel="noreferrer noopener" }, [Bootstrap](https://getbootstrap.com) {: .external-link target="_blank" rel="noreferrer noopener" }, [Semantic UI](https://semantic-ui.com) {: .external-link target="_blank" rel="noreferrer noopener" } e [Materialize](https://materializecss.com) {: .external-link target="_blank" rel="noreferrer noopener" }.

2. Adicione uma biblioteca ***JavaScript*** de _date picker_ ao formulário que você construiu na última aula. Utilize essa biblioteca no campo "Data de início" do formulário. Você pode remover as validações de data que adicionou, uma vez que a biblioteca se encarregará de permitir somente datas válidas.
  * Sugestões: [DatePickerX](https://github.com/AvroraTeam/DatePickerX) {: .external-link target="_blank" rel="noreferrer noopener" } e [Pickaday](https://github.com/Pikaday/Pikaday) {: .external-link target="_blank" rel="noreferrer noopener" }.

3. Adicione uma biblioteca ***JavaScript*** de validações ao formulário que você construiu na última aula. Utilize essa biblioteca para substituir as validações que você fez manualmente.
  * Sugestões: [Just-validate](https://github.com/horprogs/Just-validate) {: .external-link target="_blank" rel="noreferrer noopener" } e [popup-validation](https://github.com/AntonLapshin/popup-validation) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Recursos Adicionais

* [Tutorial de como instalar e utilizar a bibloteca Just-validate](https://www.cssscript.com/custom-html5-form-validator-vanilla-javascript-just-validate/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Tutorial de como instalar e utilizar a biblioteca popup-validation](https://www.cssscript.com/minimal-form-validation-popup-pure-javascript/) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

Agora é hora de conhecer o **CSS Flexbox**, uma excelente ferramenta para desenvolver sites responsivos. 💪

<%= next_button(@conn) %>
