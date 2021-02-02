## O que vamos aprender?

Hoje você vai continuar a aprender **React Hooks**! Na última aula, você estudou o `useState` e o `useContext`. Pois bem. A proposta dos `hooks` é, lembre-se, trazer a componentes funcionais tudo o que componentes de classe fornecem. Para isso, um passo importante é ter as funcionalidades providas pelos _Lifecycle methods_: `componentDidMount`, `componentWillUnmount`, `componentDidUpdate`. Para esses três comportamentos, temos um único hook: o `useEffect`!

Além disso, na aula de hoje, você vai ver o básico sobre criar seus próprios hooks personalizados - o que vai te permitir deixar seu código mais limpo e legível e usar hooks diversos disponibilizados online por outras pessoas.

<%= vimeo "477554137" %>

---

### Você será capaz de:

* Utilizar o _React Hook_ `useEffect`;

* Criar Hooks customizados.

---

## Por que isso é importante?

De posse do conhecimento acerca do `useEffect` e dos Hooks customizados, você terá em mãos as ferramentas para criar componentes funcionais com tudo que os componentes de classe têm. Seu código ficará mais legível, mais sucinto e mais fácil de se entender, e o caminho para o domínio completo dos React Hooks estará aberto.

---

## Conteúdos

###### Tempo sugerido para realização: 120 minutos

Primeiro, para estudarmos o `useEffect` e os _hooks customizados_, vamos assistir a estes vídeos:

<%= vimeo "480041659" %>

<%= vimeo "477557724" %>

Em resumo:

- O `useEffect` executa, quando disparado, a função que recebe como primeiro parâmetro;
- Se não receber um segundo parâmetro, ele executa a função sempre que o componente é renderizado;
- Se receber um array vazio como segundo parâmetro, ele executa a função somente quando o componente é montado;
- Quando ele recebe um array com valores dentro, sempre que **algum** desses valores é alterado, a função é executada;
- Se ele retorna uma função, essa função é executada quando o componente é desmontado e **também** antes da próxima renderização.
- Um _hook customizado_ por convenção é definido com uma função que começa com a palavra `use`. É possível incorporar a lógica de outros hooks em seu funcionamento.

#### Para fixar

1. Faça um componente funcional React com as seguintes funcionalidades:

- A cada 10 segundos ele gera e exibe na tela um número aleatório de 1 a 100;
- Se o número for múltiplo de 3 ou 5, uma mensagem "Acerto" é exibida na tela;
- A mensagem de acerto é removida 4 segundos depois de ser exibida;
- O timer é removido quando o componente é desmontado.

2. Agora é hora de sentir o poder dos Hooks customizados na pele! Faça uma _Todo list_ simples usando um _hook customizado_ `useArray` para manipular os dados guardados na lista.

---

## Vamos fazer juntos!

###### Tempo sugerido para realização: 80 minutos

Vamos para a aula ao vivo! O link estará disponível no Slack.

---

## Exercícios

###### Tempo sugerido para realização: 100 minutos

<%= versioning_your_code(@conn) %>

### Agora, a prática:

**Exercício 1** Refatore o exercício do repositório [exercise-hooks-useEffect-customHooks](https://github.com/tryber/exercise-hooks-useEffect-customHooks) {: .external-link target="_blank" rel="noreferrer noopener" } utilizando Hooks. Transforme todos os componentes de classe em componentes funcionais. Não se esqueça de utilizar a hook useEffect para manipular o ciclo de vida do componente. Lembre-se de acessar a branch `exercise-one`, a estrutura da aplicação estará pronta para ser refatorada.

**Exercício 2** Faça os exercícios 2.1, 2.2 e 2.3 deste repositório: [exercise-hooks-useEffect-customHooks](https://github.com/tryber/exercise-hooks-useEffect-customHooks) {: .external-link target="_blank" rel="noreferrer noopener" }. Os enunciados estão nos arquivos `description.md`. Lembre-se de acessar as branchs `exercise-two.one`, `exercise-two.two` e `exercise-two.three`, a estrutura de cada aplicação estará pronta para ser resolvida.

---

## Recursos adicionais (opcional)

- [React Hooks: How to use useEffect()](https://medium.com/javascript-in-plain-english/react-hooks-how-to-use-useeffect-ecea3e90d84f) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Writing Your Own Custom React Hooks](https://blog.bitsrc.io/writing-your-own-custom-hooks-4fbcf77e112e) {: .external-link target="_blank" rel="noreferrer noopener" }

- [useHooks - Easy to understand React Hook recipes by Gabe Ragland](https://usehooks.com/) {: .external-link target="_blank" rel="noreferrer noopener" }

- [Using the Effect Hook](https://pt-br.reactjs.org/docs/hooks-effect.html) {: .external-link target="_blank" rel="noreferrer noopener" }

- [10 React Hooks you Should Have in Your Toolbox](https://blog.bitsrc.io/10-react-custom-hooks-you-should-have-in-your-toolbox-aa27d3f5564d) {: .external-link target="_blank" rel="noreferrer noopener" }

---

## Próximo

<%= next_button(@conn) %>
