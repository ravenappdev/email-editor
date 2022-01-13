import React from "react";
import { Box, Button as MaterialButton, Link } from "@material-ui/core";
import { Grid } from "../Grid";
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
      <MaterialButton
        href={props.path}
        target="_blank"
        size={style.size}
        variant={style.variant}
        style={{
          ...style,
          display: "inline-block",
          borderTop:
            style.borderTop != null && style.borderTop[0] === "0"
              ? null
              : style.borderTop,
          borderBottom:
            style.borderBottom != null && style.borderBottom[0] === "0"
              ? null
              : style.borderBottom,
          borderLeft:
            style.borderLeft != null && style.borderLeft[0] === "0"
              ? null
              : style.borderLeft,
          borderRight:
            style.borderRight != null && style.borderRight[0] === "0"
              ? null
              : style.borderRight,
        }}
      >
        {props.text}
      </MaterialButton>
    </Grid>
  );
};
