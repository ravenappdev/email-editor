import { Box } from "@material-ui/core";
import { Grid } from "../Grid";
import React from "react";
export const ImageExport = ({ props, style, parentStyle, ...rest }) => {
    //bgimage/bgcolor
    var parentStyleCopy = {
        ...parentStyle
    };

    parentStyleCopy.backgroundImage = "url(" + parentStyleCopy.backgroundImage + ")";
    return (
        <Grid
            item
            xs={12}
            style={Object.assign(
                {
                    textAlign: parentStyleCopy.align
                },
                parentStyleCopy
            )}
        >
            <a
                href={props.path}
                target={props.linkTarget}
                style={{
                    pointerEvents: props.path === "#" ? "none" : "auto"
                }}
            >
                <img src={props.src} width={style.width} alt={props.altText} style={style} />
            </a>
        </Grid>
    );
};
