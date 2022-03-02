<?php

$curl = curl_init();
$username = 'ukoniq';
$password = 'tVUm(5kx/z&*_U%"BM/}!+A*3epjLvL6';

$fields_string = '';
foreach($_POST as $key=>$value) { $fields_string .= $key.'='.$value.'&'; }
//echo $fields_string;
//exit;
curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://ukoniq.com/submit.php',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_USERPWD => $username . ':' . $password,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_POSTFIELDS => $fields_string,
));

$response = curl_exec($curl);

curl_close($curl);
echo $response;