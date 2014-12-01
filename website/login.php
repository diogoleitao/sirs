<?php
	$username = $_POST['username'];
	$password = $_POST['password'];

			try{

				$host = "db.ist.utl.pt";
				$user = "ist173214";
				$pass = "quhh2828";
				$dbname = $user;
				$db = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
				$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				$sql = "SELECT username, password FROM login WHERE username = '$username' AND password = '$password'";
				$result = $db->query($sql);
				if(!$result)
					echo(mysql_error());
				$db = null;
			}
			catch ( PDOException $e){
				echo($e);
			}
?>
