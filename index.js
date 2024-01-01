const ANCHOR = {
  ROOT: 'r',
  POSITIONED_PARENT: 'p',
}

/**
 * returns x, y coordinates for absolute positioning of a span within a given text input
 * at a given selection point
 * @param {Element} input - the input element to obtain coordinates for
 * @param {string} anchor - the element serves as a reference for coordinates calculation
 */
const getCursorXY = (input, anchor = ANCHOR.ROOT) => {
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const clonedRange = range.cloneRange();
  clonedRange.selectNodeContents(input);
  clonedRange.setEnd(range.endContainer, range.endOffset);
  const selectionPoint = input.selectionEnd;

  const [inputX, inputY] = ((anchor) => {
    switch (anchor) {
      case ANCHOR.POSITIONED_PARENT:
        return [input.offsetLeft, input.offsetTop]
      default:
        const rect = input.getBoundingClientRect();
        return [rect.x, rect.y];
    }
  })(anchor)

  // create a dummy element that will be a clone of our input
  const div = document.createElement('div')
  // get the computed style of the input and clone it onto the dummy element
  const copyStyle = getComputedStyle(input)

  for (const prop of copyStyle) {
    div.style[prop] = copyStyle[prop]
  }
  div.style['position'] = 'relative';
  div.style['white-space'] = 'pre-wrap';

  const inputValue = (input => {
    switch (input.tagName) {
      case 'DIV':
        return input.innerText;
      default:
      return input.value;
    }
  })(input)

  // set the div content to that of the textarea up until selection
  const textContent = inputValue.substr(0, selectionPoint)

  // set the text content of the dummy element div
  div.textContent = textContent
  if (input.tagName === 'TEXTAREA' || input.tagName === 'DIV') div.style.height = 'auto'
  // if a single line input then the div needs to be single line and not break out like a text area
  if (input.tagName === 'INPUT') div.style.width = 'auto'
  // create a marker element to obtain caret position
  const span = document.createElement('span')
  // give the span the textContent of remaining content so that the recreated dummy element is as close as possible
  span.textContent = inputValue.substr(selectionPoint)
  // append the span marker to the div
  div.appendChild(span)
  // append the dummy element to the body
  document.body.appendChild(div)
  // get the marker position, this is the caret position top and left relative to the input
  const { offsetLeft: spanX, offsetTop: spanY } = span
  // lastly, remove that dummy element
  // NOTE:: can comment this out for debugging purposes if you want to see where that span is rendered
  document.body.removeChild(div)
  // return an object with the x and y of the caret. account for input positioning so that you don't need to wrap the input
  return {
    x: inputX + spanX,
    y: inputY + spanY,
  }
}

/**
 * Move the text cursor to the end of input fields (input, textarea, div[contenteditable=true])
 * @param {Element} input - the input element
 */
const goToEnd = (input) => {
  if (!(input instanceof Element)) {
    throw new Error("Invalid input element parameter")
  }
  const range = document.createRange();
  const selection = window.getSelection();
  range.setStart(input, input.childNodes.length);
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
}

export default {
  getCursorXY,
  goToEnd,
  ANCHOR
}
