<?php

ini_set("session.cookie_httponly", 1);

session_start();

require 'database.php';

header("Content-Type: application/json");

$json_str = file_get_contents("php://input");
$json_obj = json_decode($json_str, true);

$event_id = $json_obj["event_id"];
$token    = $json_obj["token"];

if (hash_equals($_SESSION['token'], $token)) {
    // ----- Creates and executes query to create new user and store their credentials in the database -----
    $query = "DELETE FROM events WHERE event_id=?";
    
    $stmt = $database->prepare($query);
    
    $stmt->bind_param("i", $event_id);
    
    if ($stmt->execute()) {
        echo json_encode(array(
            "success" => true
        ));
        exit;
    } else {
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