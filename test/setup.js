import 'babel-register'
import 'babel-polyfill'
import chai, { assert, expect } from 'chai'
import sinon from 'sinon'


chai.config.includeStack = true

global.assert = assert
global.expect = expect
global.sinon = sinon
global.eq = assert.deepEqual

// import jsdom from 'jsdom'
// global.document = jsdom.jsdom('<body></body>')
// global.window = document.defaultView
// global.navigator = window.navigator
