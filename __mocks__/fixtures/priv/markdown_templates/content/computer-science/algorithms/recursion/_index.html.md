## O que vamos aprender?

A recursividade não está presente apenas na área da computação. A recursividade também existe na filosófia, na matemática, e na linguagem. Mas, hoje, veremos especificamente a recursividade na nossa área, a da computação. Para aprender recursividade você precisa aprender recursividade. 😂

Nesta aula vamos aprender o que é recursividade, como desenvolver algoritmos recursivos e quando utilizá-los.

_Curiosidade:_ Pesquise "recursividade" no Google. 👀

### Você será capaz de

- Entender o que é recursividade;

- Entender como funciona a análise de algoritmos recursivos;

- Resolver problemas de forma recursiva.

---

## Por que isso é importante?

A recursividade desempenha um papel central na _programação funcional_ e na _ciência da computação_. No paradigma _funcional_, por exemplo, a recursividade é o mecanismo básico para repetições.

Com a recursividade conseguimos solucionar alguns problemas de forma mais simplificada e elegante, diminuindo a complexidade de escrita do código.

Normalmente a solução recursiva é adotada em situações onde o código fica menos complexo se comparado ao código da solução iterativa, para o mesmo problema. Ao utilizar a recursão não há nenhum benefício quanto ao desempenho do programa. A recursão é mais usada para tornar a resposta mais evidente.

> "Os loops podem melhorar o desempenho do seu programa. A recursão melhora o desempenho do seu programador. Escolha o que for mais importante para a sua situação."

Muitos algoritmos importantes usam a recursão, então é fundamental aprendermos esse conceito.

---

## Conteúdos

###### Tempo sugerido para realização: 80 minutos

### Recursividade

#### Definição de recursividade

Uma função que chama a si mesma é chamada de recursiva. O processo para executar, tal função recursiva, é chamado de recursividade.

A recursividade é um dos métodos para a resolução de grandes problemas. Dito isso, um problema submetido, a uma solução recursiva, será quebrado em subproblemas menores até chegar a uma parte tão pequena que o torna possível solucioná-lo trivialmente. Um exemplo visual que podemos relacionar a essa tática de resolução de problema, são as bonecas russas, que dentro de si tem diversas outras bonecas, cada vez menores.

<%= figure(%{src: "/computer-science/algorithms/recursion/images/bonecarussa.jpg", class: "rounded mxh-auto d-block text-center", width: "500px"}) %>

#### Leis da recursão

Todos os algoritmos recursivos devem obedecer a três leis importantes:

  - **1) Um algoritmo recursivo deve ter um caso base**: quando falamos de recursão, devemos sempre lembrar do caso base, pois sem ele nosso algoritmo ficará executando infinitamente. O _caso base_ é a condição de parada do algoritmo recursivo, ele é o menor subproblema do problema, tornando-o possível de resolvê-lo de forma direta/trivial;

  - **2) Um algoritmo recursivo deve mudar o seu estado e se aproximar do caso base**: após o início da execução de um algoritmo recursivo, a cada nova chamada a ele mesmo, o seu estado deve se aproximar cada vez mais do caso base. Por exemplo, vamos imaginar o seguinte: queremos criar um código que irá _printar_ números a partir de 0 e terminar em 10. O _caso base_ do algoritmo é `10`, pois é onde nossa função recursiva deve parar a execução. A primeira chamada a função terá o número `0` passado de parâmetro. A cada nova chamada à função, nosso estado deve incrementar o valor `1` ao valor do estado anterior, até chegar ao número 10. Logo, o valor do estado na primeira chamada será 0, na segunda chamada será 1, na terceira chamada será 2, e assim por diante até chegar ao valor do caso base;

  - **3) Um algoritmo recursivo deve chamar a si mesmo, recursivamente**: Essa lei é a própria definição de recursão.

Para descontrair um pouco, vamos ver um gif que representa a recursividade muito bem! 🐶 ➿

<%= figure(%{src: "/computer-science/algorithms/recursion/images/recursividade_exemplo.gif", class: "rounded mxh-auto d-block text-center", width: "500px"}) %>

> Para evitar vertigem, não olhe muito para ele. 🤢

#### Entendendo recursividade e colocando em prática

Antes de vermos como acontece a "mágica" da recursividade, vamos ver como costuma ser uma estrutura básica de uma função recursiva:

```language-md
Nome da função e parâmetro:
    Condição de parada

    Chamada de si mesma
```

Declaramos uma função com um parâmetro. Dentro da função criada, definimos qual é a condição de parada da função. A condição de parada faz uma comparação entre o valor da condição com o parâmetro que a função está recebendo. Caso a condição não se satisfaça, a função a chamada novamente com um novo parâmetro. Caso contrário a execução para na condição de parada.

Chega de teoria e vamos ver na prática como isso acontece. Para isso, vamos criar um arquivo python e escrever o código abaixo:

```language-python
def countdown(n):  # nome da função e parâmetro
    if n == 0:  # condição de parada
        print('FIM!')
    else:
        print(n)
        countdown(n - 1)  # chamada de si mesma com um novo valor


countdown(5)
```

No código acima temos uma função recursiva que chamamos de `countdown`. A ideia da função é fazer uma contagem regressiva de 5 até 0. Dito isso, primeira chamada que fazemos à função passamos o parâmetro inicial, no caso o número `5`. Nas outras vezes que a função for chamada é que vamos suprir a **segunda lei da recursão**, passando `n - 1`, sendo `n` o número passado por parâmetro.

Exemplo da execução do código:

```language-md
n = 5 -> não satisfaz a condição de parada / chama a função novamente: `countdown(5 - 1)`.  # primeira execução

n = 4 -> não satisfaz a condição de parada / chama a função novamente: `countdown(4 - 1)`.  # segunda execução

n = 3 -> não satisfaz a condição de parada / chama a função novamente: `countdown(3 - 1)`.  # terceira execução

n = 2 -> não satisfaz a condição de parada / chama a função novamente: `countdown(2 - 1)`.  # quarta execução

n = 1 -> não satisfaz a condição de parada / chama a função novamente: `countdown(1 - 1)`.  # quinta execução

n = 0 -> satisfaz condição de parada / entra no if e printa "FIM!".                         # sexta execução
```

Agora que entendemos melhor o código de uma função recursiva, vamos entender o que está acontecendo "por baixo dos panos". Para isso, precisamos, primeiro, entender alguns conceitos sobre pilha de execução:

 - Toda vez que chamamos uma função em um programa, o sistema operacional reserva memória para as variáveis e parâmetros da função;

 - Sempre quando uma função é executada, ela é guardada na pilha;

 - Quando a função termina de ser executada, ela sai da pilha.

> Nota: Não se preocupe em entender, nesse momento, 100% dos conceitos de pilha, você irá ver esse conceito mais para frente. O importante aqui é que você entenda a parte conceitual do funcionamento da recursividade!

Abaixo vamos ver um gif para tornar visual o funcionamento da pilha, mostrando a execução do código acima passo a passo:

<%= figure(%{src: "/computer-science/algorithms/recursion/images/pilha_countdown_exemplo.gif", class: "rounded mxh-auto d-block text-center", width: "800px"}) %>

Podemos perceber que cada vez que a função `countdown` é chamada, um novo dado é adicionado à uma pilha (canto direito do gif). É adicionado à pilha todos os valores executados, do 5 ao 1, até chegarmos no caso base `0`. Quando a execução acaba, os dados são retirados da pilha, um a um, de forma reversa (do 0 ao 5), até que a pilha esvazie e o processamento finalize.

Vamos ver outro exemplo para fixarmos mais esse conceito. Dessa vez, vamos fazer um algoritmo recursivo para cálculo de fatorial. Vamos para o código!

```language-python
def factorial_recursive(n):  # nome da função e parâmetro
    if n == 1:  # condição de parada
        return 1

    else:
        return n * factorial_recursive(n - 1)  # chamada de si mesma com um novo valor


factorial_recursive(5)
```

Nessa função acontece, "por baixo dos panos", a mesma coisa que a função do exemplo anterior. Porém, explicando com outras palavras, internamente cada chamada recursiva à função adiciona um frame de pilha, até chegarmos ao caso base. Então, a pilha começa a se desenrolar à medida que cada chamada retorna seus resultados:

<%= figure(%{src: "/computer-science/algorithms/recursion/images/stack.gif", caption: "Gif retirado do site: www.realpython.com/python-thinking-recursively", class: "rounded mxh-auto d-block text-center", width: "500px"}) %>

Para praticar, vamos fazer um exercício:

**Exercício 1:** Faça um algoritmo recursivo de soma. Esse algoritmo deve receber um número de parâmetro e deve somar todos os números antecessores a ele.

Exemplo:

```language-md
Número passado por parâmetro à função: 4

Execução: 4 + 3 + 2 + 1

Resultado: 10
```

#### Iteratividade x Recursividade

Agora, vamos ver que é possível ter funções tanto recursivas, quanto iterativas para o mesmo problema. Para isso, vamos utilizar os exemplos que usamos ainda nesse conteúdo.

Vamos começar olhando para a função recursiva de contagem regressiva. Conseguimos montar uma função iterativa para ela? Sim! Vamos ver como fazer isso:

```language-python
def iterative_countdown(n):
   while n > 0:
       print(n)
       n = n - 1
   print("FIM!")

   return n


iterative_countdown(5)
```

Vamos ver agora como fica o código iterativo de cálculo de fatorial:

```language-python
def iterative_factorial(n):
    fact = 1

    for i in range(1, n + 1):
        fact = fact * i

    return fact


iterative_factorial(5)
```

Como vimos anteriormente escolher entre uma solução recursiva ou iterativa, depende muito do que estamos buscando. Escolher uma solução recursiva não significa ganho de performance, muito pelo contrário, grande parte das vezes, a solução iterativa será mais performática. Escolher a solução recursiva terá um ganho na diminuição de complexidade do código do seu projeto. Aqui, complexidade significa legibilidade. Ou seja, nosso código fica mais simples, mais elegante, quando utilizamos recursividade.

### Análise de algoritmos recursivos

Para que consigamos realizar a análise de algoritmos recursivos, nós iremos fazer uso das _equações de recorrência_. Mas o que são equações de recorrência?

<%= figure(%{src: "/computer-science/algorithms/recursion/images/algoritmos_meme.jpg", class: "rounded mxh-auto d-block text-center", width: "500px"}) %>

As equações de recorrência expõem o custo de resolver um problema qualquer, de tamanho _n_, em subproblemas menores. Existem 4 métodos diferentes para nos auxiliar a resolver as equações de recorrência. Esses métodos são:

  - Árvore de recursão;

  - Método iterativo;

  - Teorema mestre;

  - Método de substituição.

Estamos falando muito sobre complexidade e custo, mas o que exatamente são eles? Quando falamos sobre a complexidade de um algoritmo, ou o custo que um algoritmo gera, estamos falando especificamente de tempo e memória. Logo, quando analisamos um algoritmo, estamos calculando o tempo que ele demora para terminar sua execução e a memória gasta por ele.

Mas porque devemos nos preocupar com isso? Sem delongas, o foco da análise de algoritmo é na **eficiência** do nosso programa. O que isso quer dizer? Bom, para determinarmos, por exemplo, entre dois algoritmos, qual é o mais eficiente, nós poderíamos analisar ambos e utilizar o mais eficiente. Outro exemplo é que, poderíamos analisar a complexidade dos códigos de uma aplicação e refatorá-los para melhorá-los, tornando a nossa aplicação mais eficiente, etc.

Como vocês podem perceber e como foi dito anteriormente, o foco é **sempre** na eficiência.

Fazer a análise de algoritmos recursivos envolve uma serie de conhecimentos avançados de matemática. Dito isso, caso você queira **muito** fazer a análise de complexidade de algum algoritmo recursivo, faça a análise em cima de um algoritmo iterativo. Por exemplo, você quer fazer a análise de complexidade de um algoritmo recursivo de cálculo de fibonacci. Faça a implementação desse algoritmo de forma iterativa para, em seguida, fazer o cálculo da complexidade.

>💡 Lembre-se! Se você se embananar com as estratégias de análise de recursão, fique tranquilo(a), é um assunto mais desafiador e com o tempo e experiência esse conhecimento vem. E não deixe de falar com a gente no Slack se algum exemplo estiver te confundindo!

#### Árvore de recursão

O método da árvore de recursão pode ser utilizado para **estimar** o custo de um algoritmo, ou seja, não é uma matemática exata. Mas, já é um meio de analisarmos o custo, o que nos ajuda a decidir se tal solução recursiva vale a pena ou não.

Podemos visualizar nível a nível da estrutura de um algoritmo recursivo por meio de uma árvore recursiva. No final, como dito anteriormente, tem-se a estimativa de tempo do problema. Vamos ver na prática como isso acontece para termos um melhor entendimento.

```language-python
def fibonacci(num):  # nome da função e parâmetro
    if (num <= 1):  # condição de parada
        return num
    else:
        return fibonacci(num - 2) + fibonacci(num - 1)  # chamada de si mesma com um novo valor
```

Acima estamos fazendo um código recursivo para cálculo de fibonacci.

Na imagem abaixo visualizamos a representação do algoritmo fibonacci recursivo, que acabamos de montar, convertido em uma estrutura de árvore:

<%= figure(%{src: "/computer-science/algorithms/recursion/images/fibonacci1.png", caption: "Imagem retirada do site: www.zvzzt.wordpress.com/2014/05/03/python-recursion-visualization-with-rcviz", class: "rounded mxh-auto d-block text-center", width: "500px"}) %>

Cada nó da árvore acima representa o custo da solução de um subproblema. Quando olhamos para a árvore como um todo, ou seja, quando expandimos ela, podemos somar todos os custos de cada nível da árvore e depois teríamos o resultado total do problema.

O problema começa com apenas um nó e vai decompondo até alcançar os casos base, que são as folhas da árvore. Ok, mas o que são e qual a diferença entre um nó e uma folha? O nó e a folha são os elementos da árvore. Um nó é um elemento que tem pelo menos um "filho", uma folha, chamada também de nó terminal, não tem nenhum elemento abaixo dela, ou seja, não tem filhos.

Vamos ver agora, de forma interativa, como que essa árvore chegou a esse resultado passo a passo:

<%= figure(%{src: "/computer-science/algorithms/recursion/images/arvore_recursao_fibonacci.gif", caption: "Exemplo retirado do site: www.visualgo.net/en/recursion", class: "rounded mxh-auto d-block text-center", width: "800px"}) %>

#### Método iterativo

O método iterativo, ou, como também é chamado, método da substituição iterativa, tem uma solução muito parecida que o método da árvore de recursão propõe.

O método iterativo, assim como a árvore de recursão, expande o problema para encontrar um padrão, e a partir disso, encontrar um somatório. No caso, o somatório é a representação do custo de execução do algoritmo recursivo sendo analisado.

Esse método, utiliza de propriedades algébricas para auxiliá-lo a encontrar a representação. No caso, a propriedade algébrica é o somatório.

#### Método de substituição

O método da substituição, ou, como também é chamado, método da substituição indutiva, é, como dito anteriormente, uma abordagem para a análise de algoritmos recursivos. Esse método é considero o mais "confiável" para calcular a complexidade de algoritmos recursivos, por causa de seus dois passos.

Como dito acima, esse método consiste, basicamente, de dois passos:

  - **1)** Começamos a análise, nesse método, criando uma hipótese de uma possível solução. Esse passo consiste em chutar um possível resultado de custo do algoritmo. Para "embasar" nosso chute nesse passo, podemos utilizar o resultado de uma outra recorrências, desde que seja uma recorrência parecida com a recorrência sendo analisada.

  - **2)** Nesse passo, é utilizado [indução matemática](https://pt.wikipedia.org/wiki/Indu%C3%A7%C3%A3o_matem%C3%A1tica) {: .external-link target="_blank" rel="noreferrer noopener" } para provarmos que a hipótese que criamos no passo anterior está certa.

#### Teorema mestre

O teorema mestre ou método mestre, calcula os recursos necessários para executar um algoritmo recursivo, como por exemplo o tempo de execução em um computador. Ele utiliza a notação `Big O`, vista no bloco anterior, para entender a velocidade em que elas crescem em direção ao seu limite.

Um algoritmo recursivo pode ser dividido em subproblemas, usando a estratégia "dividir e conquistar", a qual veremos daqui a pouco. Dessa forma são criadas ramificações a partir do problema de origem, e essa ramificações podem ser pensadas como nós.

Em síntese, o teorema mestre resolve recorrências que possuem a seguinte forma:

```language-md
T(n) = aT(n / b) + f(n)
```

No algoritmo, _n_ é o tamanho original do problema. Os valores de `a` e de `b` são constantes. Em particular, o valor de `a` é igual ao número de subproblemas no qual o problema original foi dividido. O resultado de `n / b` é o tamanho de cada um dos subproblemas. A função `f(n)` representa o custo no tempo, de cada chamada recursiva do algoritmo analisado.

Devemos nos atentar ao valor das constantes. O valor de `a` deve ser maior ou igual a 1, afinal o algoritmo deve gerar pelo menos um subproblema (quando não é caso base, obviamente). Já a constante `b` deve ser maior do que 1, senão ao invés de estarmos dividindo o problema, estaríamos gerando subproblemas maiores que o problema original.

### Principais cuidados ao usar recursão

Como visto, chamadas de funções ocupam memória já que, toda vez que uma chamada é feita, o SO reserva memória para as variáveis e parâmetros. Quando um loop recursivo é muito grande, ele fará muitas chamadas, e quando ele faz muitas chamadas podemos ter um `stack overflow` (que não é apenas o fórum de ajuda para devs 😂). O stack overflow, ou estouro de pilha em português, significa que ficaríamos sem memória para continuar com a execução do programa.

Para evitar um estouro de pilha, é importante que as chamadas recursivas parem. Para que consigamos fazer as chamadas recursivas pararem é importante lembrarmos sempre de **implementar a condição de parada na função**.

<%= figure(%{src: "/computer-science/algorithms/recursion/images/cuidado_meme.jpg", class: "rounded mxh-auto d-block text-center", width: "500px"}) %>

Apesar de funções recursivas serem mais elegantes e mais fáceis de implementar, elas costumam ser menos eficientes que do que as iterativas, por causa do _overhead_ de empilhar e desempilhar chamadas de funções.

Não é tão simples decidir quando usar uma solução recursiva para um problema, mas você vai perceber que alguns problemas são muito mais fáceis e intuitivos de serem resolvidos recursivamente. É nesses casos que a recursão vale a pena.

### Estratégias para solução de problemas

Durante todo o conteúdo falamos e vimos muito sobre "algoritmo", nessa sessão não será diferente! Vamos ver diferentes lógicas que podemos aplicar à um algoritmo para a resolução de um problema.

Nos deparamos com diversos problemas diferentes no nosso dia a dia e na nossa vida. Na nossa carreira como pessoa desenvolvedora não será diferente!

<%= figure(%{src: "/computer-science/algorithms/recursion/images/problema_meme.png", class: "rounded mxh-auto d-block text-center", width: "500px"}) %>

Como diria Brad Miller e David Ranum no livro `Resolução de Problemas com Algoritmos e Estruturas de Dados usando Python`, escrito por ambos, e traduzido pela USP, "a ciência da computação é muitas vezes difícil de definir. Isto é provavelmente devido ao infeliz uso da palavra 'computador' no nome. (...) **A ciência da computação é o estudo de problemas, resolução de problemas e soluções que surgem do processo de resolução de problemas.**"

#### Iterativa

A solução iterativa é caracterizada pela repetição de uma determinada operação, procurando resolver algum problema encontrando sucessivas aproximações, a partir de uma suposição inicial.
A idéia nesse tipo de processo é repetir um determinado cálculo várias vezes, obtendo-se a cada repetição, ou iteração, um resultado mais preciso que aquele obtido na iteração anterior. A cada iteração, utiliza-se o resultado da anterior como parâmetro de entrada para o cálculo seguinte. O resultado é uma sequência de valores aproximados, não exatos, mas que estão dentro de uma faixa de erro aceitável.

#### Força bruta

A força bruta, também conhecida como _tentativa e erro_ ou _busca exaustiva_, é a estratégia mais trivial e intuitiva para solução de problemas. Ela consiste basicamente em enumerar todas as combinações possíveis para uma solução e avaliar se satisfazem o problema. Dessa forma, é possível escolher a melhor das soluções, ou seja, a solução ótima, mas apesar de trivial, em alguns casos, a força bruta possui desempenho geralmente muito ruim.

Vamos solucionar um problema chamado de `problema da mochila`, com a força bruta:

Dada uma mochila com capacidade _C_, e _n_ objetos com peso (i = 1...n), deve ser possível preencher a mochila com o maior peso total, respeitando a capacidade _C_.

Suponha uma mochila com capacidade de 15kg e objetos de peso 12kg, 2kg, 4kg e 8kg.

Este problema possui mais que uma solução ótima, ou seja, possui soluções ótimas equivalentes:

```language-md
Uma solução ótima: 12kg + 2kg = 14kg;

Outra solução ótima: 8kg + 2kg + 4kg = 14kg.
```

Soluções viáveis seriam, entre outras:

```language-md
- 12kg;

- 2kg;

- 4kg;

- 8kg;

- 2kg + 4kg.

# ...
```

No caso acima, as soluções são viáveis, porém não são ótimas. Elas não são ótimas, pois a mochila está sendo preenchida, mas não está sendo preenchida chegando mais próximo possível ao peso máximo. Por exemplo, uma das soluções que temos acima é preencher a mochila com um objeto de 2kg apenas, sendo que a mochila suporta 15kg.

Um exemplo de uma solução inviável seria, entre outras:

```language-md
- 12 kg + 4 kg = 16kg.
```

O caso acima é inviável, pois o peso máximo que a mochila comporta é 15kg. Com isso, podemos concluir que o exemplo acima é inviável, pois ultrapassa os 15kg.

Um método baseado em tentativa e erro testaria todas as combinações entre elementos checando:

- Se a solução é viável;

- Se a solução possui valor melhor que outra encontrada anteriormente.

Para conseguir definir qual seria a melhor solução, todas devem ser enumeradas e registradas, e, ao final, os caminhos que não chegaram a um solução final, devem ser retirados.

#### Dividir e conquistar

A estratégia **dividir e conquistar**, também chamada de divisão e conquista, consiste em dividir o problema em partes menores, encontrar soluções para as partes, e então combinar as soluções obtidas em uma solução global.

Usar essa estratégia para resolver problemas, nos quais os subproblemas são versões menores do problema original, geralmente leva à soluções eficientes e elegantes, especialmente quando é utilizado recursividade.

A estratégia emprega modularização de programas e frequentemente conduz a um algoritmo simples e eficiente. Esta técnica é bastante utilizada em desenvolvimento de algoritmos paralelos, onde os subproblemas são tipicamente independentes um dos outros, podendo assim serem resolvidos separadamente.

> 💡 A modularização de um programa consiste em dividi-lo em partes funcionais que conversam entre si, tornando o software mais eficiente.

A técnica de _Divisão e Conquista_ consistem em três passos:

- **Divisão**: dividir a instância do problema original em duas ou mais instâncias menores, considerando-as como subproblemas;

- **Conquista**: resolver cada subproblema recursivamente;

- **Combinação**: combinar as soluções encontradas em cada subproblema, compondo uma solução para o problema original.

Um exemplo para ilustrar o uso dessa técnica é o algoritmo de ordenação de um vetor por intercalação, ou, como é chamado, _MergeSort_. Sua representação pode ser feita através de uma árvore binária, conforme a imagem abaixo:

<%= figure(%{src: "/computer-science/algorithms/recursion/images/dividireconquistar.jpeg", caption: "Imagem retirada do site: www.pucrs.br/ciencias/viali/graduacao/po_2/literatura/pdinamica/artigos/Vol8_Artigo1.pdf", class: "rounded mxh-auto d-block text-center", width: "500px"}) %>

Observe na imagem acima que o primeiro (`a`) faz a divisão dos elementos, e o segundo (`b`) de baixo para cima, faz a conquista, ou seja, resolve cada parte do problema e depois combina todas as soluções encontradas.

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

**Exercício 1:** Crie um algoritmo _não recursivo_ para contar quantos números pares existem em uma sequência numérica (1 a n).

**Exercício 2:** Transforme o algoritmo criado acima em recursivo.

**Exercício 3:** Crie um algoritmo recursivo que encontre, em uma lista, o maior número inteiro.

**Exercício 4:** Escreva um algoritmo recursivo para encontrar o máximo divisor comum (`mdc`) de dois inteiros.

**Exercício 5:** Escreva um algoritmo recursivo que identifica se um número é primo.

#### Bônus

**Exercício 6:** Escreva um algoritmo recursivo que resolva o problema da torre de hanoi, seguindo as instruções:

- Assim como na imagem abaixo, a torre deve conter 3 discos, e três colunas;

- Os discos começam alinhados na primeira coluna, e devem ser organizados respeitando a ordem de tamanho, na última coluna.

<%= figure(%{src: "/computer-science/algorithms/recursion/images/hanoi.gif", class: "rounded mxh-auto d-block text-center", width: "500px"}) %>

---

### Recursos Adicionais

- [Algoritmos - Teoria e Prática ](https://www.cin.ufpe.br/~ara/algoritmos-%20portugu%EAs-%20cormen.pdf) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Técnicas de divisão, conquista e de programação dinâmica para a resolução de Problemas de Otimização](http://www.prof-lori-viali.com/graduacao/po_2/literatura/pdinamica/artigos/Vol8_Artigo1.pdf) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
