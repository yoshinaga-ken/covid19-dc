<?php
/**
 * CSVをJSONに変換
 */
$fname = $argv[1];
$oname = $argv[2];
$option = (isset($argv[3]) && $argv[3] === '--pretty') ? (JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT) : JSON_UNESCAPED_UNICODE;

$fp = fopen($fname, "r");
$i = 0;
$out = [];
while (($data = fgetcsv($fp, 1024, ",")) !== FALSE) {
  //数字は整数に変換
  for ($j = 0; $j < count($data); $j++) {
    $data[$j] = is_numeric($data[$j]) ? intval($data[$j]) : $data[$j];
  }
  $out[$i] = $data;
  $i++;
}
fclose($fp);

file_put_contents($oname, json_encode($out, $option));

?>
