<?php
$app->get('/test', function () use ($app) {
	echo RUNTIME_PATH;
});
?>