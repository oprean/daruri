<?php
require_once('../../tcpdf/tcpdf.php');

class QPdf extends TCPDF {
	
	private $pdf;
	private $input;
	
	function __construct($input) {
		$this->input = $input;
		$this->pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);		
	}
	
	function generate() {

		$this->pdf->AddPage();
		$this->pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, PDF_HEADER_TITLE.' 001', PDF_HEADER_STRING, array(0,64,255), array(0,64,128));
		$this->pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
		$this->pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
		$this->pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
		$html = $this->input->html;
		$filename = $this->input->data->quiz_id.'_'.$this->input->data->id.'.pdf';
		
		$this->pdf->writeHTMLCell(0, 0, '', '', $html, 0, 1, 0, true, '', true);
		$this->pdf->Output(RUNTIME_DIR.$filename, 'F');
		
		//http://labs.omniti.com/labs/jsend
		if (file_exists(RUNTIME_DIR.$filename)) {
			$result = array(
				'status' => 'success',
				'data' => array(
					'filename' => $filename,
					'name' => $this->input->data->quiz_id, 
					'message' => 'PDF generated succesfully!',
				)
			); 
		} else {
			$result = array(
				'status' => 'error',
				'data' => array(
					'message' => 'Failed to create PDF file', 
				)
			);
		}	
		return $result;	
	}
}
?>
