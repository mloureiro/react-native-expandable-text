import 'jest'
import * as React from 'react'
import {
	MeasureOnSuccessCallback,
	NativeComponent,
	Text,
	View,
} from 'react-native'
import {
	extractTextFromReactNode as extract,
	measureHeight,
	nextFrameAsync,
} from '../utils'

describe('measureHeight', () => {
	it('should get `height` property from measure', () => {
		const result = {
			height: 43,
			pageX: 52,
			pageY: 61,
			width: 34,
			x: 16,
			y: 25,
		}
		const myComponent: Partial<NativeComponent> = {
			measure: (callback: MeasureOnSuccessCallback): void =>
				callback(
					result.x,
					result.y,
					result.width,
					result.height,
					result.pageX,
					result.pageY,
				),
		}

		expect(measureHeight(myComponent as NativeComponent)).resolves.toBe(
			result.height,
		)
	})
})

describe('nextFrameAsync', () => {
	it('should jump frame', async () => {
		const mock = jest.fn()

		// tslint:disable-next-line no-inferred-empty-object-type
		new Promise(r => r()).then(mock)
		expect(mock).not.toHaveBeenCalled()
		await nextFrameAsync()
		expect(mock).toHaveBeenCalled()
	})
})

describe('extractTextFromReactNode', () => {
	it('should return empty string nothing is passed', () =>
		// tslint:disable-next-line no-null-keyword
		expect(extract(null)).toBe(''))

	it('should return "false" when false is passed', () =>
		expect(extract(false)).toBe('false'))

	it('should return "true" when true is passed', () =>
		expect(extract(true)).toBe('true'))

	it('should return empty string if there are no children', () =>
		expect(extract(<Text />)).toBe(''))

	it('should return the string from the Text component', () =>
		expect(extract(<Text>abc</Text>)).toBe('abc'))

	it('should return the string from the any component', () =>
		expect(extract(<View>abc</View>)).toBe('abc'))

	it('should return the string from nested component', () =>
		expect(
			extract(
				<View>
					<Text>abc</Text>
				</View>,
			),
		).toBe('abc'))

	it('should return the string from multi nested components', () =>
		expect(
			extract(
				<View>
					<Text>a</Text>
					<View>
						<Text>
							b<Text>c</Text>
						</Text>
					</View>
				</View>,
			),
		).toBe('a b c'))

	it('should handle fragments', () =>
		expect(
			extract(
				<React.Fragment>
					<Text>a</Text>
					<Text>b</Text>
					<Text>c</Text>
				</React.Fragment>,
			),
		).toBe('a b c'))
})
