<?php

	session_start();

	$id = $_GET["id"];
	$_SESSION['next'] = $id+1;
	$_SESSION['previous'] = $id-1;
	
	$counter = 0;
		$host = "db.ist.utl.pt";
		$user = "ist173214";
		$pass = "quhh2828";
		$dbname = $user;

		$db = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
		$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				
		$all = "SELECT * FROM testimonial;";
		$process=$db->query($all);

		foreach($process as $row){
			$counter++;
		}

		$link = "showTestimonial.php?id=";
		$naddr = $link.$_SESSION['next'];
		$paddr = $link.$_SESSION['previous'];

		$sql = "SELECT * FROM testimonial WHERE id=$id;";
		$result=$db->query($sql);

		foreach($result as $try){
			$text= $try['test'];
			echo($text.'<br>');

		}

		if($id == 1){
			echo "<a href='".$naddr."'>Show next testimonial</a>";
		}
		else if($id < $counter){
			echo "<a href='".$paddr."'>Show previous testimonial</a>&nbsp;&nbsp;&nbsp;";
			echo "<a href='".$naddr."'>Show next testimonial</a>";
			echo "<br><br>";
		}
		else if($id == $counter){
			echo "<a href='".$paddr."'>Show previous testimonial</a>&nbsp;&nbsp;&nbsp;";
		}
		else{
			echo "There are no more testimonials";
		}


?>

<p> Insert an id to show a testimonial: <p>
<form action="showTestimonial.php" method="get">
	<input type="text" name="id"><br>
	<input type="submit" value="search">