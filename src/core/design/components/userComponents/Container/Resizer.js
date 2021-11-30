import React, { useState } from "react";
import { useEditor, useNode } from "@craftjs/core";
import { Box, Grid, Button as MaterialButton, Tooltip } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { ContainerDefaultProps, ContainerSettings } from "./ContainerSettings";
import { Toolbox } from "../../../utils/Toolbox";
import { renderNodeUtils } from "../../../utils/renderNodeUtils";
import AddIcon from "@material-ui/icons/Add";

export const Resizer = ({ children, style, parentStyle, props, craftRef }) => {
    const { id, src } = useNode(node => {
        return { src: node };
    });
    const { query, actions } = useEditor();
    const { addNode } = renderNodeUtils({
        isSelected: true,
        query: query,
        actions: actions,
        src: src
    });
    const [popoverAchorEl, setPopOverAnchorEl] = useState(null);
    return (
        <Grid item ref={craftRef} style={parentStyle} xs={props.xs} id={id}>
            <Grid
                container
                style={{
                    ...style,
                    backgroundImage: "url(" + style.backgroundImage + ")",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover"
                }}
                alignItems={props.alignItems}
            >
                {children && children.props && children.props.children ? (
                    <>{children}</>
                ) : (
                    <Box
                        //p={8}
                        bgcolor="#d9e7ff"
                        width="100%"
                        minHeight="25vh"
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        style={{
                            border: "thin dashed blue"
                        }}
                    >
                        <Typography variant="body2">No content present</Typography>
                        <Tooltip title="Add Content" placement="bottom" arrow>
                            <MaterialButton
                                startIcon={<AddIcon />}
                                onClick={e => {
                                    setPopOverAnchorEl({
                                        element: e.currentTarget,
                                        position: "bottom",
                                        targetNode: src.id
                                    });
                                }}
                                style={{ marginTop: 20 }}
                                color="secondary"
                                size="small"
                                variant="outlined"
                            >
                                Add
                            </MaterialButton>
                        </Tooltip>
                        <Toolbox
                            anchorEl={popoverAchorEl ? popoverAchorEl.element : null}
                            origin={popoverAchorEl ? popoverAchorEl.position : "top"}
                            onClose={() => {
                                setPopOverAnchorEl(null);
                            }}
                            onClick={val => {
                                addNode({ ...val, trg: popoverAchorEl.targetNode });
                                setPopOverAnchorEl(null);
                            }}
                        />
                    </Box>
                )}
            </Grid>
        </Grid>
    );
};
Resizer.craft = {
    props: ContainerDefaultProps,
    displayName: "Block",
    related: {
        settings: ContainerSettings
    }
};
