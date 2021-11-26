import React from "react";
import { Grid } from "../Grid";
export function BodyWrapperExport({ style, id, children }) {
    return (
        <Grid container id={id} alignContent="center" justifyContent="center">
            {children}
        </Grid>
    );
}
