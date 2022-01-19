import { useNode } from "@craftjs/core";
import { Grid } from "@material-ui/core";
import React from "react";
import { VideoDefaultProps, VideoSettings } from "./VideoSettings";
import { CloudinaryContext, Transformation } from "cloudinary-react";
import { Image } from "cloudinary-react";

export const Video = ({ props, style, parentStyle, ...rest }) => {
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
            {props.src ? (
                <>
                    <a href={props.src} target="_blank" style={Object.assign(style)}>
                        <div>
                            {props.publicId != "" && (
                                <CloudinaryContext cloudName="ravenapp">
                                    <Image publicId={props.publicId} style={Object.assign(style)}>
                                        <Transformation
                                            overlay={{
                                                url: `https://res.cloudinary.com/ravenapp/image/upload/c_scale,h_${props.height},w_${props.width}/c_scale,l_pgs9syqbfhoomsixxirp_yo6xfx,w_100/o_50/v1642597408/cvshvvdzkhrlob4rkfdo_jc3xpx.png`
                                            }}
                                        />

                                        <Transformation flags="layer_apply" />
                                    </Image>
                                </CloudinaryContext>
                            )}
                            {props.publicId === "" && (
                                <img
                                    src="https://res.cloudinary.com/ravenapp/image/upload/c_scale,w_600/c_scale,l_pgs9syqbfhoomsixxirp_yo6xfx,w_100/o_50/v1642597408/cvshvvdzkhrlob4rkfdo_jc3xpx.png"
                                    style={style}
                                ></img>
                            )}
                        </div>
                    </a>
                </>
            ) : (
                <img
                    style={style}
                    src={`https://res.cloudinary.com/ravenapp/image/upload/c_scale,w_600/c_scale,l_pgs9syqbfhoomsixxirp_yo6xfx,w_100/o_50/v1642597408/cvshvvdzkhrlob4rkfdo_jc3xpx.png`}
                />
            )}
            {/* <VideoThumbnail
                videoUrl={videoUrl}
                thumbnailHandler={thumbnail => console.log(typeof thumbnail)}
                width={356}
                height={200}
                style={style}
            /> */}
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
