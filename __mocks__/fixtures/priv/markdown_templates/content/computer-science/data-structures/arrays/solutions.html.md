## Gabarito dos exercícios

A seguir encontra-se uma sugestão de solução para os exercícios propostos.

**Exercício 1** Em um software monitor, que verifica a resiliência de outro software, precisamos saber qual o tempo máximo que um software permaneceu sem instabilidades. Para isto, a cada hora é feito uma requisição ao sistema e verificamos se está ok. Supondo um array que contenha os estados coletados por nosso software, calcule quanto tempo máximo que o servidor permaneceu sem instabilidades.

```language-md
1 - OK
0 - Instabilidades

valores_coletados = [0, 1, 1, 1, 0, 0, 1, 1]
resultado = 3

valores_coletados = [1, 1, 1, 1, 0, 0, 1, 1]
resultado = 4
```

_Solução:_

```language-python
def verify_max_time_ok(collected_values):
    max_time = 0
    current_time = 0
    for value in collected_values:
        if value == 1:
            current_time += 1
        else:
            current_time = 0
        if current_time >= max_time:
            max_time = current_time
    return max_time
```

**Exercício 2** Em um jogo de baralho, as cartas estão representadas por um array numérico. Para iniciar o jogo devemos embaralhar as cartas. Faremos isto dividindo uma porção de cartas em 2 e depois mesclando as duas porções. Por exemplo:

```language-md
Exemplo 1:
cartas = [2, 6, 4, 5]
cartas por parte = 2

resultado = [2, 4, 6, 5]

Exemplo 2:
cartas = [1, 4, 4, 7, 6, 6]
cartas por parte = 3

resultado = [1, 7, 4, 6, 4, 6]
```

_Solução:_

```language-python
def shuffle(numbers, n):
    answer = []
    new_array_index = 0
    for index in range(n):
        answer.insert(new_array_index, numbers[index])
        new_array_index += 1
        answer.insert(new_array_index, numbers[index + n])
        new_array_index += 1
    return answer
```

**Exercício 3** Dado um array de números inteiros que representam produtos em um e-commerce. Verifique quantos produtos formam boas combinações, considerando que uma boa combinação é quando um produto é igual ao outro e seu índice é maior que o anterior. Esta combinação pode ser utilizada para modificar os produtos de uma página. Por exemplo:

```language-md
Exemplo 1:
produtos = [1, 3, 1, 1, 2, 3]
resultado = 4
Os índices (0, 2), (0, 3), (1, 5), (2, 3) formam combinações.


Exemplo 2:
produtos = [1, 1, 2, 3]
resultado = 1
Os índices (0, 1) formam a única combinação.
```

_Solução:_

```language-python
def good_pairs(numbers):
    answer = 0
    i = 0
    size = len(numbers)
    for i in range(size):
        for j in range(i + 1, size):
            if numbers[i] == numbers[j]:
                answer += 1
    return answer
```

**Exercício 4** Dado dois arrays de números inteiros que representam instantes de entrada e saídas em uma biblioteca e um número que represente um instante a ser buscado. Retorne quantas pessoas estudantes estão na biblioteca naquele instante. Considere que todo estudante que entrou, saiu da biblioteca.

```language-md
entradas = [1, 2, 3]
saídas = [3, 2, 7]
instante_buscado = 4
resultado: 1

O estudante 1 entrou no instante 1 e saiu no 3, já o segundo entrou
e saiu no 2 e o último foi único a estar presente no instante 4.
```

_Solução:_

```language-python
def students_in_instant(inputs, outputs, query_number):
    answer = 0
    size = len(input)
    for index in range(size):
        if inputs[index] < query_number < outputs[size]:
            answer += 1
    return answer


# ou de uma maneira mais pythonica
def students_in_instant(inputs, outputs, query_number):
    answer = 0
    for input, output in zip(inputs, outputs):
        if input < query_number < output:
            answer += 1
    return answer
```

**Exercício 5** Em um software gerenciador de servidores, precisamos verificar o número de servidores que se comunicam. Os servidores estão representados como um array bidimensional onde o valor 1 representa um computador e 0 a ausência do mesmo. Dois servidores se comunicam se eles estão na mesma linha ou mesma coluna.

```language-md
servidores =  [[1,0],[0,1]]
resultado: 0
Linhas e colunas são diferentes.

servidores = [[1,0],[1,1]]
resultado: 3
Todos os servidores se comunicam com ao menos um outro servidor.

servidores = [[1, 0, 0],
              [1, 0, 0],
              [0, 0, 1]]
resultado: 2
O servidor de índice (2, 2) não possui nenhum outro na mesma linha e coluna.
```

_Solução:_

```language-python
def count_servers(grid):

    rows, columns = len(grid), len(grid[0])
    servers_in_rows = [0 for _ in range(rows)]
    servers_in_columns = [0 for _ in range(columns)]

    for i in range(rows):
        for j in range(columns):
            if grid[i][j] == 1:
                servers_in_rows[i] += 1
                servers_in_columns[j] += 1

    answer = 0
    for i in range(rows):
        for j in range(columns):
            if grid[i][j] == 1 and (
                servers_in_rows[i] > 1 or servers_in_columns[j] > 1
            ):
                answer += 1

    return answer
```
