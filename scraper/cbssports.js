var _rank = 1;
var _names = {};
var _list = [];
var _bye = {"TEN" : 4, "NE"  : 4, "CAR" : 5, "MIA" : 5, "MIN" : 5, "NYJ" : 5, "DAL" : 6, "OAK" : 6, "STL" : 6, "TB" : 6, "CHI" : 7, "CIN" : 7, "DEN" : 7, "GB" : 7, "BUF" : 8, "JAC" : 8, "PHI" : 8, "WAS" : 8, "ARI" : 9, "BAL" : 9, "DET" : 9, "HOU" : 9, "KC" : 9, "SEA" : 9, "ATL" : 10, "IND" : 10, "SD" : 10, "SF" : 10, "CLE" : 11, "NO" : 11, "NYG" : 11, "PIT" : 11 };

var pname = window.location.pathname.split('/');
var _pos  = pname[3];
var _rank = parseInt(pname[4].substr(0, pname[4].indexOf('-')));

console.log("Pos: "+_pos);

$('b .playerLink').each(function(){

    var name   = $(this).text();

    if( name == "" || _names[name] || name == "Aaron Rodger" ){
        return;
    }

    console.log(_rank + ': '+name);

    var parent = $(this).closest('td'); 

    var htm    = $(parent).html();

    var tmEl   = $('.playerPositionAndTeam', parent);
    var tmText = tmEl.text();
    var tmP    = tmText.indexOf('|');
    var team   = tmText.substr((tmP + 2));

    var projP  = htm.indexOf('Projected FPTS:');
    var proj   = htm.substr((projP + 16), 6);

    var eP     = proj.indexOf('<');
    if( eP && eP > 1 ){
        proj = proj.substr(0, eP);
    }

    proj = parseFloat(proj);

    var injury = false;
    var injEl  = $('.icon-red_cross', parent);
    if( injEl !== undefined && injEl.length > 0 ){
        var injPEl  = $(injEl).parent().parent();
        injury      = $(injPEl).attr('title');
    }

    var bye    = _bye[team];
    if( bye == undefined ){
        console.log("Unknown bye "+team);
    }

    var player = {
        rank: _rank,
        pos: _pos,
        name: $(this).text(),
        proj: proj,
        team: team,
        bye: bye,
        link: $(this).attr('href'),
        injury: injury,
        picked: false
    };

    _list.push(player);
    _names[name] = true;
    _rank = _rank + 1;
});

$.post("http://www.drafter.local/add.php", {players: JSON.stringify(_list)},function(){console.log("Uploaded!");});
