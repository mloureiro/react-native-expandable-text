import { ReactNode } from 'react'
import { NativeComponent } from 'react-native'

export function measureHeight(component: NativeComponent): Promise<number> {
	return new Promise(resolve => {
		component.measure((x, y, w, h) => resolve(h))
	})
}

export function nextFrameAsync(): Promise<void> {
	return new Promise(resolve => requestAnimationFrame(() => resolve()))
}

export function extractTextFromReactNode(component: ReactNode): string {
	if (!component) return ''

	if (typeof component !== 'object') return String(component)

	if (Array.isArray(component)) {
		return component.map(extractTextFromReactNode).join(' ')
	}

	const child: ReactNode =
		// @ts-ignore issue: https://stackoverflow.com/questions/54170961/ts2339-property-props-does-not-exist-on-type
		component.children || (component.props && component.props.children)

	return extractTextFromReactNode(child || '')
}
