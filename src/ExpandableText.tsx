import React, { PureComponent, ReactElement, ReactNode, ReactText } from 'react'
import { Text } from 'react-native'
import {
	extractTextFromReactNode,
	measureHeight,
	nextFrameAsync,
} from './utils'

export interface ExpandableTextInterface {
	collapse(): void
	expand(): void
	isCollapsed(): boolean
	isCollapsible(): boolean
	toggle(): void
}

export interface OnChangeInterface {
	isCollapsed: boolean
	isCollapsible: boolean
}

export interface OnReadyInterface extends OnChangeInterface {
	height: {
		expanded: number
		collapsed: number
	}
}

export interface Props {
	numberOfLines: number
	// tslint:disable-next-line no-any
	children: ReactText | ReactElement<any> | Array<ReactText | ReactElement<any>>
	controller?(ref: ExpandableTextInterface): void
	onChange?(prop: OnChangeInterface): void
	onReady?(prop: OnReadyInterface): void
}

interface State {
	isCollapsible: boolean
	numberOfLines: number
}

export class ExpandableText extends PureComponent<Props, State>
	implements ExpandableTextInterface {
	public state: State = {
		isCollapsible: true,
		numberOfLines: 0,
	}

	private maxHeight: number = 0
	private collapsedHeight: number = 0
	private text?: Text
	private isTextMounted: boolean = false

	constructor(props: Props) {
		super(props)

		if (props.controller) props.controller(this)
	}

	public collapse = (): void => {
		if (!this.state.isCollapsible) return

		this.setState({ numberOfLines: this.props.numberOfLines }, this.onChange)
	}

	public expand = (): void => {
		if (!this.state.isCollapsible) return

		this.setState({ numberOfLines: 0 }, this.onChange)
	}

	public isCollapsed = (): boolean => this.state.numberOfLines !== 0

	public isCollapsible = (): boolean => this.state.isCollapsible

	public toggle = (): void => {
		if (!this.state.isCollapsible) return

		this.setState(
			state => ({
				numberOfLines: state.numberOfLines === 0 ? this.props.numberOfLines : 0,
			}),
			this.onChange,
		)
	}

	public onChange = (): void => {
		if (this.props.onChange) {
			this.props.onChange({
				isCollapsed: this.isCollapsed(),
				isCollapsible: this.isCollapsible(),
			})
		}
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

	private readonly setUpMeasurement = async (): Promise<void> => {
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
			this.onReady,
		)
	}

	private readonly setText = (ref: Text) => (this.text = ref)

	private readonly onReady = (): void => {
		if (!this.props.onReady) {
			return
		}

		this.props.onReady({
			height: {
				collapsed: this.collapsedHeight,
				expanded: this.maxHeight,
			},
			isCollapsed: this.isCollapsed(),
			isCollapsible: this.isCollapsible(),
		})
	}
}
