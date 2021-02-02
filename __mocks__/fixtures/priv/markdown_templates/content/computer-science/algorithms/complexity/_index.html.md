## O que vamos aprender?

> "Quão eficiente é esse algoritmo?"

Essa pergunta já deve ter passado pela sua cabeça em vários momentos. Quando fazemos um site, por exemplo, não queremos que ele seja lento: queremos um site que carregue rápido e responda rápido aos nossos comandos. Queremos uma API que não demore no tempo de resposta. E é super irritante quando abrimos um programa que deixa todo o nosso computador lento em função da quantidade de **recursos** que consome.

Pois bem! Hoje vamos aprender uma **métrica universal** para calcular o quão eficiente o seu algoritmo é! Funciona para qualquer linguagem e paradigma de programação e servirá de base para suas avaliações de eficiência daqui em diante.

---

### Você será capaz de

- Analisar corretamente a ordem de complexidade de um algoritmo.

---

## Por que isso é importante?

Para qualquer **função com um valor de entrada pequeno**, não damos importância à eficiência de um algoritmo. Vai ser rápido e pronto. Agora, e quando sua função tem que lidar com mil valores ao mesmo tempo? E cinco mil? E vinte mil? Quem sabe milhões de valores? Aí a eficiência do que você está fazendo começa a virar um problema. E nós precisamos ser capazes de lidar com cenários assim!

Acha esses valores exagerados? Pois exemplos não faltam! O famoso [Discord](https://discord.com/) {: .external-link target="_blank" rel="noreferrer noopener" }, por exemplo, já encarou a demanda de ordenar alfabéticamente uma lista de amigos com até **250.000** pessoas. O tempo máximo que o algoritmo tinha pra rodar? Menos de um segundo e meio. E aí? Vai encarar?! (Se sua curiosidade despertou, busque o artigo nos recursos adicionais desse conteúdo depois que terminar seus estudos!)

As famosas Big Techs, por exemplo (Google, Amazon, Facebook, etc) fazem processos seletivos onde a capacidade de fazer esse tipo de análise é obrigatória. Em suma: quando sua escala fica grande, esse conhecimento se torna essencial. E com esse conhecimento você vai perceber que existem certos tipos de problemas que são irresolvíveis mesmo que você junte toda a capacidade computacional do planeta e trabalhe nele em potência máxima pelos próximos dez mil anos. 🙂

---

## Conteúdos

###### Tempo sugerido para realização: 120 minutos

Observe o algoritmo abaixo:

```language-python
def sum_array(numbers):
    sum = 0
    for number in numbers:
            sum += number

    return sum
```

Quanto tempo ele vai demorar para executar? 😁

"Ora, impossível dizer!", diz a pessoa incrédula. Depende da máquina, do que está rodando nela, dos recursos, de tudo! Não dá pra dizer.

Ok. Trave todas as configurações. É uma máquina padronizada, sem mais nada rodando, tudo certo. Quanto tempo ele vai demorar para executar? Um segundo? Dez segundos?

... Tem mais um "depende" aqui, não tem? O tempo de execução depende do tamanho do array passado por parâmetro! **Quanto maior o dado passado por parâmetro, mais o algoritmo demorará para executar**.

Hmmm. Legal! Vamos usar isso então! Eu não sei quanto tempo o algoritmo vai demorar para executar: dependem de inúmeros fatores além do meu controle. Mas uma coisa eu tenho certeza: **o tempo de execução dele é proporcional ao tamanho do meu dado entrado!** Por exemplo:

```language-python
# def sum_array(numbers):
  # ...

# Suponha que, para o array abaixo, o tempo de execução seja `n`
sum_array(array_com_dez_mil_numeros)

# Nesse caso, aqui o tempo de execução vai ser `10 * n`, ou `10n`, já que o array é dez vezes maior que o anterior!
sum_array(array_com_cem_mil_numeros)

# Já esse é dez mil vezes maior que o primeiro, então esse aqui executa em `100n`
sum_array(array_com_um_milhão_numeros)
```

Pois bem!! A todos e a todas eu tenho o orgulho de apresentar a `Ordem de Complexidade`! Mas o que raios é isso?! É **o quanto que o tempo de execução do algoritmo varia na medida em que a entrada cresce!** Observe:

```language-python
# def sum_array(numbers):
  # ...

sum_array(array_com_dez_mil_numeros)
# O tempo de execução deste algoritmo foi 0.0004s

sum_array(array_com_cem_mil_numeros)
# Para uma execução com dez vezes mais números, o tempo aumentou em dez vezes: 0.004s

sum_array(array_com_um_milhão_numeros)
# Multiplicando o tamanho da entrada por dez novamente, temos um tempo dez vezes maior: 0.05s
```

Faça o teste na sua máquina (você já tem os conhecimentos para descobrir como fazer um script que mede esses tempos 🚀). Os valores podem variar, mas **as proporções não!** Um aumento no tamanho da entrada aumenta o tempo de execução na mesma proporção. Se fizéssemos um gráfico disso, ele seria assim:

<%= figure(%{src: "/computer-science/algorithms/complexity/images/complexidade-linear.png", class: "text-center rounded mx-auto d-block", width: "550px", height: "auto", caption: "Na medida em que o tamanho da entrada cresce, o tempo de execução cresce na mesma proporção"}) %>

A Ordem de Complexidade nada mais é do que a representação dessa proporção! Dado que o algoritmo é **linearmente proporcional** ao tempo de execução (ou seja, se a entrada aumenta em 10 vezes o tempo de execução também aumenta em 10 vezes), dizemos que este é um algoritmo **linear!**

A função matemática que representa uma relação linear é `f(n) = n`. Na notação de Ordem de Complexidade, dizemos que esse algoritmo é `O(n)`! Guardem essa notação, vamos usá-la bastante!

> 💡 A Ordem de Complexidade pode ser chamada, também, de Complexidade Assintótica.

### Complexidade de tempo e de espaço

Vamos a um outro exemplo:

```language-python
def squared_array(numbers):
    array_of_squares = []
    for number in numbers:
            array_of_squares.append(number * number)

    return array_of_squares
```

Para o algoritmo acima, aumentar a entrada em dez vezes aumenta em dez vezes o tempo de execução! A sua ordem de complexidade, portanto, é `O(n)`. Na maior parte das vezes em que falarmos de Ordem de Complexidade, estamos falando disso: do tempo que o algoritmo vai demorar para executar, ou **complexidade de tempo**. Há também uma outra complexidade: a **complexidade de espaço**, se referindo ao espaço em memória que o algoritmo ocupa.

A idéia é a mesma: na medida em que a entrada aumenta, quanto o espaço em memória usado pelo algoritmo aumenta? No exemplo acima, o algoritmo povoa e retorna um array de tamanho `n`, sendo `n` o tamanho do array entrado, e o retorna. Assim sendo, sua **complexidade de espaço** é `O(n)`!

> 💡  Se falamos em Ordem de Complexidade sem especificar se é de tempo ou de memória, assuma que é de tempo!

Mas e o outro exemplo, o do algoritmo `sum_array()`?! Nesse caso, ele só precisa do espaço, em memória, de um número para executar. Para **qualquer tamanho de entrada ele ocupa a mesma quantidade de espaço para executar.** Assim sendo, sua complexidade de espaço é **constante**. Uma complexidade, seja de memória ou de tempo, ser constante, significa que o tamanho da entrada não influi no tempo de execução/memória ocupada de um algoritmo. A notação para esta complexidade é `O(1)`

> 💡 Quando calculamos a complexidade de espaço não levamos em consideração o espaço ocupado pela entrada! O tamanho da entrada não é algo que podemos, com nosso algoritmo, influenciar, então ele não entra em nossos cálculos.

Para fixar um pouco, vamos fazer um exercício:

**Exercício 1:** Qual a Ordem de Complexidade (complexidade de tempo) do algoritmo abaixo? E a complexidade de espaço?

```language-python
def multiply_array(numbers):
    result = 0
    for number in numbers:
            result *= number

    return result
```

### Complexidade quadrática

Observe o algoritmo abaixo:

```language-python
# Os arrays tem sempre o mesmo tamanho
def multiply_arrays(array1, array2):
    result = []
    for number1 in array1:
        for number2 in array2:
            result.append(number1 + number2)

    return result
```

Seus tempos de execução para um par de arrays de 2000 e 4000 elementos são:

```language-python
# def multiply_array(numbers):
  # ...

sum_array(array_com_dois_mil_numeros)
# O tempo de execução deste algoritmo foi 0.45s

sum_array(array_com_quatro_mil_numeros)
# Já esse teve tempo de execução de 1.8s, quatro vezes maior.
```

Porque, dessa vez, quando dobramos o tamanho da entrada (de 2000 para 4000) nós quadruplicamos o tempo de execução? Ora, vejamos! Temos dois arrays do mesmo tamanho, que vamos chamar de `n`. Repare que temos dois loops aninhados um dentro do outro. Isso significa que, para cada número de `array1`, todo o `array2` será percorrido! Rode o exemplo abaixo para conferir:

```language-python
def multiply_arrays(array1, array2):
    result = []
    number_of_iterations = 0

    for number1 in array1:
        print(f'Array 1: {number1}')
        for number2 in array2:
            print(f'Array 2: {number2}')
            result.append(number1 + number2)
            number_of_iterations += 1

    print(f'{number_of_iterations} iterações!')
    return result

array1 = [1,2,3,4,5]
array2 = [11,12,13,14,15]

multiply_arrays(array1, array2)
```

Repare como, para dois arrays de tamanho 5, temos **25 iterações!** Varie os números e veja como, sempre o número de iterações é `n` vezes `n`, ou seja, `n²`! Por isso, lá em cima, multiplicar por dois o tamanho da entrada, de 2000 para 4000, multiplicou por quatro o tempo de execução: para um algoritmo `O(n²)`, aumentar a entrada em `n` vezes, aumenta o tempo de execução em `n²` vezes!

Para fixar um pouco, vamos fazer uns exercícios:

**Exercício 2:** Para desembaraçar a sopa de letrinhas que a seção anterior criou, meça o tempo de execução do algoritmo acima e, mudando o tamanho das entradas, veja como, se você aumenta a entrada em `n` vezes, o tempo de execução aumenta em `n²` vezes!

**Exercício 3:** Faça um algoritmo qualquer com três loops aninhados um dentro do outro. Entenda como ele terá uma complexidade de `O(n³)`!

> Se tiver dificuldades, nos procure no Slack!

### Comparando complexidades

Beleza! Vamos resumir o que vimos até aqui:

- A **Ordem de Complexidade** diz o quanto o tempo de execução (ou espaço de memória ocupado) de um algoritmo cresce, na medida em que aumentamos o tamanho da sua entrada!

- Uma `O(1)` executa no mesmo tempo independente do tamanho da entrada. Como exemplo, lembre-se do **acesso a um elemento do array**, estudado na aula de ontem. Esse acesso é `O(1)`, pois leva o mesmo tempo, independente do tamanho do array;

- Uma `O(n)` significa que o algoritmo é **linear**: se aumentamos a entrada em **2 vezes**, aumentamos o tempo de execução em **2 vezes**;

- Uma `O(n²)` significa que o algoritmo é **quadrático**: se aumentamos a entrada em **2 vezes**, aumentamos o tempo de execução em **4 (2²) vezes**;

- Uma `O(n³)` significa que o algoritmo é **cúbico**: se aumentamos a entrada em **2 vezes**, aumentamos o tempo de execução em **8 (2³) vezes**.

<%= figure(%{src: "/computer-science/algorithms/complexity/images/nazareconfusamatematica.gif", class: "text-center rounded mx-auto d-block", width: "450px", height: "auto", caption: "Vamos com calma pros números não confundirem!"}) %>

Falamos aqui de algoritmos `O(n)`, `O(n²)` e até de `O(n³)`, mas vamos mostrar o que eles significam de outra forma. Observe, antes, o gráfico abaixo, e veja sobre como o **tempo de execução** de um algoritmo cúbico cresce muito mais para uma entrada **muito menor** que a do algoritmo linear:

<%= figure(%{src: "/computer-science/algorithms/complexity/images/comparacao-ordens-de-complexidade.png", class: "text-center rounded mx-auto d-block", width: "550px", height: "auto", caption: "Observe no gráfico a relação entre as ordens de complexidade linear, quadrática e cúbica"}) %>

Para se ter uma noção, pense assim: para um algoritmo linear, com `n = 1000` temos mil operações. Quando o algoritmo é `O(n²)` um `n = 1000` gera **um milhão de operações**. Essa mesma quantidade (um milhão) para `O(n³)`, se atinge com `n = 100`. Está começando a entender como alguns algoritmos podem, rapidinho, ficar inviáveis de se executar?

A seguir, vamos explorar outros tipos de complexidades de algoritmos!

>💡 Lembre-se! Se você se embananar com essa quantidade de números, rode exemplos na sua máquina contando o número de iterações! É uma excelente forma de visualizar a complexidade acontecendo. E não deixe de falar com a gente no Slack se algum exemplo estiver te confundindo!

### Complexidade logarítmica

**Calma!** Apesar do termo potencialmente assustador, a complexidade **logarítmica** não exige cálculos matemáticos complicados para ser entendida. Dado pela notação `O(log n)`, um algoritmo **logarítmico** geralmente reduz pela metade o tamanho do input a cada iteração.

> O tempo de execução de um algoritmo é dito logarítmico porque _log₂n_ (lê-se: "log de n na base 2") é igual ao número de vezes que _n_ deve ser dividido por 2 para obter 1.

No exemplo a seguir temos um algoritmo de busca binária. Dado um array de tamanho `n` ordenado em ordem crescente, **encontre um número passado na entrada**. É como procurar por um nome numa lista telefônica!

<%= figure(%{src: "/computer-science/algorithms/complexity/images/lista-telefonica.png", class: "text-center rounded mx-auto d-block", width: "550px", height: "auto", caption: "Relíquia de um passado remoto. "}) %>

Como você faz? Suponha que você quer procurar pelo nome `Tintim`. Você abre numa página qualquer e vê que está na letra `M`. Como `M < T` na ordem alfabética, você sabe que o nome que procura está adiante na lista. Você pega a parte da lista que está à frente de `M` e abre ela novamente a esmo. Agora você abriu no `V`. Como `V > T`, você sabe que o nome `Tintim` está para trás. Repita até encontrar o nome que procura.

Observe o gif abaixo para entender melhor. Ele compara o algoritmo de **busca binária**, logarítmico, com a **busca sequencial**, que é linear.

<%= figure(%{src: "/computer-science/algorithms/complexity/images/binary-and-linear-search-animations.gif", class: "text-center rounded mx-auto d-block", width: "700px", height: "auto"}) %>

Se quiser rodar seus próprios testes, o algoritmo de busca binária é o abaixo:

```language-python
data = [1, 2, 9, 8, 3, 4, 7, 6, 5, 10]

def binary_search_iterative(array, element):
    mid = 0
    start = 0
    end = len(array)
    step = 0

    while (start <= end):
        print("Subarray in step {}: {}".format(step, str(array[start: end + 1])))
        step = step + 1
        mid = (start + end) // 2

        if element == array[mid]:
            return mid

        if element < array[mid]:
            end = mid - 1
        else:
            start = mid + 1

    return - 1


print(binary_search_iterative(data, 2))
```

Observe como, a cada iteração, o algoritmo de busca binária corta o problema pela metade: primeiro ele corta a lista em dois e pega o elemento do meio. Depois ele vai para o lado onde o elemento que procura está e corta este lado novamente pela metade. Quando cortamos a entrada pela metade, a cada iteração, temos um padrão que segue a função matemática de logaritmo na base dois! Assim, nosso algoritmo é `O(log n)`.

Dessa forma, sem precisarmos nos aprofundar na matemática, conseguimos calcular a ordem de complexidade de um algoritmo deste tipo! Quando a entrada é cortada pela metade a cada iteração temos um comportamento logarítmico!

<%= figure(%{src: "/computer-science/algorithms/complexity/images/logaritmo-vs-linear.png", class: "text-center rounded mx-auto d-block", width: "550px", height: "auto", caption: "Um algoritmo logarítmico é muito superior a um linear!"}) %>

Para fixar um pouco, vamos fazer um exercício:

**Exercício 4:** Imagine que você recebe dois arrays de tamanho igual, `array1` e `array2`. Para cada elemento do `array1`, realize uma busca binária no `array2`. Mostre que a ordem de complexidade do algoritmo resultante é `O(n * log n)`, ou `O(n log n)`.

### Complexidade exponencial e fatorial

Essas complexidades caracterizam algoritmos que, para aumentos pequenos no tamanho da entrada, aumentam enormemente o seu tempo de execução. Para a relação do tempo de execução/espaço ocupado em cada caso é a seguinte:

- **Exponencial:** `2ⁿ`;

- **Fatorial:** `n!`.

No caso exponencial, se `n` possui vinte elementos, o algoritmo faz um milhão de operações. Para o caso fatorial, os mesmos vinte elementos rendem 24 **quatrilhões** de operações (O número exato é: 2432902008176640000 operações 😨).

Daí vem a pergunta: **porque alguém iria escrever um algoritmo de complexidade fatorial?!** A resposta é simples: quando não há outro algoritmo conhecido que resolve o problema. Quer conhecer um clássico? Eis o problema do **caixeiro viajante**! Seu enunciado é: _"Dada uma lista de cidade e a distância entre cada par de cidades, qual é a rota mais curta possível que visita todas as cidades exatamente uma vez e volta para a cidade de origem?"_

A única solução exata conhecida para este problema é a `força bruta`. Ou seja: você testa todas as possibilidades. Imagine que você tem três cidades: Belo Horizonte, São Paulo e Florianópolis. Temos as seguintes rotas possíveis, basta listá-las e escolher a mais curta:

```language-bash
- Belo Horizonte > São Paulo > Florianópolis

- Belo Horizonte > Florianópolis > São Paulo

- Florianópolis > Belo Horizonte > São Paulo

- Florianópolis > São Paulo > Belo Horizonte

- São Paulo > Belo Horizonte > Florianópolis

- São Paulo > Florianópolis > Belo Horizonte
```

O número de rotas para 3 cidades é `3! == 3 * 2 * 1 = 6`. Atualmente o Brasil tem `5570` municípios. Quantos milhares de anos um computador precisaria para rodar esse algoritmo nesse caso? 😄

Algoritmos que não tem solução conhecida em tempo polinomial, ou seja, **que são fatoriais ou exponenciais**, resolvíveis somente com força bruta, pertencem a uma categoria de problemas na computação chamada problemas **NP Completos**. Se quiser conhecer mais sobre essa categoria de problemas, explore nossos recursos adicionais!

### Analisando algoritmos com várias estruturas de repetição

E quando temos um algoritmo como o abaixo?

```language-python
def calculations(n):
    number1 = 0
    for n1 in range(n):
        number1 += n1

    number2 = 0
    for n1 in range(n):
       for n2 in range(n):
            number2 += n1 + n2

    number3 = 0
    for n1 in range(n):
       for n2 in range(n):
           for n3 in range(n):
               number3 += n1 + n2 + n3

    return number1, number2, number3

n1, n2, n3 = calculations(100)
print(f'{n1}, {n2}, {n3}')
```

Esse algoritmo tem três estruturas de repetição evidentes: uma linear, uma quadrática e uma cúbica. Qual é a ordem de complexidade dele?!

A rigor, ela seria `O(n + n² + n³)`. Se os loops estão aninhados você os multiplica, e se estão paralelos você os soma. Podemos pensar em alguns outros exemplos:

- Um algoritmo de busca binária que roda três vezes = `O(3 * log n)`;

- Um algoritmo que roda uma busca binária num array de tamanho `n` para cada elemento de um array de tamanho `m` = `O(m * log n)`.

No entanto, geralmente simplificam-se essas notações. Estamos vendo, ao longo dos nossos estudos, que ordens de complexidade diferentes, para entradas grandes, tem valores absurdamente diferentes. Imagine escrever `O(n! + log(n))`. Ora, para uma entrada de tamanho `8` esse número seria `O(40320 + 3)`. Observe como o componente fatorial da equação, `n! = 40320`, domina completamente a ordem de complexidade. Nesse cenário dizemos que a complexidade menor é **desprezível**, então a omitimos.

Ou seja: para valores grandes, dizer a maior ordem de complexidade do conjunto já basta para uma boa análise. Então, ao analisar várias estruturas de repetição em paralelo, responda somente com o valor da estrutura que tiver maior ordem de complexidade na hora de fazer a sua análise!

<%= figure(%{src: "/computer-science/algorithms/complexity/images/todas-as-complexidades.png", class: "text-center rounded mx-auto d-block", width: "550px", height: "auto", caption: "Quando a entrada vai ficando grande, veja como cresce a diferença de desempenho das diferentes ordens de complexidade"}) %>

### Melhor caso, pior caso e caso médio

Há um último conceito importante para aprendermos aqui antes de passarmos para a aula ao vivo e os exercícios! Vocês verão nos próximos dias e blocos do curso muitas vezes os termos "melhor caso", "pior caso" e "caso médio". Eles significam o seguinte: "A depender da minha entrada, o meu algoritmo pode executar em `O(1)` ou `O(n)`". Por exemplo, pense na busca sequencial:

```language-python
def linear_search(numbers, n):
    for index, number in enumerate(numbers):
        if(number == n): return index

    return -1

print(linear_search([1, 2, 3, 4, 5], 4))
```

Dizemos que, para entradas muito grandes, esse algoritmo é `O(n)`. O que acontece, porém, caso tenhamos sorte e o número que procuramos seja o primeiro do array? Nesse caso, mesmo para uma entrada infinita, nossa complexidade será `O(1)`. Esse é o **melhor caso** desse algoritmo. De forma análoga, o **pior caso** é o número ser o último elemento do array, ou seja `O(n)`.

E o caso médio? Bem, seria algo como `O(n * 1/2)`, por exemplo (ou seja, o número que procuramos está no meio da lista). Mas, para entradas muito grandes, aprendemos a desprezar os números menos relevantes da soma, então podemos simplificar e dizer que o caso médio é `O(n)` também.

Diferentes algoritmos tem diferentes cenários de melhor caso, pior caso e caso médio! Você verá vários exemplo ao longo dos próximos blocos!

### Em suma

Hoje estudamos **ordens de complexidade**, uma forma de se analisar um algoritmo de qualquer linguagem e feito em qualquer paradigma. Vemos que existem algoritmos dos seguintes tipos:

- **Constantes:** `O(1)`;

- **Logarítmicos:** `O(log n)`;

- **Linear:** `O(n)`;

- **Quadráticos:** `O(n²)`;

- **Cúbicos:** `O(n³)`;

- **Exponencial:** `O(2ⁿ)`;

- **Fatorial:** `O(n!)`.

Vimos também que, a depender do algoritmo, essas análises podem ser combinadas, como por exemplo num algoritmo `O(n log n)`. Por fim, vimos que problemas que não tem solução conhecida em tempo polinomial, sendo apenas exponenciais ou fatoriais, em algoritmos de força bruta, são chamados **NP Completo**.

Vimos que, em algoritmos com várias estruturas de repetição diferentes, devemos sempre considerar a maior ordem de complexidade possível e desprezar as demais na nossa notação. E vimos que algoritmos podem ter diferentes ordens de complexidade para seu melhor caso, pior caso e caso médio.

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

Com toda essa matemática em mente, vamos praticar nossa capacidade de análise na aula ao vivo!

Bora pro Slack, onde o link estará disponível. 😉

---

## Exercícios

###### Tempo sugerido para realização: 100 minutos

<%= versioning_your_code(@conn) %>

---

### Agora a prática

Vamos colocar tudo o que vimos até agora em prática.

**Exercício 1** Dado um array de números de tamanho `n`, escreva um algoritmo que retorna `true` se há no array um número duplicado e `false` caso contrário. Analise a solução abaixo e diga qual é a ordem de complexidade desse algoritmo para o melhor caso, pior caso e caso médio.

```language-python
def contains_duplicate(numbers):
    numbers.sort()
    previous_number = 'not a number';
    for number in numbers:
        if(previous_number == number): return True
        previous_number = number

    return False
```

**Exercício 2** Suponha que se está escrevendo uma função para um jogo de batalha naval. Dado um array bidimensional com `n` linhas e `m` colunas, e um par de coordenadas `x` para linhas e `y` para colunas, o algoritmo verifica se há um navio na coordenada alvo. Por exemplo:

```language-bash
entrada = [ 0 0 0 0 1
            0 0 0 0 1
            1 1 1 1 1
            0 0 0 1 0 ]

resultado para (0, 4) = True
resultado para (1, 1) = False
```

Qual seria a ordem de complexidade da solução para este problema? E a complexidade de espaço?

**Exercício 3** O código abaixo está em **JavaScript**. Calcule sua ordem de complexidade para um array de tamanho `n`.

```language-javascript
const numbers = [0,1,2,3,4,5,6,7,8,9]
numbers.map(n => n*n)
```

**Exercício 4** O código abaixo está em **JavaScript**. Calcule sua ordem de complexidade para um array de tamanho `n`.

```language-javascript
const numbers = [0,1,2,3,4,5,6,7,8,9]
numbers.map(n => n*n)
       .filter(n => n%2 === 0)
       .reduce((acc, n) => acc + n)
```

**Exercício 5** Utilize o módulo `random` da linguagem Python para gerar um array com 100 números. Cada um desses números deve ser a média de dez números gerados aleatóriamente. Qual é a ordem de complexidade de tempo e de espaço deste programa?

**Exercício 6** Dado um array de doces candies e um valor inteiro extra_candies, onde o candies[i] representa o número de doces que a enésima criança possui. Para cada criança, verifique se há uma maneira de distribuir doces extras entre as crianças de forma que ela possa ter o maior número de doces entre elas. Observe que várias crianças podem ter o maior número de doces. Analise o código abaixo para o melhor, pior caso e caso médio. Faça a analise de complexidade de espaço também.

```language-python
def kids_with_candies(candies, extra_candies):
    # parece que a solução percorre o array somente uma vez,
    # porém isto é feito duas vezes, uma no `max` e outra para
    # preencher a resposta
    max_candies = max(candies)
    return [candy + extra_candies >= max_candies for candy in candies]


# saída: [True, True, True, False, True]
print(kids_with_candies([2, 3, 5, 1, 3], 3))
```

---

### Recursos Adicionais

- [O que é um problema NP completo? - Stack Overflow](https://pt.stackoverflow.com/a/34131) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Competitive Programmer’s Handbook ](https://cses.fi/book/book.pdf) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Using Rust to Scale Elixir for 11 Million Concurrent Users](https://blog.discord.com/using-rust-to-scale-elixir-for-11-million-concurrent-users-c6f19fc029d3) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Understanding time complexity with Python ](https://towardsdatascience.com/understanding-time-complexity-with-python-examples-2bda6e8158a7) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
