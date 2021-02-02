## Gabarito dos exercícios

**Exercício 1** Dado um array de números de tamanho `n`, escreva um algoritmo que retorna `true` se há no array um número duplicado e `false` caso contrário. Analise a solução abaixo e diga qual é a ordem de complexidade desse algoritmo para o melhor caso, pior caso e caso médio.

```language-python
""" O algoritmo ordena o array independente de qualquer coisa, então
o seu pior caso, melhor caso e caso médio são, no mínimo,
complexidade do algoritmo de ordenação do Python. Vendo a documentação,
vemos que tal algoritmo é O(n log n). Dado que, depois de ordenar, no pior
caso passamos pelo array inteiro uma vez só, isso seria O(n). Assim sendo,
a complexidade é O(n*log(n) + n) o que, simplificando, fica O(n log n)"""

def contains_duplicate(numbers):
    numbers.sort()
    previous_number = 'not a number';
    for number in numbers:
        if(previous_number == number): return True
        previous_number = number

    return False
```

**Exercício 2** Suponha que se está escrevendo uma função para um jogo de batalha naval. Dado um array bidimensional com `n` linhas e `m` colunas, e um par de coordenadas `x` para linhas e `y` para colunas, o algoritmo verifica se há um navio na coordenada alvo. Por exemplo:

```language-python
""" Mesmo para um array bidimensional, o acesso a um elemento é O(1).
A complexidade de espaço também é O(1), pois não consideramos a entrada em seu cálculo."""

def battleship(grid, line, column):
    if(grid[line][column] == 1): return True

    return False
```

**Exercício 3** O código abaixo está em **JavaScript**. Calcule sua ordem de complexidade para um array de tamanho `n`.

```language-javascript
// A função map itera sobre todo o array. O código, portanto, é O(n).

const numbers = [0,1,2,3,4,5,6,7,8,9]
numbers.map(n => n*n)
```

**Exercício 4** O código abaixo está em **JavaScript**. Calcule sua ordem de complexidade para um array de tamanho `n`.

```language-javascript
/* As três funções iteram por todo o array, uma depois da outra.
A ordem de complexidade, portanto, seria O(n + n + n), ou O(3n),
mas dizemos O(n) para simplificar. */

const numbers = [0,1,2,3,4,5,6,7,8,9]
numbers.map(n => n*n)
       .filter(n => n%2 === 0)
       .reduce((acc, n) => acc + n)
```

**Exercício 5** Utilize o módulo `random` da linguagem Python para gerar um array com 100 números. Cada um desses números deve ser a média de dez números gerados aleatóriamente. Qual é a ordem de complexidade de tempo e de espaço deste programa?

```language-python
"""Mesmo que, para o exemplo dado, o valor de `n` seja muito menor que o valor da constante `100`, para valores de `n` grandes o valor da constante se torna desprezível. Esse problema, então, é `O(n)`. Pelo mesmo motivo, a complexidade de espaço é constante, ou seja, `O(1)`"""

import random

def randomAverages(n):
    list_of_averages = []

    for _ in range(100):
        average = 0
        for _ in range(n):
            average += random.randrange(1, n)
        average = average/n
        list_of_averages.append(average)

    return list_of_averages
```

**Exercício 6** Dado um array de doces candies e um valor inteiro extra_candies, onde o candies[i] representa o número de doces que a enésima criança possui. Para cada criança, verifique se há uma maneira de distribuir doces extras entre as crianças de forma que ela possa ter o maior número de doces entre elas. Observe que várias crianças podem ter o maior número de doces. Analise o código abaixo para o melhor, pior caso e caso médio.

```language-python
"""Para os três casos, utilizando a função `max()` do Python, a complexidade será O(n). A lista abaixo da função `max()` também é executada em O(n). Ou seja, O(n) + O(n) = O(n). A complexidade de espaço também é O(n), pois quanto mais crianças temos, maior vai ser o tamanho da lista gerada. Faça a analise de complexidade de espaço também."""

def kids_with_candies(candies, extra_candies):
    # parece que a solução percorre o array somente uma vez,
    # porém isto é feito duas vezes, uma no `max` e outra para
    # preencher a resposta
    max_candies = max(candies)
    return [candy + extra_candies >= max_candies for candy in candies]


# saída: [True, True, True, False, True]
print(kids_with_candies([2, 3, 5, 1, 3], 3))
```
