'use strict'

const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.json({ message: 'Hello, world!' })
})

app.get('/health', (req, res) => {
  res.json({ message: 'Health Check' })
})

const port = 80

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
