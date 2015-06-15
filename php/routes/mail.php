<?php
require_once '../php/components/QMail.php';

$app->post('/mail', function () use ($app) {
		  
	$request = $app->request();
	$body = $request->getBody(); 
	$input = json_decode($body);
	$url = $request->getUrl().$request->getRootUri().'results/'.$input->data->id;
	$input->url = str_replace('/api', '/', $url);
	
	if (!R::findOne( 'results', ' result_id = ? ', [ $input->data->id ] )) {
		$items = R::dispense('results'); 
		$items->resultId = $input->data->id;
	    $items->quizId = (string)$input->data->quiz_id; 
		$items->person = (string)$input->data->person;
		$items->date = date('Y-m-d');
		$items->data = json_encode($input->data);
		$items->html = $input->html;
		$items->url = $input->url; 
		R::store($items);
	}

	$mail = new QMail($input);
	$result = $mail->send();
	
	$app->response()->header('Content-Type', 'application/json');
	echo json_encode($result);
});
?>