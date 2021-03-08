<?php

ini_set("session.cookie_httponly", 1);

session_start();

require 'database.php';

header("Content-Type: application/json");

$json_str = file_get_contents("php://input");
$json_obj = json_decode($json_str, true);

$title       = $json_obj["title"];
$description = $json_obj["description"];
$date        = $json_obj["date"];
$time        = $json_obj["time"];
$category    = $json_obj["category"];
$event_id    = $json_obj["event_id"];
$token       = $json_obj["token"];

if (hash_equals($_SESSION['token'], $token)) {
    // ----- Creates and executes query to create new user and store their credentials in the database -----
    $query = "UPDATE events SET title=(?), description=(?), date=(?), time=(?), category=(?) where event_id=(?)";
    
    $stmt = $database->prepare($query);
    
    $stmt->bind_param('sssssi', $title, $description, $date, $time, $category, $event_id);
    
    if ($stmt->execute()) {
        $stmt->close();
        echo json_encode(array(
            "success" => true
        ));
        exit;
    }
    
    $stmt->close();
    echo json_encode(array(
        "success" => false
    ));
    exit;
    
} else {
    echo json_encode(array(
        "success" => false,
        "message" => "invalid token passed"
    ));
    exit;
}