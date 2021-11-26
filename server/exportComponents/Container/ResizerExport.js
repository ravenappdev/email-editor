import React from "react";
import { Grid } from "../Grid";
export const ResizerExport = ({ children, style, parentStyle, props }) => {
    return (
        <Grid item style={parentStyle} xs={props.xs} id={props.id}>
            <Grid
                container
                style={{
                    ...style,

                    backgroundImage: "url(" + style.backgroundImage + ")",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover"
                }}
                alignItems={props.alignItems}
            >
                <>{children}</>
            </Grid>
        </Grid>
    );
};
