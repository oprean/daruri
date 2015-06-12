<?php
require '../php/Slim/Slim.php';
require '../php/redbean/rb.php';

R::setup( 'sqlite:../assets/data/quizzes.sqlite' );

\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();

// handle GET requests for /api/items
$app->get('/results', 'getResults');
$app->get('/results/:id',  'getResult');
 
// handle POST requests
$app->post('/results', 'addResult');
 
// handle PUT requests
$app->put('/results/:id', 'updateResult');
 
// handle DELETE requests
$app->delete('/results/:id', 'deleteResult');
 
$app->run();
R::close();

function getResults() {
    // get all items
    $items = R::find('results');
     
    $app = \Slim\Slim::getInstance();
     
    // create JSON response
    $app->response()->header('Content-Type', 'application/json');
    echo json_encode(R::exportAll($items));
}
 
function getResult($id) {
 
    $items = R::findOne('results', 'id=?', array($id));
     
    // create JSON response if element found 
    // else send 404 server error
    $app = \Slim\Slim::getInstance();
    if ($items) {
        $app->response()->header('Content-Type', 'application/json');
        echo json_encode(R::exportAll($items));
    } else {
        $app->response()->status(404);
    }
}
 
function addResult() {
 
    $app = \Slim\Slim::getInstance();
     
    // get request body, decode into PHP object
     
    $request = $app->request();
    $body = $request->getBody(); 
    $input = json_decode($body);
 
    // create and save element record 
    $items = R::dispense('results'); 
    $items->quizId = (string)$input->quiz_id; 
	$items->person = (string)$input->person;
	$items->date = date('Y-m-d');
	$items->answers = (string)$input->answers;
     
    // do same for other attributes 
    R::store($items); 
     
    // create and send JSON response 
    $app->response()->status(201); 
    $app->response()->header('Content-Type', 'application/json');
    echo json_encode(R::exportAll($items));
     
}
 
function updateResult($id) {
     
    $app = \Slim\Slim::getInstance();
     
    // get request body, decode into PHP object
    $request = $app->request();
     
    $body = $request->getBody();
    $input = json_decode($body);
     
 
    // retrieve specified element record 
    // save modified record, create and send JSON response 
    $items = R::findOne('results', 'id = ?', array($id)); 
     
    if ($items) { 
        $items->quizId = (string)$input->quiz_id; 
        // do same for other attributes 
        R::store($items); 
        $app->response()->header('Content-Type', 'application/json');
        echo json_encode(R::exportAll($items)); 
    } else { 
        $app->response()->status(404); 
    }
     
}
 
function deleteResult($id) {
     
    $app = \Slim\Slim::getInstance();
     
    // retrieve specified element record 
    // save modified record, create and send JSON response 
    $items = R::findOne('results', 'id = ?', array($id)); 
     
    if ($items) { 
        R::trash($items); 
        $app->response()->status(204); 
    } else { 
        $app->response()->status(404); 
    }
     
}