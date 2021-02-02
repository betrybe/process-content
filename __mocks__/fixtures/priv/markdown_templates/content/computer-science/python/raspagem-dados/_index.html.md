## O que vamos aprender?

Hoje vamos aprender o que é **raspagem de dados** e o que podemos fazer utilizando esta técnica. Vamos ver também como fazer requisições web, analisando suas respostas e extraindo dados. Além disso, também vamos ver técnicas para evitar problemas com essa prática.

### Você será capaz de:

- Realizar requisições web;

- Analisar conteúdos HTML afim de extrair dados;

- Aplicar técnicas de raspagem para evitar problemas como bloqueio de acesso;

- Armazenar os dados obtidos em um banco de dados.

## Por que isso é importante?

Imagine que você queira fazer comparações de preços e informações, ou talvez descobrir informações sobre algum assunto. Todo o dado a respeito, porém, não está estruturado, sendo exibido somente em uma página web. Uma página web pode ser útil para humanos, mas certamente não é útil para fazermos análises estruturadas.

<%= figure(%{src: "/computer-science/python/raspagem-dados/images/not-a-robot.gif", class: "text-center rounded mx-auto d-block"}) %>

A **raspagem de dados** tem sido muito útil em trabalhos jornalísticos, fornecendo dados para sustentarem matérias, mas também pode ser útil para comparar preços de produtos com a concorrência, automatização de processos maçantes como buscar artigos científicos em bases acadêmicas, recuperação de documentos em sites jurídicos, analisar perfis de redes sociais, recuperar dados públicos do governo e muitos outros lugares.

> Caso tenha repetido um processo mais de duas vezes, automatize-o.

Dado a infinidade de usos provavelmente, em sua carreira como pessoa desenvolvedora, você irá se deparar em algum momento  com a necessidade de escrever um programa que realize a extração de dados para algum propósito.

---

## Conteúdos

###### Tempo sugerido para realização: 80 minutos

### Introdução

**Raspagem de dados** é uma técnica computacional para extrair dados provenientes de um serviço ou aplicação, estruturando-os em banco de dados, planilhas, ou outros formatos. Consiste em extrair dados de sites e transportá-los para um formato mais simples e maleável para que possam ser analisados e cruzados com mais facilidade.

Alguns passos aplicados nesta técnica são a realização de requisições, análise das resposta e extração dos dados, navegação do conteúdo, limpeza e armazenamento dos dados.

Vamos passo a passo, aprendendo como fazer e prevenindo erros que podem acontecer.

### Requisições web

A comunicação com servidores HTTP e HTTPS se dá através de requisições, em que utilizamos o verbo para indicar que tipo de ação deve ser tomada para um dado recurso. Devemos informar na requisição em qual recurso estamos atuando e no cabeçalho passamos algumas informações que podem ser interessantes como o tipo de resposta aceita ou o tipo de conteúdo sendo enviado.

O **Python** possui um pacote para lidar com o protocolo HTTP, porém este não é tão amigável para seres humanos. Por isso vamos utilizar a biblioteca `requests`, que possui uma interface bem mais amigável. Ela pode ser instalada utilizando o comando abaixo, mas lembre-se de criar um ambiente virtual antes de instalar bibliotecas. Para recordar como criar um ambiente isolado, [acesse o conteúdo](/computer-science/python/entrada-saida/#ambiente-virtual) {: .external-link target="_blank" rel="noreferrer noopener" }.

```language-bash
$ python3 -m pip install requests
```

Vamos ver alguns exemplos abaixo de como utilizar a biblioteca `requests`:

```language-python
import requests


# Requisição do tipo GET
response = requests.get("https://www.betrybe.com/")
print(response.status_code)  # código de status
print(response.headers["Content-Type"])  # conteúdo no formato html

# Conteúdo recebido da requisição
print(response.text)

# Bytes recebidos como resposta
print(response.content)

# Requisição do tipo post
response = requests.post("http://httpbin.org/post", data="some content")
print(response.text)

# Requisição enviando cabeçalho (header)
response = requests.get("http://httpbin.org/get", headers={"Accept": "application/json"})
print(response.text)

# Requisição a recurso binário
response = requests.get("http://httpbin.org/image/png")
print(response.content)

# Recurso JSON
response = requests.get("http://httpbin.org/get")
# Equivalente ao json.loads(response.content)
print(response.json())

# Podemos também pedir que a resposta lance uma exceção caso o status não seja OK
response = requests.get("http://httpbin.org/status/404")
response.raise_for_status()
```

### Alguns problemas

#### Rate Limit

Muitas vezes a página de onde estamos removendo o conteúdo possui uma limitação de quantas requisições podemos enviar em um curto período de tempo, evitando assim ataques de negação de serviço.

Isto pode nos levar a ficarmos bloqueados por um curto período de tempo ou até mesmo banidos de acessar um recurso.

Que tal vermos um exemplo?

```language-python
import requests


# À partir da décima requisição somos bloqueados de acessar o recurso
# Código de status 429: Too Many Requests
for _ in range(15):
    response = requests.get("https://www.cloudflare.com/rate-limit-test/")
    print(response.status_code)
```

Neste exemplo, após a décima requisição, o servidor começa a nos retornar respostas com o código de `status 429`, "Too Many Requests". Isto significa que estamos utilizando uma taxa de solicitação maior que a suportada. Ele permanecerá assim por algum tempo (1 minuto).

<%= figure(%{src: "/computer-science/python/raspagem-dados/images/denial.gif", class: "text-center rounded mx-auto d-block"}) %>

Uma boa prática é sempre colocarmos um uma pausa entre as requisições, ou lote delas, mesmo que o website, onde a informação está, não faça o bloqueio, assim evitamos tirar o site do ar.

```language-python
import requests
import time


# Coloca uma pausa de 6 segundos a cada requisição
# Obs: este site de exemplo tem um rate limit de 10 requisições por minuto
for _ in range(15):
    response = requests.get("https://www.cloudflare.com/rate-limit-test/")
    print(response)
    time.sleep(6)
```

#### Timeout

Ás vezes pedimos um recurso ao servidor, mas caso o nosso tráfego de rede esteja lento ou tenha um problema interno do servidor, nossa resposta pode demorar ou até mesmo ficar travada indefinidamente.

Como garantir, após um tempo, que o recurso seja retornado? 🤔

```language-python
import requests

# Por 10 segundos não temos certeza se a requisição irá retornar
response = requests.get("https://httpbin.org/delay/10")
print(response)
```

Podemos definir um **tempo limite (timeout)** para que, após este tempo, possamos tomar alguma atitude como por exemplo, realizar uma nova tentativa.

Este tempo limite normalmente é definido através de experimentações e análise do tempo de resposta normal de uma requisição.

```language-python
import requests


try:
    # recurso demora muito a responder
    response = requests.get("http://httpbin.org/delay/10", timeout=2)
except requests.ReadTimeout:
    # vamos fazer uma nova requisição
    response = requests.get("http://httpbin.org/delay/1", timeout=2)
finally:
    print(response.status_code)
```

No exemplo acima, para efeitos didáticos, modificamos a URI do recurso, diminuindo o delay de resposta da requisição, através do `timeout`, porém normalmente este valor não muda.

### Analisando respostas

> 🗒 Para realizar a extração de dados de um conteúdo web vamos utilizar uma biblioteca chamada `parsel`. Ela pode ser instalada com o comando o comando abaixo:

```language-bash
$ python3 -m pip install parsel
```

Como já aprendemos a realizar requisições HTTP e buscar seu conteúdo, vamos agora analisar este conteúdo e extrair informações.

Para ajudar na didática, vamos utilizar o site `http://books.toscrape.com/`. Ele é um site próprio para o treinamento de raspagem de dados.

Para começar, vamos acessar o site e ver o seu conteúdo.

<%= figure(%{src: "/computer-science/python/raspagem-dados/images/books-to-scrape.png", caption: "Livros à venda", class: "text-center rounded mx-auto d-block"}) %>

Em código, vamos baixar o conteúdo da página e criar um seletor, que será utilizado para realizarmos as extrações. Vamos criar o arquivo `.py` para buscarmos as informações:

> exemplo_scrape.py

```language-python
from parsel import Selector
import requests


response = requests.get("http://books.toscrape.com/")
selector = Selector(text=response.text)
print(selector)
```

_Ok_, que tal extrairmos todos os livros desta primeira página e buscar seus títulos e preços?

Para conseguirmos extrair essas informações precisamos, primeiro, inspecionar cada um dos elementos, buscando algo que os identifique de forma única na página.

<%= figure(%{src: "/computer-science/python/raspagem-dados/images/inspect-title.png", caption: "Inspecionando o título", class: "text-center rounded mx-auto d-block"}) %>

> exemplo_scrape.py

```language-python
# ...


# response = requests.get("http://books.toscrape.com/")
# selector = Selector(text=response.text)

# O título está no atributo title em um elemento âncora (<a>)
# Dentro de um h3 em elementos que possuem classe product_pod
titles = selector.css(".product_pod h3 a::attr(title)").getall()
# Estamos utilizando a::attr(title) para capturar somente o valor contido no texto do seletor

# Os preços estão no texto de uma classe price_color
# Que se encontra dentro da classe .product_price
prices = selector.css(".product_price .price_color::text").getall()

# Combinando tudo podemos buscar os produtos
# em em seguida buscar os valores individualmente
for product in selector.css(".product_pod"):
    title = product.css("h3 a::attr(title)").get()
    price = product.css(".price_color::text").get()
    print(title, price)
```

O seletor principal que contém todo o conteúdo da página pode ser utilizado em uma busca para encontrar seletores mais específicos. Podemos fazer isto utilizando a função `css`. Ela recebe um seletor CSS como parâmetro, embora podemos passar um tipo especial de seletor quando queremos algum valor bem específico como o texto ou um atributo.

Após definir o seletor, podemos utilizar a função `get` para buscar o primeiro seletor/valor que satisfaça aquela busca. A função `getall` é similar, porém trás todos os valores que satisfaçam aquele seletor.

Assim como temos a função `css` que faz a busca por seletores CSS, temos também a função `xpath` que faz a busca com base em XPath.

> 💡 Existem sites que podem ajudar com seletores [css](https://devhints.io/css) ou [xpath](https://devhints.io/xpath).

### Recursos paginados

Tudo certo, temos 20 livros, mas sabemos que na verdade este site possui **1000** livros. Que tal coletarmos todos?!

<%= figure(%{src: "/computer-science/python/raspagem-dados/images/page-two.png", caption: "Navegação até a página 2", class: "text-center rounded mx-auto d-block"}) %>

Navegando um pouco por entre as páginas, percebemos que cada página possui uma referência para a próxima. Mas, se a `URL` é sequencial, por que não simplesmente jogamos valores até a página avisar que o recurso não foi encontrado?

Acontece que podemos evitar fazer requisições desnecessárias, já que a página nos informa a próxima.

O que precisamos fazer é criar um seletor com a página, extrair os dados, buscar a nova página e repetir todo o processo, até termos navegados em todas as páginas.

Até a parte da extração nós já fizemos, vamos então dar uma olhada em como buscar a próxima página.

<%= figure(%{src: "/computer-science/python/raspagem-dados/images/inspect-next.png", caption: "Inspecionando o botão de próximo", class: "text-center rounded mx-auto d-block", width: "100%"}) %>

> exemplo_scrape.py

```language-python
# ...
# for product in selector.css(".product_pod"):
#     title = product.css("h3 a::attr(title)").get()
#     price = product.css(".price_color::text").get()
#     print(title, price)

# Existe uma classe next, que podemos recuperar a url através do seu elemento âncora
next_page_url = selector.css(".next a::attr(href)").get()
print(next_page_url)
```

Agora que sabemos como recuperar a próxima página, podemos iniciar na primeira página e continuar buscando livros enquanto uma nova página for encontrada. Cada vez que encontrarmos uma página, extraímos seus dados e continuamos até acabarem as páginas. Então vamos alterar tudo que tínhamos escrito no arquivo `exemplo_scrape.py` para o código abaixo:

> exemplo_scrape.py

```language-python
from parsel import Selector
import requests


# Define a primeira página como próxima a ter seu conteúdo recuperado
URL_BASE = "http://books.toscrape.com/catalogue/"
next_page_url = 'page-1.html'
while next_page_url:
    # Busca o conteúdo da próxima página
    response = requests.get(URL_BASE + next_page_url)
    selector = Selector(text=response.text)
    # Imprime os produtos de uma determinada página
    for product in selector.css(".product_pod"):
        title = product.css("h3 a::attr(title)").get()
        price = product.css(".price_color::text").get()
        print(title, price)
    # Descobre qual é a próxima página
    next_page_url = selector.css(".next a::attr(href)").get()
```

Nossa, quantos livros! 📚

### Recursos obtidos à partir de outro recurso

Agora que estamos coletando todos os livros, que tal coletarmos também a descrição de cada livro?

O problema é que a descrição só pode ser acessada navegando até a página específica de cada livro.

<%= figure(%{src: "/computer-science/python/raspagem-dados/images/book-description.png", caption: "Descrição do livro está em sua página de detalhes", class: "text-center rounded mx-auto d-block", width: "100%"}) %>

O primeiro passo é investigarmos como descobrir a `URL` que nos leva até a página de detalhes de um produto. 🔍

<%= figure(%{src: "/computer-science/python/raspagem-dados/images/inspect-book-url.png", caption: "Descrição do livro está em sua página de detalhes", class: "text-center rounded mx-auto d-block", width: "100%"}) %>

Com esse seletor em mãos, precisamos recuperar o atributo `href` que contém o link para a página de detalhes do livro. Vamos criar um outro arquivo, apenas para fazer o teste da _feature_ que queremos implementar, depois vamos alterar o código do arquivo `exemplo_scrape.py` para realmente implementar a função. Lembre-se de criar o arquivo no mesmo diretório que já estava utilizando.

> teste.py

```language-python
from parsel import Selector
import requests

URL_BASE = "http://books.toscrape.com/catalogue/"

# Vamos testar com a primeira página
response = requests.get(URL_BASE + "page-1.html")
selector = Selector(text=response.text)

# Recupera o atributo href do primeiro elemento que combine com o seletor
href = selector.css(".product_pod h3 a::attr(href)").get()
print(href)

# Para obter a url completa, basta adicionar a nossa URL_BASE
print(URL_BASE + href)
```

Em seguida, acessamos a página de detalhes do produto, e inspecionamos a descrição do produto.

<%= figure(%{src: "/computer-science/python/raspagem-dados/images/inspect-book-description.png", caption: "Inspecionando a descrição de um livro.", class: "text-center rounded mx-auto d-block", width: "100%"}) %>

A descrição do produto está uma tag `p`, "irmã" de uma tag com id `product_description`. Isto pode ser expresso através do seletor `a`.

No código, precisamos realizar uma nova requisição à página de detalhes, e depois analisaremos seu conteúdo em busca da descrição do produto. Para isso, vamos alterar todo o conteúdo novamente, porém dessa vez será o conteúdo do arquivo `teste.py`:

> teste.py

```language-python
from parsel import Selector
import requests

URL_BASE = "http://books.toscrape.com/catalogue/"

response = requests.get(URL_BASE + "page-1.html")
selector = Selector(text=response.text)

href = selector.css(".product_pod h3 a::attr(href)").get()
detail_page_url = URL_BASE + href

# baixa o conteúdo da página de detalhes
detail_response = requests.get(detail_page_url)
detail_selector = Selector(text=detail_response.text)

# recupera a descrição do produto
# ~ significa a tag irmã
description = detail_selector.css("#product_description ~ p::text").get()
print(description)
```

Por fim, vamos adicionar a lógica para buscar a descrição do produto ao nosso código existente.

> exemplo_scrape.py

```language-python
# from parsel import Selector
# import requests


# URL_BASE = "http://books.toscrape.com/catalogue/"
# Define a primeira página como próxima a ter seu conteúdo recuperado
# next_page_url = 'page-1.html'
while next_page_url:
    # Busca o conteúdo da próxima página
    # response = requests.get(URL_BASE + next_page_url)
    # selector = Selector(text=response.text)
    # Imprime os produtos de uma determinada página
    for product in selector.css(".product_pod"):
        # Busca e extrai o título e  o preço
        # title = product.css("h3 a::attr(title)").get()
        # price = product.css(".price_color::text").get()
        # print(title, price)

        # Busca o detalhe de um produto
        detail_href = product.css("h3 a::attr(href)").get()
        detail_page_url = URL_BASE + detail_href

        # Baixa o conteúdo da página de detalhes
        detail_response = requests.get(detail_page_url)
        detail_selector = Selector(text=detail_response.text)

        # Extrai a descrição do produto
        description = detail_selector.css("#product_description ~ p::text").get()
        print(description)

    # Descobre qual é a próxima página
    # next_page_url = selector.css(".next a::attr(href)").get()
```

### Limpeza de dados

🧼🧽 Estamos extraindo nossos dados, porém estes dados contém algumas "sujeiras" que podem atrapalhar em nossas análises. Por exemplo, pare pra olhar o preço do livro, viu algo diferente? O preço possui um caractere estranho `Â£26.08` antes do seu valor. E a descrição do livro que contém o sufixo `...more`.

Seria conveniente, antes de estruturar e armazenar estes dados, que fizéssemos uma limpeza neles.

No caso do valor, poderíamos utilizar uma expressão regular para remover os outros caracteres. O padrão é conter um símbolo de libra, seguido por números, ponto para separar casas decimais e dois números como casas decimais. Essa expressão regular pode ser feita da seguinte forma: `£\d+\.\d{2}`.

Agora, para utilizar a expressão regular que fizemos, podemos substituir o método `getall` pelo método `re`, ou o método `get` por `re_first`. Ambos, além de recuperar valores, aplicarão a expressão regular sobre aquele valor.

Vamos primeiro fazer essas _features_, novamente, no arquivo de `teste.py` para vermos funcionando. Depois vamos implementá-las no arquivo `exemplo_scrape.py`.

> teste.py

```language-python
from parsel import Selector
import requests


response = requests.get("http://books.toscrape.com/")
selector = Selector(text=response.text)
# Extrai todos os preços da primeira página
prices = selector.css(".product_price .price_color::text").re(r"£\d+\.\d{2}")
print(prices)
```

Já para o caso do sufixo `...more`, poderíamos utilizar fatiamento para removê-lo. Mas, antes, é importante verificarmos se o conteúdo possui o sufixo, evitando assim perda de conteúdo de forma acidental. Vamos ver como isso funciona no arquivo `teste.py`.

> teste.py

```language-python
from parsel import Selector
import requests


response = requests.get("http://books.toscrape.com/catalogue/a-light-in-the-attic_1000/index.html")
selector = Selector(text=response.text)

# Extrai a descrição
description = selector.css("#product_description ~ p::text").get()
print(description)

# "Fatiamos" a descrição removendo o sufixo
suffix = "...more"
if description.endswith(suffix):
    description = description[:-len(suffix)]
print(description)
```

Alguns outros exemplos de "sujeiras" são valores que contém tabulações, quebras de linha ou conteúdo além do esperado.

Agora vamos implementar essas funcionalidades no nosso arquivo `exemplo_scrape.py`.

> exemplo_scrape.py

```language-python
from parsel import Selector
import requests


# URL_BASE = "http://books.toscrape.com/catalogue/"
# Define a primeira página como próxima a ter seu conteúdo recuperado
# next_page_url = 'page-1.html'
# while next_page_url:
    # Busca o conteúdo da próxima página
    # response = requests.get(URL_BASE + next_page_url)
    # selector = Selector(text=response.text)
    # Imprime os produtos de uma determinada página
    # for product in selector.css(".product_pod"):
        # Busca e extrai o título e  o preço
        # title = product.css("h3 a::attr(title)").get()
        price = product.css(".product_price .price_color::text").re(r"£\d+\.\d{2}")
        # print(title, price)

        # Busca o detalhe de um produto
        # detail_href = product.css("h3 a::attr(href)").get()
        # detail_page_url = URL_BASE + detail_href

        # Baixa o conteúdo da página de detalhes
        # detail_response = requests.get(detail_page_url)
        # detail_selector = Selector(text=detail_response.text)

        # Extrai a descrição do produto
        # description = detail_selector.css("#product_description ~ p::text").get()
        suffix = "...more"
        if description.endswith(suffix):
            description = description[:-len(suffix)]
        # print(description)

    # Descobre qual é a próxima página
    # next_page_url = selector.css(".next a::attr(href)").get()
```

> 💡 Strings em **Python** possuem vários métodos para ajudarem nesta limpeza, como por exemplo, o `strip`. Para ler a documentação e procurar esses métodos, execute `help(str)` no seu terminal interativo.

#### Fatiamento

Estruturas de dados do tipo sequência como listas, tuplas e strings podem ter seus elementos acessados através de um índice.

```language-python
# Recupera o primeiro elemento
[1, 2, 3][0]  # Saída: 1
```

Podemos também definir dois índices que serão o valor inicial e final de uma subsequência da estrutura. Ou três valores, sendo o último o tamanho do passo que daremos ao percorrer a subsequência.

```language-python
# Quando não incluso o valor inicial, iniciaremos do índice 0
# e do índice 2 em diante, os elementos não são incluídos
(1, 2, 3, 4)[:2]  # Saída: (1, 2)

# Quando omitimos o valor final
# o fatiamento ocorre até o fim da sequência
(1, 2, 3, 4)[1:]  # Saída: (2, 3, 4)

# Vá do índice 3 até o 7.
# O item no índice 7 não é incluído
"palavra"[3:7]  # Saída: "avra"

# Começando do elemento de índice 1, vá até o último,
# saltando de 2 em 2
[1, 2, 3, 4][1::2]  # Saída: [2, 4]
```

Chamamos esta operação de **fatiamento** e é muito utilizada para obtermos uma subsequência de uma sequência.

> 💡 À partir da versão 3.9 do Python, teremos uma função chamada `removesuffix`, que é equivalente a `palavra[:-len(suffix)]`.

### Banco de Dados

<%= figure(%{src: "/computer-science/python/raspagem-dados/images/python-loves-mongo.jpeg", class: "text-center rounded mx-auto d-block"}) %>

Agora que temos nossos dados, precisamos armazenar esta informação, e para isto utilizaremos o **MongoDB** que, como já estudamos, é um banco de dados de documentos, que armazena dados em formato **JSON** (`BSON`). Precisaremos de uma biblioteca para nos comunicarmos com o sistema de gerenciamento do banco de dados, e a mais popular e robusta é a `pymongo`. Podemos instalá-la com o comando:

Lembre-se que para testar o código abaixo você deve criar um ambiente virtual e instalar o `pymongo` com:

```language-bash
$ python3 -m venv .venv && source .venv/bin/activate
$ python3 -m pip install pymongo
```

Após a instalação vamos ver como podemos realizar a escrita e leitura neste banco de dados. O primeiro passo é criar uma conexão com o banco de dados e isto pode ser feito da seguinte maneira:

> 💡 Lembre-se que o MongoDB deve estar preparado para ser acessado do "outro lado" dessa operação!.

```language-python
from pymongo import MongoClient

# Por padrão o host é localhost e porta 27017
# Estes valores podem ser modificados passando uma URI
# client = MongoClient("mongodb://localhost:27017/")
client = MongoClient()
```

Em posse da conexão podemos acessar um banco de dados e posteriormente uma coleção:

```language-python
from pymongo import MongoClient

client = MongoClient()
# o banco de dados catalogue será criado se não existir
db = client.catalogue
# a coleção books será criada se não existir
students = db.books
client.close()  # fecha a conexão com o banco de dados
```

Para adicionarmos documentos à nossa coleção utilizamos o método `insert_one`:

```language-python
from pymongo import MongoClient

client = MongoClient()
db = client.catalogue
# book representa um dado obtido na raspagem
book = {
    "title": "A Light in the Attic",
}
document_id = db.books.insert_one(book).inserted_id
print(document_id)
client.close()  # fecha a conexão com o banco de dados
```

Quando um documento é inserido, um `_id` único é gerado e retornado.

Também podemos fazer inserção de múltiplos documentos de uma vez.

```language-python
from pymongo import MongoClient

client = MongoClient()
db = client.catalogue
documents = [
    {
        "title": "A Light in the Attic",
    },
    {
        "title": "Tipping the Velvet",
    },
    {
        "title": "Soumission",
    },
]
db.books.insert_many(documents)
client.close()  # fecha a conexão com o banco de dados
```

Buscas podem ser feitas utilizando os métodos `find` ou `find_one`.

```language-python
from pymongo import MongoClient

client = MongoClient()
db = client.catalogue
# busca um documento da coleção, sem filtros
print(db.books.find_one())
# busca utilizando filtros
for book in db.books.find({"title": {"$regex": "t"}}):
    print(book["title"])
client.close()  # fecha a conexão com o banco de dados
```

O nosso cliente é um gerenciador de contexto (_with_), logo podemos utilizá-lo como tal, evitando problemas com o fechamento da conexão com o banco de dados:

```language-python
from pymongo import MongoClient


with MongoClient() as client:
    db = client.database
    for book in db.books.find({"title": {"$regex": "t"}}):
        print(book["title"])
```

🍃 A interface de métodos desta biblioteca é tão natural que parece que estamos no _shell_ do Mongo. Aqui foram apresentados apenas alguns métodos, mas a similaridade é suficiente para conseguirmos aplicar nosso conhecimento prévio, consultando pontualmente a documentação do próprio [**MongoDB**](https://docs.mongodb.com/).

### Bônus

#### Scrapy

🕷 Uma excelente e poderosa ferramenta para raspagem de dados é a [Scrapy](https://scrapy.org/). Ela possui, em sua implementação, todos mecanismos citados anteriormente e outros recursos adicionais.

Vale a pena dar uma olhadinha! 😉

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

Vamos colocar tudo o que vimos até agora em prática.

---

**Exercício 1** Faça uma requisição ao site `https://httpbin.org/encoding/utf8` e exiba seu conteúdo de forma legível.

**Exercício 2** Faça uma requisição ao recurso usuários da API do Github (`https://api.github.com/users`), exibindo o username e url de todos os usuários retornados.

```language-md
mojombo https://api.github.com/users/mojombo
defunkt https://api.github.com/users/defunkt
pjhyett https://api.github.com/users/pjhyett
wycats https://api.github.com/users/wycats
...
```

**Exercício 3** Às vezes, você precisa fazer com que o seu raspador da Web pareça estar fazendo solicitações HTTP como o navegador, para que o servidor retorne os mesmos dados que você vê no seu navegador. Faça uma requisição a `https://scrapethissite.com/pages/advanced/?gotcha=headers` e verifique se foi bem sucedido.

Para verificar se foi bem sucedido, faça `assert "bot detected" not in response.text`, se nada acontecer, seu código está funcionando.

🦜 Faça a inspeção de como a requisição é feita pelo navegador para conseguir replicar através do código.

**Exercício 4** Baseados em uma página contendo detalhes sobre um livro `http://books.toscrape.com/catalogue/the-grand-design_405/index.html`, faça a extração dos campos título, preço, descrição e url contendo a imagem de capa do livro.

O preço deve vir somente valores numéricos e ponto. Ex: `Â£13.76` -> `13.76`.

A descrição de ter o sufixo "more..." removido quando existir.

Os campos extraídos devem ser apresentados separados por vírgula. Ex: título,preço,descrição,capa.

_Exemplo:_

```language-md
The Grand Design,13.76,THE FIRST MAJOR WORK IN NEARLY A DECADE BY ONE OF THE WORLDâS GREAT THINKERSâA MARVELOUSLY CONCISE BOOK WITH NEW ANSWERS TO THE ULTIMATE QUESTIONS OF LIFEWhen and howdid the universe begin? Why are we here? Why is there something rather than nothing? What is the nature of reality? Why are the laws of nature so finely tuned as to allow for the existenceof beings like ours THE FIRST MAJOR WORK IN NEARLY A DECADE BY ONE OF THE WORLDâS GREAT THINKERSâA MARVELOUSLY CONCISE BOOK WITH NEW ANSWERS TO THE ULTIMATE QUESTIONS OF LIFEÂ When and howdid the universe begin? Why are we here? Why is there something rather than nothing? What is the nature of reality? Why are the laws of nature so finely tuned as to allow for the existenceof beings like ourselves? And, finally, is the apparent âgrand designâor does science offer another explanation? The most fundamental questions about the origins of the universe and of lifeitself, once the province of philosophy, now occupy the territory where scientists, philosophers, and theologians meetâif only to disagree. In their new book, Stephen Hawking and LeonardMlodinow present the most recent scientific thinking about the mysteries of the universe, in nontechnical language marked by both brilliance and simplicity. In The Grand Design they explainthat according to quantum theory, the cosmos does not have just a single existence or history, but rather that every possible history of the universe exists simultaneously. When applied tothe universe as a whole, this idea calls into question the very notion of cause and effect. But the âtop-downâmultiverseâthe idea that ours is just one of many universes that appearedspontaneously out of nothing, each with different laws of nature.Along the way Hawking and Mlodinow question the conventional concept of reality, posing a âmodel-dependentâtheory ofeverything.âand provokeâlike no other. ,http://books.toscrape.com/catalogue/../../media/cache/9b/69/9b696c2064d6ee387774b6121bb4be91.jpg
```

**Exercício 5** Modifique o exercício anterior para retornar também quantos livros estão disponíveis apresentando como último campo no retorno.

_Exemplo:_

```language-md
The Grand Design,13.76,THE FIRST MAJOR WORK IN NEARLY A DECADE BY ONE OF THE WORLDâS GREAT THINKERSâA MARVELOUSLY CONCISE BOOK WITH NEW ANSWERS TO THE ULTIMATE QUESTIONS OF LIFEWhen and howdid the universe begin? Why are we here? Why is there something rather than nothing? What is the nature of reality? Why are the laws of nature so finely tuned as to allow for the existenceof beings like ours THE FIRST MAJOR WORK IN NEARLY A DECADE BY ONE OF THE WORLDâS GREAT THINKERSâA MARVELOUSLY CONCISE BOOK WITH NEW ANSWERS TO THE ULTIMATE QUESTIONS OF LIFEÂ When and howdid the universe begin? Why are we here? Why is there something rather than nothing? What is the nature of reality? Why are the laws of nature so finely tuned as to allow for the existenceof beings like ourselves? And, finally, is the apparent âgrand designâor does science offer another explanation? The most fundamental questions about the origins of the universe and of lifeitself, once the province of philosophy, now occupy the territory where scientists, philosophers, and theologians meetâif only to disagree. In their new book, Stephen Hawking and LeonardMlodinow present the most recent scientific thinking about the mysteries of the universe, in nontechnical language marked by both brilliance and simplicity. In The Grand Design they explainthat according to quantum theory, the cosmos does not have just a single existence or history, but rather that every possible history of the universe exists simultaneously. When applied tothe universe as a whole, this idea calls into question the very notion of cause and effect. But the âtop-downâmultiverseâthe idea that ours is just one of many universes that appearedspontaneously out of nothing, each with different laws of nature.Along the way Hawking and Mlodinow question the conventional concept of reality, posing a âmodel-dependentâtheory ofeverything.âand provokeâlike no other. ,http://books.toscrape.com/catalogue/../../media/cache/9b/69/9b696c2064d6ee387774b6121bb4be91.jpg,5
```

❗ Importe o arquivo [books.json](/computer-science/python/entrada-saida/books.json) {: .external-link target="_blank" rel="noreferrer noopener" } no MongoDB antes de responder as próximas questões.

🦜 `mongoimport --db library books.json`

**Exercício 6** Escreva um programa que se conecte ao banco de dados `library` e liste os livros da coleção `books` para uma determinada categoria recebida por uma pessoa usuária. Somente o título dos livros deve ser exibido.

**Exercício 7** Faça o calculo de quantos livros publicados (`STATUS = PUBLISH`) temos em nosso banco de dados por categoria. Ordenando-os de forma decrescente de acordo com a quantidade.

🦜 Você pode utilizar `agreggation framework` para auxiliar neste exercício.

_Saída:_

```language-md
Java 95
Internet 41
Microsoft .NET 33
Web Development 16
Software Engineering 15
Business 12
Programming 12
Client-Server 11
Microsoft 8
Theory 7
...
```

### Bônus

**Exercício 8** Agora um desafio, vá ao site `https://en.wikipedia.org/wiki/Gallery_of_sovereign_state_flags` e recupere as imagens de todas as bandeiras.

🦜 Faça requisições para as URLs das imagens e escreva seus conteúdos em arquivos binários. São 206 ao total.

**Exercício 9** Alguns sites possuem paginação feita através de rolagem infinita. Descubra como funciona a rolagem infinita e extraia todas as citações do seguinte site: `http://quotes.toscrape.com/scroll`.

🦜 São 100 citações no total.

## Recursos adicionais (opcional)

- [Análise de dados públicos - Professor Masanori](https://www.youtube.com/playlist?list=PLUukMN0DTKCu6g2Lq1KXLnIX6Ilk4DAPI) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Requests/Web scraping](https://youtu.be/geGjMToK5u8) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Conhecendo XPATH com Renne Rocha](https://youtu.be/vuLNc2yCNYk) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Criando Web Crawlers com Scrapy e Selenium para páginas com Javascript - Gileno Filho](https://www.youtube.com/watch?v=AXSo4kBAygE) {: .external-link target="_blank" rel="noreferrer noopener" }

- [[PyBR14] Web crawling e scraping com Scrapy e Scrapy Cloud - Lidiane Taquehara](https://youtu.be/vmRfO2uULfw) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Scrapy Video Tutorials](https://www.scrapinghub.com/learn-scrapy/) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
