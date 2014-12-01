<?php
	$id = "";
	if (isset($_GET['id']))
		$id = $_GET['id'];

	$host = "db.ist.utl.pt";
	$user = "ist173214";
	$pass = "quhh2828";
	$dbname = $user;
	//$db = new PDO("mysql:host=$host; dbname=$dbname", $user, $password);
	$tablename = "testimonial";

	$conlink = mysql_connect($host, $user, $dbpass);
	if (!$conlink) {
		die(mysql_error());
	}

	$db_selected = mysql_select_db($dbname, $conlink);
	if (!$db_selected) {
		die(mysql_error());
	}

	$result = "SELECT test FROM $tablename WHERE id = $id";
	if (mysqli_num_rows($result) > 0) {
		echo "<p>";
		$row = mysqli_fetch_assoc($result);
		echo $row['test'];
		echo "</p>";
	}

	header('Location: '. $_SERVER['REQUEST_URI']);
?>
