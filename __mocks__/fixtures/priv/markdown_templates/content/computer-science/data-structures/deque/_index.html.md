## O que vamos aprender?

Você já deve ter se deparado com filas de atendimento com acesso prioritário ou preferencial. É comum que, enquanto não houver pessoas que se encaixem no acesso prioritário a sequencia de atendimento seja por ordem de chegada, ou seja, as primeiras pessoas a chegarem, serão as primeiras a serem atendidas.

Esse comportamento muda a partir do momento em que o acesso prioritário é necessário! A primeira pessoa que chegou pode ser a próxima a ser chamada, como também a pessoa que acabou de chegar pode ser a próxima.

Neste bloco vamos aprender sobre um dos tipos abstratos de dados (`TAD`) mais flexíveis em meio as **estruturas de dados**. Hoje vamos ver uma variação da fila, a fila de dois fins.

### Você será capaz de

- Entender o funcionamento do `TAD Deque`;

- Implementar as principais operações de uma `Deque`.

---

## Por que isso é importante?

Dado que as filas ocorrem com frequência na vida real, não é surpreendente que também sejam frequentemente usadas na computação. Para modelar uma aplicação onde clientes estão usando um banco, por exemplo, podemos usar uma fila de clientes em espera. Uma aplicação pode querer fazer perguntas sobre, por exemplo, como o tempo médio de espera mudaria se você adicionasse ou removesse um caixa de posição.

Outro bom exemplo de uma aplicação de deque seria armazenar o histórico de um navegador da web. _URLs_ visitados recentemente são adicionados à frente do deque, e as _URLs_ na parte de trás do deque são removido após um determinado número de inserções na frente.

As filas também são usadas em qualquer coleta de tempo em que o tempo de inserção seja importante. Nós podemos observar, por exemplo, que uma impressora pode querer manter a coleção de trabalhos pendentes em um fila, para que sejam impressos na mesma ordem em que foram enviados.

Existem muitas implementação que conseguimos fazer utilizando _deques_, por isso a importância de aprendermos e entendermos essa estrutura de dados!

---

## Conteúdos

###### Tempo sugerido para realização: 80 minutos

### O que é uma deque?

**D**ouble **E**nded **QUE**ue do inglês. O `TAD deque` é uma estrutura ordenada de elementos que se assemelha a uma fila, o que difere é a natureza irrestrita de adição e remoção de elementos. Em uma deque, os novos elementos podem ser adicionados ou removidos em ambas extremidades. Já em uma fila, os elementos seguem a ordem _FIFO_ (**F**irst **I**n **F**irst **O**ut), ou seja, o primeiro elemento a entrar na lista é o primeiro a sair, e o último elemento a entrar na lista, é o último a sair.

> Imaginemos um mundo ideal, onde as pessoas são educadas e cedem o lugar a pessoas prioritárias em filas

Teríamos uma fila única de atendimento onde uma pessoa prioritária poderia assumir a dianteira da fila e uma não prioritária assumir o final, onde, na ausência de prioridades, o fluxo seguiria inalterado com todas as pessoas sendo atendidas em sequência de acordo com o horário de chegada.

Mas espera um momento! Nesse mundo ideal, a entrada pode ser realizada tanto pelo inicio, quanto pelo final ✔️, mas não é possível uma pessoa sair diretamente do final para o atendimento, inutilizando a remoção do final ✖️.

<%= figure(%{src: "/computer-science/data-structures/deque/images/fresh_hum.gif", caption: "Will Smith - hum", class: "text-center rounded mx-auto d-block"}) %>

Tá tudo bem! Nesse cenário temos uma variação da _deque_, uma **_deque de saída restrita_**, onde a remoção é restrita em um dos lados, enquanto que a inserção segue em ambas as extremidades.

Mas se há restrição de saida, também há a **_deque de entrada restrita_**, o comportamento é análogo ao anterior. Nesse caso, a entrada é restrita a apenas um lado, enquanto que a saída pode ser realizada em ambas extremidades.

### Quais as operações mais comuns?

Ao se manipular uma deque existem algumas operações que são comumente utilizadas. São elas: **_PushBack_**, **_PushFront_**, **_PopBack_**, **_PopFront_**, **_peekFront_** e **_peekBack_**.

A operação **PushBack** nos permite adicionar um item no fim da deque. Diferente do **push** da fila, adicionar um elemento no final da deque não representa que ele sairá antes dos itens que forem adicionados posteriormente.

<%= figure(%{src: "/computer-science/data-structures/deque/images/pushBack.gif"}) %>

A operação **PushFront** é o diferencial dessa estrutura, pois permite adicionar um item no início da deque, mantendo a ordenação preexistente.

As demais operações **_PopBack_**, **_PopFront_**, **_peekFront_** e **_peekBack_** são utilizadas para remover e visualizar itens nas respectivas extremidades.

Assim como os `TADs` anteriores, temos as restrições:

- Realizar inserção em uma deque cheia causa overflow;

- Realizar remoção em uma deque vazia causa underflow.

<%= vimeo "459953198" %>

### Quando usar:

A Deque é preferível à outros `TADs` como a lista, nos casos em que a maioria das operações serão de inserção e remoção nas duas extremidades da estrutura, pois a deque fornece uma complexidade de tempo `O(1)`, para **_push_** e **_pop_**, em comparação à lista que fornece complexidade de tempo `O(n)`.

### Implementação de uma deque utilizando Python

Vamos criar uma classe `Deque` e nela, vamos implementar as operações que citamos acima.

Primeiro iremos declarar o construtor da classe deque e a propriedade que indica a posição inicial dos elementos:

> content_deque.py

```language-python
class Deque:
    FIRST_ELEMENT = 0

    def __init__(self):
        self._data = []

    def __len__(self):
        return len(self._data)

    def __str__(self):
        return "Deque(" + ", ".join(str(x) for x in self._data) + ")"
```

Agora que temos uma estrutura, iremos adicionar os métodos *push_front* e *push_back*, responsáveis pela inserção nas extremidades:

- **push_front:** utilizaremos a propriedade para indicar que todas as inserções desse tipo serão adicionadas na posição `0` da estrutura;

- **push_back:** utilizaremos a função `append`, da lista interna, para que todas as inserções desse tipo sejam adicionadas na posição `n - 1` da estrutura.

> content_deque.py

```language-python
# ...


class Deque:
    # ...

    def push_front(self, value):
        self._data.insert(self.FIRST_ELEMENT, value)

    def push_back(self, value):
        self._data.append(value)
```

Similarmente adicionaremos os métodos *pop_front* e *pop_back* responsáveis pela remoção de elementos das extremidades:

- **pop_front:** utilizaremos a função `pop`, da lista interna, com índice para remover o elemento existente na posição `0`;

- **pop_back:** utilizaremos a função `pop`, da lista interna, no entanto sem o índice, fazendo com que o elemento da posição `n - 1` seja removido.

> content_deque.py

```language-python
# ...


class Deque:
    # ...

    def pop_front(self):
        if self._data:
            return self._data.pop(self.FIRST_ELEMENT)
        return None

    def pop_back(self):
        if self._data:
            return self._data.pop()
        return None
```

Por fim os métodos *peek_front* e *peek_back* que nos permitem apenas visualizar o conteúdo existente nas extremidades, não alterando o conteúdo.

> content_deque.py

```language-python
# ...


class Deque:
    # ...

    def peek_front(self):
        if self._data:
            return self._data[self.FIRST_ELEMENT]
        return None

    def peek_back(self):
        if self._data:
            return self._data[len(self)-1]
        return None


if __name__ == "__main__":
    deque = Deque()
    elements_1 = [6, 7, 8, 9, 10]
    elements_2 = [1, 2, 3, 4, 5]

    for elem in elements_1:
        deque.push_front(elem)

    for elem in elements_2:
        deque.push_back(elem)

    print(deque) # saída: Deque(10, 9, 8, 7, 6, 1, 2, 3, 4, 5)
    print(deque.__len__()) # saída: 10

    print(deque.pop_front()) # saída: 10, pois ele retorna o número retirado
    print(deque.pop_back()) # saída: 5, pois ele retorna o número retirado

    print(deque) # saída: Deque(9, 8, 7, 6, 1, 2, 3, 4)
    print(deque.__len__()) # saída: 8

    print(deque.peek_front()) # saída: 9
    print(deque.peek_back()) # saída: 4
```

Neste exemplo é possível efetuar a contagem de elementos do membro `_data` diretamente via _self_: `len(self)`. Isto é possível, pois definimos o comportamento do `len` ao criar a classe:

```language-python
def __len__(self):
    return len(self._data)
```

Com isso, temos que: `len(self._data) == len(self)`

Por fim nossa classe ficou assim:

> content_deque.py

```language-python
class Deque:
    FIRST_ELEMENT = 0

    def __init__(self):
        self._data = list()

    def __len__(self):
        return len(self._data)

    def __str__(self):
        return "Deque(" + ", ".join(map(lambda x: str(x), self._data)) + ")"

    def push_front(self, value):
        self._data.insert(self.FIRST_ELEMENT, value)

    def push_back(self, value):
        self._data.append(value)

    def pop_front(self):
        if self._data:
            return self._data.pop(self.FIRST_ELEMENT)
        return None

    def pop_back(self):
        if self._data:
            return self._data.pop()
        return None

    def peek_front(self):
        if self._data:
            return self._data[self.FIRST_ELEMENT]
        return None

    def peek_back(self):
        if self._data:
            return self._data[len(self) - 1]
        return None


if __name__ == "__main__":
    deque = Deque()
    elements_1 = [6, 7, 8, 9, 10]
    elements_2 = [1, 2, 3, 4, 5]

    for elem in elements_1:
        deque.push_front(elem)

    for elem in elements_2:
        deque.push_back(elem)

    print(deque) # saída: Deque(10, 9, 8, 7, 6, 1, 2, 3, 4, 5)
    print(deque.__len__()) # saída: 10

    print(deque.pop_front()) # saída: 10, pois ele retorna o número retirado
    print(deque.pop_back()) # saída: 5, pois ele retorna o número retirado

    print(deque) # saída: Deque(9, 8, 7, 6, 1, 2, 3, 4)
    print(deque.__len__()) # saída: 8

    print(deque.peek_front()) # saída: 9
    print(deque.peek_back()) # saída: 4
```

### Resolvendo exercícios

<%= vimeo "459953387" %>

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

Agora que já passamos pelas características da deque, está na hora de aquecermos a cabeça e colocarmos em prática o que já aprendemos

Link presente no slack ‍💻

<%= figure(%{src: "/computer-science/data-structures/deque/images/fresh_heating_the_head.gif", caption: "Will Smith - heating the head", class: "text-center rounded mx-auto d-block"}) %>

---

## Exercícios

###### Tempo sugerido para realização: 120 minutos

<%= versioning_your_code(@conn) %>

### Agora a prática

Com isso concluímos o conteúdo sobre o `TAD Deque`, foi muito bom passar esse tempo com vocês. É um _momento que temos que festejar_.

<%= figure(%{src: "/computer-science/data-structures/deque/images/carlton.gif", caption: "Carlton - It's not unusual to have fun with anyone", class: "text-center rounded mx-auto d-block"}) %>

Mas é claro que para não deixar um gostinho de quero mais, temos aqui alguns exercícios para fixar o conteúdo 😀

**Exercício 1:** _Aprimorando a classe Deque_ - Nossa classe `Deque` já atende as principais operações que esse TAD nos oferece 🚀 mas que tal melhorarmos? Para isso você deve adicionar os seguintes métodos:

**a.** `clear(self)` - Este método deve ser responsável por limpar a estrutura, eliminando todos os elementos contidos dentro da deque.

**b.** `exists(self, value)` - Este método deve ser usado para indicar se o valor do argumento existe em nossa estrutura. Retorne `True` se existir e `False` caso contrário.

> Nota: Fique a vontade para escolher por qual extremidade será iniciada a consulta.

**c.** `peek(self, position, order)` - Este método deve ser usado para retornar o valor do conteúdo da posição indicada. A peculiaridade desse método é a ordem que essa consulta deve ser feita. Caso o campo `order` não seja informado, a consulta deve ser realizada através da extremidade da esquerda `front`, no entanto, caso o campo possua o valor `desc`, a consulta deve ser através da extremidade da direita `back`.

Como exemplo, assuma uma deque composto com os seguintes elementos:
<%= figure(%{src: "/computer-science/data-structures/deque/images/table-ex1-c.png", caption: "Tabela exercício 1-c.", class: "text-center rounded mx-auto d-block", width: "800px", height: "auto"}) %>

**Exercício 2:** _Limitando capacidade da Deque_ - Uma das características da Deque é a capacidade de balanceamento, enviando conflitos ao inserir ou remover itens em suas extremidades. Nossa classe `Deque` já possui essa característica 🚀, no entanto, para termos melhor controle sobre a quantidade de itens que podemos ter em nossa fila de dois fins, você deve limitar a capacidade da mesma, assim, a estrutura deverá respeitar as seguintes afirmações:

- Realizar inserção em uma deque cheia causa overflow;

- Realizar remoção em uma deque vazia causa underflow;

Utilize o construtor da classe para definir a capacidade da estrutura, exemplo `Deque(10)`. Retorne _exceptions_, ao contemplar os pontos acima, exemplo: `raise Exception("Overflow")`.

**Exercício 3:** _Desafio do Palíndromo_ - Uma palavra é um palíndromo se a sequência de letras que a forma é a mesma, quer seja lida da esquerda para a direita ou vice-versa.

Crie um algorítimo que, ao receber uma sequencia de caracteres, indique se ela é ou não um palíndromo. Para este exercício iremos considerar todas os caracteres como minúsculos e desconsiderar espaços, pontuação e caracteres especiais.

Use a tabela a seguir como exemplo para seus testes:
<%= figure(%{src: "/computer-science/data-structures/deque/images/table-ex-3.png", caption: "Tabela exercício 3.", class: "text-center rounded mx-auto d-block", width: "800px", height: "auto"}) %>

### Bônus

**Exercício 1:** _Pilhas_ - Baseado nos conhecimentos adquiridos neste bloco, implemente uma pilha utilizando a Deque como a estrutura interna. Sua pilha deve conter as operações: **push, pop, peek e is_empty**

---

## Recursos Adicionais (opcional)

Agora que vimos como é o funcionamento do `TAD Deque`, você pode utilizar um módulo da _collections_ que nos disponibiliza toda essa implementação: `from collections import deque`.

- [Deque in Python](https://www.geeksforgeeks.org/deque-in-python/) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
