<?php

	$user_name = $_POST['username'];
	$pwd = $_POST['password'];

	$host = "db.ist.utl.pt";
	$user = "ist173214";
	$pass = "quhh2828";
	$dbname = $user;
			
	$conlink = mysql_connect($host, $user, $pass);
	if (!$conlink) {
		die(mysql_error());
	}

	$db_selected = mysql_select_db($dbname, $conlink);
	if (!$db_selected) {
		die(mysql_error());
	}
	$query = "SELECT * FROM login WHERE username = '$user_name' AND password = '$pwd'";
	$result = mysql_query($query);
	if (mysql_num_rows($result) > 0) {
		echo "<font color='#5EFB6E'><b>Welcome to administration, $username.</font></b><br>\n";
	}
	else{
		echo "<font color='#F62817'><b>Error: Invalid username or password.</b></font><p>\n";
			   // include("login.php");
		mysql_close($db);
	}
?>
