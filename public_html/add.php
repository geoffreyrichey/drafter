<?

error_reporting(E_ALL);

$conf = array(
	"db" => "draft",
	"username" => "",
	"password" => ""
);

$mongo = new MongoClient("mongodb://localhost");
$db    = $mongo->selectDB('draft');

if($_POST){

    $players = json_decode($_POST["players"]);

    foreach($players as $player){
        $db->players->insert($player);
    } 
}
