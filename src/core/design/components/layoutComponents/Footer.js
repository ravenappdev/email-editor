import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ButtonGroup, Button as MaterialButton } from "@material-ui/core";
import { useEditor } from "@craftjs/core";
import CodeIcon from "@material-ui/icons/Code";
import VisibilityIcon from "@material-ui/icons/Visibility";
import UndoIcon from "@material-ui/icons/Undo";
import RedoIcon from "@material-ui/icons/Redo";
import { SvgIcon } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        position: "fixed",
        bottom: 22,
        top: "auto",
        left: 22,
        zIndex: 1000
    },
    customButton: {
        borderLeftColor: "#fafafa",
        borderRightColor: "#fafafa"
    }
}));
export function Footer({ onPreviewOpen, onHtmlOpen }) {
    const classes = useStyles();
    const { actions, query, canUndo, canRedo } = useEditor((state, query) => ({
        enabled: state.options.enabled,
        canUndo: query.history.canUndo(),
        canRedo: query.history.canRedo()
    }));

    return (
        <div className={classes.root}>
            <ButtonGroup size="small" style={{ background: "#546E7A" }}>
                <MaterialButton
                    title="Undo"
                    onClick={() => {
                        if (canUndo) {
                            actions.history.undo();
                        }
                    }}
                >
                    <SvgIcon htmlColor="#fafafa">
                        <UndoIcon />
                    </SvgIcon>
                </MaterialButton>
                <MaterialButton
                    title="Redo"
                    onClick={() => {
                        if (canRedo) {
                            actions.history.redo();
                        }
                    }}
                >
                    <SvgIcon htmlColor="#fafafa">
                        <RedoIcon />
                    </SvgIcon>
                </MaterialButton>
                <MaterialButton title="Preview" onClick={onPreviewOpen}>
                    <SvgIcon htmlColor="#fafafa">
                        <VisibilityIcon />
                    </SvgIcon>
                </MaterialButton>
                <MaterialButton title="HTML View" onClick={onHtmlOpen}>
                    <SvgIcon htmlColor="#fafafa">
                        <CodeIcon />
                    </SvgIcon>
                </MaterialButton>
            </ButtonGroup>
        </div>
    );
}
