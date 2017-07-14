#!/usr/bin/env node
'use strict';
var meow = require('meow');
var _ = require('lodash');
var self = require('./');

var cli = meow([
	'Usage',
		'$ bump <type>',
		'$ bump patch // 1.0.1',
		'$ bump minor // 1.1.0',
		'$ bump major // 2.0.0',
], {
	string: ['_']
});


var defaults = {
}

var options = _.extend({},defaults,{
})

options = _.omitBy(options,_.isUndefined);

var type = _.nth(cli.input,0);

console.log(type)

self(type,options);
