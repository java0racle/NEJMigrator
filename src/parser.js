var _config = require('./config.js'),
    _log    = require('./util/logger.js'),
    _util   = require('./util/util.js'),
    _fs     = require('./util/file.js'),
     fs     = require('fs'),
     util   = require('util'),
     path   = require('path');
/**
 * 
 */
var _doParseFile = (function(){
	var _template = "var f = function(){\n%s\n};\ndefine('%s',%j,f);";
	return function(_file,_result){
		var _rmap = _config.get('DEFINE_LIST'),
		    _output = (_file||'').replace(
			           _config.get('DIR_SRCROOT'),
			           _config.get('DIR_OUTROOT')),
			_conf = _rmap[_file];
	    _log.log('output %s',_output);
	    _fs.mkdir(path.dirname(_output));
	    // file no dependency
	    if (!_conf){
	    	_fs.copy(_file,_output);
	    	return;
	    }
	    // parse file
	    var _charset = _config.get('CFG_CHARSET'),
	        _content = '\t'+(_fs.read(_file,_charset)||[]).join('\n\t');
	    _fs.write(_output,util.format(_template,
	    	      _content,_conf.alias,_conf.deps),_charset);
	};
})();
/**
 * 列出目录下文件
 * @param  {String} 输入目录
 * @param  {Object} 解析结果集
 * @return {Object} 解析结果集
 */
var _doListFile = function(_dir,_result){
    _result = _result||{};
    if (!_dir) return _result;
    try{
        var _list = fs.readdirSync(_dir);
        if (!_list&&!_list.length){
            _log.warn('no file to parse! %s',_dir);
        }else{
            for(var i=0,l=_list.length,_file,_data,
                _reg = _config.get('CFG_EXTENSION');i<l;i++){
                _file = _list[i];
                if (_util.svn(_file))
                    continue;
                _file = _dir+_file;
                if (_fs.isdir(_file)){
                    _doListFile(_file+'/',_result);
                    continue;
                }
                if (!!_reg&&!_reg.test(_file))
                    continue;
                _doParseFile(_file,_result);
            }
        }
    }catch(e){
        _log.error('can\'t list files %s',e);
        console.log(e.stack);
    }
};
/**
 * 
 */
var __doParseFileList = function(_dir,_result){
	_doListFile(_dir,_result);
	var _file = _config.get('DIR_CONFIG')+'log.txt';
    _log.dump(_file);
    _log.info('migrate done! view log %s',_file);
};
// export api
exports.parse = __doParseFileList;
