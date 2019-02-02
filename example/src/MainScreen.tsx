import {
	ExpandableText,
	ExpandableTextInterface,
	OnChangeInterface,
	OnReadyInterface,
} from '@mloureiro/react-native-expandable-text'
import React, { PureComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ExampleText } from './ExampleText'

interface State {
	isCollapsed: boolean
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	toggler: { color: 'blue' },
})

export class MainScreen extends PureComponent<void, State> {
	public state: State = { isCollapsed: false }
	private controller: ExpandableTextInterface

	public render(): React.ReactNode {
		return (
			<View style={styles.container}>
				<ExpandableText
					numberOfLines={6}
					controller={this.setController}
					onChange={this.onChange}
					onReady={this.onChange}
				>
					<ExampleText />
				</ExpandableText>
				<Text style={styles.toggler} onPress={this.toggle}>
					{this.state.isCollapsed ? 'Expand text' : 'Collapse text'}
				</Text>
			</View>
		)
	}

	private setController = (controller: ExpandableTextInterface): void => {
		this.controller = controller
	}

	private toggle = (): void => {
		this.controller.toggle()
	}

	private onChange = ({
		isCollapsed,
	}: OnChangeInterface | OnReadyInterface): void => {
		this.setState({ isCollapsed })
	}
}
