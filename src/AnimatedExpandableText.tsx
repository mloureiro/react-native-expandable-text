import React, { PureComponent, ReactNode } from 'react'
import Collapsible, { EasingMode } from 'react-native-collapsible'
import {
	ExpandableText,
	ExpandableTextInterface,
	OnReadyInterface,
	Props as ExpandableTextProps,
} from './ExpandableText'

interface Props extends ExpandableTextProps {
	duration?: number
	easing?: EasingMode
}

interface State {
	collapsedHeight: number
	isCollapsed: boolean
	isCollapsible: boolean
}

export class AnimatedExpandableText extends PureComponent<Props, State> {
	public state = {
		collapsedHeight: 0,
		isCollapsed: false,
		isCollapsible: false,
	}

	private text?: ExpandableTextInterface

	constructor(props: Props) {
		super(props)

		if (props.controller) props.controller(this)
	}

	public readonly collapse = (): void => {
		this.setState(() => ({ isCollapsed: true }))
	}

	public readonly expand = (): void => {
		this.setState(() => ({ isCollapsed: false }))
	}

	public readonly isCollapsed = (): boolean => {
		return this.state.isCollapsed
	}

	public readonly isCollapsible = (): boolean => {
		return this.state.isCollapsible
	}

	public readonly toggle = (): void => {
		this.setState((state: State) => ({ isCollapsed: !state.isCollapsed }))
	}

	public render(): ReactNode {
		const { children, numberOfLines } = this.props

		return (
			<Collapsible
				align='top'
				collapsed={this.state.isCollapsed}
				collapsedHeight={this.state.collapsedHeight}
				duration={this.props.duration}
				easing={this.props.easing}
				onAnimationEnd={this.onAnimationEnd}
			>
				<ExpandableText
					numberOfLines={numberOfLines}
					controller={this.setController}
					onReady={this.onReady}
				>
					{children}
				</ExpandableText>
			</Collapsible>
		)
	}

	private readonly onReady = (data: OnReadyInterface): void => {
		this.setState({
			collapsedHeight: data.height.collapsed,
			isCollapsed: data.isCollapsed,
			isCollapsible: data.isCollapsible,
		})

		if (this.props.onReady) this.props.onReady(data)

		if (this.text) this.text.expand()
	}

	private readonly onAnimationEnd = (): void => {
		if (this.props.onChange) {
			this.props.onChange({
				isCollapsed: this.state.isCollapsed,
				isCollapsible: this.state.isCollapsible,
			})
		}
	}

	private readonly setController = (
		controller: ExpandableTextInterface,
	): void => {
		this.text = controller
	}
}
