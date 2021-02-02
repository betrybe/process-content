## Gabarito dos exercícios

A seguir encontra-se uma sugestão de solução para o exercício proposto.

**Exercício 1**: Remover duplicatas de uma `DoublyLinkedList`, [atividade extraída e adaptada do LeetCode.](https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/) Nesta atividade será necessário implementar um algoritmo que receba uma `DoublyLinkedList` como argumento e retorne uma nova lista, sem elementos que possuem mais de uma ocorrência.

```language-python
# input: 1 <-> 1 <-> 2
# saída: 2

# input: 1 <-> 1 <-> 2 <-> 3 <-> 3
# saída: 2

# input: 1 <-> 2 <-> 3 <-> 3
# saída: 1 <-> 2
```

> Nesta atividade vamos utilizar a função criada na aula passada  `LinkedList` para que possamos identificar se o elemento que já foi removido da lista ainda possui alguma referência na estrutura, caso não tenha, o adicionaremos na nova lista.

```language-python
class DoublyLinkedList:
    # ...
    def index_of(self, value):
        position = 1
        current_value = self.head.next
        while current_value != self.tail:
            if current_value.value == value:
                return position
            current_value = current_value.next
            position += 1
        return -1


def delete_duplicates(linkedList):
    list_with_unique_elements = DoublyLinkedList()

    while linkedList:
        current_node = linkedList.remove_first()
        if linkedList.index_of(current_node.value) == -1:
            list_with_unique_elements.insert_last(current_node.value)

    return list_with_unique_elements
```

**Exercício 2**: Algoritmo de Ordenação `Bubble Sort`. Nesta atividade será necessário implementar um algoritmo que receba uma `DoublyLinkedList` de inteiros, desordenada. O algoritmo retornará a mesma lista, no entanto, com os elementos ordenados.

> 💡 Também conhecido como ordenação por bolha (bubble sort), têm esse nome, pois a movimentação dos elementos lembra o movimento das bolhas em um refrigerante. São realizadas múltiplas iterações sobre a coleção, sempre comparando o valor ao item adjacente e realizando a troca daqueles que estão fora de ordem. A cada iteração o próximo maior valor é colocado em sua posição correta, ou seja, cada item se desloca como uma bolha para a posição a qual pertence.

```language-python
# input: 100 <-> 4 <-> 6 <-> 33 <-> 56 <-> 67
# saída: 4 <-> 6 <-> 33 <-> 56 <-> 67 <-> 100
```

> Algoritmo de Ordenação Bubble Sort

```language-python
def bubble_sort(doubly_list: DoublyLinkedList):
    has_swapped = True
    num_of_iterations = 0
    while has_swapped:
        has_swapped = False
        for i in range(len(doubly_list) - num_of_iterations - 1):

            first_node = doubly_list.get_node_at(i)
            second_node = first_node.next

            if int(first_node.value) > int(second_node.value):
                first_node.next = second_node.next
                second_node.next = first_node

                second_node.previous = first_node.previous
                first_node.previous = second_node

                second_node.previous.next = second_node
                first_node.next.previous = first_node

                has_swapped = True
        num_of_iterations += 1
    return doubly_list
```

### Bônus

**Exercício 1**: _Deque_ => Crie uma classe `Deque`, onde deve conter as operações: `push_front`, `push_back`, `pop_front`, `pop_back`, `peek_front` e `peek_back`.

> Para este desafio, é necessário efetuar o `import` da classe `DoublyLinkedList` e `DoublyNode` e utilizar seus métodos de acesso para simular um `Deque`.

```language-python
class Deque:
    def __init__(self):
        self.__data = DoublyLinkedList()

    def is_empty(self):
        return not len(self.__data)

    def push_front(self, value):
        self.__data.insert_first(value)

    def push_back(self, value):
        self.__data.insert_last(value)

    def pop_front(self):
        return self.__data.remove_first()

    def pop_back(self):
        return self.__data.remove_last()

    def peek_front(self):
        return self.__data.get_element_at(0)

    def peek_back(self):
        return self.__data.get_element_at(len(self.__data))
```
