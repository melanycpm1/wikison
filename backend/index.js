const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const cors = require('cors')
const ROOT_FOLDER = 'dist'
require("dotenv").config();

app.use(express.static(path.join(__dirname, ROOT_FOLDER)))
app.use(cors())

const admin = require("firebase-admin");
const serviceAccountPath = process.env.SERVICE_ACCOUNT_PATH;

const serviceAccount = require("./" + serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIRESTORE_DB
});

const { getFirestore } = require("firebase-admin/firestore");
const db = getFirestore();

async function syncData() {
  try {
    const res = await fetch('https://api.npoint.io/9526d6d18453d5256fcd');
    const data = await res.json();

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

syncData();
/*app.get('/', (req, res) => {
    res.send('Hello World!')
})*/


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

