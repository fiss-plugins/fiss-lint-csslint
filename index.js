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
 	var ignored = [];

 	if (conf.ignore) {
 		if (typeof conf.ignore === 'string' || fis.util.is(conf.ignore, 'RegExp')) {
 		  ignored = [conf.ignore];
 		} else if (fis.util.is(conf.ignore, 'Array')) {
 		  ignored = conf.ignore;
 		}
 		delete conf.ignore;
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
 * [formatter description]
 * @param  {Array} messages   The lint result messages.
 * @example
 * { 
 * 	  type: 'warning',
 *    line: 6,
 *    col: 6,
 *    message: 'The universal selector (*) is known to be slow.',
 *    evidence: 'html * {',
 *	  rule:{ 
 * 		id: 'universal-selector',
 *   	name: 'Disallow universal selector',
 *      desc: 'The universal selector (*) is known to be slow.',
 *      browsers: 'All',
 *      init: [Function]
 *    }
 * }
 * @return {String} report    A formatted report.
 */
 function formatter(fileId, messages) {
 	var colors = require('colors');
 	var error = warning = 0;
 	var report = messages.map(function(item, index) {
 		var type;

 		if (item.type == "warning") {
 			type = item.type.yellow;
 			++ warning;
 		} else {
 			type = item.type.red;
 			++ error;
 		}

 		return `\n${fileId}: \n${++index}:  ${type}  (${item.line} line, ${item.col} col)  \n${item.message} \n${item.evidence.gray}`;
 	});
 	var statis = `(${error} error, ${warning} warning)`.red
 	return `${report.join('\n')} \n\n${statis}`;
 }


module.exports = function(content, file, conf) {
	if (ignore(file, conf)) {
		return;
	}

	var csslint = require('csslint').CSSLint;
	var rules = conf.rules || {};
	var result = csslint.verify(content, rules);

	if (!result.messages.length) {
		fis.log.info(file.id, 'all pass!'.green);
	} else {
		fis.log.info(formatter(file.id, result.messages));
	}
}