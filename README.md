# fiss-lint-csslint

[![npm version](https://badge.fury.io/js/fiss-lint-csslint.svg)](https://badge.fury.io/js/fiss-lint-csslint)  [![npm](https://img.shields.io/npm/dt/fiss-lint-csslint.svg)](http://npm-stat.com/charts.html?package=fiss-lint-csslint&author=zhangyihua&from=2016-01-01&to=2116-01-24)

基于 [csslint](https://github.com/CSSLint/csslint) 的 fiss css linter。由于 fiss 基于 fis3 拓展，fis-conf.js 以及插件使用等都需遵循 fis3 规则。

----

## 使用

### 安装

全局安装：

```cli
	npm install -g fiss-lint-csslint
```

安装到当前目录：

```cli
	npm install fiss-lint-csslint
```

### 配置

**example:**

```javascript
// fis-conf.js

var csslintConf = {
	ignoreFiles: ['css/myignore.css'],
	rules: {
	  'known-properties': 2
	}
};

fis.match('css/*.css', {
	lint: fis.plugin('csslint', csslintConf)
});

```

`csslintConf.rules` 是对 csslint 的规则配置。规则详细请参见[csslint rules](https://github.com/CSSLint/csslint/wiki/Rules)。

`csslintConf.ignoreFiles`： 一个数组，配置应该忽略掉的文件，数组成员为文件的匹配模式。

### 默认配置

```js
{
	"rules": {
	  "known-properties": 2,
	  "empty-rules": 1,
	  "duplicate-properties": 1
	}
}

```

默认配置规则（rules）说明：

- [error] 错误的属性名。(know-properties)
- [warning] 样式规则内容为空。(empty-rules)
- [warning] 属性在一条规则里重复使用。(duplicate-properties)

更多规则请参见 [csslint rules](https://github.com/CSSLint/csslint/wiki/Rules)。