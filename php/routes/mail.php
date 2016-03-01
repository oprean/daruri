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
		$items->html = $input->htmlMail;
		$items->url = $input->url; 
		R::store($items);
	}

	$mail = new QMail($input);
	$result = $mail->send();
	
	$app->response()->header('Content-Type', 'application/json');
	echo json_encode($result);
});

$app->get('/mail', function () use ($app) {
	
		$address = 'oprean@gmail.com';
		$mail = new PHPMailer(); // create a new object
		$mail->CharSet = 'UTF-8';
		$mail->IsSMTP(); // enable SMTP
		$mail->SMTPAuth = true; // authentication enabled
		$mail->SMTPSecure = 'ssl'; // secure transfer enabled REQUIRED for GMail
		$mail->Host = "smtp.gmail.com";
		$mail->Port = 465; // or 587
		$mail->IsHTML(true);
	
		$mail->Username = SMTP_USERNAME;
		$mail->Password = SMTP_PASSWORD;
		$mail->SetFrom(SMTP_SETFROM);				
	
		$mail->Subject = 'test email';
		$mail->Body = 'test';
		
		$mail->AddAddress($address);
		 if($mail->Send()) {
			$result = array(
				'status' => 'success',
				'data' => array(
					'message' => 'Mail succesfully sent to <i>'. $address.'</i>!' 
				)
			); 
		} else {
			$result = array(
				'status' => 'error',
				'data' => array(
					'message' => 'Failed to send the email to <i>'. $address.'</i>!' 
				)
			);
		}
			
	$app->response()->header('Content-Type', 'application/json');
	echo json_encode($result);
});
?>