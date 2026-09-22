// ===============================
// FIREBASE - TALENTUM SELECCIÓN
// ===============================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";


// CONFIGURACIÓN DE FIREBASE
const firebaseConfig = {
    apiKey: "AIzaSyDBZUcORhlBxaxQbDbHBcKAL4IgDcMvAzs",
    authDomain: "talentum-9f93b.firebaseapp.com",
    projectId: "talentum-9f93b",
    storageBucket: "talentum-9f93b.firebasestorage.app",
    messagingSenderId: "173451413925",
    appId: "1:173451413925:web:409f7fff48e987a0fe804c",
    measurementId: "G-V7G1CM4CQF"
};


// INICIALIZAR FIREBASE
const app = initializeApp(firebaseConfig);


// INICIALIZAR FIRESTORE
const db = getFirestore(app);


// EXPORTAR BASE DE DATOS
export { db };