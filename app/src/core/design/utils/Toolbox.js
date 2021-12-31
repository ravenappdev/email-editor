import React from "react";
import { Element } from "@craftjs/core";
import PropTypes from "prop-types";
import {
    Button,
    Container,
    Text,
    Image,
    Video,
    HtmlBox,
    CustomDivider
} from "../components/userComponents";
import { IconButton, makeStyles, Tooltip, Popover } from "@material-ui/core";
import { Box } from "@material-ui/core";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import ImageIcon from "@material-ui/icons/Image";
import CodeIcon from "@material-ui/icons/Code";
import YouTubeIcon from "@material-ui/icons/YouTube";
import Crop75Icon from "@material-ui/icons/Crop75";
import ViewWeekIcon from "@material-ui/icons/ViewWeek";
import RemoveIcon from "@material-ui/icons/Remove";

const useStyles = makeStyles(theme => ({
    root: {},
    queryField: {
        width: 500
    },
    avatar: {
        height: 42,
        width: 42,
        marginRight: theme.spacing(1)
    },
    paper: {
        padding: theme.spacing(1),
        border: "none"
    },
    fallbackTypography: {
        padding: theme.spacing(1)
    }
}));
export function Toolbox({ anchorEl, onClick, origin, onClose }) {
    const classes = useStyles();
    //   console.log(anchorEl);
    const isDown = origin !== "top";
    return (
        <Popover
            open={Boolean(anchorEl)}
            elevation={5}
            // className={classes.popover}
            classes={{
                paper: classes.paper
            }}
            onClose={onClose}
            anchorEl={anchorEl}
            // onClose={() => handleClose(index)}
            anchorOrigin={{
                vertical: origin,
                horizontal: "center"
            }}
            transformOrigin={{
                vertical: origin === "top" ? "bottom" : "top",
                horizontal: "center"
            }}
        >
            <Box display="flex">
                {/* <Box mt={1} /> */}
                <Tooltip arrow title="Text" aria-label="text" placement={origin}>
                    <IconButton
                        onClick={() => {
                            onClick({ newNode: Text, isDown: isDown });
                        }}
                    >
                        <TextFieldsIcon />
                    </IconButton>
                </Tooltip>
                <Box mr={1} />
                <Tooltip arrow title="Button" aria-label="button" placement={origin}>
                    <IconButton
                        onClick={() => {
                            onClick({ newNode: Button, isDown: isDown });
                        }}
                    >
                        <Crop75Icon />
                    </IconButton>
                </Tooltip>
                <Box mr={1} />
                <Tooltip arrow title="Image" aria-label="image" placement={origin}>
                    <IconButton
                        onClick={() => {
                            onClick({ newNode: Image, isDown: isDown });
                        }}
                    >
                        <ImageIcon />
                    </IconButton>
                </Tooltip>
                <Box mr={1} />
                <Tooltip arrow title="Video" aria-label="video" placement={origin}>
                    <IconButton
                        onClick={() => {
                            onClick({ newNode: Video, isDown: isDown });
                        }}
                    >
                        <YouTubeIcon />
                    </IconButton>
                </Tooltip>
                <Box mr={1} />
                <Tooltip arrow title="Columns" aria-label="container" placement={origin}>
                    <IconButton
                        onClick={() => {
                            onClick({ newNode: Container, isDown: isDown, isCanvas: true });
                        }}
                    >
                        <ViewWeekIcon />
                    </IconButton>
                </Tooltip>
                <Box mr={1} />
                <Tooltip arrow title="Divider" aria-label="divider" placement={origin}>
                    <IconButton
                        onClick={() => {
                            onClick({ newNode: CustomDivider, isDown: isDown });
                        }}
                    >
                        <RemoveIcon />
                    </IconButton>
                </Tooltip>
                <Box mr={1} />
                <Tooltip arrow title="HTML" aria-label="html" placement={origin}>
                    <IconButton
                        onClick={() => {
                            onClick({ newNode: HtmlBox, isDown: isDown });
                        }}
                    >
                        <CodeIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        </Popover>
    );
}
Toolbox.propTypes = {
    anchorEl: PropTypes.object,
    onClick: PropTypes.func.isRequired,
    origin: PropTypes.string,
    onClose: PropTypes.func
};
