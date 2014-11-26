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
		<a href="news.html">
			<div>News</div>
		</a>
		<a href="projects.html">
			<div>Projects</div>
		</a>
		<a href="company.html">
			<div>The company</div>
		</a>
		<a href="contacts.html">
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
			if (!$db_selected)
				die(mysql_error());

			$result = "SELECT testimonial FROM $tablename";

			if (mysqli_num_rows($result) > 0) {
				$i = 0;
				echo "<ul>";
			    while ($row = mysqli_fetch_assoc($result))
					echo "<li id=" . $i++ . ">" . $row['testimonial'] . "</li>";
				echo "</ul>";
			}
		?>
	</div>
</body>
</html>