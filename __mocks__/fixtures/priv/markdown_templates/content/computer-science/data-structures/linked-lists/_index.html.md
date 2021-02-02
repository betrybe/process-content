## O que vamos aprender?

Neste bloco vamos aprender sobre mais um dos tipos abstratos de dados (`TAD`) mais popular em meio as **estruturas de dados**.

Veremos o comportamento das listas, e como elas estão presentes em outras `TADs` que já utilizamos neste curso.

### Você será capaz de:

- Importância de um Nó (_Node_) no desenvolvimento de software;

- Entender o funcionamento do `TAD` Lista Ligada (_LinkedList_);

- Implementar as principais operações de uma lista.

---

## Por que isso é importante?

As listas ligadas (_LinkedLists_) oferecem algumas vantagens importantes sobre outras estruturas de dados lineares. Ao contrário dos _arrays_, as `LinkedLists` são uma estrutura de dados dinâmica, redimensionável em tempo de execução. Além disso, as operações de inserção e exclusão são eficientes e facilmente implementadas.

Com as listas ligas nós também podemos fazer uma pilha e uma lista, assim como outras estruturas de dados. Além disso, podemos fazer implementações de gráficos, alocação de memória dinâmica, dentre outras aplicações.

A lista ligada é amplamente utilizada e considerada importante. Ela é uma estrutura de dados linear e pode ajudar muito no entendimento de estruturas de dados não lineares como árvores, e também pode ajudar a identificar complexidades.

---

## Conteúdos

###### Tempo sugerido para realização: 80 minutos

### O que é um Node?

_Node_, ou nó em português, é o componente mais importante da estrutura, ele é composto por um valor que pode ser de qualquer tipo e um indicador/ponteiro para o próximo _Node_.

Podemos comparar um _Node_ com um container, onde um valor é armazenado, e para termos acesso a este elemento, devemos acessar primeiramente seu container.

<%= figure(%{src: "/computer-science/data-structures/linked-lists/images/node.png", caption: "Node Structure", class: "text-center rounded mx-auto d-block"}) %>

### O que é uma **LinkedList**?

Uma _LinkedList_ representa uma sequência finita de elementos, admitindo elementos repetidos, é uma `TAD` onde os elementos não são armazenados em memória contígua, assim como um _array_. Isto significa que a própria estrutura é responsável por indicar a posição dos elementos que a compõem. Isto é possível graças ao _Node_. Em outras palavras uma `LinkedList` é uma coleção de _Nodes_.

<%= figure(%{src: "/computer-science/data-structures/linked-lists/images/LinkedList.png", caption: "LinkedList Structure", class: "text-center rounded mx-auto d-block"}) %>

Ao implementar os exercícios das aulas anteriores, você deve ter notado que quando criamos a `Stack` e a `Deque` já utilizamos essa abordagem através do tipo `List` do Python, isso quer dizer que elas também eram listas encadeadas?

> Não exatamente, porque possuíam comportamentos encapsulados que as definem como pilhas e Deque, mas a maneira como os nodes estavam organizados era exatamente igual à uma lista encadeada.

Diferentemente das `TADs` anteriores, as `LinkedLists`, não tem as restrições:

- Acessar apenas o primeiro elemento - Fila;

- Acessar apenas o ultimo elemento - Pilha;

- Acessar apenas as extremidades - Deque.

Ou seja, em uma lista encadeada é possível acessar qualquer elemento, sem exceção.

### Quais as operações mais comuns?

Ao se manipular uma _LinkedList_ existem algumas operações que são comumente utilizadas:

- A operação **insert_first** nos permite adicionar um `Node` no inicio da lista;

- A operação **insert_last** nos permite adicionar um `Node` no final da lista;

- A operação **insert_at** nos permite adicionar um `Node` em qualquer posição da lista;

- A operação **remove_first** nos permite remover um `Node` do inicio da lista;

- A operação **remove_last** nos permite remover um `Node` do final da lista;

- A operação **remove_at** nos permite remover um `Node` em qualquer posição da lista;

- A operação **clear** nos permite remover todos os `Nodes` da lista;

- A operação **get_element_at** nos permite visualizar o `Node` em qualquer posição da lista;

- A operação **is_empty** nos permite identificar se existe ao menos um `Node` na lista.

<%= figure(%{src: "/computer-science/data-structures/linked-lists/images/complexity_table.png", class: "text-center rounded mx-auto d-block", width: "800px", height: "auto"}) %>

Vamos ver um vídeo para fixarmos melhor o funcionamento de uma `LinkedList`:

<%= vimeo "460749225" %>

### Implementação de um Node

Primeiro iremos declarar o construtor da classe `Node`. Em seguida, declararemos a propriedade  que indica o próximo elemento (`next`) como tendo o valor, por _default_, `None`:

> node.py

```language-python
class Node:
    def __init__(self, value):
        self.value = value
        self.next = None

    def __str__(self):
        return f"Node(value={self.value}, next={self.next})"
```

### Implementação de uma LinkedList

Devemos utilizar a classe criada anteriormente, para criar nossa estrutura da `LinkedList`:

> linked_list_content.py

```language-python
from node import Node


class LinkedList:
    def __init__(self):
        self.head_value = None
        self.__length = 0

    def __str__(self):
        return f"LinkedList(len={self.__length}, value={self.head_value})"

    def __len__(self):
        return self.__length
```

Utilizamos o conceito `Literal String Interpolation` na função `__str__`, caso haja dúvidas, deem uma olhada na _doc_ do [pep-0498.](https://www.python.org/dev/peps/pep-0498/) {: .external-link target="_blank" rel="noreferrer noopener" }

Agora vamos implementar as operações do `LinkedList` para entendermos melhor as funcionalidades dessa estrutura de dados.

#### Inserir no início

Devemos informar que o elemento que estamos inserindo seja o novo `head_value`:

> linked_list_content.py

```language-python
# from node import Node


class LinkedList:
    # ...

    def insert_first(self, value):
        first_value = Node(value)
        self.head_value = first_value
        self.__length += 1
```

Caso optemos por inserir o valor 3, teremos o resultado:

```language-md
LinkedList(len=1 value=Node(value=3 next=None))
```

No entanto, seguir essa abordagem faz com que os elementos anteriores sejam sobrepostos pelo novo. Dito isso, devemos indicar que o elemento atual, `head_value`, será o `next` do elemento que estamos inserindo.

Resumindo, o `next` será preenchido com o valor que está atualmente na `head_value`, para que o novo valor, que estamos inserindo no início da lista, seja preenchido na variável `head_value`, se tornando a "cabeça" da lista.

> linked_list_content.py

```language-python
# from node import Node


class LinkedList:
    # ...

    def insert_first(self, value):
        first_value = Node(value)
        first_value.next = self.head_value
        self.head_value = first_value
        self.__length += 1
```

Desta forma, adicionando o valor 3 e posteriormente o valor 1 teremos o resultado:

```language-md
LinkedList(len=2 value=Node(value=1 next=Node(value=3 next=None)))
```

#### Inserir no final

Devemos informar que o elemento que estamos inserindo seja o ultimo na nossa estrutura de cadeia de `Nodes`:

> linked_list_content.py

```language-python
# from node import Node


class LinkedList:
    # ...

    def insert_last(self, value):
        last_value = Node(value)
        current_value = self.head_value

        while current_value.next:
            current_value = current_value.next
        current_value.next = last_value
        self.__length += 1
```

Idealmente esta abordagem estaria correta, desde que houvesse ao menos um elemento em nossa estrutura. Porém, caso não haja nenhum elemento, o trecho: `while current_value.next:` causaria o erro: `AttributeError: 'NoneType' object has no attribute 'next'`.

Isso acontece, pois o `head_value` ainda não possui valor. Para corrigir essa lógica, podemos utilizar a função `insert_first` escrita previamente.

> linked_list_content.py

```language-python
# from node import Node


class LinkedList:
    # ...

    def insert_last(self, value):
        last_value = Node(value)
        current_value = self.head_value

        if self.is_empty():
            return self.insert_first(value)

        while current_value.next:
            current_value = current_value.next
        current_value.next = last_value
        self.__length += 1
```

Desta forma, adicionando o valor 3 e posteriormente o valor 1 teremos o resultado:

```language-md
LinkedList(len=2 value=Node(value=3 next=Node(value=1 next=None)))
```

Percebam que usamos a variável auxiliar `current_value` para percorrer toda a cadeia de `Nodes`. Isto é necessário, pois assim não perdemos a referência para a cabeça da estrutura, `head_value`.

#### Inserir em qualquer posição

Devemos informar que o elemento que estamos inserindo seja adicionado na posição desejada em nossa estrutura.

> 💡 Lembrem-se: a primeira posição, assim como em _arrays_, será considerada como `0`

Levaremos em consideração as seguintes observações:

- Se o elemento tem a posição inferior a `1`, será adicionado na posição inicial, utilizando a função `insert_first`;

- Se o elemento tem a posição igual ou superior a quantidade de elementos, será adicionado na posição final, utilizando a função `insert_last`.

> linked_list_content.py

```language-python
# from node import Node


class LinkedList:
    # ...

    def insert_at(self, value, position):
        if position < 1:
            return self.insert_first(value)
        if position >= len(self):
            return self.insert_last(value)
        current_value = self.head_value
        while position > 1:
            current_value = current_value.next
            position -= 1
        next_value = Node(value)
        next_value.next = current_value.next
        current_value.next = next_value
        self.__length += 1
```

Desta forma podemos voltar nossos esforços apenas para a parte que estava "descoberta". Ou seja, voltamos a nossa lógica apenas para as posições do meio da nossa estrutura. A lógica é similar ao inserir no final `insert_last`, no entanto, não analisamos se existe um próximo, mas sim, se o próximo é a posição que queremos inserir o novo valor.

#### Remover no início

Devemos fazer com que a nossa estrutura remova a "cabeça", em casos de estrutura vazia, devemos retornar `None`:

> linked_list_content.py

```language-python
# from node import Node


class LinkedList:
    # ...

    def remove_first(self):
        value_to_be_removed = self.head_value
        if value_to_be_removed:
            self.head_value = self.head_value.next
            value_to_be_removed.next = None
            self.__length -= 1
        return value_to_be_removed
```

Dessa forma, fazemos com que o elemento `next` passe a ser o primeiro elemento, já que a `head_value` irá referenciá-lo

#### Remover no final

Devemos informar que o elemento que estamos removendo seja o ultimo da nossa estrutura de cadeia de `Nodes`. Os problemas vistos na sessão **Inserir no final** também se aplicam aqui.

Dito isso, caso tenhamos apenas um elemento em nossa estrutura, invocaremos a função de remoção existente, `remove_first`:

> linked_list_content.py

```language-python
# from node import Node


class LinkedList:
    # ...

    def remove_last(self):
        if len(self) <= 1:
            return self.remove_first()

        previous_to_be_removed = self.head_value
        value_to_be_removed = previous_to_be_removed.next

        while value_to_be_removed.next:
            previous_to_be_removed = previous_to_be_removed.next
            value_to_be_removed = previous_to_be_removed.next

        previous_to_be_removed.next = None
        self.__length -= 1
        return value_to_be_removed
```

Veja que essa função requer uma atenção especial, pois além de uma variável auxiliar que utilizamos como ponteiro para identificar o `Node` a ser removido, precisamos ter uma outra variável para indicar o `Node` anterior. Desta forma, indicamos que o `Node` anterior ao ultimo irá apontar para `None` como próximo, liberando assim a referência ao anteriormente tido como último em nossa estrutura.

#### Remover em qualquer posição

Devemos informar a posição do elemento que desejamos a remoção de nossa estrutura.

Levaremos em consideração as seguintes observações:

- Se o elemento tem a posição inferior a `1`, será removido na posição inicial, utilizando a função `remove_first`;

- Se o elemento tem a posição igual ou superior a quantidade de elementos, será removido na posição final, utilizando a função `remove_last`.

> linked_list_content.py

```language-python
# from node import Node


class LinkedList:
    # ...

    def remove_at(self, position):
        if position < 1:
            return self.remove_first()
        if position >= len(self):
            return self.remove_last()

        previous_to_be_removed = self.head_value
        while position > 1:
            previous_to_be_removed = previous_to_be_removed.next
            position -= 1
        value_to_be_removed = previous_to_be_removed.next
        previous_to_be_removed.next = value_to_be_removed.next
        value_to_be_removed.next = None
        self.__length -= 1
        return value_to_be_removed
```

Desta forma podemos voltar nossos esforços apenas para a parte que estava "descoberta". Ou seja, voltamos a nossa lógica apenas para as posições do meio da nossa estrutura. A lógica é similar ao remover do final `remove_last`, no entanto, não analisamos se existe um próximo, mas sim, se o próximo é a posição que queremos remover.

#### Obter elemento em qualquer posição

Devemos informar a posição do elemento que desejamos a visualizar o conteúdo, esta função deve retornar uma cópia do `Node` existente em nossa estrutura.

Levaremos em consideração as seguintes observações:

- Se o elemento tem a posição inferior a `1`, será retornado o conteúdo da posição inicial;

- Se o elemento tem a posição igual ou superior a quantidade de elementos, será retornado o conteúdo da posição final.

> linked_list_content.py

```language-python
# from node import Node


class LinkedList:
    # ...

    def get_element_at(self, position):
        value_returned = None
        value_to_be_returned = self.head_value
        if value_to_be_returned:
            while position > 0 and value_to_be_returned.next:
                value_to_be_returned = value_to_be_returned.next
                position -= 1
            if value_to_be_returned:
                value_returned = Node(value_to_be_returned.value)
        return value_returned
```

Um ponto de atenção para as verificações constantes presentes no código, elas indicam que:

- Caso não haja elementos em nossa estrutura será retornado `None`;

- Caso a posição seja menor igual a 0, será retornado o primeiro elemento;

- Caso a posição seja maior igual a `N`, onde `N` é o tamanho da lista, será retornado o último elemento.

Por fim, retornamos um novo `Node` com o mesmo valor do existente em nossa estrutura. Isto é necessário para que retornemos apenas o valor, e não a referência aos demais elementos.

#### Está vazia

Devemos informar se a estrutura está vazia, como possuímos um campo `length` podemos utilizá-lo como ponto a ser analisado, afinal se o mesmo for `0` nossa estrutura não possui elementos

> linked_list_content.py

```language-python
# from node import Node


class LinkedList:
    # ...

    def is_empty(self):
        return not self.__length
```

O uso do `not` neste contexto nos informa se a estrutura está vazia, já que `not 0 == True`.

#### Por fim nossa classe ficou assim:

> linked_list_content.py

```language-python
from node import Node


class LinkedList:

    def __init__(self):
        self.head_value = None
        self.__length = 0

    def __str__(self):
        return f"LinkedList(len={self.__length}, value={self.head_value})"

    def __len__(self):
        return self.__length

    def insert_first(self, value):
        first_value = Node(value)
        first_value.next = self.head_value
        self.head_value = first_value
        self.__length += 1

    def insert_last(self, value):
        last_value = Node(value)
        current_value = self.head_value

        if self.is_empty():
            return self.insert_first(value)

        while current_value.next:
            current_value = current_value.next
        current_value.next = last_value
        self.__length += 1

    def insert_at(self, value, position):
        if position < 1:
            return self.insert_first(value)
        if position >= len(self):
            return self.insert_last(value)
        current_value = self.head_value
        while position > 1:
            current_value = current_value.next
            position -= 1
        next_value = Node(value)
        next_value.next = current_value.next
        current_value.next = next_value
        self.__length += 1

    def remove_first(self):
        value_to_be_removed = self.head_value
        if value_to_be_removed:
            self.head_value = self.head_value.next
            value_to_be_removed.next = None
            self.__length -= 1
        return value_to_be_removed

    def remove_last(self):
        if len(self) <= 1:
            return self.remove_first()

        previous_to_be_removed = self.head_value
        value_to_be_removed = previous_to_be_removed.next

        while value_to_be_removed.next:
            previous_to_be_removed = previous_to_be_removed.next
            value_to_be_removed = previous_to_be_removed.next

        previous_to_be_removed.next = None
        self.__length -= 1
        return value_to_be_removed

    def remove_at(self, position):
        if position < 1:
            return self.remove_first()
        if position >= len(self):
            return self.remove_last()

        previous_to_be_removed = self.head_value

        while position > 1:
            previous_to_be_removed = previous_to_be_removed.next
            position -= 1

        value_to_be_removed = previous_to_be_removed.next
        previous_to_be_removed.next = value_to_be_removed.next
        value_to_be_removed.next = None
        self.__length -= 1

        return value_to_be_removed

    def get_element_at(self, position):
        value_returned = None
        value_to_be_returned = self.head_value
        if value_to_be_returned:
            while position > 0 and value_to_be_returned.next:
                value_to_be_returned = value_to_be_returned.next
                position -= 1
            if value_to_be_returned:
                value_returned = Node(value_to_be_returned.value)
        return value_returned

    def is_empty(self):
        return not self.__length


# Para testar, apenas rode o arquivo com: `python3 linked_list_content.py` :)
if __name__ == "__main__":
    linked_list = LinkedList()

    print(linked_list.is_empty())
    linked_list.insert_first(1)
    print(linked_list) # saída: LinkedList(len=1 value=Node(value=1 next=None))

    linked_list.insert_first(2)
    print(linked_list) # saída: LinkedList(len=2 value=Node(value=2 next=Node(value=1 next=None)))

    linked_list.insert_last(3)
    print(linked_list) # saída: LinkedList(len=3 value=Node(value=2 next=Node(value=1 next=Node(value=3 next=None))))

    linked_list.remove_last()
    print(linked_list) # saída: LinkedList(len=2 value=Node(value=2 next=Node(value=1 next=None)))

    linked_list.remove_first()
    print(linked_list) # saída: LinkedList(len=1 value=Node(value=1 next=None))

    linked_list.insert_at(5, 1)
    print(linked_list) # saída: LinkedList(len=2 value=Node(value=1 next=Node(value=5 next=None)))

    linked_list.remove_at(0)
    print(linked_list) # saída: LinkedList(len=1 value=Node(value=5 next=None))

    linked_list.insert_at(6, 1)
    linked_list.insert_at(7, 2)
    linked_list.insert_at(8, 3)
    linked_list.insert_at(9, 4)
    print(linked_list.get_element_at(3)) # saída: Node(value=8 next=None)
```

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

Agora que já passamos pelas características da lista, está na hora de aquecermos a cabeça e colocarmos em prática o que já aprendemos.

Link presente no slack  ‍💻

<%= figure(%{src: "/computer-science/data-structures/linked-lists/images/fresh_heating_the_head.gif", caption: "Will Smith - heating the head", class: "text-center rounded mx-auto d-block"}) %>

---

## Exercícios

###### Tempo sugerido para realização: 120 minutos

<%= versioning_your_code(@conn) %>

### Agora a prática

Com isso concluímos o conteúdo sobre o `TAD LinkedLists`, foi muito bom passar esse tempo com vocês. É um _momento que temos que festejar_.

<%= figure(%{src: "/computer-science/data-structures/linked-lists/images/carlton.gif", caption: "Carlton - It's not unusual to have fun with anyone", class: "text-center rounded mx-auto d-block"}) %>

Mas é claro que para não deixar um gostinho de quero mais, temos aqui alguns exercícios para fixar o conteúdo 😀

**Exercício 1:** _Aprimorando a classe `Lista`_: nossa classe `Lista` atende as principais operações que essa `TAD` nos oferece, mas que tal melhorarmos? Para isso, você deve adicionar os seguintes métodos:

**a.** A operação `clear` nos permite remover todos os `Nodes` da lista;

**b.** A operação `__get_node_at` nos permite acessar o `Node` em qualquer posição da lista.

> Após criada as operações anteriores, refatore os seguintes métodos para que utilizem a `__get_node_at` ante iterações:

- **insert_at**;

- **insert_last**;

- **remove_last**;

- **remove_at**;

- **get_element_at**.

**Exercício 2:** _Nova busca_: até o momento nossa estrutura consulta elementos através da posição. Nesta atividade será necessário criar uma função chamada `def index_of(self, value)`, onde ela será responsável por consultar na lista a existência do valor informado e retornar a posição da primeira ocorrência. Caso o valor não exista, considere retornar `-1`. Esta função deve respeitar a complexidade `O(n)`.

**Exercício 3:** remover duplicatas de uma `LinkedList`, [atividade extraída e adaptada do LeetCode](https://leetcode.com/problems/remove-duplicates-from-sorted-list/). Nesta atividade será necessário implementar um algorítmo que receba uma `LinkedList` como argumento e retorne uma nova lista sem elementos duplicados. Esta função deve respeitar a complexidade `O(n)`.

_Exemplo:_

```language-md
# input: 1 -> 1 -> 2
# saída: 1 -> 2

# input: 1 -> 1 -> 2 -> 3 -> 3
# saída: 1 -> 2 -> 3
```

### Bônus

Baseado nos conhecimentos adquiridos neste bloco, e para relembrar as `TADs` vistas em aulas passadas, implemente as seguintes `TADs`, utilizando a lista como a estrutura interna:

**Exercício 1:** _Pilhas_: crie uma classe `Stack`, onde deve conter as operações: `push`, `pop`, `peek` e `is_empty`.

**Exercício 2:** _Filas_: crie uma classe `Queue`, onde deve conter as operações: `enqueue`, `dequeue`, `peek` e `is_empty`.

---

## Recursos Adicionais (opcional)

- [#SideNotes - Linked List - Abstract Data Type and Data Structure](https://medium.com/@lucasmagnum/sidenotes-linked-list-abstract-data-type-and-data-structure-fd2f8276ab53) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Construindo uma Lista Encadeada em Python](https://www.youtube.com/watch?v=jIM87UqOq3g) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
