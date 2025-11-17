// Importa las funciones necesarias del SDK
const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc,
    query,     // Para construir la consulta
  where,     // Para añadir condiciones de filtro
  getDocs    // Para ejecutar la consulta }
 } = require('firebase/firestore');
// 1. Tu objeto de configuración
const firebaseConfig = {
  apiKey:   "AIzaSyDiXZJ4ziUG3NmyZPnn9AKxw9YAgyQU9uQ",
  authDomain: "votacionpeliculas.firebaseapp.com",
  projectId: "votacionpeliculas",
  storageBucket: "votacionpeliculas.firebasestorage.app",
  messagingSenderId: "112271626774",
  appId: "1:112271626774:web:584a8e10c2238a516c9b37"
};

// 2. Inicializa la aplicación de Firebase
const app = initializeApp(firebaseConfig);

// 3. Inicializa el servicio de base de datos
const db = getFirestore(app); 

// 4. Exporta la base de datos para usarla en otras partes de tu aplicación
module.exports = {db, addDoc, collection, query, where, getDocs };
