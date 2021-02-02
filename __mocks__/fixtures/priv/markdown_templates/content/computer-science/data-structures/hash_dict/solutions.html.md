## Gabarito dos exercícios de fixação

##### Exercício 1

**Exercício 1: a)** Se ainda não implementou, implemente a classe que acabamos de construir, seguindo o passo a passo anterior!

**Exercício 1: b)** Use a entrada abaixo para criar objetos `Employee`:

```language-python
employees = [(14, "name1"), (23, "name2"), (10, "name3"), (9, "name4")]
```

**Exercício 1: c)** Instancie a sua classe `HashMap` e use os **objetos Employee** para povoá-la. Imprima na tela o nome da pessoa de `id_num = 23`, acessando a informação a partir da _HashMap_.

**Exercício 2:** a pessoa de `id_num = 10` está com o nome errado, deveria ser `name30`. Implemente um método com a assinatura abaixo, onde `id_num` é a chave para localizar o registro que queremos alterar e `new_name` é o nome a ser colocado. Verifique se o seu código está realmente alterando o nome, imprimindo o nome antes e depois da alteração:

```language-python
def update_value(self, id_num, new_name):
    # ...
```

###### Solução

```language-python
class Employee:
    def __init__(self, id_num, name):
        self.id_num = id_num
        self.name = name

class HashMap:
    def __init__(self):
        self._buckets = [None] * 10

    def get_address(self, id_num):
        return id_num % 10

    def insert(self, employee):
        address = self.get_address(employee.id_num)
        self._buckets[address] = employee

    def get_value(self, id_num):
        address = self.get_address(id_num)
        return self._buckets[address].name

    def has(self, id_num):
        address = self.get_address(id_num)
        return self._buckets[address] is not None

if __name__ == "__main__":

    employees = [(14, 'name1'), (23, 'name2'), (10, 'name3'), (9, 'name4')]
    registry = HashMap()

    for id_num, name in employees:
        employee = Employee(id_num, name)
        registry.insert(employee)

    print(registry.get_value(23))
```

---

##### Exercício 2

A pessoa de `id_num = 10` está com o nome errado, deveria ser `name30`. Implemente um método com a assinatura abaixo, onde `id_num` é a chave para localizar o registro que queremos alterar e `new_name` é o nome a ser colocado. Verifique se o seu código está realmente alterando o nome, imprimindo o nome antes e depois da alteração:

###### Solução

```language-python
class HashMap:
    # ...

    def update_value(self, id_num, new_value):
        address = self.get_address(id_num)
        employee = self._buckets[address]
        employee.name = new_value

if __name__ == "__main__":

    # employees = [(14, 'name1'), (23, 'name2'), (10, 'name3'), (9, 'name4')]
    # registry = HashMap()

    # for id_num, name in employees:
    #     employee = Employee(id_num, name)
    #     registry.insert(employee)

    # print(registry.get_value(23))

    print(registry.get_value(10))
    registry.update_value(10, "name30")
    print(registry.get_value(10))
```

##### Exercício 3

Tente descobrir qual técnica de tratamento de colisão é utilizada pelo `Dict`, de Python e o `HashMap`, do Java. Em inglês, o termo de busca é "_collision resolution_".

###### Solução

A classe `Dict` utiliza o _Open Addressing_ e `Java` utiliza _Separate Chaining_. Vamos entender isso com mais detalhes.

A classe `Dict`, de Python, utiliza a técnica de tratamento de colisão chamada _Open Addressing_ e busca o próximo espaço vazio em duas fases. Ambas as fases utilizam a representação binária da chave e aplicam fórmulas matemáticas para definir o próximo índice a ser visitado.

A classe `HashMap`, de Java, utiliza a técnica de _Separate Chaining_, mas quando a lista do bucket começa a ficar grande, Java substitui essa lista por uma [Árvore Binária de Busca](https://pt.wikipedia.org/wiki/%C3%81rvore_bin%C3%A1ria_de_busca) {: .external-link target="_blank" rel="noreferrer noopener" }, uma estrutura de dados que diferente, que não veremos no curso, mas já posso adiantar que é mais eficiente do que uma lista para operações de busca.

---

##### Exercício 4

Como as diferentes implementações afetam a performance? Quais são os prós e contras da implementação de cada linguagem?

###### Solução

Essa pergunta é um pouco mais difícil, então não se preocupe se não conseguiu achar essa informação de maneira explícita.

A solução do Python determina o próximo índice a ser visitado de maneira relativamente randômica e resulta em uma complexidade assintótica de tempo de `O(1)`. Por outro lado, para evitar que o vetor buckets fique rapidamente sem espaço, um `Dict` é inicializado com uma lista de tamanho `2**15 ints`. Como em Python cada `int` ocupa 24 bytes, no mínimo, o uso de memória é considerável.

Em Java, o tamanho inicial é menor, uma vez que o que tende a crescer são as `chains` de cada bucket e não a lista de buckets. Por outro lado, temos o `trade-off` com o custo de tempo. Para cada consulta, o tempo de busca é proporcional à quantidade de itens naquele bucket que, sendo uma árvore, chega a `O(log n)`, sendo `n` a quantidade de itens naquele bucket.

Resumindo: Python tem complexidade mais baixa, mas gasta muito espaço. Java utiliza bem melhor a memória, porém tem maior complexidade para consultas.

---

##### Exercício 5

Consulte a forma de se criar um dicionário chamada _dict comprehension_ e crie um dicionário que mapeia inteiros de 3 a 20 para o seu dobro. Exemplo:

```language-md
- 3 deve ser mapeado para 6;

- 10 deve ser mapeado para 20.
```

###### Solução

```language-python
double = {i: i*2 for i in range(3, 21)}

print(double)
```

---

##### Exercício 6

Dada uma string, construa um dicionário com a contagem de cada carácter da palavra. Utilize o pseudocódigo e o exemplo abaixo para se nortear.

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

###### Solução

```language-python
count_chars = {}

for char in str:
	if char not in count_chars:
		count_chars[char] = 1
	else:
		count_chars[char] += 1

print(count_chars)
```

---

##### Exercício 7

Utilize o dicionário criado no exercício 5. Para as chaves ímpares, não queremos mais mapear para o seu sobro, mas sim, para o seu triplo. Consulte o método `keys()` e atualize o seu dicionário para a nova regra.

###### Solução

```language-python
# double = {i: i*2 for i in range(3, 21)}

for key in double.keys():
	if key % 2 is not 0:
		double[key] = key * 3


print(double)
```

---

## Gabarito dos exercícios finais

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

###### Solução

Para cada palavra da lista, precisamos saber se os caracteres da _string_ são suficientes. Para isso, precisamos saber quais e quantas letras a _string_ tem. Podemos fazer isso criando uma _hash_ que mapeia a letra para a quantidade. Vamos chamar essa hash de `alfabeto`.

Depois, precisamo iterar sobre a lista de palavras decidindo se todas as letras da palavra estão no alfabeto, bem como se a quantidade daquela letra é no máximo a quantidade daquela letra disponível no alfabeto.

Um dos jeitos de resolver isso seria construir uma _hash_ para a palavra que guarda as quantidades de letras. Depois, seria verificar se cada letra da palavra aparece no alfabeto; se sim, verificar se a quantidade atende ao requisito. Mas não precisamos terminar de montar essa segunda _hash_ pra decidir se a palavra infringiu alguma regra. Podemos fazer isso durante a própria construção. (O código está com prints explicativos)

```language-python
def count_words(words, chars):
    ans = 0
    alphabet = {}
    for char in chars:
        if char not in alphabet:
            alphabet[char] = 1
        else:
            alphabet[char] += 1
    print(f"Montamos o alfabeto: {alphabet}")

    for word in words:
        print(f"Analisando a palavra {word}")
        str_count = {}
        for char in word:
            if char not in alphabet:
                print(f"'{char}' não está no alfabeto. Desconsiderar palavra")
                break

            if char not in str_count:
                str_count[char] = 1
            else:
                str_count[char] += 1

                if str_count[char] > alphabet[char]:
                    print(f"'{char}' ocorre com mais frequência do que no alfabeto. Desconsiderar")
                    break
        else:
            print(f"Considerar {word}")
            ans += len(word)

    return ans

words = ["cat", "bt", "hat", "tree", "caaat"]
chars = "atach"
print(f"Resposta final: {count_words(words, chars)}")
print()
words = ["hello", "world", "students"]
chars = "welldonehoneyr"
print(f"Resposta final: {count_words(words, chars)}")
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

###### Solução

Em primeiro lugar, precisamos notar que o mapeamento de cada pessoa para seus subordinados pode ser representado como uma _hash_. Em segundo lugar, precisamos observar que a relação abaixo:

```language-md
score da pessoa 5 = 1 + score da pessoa 7 (1)
score da pessoa 7 = 1
```

Nos leva à recursividade como estratégia:

```language-python
def score(subordinates, person):
    this_score = 1

    for subordinate in subordinates[person]:
        this_score += score(subordinates, subordinate)

    return this_score

if __name__ == "__main__":
    subordinates = {
        1: [2, 3],
        2: [4],
        3: [],
        4: [5, 6],
        5: [7],
        6: [],
        7: [],
    }

    print(score(subordinates, 1))
    print(score(subordinates, 2))
    print(score(subordinates, 3))
    print(score(subordinates, 4))
    print(score(subordinates, 5))
    print(score(subordinates, 6))
    print(score(subordinates, 7))
```

**follow-up 1:**

> Caso a empresa precise fazer essa consulta frequentemente, como você pode tornar essas consultas mais eficientes? Como você pode guardar o resultado de consultas anteriores?

Se você calcular para a pessoa 1, você concorda que teremos que calcular o score de todas as pessoas da empresa? O que podemos fazer é guardar os scores em uma outra _hash_ para uso futuro. Poderíamos modificar a função score para receber essa estrutura e fazer a consulta de se aquele score já foi calculado antes. Mas essa estrutura auxiliar é parte do cálculo dos scores e não faz sentido que ela fique solta na `main`. Então vamos envelopar isso tudo dentro de uma classe.

```language-python
class Hierarchy:
    def __init__(self, subordinates):
        self.subordinates = subordinates
        self.scores = {}

    def get_score(self, person):
        if person in self.scores:
            print("Já calculei esse score antes")
            return self.scores[person]

        this_score = 1

        for subordinate in self.subordinates[person]:
            this_score += self.get_score(subordinate)
        self.scores[person] = this_score

        return this_score

if __name__ == "__main__":
    subordinates = {
        1: [2, 3],
        2: [4],
        3: [],
        4: [5, 6],
        5: [7],
        6: [],
        7: [],
    }

    hierarchy = Hierarchy(subordinates)

    print(hierarchy.get_score(1))
    print(hierarchy.get_score(2))
    print(hierarchy.get_score(3))
    print(hierarchy.get_score(4))
    print(hierarchy.get_score(5))
    print(hierarchy.get_score(6))
    print(hierarchy.get_score(7))
```

**follow-up 2:**

> Escreva um método para incluir uma nova pessoa na equipe de uma outra pessoa. Seu método deve considerar que cada pessoa pode ter no máximo `k` pessoas em seu time. Se o time estiver cheio, a nova contratada pode ser alocada na equipe de qualquer pessoa abaixo dela, não precisando ser na equipe imediatamente abaixo.

Agora que a classe consegue adicionar pessoas, não precisamos mais receber a estrutura `subordinates`; a própria classe vai cuidar de montar essa estrutura enquanto adiciona as pessoas.

**Vamos definir um exemplo para pensar:** Se eu quiser adicionar a pessoa 8 na equipe de 4, com k=2?

A equipe de 4 está cheia, então eu preciso tentar encaixar na equipe de algum subordinado a 4, ou seja, na equipe de 5 ou de 6. É super importante observar que eu posso incluir 8 em **qualquer** lugar abaixo 4. Isso significa que eu sempre vou conseguir incluir a pessoa, pois no final da cadeia, haverá uma pessoa sem equipe e eu posso atribuir a nova contratada para ela. Ou seja, ao invés de tentar olhar em "largura" e tentar incluir em 5 e depois em 6, eu posso ir descendo na cadeia até achar um lugar que ela caiba, olhando em "profundidade": olho 4, depois 5, se 5 estivesse cheio, olho a 7.

Última coisa: Você considerou se a pessoa que está sendo incluída é a primeira de todas?

```language-python
class Hierarchy:
    def __init__(self, k):
        self.subordinates = {}
        self.scores = {}
        self.k = k

    def add_person(self, boss, person):
        if not boss:
            self.subordinates[person] = []
            self.scores[person] = 1
            return

        self.scores[boss] += 1

        if len(self.subordinates[boss]) < self.k:
            self.subordinates[boss].append(person)
            self.subordinates[person] = []
            self.scores[person] = 1
        else:
            self.add_person(self.subordinates[boss][0], person)

    def get_score(self, person):
        return self.scores[person]


if __name__ == "__main__":
    hierarchy = Hierarchy(2)
    hierarchy.add_person(None, 1)
    hierarchy.add_person(1, 2)
    hierarchy.add_person(1, 3)
    hierarchy.add_person(2, 4)
    hierarchy.add_person(4, 5)
    hierarchy.add_person(4, 6)
    hierarchy.add_person(5, 7)
    print("\nAntes das novas inserções")
    print(f"Subordinates: {hierarchy.subordinates}")

    hierarchy.add_person(4, 8)
    hierarchy.add_person(4, 9)
    print("\nApós novas inserções")
    print(f"Subordinates: {hierarchy.subordinates}\n")
```


**follow-up 3:**

> Se você adicionar uma nova contratação à lista de subordinadas, a estrutura que você fez no `follow-up 1` está desatualizada. Modifique suas funções para que essa estrutura seja atualizada junto com a adição de uma nova contratação. Faça isso sem rodar de novo a função `score()` e lembre-se de atualizar todos os scores desde a pessoa da presidência até a equipe que a nova contratação entrou.

Quando você adiciona uma pessoa, ela pode ser adicionada em qualquer equipe abaixo dela. Como você recebe o primeiro _boss_, para atualizar o score entre esse _boss_ e o local que a pessoa foi efetivamente alocada, basta ir atualizando o score na medida em que você vai tentando uma nova equipe.

A parte mais complicada é atualizar desde a presidência até o primeiro _boss_. A gente tem uma estrutura que nos diz quem é subordinado a quem, mas não temos um jeito imediato de consultar quem é chefe de quem. Então uma possível solução é, a cada inserção, manter o controle da chefia imediata daquela pessoa. Na solução proposta abaixo, adicionamos a _hash_ `imediate_boss`, que é atualizada antes de realmente tentarmos alocar a pessoa. A função `add_person` foi renomeada para `fit_person` e agora atualizada o score de cada _boss_ que tentamos encaixar a nova contratada.

Como os scores são atualizados na medida em que fazemos as inserções, a função `get_score` agora precisa apenas fazer uma consulta simples à estrutura `scores`.
