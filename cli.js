#!/usr/bin/env node
'use strict';
var meow = require('meow');
var _ = require('lodash');
var self = require('./');

var cli = meow([
	'Usage',
		'$ dhalf <src>',
	'',
	'Options',
		'--type odd or even <default : odd>',
	'',
	'Examples',
		'dhalf "**/*.png"',
		'dhalf "**/*.png" --type even',
], {
	string: ['_']
});


var defaults = {
	type:'odd'
}

var options = _.extend({},defaults,{
	type: cli.flags.type,
})

options = _.omitBy(options,_.isUndefined);

var glob = _.nth(cli.input,0);

self(glob,options);
