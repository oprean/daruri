<?php
define('DS', DIRECTORY_SEPARATOR);
define('ROOT_DIR', dirname(dirname(__FILE__)));
define('RUNTIME_DIR', ROOT_DIR.DS.'runtime'.DS);
define('VIEWS_DIR', ROOT_DIR.DS.'php/views'.DS);

require_once(ROOT_DIR.'/php/Slim/Slim.php');
require_once(ROOT_DIR.'/php/redbean/rb.php');
require_once(ROOT_DIR.'/php/config.php');

require_once(ROOT_DIR.'/php/components/auth.php');

require_once(ROOT_DIR.'/php/models/user.php');
?>