import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getFirestore , collection, addDoc ,getDocs,getDoc,limit,query, orderBy,doc} from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js';
var debug = false; //Ha nem akarjuk hogy debug közbe lefusson
var avalible = true;
function is_avalible(){
    avalible = true;
}
const firebaseConfig = {
    apiKey: "AIzaSyC1AsGRlZlrBumLASvUPSc1odFT5qYVk24",
    authDomain: "aknakereso-a0e01.firebaseapp.com",
    projectId: "aknakereso-a0e01",
    storageBucket: "aknakereso-a0e01.appspot.com",
    messagingSenderId: "507391259846",
    appId: "1:507391259846:web:d8b8510a0abeaffc5e13c7"
};
const db = getFirestore(initializeApp(firebaseConfig));
async function save_data(){
    var name = document.getElementById("name").value;
    if (name.length >2) { 
        var currentdate = new Date(); 
        var datetime = currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear();
      
        var mode = document.getElementById("game").className;
        const docRef = await addDoc(collection(db, mode), {
            name:name,ido:parseInt(document.getElementById("time_disp").innerText),mode:mode,date:datetime
        });
        document.getElementById("leaderboardsave").style.display = "none";
        alert("Sikeresen elmentettük az eredményed!")
    }else{
        alert("Adjon meg felhasználónevet!");
    }
}
async function get_data(mode){  
    if (avalible) {    
        document.getElementById("db_data").innerHTML = mode+":";const data = await getDocs(query(collection(db, mode), orderBy("ido", "asc"),limit(50)));var i = 0;var table = document.createElement("table");
        document.getElementById("db_data").appendChild(table);
        var tr = document.createElement("tr");var td1 = document.createElement("td");var td2 = document.createElement("td");var td3 = document.createElement("td");var td4 = document.createElement("td");table.id="leaderboardtable";
        td1.style.fontSize ="25px";td2.style.fontSize ="25px";td3.style.fontSize ="25px";td4.style.fontSize ="25px";
        td1.innerText = "👑";td2.innerText = "🪪";td3.innerText = "⏱️";td4.innerText = "🗓️";
        tr.appendChild(td1);tr.appendChild(td2);tr.appendChild(td3);tr.appendChild(td4);
        table.appendChild(tr);
        data.forEach((doc) => {
            i++;
            var tr = document.createElement("tr");var td1 = document.createElement("td");var td2 = document.createElement("td");var td3 = document.createElement("td");var td4 = document.createElement("td");
            td1.innerText = i;td2.innerText = doc.data().name;td3.innerText = doc.data().ido+" sec";td4.innerText = doc.data().date;
            tr.appendChild(td1);tr.appendChild(td2);tr.appendChild(td3);tr.appendChild(td4);table.appendChild(tr);
        });
        avalible = false;
        setTimeout(is_avalible,1000);
    }else{
        alert("Várj 1 másodpercet!")
    }
}
if(!debug)
{
    document.getElementById("save").addEventListener("click",() => save_data());document.getElementById("load_k").addEventListener("click",() => get_data("Könnyű"));document.getElementById("load_h").addEventListener("click",() => get_data("Haladó"));document.getElementById("load_n").addEventListener("click",() => get_data("Nehéz"));  
}