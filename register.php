<?php

ini_set("session.cookie_httponly", 1);

session_start();

require 'database.php';

header("Content-Type: application/json");

$json_str = file_get_contents("php://input");
$json_obj = json_decode($json_str, true);

$newUserName = (string)$json_obj["username"];
$newPassword = (string)$json_obj["password"];

// ----- Hashes Password -----
$hash = password_hash($newPassword, PASSWORD_DEFAULT);

// ----- Creates and executes query to create new user and store their credentials in the database -----
$query = "INSERT INTO users (username, password_hash) VALUES (?, ?)";

$stmt  = $database->prepare($query);
$stmt->bind_param('ss', $newUserName, $hash);

if ($stmt->execute()) {

    $stmt->close();
    
    $id_query = "SELECT user_id FROM users WHERE username=(?)";
    $stmt1    = $database->prepare($id_query);
    if (!$stmt1) {
        printf("Query Prep Failed: %s\n", $mysqli->error);
        exit;
    }
    $stmt1->bind_param('s', $newUserName);
    if (!$stmt1->execute()) {
        echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
    }
    $result = $stmt1->get_result();
    $row    = $result->fetch_assoc();
    $id     = $row["user_id"];
    
    $_SESSION['user_id']   = $id;
    $_SESSION['username']  = $newUserName;
    $_SESSION['logged_in'] = TRUE;
    $_SESSION['token']     = bin2hex(openssl_random_pseudo_bytes(32));
    
    echo json_encode(array(
        "success" => true,
        "token" => $_SESSION["token"]
    ));
    exit;

} else {

    echo json_encode(array(
        "success" => false,
        "message" => htmlentities("Query execution failed.")
    ));
    exit;
}

?>