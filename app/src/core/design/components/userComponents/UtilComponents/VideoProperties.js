import { TextField, Box, Button, InputAdornment } from "@material-ui/core";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { CustomAccordion } from "./Accordion";
import { IconButton } from "@material-ui/core";
import { Tooltip } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import exportImageUrl from "../../../../api/exportImageUrl";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import ReplayOutlinedIcon from "@material-ui/icons/ReplayOutlined";

const DEFAULT_THUMBNAIL =
    "https://res.cloudinary.com/ravenapp/image/upload/c_scale,w_600/c_scale,l_pgs9syqbfhoomsixxirp_yo6xfx,w_100/o_50/v1642597408/cvshvvdzkhrlob4rkfdo_jc3xpx.png";

export function MediaAccordion({ props, setProp, src, thumbnailSrc, type }) {
    let thumbnailSrcValue = "",
        tempThumbnailSrcValue = "",
        publicId = "",
        width = 360,
        height = 600;

    function getYoutubeVideoId(url, v_id) {
        let flag = false;

        var re = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.be)\/.+$/;
        if (!re.exec(url)) {
            return false;
        }
        for (let i = 1; i < url.length; i++) {
            if (url[i - 1] == "v" && url[i] == "=") {
                flag = true;
                v_id.src = `https://img.youtube.com/vi/${url.substr(i + 1)}/hqdefault.jpg`;
                v_id.last = url.substr(i + 1);
            }
        }
        return flag;
    }

    const handleClickReset = value => {
        setProp(props => {
            props.props.tempSrc = value;
        });
    };

    const handleClickResetThumbnail = value => {
        setProp(props => {
            props.props.tempThumbnailSrc = value;
        });
    };

    const handleClick = async value => {
        setProp(props => {
            props.props.src = value;
        });

        var v_id = { src: "", last: "" };
        if (
            value != undefined &&
            getYoutubeVideoId(value, v_id) &&
            v_id.src != "" &&
            v_id.last.length === 11
        ) {
            const formData = new FormData();
            formData.append("file", v_id.src);

            const response = await exportImageUrl.generateUrl(formData);

            thumbnailSrcValue = v_id.src;
            tempThumbnailSrcValue = v_id.src;
            publicId = response.public_id;
            width = response.width;
            height = response.height;
        } else {
            thumbnailSrcValue = value == undefined ? "" : DEFAULT_THUMBNAIL;
            tempThumbnailSrcValue = value == undefined ? "" : DEFAULT_THUMBNAIL;
            publicId = "";
        }

        setProp(props => {
            props.props.thumbnailSrc = thumbnailSrcValue;
            props.props.tempThumbnailSrc = tempThumbnailSrcValue;
            props.props.publicId = publicId;
            props.props.width = width;
            props.props.height = height;
        });
    };

    const handleClickThumbnail = async value => {
        const formData = new FormData();
        if (value != undefined) {
            formData.append("file", value);

            try {
                const response = await exportImageUrl.generateUrl(formData);
                width = response.width;
                height = response.height;
                thumbnailSrcValue = value;
                tempThumbnailSrcValue = value;
                publicId = response.public_id;
            } catch (err) {
                publicId = "";
                tempThumbnailSrcValue = DEFAULT_THUMBNAIL;
                thumbnailSrcValue = DEFAULT_THUMBNAIL;
            }
        } else {
            thumbnailSrcValue = DEFAULT_THUMBNAIL;
            publicId = "";
            tempThumbnailSrcValue = DEFAULT_THUMBNAIL;
        }
        setProp(props => {
            props.props.tempThumbnailSrc = tempThumbnailSrcValue;
            props.props.thumbnailSrc = thumbnailSrcValue;
            props.props.publicId = publicId;
            props.props.width = width;
            props.props.height = height;
        });
    };

    return (
        <CustomAccordion
            title="Media"
            preview={
                <Tooltip title={props.props.src}>
                    <IconButton size="small" href={props.props.src} target="_blank">
                        <YouTubeIcon fontSize="small" htmlColor="#b4bec3" />
                    </IconButton>
                </Tooltip>
            }
            children={
                <>
                    <Box m={1}>
                        <Typography variant="subtitle2" color="textSecondary">
                            Media URL
                        </Typography>
                        <TextField
                            variant="outlined"
                            value={props.props.tempSrc === src ? "" : props.props.tempSrc}
                            onChange={e => {
                                e.persist();
                                setProp(props => {
                                    if (e.target.value !== "") props.props.tempSrc = e.target.value;
                                    else props.props.tempSrc = src;
                                });
                            }}
                            fullWidth
                            margin="dense"
                        />
                        <ReplayOutlinedIcon
                            onClick={() => handleClickReset(props.props.src)}
                            style={{ cursor: "pointer", float: "right" }}
                            color="disabled"
                        />
                        <CheckCircleOutlineOutlinedIcon
                            onClick={() => handleClick(props.props.tempSrc)}
                            style={{ cursor: "pointer", float: "right", marginRight: "5px" }}
                            color="disabled"
                        />
                    </Box>
                    <Box m={1} mt={2}>
                        <Typography variant="subtitle2" color="textSecondary">
                            Placeholder text
                        </Typography>
                        <TextField
                            variant="outlined"
                            value={props.props.altText}
                            onChange={e => {
                                e.persist();
                                setProp(props => {
                                    props.props.altText = e.target.value;
                                });
                            }}
                            fullWidth
                            margin="dense"
                        />
                    </Box>
                    {type == "video" && (
                        <Box m={1} mt={2}>
                            <Typography variant="subtitle2" color="textSecondary">
                                Thumbnail URL
                            </Typography>
                            <TextField
                                variant="outlined"
                                value={
                                    props.props.tempThumbnailSrc === thumbnailSrc
                                        ? ""
                                        : props.props.tempThumbnailSrc
                                }
                                onChange={e => {
                                    e.persist();
                                    setProp(props => {
                                        if (e.target.value !== "")
                                            props.props.tempThumbnailSrc = e.target.value;
                                        else props.props.tempThumbnailSrc = thumbnailSrc;
                                    });
                                }}
                                fullWidth
                                margin="dense"
                            />
                            <ReplayOutlinedIcon
                                onClick={() => handleClickResetThumbnail(props.props.thumbnailSrc)}
                                style={{ cursor: "pointer", float: "right" }}
                                color="disabled"
                            />
                            <CheckCircleOutlineOutlinedIcon
                                onClick={() => handleClickThumbnail(props.props.tempThumbnailSrc)}
                                style={{ cursor: "pointer", float: "right", marginRight: "5px" }}
                                color="disabled"
                            />
                        </Box>
                    )}
                </>
            }
        />
    );
}
