require.config({
  baseUrl: '../js',
  paths: {
    'jquery'               : 'lib/jquery-2.1.3.min',
    'underscore'           : 'lib/lodash.min',
    'backbone'             : 'lib/backbone-min',
	'backbone.marionette'  : 'lib/backbone.marionette.min',
	'backbone.localStorage': 'lib/backbone.localStorage.min',		
	'moment'               : 'lib/moment.min',
	'text'                 : 'lib/text',
	
	// test utils libs
    'mocha'                : '../tests/js/lib/mocha',
    'chai'                 : '../tests/js/lib/chai',
    'chai-jquery'          : '../tests/js/lib/chai-jquery',
  },
  
  shim: {
    'chai-jquery': {
    	'deps': ['jquery', 'chai'],
    },
    'mocha': {
         'exports': 'mocha'
    },
    'chai': {
         'exports': 'chai'
    }
  },
  urlArgs: new Date().getTime().toString(),
});
 
define(function(require) {
  var chai = require('chai');
  var mocha = require('mocha');
 
  // Chai
  var should = chai.should();
  chai.use(require('chai-jquery'));
  
  mocha.setup('bdd');
 
  require([
    'js/spec/utils.spec.js',
    'js/spec/homeView.spec.js',
  ], function(require) {
    mocha.run();
  });
 
});
