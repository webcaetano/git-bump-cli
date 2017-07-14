const _ = require('lodash');
const glob = require('globby');
const path = require('path');
const test = require('ava');
const async = require('async');
const fs = require('fs');
const tempfile = require('tempfile');
const mkdirp = require('mkdirp');
const semver = require('semver');
const git = require('simple-git');
const creaturesData = require('data-creatures');
const writeJsonFile = require('write-json-file');

var self = require('./');

const packageData = {
  "name": "git-bump-cli",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
}

var createRandomRepo = function(tmpFolder){
	var creatures = creaturesData({size:3,plural:true});

	_.each(creatures,function(creature){
		_.each([
			'atk',
			'run',
			'die',
		],function(action){
			mkdirp.sync(path.join(tmpFolder,creature,action));
			_.times(5,function(i){
				fs.writeFileSync(path.join(tmpFolder,creature,action,_.padStart(i,3,'0')+''),'Yup, that tasted purple');
			});
		});
	});

	writeJsonFile.sync(path.join(tmpFolder,'package.json'),packageData)
}

test.cb('should patch the repo',function(t){
	const tmpFolder = tempfile();
	const type = 'patch';

	createRandomRepo(tmpFolder);

	async.auto({
		git:function(callback){
			git(tmpFolder)
			.init()
			.addConfig('user.name', 'Lulu')
	        .addConfig('user.email', 'lulu@support.com')
			.add('.')
			.commit("first commit!")
			.raw(['ls-tree','-r','master','--name-only'],function(err,data,c){
				var files = data.split('\n').filter(Boolean);
				t.falsy(err);
				t.truthy(files.length>30);
			})
			.exec(callback);
		},
		patch:['git',function(results,callback){
			self(type,{dest:tmpFolder},callback);
		}],
		gitLog:['patch',function(results,callback){
			git(tmpFolder)
			.raw(['tag','-l'],function(err,data){
				t.truthy(semver.inc(packageData.version,type)==_.trim(data));
			})
			.exec(callback);
		}],
	},function(){
		var pkg = JSON.parse(String(fs.readFileSync(path.join(tmpFolder,'package.json'))));

		t.truthy(semver.inc(packageData.version,type)==pkg.version);
		t.pass();
		t.end();
	});
});

test.cb('should minor version the repo',function(t){
	const tmpFolder = tempfile();
	const type = 'minor';

	createRandomRepo(tmpFolder);

	async.auto({
		git:function(callback){
			git(tmpFolder)
			.init()
			.addConfig('user.name', 'Lulu')
	        .addConfig('user.email', 'lulu@support.com')
			.add('.')
			.commit("first commit!")
			.raw(['ls-tree','-r','master','--name-only'],function(err,data,c){
				var files = data.split('\n').filter(Boolean);
				t.falsy(err);
				t.truthy(files.length>30);
			})
			.exec(callback);
		},
		patch:['git',function(results,callback){
			self(type,{dest:tmpFolder},callback);
		}],
		gitLog:['patch',function(results,callback){
			git(tmpFolder)
			.raw(['tag','-l'],function(err,data){
				t.truthy(semver.inc(packageData.version,type)==_.trim(data));
			})
			.exec(callback);
		}],
	},function(){
		var pkg = JSON.parse(String(fs.readFileSync(path.join(tmpFolder,'package.json'))));

		t.truthy(semver.inc(packageData.version,type)==pkg.version);
		t.pass();
		t.end();
	});
});

test.cb('should major version the repo',function(t){
	const tmpFolder = tempfile();
	const type = 'major';

	createRandomRepo(tmpFolder);

	async.auto({
		git:function(callback){
			git(tmpFolder)
			.init()
			.addConfig('user.name', 'Lulu')
	        .addConfig('user.email', 'lulu@support.com')
			.add('.')
			.commit("first commit!")
			.raw(['ls-tree','-r','master','--name-only'],function(err,data,c){
				var files = data.split('\n').filter(Boolean);
				t.falsy(err);
				t.truthy(files.length>30);
			})
			.exec(callback);
		},
		patch:['git',function(results,callback){
			self(type,{dest:tmpFolder},callback);
		}],
		gitLog:['patch',function(results,callback){
			git(tmpFolder)
			.raw(['tag','-l'],function(err,data){
				t.truthy(semver.inc(packageData.version,type)==_.trim(data));
			})
			.exec(callback);
		}],
	},function(){
		var pkg = JSON.parse(String(fs.readFileSync(path.join(tmpFolder,'package.json'))));

		t.truthy(semver.inc(packageData.version,type)==pkg.version);
		t.pass();
		t.end();
	});
});

test.cb('should patch the repo without type argument',function(t){
	const tmpFolder = tempfile();
	const type = 'patch';

	createRandomRepo(tmpFolder);

	async.auto({
		git:function(callback){
			git(tmpFolder)
			.init()
			.addConfig('user.name', 'Lulu')
	        .addConfig('user.email', 'lulu@support.com')
			.add('.')
			.commit("first commit!")
			.raw(['ls-tree','-r','master','--name-only'],function(err,data,c){
				var files = data.split('\n').filter(Boolean);
				t.falsy(err);
				t.truthy(files.length>30);
			})
			.exec(callback);
		},
		patch:['git',function(results,callback){
			self(undefined,{dest:tmpFolder},callback);
		}],
		gitLog:['patch',function(results,callback){
			git(tmpFolder)
			.raw(['tag','-l'],function(err,data){
				t.truthy(semver.inc(packageData.version,type)==_.trim(data));
			})
			.exec(callback);
		}],
	},function(){
		var pkg = JSON.parse(String(fs.readFileSync(path.join(tmpFolder,'package.json'))));

		t.truthy(semver.inc(packageData.version,type)==pkg.version);
		t.pass();
		t.end();
	});
});



