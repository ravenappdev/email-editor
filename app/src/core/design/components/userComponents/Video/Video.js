import { useNode } from "@craftjs/core";
import { Grid } from "@material-ui/core";
import React from "react";
import { VideoDefaultProps, VideoSettings } from "./VideoSettings";
import { CloudinaryContext, Transformation } from "cloudinary-react";
import { Image } from "cloudinary-react";

export const Video = ({ props, style, defaultThumbnail, parentStyle, ...rest }) => {
    const {
        connectors: { connect, drag },
        id
    } = useNode();

    if (!String.prototype.format) {
        String.prototype.format = function() {
            var args = arguments;
            return this.replace(/{(\d+)}/g, function(match, number) {
                return typeof args[number] != "undefined" ? args[number] : match;
            });
        };
    }
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
                    {props.publicId != "" && (
                        <CloudinaryContext cloudName="ravenapp">
                            <Image publicId={props.publicId} style={Object.assign(style)}>
                                <Transformation
                                    overlay={{
                                        url: defaultThumbnail.format(props.height, props.width)
                                    }}
                                />

                                <Transformation flags="layer_apply" />
                            </Image>
                        </CloudinaryContext>
                    )}
                    {props.publicId === "" && (
                        <img src={defaultThumbnail.format(360, 600)} style={style}></img>
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
