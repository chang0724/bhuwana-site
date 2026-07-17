<?php
$dir = __DIR__;
$images = [];

if (is_dir($dir)) {
    $entries = scandir($dir);
    foreach ($entries as $entry) {
        if ($entry === '.' || $entry === '..') {
            continue;
        }

        $path = $dir . DIRECTORY_SEPARATOR . $entry;
        if (!is_file($path)) {
            continue;
        }

        $ext = strtolower(pathinfo($entry, PATHINFO_EXTENSION));
        if (in_array($ext, ['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif', 'bmp'])) {
            $images[] = $entry;
        }
    }
}

sort($images);
header('Content-Type: application/json');
echo json_encode($images);
