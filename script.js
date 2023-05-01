var div = document.createElement("div");div.id = "main";var menu = document.createElement("div");menu.id = "menu";var almenu = document.createElement("div");almenu.id = "almenu";var div_head = document.createElement("div");div_head.id = "main_head";
document.body.appendChild(menu);document.body.appendChild(almenu);document.body.appendChild(div);div.style.display = "none";
var lerakottbombak = [];var matrix = [];var bomba;var mag;var szel;var bejart = [];var ingame = false;var timer;var elapsedTime; var zaszlok = [];var loaded = 0;
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
}
function gomb_kivalasztas(elem)
{
    if(ingame == false && document.getElementById("leaderboardsave").style.display =="none"){
        /*let nehezseg_divGyerekek = document.getElementById("nehezseg_div").childNodes;
        for(let i = 0; i<nehezseg_divGyerekek.length;i++)
        {      
            nehezseg_divGyerekek[i].className ="";
        }
        elem.className+="gomb_kivalasztva";*/
        let nehezseg_span_kivalasztott = document.getElementById("nehezseg_span_kivalasztott");
        nehezseg_span_kivalasztott.innerText = elem.innerText;
        let parameter_divGyerekek = document.getElementById("parameter_div").childNodes;
        if(elem.id=="egyeniGomb")
        {
            parameter_divGyerekek[0].value=null;parameter_divGyerekek[1].value=null;parameter_divGyerekek[2].value=null;
            document.getElementById("bombaBe").style.display="block";document.getElementById("magBe").style.display="block";document.getElementById("szelBe").style.display="block";}
        else
        {
            document.getElementById("bombaBe").style.display="none";document.getElementById("magBe").style.display="none";document.getElementById("szelBe").style.display="none";
            
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
    let menu_start_div = document.createElement("div"); menu_start_div.id = "menu_start_div";
    let boardopen = document.createElement("span");boardopen.innerText="Leaderboard";boardopen.id="boardopen";boardopen.setAttribute("onclick","Open_Close()"); document.body.appendChild(boardopen);
    menu.appendChild(boardopen);
    menu.appendChild(menu_start_div);
    let nehezseg_span = document.createElement("span");
    nehezseg_span.innerText="Nehézség";
    nehezseg_span.id="nehezseg_span";
    menu_start_div.appendChild(nehezseg_span);

    let nehezseg_span_kivalasztott = document.createElement("span");
    nehezseg_span_kivalasztott.id="nehezseg_span_kivalasztott";
    menu_start_div.appendChild(nehezseg_span_kivalasztott);

    let nehezseg_div_dropdown = document.createElement("div");
    nehezseg_div_dropdown.id="nehezseg_div_dropdown";
    nehezseg_span.appendChild(nehezseg_div_dropdown);

    let startGomb = document.createElement("button");
    startGomb.id="startGomb";
    startGomb.innerText="Indítás";
    startGomb.setAttribute("onclick","Load()");
    startGomb.setAttribute("disabled","true");
    menu_start_div.appendChild(startGomb);

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
    haladoGomb.dataset.bomba=50;
    nehezseg_div_dropdown.appendChild(haladoGomb);

    let nehezGomb = document.createElement("button");
    nehezGomb.id="nehezGomb";
    nehezGomb.innerText="Nehéz";
    nehezGomb.setAttribute("onClick","gomb_kivalasztas(this)");
    nehezGomb.dataset.mag=40;
    nehezGomb.dataset.szel=40;
    nehezGomb.dataset.bomba=100;
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
//Zaszlo ertekek: 0 fedett, 1 zaszlo, 2 kerdojel, 3 felfedve, 4 legutolso bomba amire ra nyomtál
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
                if(ingame == true && this.zaszlo != 3)
                {
                    if(this.zaszlo == null || this.zaszlo == 0){
                        zaszlok.push(this.id);
                        this.zaszlo = 1;this.src = "img/zaszlo.png";document.getElementById('bomba_disp').innerText = (bomba-zaszlok.length).toString().padStart(3, '0');}
                    else if(this.zaszlo == null || this.zaszlo == 1){
                        zaszlok.splice(zaszlok.indexOf(this.id),1);
                        this.zaszlo = 2;this.src = "img/kerdo.png";document.getElementById('bomba_disp').innerText = (bomba-zaszlok.length).toString().padStart(3, '0');}
                    else if(this.zaszlo == null || this.zaszlo == 2 )
                    {
                        this.zaszlo = 0;this.src = "img/fedett.png";
                    }
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
function Rekurziv_felfedes(x,y,z){
    if (bejart.length == (szel*mag)-bomba) {
        document.getElementById("reset_img_disp").src="img/nyert.png";
        setTimeout(Vege(true),100)}
    if (matrix[x][y] != -1) {
        var item = document.getElementById((x*szel)+y+1);
        if(item.zaszlo==1){  
            z++;
            bejart.splice(bejart.indexOf((x*szel)+y),1);
        }else
        {
            item.src = "img/"+matrix[x][y]+".png";
            item.zaszlo = 3;
        }
        if (z > 1) {
            return;
        }
        if (matrix[x][y]>0) {
            return;}
        if (x-1 >= 0 && bejart.includes(((x-1)*szel)+y) == false) {
            bejart.push(((x-1)*szel)+y);
            setTimeout(Rekurziv_felfedes,10,x-1,y,z);}
        if (x+1 < mag && bejart.includes(((x+1)*szel)+y) == false) {
            bejart.push(((x+1)*szel)+y);
            setTimeout(Rekurziv_felfedes,10,x+1,y,z);}
        if (y-1 >= 0 && bejart.includes((x*szel)+y-1) == false) {
            bejart.push((x*szel)+y-1);
            setTimeout(Rekurziv_felfedes,10,x,y-1,z);}
        if (y+1 < szel && bejart.includes((x*szel)+y+1) == false) {
            bejart.push((x*szel)+y+1);
            setTimeout(Rekurziv_felfedes,10,x,y+1,z);}
        if (x-1 >= 0 && y-1 >= 0 && bejart.includes(((x-1)*szel)+y-1) == false) {
            bejart.push(((x-1)*szel)+y-1);
            setTimeout(Rekurziv_felfedes,5,x-1,y-1,z);}
        if (x+1 < mag && y-1 >= 0 && bejart.includes(((x+1)*szel)+y-1) == false) {
            bejart.push(((x+1)*szel)+y-1);
            setTimeout(Rekurziv_felfedes,5,x+1,y-1,z);}
        if (x+1 < mag && y+1 < szel && bejart.includes(((x+1)*szel)+y+1) == false) {
            bejart.push(((x+1)*szel)+y+1);
            setTimeout(Rekurziv_felfedes,5,x+1,y+1,z);}
        if (x-1 >= 0 && y+1 < szel && bejart.includes(((x-1)*szel)+y+1) == false) {
            bejart.push(((x-1)*szel)+y+1);
            setTimeout(Rekurziv_felfedes,5,x-1,y+1,z);} 
    }
}
function felfedes(item){
    if (timer == null) setTimer();
    if (ingame == true && item.zaszlo!=1) {
        if (matrix[Math.ceil(item.id/szel)-1][(item.id-(Math.ceil(item.id/szel)-1)*szel)-1] == 0) {
            Rekurziv_felfedes(Math.ceil(item.id/szel)-1,(item.id-(Math.ceil(item.id/szel)-1)*szel)-1,0);}
        else if(matrix[Math.ceil(item.id/szel)-1][(item.id-(Math.ceil(item.id/szel)-1)*szel)-1] == -1){
            item.src = "img/talalt.png";item.zaszlo = 4;//Csak hogy ne írja át a vege
            document.getElementById("reset_img_disp").src="img/face_bum.png";
            //"img/"+matrix[Math.ceil(item.id/szel)-1][(item.id-(Math.ceil(item.id/szel)-1)*szel)-1]+".png";
            ingame = false;
            Vege(false);}
        else{
            bejart.push(item.id);
            item.src = "img/"+matrix[Math.ceil(item.id/szel)-1][(item.id-(Math.ceil(item.id/szel)-1)*szel)-1]+".png";item.zaszlo = 3;}
        if (bejart.length == (szel*mag)-bomba) {
            document.getElementById("reset_img_disp").src="img/nyert.png";
            setTimeout(Vege(true),100);
        }
    }
}

function Vege(win){
    clearInterval(timer);
    ingame = false;
    for (let index = 0; index < zaszlok.length; index++) {
        document.getElementById(zaszlok[index]).src = "img/hamis.png";
    }
    for (let index = 0; index < lerakottbombak.length; index++) {
        var item = document.getElementById(lerakottbombak[index]);
        if(item.zaszlo==4)
        {
            item.src = "img/talalt.png";item.zaszlo = 3;
        }
        else if(item.zaszlo!=3)
        {
            item.src = "img/-1.png";item.zaszlo = 3;
        }
    }
    if (win) {
        //alert("Nyertél! Idő: "+elapsedTime+" másodperc!");
        canvasMod(win);
    }else{
        //alert("Vesztettél! Idő: "+elapsedTime+" másodperc!");
        canvasMod(win);
    }

}
function canvasMod(vegStatusz)
{
    let offcanvas = document.getElementsByClassName("offcanvas")[0];
    var offcanvasTitle = document.getElementById("offcanvasLabel1");
    let offcanvasBody = document.getElementsByClassName("offcanvas-body")[0];
    let offcanvasP = document.getElementById("offcanvas_body-p");
    offcanvas.className = "offcanvas show offcanvas-start"
    if(vegStatusz ==true)
    {
        offcanvasTitle.innerText = "Nyertél!";
        offcanvasP.innerText ="Idő: "+parseInt(document.getElementById("time_disp").innerText)+" másodperc!";
        if (document.getElementById("nehezseg_span_kivalasztott").innerText != "Egyéni") {
            document.getElementById("leaderboardsave").style.display ="block";
        }
    }
    else
    {
        offcanvasTitle.innerText = "Vesztettél!";
        document.getElementById("leaderboardsave").style.display ="none";
    }
    if(offcanvas.className =="offcanvas offcanvas-start")
    {
        offcanvas.className ="offcanvas show  offcanvas-start"
    }
}
function Open_Close(){
    var offcanvas = document.getElementsByClassName("offcanvas")[0];
    if(offcanvas.className =="offcanvas show offcanvas-start")
    {
        offcanvas.className ="offcanvas offcanvas-start"
    }else{
        offcanvas.className ="offcanvas show offcanvas-start"
    }
}
function canvasGen()
{
    const target = document.querySelector('#script');
    var board = document.createElement("div");board.id = "board";
    board.innerHTML = 
    ""+
    "<div class='offcanvas offcanvas-start' tabindex='-1' id='offcanvas' aria-labelledby='offcanvasLabel'>"+
        "<div class='offcanvas-header'>"+
            "<h5 class='offcanvas-title' id='offcanvasLabel'>LEADERBOARD</h5>"+
            "<button type='button' class='btn-close' data-bs-dismiss='offcanvas' onclick='Open_Close()'></button>"+
        "</div>"+
        "<h5 class='offcanvas-title' id='offcanvasLabel1'></h5>"+
        "<div id='leaderboardsave' class='offcanvas-body'>"+
            "<p id='offcanvas_body-p'></p>"+
            "<input id='name' minlength='3' maxlength='15' placeholder='Felhasználónév' type='Text'>"+
            "<button type='button' data-bs-dismiss='offcanvas' id='save'>Mentés</button>"+
        "</div>"+
        "<div id='boardload' class='offcanvas-body'>"+
            "<p id='offcanvas_body-p'>Válassza ki melyik táblát szeretné betőlteni!</p>"+
            "<button type='button' data-bs-dismiss='offcanvas' id='load_k'>Könnyű</button>"+
            "<button type='button' data-bs-dismiss='offcanvas' id='load_h'>Haladó</button>"+
            "<button type='button' data-bs-dismiss='offcanvas' id='load_n'>Nehéz</button>"+
            "<div id='db_data'></div>"
        "</div>"+
    "</div>";
    target.parentNode.insertBefore(board, target) ;
    document.getElementById("leaderboardsave").style.display ="none";
}
function Reset(){
    loaded = 0;
    document.getElementById("offcanvasLabel1").innerText="";
    document.getElementById("leaderboardsave").style.display ="none";
    clearInterval(timer);timer = null;elapsedTime = 0;
    div_head.innerHTML = "";div.innerHTML = "";matrix = [];lerakottbombak = [];bejart = [];zaszlok = []; 
    ingame = false;
    div_head.innerHTML = "";div.innerHTML = "";
    let offcanvas = document.getElementsByClassName("offcanvas")[0];
    div.style.display = "none";
}
function Load(){
    if (ingame == false && document.getElementById("bombaBe").value+document.getElementById("magBe").value+document.getElementById("szelBe").value > 0 ) {  
        Reset();
        bomba = document.getElementById("bombaBe").value;mag = document.getElementById("magBe").value;szel = document.getElementById("szelBe").value; 
        document.getElementById("main").style.maxWidth = ((25*szel)+16)+"px";
        main_head_gen(),tabla_gen();matrix1();
        document.getElementById('bomba_disp').innerText = bomba.toString().padStart(3, '0');
        div.style.display = "block";        
        ingame = true;
        loaded = 1;
    }
}
menu_gen();canvasGen();