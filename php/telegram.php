<?
//https://api.telegram.org/bot2103019998:AAHSciyHYQCj_nxfZxT10B-RSVhW29Qf5VE/getUpdates
$name = $_POST['name'];
$gmail = $_POST['gmail'];
$xabar = $_POST['contact'];
$token = '2103019998:AAHSciyHYQCj_nxfZxT10B-RSVhW29Qf5VE';
$chat_id = '-604342253';
$array = array(
    'Ism:   '=>   $name,
    'Gmail:   '=>   $gmail,
    'Kelgan Xabar:   '=>   $xabar
);
foreach ($array as $key => $value):
    $text .= $key . $value . "%0A";
endforeach;
$telegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_emode=html&text={$text}","r");
header('Location: ../../index.html');