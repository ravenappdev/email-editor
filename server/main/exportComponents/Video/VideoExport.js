import { CardMedia } from "@material-ui/core";
import { Box } from "@material-ui/core";
import React from "react";
import { Grid } from "../Grid";
import PlayCircleOutlineOutlinedIcon from "@material-ui/icons/PlayCircleOutlineOutlined";
import { CloudinaryContext, Transformation } from "cloudinary-react";
import { Image } from "cloudinary-react";

export const VideoExport = ({ props, style, parentStyle, ...rest }) => {
  //bgimage/bgcolor
  var parentStyleCopy = {
    ...parentStyle,
  };

  parentStyleCopy.backgroundImage =
    "url(" + parentStyleCopy.backgroundImage + ")";

  return (
    <Grid
      item
      xs={12}
      style={Object.assign(
        {
          textAlign: parentStyleCopy.align,
        },
        parentStyleCopy
      )}
    >
      {props.src ? (
        <>
          <a href={props.src} target="_blank" style={Object.assign(style)}>
            <div>
              {props.publicId != "" && (
                <CloudinaryContext cloudName="ravenapp">
                  <Image publicId={props.publicId} style={Object.assign(style)}>
                    {" "}
                    <Transformation opacity="50" />
                    <Transformation
                      overlay={{
                        url: "https://www.iconpacks.net/icons/1/free-video-icon-818-thumb.png",
                      }}
                      height="100"
                      width="100"
                    />
                    <Transformation flags="layer_apply" />
                  </Image>
                </CloudinaryContext>
              )}
              {props.publicId === "" && (
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUKUCxK0r7OFkqtZcpxSGCo_y1R5T6HTL2JA&usqp=CAU"
                  style={style}
                ></img>
              )}
            </div>
          </a>
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
