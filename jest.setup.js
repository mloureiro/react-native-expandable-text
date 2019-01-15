import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { JSDOM } from 'jsdom'
import 'react-native-mock-render/mock'

function copyProps(src, target) {
	Object.defineProperties(target, {
		...Object.getOwnPropertyDescriptors(src),
		...Object.getOwnPropertyDescriptors(target),
	})
}

const jsdom = new JSDOM()
const { window } = jsdom

global.window = window
global.document = window.document
global.navigator = {
	userAgent: 'node.js',
}
copyProps(window, global)

configure({ adapter: new Adapter() })

// react-native-jest-mock throws too many of warnings due to
// unbridged new API methods/signature.
// In order to reduce irrelevant spam, we mock these errors.
console.error = message => message
