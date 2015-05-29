define([
  'jquery',
  'underscore',
  'backbone',
  'backbone.marionette',
  'collections/Quizzes',
  'collections/Results',
  'models/Quiz',
  'collections/Questions',
  'models/Question',
  'models/Result',
  'collections/Statistics',
  'models/Score',
  'modules/Constants',
  'moment'
], function($, _, Backbone, Marionette, Quizzes, Results, Quiz, Questions, Question, Result, Statistics, Score, Constants, moment ){
	
	String.prototype.ucfirst = function() {
	    return this.charAt(0).toUpperCase() + this.slice(1);
	};
	
	var Utils = {
		
		getJson : function(name) {
			var quiz;
			$.ajax({
				url : 'assets/data/' + name + '.json',
				dataType: 'json',
				async: false, 
				success : function(data) {
					quiz = data;
				}
			});
			
			return quiz;
		},
		
		getQuiz : function(quizId) {
			var self = this;
			var quiz;
			var quizzes = new Quizzes();
			quizzes.fetch({
				async:false,
				success: function(collection) {
					var questions = new Questions();
					quiz = collection.get(quizId);
					if (!quiz) {
						var quizJson = self.getJson(quizId)
						quiz = new Quiz(quizJson);
						collection.add(quiz);
						quiz.save();
					}
					_.each(quiz.get('questions'), function(questionJson){
						questions.add(new Question(questionJson))
					})
					quiz.set({questions: questions})	
				}
			})
			
			return quiz;
		},
		
		getQuizStatus : function(quizId) {
			var result = this.getResult(quizId);
			if (!result) throw quizId + 'results does not exist!';
			var status = null;
			if (result.get('result')) {
				status = { id: 'done', data: result.get('result'), start_date: result.get('date')};
			} else if (result.get('answers').length) {
				status = { id: 'progress', data: result.get('answers').length+1, start_date: result.get('date')};
			} else {
				status = { id: 'new', data: null, start_date: null};
			}
			
			return status;
		},
		
		getQuestion : function(quizId, questionId) {
			var quiz = this.getQuiz(quizId);
			if (!quiz) throw quizId + 'does not exist!';

			var questions = quiz.get('questions');
			var question = questions.get(questionId);
			 
			var progress = Math.round((questionId * 100)/questions.length)
			var next = (questions.length != questionId)
				?parseInt(questionId)+1
				:'result';
			var prev = (questionId > 1)
				?parseInt(questionId)-1
				:'home';
			
			question.set({
				progress: progress,
				quiz_id:quiz.get('id'),
				options: (quiz.get('type')==1)?quiz.get('options'):question.get('options'), 
				next: next,
				prev:prev,
				selected: this.getAnswer(question)
			});
			
			return question;
		},
		
		getResult : function(quizId) {
			var self = this;
			var result;
			var results = new Results();
			results.fetch({
				async:false,
				success: function(collection) {
					result = collection.findWhere({quiz_id:quizId});
					if (!result) {
						result = new Result({quiz_id: quizId, date: moment().format("dddd, Do MMMM YYYY, h:mm:ss a")});
						collection.add(result);
						result.save();
					}					
				}
			})
			
			return result;
		},
		
		getAnswer : function(question) {
			var result = this.getResult(question.get('quiz_id'));
			if (!result) throw question.get('quiz_id') + 'results does not exist!';
			var answers = result.get('answers');
			var answer = answers[question.id-1]
			console.log(result);
			return answer?answer.value:null; 
		},
		
		updateAnswer : function(question, value) {
			var result = this.getResult(question.get('quiz_id'));
			if (!result) throw question.get('quiz_id') + 'results does not exist!';
			var answers = result.get('answers');
			answers[question.id-1] = {
				question_id: question.id,
				group_id: question.get('group_id'),
				value: value
			} 
			
			result.set('answers', answers);
			console.log(result.get('answers'));
			
			result.save();
		},
		
		generateResultStatistics: function(quizId) {
			var statistics = new Statistics();
			var quiz = this.getQuiz(quizId);
			var groups = quiz.get('groups');
			
			if (!quiz) throw quizId + 'does not exist!';
			var result = this.getResult(quizId);
			if (!result) throw quizId + 'results does not exist!';
			
			_.each(result.get('answers'), function(answer){
				if (quiz.get('type') == 1) {
					score = statistics.findWhere({group_id: answer.group_id})
					if (!score) {
						var group = _.findWhere(groups, {id: answer.group_id});
						console.log(group);
						score = new Score({ 
							group_id: answer.group_id,
							name: group.name,
							description: group.description,  
							value: parseInt(answer.value)
						});
						statistics.add(score);
					} else {
						score.set({value: parseInt(score.get('value')) + parseInt(answer.value)})
					}				
				} else {
					score = statistics.findWhere({group_id: answer.value})
					if (!score) {
						var group = _.findWhere(groups, {id: answer.value});
						console.log(group);
						score = new Score({ 
							group_id: answer.value,
							name: group.name,
							description: group.description,  
							value: 1
						});
						statistics.add(score);
					} else {
						score.set({value: parseInt(score.get('value')) + 1})
					}
				}
			});

			statistics.sort();
			var top = _.findWhere(groups, {id: statistics.at(0).get('group_id')});
					
			result.set({
				result: {
					name: statistics.at(0).get('name'),
					description: statistics.at(0).get('description'),
					value: statistics.at(0).get('value'),
					statistics: statistics
				}
			})
			result.save();
		},
						
		bootstrapEnv: function() {
		    var envs = ['xs', 'sm', 'md', 'lg'];
		
		    $el = $('<div>');
		    $el.appendTo($('body'));
		
		    for (var i = envs.length - 1; i >= 0; i--) {
		        var env = envs[i];
		
		        $el.addClass('hidden-'+env);
		        if ($el.is(':hidden')) {
		            $el.remove();
		            return env;
		        }
		    };
		}
	};

	return Utils;
});
