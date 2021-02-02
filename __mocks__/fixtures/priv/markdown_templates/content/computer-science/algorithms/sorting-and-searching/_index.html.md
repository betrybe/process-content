## O que vamos aprender?

Hoje vamos aprender o que são **algoritmos de ordenação** e **algoritmos de busca**. Vamos implementá-los utilizando soluções iterativas e recursivas, assim como aplicaremos o "dividir e conquistar" ou até mesmo a "força bruta". Faremos uma análise de complexidade de cada um deles entendendo quando será a melhor ocasião para utilizá-los.

---

### Você será capaz de

- Implementar algoritmos de busca como busca linear e busca binária;

- Escrever algoritmos de ordenação, como por exemplo, ordenação por bolha, inserção, seleção;

- Utilizar técnicas de "força bruta" e "dividir e conquistar";

- Analisar a complexidade e escolher o algoritmo adequado para seu problema.

---

## Por que isso é importante?

No dia a dia como pessoa programadora, você será confrontada com diversos problemas. Seu papel será analisá-los e buscar uma solução eficiente. Se destacam aquelas pessoas que conseguem entender o problema e propor os melhores algoritmos para aquele caso. Por isso é muito comum em entrevistas de emprego, empresas cobrarem o conhecimento destes algoritmos. Não quer dizer que na sua rotina de trabalho irá utilizar aqueles algoritmos o tempo todo, mas o conhecimento técnico deles e as técnicas empregadas em suas soluções podem ser utilizadas em outras resoluções.

O exercício de analise de complexidade sobre estes algoritmos também é algo que deve ser destacado, pois é algo bastante útil de ser aplicado em outros tipos de algoritmos.

<%= figure(%{src: "/computer-science/algorithms/sorting-and-searching/images/bogosort.png", class: "text-center rounded mx-auto d-block", width: "500px", height: "auto", caption: "Diagrama de ordenação Bogosort 🤡"}) %>


## Conteúdos

###### Tempo sugerido para realização: 120 minutos

### Algoritmos de Ordenação

Algoritmo de ordenação (_sorting algorithms_) são uma categoria de algoritmos que buscam colocar elementos de uma sequência em uma determinada ordem definida. Esta ordem pode ser numérica, lexicográfica ou por qualquer outra característica. As razões para se ordenar uma sequência podem variar desde facilitar a visualização até facilitar uma busca.

Imagine uma coleção de músicas onde queremos exibi-las em ordem alfabética, ou ordenados pelo número de vezes em que foram tocadas. Ou talvez uma lista telefônica ao qual precisamos buscar um nome, não seria mais fácil se estivesse ordenada em ordem alfabética? Lidando com arrays, matrizes e outras coleções, numéricas ou não, muitas vezes teremos de utilizar a ordenação.

Faremos a implementação e análise de alguns dos algoritmos existentes (os mais populares). Existem vários outros e basta uma busca por algoritmos de busca (_sorting algorithms_) para obter uma lista extensa de algoritmos deste estilo.

#### Algoritmos de ordenação que usam força bruta

Como visto na aula anterior, a **força bruta** caracteriza-se por ser uma técnica que se testa todas as possibilidades existentes para resolver um problema.

Por exemplo, imagine que você tem um cadeado com 4 dígitos, cada um de 0-9. Você esqueceu sua combinação, mas não quer comprar outro cadeado. Como você não consegue se lembrar de nenhum dos dígitos, é necessário usar um método de força bruta para abrir a fechadura. Portanto, você define todos os números de volta para 0 e os tenta um por um: `0001`, `0002`, `0003` e assim por diante até que seja aberto. Na pior das hipóteses, seriam necessárias **10⁴** ou 10.000 tentativas para encontrar sua combinação.

#### Selection Sort

A ordenação por seleção (_selection sort_ em inglês), divide o array em duas partes, uma já ordenada e outra de itens a serem ordenados. Em seguida, **selecionaremos** o menor elemento na lista não ordenada e o incluiremos na lista ordenada. Isto será feito continuamente até que nossa lista de elementos não ordenados se esgote, e logo teremos uma lista com os itens ordenados.

Como funciona o algoritmo?

```language-md

# Vamos supor os números não ordenados
- ordenados =
- não ordenados = 3 6 1 7

# Buscamos entre os elementos não ordenados o menor elemento
- menor = 1

# Vamos adicioná-lo a lista de elementos ordenados
- ordenados = 1
- não ordenados = 6 3 7

# Agora repetimos o passo de busca
- menor = 3

# Assim teremos
- ordenados = 1 3
- não ordenados = 6 7

# Como ainda não esgotamos os números a serem ordenados repetiremos a busca
menor = 6

# Agora temos quase todos os elementos ordenados
- ordenados = 1 3 6
- não ordenados = 7

# Faremos a busca pelo menor elemento novamente (único)
- menor = 7

# Esgotamos as possibilidades e temos nossa lista ordenada
- ordenados = 1 3 6 7
```

A animação abaixo ilustra como um algoritmo de ordenação por seleção funciona:

<%= figure(%{src: "/computer-science/algorithms/sorting-and-searching/images/selection.gif", class: "text-center rounded mx-auto d-block", width: "500px", height: "auto", caption: "Ordenação por Seleção (Selection Sort)"}) %>

Vamos ver um exemplo de implementação:

```language-python
def selection_sort(array):
    # como um algoritmo de força bruta
    # percorre a estrutura exaustivamente
    for i in range(len(array)):
        minimum = i

        # itera sobre os elementos não ordenados
        for j in range(i + 1, len(array)):
            # seleciona o menor valor
            if array[j] < array[minimum]:
                minimum = j

        # após encontrar o menor valor
        # ao invés de criar um novo array (o que aumenta complexidade de espaço)
        # realizamos a substituição entre o menor elemento
        # e a posição i que corresponde ao primeiro elemento não ordenado
        # que consequentemente passará a ser o último ordenado
        array[minimum], array[i] = array[i], array[minimum]

    return array

print(selection_sort([100, 4, 6, 33, 56, 67]))
```


Analisando a complexidade deste algoritmo, vemos que independente de todos os elementos estarem ordenados (ou não), ou parcialmente ordenados, sempre teremos que percorrer o array completamente e também `n - 1` elementos a cada iteração. Isto nos leva a uma complexidade `O(n²)` para todos os casos (pior, médio, melhor).

Como criamos apenas algumas variáveis de controle e não criamos um array auxiliar, nosso algoritmo tem uma complexidade de espaço constante, ou seja, não muda seja para 10, 1000 ou 10.000 elementos.

#### Insertion Sort

A ordenação por inserção (_insertion sort_), tem esse nome por **inserir** um elemento de cada vez em sua posição correta. Fazendo uma analogia a um jogo de cartas, onde sua "mão" esteja ordenada, é como se a cada nova carta recebida fossemos movendo ela até achar a posição correta e a inserimos ali, e faremos isso sucessivamente até que não tenha novas cartas e por consequência, nossa mão esteja ordenada. É mais eficiente que a ordenação por seleção e também considerada mais simples.

Como funciona o algoritmo?

```language-md
# Vamos supor os números não ordenados
- coleção = 3 2 1 7

# vamos pegar o primeiro elemento e movê-lo até sua posição
- elemento = 3

# como não há elementos a esquerda de 3 não o movemos
- coleção = 3 2 1 7

# agora vamos pegar o segundo elemento
- elemento = 2

# vamos movê-lo à esquerda, enquanto seu valor for menor
# que o elemento a sua esquerda
             ⤺
- coleção = 2 3 1 7

# próximo elemento da coleção
- elemento = 1

# vamos inseri-lo na  posição correta,
# movendo para a esquerda enquanto seu valor for menor
# que o elemento a esquerda
             ⤺ ⤺
- coleção = 1 2 3 7

# por fim verificamos o último elemento
- elemento = 7

# não há elementos menores a esquerda
# e a coleção está ordenada
- coleção = 1 2 3 7
```

A animação abaixo ilustra como um algoritmo de ordenação por inserção funciona:

<%= figure(%{src: "/computer-science/algorithms/sorting-and-searching/images/insertion.gif", class: "text-center rounded mx-auto d-block", width: "500px", height: "auto", caption: "Ordenação por Inserção (Insertion Sort)"}) %>

Vamos ver um exemplo de implementação:

```language-python
def insertion_sort(array):
    # itera sobre cada valor do array
    for i in range(len(array)):
        current_value = array[i]
        current_position = i
        # enquanto o valor da posição for menor que os elementos a sua esquerda
        while (
            current_position > 0
            and array[current_position - 1] > current_value
        ):
            # move as posições para a direita
            array[current_position] = array[current_position - 1]
            current_position = current_position - 1
        # colocamos o elemento em sua nova posição
        array[current_position] = current_value
    return array

print(insertion_sort([100, 4, 6, 33, 56, 67]))
```

Como precisamos percorrer cada um dos elementos, e depois percorrer comparando os elementos à esquerda do mesmo, em um pior caso, onde o array esteja inversamente ordenado, teremos uma complexidade de `O(n²)`. Isto se repete também em média, para arrays parcialmente ordenados. Porém se inicialmente o array estiver ordenado, este algoritmo terá complexidade `O(n)`, pois só fara a iteração de todos os elementos, e não precisará ficar movendo os elementos.

Assim como na ordenação por seleção, como criamos apenas algumas variáveis de controle e não criamos um array auxiliar, nosso algoritmo tem uma complexidade de espaço constante, ou seja, não muda, seja para 10, 1000 ou 10.000 elementos.

#### Algoritmos de ordenação que usam soluções iterativas

Soluções iterativas, consistem na realização de uma ou mais operações repetidas vezes, por meios de comandos de repetição. As ordenações demonstradas acima (seleção, inserção), são consideradas iterativas, pois estamos realizando operações de comparação e troca de elementos repetidas vezes, por meios de comandos de repetição (`for`).

> 💡 Toda solução iterativa pode ser reescrita de forma recursiva.

#### Bubble Sort

Também conhecido como ordenação por bolha (_bubble sort_), têm esse nome, pois a movimentação dos elementos lembra o movimento das bolhas em um refrigerante. São realizadas múltiplas iterações sobre a coleção, sempre comparando o valor ao item adjacente e realizando a troca daqueles que estão fora de ordem. A cada iteração o próximo maior valor é colocado em sua posição correta, ou seja, cada item se desloca como uma **bolha** para a posição a qual pertence.

Como funciona o algoritmo?

```language-md
# Vamos supor os números não ordenados
- coleção = 7 5 1 2

# vamos realizar a primeira iteração.
# Comparamos os dois primeiros elementos (índices 0 e 1)
- 7 > 5 ?

# como o 7 é maior 5, faremos a troca de posição

           ⤺
- coleção = 5 7 1 2
           ⤻
# Agora comparamos os elementos dos índices 1 e 2

- 7 > 1?

# Novamente faremos a troca
             ⤺
- coleção = 5 1 7 2
             ⤻

# Depois, comparamos os índices 2 e 3

- 7 > 2

# Mais uma vez faremos a troca
               ⤺
- coleção = 5 1 2 7
               ⤻

# Como houveram trocas, vamos iterar mais uma vez nossa coleção
# O elemento 7, como uma bolha, foi subindo até sua posição
- coleção = 5 1 2 7

# Comparamos os primeiros elementos e faremos a troca
           ⤺
- coleção = 1 5 2 7
           ⤻

# Em seguida comparamos os próximos elementos e faremos a troca novamente

             ⤺
- coleção = 1 2 5 7
             ⤻
# Como houveram trocas precisamos iterar novamente a nossa coleção
- coleção = 1 2 5 7

# Porém desta vez não há trocas e nossa coleção está ordenada
```

A animação abaixo ilustra como um algoritmo de ordenação por inserção funciona:

<%= figure(%{src: "/computer-science/algorithms/sorting-and-searching/images/bubble-sort.gif", class: "text-center rounded mx-auto d-block", width: "500px", height: "auto", caption: "Ordenação por Flutuação (Bubble Sort)"}) %>

Vamos ver um exemplo de implementação:

```language-python
def bubble_sort(array):
    # variável utilizado na iteração
    # para marcar se houve ou não trocas naquela iteração
    # Quando falsa, indica que o array está ordenado
    has_swapped = True

    # armazena o número de iterações para evitar
    # a iteração sobre índices já ordenados
    num_of_iterations = 0

    # Enquanto ainda não está ordenado (ocorreram trocas na iteração)
    while has_swapped:
        has_swapped = False

        # percorra o array até o ultimo índice não ordenado
        for i in range(len(array) - num_of_iterations - 1):
            # caso a posição corrente seja maior que a posterior
            if array[i] > array[i + 1]:
                # realiza a troca entre as posições
                array[i], array[i + 1] = array[i + 1], array[i]
                # marca que tivemos trocas nesta iteração
                has_swapped = True
        num_of_iterations += 1

    return array


print(bubble_sort([100, 4, 6, 33, 56, 67]))
```

#### Algoritmos de ordenação que usam dividir e conquistar

Algoritmos que utilizam da técnica de **dividir e conquistar**, consistem em dividir um problema grande em partes menores, encontrar soluções para as partes menores, e então combinar as soluções obtidas em uma solução global. Esta técnica produz um algoritmo eficiente, caso a divisão e conquista sejam eficientes.

> 💡 Os algoritmos abaixo foram implementados de forma recursiva, mas lembre-se, toda solução iterativa pode ser reescrita de forma recursiva.

#### Merge sort

A ordenação por mistura (_merge sort_), é um algoritmo onde empregamos a técnica da divisão e conquista. Vamos dividindo a nossa coleção em porções menores, até uma coleção mínima. Em seguida vamos **misturando** as porções, de forma ordenada, até que toda a coleção seja reunida novamente resultando na ordenação.

Como funciona o algoritmo?

```language-md
# Vamos supor os números não ordenados
- coleção = 7 5 1 2 8 4 6 3

# Separamos nosso array em porções menores
- 7 5 1 2         8 4 6 3

# continuamos fazendo isto
# até a menor porção possível (1)
- 7 5    1 2    8 4    6 3

# Até a menor porção possível (1)
- 7    5    1    2    8    4    6    3

# Feito o processo de divisão, vamos ao processo de conquista.
# Vamos reagrupando as divisões mas de forma ordenada
- 5 7    1    2    8    4    6    3

- 5 7    1 2    8    4    6    3

- 5 7     1 2    4 8    6    3

- 5 7     1 2    4 8    3 6

# Continuamos o reagrupamento
- 1 2 5 7    4 8    3 6

- 1 2 5 7    3 4 6 8

# Por fim misturamos todos os elementos
- 1 2 3 4 5 6 7 8
```

A animação abaixo ilustra como um algoritmo de ordenação por inserção funciona:

<%= figure(%{src: "/computer-science/algorithms/sorting-and-searching/images/mergesort.gif", class: "text-center rounded mx-auto d-block", width: "500px", height: "auto", caption: "Ordenação por Mistura (Merge Sort)"}) %>

Vamos ver um exemplo de implementação:

```language-python
def merge_sort(array):
    # caso base: se já atingiu a menor porção (1)
    if len(array) <= 1:
        # retorne o array
        return array
    # calculo do pivot: índice que indica onde o array será particionado
    # no caso, metade
    mid = len(array) // 2
    # para cada metade do array
    # chama a função merge_sort de forma recursiva
    left, right = merge_sort(array[:mid]), merge_sort(array[mid:])
    # mistura as partes que foram divididas
    return merge(left, right, array.copy())


# função auxiliar que realiza a mistura dos dois arrays
def merge(left, right, merged):

    left_cursor, right_cursor = 0, 0

    # enquanto nenhumas das partes é percorrida por completo
    while left_cursor < len(left) and right_cursor < len(right):

        # compare os dois itens das partes e insira no array de mistura o menor
        if left[left_cursor] <= right[right_cursor]:
            merged[left_cursor + right_cursor] = left[left_cursor]
            left_cursor += 1
        else:
            merged[left_cursor + right_cursor] = right[right_cursor]
            right_cursor += 1
    # a iteração acima irá inserir os elementos de forma ordenada

    # quando uma das partes termina, devemos garantir
    # que a outra sera totalmente inserida no array de mistura

    # itera sobre os elementos restantes na partição "esquerda"
    # inserindo-os no array de mistura
    for left_cursor in range(left_cursor, len(left)):
        merged[left_cursor + right_cursor] = left[left_cursor]

    # itera sobre os elementos restantes na partição "direita"
    # inserindo-os no array de mistura
    for right_cursor in range(right_cursor, len(right)):
        merged[left_cursor + right_cursor] = right[right_cursor]

    return merged


print(merge_sort([100, 4, 6, 33, 56, 67]))
```

A separação em partes traz uma complexidade `O(log n)`, e as misturas `O(n)`. Com isso, temos uma complexidade de `O(n log n)`, independente do array estar ordenado por completo, não ordenado, ou parcialmente ordenado.

Como é um algoritmo recursivo, consome mais memória, possuindo uma complexidade de espaço `O(n)`, ou seja, cresce linearmente proporcional a entrada de dados.

#### Quick Sort

O _quicksort_ é  um algoritmo que também utiliza da técnica de divisão e conquista. Sua estratégia de ordenação consiste em determinar um elemento _pivô_ (nome dado ao elemento que divide o array em porções menores). Em seguida, todos os elementos maiores que o pivô serão colocados a direita e os menores a esquerda. Com isto, o pivô estará em sua posição correta e teremos duas sub coleções não ordenados ao seu redor. Recursivamente ordenamos os sub arrays, repetindo o mesmo processo de escolha do pivô e particionamento (divisão).

Como funciona o algoritmo?

```language-md
# Vamos supor os números não ordenados
- coleção = 7 1 2 5 4 6 3

# Faremos a escolha do elemento pivô.
# Este elemento será o responsável por particionar (dividir) a lista.
# Posso escolher qualquer elemento neste passo e, por isso,
# vou escolher o elemento do meio
- pivot = 5

# Movemos todos os elementos menores para a esquerda e os maiores para a direita (a)
- 1 2 4 3    5    7 6

# Precisamos ordenar as coleções geradas,
# começando com a lista de elementos inferiores
- 1 2 4 3

# Novamente escolhemos o pivot
- pivot = 2

# Novamente fazemos a divisão (b)
- 1    2    4 3

# A lista à esquerda já não tem como ser particionada,
# porém a da direita ainda pode ser particionada (c)
- 4 3

# Escolhendo o pivô e movendo os outros elementos
# chegaremos a
- 3    4

# Agora precisamos o processo de conquista,
# voltando recursivamente ao passo (c), que pediu para ordenar
# a sub coleção 4 3, temos como resposta
- 3 4
# essa resposta, nos faz retornar ao passo (b), onde concatenaremos ao pivô a ordenação do lado direito e esquerdo,
# resultando em
- 1 2 3 4

# Vamos agora ver o outro lado do passo (a)
- 7 6

# realizando o mesmo processo
# após escolher o pivô e realizar os movimentos teremos
- 6    7

# Por fim a resposta é utilizada lá no passo (a) para concatenarmos os dois lados
# e termos por fim a lista ordenada
- 1 2 3 4 5 6 7
```

A animação abaixo ilustra como um algoritmo de ordenação por inserção funciona:

<%= figure(%{src: "/computer-science/algorithms/sorting-and-searching/images/quicksort.gif", class: "text-center rounded mx-auto d-block", width: "500px", height: "auto", caption: "Ordenação Quicksort"}) %>

Vamos ver um exemplo de implementação:

```language-python
def quicksort(array, low, high):
    # caso base: se já atingiu a menor porção (1)
    if len(array) == 1:
        # retorne o array
        return array

    # os índices irão se cruzar quando o array estiver ordenado
    if low < high:
        # índice da partição é o índice onde o array foi divido
        # e é determinado a partir do pivô.
        # Este índice já está ordenado
        partition_index = partition(array, low, high)

        # Ordena os elementos presentes antes da partição (menores que o pivô)
        # e depois (maiores que o pivô)
        quicksort(array, low, partition_index - 1)
        quicksort(array, partition_index + 1, high)


# função auxiliar responsável pela partição do array
# escolhendo um pivô e fazendo movimentações dos sub arrays gerados
def partition(array, low, high):
    # índice do menor elemento
    i = low - 1
    # o pivô será escolhido
    # através do índice que divide o array
    pivot = array[high]  # pivot

    # itera sobre os elementos
    for j in range(low, high):

        # se o elemento corrente é menor ou igual ao pivô
        if array[j] <= pivot:

            # incrementa o índice do menor elemento
            i = i + 1
            array[i], array[j] = array[j], array[i]
    array[i + 1], array[high] = array[high], array[i + 1]

    return i + 1


array = [100, 4, 6, 33, 56, 67]
quicksort(array, 0, len(array) - 1)
print(array)
```

Normalmente esta ordenação ocorre com complexidade `O(n log n)`, porém em um pior caso (onde o array está ordenado de forma inversa), ocorrerá com complexidade `O(n²)`.

> 💡 Curiosidade: Por baixo dos panos, quando você utiliza a função `sorted` padrão do python ou faz `array.sort`, você está utilizando uma ordenação chamada `TimSort`, que é um algoritmo híbrido que mistura o merge sort e insertion sort. É também utilizado pela linguagem Java para ordenar arrays.

### Algoritmos de Busca

Algoritmos desta categoria **buscam** um item com uma determinada propriedade dentro de uma coleção, podendo esta coleção ser gerada elemento a elemento, a partir de uma série de operações (formula matemática, procedimento), não necessitando uma coleção de fato. Não devem ser associados somente com arrays. São considerados algoritmos desta categoria àqueles que fazem travessias em estruturas de dados, com o propósito de encontrar um valor.

<%= figure(%{src: "/computer-science/algorithms/sorting-and-searching/images/wally.jpg", class: "text-center rounded mx-auto d-block", width: "500px", height: "auto", caption: "Onde está o wally?"}) %>

#### Busca Linear

Uma forma simples de fazer a busca de algum valor em um array ou lista é usando a **busca linear**, que consiste em percorrer toda a estrutura elemento a elemento, tentando encontrar o valor. Também é conhecida como busca sequencial, por causa da maneira com que percorremos a estrutura em busca do valor.

A busca linear pode ser simples, mas não necessariamente será a solução mais rápida, já que ela faz uma verificação de todos os elementos para encontrar qual é o correspondente.

Veja na imagem abaixo:

<%= figure(%{src: "/computer-science/algorithms/sorting-and-searching/images/linear_search.gif", class: "text-center rounded mx-auto d-block", width: "500px", height: "auto", caption: "Busca Linear"}) %>

Um exemplo de implementação da busca linear é:

```language-python
def search(array, value):
    # para cada elemento do array e seu índice
    for index, element in enumerate(array):
        # se o elemento for igual ao valor
        if element == value:
            # retorne seu índice
            return index
    # caso não seja encontrado, retorne -1
    return -1


print(search([1, 2, 3], 2))  # saída: 1
print(search([1, 2, 3], 4))  # saída: -1

# mas esta não é a maneira mais pythonica,
# pois se você pedir o elemento na posição -1
# a lista irá te retornar o último elemento
# portanto uma melhor aproximação seria levantar uma exceção
# e é exatamente assim que o método index de uma lista é implementado
print([1, 2, 3].index(2))  # saída: 1
print([1, 2, 3].index(4))  # saída: Exception("4 is not in list")

# o método index é equivalente ao search implementado,
# porém lançando uma exceção caso não encontre.
```


#### Busca Binária

A Busca binária (_binary search_) é mais um exemplo onde empregamos a técnica da divisão e conquista. É importante destacar que ela supõe que nossa coleção está **ordenada** e seu funcionamento é através de múltiplas divisões do espaço de busca, reduzindo-o, buscando o elemento no meio do espaço.

Vamos supor a seguinte lista: `[1, 10, 35, 42, 51, 60, 75]` e o número buscado é `60`. Dividimos a lista em duas partes e verificamos se o elemento do meio (`42`) é o elemento procurado. Como sabemos que a lista esta ordenada e que o valor buscado é maior que o encontrado, não precisamos comparar com todos os outros à esquerda. Vamos procurar somente os valores posteriores a ele `[51, 60, 75]`. Realizamos o mesmo processo de divisão e nosso elemento do meio passa a ser `60`. Como encontramos o valor, vamos retornar o seu índice, `5`.

É mais rápida que a busca linear, visto que o número de comparações necessárias, mesmo em um caso onde não encontre um elemento, é menor.

Veja na imagem abaixo:

<%= figure(%{src: "/computer-science/algorithms/sorting-and-searching/images/binary_search.gif", class: "text-center rounded mx-auto d-block", width: "500px", height: "auto"}) %>

Agora vamos ver na prática:

```language-python
def binary_search(array, low_index, high_index, value):
    '''
        array - onde estamos procurando o valor
        low_index - índice de onde iniciaremos nossa busca
        high_index - índice de onde finalizaremos nossa busca
        value - valor a ser procurado
    '''
    # caso base: quando os índices se cruzam.
    # Caso onde a busca terminou e o elemento não foi encontrado
    if high_index < low_index:
        raise ValueError(f"{value} is not in list")

    # middle_index é o índice que divide o array formado
    # entre o menor índice (low) e o maior (high)
    middle_index = (high_index + low_index) // 2

    # se encontrou o elemento retorne seu índice
    if array[middle_index] == value:
        return middle_index
    # caso o elemento buscado seja menor que o encontrado,
    # procure somente os anteriores a ele.
    # Fazemos isto modificando o índice maior,
    # para o índice anterior ao meio (middle)
    elif array[middle_index] > value:
        return binary_search(array, low_index, middle_index - 1, value)
    # caso o elemento buscado seja maior que o encontrado,
    # procuramos somente os posteriores a ele.
    # Fazemos isto indicando que o índice menor
    # será o índice posterior ao meio (middle)
    else:
        return binary_search(array, middle_index + 1, high_index, value)


array = [2, 3, 4, 10, 40]
target = 40

result = binary_search(array, 0, len(array) - 1, target)
print(f"Elemento encontrado na posição: {result}")
```

---

## Vamos fazer juntos

###### Tempo sugerido para realização: 80 minutos

Agora que já passamos pelos conceitos mais básicos, está na hora de colocarmos a mão na massa com a nossa aula ao vivo!

Bora pro Slack, onde o link estará disponível. 😉

---

## Exercícios

###### Tempo sugerido para realização: 140 minutos

<%= versioning_your_code(@conn) %>

---

### Agora a prática

Vamos colocar tudo o que vimos até agora em prática.

Para medir o tempo de execução de um algoritmo (em segundos) utilize o seguinte trecho de programa:

```language-python
from time import perf_counter

start_time = perf_counter()
# seu algoritmo aqui
end_time = perf_counter()
print(f"Seu algoritmo foi executado em {end_time - start_time} segundos")
```


**Exercício 1** Dado um array com os seguintes elementos `["zebra", "macaco", "elefante", "arara", "javali"]`, após duas iterações utilizando _bubble sort_, como estaria este array?

**Exercício 2** Demonstre o passo a passo, do processo de mistura, de um array sendo ordenado, utilizando _merge sort_. Comece o passo a passo a partir da linha abaixo:

```language-md
7 3    5 4    6 8    2 1
```

**Exercício 3** Execute os algoritmos de ordenação por seleção e inserção, para as entradas de dados ordenadas, inversamente ordenadas e aleatórias, em seguida, compare-os. Faça testes para entradas de tamanho 10.000, 100.000, 1.000.000.

🦜  A entrada de dados pode ser gerada da seguinte maneira:

```language-python
from random import shuffle


ordenados = list(range(100))
inversamente_ordenados = list(reversed(range(100)))
aleatorios = ordenados[:] # copia dos ordenados
shuffle(aleatorios) # embaralha eles
```

**Exercício 4** Compare o tempo de execução do algoritmo `merge_sort` e `bubble_sort` para uma entrada de 10.000 valores aleatórios. Explique através de análise de complexidade o que ocorre.

**Exercício 5** Converta o algoritmo recursivo de busca binária em iterativo.

**Exercício 6** Para descobrirmos qual _commit_ introduziu um erro no sistema, precisamos voltar no tempo verificando os _commits_ antigos, de modo a descobrir um _commit_ em que os testes falham. Supondo que isto será representado como um **array de booleanos**, descubra o índice onde o erro ocorreu pela primeira vez.

Como os testes demoram a rodar, resolva o problema rodando o mínimo de testes possíveis.

```language-md
entrada: [True, True, True, True, False, False, False]
saída: 4


entrada: [True, True, False, False, False, False, False]
saída: 2
```

> 💡 Curiosidade: O comando git bisect executa de maneira similar a este exercício, se implementado de forma eficiente 😂.

---

## Recursos adicionais (opcional)

- [Visualização gráfica dos algoritmos de ordenação](https://www.cs.usfca.edu/~galles/visualization/ComparisonSort.html) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Programação Dinâmica - Playlist sobre ordenações](https://www.youtube.com/watch?v=ZT_dT8yn48s&list=PL5TJqBvpXQv4l7nH-08fMfyl7aDFNW_fC) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Visualização gráfica dos algoritmos de busca](https://www.cs.usfca.edu/~galles/visualization/Search.html) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Programação Dinâmica - Busca Binária](https://youtu.be/EgLE5HwRy_M) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
