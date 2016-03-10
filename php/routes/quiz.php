<?php
$app->get('/quiz/:file/json', function ($file) use ($app) {
	$json = file_get_contents(ROOT_DIR.DS.'data'.DS.$file.'.json');
	$post = json_decode($json);

	//$files = array('gifts', 'conflict', 'love');

	$item = R::dispense(QUIZ_BEAN);
	$item->name = $post->name;
	$item->description = $post->description;
	$item->type = $post->type;
	$item->data = json_encode(array(
		'options' => $post->options,
		'groups' => $post->groups,
		'questions' => $post->questions,
	));

	$item->active = true;
	$item->created = date('Y-m-d H:i:s');

	R::store($item);
	
});

$app->get('/quiz/:id', function ($id) use ($app) {
    	
    $item = R::findOne(QUIZ_BEAN, 'id=?', array($id));
    if ($item) {
        $app->response()->header('Content-Type', 'application/json');
        echo json_encode($item->export());
    } else {
        $app->response()->status(404);
    }	
});

$app->get('/quiz', function () use ($app) {
	$items = R::findAll(QUIZ_BEAN);
	$app->response()->header('Content-Type', 'application/json');
	echo json_encode(R::exportAll($items));	
});

$app->get('/quiz/:id', function ($id) use ($app) {
    	
    $item = R::findOne(QUIZ_BEAN, 'id=?', array($id));
    if ($item) {
        $app->response()->header('Content-Type', 'application/json');
        echo json_encode($item->export());
    } else {
        $app->response()->status(404);
    }	
});


$app->post('/quiz', function () use ($app) {
	$post = json_decode($app->request()->getBody());

	$item = R::dispense(QUIZ_BEAN);
	$item->name = $post->name;
	$item->description = $post->description;
	$item->type = $post->type;
	$item->data = $post->data;
	$item->active = $post->active;
	$item->created = date('Y-m-d H:i:s');

	R::store($item);
    if ($item) {
        $app->response()->header('Content-Type', 'application/json');
        echo json_encode($item->export());
    } else {
        $app->response()->status(404);
    }
});

$app->put('/quiz/:id', function ($id) use ($app) {
	$post = json_decode($app->request()->getBody());
	
	$item = R::findOne(QUIZ_BEAN, 'id=?', array($id));	
	$item->name = $post->name;
	$item->description = $post->description;
	$item->type = $post->type;
	$item->data = $post->data;
	$item->active = $post->active;
	$item->modified = date('Y-m-d H:i:s');
		
	R::store($item);
	
    if ($item) {
        $app->response()->header('Content-Type', 'application/json');
        echo json_encode($user->export());
    } else {
        $app->response()->status(404);
    }
});

$app->delete('/quiz/:id', function ($id) use ($app) {
	$item = R::findOne(QUIZ_BEAN, 'id=?', array($id));
	R::trash($item);
});