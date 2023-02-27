import { render, screen, fireEvent } from '@testing-library/react';
import { signIn, useSession } from 'next-auth/react';;
import { SubscribeButton } from '.';
import mockRouter from 'next-router-mock';

jest.mock('next-auth/react')
jest.mock('next/router', () => require('next-router-mock'));

describe('SubscribeButton component', ()=> {

  it('renders correctly', () => {
    const useSessionMocked = jest.mocked(useSession)

    useSessionMocked.mockReturnValueOnce({ data: null, status: "loading" });

    render(<SubscribeButton />)

    expect(screen.getByText(/subscribe now/i)).toBeInTheDocument()
  })

  it('redirects user to sign in when not authenticated', () => {
    const signInMocked = jest.mocked(signIn)
    const useSessionMocked = jest.mocked(useSession)

    useSessionMocked.mockReturnValueOnce({ data: null, status: "loading" });

    render(<SubscribeButton />)

    const subscribeButton = screen.getByText('Subscribe now');

    fireEvent.click(subscribeButton)

    expect(signInMocked).toHaveBeenCalled()
  })

  it('redirects to posts when user already has a subscription', () => {
    const useSessionMocked = jest.mocked(useSession)
    const routerPushSpyOn = jest.spyOn(mockRouter, 'push')

    useSessionMocked.mockReturnValue({
      data: {
        user: { name: "John Doe", email: "john.doe@example.com" },
        expires: "fake-expires",
        activeSubscription: 'fake-subscription'
      },
      status: "authenticated",
    })

    render(<SubscribeButton />)

    const subscribeButton = screen.getByText(/Subscribe now/i);

    fireEvent.click(subscribeButton)

    expect(routerPushSpyOn).toHaveBeenCalledWith('/posts')
    expect(mockRouter.pathname).toEqual('/posts')
  })
})

/*
Quarto e último teste unitário em componentes

A estrutura do código de teste segue a mesma dos testes anteriores, então copiar o código de outro teste e ir ajustando para o teste do componente 'SubscribeButton'

Alterar a importação do componente para 'SubscribeButton' e o nome da categoria do 'describe' para: 'SubscribeButton component'

Alterar a resposta esperada da função 'it' para 'renders correctly':

it('renders correctly', ()...

Alterar o texto do expect para: (/subscribe now/i):

expect(screen.getByText(/subscribe now/i)).toBeInTheDocument()

Apagar o trecho de código 'const useSessionMocked...':

const useSessionMocked = jest.mocked(useSession)

useSessionMocked.mockReturnValueOnce({ data: null, status: "loading" });

Salvar e executar o teste: yarn test

O teste não passou, pois o componente 'SubscribeButton' usa o 'useSession' e o 'useRouter' para validar as autenticações e ainda não definimos um mock para eles, então o próximo passo é criar um mock para o 'useSession'

No 'jest.mock' passar como 2º parâmetro uma função que retorna 'useSession' que retorna 'null, false':

jest.mock('next-auth/react', () => {
  return {
    useSession() {
      return [null, false]
    }
  }
})

Salvar e executar o teste: yarn test

O teste passou!

Agora vamos criar o 2º teste para redirecionar o usuário para a página de SignIn quando ele clicar no botão 'SubscribeButton'

O SignIn da aplicação é um login social feito através do GitHub, então quando o usuário clica no botão 'Subscribe', abre uma página para que ele faça a autenticação com o GitHub e depois ele é redirecionado para o pagamento

Criar a nova função 'it' copiando a estrutura de código do teste anterior e ajustando as informações para o novo teste:

Alterar o texto de retorno quando o teste rodar para: 'redirects user to sign in when not authenticated'

it('redirects user to sign in when not authenticated', () => {
  render(<SubscribeButton />)
})

Agora vamos disparar um evento simulando uma ação de clique do usuário, para isso usaremos uma função chamada 'fireEvent' que vem de dentro da biblioteca '@testing-library/react' que simula essa ação do usuário

Importar 'fireEvent' para dentro do arquivo de teste

Após a importação, abaixo de 'render' criar uma variável const que vai capturar o texto 'Subscribe now' que vem do componente 'SubscribeButton':

const subscribeButton = screen.getByText('Subscribe now');

Agora chamar a função 'fireEvent' com o método 'click' e passar para dentro dela a variável 'subscribeButton':

fireEvent.click(subscribeButton)

Isso significa que essa função vai simular uma ação de clique do usuário

Agora vamos criar o 'expect':

É esperado que o usuário tenha sido redirecionado para a página de 'signIn'

Além disso vamos ficar espiando para ver se a função 'signIn' que vem lá do componente 'SubscribeButton' foi chamada, para isso vamos importar a função 'signIn' para dentro do arquivo de teste, essa função vem de dentro do 'next-auth/react'

Após a importação de 'signIn', vamos criar uma variável mock para o 'signIn' (antes da função render)

const signInMocked = jest.mocked(signIn)

Agora vamos passar a variável 'signInMocked' para o 'expect':

expect(signInMocked).toHaveBeenCalled()

Isso significa que é esperado que a função 'signIn' tenha sido chamada, que é exatamente o que queriamos e conseguimos simular isso com o mock

Vamos entender o que foi feito até agora:

Criamos um mock do 'next-auth/react' e esse mock retorna 'useSession'

O mock também deve retornar o sigIn, então adicionar o 'signIn':

jest.mock('next-auth/react', () => {
  return {
    useSession() {
      return [null, false]
    },
    signIn
  }
})

O 'signIn' é uma função que não tem retorno, neste caso, vamos passar 'jest.fn()' para o 'signIn':

signIn: jest.fn()

O 'jest.fn()' significa que a função é vazia, é a mesma coisa que a função 'sigIn: () => {}'

Mas o diferencial do 'jest.fn()' é que conseguimos capturar se a função foi chamada ou não

Na primeira função 'it' testamos para ver se o botão 'subscribe now' está sendo renderizado corretamente

Na segunda função 'it' criamos um mock para a função 'signIn', criamos uma simulação de click com o 'fireEvent' e após disparar o evento de click, esperamos através do 'expect' que função 'signIn' tenha sido chamada

Salvar e executar o teste: yarn test

O teste passou!

A função 'sigIn' foi chamada, pq o usuário não está logado, pois passamos os parâmetros 'null, false', que significam que o usuário não está logado

Vamos para o próximo teste!

É esperado que o usuário seja direcionado para a tela de login quando ele já tiver uma inscrição ativa

it('redirects to posts when user already has a subscription', () => {}

Essa parte não depende apenas da parte de autenticação (next-auth), depende também da parte de roteamento (next/router)

Então vamos criar um mock para o roteamento também:

jest.mock('next/router')

Importar a função 'useRouter' de dentro de 'next/router'

Após a importação, dentro da função 'it('redirects to posts...' vamos criar o mock com uma variável chamada 'useRouterMocked':

it('redirects to posts when user already has a subscription', () => {
    const useRouterMocked = jest.mocked(useRouter)
})

Vamos criar outra variável chamada pushMock que recebe 'jest.fn()'

Quando a função 'useRouterMocked' foi chamada ela passa 'mockReturnValueOnce'

A função 'mockReturnValueOnce' recebe a propriedade 'push' que passa 'pushMock'

E passa 'as any' para o 'useRouterMocked' para evitar erros de tipagem

Vamos chamar a função 'render' e passar o componente 'SubscribeButton'

Abaixo copiar e colar as funções ' const subscribeButton' e o 'fireEvent' da função anterior para dentro dessa função, essas duas funções que vão disparar o click

Inserir o 'expect' que passa a função 'pushMock' que recebe 'toHaveBeenCalled' para verificar se essa função foi chamada

A função fica assim:

it('redirects to posts when user already has a subscription', () => {
    const useRouterMocked = jest.mocked(useRouter)

    const pushMock = jest.fn()

    useRouterMocked.mockReturnValueOnce({
      push: pushMock
    } as any)

    render(<SubscribeButton />)

    const subscribeButton = screen.getByText('Subscribe now');

    fireEvent.click(subscribeButton)

    expect(pushMock).toHaveBeenCalled()
  })
})

Salvar e executar o teste: yarn test

O teste não passou, pois no teste o usuário não está logado, então precisamos que o usuário esteja logado para que essa parte do componente seja testada

Para isso vamos importar o 'useSession' de dentro do 'next-auth/react'

Após a importação, vamos mockar o 'useSession' dentro de uma outra variável dentro da função
'it('redirects to posts...':

const useSessionMocked = jest.mocked(useSession)

Para validar a autenticação do usuário vamos usar o mesmo trecho de código que foi usado no componente 'SignInButton':

useSessionMocked.mockReturnValueOnce(
      {
        data: {
          user: { name: "John Doe", email: "john.doe@example.com" },
          expires: "fake-expires",
        },
        status: "authenticated",
      }
    );

Agora precisamos que o usuário já tenha uma subscription ativa para acessar o conteúdo da aplicação

Olhando lá no componente 'SubscribeButton':

O usuário só vai cair no 'if (session.activeSubscription)...' se ele tiver fizer o login e tiver uma subscription ativa

Então, vamos trazer o 'activeSubscription' lá do componente 'SubscribeButton' e inseri-lo na função 'useSessionMocked':

useSessionMocked.mockReturnValueOnce({
      data: {
        user: { name: "John Doe", email: "john.doe@example.com" },
        expires: "fake-expires",
        activeSubscription: 'fake-active-subscription'
      },
      status: "authenticated",
    })

Salvar e executar o teste: yarn test

O teste não passou ainda, pois fizemos um mock geral para o 'useSession' no começo do código e depois fizemos outro mock específico para dentro da função 'it('redirects to posts...', não pode existir um mock geral do 'useSession' e outro específico, ou se cria apenas um mock geral ou se cria mocks específicos dentro de cada função, então é o que faremos, criaremos um mock para cada função poder usar o 'useSession' separadamente

Apagar as propriedades e funções passadas para o mock do 'useSession', deixando apenas com a importação geral do 'next-auth/react':

jest.mock('next-auth/react')

Agora vamos criar o mock do 'useSession' para a função it('renders correctly...':

it('renders correctly', () => {
  const useSessionMocked = jest.mocked(useSession)

  useSessionMocked.mockReturnValueOnce({ data: null, status: "loading" });

  render...

Agora vamos criar o mock do 'useSession' para a função it('redirects user to sign in...':

it('redirects user to sign in when not authenticated', () => {
  const signInMocked = jest.mocked(signIn)
  const useSessionMocked = jest.mocked(useSession)

  useSessionMocked.mockReturnValueOnce({ data: null, status: "loading" });

  render...

Como já criamos o mock específico para a função it('redirects to posts when...', deixaremos ele assim como está:

it('redirects to posts when user already has a subscription', () => {
  const useRouterMocked = jest.mocked(useRouter)
  const useSessionMocked = jest.mocked(useSession)
  const pushMock = jest.fn()

  useSessionMocked.mockReturnValueOnce({
    data: {
      user: { name: "John Doe", email: "john.doe@example.com" },
      expires: "fake-expires",
      activeSubscription: 'fake-active-subscription'
    },
    status: "authenticated",
  })

  useRouterMocked.mockReturnValueOnce({
    push: pushMock,
  } as any)

  render...

Salvar e executar o teste: yarn test

O teste não passou!

Mensagem de erro: 'No router instance found. You should only use "next/router" on the client side of your app'

* Marcos me ajudou a resolver o problema de roteamento, basicamente ao invés de mockar o 'useRouter' trazendo ele do 'next/router', instalei uma lib 'mockRouter' que vem de 'next-router-mock' para mockar o roteamento

Usei essa estrutura para fazer o mock:

jest.mock('next/router', () => require('next-router-mock'));

E a função para testar 'it(redirects to posts when user already has a subscription' fica assim:

  it('redirects to posts when user already has a subscription', () => {
    const useSessionMocked = jest.mocked(useSession)
    const routerPushSpyOn = jest.spyOn(mockRouter, 'push')

    useSessionMocked.mockReturnValue({
      data: {
        user: { name: "John Doe", email: "john.doe@example.com" },
        expires: "fake-expires",
        activeSubscription: 'fake-subscription'
      },
      status: "authenticated",
    })

    render(<SubscribeButton />)

    const subscribeButton = screen.getByText(/Subscribe now/i);

    fireEvent.click(subscribeButton)

    expect(routerPushSpyOn).toHaveBeenCalledWith('/posts')
    expect(mockRouter.pathname).toEqual('/posts')
  })

Salvar e executar o teste: yarn test

O teste passou!

OBS: Marcos também me ajudou a resolver o problema da 'activeSubscription' que está dando em alguns arquivos, basicamente essa função não existia em 'session', então ele alterou para 'data' e criou 'activeSubscription' dentro de data, agora está funcionando corretamente!

Os próximos testes serão feitos nas páginas, começando pela página 'Home'

Criar uma nova pasta 'pages' dentro da pasta 'tests'

Criar um novo arquivo 'Home.spec.tsx' dentro da pasta '/tests/pages'

Ir para o arquivo 'Home.spec.tsx' para iniciar a configuração do teste

*/
