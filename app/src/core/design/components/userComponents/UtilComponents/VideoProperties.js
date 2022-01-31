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
import format from "../../../utils/stringFormat";

export function MediaAccordion({ props, setProp, src, thumbnailSrc, defaultValues }) {
    const [tempThumbnailSrc, setTempThumbnailSrc] = React.useState(props.props.thumbnailSrc);
    const [tempSrc, setTempSrc] = React.useState(props.props.src);

    let thumbnailSrcValue = "",
        publicId = "",
        width = defaultValues.width,
        height = defaultValues.height,
        defaultThumbnailUrl = format(
            defaultValues.thumbnail,
            defaultValues.height,
            defaultValues.width
        );

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

    const handleResetMediaURL = value => {
        setTempSrc(value);
    };

    const handleResetThumbnailURL = value => {
        setTempThumbnailSrc(value);
    };

    const handleDoneMedialURL = async value => {
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
            publicId = response.public_id;
            width = response.width;
            height = response.height;
        } else {
            thumbnailSrcValue = value == undefined ? "" : defaultThumbnailUrl;
            publicId = "";
        }
        setTempThumbnailSrc(thumbnailSrcValue);
        setProp(props => {
            props.props.thumbnailSrc = thumbnailSrcValue;
            props.props.thumbnailPublicId = publicId;
            props.props.width = width;
            props.props.height = height;
        });
    };

    const handleDoneThumbnailURL = async value => {
        const formData = new FormData();
        if (value != undefined) {
            formData.append("file", value);

            try {
                const response = await exportImageUrl.generateUrl(formData);
                width = response.width;
                height = response.height;
                thumbnailSrcValue = value;
                publicId = response.public_id;
            } catch (err) {
                publicId = "";
                thumbnailSrcValue = defaultThumbnailUrl;
            }
        } else {
            thumbnailSrcValue = defaultThumbnailUrl;
            publicId = "";
        }
        setTempThumbnailSrc(thumbnailSrcValue);
        setProp(props => {
            props.props.thumbnailSrc = thumbnailSrcValue;
            props.props.thumbnailPublicId = publicId;
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
                            value={tempSrc === src ? "" : tempSrc}
                            onChange={e => {
                                e.persist();
                                if (e.target.value !== "") setTempSrc(e.target.value);
                                else setTempSrc(src);
                            }}
                            fullWidth
                            margin="dense"
                        />
                        <ReplayOutlinedIcon
                            onClick={() => handleResetMediaURL(props.props.src)}
                            style={{ cursor: "pointer", float: "right" }}
                            color="disabled"
                        />
                        <CheckCircleOutlineOutlinedIcon
                            onClick={() => handleDoneMedialURL(tempSrc)}
                            style={{ cursor: "pointer", float: "right", marginRight: 5 }}
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
                    <Box m={1} mt={2}>
                        <Typography variant="subtitle2" color="textSecondary">
                            Thumbnail URL
                        </Typography>
                        <TextField
                            variant="outlined"
                            value={tempThumbnailSrc === thumbnailSrc ? "" : tempThumbnailSrc}
                            onChange={e => {
                                e.persist();
                                if (e.target.value !== "") setTempThumbnailSrc(e.target.value);
                                else setTempThumbnailSrc(thumbnailSrc);
                            }}
                            fullWidth
                            margin="dense"
                        />
                        <ReplayOutlinedIcon
                            onClick={() => handleResetThumbnailURL(props.props.thumbnailSrc)}
                            style={{ cursor: "pointer", float: "right" }}
                            color="disabled"
                        />
                        <CheckCircleOutlineOutlinedIcon
                            onClick={() => handleDoneThumbnailURL(tempThumbnailSrc)}
                            style={{
                                cursor: "pointer",
                                float: "right",
                                marginRight: 5
                            }}
                            color="disabled"
                        />
                    </Box>
                </>
            }
        />
    );
}
