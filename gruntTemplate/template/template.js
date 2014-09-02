/*
 * enhance project template
 * create by qiang.huang
 * 2014.7.25
 * 
 */

'use strict';

exports.description = 'Create new project';

// 
exports.notes = 'begin';

// Template-specific notes to be displayed after question prompts.
exports.after = 'come on';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {
	
  init.definePkg = {"hq":"qiang.huang"};
  init.process({type: 'enhance'}, [
    // Prompt for project name.
    init.prompt('name'),
    init.prompt('description')
  ], function(err, props) {
    // A few additional properties.
    var svnExp = /\.(svn|git)\//
    ,	projectPkg
    ,	newFiles = {}
    ,	files = init.filesToCopy(props)   // Files to copy (and process).
    ,	pkgFile = "package.json"
    ;
    
    if(files[pkgFile]) {
	    projectPkg = JSON.parse(grunt.file.read(init.srcpath(pkgFile)));
	    projectPkg.name = props.name;
	    projectPkg.description = props.description;
    }
    for (var fileProp in files) {
    	if(!svnExp.test(fileProp) && fileProp != pkgFile) {
    		newFiles[fileProp] = files[fileProp];
    	}
    }

    // copy files.
    init.copyAndProcess(newFiles, props, {noProcess: 'node_modules/**'});
    
    if(projectPkg) {
	    init.writePackageJSON(pkgFile, projectPkg);
    }
    
    // All done!
    done();
  });

};
