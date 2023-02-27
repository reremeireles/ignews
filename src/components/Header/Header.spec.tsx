import { render, screen } from '@testing-library/react';
import { Header } from '.';

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/'
      }
    }
  }
})

jest.mock('next-auth/react', () => {
  return {
    useSession() {
      return [null, false]
    }
  }
})

describe('Header component', () => {

  it('renders correctly', () => {
    render(<Header />)

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Posts')).toBeInTheDocument()
  })
})

/*
Segundo teste unitário em componentes

Agora vamos aplicar testes no componente Header

O componente Header não tem muitas funcionalidades que geram ações pelo usuário, só tem links clicáveis, então iremos   testar esses links (Home e Posts)

A estrutura de código é igual ao teste anterior aplicado no componente ActiveLink, portanto vamos copiar a estrutura de código do ActiveLink.spec.tsx e colar aqui

Vamos excluir a importação do componente ActiveLink e importar o componente Header

Também vamos substituir o componente ActiveLink pelo Header na tag HTML, visto que o componente Header não recebe nenhuma propriedade e nenhum childrem dentro da tag, então excluir:

'href='/' activeClassName='active'
<a>Home</a>

O componente Header abre e fecha a tag assim: <Header />

Vamos manter o 'jest.mock', pois o componente Header recebe o componente ActiveLink na sua estrutura, como um filho, então é preciso deixar o 'jest.mock' para ele simular as funcionalidades do componente ActiveLink

Vamos alterar o nome da categoria em 'describe' para 'Header component':

describe('Header component'...

No 'expect'o teste vai tentar encontrar um link com 'Home' e outro com 'Posts', lembrando que esses links vem de dentro do próprio componente Header no arquivo (index.tsx)

expect(getByText('Home')).toBeInTheDocument()
expect(getByText('Posts')).toBeInTheDocument()

Agora vamos rodar o teste: yarn test

Observe que um teste passou e o outro não

Um dos testes não passou, pq dentro do Header temos um arquivo de estilo '.scss', lembrando que no arquivo de configuração do Jest existem as extensões a serem transformadas no formato legível para o Jest e a extensão '.scss' não está inclusa, portanto para lidar com arquivos '.scss' iremos instalar uma biblioteca para tratar esse tipo de extensão chamada 'identity-obj-proxy'

Instalar biblioteca: yarn add identity-obj-proxy -D

Agora vamos abrir o arquivo 'jest.config.ts' para inserir a biblioteca

Após configurar a biblioteca 'identity-obj-proxy' no arquivo de config do Jest, voltamos para refazer o teste

Executar 'yarn test' novamente

Observe que um teste passou e o outro ainda não, pelo fato de que lá dentro do componente Header estamos usando o componente 'SignInButton', o componente 'SignOutButton' usa o 'useSession' que vem de dentro do 'next-auth/react', então teremos que criar um mock para que a funcionalidade do 'useSession' seja verificada no teste (é a mesma premissa do mock do 'useRouter'):

jest.mock('next-auth/react', () => {
  return {
    useSession() {
      return [null, false]
    }
  }
})

O retorno '[null, false]' vem de dentro das definições de 'useSession'

A função 'useSession' retorna um array:

[Session | null | undefined, boolean]

Na 1ª posição do array caso o usuário esteja autenticado retorna 'Session', caso o usuário não esteja autenticado retorna 'null' ou 'undefined'

Na 2ª posição do array retorna um boolean que significa se o next-auth ainda está carregando os dados de autenticação do usuário, no caso de retorno 'false' é pq ele não está mais carregando

Salvar e executar o teste novamente: yarn test

Todos os testes passaram!

Agora para deixar o código mais limpo, iremos substituir a função 'getByText' pela função 'screen', isso vai dar uma limpada na quantidade de código escrito e vai manter as mesmas funcionalidades

Iremos alterar esse arquivo de teste para o componente Header e o arquivo de teste do componente ActiveLink também

Primeiro importar a função 'screen' para do arquivo de teste

Depois de importar a função 'screen', vamos apagar a variável 'const { getByText } =' e vamos deixar apenas a função render:

it('renders correctly', () => {
    render(
      <Header />...

Fazer isso em todos os 'it'

Em 'expect' iremos adicionar o 'screen' na frente da função 'getByText':

expect(screen.getByText('Home')).toBeInTheDocument()

Fazer isso para todos os testes com o 'expect'

Finalizado os testes no componente Header

O próximo teste será implementado no componente SignInButton

Criar um arquivo chamado SignInButton.spec.tsx e ir para o arquivo

 */
