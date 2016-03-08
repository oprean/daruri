<?php
$app->get('/group', function () use ($app) {
	$groups = R::findAll(GROUP_BEAN);
	$app->response()->header('Content-Type', 'application/json');
	echo json_encode(R::exportAll($groups));	
});

$app->get('/group/:id', function ($id) use ($app) {
    	
    $group = R::findOne(GROUP_BEAN, 'id=?', array($id));
    if ($group) {
        $app->response()->header('Content-Type', 'application/json');
        echo json_encode($group->export());
    } else {
        $app->response()->status(404);
    }	
});

$app->post('/group', function () use ($app) {
	$post = json_decode($app->request()->getBody());

	$group = R::dispense(GROUP_BEAN);
	$group->name = $post->name;
	$group->description = $post->description;
	
	R::store($group);
    if ($group) {
        $app->response()->header('Content-Type', 'application/json');
        echo json_encode($group->export());
    } else {
        $app->response()->status(404);
    }
});

$app->put('/group/:id', function ($id) use ($app) {
	$post = json_decode($app->request()->getBody());
	
	$group = R::findOne(GROUP_BEAN, 'id=?', array($id));	
	$group->name = $post->name;
	$group->description = $post->description;
	R::store($group);
	
    if ($group) {
        $app->response()->header('Content-Type', 'application/json');
        echo json_encode($group->export());
    } else {
        $app->response()->status(404);
    }
});

$app->delete('/group/:id', function ($id) use ($app) {
	$group = R::findOne(GROUP_BEAN, 'id=?', array($id));
	R::trash($group);
});

$app->get('/group/:id/members', function ($id) use ($app) {
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

$app->post('/group/:id/members', function ($id) use ($app) {
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