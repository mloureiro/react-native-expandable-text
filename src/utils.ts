import { NativeComponent } from 'react-native'

export function measureHeight(component: NativeComponent): Promise<number> {
	return new Promise(resolve => {
		component.measure((x, y, w, h) => resolve(h))
	})
}

export function nextFrameAsync(): Promise<void> {
	return new Promise(resolve => requestAnimationFrame(() => resolve()))
}
