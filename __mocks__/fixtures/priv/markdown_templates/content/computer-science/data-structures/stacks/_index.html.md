## O que vamos aprender?

Neste bloco iremos aprender a criar estruturas de dados utilizando pilhas (_stack_, em inglês) e como essa estrutura é organizada. Também iremos aprender como utilizar a pilha, adicionando algumas tarefas para uma classe de pilha.

Vamos aprender como podemos utilizar pilhas para entender o funcionamento da chamada de funções do Python e também para a resolução de expressões matemáticas utilizando a `Notação Polonesa Reversa` (_RPN_). Esses pontos são importantes para entender melhor o funcionamento da linguagem Python e também são perguntas comuns em processos seletivos de diversas empresas.

### Você será capaz de

- Entender o funcionamento da estrutura de dados pilha (`stack`);

- Adicionar, remover, saber a quantidade e limpar itens de uma pilha;

- Em quais casos utilizar pilhas e onde são utilizadas.

---

## Por que isso é importante?

Quase todas as linguagens utilizam a estrutura de pilhas para a gerência da execução de aplicações. Durante a execução do programa, quando o interpretador do Python encontra uma chamada a uma função, ele salva o estado da função atual e então a adiciona na pilha de execução (_call stack_). Quando a função chamada termina a execução, o interpretador volta na pilha e lê a função que esta no topo para continuar a execução da aplicação.

Outro caso importante é para entender como que linguagem Python resolve as expressões matemáticas, respeitando a ordem dos operadores. Ao ler uma expressão, o interpretador do Python monta uma estrutura chamada de **pós fixa** e com base nessa estrutura ele vai calculando os valores da expressão, respeitando a ordem dos operadores.

Ambos os casos são resolvidos utilizando pilhas. Entender as características, citadas anteriormente, nos ajuda a escrever aplicações melhores.

---

## Conteúdos

###### Tempo sugerido para realização: 80 minutos

### O que é uma pilha?

A estrutura de pilha é uma estrutura do tipo **LIFO** (**L**ast **I**n **F**irst **O**ut). Ou seja, o último elemento a entrar na pilha é o primeiro a sair.

Quem nunca deixou um monte de roupas uma em cima da outra num canto da casa? Nunca organizávamos aquela pilha de roupas e sempre que precisávamos de alguma roupa pegávamos uma de cima por preguiça de organizar as demais roupas. Vocês já tentaram remover uma roupa que estivesse no meio da pilha? Faz uma baita bagunça e sempre era necessário organizar os restante das roupas.

A dica é sempre tentar remover a roupa de cima da pilha de roupas, a mesma coisa deve ser feito com a estrutura de dados **pilha**. Sempre devemos remover o último item que entrou na pilha, ou seja, o item mais acima. Uma remoção de algum item do meio dará um baita trabalho para reorganizar a pilha.

Assim como no mundo real, quando manipulamos uma pilhas de pratos, por exemplo, só conseguimos efetuar "operações" no topo da pilha. Adicionar um novo prato no topo da pilha é uma tarefa bem simples de ser realizada, assim como também a operação de retirar um prato da pilha para podermos utilizar no almoço. Claro que no mundo real podemos remover um prato do meio, mas convenhamos, dá um pouco de trabalho, não? Na programação remover itens do meio da pilha também não é uma boa ideia.

Num restaurante vocês já perceberam que, quando os pratos disponíveis para as pessoas clientes estão acabando, uma pessoa adiciona uma certa quantidade de pratos no topo de uma pilha de pratos? Neste caso os últimos pratos adicionados serão os primeiros a serem utilizados, pois nós não tiramos os pratos de baixo da pilha e sim do topo. Por favor não tentem tirar pratos debaixo da pilha em casa e nem no restaurante (fora de casa a vergonha pode ser maior 😆)!

<%= figure(%{src: "/computer-science/data-structures/stacks/images/pratos.gif", caption: "Pato Donald lavando pratos", class: "text-center rounded mx-auto d-block"}) %>

Podemos criar uma pilha utilizando alguma outra estruturas de dados como **listas** ou **arrays**, com a única diferença que todas as operações devem ocorrer com o elemento mais ao topo, ou seja, no último elemento adicionado. Em nosso exemplos vamos utilizar o `built-in` ***list*** para facilitar o entendimento.

O desenho de uma pilha normalmente se parece com um daqueles porta moedas antigos com molas. O desenho seria algo próximo a:

<%= figure(%{src: "/computer-science/data-structures/stacks/images/desenho-pilha.jpg", caption: "Desenho de uma pilha", class: "text-center rounded mx-auto d-block", height: "350px"}) %>

Para relembrar, esse é um exemplo de porta moeda que vamos empilhando as moedas no topo:

<%= figure(%{src: "/computer-science/data-structures/stacks/images/porta-moedas.jpg", caption: "Porta moedas", class: "text-center rounded mx-auto d-block", height: "150px"}) %>

Uma curiosidade interessante é que as pilhas podem ter um limite na quantidade de valores. Quando essa quantidade é esgotada e tentamos adicionar mais um valor, ocorre um erro chamado "`Stack Overflow`". Por acaso vocês conhecem um site chamado [stackoverflow,](https://stackoverflow.com/) {: .external-link target="_blank" rel="noreferrer noopener" } né? Será que eles tiraram o nome do site desse erro de limite de itens da pilha? No caso deles, seria um "`Overflow`" de conhecimentos.

<%= figure(%{src: "/computer-science/data-structures/stacks/images/explosao.gif",class: "text-center rounded mx-auto d-block"}) %>

### Quais as operações mais comuns?

Ao se manipular uma pilha, existem algumas operações que são comuns de serem utilizadas. São elas: ***push***, ***pop***, e ***peek***.

A operação **push** adiciona um item no topo da pilha. Vale frisar novamente que, quando estamos utilizando pilhas, podemos adicionar novos valores somente no topo dela. Lembrando da análogia com o porta moedas, nós não conseguimos simplesmente adicionar uma moeda no meio das moedas já adicionadas. Para esse caso teríamos que remover as moedas de cima e então adicionar a moeda que queremos para então adicionar as demais moedas de volta.

Já as funções **pop** e **peek** são utilizadas para ler valores do topo da pilha. A diferença entre as operações é que o **pop** remove o item da pilha, enquanto que o **peek** somente lê o item.

### Utilizando pilhas

#### Implementação de uma pilha utilizando Python

Para fixar o conteúdo das funções básicas de uma pilha, vamos criar uma classe `Stack` e aplicar nela as operações que acabamos de ver.

Primeiro iremos declarar a classe chamada `Stack` no arquivo `stack.py`. Em seguida, vamos declarar o construtor para termos uma pilha vazia e duas propriedades que serão úteis para implementar as funcionalidades da pilha. A primeira propriedade nos retorna o tamanho da pilha e a segunda propriedade nos indica se a pilha esta vazia.

**Nota:** Aqui iremos utilizar o tipo `built-in` de lista para focarmos em entender as pilhas.

> stack.py

```language-python
class Stack():
    def __init__(self):
        self._data = list()

    def size(self):
        return len(self._data)

    def is_empty(self):
        return not bool(self.size())
```

Após adicionar as funções auxiliares, vamos adicionar as operações de **push** (empilhar itens) e **pop** (remover itens do topo da pilha). Com esses métodos já poderemos manipular valores na pilha. No arquivo `stack.py` vamos adicionar os método de **push** e **pop**, conforme o código abaixo:

> stack.py

```language-python
class Stack():
    # ...

    def push(self, value):
        self._data.append(value)

    def pop(self):
        if self.is_empty:
            return None

        # -1 se refere ao último objeto da pilha.
        # Ou seja, o valor do topo da pilha
        value = self._data[-1]
        del self._data[-1]
        return value
```

O método **push** adiciona um novo valor no topo da pilha, enquanto que o método **pop** irá pegar o elemento do topo e então retornar esse valor. Nem sempre é interessante remover o valor da pilha, por isso iremos implementar o método **peek** que somente lê o valor no topo da pilha e então o retorna. Vamos adicioná-lo dentro da nossa classe `Stack`:

> stack.py

```language-python
class Stack():
    # ...

    def peek(self):
        if self.is_empty():
            return None
        value = self._data[-1]
        return value
```

A última funcionalidade da pilha é um método para limpa-la. Para isso iremos adicionar o método **clear**, que se encarregará de limpar todos os elementos da pilha.

> stack.py

```language-python
class Stack():
    # ...

    def clear(self):
        self._data.clear()
```

Por fim, vamos adicionar o método `__str__` que fará a impressão de todos os elementos que estão empilhados. Do primeiro ao último item inserido (da parte de baixo da pilha até o topo).

> stack.py

```language-python
class Stack():
    # ...

    def __str__(self):
        str_items = ""
        for i in range(self.size()):
            value = self._data[i]
            str_items += str(value)
            if i + 1 < self.size():
                str_items += ", "

        return "Stack(" + str_items + ")"
```

No final dessas implementações teremos a declaração da classe `Stack` com todas as operações que podemos realizar com uma pilha. Claro que ainda podemos estender ainda mais a classe `Stack` para limitar a quantidade de itens na _stack_ e retornar um erro de **StackOverflow**. Não se preocupem, temos um exercício para isso 😊. No final, o arquivo `stack.py` terá a seguinte implementação:

> stack.py

```language-python
class Stack():
    def __init__(self):
        self._data = list()

    def size(self):
        return len(self._data)

    def is_empty(self):
        return not bool(self.size())

    def push(self, value):
        self._data.append(value)

    def pop(self):
        if self.is_empty():
            return None

        # -1 se refere ao último objeto da pilha.
        # Ou seja, o valor do topo da pilha
        value = self._data[-1]
        del self._data[-1]
        return value

    def peek(self):
        if self.is_empty():
            return None
        value = self._data[-1]
        return value

    def clear(self):
        self._data.clear()

    def __str__(self):
        str_items = ""
        for i in range(self.size()):
            value = self._data[i]
            str_items += str(value)
            if i + 1 < self.size():
                str_items += ", "

        return "Stack(" + str_items + ")"


if __name__ == "__main__":
    elements = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    content_stack = Stack()

    for elem in elements:
        content_stack.push(elem)

    # saída: Stack(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
    print(content_stack)
    # saída: 10
    print(content_stack.size())

    # saída: 10
    print(content_stack.peek())
    # saída: 10, pois a função retorna o elemento que está sendo retirado
    print(content_stack.pop())

    # saída: 9, pois, após o 10 ter sido removido, o 9 se tornou o elemento do topo da pilha
    print(content_stack.peek())
    # saída: 9
    print(content_stack.size())

    # saída: None, pois a função não retorna nada!
    print(content_stack.clear())
    # saída: 0
    print(content_stack.size())
```

> Para testar, apenas rode o código com `python3 -m stack.py` 😊

#### Onde pilhas são normalmente utilizadas

As pilhas são utilizadas para resolver diversos problemas em linguagens de programação. Muitas linguagens utilizam a pilha para poder controlar o estado das chamadas de funções ou para resolver expressões matemáticas e lógicas.

Outro uso bem comum é quando precisamos representar o comportamento de uma pilha em nossas aplicações.

#### Utilização de pilhas no controle da chamada de funções

A linguagem Python, por exemplo, utiliza a pilha em duas importantes funcionalidades da aplicação. A primeira é para controlar as chamadas da funções, ou seja, a linguagem mantém uma pilha com quais funções devem ser executadas após a execução de uma função. Ficou confuso? Então vamos a um exemplo!

Considerando que temos uma função com o nome `process_video` e ela recebe um argumento indicando o caminho de um vídeo. Dentro dessa função é invocado a função `load_video`, recebendo também o argumento do caminho do vídeo repassado da função `process_video`. O código dessas funções ficariam parecido com:

```language-python
def load_video(video_path):
    print('Carregando vídeo do caminho:', video_path)
    return 'fake vídeo'

def process_video(video_path):
    print('Carregando vídeo...')
    loaded_video = load_video(video_path)
    # Faz alguma coisa legal com o vídeo
```

Nesse código, ao invocarmos a função para processar o video, o interpretador do Python começa a executa-la e, ao chegar na linha que invocamos a função de leitura do video, o Python faz um **push** da função corrente (`process_video()`) na pilha de execução, com todo o seu contexto, para então executar a função de leitura. Quando a função de leitura for finalizada o Python irá fazer um **pop** da pilha para continuar a execução da aplicação.

Se adicionarmos a função `traceback.print_stack(file=sys.stdout)` conseguimos ver quais os itens presentes na _call stack_ do Python. Para que vocês possam visualizar basta copiar o código abaixo e executá-lo no modo iterativo do interpretador:

> 💡 Modo iterativo do interpretado: executar o comando `python` no terminal. Com isso, você irá entrar no IDLE do Python. Após ter entrado, escreva o código abaixo.

```language-python
import traceback
import sys


def load_video(video_path):
    print('Carregando vídeo do caminho:', video_path)
    traceback.print_stack(file=sys.stdout)
    return 'fake vídeo'

def process_video(video_path):
    print('Carregando vídeo...')
    loaded_video = load_video(video_path)
    Faz alguma coisa legal com o vídeo


process_video('path/to/my/video')
```

Quando a função `process_video` estiver sendo executada a pilha de chamadas vai ficar parecida com a imagem abaixo.

<%= figure(%{src: "/computer-science/data-structures/stacks/images/callstack.png", class: "text-center rounded mx-auto d-block"}) %>

> 💡 Caso estejam usando o modo iterativo, será exibido no terminal uma stack menor do que quando o código é executado no [iPython](https://ipython.org/) {: .external-link target="_blank" rel="noreferrer noopener" }. A stack será diferente, pois o `iPython` possui uma estrutura para poder melhorar a interatividade via linha de comando e o print da stack acaba imprimindo essa estrutura também. Se tiver interesse, vale a pena verificar ambos para notar a diferença.

#### Utilização de pilhas na resolução de expressões

Outro lugar que pilhas são muito bem aproveitadas é na validação de expressões matemáticas. Existem diversos tipos de representação de expressões, como por exemplo, **infixa** e **pós fixa**. Quando escrevemos a expressão `(A + B) * C` estamos escrevendo uma expressão no formato **infixa**. A mesma expressão, quando escrita no formato **pós fixa**, ficaria um pouco diferente: `A B + C *`. E como resolveríamos essa expressão? Basicamente nós pegamos os `A` e `B` para aplicarmos a operação de soma (o `+` logo após as variáveis). Quando obtivermos o resultado da soma, aplicamos a operação de multiplicação com a variável `C` (o `*` logo após o `C`), ou seja, iremos resolvendo a expressão sempre de dois em dois operadores, da esquerda para a direita. Para entendermos melhor como funciona, vamos desenvolver um exemplo, fazendo o passo a passo considerando os valores `A = 5`, `B = 10` e `C = 3`:

Temos a expressão em **pós fixa**: `A B + C *`, substituindo as variáveis ficaríamos com: `5 10 + 3 *`.

<%= figure(%{src: "/computer-science/data-structures/stacks/images/expressao1.png", class: "text-center rounded mx-auto d-block"}) %>

O primeiro passo é pegar os dois primeiros valores e executar a operação de soma, então iremos resolver a primeira parte da operação (`5 10 +`). O resultado dessa soma é `15`, certo?

Agora pegaremos o resultado e adicionaremos à primeira parte da expressão. A nova expressão fica assim:

<%= figure(%{src: "/computer-science/data-structures/stacks/images/expressao2.png", class: "text-center rounded mx-auto d-block"}) %>

Então repetiremos o primeiro passo, mas para operação de multiplicação. Iremos pegar os dois primeiros valores da expressão e executaremos a operação de multiplicação, resolvendo a ultima parte da expressão (`15 3 *`). O resultado dessa multiplicação é `45`, certo?

<%= figure(%{src: "/computer-science/data-structures/stacks/images/expressao3.png", class: "text-center rounded mx-auto d-block"}) %>

Substituindo o resultado na expressão teremos somente um valor nela. Com isso, nossa expressão está resolvida. O resultado de `(10 + 5) * 3` é `45`.

Mas como pilhas são utilizadas para a resolução de expressões `pós fixa`? Percebam que resolvemos a expressão da esquerda para a direita, sempre aplicando as operações nos dois últimos números da expressão, não é mesmo? Dessa forma conseguimos adicionar esses números numa pilha e então aplicamos a operação no primeiro e no segundo item do topo da pilha, até que reste somente um item na pilha (nosso resultado final). Por exemplo, considerando a primeira parte da expressão que resolvemos acima `10 5 +`, nós iremos adicionar o valor `10` e `5` no topo da pilha e quando lermos o valor `+` aplicaremos a operação nos dois itens do topo. Então adicionamos o resultado no topo da pilha:

<%= figure(%{src: "/computer-science/data-structures/stacks/images/expressao-op1.png", class: "text-center rounded mx-auto d-block"}) %>

Com o resultado da operação, nós o adicionamos novamente na pilha para podermos continuar com as outras partes da expressão. A segunda operação de multiplicação, entre o resultado da soma (`15`) e o valor da variável `C` (`3`), segue o mesmo principio da primeiro operação. Nós retiramos os valores da pilha para então executar a multiplicação. Então adicionamos o resultado novamente na pilha, ficando somente com um valor, que é o resultado da expressão.

<%= figure(%{src: "/computer-science/data-structures/stacks/images/expressao-op2.png", class: "text-center rounded mx-auto d-block"}) %>

Se ainda ficou um pouco confuso como utilizar pilhas para a resolução dessas expressões, iremos desenvolver um exemplo prático juntos para a resolução dessas expressões.

#### Implementando uma função que resolve expressões pós fixas

Agora vamos fazer juntos! Vamos implementar uma função, utilizando _stacks_, para calcular a expressões **pós fixa**. Vamos utilizar o mesmo exemplo que vimos anteriormente:`(A + b) * C`. Vamos implementar uma função que receba essa expressão, em formato de _string_, pós fixa e então calcule o resultado da expressão.

O primeiro passo é criar o arquivo `expression_solver.py` e então escreveremos todo o nosso código nele. Depois iremos declarar uma função chamada `solve_expression()`, que receberá uma expressão no formato texto como argumento. A função irá instânciar uma pilha para nos auxiliar na resolução da expressão. O código abaixo demonstra essa primeira parte.

**Nota:** é necessário que o arquivo `stack.py`, que criamos no início do conteúdo, esteja no mesmo diretório que o arquivo `expression_solver.py`.

> expression_solver.py

```language-python
from stack import Stack


def solve_expression(expr):
    stack = Stack()

    tokens_list = expr.split(' ')
```

Essa quebra dos tokens será importante para decidirmos o que faremos com cada um dos valores que temos na expressão, seja eles números ou operações. Por enquanto iremos somente implementar as operações de soma e multiplicação!

Bom, com os valores dos tokens, iremos percorrer a nossa lista de tokens e executar as operações de **push** e **pop** da _stack_, para podermos resolver a expressão. Primeiro vamos adicionar o código para executar somente a soma e a adição dos valores na pilha. Depois faremos a operação de multiplicação:

> expression_solver.py

```language-python
# ...


def solve_expression(expr):
    # ...

    for token in tokens_list:
        if token == '+':
            # Sum operation
            result = stack.pop() + stack.pop()
            stack.push(result)
        else:
            # add number operation
            stack.push(int(token))
```

Show! Com a adição desse loop podemos executar expressões somente com a operação de soma. Então a primeira parte da nossa expressão `10 5 +` já pode ser executada na nossa função que resolve expressões pós fixa.

Agora teremos que executar a operação de multiplicação e ao final retornar o resultado da expressão, ou seja, o valor que ficou na pilha.

Vamos adicionar mais um pouco de código para podermos executar a segunda parte da nossa expressão, a operação de multiplicação. O código a ser adicionado é uma verificação para fazermos a operação de multiplicação e o calculo da multiplicação em si. Ele é bem parecido com o código da soma, a diferença é que se executa uma multiplicação com os dois valores do topo da lista.

> expression_solver.py

```language-python
# ...


def solve_expression(expr):
    # ...

    # for token in tokens_list:
        # if token == '+':
            # Sum operation
            # result = stack.pop() + stack.pop()
            # stack.push(result)
        elif token == '*':
            # multiply operation
            result = stack.pop() * stack.pop()
            stack.push(result)
        # else:
            # add number operation
            # stack.push(int(token))

    return stack.pop()


print(solve_expression("5 10 + 3 *"))
```

Agora já conseguimos resolver a nossa expressão utilizando a nossa função de resolução de expressões! 🎉 💥

O código final do arquivo `expression_solver.py` ficou assim:

> expression_solver.py

```language-python
from stack import Stack


def solve_expression(expr):
    stack = Stack()
    tokens_list = expr.split(' ')

    for token in tokens_list:
        if token == '+':
            # Sum operation
            result = stack.pop() + stack.pop()
            stack.push(result)
        elif token == '*':
            # multiply operation
            result = stack.pop() * stack.pop()
            stack.push(result)
        else:
            # add the number operation
            stack.push(int(token))

    return stack.pop()


print(solve_expression("5 10 + 3 *"))
```

### Quiz

Para fixar o entendimento sobre pilhas, vamos analisar algumas situações do mundo real para então dizermos se podemos utilizar pilhas ou não para manipular. Quais desses itens podemos utilizar o conceito de pilhas para podermos organizá-los?

- Um monte de roupa jogado no canto;

- Porta moedas;

- Pessoas esperando a sua vez para serem atendidas no banco;

- Carros parados aguardando o semáforo abrir;

- Diversos livros um em cima do outro;

- Roupas dobradas na gaveta.

### Resumindo pilhas

<%= vimeo "459926669" %>

---

## Vamos fazer juntos

###### Tempo sugerido para realização: 80 minutos

Agora que já passamos pelos conceitos, está na hora de colocarmos a mão na massa com a nossa aula ao vivo!

Bora pro Slack, onde o link estará disponível. 😉

---

## Exercícios

###### Tempo sugerido para realização: 120 minutos

<%= versioning_your_code(@conn) %>

### Agora a prática

Os exercícios sobre pilhas serão exercícios que podem aparecer em processos seletivos de grandes empresas, juntamente com alguns exercícios para fixação do conteúdo.

Todos os exercícios devem ser feitos dentro do mesmo diretório em que a classe `Stack` se encontra, pois vocês irão utilizá-la.

**Exercício 1:** Estenda a classe `Stack`, que escrevemos durante as explicações do conteúdo, adicionando uma nova função chamada `min_value()` que irá retornar o menor valor inteiro presente na pilha. Por exemplo:

> stack.py

```language-python
# ...

content_stack.push(1)
content_stack.push(-2)
content_stack.push(3)
print(content_stack.min_value()) # saída: -2
```

> Fonte: [Min Stack](https://leetcode.com/problems/min-stack/) {: .external-link target="_blank" rel="noreferrer noopener" }

**Exercício 2:** Estenda a classe `Stack`, que escrevemos durante as explicações do conteúdo, para que ela suporte um limite de itens dentro da pilha. Se definirmos que a pilha deve ter o tamanho dois, ela não poderá ter três itens. Por exemplo:

> stack_limit.py

```language-python
# ...

content_stack = LimitStack(2)
content_stack.push(1)
content_stack.push(-2)

try:
    content_stack.push(3)
except StackOverflow:
    print("Não é possível adicionar outro item à pilha")
```

> Dica: Para esse exercício, crie uma nova classe, no mesmo diretório da classe `Stack`.

**Exercício 3:** Um estacionamento comercial possui uma garagem em forma de linha, ou seja, somente é possível parar os carros enfileirados. Para auxiliar as pessoas que trabalham manobrando os veículos, iremos escrever um programa para que eles consigam adicionar novos veículos na garagem e retirar os veículos conforme a solicitação dos clientes. Escreva um programa que faça essas duas operações, inserção de veículos e a remoção do veículo desejado pela pessoa. Lembrando que os veículos que foram removidos para se chegar no veículo do cliente, ficam parados na rua e depois são adicionados na mesma ordem que estavam no estacionamento.

**Exercício 4:** Dada a função que faz a resolução de expressões pós fixas, adicione as operações de subtração e divisão. Considere os exemplos abaixo para testar a sua alteração na função.

_Nota:_ transforme as expressões em pós fixas e atribua valores. Caso seja necessário, faça o `cast` do valor para ponto flutuante.

<%= figure(%{src: "/computer-science/data-structures/stacks/images/expressoes_exercicio.png", caption: "Lista Expressões", class: "text-center rounded mx-auto d-block"}) %>

**Exercício 5:** Dado uma _string_, contendo letras e parênteses. Crie uma função que irá reverter os caracteres de tal forma que somente os caracteres dentro dos parênteses sejam revertidos. A string final não deve conter os parênteses. Por exemplo:

```language-python
string = 'teste(lagel)'
resultado = 'testelegal'
```

> Fonte: [Reverse Substrings Between Each Pair of Parentheses](https://leetcode.com/problems/reverse-substrings-between-each-pair-of-parentheses/) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Recursos adicionais (opcional)

- [Stacks - A Level Computer Science](https://www.youtube.com/watch?v=zIbQf_yR7-U) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Stack - LeetCode](https://leetcode.com/tag/stack/) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Stack Data Structure](https://www.geeksforgeeks.org/stack-data-structure/) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
