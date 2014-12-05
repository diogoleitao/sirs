<!DOCTYPE html>
<html>
<head>
	<!--<meta charset="utf-8">-->
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
		<form action="feedback.php" method="GET">
			Name:<br><input type="text" id="name" name="name"><br>
			Email:<br><input type="text" id="emai1" name="email"><br>
			<input type="submit" value="Subscribe">
		</form>
	</div>
	<div class = "login_form">
		<form action="login.php" method="POST">
			username:<br><input type="text" name="username"><br>
			password:<br><input type="text" name="password"><br>
			<input type="submit" value="Login">
		</form>
	</div>
	<div class = "WallTestimonial">
		<form action="contacts.php" method="GET">
			<p> Add your own testimonial!</p>
			Name:<br><input type="text" name="username"><br>
			Testimonial:<br><input type="text" name="test"><br>
			<input type="submit" value="Post!">
		</form>
	<?php

	$username = $_GET['username'];
    $test = $_GET['test'];
    $counter = 0;
    /*$username = $_POST['username'];
    $testimonial = $_POST['test'];*/
	$host = "db.ist.utl.pt";
	$user = "ist173214";
	$pass = "quhh2828";
	$dbname = $user;
	$tablename = "testimonial";
	
	$db = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
	$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	if ($username != NULL){
		$sql = $db->prepare("INSERT INTO $tablename (name, test) VALUES (:name, :test)");
		$sql->bindParam('name', $username);
		$sql->bindParam('test', $test);
		
		$sql->execute();
	}
	

	$all = "SELECT * FROM testimonial;";
	$process=$db->query($all);

	foreach($process as $row){
		$counter++;
	}

	$new = "SELECT * FROM testimonial WHERE id=$counter;";
	$show=$db->query($new);

	foreach($show as $try){
		$text= $try['test'];
		$name= $try['name'];
		echo($text.' - '.$name.'<br>');
	
	}



	?>
	</div>
	<div class="testimonials">
		<a href="showTestimonial.php?id=1">Show more testimonials.</a>

	</div>
</body>
</html>
