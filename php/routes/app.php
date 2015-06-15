<?php
$app->get('/', function () use ($app) {
	 $template = file_get_contents(VIEWS_DIR.'index.view.php');
	 echo $template;
});
$app->get('/results/:id', function ($id) use ($app) {
	 $template = 'result '.$id;
	 echo $template;
});
?>