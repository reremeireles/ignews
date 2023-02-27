import '@testing-library/jest-dom/extend-expect';
// import areIntlLocalesSupported from 'intl-locales-supported';

// const localesMyAppSupports = [
//     'pt-BR'
// ];

// if (global.Intl) {

//     // Determine if the built-in `Intl` has the locale data we need.
//     if (!areIntlLocalesSupported(localesMyAppSupports)) {
//         // `Intl` exists, but it doesn't have the data we need, so load the
//         // polyfill and patch the constructors we need with the polyfill's.
//         const IntlPolyfill = require('intl');
//         Intl.NumberFormat = IntlPolyfill.NumberFormat;
//         Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;

//         Number.prototype.toLocaleString = IntlPolyfill.__localeSensitiveProtos.Number.toLocaleString;
//         Date.prototype.toLocaleString = IntlPolyfill.__localeSensitiveProtos.Date.toLocaleString;

//     }

// } else {
//     // No `Intl`, so use and load the polyfill.
//     global.Intl = require('intl');
// }

/*
CONFIGURANDO setupTests.js

Importar para dentro do arquivo:

import '@testing-library/jest-dom/extend-expect';

Essa importação basicamente traz algumas funcionalidades a mais para o Jest para que possamos lidar com a DOM, por padrão o Jest consegue fazer algumas operações para validar se algum funcionamento é esperado pela aplicação ou não

Voltar no arquivo 'jest.config.js' para configurar mais uma propriedade (setupFilesAfterEnv)

*/
