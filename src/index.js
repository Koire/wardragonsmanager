import { h, app, text } from "hyperapp"

import { div, option, h1, button, select, main } from "./js/htmlTags.js"
import { chooseTZ, toggleCreator } from "./js/actions.js"
import { swapModal } from "./js/swapModal.js"
import { DisplayTable } from "./js/displayTable.js"
import { FunctionsURL } from "./constants"
import firebase from "firebase/app"
import "firebase/auth"
import "firebase/database"

firebase.initializeApp({
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
})

// const database = firebase.database().ref()
// var postListRef = firebase.database().ref('posts');
// var newPostRef = postListRef.push("something new");
// newPostRef.set({
//     "hoge":"fuga",
//     "users": [12,23,3,4,23,4]
// });
// database.on('value', snapshot => console.log(snapshot.val()))

//database.auth().DisplayTable()

const initialState = {
    chosenTZ: [Intl.DateTimeFormat().resolvedOptions().timeZone],
    guardSwaps: [],
    isCreating: true,
    currentCG: "",
    currentAmount: 0,
    currentLevel: 1,
}

app({
    init: () => [
        initialState,
        // [
        //     () =>
        //         fetch(`${FunctionsURL}/loginUser`)
        //             .then((res) => res.json())
        //             .then(console.log),
        // ],
        // [
        //     () =>
        //         firebase
        //             .auth()
        //             .signInWithEmailAndPassword("pikewb@gmail.com", "passwords")
        //             .then(console.log)
        //             .catch(console.error),
        // ],
    ],
    view: (state) =>
        main([
            // LoginWithWD(state),
            h1(text("Welcome to the GuardSwap creator")),
            div([
                state.isCreating && swapModal(state),
                div([button({ onclick: toggleCreator }, text("add swap"))]),
                state.guardSwaps.length > 0 && DisplayTable(state),
            ]),
        ]),
    node: document.getElementById("app"),
})
