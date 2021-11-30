import { useNode } from "@craftjs/core";
import { Grid } from "@material-ui/core";
import React from "react";
import { ImageDefaultProps, ImageSettings } from "./ImageSettings";

export const Image = ({ props, style, parentStyle, ...rest }) => {
    const {
        connectors: { connect, drag },
        id
    } = useNode();

    //bgimage/bgcolor
    var parentStyleCopy = {
        ...parentStyle
    };

    parentStyleCopy.backgroundImage = "url(" + parentStyleCopy.backgroundImage + ")";
    return (
        <Grid
            item
            id={id}
            xs={12}
            ref={connect}
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

Image.craft = {
    props: ImageDefaultProps,
    displayName: "Image",
    related: {
        settings: ImageSettings
    }
};
