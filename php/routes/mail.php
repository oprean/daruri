<?php
require_once '../php/components/QMail.php';

$app->post('/mail', function () use ($app) {
		  
	$request = $app->request();
	$body = $request->getBody(); 
	$input = json_decode($body);

	$mail = new QMail($input);
	$result = $mail->send();
	
	$app->response()->header('Content-Type', 'application/json');
	echo json_encode($result);
});
?>