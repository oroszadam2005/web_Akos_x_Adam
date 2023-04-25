var div = document.createElement("div");menu.id = "menu";
var menu = document.createElement("div");div.id = "main";
document.body.appendChild(menu,div);

function table_gen(){

}
function div_head_gen(){

}
function Load(){
    var div_head = document.createElement("div");
    div_head.id = "main_head";
    var table = document.createElement("table");
    div.appendChild(div_head,table);
}
Load();