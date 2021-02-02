## O que vamos aprender?

Hoje aprenderemos como testar de forma automatizada nossos programas, verificando se para uma determinada entrada de dados o resultado foi o esperado.

Como erros podem acontecer, vamos testá-los também.

Além disso, ainda aprenderemos a substituir componentes para facilitar testes que envolvam recursos externos.

<%= figure(%{src: "/computer-science/python/testes/images/tests.gif", caption: "Impressora imprimindo página de teste.", class: "text-center rounded mx-auto d-block"}) %>

### Você será capaz de

- Escrever testes automatizados utilizando a linguagem **Python**;

- Verificar a ocorrência de erros esperados utilizando testes automatizados;

- Criar contextos para execução de testes automatizados;

- Modificar componentes do software para evitar a utilização de recursos externos.

---

## Por que isso é importante?

Testes são importantes na automação da verificação do funcionamento correto de um algoritmo, com o propósito de evitar que erros se propaguem até a pessoa usuária final.
É importante ressaltar que testes automatizados **não evitam _bugs_**, porém ajudam a preveni-los.

Em empresas, geralmente, quando você entrega uma tarefa, ela deve passar por testes automatizados, validando que o requisito foi satisfeito.

> Um código sem testes é um código ruim. Não importa quão bem ele foi escrito - Michael Feathers

---

## Conteúdos

###### Tempo sugerido para realização: 80 minutos

### Testes automatizados

Quem nunca arrumou um problema em um código e acabou fazendo-o deixar de funcionar para outro cenário? Ou ficou horas testando as mais diversas condições para um algoritmo e no meio do caminho teve de mexer no código e recomeçar tudo novamente. 😁

Através de testes automatizados, a pessoa desenvolvedora é capaz de identificar mais facilmente um _bug_ ou verificar que alterações do código não afetaram o comportamento esperado do sistema.

Em nosso curso utilizaremos a biblioteca [pytest](https://docs.pytest.org/en/latest/), um _framework_ que facilita a escrita de testes simples, mas capazes de testar funcionalidades complexas em aplicações e bibliotecas.

⚠️ Lembre-se de instalar a biblioteca somente no ambiente virtual do seu projeto.

A instalação é feita através do `pip` utilizando o comando:

```language-bash
python3 -m pip install pytest
```

E podemos verificar utilizando o comando:

```language-bash
python3 -m pytest --version
```

A saída esperada é similar à apresentada abaixo.

```language-bash
This is pytest version 5.3.0, imported from /home/cassiobotaro/projects/gerenciador-tarefas/.venv/lib/python3.8/site-packages/pytest.py
```

📝 Que tal vermos um exemplo?

> codigo.py

```language-python
def is_odd(number):
    'Retorna True se um número é verdadeiro, senão False.'
    return number % 2 != 0
```

> test_codigo.py

```language-python
from codigo import is_odd


def test_is_odd_when_number_is_odd_returns_true():
    'Para um número ímpar a função deve retornar o valor True'
    assert is_odd(3) is True


def test_is_odd_when_number_is_even_returns_false():
    'Para um número par a função deve retornar o valor True'
    assert is_odd(2) is False
```

Notem que o nome do arquivo de testes possui o prefixo `test_`, assim como a definição das funções de teste. Isto é necessário para que seus testes sejam descobertos pela ferramenta.

Uma função de teste é similar a qualquer outra, porém tem o proposito de verificar se o resultado obtido foi o mesmo do esperado. No código isto pode ser visto através da utilização da palavra reservada `assert`.

O comando `assert` funciona da seguinte maneira: caso a expressão recebida seja verdadeira (avaliada como `True`), nada acontece, porém caso seja falsa (avaliada como `False`), uma exceção do tipo `AssertionError` é lançada. A `pytest` captura este erro e tenta apresentar uma comparação entre o esperado e o recebido da melhor maneira possível.

Vamos rodar nossos testes e ver o resultado? Vamos utilizar o comando:

```language-bash
python3 -m pytest
```

<%= figure(%{src: "/computer-science/python/testes/images/tests-running.png", caption: "Testes rodando de forma bem sucedida.", class: "text-center rounded mx-auto d-block", width: "100%"}) %>

> 💡Experimente modificar estes testes para uma falha e veja o resultado.

### Testando falhas

Erros acontecem e nem sempre são inesperados. O **Python** utiliza de exceções para sinalizar que ocorreram erros durante a execução de um código e que nem sempre são fatais.

Podemos escrever testes que verificam que um erro **deve** ocorrer a partir de uma determinada entrada.

📝 Um exemplo pode ser visto abaixo:

> codigo.py

```language-python
# ...

def divide(a_number, other_number):
    "Retorna a divisão de a_number por other_number"
    return a_number / other_number
```

> test_codigo.py

```language-python
import pytest
from codigo import is_odd, divide

# ...

def test_divide_when_other_number_is_zero_raises_an_exception():
    with pytest.raises(ZeroDivisionError, match="division by zero"):
        divide(2, 0)
```

Utilizamos a função `raises` da `pytest`, que verifica se a exceção ocorreu. Caso contrário, ela lança um `AssertionError`, indicando que o teste não passou. Podemos verificar também se o texto retornado na exceção é o esperado, através do parâmetro `match`, que pode receber uma expressão regular. No exemplo, temos uma divisão por zero, que lança a exceção esperada, e o teste passa com sucesso.

### Um pouco de contexto

Quando escrevemos testes, pensamos em cenários distintos que podem ocorrer ao nosso sistema: "dado um arquivo com as seguintes linhas", "visto que temos um banco de dados com um dado registro" ou "a partir de um cliente web". Às precondições ou estados necessários para a execução de um teste, damos o nome de `test fixture` ou apenas `fixture`.

Cada teste pode ter seu próprio cenário (contexto) ou compartilhá-lo com outros testes.

> test_codigo.py

```language-python
# get_most_ordered_dish_per_costumer é uma função que retorna o prato mais pedido por uma
# determinada pessoa cliente, considerando que os pedidos estão em uma lista.

# get_order_frequency_per_costumer é uma função que retorna a frequência que uma determinada
# pessoa cliente pede um determinado prato , considerando que os pedidos estão em uma lista.


# uma fixture utilizando a biblioteca pytest
# é definida utilizando a sintaxe abaixo
@pytest.fixture
def orders():
    """Nosso cenário (contexto) temos os seguintes pedidos"""
    return [
        {"customer": "maria", "order": "pizza", "day": "terça-feira"},
        {"customer": "joao", "order": "hamburger", "day": "terça-feira"},
        {"customer": "maria", "order": "pizza", "day": "quarta-feira"},
        {"customer": "maria", "order": "hamburger", "day": "quinta-feira"},
    ]

# estamos adicionando a fixture orders ao teste
# ou seja temos um contexto onde os pedidos são os definidos anteriormente
def test_get_most_ordered_dish_per_costumer_when_customer_is_maria(orders):
    assert get_most_ordered_dish_per_costumer(orders, "maria") == "pizza"

# novamente adicionamos um cenário (contexto) ao teste onde os pedidos realizados são os
# definidos na fixture
def test_get_order_frequency_per_costumer_when_customer_is_joao_and_order_is_pizza(orders):
    assert get_order_frequency_per_costumer(orders, "joao", "pizza") == 0

def test_get_order_frequency_per_costumer_when_customer_is_maria_and_order_is_hamburger(orders):
    assert get_order_frequency_per_costumer(orders, "maria", "hamburger") == 1
```

É importante ressaltar que este contexto poderia ser a abertura de uma conexão com o banco de dados, uma referência à conexão a um cliente web, um arquivo temporário ou qualquer outro contexto.

### Dublês de teste

<%= figure(%{src: "/computer-science/python/testes/images/double.gif", caption: "Mock, um componente que se comporta como outro.", class: "text-center rounded mx-auto d-block", width: "100%"}) %>

Em testes automatizados (de unidade), é desejado que cada teste não interfira no estado manipulado por outro teste, e também que recursos externos (arquivos, internet, banco de dados) não atrapalhem a sua execução. Por isso, é muito comum a utilização de dublês de testes para simular estes recursos externos.

Estes componentes simulados de software são chamados, de forma genérica, de _mock_, mas existem diversas técnicas específicas de simulações que nos ajudam a escrever os testes.

Podemos substituir componentes para que retornem um determinado valor simulado ou podemos substituir os componentes por objetos falsos que registram as informações sobre sua invocação como o número de vezes em que foram chamados ou os parâmetros com o qual foram chamados.

Na literatura encontramos as técnicas de dublê com os nomes `mocks`, `fakes`, `stubs` e `spy`, e de uma forma bem resumida podemos defini-las:

- **fakes:** objetos que possuem implementações funcionais, porém normalmente simplificadas;

- **mocks:** são pré programados para verificarem as chamadas das funções que receberem;

- **stubs:** proveem respostas predefinidas;

- **spies:** são como stubs, mas também armazenam informações de como foram chamados.

Caso queira mais detalhes, dê uma olhada no  [artigo](https://martinfowler.com/bliki/TestDouble.html) {: .external-link target="_blank" rel="noreferrer noopener" }
do Martin Fowler sobre o assunto ou no material complementar sobre dublês de testes que se encontra na seção de [recursos adicionais](#recursos-adicionais-opcional).

Vamos analisar dois cenários e escrever seus respectivos testes utilizando dublês, evitando assim a dependência externa a um arquivo real.

No primeiro cenário nós temos nossa dependência externa (o arquivo) sendo recebido como parâmetro.

> pokemon.py

```language-python
import json


def retrieve_pokemons_by_type(type, reader):
    # lê o conteudo de reader e o transforma de json
    # para dicionário
    pokemons = json.load(reader)["results"]
    # filtra somente os pokemons do tipo escolhido
    pokemons_by_type = [
        pokemon for pokemon in pokemons if type in pokemon["type"]
    ]
    return pokemons_by_type
```

Vamos utilizar uma técnica onde substituiremos a abertura do nosso arquivo real por um objeto que possui as implementações funcionais de um arquivo (método `read`, necessário na operação de leitura). Este objeto será alocado na memória, "simulando" nosso arquivo real.

> test_pokemon.py

```language-python
from pokemon import retrieve_pokemons_by_type
from io import StringIO


def test_retrieve_pokemons_by_type():
    # definimos um pokemon do tipo grama
    grass_type_pokemon = {
        "national_number": "001",
        "evolution": None,
        "name": "Bulbasaur",
        "type": ["Grass", "Poison"],
        "total": 318,
        "hp": 45,
        "attack": 49,
        "defense": 49,
        "sp_atk": 65,
        "sp_def": 65,
        "speed": 45,
    }
    # definimos também um pokemon do tipo água
    water_type_pokemon = {
        "national_number": "007",
        "evolution": None,
        "name": "Squirtle",
        "type": ["Water"],
        "total": 314,
        "hp": 44,
        "attack": 48,
        "defense": 65,
        "sp_atk": 50,
        "sp_def": 64,
        "speed": 43,
    }
    # criamos um arquivo em memória que o seu conteúdo são os dois pokemons
    fake_file = StringIO(
        json.dumps({"results": [grass_type_pokemon, water_type_pokemon]})
    )
    # quando pesquisamos por pokemons do tipo grama,
    # o pokemon do tipo água não deve ser retornado
    assert retrieve_pokemons_by_type("Grass", fake_file) == [
        grass_type_pokemon
    ]
```

Um segundo cenário é onde a função espera o nome de um arquivo e a abertura do mesmo acontece dentro da função.

> pokemon.py

```language-python
import json


def retrieve_pokemons_by_type(type, filepath):
    with open(filepath) as file:
        pokemons = json.load(file)["results"]
        pokemons_by_type = [
            pokemon for pokemon in pokemons if type in pokemon["type"]
        ]
        return pokemons_by_type
```

Para escrever este teste, vamos aproveitar da natureza dinâmica da linguagem e substituir o método `open` em tempo de execução por um objeto `mock_open`, que já vem embutido na linguagem e se comporta como o `open`, retornando o que foi definido em `read_data` como seu conteúdo. Um detalhe interessante é que esse objeto obtido através da função `mock_open` também possui a capacidade de armazenar informações sobre como foram as chamadas de seus métodos e os parâmetros recebidos.

> test_pokemon.py

```language-python
import json
from unittest.mock import mock_open, patch
from pokemon import retrieve_pokemons_by_type

def test_retrieve_pokemons_by_type():
    # definimos um pokemon do tipo grama
    grass_type_pokemon = {
        "national_number": "001",
        "evolution": None,
        "name": "Bulbasaur",
        "type": ["Grass", "Poison"],
        "total": 318,
        "hp": 45,
        "attack": 49,
        "defense": 49,
        "sp_atk": 65,
        "sp_def": 65,
        "speed": 45,
    }
    # definimos também um pokemon do tipo água
    water_type_pokemon = {
        "national_number": "007",
        "evolution": None,
        "name": "Squirtle",
        "type": ["Water"],
        "total": 314,
        "hp": 44,
        "attack": 48,
        "defense": 65,
        "sp_atk": 50,
        "sp_def": 64,
        "speed": 43,
    }
    pokemon_json_content = json.dumps({"results": [grass_type_pokemon, water_type_pokemon]})
    # substituímos a função padrão do python open por mock_open
    # uma versão que se comporta de forma parecida, porém simulada
    with patch("builtins.open", mock_open(read_data=pokemon_json_content)):
        # repare que o nome do arquivo não é importante aqui
        # a esses parâmetros não utilizados damos o nome de dummies
        # como neste contexto alteramos o open pelo mock_open,
        # o argumento "dummy" poderia ser substituído por qualquer coisa, já que não será utilizado pela função
        assert retrieve_pokemons_by_type("Grass", "dummy") == [
            grass_type_pokemon
        ]
```

A primeira abordagem torna o código menos acoplado a um arquivo e nos permite utilizar qualquer objeto (que tenha o método reader) em seu lugar. Assim essa função pode ser reutilizável, por exemplo, para ler _pokemons_ a partir de uma requisição web ou outra fonte.

> 💡 Testes de unidade são muito importantes, mas não se esqueça de testar também a integração de suas funções e a funcionalidade como um todo.

---

## Vamos fazer juntos

###### Tempo sugerido para realização: 80 minutos

Agora que já passamos pelos conceitos mais básicos, está na hora de colocarmos a mão na massa com a nossa aula ao vivo!

Bora pro Slack, onde o link estará disponível. 😉

---

## Exercícios

###### Tempo sugerido para realização: 140 minutos

<%= versioning_your_code(@conn) %>

---

### Agora a prática

Vamos colocar tudo o que vimos até agora em prática. Em todos os exercícios, resolva os problemas com testes automatizados (ao menos 4 deles por exercício) e prevenindo possíveis erros na entrada de dados e na execução do programa.

---

**Exercício 1:** Escreva um programa que retorne uma lista com os valores numéricos de 1 a N, mas com as seguintes **exceções**:

   - Números divisíveis por 3 deve aparecer como 'Fizz' ao invés do número;

   - Números divisíveis por 5 devem aparecer como 'Buzz' ao invés do número;

   - Números divisíveis por 3 e 5 devem aparecer como 'FizzBuzz' ao invés do número';

   - Ex: `3 -> [1, 2, "Fizz"]`.

**Exercício 2** Em alguns lugares é comum lembrar um número do telefone associando seus dígitos a letras. Dessa maneira a expressão MY LOVE significa 69 5683. Claro que existem alguns problemas, uma vez que alguns números de telefone não formam uma palavra ou uma frase e os dígitos 1 e 0 não estão associados a nenhuma letra.

Sua tarefa é ler uma expressão e encontrar o número de telefone correspondente baseado na tabela abaixo. Uma expressão é composta por letras maiúsculas (A-Z), hifens (-) e os números 1 e 0.

```language-md
Letras  ->  Número
ABC     ->  2
DEF     ->  3
GHI     ->  4
JKL     ->  5
MNO     ->  6
PQRS    ->  7
TUV     ->  8
WXYZ    ->  9
```

Exemplo de entrada:

```language-md
1-HOME-SWEET-HOME
MY-MISERABLE-JOB
```

Saídas correspondentes:

```language-md
1-4663-79338-4663
69-647372253-562
```

_Curiosidade_: A frase "The quick brown fox jumps over the lazy dog" é um pantograma (frase com sentido em que são usadas todas as letras do alfabeto de determinada língua) da língua inglesa.

Verifique casos como entrada maior que 30 caracteres, vazia e com caracteres inválidos.

**Exercício 3** Faça uma função que valide um e-mail nos seguintes critérios abaixo, lançando uma exceção quando o valor for inválido. Endereços de email válidos devem seguir as seguintes regras:

   - Devem seguir o formato nomeusuario@nomewebsite.extensao;

   - O nome de usuário deve conter somente letras, dígitos, traços e _underscores_;

   - O nome de usuário deve iniciar com letra;

   - O nome do website deve conter somente letras e dígitos;

   - O tamanho máximo da extensão é três.

🦜 As funções `isalpha` e `isdigit` podem ser utilizadas para verificar se uma letra ou palavra são compostas de somente caracteres ou dígitos. _Exemplo_: "1".isaplha() -> False , "a".isalpha() -> True

**Exercício 4** Baseado no exercício anterior, escreva uma função que, dado uma lista de emails, deve retornar somente os emails válidos. Caso uma exceção ocorra, apenas a escreva na tela.

Exemplo: `["nome@dominio.com", "errad#@dominio.com", "outro@dominio.com"] -> ["nome@dominio.com", "outro@dominio.com"]`

---

## Recursos adicionais (opcional)

- [Guia do mochileiro para Python - tests](https://python-guide-pt-br.readthedocs.io/pt_BR/latest/writing/tests.html) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Live de Python - Testes com Python](https://www.youtube.com/watch?v=5hL9T3jintE) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Unit testing in Visual Studio](https://docs.microsoft.com/pt-br/visualstudio/python/unit-testing-python-in-visual-studio?view=vs-2019) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Dublês de teste](https://cassiobotaro.dev/post/dubles-de-teste/) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
