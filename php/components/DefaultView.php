<?php
require_once (ROOT_DIR.'/php/Slim/View.php');
class DefaultView extends \Slim\View
{

    /** @var string */
    protected $layout;

    /** @var array */
    protected $layoutData = array();

    /**
     * @param string $layout Pathname of layout script
     */
    public function setLayout($layout)
    {
        $this->layout = $layout;
    }

    /**
     * Render template
     *
     * @param  string $template Pathname of template file relative to templates directory
     * @return string
     */
    public function render($template, $data = NULL)
    {
        if ($this->layout) {
        	$user = isset($_SESSION['user'])?$_SESSION['user']:null;
            $content = parent::render('header.php', array('user' => $user));
            $this->set('header', $content);
            $content = parent::render($template);
            $this->set('content', $content);
            if (is_array($data)) {
				foreach ($data as $key => $value) {
		        	$this->set($key, $value);			
				}
			}
			
            $template = $this->layout;
            return parent::render($template);
        } else {
            return parent::render($template);
        }
    }
}