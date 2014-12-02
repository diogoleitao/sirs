<?php
	session_start();
	

    $_SESSION['username'] = $_POST['username'];
    $_SESSION['test'] = $_POST['test'];
    /*$username = $_POST['username'];
    $testimonial = $_POST['test'];*/
	$host = "db.ist.utl.pt";
	$user = "ist173214";
	$pass = "quhh2828";
	$dbname = $user;
	$tablename = "testimonial";


	header('Location: /ist173214/contacts.php');

	//echo "<div>$username : $testimonial</div>\n"; //XSS!

	$conlink = mysql_connect($host, $user, $pass);
	if (!$conlink) {
		die(mysql_error());
	}

	$db_selected = mysql_select_db($dbname, $conlink);
	if (!$db_selected) {
		die(mysql_error());
	}

	//$query = "INSERT INTO $tablename VALUES ('$test')";

	

	//header('Location: '. $_SERVER['REQUEST_URI']);
?>
