define([
   'views/HomeView',
   'models/QuizzesHome',
   'modules/Utils',
], function(HomeView, QuizzesHome, Utils){
  	describe('HomeView.js', function() {
 		describe('HomeView.render()', function() {
			it('should display 2 quiz cards', function() {
				window.app = new Backbone.Marionette.Application();
				app.quizzes = new QuizzesHome(Utils.getJson('quizzes'));
				var homeView = new HomeView().render();
				var $output = homeView.$el;

				$output.find('.quiz-card-container').length.should.equal(2);
			});
 		});
 	});
});
