import React from "react";
import { Box, Button as MaterialButton } from "@material-ui/core";
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
            <form action={props.path} target="_blank" style={{ display: "inline" }}>
                <MaterialButton
                    type="submit"
                    style={Object.assign(
                        {
                            display: "inline-block"
                        },
                        style
                    )}
                >
                    {props.text}
                </MaterialButton>
            </form>
        </Grid>
    );
};
