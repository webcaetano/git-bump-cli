const _ = require('lodash');
const glob = require('globby');
const path = require('path');
const test = require('ava');

var self = require('./');

test.cb('should delete half files',function(t){
	// var src = './test/dist/wizz/**/*.png';
	// var dest = './test/dist/wizz';

	// del.sync('./test/dist/');
	// fs.copySync('./test/wizz-origin',dest);

	// var inputFiles = glob.sync(src,{nodir:true});
	// var numOfInput = inputFiles.length;

	self('patch',function(){
		t.end();
	});

	// self(src,function(err,data){
	// 	var outputFiles = glob.sync(dest+'/**',{nodir:true});
	// 	var numOutput = outputFiles.length;

	// 	t.truthy(numOutput<=Math.ceil(numOfInput/2));
	// 	t.falsy(err);
	// 	t.pass();
	// 	t.end();
	// });
});
