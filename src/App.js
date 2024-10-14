import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import ReactHtmlParser from 'html-react-parser';
import DOMPurify from 'dompurify'; // For sanitizing user input
import './App.css'; // Import the CSS file

function App() {
  const [inputValue, setInputValue] = useState('');
  const [submittedValue, setSubmittedValue] = useState(null);
  const [useRawHTML, setUseRawHTML] = useState(false); // Toggle between raw HTML and plain text rendering
  const findDomNodeRef1 = useRef(null); // Ref to be used for findDOMNode
  const findDomNodeRef2 = useRef(null); // Ref to be used for findDOMNode
  const findDomNodeRef3 = React.createRef(); // Ref to be used for findDOMNode
  const findDomNodeRef4 = React.createRef(); // Ref to be used for findDOMNode
  let output = "";



  const handleInput = (e) => {
    if (findDomNodeRef1.current) {
      const domNode = ReactDOM.findDOMNode(findDomNodeRef1.current);
      if (domNode) {
        domNode.innerHTML = `${e}`;
      }
    }

    if (findDomNodeRef2.current) {
      const domNode = ReactDOM.findDOMNode(findDomNodeRef2.current);
      if (domNode) {
        domNode.innerText = `${e}`;
      }
    }

    if (findDomNodeRef3.current) {
      findDomNodeRef3.current.innerHTML = `${e}`;
    }

    if (findDomNodeRef4.current) {
      findDomNodeRef4.current.innerText = `${e}`;
    }

    output = `aaa${e}`

    setInputValue(e)
  };

  return React.createElement(
    'div',
    { className: 'app-container' },
    React.createElement('h1', null, 'User Input Form'),
    React.createElement('h2', null, 'Show what method is unsafe to use'),
    React.createElement('h3', null, 'TIP: Try using HTML syntax'),
    
    React.createElement(
      'form',
      { onSubmit: handleInput },
      React.createElement('textarea', {
        value: inputValue,
        onChange: (e) => handleInput(e.target.value),
        placeholder: 'Enter some text or HTML...',
        rows: 4,
        cols: 50
      }),
    ),
    
    inputValue
    ? React.createElement(
        'div',
        { className: 'output-container' }, // Use the new class for styling
        React.createElement(
          'div',
          null,
          React.createElement('h4', { className: 'warning-text' }, 'DangerouslySetInnerHTML:'),
          React.createElement('div', {
            dangerouslySetInnerHTML: { __html: inputValue }, // Render as HTML
          }),
        ),
        React.createElement(
            'div',
            null,
            React.createElement('h4', { className: 'pass-text' }, 'DangerouslySetInnerHTML with DOMPurify:'),
            React.createElement('div', {
              dangerouslySetInnerHTML: { __html: DOMPurify.sanitize(inputValue) }, // Render as HTML
          }),
        ),
        React.createElement(
            'div',
            null,
            React.createElement('h4', { className: 'pass-text' }, 'createElement:'),
            React.createElement(
              'div',
              null,
              `${inputValue}` // Render as plain text
            )
        ),
        React.createElement(
          'div',
          null,
          React.createElement('h4', { className: 'warning-text' }, 'findDOMNode innerHTML Modification:'),
          React.createElement(
            'div',
            { ref: findDomNodeRef1 }, // Ref for findDOMNode
            'This div will be modified by findDOMNode'
          )
        ),
        React.createElement(
          'div',
          null,
          React.createElement('h4', { className: 'pass-text' }, 'findDOMNode innerText Modification:'),
          React.createElement(
            'div',
            { ref: findDomNodeRef2 }, // Ref for findDOMNode
            'This div will be modified by findDOMNode'
          )
        ),
        React.createElement(
          'div',
          null,
          React.createElement('h4', { className: 'warning-text' }, 'createRef innerHTML Modification:'),
          React.createElement(
            'div',
            { ref: findDomNodeRef3 }, // Ref for findDOMNode
            'This div will be modified by findDOMNode'
          )
        ),
        React.createElement(
          'div',
          null,
          React.createElement('h4', { className: 'pass-text' }, 'createRef innerText Modification:'),
          React.createElement(
            'div',
            { ref: findDomNodeRef4 }, // Ref for findDOMNode
            'This div will be modified by findDOMNode'
          )
        ),
        React.createElement(
          'div',
          null,
          React.createElement('h4', { className: 'pass-text' }, 'ReactHtmlParser Modification:'),
          React.createElement(
            'div',
            null,
            ReactHtmlParser(inputValue)
          )
        )

      )
    : null
  );
}

export default App;
