import { useNode } from "@craftjs/core";
import React from "react";
import { ButtonDefaultProps, ButtonSettings } from "./ButtonSettings";
import { Button as MaterialButton, Grid, Link, Typography } from "@material-ui/core";

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
            <MaterialButton
                href={props.path}
                target="_blank"
                size={style.size}
                variant={style.variant}
                style={{
                    ...style,
                    display: "inline-block",
                    borderTop:
                        style.borderTop != null && style.borderTop[0] === "0"
                            ? null
                            : style.borderTop,
                    borderBottom:
                        style.borderBottom != null && style.borderBottom[0] === "0"
                            ? null
                            : style.borderBottom,
                    borderLeft:
                        style.borderLeft != null && style.borderLeft[0] === "0"
                            ? null
                            : style.borderLeft,
                    borderRight:
                        style.borderRight != null && style.borderRight[0] === "0"
                            ? null
                            : style.borderRight
                }}
            >
                {props.text}
            </MaterialButton>
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
