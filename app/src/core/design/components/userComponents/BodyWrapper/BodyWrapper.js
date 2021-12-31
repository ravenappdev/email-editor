import { useNode } from "@craftjs/core";
import { Grid } from "@material-ui/core";
import React from "react";
import { BodyWrapperDefaultProps, BodyWrapperSettings } from "./BodyWrapperSettings";
export function BodyWrapper({ style, id, children }) {
    const {
        connectors: { connect }
    } = useNode();
    return (
        <Grid container id={id} ref={connect} alignContent="stretch" justifyContent="center">
            {children}
        </Grid>
    );
}
BodyWrapper.craft = {
    props: BodyWrapperDefaultProps,
    related: {
        settings: BodyWrapperSettings
    },
    displayName: "Body",
    rules: {
        canMoveIn: () => false,
        canMoveOut: () => false,
        canDrag: () => false,
        canDrop: () => false
    }
};
