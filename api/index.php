<?php
require_once '../php/bootstrap.php';

R::setup( 'sqlite:'.ROOT_DIR.'/data/quizzes.sqlite' );
\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();
$app->config('debug', DEBUG_MODE);
//$app->add(new TokenAuth());

require_once(ROOT_DIR.'/php/routes/results.php');
require_once(ROOT_DIR.'/php/routes/mail.php');
require_once(ROOT_DIR.'/php/routes/pdf.php');
require_once(ROOT_DIR.'/php/routes/info.php');

//require_once(ROOT_DIR.'/php/routes/admin.php');
require_once(ROOT_DIR.'/php/routes/group.php');
require_once(ROOT_DIR.'/php/routes/user.php');

$app->run();
R::close();