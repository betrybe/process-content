## Gabarito dos exercícios

A seguir encontra-se uma sugestão de solução para os exercícios propostos.

**Exercício 1:** Lembra do exercício da TV que já abstraímos? Hoje vamos implementar ele, porém com algumas modificações. Veja o diagrama abaixo:

<%= figure(%{src: "/computer-science/poo/oo-na-pratica/images/tv-uml.png", class: "text-center rounded mx-auto d-block", width: "auto", height: "auto", caption: "**Diagrama de classes da TV**"}) %>

Atributos:

- `volume` - será inicializado com um valor de 50 e só pode estar entre 0 e 99;

- `canal` - será inicializado com um valor de 1 e só pode estar entre 1 e 99;

- `tamanho` - será inicializado com o valor do parâmetro;

- `ligada` - será inicializado com o valor de `False`, pois está inicialmente desligado.

Todos os atributos devem ser privados.

Métodos:

- `aumentar_volume` - aumenta o volume de 1 em 1 até o máximo de 99;

- `diminuir_volume` - diminui o volume de 1 em 1 até o mínimo de 0;

- `modificar_canal` - altera o canal de acordo com o parâmetro recebido e deve lançar uma exceção (`ValueError`) caso o valor esteja fora dos limites;

- `ligar_desligar` - alterna o estado da TV entre ligado e desligado (`True`/`False`).

_Solução:_

```language-python
class TV:
    def __init__(self, tamanho):
        self.__volume = 50
        self.__canal = 1
        self.__tamanho = tamanho
        self.__ligada = False

    def aumentar_volume(self):
        if self.__volume <= 99:
            self.__volume += 1

    def diminuir_volume(self):
        if self.__volume >= 0:
            self.__volume -= 1

    def modificar_canal(self, canal):
        if canal <= 1 or canal >= 99:
            raise ValueError('Canal indisponível')

        self.__canal = canal

    def ligar_desligar(self):
        self.__ligada = not self.__ligada
```

**Exercício 2:** Defina uma classe `Estatistica` que calcule média, mediana e moda de uma lista de números.

🐦 Dica: Utiliza métodos de classe.

<%= figure(%{src: "/computer-science/poo/oo-na-pratica/images/estatistica-uml.png", class: "text-center rounded mx-auto d-block", width: "auto", height: "auto", caption: "**Diagrama de classes da Estatistica**"}) %>

_Solução:_

```language-python
from collections import Counter


class Estatistica:
    @classmethod
    def media(cls, numbers):
        return sum(numbers) / len(numbers)

    @classmethod
    def mediana(cls, numbers):
        numbers.sort()
        index = len(numbers) // 2
        if len(numbers) % 2 == 0:
            return (numbers[index - 1] + numbers[index]) / 2

        return numbers[index]

    @classmethod
    def moda(cls, numbers):
        number, _ = Counter(numbers).most_common()[0]
        return number
```

**Exercício 3:** Que tal agora relembrarmos o exercício das figuras geométricas? Implemente o diagrama de classes abaixo.

<%= figure(%{src: "/computer-science/poo/oo-na-pratica/images/figuras-geometricas-uml.png", class: "text-center rounded mx-auto d-block", width: "auto", height: "auto", caption: "**Diagrama de classes das figuras geométricas**"}) %>

_Solução:_

```language-python
from abc import ABC, abstractmethod
from math import pi as PI


class FiguraGeometrica(ABC):
    @abstractmethod
    def area(self):
        raise NotImplementedError

    @abstractmethod
    def perimetro(self):
        raise NotImplementedError


class Quadrado(FiguraGeometrica):
    def __init__(self, lado):
        self.lado = lado

    def area(self):
        return self.lado * self.lado

    def perimetro(self):
        return 4 * self.lado


class Retangulo(FiguraGeometrica):
    def __init__(self, base, altura):
        self.base = base
        self.altura = altura

    def area(self):
        return self.base * self.altura

    def perimetro(self):
        return 2 * (self.base + self.altura)


class Circulo(FiguraGeometrica):
    def __init__(self, raio):
        self.raio = raio

    def area(self):
        return PI * self.raio * self.raio

    def perimetro(self):
        return 2 * PI * self.raio
```

**Exercício 4:** Implemente um sistemas de logs por nível de severidade, seguindo o diagrama abaixo.

<%= figure(%{src: "/computer-science/poo/oo-na-pratica/images/log-uml.png", class: "text-center rounded mx-auto d-block", width: "auto", height: "auto", caption: "**Diagrama de classes do sistema de logs**"}) %>

**Classe Log**

Atributos:

- `manipuladores` - Será inicializado com um conjunto de subclasses de `ManipuladorDeLog`;

Métodos:

- `adicionar_manipulador` - adiciona um manipulador ao conjunto de manipuladores do gerenciamento de logs (`Log`);

- `info` - dispara logs com nível de severidade `"INFO"`;

- `alerta` - dispara logs com nível de severidade `"ALERTA"`;

- `erro` - dispara logs com nível de severidade `"ERRO"`;

- `debug` - dispara logs com nível de severidade `"DEBUG"`;

- `__log` - dispara os logs formatados para todos os manipuladores (invocado para cada nível de severidade, para evitar duplicação de código);

- `__formatar` - formata os logs de acordo com o padrão "[ERRO - 01/01/2020 13:00:00]: ZeroDivisionError: division by zero";

A interface de manipulação de logs deve utilizar métodos de classe.

🐦 Dica: Você pode utilizar a função `print` em tela ou em arquivo (que pode ter um nome padrão).

_Solução:_

```language-python
from abc import ABC, abstractmethod
from datetime import datetime


class ManipuladorDeLog(ABC):
    @classmethod
    @abstractmethod
    def log(cls, msg):
        raise NotImplementedError


class LogEmArquivo(ManipuladorDeLog):
    @classmethod
    def log(cls, msg):
        with open('log.txt', 'a') as arquivo:
            print(msg, file=arquivo)


class LogEmTela(ManipuladorDeLog):
    @classmethod
    def log(cls, msg):
        print(msg)


class Log:
    def __init__(self, manipuladores):
        self.__manipuladores = set(manipuladores)

    def adicionar_manipulador(self, manipulador):
        self.__manipuladores.add(manipulador)

    def info(self, msg):
        self.__log('INFO', msg)

    def alerta(self, msg):
        self.__log('ALERTA', msg)

    def erro(self, msg):
        self.__log('ERRO', msg)

    def debug(self, msg):
        self.__log('DEBUG', msg)

    def __log(self, nivel, msg):
        for manipulador in self.__manipuladores:
            manipulador.log(self.__formatar(nivel, msg))

    def __formatar(self, nivel, msg):
        data = datetime.now().strftime('%d/%m/%Y %H:%M:%S')
        return f"[{nivel} - {data}]: {msg}"
```

**Exercício 5:** Implemente um gerenciador de quartos de hotel, simplificado, conforme o diagrama a seguir.

<%= figure(%{src: "/computer-science/poo/oo-na-pratica/images/hotel-uml.png", class: "text-center rounded mx-auto d-block", width: "auto", height: "auto", caption: "**Diagrama de classes do sistema de hoteis**"}) %>

**Classe Quarto**

Atributos:

- `numero` - número do quarto;

- `andar` - andar do quarto;

- `quantidade_de_hospedes` - capacidade de hospedagem do quarto;

- `preco` - valor da hospedagem;

- `reservado` - sempre inicializado com `False`, indica o estado do quarto.

**Classe Hospede**

Atributos:

- `nome` - nome do hospede;

- `cpf` - CPF do hospede (para fins de simplificação, não é necessário validar o CPF).

**Classe Reserva**

Atributos:

- `quarto` - é composto por uma instância de quarto;

- `hospede` - é composto por uma instância de hospede.

**Classe Hotel**

Atributos:

- `nome` - nome do hotel;

- `quartos` - é composto por uma lista de instâncias de quarto;

- `reservas` - é composto por uma lista de instâncias de reserva;

Métodos:

- `check_in` - recebe uma quantidade indefinida de hospedes e busca por um quarto disponível com capacidade suficiente. Se houver um quarto disponível, altera o estado do quarto e cria uma reserva para cada hospede. Caso não haja quartos disponíveis deve lançar a exceção `IndexError` com a mensagem "Não há quartos disponíveis para essa quantidade de hospedes";

- `check_out` - recebe uma instância de quarto, alterando seu estado e removendo todas as suas reservas;

- `quartos_disponiveis` - retorna uma lista de quartos disponíveis que comportam uma `quantidade_de_hospedes` (passado por parâmetro), priorizada da menor capacidade de hospedes possível para a maior. Lembre-se, para que um quarto esteja disponível, além de respeitar a capacidade, ele não pode estar reservado.

**Observação:** considere todos os atributos como sendo públicos para fins de simplificação da implementação.

🐦 Dica: Você pode utilizar o método `sorted` com o parâmetro `key`, para definir seu critério de ordenação. E para utilizar um atributo como critério você pode utilizar a função `attrgetter` do módulo `operator`.

_Solução:_

```language-python
from operator import attrgetter


class Quarto:
    def __init__(self, numero, andar, quantidade_de_hospedes, preco):
        self.numero = numero
        self.andar = andar
        self.quantidade_de_hospedes = quantidade_de_hospedes
        self.preco = preco
        self.reservado = False


class Hospede:
    def __init__(self, nome, cpf):
        self.nome = nome
        self.cpf = cpf


class Reserva:
    def __init__(self, quarto, hospede):
        self.quarto = quarto
        self.hospede = hospede


class Hotel:
    def __init__(self, nome, quartos, reservas):
        self.nome = nome
        self.quartos = quartos
        self.reservas = reservas

    def check_in(self, *hospedes):
        try:
            quarto = self.quartos_disponiveis(len(hospedes))[0]
        except (IndexError):
            raise IndexError(
                'Não há quartos disponíveis para essa quantidade de hospedes'
            )
        else:
            quarto.reservado = True
            for hospede in hospedes:
                self.reservas.append(Reserva(quarto, hospede))

    def check_out(self, quarto):
        quarto.reservado = False
        self.reservas = [
            reserva
            for reserva in self.reservas
            if reserva.quarto != quarto
        ]

    def quartos_disponiveis(self, quantidade_de_hospedes):
        return sorted(
            [
                quarto
                for quarto in self.quartos
                if not quarto.reservado and
                quantidade_de_hospedes <= quarto.quantidade_de_hospedes
            ],
            key=attrgetter('quantidade_de_hospedes')
        )
```
