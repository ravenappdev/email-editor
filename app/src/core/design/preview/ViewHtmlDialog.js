import React from "react";
import { Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { Box } from "@material-ui/core";
import Editor from "../../components/AceEditor";
import { CircularProgress } from "@material-ui/core";

const decoder = require("he");
const unescapeHTML = htmlBody => {
    if (htmlBody == null) {
        return null;
    }
    return decoder.decode(htmlBody);
};
function ViewHtmlDialog({ html, onClose }) {
    return (
        <Dialog
            open={true}
            onClose={onClose}
            fullWidth
            maxWidth="lg"
            aria-labelledby="max-width-dialog-title"
        >
            <DialogTitle disableTypography>
                <Box width="100%" display="flex" alignItems="center">
                    <Typography variant="h4">HTML</Typography>
                    <Box flexGrow={1} />
                    <IconButton onClick={onClose}>
                        <CloseIcon size="small" />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent dividers>
                {html === null ? (
                    <CircularProgress />
                ) : (
                    <Editor
                        mode="html"
                        isView={true}
                        defaultValue=""
                        value={unescapeHTML(html)}
                        disableSyntaxCheck={true}
                    ></Editor>
                )}
            </DialogContent>
        </Dialog>
    );
}
export default ViewHtmlDialog;
