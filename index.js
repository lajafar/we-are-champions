import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-27cac-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsInDB = ref(database, "endorsements")

const endorsementListEl = document.getElementById("endorsement-list")
const inputFieldEl = document.getElementById("input-el")
const publishBtn = document.getElementById("publish-btn")

publishBtn.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(endorsementsInDB, inputValue)
    
    clearInputFieldEl()
})


onValue(endorsementsInDB, function(snapshot) {
    let endorsementArray = Object.values(snapshot.val())

    clearEndorsementListEl()

    for (let i = 0; i < endorsementArray.length; i++) {
        let currentItem = endorsementArray[i]

        appendItemToendorsementListEl(currentItem)
    }
})

function clearEndorsementListEl() {
    endorsementListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToendorsementListEl(item) {
    // let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = item
    
    endorsementListEl.append(newEl)
}
