import { render, screen } from '@testing-library/react'
import { useSession } from 'next-auth/react';
import mockRouter from 'next-router-mock';
import Post, { getStaticProps } from '../../pages/posts/preview/[slug]'
import { getPrismicClient } from '../../services/prismic';

const post = {
  slug: 'my-new-post',
  title: 'My New Post',
  content: '<p>Post excerpt</p>',
  updatedAt: '23 de Janeiro'
};

jest.mock('next-auth/react')
jest.mock('next/router', () => require('next-router-mock'));
jest.mock('../../services/prismic')

describe('Post preview page', ()=> {
  it('renders correctly', ()=> {
    const useSessionMocked = jest.mocked(useSession)

    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: 'loading'
    })

    render(<Post post={post}/>)

    expect(screen.getByText("My New Post")).toBeInTheDocument()
    expect(screen.getByText("Post excerpt")).toBeInTheDocument()
    expect(screen.getByText("Wanna continue reading?")).toBeInTheDocument()
  })

  it('redirects user to full post when user is subscribed', async () => {
    const useSessionMocked = jest.mocked(useSession)
    const routerPushSpyOn = jest.spyOn(mockRouter, 'push')

    useSessionMocked.mockReturnValueOnce({
      data: {
        user: { name: "John Doe", email: "john.doe@example.com" },
        expires: "fake-expires",
        activeSubscription: 'fake-subscription'
      },
      status: "authenticated",
    })

    render(<Post post={post} />)

    expect(routerPushSpyOn).toHaveBeenCalledWith('/posts/my-new-post')
    expect(mockRouter.pathname).toEqual('/posts/my-new-post')
  })

  it('loads initial data', async () => {
    const getPrismicClientMocked = jest.mocked(getPrismicClient)

    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [
            { type: 'heading', text: 'My New Post' }
          ],
          content: [
            { type: 'paragraph', text: 'Post content' }
          ]
        },
        last_publication_date: '01-23-2023'
      })
    } as any)

    const response = await getStaticProps({
      params: {
        slug: 'my-new-post'
      }
    })

    // compara????o de igualdade: se o response, que vem de getStaticPros, ?? exatamente igual ao que foi passado aqui
    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: 'my-new-post',
            title: 'My New Post',
            content: '<p>Post content</p>',
            updatedAt: '23 de janeiro de 2023'
          }
        }
      })
    )
  })
})

/*
Terceiro teste unit??rio em p??ginas: p??gina Post Preview

Copiar e colar aqui a estrutura do c??digo de teste da p??gina 'Post' e ir ajustando para a p??gina 'Post Preview'

Alterar a importa????o para 'Post' e 'getStaticProps' que vem de dentro de '../../pages/posts/preview/[slug]':

  import Post, { getStaticProps } from '../../pages/posts/preview/[slug]';

Alterar o nome da categoria do describe' para:

  describe('Post Preview page',...

Comentar os outros dois testes, deixando apenas o 'renders correctly' por enquanto

Importar o 'useSession' para dentro do arquivo de teste:

  import { useSession } from 'next-auth/react';

Mockar o 'useSession' dentro da fun????o 'it(renders correctly...':

  it('renders correctly', () => {
    const useSessionMocked = jest.mocked(useSession)

Quando a fun????o 'useSessionMocked' for chamada, ela passa 'mockReturnValueOnce' com os par??metros 'null' e 'false':

  useSessionMocked.mockReturnValueOnce([null, false])

Antes do 'expect' vamos inserir a fun????o 'render':

  render(<Post post={post} />)

Dessa vez a fun????o 'render' vai ficar no final da fun????o 'it', pq precisamos que o teste retorne os dados primeiro antes de renderizar o componente Post

Agora inserir o 'expect' que espera retornar essas tr??s verifica????es: o t??tulo do post, uma pr??via do post e um texto de redirecionamento do usu??rio:

  expect(screen.getByText("My New Post")).toBeInTheDocument()
  expect(screen.getByText("Post excerpt")).toBeInTheDocument()
  expect(screen.getByText("Wanna continue reading?")).toBeInTheDocument()

Salvar e executar o teste: yarn test

O teste passou!

Agora vamos testar a segunda verifica????o que vai redirecionar o usu??rio para o post completo quando o usu??rio estiver com a inscri????o ativa:

  it('redirects user to full post when user user is subscribed',...

Vamos mockar o 'useSession' para simular o usu??rio com inscri????o ativa:

  const useSessionMocked = jest.mocked(useSession)

Quando a fun????o 'useSessionMocked' for chamada, ela vai passar 'mockReturnValueOnce'

O 'mockReturnValueOnce' vai passar um array com um objeto dentro com a propriedade 'data' e 'status

A propriedade 'data' vai passar um objeto com conte??do da inscri????o do usu??rio sendo eles o 'user', 'expires' e 'activeSubscription'

A propriedade 'status' recebe 'authenticated' informando que o usu??rio est?? com a inscri????o ativa

  useSessionMocked.mockReturnValueOnce({
    data: {
      user: { name: "John Doe", email: "john.doe@example.com" },
      expires: "fake-expires",
      activeSubscription: 'fake-subscription'
    },
    status: "authenticated",
  })

Assim como no teste do componente 'SubscribeButton' aqui tamb??m usaremos o 'mockRouter' ao inv??s de usar o 'next/router' para evitar algum erro de roteamento no momento do teste

Importar o 'mockRouter' para dentro do arquivo de teste:

  import mockRouter from 'next-router-mock';

Na fun????o it'('redirects user to full...' vamos mockar criar uma vari??vel do tipo 'spyOn' que recebe dois argumentos: o pr??prio 'mockRouter' e o 'push':

  const routerPushSpyOn = jest.spyOn(mockRouter, 'push')

it('redirects user to full post when user is subscribed', async () => {
    const useSessionMocked = jest.mocked(useSession)
    const routerPushSpyOn = jest.spyOn(mockRouter, 'push')

    useSessionMocked.mockReturnValueOnce({
      data: {
        user: { name: "John Doe", email: "john.doe@example.com" },
        expires: "fake-expires",
        activeSubscription: 'fake-subscription'
      },
      status: "authenticated",
    })

    render(<Post post={post} />)

    expect(routerPushSpyOn).toHaveBeenCalledWith('/posts/my-new-post')
    expect(mockRouter.pathname).toEqual('/posts/my-new-post')
  })

Agora chamamos a renderiza????o:

  render(<Post post={post} />)

A fun????o 'render' vai ficar no final da fun????o 'it', pq precisamos que o teste retorne os dados primeiro antes de renderizar o componente Post

O 'expect' espera que a fun????o 'push' tenha sido chamada e que a rota que direciona o usu??rio seja igual a '/posts/my-new-post'

  expect(routerPushSpyOn).toHaveBeenCalledWith('/posts/my-new-post')
  expect(mockRouter.pathname).toEqual('/posts/my-new-post')

Esse 'my-new-post' ?? o slug que foi passado l?? no in??cio na vari??vel 'post'

Salvar e executar o teste: yarn test

O teste passou!

Finalizado os testes em componentes e p??ginas!
*/
