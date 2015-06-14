<?php
require_once '../php/components/QPdf.php';

$app->post('/pdf', function () use ($app) {
		  
	$request = $app->request();
	$body = $request->getBody(); 
	$input = json_decode($body);
	
	$pdf = new QPdf($input);
	$result = $pdf->generate();

	$app->response()->header('Content-Type', 'application/json');
	echo json_encode($result);

});

$app->get('/pdf/:file', function ($file) use ($app) {
	$file = RUNTIME_PATH.$file;

 	$app->response()->header('Content-Type', 'application/pdf');
    $app->response()->header('Content-Disposition: attachment; filename="'.$file.'";');
    $app->response()->header('Content-Length: '.filesize($file));
	echo file_get_contents($file);
});
?>