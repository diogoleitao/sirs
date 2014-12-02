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
		<form action="testimonial.php" method="GET">
			<p> Add your own testimonial!</p>
			Name:<br><input type="text" name="username"><br>
			Testimonial:<br><input type="text" name="test"><br>
			<input type="submit" value="Post!">
		</form>
	</div>
	<div class="testimonials">
		<a href="showTestimonial.php?id=1">Show Testimonials.</a>
		<!--<form action="showTestimonial.php" method="GET">
			<input type="submit" value="show">
		</form>-->
	</div>
</body>
</html>