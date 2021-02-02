## O que vamos aprender?

Hoje, vamos aprender a estruturar um projeto Python, adicionando também um novo elemento aos nossos programas. Aprenderemos como adicionar entrada e saída de dados e a manipular alguns tipos de arquivos, como **CSV** e **JSON**. Assim, poderemos persistir dados.

---

### Você será capaz de:

- Preparar um ambiente de projeto em Python, definindo sua estrutura de diretórios e criando ambientes isolados;

- Instalar bibliotecas de terceiros num projeto Python;

- Entender como lidar com exceções em Python;

- Receber dados de pessoas usuárias, assim como enviá-los de volta;

- Ler e escrever arquivos no formato tabular `CSV`;

- Serializar e dessearalizar dados no formato `JSON`.

---

## Por que isso é importante?

No dia a dia, poderemos encontrar aplicações grandes e complexas, que necessitam de uma melhor estruturação do código-fonte. A fim de facilitar a manutenção, é uma boa prática dividir um programa em arquivos menores. Por esse motivo, é importante entender o que são ***módulos*** e ***pacotes*** e como eles funcionam em uma aplicação.

Já os dados, são uma das coisas mais valiosas para uma empresa, porque podem se tornar informação. A análise desses dados é cada vez mais decisiva para o sucesso ou fracasso de um negócio. A tomada de decisão pode se embasar em informações relevantes como, por exemplo, o nível de satisfação do cliente (CSAT) e o seu custo de aquisição para a empresa (CAC).

Aprendendo a manipular arquivos, poderemos persistir dados, recuperá-los e analisá-los posteriormente. Quando dizemos que vamos persistir dados, significa que iremos armazenar/salvar os dados para serem recuperados quando necessários no futuro.

> Vivemos em um mar de informações. Porém afogados na ignorância.

Além disso, integração entre sistemas é algo que uma pessoa programadora provavelmente vai se deparar em algum momento de sua carreira. Por isso, é importante conhecer formatos como o **JSON**, largamente utilizado para comunicação entre sistemas, e o **CSV**, amplamente utilizado no contexto da Ciência de Dados.

---

## Conteúdos

###### Tempo sugerido para realização: 80 minutos

### Estruturando uma aplicação

##### Módulos

Um ***módulo*** é um arquivo que contém definições e instruções em Python. O nome do arquivo é um nome acrescido de `.py`. Dentro de um outro arquivo python, você pode importar um módulo e ter acesso às suas funções, classes, etc.

Em linhas gerais, todo arquivo que é escrito com a linguagem Python e com a extensão `.py` é considerado um módulo.

Observe o arquivo `my_math.py` abaixo:

```language-python
def sum(a, b):
  return a + b


def pot(a, b):
  return a ** b


print(sum(2, 2))
print(pot(2, 3))
```

Este arquivo é um **módulo** Python, que pode ser executado como script, com o comando `python3 my_math.py`. Se isso ocorrer, o retorno será, em ordem, 4 e 8, devido às chamadas das funções dentro dos métodos `print()`.

Entretanto as funções que criamos neste arquivo podem ser reaproveitadas por outros módulos, através da declaração `import`.

À medida que fomos avançando, esses conceitos ficarão cada vez mais claros.

##### Pacotes 📦

***Pacotes*** são **módulos** Python que contêm outros **módulos** e/ou **pacotes**, comumente separados por responsabilidades similares. Na prática, um **pacote** é um diretório que pode conter vários **módulos** (arquivos de extensão `.py`) e/ou outros **pacotes**.

Exemplo de tipos diferentes de `imports` de **pacotes**:

```language-python
import http  # importa o pacote http como um módulo

from http import client  # importa o módulo client do pacote http

from http.client import HTTP_PORT  # importa a constante HTTP_POST do módulo client do pacote http
```

Tudo isso ficará mais perceptível, à medida que formos avançando no conteúdo.

##### Ambiente Virtual

Imagine que, em uma máquina, há um projeto Python que tem alguns pacotes de terceiros instalados e, dentre eles, há uma biblioteca na versão 1.4. Imagine também que, na mesma máquina, um novo projeto é iniciado e ele precisa da mesma biblioteca, mas, dessa vez, na versão 2.0. O que fazer? As versões são compatíveis? Se eu atualizar o sistema, a versão antiga vai continuar a funcionar?

O `venv` entra como resposta à essas perguntas! Ele é um módulo, já embutido na linguagem, que serve para isolar ambientes entre projetos. Ou seja, eu consigo ter dois projetos rodando, em dois ambientes diferentes, com versões diferentes de uma mesma biblioteca.

Na prática, o que vamos fazer é instalar as bibliotecas em um diretório, que está relacionado ao projeto. Assim, cada projeto pode ter suas próprias bibliotecas na versão que quiser. A ideia é a mesma do `npm` que vocês já vêm usando.

O comando para criação deste ambiente isolado é `python3 -m venv .venv`, sendo que `.venv` é o nome do ambiente isolado. Este comando deve ser executado na raiz do projeto.

> 💡 Caso o `venv` não esteja instalado, utilize o comando `sudo apt install python3-venv`.

Este ambiente isolado será visto como um diretório criado na raiz do projeto. O ponto na frente do nome faz com que o diretório fique oculto.

Depois de criado, temos de ativar este ambiente para usá-lo. Isto é importante, pois sempre que decidirmos trabalhar neste projeto devemos repetir este passo.

```language-bash
$ source .venv/bin/activate
```

<%= figure(%{src: "/computer-science/python/entrada-saida/images/environment.png", caption: "Criação de um ambiente virtual.", class: "text-center rounded mx-auto d-block", width: "100%"}) %>

Você pode conferir se o comando de ativação do ambiente virtual deu certo com o seguinte comando:

```language-bash
$ which python3
```

O resultado será o caminho para a pasta onde você criou seu ambiente virtual (`pwd`), acrescido de `.venv/bin/python3`.

Pronto, agora estamos preparados e preparadas para instalar as bibliotecas que precisaremos para nossos projetos.

### Entrada e Saída

Funções podem receber argumentos das pessoas que usam o programa, processá-los e retornar algum valor. Mas como estes argumentos chegam a elas? E o resultado do nosso processamento, como exibi-lo para a pessoa utilizando nossa aplicação?

De modo geral, podemos dizer que um programa seria menos útil se não pudéssemos coletar valores de pessoas usuárias e muito menos agradável de se utilizar caso o resultado apresentado fosse pouco legível.

Existem algumas maneiras de nos comunicarmos com o exterior do programa em **Python** para recebermos dados, assim como existem maneiras de melhorar a exibição dos nossos resultados.

#### Entrada

Uma das maneiras que existem de receber valores em nossos programas é através da função `input`, que vem embutida na própria linguagem. Esta função está vinculada a entrada padrão do sistema operacional e tem como parâmetro opcional o `prompt` que, caso seja fornecido, exibirá a mensagem passada para ele em tela. O valor recebido através da função será do tipo texto (`str`):

```language-python
input("Digite uma mensagem:")
```

O programa permanece parado até que algum dado seja fornecido. Isto pode ser feito digitando algum conteúdo, teclando `Enter`, ou podemos também ter os dados redirecionados de um arquivo ou outra fonte. Veja um exemplo de um programa com entrada de dados fornecido pela pessoa usuária:

```language-python
import random

random_number = random.randint(1, 10)  # escolhe um número aleatório entre 1 e 10
guess = ""

while guess != random_number:  # enquanto não adivinhar o número
    guess = int(input("Qual o seu palpite? "))  # pergunte a pessoa usuária um número

print("O número sorteado era: ", guess)
```

> 💡 Fazemos uma conversão do palpite para um número inteiro, pois entrada de dados é sempre `str`.

> 💡 Para rodar o exemplo acima, não crie um arquivo chamado `random` para inserir o código, pois o módulo que estamos importando se chama `random`, e isso pode ocasionar num erro! Lembre-se que, para rodar o código, você deve executar, no terminal, o comando `python3 nome_do_arquivo.py`.

Outra maneira de recebermos valores externos na execução de nossos programas é utilizando o módulo _sys_. Quando executamos um _script_ e adicionamos parâmetros, os mesmos estarão disponíveis através de uma variável chamada `sys.argv`, que é preenchida sem que precisemos fazer nada. Na prática, podemos escrever o conteúdo abaixo em um arquivo e, ao executarmos, passamos alguns parâmetros:

```language-python
import sys


if __name__ == "__main__":
    for argument in sys.argv:
        print("Received -> ", argument)
```

Para executarmos passando os parâmetros utilizaremos o comando:

```language-bash
$ python3 arquivo.py 2 4 "teste"
```

_Saída:_

```language-md
Received ->  arquivo.py
Received ->  2
Received ->  4
Received ->  teste
```

#### Saída

Como já visto, a função `print`, que já vem embutida na linguagem, é a principal função para imprimirmos um valor em "tela". Normalmente esta função escreve na saída padrão do sistema operacional, mas iremos ver que podemos modificar este e outros comportamentos.

Esta função recebe parâmetros de forma variável, ou seja, pode receber nenhum, um, dois ou n parâmetros durante sua invocação.

```language-python
print("O resultado é", 42)  # saída: O resultado é 42
print("Os resultado são", 6, 23, 42)  # saída: Os resultados são 6 23 42
```

Podemos alterar o separador dos argumentos passados, que, por padrão, é um espaço em branco.

```language-python
print("Maria", "João", "Miguel", "Ana")  # saída: Maria João Miguel Ana
print("Maria", "João", "Miguel", "Ana", sep=", ")  # saída: Maria, João, Miguel, Ana
```

Além do separador, podemos também alterar o caractere de fim de linha que, por regra, é uma quebra de linha:

```language-python
print("Em duas ")
print("linhas.")
```

_Saída:_

```language-md
Em duas
linhas.
```

```language-python
print("Na mesma", end="")
print("linha.")
```

_Saída:_

```language-md
Na mesma linha.
```

Já sabemos que erros podem acontecer, e o sistema operacional normalmente espera que um programa escreva seus erros na saída de erros.

Existe um parâmetro que nos permite modificar a saída padrão para a saída de erros:

```language-python
import sys


err = "Arquivo não encontrado"
print(f"Erro aconteceu: {err}", file=sys.stderr)
```

> 💡 Em **Python**, podemos fazer interpolação de variáveis e expressões utilizando [f-string](https://pyformat.info/). Adicionamos um `f` antes das aspas e o valor de saída entre chaves. Essa dica é importante, pois é a maneira mais eficiente de formatar strings.

```language-python
x = 5
y = 3
print(f"{x} / {y} = {x / y:.2f}")  # saída: 5 / 2 = 1.67
# {x} é substituído por 5
# {y} é substituído por 3
# {x / y:.2f} O que vem após os dois pontos são formatadores, como nesse exemplo, duas casas decimais (.2f).
print(f"{x:.^3}")  # saída: ".5."
# . é o caractere utilizado para preencher
# ^ indica que o valor será centralizado
# 3 são o número de caracteres exibidos
```

Antes de prosseguirmos, vamos resolver alguns execícios.

**Exercício 1:** Faça um programa que solicite o nome de uma pessoa usuária e imprima-o na vertical. Exemplo:

```language-md
F
U
L
A
N
O
```

**Exercício 2:** Escreva um programa que receba vários números **naturais** e calcule a soma desses valores. Caso algum valor da entrada seja inválido, por exemplo uma letra, uma mensagem deve ser exibida, na saída de erros, no seguinte formato: "Erro ao somar valores, {valor} é um valor inválido". Ao final, você deve imprimir a soma dos valores válidos.

🦜 Receba os valores em um mesmo `input`, solicitando à pessoa usuária que separe-os com um espaço. Receba os valores no formato `str` e utilize o método `split` para pegar cada valor separado. O método `isdigit`, embutido no tipo `str`, pode ser utilizado para verificar se a string corresponde a um número natural.

### Manipulação de arquivos

Seja para armazenar alguma informação processada ou para manipular imagens, áudios, vídeos ou recuperar dados de uma planilha, precisamos fazer a manipulação de arquivos.

Podemos fazer uma operação de leitura, de escrita ou até de ambas, a depender da nossa necessidade. Porém independentemente da operação executada, é preciso sempre fechar o arquivo após operá-lo.

A função `open` é a responsável por abrir um arquivo, tornando possível sua manipulação. Seu único parâmetro obrigatório é o nome do arquivo. Por padrão, arquivos são abertos somente para leitura, mas podemos modificar isto passando o modo com que vamos abrir o arquivo. No exemplo abaixo, estamos utilizando `mode="w"`, ou seja, estamos abrindo o arquivo para escrita:

```language-python
file = open("arquivo.txt", mode="w")  # ao abrir um arquivo para escrita, um novo arquivo é criado mesmo que ele já exista, sobrescrevendo o antigo.
```

Para escrevermos um conteúdo em um arquivo utilizamos a função `write`:

```language-python
# file = open("arquivo.txt", mode="w")

file.write("nome idade\n")
file.write("Maria 45\n")
file.write("Miguel 33\n")
```

> 💡 Podemos escrever em um arquivo apenas após abrirmos ele.

Assim como podemos redirecionar a saída do nosso programa para a saída de erros, podemos fazer o mesmo redirecionando o conteúdo digitado dentro de `print` para um arquivo. Ou seja, também podemos escrever em um arquivo através do `print`.

```language-python
#
# file.write("Miguel 33\n")


# Não precisa da quebra de linha, pois esse é um comportamento padrão do print
print("Túlio 22", file=file)
```

Para escrever múltiplas linhas podemos utilizar a função `writelines`. Repare que a função espera que cada linha tenha seu próprio caractere de separação (`\n`):

```language-python
#
# print("Túlio 22", file=file)


LINES = ["Alberto 35\n", "Betina 22\n", "João 42\n", "Victor 19\n"]
file.writelines(LINES)
```

Abrimos o arquivo, escrevemos seu conteúdo, vamos então fechá-lo:

```language-python
# file.writelines(LINES)


file.close()
```

Mas por que devemos sempre fechar um arquivo? A resposta vem do sistema operacional. Temos um limite de quantos arquivos podemos abrir de uma só vez, e um erro é lançado quando atingimos esse limite. Vamos ver um código para demonstrar a ocorrência de um erro ao abrir muitos arquivos ao mesmo tempo:

```language-python
arquivos = []
for index in range(10240):
    arquivos.append(open(f"arquivo{index}.txt", "w"))
```

O número que o programa irá falhar pode variar, pois o sistema operacional mantém alguns arquivos abertos para seu próprio uso.

Outro motivo importante para se fechar os arquivos é que normalmente a manipulação de arquivos é feita através de _buffers_. Ou seja, a escrita em disco pode não ser imediata. Quando fechamos o arquivo, garantimos que tudo aquilo que ainda não está escrito seja persistido.

A leitura do conteúdo de um arquivo pode ser feita utilizando a função `read`. Para experimentar, vamos escrever em um arquivo e lê-lo logo em seguida!

```language-python
# escrita
file = open("arquivo.txt", mode="w")
file.write("Trybe S2")
file.close()

# leitura
file = open("arquivo.txt", mode="r")
content = file.read()
print(content)
file.close()  # não podemos esquecer de fechar o arquivo
```

Um arquivo é também um iterável, ou seja, pode ser percorrido em um laço de repetição. A cada iteração, uma nova linha é retornada. Vamos fazer igual ao exemplo anterior, porém dessa vez vamos escrever mais de uma linha!

```language-python
# escrita
file = open("arquivo.txt", mode="w")
LINES = ["Olá\n", "mundo\n", "belo\n", "do\n", "Python\n"]
file.writelines(LINES)
file.close()

# leitura
file = open("arquivo.txt", mode="r")
for line in file:
    print(line)  # não esqueça que a quebra de linha também é um caractere da linha
file.close()  # não podemos esquecer de fechar o arquivo
```

Além de arquivos textuais como os que manipulamos até agora, temos também arquivos binários. Eles são arquivos que contêm uma série de bytes e a sua leitura pode variar de acordo com o arquivo. Nesse caso, devemos acrescentar um `b` ao parâmetro `mode`, indicando que será utilizado o modo binário.

As operações são similares a de um arquivo textual. Porém tanto a escrita quanto a leitura devem ser feitas utilizando bytes.

```language-python
# escrita
file = open("arquivo.dat", mode="wb")
file.write(b"C\xc3\xa1ssio 30")  # o prefixo b em uma string indica que seu valor está codificado em bytes
file.close()

# leitura
file = open("arquivo.dat", mode="rb")
content = file.read()
print(content)  # saída: b'C\xc3\xa1ssio 30'
file.close()  # não podemos esquecer de fechar o arquivo
```

Erros podem acontecer, um arquivo pode não existir, permissões podem faltar e codificações podem falhar. Por isso, temos de garantir que, ainda que um erro ocorra, ainda assim faremos o fechamento do nosso arquivo. Como conseguimos lidar com erros em Python? Vamos agora falar sobre exceções!

### Lidando com exceções

Há pelo menos dois tipos de erros que podem ser destacados: _erros de sintaxe e exceções_.

#### Erros de Sintaxe

Como nós bem sabemos, erros de sintaxe ocorrem quando o código utiliza recursos inexistentes da linguagem, que não consegue interpretá-lo. É como chamar a função `primt` em vez de `print`.

#### Exceções
Já as exceções, ocorrem durante a execução e acabam resultando em mensagem de erro. Veja exemplos de exceções:

```language-python
print(10 * (1 / 0))
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ZeroDivisionError: division by zero
print(4 + spam * 3)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
NameError: name 'spam' is not defined
print('2' + 2)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: can only concatenate str (not "int") to str
```

Observe que, apenas no exemplo acima, podemos observar três exceções: `ZeroDivisionError`, `NameError` e `TypeError`. A lista completa de exceções já embutidas na linguagem pode ser vista [aqui](https://docs.python.org/pt-br/3/library/exceptions.html#bltin-exceptions).

#### Tratamento de exceções

Para tratarmos exceções, utilizamos o conjunto de instruções `try`, com as palavras reservadas `try` e `except`. O funcionamento dessa cláusula ocorre da seguinte forma:

- Se nenhuma exceção ocorrer, a cláusula `except` é ignorada, e a execução da instrução `try` é finalizada.
- Se ocorrer uma exceção durante a execução da cláusula `try`, as instruções remanescentes na cláusula são ignoradas. Se o tipo da exceção ocorrida tiver sido previsto em algum `except`, então essa cláusula será executada.
- Se não existir nenhum tratador previsto para tal exceção, trata-se de uma exceção não tratada e a execução do programa termina com uma mensagem de erro.

Vamos agora ver um exemplo de tratamento de exceções:

```language-python
while True:
    try:
        x = int(input("Please enter a number: "))
        break
    except ValueError:
        print("Oops!  That was no valid number.  Try again...")
```

Cole o código acima no terminal interativo e teste, na prática, como funciona o tratamento de exceções.

#### Lidando com exceções enquanto manipulamos arquivos

Agora cientes de como tratar exceções, podemos nos previnir de possíveis erros que ocorrem quando manipulamos arquivos. Sempre devemos fechar um arquivo e podemos, em um bloco `try`, fazer isso utilizando a instrução `finally` ou `else`. O `finally` é uma outra cláusula do conjunto `try`, cuja finalidade é permitir a implementação de ações de limpeza, que sempre devem ser executadas independentemente da ocorrência de ações. Já o `else` ocorre sempre que todo o `try` for bem sucedido.

```language-python
try:
    arquivo = open("arquivo.txt", "r")
except OSError:
    # será executado caso haja uma exceção
    print("arquivo inexistente")
else:
    # será executado se tudo ocorrer bem no try
    print("arquivo manipulado e fechado com sucesso")
    arquivo.close()
finally:
    # será sempre executado, independentemente de erro
    print("Tentativa de abrir arquivo")
```

Como estamos abrindo o arquivo em modo de leitura, caso ele não exista, uma exceção será levantada, executando as cláusulas `exception` e `finally`. Entretanto se alterarmos o modo para escrita, o arquivo será criado mesmo se inexistente, executando as cláusulas `else` e `finally`.

Este padrão é tão comum, não só em arquivos como em outros recursos que devemos utilizar e liberar ao final, como conexões de banco de dados, por exemplo, que o **Python** tem um mecanismo próprio para lidar com isto.

O `with` é a palavra reservada para gerenciamento de contexto. Este gerenciamento (`with`) é utilizado para encapsular a utilização de um recurso, garantindo que certas ações sejam tomadas independentemente se ocorreu ou não um erro naquele contexto.

A função `open` retorna um objeto que se comporta como um gerenciador de contexto de arquivo que será responsável por abrir e fechar o mesmo. Isto significa que o arquivo possui mecanismos especiais que, quando invocados, utilizando `with`, alocam um determinado recurso, no caso um arquivo, e, quando o bloco for terminado, este recurso será liberado.

```language-python
# Criamos um contexto, limitando o escopo onde o arquivo está aberto.
# O uso do "as" aqui é somente para atribuir o valor utilizado no contexto à variável file
with open("arquivo.txt", "w") as file:
    file.write("Michelle 27\n")
# como estamos fora do contexto, o arquivo foi fechado
print(file.closed)
```

> 💡 Já vimos a utilização de gerenciadores de contexto em testes. Lá, capturamos exceções que ocorrem e verificamos se naquele contexto a exceção lançada era a esperada. Não há um recurso a ser liberado, mas estamos garantindo que uma asserção será feita naquele contexto.

Vamos praticar um pouco?

**Exercício 3:** Dado um arquivo contendo estudantes e suas respectivas notas, escreva um programa que lê todas essas informações e filtre somente as pessoas que estão aprovadas, escrevendo seus nomes em outro arquivo. A nota miníma para aprovação é 6.

_Arquivo:_

```language-md
Marcos 10
Felipe 4
José 6
Ana 10
Maria 9
Miguel 5
```

_Exemplo saída:_

```language-md
Marcos
José
Ana
Maria
```

🦜 A função `split` pode ser utilizada para dividir o nome em uma linha. Ex: line.split -> ["Marcos", "10"]

### Manipulando arquivos JSON

<%= figure(%{src: "/computer-science/python/entrada-saida/images/json-everywhere.png", class: "text-center rounded mx-auto d-block"}) %>

**JSON** é um formato textual muito utilizado para integração de sistemas. Ele é baseado em um subconjunto de regras **JavaScript**, embora seja independente de linguagem.

Por sua legibilidade e tamanho (é bem leve), além da facilidade de leitura e escrita por seres humanos e máquinas, vem sendo bastante utilizado na web e para troca de informações entre sistemas.

Alguns exemplos de utilização incluem comunicação _back-end_ e _front-end_, comunicação com sistemas externos, como por exemplo _gateways de pagamento_, ou também internos como um sistema de autenticação.

A linguagem **Python** já inclui um módulo para manipulação desse tipo de arquivo e seu nome é [`json`](https://docs.python.org/3/library/json.html).

Seus principais métodos para manipulação são: `load`, `loads`, `dump`, `dumps`.

🐭 Para demonstrar de como é feita a manipulação de arquivos **JSON**, vamos utilizar o arquivo [pokemons.json](/computer-science/python/entrada-saida/pokemons.json) que é uma lista de pokemons com suas informações chave.

> 💡 Para fazer o exemplo copie o conteúdo da lista e cole num arquivo `pokemons.json` na raiz do diretório em que estará o seu script.

```language-python
import json  # json é um modulo que vem embutido, porém precisamos importá-lo


with open("pokemons.json") as file:
    content = file.read()  # leitura do arquivo
    pokemons = json.loads(content)["results"]  # o conteúdo é transformado em estrutura python equivalente, dicionário neste caso.
    # acessamos a chave results que é onde contém nossa lista de pokemons

print(pokemons[0])  # imprime o primeiro pokemon da lista
```

A leitura pode ser feita diretamente do arquivo, utilizando o método `load` ao invés de `loads`. O `loads` carrega o `JSON` a partir de um texto e o `load` carrega o `JSON` a partir de um arquivo.

```language-python
import json


with open("pokemons.json") as file:
    pokemons = json.load(file)["results"]

print(pokemons[0])  # imprime o primeiro pokemon da lista
```

A escrita de arquivos no formato **JSON** é similar a escrita de arquivos comum, porém primeiro temos de transformar os dados.

```language-python
import json

# Leitura de todos os pokemons
with open("pokemons.json") as file:
    pokemons = json.load(file)["results"]

# Separamos somente os do tipo grama
grass_type_pokemons = [
    pokemon for pokemon in pokemons if "Grass" in pokemon["type"]
]

# Abre o arquivo para escrevermos apenas o pokemons do tipo grama
with open("grass_pokemons.json", "w") as file:
    json_to_write = json.dumps(
        grass_type_pokemons
    )  # conversão de Python para o formato json (str)
    file.write(json_to_write)
```

Assim como a desserialização, que faz a transformação de texto em formato **JSON** para **Python**, a serialização, que é o caminho inverso, também possui um método equivalente para escrever em arquivos de forma direta.

```language-python
import json

# leitura de todos os pokemons
with open("pokemons.json") as file:
    pokemons = json.load(file)["results"]

# separamos somente os do tipo grama
grass_type_pokemons = [
    pokemon for pokemon in pokemons if "Grass" in pokemon["type"]
]

# abre o arquivo para escrita
with open("grass_pokemons.json", "w") as file:
    # escreve no arquivo já transformando em formato json a estrutura
    json.dump(grass_type_pokemons, file)
```

> 💡 Arquivos JSON não seguem a nomenclatura habitual de leitura e escrita (`write` e `read`), pois são considerados formatos de serialização de dados. Seguem então as mesmas nomenclaturas utilizadas em módulos como [`marshal`](https://docs.python.org/3/library/marshal.html#module-marshal) e [`pickle`](https://docs.python.org/3/library/pickle.html#module-pickle), que também são formatos de serialização.

### Manipulando arquivos CSV

O formato **CSV** (_Comma Separated Values_) é muito comum em exportações de planilhas de dados e base de dados. Foi utilizado por muito tempo antes de sua definição formal e isso acabou gerando uma não padronização neste formato e o surgimento de vários dialetos.

Cada dialeto tem seus próprios delimitadores e caracteres de citação, porém o formato geral é semelhante o suficiente para utilizarmos o mesmo módulo para este processamento.

Ainda que seu nome indique que o delimitador seja a "`,`" (vírgula), existem variações que utilizam "`;`" (ponto e vírgula) ou até mesmo tabulações ("`\t`").

🎲 Sem dúvidas, análise de dados é o que se destaca quando estamos falando sobre manipular arquivos **CSV**.

Vamos analisar então uma base de dados a respeito da balneabilidade da costa baiana. O arquivo que utilizaremos será o [`balneabilidade.csv`](/computer-science/python/balneabilidade.csv).

> 💡 Para fazer o exemplo, cole o arquivo `balneabilidade.csv` na raiz do diretório em que estará o seu script.

O módulo [`csv`](https://docs.python.org/3/library/csv.html), contêm duas principais funções:

- Um leitor (`reader`) que nos ajuda a ler o conteúdo, já fazendo as transformações dos valores para Python;

- E um escritor (`writer`) para facilitar a escrita nesse formato.

```language-python
import csv

with open("balneabilidade.csv") as file:
    beach_status_reader = csv.reader(file, delimiter=",", quotechar='"')
    header, *data = beach_status_reader

print(data)
```

O leitor define como dialeto padrão `excel`, que significa dizer que o delimitador de campos será a "`,`" e o caractere de citação será aspas duplas (`"`). Uma forma de modificar estes padrões é definindo-os de forma diferente na criação do leitor.

Um leitor de **CSV** pode ser percorrido utilizando o laço de repetição `for` e, a cada iteração, retorna uma nova linha já transformada em uma lista python com seus respectivos valores.

`header, *data` é um truque para separarmos o cabeçalho do restante dos dados. Quando há uma atribuição múltipla e o valor da direita (`beach_status_reader`) pode ser percorrido, o **Python** entende que deve atribuir cada um dos valores a uma variável da esquerda (header, *data), seguindo a ordem. Isto é chamado de desempacotamento de valores. Dito isso, vamos ver o exemplo abaixo para entendermos melhor como o desempacotamento de valores funciona:

> 💡 Execute o código abaixo para que você veja os valores printados e entenda melhor o funcionamento.

```language-python
a, b = "cd"
print(a)  # saída: c
print(b)  # saída: d

head, *tail = [1,2,3] # Quando um * está presente no desempacotamento, os valores são desempacotados em formato de lista.
print(head)  # saída: 1
print(tail)  # saída: [2, 3]
```

Podemos fazer uma análise agrupando a balneabilidade **por campanha** e depois salvamos o resultado também no formato csv:

```language-python
import csv

# lê os dados
with open("balneabilidade.csv") as file:
    beach_status_reader = csv.reader(file, delimiter=",", quotechar='"')
    header, *data = beach_status_reader

# agrupa campanhas e suas respectivas balneabilidades
bathing_by_campaign = {}
for row in data:
    campaign = row[6]
    bathing = row[2]
    if campaign not in bathing_by_campaign:
        bathing_by_campaign[campaign] = {
            "Própria": 0,
            "Imprópria": 0,
            "Muito Boa": 0,
            "Indisponível": 0,
            "Satisfatória": 0,
        }
    bathing_by_campaign[campaign][bathing] += 1

# escreve o relatório em csv
# abre um arquivo para escrita
with open("report_por_campanha.csv", "w") as file:
    writer = csv.writer(file)

    # escreve o cabeçalho
    headers = [
        "Campanha",
        "Própria",
        "Imprópria",
        "Muito Boa",
        "Indisponível",
        "Satisfatória",
    ]
    writer.writerow(headers)

    # escreve as linhas de dados
    for campaign, bathing in bathing_by_campaign.items():
        # desempacota os valores de balneabilidade para formar uma linha
        # equivalente a
        # row = [campaign]
        # for value in bathing.values():
        #     row.append(value)
        row = [campaign, *bathing.values()]
        writer.writerow(row)
```

Existe ainda o leitor e escritor baseado em dicionários. Sua principal vantagem é que, com ele, não precisamos manipular os índices para acessar os dados das colunas. Mas, devido a estrutura de dados utilizada, ele tem como desvantagem o espaço ocupado em memória, sendo maior que o comum:

```language-python
import csv

# lê os dados
with open("balneabilidade.csv") as file:
    beach_status_reader = csv.DictReader(file, delimiter=",", quotechar='"')
    # a linha de cabeçaçhos é utilizada como chave do dicionário
    # agrupa campanhas e suas respectivas balneabilidades
    bathing_by_campaign = {}
    for row in beach_status_reader:
        campaign = row["numero_boletim"]  # as linhas são dicionários
        bathing = row["categoria"]
        if campaign not in bathing_by_campaign:
            bathing_by_campaign[campaign] = {
                "Própria": 0,
                "Imprópria": 0,
                "Muito Boa": 0,
                "Indisponível": 0,
                "Satisfatória": 0,
            }
        bathing_by_campaign[campaign][bathing] += 1

# abre um arquivo para escrita
with open("report_por_campanha_dicionarios.csv", "w") as file:
    # os valores a serem escritos devem ser dicionários
    header = [
        "Campanha",
        "Própria",
        "Imprópria",
        "Muito Boa",
        "Indisponível",
        "Satisfatória",
    ]
    # É necessário passar o arquivo e o cabeçalho
    writer = csv.DictWriter(file, fieldnames=header)
    # escreve as linhas de dados
    for campaign, bathing in bathing_by_campaign.items():
        # desempacota os valores de balneabilidade para formar uma linha
        # equivalente a
        # row = {"campanha": campaign}
        # for name, value in bathing.items():
        #     row[name] = value
        row = {"Campanha": campaign, **bathing}
        writer.writerow(row)
```

> 💡 Ainda que a manipulação de arquivos seja algo trivial, caso precise fazer análises de dados, leve em consideração bibliotecas como [Pandas](https://pandas.pydata.org/), elas foram construídas e são mantidas justamente para atender e facilitar este objetivo.

---

## Vamos fazer juntos

###### Tempo sugerido para realização: 80 minutos

Agora que já passamos pelos conceitos mais fundamentais, está na hora de colocarmos a mão na massa com a nossa aula ao vivo!

Bora pro Slack, onde o link estará disponível. 😉

---

## Exercícios

###### Tempo sugerido para realização: 140 minutos

<%= versioning_your_code(@conn) %>

---

### Agora a prática

**Exercício 1:** Faça um programa que receba um nome e imprima o mesmo na vertical em escada invertida. Exemplo:

_Entrada:_

```language-md
PEDRO
```

_Saída:_

```language-md
PEDRO
PEDR
PED
PE
P
```

**Exercício 2:** *Jogo da palavra embaralhada.* Desenvolva um jogo em que a pessoa usuária tenha que adivinhar uma palavra que será mostrada com as letras embaralhadas. O programa terá uma lista de palavras e escolherá uma aleatoriamente. O jogador terá três tentativas para adivinhar a palavra. Ao final a palavra deve ser mostrada na tela, informando se a pessoa ganhou ou perdeu o jogo.

🦜 Para embaralhar uma palavra faça: `scrambled_word = "".join(random.sample(word, len(word)))`

🦜 O sorteio de uma palavra aleatória pode ser feito utilizando o método choice: `random.choice(["word1", "word2", "word3"]) -> "word2"`.

**Exercício 3:** Modifique o exercício anterior para que as palavras sejam lidas de um arquivo. Considere que o arquivo terá cada animal em uma linha.

**Exercício 4:** Dado o seguinte [arquivo](/computer-science/python/books.json) no formato **JSON**, leia seu conteúdo e calcule a porcentagem de livros em cada categoria, em relação ao número total de livros. O resultado deve ser escrito em um arquivo no formato **CSV** como o exemplo abaixo.

_Saída:_

```language-md
categoria,porcentagem
Python,0.23201856148491878
Java,0.23201856148491878
PHP,0.23201856148491878
```

### Bônus

**Exercício 5:** Utilizando o arquivo `pokemons.json`, vamos escrever um programa que sorteie um pokemon aleatoriamente. O programa deve perguntar à pessoa usuária "Quem é esse pokemon?", até que ela o acerte. A cada erro, apresente um número de letras do nome daquele pokemon igual ao número de erros.

_Exemplo:_ o pokemon sorteado pelo programa é `butterfree`, a pessoa usuária chuta `charizard`, o programa deve exibir `b`. Em seguida, a pessoa chuta `blastoise`, o programa deve exibir `bu` e assim por diante até a pessoa acertar.

🦜 Você pode utilizar o método `choice` do modulo `random` para sortear aleatoriamente um pokemon. Ex: `random.choice(pokemon) -> Saída: {"name": "Pikachu", }`

---

## Recursos adicionais (opcional)

- [Documentação do módulo csv](https://docs.python.org/3/library/csv.html) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Documentação do módulo json](https://docs.python.org/3/library/json.html) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Python F-strings](https://realpython.com/python-f-strings/) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Trabalhando com arquivos em python](https://realpython.com/working-with-files-in-python/) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
