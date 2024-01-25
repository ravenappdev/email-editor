import React from "react";

import "braft-editor/dist/index.css";
import { ContentUtils } from "braft-utils";
import { Box, List, ListItem, ListItemText, Tooltip } from "@material-ui/core";
import { GroupedButtons } from "../UtilComponents";
import { Button } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import useSettings from "../../../../../hooks/useSettings";

const FONT_FAMILIES = [
  {
    name: "Default Font",
    family:
      "-apple-system,BlinkMacSystemFont,‘Segoe UI’,Roboto,Helvetica,Arial,sans-serif,‘Apple Color Emoji’,‘Segoe UI Emoji’,‘Segoe UI Symbol’"
  }
];

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

function Placeholder({ editorState, setEditorState, editorInstance }) {
  const { settings } = useSettings();
  const placeholders = settings?.editor?.placeholders ?? [];

  return (
    <Box mx={1} minWidth={200} color="white">
      <List>
        {placeholders.map(({ title, value }) => (
          <ListItem key={value} button onClick={() => {
            editorInstance.current.setValue(
              ContentUtils.insertText(editorState, value)
            );
          }}>
            <ListItemText primary={title} />
          </ListItem>
        ))}
      </List>
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
      "undo",
      "redo",
      "line-height",
      "letter-spacing",
      {
        key: "toolbar-placeholders",
        type: "component",
        type: "dropdown",
        title: "Placeholders",
        showArrow: true,
        arrowActive: false,
        autoHide: true,
        text: "Placeholders",
        component: (
          <Placeholder
            editorState={editorState}
            setEditorState={setEditorState}
            editorInstance={editorInstance}
          />
        )
      },
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
      },
    ],
    fontFamilies: FONT_FAMILIES,
    converts: { unitExportFn },
    placeHolder: "Text"
  };
};
