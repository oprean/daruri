define([
  'jquery',
  'underscore',
  'modules/Constants',
], function($, _, Constants){
	
	String.prototype.ucfirst = function() {
	    return this.charAt(0).toUpperCase() + this.slice(1);
	};
	
	var Utils = {
		
		loadQuiz : function(name) {
			var quiz;
			$.ajax({
				url : 'js/quizzes/' + name + '.json',
				dataType: 'json',
				async: false, 
				success : function(data) {
					quiz = data;
				}
			});
			
			return quiz;
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
