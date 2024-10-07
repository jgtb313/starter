'use strict'

const express = require('express')
const app = express()

app.get('/app', (req, res) => {
  res.json({ message: 'App' })
})

app.get('/hello-world', (req, res) => {
  res.json({ message: 'Hello World' })
})

app.get('/health', (req, res) => {
  res.json({ message: 'Health Check' })
})

const port = 80

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
