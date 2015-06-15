<?php
require_once('../php/phpmailer/class.smtp.php');
require_once('../php/phpmailer/class.phpmailer.php');
require_once('QPdf.php');

class QMail {
	
	private $mail;
	private $input;
	
	function __construct($input) {
		$this->input = $input;
		$this->mail = new PHPMailer(); // create a new object
		$this->mail->CharSet = 'UTF-8';
		$this->mail->IsSMTP(); // enable SMTP
		$this->mail->SMTPAuth = true; // authentication enabled
		$this->mail->SMTPSecure = 'ssl'; // secure transfer enabled REQUIRED for GMail
		$this->mail->Host = "smtp.gmail.com";
		$this->mail->Port = 465; // or 587
		$this->mail->IsHTML(true);

		$filename = $this->input->data->quiz_id.'_'.$this->input->data->id.'.pdf';		
		if (!file_exists(RUNTIME_DIR.$filename)) {
			$pdf = new QPdf($input);
			$result = $pdf->generate();
		}
		
      	$this->mail->addAttachment(RUNTIME_DIR.$filename);
		
		$this->mail->Username = SMTP_USERNAME;
		$this->mail->Password = SMTP_PASSWORD;
		$this->mail->SetFrom(SMTP_SETFROM);				
	}
	
	private function getResultLink() {
		return '<a href="'.$this->input->url.'">'.$this->input->data->quiz_id.'</a>';
	}
	
	function send() {

		$this->mail->Subject = $this->input->subject;
		$this->mail->Body = $this->input->html;
		$this->mail->Body .= $this->getResultLink();
		
		$this->mail->AddAddress($this->input->email);
		 if($this->mail->Send()) {
			$result = array(
				'status' => 'success',
				'data' => array(
					'message' => 'Mail succesfully sent to <i>'. $this->input->email.'</i>!' 
				)
			); 
		} else {
			$result = array(
				'status' => 'error',
				'data' => array(
					'message' => 'Failed to send the email to <i>'. $this->input->email.'</i>!' 
				)
			);
		}
		
		return $result;	
	}
}

?>