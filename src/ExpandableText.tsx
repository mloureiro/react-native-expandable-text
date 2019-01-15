import React, { PureComponent, ReactNode } from 'react'
import { Text } from 'react-native'
import {
	extractTextFromReactNode,
	measureHeight,
	nextFrameAsync,
} from './utils'

interface ExpandableTextInterface {
	collapse(): void
	expand(): void
	isCollapsed(): boolean
	isCollapsible(): boolean
	toggle(): void
}

interface Props {
	numberOfLines: number
	children: string | Text
	controller?: (ref: ExpandableTextInterface) => void
	onReady?: (prop: { isCollapsible: boolean }) => void
}

interface State {
	isCollapsible: boolean
	numberOfLines: number
}

export class ExpandableText extends PureComponent<Props, State>
	implements ExpandableTextInterface {
	public maxHeight: number = 0
	public collapsedHeight: number = 0
	public state: State = {
		isCollapsible: true,
		numberOfLines: 0,
	}

	private text?: Text
	private isTextMounted: boolean = false

	constructor(props: Props) {
		super(props)

		if (props.controller) props.controller(this)
	}

	public collapse = (): void => {
		if (!this.state.isCollapsible) return

		this.setState({ numberOfLines: this.props.numberOfLines })
	}

	public expand = (): void => {
		if (!this.state.isCollapsible) return

		this.setState({ numberOfLines: 0 })
	}

	public isCollapsed = (): boolean => this.state.numberOfLines !== 0

	public isCollapsible = (): boolean => this.state.isCollapsible

	public toggle = (): void => {
		if (!this.state.isCollapsible) return

		this.setState(state => ({
			numberOfLines: state.numberOfLines === 0 ? this.props.numberOfLines : 0,
		}))
	}

	public componentDidMount(): void {
		this.isTextMounted = true
		this.setUpMeasurement()
	}

	public componentDidUpdate(prevProps: Readonly<Props>): void {
		const oldText = extractTextFromReactNode(prevProps.children)
		const newText = extractTextFromReactNode(this.props.children)
		if (
			prevProps.numberOfLines !== this.props.numberOfLines ||
			newText !== oldText
		) {
			this.setUpMeasurement()
		}
	}

	public componentWillUnmount(): void {
		this.isTextMounted = false
	}

	public render(): ReactNode {
		return (
			<Text ref={this.setText} numberOfLines={this.state.numberOfLines}>
				{this.props.children}
			</Text>
		)
	}

	private setUpMeasurement = async (): Promise<void> => {
		if (!this.text) throw Error('Text is not set to be measured')
		const { numberOfLines } = this.props
		await nextFrameAsync()

		if (!this.isTextMounted) return
		this.maxHeight = await measureHeight(this.text)
		this.setState({ numberOfLines })
		await nextFrameAsync()

		if (!this.isTextMounted) return
		this.collapsedHeight = await measureHeight(this.text)

		const isCollapsible: boolean = this.maxHeight > this.collapsedHeight
		this.setState(
			{
				isCollapsible,
				numberOfLines: isCollapsible ? numberOfLines : 0,
			},
			() => this.props.onReady && this.props.onReady({ isCollapsible }),
		)
	}

	private setText = (ref: Text) => (this.text = ref)
}
