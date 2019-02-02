import {
	ExpandableText,
	ExpandableTextInterface,
	OnChangeInterface,
	OnReadyInterface,
} from '@mloureiro/react-native-expandable-text'
import lorem from 'getlorem'
import React, { Fragment, PureComponent } from 'react'
import { Headline, Paragraph, Strong } from './Typography'

export class ExampleText extends PureComponent<{}> {
	private readonly title: string
	private readonly firstParagraph: string
	private readonly importantNotice: string
	private readonly lastParagraph: string

	constructor(props: {}) {
		super(props)

		this.title = lorem.words(3)
		this.firstParagraph = lorem.sentences(2)
		this.importantNotice = lorem.sentence()
		this.lastParagraph = lorem.sentences(3)
	}

	public render(): React.ReactNode {
		return (
			<Fragment>
				<Headline>{this.title}</Headline>
				{'\n'}
				{'\n'}
				<Paragraph>{this.firstParagraph}</Paragraph>
				{'\n'}
				{'\n'}
				<Paragraph>
					<Strong>{this.importantNotice}</Strong>
				</Paragraph>
				{'\n'}
				{'\n'}
				<Paragraph>{this.lastParagraph}</Paragraph>
			</Fragment>
		)
	}
}
