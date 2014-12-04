<!DOCTYPE html>
<html>
<head>
	<title>Fake Company | Testimonials</title>
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

	<?php
		session_start();

		$id = $_GET["id"];
		$_SESSION['next'] = $id + 1;
		$_SESSION['previous'] = $id - 1;
		
		$counter = 0;
		$host = "db.ist.utl.pt";
		$user = "ist173214";
		$pass = "quhh2828";
		$dbname = $user;

		$db = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
		$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				
		$all = "SELECT * FROM testimonial;";
		$process = $db->query($all);

		foreach ($process as $row) {
			$counter++;
		}

		$link = "showTestimonial.php?id=";
		$naddr = $link.$_SESSION['next'];
		$paddr = $link.$_SESSION['previous'];

		$sql = "SELECT * FROM testimonial WHERE id=$id;";
		$result=$db->query($sql);

		foreach ($result as $try) {
			$text = $try['test'];
			$name = $try['name'];
			echo($text.' - '.$name.'<br>');
		}

		if ($id == 1) {
			echo "<br>";
			echo "<a href='".$naddr."'>Next testimonial</a>";
			echo "<br><br>";
		} else if ($id < $counter) {
			echo "<br>";
			echo "<a href='".$paddr."'>Previous testimonial</a>&nbsp;&nbsp;&nbsp;";
			echo "<a href='".$naddr."'>Next testimonial</a>";
			echo "<br><br>";
		} else if ($id == $counter) {
			echo "<br>";
			echo "<a href='".$paddr."'>Previous testimonial</a>&nbsp;&nbsp;&nbsp;";
			echo "<br><br>";
		} else {
			echo "<br>";
			echo "There are no more testimonials";
			echo "<br><br>";
		}
	?>

	<link rel="stylesheet" type="text/css" href="main.css">
	<form action="showTestimonial.php" method="GET" class="showTestimonial">
		 Insert an id to show a testimonial: &nbsp;<input type="text" name="id" maxlength="1">
		<input type="submit" value="Search">
	</form>
</body>
</html>
