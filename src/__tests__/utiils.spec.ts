import 'jest'
import { MeasureOnSuccessCallback, NativeComponent } from 'react-native'
import { measureHeight } from '../utils'

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
