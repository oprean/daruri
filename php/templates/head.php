<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Bateria de teste - Vox Domini">
    <meta name="author" content="Sergiu Oprean">
    
    <meta property="og:url" content="http://oprean.ddns.net/quizzes/">
	<meta property="og:title" content="Bateria de teste - Vox Domini">
	<meta property="og:description" content="Bateria de teste de la Vox Domini pentru o crestere si dezvoltare ritmica, lejera, simbiotica, armonioasa. Pentru o unitate in diversitate si o ...">
	<meta property="og:image" content="http://oprean.ddns.net/quizzes/assets/img/logo.png">

	<title><?php echo DEBUG_MODE?'DEBUG ':''?>Bateria de teste - Vox Domini</title>
	<link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Tangerine|Roboto|Lato">
	<link rel="stylesheet" type="text/css" href="assets/css/font-awesome.min.css">
	<link rel="stylesheet" type="text/css" href="assets/css/animate.css">
	<link rel="stylesheet" type="text/css" href="assets/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="assets/css/jquery-ui.custom.css">
	<link rel="stylesheet" type="text/css" href="assets/css/main.css">
	<?php if (isset($jsapp) && $jsapp == true) { ?>
	<script type="text/javascript" data-main="<?php echo DEBUG_MODE?'js':'dist'?>/main" src="js/lib/require.min.js"></script>
	<script>define('globals', [], function() { return {DEBUG_MODE: <?php echo DEBUG_MODE?'true':'false'?>} });</script>		 
	<?php } ?>
</head>