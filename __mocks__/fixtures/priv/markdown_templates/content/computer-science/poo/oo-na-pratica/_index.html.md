## O que vamos aprender?

Hoje, você vai aprender a implementar os conceitos de OO na prática, criando classes e instâncias, interagindo com elas, aplicando seu conhecimento e exercitando sua capacidade de abstração. Você verá também algumas das boas práticas de design desse paradigma.

---

### Você será capaz de

- Implementar classes abstratas;

- Implementar classes concretas;

- Diferenciar métodos de instância e métodos de classe;

- Entender os casos de uso de herança e de composição;

- Entender os princípios SOLID.

---

## Por que isso é importante?

Para fazer um bom uso da orientação a objetos, você precisa entender como aplicar adequadamente seus conceitos e práticas. As abstrações erradas podem te levar a uma arquitetura falha e que gere mais complexidade do que flexibilidade, criando assim mais problemas do que os resolvendo. Um bom design é decidido desde a largada e te poupará muito tempo de manutenção no futuro.

---

## Conteúdos

###### Tempo sugerido para realização: 120 minutos

### Implementando o exemplo da redefinição de senha

##### Caso de uso

Para entender como implementar o paradigma de programação orientada a objetos em Python, vamos retomar o exemplo do dia anterior de redefinição de senha. Neste caso de uso temos uma pessoa usuária, que se esquecer a senha, deve poder receber um email para redefini-la.

<%= figure(%{src: "/computer-science/poo/oo-na-pratica/images/exemplo-redefinicao-de-senha.png", class: "text-center rounded mx-auto d-block", width: "700px", height: "auto", caption: "Diagrama de classes da redefinição de senha"}) %>

- **User:** Representa a entidade que armazenará as informações de uma pessoa usuária. Possui os atributos públicos `name`, `email` e `password`, mas não implementa suas regras de negócio, uma vez que podem variar por domínio;

- **Mailer:** Representa um gerenciador de envio de emails, que pode ser utilizado em qualquer parte do sistema. Ele possui as informações da mensagem a ser enviada (`from_email`, `from_password`, `to_email`, `subject` e `message`) e um método público `send_email`, que faz o envio do email efetivamente;

- **EmailNotFoundError:** Representa uma exceção customizada, que é lançada pelo gerenciador de envio de emails, caso não seja possível fazer este envio devido a algum dos emails não existir. Esta exceção herda da classe `Exception`, que é nativa do Python;

- **UserService:** Representa um serviço que implementa as regras de negócio associadas a uma pessoa usuária, como por exemplo, o envio de um email de redefinição de senha para o caso da pessoa ter esquecido sua senha.

    - Esse serviço é implementado através da composição de um `user` e uma classe `mailer`, e de um método público que dispara a redefinição de senha (`reset_password`). Seus atributos, _user_ e _mailer_, foram definidos como privados, pois precisam ser acessados apenas pela classe de serviço.

##### Agora o código

```language-python
import os
import smtplib
import ssl


class User:
    def __init__(self, name, email, password):
        """ Método construtor da classe User.

        Responsável por inicializar os atributos da instância.
        Aqui, a instância é representada por self, que deve ser
        declarada explicitamente.
        O self é um padrão de nomenclatura equivalente ao this,
        que é muito utilizado em outras linguagens."""
        self.name = name
        self.email = email
        self.password = password


class Mailer:
    def __init__(self, from_email, from_password, to_email, subject, message):
        self.from_email = from_email
        self.from_password = from_password
        self.to_email = to_email
        self.subject = subject
        self.message = message

    def send_email(self):
        body = f"Subject:{self.subject}\n\n{self.message}"
        context = ssl.create_default_context()
        with smtplib.SMTP_SSL(
            "smtp.gmail.com", 465, context=context
        ) as server:
            server.login(self.from_email, self.from_password)
            try:
                server.sendmail(self.from_email, self.to_email, body)
            except (smtplib.SMTPRecipientsRefused, smtplib.SMTPSenderRefused):
                raise EmailNotFoundError


class UserService:
    def __init__(self, user_instance, mailer_class):
        """Inicializa os atributos privados user e mailer com uma instância
        de usuário e uma classe de gerenciamento de emails.

        Quando delegamos um comportamento para uma classe ou instância externa
        através de um atributo interno, combinando implementações de diferentes
        classes, temos o que chamamos de composição.
        """
        self.__user = user_instance
        self.__mailer = mailer_class

    def reset_password(self):
        from_email = os.environ.get("SYSTEM_EMAIL", "app-dev@email.com")
        from_password = os.environ.get("SYSTEM_EMAIL_PASSWORD", "123456")
        to_email = self.__user.email
        subject = "Reset your password"
        message = "Instructions to reset your password"

        # Instanciamos a classe do __mailer e disparamos o envio do email
        self.__mailer(
            from_email, from_password, to_email, subject, message
        ).send_email()


class EmailNotFoundError(Exception):
    pass


# Código cliente (código que utiliza nossas classes)
user = User("name", "name@gmail.com", "?????")
service = UserService(user, Mailer)
"""Lembra quando dissemos que íamos explicar a diferença de mensagem e método?
Pois então, observe que, quando invocamos o método abaixo (reset_password), não
passamos o parâmetro self. Implicitamente o Python passa uma mensagem para a
instância, chamando o método já com o parâmetro self. Em outras palavras, podemos
dizer que a mensagem é uma camada acima do método que o encapsula"""
service.reset_password()
```

🤔 Você reparou que tem alguma coisa estranha na forma como utilizamos o mailer?!

Vem comigo que vamos entender o problema e solucioná-lo! 😎

##### Métodos de classe vs métodos de instância

Não faz muito sentido as informações, para o envio de email, estarem vinculadas à uma instância do `Mailer`, pois podemos enviar emails de diferentes contatos para diferentes contatos, utilizando o mesmo gerenciador de emails.

Por exemplo, se tivéssemos que receber múltiplos emails de contato, com o atual código seria feito da seguinte maneira:

```language-python
mailer = Mailer(
    "user1@gmail.com",
    "password1",
    "app-dev@gmail.com",
    "Contato",
    "Mensagem de User 1",
)
mailer.send_email()

mailer.from_email = "user2@gmail.com"
mailer.from_password = "password2"
mailer.message = "Mensagem de user 2"
mailer.send_email()

mailer.from_email = "user3@gmail.com"
mailer.from_password = "password3"
mailer.message = "Mensagem de user 3"
mailer.send_email()
```

Percebeu o problema?

Os dados utilizados no envio de email não precisam ser atributos. O ponto aqui é que essa classe não precisa armazenar o estado para realizar o seu propósito. Na verdade, seria melhor que os dados fossem enviados como argumentos para o método.

Mas como podemos fazer isso? Para entendermos como fazer isso, devemos primeiro aprender o que são métodos de instância e o que são métodos de classe:

- **Métodos de instância:** São métodos atrelados e executados por uma instância de uma classe;

- **Métodos de classe:**  São métodos atrelados diretamente à classe, não dependendo de uma instância para serem executados. O que significa que você pode chamar o método através da classe.

Entendido isso, o nosso novo `Mailer` deveria ser assim:

<%= figure(%{src: "/computer-science/poo/oo-na-pratica/images/exemplo-metodo-de-classe.png", class: "text-center rounded mx-auto d-block", width: "auto", height: "auto", caption: "Modificações na classe Mailer"}) %>

Vamos alterar o nosso código para ficar de acordo com o modelo de caso de uso acima:

```language-python
# ...

class Mailer:
    @classmethod
    def send_email(cls, from_email, from_password, to_email, subject, message):
        """Para criar métodos de classe em Python, precisamos de adicionar um
        @classmethod em sua assinatura.

        Observe também que em métodos de classe o parâmetro self é substituído
        pelo cls. Isto indica que receberemos uma classe e não uma instância,
        o que pode ser particularmente útil caso seja necessário acessar alguma
        informação da classe, como por exemplo, uma constante.
        """
        body = f"Subject:{subject}\n\n{message}"
        context = ssl.create_default_context()
        with smtplib.SMTP_SSL(
            "smtp.gmail.com", 465, context=context
        ) as server:
            server.login(from_email, from_password)
            try:
                server.sendmail(from_email, to_email, body)
            except (smtplib.SMTPRecipientsRefused, smtplib.SMTPSenderRefused):
                raise EmailNotFoundError


class UserService:
    def __init__(self, user_instance, mailer_class):
        """Inicializa os atributos privados user e mailer com uma instância
        de usuário e uma classe de gerenciamento de emails.
        """
        self.__user = user_instance
        self.__mailer = mailer_class

    def reset_password(self):
        from_email = os.environ.get("SYSTEM_EMAIL", "app-dev@email.com")
        from_password = os.environ.get("SYSTEM_EMAIL_PASSWORD", "123456")
        to_email = self.__user.email
        subject = "Reset your password"
        message = "Instructions to reset your password"

        # No UserService alteramos apenas este trecho de código
        # Disparamos o envio do email diretamente através da classe do __mailer
        self.__mailer.send_email(
            from_email, from_password, to_email, subject, message
        )

# ...
```

Com as modificações que fizemos no nosso código, o nosso exemplo de múltiplos envios de email ficaria assim:

```language-python
Mailer.send_email(
    "user1@gmail.com",
    "password1",
    "app-dev@gmail.com",
    "Contato",
    "Mensagem de User 1",
)

Mailer.send_email(
    "user2@gmail.com",
    "password2",
    "app-dev@gmail.com",
    "Contato",
    "Mensagem de User 2",
)

Mailer.send_email(
    "user3@gmail.com",
    "password3",
    "app-dev@gmail.com",
    "Contato",
    "Mensagem de User 3",
)
```

Sem uma instância para armazenar o estado, note o quão mais simples ficou substituir as informações de cada envio de email.

### Herança vs composição

Este é um tópico um tanto quanto polêmico na orientação a objetos, uma vez que frequentemente a herança é utilizada para o propósito errado. Esse é um erro comum pela aparente facilidade de criar uma modelagem inicial utilizando herança para compartilhar código, que a princípio funciona, mas depois pode virar um tiro no pé.

Mas como assim um tiro no pé?

Vamos ver um exemplo que demonstra as armadilhas do uso impróprio da herança:

Imagine que temos uma plataforma de relatórios de vendas, cujos dados serão consumidos por uma aplicação cliente em formato `JSON`. Para gerar esse relatório termos duas classes:

- `SalesReport`: Classe que gera o relatório a partir de consultas no banco de dados;

- `SalesReportJSON`: É uma especialização de `SalesReport`, que serializa nosso relatório de vendas no formato `JSON`.

```language-python
from abc import ABC, abstractmethod
from json import dump as json_dump


class SalesReport(ABC):
    # ...

    def build(self):
        # ...

    @abstractmethod
    def serialize(self):
        raise NotImplementedError


class SalesReportJSON(SalesReport):
    FILE_NAME = 'sales_report.json'

    def serialize(self):
        with open(SalesReportJSON.FILE_NAME, 'w') as file:
            json_dump(self.build(), file)
```

Com a nossa primeira funcionalidade entregue (serialização do nosso relatório para o formato `JSON`), nos foi pedido que nossa plataforma também seja capaz de exportar nosso relatório para o formato CSV.

Já que estamos usando herança, nada mais natural que criarmos uma nova especialização chamada `SalesReportCSV`:

```language-python
from csv import DictWriter
# ...


class SalesReportCSV(SalesReport):
    FILE_NAME = 'sales_report.csv'

    def serialize(self):
        with open(SalesReportCSV.FILE_NAME, 'w') as file:
            csv_writer = DictWriter(file, self.headers)
            csv_writer.writeheader()
            for item in self.build():
                csv_writer.writerow(item)
```

Temos nosso relatório em múltiplos formatos, mas com o crescimento dos nossos dados, nos foi solicitado que os arquivos fossem comprimidos.

Parece uma tarefa simples, certo? A princípio podemos apenas pegar os dados serializados que já temos prontos e comprimir.

```language-python
from zipfile import ZipFile
# ...


class SalesReportCompressedJSON(SalesReportJSON):
    def compress(self):
        self.serialize()
        with ZipFile('sales_report.zip', 'w') as zip_file:
            zip_file.write(SalesReportJSON.FILE_NAME)


class SalesReportCompressedCSV(SalesReportCSV):
    def compress(self):
        self.serialize()
        with ZipFile('sales_report.zip', 'w') as zip_file:
            zip_file.write(SalesReportCSV.FILE_NAME)
```

😱 Essa não, parece que a nossa estratégia de herança não ficou tão legal quanto esperávamos. Acabamos criando um código de compressão duplicado.

Mas e se extraíssemos o código de compressão para uma classe separada?

Nesse caso o que iríamos duplicar seria o código de serialização. Ou seja, não importa como utilizamos a nossa herança, vamos sempre ter que duplicar o código de compressão ou o de serialização.

Veja o que aconteceu no diagrama abaixo (códigos duplicados em vermelho):

<%= figure(%{src: "/computer-science/poo/oo-na-pratica/images/problema-heranca.png", class: "text-center rounded mx-auto d-block", width: "800px", height: "auto", caption: "Diagrama de classes do primeiro e do segundo cenário, lado a lado"}) %>

---

Esse é o problema de se utilizar herança para compartilhamento de código e não apenas para especialização. Para resolver isso deveríamos utilizar a composição, como demonstrado abaixo.

```language-python
from abc import ABC, abstractmethod
from csv import DictWriter
from json import dump as json_dump
from zipfile import ZipFile


class SalesReport:
    def __init__(self, sales, serializer=None, compressor=None):
        """Nesta implementação recebemos o serializador e o compressor
        como atributos. Com essa composição, podemos utilizar qualquer
        tipo de serializador e de compressor, ambos compartilhando
        o código da geração do relatório.
        """
        self.sales = sales
        self.serializer = serializer
        self.compressor = compressor

    def build(self):
        # ...

    def serialize(self):
        self.serializer.serialize(self.build())

    def compress(self):
        self.compressor.compress(self.serializer.FILE_NAME)


class Serializer(ABC):
    @classmethod
    @abstractmethod
    def serialize(cls, data):
        raise NotImplementedError

class JSONSerializer(Serializer):
    FILE_NAME = 'sales_report.json'

    @classmethod
    def serialize(cls, data):
        with open(SalesReportJSON.FILE_NAME, 'w') as file:
            json_dump(data, file)


class CSVSerializer(Serializer):
    FILE_NAME = 'sales_report.csv'

    @classmethod
    def serialize(cls, data):
        with open(SalesReportCSV.FILE_NAME, 'w') as file:
            csv_writer = DictWriter(file, fieldnames=data[0].keys())
            csv_writer.writeheader()
            for item in data:
                csv_writer.writerow(item)


class ZipCompressor:
    @classmethod
    def compress(cls, file_name):
        cls.serialize()
        with ZipFile('sales_report.zip', 'w') as zip_file:
            zip_file.write(file_name)
```

Modificamos o código de forma a ter interfaces definidas para a compressão e para a serialização, que por cumprirem um único propósito cada, podem ser especializadas para atender diferentes formatos. Desse modo, `SalesReport` pode compartilhar seu código com essas interfaces, através do uso de composição, garantindo que possa fazer quaisquer combinações que forem necessárias para seu funcionamento.

Veja o que aconteceu no diagrama depois da nossa refatoração:

<%= figure(%{src: "/computer-science/poo/oo-na-pratica/images/solucao-composicao.png", class: "text-center rounded mx-auto d-block", width: "700px", height: "auto", caption: "Solução para o problema de compartilhamento de código"}) %>

Com esse exemplo, vimos que a composição gerou um desacoplamento, concedendo uma flexibilidade que nos permite acrescentar novos formatos de compressão e serialização com facilidade. Além de nos permitir compartilhar ambas interfaces com qualquer novo relatório.

Em suma, utilize herança para especialização e composição para compartilhamento de código.

### SOLID

Como visto [anteriormente,](/back-end/architecture/solid/) **SOLID** é um acrônimo de cinco princípios da programação orientada a objetos e design de código. Vamos revisar estes princípios:

- **S**ingle responsibility principle (_Princípio da responsabilidade única_): uma classe deve ter apenas uma única responsabilidade. Quando falamos sobre responsabilidade única, isto não quer dizer que uma classe deva ter um código muito pequeno e específico, mas sim que todo o seu código deve estar diretamente relacionado a seu propósito.

- **O**pen/Closed principle (_Princípio aberto/fechado_): entidades de software (classes, módulos, funções etc) devem ser abertas para extensão, mas fechadas para modificação. Ou seja, uma alteração em seu código não deveria gerar uma cascata de outras alterações, mas sim uma extensão via herança ou composição. No entanto, estar fechado para modificação, não quer dizer que você não possa refatorar o seu código, desde que não fira este princípio antes de adicionar uma nova funcionalidade;

- **L**iskov substitution principle (_Princípio de substituição de Liskov_): objetos em um programa devem ser substituíveis por instâncias de seus subtipos, sem alterar a funcionalidade do programa. O que quer dizer, para que esta substituição seja possível, os subtipos devem seguir a interface de um tipo base;

- **I**nterface segregation principle (_Princípio da segregação da interface_): faça interfaces refinadas para um cliente específico. Cada interface deve ter um único propósito;

- **D**ependency inversion principle (_Princípio da inversão da dependência_): deve-se depender de abstrações, não de objetos concretos. Devemos depender da interface, logo do comportamento que uma entidade de software possui, e não de sua implementação.

Como os princípios de **S**ingle Responsability, **O**pen/Closed e **D**ependency inversion já foram estudados em detalhes, vamos destacar então os restantes.

##### **L**iskov substitution principle

Para entender como esse princípio funciona na prática, vamos voltar ao nosso exemplo de compressão e serialização:

<%= figure(%{src: "/computer-science/poo/oo-na-pratica/images/liskov.png", class: "text-center rounded mx-auto d-block", width: "700px", height: "auto", caption: "Exemplo prático do princípio da Liskov"}) %>

Onde eu receberia um compressor, eu poderia utilizar tanto um `ZipCompressor` quanto um `TarCompressor`, ou qualquer outro compressor que utilize a mesma interface (`Compressor`). O mesmo acontece com o serializador, cujos subtipos também são substituíveis sem alterar a funcionalidade do programa.

Um ponto de atenção que não podemos deixar de mencionar é que, em linguagens de tipagem dinâmica, não precisamos necessariamente utilizar um tipo genérico como o `Compressor` ou `Serializer` para definir seus subtipos. Pois há uma _inferência de tipo_, baseada no protocolo de comunicação, o que pode ser associado ao que chamamos de [duck-typing.](https://docs.python.org/pt-br/3/glossary.html#term-duck-typing) {: .external-link target="_blank" rel="noreferrer noopener" }

Uma analogia que podemos fazer para entender duck-typing é: "Se se parece com um pato e grasna como um pato, então deve ser um pato".

<%= figure(%{src: "/computer-science/poo/oo-na-pratica/images/duck-typing.gif", class: "text-center rounded mx-auto d-block", width: "300px", height: "auto", caption: "Gesonel, o mestre dos disfarces"}) %>

Porém, apesar de não precisarmos de utilizar um tipo genérico em linguagens de tipagem dinâmica, isso pode ser interessante para definir um protocolo de comunicação padrão, deixando a arquitetura bem definida.

##### **I**nterface segregation principle

Para entender como esse princípio funciona na prática, vamos extender o exemplo anterior:

<%= figure(%{src: "/computer-science/poo/oo-na-pratica/images/interface-segregation.png", class: "text-center rounded mx-auto d-block", width: "700px", height: "auto", caption: "Exemplo prático do princípio da Liskov"}) %>

No nosso exemplo temos a segregação das interfaces `Compressor` e `Decompressor`, uma vez que o código cliente pode não necessitar de fazer as duas operações. O mesmo pode acontecer com o `Serializer` e o `Deserializer`, onde cada interface tem um propósito específico de acordo com o que seus clientes precisam.

Assim como acontece no princípio da _Liskov_, aqui também pode-se incorrer o duck-typing.

---

## Vamos fazer juntos

###### Tempo sugerido para realização: 80 minutos

Aula ao vivo! Vamos para o Slack, onde o link estará disponível.

---

## Exercícios

###### Tempo sugerido para realização: 100 minutos

<%= versioning_your_code(@conn) %>

---

### Agora a prática

**Exercício 1:** Lembra do exercício da TV que já abstraímos? Hoje vamos implementar ele, porém com algumas modificações. Veja o diagrama abaixo:

<%= figure(%{src: "/computer-science/poo/oo-na-pratica/images/tv-uml.png", class: "text-center rounded mx-auto d-block", width: "auto", height: "auto", caption: "Diagrama de classes da TV"}) %>

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

**Exercício 2:** Defina uma classe `Estatistica` que calcule média, mediana e moda de uma lista de números.

🐦 Dica: Utilize métodos de classe.

<%= figure(%{src: "/computer-science/poo/oo-na-pratica/images/estatistica-uml.png", class: "text-center rounded mx-auto d-block", width: "auto", height: "auto", caption: "Diagrama de classes da Estatistica"}) %>

**Exercício 3:** Que tal agora relembrarmos o exercício das figuras geométricas? Implemente o diagrama de classes abaixo.

<%= figure(%{src: "/computer-science/poo/oo-na-pratica/images/figuras-geometricas-uml.png", class: "text-center rounded mx-auto d-block", width: "auto", height: "auto", caption: "Diagrama de classes das figuras geométricas"}) %>

**Exercício 4:** Implemente um sistemas de logs por nível de severidade, seguindo o diagrama abaixo.

<%= figure(%{src: "/computer-science/poo/oo-na-pratica/images/log-uml.png", class: "text-center rounded mx-auto d-block", width: "auto", height: "auto", caption: "Diagrama de classes do sistema de logs"}) %>

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

**Exercício 5:** Implemente um gerenciador de quartos de hotel, simplificado, conforme o diagrama a seguir.

<%= figure(%{src: "/computer-science/poo/oo-na-pratica/images/hotel-uml.png", class: "text-center rounded mx-auto d-block", width: "auto", height: "auto", caption: "Diagrama de classes do sistema de hoteis"}) %>

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

---

## Recursos adicionais (opcional)

- [O que é UML e Diagramas de Caso de Uso: Introdução Prática à UML](https://www.devmedia.com.br/o-que-e-uml-e-diagramas-de-caso-de-uso-introducao-pratica-a-uml/23408) {: .external-link target="_blank" rel="noreferrer noopener" }

- [UML - Examples by Types of Diagrams](https://www.uml-diagrams.org/index-examples.html) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Composition over inheritance - The MurderRobotDog taxonomy problem](https://medium.com/humans-create-software/the-murderrobotdog-taxonomy-problem-767eb1785731) {: .external-link target="_blank" rel="noreferrer noopener" }

- [RailsConf 2015 - Nothing is Something](https://www.youtube.com/watch?v=OMPfEXIlTVE) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Live de Python - Composição e métodos mágicos](https://www.youtube.com/watch?v=MYaXUrmvrho) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Uncle Bob - The Principles of OOD](http://butunclebob.com/ArticleS.UncleBob.PrinciplesOfOod) {: .external-link target="_blank" rel="noreferrer noopener" }

- [SOLID Object-Oriented Design by Sandi Metz](https://www.youtube.com/watch?v=v-2yFMzxqwU) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
