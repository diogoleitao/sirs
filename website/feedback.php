<?php
	$name = $_POST['name'];
	$email = $_POST['email'];

	$dbhost = "localhost";
	$dbuser = "root";
	$dbpass = "root";
	$dbname = "table";
	$tablename = "feedback";

	$conlink = mysql_connect($dbhost, $dbuser, $dbpass);
	if (!$conlink) {
		die(mysql_error());
	}

	$db_selected = mysql_select_db($dbname, $conlink);
	if (!$db_selected) {
		die(mysql_error());
	}

	$query = "INSERT INTO $tablename (name, email) VALUES ('$name', '$email')";
	if (!mysqli_query($conlink, $query)) {
		die(mysql_error());
	}

	header('Location: '. $_SERVER['REQUEST_URI']);
?>
