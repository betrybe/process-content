## Gabarito dos exercícios

A seguir encontra-se uma sugestão de solução para o exercício proposto.

**Exercício 1:** _Aprimorando a classe Deque_ - Nossa classe `Deque` já atende as principais operações que esse TAD nos oferece 🚀 mas que tal melhorarmos? Para isso você deve adicionar os seguintes métodos:

**a.** `clear(self)` - Este método deve ser responsável por limpar a estrutura, eliminando todos os elementos contidos dentro da deque.

**b.** `exists(self, value)` - Este método deve ser usado para indicar se o valor do argumento existe em nossa estrutura. Retorne `True` se existir e `False` caso contrário.

> Nota: Fique a vontade para escolher por qual extremidade será iniciada a consulta.

**c.** `peek(self, position, order)` - Este método deve ser usado para retornar o valor do conteúdo da posição indicada. A peculiaridade desse método é a ordem que essa consulta deve ser feita. Caso o campo `order` não seja informado, a consulta deve ser realizada através da extremidade da esquerda `front`, no entanto, caso o campo possua o valor `desc`, a consulta deve ser através da extremidade da direita `back`.

Como exemplo, assuma uma deque composto com os seguintes elementos:
<%= figure(%{src: "/computer-science/data-structures/deque/images/table-ex1-c.png", caption: "Tabela exercício 1-c.", class: "text-center rounded mx-auto d-block", width: "800px", height: "auto"}) %>

> **1 - a.** `clear(self)`. Para este desafio existem `5` possibilidades de respostas a serem implementadas.
> O mais indicado, mas menos performático, são as opções `#4` e `#5`, pois utilizam a própria estrutura para atribuir novos comportamentos:

```language-python
#1
def clear(self):
    self._data.clear()

#2
def clear(self):
    self._data = list()

#3
def clear(self):
    del self._data[:]

#4
def clear(self):
    while self._data:
        self.pop_back()

#5
def clear(self):
    while self._data:
        self.pop_front()
```

> **1 - b.** `exists(self, value)`. Para este desafio existem `2` possibilidades de respostas a serem implementadas:

```language-python
#1
def exists(self, value):
    return value in self._data

#2
def exists(self, value):
    return self._data.count(value) > 0
```

> **1 - c.** `def peek(self, position, order=None)`. Para este desafio adicione a atribuição `order=None`, visto que é um campo opcional.
> Na `#1` estamos utilizando a função `data[position]`. Uma alternativa análoga seria o uso de `__getitem__`.

```language-python
#1
def peek(self, position, order=None):
    if position < 0 or position > len(self) - 1:
        return None
    if not order:
        return self._data[position]
    return self._data[::-1][position]

#2
def peek(self, position, order=None):
    if position < 0 or position > len(self) - 1:
        return None

    if not order:
        for index, value in enumerate(self._data):
            if position == index:
                return value
    else:
        for index, value in enumerate(self._data[::-1]):
            if position == index:
                return value

    return None
```

**Exercício 2:** _Limitando capacidade da Deque_ - Uma das características da Deque é a capacidade de balanceamento, enviando conflitos ao inserir ou remover itens em suas extremidades. Nossa classe `Deque` já possui essa característica 🚀, no entanto, para termos melhor controle sobre a quantidade de itens que podemos ter em nossa fila de dois fins, você deve limitar a capacidade da mesma, assim, a estrutura deverá respeitar as seguintes afirmações:

- Realizar inserção em uma deque cheia causa overflow;

- Realizar remoção em uma deque vazia causa underflow;

Utilize o construtor da classe para definir a capacidade da estrutura, exemplo `Deque(10)`. Retorne _exceptions_, ao contemplar os pontos acima, exemplo: `raise Exception("Overflow")`.

> Para esse desafio, optaremos por limitar a quantidade via variável auxiliar e não alterar a estrutura do deque. Assim verificamos a capacidade da deque antes de cada operação:

```language-python
class Deque:
    FIRST_ELEMENT = 0

    def __init__(self, capacity=0):
        self._data = []
        self._capacity = capacity

    def __len__(self):
        return len(self._data)

    def __str__(self):
        return "Deque(" + ", ".join(str(x) for x in self._data) + ")"

    def is_empty(self):
        return not len(self)

    def is_full(self):
        return len(self) == self._capacity

    def push_front(self, value):
        if self.is_full():
            raise Exception("Overflow")
        self._data.insert(self.FIRST_ELEMENT, value)

    def push_back(self, value):
        if self.is_full():
            raise Exception("Overflow")
        self._data.append(value)

    def pop_front(self):
        if self.is_empty():
            raise Exception("Underflow")
        return self._data.pop(self.FIRST_ELEMENT)

    def pop_back(self):
        if self.is_empty():
            raise Exception("Underflow")
        return self._data.pop()
```

**Exercício 3:** _Desafio do Palíndromo_ - Uma palavra é um palíndromo se a sequência de letras que a forma é a mesma, quer seja lida da esquerda para a direita ou vice-versa.

Crie um algorítimo que, ao receber uma sequencia de caracteres, indique se ela é ou não um palíndromo. Para este exercício iremos considerar todas os caracteres como minúsculos e desconsiderar espaços, pontuação e caracteres especiais.

Use a tabela a seguir como exemplo para seus testes:
<%= figure(%{src: "/computer-science/data-structures/deque/images/table-ex-3.png", caption: "Tabela exercício 3.", class: "text-center rounded mx-auto d-block", width: "800px", height: "auto"}) %>

> Para esse desafio a maior preocupação é na inserção dos dados, pois não devem ser considerados caracteres especiais e espaços.
> Assim como tornar todos os caracteres minúsculos (ou maiúsculos, o que importa é o padrão), pós inserção, deve ser realizado a comparação do resultado do `pop` de cada extremidade.

```language-python
def isPalindromo(terms):
    deque = Deque()

    for character in terms:
        if character.isalpha():
            deque.push_back(character.lower())

    while len(deque) > 1:
        front_item = deque.pop_front()
        back_item = deque.pop_back()

        if front_item != back_item:
            return False
    return True
```

### Bônus

**Exercício 1:** _Pilhas_ - Baseado nos conhecimentos adquiridos neste bloco, implemente uma pilha utilizando a Deque como a estrutura interna. Sua pilha deve conter as operações: **push, pop, peek e is_empty**

> Para este desafio, é necessário efetuar o import da classe Deque e utilizar seus métodos de acesso para simular uma pilha.

```language-python
from deque import Deque


class Stack:

    def __init__(self):
        self._deque = Deque()

    def __len__(self):
        return len(self._deque)

    def push(self, value):
        self._deque.push_back(value)

    def pop(self):
        return self._deque.pop_back()

    def peek(self):
        return self._deque.peek_back()

    def is_empty(self):
        return not len(self)
```
