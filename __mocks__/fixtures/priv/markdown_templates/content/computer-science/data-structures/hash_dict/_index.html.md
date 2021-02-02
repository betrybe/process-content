## O que vamos aprender

Hoje vamos aprender sobre a **hash map**, também conhecidas como **hash table**, uma estrutura de dados muito importante na computação e imprescindível na sua caixa de ferramentas _dev_ por oferecer operações como consulta e inserção em `O(1)`. Além disso, é a base de muitas classes baseadas em `chave-valor`.

### Você será capaz de

- Entender o conceito de _hashing_ e como ele é utilizado para criar estruturas eficientes;

- Implementar uma classe `HashMap` simples com as principais operações;

- Compreender como as decisões de implementação impactam na eficiência real da estrutura de dados;

- Entender como a classe `Dict`, de Python, funciona por baixo dos panos.

---

## Por que isso é importante?

Imagine que foi solicitado que você crie um aplicativo para controlar o cadastro de pessoas que trabalham em uma determinada empresa. Para simplificar, você só precisa controlar o número de identificação e o nome de cada pessoa. Para guardar esses dados, você pode ter uma classe `Employee` que agrega as informações. Para armazenar os objetos, uma possível solução é guardá-los em uma lista. Construir essa lista adicionando cada objeto ao final, tem complexidade `O(1)`.

<%= figure(%{class: "rounded mxh-auto d-block text-center", width: "800px", height: "auto", src: "/computer-science/data-structures/hash_dict/images/lista_de_employees.png", caption: "Lista de objetos Employee"}) %>

Mas agora, precisamos alterar o nome da pessoa de `id número 14`. Como podemos acessar esse objeto para fazer a alteração? Podemos iterar sobre essa lista buscando o id, com complexidade `O(n)`. Se a lista estiver ordenada, podemos realizar uma busca binária e gastar `O(log n)` para cada busca. Nesse caso, a cada nova pessoa adicionada, a lista precisaria ser novamente ordenada, elevando o custo de inserção para `O(n log n)`.

A _hashmap_ é uma estrutura de dados do tipo chave-valor que nos permite inserir e localizar o cadastro da pessoa em `O(1)`! Essa estrutura é muito poderosa e, por isso, é largamente utilizada na computação. Por esse motivo também, é muito cobrada em entrevistas que exigem resolução de problemas algorítmicos (_whiteboard interviews_), sobretudo em empresas de grande porte. Heróis de anime sabem disso:

<%= youtube_video "pKO9UjSeLew" %>

Para fazer a sua mágica, a _hashmap_ utiliza um conceito muito popular em computação: **hashing**.

---

## Conteúdo

###### Tempo sugerido para realização: 120 minutos

### O que é hashing em computação

Hashing significa transformar um dado em uma representação numérica única. É atribuir um id para aquele dado. Mas diferente de um id sequencial, a composição do dado influencia diretamente no id gerado. Para isso, precisamos submeter o dado a alguma transformação matemática que considere a sua composição.

Um exemplo do uso de hashing é a verificação da integridade de downloads. Ao realizar um download, existe a chance desse dado ser corrompido ou até mesmo alterado maliciosamente. Como forma de verificar se a cópia que chegou até você é exatamente a mesma cópia que você tentou baixar, é possível comparar o resultado do hashing dos dois dados. Se forem iguais, o dado é igual. Senão, significa que algum detalhe desse dado está diferente. A operação matemática se chama `hash function` e o resultado da operação, no caso da verificação de integridade, é chamado de `checksum` (soma de verificação).

Por conferir essa segurança, o procedimento de hashing tem uso em criptografia, armazenamento de senhas e compressão de arquivos, por exemplo. Além disso, é usado na estrutura de dados _hash map_ como forma de atribuir um endereço único para cada dado que se deseja armazenar. Nesse caso, vamos chamar o resultado da `hash function de address` (endereço).

**Observação:** Os procedimentos de hash utilizados nessa aula não são complexos o suficiente para serem utilizados em procedimentos de segurança. Busque conteúdo especializado caso tenha interesse no assunto.

### Hashmap: usando hashing para estruturar dados

A estratégia de armazenamento de dados da hashmap é submeter o dado a um procedimento matemático (_hash function_) para obter um endereço único onde ela será guardada (_address_). Na relação chave-valor, o id numérico da classe `Employee` é a chave e o objeto `Employee` inteiro é o valor. A _hash function_ vai ler o valor da chave para definir o endereço do objeto como um todo.

Uma vez obtido o endereço, basta armazenar o dado no local correto. Na imagem abaixo, esse endereço é o índice no vetor onde a informação está sendo guardada. O local de armazenamento é comumente chamado de `buckets` (baldes), que é onde vamos jogar os dados.

<%= figure(%{class: "rounded mxh-auto d-block text-center", width: "800px", height: "auto", src: "/computer-science/data-structures/hash_dict/images/hash.png", caption: "O processo da hashmap"}) %>

O próximo passo no nosso problema é localizar as informações da pessoa do identificador número 14 para corrigir o nome. Para descobrir onde o objeto está armazenado, passamos a chave 14 para a mesma _hash function_, que resultará no endereço do objeto. Daí, basta fazer as consultas ou atualizações necessárias.

**Complexidade**: Nesse exemplo, a execução da _hash function_, bem como a operação de acessar o endereço para leitura ou escrita, tem complexidade `O(1)`. Dessa forma, tanto inserção como consulta têm complexidade constante. Cada dado que entra na _hash function_, sai com seu respectivo endereço. Por isso, hashmaps também são conhecidas como tabelas de espalhamento.

Agora que entendemos bem como funciona o algoritmo de uma hashmap, vamos expressar esses conceitos no código e treinar um pouco de implementação. Construiremos juntos uma classe hashmap simples, que consegue lidar com chaves numéricas no formato `int`, que é o caso do nosso exemplo.

Para isso, vamos criar apenas um arquivo para "codarmos" duas classes que teremos. Crie o arquivo com o nome que preferir e acompanhe o passo a passo.

_Nota:_ Não se esqueça de criar e ativar o ambiente isolado!

##### class Employee

Para armazenar os dados da pessoa de forma agregada vamos criar a classe `Employee`:

```language-python
class Employee:
    def __init__(self, id_num, name):
        self.id_num = id_num
        self.name = name
```

##### Hash Function

Considerando que nossa chave são inteiros, vamos usar a operação `mod 10`, ou resto da divisão inteira por 10, para definirmos o índice onde o dado vai ser armazenado. Cada número que entra, vai resultar em um endereço de 0 a 9. O valor 10 foi escolhido por não ser muito grande. Tanto a operação `mod` como o valor 10 são escolhas ilustrativas e são apenas um exemplo.

Vamos inicializar nossa classe HashMap e definir o método `get_address()`:

```language-python
# class Employee:
#     def __init__(self, id_num, name):
#         self.id_num = id_num
#         self.name = name


class HashMap:
    def get_address(self, id_num):
        return id_num % 10
```

##### Buckets

Como nossa _hash function_ resulta em endereços de 0 a 9, uma lista com 10 posições é suficiente. Vamos inicializar a lista já do tamanho que precisamos, preenchida com `None`. Não podemos preencher com um valor numérico, como por exemplo -1, pois isso causaria ambiguidade: se você quiser guardar o valor -1, como vamos saber se isso é o valor ou um indicativo de que o bucket está vazio? A lista buckets, é um atributo da classe HashMap.

```language-python
# ...


class HashMap:
    def __init__(self):
        self._buckets = [None for i in range(10)]

    # def get_address(self, id_num):
    #     return id_num % 10
```

##### insert

Para povoar nossa hash, recebemos o objeto, computamos o seu _address_, a partir da chave numérica, e armazenamos no local adequado.

```language-python
# ...


class HashMap:
    # def __init__(self):
    #     self._buckets = [None for i in range(10)]

    # def get_address(self, id_num):
    #     return id_num % 10

    def insert(self, employee):
        address = self.get_address(employee.id_num)
        self._buckets[address] = employee
```

##### get_value

Para acessar o dado de interesse, passamos a chave. A classe identifica o índice, onde a referência para aquele objeto está armazenada, e retorna o valor que estiver no campo `name`.

```language-python
# ...


class HashMap:
    # def __init__(self):
    #     self._buckets = [None for i in range(10)]

    # def get_address(self, id_num):
    #     return id_num % 10

    # def insert(self, employee):
    #     address = self.get_address(employee.id_num)
    #     self._buckets[address] = employee

    def get_value(self, id_num):
        address = self.get_address(id_num)
        return self._buckets[address].name
```

##### has

Para consultar se uma determinada chave existe dentro da sua hash map, basta calcular o _address_. Além disso, vamos certificar de que o conteúdo da lista buckets não é `None`.

```language-python
# ...


class HashMap:
    # def __init__(self):
    #     self._buckets = [None for i in range(10)]

    # def get_address(self, id_num):
    #     return id_num % 10

    # def insert(self, employee):
    #     address = self.get_address(employee.id_num)
    #     self._buckets[address] = employee

    # def get_value(self, id_num):
    #     address = self.get_address(id_num)
    #     return self._buckets[address].name

    def has(self, id_num):
        address = self.get_address(id_num)
        return self._buckets[address] is not None
```

Pronto! Nossa classe está pronta para ser utilizada no problema proposto com inserção e consulta em `O(1)`. Porém ela não tem um método para alterar valores. Você vai fazer isso nos exercícios a seguir.

Dito isso, vamos fazer exercícios!

**Exercício 1: a)** Se ainda não implementou, implemente a classe que acabamos de construir, seguindo o passo a passo anterior!

**Exercício 1: b)** Use a entrada abaixo para criar objetos `Employee`:

```language-python
employees = [(14, "name1"), (23, "name2"), (10, "name3"), (9, "name4")]
```

**Exercício 1: c)** Instancie a sua classe `HashMap` e use os **objetos Employee** para povoá-la. Imprima na tela o nome da pessoa de `id_num = 23`, acessando a informação a partir da _HashMap_.

**Exercício 2:** A pessoa de `id_num = 10` está com o nome errado, deveria ser `name30`. Implemente um método com a assinatura abaixo, onde `id_num` é a chave para localizar o registro que queremos alterar e `new_name` é o nome a ser colocado. Verifique se o seu código está realmente alterando o nome, imprimindo o nome antes e depois da alteração:

```language-python
def update_value(self, id_num, new_name):
    # ...
```

> Se tiver com dificuldades dê uma olhada no gabarito dos exercícios!

### Quando duas chaves diferentes resultam no mesmo address

Você deve ter percebido um problema enorme com a implementação que fizemos: e quando duas chaves diferentes resultam no mesmo _address_? Um exemplo simples são as chaves 14 e 24. Ambas resultarão no `address = 4`. Esse fenômeno é chamado de colisão e existem diversas técnicas para lidar com esse problema. Vamos ver abaixo um pouco mais sobre uma delas.

#### Separate Chaining

O jeito mais simples de resolver o problema da colisão é cada bucket segurar uma lista. Daí caso um elemento receba o mesmo endereço, basta adicionar na lista. Isso faz com cada bucket tenha seu próprio encadeamento de objetos.

<%= figure(%{class: "rounded mxh-auto d-block text-center", width: "800px", height: "auto", src: "/computer-science/data-structures/hash_dict/images/separate_chaining.png", caption: "separate_chaining"}) %>

O que teríamos que fazer para alterar essa implementação? A lista `buckets` não seria mais uma lista. Seria uma lista de listas. A inserção, ao invés de apenas colocar o objeto no endereço, precisa adicionar à lista que está nesse endereço. Vamos ver como fica a implementação até aqui:

```language-python
# class Employee:
#     def __init__(self, id_num, name):
#         self.id_num = id_num
#         self.name = name


class HashMap:
    # def __init__(self):
        self._buckets = [[] for i in range(10)]

    # def get_address(self, id_num):
    #     return id_num % 10

    # def insert(self, employee):
        # address = self.get_address(employee.id_num)
        self._buckets[address].append(employee)


# ...
```

> 💡 Reparem que a inicialização da lista `buckets` e a forma como inserimos um dado no bucket estão um pouco diferentes do que fizemos anteriormente.

Como ficam as funções que precisam localizar o elemento exato? Não é mais possível simplesmente regatar o que estiver no endereço, pois o que está no endereço é uma lista de objetos. Ou seja, teremos que procurar o objeto dentro da lista.

##### get_value

Após obter o endereço, vamos iterar sobre a lista até encontrarmos o item com o `id_num` procurado e retornar o nome. A mesma lógica pode ser aplicada às demais funções e não mostraremos aqui. Implemente-as caso queira treinar mais um pouco.

```language-python
# ...


class HashMap:
    # def __init__(self):
    #     self._buckets = [[] for i in range(10)]

    # def get_address(self, id_num):
    #     return id_num % 10

    # def insert(self, employee):
    #     address = self.get_address(employee.id_num)
    #     self._buckets[address].append(employee)

    def get_value(self, id_num):
        address = self.get_address(id_num)
        for item in self._buckets[address]:
            if item.id_num == id_num:
                return item.name
            else:
                return None


# ...
```

##### Complexidade

As inserções continuam `O(1)`. Mas todos os demais métodos agora iteram sobre uma lista de tamanho variado. Caso o item de interesse seja a primeira posição (melhor caso), teremos `O(1)`, mas isso raramente vai acontecer na vida real. No pior caso, será o último, resultando em uma complexidade proporcional ao tamanho da lista que está naquele endereço, o que é um performance pior do que `O(1)`.

> 💡 Com essa nova implementação, a função `update_value()`, criada no exercício de fixação 2, parará de funcionar. Isso acontece, pois, como explicado anteriormente, agora nosso bucket é uma lista de listas. Dessa forma, se tentarmos atualizar algum valor, da forma antiga, irá dar erro. Para funcionar teríamos que fazer algumas alterações, mas para meios didáticos não iremos fazê-las.

#### A complexidade não era pra ser O(1)?

Percebemos que a decisão de combinar a _hash function_, "`mod`", com a forma de tratar colisões, "`separate chaining`", fez com que o acesso à informação não fosse exatamente `O(1)`. Isso demonstra como a análise de complexidade na vida real é mais complicada do que a teórica. **E o mais importante:** demonstra como decisões de implementação de cada estrutura de dados afeta a performance final.

#### Open Addressing com Linear Probing

Existem outras técnicas de tratamento de colisão, como, por exemplo, a `Open Addressing`, onde o endereço final não é conhecido e o _hashcode_ é utilizado apenas para iniciar a busca de um bucket vazio dentro da própria lista de buckets. Essa busca por um espaço vazio pode ser feito de diversas maneiras.

Quando essa busca é feita olhando um índice após o outro, é chamada de **Linear Probing**. Mas existem vários outros métodos de busca pelo espaço vazio, incluindo cálculos matemáticos mais complexos para ir "saltando" de índice em índice.

<%= figure(%{class: "rounded mxh-auto d-block text-center", width: "800px", height: "auto", src: "/computer-science/data-structures/hash_dict/images/open_addressing.png", caption: "Open addressing"}) %>

Essas decisões de implementação são, muitas vezes, bem complexas e são alvo de discussões técnicas por anos na tentativa de estabelecer as melhores combinações. Mas não se engane, quase nunca existe uma solução geral, do tipo `one-size-fits-all`, a famosa "bala de prata". Geralmente depende do uso que você quer fazer da estrutura, restrições de recurso computacional (tempo ou espaço de memória) e as características do dado a ser armazenado.

É por isso que as linguagens geralmente fazem esse trabalho por você e te fornecem uma implementação pronta da estrutura de dados, com as melhores decisões que a equipe da linguagem tomou até agora. Em Python, a classe `Dict` implementa a _hashmap_. Em Java, existem duas classes com decisões diferentes de implementação: _HashMap_ e _HashTable_.

Como pessoa desenvolvedora, saber como a sua linguagem implementa a estrutura é importante para você saber a real complexidade do seu código. Muitas vezes temos recurso computacional suficiente para que essas diferenças de implementação não representem um problema. Mas quando lidamos com um volume muito alto de dados, ou quando temos poucos recursos computacionais disponíveis, podemos ter problemas reais que afetam a experiência da pessoa usuária.

Para praticar, vamos fazer mais dois exercícios:

**Exercício 3:** Tente descobrir qual técnica de tratamento de colisão é utilizada pelo `Dict`, de Python e o `HashMap`, do Java. Em inglês, o termo de busca é "_collision resolution_".

**Exercício 4:** Como as diferentes implementações afetam a performance? Quais são os prós e contras da implementação de cada linguagem?

### A classe Dict de Python

Dicionários (`Dict`) são estruturas de dados do tipo `chave-valor` que são implementados como _hashmaps_ por baixo dos panos. A combinação de _hash functions_ e tratamento de colisões do `Dict` garantem uma complexidade assintótica de `O(1)` para inserção de consulta. São estruturas muito eficientes, versáteis e poderosas. O Dict considera verificações importantes como a existência de apenas uma chave, bem como fornece diversos métodos convenientes para acesso e manipulação dos dados.

A sintaxe para utilização do Dict é diferente do que usamos na classe HashMap que construímos. Daqui pra frente, vamos seguir apenas com o uso do Dict de Python, uma vez que é mais eficiente e segura. Vamos ver como fica o nosso problema do cadastro, implementado com a classe `Dict`.

```language-python
# Instanciando a classe Dict
employee_registry = {}

# Inserindo dados
# objeto[chave] = valor
employee_registry[14] = 'name1'
employee_registry[23] = 'name2'
employee_registry[10] = 'name3'
employee_registry[9] = 'name4'
print(employee_registry)

# Alterando o nome do id 10
# objeto[chave] = novo_valor
employee_registry[10] = 'name30'
print(f"Novo valor do id 10, após a atualização: {employee_registry[10]}")
```

Para executar o código acima você pode criar um novo arquivo.

**Importante!** Apenas objetos imutáveis podem ser utilizados como chave. Ou seja, apenas aqueles objetos que depois de instanciados não podem ser alterados. Isso varia de linguagem para linguagem. Em Python, os objetos imutáveis são:

```language-md
- int;

- float;

- string;

- tuple;

- range;

- byte;

- frozenset.
```

Não se preocupe se você não conhece ainda alguns desses objetos. Você sempre pode consultar na internet se o objeto que você quer usar como chave é imutável ou consultar a lista completa de objetos imutáveis de Python.

Agora vamos ver a sintaxe para as principais operações.

```language-python
# Instanciação do objeto vazio
dict1 = {}
dict2 = dict()

# Instanciação com preenchimento inicial de dados
dict3 = {1: 'name1', 2: 'name2'}
print(f"Dicionário 1: {dict1}")
print(f"Dicionário 2: {dict2}")
print(f"Dicionário 3: {dict3}")

# Inserção e Alteração
# Se a chave não existir no dict, uma nova entrada será criada
# Se já existir, o valor será sobreposto
dict1[14] = 'name1'
print(f"Novo dicionário 1, pós inserção/alteração: {dict1}")

# Consulta e Remoção
# Se a chave não existir no dict, causa erro
name = dict1[14]
del dict1[14]
print(f"Dicionário 1 pós consulta e deleção: {dict1}")
```

---

#### Outros métodos

Além dessas operações, a classe `Dict` oferece vários métodos convenientes para a manipulação dos dados que podem ser consultados na documentação. Consultar a documentação é uma das formas mais poderosas de se aprender sobre um aspecto da linguagem ou framework que você está utilizando:

- [Documentação oficial da classe Dict](https://docs.python.org/3/tutorial/datastructures.html#dictionaries) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Métodos da classe Dict](https://docs.python.org/3/library/stdtypes.html#dict) {: .external-link target="_blank" rel="noreferrer noopener" }

Para praticar, vamos fazer mais dois exercícios:

**Exercício 5:** Consulte a forma de se criar um dicionário chamado de _dict comprehension_ e crie um dicionário que mapeia inteiros de 3 a 20 para o seu dobro. Exemplo:

```language-md
- 3 deve ser mapeado para 6;

- 10 deve ser mapeado para 20.
```

**Exercício 6:** Dada uma string, construa um dicionário com a contagem de cada carácter da palavra. Utilize o pseudocódigo e o exemplo abaixo para se nortear.

```language-md
Para cada char na string:
	- Se o char não estiver no dicionário, inclua com o valor 1;

	- Se estiver, incremente o valor.


# Exemplo:

str = "bbbbaaaacccaaaaaaddddddddccccccc"
# saída: {'b': 4, 'a': 10, 'c': 10, 'd': 8}

str = "coxinha"
# saída: {'c': 1, 'o': 1, 'x': 1, 'i': 1, 'n': 1, 'h': 1, 'a': 1}
# Explicação: Nenhuma letra repete em coxinha :)
```

**Exercício 7:** Utilize o dicionário criado no exercício 5. Para as chaves ímpares, não queremos mais mapear para o seu sobro, mas sim, para o seu triplo. Consulte o método `keys()` e atualize o seu dicionário para a nova regra.

### Resumo do conteúdo e resolução de problemas

#### Resumo + Encontrar o número mais frequente num array

<%= vimeo "457070672" %>

#### Separar palavras de acordo com a sua letra inicial

<%= vimeo "457076145" %>

#### Interseção entre listas

<%= vimeo "457082263" %>

---

## Vamos fazer juntos!

Na aula ao vivo, vamos resolver mais alguns exercícios que podem ter a _hashmap_ como melhor estrutura de dados. Para aproveitar bem, verifique que você compreendeu a importância de uma hashmap bem como se você está à vontade com a sintaxe de uso da classe `Dict`.

Esteja confiante também no uso dos demais métodos de `Dict`, uma vez que eles serão utilizados ao longo da resolução dos exercícios. Pode ser interessante manter a documentação da classe aberta em uma aba do navegador para consultas durante a aula.

O link está disponível no slack da turma.

Vamo que vamo!

---

## Exercícios

###### Tempo sugerido para realização: 120 minutos

Hora de por a mão na massa!

<%= versioning_your_code(@conn) %>

### Agora, a prática

Iremos realizar dois exercícios que utilizam vários dos conceitos, métodos e estratégias vistas ao longo da aula. Lembre-se de pensar sobre o problema e anotar todas as situações que podem ocorrer.

**Os exercícios foram retirados do banco de questões utilizadas em processos de contratação de grandes empresas (questões liberadas para estudo)**. A segunda questão não é trivial. Caso você emperre, não hesite em consultar a resposta. A gente aprende muito lendo código de outras pessoas.

##### Exercício 1 - Facebook

Você receberá uma lista de palavras e uma _string_. Escreva uma função que decida quais palavras podem ser formadas com os caracteres da _string_ (cada caractere só pode ser utilizado uma vez). Retorne a soma do comprimento das palavras escolhidas.

**Exemplo 1:**

```language-python
words = ["cat", "bt", "hat", "tree"], chars = "atach"
# saída: 6
"""Explicação: As palavras que podem ser formadas com os caracteres da string
               são "cat" (tamanho 3) e "hat" (tamanho 3)."""
```

**Exemplo 2:**

```language-python
words = ["hello", "world", "students"], chars = "welldonehoneyr"
# saída: 10
"""Explicação: As palavras que podem ser formadas com os caracteres da string
               são "hello" (tamanho 5) e "world" (tamanho 5)."""
```

##### Exercício 2 - Google

Uma certa empresa tem uma estrutura hierarquizada onde cada pessoa reporta a uma única outra pessoa. Cada pessoa tem um score que é o total de pessoas que estão abaixo dela, incluindo subordinados de seus subordinados, além dela própria. Isso significa que uma pessoa que não tem nenhuma equipe tem score 1. Uma pessoa com apenas um subordinado e esse subordinado não tem equipe, tem score 2. Escreva um método que calcule o score de uma determinada pessoa.

**Dica:** para saber o score de uma pessoa, você precisa saber o score das pessoas da equipe dela, correto? Qual estratégia utiliza a mesma função dentro dela própria?

**Exemplo de subordinados:**

```language-md
- 1 => 2, 3

- 2 => 4

- 3 => sem subordinados

- 4 => 5, 6

- 5 => 7

- 6 => sem subordinados

- 7 => sem subordinados
```

Neste exemplo, o **score** de cada pessoa é:

```language-md
- 1 => 5 (score 2) + 1 (score 3) + 1 (score dele próprio) = 7

- 2 => 4 (score 4) + 1 (score dele próprio) = 5

- 3 => 1 (score dele próprio)

- 4 => 2 (score 5) + 1 (score 6) + 1 (score dele próprio) = 4

- 5 => 1 (score 7) + 1 (score dele próprio) = 2

- 6 => 1 (score dele próprio)

- 7 => 1 (score dele próprio)
```

`Bônus:` É muito comum em entrevistas que, quando a pessoa resolve o problema dentro do tempo, façam-se perguntas `"follow-up"`, que dificultam a questão. Os `follow-ups` abaixo são opcionais.

**Follow-ups:**

  1. Caso a empresa precise fazer essa consulta frequentemente, como você pode tornar essas consultas mais eficientes? Como você pode guardar o resultado de consultas anteriores?

  2. Escreva um método para incluir uma nova pessoa na equipe de uma outra pessoa. Seu método deve considerar que cada pessoa pode ter no máximo `k` pessoas em seu time. Se o time estiver cheio, a nova contratada pode ser alocada na equipe de qualquer pessoa abaixo dela, não precisando ser na equipe imediatamente abaixo.

  3. Se você adicionar uma nova contratação à lista de subordinadas, a estrutura que você fez no `follow-up 1` está desatualizada. Modifique suas funções para que essa estrutura seja atualizada junto com a adição de uma nova contratação. Faça isso sem rodar de novo a função `score()` e lembre-se de atualizar todos os scores desde a pessoa da presidência até a equipe que a nova contratação entrou.

---

## Recursos adicionais (opcional)

- [Conceito de hashing](https://techterms.com/definition/hash) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Problema do vídeo: Find the duplicate number](https://leetcode.com/problems/find-the-duplicate-number/) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Implementação das hashmap do Python (o código está em linguagem C, mas há uma explicação detalhada da implementação em inglês)](https://github.com/python/cpython/blob/master/Objects/dictobject.c) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Como fazer com que classes criadas por você possam ser usadas como chave](https://docs.python.org/3/glossary.html#term-hashable) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
