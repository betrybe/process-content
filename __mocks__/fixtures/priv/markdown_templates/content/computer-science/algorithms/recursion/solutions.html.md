## Gabarito exercícios de fixação

**Exercício 1:** Faça um algoritmo recursivo de soma. Esse algoritmo deve receber um número de parâmetro e deve somá-lo a todos os números antecessores a ele.

Exemplo:

```language-md
Número passado por parâmetro à função: 4

Execução: 4 + 3 + 2 + 1

Resultado: 10
```

_Solução:_

```language-python
def sum_recursive(n):
    if n == 0:
        return 0
    else:
        return n + sum_recursive(n - 1)


sum_recursive(4)
```

Podemos observar que a condição de parada é se _n_ for igual a 0, caso contrário a operação continuará sendo feita.

## Gabarito dos exercícios

A seguir, encontram-se sugestões de soluções para os exercícios propostos.

**Exercício 1:**  Crie um algoritmo _não recursivo_ para contar quantos números pares existem em uma sequência numérica (1 a n).

_Solução:_

```language-python
def conta_pares(n):
    p = 0
    for num in range(n+1):
        if num % 2 == 0 and num != 0:
            p += 1
    return p
```

**Exercício 2:** Transforme o algoritmo criado acima em recursivo.

_Solução:_

```language-python
def conta_pares(n):
    if n == 0:
        return 0  # 0 é par
    elif n % 2 == 0:
        return 1 + conta_pares(n-1)
    else:
        return conta_pares(n-1)
```

**Exercício 3:** Crie um algoritmo recursivo que encontre, em uma lista, o maior número inteiro.

_Solução:_

```language-python
def maiorinteiro_aux(lista, n):
    if n == 1:
        return lista[0]
    else:
        m = maiorinteiro_aux(lista, n-1)
        if m > lista[n-1]:
            return m
        else:
            return lista[n-1]


def maiorinteiro(lista):
    n = len(lista)
    return maiorinteiro_aux(lista, n)


print(maiorinteiro([1, 21, 300, 4, 57]))
```

**Exercício 4:** Escreva um algoritmo recursivo para encontrar o máximo divisor comum (`mdc`) de dois inteiros.

_Solução:_

```language-python
def mdc(a, b):
    if b == 0:
        return a
    return mdc(b, a % b)
```

**Exercício 5:** Escreva um algoritmo recursivo que identifica se um número é primo.

_Solução:_

```language-python
def temdivisor(n, i, j):
    if i > j:
        return False
    elif n % i == 0:
        return True
    else:
        return temdivisor(n,i + 1,j)


def primo(n):
    return n > 1 and not(temdivisor(n, 2, n - 1))


print(primo(997))
```

#### Bônus

**Exercício 6:** Escreva um algoritmo recursivo que resolva o problema da torre de hanoi, seguindo as instruções:

- Assim como na imagem abaixo, a torre deve conter 3 discos, e três colunas;

- Os discos começam alinhados na primeira coluna, e devem ser organizados respeitando a ordem de tamanho, na última coluna.

<%= figure(%{src: "/computer-science/algorithms/recursion/recursion/images/hanoi.gif", class: "rounded mxh-auto d-block text-center", width: "500px"}) %>

_Solução:_

```language-python
def torres_hanoi(n, a, b, c):
    if n == 1:
    	print ("Move disco %d de %s para %s" % (n, a, c))
    else:
    	torres_hanoi(n - 1,a ,c ,b)
    	print ("Move disco %d de %s para %s" % (n, a, c))
    	torres_hanoi(n - 1, b, a, c)


print (torres_hanoi(3, a='primeiro', b='meio', c='fim'))
```
