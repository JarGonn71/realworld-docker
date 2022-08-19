const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');

const { connectDb } = require('./helpers/db');
const { port, host, db, authApiUrl } = require('./configuration');

const app = express()

const postSchema = new mongoose.Schema({
  name: String
})

const Post = mongoose.model('Post', postSchema)

const startServer = () => {
  app.listen(port, () => {
    console.log(`Strated api service on port: ${port}`)
    console.log(`On hoost: ${host}`)
    console.log(`Our database: ${db}`)
    const silence = new Post({ name: 'Silence'});
    silence.save((err, savedSilence) => {
      if (err) return console.log(err)
      console.log('savedSilence', savedSilence)

    })
  });
}

app.get('/test', (req, res) => {
  res.send('Our api server is working correctly!')
});

app.get('/api/test-api-data', (req, res) => {
  res.json({
    testData: true
  })
});

app.get('/test-with-current-user', (req, res) => {
  axios.get(authApiUrl + '/current-user').then(response => {
    res.json({
      testWithCurrentUser: true,
      currentUseFormAuth: response.data
    })
  })
});



connectDb()
  .on('error', console.log)
  .on('disconnected', connectDb)
  .once('open', startServer)
