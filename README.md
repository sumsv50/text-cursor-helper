# Text Cursor Helper
This library provides fast ways to deal with the text cursor when editing in input, textarea, and div (`contenteditable = true`) elements:
* Get position of the text cursor on the Oxy coordinate axis
* Move the text cursor to the end of input fields

## Reference sources

* Blog [HOW TO: Where’s the text cursor?](https://jh3y.medium.com/how-to-where-s-the-caret-getting-the-xy-position-of-the-caret-a24ba372990a)


## Installing

Using npm

```bash
  npm i text-cusor-helper
```

Using yarn

```bash
  yarn add text-cusor-helper
```

Once the package is installed, you can import using ES Modules:

```js
import textCursorHelper from 'text-cusor-helper';
```
## Quick Start

### 1. Get position of the text cursor 

Returns X, Y coordinates for positioning of a text cursor within a given text input at a given selection point

#### Parameters:

|Order|Name|Description|Type|
|---|---|---|---|
|1|`input`|The text input that need deal with text cursor inside it|Element|
|2|`anchor`|The element serves as a reference for coordinates calculation (The origin of Oxy coordinates)|textCursorHelper.ANCHOR: <ul><li>`ROOT` [Default]</li><li>`POSITIONED_PARENT`: the nearest parent element having the position attribute is **relative** or **absolute** </li></ul>|

#### Example:

```js

const inputElement = document.querySelector(".comment-input")
const position = textCursorHelper.getCursorXY(
  inputElement,
  textCursorHelper.ANCHOR.POSITIONED_PARENT
);

console.log(position)
// { x: 50: y : 50 }

```

### 2. Move the text cursor to the end of input fields

#### Parameters:

`None`

#### Example:

```js

const inputElement = document.querySelector(".comment-input")
textCursorHelper.goToEnd();

```

