import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getFirestore , collection, addDoc ,getDocs,limit,query, orderBy,} from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js';
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
const db = getFirestore(initializeApp(firebaseConfig));var saveddata;
async function save_data(){
    if (avalible) {
        var mode = document.getElementById("nehezseg_span_kivalasztott").innerText;var name = document.getElementById("name").value;
        const docRef = await addDoc(collection(db, mode), {
            name:name,ido:parseInt(document.getElementById("time_disp").innerText)+1,mode:mode
        });
        document.getElementById("leaderboardsave").style.display = "none";saveddata = docRef.id;
        get_data(mode);
        avalible = false;
        setTimeout(is_avalible,10000);
    }
}
async function get_data(mode){  
    if (avalible) {    
        document.getElementById("db_data").innerHTML = mode+":";const data = await getDocs(query(collection(db, mode), orderBy("ido", "asc"),limit(10)));var i = 0;var table = document.createElement("table");
        document.getElementById("db_data").appendChild(table);
        var tr = document.createElement("tr");var td1 = document.createElement("td");var td2 = document.createElement("td");var td3 = document.createElement("td");table.id="leaderboardtable";
        td1.innerText = "RANK";td2.innerText = "NÉV";td3.innerText = "IDŐ";
        tr.appendChild(td1);tr.appendChild(td2);tr.appendChild(td3);
        table.appendChild(tr);
        data.forEach((doc) => {
            i++;
            var tr = document.createElement("tr");var td1 = document.createElement("td");var td2 = document.createElement("td");var td3 = document.createElement("td");
            if (doc.id == saveddata) {
                td1.innerText = i;td2.innerText = doc.data().name;td3.innerText = doc.data().ido+" sec";tr.id ="flag";
                document.getElementById("boardload").innerHTML += "<span id ='flag'>"+", Név: "+doc.data().name+" | Idő: "+doc.data().ido+" sec</span>";
            }else{
                td1.innerText = i;td2.innerText = doc.data().name;td3.innerText = doc.data().ido+" sec";
            }
            tr.appendChild(td1);tr.appendChild(td2);tr.appendChild(td3);table.appendChild(tr);
        });
        avalible = false;
        setTimeout(is_avalible,10000);
    }

}
document.getElementById("save").addEventListener("click",() => save_data());document.getElementById("load_k").addEventListener("click",() => get_data("Könnyű"));document.getElementById("load_h").addEventListener("click",() => get_data("Haladó"));document.getElementById("load_n").addEventListener("click",() => get_data("Nehéz"));  
