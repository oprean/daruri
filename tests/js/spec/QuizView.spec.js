define([
   'views/QuizView',
], function(QuizView){
  	describe('QuizView.js', function() {
 		describe('QuizView.render()', function() {
			it('should display home quiz page', function() {
				var quizView = new QuizView({quizId:'type1'}).render();
				var $output = quizView.$el;

				$output.find('.btn-start').length.should.equal(1);
			});
 		});
 	});
});
