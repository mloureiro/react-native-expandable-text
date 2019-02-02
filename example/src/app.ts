import { createAppContainer, createStackNavigator } from 'react-navigation'
import { MainScreen } from './MainScreen'

const mainNavigator = createStackNavigator({
	// tslint:disable:object-literal-sort-keys
	Main: { screen: MainScreen },
})

export const app = createAppContainer(mainNavigator)
