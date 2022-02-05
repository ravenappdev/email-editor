import { MenuItem, Box, Button as MaterialButton } from "@material-ui/core";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { CustomAccordion } from "./Accordion";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { BorderComponent } from "./Border";
const myStyle = {
    box: {
        display: "flex",
        alignItems: "center"
    },
    select: {
        width: "50%"
    },
    button: {
        marginLeft: "auto",
        order: "2"
    }
};
export function ButtonSizeAccordion({ props, setProp }) {
    const handleClick = value => {
        setProp(props => {
            props.style.size = value;
        });
    };
    return (
        <CustomAccordion
            title="Size"
            preview={
                <Box px={1} bgcolor="#f1f1f1" borderRadius={5}>
                    <Typography variant="caption" color="textSecondary">
                        {props.style.size}
                    </Typography>
                </Box>
            }
            children={
                <>
                    <Box m={1} style={myStyle.box}>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={props.style.size}
                            label="Size"
                            margin="dense"
                            input={<OutlinedInput />}
                            style={myStyle.select}
                        >
                            <MenuItem value={"small"} onClick={() => handleClick("small")}>
                                Small
                            </MenuItem>
                            <MenuItem value={"medium"} onClick={() => handleClick("medium")}>
                                Medium
                            </MenuItem>
                            <MenuItem value={"large"} onClick={() => handleClick("large")}>
                                Large
                            </MenuItem>
                        </Select>
                        <MaterialButton
                            variant={"contained"}
                            size={props.style.size}
                            style={myStyle.button}
                        >
                            {props.style.size}
                        </MaterialButton>
                    </Box>
                </>
            }
        />
    );
}
export function ButtonVariantAccordion({ props, setProp }) {
    const handleClick = value => {
        setProp(props => {
            props.style.variant = value;
        });
    };

    return (
        <CustomAccordion
            title="Type"
            preview={
                <Box px={1} bgcolor="#f1f1f1" borderRadius={5}>
                    {props.style.variant === "text" ? (
                        <Typography variant="caption" color="textSecondary">
                            {"default"}
                        </Typography>
                    ) : (
                        <Typography variant="caption" color="textSecondary">
                            {props.style.variant}
                        </Typography>
                    )}
                </Box>
            }
            children={
                <>
                    <Box m={1} style={myStyle.box}>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={props.style.variant == "text" ? "default" : props.style.variant}
                            label="Type"
                            margin="dense"
                            input={<OutlinedInput />}
                            style={myStyle.select}
                        >
                            <MenuItem value={"default"} onClick={() => handleClick("text")}>
                                Default
                            </MenuItem>
                            <MenuItem value={"contained"} onClick={() => handleClick("contained")}>
                                Contained
                            </MenuItem>
                            <MenuItem value={"outlined"} onClick={() => handleClick("outlined")}>
                                Outlined
                            </MenuItem>
                        </Select>
                        <MaterialButton
                            onClick={() => handleClick("outlined")}
                            variant={props.style.variant}
                            style={myStyle.button}
                        >
                            {props.style.variant == "text" ? "default" : props.style.variant}
                        </MaterialButton>
                    </Box>
                </>
            }
        />
    );
}

export function BorderAccordion({ props, setProp, styleProp, type }) {
    var borderString =
        props[styleProp].borderRight +
        props[styleProp].borderLeft +
        props[styleProp].borderBottom +
        props[styleProp].borderTop;

    if (type === "outlined" && borderString == "0") {
        borderString = "1px solid //#region BFBBBB";
        setProp(props => {
            props[styleProp].borderRight = "1px solid #BFBBBB";
            props[styleProp].borderLeft = "1px solid #BFBBBB";
            props[styleProp].borderTop = "1px solid #BFBBBB";
            props[styleProp].borderBottom = "1px solid #BFBBBB";
        });
    }
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
