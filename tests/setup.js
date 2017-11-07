import jsdom from 'jsdom/lib/old-api.js'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-15'

Enzyme.configure({ adapter: new Adapter() })

/* eslint-disable no-undef */
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>')
global.window = document.defaultView
global.navigator = window.navigator
/* eslint-enable no-undef */
