var div = document.createElement("div");div.id = "main";
var menu = document.createElement("div");menu.id = "menu";
document.body.appendChild(menu,div);
function table_gen(){

}
function div_head_gen(){

}
function gomb_kivalasztas(elem)
{
    let nehezseg_divGyerekek = document.getElementById("nehezseg_div").childNodes;
    for(let i = 0; i<nehezseg_divGyerekek.length;i++)
    {      
        nehezseg_divGyerekek[i].className ="";
    }
    elem.className+="gomb_kivalasztva";
    if(elem.id=="egyeniGomb")
    {
        document.getElementById("bombaBe").disabled=false;
        document.getElementById("magBe").disabled=false;
        document.getElementById("szelBe").disabled=false;
    }
    else
    {
        let parameter_divGyerekek = document.getElementById("parameter_div").childNodes;
        //let erteklista = ["szel","mag","bomba"];
        for(let i = 0; i<parameter_divGyerekek.length;i++)
        {      
            parameter_divGyerekek[i].disabled=true;
            if(i ==0)
            {
                parameter_divGyerekek[i].value=elem.dataset.szel
            }
            else if(i==1)
            {
                parameter_divGyerekek[i].value=elem.dataset.mag
            }
            else
            {
                parameter_divGyerekek[i].value=elem.dataset.bomba
            }
            //Ez nem működött parameter_divGyerekek[i].value=elem.erteklista[i];
        }
    }
}
function menu_gen(){
    let nehezseg_div = document.createElement("div");
    nehezseg_div.id="nehezseg_div";
    menu.appendChild(nehezseg_div);

    let parameter_div = document.createElement("div");
    parameter_div.id="parameter_div";
    menu.appendChild(parameter_div);

    let konnyuGomb = document.createElement("button");
    konnyuGomb.id="konnyuGomb";
    konnyuGomb.innerText="Könnyű";
    konnyuGomb.setAttribute("onClick","gomb_kivalasztas(this)");
    konnyuGomb.dataset.mag=9;
    konnyuGomb.dataset.szel=9;
    konnyuGomb.dataset.bomba=5;
    nehezseg_div.appendChild(konnyuGomb);

    let haladoGomb = document.createElement("button");
    haladoGomb.id="haladoGomb";
    haladoGomb.innerText="Haladó";
    haladoGomb.setAttribute("onClick","gomb_kivalasztas(this)");
    haladoGomb.dataset.mag=20;
    haladoGomb.dataset.szel=20;
    haladoGomb.dataset.bomba=10;
    nehezseg_div.appendChild(haladoGomb);

    let nehezGomb = document.createElement("button");
    nehezGomb.id="nehezGomb";
    nehezGomb.innerText="Nehéz";
    nehezGomb.setAttribute("onClick","gomb_kivalasztas(this)");
    nehezGomb.dataset.mag=30;
    nehezGomb.dataset.szel=30;
    nehezGomb.dataset.bomba=15;
    nehezseg_div.appendChild(nehezGomb);

    let egyeniGomb = document.createElement("button");
    egyeniGomb.id="egyeniGomb";
    egyeniGomb.innerText="Egyéni";
    egyeniGomb.setAttribute("onClick","gomb_kivalasztas(this)");
    nehezseg_div.appendChild(egyeniGomb);

    let szelBe = document.createElement("input");
    szelBe.setAttribute("type","number");
    szelBe.setAttribute("min","9");
    szelBe.id = "szelBe";
    szelBe.setAttribute("onKeyDown","return false");
    szelBe.setAttribute("disabled","true");
    parameter_div.appendChild(szelBe);

    let magBe = document.createElement("input");
    magBe.setAttribute("type","number");
    magBe.setAttribute("min","9");
    magBe.id="magBe";
    magBe.setAttribute("onKeyDown","return false");
    magBe.setAttribute("disabled","true");
    parameter_div.appendChild(magBe);

    let bombaBe = document.createElement("input");
    bombaBe.setAttribute("type","number");
    bombaBe.setAttribute("min","9");
    bombaBe.id="bombaBe";
    bombaBe.setAttribute("onKeyDown","return false");
    bombaBe.setAttribute("disabled","true");
    parameter_div.appendChild(bombaBe);

    let startGomb = document.createElement("button");
    startGomb.id="startGomb";
    startGomb.innerText="Indítás";
    startGomb.setAttribute("onClick","Load()");
    menu.appendChild(startGomb);
}
function Load(){
    var div_head = document.createElement("div");
    div_head.id = "main_head";
    var table = document.createElement("table");
    div.appendChild(div_head,table);
    var szel;
    var mag;
}
menu_gen();