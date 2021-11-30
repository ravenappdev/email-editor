import { useNode } from "@craftjs/core";

import { Box, Divider, Grid } from "@material-ui/core";
import React from "react";

import { DividerDefaultProps, DividerSettings } from "./DividerSettings";

export function CustomDivider({ style, parentStyle, ...rest }) {
    const {
        connectors: { connect, drag },
        id
    } = useNode();

    //bgimage/bgcolor
    var parentStyleCopy = {
        ...parentStyle
    };
    if (parentStyleCopy.backgroundImage !== "") {
        parentStyleCopy.backgroundImage = "url(" + parentStyleCopy.backgroundImage + ")";
    }
    const align = {
        right: "flex-end",
        left: "flex-start",
        justify: "flex-start",
        center: "center"
    };
    return (
        <Grid id={id} item xs={12} ref={connect} style={parentStyleCopy}>
            <Box display="flex" width="100%" justifyContent={align[parentStyleCopy.align]}>
                <Divider style={style} />
            </Box>
        </Grid>
    );
}

CustomDivider.craft = {
    props: DividerDefaultProps,
    displayName: "Divider",
    related: {
        settings: DividerSettings
    },
    rules: {
        canMoveIn: () => false
    }
};
