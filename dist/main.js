define("models/Quiz",["jquery","underscore","backbone"],function(e,t,n){var r=n.Model.extend({defaults:{name:null,options:[],questions:null,results:null,logic:function(){}}});return r}),define("collections/Quizzes",["underscore","backbone","backbone.localStorage","models/Quiz"],function(e,t,n,r){var i=t.Collection.extend({model:r,localStorage:new n("quiz-data")});return i}),define("models/Result",["jquery","underscore","backbone"],function(e,t,n){var r=n.Model.extend({defaults:{id:null,quiz_id:null,date:null,person:"anonymous",answers:[],email:!1,result:null}});return r}),define("collections/Results",["underscore","backbone","backbone.localStorage","models/Result"],function(e,t,n,r){var i=t.Collection.extend({model:r,localStorage:new n("quiz-result")});return i}),define("models/Question",["jquery","underscore","backbone"],function(e,t,n){var r=n.Model.extend({defaults:{quiz_id:null,text:null,options:null,group_id:null}});return r}),define("collections/Questions",["underscore","backbone","models/Question"],function(e,t,n){var r=t.Collection.extend({model:n});return r}),define("models/Score",["jquery","underscore","backbone"],function(e,t,n){var r=n.Model.extend({});return r}),define("collections/Statistics",["underscore","backbone","models/Score"],function(e,t,n){var r=t.Collection.extend({model:n,comparator:function(e){return-parseInt(e.get("value"))}});return r}),define("modules/Constants",[],function(){var e={DEFAULT_QUIZ:"conflict",NEXT_QUESTION_DELAY:500,PARSE:{AppID:"0yXFaABnkqXVSBDvY11WIRia0vWEVDnTCc959zTy",JsKey:"DpKYEptsNFQD9Hz7trcvl7bNTdtTcfGqZdG6EGas"},LOCATIONS:[{id:"vox1",name:"Vox Domini SF",address:"Str. Liviu Rebreanu nr. 106",lat:45.737121,lon:21.233803},{id:"vox2",name:"Vox Domini FF",address:"Str. Conac nr.39, etaj 1",lat:45.787419,lon:21.237658}]};return e}),define("modules/Utils",["jquery","underscore","backbone","backbone.marionette","collections/Quizzes","collections/Results","models/Quiz","collections/Questions","models/Question","models/Result","collections/Statistics","models/Score","modules/Constants","moment"],function(e,t,n,r,i,s,o,u,a,f,l,c,h,p){String.prototype.ucfirst=function(){return this.charAt(0).toUpperCase()+this.slice(1)},typeof Number.prototype.toRad=="undefined"&&(Number.prototype.toRad=function(){return this*Math.PI/180});var d={getDistance:function(e,n,r){point=t.findWhere(h.LOCATIONS,{id:r});if(point){var i=6371,s=(n-point.lat).toRad(),o=(e-point.lon).toRad(),u=Math.sin(s/2)*Math.sin(s/2)+Math.cos(n.toRad())*Math.cos(n.toRad())*Math.sin(o/2)*Math.sin(o/2),a=2*Math.atan2(Math.sqrt(u),Math.sqrt(1-u)),f=i*a;return f}return 0},getJson:function(t){var n;return e.ajax({url:"assets/data/"+t+".json",dataType:"json",async:!1,success:function(e){n=e}}),n},getQuiz:function(e){var n=this,r,s=new i;return s.fetch({async:!1,success:function(i){var s=new u;r=i.get(e);if(!r){var f=n.getJson(e);r=new o(f),i.add(r),r.save()}t.each(r.get("questions"),function(e){s.add(new a(e))}),r.set({questions:s})}}),r},getQuizStatus:function(e){var t=this.getResult(e);if(!t)throw e+"results does not exist!";var n=this.getQuiz(e);if(!n)throw e+"does not exist!";var r=null;if(t.get("result"))r={id:"done",data:t.get("result"),text:n.get("questions").length+"/"+n.get("questions").length,percent:100,"class":"success",start_date:t.get("date")};else if(t.get("answers").length){var i=Math.round(t.get("answers").length*100/n.get("questions").length);r={id:"progress",data:t.get("answers").length+1,text:t.get("answers").length+"/"+n.get("questions").length,percent:i,"class":i<=50?"warning":"info",start_date:t.get("date")}}else r={id:"new",data:0,"class":"progress-bar-danger",text:"0/"+n.get("questions").length,percent:0,"class":"danger",start_date:null};return r},getQuestion:function(e,n){var r=this.getQuiz(e);if(!r)throw e+"does not exist!";var i=this.getResult(e);if(!i)throw e+"results does not exist!";var s=i.get("answers"),o=t.findWhere(s,{question_id:parseInt(n)}),o=o?o.value:null,u=t.findWhere(s,{question_id:parseInt(n)+1}),a=r.get("questions"),f=a.get(n),l={text:n+"/"+a.length,percent:Math.round(n*100/a.length)},c={prev:{text:n>1?"Previous":"Home",icon:n>1?"glyphicon-chevron-left":"glyphicon-home",url:n>1?parseInt(n)-1:"home",visible:n>1?!0:!1},next:{text:n<a.length?"Next":"Results",icon:n<a.length?"glyphicon-chevron-right":"glyphicon-ok",url:n<a.length?parseInt(n)+1:"result",visible:u||o?!0:!1}};return f.set({progress:l,quiz_id:r.get("id"),options:r.get("type")==1?r.get("options"):f.get("options"),button:c,selected:o}),f},getResult:function(e){var t=this,n,r=new s;return r.fetch({async:!1,success:function(t){n=t.findWhere({quiz_id:e}),n||(n=new f({quiz_id:e,date:p().locale("ro").format("dddd, Do MMMM YYYY, h:mm:ss a")}),t.add(n),n.save())}}),n},updateAnswer:function(e,t){var n=this.getResult(e.get("quiz_id"));if(!n)throw e.get("quiz_id")+"results does not exist!";var r=n.get("answers");r[e.id-1]={question_id:e.id,group_id:e.get("group_id"),value:t},n.set("answers",r),console.log(n.get("answers")),n.save()},generateResultStatistics:function(e){var n=new l,r=this.getQuiz(e),i=r.get("groups");if(!r)throw e+"does not exist!";var s=this.getResult(e);if(!s)throw e+"results does not exist!";t.each(s.get("answers"),function(e){if(r.get("type")==1){score=n.findWhere({group_id:e.group_id});if(!score){var s=t.findWhere(i,{id:e.group_id});console.log(s),score=new c({group_id:e.group_id,name:s.name,description:s.description,value:parseInt(e.value)}),n.add(score)}else score.set({value:parseInt(score.get("value"))+parseInt(e.value)})}else{score=n.findWhere({group_id:e.value});if(!score){var s=t.findWhere(i,{id:e.value});score=new c({group_id:e.value,name:s.name,description:s.description,value:1}),n.add(score)}else score.set({value:parseInt(score.get("value"))+1})}}),n.sort();var o=t.findWhere(i,{id:n.at(0).get("group_id")});s.set({result:{name:n.at(0).get("name"),description:n.at(0).get("description"),value:n.at(0).get("value"),statistics:n}}),s.save()},bootstrapEnv:function(){var t=["xs","sm","md","lg"];$el=e("<div>"),$el.appendTo(e("body"));for(var n=t.length-1;n>=0;n--){var r=t[n];$el.addClass("hidden-"+r);if($el.is(":hidden"))return $el.remove(),r}}};return d}),define("models/QuizzesHome",["jquery","underscore","backbone","modules/Constants","modules/Utils"],function(e,t,n,r,i){var s=n.Model.extend({initialize:function(e){var n=[];t.each(e.quizzes,function(e){e.status=i.getQuizStatus(e.id),n.push(e)}),e.quizzes=n,this.set(e)}});return s}),define("text!templates/header.html",[],function(){return'<nav class="navbar navbar-default navbar-static-top">\r\n  <div class="container-fluid">\r\n    <!-- Brand and toggle get grouped for better mobile display -->\r\n    <div class="navbar-header">\r\n      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">\r\n        <span class="sr-only">Toggle navigation</span>\r\n        <span class="icon-bar"></span>\r\n        <span class="icon-bar"></span>\r\n        <span class="icon-bar"></span>\r\n      </button>\r\n      <a class="navbar-brand" href="#">Bateria de teste</a>\r\n    </div>\r\n\r\n    <!-- Collect the nav links, forms, and other content for toggling -->\r\n    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">\r\n      <ul class="nav navbar-nav">     	\r\n      	\r\n        <li><a href="#quiz/gifts/home">Darurile spritituale</a></li>\r\n        <li><a href="#quiz/conflict/home">Managementul conflictelor</a></li>\r\n        <li class="dropdown">\r\n          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Love languages <span class="caret"></span></a>\r\n          <ul class="dropdown-menu" role="menu">\r\n            <li><a href="#quiz/love/home">Couples</a></li>\r\n            <li><a href="#quiz/love4singles/home">Singles</a></li>\r\n            <li><a href="#quiz/love4teens/home">Teens</a></li>\r\n            <li><a href="#quiz/love4kids/home">Kids</a></li>\r\n          </ul>\r\n        </li>\r\n      </ul>\r\n      <ul class="nav navbar-nav navbar-right">\r\n		<li class="dropdown">\r\n          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Sandbox <span class="caret"></span></a>\r\n          <ul class="dropdown-menu" role="menu">\r\n            <li><a href="#test/geolocation">Geolocation</a></li>\r\n            <li><a href="#test/qrcode">QR Code</a></li>\r\n            <li><a href="#test/surface">Surface</a></li>\r\n            <li role="separator" class="divider"></li>\r\n            <li><a href="tests">Tests</a></li>\r\n          </ul>\r\n        </li>\r\n        <!--li><a href="#login">Login</a></li-->\r\n      </ul>\r\n    </div><!-- /.navbar-collapse -->\r\n  </div><!-- /.container-fluid -->\r\n</nav>'}),define("views/HeaderView",["jquery","underscore","backbone","backbone.marionette","text!templates/header.html"],function(e,t,n,r,i){var s=n.Marionette.ItemView.extend({template:t.template(i),initialize:function(e){}});return s}),define("text!templates/footer.html",[],function(){return'<div class="container-fluid">\r\n	<div class="row">\r\n		<div class="col-xs-12 col-sm-12 col-md-12">\r\n			<div class="text-center">\r\n					<a href="#static/about">Despre</a> |\r\n					<a href="#static/contact">Contact</a> |\r\n				<span class="local-storage-clear">Oprean &copy; 2015</span>\r\n			</div>\r\n		</div>\r\n	</div>\r\n</div>'}),define("views/FooterView",["jquery","underscore","backbone","backbone.marionette","text!templates/footer.html"],function(e,t,n,r,i){var s=n.Marionette.ItemView.extend({template:t.template(i),initialize:function(e){},events:{"click .local-storage-clear":"localStorageClear"},localStorageClear:function(){localStorage.clear(),location.reload(!0)}});return s}),define("app",["jquery","underscore","backbone","backbone.marionette","modules/Utils","models/QuizzesHome","modules/Constants","views/HeaderView","views/FooterView"],function(e,t,n,r,i,s,o,u,a){var f=n.Marionette.Application.extend({initialize:function(){e.ajaxSetup({cache:!1}),this.env=i.bootstrapEnv(),this.quizzes=new s(i.getJson("quizzes")),this.addRegions({headerRegion:"#header-container",mainRegion:"#main-container",footerRegion:"#footer-container"}),this.headerRegion.show(new u),this.footerRegion.show(new a)}});return f}),define("text!templates/home.html",[],function(){return'<div class="jumbotron-home text-center center-block">\r\n	<div class="row">\r\n		 <div class="col-md-3 col-sm-6">\r\n  			<img src="assets/img/logo.png" class="img-responsive center-block" alt="Baterie de teste">		 	\r\n		 </div>\r\n		 <div class="col-md-9 col-sm-6">\r\n		  <h1 class="center-block"><%= name %></h1>\r\n		  <div class="text-justify description-container">\r\n			  <p><%= description %>  </p> 	\r\n		  </div>\r\n		 </div>\r\n	</div>\r\n</div>\r\n <br />\r\n<div class="row quizzes-card-container">\r\n</div>'}),define("models/QuizCard",["jquery","underscore","backbone"],function(e,t,n){var r=n.Model.extend({});return r}),define("collections/QuizzesCards",["underscore","backbone","models/QuizCard"],function(e,t,n){var r=t.Collection.extend({model:n});return r}),define("text!templates/quiz-card.html",[],function(){return'<div class="quiz-card-container">\r\n	<h3><a href="#quiz/<%= id%>/home"><%= name %></a></h3>\r\n	<div class="progress">\r\n	  <div class="progress-bar progress-bar-<%= status.class %>" role="progressbar" aria-valuenow="<%= status.percent %>" aria-valuemin="0" aria-valuemax="100" style="min-width: 3.5em; width: <%= status.percent %>%">\r\n	    <%= status.text %>\r\n	  </div>\r\n	</div>\r\n	<div class="quiz-card-description" style="text-align: justify;"><%= description %></div>\r\n	<div class="quiz-card-buttons-container">\r\n	<% if (status.id==\'done\') { %>\r\n		<a role="button" class="btn btn-quiz-status btn-<%= status.class %>" href="#quiz/<%= id %>/result">Results</a>\r\n	<% } else if (status.id==\'progress\') { %>\r\n		<a role="button" class="btn btn-quiz-status btn-<%= status.class %>" href="#quiz/<%= id %>/<%= status.data %>">Continue</a>		\r\n	<% } else { %>\r\n		<a role="button" class="btn btn-quiz-status btn-<%= status.class %>" href="#quiz/<%= id %>/home">Start</a>		\r\n	<% } %>\r\n	</div> \r\n</div>'}),define("views/QuizCardView",["jquery","underscore","backbone","backbone.marionette","text!templates/quiz-card.html","modules/Utils","modules/Constants"],function(e,t,n,r,i,s,o){var u=n.Marionette.CompositeView.extend({template:t.template(i),className:"col-lg-4 col-md-4 col-sm-6 col-xs-12"});return u}),define("views/HomeView",["jquery","underscore","backbone","backbone.marionette","text!templates/home.html","collections/QuizzesCards","models/QuizCard","views/QuizCardView","modules/Utils","modules/Constants"],function(e,t,n,r,i,s,o,u,a,f){var l=n.Marionette.CompositeView.extend({template:t.template(i),childViewContainer:".quizzes-card-container",childView:u,initialize:function(e){var n=this;this.model=app.quizzes,this.collection=new s,t.each(this.model.get("quizzes"),function(e){n.collection.add(new o(e))})}});return l}),define("text!templates/static.html",[],function(){return"static html"}),define("text!templates/contact.html",[],function(){return'<a href="mailto:quizzes.voxdomini@gmail.com">quizzes.voxdomini@gmail.com</a> '}),define("text!templates/about.html",[],function(){return'<p>Realizat ca o reactie la frustrarea pe care am avut-o cand am parcurs "Testul de Daruri Spirituale" in modalitatea initiala cu foie si pix, asa ca am incercat sa construiesc o modalitate mai buna. Astfel ca acest test online are urmatoarele facilitati:</p>\r\n <ul>\r\n 	<li>poate fi intrerupt oricand si continua de unde l-ai lasat (folosind acelasi device)</li>\r\n 	<li>este mobile friendly (poate fi vizualizat cu success de pe telefon, tableta, laptop)</li>\r\n 	<li>functioneaza si offline (o data ce pagina initiala s-a incarcat, te poti deconecta de la net si parcurgi in tihna intrebarile si citi rezultatul)</li>\r\n </ul>\r\n'}),define("views/StaticView",["jquery","underscore","backbone","backbone.marionette","text!templates/static.html","text!templates/contact.html","text!templates/about.html"],function(e,t,n,r,i,s,o){var u=n.Marionette.ItemView.extend({template:t.template(i),initialize:function(e){var n;switch(e.tpl){case"about":n=t.template(o);break;case"contact":n=t.template(s);break;default:n=t.template(i)}this.template=n,this.render()}});return u}),define("text!templates/quiz.html",[],function(){return'<div class="jumbotron-home text-center center-block">\r\n  <h1 class="center-block"><%= name %></h1>\r\n  <br />\r\n	<div class="progress">\r\n	  <div class="progress-bar progress-bar-<%= status.class %>" role="progressbar" aria-valuenow="<%= status.percent %>" aria-valuemin="0" aria-valuemax="100" style="min-width: 3.5em; width: <%= status.percent %>%">\r\n	    <%= status.text %>\r\n	  </div>\r\n	</div>\r\n	<div class="row">\r\n	  <div class="qrcode-container col-md-2 col-sm-3 hidden-xs">  	\r\n	  </div>\r\n	  <div class="text-justify description-container col-sm-9 col-md-10 col-xs-12">\r\n		  <p><%= description %>  </p>\r\n		  <p><strong>Important:</strong> fă evaluarea raspunsurilor pe baza a ceea ce ştii că este adevărat despre tine în prezent, nu pe baza a ceea ce crezi că este adevărat, sau ai vrea să fie adevărat sau trebuie să fie adevărat în ce te priveşte. Cât de potrivite sunt aceste afirmaţii referitor la tine? Care este experienţa ta? În ce măsură reflectă afirmaţia respectivă tendinţele tale naturale/fireşti.</p>  	\r\n	  </div>		\r\n	</div>\r\n  <br />\r\n  <p>\r\n  	<a class="btn btn-primary btn-lg btn-start" href="#quiz/<%= id %>/1" role="button">Start</a>\r\n  	<a style="display:none" class="btn btn-primary btn-lg btn-resume" href="#quiz/<%= id + \'/\' + status.data %>" role="button">Continuă</a>\r\n  	<a style="display:none" class="btn btn-primary btn-lg btn-result" href="#quiz/<%= id %>/result" role="button">Rezultat</a>\r\n  	<p class="label-started-on" style="display:none">Început : <%= status.start_date %></p>\r\n  </p>\r\n</div>\r\n '}),define("views/QuizView",["jquery","underscore","backbone","backbone.marionette","text!templates/quiz.html","modules/Utils","modules/Constants","jquery.qrcode"],function(e,t,n,r,i,s,o){var u=n.Marionette.ItemView.extend({template:t.template(i),initialize:function(e){var t=e.quizId;this.result=s.getResult(t),this.status=s.getQuizStatus(t),this.model=s.getQuiz(t)},events:{"click .btn-start":"startQuiz"},startQuiz:function(){this.result.destroy({wait:!0})},templateHelpers:function(){return{status:this.status}},onRender:function(){this.$(".qrcode-container").qrcode({size:150,text:"http://oprean.ddns.net/quizzes/#quiz/"+this.model.id+"/home"});switch(this.status.id){case"done":this.$(".btn-result").css("display","inline-block"),this.$(".label-started-on").css("display","inline-block");break;case"progress":this.$(".btn-resume").css("display","inline-block"),this.$(".label-started-on").css("display","inline-block")}}});return u}),define("text!templates/question.html",[],function(){return'<div class="progress">\r\n  <div class="progress-bar" role="progressbar" aria-valuenow="<%= progress.percent %>" aria-valuemin="0" aria-valuemax="100" style="min-width: 3.5em; width: <%= progress.percent %>%">\r\n    <%= progress.text %>\r\n  </div>\r\n</div>\r\n<div class="question-container">\r\n	<p class="question"><%= id %>.<%= text %></p>\r\n		<% _.each(options, function(option) { %>\r\n		<div class="radio radio-option <%= (selected==option.val)?\'radio-selected\':\'\' %>">\r\n			<label class="label-option">\r\n			  <input type="radio" class="answer" name="options" value="<%= option.val %>" <%=(selected==option.val)?\'checked="checked"\':\'\' %> > \r\n			  <%= option.text%>\r\n			</label>\r\n		</div>\r\n		<% }) %>\r\n	<br />\r\n	<div>\r\n		<a <%= !button.prev.visible?\'style="display:none"\':\'\'%> class="btn btn-primary btn-lg btn-nav-question pull-left" href="#quiz/<%= quiz_id %>/<%= button.prev.url %>" role="button">\r\n			<span aria-hidden="true" class="glyphicon <%= button.prev.icon %>"></span>\r\n			<%= button.prev.text %>\r\n		</a>\r\n		<a <%= !button.next.visible?\'style="display:none"\':\'\'%> class="btn btn-primary btn-lg btn-nav-question pull-right" href="#quiz/<%= quiz_id %>/<%= button.next.url %>" role="button">\r\n			<%= button.next.text %>\r\n			<span aria-hidden="true" class="glyphicon <%= button.next.icon %>"></span>\r\n		</a>\r\n	</div>\r\n</div>\r\n'}),define("views/QuestionView",["jquery","underscore","backbone","backbone.marionette","modules/Utils","modules/Constants","text!templates/question.html"],function(e,t,n,r,i,s,o){var u=n.Marionette.ItemView.extend({template:t.template(o),events:{"click .answer":"answer"},initialize:function(e){var t=this;this.model=i.getQuestion(e.quizId,e.questionId)},answer:function(n){i.updateAnswer(this.model,e(n.target).val()),this.$(".radio-option").removeClass("radio-selected"),e(n.target).closest(".radio-option").addClass("radio-selected"),t.delay(this.moveNext,s.NEXT_QUESTION_DELAY,this.model)},moveNext:function(e){var t=e.get("button");app.router.navigate("#quiz/"+e.get("quiz_id")+"/"+t.next.url,{trigger:!0})}});return u}),define("text!templates/result.html",[],function(){return'<div class="result-container">\r\n	<h1><%= result.name %> <span class="badge" style="font-size: 1em;"><%= result.value %></span></h1>\r\n	<p><%= result.description %></p>\r\n	<div class="text-center">\r\n		<ul class="score">\r\n			<% _.each(result.statistics, function(item) { %>\r\n			<li class="score-item" data-group-id="<%= item.group_id %>">\r\n				<span class="score-name"><%= item.name %></span>\r\n				<span class="badge"><%= item.value %></span><br />\r\n				<span style="display: none" class="score-description"><%= item.description %></span>\r\n			</li>	\r\n			<% }) %>\r\n		</ul>\r\n	</div>\r\n</div>\r\n<hr />\r\n<div class="row">\r\n	<div class="col-md-6">\r\n		<span class="send-email-response"></span>\r\n		<form style="display: <%= (email)?\'none\':\'\' %>" class="form-horizontal form-email">\r\n		  <div class="form-group">\r\n		    <label for="name" class="col-sm-4 control-label">Name</label>\r\n		    <div class="col-sm-8">\r\n		      <input type="text" class="form-control" id="name" placeholder="your name ...">\r\n		    </div>\r\n		  </div>\r\n		  <div class="form-group">\r\n		    <label for="email" class="col-sm-4 control-label">Email</label>\r\n		    <div class="col-sm-8">\r\n		      <input type="email" class="form-control" id="email" placeholder="your email ...">\r\n		    </div>\r\n		  </div>\r\n		  <div class="form-group">\r\n		    <div class="col-sm-offset-4 col-sm-8">\r\n		      <button type="button" class="btn btn-primary btn-send-email" data-loading-text="Sending...">Send</button>\r\n		    </div>\r\n		  </div>\r\n		</form>		 	\r\n	</div>\r\n	<div class="col-md-1 text-center center-block">\r\n		<div class="vl text-center center-block hidden-xs" style="width:1px; height: 120px;"></div>						 	\r\n	</div>\r\n	<div class="col-md-5">\r\n		<span class="pdf-generating-response"></span>\r\n		<button class="btn btn-lg btn-primary btn-generate-pdf" data-loading-text="Generating ..." type="button">Generează PDF</button>\r\n		<a style="display: none" class="btn btn-lg btn-primary btn-download-pdf" href=""></a>\r\n	</div>\r\n</div>'}),define("views/ResultView",["jquery","underscore","backbone","backbone.marionette","text!templates/result.html","modules/Utils"],function(e,t,n,r,i,s){var o=n.Marionette.ItemView.extend({template:t.template(i),initialize:function(e){s.generateResultStatistics(e.quizId),this.model=s.getResult(e.quizId),this.quiz=s.getQuiz(e.quizId)},events:{"click .btn-generate-pdf":"generatePdf","click .btn-send-email":"sendEmail","click .score-item":"toggleDescription"},toggleDescription:function(e){this.$(".score-description").toggle()},validate:function(){return this.$("#name").val()&&this.$("#email").val()},sendEmail:function(){var t=this;if(!this.validate()){t.$(".send-email-response").html('<div role="alert" class="alert alert-danger"><strong>Error! </strong> Name or/and Email can not be empty!</div>');return}this.$(".btn-send-email").button("loading"),e.ajax({type:"POST",dataType:"json",url:"api/mail",data:JSON.stringify({name:this.$("#name").val(),email:this.$("#email").val(),subject:this.quiz.get("name")+" results",html:this.$(".result-container").html(),data:this.model}),success:function(e){e.status=="success"?(t.model.save(),t.$(".send-email-response").html('<div role="alert" class="alert alert-success"><strong>Success!</strong> '+e.data.message+"</div>")):t.$(".send-email-response").html('<div role="alert" class="alert alert-danger"><strong>Error! </strong> '+e.data.message+"</div>")},error:function(){t.$(".send-email-response").html('<div role="alert" class="alert alert-danger"><strong>Error!</strong> Internal server error!</div>')},complete:function(){t.$(".btn-send-email").button("reset")}})},generatePdf:function(){var t=this;console.log(this.model),this.$(".btn-generate-pdf").button("loading"),e.ajax({type:"POST",dataType:"json",url:"api/pdf",data:JSON.stringify({html:this.$(".result-container").html(),data:this.model}),success:function(e){e.status=="success"?(t.model.save(),t.$(".pdf-generating-response").html('<div role="alert" class="alert alert-success"><strong>Success! </strong> '+e.data.message+"</div>"),t.$(".btn-generate-pdf").toggle(),t.$(".btn-download-pdf").toggle(),t.$(".btn-download-pdf").html("Descarcă PDF"),t.$(".btn-download-pdf").attr("href","api/pdf/"+e.data.filename)):t.$(".pdf-generating-response").html('<div role="alert" class="alert alert-danger"><strong>Error! </strong> '+e.data.message+"</div>")},error:function(e){t.$(".pdf-generating-response").html('<div role="alert" class="alert alert-danger"><strong>Error!</strong> Internal server error!</div>')},complete:function(){t.$(".btn-generate-pdf").button("reset")}})}});return o}),define("text!templates/groups.html",[],function(){return'<ul class="groups">\r\n<% _.each(gifts, function(gift) { %>\r\n	<li>\r\n		<h4>Darul <%= gift.name%></h4>\r\n		<p><%= gift.description%></p>\r\n	</li>\r\n<% }) %>\r\n</ul>\r\n'}),define("views/GroupsView",["jquery","underscore","backbone","backbone.marionette","text!templates/groups.html","modules/Utils"],function(e,t,n,r,i,s){var o=n.Marionette.ItemView.extend({template:t.template(i),initialize:function(e){this.model=s.getQuiz(e.quizId)},templateHelpers:function(){return{gifts:this.model.get("groups")}}});return o}),define("text!templates/sandbox/geolocation.html",[],function(){return"<div>Your current location is [<%= pos.coords.longitude %>, <%= pos.coords.latitude %>], which is</div> \r\n<div><%= distances[0].distance %> km from Vox Domini SF and </div>\r\n<div><%= distances[1].distance %> km from Vox Domini FF</div>\r\n<div>... accuracy <%= pos.coords.accuracy %> m</div>"}),define("views/sandbox/GeolocationView",["jquery","underscore","backbone","backbone.marionette","modules/Utils","text!templates/sandbox/geolocation.html"],function(e,t,n,r,i,s){var o=n.Marionette.ItemView.extend({template:t.template(s),initialize:function(e){var t=this,r=n.Model.extend({});this.model=new r,this.model.set({pos:{coords:{longitude:null,latitude:null}},distances:[{point:"vox1",distance:null},{point:"vox2",distance:null}]}),navigator.geolocation&&window.navigator.geolocation.getCurrentPosition(function(e){t.model.set({pos:e,distances:[{point:"vox1",distance:i.getDistance(e.coords.longitude,e.coords.latitude,"vox1").toFixed(2)},{point:"vox2",distance:i.getDistance(e.coords.longitude,e.coords.latitude,"vox2").toFixed(2)}]}),t.render()})},onRender:function(){}});return o}),define("text!templates/sandbox/qrcode.html",[],function(){return'<div class="qrcode-container"></div>'}),define("views/sandbox/QRCodeView",["jquery","underscore","backbone","backbone.marionette","modules/Utils","text!templates/sandbox/qrcode.html","jquery.qrcode"],function(e,t,n,r,i,s){var o=n.Marionette.ItemView.extend({template:t.template(s),initialize:function(e){},onRender:function(){this.$(".qrcode-container").qrcode({size:300,radius:50,text:"http://oprean.ddns.net/quizzes/",label:"Vox Domini",fontcolor:"#ff9818"})}});return o}),define("text!templates/sandbox/surface.html",[],function(){return'<div id="surface-single"></div>			\r\n<div id="surface-dual"></div>\r\n<div id="surface-tri"></div>\r\n<div id="surface-quad"></div>\r\n<button class="btn btn-primary btn-values center-block">Get surface salues</button>\r\n<div class="surface-values text-center"></div>		\r\n\r\n'}),define("views/sandbox/SurfaceView",["jquery","underscore","backbone","backbone.marionette","modules/Utils","text!templates/sandbox/surface.html","jquery.ui.custom"],function(e,t,n,r,i,s){var o=n.Marionette.ItemView.extend({template:t.template(s),events:{"click .btn-values":"getValues"},initialize:function(e){t.delay(this.render,0)},getValues:function(e){this.$(".surface-values").html(this.$("#surface-quad").surface("values").join(","))},onRender:function(){this.$("#surface-single").surface({size:280,name:"Mesajul",control:{size:20},components:[{label:"aplicabil","class":"left"}]}),this.$("#surface-dual").surface({size:280,name:"Mesajul",control:{size:20,color:"#3c986b"},components:[{label:"aplicabil","class":"top-left"},{label:"inspirational","class":"top-right"}]}),this.$("#surface-tri").surface({size:280,name:"Mesajul",control:{size:30,color:"#c68841"},components:[{label:"aplicabil","class":"top"},{label:"inspirational","class":"bottom-left"},{label:"precis","class":"bottom-right"}]}),this.$("#surface-quad").surface({size:280,name:"Mesajul",control:{size:50,color:"#763ca4",start:{left:50,top:50}},components:[{label:"aplicabil","class":"top-left"},{label:"inspirational","class":"top-right"},{label:"precis","class":"bottom-right"},{label:"interesant","class":"bottom-left"}]})}});return o}),define("modules/Controller",["jquery","underscore","backbone","backbone.marionette","views/HomeView","views/StaticView","views/QuizView","views/QuestionView","views/ResultView","views/GroupsView","views/sandbox/GeolocationView","views/sandbox/QRCodeView","views/sandbox/SurfaceView"],function(e,t,n,r,i,s,o,u,a,f,l,c,h){var p=r.Controller.extend({initialize:function(){},home:function(e){console.log("home "+e),app.mainRegion.show(new i({quizId:e}))},"static":function(e){app.mainRegion.show(new s({tpl:e}))},quiz:function(e,t){console.log("question");var n;switch(t){case"home":n=new o({quizId:e});break;case"result":n=new a({quizId:e});break;case"groups":n=new f({quizId:e});break;default:n=new u({quizId:e,questionId:t})}app.mainRegion.show(n)},test:function(e){var t;switch(e){case"geolocation":t=new l;break;case"qrcode":t=new c;break;case"surface":t=new h;break;default:t=new s({tpl:e})}app.mainRegion.show(t)}});return p}),define("modules/Router",["jquery","underscore","backbone","backbone.marionette","modules/Controller","globals"],function(e,t,n,r,i,s){var o=new i,u=r.AppRouter.extend({initialize:function(){if(s.DEBUG_MODE==0)return this.bind("route",this._trackPageview)},_trackPageview:function(){var e;return e=n.history.getFragment(),ga("send","pageview","/"+e)},controller:o,appRoutes:{"":"home",home:"home","static/:template":"static","quiz/:name/:q":"quiz","test/:feature":"test"}});return u}),require.config({paths:{jquery:"lib/jquery-2.1.3.min","jquery.bootstrap":"lib/bootstrap.min","jquery.ui":"lib/jquery-ui.min","jquery.ui.touch-punch":"lib/jquery.ui.touch-punch.min","jquery.ui.custom":"lib/jquery-ui.custom",underscore:"lib/lodash.min",backbone:"lib/backbone-min","backbone.marionette":"lib/backbone.marionette.min","backbone.localStorage":"lib/backbone.localStorage.min","backbone.validation":"lib/backbone-validation-min",moment:"lib/moment.min","jquery.qrcode":"lib/jquery.qrcode-0.12.0.min",text:"lib/text"},shim:{"jquery.ui":{deps:["jquery"]},"jquery.bootstrap":{deps:["jquery.ui"]},"jquery.ui.touch-punch":{deps:["jquery.ui"]},"jquery.ui.custom":{deps:["jquery.ui.touch-punch"]},"jquery.qrcode":{deps:["jquery"]},backbone:{deps:["jquery","underscore"],exports:"Backbone"},"backbone.marionette":{deps:["jquery","underscore","backbone"],exports:"Marionette"},"backbone.localStorage":{deps:["backbone"],exports:"Backbone"},"backbone.validation":{deps:["backbone"],exports:"Backbone"}}}),require(["infrastructure"],function(){require(["app","modules/Router"],function(e,t){app=new e,app.router=new t,Backbone.History.started||Backbone.history.start(),app.start()})}),define("main",function(){});