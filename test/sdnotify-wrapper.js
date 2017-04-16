/*
 * Copyright (C) 2017, Hugo Freire <hugo@dog.ai>. All rights reserved.
 */

describe('SdNotifyWrapper', () => {
  let subject
  let ffi
  let libsystemd
  let platform

  before(() => {
    ffi = td.object([ 'Library' ])

    libsystemd = td.object([ 'sd_notify' ])
    libsystemd.sd_notify.async = td.function()
  })

  afterEach(() => td.reset())

  describe('when notifying and sd_notify succeeds', () => {
    const state = 'my-state'

    beforeEach(() => {
      platform = Object.getOwnPropertyDescriptor(process, 'platform')
      Object.defineProperty(process, 'platform', { value: 'linux' })

      td.replace('ffi', ffi)
      td.when(ffi.Library(), { ignoreExtraArgs: true }).thenReturn(libsystemd)
      td.when(libsystemd.sd_notify.async(td.matchers.anything(), td.matchers.anything())).thenCallback(null)

      subject = require('../src/sdnotify-wrapper')
    })

    afterEach(() => {
      Object.defineProperty(process, 'platform', platform)
    })

    it('should call ffi Library to load libsystemd sd_notify', () => {
      return subject.notify(false, state)
        .then(() => {
          td.verify(ffi.Library('libsystemd', { 'sd_notify': [ 'int', [ 'int', 'string' ] ] }), { times: 1 })
        })
    })
  })

  describe('when notifying and sd_notify fails', () => {
    const state = 'my-state'
    const error = new Error()

    beforeEach(() => {
      platform = Object.getOwnPropertyDescriptor(process, 'platform')
      Object.defineProperty(process, 'platform', { value: 'linux' })

      td.replace('ffi', ffi)
      td.when(ffi.Library(), { ignoreExtraArgs: true }).thenReturn(libsystemd)
      td.when(libsystemd.sd_notify.async(td.matchers.anything(), td.matchers.anything())).thenCallback(error)

      subject = require('../src/sdnotify-wrapper')
    })

    afterEach(() => {
      Object.defineProperty(process, 'platform', platform)
    })

    it('should reject with error', (done) => {
      subject.notify(false, state)
        .catch((_error) => {
          _error.should.be.eql(error)

          done()
        })
    })
  })

  describe('when notifying and libsystemd not found', () => {
    const state = 'my-state'

    beforeEach(() => {
      subject = require('../src/sdnotify-wrapper')
    })

    it('should reject promise with libsystemd not found error', (done) => {
      subject.notify(false, state)
        .catch((error) => {
          error.message.should.be.equal('libsystemd not found')

          done()
        })
    })
  })
})
