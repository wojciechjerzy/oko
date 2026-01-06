<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Max-Age: 86400');
// Katalog na sesje
$dir = __DIR__ . '/sessions';

// Utwórz katalog, jeśli nie istnieje
if (!is_dir($dir)) {
    mkdir($dir, 0777, true);
}

// Pobranie sessionId z query
$sessionId = $_GET['sessionId'] ?? null;

if (!$sessionId) {
    http_response_code(400);
    echo 'Brak parametru sessionId';
    exit;
}

$filename = $dir . '/' . basename($sessionId) . '.json';

// POST → zapisz body do pliku
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $body = file_get_contents('php://input');

    if ($body === false || $body === '') {
        http_response_code(400);
        echo 'Puste body';
        exit;
    }

    file_put_contents($filename, $body);

    echo 'Zapisano';
    exit;
}

// GET → odczytaj plik i zwróć
if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    header('Content-Type: application/json');

    if (!file_exists($filename)) {
        echo 'null';
        exit;
    }

    echo file_get_contents($filename);
    exit;
}

// Inne metody
http_response_code(405);
echo 'Metoda niedozwolona';