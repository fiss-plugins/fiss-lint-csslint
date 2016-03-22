/**
 * @description a css linter plugin of fiss based on csslint
 */


/**
 * eslint ignore
 * @param  {Object} fiel  An instence of File class, which defined in fis.
 * @param  {Object} conf  The lint conf.
 * @return {Boolean}      If current subpath matchs one of ignore pattern, return true.
 */
function ignore(file, conf) {
    var ignored = [], ignoreFiles = conf.ignoreFiles;

    if (ignoreFiles) {
        if (typeof ignoreFiles === 'string' || fis.util.is(ignoreFiles, 'RegExp')) {
            ignored = [ignoreFiles];
        } else if (fis.util.is(ignoreFiles, 'Array')) {
            ignored = ignoreFiles;
        }
        delete conf.ignoreFiles;
    }
    if (ignored) {
        for (var i = 0, len = ignored.length; i < len; i++) {
            if (fis.util.filter(file.subpath, ignored[i])) {
                return true;
            }
        }
    }

    return false;
}

/**
 * formmatter message print
 * @param  {Array} messages   The lint result messages.
 * @example
 * {
 *    type: 'warning',
 *    line: 6,
 *    col: 6,
 *    message: 'The universal selector (*) is known to be slow.',
 *    evidence: 'html * {',
 *    rule:{
 *      id: 'universal-selector',
 *      name: 'Disallow universal selector',
 *      desc: 'The universal selector (*) is known to be slow.',
 *      browsers: 'All',
 *      init: [Function]
 *    }
 * }
 * @return {String} report    A formatted report.
 */
function formatter(messages) {
    var error = warning = 0;
    var report = messages.map(function(item, index) {
        var type, info;
        if (item.type == "warning") {
            type = item.type.yellow;
            ++warning;
        } else {
            type = item.type.red;
            ++error;
        }

        // info layout
        // @example
        // ------------
        // src/css/test.css:
        //  8:2  error  Unknown property 'hegiht'.  hegiht: 500px;
        info = '\n  ' + item.line + ':' + item.col + '  ' + type + '  ' + item.message + '  ' + item.evidence.gray;
        return info;
    });

    // problems show
    // 3 problems  (1 errors, 2 warnings)
    var total = error+warning;
    var statis = '\n\n  '+ total + ' problems  (' + error + ' errors, ' + warning + ' warnings)';

    return report.join('\n') + statis.yellow.bold;
}


module.exports = function(content, file, conf) {
    if (ignore(file, conf)) {
        return;
    }

    var defRules = require('./package.json').defConf.rules || {};
    var csslint = require('csslint').CSSLint;

    var rules = conf.rules || {};
    var assign = require('mixin-deep');
    rules = assign(defRules, rules);

    var result = csslint.verify(content, rules);

    if (result.messages && result.messages.length) {
        fis.log.info(file.id, ' fail!'.red, formatter(result.messages));
    } else {
        fis.log.info(file.id, ' pass!'.green);
    }
}
