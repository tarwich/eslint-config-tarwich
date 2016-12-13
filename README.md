Eslint Configuration by Tarwich
===============================

This is the [eslint] configuration that the company I work for uses. We extended
eslint-config-google as it sounded like a level-headed configuration to start
with. However, we modified some of the rules like [brace-style] to match our
culture.

[eslint]: http://eslint.org/
[brace-style]: http://eslint.org/docs/rules/brace-style

Installation
------------

Install this with `npm install tarwich/eslint-config-tarwich#v1.5.1` or the
appropriate `yarn` command. Then create a configuration file that uses our
config and adds any of your corporate rules as overrides.

Example `.eslintrc.js`
````js
'use strict';

const path = require('path');

module.exports = {
  // You can also do extends: 'eslint-config-tarwich', but some editors prefer
  // the full path
  extends: path.resolve('node_modules', 'eslint-config-tarwich', 'index.js'),
  rules:   {
    // Any of your corporate overrides would go here
  },
};
````

Please [let me know] if any rules don't make sense. I'm always learning from the
community. It's easy to make rules that work for me without realizing the larger
implication of a different rule.

[let me know]: https://github.com/tarwich/eslint-config-tarwich/issues
