<?php
$app->get('/user', function () use ($app) {
	$users = R::findAll(USER_BEAN);
	$app->response()->header('Content-Type', 'application/json');
	echo json_encode(R::exportAll($users));	
});

$app->get('/user/:id', function ($id) use ($app) {
    	
    $user = R::findOne(USER_BEAN, 'id=?', array($id));
    if ($user) {
        $app->response()->header('Content-Type', 'application/json');
        echo json_encode($user->export());
    } else {
        $app->response()->status(404);
    }	
});


$app->post('/user', function () use ($app) {
	$post = json_decode($app->request()->getBody());

	$user = R::dispense(USER_BEAN);
	$user->username = $post->username;
	$user->email = $post->email;
	$user->password = md5($post->password);
	$user->is_admin = $post->is_admin;
	
	R::store($user);
    if ($user) {
        $app->response()->header('Content-Type', 'application/json');
        echo json_encode($user->export());
    } else {
        $app->response()->status(404);
    }
});

$app->put('/user/:id', function ($id) use ($app) {
	$post = json_decode($app->request()->getBody());
	
	$user = R::findOne(USER_BEAN, 'id=?', array($id));	
	$user->username = $post->username;
	$user->email = $post->email;
	$user->password = md5($post->password);
	$user->is_admin = $post->is_admin;
	
	R::store($user);
	
    if ($user) {
        $app->response()->header('Content-Type', 'application/json');
        echo json_encode($user->export());
    } else {
        $app->response()->status(404);
    }
});

$app->delete('/user/:id', function ($id) use ($app) {
	$user = R::findOne(USER_BEAN, 'id=?', array($id));
	R::trash($user);
});