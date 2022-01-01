import { Grid } from "../Grid";
import parse from "html-react-parser";
import React, { useEffect } from "react";

export const HtmlBoxExport = ({ props, parentStyle, style, ...rest }) => {
    return (
        <Grid item xs={12} style={parentStyle}>
            <div dangerouslySetInnerHTML={{ __html: props.html }}></div>
        </Grid>
    );
};
