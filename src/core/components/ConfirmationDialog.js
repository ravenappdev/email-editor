import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Typography
} from "@material-ui/core";

export function ConfirmationDialog({ onYes, onNo, title, content, yesLabel, noLabel }) {
    return (
        <Dialog
            open={true}
            onClose={onNo}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
            PaperProps={{
                style: {
                    maxWidth: "sm"
                }
            }}
        >
            <DialogTitle disableTypography>
                <Typography variant="h4">{title}</Typography>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>{content}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onNo} color="secondary">
                    {noLabel ? noLabel : "NO"}
                </Button>
                <Button onClick={onYes} color="secondary" autoFocus>
                    {yesLabel ? yesLabel : "YES"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
