<?php
require '../php/Slim/Slim.php';
require '../php/redbean/rb.php';

R::setup( 'sqlite:../assets/data/quizzes.sqlite' );

\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();
//http://stackoverflow.com/questions/7017755/sub-views-layouts-templates-in-slim-php-framework

// GET route
$app->get(
    '/',
    function () {
    	$book = R::dispense( 'book' );
		$book->title = 'Learn to Program';
    	$book->rating = 10;
		$id = R::store( $book );
        $template = 'html';
        echo $template;
    }
);

$app->get(
    '/quiz',
    function () {
        $template = 'gallery';
        echo $template;
    }
);

// POST route
$app->post(
    '/post',
    function () {
        echo 'This is a POST route';
    }
);

// PUT route
$app->put(
    '/put',
    function () {
        echo 'This is a PUT route';
    }
);

// PATCH route
$app->patch('/patch', function () {
    echo 'This is a PATCH route';
});

// DELETE route
$app->delete(
    '/delete',
    function () {
        echo 'This is a DELETE route';
    }
);

$app->run();
R::close();