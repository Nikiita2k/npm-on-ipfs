'use strict'

const express = require('express')
const log = require('debug')('ipfs:registry-mirror:handler')
const config = require('../config')
const {
  json,
  tarball
} = require('./handlers')
const clone = require('../clone')
const store = require('./store')

module.exports = (options) => {
  options = config(options)

  console.info(`📦 Mirroring npm on ${options.mirror.host}:${options.mirror.port}`)

  const app = express()
  app.use(function (request, response, next) {
    response.on('finish', () => {
      const disposition = response.getHeader('Content-Disposition')
      let prefix = '📄'

      if (disposition && disposition.endsWith('tgz"')) {
        prefix = '🎁'
      }

      console.info(`${prefix} ${request.method} ${request.url} ${response.statusCode}`)
    })

    next()
  })

  app.get('/**/*.tgz', tarball)
  app.get('/*', json)

  app.use(function (error, request, response, next) {
    console.error(`💀 ${request.method} ${request.url} ${response.statusCode} - ${error.stack}`)

    next()
  })

  app.listen(options.mirror.port, () => {
    let url = `${options.mirror.protocol}://${options.mirror.host}`

    if ((options.mirror.protocol === 'https' && options.mirror.port !== 443) || options.mirror.protocol === 'http' && options.mirror.port !== 80) {
      url = `${url}:${options.mirror.port}`
    }

    console.info('🚀 Server running')
    console.info(`🔧 Please either update your npm config with 'npm config set registry ${url}'`)
    console.info(`🔧 or use the '--registry' flag, eg: 'npm install --registry=${url}'`)
  })

  app.locals.store = store(options)

  if (options.clone.enabled) {
    clone(options)
  }
}
