define([
   'views/QuestionView',
   'modules/Utils',
], function(QuestionView, Utils){
  	describe('QuestionView.js', function() {
 		describe('QuestionView', function() {
			it('should display first quiz question', function() {

				var questionView = new QuestionView({quizId:'type1', questionId:1}).render();
				var $output = questionView.$el;

				$output.find('.radio-option').length.should.equal(3);
				$output.find('.radio-selected').length.should.equal(0);
			});

			it('selection one option should move to next question', function() {
				
				var questionView = new QuestionView({quizId:'type1', questionId:1}).render();
				//$(questionView.$el.find('.answer')[0]).trigger('click');	
				var $output = questionView.$el;

				//$output.find('.radio-selected').length.should.equal(1);
			});
 		});
 	});
});
