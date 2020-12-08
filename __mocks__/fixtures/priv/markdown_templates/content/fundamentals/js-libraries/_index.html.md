## O que vamos aprender?

Hoje você aprenderá como adicionar bibliotecas ***JavaScript*** e ***CSS*** aos seus sites.

Existem literalmente milhares de bibliotecas ***JavaScript*** e ***CSS*** disponíveis gratuitamente na Internet, com os mais diversos propósitos. À medida que os sites que você desenvolve se tornam mais complexos, será preciso encontrar e integrar ferramentas que facilitem e acelerem o desenvolvimento.

---

### Você será capaz de:

- Adicionar e utilizar bibliotecas ***JavaScript*** e ***CSS*** em seus sites;

- Utilizar bibliotecas ***JavaScript*** externas a partir de uma [CDN](https://www.gocache.com.br/cdn/) {: .external-link target="_blank" rel="noreferrer noopener" }.

---

## Por que isso é importante?

No dia a dia do desenvolvimento de software, você vai precisar encontrar, selecionar e incorporar bibliotecas aos programas que você desenvolve. É muito importante conhecer os fundamentos de uma tecnologia, mas é importante também não reinventar a roda a todo momento. Por exemplo, imagine que você, toda vez que precisasse calcular a raiz quadrada de um número, tivesse que escrever uma função para isso, talvez utilizando uma fórmula matemática complexa! 😨Para que isso não seja necessário, outras pessoas já se deram o trabalho de escrever esse tipo de função de forma extremamente otimizada e disponibilizar para que outras pessoas utilizem.

O mesmo princípio se aplica ao desenvolvimento web. Existem muitos problemas que aparecem com frequência, à medida que a complexidade dos seus sites aumenta. Por exemplo, na aula anterior você aprendeu a construir formulários ***HTML***. Imagine que, em um formulário de cadastro, você quer garantir que o nome e sobrenome sempre sejam preenchidos, que o email da pessoa tenha um formato válido e que seja impossível selecionar uma data de nascimento inexistente. Além disso, você acha que ficar digitando a data manualmente é cansativo, e quer colocar um campo que, ao ser clicado, abre um calendário para escolher a data. Como você faria isso? Com ***JavaScript*** (e ~~um pouco de~~ muito ***CSS***, no caso do calendário). Isso, porém, é algo tão comum que já existem bibliotecas que fornecem essas funcionalidades prontas para você.

Da mesma forma, existem muitos *frameworks* ***CSS*** que facilitam a construção de sites dinâmicos, acessíveis e responsivos, coisas com as quais você deve se preocupar sempre daqui para frente. Alguns exemplos mais famosos: [Bulma](https://bulma.io/) {: .external-link target="_blank" rel="noreferrer noopener" }, [Bootstrap](https://getbootstrap.com) {: .external-link target="_blank" rel="noreferrer noopener" }, [Semantic UI](https://semantic-ui.com) {: .external-link target="_blank" rel="noreferrer noopener" } e [Materialize](https://materializecss.com) {: .external-link target="_blank" rel="noreferrer noopener" }.

---

## Conteúdo

###### Tempo sugerido para realização: 80 minutos

Vamos começar lendo [esse artigo](https://pt.khanacademy.org/computing/computer-programming/html-css-js/using-js-libraries-in-your-webpage/a/whats-a-js-library) {: .external-link target="_blank" rel="noreferrer noopener" } explicando como adicionar bibliotecas ***JavaScript*** ou ***CSS*** ao seu site usando uma *CDN*. Leia todas as seções, desde _"O que é uma biblioteca de JS?"_ até _"Qual biblioteca de JS você deve usar?"_. E não se esqueça de fazer o **quiz** no meio, para te ajudar a solidificar esses conhecimentos!

---

Neste vídeo você pode ter uma noção da variedade de bibliotecas ***JavaScript*** disponíveis e de como elas podem te ajudar nas mais variadas tarefas.

<%= youtube_video "fiww99qL0VA" %>

---

Agora, assista a este vídeo ensinando como se adiciona uma biblioteca ao seu site (`Bootstrap` no caso), fazendo download dos arquivos ***JavaScript*** e ***CSS*** para seu computador.

<%= youtube_video "CXuepXFt_ow" %>

---

E, para ter uma noção de como bibliotecas ***CSS*** podem facilitar sua vida, assista a este vídeo, que mostra como usar `Bootstrap` para fazer uma estilização básica de um formulário, o assunto da aula anterior. 😉

<%= youtube_video "dJfhMnmoFHU" %>

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

Agora que você já entendeu como utilizar bibliotecas *JavaScript* nas suas páginas, é hora de praticarmos juntos!

Aula ao vivo! Vamos para o Slack, onde o link estará disponível.

---

## Exercícios

###### Tempo sugerido para realização: 140 minutos

<%= versioning_your_code(@conn) %>

### Agora a prática

1. Adicione um *framework* ***CSS*** de sua escolha ao formulário que você construiu na última aula e o utilize para estilizar o formulário.
  * Sugestões: [Bulma](https://bulma.io/) {: .external-link target="_blank" rel="noreferrer noopener" }, [Bootstrap](https://getbootstrap.com) {: .external-link target="_blank" rel="noreferrer noopener" }, [Semantic UI](https://semantic-ui.com) {: .external-link target="_blank" rel="noreferrer noopener" } e [Materialize](https://materializecss.com) {: .external-link target="_blank" rel="noreferrer noopener" }.

2. Adicione uma biblioteca ***JavaScript*** de _date picker_ ao formulário que você construiu na última aula. Utilize essa biblioteca no campo "Data de início" do formuário. Você pode remover as validações de data que adicionou, uma vez que a biblioteca se encarregará de permitir somente datas válidas.
  * Sugestões: [DatePickerX](https://github.com/AvroraTeam/DatePickerX) {: .external-link target="_blank" rel="noreferrer noopener" } e [Pickaday](https://github.com/Pikaday/Pikaday) {: .external-link target="_blank" rel="noreferrer noopener" }.

3. Adicione uma biblioteca ***JavaScript*** de validações ao formulário que você construiu na última aula. Utilize essa biblioteca para substituir as validações que você fez manualmente.
  * Sugestões: [Just-validate](https://github.com/horprogs/Just-validate) {: .external-link target="_blank" rel="noreferrer noopener" } e [popup-validation](https://github.com/AntonLapshin/popup-validation) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Recursos Adicionais

* [Tutorial de como instalar e utilizar a bibloteca Just-validate](https://www.cssscript.com/custom-html5-form-validator-vanilla-javascript-just-validate/) {: .external-link target="_blank" rel="noreferrer noopener" }

* [Tutorial de como instalar e utilizar a biblioteca popup-validation](https://www.cssscript.com/minimal-form-validation-popup-pure-javascript/) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

Agora é hora de conhecer o **CSS Flexbox**, uma excelente ferramenta para desenvolver sites responsivos. 💪

<%= next_button(@conn) %>
