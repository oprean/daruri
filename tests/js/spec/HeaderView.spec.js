define([
   'views/HeaderView',
], function(HeaderView){
  	describe('HeaderView.js', function() {
 		describe('HeaderView.render()', function() {
			it('should display header navbar', function() {
				var headerView = new HeaderView().render();
				var $output = headerView.$el;

				$output.find('.navbar-brand').length.should.equal(1);
			});
 		});
 	});
});
