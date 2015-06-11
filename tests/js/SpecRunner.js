require.config({
  //baseUrl: '../js/',
  paths: {
    'jquery'        : '../../js/lib/jquery-2.1.3.min',
    'underscore'    : '../js/lib/lodash.min',
    'backbone'      : '../js/lib/backbone-min',
    'mocha'         : 'lib/mocha',
    'chai'          : 'lib/chai',
    'chai-jquery'   : 'lib/chai-jquery',
    'models'        : '/app/models'
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
  //require('jquery');
  //require('chai-jquery');
 
  // Chai
  var should = chai.should();
  chai.use(require('chai-jquery'));
  
  mocha.setup('bdd');
 
  require([
    'js/spec/utils.spec.js',
  ], function(require) {
    mocha.run();
  });
 
});
