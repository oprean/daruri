<?php
require_once('config.php');
require_once('phpmailer/class.smtp.php');
require_once('phpmailer/class.phpmailer.php');

if(isset($_POST['mail'])) {
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
	$mail->Subject = $_POST['mail']['subject'];
	$mail->Body = $_POST['mail']['body'];
	$mail->AddAddress($_POST['mail']['email']);
	 if(!$mail->Send()) {
		echo 'error';
	} else {
		echo 'ok';
	}
}
?>