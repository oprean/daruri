<?php
require_once 'php/bootstrap.php';

R::setup( 'sqlite:'.ROOT_DIR.'/data/quizzes.sqlite' );
\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();
$app->config('debug', DEBUG_MODE);
//$app->add(new TokenAuth());

require_once(ROOT_DIR.'/php/routes/app.php');

$app->run();
R::close();
?>