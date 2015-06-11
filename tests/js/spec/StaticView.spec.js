define([
   'views/StaticView',
], function(StaticView){
  	describe('StaticView.js', function() {
 		describe('StaticView.render()', function() {
			it('should display a static page', function() {
				var staticView = new StaticView({tpl:'about'}).render();
				var $output = staticView.$el;
				$output.find('li').length.should.equal(3);
			});
 		});
 	});
});
