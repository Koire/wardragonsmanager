import { h, app, text } from "hyperapp"

import { timezones } from "./js/timezones.js"
import { div, option, h1, button, select, main } from "./js/htmlTags.js"
import { chooseTZ, toggleCreator } from "./js/actions.js"
import { swapModal } from "./js/swapModal.js"
import { DisplayTable } from "./js/displayTable.js"
import firebase from "firebase/app"
import "firebase/auth"
import "firebase/database"

firebase.initializeApp({
    apiKey: "AIzaSyDdlLUl0dHsJIq4SIrRPzsoWwkdxZngEO4",
    authDomain: "vaiarmorguiiswd.firebaseapp.com",
    databaseURL: "https://vaiarmorguiiswd-default-rtdb.firebaseio.com",
    projectId: "vaiarmorguiiswd",
    storageBucket: "vaiarmorguiiswd.appspot.com",
    messagingSenderId: "238764970977",
    appId: "1:238764970977:web:b65db78f8da13f333ff8a0",
})
firebase.auth().signInWithEmailAndPassword("pikewb@gmail.com", "passwords").then(console.log).catch(console.error)
const database = firebase.database()
fetch("https://vaiarmorghuiis.netlify.app/.netlify/loginUser").then(console.log)
//database.auth().DisplayTable()

const initialState = {
    timezones,
    chosenTZ: [],
    guardSwaps: [],
    isCreating: false,
    currentCG: "",
    currentAmount: 0,
    currentLevel: 1,
    firebase
}

app({
    init: initialState,
    view: (state) =>
        main([
            h1(text("Welcome to the GuardSwap creator")),
            div([
                state.isCreating && swapModal(state),
                div([
                    button({ onclick: toggleCreator }, text("add swap")),
                    select(
                        { onchange: chooseTZ },
                        timezones.map((element) => option(text(element)))
                    ),
                ]),
                state.guardSwaps.length > 0 && DisplayTable(state),
            ]),
        ]),
    node: document.getElementById("app"),
})
