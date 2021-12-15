import React from "react";
import { Box, Button as MaterialButton, Link } from "@material-ui/core";
import { Grid } from "../Grid";
export const ButtonExport = ({ props, id, parentStyle, style, ...rest }) => {
    //bgimage/bgcolor
    var parentStyleCopy = { ...parentStyle };

    parentStyleCopy.backgroundImage = "url(" + parentStyleCopy.backgroundImage + ")";

    return (
        <Grid
            id={id}
            item
            xs={12}
            style={Object.assign(
                {
                    textAlign: parentStyleCopy.align
                },
                parentStyleCopy
            )}
        >
            <MaterialButton
                href={props.path}
                target="_blank"
                style={Object.assign(
                    {
                        display: "inline-block"
                    },
                    style
                )}
            >
                {props.text}
            </MaterialButton>
        </Grid>
    );
};
