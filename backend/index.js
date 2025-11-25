const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const cors = require('cors')
const fs = require('fs');
require("dotenv").config();


// Archivo donde guardaremos el JSON local
const DATA_FILE = path.join(__dirname, 'data.json');

// Carpeta donde está el build de Vite
const ROOT_FOLDER = 'dist';

// Middlewares
app.use(cors());
app.use(express.json());

// CONFIG FIREBASE ADMIN
const admin = require("firebase-admin");
const serviceAccountPath = process.env.SERVICE_ACCOUNT_PATH;

const serviceAccount = require("./" + serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIRESTORE_DB
});

//Obtenemos Firestore
const { getFirestore } = require("firebase-admin/firestore");
const db = getFirestore();

async function syncData() {
  try {
    const res = await fetch('https://api.npoint.io/0b93dfeea9f6f27cfd98');
    const data = await res.json();


    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    console.log('Datos guardados en JSON correctamente.')

    const personajesRef = db.collection('personajes');
    for (const p of data.personajes) {
      if (p.nombre && p.nombre.trim() !== "") {
        await personajesRef.doc(p.nombre).set(p);
      } else {
        console.log("Personaje sin nombre:", p);
      }
    }

    // Guardar lugares
    const lugaresRef = db.collection('lugares');
    for (const l of data.lugares) {
      if (l.nombre && l.nombre.trim() !== "") {
        await lugaresRef.doc(l.nombre).set(l);
      } else {
        console.log("Lugar sin nombre:", l);
      }
    }

    // Guardar temporadas
    const temporadasRef = db.collection('temporadas');
    for (const t of data.temporadas) {
      if (t.temporada != null && t.temporada.toString().trim() !== "") {
        await temporadasRef.doc(`Temporada_${t.temporada}`).set(t);
      } else {
        console.log("Temporada sin número:", t);
      }
    }

    // Guardar película
    if (data.pelicula && Object.keys(data.pelicula).length > 0) {
      const peliculaRef = db.collection('Peliculas').doc('principal');
      await peliculaRef.set(data.pelicula);
    } else {
      console.log("Película vacía:", data.pelicula);
    }

    // Guardar creadores
    if (data.creadores && Object.keys(data.creadores).length > 0) {
      const creadoresRef = db.collection('creadores').doc('principal');
      const c = data.creadores;

      await creadoresRef.set({
        creadorPrincipal: c.creadorPrincipal || {},
        historia: c.historia || "",
        curiosidades: c.curiosidades || [],
        premiosYReconocimientos: c.premiosYReconocimientos || []
      });
    } else {
      console.log("Creadores vacíos:", data.creadores);
    }

    console.log('Datos sincronizados en Firebase correctamente.');
  } catch (error) {
    console.error('Error sincronizando datos:', error);
  }
}

//  ENDPOINTS
function readJSON() {
  if (fs.existsSync(DATA_FILE)) {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  }
  return null;
}

app.get('/api/personajes', async (req, res) => {
  try {
    const jsonData = readJSON();
    if (jsonData?.personajes) return res.json(jsonData.personajes);

    // fallback a Firebase
    const snapshot = await db.collection('personajes').get();
    const personajes = snapshot.docs.map(doc => doc.data());
    res.json(personajes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/lugares', async (req, res) => {
  try {
    const jsonData = readJSON();
    if (jsonData?.lugares) return res.json(jsonData.lugares);

    const snapshot = await db.collection('lugares').get();
    const lugares = snapshot.docs.map(doc => doc.data());
    res.json(lugares);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/temporadas', async (req, res) => {
  try {
    const jsonData = readJSON();
    if (jsonData?.temporadas) return res.json(jsonData.temporadas);

    const snapshot = await db.collection('temporadas').get();
    const temporadas = snapshot.docs.map(doc => doc.data());
    res.json(temporadas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/peliculas', async (req, res) => {
  try {
    const jsonData = readJSON();
    if (jsonData?.pelicula) return res.json(jsonData.pelicula);

    const doc = await db.collection('peliculas').doc('principal').get();
    if (!doc.exists) return res.status(404).json({ error: "No hay película" });
    res.json(doc.data());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/creadores', async (req, res) => {
  try {
    const jsonData = readJSON();
    if (jsonData?.creadores) return res.json(jsonData.creadores);

    const doc = await db.collection('creadores').doc('principal').get();
    if (!doc.exists) return res.status(404).json({ error: "No hay creadores" });
    res.json(doc.data());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/personajes', async (req, res) => {
  try {
    const nuevo = req.body;

    // Validación simple
    if (!nuevo.nombre || !nuevo.rol || !nuevo.caracteristica || !nuevo.img) {
      return res.status(400).json({ error: "Todos los campos obligatorios deben completarse" });
    }

    // Leer JSON actual o inicializar
    let jsonData = readJSON() || {};
    if (!jsonData.personajes) jsonData.personajes = [];

    // Agregar al JSON
    jsonData.personajes.push(nuevo);
    fs.writeFileSync(DATA_FILE, JSON.stringify(jsonData, null, 2), 'utf-8');

    // Agregar a Firebase (genera doc automáticamente para evitar sobrescribir)
    const personajesRef = db.collection('personajes');
    await personajesRef.add(nuevo);

    // Respuesta
    res.json({ mensaje: "Personaje agregado correctamente", data: nuevo });

  } catch (error) {
    console.error("Error agregando personaje:", error);
    res.status(500).json({ error: "Error al agregar personaje" });
  }
});


// Static del frontend AL FINAL
//pp.use(express.static(path.join(__dirname, ROOT_FOLDER)))




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)

})

