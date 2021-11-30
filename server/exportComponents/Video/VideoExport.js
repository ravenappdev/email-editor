import { CardMedia } from "@material-ui/core";
import { Box } from "@material-ui/core";
import React from "react";
import { Grid } from "../Grid";
import PlayCircleOutlineOutlinedIcon from "@material-ui/icons/PlayCircleOutlineOutlined";
export const VideoExport = ({ props, style, parentStyle, ...rest }) => {
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
                    src="https://raven-images.s3.ap-south-1.amazonaws.com/images/placeholder_video.jpg"
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
