## Gabarito dos exercícios

A seguir encontra-se uma sugestão de solução para os exercícios propostos.

### Exercícios de fixação

**Exercício 1:** Faça um programa que solicite o nome de uma pessoa usuária e imprima-o na vertical. Exemplo:

```language-md
F
U
L
A
N
O
```

```language-python
NAME = input("Insira seu nome: ")

for letter in NAME:
    print(letter)
```

**Exercício 2:** Escreva um programa que receba vários números **naturais** e calcule a soma desses valores. Caso algum valor da entrada seja inválido, por exemplo uma letra, uma mensagem deve ser exibida, na saída de erros, no seguinte formato: "Erro ao somar valores, {valor} é um valor inválido". Ao final, você deve imprimir a soma dos valores válidos.

🦜 Receba os valores em um mesmo `input`, solicitando à pessoa usuária que separe-os com um espaço. Receba os valores no formato `str` e utilize o método `split` para pegar cada valor separado. O método `isdigit`, embutido no tipo `str`, pode ser utilizado para verificar se a string corresponde a um número natural.

```language-python
nums = input("Insira valores aqui, separados por espaço: ")

numsArr = nums.split(" ")

sum = 0
for num in numsArr:
    if not num.isdigit():
        print(f"Erro ao somar valores, {num} não é um dígito.")
    else:
        sum += int(num)

print(f"A soma dos valores válidos é: {sum}")
```

**Exercício 3:** Dado um arquivo contendo estudantes e suas respectivas notas, escreva um programa que lê todas essas informações e filtre somente as pessoas que estão aprovadas, escrevendo seus nomes em outro arquivo. A nota miníma para aprovação é 6.

```language-python
recuStudents = []
with open("file.txt") as gradesFile:
    for line in gradesFile:
        student_grade = line
        student_grade = student_grade.split(" ")
        if int(student_grade[1]) < 6:
            recuStudents.append(student_grade[0] + "\n")


with open("recuStudents.txt", mode="w") as recuStudentsFile:
    print(recuStudents)
    recuStudentsFile.writelines(recuStudents)
```

### Exercícios

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

```language-python
def vertical_inverted_ladder(word):
    for removed_letters in range(len(word)):
        for index in range(len(word) - removed_letters):
            print(word[index], end="")
        print()

if __name__ == "__main__":
    name = input("Digite um nome: ")
    vertical_inverted_ladder(name)
```

```language-python
from contextlib import redirect_stdout
from io import StringIO


def test_vertical_inverted_ladder():
    stub_output = StringIO()
    expected_output = "PEDRO\nPEDR\nPED\nPE\nP\n"
    with redirect_stdout(stub_output):
        vertical_inverted_ladder("PEDRO")
    assert stub_output.getvalue() == expected_output
```

**Exercício 2:** *Jogo da palavra embaralhada.* Desenvolva um jogo em que o usuário tenha que adivinhar uma palavra que será mostrada com as letras embaralhadas. O programa terá uma lista de palavras e escolherá uma aleatoriamente. O jogador terá três tentativas para adivinhar a palavra. Ao final a palavra deve ser mostrada na tela, informando se o usuário ganhou ou perdeu o jogo.

🦜 Para embaralhar uma palavra faça: `scrambled_word = "".join(random.sample(word, len(word)))`

🦜 O sorteio de uma palavra aleatória pode ser feito utilizando o método choice: `random.choice(["word1", "word2", "word3"]) -> "word2"`.

```language-python
WORDS = [
    "cat",
    "elephant",
    "dog",
    "monkey",
    "duck",
    "chameleon",
    "bear",
    "moose",
    "rooster",
]
MAX_ATTEMPTS = 3


def draw_secret_word(words)
    secret_word = random.choice(words)
    scrambled_word = "".join(random.sample(secret_word, len(secret_word)))
    return secret_word, scrambled_word

def collect_guesses():
    guesses = []
    for attempt in range(MAX_ATTEMPTS):
        guess = input("Guess the word: ")
        guesses.append(guess)
    return guesses

def check_game_result(secret_word, guesses):
    if secret_word in guesses:
        print("You win")
    else:
        print("You lose")

if __name__ == "__main__":
    secret_word, scrambled_word = draw_secret_word(WORDS)
    print(f"Scrambled word is {scrambled_word}")
    guesses = collect_guesses()
    check_game_result(secret_word, guesses)
```

```language-python
from contextlib import redirect_stdout
from io import StringIO


def test_draw_secret_word():
    word = "dog"
    secret_word, scrambled_word = draw_secret_word([word])
    assert secret_word == word

def check_game_result_win():
    stub_output = StringIO()
    expected_output = "You win"
    with redirect_stdout(stub_output):
        check_game_result("dog", ["cat", "ant", "dog"])
    assert stub_output.getvalue() == expected_output


def check_game_result_lose():
    stub_output = StringIO()
    expected_output = "You lose"
    with redirect_stdout(stub_output):
        check_game_result("monkey", ["keymon", "keynom", "nomkey"])
    assert stub_output.getvalue() == expected_output
```

**Exercício 3:** Modifique o exercício anterior para que as palavras sejam lidas de um arquivo. Considere que o arquivo terá cada animal em uma linha.

```language-python
MAX_ATTEMPTS = 3


def retrieve_words(file):
    return [word.strip() for word in file]


def draw_secret_word(words)
    secret_word = random.choice(words)
    scrambled_word = "".join(random.sample(secret_word, len(secret_word)))
    return secret_word, scrambled_word

def collect_guesses():
    guesses = []
    for attempt in range(MAX_ATTEMPTS):
        guess = input("Guess the word: ")
        guesses.append(guess)
    return guesses

def check_game_result(secret_word, guesses):
    if secret_word in guesses:
        print("You win")
    else:
        print("You lose")


if __name__ == "__main__":
    with open("words.txt") as file:
        words = retrieve_words(file)
    secret_word, scrambled_word = draw_secret_word(words)
    print(f"Scrambled word is {scrambled_word}")
    guesses = collect_guesses()
    check_game_result(secret_word, guesses)
```

**Exercício 4:** Dado o seguinte [arquivo](./books.json) no formato **JSON**, leia seu conteúdo e calcule a porcentagem de livros em cada categoria, em relação ao número total de livros. O resultado deve ser escrito em um arquivo no formato **CSV** como o exemplo abaixo.

_Saída:_

```language-md
categoria,porcentagem
Python,0.23201856148491878
Java,0.23201856148491878
PHP,0.23201856148491878
```

```language-python
import json
from csv import csv_writer


def retrieve_books(file):
    return [json.loads(line) for line in file]


def count_books_by_categories(books):
    categories = {}
    for book in books:
        for category in book["categories"]:
            if not categories.get(category):
                categories[category] = 0
            categories[category] += 1
    return categories


def calculate_porcentage_by_category(book_count_by_category, total_books):
    return [[category, num_books / total_books]
             for category, num_books in book_count_by_category]


def write_csv_report(file, headers, rows):
    writer = csv_writer(file)
    writer.writewrow(headers)
    writer.writerows(rows)


if __name__ == "__main__":
    # retrieve books
    with open("books.json") as file:
        books = retrieve_books(file)

    # count by category
    book_count_by_category = count_books_by_categories(books)

    # calculate porcentage
    number_of_books = len(books)
    books_percentage_rows = calculate_porcentage_by_category(book_count_by_category, number_of_books)

    # write csv
    headers = ["categoria", "porcentagem"]
    with open("report.csv", "w") as file:
        write_csv_report(file, headers, books_percentage_rows)
```

### Bônus

**Exercício 5:** Utilizando o arquivo `pokemons.json`, vamos escrever um programa que sorteie um pokemon aleatoriamente. O programa deve perguntar à pessoa usuária "Quem é esse pokemon?", até que ela o acerte. A cada erro, apresente um número de letras do nome daquele pokemon igual ao número de erros.

_Exemplo:_ o pokemon sorteado pelo programa é `butterfree`, a pessoa usuária chuta `charizard`, o programa deve exibir `b`. Em seguida, a pessoa chuta `blastoise`, o programa deve exibir `bu` e assim por diante até a pessoa acertar.

🦜 Você pode utilizar o método `choice` do modulo `random` para sortear aleatoriamente um pokemon. Ex: `random.choice(pokemon) -> Saída: {"name": "Pikachu", }`

```language-python
import json
import random


def shot(pokemon_name):
    wrong_shot = True
    num_of_shots = 0
    while (wrong_shot):
        num_of_shots += 1
        shot = input("Quem é esse pokemon? ")
        if (shot == pokemon_name):
            print("Você acertou! Parabéns!")
            break
        elif num_of_shots == len(pokemon_name):
            print("Você errou!")
            break
        else:
            print("Dica: ", end="")
            for i in range(0, num_of_shots):
                print(pokemon_name[i], end="")
            print("")


if __name__ == "__main__":
    with open("pokemons.json") as file:
        pokemons = json.load(file)["results"]
        pokemon = random.choice(pokemons)
        pokemon_name = pokemon["name"]

    shot(pokemon_name)
```
