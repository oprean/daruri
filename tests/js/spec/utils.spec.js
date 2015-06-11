define([
   'modules/Utils',
], function(Utils){
  	describe('Utils.js', function() {
 		describe('Utils.GetQuiz(\'type1\')', function() {
			it('should load quiz data into localStorage', function() {
				localStorage.removeItem('quiz-data-type1');
				var quiz = Utils.getQuiz('type1');				
				var quizJson = JSON.parse(localStorage.getItem('quiz-data-type1'));				 
				quizJson.questions.length.should.equal(12);
			});
 		});
 	});
});
