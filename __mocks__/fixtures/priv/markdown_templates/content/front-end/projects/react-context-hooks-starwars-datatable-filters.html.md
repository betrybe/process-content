## O que vamos fazer?

Após uma semana de aprendizado de recursos avançados de *React*, é hora de colocá-los em prática.

Como você viu durante a semana, esses recursos - _Context API_ e *Hooks* - funcionam como soluções alternativas para ferramentas existentes. Nada mais natural, então, que desenvolver um projeto em que você poderá comparar esses recursos com as soluções com que já se acostumou.

Ao final, você terá uma visão mais profunda e embasada de cada ferramenta. Saberá dizer quais são suas vantagens e desvantagens, e em que situações cada uma é mais adequada.

## Por que isso é importante?

Sofwares estão em constante evolução. No seu dia a dia, será comum ter que dar manutenção em aplicações, sejam elas desenvolvidas por outras pessoas ou por você mesmo.

Tais manutenções podem ocorrer por diversos motivos, como correção de bugs ou adições de novas funcionalidades. Mas também é comum ter que realizar [refatorações](/real-life-engineer/glossary/#refatoracao) no código, sem necessariamente mudar o comportamento para quem o utiliza.

É esse último caso que você vai praticar hoje. Você terá que modificar um projeto anterior, substituindo algumas ferramentas pelos recursos avançados do *React* vistos nesta semana, enquanto garante que o comportamento de sua aplicação permanece exatamente o mesmo.

## Especificação

###### Tempo sugerido para realização: 2 dias

### O que vamos avaliar?

* Aderência do código à especificação. Seu programa deve se comportar como especificado na próxima seção.

* Organização do seu código. Quebre seu site em componentes. Prefira componentes pequenos, simples e bem definidos a componentes grandes e complexos.

* Cobertura de testes. Seu código deve ser *testável*, e deve possuir uma suite de testes robusta e com alta cobertura.

### O que devo desenvolver?

Este trabalho será **individual**.

Você vai [refatorar](/real-life-engineer/glossary/#refatoracao) o projeto desenvolvido no módulo **16 - StarWars Datatable**.

Você terá que substituir o *Redux* pela _Context API_ nativa do *React*, e utilizará *Hooks* para transformar todos os seus componentes de classe em componentes funcionais.

Além disso, **você escreverá testes antes de realizar quaisquer alterações em seu código**. Dessa forma, você terá **segurança** de que o comportamento não terá mudado ou que nenhum bug foi introduzido durante a refatoração da sua aplicação, desde que escreva testes que se baseiam no **comportamento esperado**, e não em uma implementação específica, e que todas as funcionalidades estejam devidamente testadas.

Leia o arquivo `README.md` do projeto com atenção para uma explicação detalhada de como desenvolver e entregar seu projeto.

---

## Entregáveis

Para entregar o seu projeto, você deverá criar um _Pull Request_ para um repositório no **GitHub**. Consulte o **canal do Slack da turma** para obter o endereço do repositório.

Este _Pull Request_ deverá conter a implementação dos seus componentes ***React***, como especificado no `README.md` do projeto.

##### Fique atento e siga as instruções no README.md do repositório! 🥺

Qualquer dúvida, procure a monitoria.

Lembre-se: você pode consultar nosso conteúdo sobre [Git & GitHub](/fundamentals/git) sempre que quiser!

---

## Próximo

<%= next_button(@conn) %>

---
