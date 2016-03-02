<p align="center">
  <a href="https://travis-ci.org/evcohen/eslint-plugin-jsx-a11y">
    <img src="https://api.travis-ci.org/evcohen/eslint-plugin-jsx-a11y.svg?branch=master"
         alt="build status">
  </a>
  <a href="https://npmjs.org/package/eslint-plugin-jsx-a11y">
    <img src="https://img.shields.io/npm/v/eslint-plugin-jsx-a11y.svg"
         alt="npm version">
  </a>
  <a href="https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/LICENSE.md">
    <img src="https://img.shields.io/npm/l/eslint-plugin-jsx-a11y.svg"
         alt="license">
  </a>
  <a href='https://coveralls.io/github/evcohen/eslint-plugin-jsx-a11y?branch=master'>
    <img src='https://coveralls.io/repos/github/evcohen/eslint-plugin-jsx-a11y/badge.svg?branch=master' alt='Coverage Status' />
  </a>
</p>

# eslint-plugin-jsx-a11y

Static AST checker for accessibility rules on JSX elements.

## Why?
Ryan Florence built out this awesome runtime-analysis tool called [react-a11y](https://github.com/reactjs/react-a11y). It is pretty awesome. However, this creates more package-bloat and requries initialization in your code. Since you're probably already using linting in your project, this plugin comes for free and closer to actual development. Pairing this plugin with an editor lint plugin, you can bake accessibility standards into your application in real-time. 

Note: This project does not *replace* react-a11y, but can and should be used in conjunction with it. Static analysis tools cannot determine values of variables that are being placed in props before runtime, so linting will not fail if that value is undefined and/or does not pass the lint rule.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-jsx-a11y`:

```
$ npm install eslint-plugin-jsx-a11y --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-jsx-a11y` globally.

## Usage

Add `jsx-a11y` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "jsx-a11y"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "jsx-a11y/rule-name": 2
    }
}
```

## Supported Rules

- [img-uses-alt](docs/rules/img-uses-alt.md): Enforce that img jsx elements use the alt attribute.
- [onclick-uses-role](docs/rules/onclick-uses-role.md): Enforce that non-interactive, visible elements (such as div) that have click handlers use the role attribute.
- [mouse-events-map-to-key-events](docs/rules/mouse-events-map-to-key-events.md): Enforce that onMouseOver/onMouseOut are accompanied by onFocus/onBlur for strictly keyboard users.
- [use-onblur-not-onchange](docs/rules/use-onblur-not-onchange.md): Enforce that onBlur is used instead of onChange.
- [no-access-key](docs/rules/no-access-key.md): Enforce that the accessKey prop is not used on any element to avoid complications with keyboard commands used by a screenreader.
- [use-label-for](docs/rules/use-label-for.md): Enforce that label elements have the htmlFor attribute
- [redundant-alt](docs/rules/redundant-alt.md): Enforce img alt attribute does not contain the word image, picture, or photo.

## License

eslint-plugin-jsx-a11y is licensed under the [MIT License](LICENSE.md).
