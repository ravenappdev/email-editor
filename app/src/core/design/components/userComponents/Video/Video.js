import { useNode } from "@craftjs/core";
import { Grid } from "@material-ui/core";
import React from "react";
import { VideoDefaultProps, VideoSettings } from "./VideoSettings";
import { CloudinaryContext, Transformation } from "cloudinary-react";
import { Image } from "cloudinary-react";
import format from "../../../utils/stringFormat";
export const Video = ({ props, style, defaultThumbnail, parentStyle, ...rest }) => {
    const {
        connectors: { connect, drag },
        id
    } = useNode();

    //bgimage/bgcolor
    var parentStyleCopy = {
        ...parentStyle
    };
    if (parentStyleCopy.backgroundImage !== "") {
        parentStyleCopy.backgroundImage = "url(" + parentStyleCopy.backgroundImage + ")";
    }

    return (
        <Grid
            item
            xs={12}
            id={id}
            style={Object.assign(
                {
                    textAlign: parentStyleCopy.align
                },
                parentStyleCopy
            )}
            ref={connect}
        >
            <a href={props.src} target="_blank" style={Object.assign(style)}>
                <div>
                    {props.thumbnailPublicId != "" && (
                        <CloudinaryContext cloudName="ravenapp">
                            <Image publicId={props.thumbnailPublicId} style={Object.assign(style)}>
                                <Transformation
                                    overlay={{
                                        url: format(defaultThumbnail, props.height, props.width)
                                    }}
                                />

                                <Transformation flags="layer_apply" />
                            </Image>
                        </CloudinaryContext>
                    )}
                    {props.thumbnailPublicId === "" && (
                        <img src={format(defaultThumbnail, 360, 600)} style={style}></img>
                    )}
                </div>
            </a>
        </Grid>
    );
};

Video.craft = {
    props: VideoDefaultProps,
    related: {
        settings: VideoSettings
    },
    displayName: "Video",
    rules: {
        canMoveIn: () => false
    }
};
