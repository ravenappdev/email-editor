import React, { useEffect } from "react";
import { Editor, useEditor } from "@craftjs/core";
import { Footer, RightPanel } from "./components/layoutComponents";
import {
    Button,
    Container,
    Text,
    Image,
    Video,
    HtmlBox,
    CustomDivider,
    Resizer,
    BodyWrapper
} from "./components/userComponents";
import { RenderNode } from "./utils/RenderNode";
import { Box, Grid } from "@material-ui/core";
import Design from "./components/layoutComponents/Design";
import { jssPreset, makeStyles, StylesProvider, ThemeProvider } from "@material-ui/core";
import { create } from "jss";
import rtl from "jss-rtl";
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import "react-quill/dist/quill.snow.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "../../assets/css/devices.min.css";
import "braft-editor/dist/index.css";
import "braft-extensions/dist/color-picker.css";
import { createTheme } from "../../theme";
import useSettings from "../../hooks/useSettings";
import { encodeJson } from "./utils/encryptJson";
import { renderHtml } from "../repo/exportHtmlRepo";
import { state_version } from "../../../package.json";

const useStyles = makeStyles(() => ({
    root: {}
}));

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
// const generateClassName = createGenerateClassName({
//     seed: "EmailEditor"
// });

export function EmailEditor({
    loadState,
    loadVersion,
    triggerFetchState,
    getState,
    onPreviewOpen,
    onHtmlOpen,
    ...rest
}) {
    useStyles();
    const { settings } = useSettings();

    return (
        <ThemeProvider theme={createTheme(settings)}>
            <StylesProvider jss={jss}>
                <Grid container justifyContent="center" alignContent="center">
                    <Grid item xs={12}>
                        <Editor
                            resolver={{
                                Button,
                                Container,
                                Text,
                                Image,
                                Video,
                                HtmlBox,
                                CustomDivider,
                                Resizer,
                                BodyWrapper
                            }}
                            onRender={RenderNode}
                        >
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignContent="stretch"
                                position="fixed"
                                width="100%"
                                height="100%"
                            >
                                <Design editorState={loadState} />
                                <RightPanel />
                                <Footer onPreviewOpen={onPreviewOpen} onHtmlOpen={onHtmlOpen} />
                            </Box>
                            <EditorSaveModule
                                triggerFetchState={triggerFetchState}
                                getState={getState}
                                version={loadVersion ? loadVersion : state_version}
                            />
                        </Editor>
                    </Grid>
                </Grid>
            </StylesProvider>
        </ThemeProvider>
    );
}

function EditorSaveModule({ triggerFetchState, getState, version }) {
    const { query } = useEditor();

    const fetchState = async () => {
        const json = query.serialize();
        var state = encodeJson(JSON.stringify({ json: json, version: version }));

        var html = null;
        try {
            const craftNodes = JSON.parse(json);
            html = await renderHtml(craftNodes);
        } catch (err) {
            console.log(err);
        }

        getState({
            html: html,
            state: state
        });
    };

    if (triggerFetchState) {
        fetchState();
    }

    return null;
}

export default EmailEditor;
