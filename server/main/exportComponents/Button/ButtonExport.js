import React from "react";
import { Box, Button as MaterialButton, Link } from "@material-ui/core";
import { Grid } from "../Grid";

function getStyles(style) {
  var styles = {
    padding: "",
    fontSize: "",
    backgroundColor: "",
  };

  if (style.size === "large") {
    styles.padding = "8px 22px";
    styles.fontSize = "0.9375rem";
  } else if (style.size === "medium") {
    styles.padding = "7px 16px";
    styles.fontSize = "0.875rem";
  } else {
    styles.padding = "4px 10px";
    styles.fontSize = "0.8125rem";
  }

  if (style.backgroundColor == undefined) {
    if (style.variant === "contained") {
      styles.backgroundColor = "#e0e0e0";
    } else {
      styles.backgroundColor = "#FFFFFF";
    }
  } else {
    styles.backgroundColor = style.backgroundColor;
  }

  return styles;
}
export const ButtonExport = ({ props, id, parentStyle, style, ...rest }) => {
  //bgimage/bgcolor
  var parentStyleCopy = { ...parentStyle };

  parentStyleCopy.backgroundImage =
    "url(" + parentStyleCopy.backgroundImage + ")";
  return (
    <Grid
      id={id}
      item
      xs={12}
      style={Object.assign(
        {
          textAlign: parentStyleCopy.align,
        },
        parentStyleCopy
      )}
    >
      <a
        href={props.path}
        target={"_blank"}
        style={{
          ...style,
          ...getStyles(style),
          display: "inline-block",
        }}
      >
        {props.text}
      </a>
    </Grid>
  );
};
