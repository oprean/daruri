define([
  'jquery',
  'underscore',
], function($, _){
		
	var TestUtils = {
		
		clearLocalStorage : function() {
			localStorage.removeItem('quiz-data-type1');
			localStorage.removeItem('quiz-data-type2');
			for(var i in localStorage){
				item = localStorage.getItem(i);
				if (item && (item.indexOf('"quiz_id":"type1"') > 0 || 
					item.indexOf('"quiz_id":"type1"') > 0)) {
					localStorage.removeItem(i);
				}
			}
		},
	};

	return TestUtils;
});
