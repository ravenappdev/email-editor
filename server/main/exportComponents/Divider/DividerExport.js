import { Box, Divider } from "@material-ui/core";
import React from "react";
import { Grid } from "../Grid";

export function CustomDividerExport({ style, parentStyle, ...rest }) {
    //bgimage/bgcolor
    var parentStyleCopy = {
        ...parentStyle
    };

    parentStyleCopy.backgroundImage = "url(" + parentStyleCopy.backgroundImage + ")";

    return (
        <Grid item xs={12} style={parentStyleCopy} alignContent="center">
            <Divider style={style} />
        </Grid>
    );
}
