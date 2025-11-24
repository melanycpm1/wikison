const express = require('express')
const app = express()
const port = 3000
const ROOT_FOLDER = 'dist'
app.use(cors())
app.use(express.static(path.join(__dirname, ROOT_FOLDER)))


app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})			

