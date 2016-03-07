<?php
$app->get('/user', function () use ($app) {
	$items = R::findAll(USER_BEAN);
	$app->response()->header('Content-Type', 'application/json');
	echo json_encode(R::exportAll($items));	
});

$app->get('/user/:id', function ($id) use ($app) {
    	
    $item = R::findOne(USER_BEAN, 'id=?', array($id));
    if ($item) {
        $app->response()->header('Content-Type', 'application/json');
        echo json_encode($item->export());
    } else {
        $app->response()->status(404);
    }	
});


$app->post('/user', function () use ($app) { 
	$post = $app->request()->post();
/*	$user = User::validateUser($post['username'], $post['oldpassword']); 
	if (!empty($user)) {
		$user->password = md5($post['newpassword']);
		R::store($user);
		$auth = User::login($post['username'], $post['newpassword']);
		
    	$auth = json_encode($auth);		
		$app->response()->header('Content-Type', 'application/json');
		echo $auth;
	} else {
		$app->response()->status(403);
	}*/
});


$app->get('/group', function () use ($app) {
	$items = R::findAll(GROUP_BEAN);
	$app->response()->header('Content-Type', 'application/json');
	echo json_encode(R::exportAll($items));	
});

$app->get('/group/:id', function ($id) use ($app) {
    	
    $item = R::findOne(GROUP_BEAN, 'id=?', array($id));
    if ($item) {
        $app->response()->header('Content-Type', 'application/json');
        echo json_encode($item->export());
    } else {
        $app->response()->status(404);
    }	
});

$app->get('/group/:id/details', function ($id) use ($app) {
    	
    $group = R::findOne(GROUP_BEAN, 'id=?', array($id));
	$assigned = $group->sharedUserList;
	foreach ($assigned as $user) $uids[] = $user->id;
	if (empty($assigned)) {
		$unassigned = R::findAll( USER_BEAN);
	} else {
		$unassigned = R::find( USER_BEAN, ' id NOT IN ('.R::genSlots( $uids ).')', $uids );		
	}

    if ($group) {
        $app->response()->header('Content-Type', 'application/json');
        echo json_encode(array(
        	'unassigned' => R::exportAll($unassigned),
        	'assigned' => R::exportAll($assigned),
		));
    } else {
        $app->response()->status(404);
    }	
});

$app->post('/group/:id/update', function ($id) use ($app) {
	$post = $app->request()->post();
	if (!empty($post['uids'])) {
	    $group = R::findOne(GROUP_BEAN, 'id=?', array($post['gid']));
		if ($post['action'] == 'assign') {
			foreach ($post['uids'] as $uid) {
				$user = R::findOne(USER_BEAN, 'id=?', array($uid));
				$group->sharedUserList[] = $user;	
			}		
		} else {
			foreach ($post['uids'] as $uid) {
				$user = R::findOne(USER_BEAN, 'id=?', array($uid));
				unset($group->sharedUserList[$uid]);
			}
		}
		R::store( $group );	
	}
});