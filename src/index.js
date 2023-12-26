console.log("index me")

import {initializeApp} from "firebase/app";

import {
    getFirestore , collection , onSnapshot,
    addDoc, deleteDoc, doc,
    query, where
} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBSm6ANEzbHF_fqCX4C-Odohf1ZP1NqTrM",
    authDomain: "fir-project1-3f8b8.firebaseapp.com",
    projectId: "fir-project1-3f8b8",
    storageBucket: "fir-project1-3f8b8.appspot.com",
    messagingSenderId: "403813390999",
    appId: "1:403813390999:web:dfc80a7bf04943d62667d2"
};

// initialize firebase app

initializeApp(firebaseConfig)

//init services

const db = getFirestore()

// collection ref

const colRef = collection(db, 'books')

// queries 

const q = query(colRef, where("author", "==", "Femi Opebiyi"))

// real time collection data




    onSnapshot(q, (snapshot)=>{
        let books = []

        snapshot.docs.forEach((doc)=>{
            books.push({...doc.data(), id: doc.id})
        })

        console.log(books)
    })


    // adding docs
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault()

    addDoc(colRef, {
        name: addBookForm.title.value,
        author: addBookForm.author.value
    })
    .then(()=>{
        addBookForm.reset()
    })

})

// deleting docs

const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const docRef = doc(db, 'books', deleteBookForm.id.value)

    deleteDoc(docRef)
        .then(()=>{
            deleteBookForm.reset()
        })

})