define([
   'views/ResultView',
], function(ResultView){
  	describe('ResultView.js', function() {
 		describe('ResultView.render()', function() {
			it('should display result view', function() {
				var resultView = new ResultView({quizId:'type1'}).render();
				var $output = resultView.$el;

				$output.find('.result-container').length.should.equal(1);
			});
 		});
 	});
});
