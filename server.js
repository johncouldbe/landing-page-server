const express = require('express')
const mongoose = require('mongoose')
const app = express()
const { SignUp } = require('./signup')

mongoose.Promise = global.Promise;

const {PORT, DATABASE_URL} = require('./config');

app.post('/', (req, res) => {
  SignUp
    .create({
      email: req.body.email,
      })
    .then(() => res.status(200))
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    });
})

let server;

function runServer(databaseUrl, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
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
