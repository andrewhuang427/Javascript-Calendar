<?php

ini_set("session.cookie_httponly", 1);

session_start();

require 'database.php';

header("Content-Type: application/json");

$json_str = file_get_contents("php://input");
$json_obj = json_decode($json_str, true);

$user = (string)$json_obj["username"];
$pwd_guess = (string)$json_obj["password"];

// Creates Prepared Statement

$stmt = $database->prepare("SELECT user_id, username, password_hash FROM users WHERE username=?");
$stmt->bind_param('s', $user);
$stmt->execute();
$stmt->bind_result($id, $username, $pwd_hash);
$stmt->fetch();

// Compare the submitted password to the actual password hash

if (password_verify($pwd_guess, $pwd_hash))
{
    // Redirect to News Dashboard
    $_SESSION['user_id'] = $id;
    $_SESSION['username'] = $username;
    $_SESSION['logged_in'] = TRUE;
    $_SESSION['token'] = bin2hex(openssl_random_pseudo_bytes(32));

    echo json_encode(array(
        "success" => true,
        "token" => $_SESSION["token"],
        "user_id" => $_SESSION["user_id"]
    ));
    exit;

} else {
    
    // Validation Failed 
    echo json_encode(array(
        "success" => false,
        "message" => htmlentities("Incorrect Username or Password")
    ));
    exit;

}
?>
