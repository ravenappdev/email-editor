import { useNode } from "@craftjs/core";
import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";

import { HtmlBoxDefaultProps, HtmlBoxSettings } from "./HtmlBoxSettings";

export const HtmlBox = ({ props, parentStyle, style, ...rest }) => {
    const {
        id,
        connectors: { connect, drag }
    } = useNode();
    useEffect(() => {
        document.getElementById(id).innerHTML = props.html;
    }, [props.html]);
    return (
        <Grid item xs={12} ref={connect} style={parentStyle}>
            <Grid item xs={12} id={id}></Grid>
        </Grid>
    );
};

HtmlBox.craft = {
    props: HtmlBoxDefaultProps,
    related: {
        settings: HtmlBoxSettings
    },
    displayName: "Html Box",
    rules: {
        canMoveIn: () => false
    }
};
