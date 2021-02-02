## Gabarito dos exercícios

A seguir encontra-se uma sugestão de solução para os exercícios propostos.

**Exercício 1:** Em um contexto de orientação a objetos, como podemos definir o que são mensagens e qual a sua importância?

De acordo com o conteúdo, uma mensagem é uma das responsabilidades que um objeto pode ter, sendo utilizada para invocar um comportamento. Quando uma mensagem é enviada a um objeto, o mesmo pode ou não alterar seu estado. É importante, pois orientação a objetos é sobre objetos e sua comunicação. E essa comunicação entre os objetos é feita através de mensagens.

**Exercício 2:** Após definir mensagens, como podemos definir interface e qual a relação entre os conceitos?

Retirado do texto: "Uma interface é nada mais do que uma representação abstrata dos protocolos de comunicação ou assinaturas utilizadas em orientação a objetos". A relação entre os conceitos se dá através de mensagens que representam a comunicação entre objetos e de interfaces que representam de forma abstrata sua assinatura.

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


_Solução:_

```language-md
Nome da abstração
Retângulo

atributos/estados
- base (tamanho)
- altura (tamanho)

comportamentos
- calcular area (base * altura)
- calcular perímetro (2 * (base + altura))
```

**Exercício 4:** E como poderíamos definir um círculo?

_Solução:_

```language-md
Nome da abstração
Círculo

atributos/estados
- PI
- raio

comportamentos
- calcular area (PI * raio * raio)
- calcular perímetro (2 * PI * raio)
```

**Exercício 5:** Notaram que todas estas classes tem características em comum? Que tal abstrairmos utilizando herança uma classe que represente figuras geométricas em geral? Utilize a mesma notação anterior.

🐦 Reflita e considere características abstratas. Adicione também um espaço para demonstrar as relações existentes como o exemplo abaixo:

```language-md
relações:
- Círculo é uma especialização de uma figura geométrica
```

_Solução:_

```language-md
Nome da abstração
Figura Geométrica (abstrata)

atributos/estados

comportamentos
- calcular area (não implementado)
- calcular perímetro (não implementado)



Nome da abstração
Círculo

atributos/estados
- PI
- raio

comportamentos
- calcular area (PI * raio * raio)
- calcular perímetro (2 * PI * raio)

relações:
- Círculo é uma especialização de uma figura geométrica
```

**Exercício 6:** Vamos mudar um pouco nosso contexto para um sistema de vendas de uma cafeteria. Como podemos abstrair um pedido?
Quais as suas características e comportamentos?

_Solução:_

```language-md
Nome da abstração
Pedido

atributos/estados
- cliente
- itens consumidos
- forma de pagamento
- descontos

comportamentos
- calcular total
- calcular total com descontos
```

**Exercício 7:** Considerando que uma das características de um pedido pode ser a sua forma de pagamento (cartão alimentação, cartão débito/crédito, dinheiro), como poderíamos definir cada uma das formas de pagamento? E se todas as formas de pagamento tivessem como requisito a autorização antes do pagamento?

🐦 Um detalhe aqui é que como todos tipos de pagamentos possuem o comportamento de autorização, que podem variar pedido a pedido.

_Solução:_

```language-md
Nome da abstração
Forma de Pagamento(abstrata)

atributos/estados
- valor

comportamentos
- autorização



Nome da abstração
Dinheiro

atributos/estados

comportamentos
- autorização (sempre verdadeira)

relações:
- Dinheiro é uma forma de pagamento



Nome da abstração
Cartão de débito/crédito

atributos/estados

comportamentos
- autorização

relações:
- Cartão de crédito/débito é uma forma de pagamento



Nome da abstração
Cartão alimentação

atributos/estados

comportamentos
- autorização

relações:
- Cartão de alimentação é uma forma de pagamento
```

**Exercício 8:** Imagine um sistema de mensageria em uma empresa de _delivery_, que notifica uma base de cliente sobre suas promoções. Estas notificações devem ser feitas por email, sms ou push notification e você é a pessoa responsável por modelar este serviço. Defina utilizando a mesma notação dos exercícios anteriores.

_Solução:_

```language-md
Nome da abstração
Messenger(abstrato)

atributos/estados
- destinatários
- assunto
- mensagem

comportamentos
- enviar



Nome da abstração
Mailer

atributos/estados
- rementente
- destinatários
- assunto
- mensagem

comportamentos
- enviar

relações
- Mailer é um Messenger



Nome da abstração
SMS

atributos/estados
- rementente
- destinatários
- assunto
- mensagem

comportamentos
- enviar

relações
- SMS é um Messenger



Nome da abstração
Push Notification

atributos/estados
- destinatários
- assunto
- mensagem

comportamentos
- enviar

relações
- Push Notification é um Messenger
```

**Exercício 9:** Notou que os pilares da orientação a objetos começam a manifestar a medida que fizemos nossos exercícios de modelagem? Que tal agora então modelarmos uma televisão? Será que mais pilares aparecerão?

🐦 Pense em como encapsular comportamentos como o estado (ligado/desligado), ou a taxa de variação do volume, que muda de TV para TV etc.

_Solução:_

```language-md
Nome da abstração
Televisão

atributos/estados
- volume
- canal
- taxa de aumento do volume (a taxa de aumento do volume será encapsulada pela interface, que expõe o aumento do volume, mas não o quanto ele será aumentado)
- tamanho (não pode ser modificado)
- estado (ligada/desligada)

comportamentos
- aumentar volume
- diminuir volume
- modificar canal (novo canal deve ser fornecido)
- ligar/desligar TV (normalmente é um botão só que modifica o estado atual)
```
