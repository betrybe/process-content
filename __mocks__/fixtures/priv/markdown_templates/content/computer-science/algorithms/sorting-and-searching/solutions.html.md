## Gabarito dos exercícios

A seguir encontra-se uma sugestão de solução para os exercícios propostos.

**Exercício 1** Dado um array com os seguintes elementos `["zebra", "macaco", "elefante", "arara", "javali"]`, após duas iterações utilizando _bubble sort_, como estaria este array?

**Solução:** `["elefante", "arara", "javali" ,"macaco","zebra"]`

**Exercício 2** Demonstre o passo a passo, do processo de mistura, de um array sendo ordenado, utilizando _merge sort_. Comece o passo a passo a partir da linha abaixo:

```language-md
7 3    5 4    6 8    2 1
```

**Solução**

```language-md
7    3    5    4    6    8    2    1

3 7    4 5    6 8    1 2

3 4 5 7    1 2 6 8

1 2 3 4 5 6 7 8
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

**Solução:**

```language-python
from random import shuffle
from time import perf_counter


def selection_sort(array):
    for i in range(len(array)):
        minimum = i

        for j in range(i + 1, len(array)):
            if array[j] < array[minimum]:
                minimum = j

        array[minimum], array[i] = array[i], array[minimum]

    return array


def insertion_sort(array):
    for i in range(len(array)):

        current_value = array[i]
        current_position = i

        while (
            current_position > 0
            and array[current_position - 1] > current_value
        ):
            array[current_position] = array[current_position - 1]
            current_position = current_position - 1

        array[current_position] = current_value

    return array


for algorithm in (insertion_sort, selection_sort):

    algorithm_name = algorithm.__name__

    for input in (10_000, 100_000, 1_000_000):

        sorted_numbers = list(range(100))
        reversed_sorted_numbers = list(reversed(sorted_numbers))
        random_numbers = sorted_numbers[:]  # copia dos ordenados
        shuffle(random_numbers)  # embaralha eles

        start_time = perf_counter()
        algorithm(sorted_numbers)
        end_time = perf_counter()
        print(f"Para uma entrada ordenada de {input} números")
        print(
            f"{algorithm_name} foi executado em {end_time - start_time} segundos"
        )

        start_time = perf_counter()
        algorithm(reversed_sorted_numbers)
        end_time = perf_counter()
        print(f"Para uma entrada inversamente ordenada de {input} números")
        print(
            f"{algorithm_name} foi executado em {end_time - start_time} segundos"
        )

        start_time = perf_counter()
        algorithm(random_numbers)
        end_time = perf_counter()
        print(f"Para uma entrada aleatória de {input} números")
        print(
            f"{algorithm_name} sort foi executado em {end_time - start_time} segundos"
        )

        print("*" * 50)
```


**Exercício 4** Compare o tempo de execução do algoritmo `merge_sort` e `bubble_sort` para uma entrada de 10.000 valores aleatórios. Explique através de análise de complexidade o que ocorre.

**Solução**

```language-python
from random import shuffle
from time import perf_counter


def bubble_sort(array):

    has_swapped = True
    num_of_iterations = 0

    while has_swapped:
        has_swapped = False

        for i in range(len(array) - num_of_iterations - 1):
            if array[i] > array[i + 1]:
                array[i], array[i + 1] = array[i + 1], array[i]
                has_swapped = True
        num_of_iterations += 1

    return array


def merge_sort(array):

    if len(array) <= 1:
        return array

    mid = len(array) // 2
    left, right = merge_sort(array[:mid]), merge_sort(array[mid:])

    return merge(left, right, array.copy())


def merge(left, right, merged):

    left_cursor, right_cursor = 0, 0

    while left_cursor < len(left) and right_cursor < len(right):

        if left[left_cursor] <= right[right_cursor]:
            merged[left_cursor + right_cursor] = left[left_cursor]
            left_cursor += 1
        else:
            merged[left_cursor + right_cursor] = right[right_cursor]
            right_cursor += 1

    for left_cursor in range(left_cursor, len(left)):
        merged[left_cursor + right_cursor] = left[left_cursor]

    for right_cursor in range(right_cursor, len(right)):
        merged[left_cursor + right_cursor] = right[right_cursor]

    return merged


for algorithm in (bubble_sort, merge_sort):
    algorithm_name = algorithm.__name__
    numbers = list(range(10_000))
    shuffle(numbers)
    start_time = perf_counter()
    algorithm(numbers)
    end_time = perf_counter()
    print(f"{algorithm_name} executou em {end_time - start_time} segundos")
```

No _bubble sort_ em um caso médio temos uma complexidade de `O(n²)`, o que significa que normalmente temos `n²` trocas, já o _merge sort_, como utiliza dividir e conquistar, consegue ter uma complexidade `O(n log n)` em média. Mesmo em um pior cenário, onde ao embaralharmos os dois arrays, tornando-os inversamente ordenados, o _merge sort_ seria mais rápido, pois sua complexidade ainda seria `O(n log n)` e o _bubble sort_ teria complexidade quadrática `O(n²)`.

**Exercício 5** Converta o algoritmo recursivo de busca binária em iterativo.

**Solução:**

```language-python
def binary_search(array, value):

    low_index = 0
    high_index = len(array) - 1

    while high_index >= low_index:

        middle_index = (high_index + low_index) // 2
        if array[middle_index] == value:
            return middle_index
        elif array[middle_index] > value:
            high_index = middle_index - 1
        else:
            low_index = middle_index + 1

    raise ValueError(f"{value} is not in list")


array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
target = 10

print(binary_search(array, target))
```

**Exercício 6** Para descobrirmos qual _commit_ introduziu um erro no sistema, precisamos voltar no tempo verificando os _commits_ antigos, de modo a descobrir um _commit_ em que os testes falham. Supondo que isto será representado como um **array de booleanos**, descubra o índice onde o erro ocorreu pela primeira vez.

Como os testes demoram a rodar, resolva o problema rodando o mínimo de testes possíveis.

```language-md
entrada: [True, True, True, True, False, False, False]  # saída: 4


entrada: [True, True, False, False, False, False, False]  # saída: 2
```

> 💡 Curiosidade: O comando git bisect executa de maneira similar a este exercício, se implementado de forma eficiente 😂.
**Solução:**

```language-python
def find_first_bad_version(array):
    low_index = 0
    high_index = len(array) - 1

    while high_index >= low_index:

        middle_index = (high_index + low_index) // 2

        if array[middle_index] is False:
            high_index = middle_index - 1
        else:
            low_index = middle_index + 1

    return low_index


array1 = [True, True, True, True, False, False, False]
array2 = [True, True, False, False, False, False, False]

print("Saída array1:", find_first_bad_version(array1))
print("Saída array2:", find_first_bad_version(array2))
```
