import { render, screen } from '@testing-library/react';
import { stripe } from '../../services/stripe';
import Home, { getStaticProps } from '../../pages';

jest.mock('next/router', () => require('next-router-mock'));

jest.mock('next-auth/react', () => {
  return {
    useSession: () => [null, false]
  }
})
jest.mock('../../services/stripe')

describe('Homepage', () => {

  it('renders correctly', () => {
    render(<Home product={{ priceId: 'fake-price-id', amount: '$10.00' }} />)

    expect(screen.getByText("for $10.00 month")).toBeInTheDocument()
  });

  it('loads initial data', async () => {
    const retrieveStripeMocked = jest.mocked(stripe.prices.retrieve)

    retrieveStripeMocked.mockResolvedValueOnce({
      id: 'fake-price-id',
      unit_amount: 1000,
    } as any)

    const response = await getStaticProps({})

    // comparação de igualdade: se o response, que vem de getStaticPros, é exatamente igual ao que foi passado aqui
    expect(response).toEqual(
      expect.objectContaining({
        props: {
          product: {
            priceId: 'fake-price-id',
            amount: '$10.00'
          },
        },
        revalidate: 86400,
      })
    )
  });
})

/*

Primeiro teste unitário em páginas: página Home

Importar 'render' e 'screen' de dentro de @testing-library/react'

Mockar o roteamento (next/router) e a autenticação (next-auth/react):

O mock do 'next-auth' retorna o 'useSession' que retorna uma função 'null, false', isso significa que o usuário está deslogado

jest.mock('next/router')
jest.mock('next-auth/react', () => {
  return {
    useSession: () => [null, false]
  }
})

Inserir a função 'describe' que fica por volta das funções 'it'

O primeiro parâmetro da função 'describe' é o nome 'Homepage' para a categoria

O segundo parâmetro da função describe é uma função que receberá as funções 'it'

A função 'it' recebe como primeiro parâmetro o texto esperado pelo teste: 'renders correctly'

O segundo parâmetro da função 'it' é uma função render

A função render passa o componente '<Home />'

Fazer a importação do componente para dentro do arquivo de teste

O componente <Home /> espera receber a propriedade 'product' e a propriedade 'product' recebe as propriedades 'priceId' e 'amount'

A propriedade 'prideId' recebe 'fake-price-id' só para simular o teste

A propriedade 'amount' recebe um valor aleatório só para simular também

render(<Home product={{ priceId: 'fake-price-id', amount: 'R$10,00' }} />)

O 'expect' espera que o teste identifique o texto 'for R$10,00 month' dentro do HTML

expect(screen.getByText("for R$10,00 month")).toBeInTheDocument()

Salvar e executar teste: yarn test

O teste não passou!

Mensagem de erro: 'No router instance found. You should only use "next/router" on the client side of your app'

O próximo teste será feito na função 'getStaticProps'

Então no teste vamos chamar a função, vamos simular o retorno de dentro da API Stripe, então precisaremos criar um mock para Stripe

Então se o retorno acontecer do jeito esperado, ou seja, se a formatação renderizar da maneira correta, então no final é retornado os dados esperado

Então criaremos mais uma função 'it' para testar isso

A função recebe o texto de retorno 'loads initial data', para testar se a página está carregando os dados iniciais

it('loads initial data', () => {})

Agora vamos mockar o stripe:

jest.mock('../../services/stripe')

Importar o stripe para dentro do arquivo de teste, o stripe vem de dentro de '/services/stripe'

Criar o mock específico do stripe dentro da função 'it'

A função mock 'const retrieveStripeMocked' passa o método jest.mocked que passa 'stripe.prices.retrieve'

O 'stripe.prices.retrieve' vem de dentro da página Home, no getStaticProps

Chamar a função 'retrieveStripeMocked' passando a função 'mockResolvedValueOnce'

Vamos usar a função 'mockResolvedValueOnce', pois 'stripe.prices.retrieve' lá da página Home é uma função assíncrona que retorna uma promise, então tem que usar essa função especificamente

A função 'mockResolvedValueOnce' passa 'id' e 'unit_amount' que vem de dentro da página Home também

O 'as any' é passado para parar os erros de Typescript

Vamos passar o async na função (2º parâmetro)

it('loads initial data', async () => {
    const retrieveStripeMocked = jest.mocked(stripe.prices.retrieve)

    retrieveStripeMocked.mockResolvedValueOnce({
      id: 'fake-price-id',
      unit_amount: 1000,
    } as any)
  })

Vamos criar uma nova função 'const response' que passa 'await getStaticProps'

O 'getStaticProps' recebe um objeto vazio

const response = await getStaticProps({})

Agora vamos inserir o 'expect':

Esse 'expect' é uma comparação de igualdade, ou seja, ele vai comparar o primeiro 'expect' com o segundo e ver se eles renderizam o mesmo conteúdo

O 'expect(response) é o conteúdo lá da página Home que vem de 'getStaticProps'

O 'expect.objectContaining({ props:...)' é o conteúdo esperado que o teste receba da renderização

Então, o teste vai pegar o conteúdo lá da página Home e comparar com o conteúdo que foi passado aqui no teste

Se eles forem iguals (toEqual), então o teste vai passar

O teste fica assim:

expect(response).toEqual(
      expect.objectContaining({
        props: {
          product: {
            priceId: 'fake-price-id',
            amount: '$10.00'
          }
        }
      })
    )

Salvar e executar o teste: yarn test

O teste não passou!

* Marcos me ajudou nessa parte, descobrimos que o erro está na converão de USD para BRL, na minha aplicação usei a moeda real, enquanto que o professor Diego usou dolar, então, basicamente o teste não passou, pq o Node não aceita outras moedas, apenas dolar, caso insira outra moeda diferente do dolar, vai surgir um erro no teste no momento da conversão (o código de conversão está abaixo e é exatamente o trecho de código que está dando problema)

amount: new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price.unit_amount / 100),

A solução mais fácil é configurar a moeda para dolar:

No arquivo da página Home (src/pages/index.tsx): alterar a moeda para dolar

amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),

Aqui no arquivo de teste alterar o conteúdo esperado para dolar também, substituir todos os 'R$ 10,00' por '$10.00'

Salvar e executar o teste: yarn test

O teste passou!

O próximo teste será feito na página Posts

Criar um novo arquivo 'Posts.spec.tsx' dentro da pasta '/tests/pages'

Ir para o arquivo 'Posts.spec.tsx' para iniciar a configuração do teste

*/
