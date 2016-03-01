<?php
require_once('../../tcpdf/tcpdf.php');

class QPdf extends TCPDF {
	
	private $pdf;
	private $input;
	
	function __construct($input) {
		$this->input = $input;
		//$this->pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);		
		$this->setFontSubsetting(false);
		$this->SetCreator(PDF_CREATOR);
		$this->SetAuthor("Seveco Web");
		$this->SetTitle($this->title);
		
		parent::__construct();
	}
	
    public function Header() {
    	
        $image_file = '../assets/img/logo100.jpg';
        $this->Image($image_file, 10, 5, 0, 10, 'jpg', '', 'T', false, 300, '', false, false, 0, false, false, false);
        // Set font
        $this->SetFont('helvetica', '', 12);
        // Title
        $this->SetTextColor(128,128,128);
        $this->Cell(0, 15, 'Test de daruri spirituale', 0, false, 'L', 0, '', 0, false, 'M', 'B');
		$this->SetFont('helvetica', '', 10);
		$this->Cell(0, 15, 'Terminat '.$this->input->data->date, 0, false, 'R', 0, '', 0, false, 'M', 'B');
		$style = array('width' => 0.1, 'cap' => 'butt', 'join' => 'miter', 'dash' => 0, 'color' => array(128, 128, 128));
		$this->Line(10, 16, 200, 16, $style);
    }

    // Page footer
    public function Footer() {
        // Position at 15 mm from bottom
        $this->SetY(-15);
        // Set font
        $this->SetFont('helvetica', 'I', 8);
        // Page number
        //$this->Cell(0, 15, $this->getAliasNumPage().'/'.$this->getAliasNbPages().' - oprean.ddns/quizzes', 0, false, 'L', 0, '', 0, false, 'T', 'M');
		$this->Cell(0, 15, $this->getAliasNumPage().'/'.$this->getAliasNbPages().' - oprean.ddns/quizzes', 0, false, 'L', 0, '', 0, false, 'M', 'B');
		$this->Cell(0, 15, 'generat in '.date('d-M-Y h:i:s'), 0, false, 'R', 0, '', 0, false, 'M', 'B');
        $style = array('width' => 0.1, 'cap' => 'butt', 'join' => 'miter', 'dash' => 0, 'color' => array(128, 128, 128));
        $this->Line(10, $this->getPageHeight()-12, 200, $this->getPageHeight()-12, $style);
    }
	
	function generate() {
		$this->SetMargins(PDF_MARGIN_LEFT, 17, PDF_MARGIN_RIGHT);
		$this->SetHeaderMargin(PDF_MARGIN_HEADER);
		$this->AddPage();
$html = <<<EOF
<style>
.result-container-pdf {
	font-size: 8pt;	
}
h1 {
	font-size: 14px;
}
 
.score {
	font-size: 8pt;
} 
</style>
EOF;
		$html .= '<br><br><h1>Draga '. (isset($this->input->name)?$this->input->name:'').',<h1><br><br><br>';
		$html .= $this->input->html;
		$filename = $this->input->data->quiz_id.'_'.$this->input->data->id.'.pdf';
		
		$this->writeHTMLCell(0, 0, '', '', $html, 0, 1, 0, true, '', true);
		$this->Output(RUNTIME_DIR.$filename, 'F');
		
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
