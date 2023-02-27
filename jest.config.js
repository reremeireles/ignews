module.exports = {
  testPathIgnorePatterns: ["/node_modules", "/.next"],
  setupFilesAfterEnv: [
    "<rootDir>/src/tests/setupTests.ts"
  ],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest"
  },
  moduleNameMapper: {
    "\\.(scss|css|sass)$": "identity-obj-proxy"
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.tsx",
    "!src/**/*.spec.tsx",
    "!src/**/_app.tsx",
    "!src/**/_document.tsx"
  ],
  coverageReporters: [
    "lcov",
    "json"
  ],
  testEnvironment: 'jsdom'
};

/*
CONFIGURANDO TESTING LIBRARY

Primeiramente instalar as bibliotecas abaixo:

yarn add jest jest-dom @testing-library/jest-dom @testing-library/dom @testing-library/rea
ct babel-jest -D

jest = biblioteca de testes
jest-dom = integração do jest com a árvore de elementos, muito usado em testes front-end que utilizam a dom
@testing-library = é uma biblioteca famosa de testes front-end, usada no React, Angular, Vue
babel-jest = converte os componentes e testes escritos em TypeScript para JavaScript, pois o Jest não entende por si só códigos TypeScript

Criar um arquivo 'jest.config.js' na raíz da aplicação

Dentro do arquivo inserir algumas propriedades dentro de module.exports = {}

Propriedade 'testPathIgnorePatterns' vai ignorar as pastas que não precisam de manutenção de código, no caso são: 'node_modules' e '.next'

Propriedade 'transform' vai transformar os arquivos Typescript em uma maneira que o Jest vá entender, dentro dessa propriedade é passado uma expressão regular e significa basicamente que: todo arquivo que começa com qualquer caracter que contém um ou mais caracter no nome e que ele tenha as extensões '.js, .jsx, .ts, .tsx', os arquivos que satisfazem essa condição serão transformados

"^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest"

^ = ínicio do arquivo
. = qualquer caracter
+ = um ou mais qualquer caracter
\\ = separação entre o '.' (caracter) e o '.' (extensão)
(js|jsx|ts|tsx) = extensões de arquivos
<rootDir> = simboliza a pasta root da aplicação
/node_modules/babel-jest = biblioteca que vai transformar os arquivos TypeScript em uma maneira que o Jest vá entender

Dentro da pasta 'src' criar uma nova pasta chamada 'tests'

Dentro da pasta 'tests' criar um arquivo chamado 'setupTests.ts'

Abrir o arquivo 'setupTests.ts' e configurá-lo, depois voltar para este arquivo

Inserir mais uma propriedade dentro de 'module.exports':

A propriedade 'setupFilesAfterEnv' recebe '"<rootDir>/src/tests/setupTests.ts"'

A última propriedade que o 'module.exports' recebe é 'testEnvironment'

A propriedade 'testEnvironment' indica em qual ambiente os testes estão sendo executados para saber como o Jest se comportaria no momento dos testes, a propriedade recebe o 'jsdom' que é uma forma nativa de fazer isso, por exemplo: quando estamos renderizando um html, que é o que precisamos fazer dentro dos testes para testar se algo está sendo exibido em tela, o 'jsdom' cria uma representação da árvore de elementos (dom) em formato JavaScript, tipo um array de objetos para entender o que foi renderizado ou não em tela

Agora criar um arquivo de configuração do 'babel' na raíz do projeto: 'babel.config.js'

Após instalar a biblioteca 'identity-obj-proxy' para tratar arquivos com extensão 'scss, css e sass', vamos inserir a propriedade aqui dentro do config do Jest:

moduleNameMapper: {
    "\\.(scss|css|sass)$": "identity-obj-proxy"
},

Basicamente essa propriedade vai transformar todo arquivo que termina com as extensões scss, css e sass usando a biblioteca 'identity-obj-proxy'

*/
