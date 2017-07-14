# git-bump-cli

[![NPM version][npm-image]][npm-url]
<!-- [![Build status][travis-image]][travis-url] -->
<!-- [![Test coverage][coveralls-image]][coveralls-url] -->

> Bump package.json version and git tags it

## Installation

```
npm install git-bump-cli --save
```

## CLI

```
npm install git-bump-cli -g
```

```
Usage
	$ bump <type>
	$ bump patch // 1.0.1
	$ bump minor // 1.1.0
	$ bump major // 2.0.0
```

## Node Usage

```
var bump = require('git-bump-cli');
var type = 'major';
var options = {
	files:['bower.json','package.json'],
	message:'new version'
}

bump(type,options,callback);
```

## License

MIT

[npm-image]: https://img.shields.io/npm/v/git-bump-cli.svg?style=flat-square
[npm-url]: https://npmjs.org/package/git-bump-cli
<!-- [travis-image]: https://img.shields.io/travis/webcaetano/git-bump-cli.svg?style=flat-square
[travis-url]: https://travis-ci.org/webcaetano/git-bump-cli
 -->
