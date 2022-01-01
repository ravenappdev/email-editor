import { Box } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React from "react";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";

export const Accordion = withStyles({
    root: {
        border: "1px solid rgba(0, 0, 0, .125)",
        boxShadow: "none",
        "&:not(:last-child)": {
            borderBottom: 0
        },
        "&:before": {
            display: "none"
        },
        "&$expanded": {
            margin: "auto"
        }
    },
    expanded: {}
})(MuiAccordion);

export const AccordionSummary = withStyles({
    root: {
        backgroundColor: "#fafafa",
        borderBottom: "1px solid rgba(0, 0, 0, .125)",
        marginBottom: -1,
        minHeight: 56,
        "&$expanded": {
            minHeight: 56
        }
    },
    content: {
        "&$expanded": {
            margin: "12px 0"
        }
    },
    expanded: {}
})(MuiAccordionSummary);

export const AccordionDetails = withStyles(theme => ({
    root: {
        padding: theme.spacing(2)
    }
}))(MuiAccordionDetails);

export function CustomAccordion({ title, preview, children, defaultExpanded }) {
    return (
        <Accordion defaultExpanded={defaultExpanded ? true : false}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box display="flex" width="100%">
                    <Typography variant="h5">{title}</Typography>
                    <Box flexGrow={1} />
                    {preview}
                </Box>
            </AccordionSummary>
            <AccordionDetails>
                <Box width="100%">{children}</Box>
            </AccordionDetails>
        </Accordion>
    );
}
