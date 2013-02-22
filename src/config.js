var __config = {},
    _fs      = require('./util/file.js'),
    _log     = require('./util/logger.js'),
    _util    = require('./util/util.js'),
    _path    = require('./util/path.js'),
     path    = require('path'),
     util    = require('util');
/*
 * 设置配置信息
 * @param  {String} _key   配置标识
 * @param  {String} _value 配置内容
 * @return {Void}
 */
var __setConfig = function(_key,_value){
    __config[_key.trim().toUpperCase()] =
            !_value.trim?_value:_value.trim();
};
/**
 * 取配置信息
 * @param  {String} _key   配置标识
 * @return {String} _value 配置内容
 */
var __getConfig = function(_key){
    var _value = __config[_key.
                 trim().toUpperCase()];
    return _value==null?'':_value;
};
/*
 * 检查输入路径
 * @param  {String} _key  配置标识
 * @param  {String} _root 根路径
 * @return {String}       绝对路径
 */
var __doCheckInputPathConfig = function(_key,_root){
    var _value = __getConfig(_key);
    if (!!_value){
        _value = _path.path(_value+'/',_root);
        if (!_path.exist(_value)){
            _log.error('%s[%s] not exist!',_key,_value);
            _value = '';
        }
    }
    __setConfig(_key,_value);
    return _value;
};
/*
 * 检查输出文件路径
 * @param  {String} _key  配置标识
 * @param  {String} _root 根路径
 * @return {String}       绝对路径
 */
var __doCheckInputFileConfig = function(_key,_root){
    var _value = __getConfig(_key)||'';
    if (!!_value)
        _value = _path.path(_value,_root);
    __setConfig(_key,_value);
    return _value;
};
/*
 * 检查输出路径
 * @param  {String} _key  配置标识
 * @param  {String} _root 根路径
 * @return {String}       绝对路径
 */
var __doCheckOutputPathConfig = function(_key,_root){
    var _value = __getConfig(_key);
    if (!!_value){
        _value = _path.path(_value+'/',_root);
        _fs.mkdir(_value);
    }
    __setConfig(_key,_value);
    return _value;
};
/*
 * 检查字符型配置
 * @param  {String} _key     配置标识
 * @param  {String} _default 默认值
 * @return {Void}
 */
var __doCheckValueWithDefault = function(_key,_default){
    __setConfig(_key,__getConfig(_key)||_default);
    return __getConfig(_key)||_default;
};
/*
 * 检查数值型配置
 * @param  {String} _key     配置标识
 * @param  {Number} _default 默认值
 * @return {Void}
 */
var __doCheckNumberWithDefault = function(_key,_default){
    _value = parseInt(__getConfig(_key));
    __setConfig(_key,isNaN(_value)?_default:_value);
};
/*
 * 检查路径相关配置
 * @return {Void}
 */
var __doCheckConfig_DIR = function(){
    // DIR_SRCROOT
    // DIR_OUTROOT
    // DIR_DEPENDENCY
    var _root = __getConfig('DIR_CONFIG');
    __doCheckInputPathConfig('DIR_SRCROOT',_root);
    var _input = __getConfig('DIR_SRCROOT');
    __doCheckValueWithDefault('DIR_OUTROOT','../out/');
    __doCheckOutputPathConfig('DIR_OUTROOT',_input);
    __doCheckInputFileConfig('DIR_DEPENDENCY',_root);
    try{
    	__setConfig('DEFINE_LIST',
    	    require(__getConfig('DIR_DEPENDENCY')));
    }catch(e){
    	__setConfig('DEFINE_LIST',{});
    }
};
/*
 * 检查输出文件配置
 * @return {Void}
 */
var __doCheckConfig_CFG = function(){
    // CFG_ALIAS
    // CFG_CHARSET
    // CFG_EXTENSION
    __doCheckValueWithDefault('CFG_ALIAS','{}');
    var _alias = JSON.parse(__getConfig('CFG_ALIAS'))||{};
    if (!_alias.pro){
    	_alias.pro = __getConfig('DIR_SRCROOT');
    }
    __setConfig('CFG_ALIAS',_alias);
    __doCheckValueWithDefault('CFG_CHARSET','utf-8');
    var _suffix = __getConfig('CFG_EXTENSION');
    if (!!_suffix)
        _suffix = new RegExp('\\.(?:'+_suffix+')$','i');
    __setConfig('CFG_EXTENSION',_suffix);
};
/**
 * 
 */
var __doParseDefineList = (function(){
	var _reg0 = /\{(.*?)\}/gi;
	var _doMergeAlias = function(_src){
		var _alias = __getConfig('CFG_ALIAS');
		return (_src||'').replace(_reg0,
			   function($1,$2){
			       return _alias[$2]||$1;
			   });
	};
	return function(){
		var _dmap = __getConfig('DEFINE_LIST'),
		    _rmap = {};
		for(var x in _dmap){
			_rmap[_doMergeAlias(x)] = {
				alias:x,
				deps:_dmap[x]
			};
		}
		__setConfig('DEFINE_LIST',_rmap);
	};
})();
/**
 * 解析配置文件
 * @param  {String} _file 配置文件地址
 * @return {Void}
 */
var __doParseConfig = function(_file){
    _file = _path.path(_file);
    _log.info('parse %s',_file);
    try{
        var _list = _fs.read(_file);
        if (!!_list&&_list.length>0){
            for(var i=0,l=_list.length,_line;i<l;i++){
                _line = _list[i];
                if (_util.blank(_line)||
                    _util.comment(_line))
                    continue;
                _line = _line.split('=');
                __setConfig(_line.shift().trim()
                          ,_line.join('=').trim());
            }
        }
        __setConfig('DIR_CONFIG',
                     path.dirname(_file)+'/');
        __doCheckConfig_DIR();
        __doCheckConfig_CFG();
        __doParseDefineList();
        _log.info('config -> %j',__config);
    }catch(e){
        _log.error('can\'t parse config for %s',e);
    }
};
// export api
exports.get   = __getConfig;
exports.parse = __doParseConfig;
