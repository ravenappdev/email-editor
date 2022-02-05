import { useNode } from "@craftjs/core";
import React from "react";
import { ButtonDefaultProps, ButtonSettings } from "./ButtonSettings";
import { Button as MaterialButton, Grid, Link, Typography } from "@material-ui/core";

function getStyles(style) {
    var styles = {
        padding: "",
        fontSize: "",
        backgroundColor: ""
    };

    if (style.size === "large") {
        styles.padding = "8px 22px";
        styles.fontSize = "0.9375rem";
    } else if (style.size === "medium") {
        styles.padding = "7px 16px";
        styles.fontSize = "0.875rem";
    } else {
        styles.padding = "4px 10px";
        styles.fontSize = "0.8125rem";
    }

    if (style.backgroundColor == undefined) {
        if (style.variant === "contained") {
            styles.backgroundColor = "#e0e0e0";
        } else {
            styles.backgroundColor = "#FFFFFF";
        }
    } else {
        styles.backgroundColor = style.backgroundColor;
    }

    return styles;
}
export const Button = ({ props, parentStyle, style, ...rest }) => {
    const {
        connectors: { connect, drag },
        id
    } = useNode();
    //bgimage/bgcolor
    var parentStyleCopy = { ...parentStyle };
    if (parentStyleCopy.backgroundImage !== "") {
        parentStyleCopy.backgroundImage = "url(" + parentStyleCopy.backgroundImage + ")";
    }

    return (
        <Grid
            item
            id={id}
            xs={12}
            ref={connect}
            style={Object.assign(
                {
                    textAlign: parentStyleCopy.align
                },
                parentStyleCopy
            )}
        >
            {/* <a
                class="MuiButtonBase-root MuiButton-root MuiButton-text"
                type="button"
                target="_blank"
                style={Object.assign(
                    {
                        display: "inline-block",
                        webkitAppearance: "button",
                        mozAppearance: "button",
                        appearance: "button",
                        textDecoration: "none"
                    },
                    style
                )}
                href={props.path}
            >
                {props.text}
            </a> */}
            <a
                href={props.path}
                target={"_blank"}
                style={{
                    ...style,
                    ...getStyles(style),
                    display: "inline-block"
                }}
            >
                {props.text}
            </a>
        </Grid>
    );
};

Button.craft = {
    props: ButtonDefaultProps,
    related: {
        settings: ButtonSettings
    },
    displayName: "Button",
    rules: {
        canMoveIn: () => false
    }
};
