<?php
	$id = "";
	if (isset($_GET['id']))
		$id = $_GET['id'];

	$dbhost = "localhost";
	$dbuser = "root";
	$dbpass = "root";
	$dbname = "table";
	$tablename = "testimonial";

	$conlink = mysql_connect($dbhost, $dbuser, $dbpass);
	if (!$conlink) {
		die(mysql_error());
	}

	$db_selected = mysql_select_db($dbname, $conlink);
	if (!$db_selected) {
		die(mysql_error());
	}

	$result = "SELECT testimonial FROM $tablename WHERE id = $id";
	if (mysqli_num_rows($result) > 0) {
		echo "<p>";
		$row = mysqli_fetch_assoc($result);
		echo $row['testimonial'];
		echo "</p>";
	}

	header('Location: '. $_SERVER['REQUEST_URI']);
?>
