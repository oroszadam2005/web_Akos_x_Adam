var div = document.createElement("div");div.id = "main";var menu = document.createElement("div");menu.id = "menu";var almenu = document.createElement("div");almenu.id = "almenu";var div_head = document.createElement("div");div_head.id = "main_head";
document.body.appendChild(menu);document.body.appendChild(almenu);document.body.appendChild(div);div.style.display = "none";
var lerakottbombak = [];var matrix = [];var bomba;var mag;var szel;var bejart = 0;var ingame = false;var timer;var elapsedTime; var zaszlok = [];var loaded = 0;
function setTimer () {
    timer = setInterval(function(){
      elapsedTime += 1;
      document.getElementById('time_disp').innerText = elapsedTime.toString().padStart(3, '0');
    }, 1000);
}
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
    let nehezseg_span_kivalasztott = document.getElementById("nehezseg_span_kivalasztott");
    nehezseg_span_kivalasztott.innerText = elem.innerText;
    let parameter_divGyerekek = document.getElementById("parameter_div").childNodes;
    if(elem.id=="egyeniGomb")
    {
        parameter_divGyerekek[0].value=null;parameter_divGyerekek[1].value=null;parameter_divGyerekek[2].value=null;
        document.getElementById("bombaBe").style.display="block";document.getElementById("magBe").style.display="block";document.getElementById("szelBe").style.display="block";
    }
    else
    {
        document.getElementById("bombaBe").style.display="none";document.getElementById("magBe").style.display="none";document.getElementById("szelBe").style.display="none";
        for(let i = 0; i<parameter_divGyerekek.length;i++)
        {      
            parameter_divGyerekek[i].style.display="none";
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
        }
    }
    let start = document.getElementById("startGomb")
    if(start.disabled == true)
    {
        start.disabled = false
    }
}
function menu_gen(){
    let menu_start_div = document.createElement("div"); menu_start_div.id = "menu_start_div";
    let boardopen = document.createElement("span");boardopen.innerText="Leaderboard";boardopen.id="boardopen";boardopen.setAttribute("onclick","Open_Close('leaderboard')"); document.body.appendChild(boardopen);
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
    let szabalyGomb = document.createElement("span");szabalyGomb.innerText="Aknakeresőről";szabalyGomb.id="info";szabalyGomb.setAttribute("onclick","Open_Close('szabaly')"); document.body.appendChild(szabalyGomb);
    menu.appendChild(szabalyGomb);
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
    haladoGomb.dataset.mag=16;
    haladoGomb.dataset.szel=16;
    haladoGomb.dataset.bomba=40;
    nehezseg_div_dropdown.appendChild(haladoGomb);
    let nehezGomb = document.createElement("button");
    nehezGomb.id="nehezGomb";
    nehezGomb.innerText="Nehéz";
    nehezGomb.setAttribute("onClick","gomb_kivalasztas(this)");
    nehezGomb.dataset.mag=16;
    nehezGomb.dataset.szel=30;
    nehezGomb.dataset.bomba=99;
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
    szelBe.style.display="none";
    parameter_div.appendChild(szelBe);
    let magBe = document.createElement("input");
    magBe.setAttribute("type","number");
    magBe.setAttribute("min","9");
    magBe.setAttribute("placeholder","Magasság");
    magBe.id="magBe";
    magBe.setAttribute("onKeyDown","return false");
    magBe.style.display="none";
    parameter_div.appendChild(magBe);
    let bombaBe = document.createElement("input");
    bombaBe.setAttribute("type","number");
    bombaBe.setAttribute("min","9");
    bombaBe.setAttribute("placeholder","Akna");
    bombaBe.id="bombaBe";
    bombaBe.setAttribute("onKeyDown","return false");
    bombaBe.style.display="none";
    parameter_div.appendChild(bombaBe);
}
var lenyomvaBal = false;
var lenyomvaJobb = false;
var utolsoLenyomott;
function x_ray(item,src){
    var x = Math.ceil(item.id/szel)-1
    var y = (item.id-(Math.ceil(item.id/szel)-1)*szel)-1
    for (let i=-1; i<=1; i++) {
        for (let j=-1; j<=1; j++) {
            if (x+i >= 0 && x+i < Number(mag) && y+j >= 0 && y+j < Number(szel)) {
                if(!document.getElementById(((x+i)*szel)+(y+j)+1).felfedett&&document.getElementById(((x+i)*szel)+(y+j)+1).zaszlo != 1){
                    document.getElementById(((x+i)*szel)+(y+j)+1).src = src;
                }
            }
        }    
    }
}
function gyors_felfedes(item){
    var x = Math.ceil(item.id/szel)-1
    var y = (item.id-(Math.ceil(item.id/szel)-1)*szel)-1
    if (item.felfedett && matrix[x][y] != 0) {       
        var szam = matrix[x][y];
        var zaszlo = 0;
        for (let i=-1; i<=1; i++) {
            for (let j=-1; j<=1; j++) {
                if (x+i >= 0 && x+i < Number(mag) && y+j >= 0 && y+j < Number(szel) && !(i==0 && j==0)) {
                    if (szam > 0 && document.getElementById(((x+i)*szel)+(y+j)+1).zaszlo == 1) {
                        zaszlo++;
                    }
                }
            }    
        }
        if (szam == zaszlo) {
            for (let i=-1; i<=1; i++) {
                for (let j=-1; j<=1; j++) {
                    if (x+i >= 0 && x+i < Number(mag) && y+j >= 0 && y+j < Number(szel) && !(i==0 && j==0) && document.getElementById(((x+i)*szel)+(y+j)+1).zaszlo != 1) {
                        var item = document.getElementById(((x+i)*szel)+y+j+1);
                        if(lerakottbombak.includes(Number(document.getElementById(((x+i)*szel)+(y+j)+1).id))){
                            item.src = "img/talalt.png";item.zaszlo = 4;
                            ingame = false;
                            Vege(false);
                        }else{
                            item.src = "img/"+matrix[x+i][y+j]+".png";
                            if (!item.felfedett) {
                                bejart++;
                            }
                            item.felfedett = true;
                        }
                    }
                }    
            }
        }
    }
}
document.addEventListener('mousemove', e => {
    utolsoLenyomott = document.elementFromPoint(e.clientX, e.clientY)
  }, {passive: true})
window.addEventListener("mouseup",function(ev){
    var ev = ev || window.event;
    if(ev.button == 0)
    {
        lenyomvaBal = false;
        if(lenyomvaJobb)
        {  
            x_ray(utolsoLenyomott,"img/fedett.png");
            gyors_felfedes(utolsoLenyomott);
        }
    }
    else if(ev.button == 2)
    {
        lenyomvaJobb = false;
        if(lenyomvaBal)
        {
            x_ray(utolsoLenyomott,"img/fedett.png");
            gyors_felfedes(utolsoLenyomott);
        }
    }
})
var clickanim = null;
function tabla_gen(){
    var table = document.createElement("table"); 
    table.id = "game";
    table.className = document.getElementById("nehezseg_span_kivalasztott").innerText;
    div.appendChild(table);
    for (let index = 0; index < mag; index++) {
        var tr = document.createElement("tr");var tmp = [];
        for (let index1 = 0; index1 < szel; index1++) {
            var td = document.createElement("td");
            var img = document.createElement("img");
            img.id = (index*szel)+index1+1;img.src = "img/fedett.png";img.setAttribute("onclick","felfedes(this)");
            img.dataset.felfedett = false;
            img.addEventListener('contextmenu', function(ev) {
                ev.preventDefault();
                return false;
            }, false);
            img.addEventListener("mousedown",function(ev){
                if(ev.button == 2) // Jobb
                {
                    if(ingame == true && !this.felfedett)
                    {
                        if(this.zaszlo == null || this.zaszlo == 0){
                            zaszlok.push(this.id);
                            this.zaszlo = 1;this.src = "img/zaszlo.png";
                            document.getElementById('bomba_disp').innerText = (bomba-zaszlok.length).toString().padStart(3, '0');}
                        else if(this.zaszlo == 1){
                            zaszlok.splice(zaszlok.indexOf(this.id),1);
                            this.zaszlo = 2;this.src = "img/kerdo.png";
                            document.getElementById('bomba_disp').innerText = (bomba-zaszlok.length).toString().padStart(3, '0');}
                        else if(this.zaszlo == null || this.zaszlo == 2 )
                        {
                            this.zaszlo = 0;this.src = "img/fedett.png";
                        }
                    }
                }
                if(ingame == true)
                {
                    var ev = ev || window.event;
                    if(ev.button == 0) // Bal
                    {  
                        lenyomvaBal = true;
                        if(lenyomvaJobb)
                        {
                            x_ray(utolsoLenyomott,"img/0.png");
                        }
                    }
                    else if(ev.button == 2) // Jobb
                    {
                        lenyomvaJobb = true;
                        if(lenyomvaBal)
                        {
                            x_ray(utolsoLenyomott,"img/0.png");
                        }
                    }
                }
                ev.preventDefault();
            })
            img.addEventListener("mouseenter",function(ev){
                if(ingame == true &&  lenyomvaJobb&&lenyomvaBal)
                {
                    x_ray(this,"img/0.png");
                }
                ev.preventDefault();
            })
            img.addEventListener("mouseleave",function(ev){
                if(ingame == true &&lenyomvaJobb&&lenyomvaBal)
                {
                    x_ray(this,"img/fedett.png");
                }
                ev.preventDefault();
            })
            td.appendChild(img);tr.appendChild(td);tmp.push(0);
        }
        matrix.push(tmp);table.appendChild(tr);
    }
}
function matrix1(){
    while(lerakottbombak.length != bomba){
        var rnd = Math.floor(Math.random()*(mag*szel)+1);
        if (!lerakottbombak.includes(rnd)) {
            lerakottbombak.push(rnd);
            var x = Math.ceil(rnd/szel)-1
            var y = (rnd-(Math.ceil(rnd/szel)-1)*szel)-1
            for (let i=-1; i<=1; i++) {
                for (let j=-1; j<=1; j++) {
                    if (x+i >= 0 && x+i < Number(mag) && y+j >= 0 && y+j < Number(szel) && !(i==0 && j==0)) {
                        matrix[x+i][y+j] ++;
                    }
                }    
            }
            matrix[Math.ceil(rnd/szel)-1][(rnd-(Math.ceil(rnd/szel)-1)*szel)-1]= -1;
        }
    }
}
function Rekurziv_felfedes(x,y){
    if (bejart == (szel*mag)-bomba) {
        setTimeout(Vege(true),100);
    }
    var item = document.getElementById((x*szel)+y+1);
    item.src = "img/"+matrix[x][y]+".png";
    if (!item.felfedett) {
        bejart++;
    }
    item.felfedett = true;
    if (matrix[x][y]==0)  {
        for (let i=-1; i<=1; i++) {
            for (let j=-1; j<=1; j++) {
                if (x+i >= 0 && x+i < Number(mag) && y+j >= 0 && y+j < Number(szel) && !(i==0 && j==0) && matrix[x+i][y+j] != -1 &&!document.getElementById(((x+i)*szel)+(y+j)+1).felfedett && document.getElementById(((x+i)*szel)+y+j+1).zaszlo !=1) {
                    Rekurziv_felfedes(x+i,y+j);
                }
            }    
        }
    }
}
function felfedes(item){
    if (timer == null) setTimer();
    if (ingame == true && item.zaszlo!=1) {
        if(lerakottbombak.includes(Number(item.id))){
            console.log("asd")
            item.src = "img/talalt.png";item.zaszlo = 4;
            ingame = false;
            Vege(false);
        }
        else if (!item.felfedett && matrix[Math.ceil(item.id/szel)-1][(item.id-(Math.ceil(item.id/szel)-1)*szel)-1] == 0 && !lerakottbombak.includes(item.id)) {
            Rekurziv_felfedes(Number(Math.ceil(item.id/szel)-1),Number((item.id-(Math.ceil(item.id/szel)-1)*szel)-1));
        }
        else{
            if (!item.felfedett) {
                bejart++;
                item.felfedett = true;
            }
            item.src = "img/"+matrix[Math.ceil(item.id/szel)-1][(item.id-(Math.ceil(item.id/szel)-1)*szel)-1]+".png";item.zaszlo = 3;
        }
        if (bejart == (szel*mag)-bomba) {
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
        document.getElementById("reset_img_disp").src="img/nyert.png";
        canvasMod(win);
    }else{
        document.getElementById("reset_img_disp").src="img/face_bum.png";
        canvasMod(win);
    }
}
function canvasMod(vegStatusz)
{
    let offcanvas = document.getElementsByClassName("offcanvas")[0];
    let offcanvasTitle = document.getElementById("offcanvasLabel1");
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
function offcanvasSzabaly(){
    let offcanvas = document.getElementsByClassName("offcanvas")[0];
    let offcanvasTitle = document.getElementById("offcanvasLabel1");
    let offcanvasHeader = document.getElementById("offcanvasLabel");
    let offcanvasBody = document.getElementsByClassName("offcanvas-body")[1];
    let offcanvasP = document.getElementById("offcanvas_body-p");
    offcanvasBody.innerHTML = "";
    offcanvasBody.innerHTML+="<p>Az aknakereső eredete egészen az 1960-as évekig nyúlik vissza. Az évek során rengeteg variációja készült, különböző operációs rendszerekre, különböző játékmenettel, mint például a Mined-Out (1983) ZX Spectrum-ra, vagy a Relentless Logic (1985) MS-DOS-ra. A játék talán legismertebb változata a Minesweeper, ami a Microsoft Windows operációs rendszerek részét képezte a Windows 3.1-től egészen a Windows 7-ig. (A legújabb változata innen letölthető.)"+
    "</p><br>"+
    "<p>Ez az aknakereső annak az online játszható másolata.</p>"+
    "<br>"+
    "<h5 class='offcanvas-title' id='offcanvasLabel2'>Szabályok</h5>"+
    "<br>"+
    "<p>Az akanakereső egy logikai játék, melynek célja megtisztítani a pályát a rejtett aknáktól anélkül, hogy felrobbanna valamelyik.</p>"+
    "<br>"+
    "<p>Megtalálni egy aknát úgy lehet, hogy rákattintunk egy mezőre az egér bal gombjával. Ha akna volt alatta, az felrobban és a játékot elvesztettük. Ha nem volt alatta akna, akkor egy szám jelenik meg, ami azt mutatja, hogy az adott mező küröl hány akna található – ez ugye, maximum 8 lehet. Ha egy akna sem található kürölötte, akkor föltárul az összes mellette lévő aknamentes rész is."+
    "</p><br>"+
    "<p>A játék lényege, hogy a megjelenő számokból kikövetkeztessük, hol lehet akna. Ha sejtésünk szerint valahol akna van, azt jelezhetjük magunknak a pályára letett zászlókkal (jobb egérgomb).</p>"+
    "<br>"+
    "<p>A játékot akkor nyertük meg, ha az összes aknamentes mezőre rákattintottunk.</p>"+
    "<br>"+
    "<p>Legjobb időd, Toplista</p>"
    "A legjobb idők menüpont alatt találod meg, hogy mennyi idő alatt sikerült megcsinálnsod a különböző nehézségű játékokat, azon a gépen, ahol éppen játszol. Az idők mellé bármilyen nevet beírhatsz, és bármikor törölheted őket (vagy báki más akivel együtt használod ezt a számítógépet)."+
    "<br>"+
    "<p>A Toplistára a bejelentkezett felhasználók kerülhetnek fel a legjobb eredményeikkel és a regisztrációkor megadott nevükkel.</p>"+
    "<br>"+
    "<p>Tehát a legjobb idők és a toplista eltérhet egymástól.</p>";
    offcanvasHeader.innerText = "Aknakereső";
    offcanvasTitle.innerText = "Tudnivalók";
    offcanvas.className+=" szelesebb";
}
function offcanvasLeader(){
    let offcanvas = document.getElementsByClassName("offcanvas")[0];
    let offcanvasTitle = document.getElementById("offcanvasLabel1");
    let offcanvasHeader = document.getElementById("offcanvasLabel");
    let offcanvasBody = document.getElementsByClassName("offcanvas-body")[1];
    offcanvasBody.innerHTML = "";
    offcanvasTitle.innerHTML = "";
    offcanvasHeader.innerHTML = "LEADERBOARD";
    offcanvasBody.innerHTML = "<p id='offcanvas_body-p'>Válassza ki melyik táblát szeretné betőlteni!</p>"+
    "<button type='button' data-bs-dismiss='offcanvas' id='load_k'>Könnyű</button>"+
    "<button type='button' data-bs-dismiss='offcanvas' id='load_h'>Haladó</button>"+
    "<button type='button' data-bs-dismiss='offcanvas' id='load_n'>Nehéz</button>"+
    "<div id='db_data'></div>";
    if(offcanvas.className.split.length>2)
    {
        offcanvas.className = "offcanvas offcanvas-start";
    }
}
function Open_Close(melyiket){
    var offcanvas = document.getElementsByClassName("offcanvas")[0];
    if(offcanvas.className.split(' ')[1] =="show")
    {
        offcanvas.className ="offcanvas offcanvas-start";
    }else{
        offcanvas.className ="offcanvas show offcanvas-start";
    }
    if(melyiket == "szabaly")
    {
        offcanvasSzabaly();
    }
    else if(melyiket == "leaderboard")
    {
        offcanvasLeader();
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
            "<button type='button' class='btn-close' data-bs-dismiss='offcanvas' onclick='Open_Close(&#39&#39)'></button>"+
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
    div_head.innerHTML = "";div.innerHTML = "";matrix = [];lerakottbombak = [];bejart = 0;zaszlok = []; 
    ingame = false;
    div_head.innerHTML = "";div.innerHTML = "";
    div.style.display = "none";
}
function Load(){
    if (document.getElementById("bombaBe").value+document.getElementById("magBe").value+document.getElementById("szelBe").value > 0 ) {  
        Reset();
        bomba = document.getElementById("bombaBe").value;mag = document.getElementById("magBe").value;szel = document.getElementById("szelBe").value; 
        document.getElementById("main").style.maxWidth = ((25*szel)+16)+"px";
        main_head_gen(),tabla_gen();matrix1();
        document.getElementById('bomba_disp').innerText = bomba.toString().padStart(3, '0');
        div.style.display = "block";        
        ingame = true;loaded = 1;
    }
}
menu_gen();canvasGen();