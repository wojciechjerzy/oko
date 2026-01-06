<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Max-Age: 86400');

$dir = __DIR__ . '/sessions';
if (!is_dir($dir)) {
    mkdir($dir, 0777, true);
}

$sessionId = $_GET['sessionId'] ?? null;

if (!$sessionId) {
    http_response_code(400);
    echo 'Brak parametru sessionId';
    exit;
}

$filename = $dir . '/' . basename($sessionId) . '.json';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $body = file_get_contents('php://input');
    $data = json_decode($body, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('Invalid JSON: ' . json_last_error_msg());
    }
    file_put_contents($filename, $body);
    exit;
} else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    header('Content-Type: application/json');
    echo file_exists($filename) ? file_get_contents($filename) : "null";
    exit;
}