var div = document.createElement("div");div.id = "main";var menu = document.createElement("div");menu.id = "menu";var almenu = document.createElement("div");almenu.id = "almenu";var div_head = document.createElement("div");div_head.id = "main_head";
document.body.appendChild(menu);document.body.appendChild(almenu);document.body.appendChild(div);div.style.display = "none";
var lerakottbombak = [];var matrix = [];var bomba;var mag;var szel;var bejart = [];var ingame = false;var timer;var elapsedTime; var zaszlok = [];
//menu,tábla generálás
function setTimer () {
    timer = setInterval(function(){
      elapsedTime += 1;
      document.getElementById('time_disp').innerText = elapsedTime.toString().padStart(3, '0');
    }, 1000);
  };
function main_head_gen(){
    div.appendChild(div_head);
    var head = document.createElement("div");head.id = "head";
    div_head.appendChild(head);
    var bomba_disp = document.createElement("div");bomba_disp.id = "bomba_disp";bomba_disp.innerText ="000";
    var reset_disp = document.createElement("div");reset_disp.id = "reset_disp";
    var reset_img_disp = document.createElement("img");reset_img_disp.id = "reset_img_disp";
    reset_img_disp.src = "img/face.png";reset_disp.appendChild(reset_img_disp);reset_img_disp.setAttribute("onclick","Reset()");
    var time_disp = document.createElement("div");time_disp.id = "time_disp";time_disp.innerText ="000";
    head.appendChild(bomba_disp);head.appendChild(reset_disp);head.appendChild(time_disp);
    document.getElementById('bomba_disp').innerText = bomba.toString().padStart(3, '0');
}
function gomb_kivalasztas(elem)
{
    if(ingame == false){
        /*let nehezseg_divGyerekek = document.getElementById("nehezseg_div").childNodes;
        for(let i = 0; i<nehezseg_divGyerekek.length;i++)
        {      
            nehezseg_divGyerekek[i].className ="";
        }
        elem.className+="gomb_kivalasztva";*/
        let nehezseg_span_kivalasztott = document.getElementById("nehezseg_span_kivalasztott");
        nehezseg_span_kivalasztott.innerText = elem.innerText;
        if(elem.id=="egyeniGomb")
        {
            document.getElementById("bombaBe").style.display="block";document.getElementById("magBe").style.display="block";document.getElementById("szelBe").style.display="block";}
        else
        {
            document.getElementById("bombaBe").style.display="none";document.getElementById("magBe").style.display="none";document.getElementById("szelBe").style.display="none";
            let parameter_divGyerekek = document.getElementById("parameter_div").childNodes;
            for(let i = 0; i<parameter_divGyerekek.length;i++)
            {      
                parameter_divGyerekek[i].style.display="none";
                if(i ==0)
                {
                    parameter_divGyerekek[i].value=elem.dataset.szel}
                else if(i==1)
                {
                    parameter_divGyerekek[i].value=elem.dataset.mag}
                else
                {
                    parameter_divGyerekek[i].value=elem.dataset.bomba}
            }
        }
        let start = document.getElementById("startGomb")
        if(start.disabled == true)
        {
            start.disabled = false
        }
    }
}
function menu_gen(){
    let nehezseg_span = document.createElement("span");
    nehezseg_span.innerText="Nehézség";
    nehezseg_span.id="nehezseg_span";
    menu.appendChild(nehezseg_span);

    let nehezseg_span_kivalasztott = document.createElement("span");
    nehezseg_span_kivalasztott.id="nehezseg_span_kivalasztott";
    menu.appendChild(nehezseg_span_kivalasztott);

    let nehezseg_div_dropdown = document.createElement("div");
    nehezseg_div_dropdown.id="nehezseg_div_dropdown";
    nehezseg_span.appendChild(nehezseg_div_dropdown);

    let startGomb = document.createElement("button");
    startGomb.id="startGomb";
    startGomb.innerText="Indítás";
    startGomb.setAttribute("onclick","Load()");
    startGomb.setAttribute("disabled","true");
    menu.appendChild(startGomb);

    let konnyuGomb = document.createElement("button");
    konnyuGomb.id="konnyuGomb";
    konnyuGomb.innerText="Könnyű";
    konnyuGomb.setAttribute("onClick","gomb_kivalasztas(this)");
    konnyuGomb.dataset.mag=9;
    konnyuGomb.dataset.szel=9;
    konnyuGomb.dataset.bomba=10;
    nehezseg_div_dropdown.appendChild(konnyuGomb);

    let haladoGomb = document.createElement("button");
    haladoGomb.id="haladoGomb";
    haladoGomb.innerText="Haladó";
    haladoGomb.setAttribute("onClick","gomb_kivalasztas(this)");
    haladoGomb.dataset.mag=20;
    haladoGomb.dataset.szel=20;
    haladoGomb.dataset.bomba=10;
    nehezseg_div_dropdown.appendChild(haladoGomb);

    let nehezGomb = document.createElement("button");
    nehezGomb.id="nehezGomb";
    nehezGomb.innerText="Nehéz";
    nehezGomb.setAttribute("onClick","gomb_kivalasztas(this)");
    nehezGomb.dataset.mag=50;
    nehezGomb.dataset.szel=50;
    nehezGomb.dataset.bomba=200;
    nehezseg_div_dropdown.appendChild(nehezGomb);

    let egyeniGomb = document.createElement("button");
    egyeniGomb.id="egyeniGomb";
    egyeniGomb.innerText="Egyéni";
    egyeniGomb.setAttribute("onClick","gomb_kivalasztas(this)");
    nehezseg_div_dropdown.appendChild(egyeniGomb);

    let parameter_div = document.createElement("div");
    parameter_div.id="parameter_div";
    almenu.appendChild(parameter_div);

    let szelBe = document.createElement("input");
    szelBe.setAttribute("type","number");
    szelBe.setAttribute("min","9");
    szelBe.id = "szelBe";
    szelBe.setAttribute("placeholder","Szélesség");
    szelBe.setAttribute("onKeyDown","return false");
    //szelBe.setAttribute("disabled","true");
    szelBe.style.display="none";
    parameter_div.appendChild(szelBe);

    let magBe = document.createElement("input");
    magBe.setAttribute("type","number");
    magBe.setAttribute("min","9");
    magBe.setAttribute("placeholder","Magasság");
    magBe.id="magBe";
    magBe.setAttribute("onKeyDown","return false");
    //magBe.setAttribute("disabled","true");
    magBe.style.display="none";
    parameter_div.appendChild(magBe);

    let bombaBe = document.createElement("input");
    bombaBe.setAttribute("type","number");
    bombaBe.setAttribute("min","9");
    bombaBe.setAttribute("placeholder","Akna");
    bombaBe.id="bombaBe";
    bombaBe.setAttribute("onKeyDown","return false");
    //bombaBe.setAttribute("disabled","true");
    bombaBe.style.display="none";
    parameter_div.appendChild(bombaBe);
}
function tabla_gen(){
    var table = document.createElement("table");
    div.appendChild(table);
    for (let index = 0; index < mag; index++) {
        var tr = document.createElement("tr");var tmp = [];
        for (let index1 = 0; index1 < szel; index1++) {
            var td = document.createElement("td");
            var img = document.createElement("img");
            img.id = (index*szel)+index1+1;img.src = "img/fedett.png";img.setAttribute("onclick","felfedes(this)");
            img.addEventListener('contextmenu', function(ev) {
                if(ingame == true)
                {
                    if(this.zaszlo == null || this.zaszlo == 0){
                        zaszlok.push(this.id);
                        this.zaszlo = 1;this.src = "img/zaszlo.png";document.getElementById('bomba_disp').innerText = (bomba-zaszlok.length).toString().padStart(3, '0');}
                    else if(this.zaszlo == null || this.zaszlo !=2){
                        zaszlok.splice(zaszlok.indexOf(this.id),1);
                        this.zaszlo = 0;this.src = "img/fedett.png";document.getElementById('bomba_disp').innerText = (bomba-zaszlok.length).toString().padStart(3, '0');}
                }
                ev.preventDefault();
                return false;
            }, false);
            td.appendChild(img);tr.appendChild(td);tmp.push(0);
        }
        matrix.push(tmp);table.appendChild(tr);
    }
}
//back
function matrix1(){
    while(lerakottbombak.length != bomba){
        var rnd = Math.floor(Math.random()*(mag*szel)+1);
        if (lerakottbombak.includes(rnd) == false) {
            lerakottbombak.push(rnd);
            var x = Math.ceil(rnd/szel)-1
            var y = (rnd-(Math.ceil(rnd/szel)-1)*szel)-1
            if (x-1 >= 0 && matrix[x-1][y] >= 0) {
                matrix[x-1][y] ++;}
            if (x+1 < mag && matrix[x+1][y] >= 0) {
                matrix[x+1][y]++;}
            if (y-1 >= 0 && matrix[x][y-1] >= 0) {
                matrix[x][y-1]++;}
            if (y+1 < szel && matrix[x][y+1] >= 0) {
                matrix[x][y+1]++;}
            if (x-1 >= 0 && y-1 >= 0 && matrix[x-1][y-1] >= 0) {
                matrix[x-1][y-1] ++;}
            if (x+1 < mag && y-1 >= 0 && matrix[x+1][y-1] >= 0) {
                matrix[x+1][y-1] ++;}
            if (x+1 < mag && y+1 < szel && matrix[x+1][y+1] >= 0) {
                matrix[x+1][y+1] ++;}
            if (x-1 >= 0 && y+1 < szel && matrix[x-1][y+1] >= 0) {
                matrix[x-1][y+1] ++;}
            matrix[Math.ceil(rnd/szel)-1][(rnd-(Math.ceil(rnd/szel)-1)*szel)-1]= -1;
        }
    }
}
function Rekurziv_felfedes(x,y){
    if (matrix[x][y] != -1) {
        var item = document.getElementById((x*szel)+y+1);
        console.log()
        item.zaszlo =2;
        item.src = "img/"+matrix[x][y]+".png";
        if (matrix[x][y]>0) {
            return;}
        if (x-1 >= 0 && bejart.includes(((x-1)*szel)+y) == false) {
            bejart.push(((x-1)*szel)+y);
            setTimeout(Rekurziv_felfedes,10,x-1,y);}
        if (x+1 < mag && bejart.includes(((x+1)*szel)+y) == false) {
            bejart.push(((x+1)*szel)+y);
            setTimeout(Rekurziv_felfedes,10,x+1,y);}
        if (y-1 >= 0 && bejart.includes((x*szel)+y-1) == false) {
            bejart.push((x*szel)+y-1);
            setTimeout(Rekurziv_felfedes,10,x,y-1);}
        if (y+1 < szel && bejart.includes((x*szel)+y+1) == false) {
            bejart.push((x*szel)+y+1);
            setTimeout(Rekurziv_felfedes,10,x,y+1);}
    }
}
function felfedes(item){
    if (timer == null) setTimer();
    if (ingame == true) {
        if (matrix[Math.ceil(item.id/szel)-1][(item.id-(Math.ceil(item.id/szel)-1)*szel)-1] == 0) {
            Rekurziv_felfedes(Math.ceil(item.id/szel)-1,(item.id-(Math.ceil(item.id/szel)-1)*szel)-1);}
        else if(matrix[Math.ceil(item.id/szel)-1][(item.id-(Math.ceil(item.id/szel)-1)*szel)-1] == -1){
            item.src = "img/talalt.png";item.zaszlo = 3;//Csak hogy ne írja át a vege
            document.getElementById("reset_img_disp").src="img/face_bum.png";
            //"img/"+matrix[Math.ceil(item.id/szel)-1][(item.id-(Math.ceil(item.id/szel)-1)*szel)-1]+".png";
            ingame = false;
            Vege(false);}
        else{
            bejart.push(item.id);
            item.src = "img/"+matrix[Math.ceil(item.id/szel)-1][(item.id-(Math.ceil(item.id/szel)-1)*szel)-1]+".png";item.zaszlo = 2;}
        if (bejart.length == (szel*mag)-bomba) {
            document.getElementById("reset_img_disp").src="img/nyert.png";
            setTimeout(Vege(true),100);
        }
    }
}
function Reset(){
    ingame = false;
    div_head.innerHTML = "";div.innerHTML = "";
    div.style.display = "none";
}
function Vege(win){
    clearInterval(timer);
    ingame = false;
    for (let index = 0; index < lerakottbombak.length; index++) {
        var item = document.getElementById(lerakottbombak[index]);
        if(item.zaszlo!=3)
        {
            item.src = "img/-1.png";item.zaszlo = 2;
        }
    }
    if (win) {
        alert("Nyertél! Idő: "+elapsedTime+" másodperc!");
    }else{
        alert("Vesztettél! Idő: "+elapsedTime+" másodperc!");
    }

}
function Load(){
    if (ingame == false && document.getElementById("bombaBe").value+document.getElementById("magBe").value+document.getElementById("szelBe").value > 0 ) {  
        clearInterval(timer);timer = null;elapsedTime = 0;
        div_head.innerHTML = "";div.innerHTML = "";matrix = [];lerakottbombak = [];bejart = [];  
        bomba = document.getElementById("bombaBe").value;mag = document.getElementById("magBe").value;szel = document.getElementById("szelBe").value; 
        ingame = true;
        document.getElementById("main").style.maxWidth = ((25*szel)+16)+"px";
        main_head_gen(),tabla_gen();matrix1();
        div.style.display = "block";
    }
}
menu_gen();