import { ReactNode } from 'react'
import { NativeComponent } from 'react-native'

export async function measureHeight(
	component: NativeComponent,
): Promise<number> {
	return new Promise(resolve => {
		component.measure((x, y, w, h) => resolve(h))
	})
}

export async function nextFrameAsync(): Promise<void> {
	// tslint:disable-next-line no-unnecessary-callback-wrapper
	return new Promise(resolve => requestAnimationFrame(() => resolve()))
}

export function extractTextFromReactNode(component: ReactNode): string {
	if (component === null) return ''

	if (typeof component !== 'object') return String(component)

	if (Array.isArray(component)) {
		return component.map(extractTextFromReactNode).join(' ')
	}

	if ('children' in component) {
		return extractTextFromReactNode(component.children)
	}

	if ('props' in component && component.props.children) {
		return extractTextFromReactNode(component.props.children)
	}

	return ''
}
