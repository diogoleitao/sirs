<?php
	$name = $_REQUEST['name'];
	$email = $_REQUEST['email'];

			try{

				$host = "db.ist.utl.pt";
				$user = "ist173214";
				$pass = "quhh2828";
				$dbname = $user;
				$db = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
				$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				$sql = "INSERT INTO mailinglist values('$name', '$email');";
				$result = $db->query($sql);
				echo ("Subscription successful!");
				$db = null;
			}
			catch ( PDOException $e){
				echo($e);
			}
?>
