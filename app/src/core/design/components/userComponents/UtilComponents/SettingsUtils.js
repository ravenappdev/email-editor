import {
    TextField,
    MenuItem,
    Switch,
    Box,
    Slider,
    Button as MaterialButton,
    Link
} from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { MarginComponent, PaddingComponent } from "./PaddingMargin";
import { BorderComponent } from "./Border";
import { CustomAccordion } from "./Accordion";
import { Alignment } from "./Alignment";
import { CustomColorPicker, CustomColorButton } from "./ColorPicker";
import ImageIcon from "@material-ui/icons/Image";
import { IconButton } from "@material-ui/core";
import { Tooltip } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import LaunchIcon from "@material-ui/icons/Launch";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%"
    }
}));

export function PaddingAccordion({ props, setProp, styleProp }) {
    return (
        <CustomAccordion
            title="Padding"
            preview={
                <Box px={1} bgcolor="#f1f1f1" borderRadius={5}>
                    <Typography variant="caption" color="textSecondary">
                        {props[styleProp].paddingTop},&nbsp;
                        {props[styleProp].paddingRight},&nbsp;
                        {props[styleProp].paddingBottom},&nbsp;
                        {props[styleProp].paddingLeft}
                    </Typography>
                </Box>
            }
            children={<PaddingComponent props={props} setProp={setProp} styleProp={styleProp} />}
        />
    );
}
PaddingAccordion.defaultProps = {
    styleProp: "parentStyle"
};
export function MarginAccordion({ props, setProp, styleProp }) {
    return (
        <CustomAccordion
            title="Margin"
            preview={
                <Box px={1} bgcolor="#f1f1f1" borderRadius={5}>
                    <Typography variant="caption" color="textSecondary">
                        {props[styleProp].marginTop},&nbsp;
                        {props[styleProp].marginRight},&nbsp;
                        {props[styleProp].marginBottom},&nbsp;
                        {props[styleProp].marginLeft}
                    </Typography>
                </Box>
            }
            children={<MarginComponent props={props} setProp={setProp} styleProp={styleProp} />}
        />
    );
}
MarginAccordion.defaultProps = {
    styleProp: "parentStyle"
};
export function BorderAccordion({ props, setProp, styleProp }) {
    var borderString =
        props[styleProp].borderRight +
        props[styleProp].borderLeft +
        props[styleProp].borderBottom +
        props[styleProp].borderTop;

    var isBorderExists = borderString && borderString.split("0px").length < 5;

    return (
        <CustomAccordion
            title="Border"
            preview={
                isBorderExists ? (
                    <Box
                        style={{
                            width: 40,
                            height: 25,
                            borderRadius: props[styleProp].borderRadius,
                            borderRight: props[styleProp].borderRight,
                            borderLeft: props[styleProp].borderLeft,
                            borderBottom: props[styleProp].borderBottom,
                            borderTop: props[styleProp].borderTop
                        }}
                    />
                ) : (
                    <Box px={1} bgcolor="#f1f1f1" borderRadius={5}>
                        <Typography variant="caption" color="textSecondary">
                            none
                        </Typography>
                    </Box>
                )
            }
            children={<BorderComponent props={props} setProp={setProp} styleProp={styleProp} />}
        />
    );
}
BorderAccordion.defaultProps = {
    styleProp: "style"
};
export function SizeAccordion({ props, setProp, type }) {
    var size = type === "Width" ? props.style.width : props.style.height;

    function getSize() {
        if (type === "Width") {
            return parseInt(size.substring(0, size.length - 1));
        } else {
            return parseInt(size.substring(0, size.length - 2));
        }
    }

    function setSizeAuto(prop) {
        if (type === "Width") {
            let w = prop.style.width;
            if (w === "auto") w = "100%";
            else w = "auto";
            prop.style.width = w;
        } else {
            let h = prop.style.height;
            if (h === "auto") h = "33px";
            else h = "auto";
            prop.style.height = h;
        }
    }

    function setSize(prop, value) {
        if (type === "Width") {
            prop.style.width = `${value}` + "%";
        } else {
            prop.style.height = `${value}` + "px";
        }
    }

    return (
        <CustomAccordion
            title={type}
            preview={
                <Box px={1} bgcolor="#f1f1f1" borderRadius={5}>
                    <Typography variant="caption" color="textSecondary">
                        {type === "Width" ? props.style.width : props.style.height}
                    </Typography>
                </Box>
            }
            children={
                <Box m={1}>
                    <Box display="flex" alignItems="center" mb={1}>
                        <Typography variant="subtitle2" color="textSecondary">
                            Default
                        </Typography>
                        <Box flexGrow={1} />
                        <Switch
                            checked={size === "auto"}
                            size="small"
                            onChange={() => {
                                setProp(prop => {
                                    setSizeAuto(prop);
                                });
                            }}
                        />
                    </Box>
                    {size !== "auto" && (
                        <Box display="flex" alignItems="center">
                            <Slider
                                value={getSize()}
                                onChange={(e, newValue) => {
                                    setProp(prop => {
                                        setSize(prop, newValue);
                                    });
                                }}
                            />
                            <Typography variant="caption" style={{ marginLeft: "8px" }}>
                                {size}
                            </Typography>
                        </Box>
                    )}
                </Box>
            }
        />
    );
}

export function ActionAccordion({ props, setProp }) {
    return (
        <CustomAccordion
            title="Action"
            preview={
                <Tooltip title={props.props.path}>
                    <IconButton size="small" href={props.props.path} target="_blank">
                        <LaunchIcon fontSize="small" htmlColor="#b4bec3" />
                    </IconButton>
                </Tooltip>
            }
            children={
                <>
                    <Box m={1}>
                        <Typography variant="subtitle2" color="textSecondary">
                            Click URL
                        </Typography>
                        <TextField
                            variant="outlined"
                            value={props.props.path === "#" ? "" : props.props.path}
                            onChange={e => {
                                e.persist();
                                setProp(prop => {
                                    if (e.target.value !== "") prop.props.path = e.target.value;
                                    else prop.props.path = "#";
                                });
                            }}
                            fullWidth
                            margin="dense"
                        />
                    </Box>
                    <Box m={1} mt={2}>
                        <Typography variant="subtitle2" color="textSecondary">
                            Open URL in
                        </Typography>
                        <TextField
                            variant="outlined"
                            value={props.props.linkTarget === "_self" ? "Same Tab" : "New Tab"}
                            onChange={e => {
                                e.persist();
                                setProp(
                                    prop =>
                                        (prop.props.linkTarget =
                                            e.target.value === "New Tab" ? "_blank" : "_self")
                                );
                            }}
                            fullWidth
                            disabled={props.props.path === "#"}
                            margin="dense"
                            select
                        >
                            <MenuItem key={1} value={"Same Tab"}>
                                Same Tab
                            </MenuItem>
                            <MenuItem key={2} value={"New Tab"}>
                                New Tab
                            </MenuItem>
                        </TextField>
                    </Box>
                </>
            }
        />
    );
}

export function BackgroundAccordion({ props, setProp, isSelfBg, defaultImage }) {
    const [isBgImage, setIsBgImage] = React.useState(
        Boolean(isSelfBg ? props.style.backgroundImage : props.parentStyle.backgroundImage)
    );

    function getBg(isBgImage) {
        if (!isBgImage) {
            if (isSelfBg) {
                return props.style.backgroundColor;
            } else {
                return props.parentStyle.backgroundColor;
            }
        } else {
            if (isSelfBg) {
                return props.style.backgroundImage;
            } else {
                return props.parentStyle.backgroundImage;
            }
        }
    }

    function setBg(isBgImage, props, value) {
        if (!isBgImage) {
            if (isSelfBg) {
                props.style.backgroundImage = "";
                props.style.backgroundColor = value;
            } else {
                props.parentStyle.backgroundImage = "";
                props.parentStyle.backgroundColor = value;
            }
        } else {
            if (isSelfBg) {
                props.style.backgroundColor = "#00000000";
                props.style.backgroundImage = value;
            } else {
                props.parentStyle.backgroundColor = "#00000000";
                props.parentStyle.backgroundImage = value;
            }
        }
    }

    const handleBackgroundTypeChange = (event, checked) => {
        setIsBgImage(checked);
    };

    return (
        <CustomAccordion
            title="Background"
            preview={
                isBgImage ? (
                    <Tooltip title={getBg(true)}>
                        <IconButton size="small" href={getBg(true)} target="_blank">
                            <ImageIcon fontSize="small" htmlColor="#b4bec3" />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <CustomColorButton value={getBg(false)} />
                )
            }
            children={
                <>
                    {
                        <Box display="flex" alignItems="center" m={1}>
                            <Typography
                                variant="subtitle2"
                                color={!isBgImage ? "textPrimary" : "textSecondary"}
                            >
                                Color
                            </Typography>
                            <Switch
                                size="small"
                                checked={isBgImage}
                                color="default"
                                onChange={handleBackgroundTypeChange}
                                name="Background Type"
                            />
                            <Typography
                                variant="subtitle2"
                                color={isBgImage ? "textPrimary" : "textSecondary"}
                            >
                                Image
                            </Typography>
                        </Box>
                    }
                    {!isBgImage ? (
                        <Box mt={2} m={1}>
                            {/* <Typography variant="subtitle2" color="textSecondary">
                                Background Image
                            </Typography> */}
                            <CustomColorPicker
                                value={getBg(false)}
                                onChange={val => {
                                    setProp(props => {
                                        setBg(false, props, val);
                                    });
                                }}
                            />
                        </Box>
                    ) : (
                        <Box mt={2} m={1}>
                            <Typography variant="caption" color="textSecondary">
                                Image URL
                            </Typography>
                            <TextField
                                variant="outlined"
                                value={getBg(true) === defaultImage ? "" : getBg(true)}
                                onChange={e => {
                                    e.persist();
                                    setProp(prop => {
                                        if (e.target.value !== "")
                                            setBg(true, prop, e.target.value);
                                        else setBg(true, prop, defaultImage);
                                    });
                                }}
                                fullWidth
                                margin="dense"
                            />
                        </Box>
                    )}
                </>
            }
        />
    );
}

export function AccordionHeader({ title }) {
    return (
        <Box display="flex" alignItems="center" ml={2} mt={4} mb={1}>
            {/* <PhotoSizeSelectSmallIcon
                color="secondary"
                style={{
                    height: 15,
                    width: 15,
                    marginRight: 5
                }}
            /> */}
            <Typography variant="caption" color="secondary">
                {title.toUpperCase()}
            </Typography>
        </Box>
    );
}

export function AlignmentAccordion({ props, setProp }) {
    return (
        <CustomAccordion
            title="Alignment"
            preview={
                <Box px={1} bgcolor="#f1f1f1" borderRadius={5}>
                    <Typography variant="caption" color="textSecondary">
                        {props.parentStyle["align"]}
                    </Typography>
                </Box>
            }
            children={
                <Box m={1}>
                    <Alignment props={props} setProp={setProp} propKey={"align"} />
                </Box>
            }
        />
    );
}

function getColorType(props, type) {
    if (type === "Text") {
        return {
            name: "Text",
            value: props.style.color
        };
    } else {
        return {
            name: type,
            value: props.style.backgroundColor
        };
    }
}

function setColorType(prop, val, type) {
    if (type === "Text") {
        prop.style.color = val;
    } else {
        prop.style.backgroundColor = val;
    }
}

export function ColorAccordion({ props, setProp, types }) {
    return (
        <CustomAccordion
            title="Colors"
            preview={
                <Box display="flex" alignItems="center">
                    {types.map((item, index) => {
                        var ct = getColorType(props, item);
                        return (
                            <CustomColorButton
                                key={index}
                                value={ct.value === undefined ? "" : ct.value}
                                title={ct.name}
                            />
                        );
                    })}
                </Box>
            }
            children={
                <Box m={1} display="flex" alignItems="center" justifyContent="space-between">
                    {types.map((item, index) => {
                        var ct = getColorType(props, item);
                        return (
                            <Box key={index}>
                                <Typography
                                    variant="subtitle2"
                                    color="textSecondary"
                                    style={{ marginBottom: 8 }}
                                >
                                    {ct.name}
                                </Typography>
                                <CustomColorPicker
                                    value={ct.value}
                                    onChange={val => {
                                        setProp(prop => {
                                            setColorType(prop, val, item);
                                        });
                                    }}
                                />
                            </Box>
                        );
                    })}
                </Box>
            }
        />
    );
}

export function MediaAccordion({ props, setProp, src, type }) {
    return (
        <CustomAccordion
            title="Media"
            preview={
                <Tooltip title={props.props.src}>
                    <IconButton size="small" href={props.props.src} target="_blank">
                        {type === "image" ? (
                            <ImageIcon fontSize="small" htmlColor="#b4bec3" />
                        ) : (
                            <YouTubeIcon fontSize="small" htmlColor="#b4bec3" />
                        )}
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
                            value={props.props.src === src ? "" : props.props.src}
                            onChange={e => {
                                e.persist();
                                setProp(props => {
                                    if (e.target.value !== "") props.props.src = e.target.value;
                                    else props.props.src = src;
                                });
                            }}
                            fullWidth
                            margin="dense"
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
                </>
            }
        />
    );
}
