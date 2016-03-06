define([
  'jquery',
  'underscore',
  'backbone',
  'models/Group'
], function($, _, Backbone, Group){
  var Groups = Backbone.Collection.extend({
  	url: 'api/group', 
  	model: Group,
  });

  return Groups;
});