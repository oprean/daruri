<?php
require_once (ROOT_DIR.'/php/Slim/View.php');
class CustomView extends \Slim\View
{
    public function render($template)
    {
        return 'The final rendered template';
    }
}