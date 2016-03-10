<?php
define('DS', DIRECTORY_SEPARATOR);
define('ROOT_DIR', dirname(dirname(__FILE__)));
define('RUNTIME_DIR', ROOT_DIR.DS.'runtime'.DS);
define('TEMPLATES_DIR', ROOT_DIR.DS.'php'.DS.'templates'.DS);

define('USER_BEAN', 'user');
define('GROUP_BEAN', 'group');
define('QUIZ_BEAN', 'quiz');

require_once(ROOT_DIR.'/php/Slim/Slim.php');
require_once(ROOT_DIR.'/php/redbean/rb.php');
require_once(ROOT_DIR.'/php/config.php');

require_once(ROOT_DIR.'/php/components/auth.php');
require_once(ROOT_DIR.'/php/components/DefaultView.php');

require_once(ROOT_DIR.'/php/models/user.php');
?>