# A :penguin: systemd sd_notify :package: wrapper library

[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![Build Status](https://travis-ci.org/dog-ai/sdnotify-wrapper.svg?branch=master)](https://travis-ci.org/dog-ai/sdnotify-wrapper)
[![Coverage Status](https://coveralls.io/repos/github/dog-ai/sdnotify-wrapper/badge.svg?branch=master)](https://coveralls.io/github/dog-ai/sdnotify-wrapper?branch=master)
[![Greenkeeper badge](https://badges.greenkeeper.io/dog-ai/sdnotify-wrapper.svg)](https://greenkeeper.io/)
[![](https://img.shields.io/github/release/dog-ai/sdnotify-wrapper.svg)](https://github.com/dog-ai/sdnotify-wrapper/releases)
[![](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/npm/v/@dog-ai/sdnotify-wrapper.svg)](https://www.npmjs.com/package/@dog-ai/sdnotify-wrapper)
[![Downloads](https://img.shields.io/npm/dt/@dog-ai/sdnotify-wrapper.svg)](https://www.npmjs.com/package/@dog-ai/sdnotify-wrapper) 

A systemd sd_notify wrapper library.

### Features
* Supports [Bluebird](https://github.com/petkaantonov/bluebird) :bird: promises :white_check_mark:

### How to install
```
npm install @dog-ai/sdnotify-wrapper
```

### How to use

#### Use it in your app
```javascript
const SdNotifyWrapper = require('sdnotify-wrapper')

SdNotifyWrapper.notify(false, 'READY=1')
```
