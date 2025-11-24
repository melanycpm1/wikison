const express = require('express')
const app = express()
const port = 3000
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


app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})			

