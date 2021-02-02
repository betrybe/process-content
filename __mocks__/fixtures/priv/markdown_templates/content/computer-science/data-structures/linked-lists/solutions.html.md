## Gabarito dos exercícios

A seguir encontra-se uma sugestão de solução para o exercício proposto.

**Exercício 1:** _Aprimorando a classe `Lista`_: nossa classe `Lista` atende as principais operações que essa `TAD` nos oferece, mas que tal melhorarmos? Para isso, você deve adicionar os seguintes métodos:

**a.** A operação `clear` nos permite remover todos os `Nodes` da lista;

**b.** A operação `__get_node_at` nos permite acessar o `Node` em qualquer posição da lista.

> Após criada as operações anteriores, refatore os seguintes métodos para que utilizem a `__get_node_at` ante iterações:

- **insert_at**;

- **insert_last**;

- **remove_last**;

- **remove_at**;

- **get_element_at**.

> 1 - a. `clear(self)` - Para este desafio existem `2` possibilidades de respostas a serem implementadas.
> O mais indicado, mas menos performático, é a opção `#2`, pois utilizam a própria estrutura para atribuir um novo comportamento.

```language-python
#1
def clear(self):
    self.head_value = None
    self.__length = 0
#2
def clear(self):
    while not self.is_empty():
        self.remove_first()
```

> 1 - b. `__get_node_at(self, position)` - Para este desafio foi realizado a extração do trecho de código mais repetitivo, que estava sendo utilizado nos demais métodos. Vale salientar que nos casos que precisamos do anterior ao ultimo, precisamos fazer a operação `len(self) - 2`.

```language-python
def __get_node_at(self, position):
    value_to_be_returned = self.head_value
    if value_to_be_returned:
        while position > 0 and value_to_be_returned.next:
            value_to_be_returned = value_to_be_returned.next
            position -= 1
    return value_to_be_returned
```

A refatoração nas demais funções ficaram da seguinte forma:

```language-python
def insert_at(self, value, position):
    if position < 1:
        return self.insert_first(value)
    if position >= len(self):
        return self.insert_last(value)
    current_value = self.__get_node_at(position - 1)
    next_value = Node(value)
    next_value.next = current_value.next
    current_value.next = next_value
    self.__length += 1

def insert_last(self, value):
    if self.is_empty():
        return self.insert_first(value)

    new_last_value = Node(value)
    actual_last_value = self.__get_node_at(len(self) - 1)
    actual_last_value.next = new_last_value
    self.__length += 1

def remove_last(self):
    if len(self) <= 1:
        return self.remove_first()

    previous_to_be_removed = self.__get_node_at(len(self) - 2)
    value_to_be_removed = previous_to_be_removed.next

    previous_to_be_removed.next = None
    self.__length -= 1
    return value_to_be_removed

def remove_at(self, position):
    if position < 1:
        return self.remove_first()
    if position >= len(self):
        return self.remove_last()

    previous_to_be_removed = self.__get_node_at(position - 1)

    value_to_be_removed = previous_to_be_removed.next
    previous_to_be_removed.next = value_to_be_removed.next
    value_to_be_removed.next = None
    self.__length -= 1

    return value_to_be_removed

def get_element_at(self, position):
    value_returned = None
    value_to_be_returned = self.__get_node_at(position)
    if value_to_be_returned:
        value_returned = Node(value_to_be_returned.value)
    return value_returned
```

---

**Exercício 2:** _Nova busca_: até o momento nossa estrutura consulta elementos através da posição. Nesta atividade será necessário criar uma função chamada `def index_of(self, value)`, onde ela será responsável por consultar na lista a existência do valor informado e retornar a posição da primeira ocorrência. Caso o valor não exista, considere retornar `-1`. Esta função deve respeitar a complexidade `O(n)`.

> Nesta atividade é necessário percorrer toda a lista. As condições de parada são a existência do valor ou ter percorrido toda a lista sem sucesso. O valor é retornado caso encontrado e `-1` caso contrário.

```language-python
def index_of(self, value):
    position = 1
    current_value = self.head_value
    while current_value:
        if current_value.value == value:
            return position
        current_value = current_value.next
        position += 1
    return -1
```

---

**Exercício 3:** remover duplicatas de uma `LinkedList`, [atividade extraída e adaptada do LeetCode](https://leetcode.com/problems/remove-duplicates-from-sorted-list/). Nesta atividade será necessário implementar um algorítmo que receba uma `LinkedList` como argumento e retorne uma nova lista sem elementos duplicados. Esta função deve respeitar a complexidade `O(n)`.

_Exemplo:_

```language-md
# input: 1 -> 1 -> 2
# saída: 1 -> 2

# input: 1 -> 1 -> 2 -> 3 -> 3
# saída: 1 -> 2 -> 3
```

> Nesta atividade estamos utilizando a função criada anteriormente, para que possamos identificar se o elemento já foi inserido na nova lista, caso não tenha sido, o adicionaremos:

```language-python
def delete_duplicates(linkedList):
    list_with_unique_elements = LinkedList()

    while linkedList:
        current_node = linkedList.remove_first()
        if list_with_unique_elements.index_of(current_node.value) == -1:
            list_with_unique_elements.insert_last(current_node.value)

    return list_with_unique_elements
```

**Nota:** são sim realizadas iterações `(for 1 a N) 2x`, sendo uma vez no `index_of` e uma vez no `insert_last`. Contudo, como visto na aula de complexidade de algoritmo, o resultado de `2 x N` é `O(n)`, pois a constante `2` é descartada.

### Bônus

**Exercício 1:** _Pilhas_: crie uma classe `Stack`, onde deve conter as operações: `push`, `pop`, `peek` e `is_empty`.

> Para este desafio, é necessário efetuar o `import` das classes `LinkedList` e `Node` e utilizar seus métodos de acesso para simular uma pilha, respeitando o padrão **LIFO**.

```language-python
class Stack:

    def __init__(self):
        self.__data = LinkedList()

    def is_empty(self):
        return not len(self.__data)

    def push(self, value):
        self.__data.insert_last(value)

    def pop(self):
        return self.__data.remove_last()

    def peek(self):
        return self.__data.get_element_at(len(self.__data))
```

---

**Exercício 2:** _Filas_: crie uma classe `Queue`, onde deve conter as operações: `enqueue`, `dequeue`, `peek` e `is_empty`.

> Para este desafio, é necessário efetuar o `import` das classes `LinkedList` e `Node` e utilizar seus métodos de acesso para simular uma fila, respeitando o padrão **FIFO**.

```language-python
class Queue:

    def __init__(self):
        self.__data = LinkedList()

    def is_empty(self):
        return not len(self.__data)

    def enqueue(self, value):
        self.__data.insert_last(value)

    def dequeue(self):
        return self.__data.remove_first()

    def peek(self):
        return self.__data.get_element_at(0)
```
