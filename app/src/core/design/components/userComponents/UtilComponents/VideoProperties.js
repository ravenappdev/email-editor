import { TextField, Box, Button } from "@material-ui/core";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { CustomAccordion } from "./Accordion";
import { IconButton } from "@material-ui/core";
import { Tooltip } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import axios from "axios";

export function MediaAccordion({ props, setProp, src, thumbnailSrc, type }) {
    const defaultThumbnail =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUKUCxK0r7OFkqtZcpxSGCo_y1R5T6HTL2JA&usqp=CAU";

    function getVideoId(url, v_id) {
        let flag = false;

        if (url.substr(0, 31) != "https://www.youtube.com/watch?v") {
            return false;
        }

        for (let i = 0; i < url.length; i++) {
            if (url[i] == "=") {
                flag = true;
                v_id.src = "https://img.youtube.com/vi/" + url.substr(i + 1) + "/hqdefault.jpg";
                v_id.last = url.substr(i + 1);
            }
        }
        return flag;
    }

    const handleClick = async value => {
        setProp(props => {
            props.props.src = value;
        });

        var v_id = { src: "", last: "" };
        if (
            value != undefined &&
            getVideoId(value, v_id) &&
            v_id.src != "" &&
            v_id.last.length === 11
        ) {
            const formData = new FormData();
            formData.append("file", v_id.src);
            formData.append("upload_preset", "kuspnbei");
            let public_id;
            try {
                const resp = await axios.post(
                    "https://api.cloudinary.com/v1_1/ravenapp/image/upload",
                    formData
                );

                public_id = resp.data.public_id;
            } catch (err) {
                console.error(err);
            }
            setProp(props => {
                props.props.thumbnailSrc = v_id.src;
                props.props.tempThumbnailSrc = v_id.src;
                props.props.publicId = public_id;
            });
        } else {
            setProp(props => {
                props.props.thumbnailSrc = value === undefined ? "" : defaultThumbnail;
                props.props.tempThumbnailSrc = value === undefined ? "" : defaultThumbnail;
                props.props.publicId = "";
            });
        }
    };

    const handleClickThumbnail = async value => {
        const formData = new FormData();
        if (value != undefined) {
            formData.append("file", value);
            formData.append("upload_preset", "kuspnbei");
            let public_id;
            try {
                const resp = await axios.post(
                    "https://api.cloudinary.com/v1_1/ravenapp/image/upload",
                    formData
                );

                public_id = resp.data.public_id;
            } catch (err) {
                console.error(err);
            }
            setProp(props => {
                props.props.thumbnailSrc = value;
                props.props.publicId = public_id;
            });
        } else {
            setProp(props => {
                props.props.thumbnailSrc = defaultThumbnail;
                props.props.publicId = "";
                props.props.tempThumbnailSrc = defaultThumbnail;
            });
        }
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
                        {props.props.tempSrc != props.props.src && (
                            <Button onClick={() => handleClick(props.props.tempSrc)}>Done</Button>
                        )}
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
                            {props.props.tempThumbnailSrc != props.props.thumbnailSrc && (
                                <Button
                                    onClick={() =>
                                        handleClickThumbnail(props.props.tempThumbnailSrc)
                                    }
                                >
                                    Done
                                </Button>
                            )}
                        </Box>
                    )}
                </>
            }
        />
    );
}
