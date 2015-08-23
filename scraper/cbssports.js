var _rank = 31;
var _pos = "DST";
var _names = {};
var _list = [];
var _bye = {"TEN" : 4, "NE"  : 4, "CAR" : 5, "MIA" : 5, "MIN" : 5, "NYJ" : 5, "DAL" : 6, "OAK" : 6, "STL" : 6, "TB" : 6, "CHI" : 7, "CIN" : 7, "DEN" : 7, "GB" : 7, "BUF" : 8, "JAC" : 8, "PHI" : 8, "WAS" : 8, "ARI" : 9, "BAL" : 9, "DET" : 9, "HOU" : 9, "KC" : 9, "SEA" : 9, "ATL" : 10, "IND" : 10, "SD" : 10, "SF" : 10, "CLE" : 11, "NO" : 11, "NYG" : 11, "PIT" : 11 };

$('b .playerLink').each(function(){

    var name   = $(this).text();

    if( name == "" || _names[name] || name == "Aaron Rodger" ){
        return;
    }

    console.log(name);

    var parent = $(this).closest('td'); 

    var htm    = $(parent).html();

    var tmEl   = $('.playerPositionAndTeam', parent);
    var tmText = tmEl.text();
    var tmP    = tmText.indexOf('|');
    var team   = tmText.substr((tmP + 2));

    var projP  = htm.indexOf('Projected FPTS:');
    var proj   = htm.substr((projP + 16), 6);

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
        link: $(this).attr('href')
    };

    _list.push(player);
    _names[name] = true;
    _rank = _rank + 1;
});
_list;
JSON.stringify(_list);
