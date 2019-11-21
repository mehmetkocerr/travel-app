const express = require('express')
const { Nuxt, Builder } = require('nuxt')
const bodyParser = require('body-parser')
// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

const apiRouter = require('./routes/experienceRoutes')
const apiRouter1 = require('./routes/statesRoutes')
const app = express()
async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }
  app.use(express.json())
  app.use(bodyParser.json()) // to support JSON-encoded bodies
  app.use(
    bodyParser.urlencoded({
      // to support URL-encoded bodies
      extended: true
    })
  )
  app.use(apiRouter, apiRouter1)
  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
}
start()
