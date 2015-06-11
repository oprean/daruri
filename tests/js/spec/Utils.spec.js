define([
   'modules/Utils',
], function(Utils){
  	describe('Utils.js', function() {
  		
 		describe('Utils.getJson(\'quizzes\')', function() {
			it('should load json data from \'assests/data/quizes.json\'', function() {
				localStorage.removeItem('quiz-data-type1');
				var json = Utils.getJson('quizzes');			 
				json.quizzes.length.should.equal(2);
			});
 		});
 		
 		describe('Utils.GetQuiz(\'type1\')', function() {
			it('should load quiz data into localStorage', function() {
				localStorage.removeItem('quiz-data-type1');
				localStorage.removeItem('quiz-result');
				var quiz = Utils.getQuiz('type1');				
				var quizJson = JSON.parse(localStorage.getItem('quiz-data-type1'));				 
				quizJson.questions.length.should.equal(12);
			});
 		});
 		
 		describe('Utils.GetQuizStatus(\'type1\')', function() {
			it('should load \'type1\' quiz results from localStorage and build quiz status', function() {
				var status = Utils.getQuizStatus('type1');				
				status.id.should.equal('new');
			});
 		});

 		describe('Utils.getQuestion(\'type1\', 1)', function() {
			it('should load \'type1\' quiz data & results from localStorage and build first question', function() {
				var question = Utils.getQuestion('type1', 1);				
				question.get('progress').percent.should.equal(8);
				question.get('text').should.equal('Q.(A)');
			});
 		}); 		
 		
 		
 	});
});
