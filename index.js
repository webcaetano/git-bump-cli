const path = require('path');
const async = require('async');
const semver = require('semver');
const fs = require('fs');
const glob = require('globby');
const _ = require('lodash');
const git = require('simple-git');
const writeJsonFile = require('write-json-file');

// insert defaults here
var defaults = {
	files:['bower.json','package.json'],
	message:'new version'
}

var getFiles = function(files){
	return _.map(files,function(file){
		return path.join(process.env.PWD,file);
	})
}

var self = function(type='patch',options,done){
	if(typeof options === 'function'){
		done = options;
	}

	if(!type || !semver.inc('0.0.1',type)) type = 'patch';

	options = _.extend({},defaults,options);

	async.auto({
		files:function(callback){
			glob(getFiles(options.files))
			.then(files => callback(null,files));
		},
		bump:['files',function(results,callback){
			var {files} = results;
			var run = [];

			_.each(files,function(filePath){
				run.push(function(callback){
					fs.readFile(filePath,function(err,file){
						var content = JSON.parse(String(file));
						content.version = semver.inc(content.version,type);
						// console.log(filePath,content)
						writeJsonFile(filePath,content,{
							indent:2
						}).then(err =>{
							callback(err);
						});
					});
				});
			});

			async.parallel(run,callback);
		}],
		version:['bump',function(results,callback){
			var {files} = results;

			fs.readFile(files[0],function(err,file){
				var content = JSON.parse(String(file));
				callback(err,content.version)
			});
		}],
		gitTag:['version',function(results,callback){
			var {version,files} = results;
			var pipe = git(process.env.PWD);

			_.each(files,function(file){
				pipe.add(file)
			})

			console.log(version,type)

			pipe.commit(options.message+' '+version)
			.addTag(version)
			.exec(function(err){
				callback(err);
			})
		}]
	},function(err,results){
		if(err){
			console.log(err);
			return;
		}

		if(done) done(results);
	})
}

module.exports = self;
