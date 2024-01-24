import React, { forwardRef, useCallback, useEffect, useImperativeHandle } from "react";
import { EmailEditor as Designer } from "./core/design/EmailEditor";
import { decodeJson } from "./core/design/utils/encryptJson";
import ViewPreviewDialog from "./core/design/preview/ViewPreviewDialog";
import ViewHtmlDialog from "./core/design/preview/ViewHtmlDialog";

export default forwardRef((
  {
    editorState,
    onFetched = () => { },
    onEditorLoad = () => { },
  },
  ref
) => {
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
    <React.Fragment>
      <Designer
        loadState={state?.["json"] ?? {}}
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
    </React.Fragment>
  )
});

