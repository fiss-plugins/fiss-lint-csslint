# fiss-lint-csslint

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
	ignore: ['css/myignore.css'],
	rules: {
	  'known-properties': 2
	}
};

fis.match('css/*.css', {
	lint: fis.plugin('csslint', csslintConf)
});

```

`csslintConf.rules` 是对 csslint 的配置。规则参见[csslint rules](https://github.com/CSSLint/csslint/wiki/Rules)。

`eslintConf.ignore`： 一个数组，配置应该忽略掉的文件，数组成员为文件的匹配模式，为 String 或 RegExp 类型。