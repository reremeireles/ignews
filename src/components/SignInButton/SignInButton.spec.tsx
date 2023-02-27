import { render, screen } from '@testing-library/react'
import { useSession } from 'next-auth/react'
import { SignInButton } from '.'

jest.mock('next-auth/react')

describe('SignInButton component', ()=> {
  it('renders correctly when user is not authenticated', () => {
    const useSessionMocked = jest.mocked(useSession)

    useSessionMocked.mockReturnValueOnce({ data: null, status: "loading" }); //Irá mockar apenas o próximo retorno

    render(<SignInButton />)

    expect(screen.getByText(/sign in with github/i)).toBeInTheDocument()
  })

  it('renders correctly when user is authenticated', () => {
    const useSessionMocked = jest.mocked(useSession);

    useSessionMocked.mockReturnValueOnce(
      {
        data: {
          user: { name: "John Doe", email: "john.doe@example.com" },
          expires: "fake-expires",
        },
        status: "authenticated",
      }
    );

    render(<SignInButton />)

    expect(screen.getByText(/john doe/i)).toBeInTheDocument()
  })
})

/*
Terceiro teste unitário em componentes

A estrutura do código de teste segue a mesma dos testes anteriores, então copiar o código de outro teste e ir ajustando para o teste do componente 'SignInButton'

Como o componente 'SignInButton' não usa o 'useRouter em nenhum momento, então apagar o mock do 'next/router'

Manter o mock do 'next-auth/react', pois o componente 'SignInButton' utiliza o 'useSession'

Vamos alterar os parâmetros do 'return [null, false]', pq no caso do componente 'SignInButton' ele tem um funcionamento diferente para o usuário está logado e outro para quando o usuário não está logado

Então vamos testar se o 'SignInButton' está retornando as informações corretas quando o usuário está logado e quando o usuário não está logado

O primeiro teste vai verificar se o componente renderiza corretamente:

it('renders correctly when user is not authenticated'...

No 'expect' vamos inserir o texto que o teste vai verificar

expect(screen.getByText(/sign in with github/i)).toBeInTheDocument()

Isso significa que caso o usuário não esteja logado, esse teste precisa retornar um botão escrito 'Sign in with Github'

Salvar e executar o teste: yarn test

O teste passou!

Para verificar se o retorno foi 'Sign in with Github', basta passar o 'debug' dentro da função 'it':

it('renders correctly when user is not authenticated', () => {
    const { debug } = render(
      <SignInButton />
    )

    debug()

    expect...

Salvar e executar o teste: yarn test

Observe que o debug retorna o HTML e lá se encontra o texto esperado 'Sign in with Github'

Apagar a variável const e o debug() do código, eles foram inseridos apenas para fazer essa verificação mais detalhada

Agora faremos o teste para verificar se ele renderiza corretamente quando o usuário está autenticado

Copiar o código da função 'it' e colar logo abaixo

Alterar a frase para:

it('renders correctly when user is authenticated',...

Agora precisamos que o mock tenha um retorno diferente para essa verificação, pois até o momento o mock só verifica quando o usuário não está logado

Para isso vamos excluir o 2º parâmetro do jest.mock e deixar apenas a criação dele com o 'next-auth/react'

Estava assim:

jest.mock('next-auth/react', () => {
  return {
    useSession() {
      return [null, false]
    }
  }
})

Fica assim:

jest.mock('next-auth/react')

Importar 'useSession' de dentro de 'next-auth/react'

import { useSession } from 'next-auth/react';

Agora daremos um funcionamento diferente para cada função 'it' do teste

Vamos criar uma const dentro da primeira função 'it'

const useSessionMocked = jest.mocked(useSession)

Abaixo vamos chamar 'useSessionMocked' como uma função:

useSessionMocked.mockReturnValue()

Essa função significa que a partir dessa linha 'useSessionMocked.mockReturnValue()', toda vez que a função 'useSession' for chamada, quando chegar nessa linha, a próxima vez que ela for chamada é quando renderizar o componente 'SignInButton'

Vamos passar 'data: null, status: "loading"' para dentro da função Mocked, pois são os retornos que esperamos receber da primeira verificação, quando o usuário não está autenticado:

useSessionMocked.mockReturnValue({ data: null, status: "loading" });

Isso irá mockar apenas o próximo retorno da função

Salvar e executar o teste: yarn test

O teste passou!

Na 2ª verificação, onde o usuário está logado, o teste precisa retornar o nome do usuário logado

Então vamos inserir um nome qualquer só para que o teste valide isso:

expect(screen.getByText(/john doe/i)).toBe...

Salvar e executar o teste: yarn test

O teste não passou, pois o Mocked está sinalizando que o retorno é sempre para usuários que não estão autenticados

Então vamos alterar o Mocked de 'mockReturnValue' para 'mockReturnValueOnce':

Isso significa que ele vai mockar apenas o próximo retorno da função, que é exatamente o que queremos:

useSessionMocked.mockReturnValueOnce([null, false])

Salvar e executar o teste: yarn test

O teste não passou, pois o mock do 'useSession' foi executado apenas uma vez e parou, por causa do 'mockReturnValueOnce' que executa apenas uma única vez a função do 'useSession', está correto em partes, pois setamos a função para executar uma vez para verificar se o usuário não está logado, mas também precisamos do 'useSession' para verificar se o usuário está logado

Então vamos duplicar o Mocked, copiando da primeira função 'it' e colando na segunda função 'it'

Vamos alterar o retorno para um usuário logado, então vamos apagar o 'null...' e inserir dois parâmametros

O primeiro parâmetro é a propriedade 'data' que passa a propriedade 'user' que passa o conteúdo de autenticação do usuário, neste caso é o 'name' e 'email', passa também a propriedade 'expires' que recebe 'fake expires'

O segundo parâmetro é a propriedade 'status' que recebe 'authenticated'

const useSessionMocked = jest.mocked(useSession)

    useSessionMocked.mockReturnValueOnce(
      {
        data: {
          user: { name: "John Doe", email: "john.doe@example.com" },
          expires: "fake-expires",
        },
        status: "authenticated",
      }
    );

Salvar e executar o teste: yarn test

Todos os testes passaram!

Finalizado os testes no componente SignInButton

O próximo teste será implementado no componente SubscribeButton

Criar um arquivo chamado SubscribeButton.spec.tsx e ir para o arquivo

*/
