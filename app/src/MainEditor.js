import "braft-editor/dist/index.css";
import "braft-extensions/dist/color-picker.css";

import React, { forwardRef, useCallback, useEffect, useImperativeHandle } from "react";
import { createGenerateClassName, jssPreset, makeStyles, StylesProvider, ThemeProvider } from "@material-ui/core";
import { create } from "jss";
import rtl from "jss-rtl";
import { EmailEditor as Designer } from "./core/design/EmailEditor";
import { decodeJson } from "./core/design/utils/encryptJson";
import ViewPreviewDialog from "./core/design/preview/ViewPreviewDialog";
import ViewHtmlDialog from "./core/design/preview/ViewHtmlDialog";
import useSettings from "./hooks/useSettings";
import { createTheme } from "./theme";
const useStyles = makeStyles(() => ({
  root: {}
}));

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
const generateClassName = createGenerateClassName({
  seed: "EmailEditor"
});

export default forwardRef((
  {
    editorState,
    onFetched = () => { },
    onEditorLoad = () => { },
  },
  ref
) => {
  useStyles();
  const { settings } = useSettings();
  const [state, setState] = React.useState(null);
  const [triggerFetchState, setTriggerFetchState] = React.useState(false);
  const [previewState, setPreviewState] = React.useState(null);
  const [htmlState, sethtmlState] = React.useState(null);
  const [mode, setMode] = React.useState("");

  const parseState = useCallback(stateArg => {
    var stateJson = null;
    var stateVersion = "";
    try {
      if (stateArg) {
        const stateVal = decodeJson(stateArg);
        if (stateVal) {
          var tmp = JSON.parse(stateVal);
          stateJson = tmp["json"];
          stateVersion = tmp["version"];
        }
      }
    } catch (err) {
      const error = new Error(`Invalid Editor State.\n${err.message}`);
      error.stack = err.stack;
      console.log(error);
      return null;
    }
    setState({ json: stateJson, version: stateVersion });
  }, []);

  const getState = obj => {
    onFetched(obj);
    if (mode === "preview") {
      setPreviewState(obj.html);
    } else if (mode === "html") {
      sethtmlState(obj.html);
    }
    setTriggerFetchState(false);
  };

  const onClose = () => {
    setMode("");
  };

  useEffect(() => {
    parseState(editorState);
    onEditorLoad();
  }, [editorState]);

  useImperativeHandle(ref, () => ({
    fetchState() {
      setTriggerFetchState(true);
    },
  }));

  const onPreviewOpen = () => {
    // postMessage("previewOpen", true);
    setMode("preview");
    setTriggerFetchState(true);
  };

  const onHtmlOpen = () => {
    // postMessage("htmlOpen", true);
    setMode("html");
    setTriggerFetchState(true);
  };

  return (
    <ThemeProvider theme={createTheme(settings)}>
      <StylesProvider generateClassName={generateClassName} jss={jss}>
        <Designer
          loadState={state?.["json"] ?? undefined}
          loadVersion={state?.["version"] ?? ""}
          triggerFetchState={triggerFetchState}
          getState={getState}
          onPreviewOpen={onPreviewOpen}
          onHtmlOpen={onHtmlOpen}
        />
        {mode === "preview" && (
          <ViewPreviewDialog previewDoc={previewState} onClose={onClose} title="Preview" />
        )}
        {mode === "html" && <ViewHtmlDialog html={htmlState} onClose={onClose} />}
      </StylesProvider>
    </ThemeProvider>
  )
});

