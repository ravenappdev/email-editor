import { CardMedia } from "@material-ui/core";
import { Box } from "@material-ui/core";
import React from "react";
import { Grid } from "../Grid";
import PlayCircleOutlineOutlinedIcon from "@material-ui/icons/PlayCircleOutlineOutlined";
import { CloudinaryContext, Transformation } from "cloudinary-react";
import { Image } from "cloudinary-react";

export const VideoExport = ({
  props,
  style,
  defaultThumbnail,
  parentStyle,
  ...rest
}) => {
  if (!String.prototype.format) {
    String.prototype.format = function () {
      var args = arguments;
      return this.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != "undefined" ? args[number] : match;
      });
    };
  }

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
      <a href={props.src} target="_blank" style={Object.assign(style)}>
        <div>
          {props.thumbnailPublicId != "" && (
            <CloudinaryContext cloudName="ravenapp">
              <Image
                publicId={props.thumbnailPublicId}
                style={Object.assign(style)}
              >
                <Transformation
                  overlay={{
                    url: defaultThumbnail.format(props.height, props.width),
                  }}
                />

                <Transformation flags="layer_apply" />
              </Image>
            </CloudinaryContext>
          )}
          {props.thumbnailPublicId === "" && (
            <img src={defaultThumbnail.format(360, 600)} style={style}></img>
          )}
        </div>
      </a>
    </Grid>
  );
};
