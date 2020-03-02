<?php

/* 
 * Removes log files older than a certain date
 * 
 * Example location: /var/log/sites/$INSTANCE/logs/$SERVER
 * 
 * Example filenames
 *   - access.log
 *   - access.log-20190223.gz
 *   - access.log.pos
 */

$instance = $argv[1];
$server = $argv[2];
$directory = '/var/log/sites/' . $instance . '/logs/' . $server;
#$directory = '/Users/michaelclaybaugh/repositories/log-cleanup/exampledir';
$files = scandir($directory);

if ($files === FALSE) {
  echo "Error reading $directory";
  return;
}

$filesWithDates = array_filter($files, 'has_date');
$_referenceDate = date('Ymd', strtotime('-2 weeks'));
$filesToRemove = array_filter($filesWithDates, 'is_old');

foreach ($filesToRemove as $file) {
  $filePath = $directory . '/' . $file;
  echo "Removing $filePath...\n";
  unlink($filePath);
}

echo "Finished removing " . count($filesToRemove) . " files.\n";

function has_date($name) {
  return preg_match('/-[0-9]{8}/', $name);
}

function is_old($name) {
  $match = [];
  preg_match('/[0-9]{8}/', $name, $match);
  global $_referenceDate;
  if ((int) $match[0] < (int) $_referenceDate) {
    return TRUE;
  } else {
    return FALSE;
  }
}
