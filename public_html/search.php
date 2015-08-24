<?

error_reporting(E_ALL);

$conf = array(
	"db" => "draft",
	"username" => "",
	"password" => ""
);

$mongo = new MongoClient("mongodb://localhost");
$db    = $mongo->selectDB('draft');

if($_GET){

    $search = array();

    if( isset($_GET["pos"]) and $_GET["pos"] != 'all' ){
        $search["pos"] = $_GET["pos"];
    }

    if( isset($_GET["name"]) ){
        $search['$or'] = array( 
            array("name" => new MongoRegex("/".$_GET["name"]."/i")),
            array("team" => new MongoRegex("/".$_GET["name"]."/i")),
        );
    }

    if( $search ){
        $players = $db->players->find($search)->sort(array("rank" => 1, "proj" => 1));
    }
    else{
        $players = $db->players->find()->sort(array("proj" => -1, "rank" => 1));
    }

    $_players = array();
    foreach($players as $id => $player){
        $_players[] = $player;
    }

    echo json_encode($_players);
}

else if($_POST){
    if( isset($_POST["id"]) ){
        $id = new MongoId($_POST["id"]);
        $db->players->update(
            array("_id" => $id),
            array('$set' => array("picked" => $_POST["picked"]))
        );
    }
}
