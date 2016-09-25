<?php
	require "lessc.inc.php";
	$less = new lessc("css/base.less");
	file_put_contents("css/style.css", $less->parse());
?>

<link rel="stylesheet" type="text/css" href="css/style.css">