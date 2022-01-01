import React, { createContext, useState } from 'react';
const AppContext = createContext();
const editorStateArg = window.__editorState || {};
const versionArg = window.__version || "";

const AppContextProvider = ({ children }) => {   
    const [editorState, setEditorState] = useState(editorStateArg);   
    const [version, setVersion] = useState(versionArg);   
    return (
      <AppContext.Provider value={{ editorState, setEditorState, version, setVersion }}>
         {children}
      </AppContext.Provider>
   );
};

const AppContextConsumer = AppContext.Consumer;

export { AppContext, AppContextProvider, AppContextConsumer };
export default AppContext;