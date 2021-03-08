 <?php
 
 // ------ Creates new instance of database ------
 
 $database = new mysqli('localhost', 'andrewhuang', 'password', 'calendar');
 
 // -----  Makes sure that database is connected appropriately -----
 
 if($mysqli->connect_errno) {
 	printf("Connection Failed: %s\n", $mysqli->connect_error);
 	exit;
 }
 ?>