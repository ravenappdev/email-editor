import { useNode } from "@craftjs/core";
import { Grid } from "@material-ui/core";
import React from "react";
import { VideoDefaultProps, VideoSettings } from "./VideoSettings";
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
                    {/* <PlayCircleOutlineOutlinedIcon
                        htmlColor="#fafafa"
                        fontSize="large"
                        style={{ position: "absolute" }}
                    /> */}
                    <video style={style} controls>
                        <source src={props.src} type="video/mp4" />
                        Your browser does not support HTML video.
                    </video>
                </>
            ) : (
                <img
                    style={style}
                    src={`https://raven-images.s3.ap-south-1.amazonaws.com/images/placeholder_video.jpg`}
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
