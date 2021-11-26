import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormatAlignCenterIcon from "@material-ui/icons/FormatAlignCenter";
import FormatAlignJustifyIcon from "@material-ui/icons/FormatAlignJustify";
import FormatAlignLeftIcon from "@material-ui/icons/FormatAlignLeft";
import FormatAlignRightIcon from "@material-ui/icons/FormatAlignRight";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%"
    }
}));

export function Alignment({ props, setProp, propKey }) {
    const classes = useStyles();
    return (
        <ToggleButtonGroup
            exclusive
            value={[props.parentStyle[propKey]]}
            onChange={(e, newValue) => {
                e.persist();
                setProp(props => (props.parentStyle[propKey] = newValue));
            }}
            size="small"
            aria-label="align"
        >
            <ToggleButton value="left" aria-label="left">
                <FormatAlignLeftIcon />
            </ToggleButton>
            <ToggleButton value="center" aria-label="center">
                <FormatAlignCenterIcon />
            </ToggleButton>
            <ToggleButton value="right" aria-label="right">
                <FormatAlignRightIcon />
            </ToggleButton>
            <ToggleButton value="justify" aria-label="justify">
                <FormatAlignJustifyIcon />
            </ToggleButton>
        </ToggleButtonGroup>
    );
}
