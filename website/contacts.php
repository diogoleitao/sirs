<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Fake Company | Contacts</title>
	<link rel="stylesheet" href="main.css">
</head>
<body>
	<nav>
		<a href="index.html">
			<div>Home</div>
		</a>
		<a href="news.php">
			<div>News</div>
		</a>
		<a href="projects.html">
			<div>Projects</div>
		</a>
		<a href="company.php">
			<div>The company</div>
		</a>
		<a href="contacts.php">
			<div>Contacts</div>
		</a>
	</nav>
	<div class="feedback form">
		<h3>Subscribe to our mailing list!</h3>
		<form action="feedback.php">
			Name:<br><input type="text" id="name"><br>
			Email:<br><input type="text" id="email1"><br>
			<input type="submit" value="Subscribe">
		</form>
	</div>
	<div class="testimonials">
		<h3>Here are some of the fantastic things people have said about us:</h3>
		<?php
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
			if (!$db_selected)
				die(mysql_error());

			$result = "SELECT test FROM $tablename";

			if (mysqli_num_rows($result) > 0) {
				$i = 0;
				echo "<ul>";
			    while ($row = mysqli_fetch_assoc($result))
					echo "<li id=" . $i++ . ">" . $row['test'] . "</li>";
				echo "</ul>";
			}
		?>
	</div>
</body>
</html>