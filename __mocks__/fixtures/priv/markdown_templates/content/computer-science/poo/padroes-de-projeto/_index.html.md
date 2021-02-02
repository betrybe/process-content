## O que vamos aprender?

Hoje você vai aprender o que são **padrões de projeto** e qual a intenção de existirem. Veremos na prática como implementar alguns. Além disso, você verá como reconhecer indícios de problemas e se aproveitar dessa oportunidade para realizar refatorações de código.

<%= figure(%{src: "/computer-science/images/not-sure-if-code-smell-or-design-pattern.jpg", class: "text-center rounded mx-auto d-block", width: "auto", height: "auto"}) %>

Guarde o conteúdo de hoje nos seus favoritos, porque você achará interessante consultá-lo várias vezes no futuro, especialmente quando estiver trabalhando em aplicações grandes! Hoje aprenderemos conceitos e veremos vários exemplos. Na medida em que você for ganhando vivência e experiência no mercado, mais e mais o aprendizado de hoje se consolidará!

### Você será capaz de

- Entender o que é um **Padrão de Projeto**;

- Identificar situações em que padrões podem ser aplicados;

- Reconhecer **code smells** e atuar sobre eles quando necessário.

---

## Por que isso é importante?

Existem problemas que se repetem com frequência dentro de um determinado contexto no projeto de software. E para estes problemas existem soluções documentadas e abstratas que os resolvem em um contexto mais genérico.

Identificar a presença destes problemas e recomendar uma solução é um dos papéis de uma pessoa desenvolvedora. Assim como perceber que o código possui características que não estão legais e tomar ações para refatorar o código.

---

## Conteúdos

###### Tempo sugerido para realização: 120 minutos

### Padrões de projeto

#### Definição

**Padrão de Projeto** é uma solução geral para um problema que ocorre com frequência dentro de um determinado contexto no projeto de _software_. Desde a década de 70, cientistas da computação perceberam que ainda que em contextos diferentes, algumas soluções de problemas se repetiam em vários _softwares_. Visando facilitar a reutilização do desenho da solução e a comunicação, assim como melhorar a documentação e compreensão de um sistema, essa comunidade de cientistas começou a catalogar estes padrões.

Para deixar tudo mais tangível, responda à seguinte pergunta: _"Quantas aplicações no mundo precisam iterar sobre uma lista de elementos?"_ Certamente milhares, senão milhões, correto? Eventualmente se propôs uma forma padronizada de implementar a solução para este problema, e tal proposta foi adotada, e este é o padrão de projeto conhecido como **iterator**. Ao receber uma _lista de entidades_, uma classe que implementa o padrão de projeto iterator deve ter, por exemplo uma função `next` que retorna o próximo elemento da dita lista.

Não interessa se a sua lista é em formato de `array`, de árvore, se é uma lista de inteiros, objetos ou o que for. Ao garantir que sua classe possui um `iterador`, você garante que ela tem uma função `next` que vai acessar o próximo elemento da sua lista. A forma de fazer isso é você quem define. Ao seguir o padrão de projeto, você organiza o seu código - e o seu raciocínio - de uma forma pensada, estudada e comprovadamente eficaz.

<%= figure(%{src: "/computer-science/images/lista-padroes-de-projeto.png", class: "text-center rounded mx-auto d-block", width: "700px", height: "auto", alt: "Lista com 21 padrões de projetos, cada um com sua ilustração", caption: "Lista com vários padrões de projeto. Imagem extraída de www.refactoring.guru/pt-br/design-patterns/catalog"}) %>

O exemplo do _iterator_ é um exemplo mais básico do que padrões de projeto são, mas ilustra bem o seu propósito: organizar seu código e raciocínio de formas eficazes, comprovadamente boas e (praticamente) universalmente aceitas. Ao se deparar com um determinado problema que se encaixa na definição de um padrão de projeto, busque o padrão de projeto para saber uma forma boa de resolver esse problema.

Um padrão é definido e documentado com um nome, o problema que busca resolver, uma solução dada por ele e as consequências sobre esta escolha. São documentados em formas de explicações e diagramas abstratos, possibilitando assim a utilização em diferentes contextos. Quando falamos de **Padrões de projeto**, é impossível deixar de falar sobre o [livro da 'gangue dos quatro'](https://en.wikipedia.org/wiki/Design_Patterns) {: .external-link target="_blank" rel="noreferrer noopener" }. Hoje em dia, porém, muitos outros padrões estão documentados em diversas outras literaturas. É importante conhecer diferentes padrões e onde se aplicam, mas não fique preso a eles. Outros padrões podem emergir dos seus códigos e nem sempre estarão documentados.

No conteúdo de hoje vamos analisar três (_Iterator_, _Adapter_ e _Strategy_) deles na prática! 🤔

#### Iterator

> “Fornecer um meio de acessar, sequencialmente, os elementos de um objeto agregado sem expor sua representação subjacente.”

**Problema:**

Frequentemente escrevemos estruturas de dados que representam coleções, ou seja, um container para um grupo de objetos. E frenquentemente precisamos percorrer estas coleções de elemento em elemento. Porém, estas coleções podem ser internamente implementadas de diversas formas. Poderíamos ter os elementos dispostos em formato de lista, árvores, grafos ou conjuntos.

Há uma dependência entre a maneira que os dados estão dispostos e o método que percorre a estrutura de elemento em elemento.

<%= figure(%{src: "/computer-science/images/crossing.png", class: "text-center rounded mx-auto d-block", width: "auto", height: "auto", alt: "Percorrendo coleções. Foto extraída de www.refactoring.guru/pt-br/design-patterns/iterator/", caption: "Percorrendo coleções. Foto extraída de www.refactoring.guru/pt-br/design-patterns/iterator/"}) %>

**Solução:**

Para solucionar este problema, vamos extrair o comportamento de travessia de uma coleção para um objeto **iterador**.

Uma interface típica de objetos iteradores provê um método para acessar o próximo elemento da coleção e outro para identificar que não há mais elementos a serem percorridos. Como a interface é única para percorrer os elementos de uma coleção, podemos fazer modificações no algoritmo de travessia sem modificar o código do cliente (código que interage com o iterador).

Podemos, também, ter diversos iteradores para uma mesma coleção. Por exemplo, podemos percorrer uma coleção do primeiro elemento até o último e vice-versa.

<%= figure(%{src: "/computer-science/images/iterator.png", class: "text-center rounded mx-auto d-block", width: "700px", height: "auto"}) %>

O diagrama acima deve ser lido da seguinte maneira: uma coleção (`ConcreteAggregate`) deve implementar o método `iterator` que retorna um objeto que segue a interface `Iterator`.

Para seguir a interface `Iterator`, um objeto deve possuir um método `next`, que serve para obter o próximo elemento da coleção; e `hasNext`, que indica se ainda há elementos a serem percorridos.

O objeto iterador (`ConcreteIterator`) deve ser composto por uma coleção (`ConcreteAggregate`).

Lembrando que os nomes e interfaces apresentados anteriormente são padrões apresentados em literatura. Porém estes nomes podem variar durante a implementação. É importante que se atente às abstrações apresentadas e a intenção proposta por elas.

**Consequências:**

O código "cliente", ou seja o código que irá utilizar essa abstração que vimos acima, se beneficia do fato de que não precisa conhecer a implementação da travessia e somente consumir elemento a elemento de uma coleção através do objeto iterador.

Como a complexidade da travessia fica encapsulada em um objeto iterador, temos uma responsabilidade única sendo atribuída a um objeto.

**Exemplo:**

Para fazermos os exemplos dos padrão de projeto vamos criar o arquivo `design_patterns.py` em uma pasta qualquer. Lembre-se de criar e ativar o ambiente isolado!

```language-bash
$ python3 -m venv .venv && source .venv/bin/activate
```

Pronto! Agora podemos criar o arquivo e escrever o código:

> design_patterns.py

```language-python
"""
Classes abstratas, são abstrações utilizadas para definir
protocolos de comunicação com objetos.
Além de definir uma interface (métodos), podem possuir comportamentos
já implementados baseados nestes protocolos.

Para que consigamos implementar a interface da abstração Iterable,
a classe deve implementar o método __iter__,
que deve retornar um objeto iterador.

Algo similar ocorre com a classe abstrata Iterator
e sua classe concreta StockIterator.
Porém o método que deve ser implementado é o __next__.

Você vai reparar que ao longo da implementação os nomes não são os mesmos
vistos no diagrama. O importante é a abstração.
"""
from collections.abc import Iterator, Iterable


class Book:

    def __init__(self, isbn, title, author, qty):
        self.isbn = isbn
        self.title = title
        self.author = author
        self.qty = qty

    # ...


class StockIterator(Iterator):

    def __init__(self, iterable):
        self._iterable = iterable
        self._position = 0

    def __next__(self):
        """Retorna o próximo elemento da coleção.

        Uma exceção é lançada quando não há mais elementos a serem percorridos.
        """
        try:
            current_value = self._iterable[self._position]
        except IndexError:
            raise StopIteration()
        else:
            self._position += 1
            return current_value


class Stock(Iterable):

    def __init__(self):
        self._book_stock = []

    def add_book(self, book):
        self._book_stock.append(book)

    def __iter__(self):
        """Retorna o iterador a partir da coleção de livros em estoque.

        Equivalente ao método iterator "ConcreteAgreggator" do diagrama.
        """
        return StockIterator(self._book_stock)


if __name__ == "__main__":
    stock = Stock()
    stock.add_book(Book(
        isbn="abbb492978ff656d",
        title="The Secret Garden",
        author="Frances Burnett",
        qty=4,
    ))
    stock.add_book(Book(
        isbn="7b599c8bfcdd8d30",
        title="Camp Midnight",
        author="Steven Seagle",
        qty=8,
    ))

    # Enviamos uma mensagem ao objeto stock que irá invocar o método __iter__
    # similar a stock.__iter__(), retornando uma instância do iterador
    iterator = iter(stock)

    # Enviamos outra mensagem, dessa vez à instancia do iterador
    # retornando  o primeiro objeto da coleção
    # similar a iterator.__next__()
    first_book = next(iterator)
    print(first_book.isbn, first_book.title)

    # No for não precisamos de um método has_next, pois
    # por baixo dos panos o python invoca o método __iter__
    # que retorná um iterador.
    # Em seguida, será invocado o __next__ do iterador até que seja lançada
    # uma exceção sinalizando o fim da iteração.
    # O retornado da invocação é atribuído a variável iteradora(book)
    # e o bloco de código é executado
    for book in stock:
        print(book.title)
```

#### Adapter

> “Converter a interface de uma classe em outra interface, esperada pelo cliente. O Adapter permite que interfaces incompatíveis trabalhem em conjunto – o que, de outra forma, seria impossível.”

**Problema:**

Duas classes se comunicam através de troca de mensagens, porém nem sempre isso é possível. Às vezes há uma incompatibilidade entre as interfaces, seja por causa de um código legado ou contextos distintos. Em outras palavras, as classes precisam se comunicar, mas é difícil fazê-las "conversarem".

<%= figure(%{src: "/computer-science/images/adapter-problem.jpg", class: "text-center rounded mx-auto d-block", width: "auto", height: "auto", caption: "Interfaces diferentes de comunicaçao."}) %>

Como você resolve um problema como o da imagem acima? Você não pode mudar o idioma que uma das pessoas fala - imagina o estrago que você faria no resto da vida dessa pessoa! Não. Você precisa ter uma terceira entidade na interação - um tradutor! Para classes que "não conversam", é a mesma coisa. Você poderia modificar a interface de uma das classes para se comunicar com a outra, possibilitando esta integração, mas o que aconteceria ao código já existente que utiliza qualquer umas partes?

**Solução:**

A solução para este problema é criar uma nova classe, respeitando a interface de uma das partes, adicionando antes uma tradução da mensagem que será passada adiante.
Isto possibilita a comunicação entre classes de interfaces distintas.

<%= figure(%{src: "/computer-science/images/adapter.png", class: "text-center rounded mx-auto d-block", width: "700px", height: "auto"}) %>

Uma interface (`Target`) é definida de modo que a comunicação com o cliente ocorra através dela, garantindo que exista uma compatibilidade entre os objetos.

A classe `Adapter` será composta por um objeto a ser adaptado (`Adaptee`). Mesmo que a classe adaptada (`Adaptee`) possua uma interface diferente (`SpecificRequest`), nosso adaptador traduz em chamadas para o objeto encapsulado do serviço (`Adaptee`) em um formato que ele possa entender.

Em outras palavras: uma parte (`Client`), ao querer se comunicar, fala com a classe intermediária que define a interface dessa comunicação (`Target`). Essa interface se comunica com o `Adapter`, que traduz a comunicação para um formato que a classe alvo da comunicação (`Adaptee`) entenda. Na nossa analogia, `Target` é a interface gráfica de um app tradutor e `Adapter` é a "inteligencia" do app, que efetivamente faz a tradução.

**Consequências:**

Seu programa aumenta em complexidade, pois estamos adicionando novas interfaces e classes, porém o **desacoplamento** entre o código do cliente e o objeto adaptado se mantém. Mudanças no objeto adaptado se refletem apenas no adaptador e não no código cliente.

É possível substituir o serviço adaptado através da criação de novos adaptadores.

<%= figure(%{src: "/computer-science/images/adapter-shoes.jpeg", class: "text-center rounded mx-auto d-block", width: "auto", height: "auto", caption: "O saco adapta a interface do pregador de roupa para a interface (incompatível) do tênis."}) %>

**Exemplo:**

> design_patterns.py

```language-python
"""
Neste exemplo utilizamos a classe abstrata BookRetriever para definir uma
interface de métodos que serão utilizados pelo nosso código cliente.

A classe BookImporter é incompatível com nosso estoque (Stock),
pois nos envia dicionários ao invés de livros.

O nosso adaptador (Adapter) é composto por um objeto BookImporter
a ser adaptado.

Quando o cliente invoca o método `retrieve_books` da
classe adaptadora (`Adapter`), estamos realizando a tradução para a
interface esperada pelo cliente (um conjunto de livros e não dicionários).
"""
from abc import ABC, abstractmethod
# from collections.abc import Iterator, Iterable

# ...

# first_book = next(iterator)
#    print(first_book.isbn, first_book.title)


#    for book in stock:
#        print(book.title)

class BookImporter:
    def __init__(self):
        # adicionei alguns livros no construtor
        # somente para didática
        self._books = [
            {
                "isbn": "7b599c8bfcdd8d30",
                "title": "Camp Midnight",
                "author": "Steven Seagle",
                "qty": 8,
            },
            {

                "isbn": "abbb492978ff656d",
                "title": "The Secret Garden",
                "author": "Frances Burnett",
                "qty": 4,
            },
        ]

    # ...

    def load_books(self):
        """Retorna os livros carregados em memória.

        Equivalente a specificRequests no diagrama."""
        return self._books


class BookRetriever(ABC):
    """Classe abstrata que define a interface utilizada pelo código cliente"""

    @abstractmethod
    def retrieve_books(self):
        raise NotImplementedError()


class Adapter(BookRetriever):
    def __init__(self, adaptee):
        self.adaptee = adaptee

    def retrieve_books(self):
        # os livros são recuperados como dicionários
        raw_books = self.adaptee.load_books()
        # converte os dicionários em livros
        books = [
            Book(
                isbn=book["isbn"],
                title=book["title"],
                author=book["author"],
                qty=book["qty"],
            )
            for book in raw_books
        ]
        # retorna uma lista de livros
        return books


"""O código cliente recebe uma lista de livros
para adicionar em estoque
preciso de um objeto livro,
porém o sistema de importação nos provê um dicionário."""
stock = Stock()
# Enviamos o importador para ser adaptado
adapter = Adapter(BookImporter())
books = adapter.retrieve_books()
# Enfim podemos armazenar os livros
for book in books:
    stock.add_book(book)
```

#### Strategy

> “Definir uma família de algoritmos, encapsular cada uma delas e torná-las intercambiáveis. Strategy permite que o algoritmo varie independentemente dos clientes que o utilizam.”

**Problema:**

Temos aqui um padrão de projetos mais abstratos! Pense assim: uma classe pode fazer algo específico, como construir uma rota de viagem ou calcular o preço total de uma venda, mesmo que existam diversas formas de se fazer cada tarefa. Eu poderia calcular uma rota diferente para bicicletas, para pedestres ou carros. Da mesma forma, eu poderia calcular o preço de uma venda aplicando diversos tipos de descontos, como desconto por fidelidade ou baseado nos itens da compra.

Reparem que o padrão que se repete aqui é a presença de diversos algoritmos que realizam uma tarefa específica, porém com implementações diferentes.

<%= figure(%{src: "/computer-science/images/strategy-problem2.jpg", class: "text-center rounded mx-auto d-block", width: "auto", height: "auto", caption: "Estratégias diferentes para atingir o  mesmo objetivo"}) %>

O problema está na responsabilidade da classe que, neste momento, precisa **conhecer** as diversas implementações e ainda selecionar a adequada quando utilizada pelo código cliente. Isso faz com que a classe tenda a ficar grande, confusa e difícil de se manter, além de mais sujeita a erros.

**Solução:**

Dado que nosso problema é que uma classe faz algo específico, mas de diversas maneiras diferentes, vamos extrair cada uma destas maneiras em uma classe separada que denominaremos **estratégia**. Nossa classe original será a classe **contexto**.

A classe **contexto** irá conter uma estratégia, ou seja, um algoritmo apropriado para execução de sua tarefa. Este contexto não precisa conhecer a implementação de sua estratégia, apenas delegando o trabalho a ela.

Uma estratégia é uma abstração que define uma interface para interação com a classe contexto, quando concreta irá encapsular um algoritmo. A definição da estratégia é feita pelo código cliente atribuída ao objeto contexto, podendo ser modificada em tempo de execução. Agora releia essa frase porque ela é bem complexa e é difícil entendê-la de primeira!

<%= figure(%{src: "/computer-science/images/strategy.png", class: "text-center rounded mx-auto d-block", width: "auto", height: "auto"}) %>

**Consequência:**

Como estratégias são definidas de forma isolada, cada uma numa classe separada, a criação de uma nova não interfere no código de quem usa a estratégia, ou seja, o contexto. Porém, devemos documenta-las para evitar confusão.

O contexto não precisa conhecer como uma estratégia está implementada, o que nos dá encapsulamento, mantendo os códigos separados e independentes! Além disso podemos, em tempo de execução, modificar a estratégia utilizada por um objeto.

<%= figure(%{src: "/computer-science/images/strategy-problem.jpg", class: "text-center rounded mx-auto d-block", width: "auto", height: "auto", caption: "Diferentes estratégias de empréstimo de livro"}) %>

**Exemplo:**

Para o exemplo desse padrão de projeto iremos utilizar outro arquivo. Se você preferir, você pode deletar todo o conteúdo do arquivo `design_patterns.py` e fazê-lo lá. Porém, para termos ambos os exemplos armazenados, vamos criar o arquivo

> design_pattern_strategy.py

```language-python
"""
A classe LoanOrder representa nosso objeto de contexto (Context) e seu método
para interação é o devolution.

Um pedido de empréstimo (LoanOrder) é composto por uma estratégia de devolução
que será utilizada para calcular o prazo da mesma.

Uma estratégia (Strategy) possui um algoritmo que calcula o prazo de devolução.
A interface para interação com este prazo é através do método deadline.
"""
from abc import ABC, abstractmethod
from uuid import uuid4
from datetime import timedelta, datetime


class LoanOrder:
    def __init__(self, customer, books, deadline_strategy=None):
        self._id = uuid4()
        self._customer = customer
        self._books = books
        self.deadline_strategy = deadline_strategy
        self._created_at = datetime.now().date()

    def devolution(self):
        if self.deadline_strategy is None:
            return self._created_at
        return self._created_at + self.deadline_strategy.deadline()


class Strategy(ABC):
    @abstractmethod
    def deadline(self):
        raise NotImplementedError


class ReadingOnSite(Strategy):
    def deadline(self):
        # o timedelta é zero, pois o livro deve ser retornado no mesmo dia
        return timedelta()


class TakeHome(Strategy):
    def deadline(self):
        return timedelta(days=7)


class VacationLoan(Strategy):
    def deadline(self):
        return timedelta(days=30)


#  o código cliente interage com instâncias de Pedido de Empréstimo
first_order = LoanOrder(
    "Felipe", ["7b599c8bfcdd8d30", "abbb492978ff656d"], TakeHome(),
)
# posso criar pedidos de empréstimo com diferentes estratégias de empréstimo
second_order = LoanOrder(
    "Marta", ["abbb492978ff656d"], ReadingOnSite(),
)
# cada estratégia possui um algoritmo diferente para
# calcular o prazo de devolução
print(first_order.devolution())
print(second_order.devolution())

# posso modificar em tempo de execução a estratégia de empréstimo
first_order.deadline_strategy = VacationLoan()
# o mesmo pedido agora tem uma nova data de devolução
print(first_order.devolution())
```

---

🧰 Se quiser conhecer outros padrões de projetos, consulte o site [Refactoring Guru](https://refactoring.guru/pt-br/design-patterns/) {: .external-link target="_blank" rel="noreferrer noopener" }, uma fonte de conhecimento excelente para se guardar!

---

### Code Smells

#### Definição

Vocês já lidaram, ao longo de todo o curso, com o **linter**. Obrigatórios para a aprovação no projeto, os linters buscam **padronizar** e **garantir a qualidade de código** que você escreve. Vamos, agora, conhecer **a base teórica que orienta a criação de diversas regras de linter!**, os **code smells**!

**Code smells** são _pistas_ de problemas que seu código pode ter, e que podem ser resolvidos durante, por exemplo, uma refatoração. Geralmente são fáceis de localizar e corrigir, mas nem sempre: a depender do caso, problemas individuais podem ser apenas sintomas de um problema mais profundo do código. Você, buscando respeitar o linter, já teve que "virar seu código do avesso" e reestruturá-lo inteiro? Pois é! É disso que se trata!

Determinar um **code smell** é algo subjetivo e pode variar por linguagem, desenvolvedor e metodologia de desenvolvimento. Dito isso, vamos estudar alguns!

#### Alguns conhecidos

Você já deve ter se deparado com alguns deles, só não sabe ainda seus nomes:

- **Long Method**: métodos grandes geralmente significam mais de uma responsabilidade em um mesmo trecho de código. Assim sendo, como regra métodos não podem ser muito longos;

- **Large Class**: classes grandes geralmente significam mais de uma responsabilidade. Assim sendo, como regra classes não podem ser muito grandes;

- **Duplicate Code**: códigos duplicados geralmente significam falta de abstração, ou seja, lógica repetida que poderia estar centralizada em uma única entidade compartilhada. Assim sendo, uma aplicação não pode ter trechos de código duplicados;

- **Dead Code**: se um código não está mais sendo utilizado, porque ainda está lá?

- **Speculative Generality**: quem nunca tentou adivinhar o futuro e tornou uma implementação mais complicada do que precisava? Essa aqui é extremamente comum de fazermos sem perceber!

#### Middle Man

> Se uma classe somente delega uma ação para outra, por que deveria existir? Corte o intermediário!

**Exemplo:**

Temos uma plataforma onde a pessoa jogadora (Player) possui jogos (PlayerGame) e participa de torneios (Tournaments). Nesta plataforma temos um cliente que precisa consultar os torneios de poker de uma pessoa jogadora. Para fins desse exemplo utilizaremos a pessoa jogadora com id 1 e o jogo de poker que ela comprou também com id 1.

```language-python
class Player:

    # ...

    def game(self, game_id):
        '''Busca um jogo da pessoa através do seu id'''
        return PlayerGame.query.filter(game_id=game_id, user_id=self.id).first()

    def tournaments(self, game_id):
        '''Aqui estamos buscando pelos jogos de uma pessoa para encontrar
        seus torneios.

        Ou seja, usamos o middle man PlayerGame para encontrar o torneio.
        O que além de adicionar complexidade de código, adiciona uma consulta
        extra ao banco de dados.
        '''
        return self.game(game_id).tournaments()


class PlayerGame:

    def tournaments(self):
        return Tournament.query.filter(game_id=self.game_id).all()


class Tournament:
    ...



# Código cliente
player = Player(id=1)
print(player.tournaments(1))
```

**Solução:**

```language-python
class Player:

    # ...

    def tournaments(self, game_id):
        '''Aqui removemos o middle man PlayerGame da consulta,
        fazendo-a diretamente em Tournament.

        Com isso simplificamos o nosso código e removemos uma consulta.
        '''
        return Tournament.query.filter(game_id=game_id, user_id=self.id).all()


class Tournament:
    ...


# Código cliente
player = Player(id=1)
print(player.tournaments(1))
```

#### Data Clumps

> Ocorre quando um grupo de variáveis (como o endereço de entrega do exemplo que veremos abaixo) é passado junto como parâmetro em várias partes do programa. É indicativo de que esses grupos devem ser transformados em suas próprias classes.

**Exemplo:**

Imagine que você tem um aplicativo para uma hamburgueria local, que só faz entregas na própria cidade. Nesta plataforma queremos registrar uma pessoa com seu nome e endereço para facilitar as entregas.

```language-python
class User:

    def __init__(self, name, street, number, district):
        '''Você nunca vai passar a rua sem passar também o número e o bairro!'''
        self.name = name
        self.address_street = street
        self.address_number = number
        self.address_district = district
```

**Solução:**

```language-python
class Address:

    def __init__(self, street, number, district):
        '''As informações que nunca vem separadas são uma entidade separada agora.'''
        self.street = street
        self.number = number
        self.district = district

class User:

    def __init__(self, name, address):
        self.name = name
        self.address = address
```


🧰 Se quiser conhecer outros code smells, você pode consultar o [Refactoring Guru](https://refactoring.guru/refactoring/smells) {: .external-link target="_blank" rel="noreferrer noopener" } também!

---

## Vamos fazer juntos

###### Tempo sugerido para realização: 80 minutos

Vamos para o Slack, onde estará disponível o link da nossa aula ao vivo de hoje.

---

## Exercícios

###### Tempo sugerido para realização: 100 minutos

<%= versioning_your_code(@conn) %>

---

### Agora a prática

Vamos colocar tudo o que vimos até agora em prática. Em todos os exercícios, crie funções para solucionar os problemas.

**Exercício 1:** Abaixo temos parte da implementação de um jogo do mundo de _Star Wars_. Porém esse código está com um erro. Encontre-o e corrija-o, sem alterar o código das classes de personagens (`Soldier` e `Jedi`).

```language-python
class Soldier:
    def __init__(self, level):
        self.level = level

    def attack(self):
        return self.level * 1


class Jedi:
    def __init__(self, level):
        self.level = level

    def attackWithSaber(self):
        return self.level * 100


class StarWarsGame:
    def __init__(self, character):
        self.character = character

    def fight_enemy(self):
        print(f"You caused {self.character.attack()} of damage in the enemy")


StarWarsGame(Soldier(5)).fight_enemy()
StarWarsGame(Jedi(20)).fight_enemy()
```

**Exercício 2:** Dado o código abaixo de um baralho e suas cartas, você deve transformá-lo em um iterador sequencial, que fornece as cartas em sua ordem tradicional, começando de `<A de copas>` até `<K de paus>`.

```language-python
class Carta:
    def __init__(self, valor, naipe):
        self.valor = valor
        self.naipe = naipe

    def __repr__(self):
        return '<%%s de %s>' % (self.valor, self.naipe)

class Baralho:
    naipes = 'copas ouros espadas paus'.split()
    valores = 'A 2 3 4 5 6 7 8 9 10 J Q K'.split()

    def __init__(self):
        self._cartas = [
            Carta(valor, naipe)
            for naipe in self.naipes
            for valor in self.valores
        ]

    def __len__(self):
        return len(self._cartas)
```


**Exercício 3:**  Com o baralho tradicional pronto, implemente agora uma subclasse de `Baralho` chamada `BaralhoInverso`, que produz um iterador para fornecer as cartas na ordem inversa, ou seja, sem embaralhar, a primeira carta deve ser o `<K de paus>` em vez do `<A de copas>`, como acontece na implementação atual.

**Exercício 4:** Agora que você tem duas formas diferentes de dar cartas para o seu baralho, refatore o código para não precisar mais de dois baralhos e dois iteradores isolados, mas sim usar um único iterador com duas estratégias diferentes de iteração.

**Dica:** Você pode receber a estratégia na inicialização do baralho e passá-la para frente no `__iter__`.

**Exercício 5:** Imagine que você tem a implementação de uma classe capaz renderizar imagens através de uma interface que utiliza o método `draw`. Porém, no momento ela só suporta formato PNG e você também precisa ser capaz de renderizar imagens em SVG. Altere o código sem modificar a classe `SvgImage`, para que isso seja possível.

**Dica:** Se você garantir que a imagem SVG seja renderizada utilizando a mesma interface que a imagem PNG, a imagem se tornará compatível.

```language-python
from abc import ABC, abstractmethod


class PngInterface(ABC):
    @abstractmethod
    def draw(self):
        raise NotImplementedError


class PngImage(PngInterface):
    def __init__(self, png_path):
        self.png_path = png_path
        self.format = "raster"

    def draw(self):
        print(f"Drawing PNG {self.png_path} with {self.format}")


class SvgImage:
    def __init__(self, svg_path):
        self.svg_path = svg_path
        self.format = "vector"

    def get_image(self):
        return f"SVG {self.png_path} with {self.format}"
```

**Exercício 6:** Suponha que você está trabalhando em um sistema de orçamentos que faz cálculos de impostos e precisa ser refatorado para adicionar novos, que no caso são o `PIS` (0,65%) e o `COFINS` (3%). Mas durante a refatoração, você se depara com uma má prática de código. Encontre essa má prática e a solucione em conjunto com a refatoração.

```language-python
class Orcamento:
    def __init__(self, valor):
        self.valor = valor

    def calcular_imposto(self, imposto):
        if imposto == 'ISS':
            return self.__calcular_iss()
        elif imposto == 'ICMS':
            return self.__calcular_icms()

    def __calcular_iss(self):
        return self.valor * 0.1

    def __calcular_icms(self):
        return self.valor * 0.06

orcamento = Orcamento(1000)
print(f"ISS: {orcamento.calcular_imposto('ISS')}")
print(f"ICMS: {orcamento.calcular_imposto('ICMS')}")
```

**Exercício 7:** Em um sistema de compras online, temos um código que efetua a compra do pedido. Este código possui _code smells_ e precisa ser refatorado. Qual é o _code smell_? Efetue a refatoração do código.

```language-python
class Order:
    def __init__(
        self,
        items,
        credit_card_name,
        credit_card_number,
        credit_card_month,
        credit_card_year,
        credit_card_security_code,
    ):
        self.items = items
        self.credit_card_name = credit_card_name
        self.credit_card_number = credit_card_number
        self.credit_card_month = credit_card_month
        self.credit_card_year = credit_card_year
        self.credit_card_security_code = credit_card_security_code

    # ...
```

---

## Recursos adicionais (opcional)

- [Eduardo Mendes - Padrões de Projeto](https://www.youtube.com/watch?v=hVOP_XR9gEw&list=PLOQgLBuj2-3IPHFlBmqhtbM4vLJg9tob4) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Design Patterns](https://wiki.c2.com/?DesignPatterns) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Martin Fowler - Code Smells](https://martinfowler.com/bliki/CodeSmell.html) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Ana Paula Gomes - Code Smells & Refactoring – Who you gonna call?](https://youtu.be/f-3EKzjZ0KA) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
