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
                    <Transformation
                      overlay={{
                        url: `https://res.cloudinary.com/ravenapp/image/upload/c_scale,h_${props.height},w_${props.width}/c_scale,l_pgs9syqbfhoomsixxirp_yo6xfx,w_100/o_50/v1642597408/cvshvvdzkhrlob4rkfdo_jc3xpx.png`,
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
