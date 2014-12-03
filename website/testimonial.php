<?php
	session_start();
	

    $_SESSION['username'] = $_GET['username'];
    $_SESSION['test'] = $_GET['test'];
    /*$username = $_POST['username'];
    $testimonial = $_POST['test'];*/
	$host = "db.ist.utl.pt";
	$user = "ist173214";
	$pass = "quhh2828";
	$dbname = $user;
	$tablename = "testimonial";

	$conlink = mysql_connect($host, $user, $pass);
	if (!$conlink) {
		die(mysql_error());
	}

	$db_selected = mysql_select_db($dbname, $conlink);
	if (!$db_selected) {
		die(mysql_error());
	}

	$query = "INSERT INTO $tablename VALUES ('$test')";
	header('Location: /ist173214/contacts.php');
	
	//headerder('Location: /ist173214/contacts.php');

?>
