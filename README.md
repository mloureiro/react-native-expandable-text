# React Native Expandable Text

[![NPM Version](http://img.shields.io/npm/v/@mloureiro/react-native-expandable-text.svg?style=flat-square)](https://npmjs.com/package/react-native-expandable-text)
[![License](http://img.shields.io/npm/l/@mloureiro/react-native-expandable-text.svg?style=flat-square)](https://tldrlegal.com/license/-isc-license)

[![Travis CI](https://travis-ci.com/mloureiro/react-native-expandable-text.svg?branch=master)](https://travis-ci.com/mloureiro/react-native-expandable-text)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/fc321bbba83d4ddab1031a825e09dbe4)](https://www.codacy.com/app/mloureiro.dev/react-native-expandable-text?utm_source=github.com&utm_medium=referral&utm_content=mloureiro/react-native-expandable-text&utm_campaign=Badge_Coverage)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/fc321bbba83d4ddab1031a825e09dbe4)](https://www.codacy.com/app/mloureiro.dev/react-native-expandable-text?utm_source=github.com&utm_medium=referral&utm_content=mloureiro/react-native-expandable-text&utm_campaign=Badge_Grade)

## Introduction

ExpandableText React Native component which allows to collapse and expand text. This was built to be very flexible but still lightweight.

<img src="./assets/readme-example.gif" alt="component at work example" height=400 />

There are already a few projects with the same propose, so why another one?

-   **animated**
-   **not opionated**
    -   some of other implementations already have the text in place, 
    -   force the touchable render to be right after the text
-   **full control**
    -   provides control API so that you use as you wish
-   **works with typography**: 
    -   it allows to use your own text components implementation (instead of forcing to style the ExpandableText component)
-   **simply works**: 
    -   it works with any level of nested text components
    -   it takes the styling into account when measuring

## Installation

```bash
npm install --save @mloureiro/react-native-expandable-text
```

or 

```bash
yarn add @mloureiro/react-native-expandable-text
```

## Usage

An example can be found [here](./example).

### API:

```typescript
interface Props {
  children: string | Text
	duration?: number
	easing?: EasingMode
  controller?: (ref: ExpandableTextInterface) => void
  numberOfLines: number
  onReady?: (prop: { isCollapsible: boolean }) => void
}

interface ExpandableTextInterface {
  collapse(): void
  expand(): void
  isCollapsed(): boolean
  isCollapsible(): boolean
  toggle(): void
}
```

For the available easing modes, there's the documentation on the [react-native-collapsible](https://github.com/oblador/react-native-collapsible#properties) package.
