/*
 * Copyright (C) 2017, Hugo Freire <hugo@dog.ai>. All rights reserved.
 */

describe('Module', () => {
  let subject
  let SdNotifyWrapper

  before(() => {
    SdNotifyWrapper = td.object([])
  })

  afterEach(() => td.reset())

  describe('when loading', () => {
    beforeEach(() => {
      td.replace('../src/sdnotify-wrapper', SdNotifyWrapper)

      subject = require('../src/index')
    })

    it('should export sdnotify wrapper', () => {
      subject.should.be.equal(SdNotifyWrapper)
    })
  })
})
