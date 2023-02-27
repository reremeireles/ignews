import { render, screen } from '@testing-library/react';
import Posts, { getStaticProps } from '../../pages/posts';
import { getPrismicClient } from '../../services/prismic';

const posts = [{
    slug: 'my-new-post',
    title: 'My New Post',
    excerpt: 'Post excerpt',
    updatedAt: '20 de Janeiro'
  }
];

jest.mock('../../services/prismic')

describe('Posts page', () => {

  it('renders correctly', () => {
    render(<Posts posts={posts} />)

    expect(screen.getByText("My New Post")).toBeInTheDocument()
  });

  it('loads initial data', async () => {
    const getPrismicClientMocked = jest.mocked(getPrismicClient)

    getPrismicClientMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: 'my-new-post',
            data: {
              title: [
                { type: 'heading', text: 'My New Post' }
              ],
              content: [
                { type: 'paragraph', text: 'Post excerpt' }
              ],
            },
            last_publication_date: '01-20-2023',
          }
        ]
      })
    } as any)

    const response = await getStaticProps({})

    // comparação de igualdade: se o response, que vem de getStaticPros, é exatamente igual ao que foi passado aqui
    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [{
            slug: 'my-new-post',
            title: 'My New Post',
            excerpt: 'Post excerpt',
            updatedAt: '20 de janeiro de 2023'
          }]
        }
      })
    )
  });
})

/*
Segundo teste unitário em páginas: página Posts

Copiar e colar aqui a estrutura do código de teste da página Home e ir ajustando para a página Posts

Excluir os mocks de roteamento e autenticação (next/router, next-auth/react, stripe)

Excluir a importação do componente Home e substituir pelo componente Posts, acertar a importação também que vem de:

  import Posts, { getStaticProps } from '../../pages/posts'

Atualizar o nome da categoria no 'describe' para 'Posts page':

  describe('Posts page', ()...

Na função 'render', substituir o componente 'Home' por 'Posts', apagar as propriedades do componente 'Home' e inserir a propriedade 'posts={}':

  it('renders correctly', () => {
      render(<Posts posts={posts} />)

Se formos lá no arquivo da página 'Posts' (index.tsx), vamos ver que o 'type Post' recebe algumas propriedades:

  type Post = {
      slug: string;
      title: string;
      excerpt: string;
      updatedAt: string;
  };

Então aqui no teste precisamos criar essas propriedades para serem testadas também

Então vamos criar uma variável 'const posts = []' e passar as propriedades citadas acima:

  const posts = [
    {
      slug: 'my-new-post',
      title: 'My New Post',
      excerpt: 'Post excerpt',
      updatedAt: '20 de Janeiro'
    }
  ];

Após criar a variável 'posts', passar ela para dentro da propriedade 'posts={}' do componente 'Posts':

  render(<Posts posts={posts} />)

No 'expect' é esperado visualizar o título do post:

  expect(screen.getByText("My New Post")).toBeInTheDocument()

Por enquantos vamos ocultar o restante do teste, deixando apenas o primeiro para testar agora, igual abaixo:

  it('renders correctly', () => {
      render(<Posts posts={posts} />)

      expect(screen.getByText('My New Post')).toBeInTheDocument()
    })
  })

Salvar e executar o teste: yarn test

O teste passou!

Agora precisamos mockar o 'prismic':

  jest.mock('../../services/prismic')

Vamos importar o 'getPrismicClient' para dentro do arquivo de teste:

  import { getPrismicClient } from '../../services/prismic';

Agora no segundo teste 'it('loads initial data', async...' vamos criar uma variável const para mockar o prismic:

  const getPrismicClientMocked = jest.mocked(getPrismicClient)

Agora quando o método 'getPrismicClientMocked' for chamado vamos passar o 'mockReturnValueOnce' para retornar esse resultado apenas uma vez:

  getPrismicClientMocked.mockReturnValueOnce({})

Agora se formos lá no arquivo do Post (index.tsx), vamos ver que em 'getStaticProps', ele chama 'getPrismicClient' e salva ele dentro da variável 'prismic' e dentro da variável 'prismic' é passado um método chamado 'query'

Voltando a este arquivo de teste, vamos passar o método 'query' para dentro da função 'getPrismicClientMocked.mockReturnValueOnce({})':

O método 'query' vai ser uma função que vai retornar 'mockResolvedValueOnce'

A função também vai retornar 'results' (esse results vem lá do arquivo do Posts, na variável const posts ela retorna response.results)

O 'results' é um array e dentro de 'results' dele tem cada um dos posts

O 'results' tem as propriedades 'uid', 'data' e 'last_publication_date: '01-20-2023''

O 'uid' recebe 'my=new-post'

Dentro de 'data' tem 'title' e 'content'

O 'title' e o 'content' recebem cada um array de objetos com tipos

O 'last_publication_date: '01-20-2023'' recebe uma data

Inserir 'as any' no final para parar de dar erro de tipo

  getPrismicClientMocked.mockReturnValueOnce({
        query: jest.fn().mockResolvedValueOnce({
          results: [
            {
              uid: 'my-new-post',
              data: {
                title: [
                  { type: 'heading', text: 'My New Post' }
                ],
                content: [
                  { type: 'paragraph', text: 'Post excerpt' }
                ],
              },
              last_publication_date: '01-20-2023',
            }
          ]
        })
      } as any)

Agora vamos chamar o 'getStaticProps' no expect

O 'expect' espera que o retorno tenha um array recebendo 'props' e dentro de 'props' tenha 'posts' e dentro de 'posts' tenha um array de objetos com slug, title, excerpt e updatedAt

  const response = await getStaticProps({})

      // comparação de igualdade: se o response, que vem de getStaticPros, é exatamente igual ao que foi passado aqui
      expect(response).toEqual(
        expect.objectContaining({
          props: {
            posts: [{
              slug: 'my-new-post',
              title: 'My New Post',
              excerpt: 'Post excerpt',
              updatedAt: '20 de janeiro de 2023'
            }]
          }
        })
      )
    });

Salvar e executar o teste: yarn test

O teste passou!

O próximo teste será feito na página indidual de cada Post (slug)

Criar um novo arquivo 'Post.spec.tsx' dentro da pasta '/tests/pages'

Ir para o arquivo 'Post.spec.tsx' para iniciar a configuração do teste
*/
