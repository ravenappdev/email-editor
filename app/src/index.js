import React, { useCallback, useEffect } from "react";
import ReactDOM from "react-dom";
import { EmailEditor as Designer } from "./core/design/EmailEditor";
import reportWebVitals from "./reportWebVitals";
import { SettingsProvider } from "./context/SettingsContext";
import { restoreSettings } from "./utils/settings";
import useIsMountedRef from "./hooks/useIsMountedRef";
import { decodeJson } from "./core/design/utils/encryptJson";
import ViewPreviewDialog from "./core/design/preview/ViewPreviewDialog";
import ViewHtmlDialog from "./core/design/preview/ViewHtmlDialog";
const PARENT_URL =
    window.location !== window.parent.location ? document.referrer : document.location.href;

function EmailEditor() {
    const isMountedRef = useIsMountedRef();
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
        postMessage("savedState", obj);
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

    const receiveMessage = useCallback(
        event => {
            if (!PARENT_URL.includes(event.origin)) return;
            const message = event.data.message;
            switch (message) {
                case "loadEditor":
                    parseState(event.data.value);
                    postMessage("editorLoaded", true);
                    break;
                case "fetchState":
                    setTriggerFetchState(true);
                    break;
                default:
            }
        },
        [parseState]
    );

    useEffect(() => {
        window.addEventListener("message", receiveMessage, false);
    }, [isMountedRef, receiveMessage]);

    function postMessage(type, value) {
        window.parent.postMessage({ message: type, value: value }, PARENT_URL);
    }

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
    return state && Object.keys(state).length > 0 ? (
        <>
            <Designer
                loadState={state["json"]}
                loadVersion={state["version"]}
                triggerFetchState={triggerFetchState}
                getState={getState}
                onPreviewOpen={onPreviewOpen}
                onHtmlOpen={onHtmlOpen}
            />
            {mode === "preview" && (
                <ViewPreviewDialog previewDoc={previewState} onClose={onClose} title="Preview" />
            )}
            {mode === "html" && <ViewHtmlDialog html={htmlState} onClose={onClose} />}
        </>
    ) : (
        "Error"
    );
}

const settings = restoreSettings();

ReactDOM.render(
    <SettingsProvider settings={settings}>
        <EmailEditor />
    </SettingsProvider>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
