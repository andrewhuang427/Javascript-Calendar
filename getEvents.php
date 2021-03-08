<?php

ini_set("session.cookie_httponly", 1);

session_start();

require 'database.php';

header("Content-Type: application/json");

$json_str = file_get_contents("php://input");
$json_obj = json_decode($json_str, true);

$month = $json_obj["month"];
$year = $json_obj["year"];
if ($_SESSION["user_id"] != null){
    $user_id = $_SESSION["user_id"];
}
else {
    $user_id = $json_obj["user_id"];
}


$query = "SELECT * FROM events WHERE user_id=? AND MONTH(date) = ? AND YEAR(date) = ?";

$stmt = $database->prepare($query);

$stmt->bind_param("iii", $user_id, $month, $year);

$stmt->execute();

$result = $stmt->get_result();

$events = array();
    
while($row = $result->fetch_assoc()){
    array_push($events, array(
        "event_id" => $row['event_id'],
        "title" => $row['title'],
        "description" => $row['description'],
        "date" => $row['date'],
        "time" => $row['time'],
        "category" => $row['category']
    ));
 }
 
echo json_encode(array(
    "success" => true,
    "month" => htmlentities($month),
    "year" => htmlentities($year),
    "events" => $events,
    "user_id" => $_SESSION["user_id"]

));

 exit;


?>
