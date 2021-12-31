import React from "react";

import "braft-editor/dist/index.css";
import { ContentUtils } from "braft-utils";
import { Box, Tooltip } from "@material-ui/core";
import { GroupedButtons } from "../UtilComponents";
import { Button } from "@material-ui/core";
import { Typography } from "@material-ui/core";

const FONT_FAMILIES = [
    {
        name: "Default Font",
        family:
            "-apple-system,BlinkMacSystemFont,‘Segoe UI’,Roboto,Helvetica,Arial,sans-serif,‘Apple Color Emoji’,‘Segoe UI Emoji’,‘Segoe UI Symbol’"
    }
];
// export function FontFamily({ editorState, setEditorState, editorInstance }) {
//     const [anchorEl, setAnchorEl] = React.useState(null);
//     const theme = useTheme();
//     const getCurFontFamily = () => {
//         let fontFamily = FONT_FAMILIES[0].name;
//         for (let item of FONT_FAMILIES) {
//             if (ContentUtils.selectionHasInlineStyle(editorState, `FONTFAMILY-${item.name}`)) {
//                 fontFamily = item.name;
//                 break;
//             }
//         }

//         return fontFamily;
//     };
//     console.log(editorState.getCurrentInlineStyle());
//     return (
//         <>
//             <TextField
//                 variant="filled"
//                 value={getCurFontFamily()}
//                 onChange={e => {
//                     e.persist();
//                     editorInstance.current.setValue(
//                         ContentUtils.toggleSelectionFontFamily(editorState, e.target.value)
//                     );
//                     editorInstance.current.requestFocus();
//                 }}
//                 fullWidth
//                 margin="dense"
//                 select
//             >
//                 {FONT_FAMILIES.map((val, i) => {
//                     return (
//                         <MenuItem key={i} value={val.name} style={{ fontFamily: val.family }}>
//                             {val.name}
//                         </MenuItem>
//                     );
//                 })}
//             </TextField>
//         </>
//     );
// }
// const hooks = {
//     "toggle-font-size": prop => {
//         console.log(prop);
//         return `calc(${prop} / var(--size-divisor))`;
//     }
// };
function FontSize({ editorState, setEditorState, editorInstance }) {
    const getCurFontSize = () => {
        let fontSize = 16;
        for (let i = 0; i < 144; i++) {
            if (ContentUtils.selectionHasInlineStyle(editorState, `FONTSIZE-${i}`)) {
                fontSize = i;

                break;
            }
        }

        return fontSize;
    };

    const handleChange = newValue => {
        editorInstance.current.setValue(
            ContentUtils.toggleSelectionFontSize(editorState, `${newValue}`)
        );
    };

    return (
        <Box mx={1}>
            <GroupedButtons
                displayProp={getCurFontSize()}
                handleChange={handleChange}
                mode={"int"}
            />
        </Box>
    );
}

function unitExportFn(unit, type, target) {
    if (type === "line-height") {
        return unit;
    }
    return `${unit / 16}em`;
}

export const editorConfig = (
    editorState,
    setEditorState,
    classes,
    editorInstance,
    setProp,
    theme
) => {
    return {
        language: (languages, context) => {
            if (context === "braft-editor") {
                languages.en.controls.clear = "Empty";
                return languages.en;
            }
        },
        controls: [
            "headings",
            // "font-family",

            {
                key: "font-size",
                type: "component",
                className: classes.fontSize,

                component: (
                    <FontSize
                        editorState={editorState}
                        setEditorState={setEditorState}
                        editorInstance={editorInstance}
                    />
                )
            },

            "separator",

            "bold",
            "italic",
            "underline",
            "text-color",
            "strike-through",
            "superscript",
            "subscript",

            "separator",

            "text-align",

            "separator",

            "link",
            "list-ul",
            `list-ol`,
            "blockquote",
            "hr",

            "separator",

            "remove-styles",
            "emoji",
            "text-indent",

            "separator",

            "line-height",
            "letter-spacing",
            "undo",
            "redo",
            "seperator",
            {
                key: "toolbar-collapse",
                type: "component",
                className: classes.collapseToolbar,

                component: (
                    <Tooltip
                        title="Close Toolbar"
                        arrow
                        classes={{ tooltip: classes.toolTip, arrow: classes.toolTipArrow }}
                    >
                        <Button
                            style={{
                                color: theme.palette.text.secondary
                            }}
                            onClick={() => {
                                setProp(props => {
                                    props.props.hideToolbar = true;
                                });
                                editorInstance.current.draftInstance.blur();
                            }}
                        >
                            <Typography variant="caption">Close</Typography>
                        </Button>
                        {/* <IconButton
                            onClick={() => {
                                setProp(props => {
                                    props.props.hideToolbar = true;
                                });
                                editorInstance.current.draftInstance.blur();
                            }}
                            size="small"
                        >
                            <HighlightOffIcon fontSize="small" />
                        </IconButton> */}
                    </Tooltip>
                )
            }
        ],
        fontFamilies: FONT_FAMILIES,
        converts: { unitExportFn },
        placeHolder: "Text"
    };
};
