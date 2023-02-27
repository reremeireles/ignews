import { render, screen } from '@testing-library/react';
import { ActiveLink } from '.';

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/'
      }
    }
  }
})

describe('ActiveLink component', () => {

  it('renders correctly', () => {
    render(
      <ActiveLink href='/' activeClassName='active'>
        <a>Home</a>
      </ActiveLink>
    )
    expect(screen.getByText('Home')).toBeInTheDocument()
  })

  test('active link is receiving active class', () => {
    render(
      <ActiveLink href='/' activeClassName='active'>
        <a>Home</a>
      </ActiveLink>
    )
    expect(screen.getByText('Home')).toHaveClass('active')
  })
})

/*
Primeiro teste unitário em componentes

No geral os testes unitários focam em mockar funcionalidades externas e testar a parte visual do componente

Primeiramente criar um arquivo dentro da pasta 'ActiveLink' chamado 'Active.spec.tsx'

O arquivo 'Active.spec.tsx' será responsavel por conter os testes do componente 'ActiveLink'

Importar 'render' de dentro de '@testing-library/react'

A função 'render' basicamente renderiza um componente de maneira virtual para conseguir ver qual é o output (resposta) do componente

Criar o teste, a sintaxe de teste é a seguinte:

test('', () => {})

Como 1º parâmetro é passado uma string contendo uma mensagem dizendo o que é esperado desse teste, por exemplo:

test('renders correctly') que significa 'espero que o ActiveLink esteja renderizando corretamente'

Como 2º parâmetro é passado uma função que contém um objeto

Dentro desse objeto é passado a propriedade 'render' e dentro dele passamos o componente ActiveLink (importando ele para dentro do arquivo também), esse 'render' é como se fosse o 'return' que retorna um HTML

O componente ActiveLink recebe duas propriedades 'href' e 'activeClassName'

Dentro do componente ActiveLink passamos uma tag <a>

Para mostrar que o 'render' está criando uma visualização virtual do HTML que é renderizado pelo componente, iremos transformar o 'render' em uma variável const que recebe a função 'debug' que vai devolver algumas informações

const { debug } = render(...

Após criar a variável, chamar a função 'debug' logo abaixo

  ...</ActiveLink>
  )
  debug()
})

Agora antes de rodar o comando 'yarn test', temos que criar esse script, pois esse comando não existe

Antes de configurar o script com o novo comando, instalar uma biblioteca chamada 'yarn add jest-environment-jsdom -D'

Após instalar a biblioteca, abrir o arquivo 'package.json' e criar um novo script para o comando 'yarn test'

Na propriedade 'scripts' inserir o novo scrip: "test": "jest"

Salvar o arquivo e rodar o comando 'yarn test' no terminal

O resultado desse primeiro teste não tem a ver com o 'debug', não ainda, pois há outras erros que foram mostrados no terminal

O erro se relaciona com 'asPath' e 'useRouter' do componente ActiveLink

AO abrirmos o componente 'ActiveLink', observamos que ele usa o 'useRouter', mas a função não tem retorno, ela não retorna o 'asPath', mas pq?

Pq no arquivo do teste estamos usando o componente 'ActiveLink' totalmente desconectado do restante das funcionalidades da aplicação, pois o Teste Unitário testa um componente do código desconexo do restante da aplicação

Portanto, usaremos um artifício para simular funcionalidades que são externas ao componente como o 'useRouter' que é uma funcionalidade externa que vem do Next, isso já foi testado pelo Next, o que queremos testar é se o conteúdo do componente da nossa aplicação está renderizando da melhor forma

Então criaremos um mock, uma imitação, para a parte de roteamento do Next, para que o componente tenha um retorno quando for executar o 'useRouter', vamos impor qual será o retorno da função

Então para usar o mock, vamos usar a estrutura 'jest.mock()'

O 1º parâmetro passado para o 'jest.mock()' é qual é a funcionalidade que queremos imitar, neste caso é o 'useRouter', mas não usaremos o 'useRouter' em si e sim usaremos a importação dele que vem do Next que é 'next/router'

O 2º parâmetro é uma função (arrow) que retorna a função 'useRouter'

A função 'useRouter' retorna a propriedade 'asPath' que tem uma string vazia '/'

Então a estrutura do código fica dessa forma:

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/'
      }
    }
  }
})

Executar o comando de teste: yarn test

O teste passou!

A função 'debug()' funciona como um 'console.log' que retorna todo o HTML que foi gerado a partir do trecho de código abaixo:

<ActiveLink href='/' activeClassName='active'>
      <a>Home</a>
    </ActiveLink>

O trecho de código HTML acima gera o trecho de código HTML abaixo:

<body>
  <div>
    <a
      class="active"
      href="/"
    >
      Home
    </a>
  </div>
</body>

Todo teste consiste em executar uma ação e dizer para o Jest o que se espera como retorno dessa ação, esse retorno é chamado de 'Expect', o que é esperado de uma determinada ação

Quando o componente ActiveLink é renderizado em tela, espera-se ver o link '<a>Home</a>' em tela

Então vamos substituir a função 'debug()' por um 'expect()'

Dentro função 'expect()' passaremos uma outra função chamada 'getByText'

A função 'getByText' é retornada pelo 'render', então vamos substituir a função 'debug' por 'getByText' dentro da variável: substituir 'const { debug}' por 'const { getByText }'

O 'getByText' vai procurar um elemento que contenha um texto, neste caso, o texto que espera ser encontrado dentro do elemento é 'Home'

E o 'toBeInTheDocument' significa que o elemento procurado está dentro do documento do teste, ou seja, um elemento que esteja presente na renderização do teste

Então a função 'expect()' fica dessa maneira:

expect(getByText('Home')).toBeInTheDocument()

Salvar e executar 'yarn test'

O teste passou, pois o teste verificou as condições impostas e encontrou o que foi pedido, no caso o 'Home'

Agora vamos criar mais um teste no componente:

O componente ActiveLink tem outra funcionalidade que é uma condicional para colocar classe no link para dizer se ele está ativo ou não, a lógica é a seguinte: se o 'href' do elemento passado como propriedade for igual ao 'asPath' da rota que está sendo acessada atualmente, então é adicionado a 'activeClassName'

Essa é a lógica citada acima vinda do componente ActiveLink:

const className = asPath === rest.href
  ? activeClassName
  : '';

Vamos testar isso! Testar se o componente ActiveLink está recebendo a 'activeClassName' quando ele estiver ativo

A estrutura do código é basicamente a mesma do teste anterior, o que muda é o 1º parâmetro passado para dentro de
'test()', a frase esperada:

test('active link is receiving active class', () =>...

E a verificação do 'expect()' também muda para verificar se existe uma classe chamada 'active' usando o 'toHaveClass':

expect(getByText('Home')).toHaveClass('active')

Quando existem muitos testes do mesmo componente ou das mesmas funcionalidades da aplicação é interessante inserir esses testes em uma sessão chamada 'describe()', isso vai criar uma categorização dos testes

Então vamos inserir o 'describe()' por volta dos testes:

describe('ActiveLink component', () => {

  test('active...

})

Salvar e executar 'yarn test'

Observe que agora os testes estão dentro da categoria 'ActiveLink component':

 ActiveLink component
    ✓ active link renders correctly (75 ms)
    ✓ active link is receiving active class (16 ms)

Para deixar a semântica do código mais compreensível, podemos substituir o 'test' por 'it'

O 'it' significa 'isso' ou 'a/o ...', por exemplo, vamos substituir 'test' para 'it' e vamos reformular as frases dos testes também para ficar mais compreensível:

test('active link renders correctly',... PARA it('renders correctly',...

'Espero que o ActiveLink esteja renderizando corretamente'

test('active link is receiving active class',... PARA it('adds active class if the link is currently active',...

'Espero que o ActiveLink receba activeClassName se o link estiver ativo'

Finalizado os testes no componente ActiveLink

O próximo teste será implementado no componente Header

Criar um arquivo chamado Header.spec.tsx e ir para o arquivo

*/
