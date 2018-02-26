const express = require('express')
const mongoose = require('mongoose')
const app = express()

mongoose.Promise = global.Promise;

const {PORT, DATABASE_URL} = require('./config');

app.get('/', (req, res) => {
  res.send('Got it.')
})

let server;

function runServer(databaseUrl, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, {useMongoClient: true}, err => {
      if (err) {
        return reject(err)
      }

      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`)
        resolve()
      })
      .on('error', err => {
        mongoose.disconnect()
        reject(err)
      })
    })
  })
}

// `closeServer` function is here in original code

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err))
}
