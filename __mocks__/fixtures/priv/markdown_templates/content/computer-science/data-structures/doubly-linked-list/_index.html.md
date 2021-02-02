## O que vamos aprender?

Neste bloco vamos continuar aprendendo sobre um dos tipos abstratos de dados (`TAD`) mais popular em meio as **estruturas de dados**. Veremos o comportamento das listas duplamente ligadas, suas peculiaridades, diferenças da lista vista no módulo anterior e como elas estão presentes em outras `TADs` que já utilizamos neste curso.

### Você será capaz de

- Importância de um Nó (_DoublyNode_) no desenvolvimento de software;

- Entender o funcionamento do `TAD` Lista duplamente Ligada (_DoublyLinkedList_);

- Implementar as principais operações de uma lista duplamente encadeada.

---

## Porque isso é importante?

A lista duplamente ligada é uma das estruturas de dados mais importantes. Existem várias aplicações de lista duplamente ligada no mundo real. Uma das aplicações é usá-la em sistemas de navegação, onde a navegação frontal e traseira é necessária. É usado por navegadores para implementar a navegação para trás e para a frente das páginas visitadas, ou seja, o botão voltar e avançar.

---

## Conteúdos

###### Tempo sugerido para realização: 80 minutos

### O que é um DoublyNode?

> Node é o componente mais importante da estrutura, ele é composto por um valor que pode ser de qualquer tipo e um indicador/ponteiro para o próximo Node.

Diferentemente do Node, visto no conteúdo anterior, que tinha como característica um ponteiro para indicar o próximo elemento, o _DoublyNode_ possui também um outro ponteiro para indicar o elemento anterior, daí o nome **Doubly**Node.

Podemos comparar um Node com um container onde um valor é armazenado, e para termos acesso a este elemento devemos acessar primeiramente seu container.

<%= figure(%{src: "/computer-science/data-structures/doubly-linked-list/images/DoublyNode.png", caption: "DoublyNode Structure", class: "text-center rounded mx-auto d-block"}) %>

### O que uma **DoublyLinkedList**

`DoublyLinkedList`, ou lista duplamente ligada, representa uma sequência finita de elementos, admitindo elementos repetidos. É uma `TAD` onde os elementos não são armazenados em memória contígua, assim como um array. Isto significa que a própria estrutura é responsável por indicar a posição dos elementos que a compõem. Isto é possível graças ao _Node_. Em outras palavras uma **DoublyLinkedList é uma coleção de DoublyNode**.

<%= figure(%{src: "/computer-science/data-structures/doubly-linked-list/images/DoublyLinkedList.png", caption: "DoublyLinkedList Structure", class: "text-center rounded mx-auto d-block", width: "800px", height: "auto"}) %>

#### DoublyNode sentinelas

Como ilustrado na figura acima, vemos que nossa lista possui dois `DoublyNode` que diferem um pouco dos demais _nodes_, são eles **HEAD** e **TAIL**. Eles são responsáveis por indicar onde a estrutura inicia e finaliza:

##### HEAD:

- Em caso de lista vazia o próximo elemento será **TAIL**;

- Em caso de haver elementos, o próximo apontará para o primeiro elemento;

- Ponteiro que aponta para o anterior é `None`.

##### TAIL:

- Em caso de lista vazia o elemento anterior será **HEAD**;

- Em caso de haver elementos, o ponteiro anterior será o último elemento;

- Ponteiro que aponta para o próximo é `None`.

##### Diferentemente das `TADs` anteriores, as `DoublyNode`, não tem as restrições:

- Acessar apenas o primeiro elemento - Fila;

- Acessar apenas o ultimo elemento - Pilha;

- Acessar apenas as extremidades - Deque.

Ou seja, em uma lista duplamente ligada é possível acessar qualquer elemento, sem exceção.

### Quais as operações mais comuns?

Ao se manipular uma LinkedList existem algumas operações que são comumente utilizadas

> Tais operações envolvem encapsular valores em um Node para posteriormente efetuar as operações.

- A operação **insert_first** nos permite adicionar um `Node` no inicio da lista;

- A operação **insert_last** nos permite adicionar um `Node` no final da lista;

- A operação **insert_at** nos permite adicionar um `Node` em qualquer posição da lista;

- A operação **remove_first** nos permite remover um `Node` no inicio da lista;

- A operação **remove_last** nos permite remover um `Node` no final da lista;

- A operação **remove_at** nos permite remover um `Node` em qualquer posição da lista;

- A operação **clear** nos permite remover todos os `Nodes` da lista;

- A operação **get_element_at** nos permite visualizar o `Node` em qualquer posição da lista;

- A operação **is_empty** nos permite identificar se existe ao menos um `Node` na lista.

<%= figure(%{src: "/computer-science/data-structures/doubly-linked-list/images/complexity_table.png", class: "text-center rounded mx-auto d-block", width: "800px", height: "auto"}) %>

O principal motivo da evolução da lista ligada para a lista duplamente ligada é a capacidade de otimização em operações nas extremidades. Vimos no conteúdo anterior que operações a serem realizadas no final como `insert_last` e `remove_last` teriam complexidade de `O(n)`. Neste caso, como possuímos sentinelas que guardam essas posições, podemos obter complexidade `O(1)`, em ambas operações.

<%= vimeo "460749378" %>

### Implementação de um DoublyNode

Primeiro iremos declarar o construtor da classe `DoublyNode` e as propriedades que indicam tanto o anterior como o próximo elemento. Como valor _default_ informaremos que os ponteiros de próximo e anterior serão `None`.

> doubly_node.py

```language-python
class DoublyNode:
    def __init__(self, value=None):
        self.value = value
        self.next = None
        self.previous = None

    def __str__(self):
        return f"Node(value={self.value} next={self.next})"
```

### Implementação de uma DoublyLinkedList

Devemos utilizar a classe criada anteriormente, para criar nossa estrutura.=

> doubly_linked_list.py

```language-python
from doubly_node import DoublyNode


class DoublyLinkedList:

    def __init__(self):
        self.head = DoublyNode("HEAD")
        self.tail = DoublyNode("TAIL")
        self.head.next = self.tail
        self.tail.previous = self.head
        self.__length = 0

    def __str__(self):
        return f"DoublyLinkedList(len={self.__length} value={self.head})"

    def __len__(self):
        return self.__length
```

Estamos novamente utilizando o conceito `Literal String Interpolation` na função `__str__`, caso haja dúvidas, deem uma olhada na _doc_ do [pep-0498.](https://www.python.org/dev/peps/pep-0498/) {: .external-link target="_blank" rel="noreferrer noopener" }

#### Inserir no início

Devemos informar que o elemento que estamos inserindo seja o próximo `next` da cabeça, `HEAD`. Sendo assim os seguintes passos devem ser obedecidos:

1. Criar novo `DoublyNode` com o conteúdo a ser inserido.

2. Acoplar este novo `Node` a estrutura:

    2.1. Ponteiro _next_ deve apontar para o _next_ da **HEAD**;

    2.2. Ponteiro _previous_ deve apontar para **HEAD**.

3. Atualizar ponteiros da estrutura para apontar ao novo `Node`:

    3.1. Antigo próximo da **HEAD** deve apontar o _previous_ para o novo `Node`;

    3.2. Ponteiro _next_ da **HEAD** deve apontar para o novo `Node`.

Vamos ver na prática esses passos que definimos acima:

> doubly_linked_list.py

```language-python
# from doubly_node import DoublyNode


class DoublyLinkedList:
    # ...

    def insert_first(self, value):
        node_value = DoublyNode(value)                 # passo 1
        node_value.next = self.head.next               # passo 2.1
        node_value.previous = self.head                # passo 2.2
        node_value.next.previous = node_value          # passo 3.1
        self.head.next = node_value                    # passo 3.2
        self.__length += 1
```

#### Inserir no final

Devemos informar que o elemento que estamos inserindo seja o anterior `previous` da cauda `TAIL`. Sendo assim os seguintes passos devem ser obedecidos:

1. Criar novo `DoublyNode` com o conteúdo a ser inserido.

2. Acoplar este novo `Node` a estrutura:

    2.1. Ponteiro _previous_ deve apontar para o _previous_ da **TAIL**;

    2.2. Ponteiro _next_ deve apontar para **TAIL**.

3. Atualizar ponteiros da estrutura para apontar ao novo `Node`:

    3.1. Antigo `Node` anterior da **TAIL** deve apontar o _next_ para o novo `Node`;

    3.2. Ponteiro _previous_ da **TAIL** deve apontar para o novo `Node`.

Vamos ver na prática esses passos que definimos acima:

> doubly_linked_list.py

```language-python
# from doubly_node import DoublyNode


class DoublyLinkedList:
    # ...

    def insert_last(self, value):
        node_value = DoublyNode(value)                 # passo 1
        node_value.previous = self.tail.previous       # passo 2.1
        node_value.next = self.tail                    # passo 2.2
        node_value.previous.next = node_value          # passo 3.1
        self.tail.previous = node_value                # passo 3.2
        self.__length += 1
```

Vejam que, diferentemente do conteúdo anterior sobre `LinkedList`, onde usamos uma variável auxiliar `current_value` para percorrer toda a cadeia de `Nodes`, com a lista duplamente ligada temos acesso direto ao ultimo elemento da estrutura.

#### Inserir em qualquer posição

Devemos informar que o elemento que estamos inserindo seja adicionado na posição desejada em nossa estrutura. Sendo assim os seguintes passos devem ser obedecidos:

1. Posição inferior a `1`, será adicionado na posição inicial, utilizando a função `insert_first`.

2. Posição igual ou superior a quantidade de elementos será adicionado na posição final, utilizando a função `insert_last`.

3. Criar novo `DoublyNode` com o conteúdo a ser inserido.

4. Percorrer estrutura e retornar o elemento da posição `N`.

5. Acoplar este novo `Node` a estrutura:

    5.1. Ponteiro _next_ deve apontar para o _node_, retornado no passo `#4`;

    5.2. Ponteiro _previous_ deve apontar para o _previous_ do _node_, retornado no passo `#4`.

6. Atualizar ponteiros da estrutura para apontar ao novo `Node`:

    6.1. Antigo `Node` anterior ao `Node` retornado deve apontar o _next_ para o novo `Node`;

    6.2. Ponteiro _previous_ do  `Node` retornado deve apontar para o novo `Node`.

> Temos que a primeira posição, assim como em arrays, seja considerada como `0`.

Vamos ver na prática esses passos que definimos acima:

> doubly_linked_list.py

```language-python
# from doubly_node import DoublyNode


class DoublyLinkedList:
    # ...

    def insert_at(self, value, position):
        if position < 1:                                    # passo 1
            return self.insert_first(value)
        if position >= len(self):                           # passo 2
            return self.insert_last(value)
        new_node = DoublyNode(value)                        # passo 3
        position_node = self.__get_node_at(position)        # passo 4
        new_node.next = position_node                       # passo 5.1
        new_node.previous = position_node.previous          # passo 5.2
        new_node.previous.next = new_node                   # passo 6.1
        position_node.previous = new_node                   # passo 6.2
        self.__length += 1
```

Iremos voltar nossos esforços apenas para a parte que estava "descoberta". Ou seja, voltamos a nossa lógica apenas para as posições do meio da nossa estrutura. Utilizamos a função `__get_node_at`, vista no conteúdo passado, onde ela é capaz de retornar o `Node` baseado em sua posição.

#### Remover no início

Devemos fazer com que a nossa estrutura remova o `next` da `HEAD`. Sendo assim os seguintes passos devem ser obedecidos:

1. Checar se a lista está vazia. Caso esteja, deverá retornar `None`.

2. Identificar o primeiro `Node` da estrutura:

    2.1. Capturar o elemento _next_ da **HEAD** a ser removido;

    2.2. Separar o próximo elemento que será o novo primeiro elemento da estrutura.

3. Atualizar ponteiros da estrutura para desacoplar o `node` identificado no passo `#2.1`:

    3.1. Antigo próximo da **HEAD** deve apontar o _next_ para o `Node` identificado no passo `#2.2`;

    3.2. Ponteiro _previous_ do `node`, do passo `#2.2`, deve apontar para **HEAD**.

4. _Resetar_ os ponteiros do `Node` a ser removido, para que não aponte mais para a lista.

Vamos ver na prática esses passos que definimos acima:

> doubly_linked_list.py

```language-python
# from doubly_node import DoublyNode


class DoublyLinkedList:
    # ...

    def remove_first(self):
        value_to_be_removed = None
        if not self.is_empty():                                         # passo 1
            value_to_be_removed = self.head.next                        # passo 2.1
            element_later_than_removed = value_to_be_removed.next       # passo 2.2
            self.head.next = element_later_than_removed                 # passo 3.1
            element_later_than_removed.previous = self.head             # passo 3.2
            value_to_be_removed.reset()                                 # passo 4
            self.__length -= 1
        return value_to_be_removed
```

Como a operação de _reset_ de `Nodes` será realizada em todas as funções de remoção, vamos criar uma função na classe `DoublyNode` responsável por apontar todos os ponteiros para `None`:

> doubly_node.py

```language-python
class DoublyNode:
    # ...

    def reset(self):
        self.next = None
        self.previous = None
```

#### Remover no final

Devemos fazer com que a nossa estrutura remova o `previous` da `TAIL`. Sendo assim os seguintes passos devem ser obedecidos:

1. Checar se a lista está vazia. Caso esteja, deverá retornar `None`.

2. Identificar o ultimo `Node` da estrutura:

    2.1. Capturar o elemento _previous_ da **TAIL** a ser removido;

    2.2. Separar o elemento anterior a ele que será o novo ultimo elemento da estrutura.

3. Atualizar ponteiros da estrutura para desacoplar o `node` identificado no passo `#2.1`:

    3.1. Ponteiro _previous_ da **TAIL** deve apontar para o `Node` identificado no passo `#2.2`;

    3.2. Ponteiro _next_ do node, do passo `#2.2`, deve apontar para **TAIL**.

4. _Resetar_ os ponteiros do `Node` a ser removido, para que não aponte mais para a lista.

Vamos ver na prática esses passos que definimos acima:

> doubly_linked_list.py

```language-python
# from doubly_node import DoublyNode


class DoublyLinkedList:
    # ...

    def remove_last(self):
        value_to_be_removed = None
        if not self.is_empty():                                          # passo 1
            value_to_be_removed = self.tail.previous                     # passo 2.1
            element_later_than_removed = value_to_be_removed.previous    # passo 2.2
            self.tail.previous = element_later_than_removed              # passo 3.1
            element_later_than_removed.next = self.tail                  # passo 3.2
            value_to_be_removed.reset()                                  # passo 4
            self.__length -= 1
        return value_to_be_removed
```

Vejam que, diferentemente do conteúdo anterior sobre `LinkedList`, onde usamos uma variável auxiliar `current_value` para percorrer toda a cadeia de `Nodes`, com a lista duplamente ligada temos acesso direto ao ultimo elemento da estrutura.

#### Remover em qualquer posição

Devemos informar a posição do elemento que desejamos a remoção de nossa estrutura. Sendo assim os seguintes passos devem ser obedecidos:

1. Posição inferior a `1`, será removido na posição inicial, utilizando a função `remove_first`.

2. Posição igual ou superior a quantidade de elementos será removido na posição final, utilizando a função `remove_last`.

3. Checar se a lista está vazia. Caso esteja, deverá retornar `None`.

4. Percorrer estrutura e retornar o elemento da posição `N`.

5. Identificar `Nodes` ao redor do que será removido:

    5.1. Identificar qual o `Node` anterior ao retornado no passo `#4`;

    5.2. Identificar qual o próximo `Node` ao retornado no passo `#4`.

6. Atualizar ponteiros da estrutura para desacoplar o `node` identificado no passo `#4`:

    6.1. Ponteiro _next_ do `Node` do passo `#5.1` deve apontar para o `Node` identificado no passo `#5.2`;

    6.2. Ponteiro _previous_ do Node do passo `#5.2` deve apontar para o `Node` identificado no passo `#5.1`.

7. _Resetar_ os ponteiros do `Node` a ser removido, para que não aponte mais para a lista.

Vamos ver na prática esses passos que definimos acima:

> doubly_linked_list.py

```language-python
# from doubly_node import DoublyNode


class DoublyLinkedList:
    # ...

    def remove_at(self, position):
        if position < 1:                                               # passo 1
            return self.remove_first()
        if position >= len(self):                                      # passo 2
            return self.remove_last()
        value_to_be_removed = None
        if not self.is_empty():                                        # passo 3
            value_to_be_removed = self.__get_node_at(position)         # passo 4

            previous_to_be_removed = value_to_be_removed.previous      # passo 5.1
            next_to_be_removed = value_to_be_removed.next              # passo 5.2
            previous_to_be_removed.next = next_to_be_removed           # passo 6.1
            next_to_be_removed.previous = previous_to_be_removed       # passo 6.2
            value_to_be_removed.reset()                                # passo 7
            self.__length -= 1

        return value_to_be_removed
```

Iremos voltar nossos esforços apenas para a parte que estava "descoberta". Ou seja, voltamos a nossa lógica apenas para as posições do meio da nossa estrutura. Utilizamos a função `__get_node_at`, vista no conteúdo passado, onde ela é capaz de retornar o `Node` baseado em sua posição.

#### Obter elemento em qualquer posição

Devemos informar a posição do elemento que desejamos visualizar o conteúdo, esta função deve retornar uma cópia do `node` existente em nossa estrutura. Sendo assim os seguintes passos devem ser obedecidos:

1. Posição inferior a `1`, será retornado o conteúdo da posição inicial.

2. Posição igual ou superior a quantidade de elementos será retornado o conteúdo da posição final.

3. Caso a lista esteja vazia deverá ser retornado `None`.

Vamos ver na prática esses passos que definimos acima:

> doubly_linked_list.py

```language-python
# from doubly_node import DoublyNode


class DoublyLinkedList:
    # ...

    def get_element_at(self, position):
        value_returned = None
        value_to_be_returned = self.__get_node_at(position)
        if value_to_be_returned:
            value_returned = DoublyNode(value_to_be_returned.value)
        return value_returned
```

#### Está vazia

Devemos informar se a estrutura está vazia. Como possuímos um campo `length`, podemos utilizá-lo como ponto a ser analisado, afinal, se o mesmo for `0`, nossa estrutura não possui elementos.

> doubly_linked_list.py

```language-python
# from doubly_node import DoublyNode


class DoublyLinkedList:
    # ...

    def is_empty(self):
        return not self.__length
```

Como já vimos em conteúdos passados, o uso do `not` neste contexto nos informa se a estrutura está vazia, já que `not 0 == True`.

#### Por fim nossa classe ficou assim:

> doubly_linked_list.py

```language-python
from doubly_node import DoublyNode


class DoublyLinkedList:

    def __init__(self):
        self.head = DoublyNode("HEAD")
        self.tail = DoublyNode("TAIL")
        self.head.next = self.tail
        self.tail.previous = self.head
        self.__length = 0

    def __str__(self):
        return f"DoublyLinkedList(len={self.__length} value={self.head})"

    def __len__(self):
        return self.__length

    def insert_first(self, value):
        node_value = DoublyNode(value)
        node_value.next = self.head.next
        node_value.previous = self.head
        node_value.next.previous = node_value
        self.head.next = node_value
        self.__length += 1

    def insert_last(self, value):
        node_value = DoublyNode(value)
        node_value.previous = self.tail.previous
        node_value.next = self.tail
        node_value.previous.next = node_value
        self.tail.previous = node_value
        self.__length += 1

    def insert_at(self, value, position):
        if position < 1:
            return self.insert_first(value)
        if position >= len(self):
            return self.insert_last(value)
        new_node = DoublyNode(value)
        position_node = self.__get_node_at(position)
        new_node.next = position_node
        new_node.previous = position_node.previous
        new_node.previous.next = new_node
        position_node.previous = new_node
        self.__length += 1

    def remove_first(self):
        value_to_be_removed = None
        if not self.is_empty():
            value_to_be_removed = self.head.next
            element_later_than_removed = value_to_be_removed.next
            self.head.next = element_later_than_removed
            element_later_than_removed.previous = self.head
            value_to_be_removed.reset()
            self.__length -= 1
        return value_to_be_removed

    def remove_last(self):
        value_to_be_removed = None
        if not self.is_empty():
            value_to_be_removed = self.tail.previous
            element_later_than_removed = value_to_be_removed.previous
            self.tail.previous = element_later_than_removed
            element_later_than_removed.next = self.tail
            value_to_be_removed.reset()
            self.__length -= 1
        return value_to_be_removed

    def remove_at(self, position):
        if position < 1:
            return self.remove_first()
        if position >= len(self):
            return self.remove_last()
        value_to_be_removed = None
        if not self.is_empty():
            value_to_be_removed = self.__get_node_at(position)

            previous_to_be_removed = value_to_be_removed.previous
            next_to_be_removed = value_to_be_removed.next

            previous_to_be_removed.next = next_to_be_removed
            next_to_be_removed.previous = previous_to_be_removed

            value_to_be_removed.reset()
            self.__length -= 1

        return value_to_be_removed

    def get_element_at(self, position):
        value_returned = None
        value_to_be_returned = self.__get_node_at(position)
        if value_to_be_returned:
            value_returned = DoublyNode(value_to_be_returned.value)
        return value_returned

    def __get_node_at(self, position):
        value_to_be_returned = None
        if self.head.next != self.tail:
            value_to_be_returned = self.head.next
            while position > 0:
                value_to_be_returned = value_to_be_returned.next
                position -= 1
        return value_to_be_returned

    def is_empty(self):
        return not self.__length


# Para testar, apenas rode o arquivo com: `python3 doubly_linked_list.py` :)
if __name__ == "__main__":
    doubly_linked_list = DoublyLinkedList()

    print(doubly_linked_list.is_empty()) # saída: True
    doubly_linked_list.insert_first(1)
    print(doubly_linked_list) # saída: DoublyLinkedList(len=1 value=Node(value=HEAD next=Node(value=1 next=Node(value=TAIL next=None))))

    doubly_linked_list.insert_first(2)
    print(doubly_linked_list) # saída: DoublyLinkedList(len=2 value=Node(value=HEAD next=Node(value=2 next=Node(value=1 next=Node(value=TAIL next=None)))))

    doubly_linked_list.insert_last(3)
    print(doubly_linked_list) # saída: DoublyLinkedList(len=3 value=Node(value=HEAD next=Node(value=2 next=Node(value=1 next=Node(value=3 next=Node(value=TAIL next=None))))))

    doubly_linked_list.remove_last()
    print(doubly_linked_list) # saída: DoublyLinkedList(len=2 value=Node(value=HEAD next=Node(value=2 next=Node(value=1 next=Node(value=TAIL next=None)))))

    doubly_linked_list.remove_first()
    print(doubly_linked_list) # saída: DoublyLinkedList(len=1 value=Node(value=HEAD next=Node(value=1 next=Node(value=TAIL next=None))))

    doubly_linked_list.insert_at(5, 1)
    print(doubly_linked_list) # saída: DoublyLinkedList(len=2 value=Node(value=HEAD next=Node(value=1 next=Node(value=5 next=Node(value=TAIL next=None)))))

    doubly_linked_list.remove_at(0)
    print(doubly_linked_list) # saída: DoublyLinkedList(len=1 value=Node(value=HEAD next=Node(value=5 next=Node(value=TAIL next=None))))

    doubly_linked_list.insert_at(6, 1)
    doubly_linked_list.insert_at(7, 2)
    doubly_linked_list.insert_at(8, 3)
    doubly_linked_list.insert_at(9, 4)
    print(doubly_linked_list.get_element_at(3)) # saída: Node(value=8 next=None)
```

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

Agora que já passamos pelas características da lista, está na hora de aquecermos a cabeça e colocarmos em prática o que já aprendemos.

Link presente no slack  ‍💻

<%= figure(%{src: "/computer-science/data-structures/doubly-linked-list/images/fresh_heating_the_head.gif", caption: "Will Smith - heating the head", class: "text-center rounded mx-auto d-block"}) %>

---

## Exercícios

###### Tempo sugerido para realização: 120 minutos

<%= versioning_your_code(@conn) %>

### Agora a prática

Com isso concluímos o conteúdo sobre o `TAD DoublyLinkedLists`, foi muito bom passar esse tempo com vocês. É um _momento que temos que festejar_.

<%= figure(%{src: "/computer-science/data-structures/doubly-linked-list/images/carlton.gif", caption: "Carlton - It's not unusual to have fun with anyone", class: "text-center rounded mx-auto d-block"}) %>

Mas é claro que para não deixar um gostinho de quero mais, temos aqui alguns exercícios para fixar o conteúdo 😀

**Exercício 1**: Remover duplicatas de uma `DoublyLinkedList`, [atividade extraída e adaptada do LeetCode.](https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/) Nesta atividade será necessário implementar um algoritmo que receba uma `DoublyLinkedList` como argumento e retorne uma nova lista, sem elementos que possuem mais de uma ocorrência.

```language-python
# input: 1 <-> 1 <-> 2
# saída: 2

# input: 1 <-> 1 <-> 2 <-> 3 <-> 3
# saída: 2

# input: 1 <-> 2 <-> 3 <-> 3
# saída: 1 <-> 2
```

**Exercício 2**: Algoritmo de Ordenação `Bubble Sort`. Nesta atividade será necessário implementar um algoritmo que receba uma `DoublyLinkedList` de inteiros, desordenada. O algoritmo retornará a mesma lista, no entanto, com os elementos ordenados.

> 💡 Também conhecido como ordenação por bolha (bubble sort), têm esse nome, pois a movimentação dos elementos lembra o movimento das bolhas em um refrigerante. São realizadas múltiplas iterações sobre a coleção, sempre comparando o valor ao item adjacente e realizando a troca daqueles que estão fora de ordem. A cada iteração o próximo maior valor é colocado em sua posição correta, ou seja, cada item se desloca como uma bolha para a posição a qual pertence.

```language-python
# input: 100 <-> 4 <-> 6 <-> 33 <-> 56 <-> 67
# saída: 4 <-> 6 <-> 33 <-> 56 <-> 67 <-> 100
```

### Bônus

Baseado nos conhecimentos adquiridos neste bloco, e para relembrar as `TADs` vistas em conteúdos passados, implemente a seguinte `TAD`, utilizando a _DoublyLinkedList_ como a estrutura interna:

**Exercício 1**: _Deque_ => Crie uma classe `Deque`, onde deve conter as operações: `push_front`, `push_back`, `pop_front`, `pop_back`, `peek_front` e `peek_back`.

---

## Recursos adicionais (opcional)

- [Doubly Linked Lists and How to Implement Them in Python 3](https://medium.com/@RaymondDashWu/doubly-linked-lists-and-how-to-implement-them-in-python-3-6c672c9b06d8) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Cifra de Cesar com listas duplamente encadeadas e Python](https://medium.com/@joorge.lm/cifra-de-cesar-com-listas-duplamente-encadeadas-e-python-1fa2bd350a29) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Lista duplamente ligada](https://pt.wikipedia.org/wiki/Lista_duplamente_ligada) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
