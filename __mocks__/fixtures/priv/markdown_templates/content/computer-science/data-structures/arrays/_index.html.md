## O que vamos aprender?

Hoje vamos iniciar os estudos em um dos temas mais fundamentais em ciência da computação, **Estrutura de dados**. Vamos estudar o impacto que decisões sobre estruturas têm sobre o nosso código em termos de performance e utilização do espaço. Vamos analisar como a maneira que os dados estão dispostos influenciam na resolução de um determinado problema. Conheceremos sobre a estrutura de dados conhecida como _array_, aprendendo a utiliza-la, quando conveniente, para solucionar problemas.

---

### Você será capaz de

- Entender o que são _estruturas de dados_ (**ED**) e o que são _tipos abstratos de dados_ (**TAD**);

- Entender a motivação para criação de estruturas de dados _arrays_;

- Inserir e remover elementos em _arrays_, entendendo o que acontece por trás dos panos;

- Manipular _arrays_ multidimensionais;

---

## Por que isso é importante?

Já parou para pensar sobre uma lista de itens em um sistema de compras online? Eu tenho itens repetidos? Eles estão ordenados? Que operação eu estou fazendo com esta lista? Qual o problema estou resolvendo através desta lista?

O conhecimento de estrutura de dados te permite escolher qual a melhor opção na organização dos seus dados, em termos de espaço, performance de acesso e outras características. É importante conhecer como percorrer, fazer buscas e o que acontece quando adicionamos ou removemos novos itens.

Neste cenário temos os _arrays_, que sua utilização correta nos permite manipular arranjos complexos com maior qualidade de processamento. Estão presentes em áreas de desenvolvimento com manipulação de dados, engenharia de dados e ciência de dados.

Todo este conhecimento é bastante útil também em "_whiteboard interviews_", que são testes técnicos, onde o avaliador lhe dá um problema e pede que seja resolvido, explicando as decisões tomadas em um "quadro branco" (ou algo similar). Empresas como Amazon, Google, Facebook, todas tem esse tipo de entrevista em seus processos seletivos.

<%= figure(%{src: "/computer-science/data-structures/arrays/images/whiteboard-interview.jpeg", class: "text-center rounded mx-auto d-block", width: "auto", height: "auto"}) %>

---

## Conteúdos

###### Tempo sugerido para realização: 120 minutos

### 💯 O problema das notas

Em uma escola, o sistema precisa armazenar todas as notas das provas, de cada estudante, de uma turma para uma determinada matéria. Quando selecionado um estudante, o sistema deve calcular a soma das notas para verificar se o/a estudante foi aprovado ou não. Este estudante possui quatro notas referentes à provas e trabalhos e caso não seja aprovado, tem direito a uma prova de recuperação.

Normalmente quando confrontados com este tipo de problema, já pensamos logo em escrever uma lista com estes valores. Mas por que não um conjunto (`set`) ou talvez um dicionário (`dict`)? Estes dados tem de ser armazenados de forma ordenada? Como será feito o seu acesso?

Poderíamos resolver este problema criando variáveis de tipos primitivos, como uma série de variáveis contendo as notas, mas não parece ser uma boa escolha.

```language-python
estudante1_matematica_prova1 = 10
estudante1_matematica_prova2 = 8
estudante1_matematica_prova3 = 9
```

> 💡 Em python não existem tipos primitivos, tudo é objeto. Por exemplo, experimente em um terminal interativo `(5).bit_length()`. Viu que conseguimos chamar um método até mesmo de um número? Podemos fazer isso, pois, assim como todo objeto, um número possui atributo e comportamento.

Estas decisões são partes do dia-a-dia de uma pessoa programadora e é importante ter uma nítida distinção sobre o que é um tipo de dado e uma estrutura de dado. Tipos de dados definem um conjunto de valores que uma variável ou constante pode assumir, como por exemplo, `True` ou `False` para tipos _booleanos_ ou valores numéricos para tipos inteiros (`int`). Já estruturas de dados são uma coleção tanto de valores quanto de operações.

Parece que o que estamos procurando para organizar os nosso dados, são estruturas de dados.

Estruturas de dados (**ED** ou **DS** em inglês) são implementações de tipos abstratos de dados. É possível analisar o tempo e a complexidade da memória de uma estrutura de dados, mas não a partir de um tipo de dados. A Estrutura de Dados pode ser implementada de várias maneiras e sua implementação pode variar de linguagem para linguagem.

Tipos abstratos de dados (**TAD** ou **ADT** em inglês) são uma forma de classificar estruturas de dados com base em como são usadas e os comportamentos que fornecem. Eles não especificam como a estrutura de dados deve ser implementada, mas simplesmente fornecem uma interface mínima esperada e um conjunto de comportamentos.

Esta definição de _TAD_, lembra muito a definição de classes abstratas e interface da orientação a objetos e não é coincidência. Historicamente esta metodologia de abstração foi incorporada à própria linguagem de programação para um protótipo do que hoje conhecemos como orientação a objetos.

Vamos fazer uma pausinha para reforçar os conceitos vistos até agora, através de exercícios.

**Exercício 1**  Tipos abstratos de dados possuem uma única implementação bem documentada?

**Exercício 2** Listas(`list`), dicionários(`dict`) e conjuntos(`set`), que já vêm no Python, são considerados tipos de dados? Caso negativo, justifique sua resposta.

Voltando ao nosso problema de notas, precisamos de uma estrutura onde os elementos (dados) sejam de fácil acesso, facilmente percorrível e que mantenha as notas ordenadas.

Acho que _array_ pode ser uma boa escolha, mas por que?

### Por que _arrays_?

<%= figure(%{src: "/computer-science/data-structures/arrays/images/arrays.jpg", class: "text-center rounded mx-auto d-block", width: "auto", height: "auto", caption: "Estrutura indexada do tipo array"}) %>

_Array_ é um tipo abstrato de dado (**TAD**) que possui uma coleção de elementos que são acessados através do índice. Um array Pode armazenar todo o tipo de dado e estes normalmente são de tipos homogêneos, ou seja, do mesmo tipo.

> 💡 Em python, listas armazenam somente uma referência a um objeto. Portanto um objeto armazenado em uma lista, modificado posteriormente, será modificado na lista.

**TADS** podem ser implementados de maneiras variadas, porém normalmente são representados através de arrays estáticos (cuidado para não confundir o tipo abstrato com implementação concreta) e arrays dinâmicos. A implementação estática define um valor fixo de tamanho e não pode ser modificada durante a execução do programa, já a dinâmica, permite que ele cresça à medida que novos elementos são inseridos.

A principal característica de um _array_ é que elementos são armazenados e recuperados através de índices, o mesmo índice utilizado para adicionar um elemento pode ser utilizado para a sua recuperação.

Devemos lembrar sempre que a maneira como os índices trabalham é específica da implementação, mas podemos pensar neles como o número da posição em que se encontram em uma coleção e que tipicamente começam em zero.

Agora que entendemos um pouco sobre o TAD, que tal implementarmos a estrutura de dados (**ED**) `Array`?

Devemos implementar pelo menos um jeito de recuperar e armazenar um dado através do índice. Para isso, vamos escrever o código abaixo:

**Nota:** Lembre-se de criar e ativar o ambiente isolado.

> array_example.py

```language-python
"""Perceba que temos uma coleção de valores
e operações que atuam sobre estes valores,
de acordo com o que foi definido pelo TAD."""

class Array:

    def __init__(self):
        self.data = []

    def __len__(self):
        # quando pedido o tamanho do array
        # retorne o tamanho de data
        return len(self.data)

    def __str__(self):
        # converte para string e exibe os valores de data
        return str(self.data)

    def get(self, index):
        return self.data[index]

    def set(self, index, value):
        self.data.insert(index, value)


# vamos inicializar e preencher uma estrutura de dados array
array = Array()
array.set(0, "Felipe")
array.set(1, "Ana")
array.set(2, "Shirley")
array.set(3, "Miguel")

# para acessar um elemento do array, utilizamos seu índice
print(array.get(0))  # saída: Felipe
print(array.get(2))  # saída: Shirley
print("-----")

# podemos iterar sobre seus elementos da seguinte maneira
index = 0
# enquanto há elementos no array
while index < len(array):
    # recupera o elemento através de um índice
    print("Index:", index, ", Nome:", array.get(index))
    index += 1
```

Relembrando o problema das notas, como _arrays_ são estruturas eficientes para consultas, podemos buscar um estudante, através de um índice, e percorrer suas notas de uma maneira eficaz. Ainda temos o detalhe de que não ocorrem tantas inserções de notas, somente quando um estudante entrar em recuperação.

Mas porque não ter inserções é uma coisa boa? Vamos entender o que acontece quando inserimos elementos em um array.

### Entendendo a estrutura

Para entender o que acontece a cada inserção em um _array_, devemos entender o comportamento de uma lista (`list`), pois é a base da implementação da nossa estrutura de dados.

Lembre-se que agora estamos falando da estrutura de dados _Array_, ou seja a implementação do tipo abstrato. É incorreto falar sobre estas análises em um tipo abstrato de dados.

> array_example.py

```language-python
import sys

# class Array:
#     ...


# while index < len(array):
#     # recupera o elemento através de um índice
#     print("Index:", index, ", Nome:", array.get(index))
#     index += 1


print("-----")
array = Array()
# sys.getsizeof retorna o tamanho da lista em bytes
array_memory_size = sys.getsizeof(array.data)
print(array_memory_size)
```

Quando inicializamos nossa estrutura array e internamente inicializamos uma lista(`list`) vazia, adicionando alguns itens, um espaço adicional é reservado para armazenar os itens. O tamanho de cada _slot_ é baseado no tamanho da estrutura que vamos armazenar (referência para objetos no caso do Python).

Vamos inserir alguns itens e comparar o resultado.

> array_example.py

```language-python
# ...


array.set(0, "Marcos")
array.set(1, "Patrícia")
# quando começamos as inserções o valor muda
array_memory_size = sys.getsizeof(array.data)
print(array_memory_size)
array.set(2, "Matheus")
array.set(3, "Giovana")
# como um espaço adicional é reservado o valor não é modificado
array_memory_size = sys.getsizeof(array.data)
print(array_memory_size)
```

Inserimos mais alguns valores e vamos ver o que acontece.

> array_example.py

```language-python
# ...


array.set(4, "Alberto")
array.set(5, "Marta")
array.set(6, "Túlio")
array.set(7, "Michelle")
array_memory_size = sys.getsizeof(array.data)
print(array_memory_size)
```

Agora notamos que a lista cresceu de tamanho à medida que adicionamos novos itens. De acordo com a documentação da linguagem Python, a cada vez que um elemento é inserido, a lista cresce o seu tamanho em `1.125`.

Embora a primeira vista pareça que a estrutura apenas aloca mais espaços em memória e adiciona novos itens, o que acontece na verdade é que, quando há um crescimento, um novo endereço na memória é reservado para um nova lista. Em seguida, os elementos são copiados da lista original para a nova, o novo elemento é adicionado já nesse espaço de memória.

Para ajudar a compreensão, vamos ver isto de uma forma um pouco mais visual.

```language-md
# Supondo uma lista com 4 valores numéricos:
            *---*---*---*---*
original    | 1 | 2 | 3 | 4 |   posição na memória: 0x01
            *---*---*---*---*

# Ao adicionar um novo item, a lista precisa crescer:
            *---*
novo item   | 5 |
            *---*
            *---*---*---*---*
original    | 1 | 2 | 3 | 4 |    posição na memória: 0x01
            *---*---*---*---*

# Uma nova lista é criada:
            *---*---*---*---*---*---*---*---*
nova        |   |   |   |   |   |   |   |   |    posição na memória: 0x1A
            *---*---*---*---*---*---*---*---*

# Os elementos da lista original são copiados para a nova lista:
            *---*---*---*---*
original    | 1 | 2 | 3 | 4 |    posição na memória: 0x01
            *---*---*---*---*
              ↓   ↓   ↓   ↓
            *---*---*---*---*---*---*---*---*
nova        | 1 | 2 | 3 | 4 |   |   |   |   |    posição na memória: 0x1A
            *---*---*---*---*---*---*---*---*

# O novo elemento é colocado na nova lista:
            *---*
novo item   | 5 | -------------
            *---*             ↓
            *---*---*---*---*---*---*---*---*
nova        | 1 | 2 | 3 | 4 |   |   |   |   |    posição na memória: 0x1A
            *---*---*---*---*---*---*---*---*

# O endereço onde se encontrava a lista antiga é liberado para ser utilizado
# e o "nome original" é atribuído a nova lista:
            *---*---*---*---*---*---*---*---*
original    | 1 | 2 | 3 | 4 | 5 |   |   |   |    posição na memória: 0x1A
            *---*---*---*---*---*---*---*---*
```

Essa organização em espaços contínuos em memória torna o acesso a índices muito eficiente, pois basta pegar o endereço em memória do primeiro elemento e somar ao índice, multiplicando pelo tamanho do tipo armazenado e teremos o valor daquela posição. Posso ter dez, cem ou mil itens que o tempo para acessar o valor pelo índice será o mesmo.

> 💡 A decisão por criar uma nova lista e copiar os valores parece esquisita a primeira vista, mas a operação de realocação tem um custo muito muito grande, explicando assim esta decisão.

Até agora inserimos somente ao final do nosso array, mas e se precisarmos adicionar um elemento no início, ou no meio?

> array_example.py

```language-python
# ...


print("-----")
array = Array()
array.set(0, "Marcos")
array.set(1, "Patrícia")
print(array)  # saída: ["Marcos", "Patrícia"]
# inserindo no começo do array
array.set(0, "Valeria")
print(array)  # saída: ["Valeria", "Marcos", "Patrícia"]
# inserindo em uma posição intermediária
array.set(1, "Miguel")
print(array)
```

Quando inserimos um novo elemento no início do array, todos os elementos já existentes são deslocados à direita, tendo seu índice modificado em 1. Análogo a isto, quando adicionamos em uma posição intermediária, todos os elementos com índices posteriores ao inserido serão movidos em uma posição.

```language-md
# Supondo uma lista com 4 caracteres ao qual adicionaremos mais um no início:
            *---*
novo item   | a |
            *---*
              ↓
            *---*---*---*---*
original    | b | c | d |   |    posição na memória: 0x01
            *---*---*---*---*
                ⤻  ⤻  ⤻

# Os elementos são deslocados para o próximo índice.

            *---*---*---*---*
original    | a | b | c | d |    posição na memória: 0x01
            *---*---*---*---*


# As regras de crescimento ainda se aplicam portanto pode ser que uma nova lista
# seja criada, o elemento adicionado e os elementos copiados para a nova lista.
# Ainda assim, o índice de todos os elementos posteriores a inserção
# serão acrescidos em 1.
```

O mesmo acontece se inserirmos um novo elemento no meio da lista:

```language-md
# Supondo uma lista com 3 caracteres ao qual adicionaremos mais um na segunda posição, vulgo índice 1:
(inserimos b na posição 1).

                *---*
novo item       | b |
                *---*
                  ↓
            *---*---*---*---*
original    | a | c | d |   |    posição na memória: 0x01
            *---*---*---*---*
                    ⤻  ⤻

# O resultado final seria:
            *---*---*---*---*
original    | a | b | c | d |    posição na memória: 0x01
            *---*---*---*---*
```

Algo similar ocorre quando fazemos remoções de valores à partir dos índices:

```language-md
# Supondo uma lista com 4 caracteres ao qual removeremos um elemento

# Se removermos o ultimo elemento (índice 3), nada precisa ser modificado

         *---*---*---*---*
array    | a | b | c |   |    posição na memória: 0x01
         *---*---*---*-⤹-*
                        d

# Porém se removermos o primeiro, ou qualquer outro índice,
# todos os valores serão deslocados a esquerda:
                 ⤺  ⤺  ⤺
         *---*---*---*---*---*---*---*---*
array    | a |   | c | d | e |   |   |   |    posição na memória: 0x01
         *---*-⤹-*---*---*---*---*---*---*
                b

# À medida que itens são removidos, a estrutura diminui em tamanho:
         *---*---*---*---*
array    | a | c | d | e |    posição na memória: 0x01
         *---*---*---*---*
```

O código ficaria assim:

> array_example.py

```language-python
# import sys

class Array:

    # ...

    # def set(self, index, value):
    #     self.data.insert(index, value)

    def remove(self, index):
        # removeremos o item, retornando-o
        return self.data.pop(index)


# ...

print("-----")
array = Array()
array.set(0, "Marcos")
array.set(1, "Patrícia")
print(array)  # saída: ['Marcos', 'Patrícia']

array.remove(0)  # retorna a string "Marcos"
print(array)  # saída: ['Patrícia']
```

**Exercício 3** Que tal adicionarmos um método `update` que atualiza o valor à partir de um índice?

🐦 A assinatura deve ser `def update(self, index, value):`

### Arrays multidimensionais e outras operações

Arrays podem ter mais de uma dimensão, de fato, podem ser estendidas para um número _N_ de dimensões. Isto pode ser bastante útil para modelagens de matrizes, tabuleiros em jogos ou problemas que envolvam tabela de dados.

Vamos ver um exemplo de como poderíamos implementar um array dimensional. Para isso, vamos criar um novo arquivo, no mesmo diretório do arquivo que estávamos utilizando anteriormente, apenas para não termos que criar outro ambiente isolado.

> multidimensional_array_example.py

```language-python
from array_example import Array


class Matrix(Array):

    def get(self, row, column):
        return self.data[row][column]

    def set(self, row, column, value):
        """Caso a linha não exista, uma nova linha
        será criada."""
        try:
            self.data[row].insert(column, value)
        except IndexError:
            self.data.insert(row, [value])

    def remove(self, row, column):
        # removeremos o item, retornando-o
        return self.data[row].pop(column)


array = Matrix()
array.set(0, 0, "Marcos")
array.set(0, 1, 6)
array.set(0, 2, 9)

array.set(1, 0, "Patrícia")
array.set(1, 1, 9)
array.set(1, 2, 6)

print(array)

# remove o índice 2, da primeira linha
# valor: 9
array.remove(0, 2)

print(array)
```

Como já deve ter notado, `list` é uma implementação do _TAD Array_, e embora aqui tenhamos utilizado uma nova classe para escrever a estrutura de dados _array_, isto está cheirando muito a um `MiddleMan`. Portanto vamos remover o intermediário e utilizar diretamente a classe a partir de agora.

Vamos ver mais algumas coisas interessantes que podemos fazer com esta estrutura. Para isso, crie um novo arquivo novamente.

> functions_examples.py

```language-python
# Dado um array com os valores
array = [1, 2, 4, 5, 6]
# e outro com os valores
other_array= [7, 8, 9]
# podemos junta-los em um novo utilizando o operador +
new_array = array + other_array
# um novo array é criado e o conteúdo de ambos é copiado
# para a nova estrutura

# Uma outra operação interessante é a busca
# pois podemos buscar um elemento utilizando o operador in
# É equivalente a iterar sobre cada elemento e verificar a igualdade
5 in new_array
# essa busca pode demorar um pouco já
# que se não encontrar pode acabar percorrendo toda a estrutura

# temos o count para contar quantas vezes um elemento aparece
print("Numero de vezes que o 1 se repete:", [1, 2, 1, 2, 1, 4, 5, 6].count(1))

# array de duas dimensões
matrix = [[1, 2, 3],
          [4, 5, 6],
          [7, 8, 9]]

# acessando um índice
print(matrix[1][1])  # saída: 5
# deletando um elemento á partir do índice
del matrix[2][2]
print(matrix)
```

### Arrays no Pythonverso

<%= figure(%{src: "/computer-science/data-structures/arrays/images/pythonverso.png", class: "text-center rounded mx-auto d-block", width: "auto", height: "auto", caption: "Arrays no Pythonverso"}) %>

Arrays também estão presentes no universo Python em outras implementações além do tipo `list`. Abaixo veremos alguns exemplos:

#### Módulo array

Este módulo que já vem na linguagem Python, contém uma implementação de _arrays_ compacta e otimizada **para valores básicos** como caracteres, números inteiros e ponto flutuante.

> module_array_example.py

```language-python
import sys
from array import array

# define um array vazio de inteiros sem sinal
myarray = array("I")

# podemos adicionar alguns valores
myarray.insert(0, 5)  # na posição 0 o valor 5
myarray.insert(1, 3)
myarray.insert(2, 5)
print("Após adicionar alguns valores: ", myarray)

# adicionar em uma posição intermediária
myarray.insert(1, 4)
print("Após inserção em índice intermediário: ", myarray)


# remover um valor através do índice
myarray.pop(0)
print("Após remover um valor:", myarray)

# compare o tamanho entre ua lista e um array
elements = list(range(100)) # definimos uma lista de 100 números
print("Tamanho da lista:", sys.getsizeof(elements))
print("Tamanho do array", sys.getsizeof(array("I", elements)))
```

Um exemplo de utilização deste array pode ser para armazenar avaliações de um motorista em um sistema de motoristas particulares.

#### Numpy

Pacote fundamental para computação científica em Python, possui uma implementação rápida e versátil para array de n-dimensões.

🐦 Para usar o `Numpy` devemos instalá-lo através do `pip`. Vamos utilizar o seguinte comando:

```language-bash
$ python3 -m pip install numpy
```

```language-python
import numpy as np

# define um array vazio de inteiros
myarray = np.array([], dtype=int)

# podemos adicionar alguns valores
myarray = np.insert(myarray, 0, 5)  # na posição 0 o valor 5
myarray = np.insert(myarray, 1, 3)
myarray = np.insert(myarray, 2, 5)
print("Após adicionar alguns valores: ", myarray)

# adicionar em uma posição intermediária
myarray = np.insert(myarray, 1, 4)
print("Após inserção em índice intermediário: ", myarray)


# remover um valor através do índice
myarray = np.delete(myarray, 0)
print("Após remover um valor:", myarray)
```

Bibliotecas como o pandas para análise de dados, ou `scikit-learn` para aprendizado de máquina utilizam o `numpy` por baixo dos panos, devido a sua implementação eficiente.

---

## Vamos fazer juntos

###### Tempo sugerido para realização: 80 minutos

Agora que já passamos pelos conceitos, está na hora de colocarmos a mão na massa com a nossa aula ao vivo!

Bora pro Slack, onde o link estará disponível. 😉

---

## Exercícios

###### Tempo sugerido para realização: 100 minutos

<%= versioning_your_code(@conn) %>

### Agora a prática

**Exercício 1** Em um software monitor, que verifica a resiliência de outro software, precisamos saber qual o tempo máximo que um software permaneceu sem instabilidades. Para isto, a cada hora é feito uma requisição ao sistema e verificamos se está ok. Supondo um array que contenha os estados coletados por nosso software, calcule quanto tempo máximo que o servidor permaneceu sem instabilidades.

```language-md
1 - OK
0 - Instabilidades

valores_coletados = [0, 1, 1, 1, 0, 0, 1, 1]
resultado = 3

valores_coletados = [1, 1, 1, 1, 0, 0, 1, 1]
resultado = 4
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

**Exercício 4** Dado dois arrays de números inteiros que representam instantes de entrada e saídas em uma biblioteca e um número que represente um instante a ser buscado. Retorne quantas pessoas estudantes estão na biblioteca naquele instante. Considere que todo estudante que entrou, saiu da biblioteca.

```language-md
entradas = [1, 2, 3]
saídas = [3, 2, 7]
instante_buscado = 4
resultado: 1

O estudante 1 entrou no instante 1 e saiu no 3, já o segundo entrou
e saiu no 2 e o último foi único a estar presente no instante 4.
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

---

## Recursos adicionais (opcional)

- [Data structures: Python lists](https://raul.dev/post/python_list_data_structure/) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Brilliant.org: Arrays ADT](https://brilliant.org/wiki/arrays-adt/) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Sidenotes - Arrays - Lucas Magnum](https://medium.com/@lucasmagnum/sidenotes-array-abstract-data-type-data-structure-b154140c8305) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Numpy Manual](https://numpy.org/doc/stable/) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Documentação do módulo array](https://docs.python.org/pt-br/3/library/array.html) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>

