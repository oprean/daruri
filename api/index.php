<?php
require_once '../php/bootstrap.php';
require_once '../php/Slim/Slim.php';
require_once '../php/redbean/rb.php';
require_once '../php/config.php';

R::setup( 'sqlite:../assets/data/quizzes.sqlite' );

\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();
$app->config('debug', true);

require_once 'routes/results.php';
require_once 'routes/mail.php';
require_once 'routes/pdf.php';
require_once 'routes/info.php';

$app->run();
R::close();