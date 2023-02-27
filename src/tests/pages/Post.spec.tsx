import { render, screen } from '@testing-library/react';
import { getSession } from 'next-auth/react';
import Post, { getServerSideProps } from '../../pages/posts/[slug]';
import { getPrismicClient } from '../../services/prismic';

const post = {
    slug: 'my-new-post',
    title: 'My New Post',
    content: '<p>Post excerpt</p>',
    updatedAt: '20 de Janeiro'
  };

jest.mock('next-auth/react');
jest.mock('../../services/prismic');

describe('Posts page', () => {

  it('renders correctly', () => {
    render(<Post post={post} />)

    expect(screen.getByText("My New Post")).toBeInTheDocument()
    expect(screen.getByText("Post excerpt")).toBeInTheDocument()
  });


  it('redirects user if no subscription is found', async () => {
    const getSessionMocked = jest.mocked(getSession)

    getSessionMocked.mockResolvedValueOnce(null)

    const response = await getServerSideProps({
      params: { slug: 'my-new-post' }
    } as any)

    // comparação de igualdade: se o response, que vem de getStaticPros, é exatamente igual ao que foi passado aqui
    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: '/',
        })
      })
    )
  });

  it('loads initial data', async () => {
    const getSessionMocked = jest.mocked(getSession)
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

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: 'fake-active-subscription'
    } as any);

    const response = await getServerSideProps({
      params: { slug: 'my-new-post' }
    } as any)

    // comparação de igualdade: se o response, que vem de getStaticPros, é exatamente igual ao que foi passado aqui
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
  });
})

/*
Terceiro teste unitário em páginas: página Post (slug)

OBS: NÃO CONFUNDIR 'Posts' com 'Post' !!!

Copiar e colar aqui a estrutura do código de teste da página 'Posts' e ir ajustando para a página 'Post'

Alterar a importação para 'Post' e 'getServerSideProps' que vem de dentro de '../../pages/posts/[slug]':

  import Post, { getServerSideProps } from '../../pages/posts/[slug]';

Comentar o segundo teste, deixando apenas o primeiro teste visível neste primeiro momento de teste

Em 'render(...) alterar a importação do componente para 'Post' e alterar a propriedade para 'post={}:

  it('renders correctly', () => {
    render(<Post post={} />)

A propriedade 'post={}' recebe os atributos 'slug, title, content e updatedAt' que vem lá da página de Post
(interface PostProps {...):

  const post = {
      slug: 'my-new-post',
      title: 'My New Post',
      content: '<p>Post excerpt</p>',
      updatedAt: '20 de Janeiro'
    };

Passar a variável 'post' para dentro da propriedade 'post={}:

  render(<Post post={post} />)

Agora o 'expect' espera receber o título do post e o conteúdo do post:

  expect(screen.getByText("My New Post")).toBeInTheDocument()
  expect(screen.getByText("Post excerpt")).toBeInTheDocument()

Salvar e excutar o teste: yarn test

O teste passou!

Agora vamos descomentar o segundo teste para testa-lo

Lá na página de 'Post (slug)' ela roda o 'getServerSideProps' receve dois parâmetros, o 'req' e o 'params'

E faz uma verificação se o usuário não tem uma inscrição ativa, ele é redirecionado de volta para Home, se o usuário tem uma inscrição ativa, ele busca os dados da publicação no prismic e retorna o contepudo para o usuário

Vamos testar a primeira verificação na qual o usuário não tem a inscrição ativa

Vamos alterar o nome do teste 'it' para:

  it('redirects user if no subscription is found',...

Vamos deletar a parte do 'prismic' neste primeiro teste, pois esse teste nem chega a usar o prismic

Vamos chamar o 'getServerSideProps':

  const response = await getServerSideProps({})

Ele faz a verificação de inscrição ativa atráves dos cookies

Vamos enviar para essa função o req, dentro do req vamos inserir os cookies e eles vão estar vazios:

Inserir 'as any' para parar possíveis problemas de tipagem

  const response = await getServerSideProps({
        req: {
          cookies: {},
        },
      } as any)

Agora o 'expect' espera que a resposta contenha um objeto com 'redirect' que contenha um objeto 'destination':

  expect(response).toEqual(
    expect.objectContaining({
      redirect: expect.objectContaining({
        destination: '/',
      })
    })
  )

Salvar e executar o teste: yarn test

O teste não passou!

Mensagens de erro:

'Cannot read properties of undefined (reading 'cookie')'

'Fetch is not defined'

Então, para correção do erro, vamos mockar a função 'getSession' para retornar que o usuário não está logado

  jest.mock('next-auth/react');

Dentro da função 'it(redirects...)' vamos criar o mock de 'getSession':

  const getSessionMocked = jest.mocked(getSession)

Quando 'getSessionMocked' for chamada, ela vai receber 'mockResolvedValueOnce' que passa 'null' que significa que a inscrição do usuário não existe:

  getSessionMocked.mockResolvedValueOnce(null)

Vamos chamar o 'getServerSideProps' passando um objeto contendo 'params' que recebe 'slug'

E passar o 'as any' para não dar erro de tipagem:

  const response = await getServerSideProps({
    params: {
      slug: 'my-new-post'
    }
  } as any)

Salvar e executar o teste: yarn test

O teste passou!

Agora vamos testar para verificar se os dados do usuário estão sendo carregados caso ele esteja autenticado

Criar mais uma função 'it' chamada de 'loads initial data':

Vamos mockar o 'getSession' também para verificação a inscrição do usuário

Quando a função 'getSessionMocked' for chamada ela vai passar 'mockResolvedValueOnce' passando a 'activeSubscription' para verificar a autenticação do usário

E passar o 'as any' para não dar erro de tipagem:

  it('loads initial data', async () => {
    const getSessionMocked = jest.mocked(getSession)

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: 'fake-active-subscription'
    } as any);
  })

Agora vamos mockar o 'prismic':

jest.mock('../../services/prismic');

Lá na função 'it('loads initial...':

  const getPrismicClientMocked = jest.mocked(getPrismicClient)

Quando 'getPrismicClientMocked', ele vai passar 'mockReturnValueOnce' que vai passar 'getByUID'

O 'getByUID' é uma função, então ele recebe 'jest.fn()' que passa 'mockResolvedValueOnce' que passa as propriedades do post em si que são o 'data' que passa um objeto contendo 'title', 'content' e 'last_publication_date'

O 'title' passa um array contendo um objeto com 'type' e 'text'

O 'content' passa um array contendo um objeto com 'type' e text'

E passar o 'as any' para não dar erro de tipagem:

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

O 'expect' espera que a resposta retorne um objeto 'props' contendo 'post' contendo 'slug', 'title', 'content' e 'updatedAt':

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

Salvar e executar o teste: yarn test

O teste passou!

O próximo teste será feito na página indidual de cada Post (slug)

Criar um novo arquivo 'PostPreview.spec.tsx' dentro da pasta '/tests/pages'

Ir para o arquivo 'PostPreview.spec.tsx' para iniciar a configuração do teste

*/
