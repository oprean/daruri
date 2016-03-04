<?php
require_once 'php/bootstrap.php';

session_cache_limiter(false);
session_start();

R::setup( 'sqlite:'.ROOT_DIR.'/data/quizzes.sqlite' );
\Slim\Slim::registerAutoloader();

$oView = new DefaultView();
$oView->setLayout('default_layout.php');

$app = new \Slim\Slim(array(
	'view' => $oView,
    'templates.path' => 'php/templates'
));
$app->config('debug', DEBUG_MODE);
$app->add(new TokenAuth());

require_once(ROOT_DIR.'/php/routes/app.php');

$app->run();
R::close();
?>