import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getFirestore , collection, addDoc ,getDocs,doc,query, orderBy,} from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js'
const firebaseConfig = {
  apiKey: "AIzaSyBC8Q-y7I55ktm7xh_Jk5XeugXFNi1zSP0",authDomain: "aknakereso-c11ac.firebaseapp.com",projectId: "aknakereso-c11ac",storageBucket: "aknakereso-c11ac.appspot.com",messagingSenderId: "670407313761",appId: "1:670407313761:web:90d809efba4f60d363dd20"
};
const db = getFirestore(initializeApp(firebaseConfig));var saveddata;
async function save_data(){
    var mode = document.getElementById("nehezseg_span_kivalasztott").innerText;var name = document.getElementById("name").value;
    const docRef = await addDoc(collection(db, mode), {
        name:name,ido:parseInt(document.getElementById("time_disp").innerText)+1,mode:mode
    });
    document.getElementById("leaderboardsave").style.display = "none";saveddata = docRef.id;get_data(mode);
}
async function get_data(mode){
    document.getElementById("db_data").innerHTML = mode+":";const data = await getDocs(query(collection(db, mode), orderBy("ido", "asc")));var i = 0;var table = document.createElement("table");
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
            document.getElementById("boardload").innerHTML += "<span id ='flag'>"+i +", Név: "+doc.data().name+" | Idő: "+doc.data().ido+" sec</span>";
        }else{
            td1.innerText = i;td2.innerText = doc.data().name;td3.innerText = doc.data().ido+" sec";
        }
        tr.appendChild(td1);tr.appendChild(td2);tr.appendChild(td3);table.appendChild(tr);
    });
}
document.getElementById("save").addEventListener("click",() => save_data());document.getElementById("load_k").addEventListener("click",() => get_data("Könnyű"));document.getElementById("load_h").addEventListener("click",() => get_data("Haladó"));document.getElementById("load_n").addEventListener("click",() => get_data("Nehéz"));  
