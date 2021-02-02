## O que vamos aprender?

Hoje, vamos conhecer a linguagem de programação **Python**, onde é utilizada e por que cada vez mais tem se tornado relevante no mundo de programação. Para nos familiarizarmos, vamos escrever nossos primeiros programas.

---

### Você será capaz de:

- Utilizar o terminal interativo do **Python**;

- Entender e utilizar estruturas condicionais (se, senão se, senão) e de repetição (enquanto, para);

- Criar funções para reutilização de código;

- Escrever seus próprios módulos e como importá-los em outros códigos.

---

## Por que isso é importante?

Aprender linguagens de programação novas é sempre um desafio, porém aumenta sua capacidade de entender diferentes paradigmas. Aprender **Python** aumenta o seu cinto de ferramentas e lhe traz mais um diferencial. Afinal, para quem só tem um martelo, todo parafuso é prego, e não queremos isso. 🔨

Além disso, cada vez mais o mercado vem oferecendo vagas nesta linguagem, que tem crescido muito na área da ciência de dados.

---

## Conteúdos

###### Tempo sugerido para realização: 120 minutos

### Introdução (O que é Python?)

**Python** é uma linguagem de programação que busca simplicidade em sua sintaxe, o que proporciona legibilidade e produtividade. Seu interpretador pode ser executado em diversos sistemas operacionais como Linux, MacOS e Windows, quase sempre sem mudanças no código.

Por causa da sua simplicidade e didática, foi escolhida como linguagem principal a ser ensinada na maioria das universidades dos Estados Unidos. Como destaque temos o Instituto de Tecnologia de Massachusetts (_MIT_). Muito popular hoje em dia devido a área de ciência de dados, também pode ser utilizada para a criação de aplicações web, automação de tarefas repetitivas, aplicativos desktop e até aplicações para dispositivos móveis (embora para essa finalidade Python não seja tão popular nem recomendada).

É também conhecida por suas _baterias já inclusas_: ela já traz consigo um conjunto de bibliotecas úteis para diversas tarefas, como manipular dados no formato JSON e CSV. A linguagem também possui um servidor web simples, ferramenta para emails e muito mais! Grandes empresas como Google, Facebook, Pinterest, Dropbox, Amazon, Youtube, dentre outras, utilizam bastante da linguagem em diversos projetos. E aqui no Brasil não ficamos de fora, grandes empresas como Globo.com, Olist, Luizalabs e Jusbrasil também são nomes que utilizam a linguagem. Uma tal de Trybe a usa em sua análise de dados também! 🔋

<%= figure(%{src: "/computer-science/python/intro/images/about-google.png", caption: "Captura de tela do site do Google de 1999 mostrando Python", class: "text-center rounded mx-auto d-block", width: "770px", height: "600px"}) %>

Por fim, mas não menos importante, tem um ecossistema que vai além da linguagem: há uma comunidade que se apoia na filosofia de "pessoas > tecnologia", possuindo uma preocupação relevante com inclusão e diversidade. As pessoas "pythonistas", como assim são chamadas, tendem a ser pessoas sempre dispostas a ajudar o próximo. Por isso é comum escutar a frase "venha pela linguagem, fique pela comunidade".

Pronto para começar? Então vamos abrir o terminal e digitar alguns comandos. 🖥️

Mas não precisaremos instalar nada?! 😱

### Terminal Interativo (REPL)

Distribuições do sistema operacional **Linux**, e também o **Mac**, normalmente já vem com uma versão **Python** instalada, pois utilizam a linguagem em diversos programas essenciais.

Verificamos isto abrindo um terminal e digitando `python3`. A saída deve ser semelhante a esta:

```language-bash
$ python3
Python 3.8.2 (default, Jun  2 2020, 13:51:17)
[GCC 9.3.0] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>>
```

Este tipo de terminal é chamado de terminal interativo ou `REPL` (_Read-Eval-Print Loop_), que pode ser traduzido como loop de leitura-avaliação-impressão. O que ele faz é receber uma entrada digitada pela pessoa, avaliar sua execução e imprimir seu resultado. Todos os exercícios de fixação do conteúdo deverão ser feitos utilizando o terminal interativo.

Normalmente o primeiro programa escrito em uma linguagem de programação é o `Olá Mundo`. Porém, isso é tão rápido como digitar `print("Olá Mundo")`, portanto vamos começar com algo um pouco diferente.

Digite `import antigravity` e aperte `enter`.

```language-python
import antigravity
```

<%= figure(%{src: "/computer-science/python/intro/images/xkcd.png", caption: "Tirinha xkcd sobre python", class: "text-center rounded mx-auto d-block", width: "770px", height: "600px"}) %>

Esta é uma maneira pythônica de dizer "Olá Mundo".

Aproveitando que já estamos no terminal interativo, vamos ver a filosofia da linguagem, que ajuda a entender um pouco sobre como o **Python** foi escrito. Digite no terminal interativo:

```language-python
import this
```

A fim de padronizar códigos escritos em Python, foi lançado um guia de estilo conhecido como ***PEP 8*** ou ***Python Enhancement Proposal 8***. A ***PEP 8*** é um documento desenvolvido pela comunidade pythonica que visa aprimorar a legibilidade dos códigos. À medida que fomos avançando nos dias do bloco, vamos destacar quais estilos este documento estabelece com 🎨.

### Operações básicas

Digite algumas operações básicas como adições e multiplicações e veja que o valor será avaliado e impresso.

```language-python
2 * 3  # saída: 6
2 + 3  # saída: 5
3 / 2  # saída: 1.5
```

> 💡 O símbolo `#` marca um comentário e deste simbolo em diante (na linha) o código não será executado.

Para atribuir esses valores a um nome, basta utilizar o operador de atribuição `=`.

```language-python
square_root = 25 ** (1/2)  # raiz quadrada de 25. O operador `**` significa "elevado a"

print(square_root + 1)  # saída: 6.0
```

Não é necessário a utilização de `let`, `var` ou `const` nas atribuições. Veremos escopo e questões de mutabilidade mais adiante.

Mas existe algum operador que **Python** não tenha? E se eu tentar incrementar um valor?

```language-python
counter = 0
counter++  # esse código vai falhar
```

Ainda que possamos simplificar operações e atribuições, o incremento ou decremento não é válido na sintaxe `++`, `--`.

Um exemplo de simplificação válida é:

```language-python
# original
counter = counter + 1

# simplificado
counter += 1
```

Um outro operador que pode ser um pouco diferente é o `//`. Consegue imaginar para que serve?

```language-python
3 // 2  # saída: 1

3 / 2  # saída: 1.5
```

O operador `//` realiza a divisão e arredonda o resultado para baixo. Ou seja, realiza o quociente.

Hummm... Tirando o `let` e `var`, ainda parece bem similar com _Javascript_.🤔

De fato, operadores são comuns a todas as linguagens de programação, por isso tamanha semelhança.

Porém, nem tudo é tão semelhante. Se realizarmos a operação de comparação entre `'1' == 1`, o resultado será falso (`False`), pois como são valores de tipos diferentes, nenhuma conversão é realizada.

Dado as listas `a = [1, 2, 3]` e `b = [1, 2, 3]`, se compararmos as duas `a == b` teremos como retorno `True`, ainda que representem listas diferentes.

Acho que `"Python" != "Javascript"`, ainda que tenham suas similaridades. 😅

Mas e sobre os operadores `&&` e `||`, não são operações de `and` e `or`?

Quando queremos fazer operações lógicas, como verificar se uma temperatura está entre dois valores, utilizamos o operador `and`. Ou seja, para verificar se uma temperatura é menor que 25 graus **e** maior que 18 graus, podemos fazer algo como `temperatura < 25 and temperatura > 18`. Embora uma maneira mais pythonica de se escrever esta operação seja `18 < temperatura < 25`. 🤓

Assim como podemos validar intervalos utilizando o operador `or`. Por exemplo, se em um parque pessoas com idade menor ou igual a 5 e maiores de 65 anos não pagam, poderíamos escrever uma validação da seguinte maneira `5 <= idade or idade >= 65`.

Para praticar um pouco, vamos fazer alguns exercícios:

**Exercício 1:** No terminal, inicialize duas variáveis a e b, sendo a = 10 e b = 5. Mostre o resultado das 7 operações básicas (soma, subtração, multiplicação, divisão, divisão inteira, potenciação e módulo) envolvendo essas variáveis.

**Exercício 2:** Declare e inicialize uma variável: `hours = 6`. Quantos minutos têm em 6 horas? E quantos segundos? Declare e inicialize variáveis `minutes` e `seconds` que recebem os respectivos resultados das contas. Depois, imprima cada uma delas.

**Exercício 3:** Teste e verifique o que acontece se você colocar um ponto e vírgula no final de uma instrução em Python.

**Exercício 4:** Suponha que o preço de capa de um livro seja 24,20, mas as livrarias recebem um desconto de 40%. O transporte custa 3,00 para o primeiro exemplar e 75 centavos para cada exemplar adicional. Qual é o custo total de atacado para 60 cópias? Escreva uma expressão que receba o custo total e a imprima.

### Tipos de dados embutidos

##### Números inteiros (int)

O primeiros dos tipos numéricos é o `int`, que representa um número inteiro, isto é, escrito sem parte fracionária.

Inicialize uma variável `a = 5`, comande `type(a)` e observe o retorno.

> 💡 O método `type(operando)` corresponde ao operador `typeof operando` do JavaScript.

##### Números fracionários (float)

O segundo tipo numérico é o `float`, também conhecido por ponto flutuante, que representa um número decimal ou fracionário.

Inicialize uma variável `a = 5.0`, comande `type(a)` e observe o retorno.

##### Números complexos (complex)

Como novidade e último tipo numérico, temos o `complex`.

Já vimos como representar números inteiros ou fracionários, mas sabia que números complexos podem ser representados também?

Basta colocar o número real acrescido da sua parte imaginária, trocando o i por j.

```language-python
3 + 4j  # saída: (3+4j)
```

Operações matemáticas podem ser feitas da mesma maneira com números complexos.

```language-python
(3 + 4j) + 4  # saída: (7+4j)
```

Inicialize uma variável `a = 5j`, comande `type(a)` e observe o retorno.

##### Strings (str)

Além dos tipos numéricos, temos o tipo de sequência de texto `str`, que representa uma cadeia de caracteres ou, como popularmente conhecida, uma string. As strings são definidas envolvendo um valor com aspas simples ou duplas.

##### Booleanos (bool)

Os valores booleanos `True` e `False` pertencem ao tipo embutido `bool`. Aqui devemos ficar atentos ao início maiúsculo dessas palavras reservadas.

E temos ainda estruturas do tipo sequência(`list`, `tuple`, `range`), conjuntos(`set`, `frozenset`), mapeamento(`dict`), sequências binárias(`bytes`, `bytearray`, `memoryview`) e mais um monte! 😓

Mas por que tantas estruturas? 🤔 Cada uma tem sua peculiaridade e utilização. Vamos dar uma olhada!

##### Listas (list)

Sequência mutável e ordenada de elementos. Pode armazenar elementos heterogêneos, tem seu tamanho variável e cresce a medida que itens são adicionados.

Sintaxe:

```language-python
fruits = ["orange", "apple", "grape", "pineapple"]  # elementos são definidos separados por vírgula, envolvidos por colchetes

fruits[0]  # o acesso é feito por indices iniciados em 0

fruits[-1]  # o acesso também pode ser negativo

fruits.append("banana")  # adicionando uma nova fruta

fruits.remove("pineapple")  # removendo uma fruta

fruits.extend(["pear", "melon", "kiwi"])  # acrescenta uma lista de frutas a lista original

fruits.index("apple")  # retorna o índice onde a fruta está localizada, neste caso 1
 em seu programa
fruits.sort()  # ordena a lista de frutas
```

E a prática?! Vamos lá!

Copie a lista abaixo para realizarmos os exercícios de fixação 5 e 6:

```language-bash
trybe_course = ["Introdução", "Front-end", "Back-end"]
```


**Exercício 5:** Adicione o elemento "Ciência da Computação" à lista.
> 🎨 Funções e variáveis devem ser nomeadas com letras minúsculas e underscore, caso tenham mais de uma palavra:`minha_variavel`.

**Exercício 6:** Adicione à lista "Ciência da Computação" e a imprima para verificar a adição.

**Exercício 7:** Acesse e altere o primeiro elemento da lista para "Fundamentos".

##### Tuplas (tuple)

São similares a listas, porém não podem ser modificados durante a execução do programa.

Sintaxe:

```language-python
user = ("Cássio", "Botaro", 42)  # elementos são definidos separados por vírgula, envolvidos por parenteses

user[0]  # acesso também por índices
```

##### Conjuntos (set)

Conjunto de elementos únicos e não ordenados. Como conjuntos, implementam operações de união, intersecção e outras.

Sintaxe:

```language-python
permissions = {"member", "group"}  # elementos separados por vírgula, envolvidos por chaves

permissions.add("root")  # adiciona um novo elemento ao conjunto

permissions.add("member")  # como o elemento já existe, nenhum novo item é adicionado ao conjunto

permissions.union({"user"})  # retorna um conjunto resultado da união

permissions.intersection({"user", "member"})  # retorna um conjunto resultante da intersecção dos conjuntos

permissions.difference({"user"})  # retorna a diferença entre os dois conjuntos
```

**Exercício 8:** Um conjunto ou set pode ser inicializado utilizando-se também o método `set()`. Inicialize uma variável com essa função `var = set()` e adicione seu nome ao conjunto utilizando um dos métodos vistos acima. Depois, imprima a variável e confira se o retorno é: {'seu_nome'}.

##### Conjuntos imutáveis (frozenset)

Variação do set, porém imutável, ou seja, seus elementos não podem ser modificados durante a execução do programa.

Sintaxe:

```language-python
permissions = frozenset(["member", "group"])  # assim como o set, qualquer estrutura iterável pode ser utilizada para criar um frozenset

permissions.union({"user"})  # novos conjuntos imutáveis podem ser criados à partir do original, mas o mesmo não pode ser modificado

permissions.intersection({"user", "member"})  # retorna um conjunto resultante da intersecção dos conjuntos

permissions.difference({"user"})  # retorna a diferença entre os dois conjuntos
```

##### Dicionários (dict)

Estrutura que associa uma chave a um determinado valor. É a representação do tão famoso ***objeto*** que utilizamos em JavaScript.

Sintaxe:

```language-python
people_by_id = {1: "Cássio", 2: "João", 3: "Felipe"}  # elementos no formato "chave: valor" separados por vírgula, envolvidos por chaves

people_by_name = {"Cássio": 1, "João": 2, "Felipe": 3}  # outro exemplo, dessa vez usando strings como chaves (ao contrário de JS, as aspas duplas são obrigatórias)

# elementos são acessados por suas chaves
people_by_id[1]  # saída: Cássio

# elementos podem ser removidos com a palavra chave del
del people_by_id[1]
people_by_id.items()  # dict_items([(1, "Cássio"), (2, "João"), (3, "Felipe")])
# um conjunto é retornado com tuplas contendo chaves e valores
```

Vamos fixar os aprendizados sobre dicts?

Utilizando o código abaixo, faça os exercícios de fixação 8, 9 e 10:

```language-bash
info = {
  "personagem": "Margarida",
  "origem": "Pato Donald",
  "nota": "Namorada do personagem principal nos quadrinhos do Pato Donald",
}
```

Em JavaScript, não precisávamos colocar a chave do objeto entre aspas, porém, em Python, isso é necessário.

***Exercício 9:*** O que acontecerá se você tentar acessar o valor da chave "personagem" como fazíamos em JavaScript, utilizando `object.key`?

***Exercício 10:*** Insira no objeto uma nova propriedade com o nome de chave "recorrente" e o valor "Sim". Em seguida, imprima o objeto no console.

***Exercício 11:*** Remova a propriedade cuja chave é "origem" e imprima o objeto no console.


##### Range (range)

Estrutura capaz de gerar uma sequência numérica de um valor inicial até um valor final, modificando seu valor de acordo com o passo (`step`) definido. Pode ser declarado como `range( [start], stop[, step] )`, em que `start` e `step` podem ser omitidos, possuindo valores iniciais iguais a `0` e `1` respectivamente.

Um ponto de atenção é que o `stop` **não** é incluído na sequência, portanto caso queira uma sequência de 1 até 10 a chamada deverá ser `range(1, 11)`

Seus valores são criados a medida que esta sequência é percorrida.

Sintaxe:

```language-python
# vamos converter o range em uma lista para ajudar na visualização

# definimos somente o valor de parada
list(range(5))  # saída: [0, 1, 2, 3, 4]

# definimos o valor inicial e o de parada
list(range(1, 6))  # saída: [1, 2, 3, 4, 5]

# definimos valor inicial, de parada e modificamos o passo para 2
list(range(1, 11, 2))  # saída: [1, 3, ,5 ,7 , 9]

# podemos utilizar valores negativos para as entradas também
list(range(10, 0, -1))  # saída: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
```

Além dos tipos básicos, temos outros como datas, tuplas nomeadas, arrays, enumerações e outros, mas estes tem de ser importados de seus respectivos módulos.

**Exercício 12:** Após uma consulta do banco de dados, temos linhas que contém nome, sobrenome e idade como: `"Thiago", "Nobre", 29`. Que estrutura vista anteriormente seria recomendada dado que após esta consulta somente exibimos estes valores.

**Exercício 13:** Realizar a contagem de quantas vezes cada elemento aparece em uma sequência é uma técnica muito útil na solução de alguns problemas. Qual é a estrutura mais recomendada para o armazenamento desta contagem?

### Estruturas condicionais

🎲 Em uma análise de dados sobre pessoas desenvolvedoras, temos uma base de dados que contém o salário de várias pessoas, porém não temos informação da senioridade das mesmas. Para fazer um agrupamento por senioridade precisamos criar uma nova coluna que será baseada no salário.

Caso o salário seja menor que "R$2.000,00", a pessoa será considerada como estagiária, para salários entre R$2.000,00 e R$5.800,00 júnior, entre R$5.800,00 e R$7.500,00 pleno, entre R$7.500,00 e R$10.500,00 será sênior e qualquer valor acima disto consideraremos líder.

```language-python
position = ""
if salary <= 2000:
    position = "estagiário"
elif 2000 < salary <= 5800:
    position = "júnior"
elif 5800 < salary <= 7500:
    position = "pleno"
elif 7500 < salary <= 10500:
    position = "senior"
else:
    position = "líder"
```
> 🎨 A indentação do código deve ser feita com 4 espaços em vez de tabs.

Não está faltando coisa aí não?! 😂

Note que `if` e `elif` são seguidos de uma expressão que se avaliada como verdadeira, o trecho de código será executado. Um outro detalhe é a ausência de chaves para definir o bloco. Utilizamos o caractere `:` para indicar abertura de um bloco e somente indentação para indicar o término.

O bloco `else` será executado se nenhuma das condições anteriores for satisfeita.

Agora que escrevemos mais linhas, notamos também a ausência do caractere `;`. Pois bem, a filosofia da linguagem nos diz: "Legibilidade conta...", então não precisamos mais dele.

Agora com a senioridade em mãos, podemos criar uma nova coluna em nossa base dados com essa informação e realizar o agrupamento por cargo, desenhando lindos gráficos. 📊

Posso modificar para uma estrutura `switch`?

A estrutura condicional `if` e seu aninhamento com `elif` e `else` é tão simples e legível que não precisamos da estrutura `switch`.

> "Simples é melhor do que complexo" - Zen do python

Em alguns casos, que não prejudiquem a legibilidade, podemos criar estruturas de mapeamento (_dicts_) para simplificar o aninhamento de condicionais.

```language-python
key = "id"
from_to = {
    "id": "identifier",
    "mail": "email",
    "lastName": "last_name",
}
from_to[key]
```

### Estruturas de repetição

##### for

🥗 Pense em um sistema que faça a listagem de restaurantes. Estes restaurantes possuem uma nota proveniente da avaliação dos seus clientes.

```language-python
restaurants = [
    {"name": "Restaurante A", "nota": 4.5},
    {"name": "Restaurante B", "nota": 3.0},
    {"name": "Restaurante C", "nota": 4.2},
    {"name": "Restaurante D", "nota": 2.3},
]
```

Quando um cliente pede a listagem de restaurantes, ele pode escolher filtrar o resultado de acordo com a nota.

Podemos fazer isto percorrendo a lista de restaurantes, criando uma nova lista com somente aqueles que atendem ao filtro.

```language-python
filtered_restaurants = []
min_rating = 3.0
for restaurant in restaurants:
    if restaurant["nota"] > min_rating:
        filtered_restaurants.append(restaurant)
print(filtered_restaurants)  # imprime a lista de restaurantes, sem o B e D
```

Dado que a maior parte do tempo estamos percorrendo estruturas, os criadores da linguagem decidiram que o `for each` seria o laço de repetição principal na linguagem.

Para cada repetição do nosso laço, um novo elemento da estrutura iterável é atribuído a variável de iteração. No exemplo acima vemos que, a cada iteração, um novo restaurante é colocado na variável `restaurant`.

> 💡 Em alguns casos, ainda podemos querer percorrer uma sequência numérica, e para isto iteramos sobre a estrutura de dados `range`.

```language-python
for index in range(5):
    print(index)
```

Além de listas, várias outras estruturas são iteráveis, como strings (`str`), tuplas (`tuple`), conjuntos (`set`), dicionários (`dict`) e até mesmo arquivos.

#### compreensão de listas

Existe uma maneira mais "pythônica" de se fazer isto! 🐍

Quando uma nova lista é criada como resultado de uma iteração, podemos simplificar utilizando [**compreensão de listas**](https://pt.wikipedia.org/wiki/Compreens%C3%A3o_de_lista).

```language-python
min_rating = 3.0
filtered_restaurants = [restaurant
                         for restaurant in restaurants
                         if restaurant["nota"] > min_rating]
print(filtered_restaurants)  # imprime a lista de restaurantes, sem o B e D
```

A **compreensão de listas** é declarada da mesma maneira que uma lista comum, porém no lugar dos elementos nós colocamos a iteração que irá gerar os elementos da nova lista. Um detalhe importante é que é possível filtrar esses elementos utilizando o `if`.

Poderíamos listar também somente o nome dos restaurantes.

```language-python
# min_rating = 3.0
filtered_restaurants = [restaurant["name"]  # aqui pedimos somente o nome do restaurante
#                        for restaurant in restaurants
#                        if restaurant["nota"] > min_rating]
# print(filtered_restaurants)  # imprime a lista de restaurantes, sem o B e D
```

Isto é equivalente às operações de `map` e `filter` em JavaScript.

#### while

🔢 A Sequência de Fibonacci, muito presente em diversas formas na natureza, é uma sequência numérica começando por 0 e 1 e cada termo subsequente corresponde à soma dos dois anteriores.

Podemos escrever esta sequência da seguinte maneira:

```language-python
n = 10
last, next = 0, 1
while last < n:
    print(last)
    last, next = next, last + next
```

O laço de repetição `while`, acontecerá enquanto a condição for satisfeita, e temos de ter o cuidado de manipular a variável presente na condicional ou entraremos em uma repetição infinita.

No exemplo, estamos imprimindo os elementos da sequência até que atinja o valor 10.

> 💡 Foi utilizado um truque neste exemplo que se chama atribuição múltipla. Isto é atribuição de vários valores a múltiplas variáveis ao mesmo tempo.
> Este truque pode ser utilizado também para fazer a troca de valores entre variáveis: `a, b = b, a`.

Para fixar as estruturas de repetição, vamos resolver alguns exercícios:

**Exercício 14:** O Fatorial de um número inteiro é representado pela multiplicação de todos os números predecessores maiores que 0. Por exemplo o fatorial de 5 é 120 pois `5! = 1 * 2 * 3 * 4 * 5`. Escreva um código que calcule o fatorial de um número inteiro.

**Exercício 15:** Um sistema de avaliações registra valores de 0 a 10 para cada avaliação. Após algumas mudanças estes valores precisam ser ajustados para avaliações de 0 a 100. Dado uma sequência de avaliações `ratings = [6, 8, 5, 9, 10]`. Escreva um código capaz de gerar as avaliações após a mudança. Neste caso o resultado deveria ser `[60, 80, 50, 90, 100]`.

Experimente utilizar a sintaxe de compreensão de listas.

**Exercício 16:** Percorra a lista do exercício 14 e imprima "Múltiplo de 3" se o elemento for divisível por 3.

### Funções

<%= vimeo "444333071" %>

Notamos que funções são definidas através da palavra reservada `def`, seguido por um nome e os parâmetros entre parenteses. Como todo bloco de código em **Python** o caractere `:` define o início do bloco e a indentação seu fim.

Os parâmetros podem ser passados de forma posicional ou nomeada. Os posicionais são aqueles definidos através da posição ao qual é chamado e os nomeados são definidos através do nome.

```language-python
def soma(x, y):
    return x + y

soma(2, 2)  # os parâmetros aqui são posicionais

soma(x=2, y=2)  # aqui estamos nomeando os parâmetros
```

Os parâmetros também podem ser variádicos. Ou seja, podem variar em sua quantidade. Parâmetros posicionais variádicos são acessados como tuplas no interior de uma função e parâmetros nomeados variádicos como dicionário.

```language-python
def concat(*strings):
    # Equivalente a um ", ".join(strings), que concatena os elementos de um iterável em uma string utilizando um separador
    # Nesse caso a string resultante estaria separada por vírgula
    final_string = ""
    for string in strings:
        final_string += string
        if not string == strings[-1]:
            final_string += ', '
    return final_string

# pode ser chamado com 2 parâmetros
concat("Carlos", "João")  # saída: "Carlos, João"

# pode ser chamado com um número n de parâmetros
concat("Carlos", "João", "Maria")  # saída: "Carlos, João, Maria"

# dict é uma função que já vem embutida no python
dict(nome="Felipe", sobrenome="Silva", idade=25)  # cria um dicionário utilizando as chaves passadas

dict(nome="Ana", sobrenome="Souza", idade=21, turma=1)  # o número de parâmetros passados para a função pode variar
```

Variáveis definidas dentro das funções tem escopo local, porém uma função quando não encontra um nome no escopo local irá procurar no espaço de nomes global.

Em alguns casos, podemos querer limitar um parâmetro em nomeado ou posicional para evitar ambiguidades e/ou aumentar legibilidade.

```language-python
len([1, 2, 3, 4])  # função len não aceita argumentos nomeados

len(obj=[1, 2, 3, 4])  # este código irá falhar

print("Botaro", "Cássio", ", ")  # imprime Botaro Cássio ,

print("Botaro", "Cássio", sep=", ")  # nomeando o terceiro parâmetro, agora temos a saída: Botaro, Cássio
```

Antes de adentrar na próxima sessão, lembram que agora a pouco comentamos bem vagamente sobre escopo? Pois então, vamos ver agora um vídeo para deixar esse conceito um pouco mais evidente:

<%= vimeo "444335329" %>

### Escrevendo os primeiros arquivos

Está divertido programar no terminal interativo e ter uma resposta logo em seguida, mas se eu fechar o terminal irei perder tudo que fiz até agora e programas do dia a dia não são assim.

Vamos então escrever nossos primeiros arquivos de código? Mas antes de seguirmos, que tal darmos uma olhadinha no [Guia de configuração de ambiente Python](/real-life-engineer/python/) {: .external-link target="_blank" rel="noreferrer noopener" }?

Antes de escrever nosso primeiro arquivo, precisamos saber que todo arquivo com extensão `.py` é considerado um módulo. Módulos são declarados utilizando _snake case_, ou seja, com nomes minúsculos e quando possuírem mais de uma palavra, devem ser separadas por _underscore_ (`_`).

Vamos agora criar o arquivo `area.py`, vamos declarar funções que calculam a área de algumas figuras geométricas.

> area.py

```language-python
PI = 3.14  # PI é uma "constante" em nosso módulo


def square(side):
    '''Calculate area of square.'''
    return side * side


def rectangle(length, width):
    '''Calculate area of rectangle.'''
    return length * width


def circle(radius):
    '''Calculate area of circle.'''
    return PI * radius * radius
```

Esse código segue algumas boas práticas para legibilidade, por exemplo, entre cada função temos um espaço de 2 linhas. As funções são declaradas com nomes em letras minúsculas e a constante `PI` é definida em letras maiúsculas.

Constante?!?! 🤔

Existe uma convenção de declarar valores considerados constantes com letras maiúsculas, e o respeito por outros programadores de não alterarem aquele valor.

Abra um terminal e para executar o módulo em python, escreva `python3 area.py`. Se não houve nenhum erro de digitação, nada deve ter acontecido. Neste módulo só temos definições das funções e valores, mas não estamos executando nenhuma delas. Isto é o que chamamos de execução do módulo como **script**.

<%= figure(%{src: "/computer-science/python/intro/images/module.png", caption: "Nosso primeiro módulo e sua execução.", class: "text-center rounded mx-auto d-block", width: "770px", height: "600px"}) %>

Vamos testá-lo! No fim do arquivo vamos adicionar algumas linhas para imprimir a área de algumas figuras geométricas.

```language-python
print("Área do quadrado:", square(10))
print("Área do retângulo:", rectangle(2, 2))
print("Área do círculo:", circle(3))
```

Agora quando executamos o arquivo `area.py`, estes valores de teste são exibidos.

<%= figure(%{src: "/computer-science/python/intro/images/module-execution.png", caption: "Nosso módulo quando executado exibe alguns valores de teste.", class: "text-center rounded mx-auto d-block", width: "770px", height: "600px"}) %>

Vamos então utilizar o nosso módulo de calcular área de figuras planas. Vamos escrever um novo arquivo com nome `people.py` e ele será um _script_ para calcular pessoas que estão presentes em um show, dado a área do mesmo.

Este _script_ será escrito da seguinte maneira:

> people.py

```language-python
import area


PEOPLE_AT_CONCERT_PER_SQUARE_METER = 2  # numero de pessoas por metro quadrado em média
FIELD_LENGTH = 240  # em metros
FIELD_WIDTH = 45  # em metros
PEOPLE_AT_CONCERT = area.rectangle(FIELD_LENGTH, FIELD_WIDTH) // PEOPLE_AT_CONCERT_PER_SQUARE_METER


print("Estão presentes no show aproximadamente", PEOPLE_AT_CONCERT, "pessoas")
```

O import é utilizado para termos todas as funções do módulo disponíveis em outro arquivo. Uma outra maneira de utilizarmos o `import` é utilizando `from area import rectangle`, porém, tome cuidado com conflitos de nomes caso utilize a segunda maneira.

Ao executa-lo com o comando `python3 people.py` vemos que a saída não saiu bem como esperávamos.

<%= figure(%{src: "/computer-science/python/intro/images/execution-with-tests.png", caption: "Execução exibe os testes feitos no módulo de área.", class: "text-center rounded mx-auto d-block", width: "100%"}) %>

Nossa! Os nossos valores de teste estão sendo exibidos quando importamos o módulo. 😨 Mas não queremos isto!

Para corrigir, podemos acrescentar uma condicional ao módulo para somente exibir esses valores de teste quando o módulo for executado como **script**.

A variável `__name__` é utilizada pelo interpretador **Python** para identificar o arquivo que esta sendo executado e seu valor será `"__main__"` quando invocamos um módulo como _script_.

> area.py

```language-python
# ...


if __name__ == "__main__":
    print("Área do quadrado:", square(10))
    print("Área do retângulo:", rectangle(2, 2))
    print("Área do círculo:", circle(3))
```

Ao executarmos novamente nosso _script_, agora tudo está ok! 🎉

<%= figure(%{src: "/computer-science/python/intro/images/execution-ok.png", caption: "Execução só exibe o resultado correto.", class: "text-center rounded mx-auto d-block", width: "100%"}) %>

### Uma última dica

Você deve estar pensando agora: "Socorro! Acho que não vou conseguir me lembrar de tudo o que vi, posso acabar me confundindo com outras linguagens.".

Então vou te dar um conselho! Sempre que estiver programando e surgir alguma dúvida, abra o terminal interativo e verifique o que está fazendo. Ele pode ser seu aliado, e pode inclusive te dar uma ajuda quando for necessário.

Temos um comando que chama `help`, e ele pode ser utilizado até mesmo em em cláusulas `if` ou `for`, desde que colocado entre aspas.

```language-python
help("if")
```

A tecla `q` deve ser apertada para sair da ajuda.

Experimente também para funções como `abs` ou `len` que são padrões da linguagem. E para a função `sin` que está presente no módulo `math` que já vem embutido.

```language-python
import math

help(abs)

help(len)

help(math.sin)
```

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

Vamos colocar tudo o que vimos até agora em prática. Em todos os exercícios, crie funções para solucionar os problemas. Tenho certeza que vocês já viram isso. 😆

**Exercício 1:** Crie uma função que receba dois números e retorne o maior deles.

**Exercício 2:** Calcule a média aritmética dos valores contidos em uma lista.

**Exercício 3:** Faça um programa que, dado um valor n qualquer, tal que n > 1, imprima na tela um quadrado feito de asteriscos de lado de tamanho n. Por exemplo:

```language-python
n = 5

*****
*****
*****
*****
*****
```

🦜 Dica: A função `print` aceita um parâmetro nomeado `end` que pode ser utilizado para imprimir sem a quebra de linha. Por exemplo, `print(4, end="")` e `print(2)` irá imprimir 42 e depois quebrar a linha.

Sentiu aí um certo dejavu? 😁

**Exercício 4:** Crie uma função que receba uma lista de nomes e retorne o nome com a maior quantidade de caracteres. Por exemplo, para `["José", "Lucas", "Nádia", "Fernanda", "Cairo", "Joana"]`, o retorno deve ser `"Fernanda"`.

🦜 Uma dica: Utilize a função `len()` para verificar o tamanho do nome.

**Exercício 5:** Considere que a cobertura da tinta é de 1 litro para cada 3 metros quadrados e que a tinta é vendida em latas de 18 litros, que custam R$ 80,00. Crie uma função que retorne dois valores em uma tupla contendo a quantidade de latas de tinta a serem compradas e o preço total a partir do tamanho de uma parede(em m²).


**Exercício 6:** Crie uma função que receba os três lado de um triângulo e informe qual o tipo de triângulo formado ou `"não é triangulo"`, caso não seja possível formar um triângulo.

🦜 Dica:

```language-md
  Três lados formam um triângulo quando a soma de quaisquer dois lados for maior que o terceiro;
  Triângulo Equilátero: três lados iguais;
  Triângulo Isósceles: quaisquer dois lados iguais;
  Triângulo Escaleno: três lados diferentes.
```


### Bônus

**Exercício 1:** Dada uma lista, descubra o menor elemento. Por exemplo, `[5, 9, 3, 19, 70, 8, 100, 2, 35, 27]` deve retornar 3.

**Exercício 2:** Faça um programa que, dado um valor n qualquer, tal que n > 1, imprima na tela um triângulo retângulo com 5 asteriscos de base. Por exemplo:

```language-python
n = 5

*
**
***
****
*****
```

**Exercício 3:** Crie uma função que receba um número inteiro N e retorne o somatório de todos os números de 1 até N. Por exemplo, para N = 5, o valor esperado será 15.

**Exercício 4:** Um posto está vendendo combustíveis com a seguinte tabela de descontos:

```language-md
  Álcool:
    - Até 20 litros, desconto de 3% por litro;
    - Acima de 20 litros, desconto de 5% por litro.
  Gasolina:
    - Até 20 litros, desconto de 4% por litro;
    - Acima de 20 litros, desconto de 6% por litro.
```

Escreva uma função que receba o número de litros vendidos, o tipo de combustível (codificado da seguinte forma: A - álcool, G - gasolina), e retorne o valor a ser pago pelo cliente, sabendo-se que o preço do litro da gasolina é R$ 2,50, e o preço do litro do álcool é R$ 1,90.

---

## Recursos adicionais (opcional)

- [Python Para Zumbis](https://www.youtube.com/channel/UCripRddD4BnaMcU833ExuwA) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Tuplas Mutantes em Python](http://pythonclub.com.br/tuplas-mutantes-em-python.html) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Pense em Python](https://penseallen.github.io/PensePython2e/01-jornada.html) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Introdução à Programação com Python](https://python.nilo.pro.br/) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Introdução ao Python - Microsoft](https://docs.microsoft.com/pt-br/learn/modules/intro-to-python) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Tutorial Python](https://docs.python.org/pt-br/3/tutorial/index.html) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
