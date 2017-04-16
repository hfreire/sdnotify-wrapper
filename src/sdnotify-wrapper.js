/*
 * Copyright (C) 2017, Hugo Freire <hugo@dog.ai>. All rights reserved.
 */

const Promise = require('bluebird')

const ffi = require('ffi')

let libsystemd
if (process.platform === 'linux') {
  try {
    libsystemd = ffi.Library('libsystemd', { 'sd_notify': [ 'int', [ 'int', 'string' ] ] })
  } catch (error) {}
}

class SdNotifyWrapper {
  notify (unsetEnvironment, state) {
    return new Promise((resolve, reject) => {
      if (!libsystemd) {
        return reject(new Error('libsystemd not found'))
      }

      try {
        libsystemd.sd_notify.async(unsetEnvironment ? 1 : 0, state, (error) => {
          if (error) {
            return reject(error)
          }

          resolve()
        })
      } catch (error) {
        reject(error)
      }
    })
  }
}

module.exports = new SdNotifyWrapper()
