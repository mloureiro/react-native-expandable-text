import React, { ReactElement, ReactText } from 'react'
import { Text } from 'react-native'

interface TextChild {
	children: ReactText | ReactElement<any> | Array<ReactText | ReactElement<any>>
}

export function Headline({ children }: TextChild): ReactElement<any> {
	return <Text style={{ fontSize: 24 }}>{children}</Text>
}

export function Strong({ children }: TextChild): ReactElement<any> {
	return <Text style={{ fontWeight: 'bold' }}>{children}</Text>
}

export function Paragraph({ children }: TextChild): ReactElement<any> {
	return <Text style={{ fontSize: 16 }}>{children}</Text>
}
