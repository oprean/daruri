<html>
<?php require 'head.php'?>
<body>	
	<script>
	  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
	
	  ga('create', 'UA-63644786-1', 'auto');
	  ga('send', 'pageview');
	</script>
	<div id="header-container">
		<?php echo $header ?>
	</div>
	<div class="container <?php echo isset($fluid)?'fluid':'' ?>" id="main-container">
		<?php echo $content ?> 
	</div>
	<div id="modals-container"></div>
	<div id="footer-container" class="hidden-xs"> </div>
</body>
</html>

