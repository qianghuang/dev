'use strict';
module.exports = function(grunt) {
	
	
	/**
	 *  扩展函数
	 * @param {Object} tar 目标对象
	 * @param {Object} src 源对象
	 */
	var _extend = function(tar, src) {
		for (var key in src) {
			if (tar[key]) {
				var config = src[key];
				for (var prop in config) {
					tar[key][prop] = config[prop];
				}
			} else {
				tar[key] = src[key];
			}
		}
		return tar;
	};
	
	// 配置grunt任务 
	var globalConfig = eval("(" + grunt.file.read("../global.json") + ")");
	var projectConfig = eval("(" + grunt.file.read("project.json") + ")");
	
	var config = _extend(globalConfig.config,projectConfig.config);
	
	grunt.initConfig(config);
	
	//加载任务
	globalConfig.loadTask();
	projectConfig.loadTask();
	
	//注册任务
	globalConfig.registerTask();
	projectConfig.registerTask();
	
};
