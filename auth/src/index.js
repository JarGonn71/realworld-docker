const express = require('express');
const axios = require('axios');
const { connectDb } = require('./helpers/db');
const { port, host, db, apiUrl } = require('./configuration');

const app = express()

const startServer = () => {
  app.listen(port, () => {
    console.log(`Strated auth service on port: ${port}`)
    console.log(`On hoost: ${host}`)
    console.log(`Our database: ${db}`)
  });
}

app.get('/test', (req, res) => {
  res.send('Our auth server is working correctly!')
});

app.get('/test-with-api-data', (req, res) => {
  axios.get(apiUrl + '/test-api-data').then((response) => {
    res.json({
      testWithApiData: true,
      dataApi: response.data
    })
  })
})

app.get('/api/current-user', (req, res) => {
  res.json({
    id: '1',
    email: 'foo@gmai.com'
  })
});

connectDb()
  .on('error', console.log)
  .on('disconnected', connectDb)
  .once('open', startServer)
