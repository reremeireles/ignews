# 📰 Ignews

## 💡 Projeto

Desenvolvimento de uma aplicação WEB utilizando NextJS. O Ignews é um aplicação do tipo blog, onde o Font-end se torna mais responsável pelas funcionalidades da aplicação.

#### A aplicação contém as funcionalidades de:

- autenticação do usuário via GitHub,
- acesso a uma prévia dos conteúdos do blog,
- inscrição e assinatura mensal para consumir o conteúdo completo do blog.

#### Possíveis ações que o usuário pode tomar:

- acessar a página Home e realizar login usando a autenticação do GitHub. A página Home exibe o status do usuário quando ele está logado na aplicação, entretanto, estar logado não significa estar inscrito no serviço. O usuário pode acessar a página Posts e ter acesso apenas a uma prévia do conteúdo das postagens, sendo necessário partir para a próxima ação de se inscrever no serviço;

- estando logado, o usuário pode clicar no botão Subscribe para se inscrever no serviço, neste caso o usuário será redirecionado para a área de pagamentos do Stripe;

- por fim, estando logado e com uma inscrição ativa no serviço, o usuário poderá ter acesso a todos os conteúdos oferecidos pelo blog.

Acesse o deploy do projeto:

## 💻 Tecnologias e Bibliotecas

- ReactJS
- NextJS
- Typescript
- SASS
- Axios
- Stripe
  - controle de pagamentos
- GitHub OAuth
  - autenticação para logar com o GitHub
- FaunaDB
  - banco de dados
- Prismic
  - CMS (Content Management System)
- Jest
  - testes unitários

## 👩‍💻 Conceitos aplicados no projeto

- Front-end JAMStack
- Método Scoped CSS
  - utilizado para que a estilização de um componente nunca afete a estilização dos outros componentes. O Scoped CSS é nativo do NextJS, portanto, para usá-lo basta alterar a extensão `.css` para `.module.css`
- Estilização utilizando Classes
  - não é possível fazer estilização direto nos elementos HTML, é preciso usar classes para estilizar os elementos
- Estrutura base de arquivos no NextJS

  - `_app.tsx`

    - o arquivo `_app.tsx` está para o NextJS assim como o componente App está para o Create React App, ambos são arquivos que ficam por volta de todos os outros componentes da aplicação. Quando algum conteúdo ou elemento da aplicação precisa aparecer em todas as páginas da aplicação, é preciso inseri-lo dentro do arquivo `_app.tsx`

  - `_document.tsx`
    - o arquivo `_documents.tsx` funciona de forma semelhante ao arquivo `_app.tsx`, exceto pelo fato de que tudo que se encontra dentro do arquivo `_documents.tsx` carrega apenas uma vez dentro da aplicação

- Title dinâmico utilizando componente `<Head/>` importado do NextJS
- Configuração de estilos globais
  - os estilos globais são compartilhados em todas as páginas da aplicação
- Componentização
- Hooks
  - useRouter
  - useSession
  - useEffect
- Autenticação via GitHub utilizando o GitHub Provider do NextAuth
- Integração com a API do Stripe
- Conceitos de SSR (Server Side Rendering) e SSG (Static Site Generation)
- Data Fetching
- Webhooks do Stripe
  - monitorar e salvar dados dos eventos
- Configuração e consumo da API do Prismic através de integração com o NextJS
- Testes unitários em componentes e páginas utilizando o Jest
  - utilização de mocks para simular funcionalidades e rotas nos testes
