<?php

ini_set("session.cookie_httponly", 1);

session_start();

require 'database.php';

header("Content-Type: application/json");

$json_str = file_get_contents("php://input");
$json_obj = json_decode($json_str, true);

$title       = $json_obj["title"];
$date        = $json_obj["date"];
$time        = $json_obj["time"];
$description = $json_obj["description"];
$category    = $json_obj["category"];
$user_id     = $_SESSION["user_id"];
$token       = $json_obj["token"];

if (hash_equals($_SESSION['token'], $token)) {
    // ----- Creates and executes query to create new user and store their credentials in the database -----
    $query = "INSERT INTO events (title, description, date, time, category, user_id) VALUES (?, ?, ?, ?, ?, ?)";
    
    $stmt = $database->prepare($query);
    $stmt->bind_param('sssssi', $title, $description, $date, $time, $category, $user_id);
    
    if ($stmt->execute()) {
        $stmt->close();
        echo json_encode(array(
            "success" => true
        ));
        exit;
    } else {
        $stmt->close();
        echo json_encode(array(
            "success" => false
        ));
        exit;
    }
} else {
    echo json_encode(array(
        "success" => false,
        "message" => htmlentities("invalid token passed")
    ));
    exit;
}



?>