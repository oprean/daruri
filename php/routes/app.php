<?php
$app->get('/', function () use ($app) {
	$app->render('home.php', array('jsapp' => false));
});

$app->get('/jsapp', function () use ($app) {
	$app->render('loader.php', array('jsapp' => true));
});

$app->get('/login', function () use ($app) {
	$app->render('login.php', array('jsapp' => false));
});

$app->post('/login', function () use ($app) {
	$post = $app->request()->post();
	$user = User::login($post['username'], $post['password']); 
	if ($user !==false) {
		$_SESSION['user'] = $user;
		$app->redirect('jsapp');
	}	
	$app->render('login.php', array('jsapp' => false, 'error' => true));
});

$app->get('/logout', function () use ($app) {
	session_destroy();
	$app->redirect('.');
});


$app->get('/results/:id', function ($id) use ($app) {
	$result = R::findOne('results', 'result_id=?', [$id]);
	echo $result->html;
});
?>