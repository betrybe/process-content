## O que vamos aprender?

Hoje você vai aprender como o NodeJS funciona **por debaixo dos panos**, de quais "pedaços" ele é composto, e o que faz cada "parte" do **runtime**. Aprenderá também alguns conceitos importantes que todo programador JavaScript precisa saber pra não cair em algumas "armadilhas" que podem aparecer ao longo do caminho.

Vamos passar, de forma geral, por três conceitos:

- Call Stack

- Event Loop

- V8

Esses três conceitos são sempre os mesmos, independente de qual implementação do JavaScript você estiver usando. Ou seja, o que você vai aprender aqui vale tanto pro JS que roda no browser quanto pro código que você executará com o NodeJS.

### Você será capaz de:

- Realizar chamadas de funções de forma consciente;

- Entender os conceitos básicos de como o JavaScript funciona;

- Detectar e solucionar problemas no código de forma mais objetiva;

- Entender a diferença entre execução síncrona e assíncrona.

---

## Por que isso é importante?

Como estamos utilizando JavaScript tanto no back-end quanto no front-end, é importante entender como ele funciona, pra que possamos evitar e resolver problemas mais facilmente. Além disso, entender o que são os conceitos de **Event Loop** e **Call Stack** nos permite escrever códigos melhores e mais performáticos, uma vez que entendemos como esse código será executado.

Por último, é importante sabermos por que nunca devemos bloquear o Event Loop, e o que isso significa de fato, para sabermos como escrever código com qualidade da melhor forma possível.

---

## Conteúdo

###### Tempo sugerido para realização: 80 minutos

Vamos agora entender os conceitos dos quais falamos lá em cima!

### Call Stack

A call stack é, como o nome diz, uma "pilha de chamadas". Formalmente, trata-se de uma estrutura de dados utilizada por um programa para saber em que ponto da execução ele está.

A cada nova função que chamamos em JavaScript, um item (ou uma chamada) é adicionado à call stack. Toda vez que a execução de uma função termina e/ou retorna seu valor, essa função é removida da call stack.

Tanto a adição de uma chamada nova quanto a remoção de uma chamada já executada acontecem sempre no topo da pilha. A isso damos o nome de princípio **LIFO**, ou *Last In, First Out*, que significa que a última chamada que entrou na pilha será a primeira chamada a sair dela (ser executada até o fim). Veremos mais detalhes de como isso funciona mais à frente.

É importante saber que o código sempre roda dentro de uma chamada "pai", que é um escopo criado pelo próprio runtime para executar as instruções. Sendo assim, quando iniciamos um programa, a primeira chamada sempre é para essa função. Aqui a chamaremos de `main`.

Para entendermos melhor, vamos utilizar o seguinte código como exemplo:

```language-javascript
const multiply = (a, b) => a * b;
const square = (number) => multiply(number, number);
const prints = (number) => console.log(square(number));
prints(2);
```
{: .line-numbers}

Primeiro vamos entender o que o código acima faz, linha a linha:

1. Definimos uma função `multiply` que recebe dois valores numéricos e retorna a multiplicação de um pelo outro;

2. Definimos uma função `square` que recebe um valor numérico e utiliza a função `multiply` para multiplicar esse número por ele mesmo;

3. Definimos uma função `prints` que recebe um valor numérico, obtém o quadrado dele utilizando `square` e escreve o resultado no console utilizando `console.log`;

4. Chamamos a função `prints` passando o valor `2`.

Agora, vamos entender o que acontece na call stack, linha a linha do código.

No começo da execução do nosso código, o estado da call stack pode ser representado da seguinte forma:

<%= figure(%{caption: "Call stack no início da execução", src: "/back-end/nodejs/architecture/images/callstack_main_only.png", class: "text-center"}) %>

Como das linhas 1 a 3 temos apenas **declarações** de variáveis e nenhuma **chamada** de função, a primeira alteração na call stack acontece na linha 4, quando chamamos a função `prints`. Nesse momento, a chamada que fizemos para `prints` é adicionada à call stack (ou seja: começa a ser executada). Nesse momento, nossa call stack fica assim:

<%= figure(%{caption: "Call stack durante a execução de \`prints\`", src: "/back-end/nodejs/architecture/images/callstack_main_prints.png", class: "text-center"}) %>

Executando a função `prints`, o runtime percebe que estamos chamando `console.log`, mas que estamos passando pra ele, como parâmetro, o resultado de uma chamada para a função `square`. Assim, não é possível chamar `console.log` antes de chamar `square` e obter seu resultado, já que o runtime precisa desse resultado pra chamar `console.log`. Isso quer dizer que a próxima chamada a ser adicionada à stack é `square`, deixando nossa call stack assim:

<%= figure(%{caption: "Call stack durante a execução de \`square\`", src: "/back-end/nodejs/architecture/images/callstack_up_to_square.png", class: "text-center"}) %>

Analisando a função `square`, o interpretador entende que precisa chamar, mais uma vez, uma outra função: `multiply`. Ele adiciona essa função à stack, que agora fica assim:

<%= figure(%{caption: "Call stack durante a execução de \`multiply\`", src: "/back-end/nodejs/architecture/images/callstack_up_to_multiply.png", class: "text-center"}) %>

Executando `multiply`, o interpretador percebe que, finalmente, não existe mais nenhuma chamada a ser adicionada à stack, pois `multiply` apenas retorna uma **expressão**.

Uma expressão, diferentemente de uma chamada de função, não requer nada de novo na call stack, e pode simplesmente ser avaliada para determinar seu resultado. Esse resultado é o valor da expressão e é utilizado para substituir o uso da expressão em si.

No nosso caso, a expressão `a * b` é avaliada como `2 * 2` que, por sua vez, é avaliada como `4`. Pronto! A execução de `multiply` terminou, e o seu valor (`4`) foi retornado. Logo, `multiply` pode ser removida da pilha, e o contexto da execução pode retornar para `square`, o que deixa nossa call stack assim:

<%= figure(%{caption: "Call stack durante a execução de \`square\`", src: "/back-end/nodejs/architecture/images/callstack_up_to_square.png", class: "text-center"}) %>

Como não existe mais nenhuma chamada para executar dentro de `square`, sua execução terminou e ela também pode ser removida da pilha, retornando o resultado que recebeu de `multiply` (`4`) para o contexto de execução de `prints` e deixando nossa call stack assim:

<%= figure(%{caption: "Call stack durante a execução de \`prints\`", src: "/back-end/nodejs/architecture/images/callstack_main_prints.png", class: "text-center"}) %>

Agora, o interpretador percebe que tem o que precisava para chamar `console.log`, e é isso o que ele faz! A chamada para `console.log` é adicionada à call stack, deixando ela assim:

<%= figure(%{caption: "Call stack durante a execução de \`console.log\`", src: "/back-end/nodejs/architecture/images/callstack_console_log.png", class: "text-center"}) %>

O `console.log`, por sua vez, é executado, imprime o valor `4` no console e retorna, o que nos leva de volta ao escopo de execução de `prints` com a call stack dessa forma:

<%= figure(%{caption: "Call stack durante a execução de \`prints\`", src: "/back-end/nodejs/architecture/images/callstack_main_prints.png", class: "text-center"}) %>

E pronto! Agora todas as chamadas de `prints` foram executadas, o que quer dizer que ela também terminou e é removida da call stack, nos deixando, novamente, no contexto de execução `main`:

<%= figure(%{caption: "Call stack no final da execução", src: "/back-end/nodejs/architecture/images/callstack_main_only.png", class: "text-center"}) %>

E, já que não existe mais nada a ser executado dentro de `main`, essa chamada também é removida da call stack, deixando-a essencialmente vazia:

<%= figure(%{caption: "Call stack vazia", src: "/back-end/nodejs/architecture/images/callstack_empty.png", class: "text-center"}) %>

Quando percebe que a call stack finalmente ficou vazia, o processo (o interpretador JS, no caso) não tem mais nada a fazer e, finalmente, termina. É por isso que, se executarmos nosso script de exemplo utilizando o NodeJS, ele vai escrever `4` na tela e encerrar, pois a call stack vai estar vazia.

<%= figure(%{caption: "Resultado da execução do script de exemplo", src: "/back-end/nodejs/architecture/images/teriminal_sample.gif", class: "text-center", width: "600px"}) %>

### Event Loop

Para entendermos o event loop, primeiro precisamos entender um outro componente crucial da arquitetura do JavaScript: A **task queue**.

#### Task Queue

No tópico anterior, vimos o que é e como funciona a call stack; também vimos que, durante a execução do nosso programa, a chamada que está no topo da pilha é a que está sendo atualmente executada, de forma que as chamadas que estão abaixo dela precisam esperar que as que estão acima terminem para continuar.

Isso funciona muito bem quando as chamadas que estamos fazendo são tão rápidas quanto as que vimos no exemplo acima. Porém, o que acontece se resolvermos fazer uma chamada que demora um tempo pra ser processada? Simples: as demais chamadas vão ter que esperar esse tempo todo! Para um script simples, pode ser que isso não seja um problema, mas, quando estamos falando do navegador, ou de uma API, essa espera pode ser extremamente ruim, pois o JavaScript é ***single thread***, o que quer dizer que ele não faz mais de uma coisa ao mesmo tempo, ou ainda que ele possui uma única call stack.

No browser, essa mesma call stack é onde as chamadas para renderizar ("desenhar") a página também são inseridas, o que quer dizer que, quando realizamos uma operação longa, a atualização do conteúdo da página precisa esperar essa chamada terminar para, só depois, poder acontecer.

Em uma API Node, isso quer dizer que, se adicionarmos uma chamada longa na call stack em uma requisição, todas as outras requisições vão precisar esperar até que aquela seja concluída para que sejam processadas. Isso pode, por si só, acabar com a performance de uma aplicação, mesmo que ela possua poucos usuários.

**O que fazer então?**

Entra no palco a **task queue**!

Como o próprio nome diz, a task queue é uma fila de tarefas. Nela estão operações que estão esperando para acontecer. Elas ficam na fila até que a call stack esteja vazia.

**Mas quem coloca essas tarefas na fila?**

E aqui vai mais um conceito: **Vendor APIs**.

Vendor APIs fazem parte de um contexto maior de execução do nosso código. No browser, elas são chamadas de **Web APIs** e, no NodeJS, de **C++ APIs**.

Essas APIs existem fora do que chamamos de "máquina virtual" no JavaScript e, portanto, não estão limitadas a ser single-thread. Por estarem fora do contexto de execução do JavaScript, chamadas para as Web APIs são processadas fora da call stack e, portanto, **não bloqueiam** a operação do programa.

O processo todo funciona mais ou menos assim:

Realizamos uma chamada para uma Vendor API. Essa chamada é adicionada à call stack (ou seja, executada). Ao executar a chamada, o interpretador percebe que se trata de uma chamada a uma Vendor API e envia essa chamada para ser processada pela Vendor API e pronto: a chamada original terminou e é removida da call stack.

A partir de agora, as coisas seguem na Vendor API, que executa o processamento pesado e, quando termina, adiciona uma nova tarefa na task queue. Essa task é uma chamada a ser realizada utilizando o resultado[*](#callback) obtido da Vendor API.

A tarefa fica lá esperando na fila até que a call stack esteja vazia e, uma vez que isso acontece, a tarefa é adicionada à call stack e, portanto, executada.

**Mas como a tarefa vai de um lugar pro outro?**

E aí que entra o título deste tópico: o **event loop**!

O event loop é, como o nome diz, um loop 😉. Ele é responsável por verificar constantemente se a call stack está vazia e, se estiver, mover as tarefas da fila para a call stack.

Parece coisa pra caramba, né? Mas calma, vamos visualizar esse processo acontecendo para clarear as coisas.

1. Chamadas de funções são adicionadas à call stack quando elas são invocadas, e removidas quando retornam um valor

    <%= figure(%{src: "/back-end/nodejs/architecture/images/call_stack_1.gif", class: "text-center"}) %>

2. `setTimeout` é provido pelo *navegador*. A **Web API** toma conta da função[*](#callback) que passamos pra ele

    <%= figure(%{src: "/back-end/nodejs/architecture/images/task_queue_2.gif", class: "text-center"}) %>

3. Quando o timer termina (1000ms nesse caso), a função[*](#callback) é adicionada à **task queue**

    <%= figure(%{src: "/back-end/nodejs/architecture/images/task_queue_3.gif", class: "text-center"}) %>

4. O **event loop** olha pra **task queue** e pra **call stack**. Se a call stack estiver **vazia**, ele adiciona o primeiro item da fila à call stack

    <%= figure(%{src: "/back-end/nodejs/architecture/images/task_queue_4.gif", class: "text-center"}) %>

5. A função é adicionada à call stack e executada. Quando ela retorna um valor, é removida da call stack

    <%= figure(%{src: "/back-end/nodejs/architecture/images/task_queue_5.gif", class: "text-center"}) %>


#### Execução assíncrona

Quando uma chamada é executada fora da call stack (como o `setTimeout`), conforme descrito acima, dizemos que ela é uma chamada **assíncrona**. Já chamadas que são executadas normalmente na call stack (como o `console.log`) recebem o nome de chamada **síncrona**.

A principal diferença é que chamadas **síncronas** são executadas pelo próprio JavaScript e ocupam seu espaço na call stack. Por isso, operações lentas ou demoradas nunca devem ser executadas de forma síncrona, pois, uma vez que isso acontece, corremos o risco de *"travar o event loop"*, ou seja, impedir que novas chamadas sejam adicionadas à call stack e processadas. Dessa forma, o event loop fica impedido de executar as tarefas que estão na task queue. Já chamadas **assíncronas** são executadas pelas Vendor APIs (C++ APIs no caso do Node, e Web APIs no caso do navegador).

Por esse motivo, quando falamos de boas práticas com JS, é muito comum ouvir **"Nunca trave o Event Loop!"** 😜

Quando chamamos uma função assíncrona (como o `setTimeout`), passamos pra ela uma callback. Essa callback é registrada junto à vendor API que vai atender aquela chamada.

![](images/2_settimeout_registers_callback.gif)

Quando o timer termina, a vendor API adiciona a callback que passamos à task queue.

![](images/3_calback_added_to_queue.gif)

Depois disso, é só esperar até que a call stack esteja vazia e o event loop vai buscar essa task, que é nossa callback, e adicioná-la à call stack para que seja executada.

Existe, ainda, um detalhe importante sobre as Promises: elas têm sua própria task queue!

Chamada de Micro Task Queue, essa fila foi adicionada à especificação do JavaScript juntamente com as Promises. Sua principal diferença com relação à task queue comum é que tarefas na Micro Task Queue têm prioridade sobre tarefas na Task Queue. Podemos testar isso executando o seguinte script:

```language-javascript
setTimeout(() => { console.log('setTimeout') }, 0)
Promise.resolve().then(() => console.log('Promise'))
```
{: .line-numbers}

O resultado, diferente do que parece à primeira vista, é que `"Promise"` é escrito no terminal antes de `"setTimeout"`! Isso acontece porque, embora as duas funções registrem suas callbacks uma após a outra, e ambas as callbacks sejam adicionadas à fila para serem executadas, a callback da Promise é adicionada à micro task queue, enquanto a do `setTimeout` é adicionada à task queue comum. Quando o event loop "percebe" que a call stack está vazia, ele olha primeiro para a micro task queue, percebe que tem uma tarefa lá e a coloca na call stack. Uma vez que a call stack é esvaziada, ele prossegue para executar as demais tarefas que precisava executar (como a renderização da página, por exemplo). Por último, o event loop procura na task queue, percebe que existe uma task lá (a callback do `setTimeout`) e adiciona essa task à call stack.

Esse exemplo ilustra a importância de entendermos bem o código que escrevemos e de lembrarmos que código assíncrono não tem uma ordem de execução tão clara quanto código síncrono, e que nem sempre algo que foi chamado depois será, necessariamente, executado depois.

### V8

O último tópico pelo qual precisamos passar agora é o **V8**.

O V8 é a **engine** que de fato executa nosso código JavaScript dentro do NodeJS. É nele que existe a call stack e a task queue, que já vimos anteriormente. Além delas, o V8 também é responsável pelo **heap**, que é onde acontece a alocação de memória para nossas variáveis e funções.

Para uma rápida explicação do que o V8 faz, assista ao vídeo abaixo até o minuto 5:47.

<%= youtube_video "PsDqH_RKvyc" %>

Para entendermos melhor, vamos passar novamente pelos passos que o V8 realiza quando está executando nosso código JavaScript:

1. Recebe o código JavaScript como uma sequência de bytes vindo do NodeJS ou do navegador
    <%= figure(%{src: "/back-end/nodejs/architecture/images/byte_stream_decoder.gif", width: "600", class: "text-center"}) %>

2. O **decoder** analisa o código caractere por caractere, gerando e enviando **tokens** para o **parser**
    <%= figure(%{src: "/back-end/nodejs/architecture/images/parser_token_creation.gif", width: "600", class: "text-center"}) %>

3. O **parser** utiliza os tokens para gerar uma **Abstract Syntax Tree** (também chamada de AST; entenderemos melhor sobre ela mais à frente)
    <%= figure(%{src: "/back-end/nodejs/architecture/images/parser_ast.gif", width: "600", class: "text-center"}) %>

4. O interpretador consome a AST e gera código de máquina
    <%= figure(%{src: "/back-end/nodejs/architecture/images/interpreter_bytecode.gif", width: "600", class: "text-center"}) %>

5. O código gerado pelo interpretador é enviado ao processador para ser executado

6. Dados sobre a execução desse código são coletados

7. Caso o V8 detecte que uma função é utilizada com muita frequência, essa função é enviada ao otimizador

8. O otimizador gera código de máquina otimizado e, portanto, mais rápido
    <%= figure(%{src: "/back-end/nodejs/architecture/images/bytecode_optimization.gif", width: "600", class: "text-center"}) %>

9. Caso utilizemos a função da mesma forma que estávamos utilizando antes, o código otimizado é utilizado ao invés do código original

10. Se mudarmos a forma como usamos essa função, esse código otimizado é descartado, e o V8 volta para o passo 4, utilizando o código de máquina gerado inicialmente pelo interpretador

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

Agora que passamos pelos maiores conceitos da arquitetura do NodeJS, vamos mergulhar mais a fundo, na nossa aula ao vivo!

Bora lá pro slack, onde vai estar o link pro Zoom. 😉

---

## Exercícios

Dica: para os exercícios abaixo, use arquivos maiores que 10mb, ou a leitura será realizada em menos de 1 milissegundo, o que tira toda a graça. 😄

**Exercício 1**: Utilizando apenas funções síncronas, crie um script que leia dois arquivos e:

1. Escreva, no terminal, para cada arquivo, qual foi o tempo necessário para lê-lo do disco;

2. Escreva, no terminal, para cada arquivo, seu tamanho em bytes;

3. Escreva, no terminal, ao final do processo, qual o tempo total necessário para a execução completa do script.

Dica: utilize a função `readFileSync` do módulo `fs` do Node.js.

**Exercício 2**: Crie um script que realize as mesmas funcionalidades que o script do exercício 1, mas utilizando apenas funções assíncronas, de forma que os dois arquivos sejam lidos ao mesmo tempo.

Dica: utilize a função `readFile` do módulo `fs` do Node.js.

**Exercício 3**: Crie um script NodeJS que, utilizando apenas funções síncronas e módulos padrão do NodeJS, receba o nome de uma pasta e:

1. Escreva a quantidade de arquivos existentes dentro dela;

2. Escreva a soma do tamanho de todos os arquivos presentes nela;

3. Escreva no terminal o tempo total de execução do script.

Dica: utilize a função `readdirSync` do módulo `fs` do Node.js.

**Exercício 4**: Recrie o script do exercício 3 utilizando apenas funções assíncronas.

Dica: utilize a função `readdir` do módulo `fs` do Node.js.

---

## Recursos Adicionais (opcional)

- [JavaScript Event Loop - Derek Stavis](https://www.youtube.com/watch?v=va8-xdxTywU) {: .external-link target="_blank" rel="noreferrer noopener" }

- [V8 Javascript Engine - Google](https://v8.dev) {: .external-link target="_blank" rel="noreferrer noopener" }

- [JavaScript Visualized: Event Loop](https://dev.to/lydiahallie/javascript-visualized-event-loop-3dif) {: .external-link target="_blank" rel="noreferrer noopener" }

- [JavaScript Visualized: the JavaScript Engine](https://dev.to/lydiahallie/javascript-visualized-the-javascript-engine-4cdf) {: .external-link target="_blank" rel="noreferrer noopener" }

- [File System | Node.js Documentation](https://nodejs.org/api/fs.html) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
