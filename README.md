# React Native Coachmark

![preview](docs/demo.gif)

## Installation

yarn

```
yarn add @traveloka/react-native-coachmark
```

npm

```
npm i @traveloka/react-native-coachmark --save
```

## Getting Started

### Basic Usage

```javascript
import React from 'react';
import { Coachmark } from '@traveloka/react-native-coachmark';

export default function AwesomeScreen() {
  return (
    <Page>
      <Header>
        <Coachmark autoShow message="Click here to save your page!">
          <ButtonBookmark>
        </Coachmark>
      </Header>
    </Page>
  );
}
```

## Example
![preview](https://s3.amazonaws.com/exp-brand-assets/ExpoIcon_200.png)

## Documentation

### - Coachmark

#### Importing
```javascript
var Coachmark = require('@traveloka/react-native-coachmark').Coachmark;  // ES5

import { Coachmark } from '@traveloka/react-native-coachmark';  // ES6
```

#### Props
| Property      | Type     | Default Value | Description                                   |
| ------------- | -------- | ------------- | --------------------------------------------- |
| message       | string   | none          | required                                      |
| autoShow      | boolean  | none          | to show the coachmark when mounting           |
| onShow        | function | none          | will be called when coachmark is showing      |
| onHide        | function | none          | will be called when coachmark is hidden       |
| isAnchorReady | boolean  | true          | a value to make coachmark waiting to be shown |

#### Methods

| Methods  | Description                              |
| -------- | ---------------------------------------- |
| `show()` | a function to trigger show the coachmark |
### Roadmap
