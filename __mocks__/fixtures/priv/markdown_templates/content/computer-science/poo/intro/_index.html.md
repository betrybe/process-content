## O que vamos aprender?

Hoje, você vai aprender sobre paradigmas de programação, em especial, focando em Orientação a Objetos, que é amplamente utilizado no mercado. Ou seja, você aprenderá o que são paradigmas, a diferença entre programação orientada a objetos e outros paradigmas, como OO funciona, seus principais pilares e como aplicá-los.

---

### Você será capaz de:

- Entender o que são paradigmas de programação e quais são;

- Entender os principais conceitos e termos referentes à orientação a objetos;

- Entender os pilares da orientação a objetos e como aplicá-los.

---

## Por que isso é importante?

Devido à sua ampla adoção, certamente POO é um paradigma que você irá se deparar no mercado de trabalho ainda no início de sua carreira. Então é muito importante que você aprenda seus conceitos e mais importante do que isso, a implementá-los usando as melhores práticas, que é algo que naturalmente vai ser evoluído ao longo do tempo e da sua experiência.

A orientação a objetos é um de vários paradigmas e está aí para te ajudar a fazer bons códigos, com boas arquiteturas. Mas cuidado, não existe nenhuma metodologia que é "bala prata" e que vai garantir o uso de boas práticas. Sempre tome suas decisões com cautela e consciência para aproveitar o melhor da sua arquitetura.

Apesar de no início a OO (_Orientação a Objetos_) gerar a impressão de que você está apenas escrevendo mais código para fazer o mesmo, ao longo do tempo esse esforço se paga. Veja o [gráfico](https://martinfowler.com/bliki/DesignStaminaHypothesis.html) {: .external-link target="_blank" rel="noreferrer noopener" } feito pelo próprio [Martin Fowler,](https://martinfowler.com/) {: .external-link target="_blank" rel="noreferrer noopener" } grande autor de livros sobre engenharia de software, que demonstra esse limiar de custo-benefício (ou _design payoff line_, em inglês).

---

<%= figure(%{src: "/computer-science/poo/intro/images/design-stamina-graph.gif", class: "text-center rounded mx-auto d-block", width: "600px", height: "auto", alt: "Gráfico que demonstra o esforço do uso vs não uso de um design de software", caption: "Gráfico que demonstra o esforço do uso X não uso de um design de software"}) %>

---

## Conteúdos

###### Tempo sugerido para realização: 120 minutos

### O que é Orientação a Objetos?

O conceito de orientação a objetos vem de duas palavras-chave, que são os objetos e as mensagens que eles passam entre si. Sendo o objeto a estrutura que armazena informações e comportamentos de um determinado tipo de dado. Porém, não se engane, pois apesar de estarmos falando de orientação a objetos, o conceito mais importante aqui não é o de objetos, mas sim o de **mensagens**.

Mas, o que são mensagens afinal?

Podemos dizer que uma mensagem é um nome dado para uma responsabilidade que um objeto pode ter, sendo enviada para invocar um comportamento, que pode ou não alterar o estado de um objeto. Quando um objeto recebe uma mensagem, ele pode decidir o que fazer com ela, o que pode mudar ao longo de seu tempo de vida.

O fato dos objetos se comunicarem e invocarem seus comportamentos através de mensagens, é o que faz com que as mensagens sejam muito mais importantes que os objetos propriamente ditos. Em suma, o que define a qualidade da arquitetura de um projeto é como a comunicação acontece, não os dados que os objetos armazenam ou os comportamentos que possuem.

<%= figure(%{src: "/computer-science/poo/intro/images/tecnica-de-pomodoro.png", class: "text-center rounded mx-auto d-block", width: "300px", height: "auto", alt: "Calma, faça uma pausa", caption: "☕ Calma, faça uma pausa! ☕"}) %>

> Sei que o conceito de mensagens ainda está abstrato e complexo, mas calma. Pare, tome uma água e depois continue lendo o texto, que mais a frente nós vamos ver isso mais na prática. Se precisar, após o exemplo prático, volte aqui e verá que tudo faz sentido.

### O que são paradigmas de programação? E quais são?

Segundo o dicionário, paradigma é a representação de um padrão a ser seguido, um modelo. Quando trazemos o conceito para a programação, ele mantem seu significado, representando padrões e estruturas para desenvolver softwares. Padrões esses que são independentes de uma linguagem de programação ou uma forma de implementação específica.

Mas lembre-se, não é porque os paradigmas são diferentes que eles não compartilham nenhuma característica ou que eles não podem ser utilizados em conjunto. Eles tanto podem ser utilizados em conjunto, que temos linguagens multiparadigma, como por exemplo `Python` e `JavaScript`, que apesar de terem um paradigma predominante, possuem recursos de outros paradigmas para auxiliar na resolução de problemas.

_OK_, se existem vários paradigmas, então quais são eles?

Os principais paradigmas atualmente são:

- **Estruturado:** É um paradigma composto apenas por estruturas de programação básicas, como variáveis, funções, módulos, condicionais e laços de repetição. Não possuindo formas mais complexas de organização de código.

    **Exemplo em Python:**

```language-python
def sum(n1, n2):
    return n1 + n2


def subtract(n1, n2):
    return n1 - n2


def multiply(n1, n2):
    return n1 * n2


def divide(n1, n2):
    return n1 / n2


result = sum(2, 2)

print('Resultado de 2 + 2:', result)
```

- **Orientado a objetos:** Utiliza objetos para realizar a troca de mensagens na aplicação. Como dito anteriormente, objetos são uma estrutura de dados mais complexa, que mescla informações e comportamentos.

    **Exemplo em Python:**

```language-python
class Calculator:
    def __init__(self, n1, n2):
        self.n1 = n1
        self.n2 = n2
        self.result = 0

    def sum(self):
        self.result = self.n1 + self.n2

    def subtract(self):
        self.result = self.n1 - self.n2

    def multiply(self):
        self.result = self.n1 * self.n2

    def divide(self):
        self.result = self.n1 / self.n2


calc = Calculator(4, 4)
calc.sum()

print('Resultado de 4 + 4:', calc.result)
```

- **Funcional:** Trata-se de um paradigma fundamentado com base na avaliação de funções matemáticas. Em outras palavras, ele enfatiza a utilização de funções e expressões, que definem ou evoluem o estado das informações. Nesse paradigma, os dados são imutáveis, mas os estados não.

    > 💡 Caso queira ver uma explicação mais detalhada, leia este [artigo.](https://pt.wikipedia.org/wiki/Programa%C3%A7%C3%A3o_funcional) {: .external-link target="_blank" rel="noreferrer noopener" }

    **Exemplo em Haskell:**

```language-haskell
fibonacci 0 = 0
fibonacci 1 = 1
fibonacci n = fibonacci(n - 1) + fibonacci(n - 2)
```

- **Lógico:** Permite a invocação de funções, que são orientadas a padrões de verificação e de objetivos. Geralmente é utilizado para desenvolver árvores de decisões, ou outros algoritmos associados à análise de dados e inteligência artificial.

    > 💡 Caso queira ver uma explicação mais detalhada, leia este [artigo.](https://pt.wikipedia.org/wiki/Programa%C3%A7%C3%A3o_l%C3%B3gica) {: .external-link target="_blank" rel="noreferrer noopener" }

    **Exemplo em Prolog:**

```language-prolog
% plus(?Int1, ?Int2, ?Int3)
% É uma função embutida na linguagem, que retorna True se Int3 = Int1 + Int2.
% Pelo menos dois dos três argumentos precisam ser passados para que seja
% possível realizar uma avaliação.

% Exemplos de uso:
?- plus(1, 2, 3).                    % True, pois 1 + 2 = 3
?- plus(1, 2, 4).                    % False, pois 1 + 2 != 4
?- plus(1, 2, X).                    % X = 3, pois 1 + 2 = X
?- plus(1, X, 3).                    % X = 2, pois 1 + X = 3
?- plus(X, 2, 3).                    % X = 1, pois X + 2 = 3
?- plus(X, 5, Y).                    % Erro
```

### Então, se existem outros paradigmas, quais são as vantagens de POO e quais problemas resolve?

A orientação a objetos nos permite criar códigos bem estruturados e reaproveitáveis de forma simples, com uma curva de aprendizagem inicial relativamente baixa. Possui várias técnicas e boas práticas muito bem documentadas por diversas autoras e autores de renome, o que também facilita para encontrar materiais de qualidade sobre o assunto. O que certamente tem influência na adoção do paradigma.

Para fundamentar ainda mais as vantagens do paradigma, veja o trecho abaixo, feito a partir de uma tradução livre de parte do artigo [Breaking Up the Behemoth](https://sandimetz.com/blog/2017/9/13/breaking-up-the-behemoth) {: .external-link target="_blank" rel="noreferrer noopener" } da [Sandi Metz](https://sandimetz.com/) {: .external-link target="_blank" rel="noreferrer noopener" }, uma grande guru da orientação a objetos.

##### Código orientado a objetos vs código estruturado

Esta seção compara códigos estruturados e OO em termos de dificuldade de alteração e de compreensão. O gráfico a seguir explora as diferenças de custo-benefício entre ambos.

<%= figure(%{src: "/computer-science/poo/intro/images/procedural-vs-oo-code.jpg", class: "text-center rounded mx-auto d-block", width: "600px", height: "auto", alt: "Gráfico que compara código estruturado e OO", caption: "Gráfico que compara código estruturado e OO"}) %>

A dificuldade de alterar o código se encontra no eixo vertical (eixo Y), onde os códigos mais fáceis de alterar se encontram na parte inferior e os códigos mais difíceis de alterar se encontram na parte superior.

Já a dificuldade de compreensão se encontra no eixo horizontal (eixo X), onde os códigos mais fáceis de compreender se encontram na parte esquerda e os códigos mais difíceis de compreender se encontraram na parte direita.

Uma simples função/procedimento é meramente uma lista de passos, sendo fáceis de entender e de alterar. Por isso se encontra na parte inferior esquerda, que representa o melhor custo benefício.

Para alguns problemas, um código simples, sem duplicações e condicionais, é a melhor solução. Porém, ao longo do tempo, a situação pode mudar. Uma nova funcionalidade pode lhe forçar a adicionar lógicas condicionais, ou duplicações de partes da solução em diferentes partes do código.

Ao chegar nesse ponto o custo-benefício do uso de código estruturado se torna alto, sendo o código complexo, com vários fatores que o torna difícil de compreender e de alterar. Ou seja, apesar de códigos estruturados simples serem baratos de manter, códigos complexos são muito caros.

É aí que entra a orientação a objetos, que é uma solução um pouco mais cara para resolver problemas simples, mas que se torna muito mais barata para problemas complexos, quando utilizada com as abstrações corretas.

Em soluções orientadas a objetos, temos objetos pequenos e intercambiáveis, que colaboram enviando mensagens entre si. As mensagens oferecem uma forma de conectar diferentes objetos para compor soluções. Isso significa que o envio de mensagens facilita a mudança de comportamento, já que podemos substituir objetos existentes por novos, que desempenham o mesmo papel. Consequentemente, a OO também facilita evolução do software.

<%= figure(%{src: "/computer-science/poo/intro/images/tecnica-de-pomodoro.png", class: "text-center rounded mx-auto d-block", width: "300px", height: "auto", alt: "Que tal dar mais um folego, antes de seguirmos no conteúdo?", caption: "☕ Que tal dar mais um folego, antes de seguirmos no conteúdo? ☕"}) %>

> Faça uma pequena pausa para descansar e assimilar os próximos conteúdos.

### Principais termos e conceitos da orientação a objetos

Que tal agora deixarmos as coisas mais palpáveis utilizando de um exemplo da vida real para explicar os termos?

No exemplo a seguir temos o caso de uso de uma pessoa usuária, que se esquecer a senha, deve poder receber um email para redefini-la.

<%= figure(%{src: "/computer-science/poo/intro/images/exemplos-de-classes.png", class: "text-center rounded mx-auto d-block", width: "700px", height: "auto", alt: "Exemplos das classes User, Mailer, EmailNotFoundError e UserService", caption: "Exemplos das classes \`User\`, \`Mailer\`, \`EmailNotFoundError\` e \`UserService\`"}) %>

Vamos destrinchar esse exemplo, para definirmos os principais termos e conceitos da OO.

##### Classe

Uma classe consiste numa espécie de molde para criação de novos objetos, definindo seus atributos e métodos comuns que serão utilizados por ele.

Esse molde pode ser utilizado para definições de diferentes tipos de dados. No exemplo acima temos:

- **User:** Representa a entidade que armazenará as informações de uma pessoa usuária;

- **Mailer:** Representa um gerenciador de envio de emails, que pode ser utilizado em qualquer parte do sistema;

- **EmailNotFoundError:** Representa uma exceção customizada, que é lançada pelo gerenciador de envio de emails, caso não seja possível fazer este envio devido a algum dos emails não existir;

- **UserService:** Representa um serviço que implementa as regras de negócio associadas a uma pessoa usuária, como por exemplo, o envio de um email de redefinição de senha para o caso da pessoa ter esquecido sua senha.

Percebeu que as classes podem representar moldes de diversos tipos?

Isso é uma das coisas que nos permite dividir tão bem as responsabilidades ao usar OO.

##### Objeto/Instância

Com a classe criada, podemos instanciar um objeto. Instanciar é o ato de criar um novo objeto/instância a partir da classe definida.

Se formos fazer um paralelo, podemos dizer que a classe define os comportamentos e o objeto armazena o estado.

A forma de fazer isso varia de linguagem para linguagem. Observe uma instanciação na prática em Python:

```language-python
mailer = Mailer(
  "app-dev@email.com",
  "123456",
  "user@email.com",
  "Redefina a sua senha",
  "Instruções de redefinição de senha"
)
```

Nesse exemplo criamos uma instância de um gerenciador de email com as informações passadas por parâmetro.

##### Atributo

Atributos são onde as informações de uma instância são armazenadas. Eles representam o estado do objeto.

No nosso exemplo as classes armazenam as seguintes informações:

- **User:** Uma instância de `User` armazena informações de nome, email e senha de cada pessoa usuária da nossa aplicação;

- **Mailer:** Uma instância de `Mailer` armazena as informações de quem envia e quem recebe o email, seu assunto e seu conteúdo.

- **EmailNotFoundError:** Classes não precisam necessariamente ter atributos. Essa classe por exemplo, apenas representa um tipo de exceção, não definindo nenhum atributo;

- **UserService:** Atributos não precisam armazenar apenas informações de tipos de dados primitivos, podendo armazenar também instâncias de outras classes, ou até mesmo uma classe em si. Nesse caso, uma instância da classe `UserService` armazena uma instância de uma pessoa usuária e uma classe de gerenciamento de emails.

##### Método

Métodos são funções que possuem acesso aos dados armazenados em atributos, podendo implementar comportamentos e alterar seus estados.

Como um método realiza uma ação, a utilização de verbos é uma boa prática para nomeá-los. Nomes como `redefinir_senha` ou `reset_password` poderiam ser utilizados para um método que implementa o comportamento de redefinição de senha.

Veja o exemplo abaixo, que envia uma mensagem de redefinição de senha. Essa mensagem, que é chamada implicitamente, invoca o método `reset_password` de uma instância de `Mailer`:

```language-python
mailer = Mailer(
  "app-dev@email.com",
  "123456",
  "user@email.com",
  "Redefina a sua senha",
  "Instruções de redefinição de senha"
)

mailer.reset_password()
```

Não se preocupe, na próxima aula vamos desvendar essa mensagem implícita.

##### Construtor

É um método especial utilizado para inicializar instâncias de uma classe e que pode receber parâmetros usados para definir as informações armazenadas em seus atributos.

O nome e a implementação desse método especial varia de linguagem para linguagem, bem como a forma de invocá-lo.

##### Interface/Protocolo

Uma interface nada mais é do que uma representação abstrata dos protocolos de comunicação ou assinaturas utilizadas em orientação a objetos.

Esse conceito pode ser aplicado em diferentes contextos. Vamos analisar a interface da classe `Mailer`, por exemplo:

- A interface da classe `Mailer` é representada pelos atributos `from_email`, `from_password`, `to_email`, `subject` e `message`, em conjunto com um método `send_email`, que não recebe parâmetros;

- A interface do construtor de `Mailer` recebe como parâmetros as informações de `from_email`, `from_password`, `to_email`, `subject` e `message`;

- A interface do método `send_email` é representada apenas pelo seu nome, sem nenhum parâmetro.

Porém, apesar de termos demonstrado, nesse exemplo, o conceito somente com interfaces com implementações concretas, interfaces também podem ser apenas representações abstratas, com assinaturas de métodos sem qualquer implementação associada. Isso poderia ser feito através de uma classe abstrata, que será explicada logo a seguir.

##### Classe abstrata

Classes abstratas são aquelas que via de regra devem servir apenas como modelos para suas subclasses, sendo abstrações que definem protocolos de comunicação. Elas podem possuir tanto métodos abstratos (apenas com assinatura, mas sem implementação) quanto métodos concretos (que possuem implementação). Porém, se tiver métodos concretos, esses devem ser apenas aqueles que terão uma implementação comum a todas as subclasses.

Uma classe abstrata não pode ser instanciada e suas subclasses devem ser uma especialização, herdando sua interface e podendo implementar seus métodos abstratos. Se todos os métodos abstratos forem implementados por uma de suas especializações, então essa especialização é considerada uma classe concreta.

Porém, atente-se ao fato de que se uma subclasse de uma classe abstrata não implementar algum de seus métodos abstratos, ela continua sendo uma classe abstrata. Qualquer classe que possui métodos abstratos é considerada abstrata.

Como todos os conceitos de OO, sua implementação varia de linguagem para linguagem, mas sua ideia permanece a mesma: especialização. Por exemplo, se estivéssemos no contexto de uma aplicação de educação, `User` poderia ser uma classe abstrata e `Student` e `Teacher` poderiam ser suas subclasses concretas, já que são dois tipos diferentes de pessoas usuárias.

Agora que você sabe o que é uma classe abstrata, você deve estar se perguntando quais são suas principais vantagens. Certo?

Bom, suas principais vantagens estão associadas a grande parte dos pilares da orientação a objetos: abstração, herança e polimorfismo.

### Pilares da orientação a objetos

Para compreender os pilares vamos usar um exemplo prático, em que queremos implementar uma forma de armazenar os dados de nossa aplicação em um repositório, mas esse repositório é genérico, podendo ser um `MySQL`, um `MongoDB`, ou qualquer outro. Para isso poderíamos ter uma classe abstrata `Repository` e duas classes concretas `MySQLRepository` e `MongoDBRepository`, que herdam sua interface de `Repository`.

Veja o diagrama de classes abaixo:

<%= figure(%{src: "/computer-science/poo/intro/images/exemplo-pilares-oo.png", class: "text-center rounded mx-auto d-block", width: "350px", height: "auto", alt: "Diagrama de classes dos repositórios", caption: "Diagrama de classes dos repositórios"}) %>

No diagrama de exemplo, implementamos apenas edição de dados de quaisquer entidades, que será feita através do método de `update`. Dados esses que devem ser validados por `validate_attributes`, que para fins desse exemplo só irá verificar se os atributos passados para o `update` existem na instância da entidade a ser editada.

##### Abstração

No contexto de orientação a objeto, este conceito está ligado à definição de características de uma classe de forma abstrata, focando em sua interface. Ou seja, podemos associar esse conceito a criação de classes abstratas, que são uma representação em alto nível de um tipo, que deve ser especializado até chegar a uma implementação concreta, como por exemplo acontece com a nossa classe `Repository`.

Porém, apesar de termos definido o pilar dessa forma, entenda que a palavra abstração pode ser usada de maneira muito mais ampla. Então não estranhe se você ouvi-la fora do contexto de classes abstratas.

##### Herança

A herança, como o próprio nome já diz, é o princípio que define que uma classe deve **ser capaz de herdar** seus atributos e métodos de outra. E embora a classe base possa ter tanto métodos abstratos (que precisam ser implementados) quanto métodos concretos (que já estão implementados), a boa prática diz que a herança deve ser usada apenas para especialização. Se você quer apenas compartilhar código, use composição.

Mas não se preocupe em entender o que é composição agora. Vamos entrar em detalhes nesse assunto de _herança X composição_ na próxima aula. Por hora foque apenas na especialização, como é o caso do nosso exemplo em que especializamos `Repository` através de `MySQLRepository` e `MongoDBRepository`.

##### Encapsulamento

Encapsulamento se trata de esconder parte da implementação de uma classe, exibindo de forma pública somente aquilo que é necessário para que o cliente consuma sua classe e deixando detalhes da implementação protegidos ou privados. Porém, apesar de darmos nomes a essas restrições de visibilidade, elas podem ser implementadas de diferentes maneiras dependendo de linguagem para linguagem e não necessariamente precisam ter uma palavra-chave associada (como é o caso do Python e do JavaScript, por exemplo).

No nosso exemplo, o método `validate_attributes` está encapsulado, sendo um detalhe de implementação necessário para a edição, mas que não precisa ser conhecido por alguém que utiliza o repositório. Com isso, a implementação de `validate_attributes` pode ser alterada o quanto for necessário, sem mudar a interface do método `update`. Porém, se você for alterá-lo, isso deve ser feito apenas na classe base (você não deve sobrescrever métodos encapsulados).

##### Polimorfismo

Segundo o dicionário, a palavra "polimorfismo" significa "qualidade ou estado de ser capaz de assumir diferentes formas". Em POO, o polimorfismo é caracterizado quando duas ou mais classes contêm implementações diferentes para métodos com a mesma interface.

Por exemplo, o método `update` de `MySQLRepository` e `MongoDBRepository` é um método polimórfico. Pois ele possui duas implementações diferentes, dependendo da classe concreta utilizada, uma salvando a edição no `MySQL` e outra no `MongoDB`, mas ambas possuem a mesma interface.

##### Colocando a mão na massa

Para ajudar a fixar os conceitos, vamos colocar a mão na massa e fazer um pouco de código. Porém, tenha em mente que apesar de todos os conceitos de orientação a objetos terem uma definição específica, a forma como são implementados podem variar de acordo com a linguagem de programação.

> Repository.py

```language-python
"""O módulo abc, ou Abstract Base Class, é o módulo que fornece a estrutura
para criar classes abstratas em Python.
"""
from abc import ABC, abstractmethod


class Repository(ABC):
    @abstractmethod
    def update(self, entity, **kwargs):
        raise NotImplementedError

    def _validate_attributes(self, entity, **kwargs):
        """Lança uma exceção caso a entidade não possua algum dos atributos.

        Normalmente, validações de atributo são implementadas por classes e
        não por um código compartilhado. Este exemplo está dessa forma, apenas
        para demonstrar o encapsulamento.

        Em Python há uma convenção que diz que atributos prefixados com _ (um under) são
        protegidos e atributos prefixados __ (dois under) são privados. Essa restrição de
        visibilidade pode ter sintaxes diferentes de acordo com a linguagem
        de programação, como por exemplo, algumas utilizam as palavras-chave
        public, protected e private.
        """
        if kwargs.keys() - entity.__dict__.keys():
            raise AttributeError
```

> MySQLRepository.py

```language-python
class MySQLRepository(Repository):
    def update(self, entity, **kwargs):
        "Sobrescreve o método update da interface, implementando a atualização"
        self._validate_attributes(entity, **kwargs)
        entity.update().where(id=entity.id).values(**kwargs)
```

> MongoDBRepository.py

```language-python
class MongoDBRepository(Repository):
    def update(self, entity, **kwargs):
        "Sobrescreve o método update da interface, implementando a atualização"
        self._validate_attributes(entity, kwargs)
        entity.objects(id=entity.id).update(**kwargs)
```

> User.py

```language-python
# ...

class User:
    # ...

    def update(self, **kwargs):
        """Atualiza uma pessoa usuária no repositório do MySQL.

        No cliente é possível chamar o método update do MySQLRepository,
        mas não o validate_attributes. Isso acontece devido ao encapsulamento.
        """
        MySQLRepository.update(self, **kwargs)
```

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

Vamos exercitar nossa capacidade de abstração em diferentes cenários. Em cada exercício reflita sobre a modelagem, as características, o comportamento e relações entre as classes.

**Exercício 1:** Em um contexto de orientação a objetos, como podemos definir o que são mensagens e qual a sua importância?

**Exercício 2:** Após definir mensagens, como podemos definir interface e qual a relação entre os conceitos?

**Exercício 3:** Para exercitar nossa capacidade de abstração, vamos modelar algumas partes de um software de geometria. Como poderíamos modelar um objeto retângulo?

🐦 Para ajudar, segue o exemplo do quadrado. Vamos utilizar a seguinte notação para descrever nossas abstrações:

```language-md
Nome da abstração
Quadrado

atributos/estados
- lado (tamanho)

comportamentos
- calcular area (lado * lado)
- calcular perímetro (4 * lado)
```

**Exercício 4:** E como poderíamos definir um círculo?

**Exercício 5:** Notaram que todas estas classes tem características em comum? Que tal abstrairmos utilizando a herança em uma classe que represente figuras geométricas em geral? Utilize a mesma notação anterior.

🐦 Reflita e considere características abstratas. Adicione também um espaço para demonstrar as relações existentes como o exemplo abaixo:

```language-md
relações:
- Círculo é uma especialização de uma figura geométrica
```

**Exercício 6:** Vamos mudar um pouco nosso contexto para um sistema de vendas de uma cafeteria. Como podemos abstrair um pedido?
Quais as suas características e comportamentos?

**Exercício 7:** Considerando que uma das características de um pedido pode ser a sua forma de pagamento (cartão alimentação, cartão débito/crédito, dinheiro), como poderíamos definir cada uma das formas de pagamento? E se todas as formas de pagamento tivessem como requisito a autorização antes do pagamento?

🐦 Um detalhe aqui é que como todos tipos de pagamentos possuem o comportamento de autorização, que podem variar pedido a pedido.

**Exercício 8:** Imagine um sistema de mensageria em uma empresa de _delivery_, que notifica uma base de cliente sobre suas promoções. Estas notificações devem ser feitas por email, sms ou push notification e você é a pessoa responsável por modelar este serviço. Defina utilizando a mesma notação dos exercícios anteriores.

**Exercício 9:** Notou que os pilares da orientação a objetos começam a manifestar a medida que fizemos nossos exercícios de modelagem? Que tal agora então modelarmos uma televisão? Será que mais pilares aparecerão?

🐦 Pense em como encapsular comportamentos como o estado (ligado/desligado), ou a taxa de variação do volume, que muda de TV para TV etc.

---

## Recursos adicionais (opcional)

- [Alan Kay On Messaging](http://wiki.c2.com/?AlanKayOnMessaging) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Código Fonte TV - Programming Paradigms](https://www.youtube.com/watch?v=EefVmQ2wPlM) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Learn Haskell in Y minutes](https://learnxinyminutes.com/docs/haskell/) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Learn Prolog in Y minutes](https://learnxinyminutes.com/docs/prolog/) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Conceitos - Classes Abstratas](https://www.devmedia.com.br/conceitos-classes-abstratas-programacao-orientada-a-objetos/18812) {: .external-link target="_blank" rel="noreferrer noopener" }

- [ABC - Abstract Base Classes](https://docs.python.org/3/library/abc.html) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Pisani - Orientação a objetos - os 4 grandes pilares do paradigma](https://www.youtube.com/watch?v=1fXfDKtSip4) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Python - Classes with encapsulated state](https://github.com/fluentpython/pyob2019/blob/master/03-classes.ipynb) {: .external-link target="_blank" rel="noreferrer noopener" }

- [OOP: You’re Doing It Completely Wrong](https://vimeo.com/91672848?__s=xuey6qecxo2cunfuas8e) {: .external-link target="_blank" rel="noreferrer noopener" }

- [O que é UML e Diagramas de Caso de Uso: Introdução Prática à UML](https://www.devmedia.com.br/o-que-e-uml-e-diagramas-de-caso-de-uso-introducao-pratica-a-uml/23408) {: .external-link target="_blank" rel="noreferrer noopener" }

- [UML - Examples by Types of Diagrams](https://www.uml-diagrams.org/index-examples.html) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
