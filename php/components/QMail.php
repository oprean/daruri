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
		return '<a href="'.$this->input->url.'">'.$this->input->url.'</a>';
	}
	
	function send() {

		$this->mail->Subject = $this->input->subject;
		$this->mail->Body = '<h2>Draga '.$this->input->name.'</h2> ';
		$this->mail->Body .= $this->input->htmlMail;
		$this->mail->Body .= '<hr>Poti revizita aceste rezultate aici: <br>';
		$this->mail->Body .= $this->getResultLink();
		
		$this->mail->AddAddress($this->input->email);
		//$this->mail->addCC('gelupaul@gmail.com');
		 if($this->mail->Send()) {
			$result = array(
				'status' => 'success',
				'data' => array(
					'message' => 'E-Mail trimis cu succes la <i>'. $this->input->email.'</i>!' 
				)
			); 
		} else {
			$result = array(
				'status' => 'error',
				'data' => array(
					'message' => 'Eroare de trimitere E-mail la <i>'. $this->input->email.'</i>!' 
				)
			);
		}
		
		return $result;	
	}
}

?>