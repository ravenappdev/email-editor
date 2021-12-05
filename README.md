<img src="public/email_logo.png" alt="Email Icon" width="50"/>

# Email Editor

A lightweight email editor to embed in your SaaS application. It is built on craft.js that provides a drag-n-drop system and handles the way user components should be rendered, updated, and moved. It is entirely server-side rendered, improving user experience.

![Optional Text](public/email_template.png)

## Installation

To use the React Email Editor, install it from NPM and include it in your own React build process.

```
npm install react-email-editor --save
```

## Example Usage

```
import React, { useState, useCallback } from "react";
import EmailEditor from "raven-react-email-editor";

const myStyle = {
  div: {
    height: "100vh",
  },
  nav: {
    height: "8%",
    borderBottom: "1px solid #a39f9f",
  },
  button: {
    float: "right",
    margin: "10px 20px 10px 10px",
    padding: "10px 40px",
    color: "white",
    border: "1px solid rgba(88, 80, 236, 0.5)",
    fontSize: "0.875rem",
    backgroundColor: "#5850EC",
    borderRadius: "4px",
    cursor: "pointer",
  },
  editor: {
    height: "91.9%",
  },
};

function App() {
  const [savedState, setSavedState] = useState({ state: "", html: "" });
  const [fetchState, setFetchState] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const onLoad = () => {
    setIsLoaded(true);
  };

  const onFetched = useCallback(
    (state, html) => {
      if (fetchState) {
        setSavedState((prevState) => ({
          ...prevState,
          state: state,
          html: html,
        }));
        setIsLoaded(true);
      }
    },
    [fetchState]
  );

  const onEditorSave = useCallback(() => {
    if (isLoaded) {
      setIsLoaded(false);
      setFetchState(true);
    }
  }, [isLoaded]);

  return (
    <div style={myStyle.div}>

      <nav style={myStyle.nav}>
        <button onClick={onEditorSave} style={myStyle.button}>
          SAVE
        </button>
      </nav>

      <div style={myStyle.editor}>
        <EmailEditor
          state={savedState.state}
          onEditorLoad={onLoad}
          triggerFetch={fetchState}
          onFetched={onFetched}
        />
      </div>

    </div>
  );
}

export default App;

```

### Props

| **props**        | **description**                                                                                                                                                            |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **onEditorLoad** | callback when editor has loaded completely. Params - empty                                                                                                                 |
| **onFetched**    | callback that gives the state of editor and html of the email. Params - state, html                                                                                        |
| **state**        | describes the editor's state. pass a state you saved earlier to load an already designed email. pass empty to load an empty editor.                                        |
| **triggerfetch** | boolean that triggers the editor to fetch the state. Set to true when you have to fetch the state and html of the editor. When fetched, the onfetched callback is invoked. |

## License

MIT Licensed
