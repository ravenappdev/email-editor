import BraftEditor from "braft-editor";
import React, { useEffect, useRef } from "react";
import { useNode } from "@craftjs/core";

import ColorPicker from "braft-extensions/dist/color-picker";
import { Grid, makeStyles } from "@material-ui/core";
import { TextDefaultProps, TextSettings } from "./TextSettings";
import { editorConfig } from "./editorConfig";
import { useTheme } from "@material-ui/core";

BraftEditor.use(
    ColorPicker({
        includeEditors: ["editor-with-color-picker"],
        theme: "dark",
        clearButtonText: "Clear",
        closeButtonText: "Close"
    })
);

let customStyleMap = {
    STRIKETHROUGH: {
        textDecoration: "line-through"
    }
};
const useStyles = makeStyles(theme => ({
    hideToolbar: {
        diaplay: "none"
    },
    showToolbar: {
        display: "block",
        position: "absolute",
        width: "700px",
        marginTop: "-75px",
        background: "white",
        zIndex: 100000
    },
    customPara: {
        border: "2px solid black",
        margin: 0,
        textAlign: "center"
    },
    fontFamily: {
        zIndex: 1000
    },
    fontSize: {
        marginTop: "10px"
    },
    collapseToolbar: {
        // border: "2px solid black",

        marginTop: "10px"
    },
    toolTip: {
        background: "#000000",
        borderRadius: "2px",

        fontSize: "12px"
    },
    toolTipArrow: {
        color: "#000000"
    }
}));

export function Text({ props, style, parentStyle }) {
    const classes = useStyles();
    const theme = useTheme();

    const {
        connectors: { connect, drag },
        actions: { setProp },
        isActive,
        dom,
        id
    } = useNode(node => ({
        isActive: node.events.selected,
        dom: node.dom
    }));

    useEffect(() => {
        if (isActive && props.hideToolbar) {
            setProp(props => {
                props.props.hideToolbar = false;
            });
        }
    }, [isActive]);

    const [editorState, setEditorState] = React.useState(
        BraftEditor.createEditorState(props.contentState)
    );
    const editorInstance = useRef(null);
    const onPasted = (text, html) => {
        let newState = BraftEditor.createEditorState(html, {
            styleImportFn: (nodeName, node, currentStyle) => {
                let newStyle = currentStyle;
                newStyle.add("STRIKETHROUGH");
                return newStyle;
            }
        });
        setEditorState(newState);
        setProp(props => {
            props.props.html = editorState.toHTML();
            props.props.contentState = editorState.toRAW();
        });
    };

    const onChange = editorState => {
        setEditorState(editorState);
    };

    var styleCopy = { ...style };
    if (styleCopy.backgroundImage !== "") {
        styleCopy.backgroundImage = "url(" + styleCopy.backgroundImage + ")";
    }

    const x = document.getElementsByClassName("public-DraftEditor-content");
    for (let i = 0; i < x.length; i++) {
        x[i].style.padding = "0px";
        x[i].style.wordBreak = "normal";
        x[i].style.wordWrap = "normal";
        x[i].firstChild.style.padding = "0px";
    }

    const getPos = dom => {
        var _a = dom
            ? dom.getBoundingClientRect()
            : { top: 0, left: 0, bottom: 0, right: 0, width: 0, height: 0 };

        return {
            top: _a.top,
            left: _a.left,
            right: _a.right,
            bottom: _a.bottom,
            width: _a.right - _a.left,
            height: _a.height
        };
    };
    const isCrossingTop = getPos(dom).top < 220;

    return (
        <Grid
            item
            xs={12}
            id={id}
            ref={connect}
            style={{
                position: "relative",
                ...parentStyle,
                backgroundImage: "url(" + parentStyle.backgroundImage + ")",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover"
            }}
        >
            <BraftEditor
                id={"editor-with-color-picker"}
                value={editorState}
                ref={editorInstance}
                onChange={onChange}
                stripPastedStyles={true}
                onPasted={onPasted}
                customStyleMap={customStyleMap}
                controlBarStyle={{
                    display: !isActive || props.hideToolbar ? "none" : "flex",
                    flexWrap: "wrap",
                    position: "absolute",
                    width: "700px",
                    marginTop: `${isCrossingTop ? getPos(dom).height + 20 : -165}px`,
                    marginLeft: `${(350 - getPos(dom).width / 2) * -1}px`,
                    background: "white",
                    zIndex: 1002,
                    border: "1px solid black"
                    //background: ""
                }}
                contentStyle={styleCopy}
                draftProps={{
                    style: {
                        padding: 50
                    }
                }}
                onFocus={() => {
                    setProp(props => {
                        props.props.hideToolbar = false;
                    });
                }}
                onBlur={() => {
                    setProp(props => {
                        props.props.html = editorState.toHTML();
                        props.props.contentState = editorState.toRAW();
                    });
                }}
                {...editorConfig(
                    editorState,
                    setEditorState,
                    classes,
                    editorInstance,
                    setProp,
                    theme
                )}
            />
        </Grid>
    );
}
Text.craft = {
    props: TextDefaultProps,
    related: {
        settings: TextSettings
    },
    displayName: "Text",
    rules: {
        canMoveIn: () => false
    }
};
