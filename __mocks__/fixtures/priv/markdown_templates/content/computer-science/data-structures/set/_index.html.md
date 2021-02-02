## O que vamos aprender

O "Conjunto" (_set_) é um conceito matemático que é muito útil na computação, uma vez que muitas entidades do mundo real podem ser modeladas como conjuntos. Vamos relembrar o conceito e operações típicas, aplicadas a um conjunto, tanto de maneira conceitual como no código.

A linguagem Python facilita muito a nossa vida ao prover métodos que implementam essas operações, porém existem linguagens que não vão ter essas operações de forma nativa. Para garantir que saberemos usar conjuntos sempre que precisarmos, nós iremos aprender a implementar essas operações do zero.

### Você será capaz de

- Compreender o conceito de _conjunto_ e suas operações básicas;

- Representar conjuntos de três formas distintas em Python;

- Implementar uma classe `Set` manualmente;

- Instanciar e utilizar os métodos da classe `Set`, de Python;

- Identificar e resolver problemas com `Set`.

---

## Por que isso é importante?

Em conjuntos, é importante entendermos as operações que são realizadas sob algum dado, para que consigamos reconhecer quando os dados estão se comportando como um conjunto. Dessa forma, quando reconhecermos que os dados estão se comportando como um conjunto, podemos fazer uso da implementação padrão da linguagem, evitando implementar funcionalidades que já existem.

Muitas entidades do mundo real, e problemas computacionais, podem ser modelados como conjuntos. No conteúdo veremos alguns estudos de caso para entendermos isso melhor. Além destes cenários, veremos nos exercícios como podemos utilizar conjuntos para nos ajudar a saber se já vimos um elemento antes e a como eliminar elementos duplicados, por exemplo.

---

## Conteúdo

###### Tempo sugerido para realização: 80 minutos

### Conceito de conjuntos

As implementações de conjuntos, nas linguagens, seguem as definições matemáticas de conjuntos, portanto, iremos revê-las. Para a matemática, um conjunto é uma coleção bem definida de elementos. Essa definição pode se dar por meio da listagem explícita dos elementos ou por meio da descrição dos elementos que o compõem:

```language-md
# Listagem explícita:
# A = {1, 2, 3, 4, 5, 6}

# Descrição dos elementos
# B = {x | x é um número inteiro tal que 0 < x =< 6}
# Ou seja, x, onde x é um número inteiro tal que x menor igual a 6 e maior que
# zero. Ou seja, faz parte desse conjunto números maiores que 0 e menores
# iguais a 6 ({1, 2, 3, 4, 5, 6}).
```

As duas formas de descrever o conjunto acima resultam em conjuntos iguais, o que é fácil perceber. Porém, o conceito de igualdade entre conjuntos vai além: conjuntos são iguais se cada elemento de A pertence a B e se cada elemento de B pertence a A. Quais conjuntos abaixo são iguais?

```language-md
A = {1, 2, 3}
B = {2, 1, 3}
C = {1, 1, 2, 2, 3, 3}
```

Os três conjuntos são iguais. O que nos leva a duas propriedades:

- A ordem não importa;

- É desnecessário manter cópias do mesmo elemento. Tudo o que precisamos que um conjunto descreva são seus elementos **únicos**. As operações de "pertence" e "não pertence" são o que nos permite aplicar esse conceito, de igualdade. Essas operações constituem as operações básicas mais importantes de conjuntos que você já deve ter utilizado, em Python, algumas vezes:

```language-python
if element in colection:
    # ...

if element not in colection:
    # ...
```

Agora vamos relembrar as demais operações sobre conjuntos. Entender as definições de cada operação ajuda a entender o resultado final, em cada caso, e ajudam a entender como são implementadas dentro da classe.

#### União

Todos os elementos que pertencem a A **ou** a B

<%= figure(%{class: "rounded mxh-auto d-block text-center", width: "800px", height: "auto", src: "/computer-science/data-structures/set/images/uniao.png", caption: "União"}) %>

#### Intersecção

Todos os elementos que pertencem a A **e** a B

<%= figure(%{class: "rounded mxh-auto d-block text-center", width: "800px", height: "auto", src: "/computer-science/data-structures/set/images/interseccao.png", caption: "Intersecção"}) %>

#### Diferença

Todos os elementos que pertencem a A e **não** pertencem a B

<%= figure(%{class: "rounded mxh-auto d-block text-center", width: "800px", height: "auto", src: "/computer-science/data-structures/set/images/diferenca.png", caption: "Diferença"}) %>

#### Subconjunto

Não é uma operação. É qualquer conjunto em que todos os seus elementos pertencem ao conjunto maior (`superconjunto`). Conjunto vazio e o próprio conjunto são subconjuntos dele mesmo.

<%= figure(%{class: "rounded mxh-auto d-block text-center", width: "800px", height: "auto", src: "/computer-science/data-structures/set/images/subconjunto.png", caption: "Subconjuntos"}) %>

Vamos ver dois casos em que conjuntos são utilizados:

- **Programa Educacional**: imagine que, em um programa educacional, temos acesso ao log de quem já entregou a avaliação 1 e de quem já entregou a avaliação 2. Queremos saber quem já entregou a 1, mas não a 2. Para isso, podemos criar uma função que verifique se uma pessoa consta no log da avaliação 1, mas não consta nos logs da avaliação 2. Os nomes dos alunos nos logs formam um conjunto, pois não são duplicados e a ordem das entregas não importa. Qual operação sobre conjuntos você utilizaria para responder essa pergunta?

- **SQL**: um cenário onde operações sobre conjuntos são pesadamente utilizados são queries em bancos de dados. O comando SELECT cria um conjunto e comandos como UNION, INTERSECT e EXCEPT nada mais são do que operações sobre conjuntos. O SELECT cria um conjunto com linhas únicas. Utilizar um comando de conjuntos sobre os resultados de dois ou mais SELECT implicarão em eliminação de duplicados e desconsideração da ordem. Esse [artigo da Wikipedia]([link](https://pt.wikipedia.org/wiki/Opera%C3%A7%C3%B5es_SET_(SQL))) {: .external-link target="_blank" rel="noreferrer noopener" } explica melhor e dá exemplos. Entender o conceito dessas operações facilita entender qual será o resultado final da sua query.

### Formas de se representar conjuntos

Ao implementar um `conjunto`, temos duas maneiras principais de se representá-lo: utilizando _vetores_ e utilizando _hashmaps_.

#### Conjuntos representados por vetores

Vamos utilizar os mesmo conjuntos A e B da seção anterior:

```language-md
A = {1, 2, 3}
B = {2, 3, 4}
```

Observe que os elementos são números **inteiros e pequenos**, então podemos fazer uso dos índices de um vetor de _booleanos_ para identificar a presença ou não de cada elemento:

<%= figure(%{class: "rounded mxh-auto d-block text-center", width: "800px", height: "auto", src: "/computer-science/data-structures/set/images/vetor_de_booleanos.png", caption: "Vetor de Booleanos"}) %>

Para saber se um elemento pertence ao conjunto, basta verificar se `A[2]` é `True`, por exemplo. O acesso direto aos endereços do vetor, consulta, inserção e remoção, ocorrem em `O(1)`. Os lados negativos dessa implementação são:

- Caso os elementos não sejam valores pequenos;

- Caso os elementos sejam valores muito esparsos, como {1, 1000, 20000}. Dessa forma, teríamos muitos espaços subutilizados na memória;

- Caso os elementos não sejam números.

#### Conjuntos representados por Dict

Para os casos em que o vetor não se mostra uma boa solução, como por exemplo, contendo chaves sendo _strings_, podemos utilizar uma `hashmap`. Mapearíamos a _string_ para o quê? Poderíamos mapear para qualquer coisa, uma vez que esses valores nunca serão acessados e estariam lá apenas porque a _hash_ exige. Então vamos escolher valores _booleanos_, que ocupam pouco espaço.

```language-md
A = {1, 2, 3}
# 0: False
# 1: True
# 2: True
# 3: True
# 4: False
# ...
```

Essa estratégia te lembra de algo? No vídeo da aula de _hash_ utilizamos exatamente essa estratégia para identificar a intersecção entra a lista A e a lista B.

Vamos agora estudar como as operações sobre conjuntos são feitas por debaixo dos panos. Isso é importante por três motivos:

- Para entender a complexidade das operações, precisamos saber como elas são realizadas;

- Caso a linguagem com a qual estamos trabalhando não tenha uma representação dedicada. Ou seja, a linguagem não atende as nossas necessidades. Nesse caso teríamos que implementar as operações manualmente;

- Em entrevistas de algoritmos (_whiteboards_), se o problema em questão for implementar uma classe `Set`, é evidente que nós não poderemos utilizar os métodos prontos. Teremos que saber implementar do zero. _Observação:_ caso a estrutura de dados seja apenas auxiliar, não é necessário implementar do zero.

### Criando a classe Conjunto

Vamos construir uma classe Conjunto especializada em guardar números inteiros até 1000 (o que é considerado pequeno). Para tanto, vamos representar nossos dados como listas de _booleanos_. Para cada exercício lembre-se de considerar maneiras eficientes e, ao mesmo tempo, legíveis de se escrever o código.

#### Exercícios de fixação

**Exercício 1: Inicializando a classe e adicionando elementos**

- Crie uma classe chamada `Conjunto`;

- Escreva um construtor que defina uma lista do tamanho necessário. Inicialize todos os valores com `False`, uma vez que ainda não temos valores adicionados;

- Crie um método `add(item)` que recebe um valor até 1000 e adiciona no conjunto;

- Na `main` (dentro de: `if __name__ == "__main__":`), instancie um objeto do tipo `Conjunto` e adicione os valores.

```language-md
[0, 10, 100, 1000]
```

**Exercício 2: Imprimir**

Caso tenhamos que imprimir na tela o nosso objeto, o comando `print(conjunto)` não irá funcionar. O que será impresso é o endereço de memória onde o objeto está guardado, e não é isso que queremos. Para que o comando print funcione, precisamos que a nossa classe tenha um método chamado `__str__` e é o que faremos agora:

- Crie um método com a assinatura abaixo:

```language-python
def __str__(self):
    # retorno: uma string que representa o seu objeto
```

- _Exemplos de entrada e saída:_

```language-md
A = {1, 2, 3}
# saída: '{1, 2, 3}'

B = {7, 2, 10}
# saída: '{2, 7, 10}'

C = {}
# saída: '{}'
```

A saída não precisa ser ordenada, até mesmo porque um conjunto não leva a ordem em consideração. A saída pode ser em qualquer ordem, mas provavelmente será mais fácil retornar em ordem. Teste seu método imprimindo os objetos que você criou.

**Exercício 3: is_in**

- Crie um método com a assinatura abaixo que retorne se um elemento faz parte ou não do conjunto:

```language-python
def is_in(self):
    # retorno: True, caso o elemento faça parte. False, caso o elemento não faça parte.
```

- _Exemplos de entrada e saída:_

```language-md
A = {1, 2, 3}

# entrada: 1
# saída: True

# entrada: 0
# saída: False
```

**Exercício 4: União**

**União: Todos os elementos que estão em A OU em B**

- Crie um método com a assinatura abaixo, que recebe como parâmetro outro objeto da classe `Conjunto`:

```language-python
def union(self, conjuntoB):
    # retorno: outro objeto Conjunto com união do próprio objeto com o conjuntoB
```

- Na `main`, instancie dois objetos do tipo `Conjunto`. Preencha o primeiro com os valores de **1 a 10**, e o segundo, com valores de **10 a 20**;

- Imprima na tela a união dos dois conjuntos.

**Exercício 5: Intersecção**

**Intersecção: Todos os elementos que estão em A E em B**

- Crie um método com a assinatura abaixo, que recebe como parâmetro outro objeto da classe `Conjunto`:

```language-python
def intersection(self, conjuntoB):
    # retorno: outro objeto Conjunto com intersecção do próprio objeto com o conjuntoB
```

- _Exemplos de entrada e saída:_

```language-md
A = {1, 2, 3}
B = {3, 4, 5}
# saída: {3}

C = {0, 3, 6, 9}
B = {12, 15, 18}
# saída: {}
```

Pronto, passados todos os exercícios temos nossa primeira classe `Conjunto` implementada! Existem outras operações que deveríamos implementar para torná-la completa, mas vamos fazer isso nos exercícios do conteúdo. Agora vamos prosseguir com o conteúdo para vermos a sintaxe de `Set`.

### A classe Set

Implementamos uma classe Conjunto utilizando uma lista de _booleanos_. Vamos lembrar do caso em que usamos uma _hashmap_: em que situação mapearíamos a chave para `False`? Caso o elemento não esteja no conjunto, basta que ele não exista dentro da _hashmap_, certo? Estamos gastando espaço de memória à toa.

Por baixo dos panos, a classe `Set` é uma modificação da classe `Dict` e não um vetor de _booleanos_ como fizemos. Ou seja, no fundo, o `Set`, é uma _hashmap_. Mas não é um simples mapeamento da chave para `True`; a classe `Set` não guarda valor nenhum, ou seja, não está exatamente replicando uma estrutura do tipo "chave-valor", pois não há valor. Por isso, ocupa menos espaço do que um `Dict`, ao mesmo tempo em que mantém a eficiência das operações.

`Set` é uma coleção não ordenada de objetos **imutáveis** únicos. Por não se preocupar com a ordem, set não guarda a ordem de inserção e não é possível indexar elementos com `[]` como em listas ou Dicts. Assim como Dict, só é possível usar objetos imutáveis como chave. Mas Dict admite guardar valores, então é possível mapear chaves para Dicts. Mas `set` não guarda valores e é um objeto mutável, então **não é possível guardar sets dentro de um set**. Para resolver isso, existe o **frozenset**.

#### Frozenset

`Frozensets` são objetos idênticos a `set`, porém são imutáveis; uma vez instanciados, não é possível adicionar ou remover elementos e todos os métodos que realizam essas duas operações estão indisponíveis no _frozenset_. Todos os demais métodos de `set` funcionam em um _frozenset_. Para criar sets de set, o elemento de dentro precisa ser um _frozenset_.

Nas próximas seções vamos conhecer as operações possíveis com `set`, algumas mais de um jeito de se fazer. Preocupe-se com saber as operações básicas e as típicas de Python. As demais, você pode consultar na documentação sempre que precisar. Mas você precisa saber que elas existem e por isso falaremos delas.

#### Operações básicas

A classe `Set` oferece complexidade `O(1)` para as operações de inserção, remoção e consulta. Vamos conhecê-las:

```language-python
# Podemos instanciar um set vazio ou inicializar com valores de um objeto iterável, como uma lista
conjuntoA = set()

# Ao inicializar com valores de uma lista, os valores duplicados serão desconsiderados e a ordem de inserção será perdida.
conjuntoB = set([1, 1, 2, 3, 3, 3])

# Add - adiciona o elemento ao conjunto
conjuntoA.add(5)
conjuntoA.add(3)
conjuntoA.add(0)

# sets admitem objetos mistos. Ou seja, admitem ter _strings_ com _ints_ dentro de um mesmo objeto, por exemplo.
conjuntoA.add('elemento')

# Temos 2 jeitos de remover elementos:
# - remove() causa erro caso o elemento não esteja no set;
# - discard() não causa erro caso o elemento não esteja no set.

# Não vai dar erro
conjuntoB.remove(3)

# Vai dar erro pois já removemos esse elemento e set não guarda duplicatas
conjuntoB.remove(3)

# Não vai dar erro
conjuntoB.discard(3)

# pop() remove e retorna um elemento aleatório do set
# set é um objeto iterável, mas não conseguimos garantir em que ordem os elementos serão acessados.
# A função pop () é útil quando queremos trabalhar com algum elemento do set, mas não sabemos de antemão quais elementos estão dentro dele.
some_element = conjuntoA.pop()

# clear() remove todos os itens do set
conjuntoB.clear()

# Consulta
# A consulta é feita com o operador "in"
if 2 in conjuntoA:
    print("2 está em A")

if 7 not in conjuntoA:
    print("7 não está em A")
```

#### Exercícios de fixação

**Exercício 6**

- Escreva uma função que identifique o único número duplicado em uma lista. Retorne o número duplicado em `O(n)`.

- _Exemplos de entrada e saída:_

```language-python
entrada = [1, 3, 2, 4, 5, 1]
# saída: 1
```

#### Operações que envolvem outro conjunto

As operações que envolvem outros conjuntos implementam todas as operações matemáticas que se aplicam a conjuntos. Vamos listar essas operações aqui mas podem ser consultadas [na documentação](https://docs.python.org/3.7/library/stdtypes.html#set-types-set-frozenset) {: .external-link target="_blank" rel="noreferrer noopener" } sempre que necessário.

- **set.isdisjoint(other)**: retorna `True` se o `set` não tem nenhum elemento em comum com `other`, ou seja, se a intersecção é vazia;

- **set.issubset(other)**: verifica se `set` é um subconjunto de `other`, ou seja, se todo elemento de `set` está em `other`;

- **set.issuperset(other):** verifica se `set` é um superconjunto de `other`, ou seja, se todos os elementos de `other` estão em `set`. A diferença de um superconjunto e de um subconjunto é que no superconjunto podem haver outros elementos, além dos elementos de `other` já presentes dentro de `set`. Já no subconjunto não;

- **set == other:** verifica se os conjuntos são iguais, ou seja, se todos os elementos de `set` estão em `other` e se todos os elementos de `other` estão em `set`. Lembre-se que a ordem não importa. Não existe função dedicada para a comparação de igualdade.

Os métodos a seguir operam sobre dois **ou mais** conjuntos por vez. Cada uma das operações nessa seção tem a sua versão que modifica o `set` original com o resultado da operação e não retorna nada.

- **set.union(others):** retorna a união entre o `set` e todos os `other` passados;

- **set.intersection(others):** retorna a intersecção entre `set` e todos os `other` passados;

- **set.difference(others):** retorna a diferença entre `set` e todos os `other` passados;

- **set.symmetric_difference(others):** retorna todos os elementos que estejam em um mas não estejam no outro conjunto (opera apenas sobre dois conjuntos).

#### Exercícios de fixação

**Exercício 7**

Sua trajetória no curso foi um sucesso e agora você está trabalhando para a Trybe! Em um determinado módulo, os estudantes precisam entregar dois trabalhos para seguir adiante. Cada vez que um dos trabalhos é entregue, o nome da pessoa fica registrado. Precisamos saber como está o andamento da entrega das listas. Para isso, você tem acesso aos nomes das pessoas da turma, bem como ao `log` de quem já entregou qual lista. A partir das listas abaixo, crie quatro funções que respondem às perguntas a seguir.

```language-python
estudantes = ['a', 'b', 'c', 'd', 'e', 'f', 'g']
lista1_entregues = ['a', 'd', 'g', 'c']
lista2_entregues = ['c', 'a', 'f']
```

1. Quem ainda não entregou a lista1?

2. Quem já entregou as duas listas?

3. Quem já entregou qualquer uma das duas listas?

4. Quem ainda não entregou nenhuma das listas?

### Resumão + resolução de problemas

#### Funções básicas

<%= vimeo "457913106" %>

#### Números repetidos

<%= vimeo "457913473" %>

#### Dados de sorte

<%= vimeo "457913577" %>

---

## Vamos fazer juntos!

Agora que já passamos pelos conceitos, está na hora de colocarmos a mão na massa com a nossa aula ao vivo!

Bora pro Slack, onde o link estará disponível. 😉

---

## Exercícios

###### Tempo sugerido para realização: 120 minutos

Hora de por a mão na massa!

<%= versioning_your_code(@conn) %>

### Agora, a prática

#### Exercício 1 - Blefe

Blefe é um jogo de duas pessoas onde cada uma tenta adivinhar os número que a outra irá escolher. Cada jogador escolhe 5 números de 0 a 10, inclusive. A pontuação final é calculada da seguinte forma:

A nota de partida de cada pessoa é o maior numero que a outra pessoa não escolheu
O redutor é o menor numero que a outra pessoa não escolheu
A pontuação final é a nota de partida - redutor

_Exemplo:_

```language-python
clara = [0, 1, 5, 9, 10]
# nota de partida: 5
# redutor: 1
# pt: 4

marco = [0, 2, 8, 9, 10]
# nota de partida: 8
# redutor: 2
# pt individual: 6

# Quem ganhou: Marco
```

Implemente uma função que receba um dicionário com os nomes e números chutados e retorne o nome de quem ganhou

```language-python
entrada = {
    'Clara': [0, 1, 5, 9, 10],
    'Marco': [0, 2, 8, 9, 10]
}

# saída: 'Marco'
```

#### Exercício 2 - Substring

Dada uma _string_, ache o tamanho da maior _substring_, que não tenha caracteres repetidos. Complexidade de tempo limite aceitável: `O(n^2)`.

```language-python
str = "serdevemuitolegalmasehprecisoestudarbastante"
```

### Bônus

#### Exercício 3 - Continuação dos exercícios de fixação

Continue os exercícios de fixação para terminar de implementar as operações de conjuntos:

- `difference`;

- `issubset`;

- `issuperset`.

#### Desafio

Otimizar o algoritmo do **exercício 2** para ter uma complexidade de tempo limite de `O(n)`.

---

## Recursos adicionais (opcional)

- [Diferença entre Dict e Set](https://stackoverflow.com/questions/34370599/difference-between-dict-and-set-python) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Implementação de Set em Python](https://github.com/python/cpython/blob/master/Objects/setobject.c) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Porque Set é mais rápido do que listas](https://www.quora.com/Why-is-a-set-faster-than-a-list-in-Python) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
