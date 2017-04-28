import jsdom from 'jsdom/lib/old-api.js'

/* eslint-disable no-undef */
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>')
global.window = document.defaultView
global.navigator = window.navigator
/* eslint-enable no-undef */
