import React, { PureComponent } from 'react'
import { Text } from 'react-native'
import { measureHeight, nextFrameAsync } from './utils'

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

	private _text?: Text
	private _isMounted: boolean = false

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
		this._isMounted = true
		this.setUpMeasurement()
	}

	public componentWillUnmount(): void {
		this._isMounted = false
	}

	public render(): React.ReactNode {
		return (
			<Text ref={this.setText} numberOfLines={this.state.numberOfLines}>
				{this.props.children}
			</Text>
		)
	}

	private setUpMeasurement = async (): Promise<void> => {
		if (!this._text) throw Error('Text is not set to be measured')
		const { numberOfLines } = this.props
		await nextFrameAsync();

		if (!this._isMounted) return
		this.maxHeight = await measureHeight(this._text)
		this.setState({ numberOfLines })
		await nextFrameAsync()

		if (!this._isMounted) return
		this.collapsedHeight = await measureHeight(this._text)

		const isCollapsible: boolean = this.maxHeight > this.collapsedHeight
		this.setState({
			isCollapsible,
			numberOfLines: isCollapsible ? numberOfLines : 0,
		})
	}

	private setText = (ref: Text) => (this._text = ref)
}
