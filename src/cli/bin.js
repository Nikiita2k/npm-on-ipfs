#! /usr/bin/env node

'use strict'

require('yargs')
  .command('$0', 'Starts a registry server that uses IPFS to fetch js dependencies', (yargs) => {
    yargs
      .option('clone', {
        describe: 'Whether to clone the registry in the background',
        default: true
      })
      .option('clone-tarballs', {
        describe: 'Whether to eagerly download tarballs',
        default: true
      })
      .option('mirror-host', {
        describe: 'Which host to listen to requests on',
        default: 'localhost'
      })
      .option('mirror-port', {
        describe: 'Which port to listen to requests on',
        default: 50321
      })
      .option('mirror-protocol', {
        describe: 'Which protocol to use with the server',
        default: 'http'
      })
      .option('mirror-registry', {
        describe: 'Where to download missing files from',
        default: 'https://registry.npmjs.com'
      })
      .option('ipfs-port', {
        describe: 'Which port the daemon is listening on',
        default: 5001
      })
      .option('ipfs-host', {
        describe: 'Which host the daemon is listening on',
        default: '127.0.0.1'
      })
      .option('ipfs-base-dir', {
        describe: 'Which mfs prefix to use',
        default: '/commons-registry'
      })
      .option('ipfs-flush', {
        describe: 'Whether to flush the MFS cache',
        default: true
      })
      .option('clone-skim', {
        describe: 'Which registry to clone',
        default: 'https://skimdb.npmjs.com/registry'
      })
      .option('clone-skim', {
        describe: 'Which registry to clone',
        default: 'https://replicate.npmjs.com/registry'
      })
      .option('clone-user-agent', {
        describe: 'What user agent to specify when contacting the registry',
        default: 'IPFS registry-mirror worker'
      })
      .option('clone-delay', {
        describe: 'How long in ms to wait between cloning each module',
        default: 0
      })
      .option('clone-upgrade-to-https', {
        describe: 'If a tarball is specifed with an http URL, whether to upgrade it to https',
        default: true
      })
      .option('request-max-sockets', {
        describe: 'How many concurrent http requests to make while cloning the repo',
        default: 10
      })
  }, require('../core/mirror'))
  .argv
