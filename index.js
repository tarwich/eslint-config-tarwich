'use strict';

const jsDocRules = {
  require: {
    FunctionDeclaration: true,
    MethodDefinition:    true,
    ClassDeclaration:    true,
  }
};

const lengthOptions = {
  code:           120,
  ignoreComments: true,
  ignorePattern:  '=\\s*\\/'
};

module.exports = {
  extends: 'google',
  rules:   {
    'brace-style':          ['error', 'stroustrup'],
    'camelcase':            ['error', {properties: 'never'}],
    'comma-dangle':         ['error', 'only-multiline'],
    'curly':                ['error', 'multi-or-nest'],
    'indent':               ['error', 2, {MemberExpression: 0}],
    'key-spacing':          ['error', {align: 'value'}],
    'max-len':              ['error', lengthOptions],
    'no-floating-decimal':  'error',
    'no-multi-spaces':      ['off'],
    'no-use-before-define': ['error', {functions: true, classes: true}],
    'no-var':               ['error'],
    'no-warning-comments':  ['error', {terms: ['fixme']}],
    'quotes':               ['error', 'single'],
    'require-jsdoc':        ['error', jsDocRules],
    'sort-keys':            ['error', {caseSensitive: true}],
    'valid-jsdoc':          ['error', {requireReturn: false, natural: true}],
  },
};
