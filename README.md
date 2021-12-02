# Email Editor

A lightweight email editor to embed in your SaaS application. It is built on craft.js that provides a drag-n-drop system and handles the way user components should be rendered, updated, and moved. It is entirely server-side rendered, improving user experience.

## Installation

To use Email Editor download [this](https://gist.github.com/priyansh-ravenapp/8357c2ca8a24e26ba87ab5dbaaef69cb.js) file and include it in your local repository.

## Usage

![Optional Text](public/email_template.png)

```
import React, { useState, useCallback } from "react";
import EmailEditor from "./EmailEditor";

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
    <div style={{ height: "100vh" }}>
      <nav>
        <button
          onClick={onEditorSave}
          style={{
            float: "right",
            margin: "10px 20px 10px 10px",
            padding: "10px 30px",
          }}
        >
          Save
        </button>
      </nav>

      <div style={{ height: "92%" }}>
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
| **onEditorLoad** | callback when editor has loaded appropriately. Params - empty                                                                                                              |
| **onFetched**    | callback that gives the state of editor and html of the email. Params - state, html                                                                                        |
| **state**        | describes the state of editor when loaded.                                                                                                                                 |
| **triggerfetch** | boolean that triggers the editor to fetch the state. Set to true when you have to fetch the state and html of the editor. When fetched, the onfetched callback is invoked. |

## License

MIT Licensed
