import React from "react";
import { ColorButton, ColorPicker, createColor } from "material-ui-color";
import { Badge } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";

const transparentColorCode = "#00000000";

export function CustomColorPicker({ value, onChange }) {
    const [colorState, setColorState] = React.useState(createColor(value));

    const picker = (
        <ColorPicker
            value={colorState}
            onChange={val => {
                setColorState(val);
                if (!val.error) {
                    onChange("#" + val.hex);
                }
            }}
            hideTextfield
        />
    );

    return value === transparentColorCode ? (
        picker
    ) : (
        <Badge
            badgeContent={
                <CancelIcon
                    color="error"
                    onClick={() => {
                        setColorState(transparentColorCode);
                        onChange(transparentColorCode);
                    }}
                    style={{ padding: 1 }}
                    fontSize="small"
                />
            }
            style={{ cursor: "pointer" }}
        >
            {picker}
        </Badge>
    );
}

export function CustomColorButton({ value, title }) {
    return (
        <ColorButton
            tooltip={title ? title + ": " + value : value}
            color={value}
            size={20}
            style={{ marginLeft: 10 }}
        />
    );
}
