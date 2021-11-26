import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import {
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Slide,
    Button,
    Tooltip,
    useTheme,
    List
} from "@material-ui/core";
import LaptopIcon from "@material-ui/icons/Laptop";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import Grid from "@material-ui/core/Grid";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import WebAssetIcon from "@material-ui/icons/WebAsset";
import Editor from "../../components/AceEditor";
import Handlebars from "handlebars";
import { HtmlPreview } from "./HtmlPreview";
import OfflineBoltIcon from "@material-ui/icons/OfflineBolt";
import { Divider } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";
import convertHandlebarStringToObject from "../utils/handleBarStringIntoObjects";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    appBar: {
        position: "fixed",
        backgroundColor: "#fff"
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1
    },
    formLabel: {
        color: "black"
    },
    toggleContainer: {
        // margin: theme.spacing(0, 0)
    },
    topbar: {
        backgroundColor: theme.palette.background.dark
    },
    dot: {
        height: "13px",
        width: "13px",
        borderRadius: `50%`,
        display: "inline-block",
        marginRight: 3
    },
    normalBorder: {
        borderStyle: "solid",
        borderColor: "rgba(0, 0, 0, 0.2)",
        borderWidth: 1
    }
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function populateState(previewDoc) {
    let regEx = /{{[{]?(.*?)[}]?}}/g;
    let tmp = previewDoc ? previewDoc.match(regEx) || [] : [];
    let tmp1 = {};
    tmp.map(val => {
        tmp1[val.substring(2, val.length - 2)] = "";
    });
    var str = convertHandlebarStringToObject(tmp1);

    return {
        data: str === "{}" ? "{\n\n}" : str,
        template: () => {},
        previewDoc: previewDoc
    };
}

function ViewPreviewDialog({ previewDoc, onClose, title }) {
    const classes = useStyles();
    const [formats, setFormats] = React.useState("laptop");
    const theme = useTheme();
    const [state, setState] = React.useState(null);

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        props: {}
    });
    const [dataOpen, setDataOpen] = useState(false);
    useEffect(() => {
        const template = previewDoc ? Handlebars.compile(previewDoc) : () => {};
        var newObj = populateState(previewDoc);
        setState({ data: newObj.data, template: template, previewDoc: previewDoc });
    }, [previewDoc]);

    const handleJsonChange = newValue => {
        setState({ ...state, data: newValue });
    };
    const handleFormat = (event, newFormats) => {
        event.persist();
        if (newFormats) {
            setFormats(newFormats);
        }
    };

    const handleApply = () => {
        let f = 0;
        try {
            const data = JSON.parse(state.data);
            f = 1;
            setState({
                ...state,
                previewDoc: state.template(data)
            });
            enqueueSnackbar("Data Applied", { variant: "success" });
        } catch (err) {
            enqueueSnackbar(f ? "Incorrect Handlebars Syntax" : "Invalid JSON Format in Data", {
                variant: "error"
            });
        }
    };

    const handleClose = () => {
        setSnackbar({ ...snackbar, open: false, message: "" });
    };
    const enqueueSnackbar = (message, props) => {
        setSnackbar({
            ...snackbar,
            open: true,
            message: message,
            props: props
        });
    };

    return (
        <Dialog
            open={true}
            onClose={onClose}
            fullWidth
            maxWidth="lg"
            aria-labelledby="max-width-dialog-title"
        >
            <DialogTitle disableTypography>
                <Box display="flex" alignItems="center" width="100%">
                    <Box display="flex" alignItems="center" flexGrow={1}>
                        <Typography variant="h4" className={classes.title} color="textPrimary">
                            {title ? title : "Preview"}
                        </Typography>
                    </Box>
                    <Box flexGrow={2} display="flex" alignItems="center" justifyContent="center">
                        <ToggleButtonGroup
                            exclusive
                            value={[formats]}
                            onChange={handleFormat}
                            aria-label="previewDevices"
                            size="small"
                        >
                            <ToggleButton value="laptop" aria-label="laptop">
                                <Tooltip title={"Laptop"}>
                                    <LaptopIcon />
                                </Tooltip>
                            </ToggleButton>
                            <ToggleButton value="mobile" aria-label="mobile">
                                <Tooltip title={"Mobile"}>
                                    <PhoneAndroidIcon />
                                </Tooltip>
                            </ToggleButton>
                            <ToggleButton value="browser" aria-label="browser">
                                <Tooltip title={"Browser"}>
                                    <WebAssetIcon />
                                </Tooltip>
                            </ToggleButton>
                        </ToggleButtonGroup>
                        <Box mr={1} />
                        <Tooltip title={"Add Dynamic Data"}>
                            <IconButton
                                onClick={() => {
                                    setDataOpen(!dataOpen);
                                }}
                                className={classes.normalBorder}
                                size="small"
                            >
                                <OfflineBoltIcon color={dataOpen ? "primary" : "action"} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Box flexGrow={1} />
                    <Box display="flex" alignItems="flexEnd">
                        {onClose && (
                            <IconButton onClick={onClose}>
                                <CloseIcon size="small" />
                            </IconButton>
                        )}
                    </Box>
                </Box>
            </DialogTitle>
            <DialogContent dividers>
                <Grid
                    container
                    spacing={1}
                    style={{
                        backgroundColor: theme.palette.background.dark,
                        height: "100%",
                        overflow: "hidden"
                    }}
                    alignItems="stretch"
                >
                    {dataOpen && (
                        <Grid
                            item
                            xs={3}
                            style={{
                                backgroundColor: "white",
                                paddingLeft: 25,
                                paddingRight: 25
                            }}
                        >
                            <Box mb={1} mt={2} display="flex" alignItems="center" width="100%">
                                <OfflineBoltIcon
                                    fontSize="small"
                                    htmlColor={theme.palette.text.secondary}
                                    style={{ marginRight: 5 }}
                                />
                                <Typography variant="body2">Dynamic Data</Typography>
                                <Box flexGrow={1}></Box>
                                <Box mr={1} />
                                <Button
                                    size="small"
                                    onClick={handleApply}
                                    style={{
                                        color: theme.palette.text.secondary
                                    }}
                                >
                                    Apply
                                </Button>
                            </Box>
                            <Editor
                                mode="json"
                                value={state.data}
                                onChange={handleJsonChange}
                                height="87%"
                            />
                        </Grid>
                    )}
                    <Divider orientation="vertical" />
                    <Grid
                        item
                        xs={12}
                        sm
                        container
                        justifyContent="center"
                        alignItems="center"
                        style={{
                            height: "75vh",
                            overflowY: "auto"
                        }}
                    >
                        {state === null || state.previewDoc === null ? (
                            <CircularProgress />
                        ) : (
                            <HtmlPreview html={state.previewDoc} format={formats} />
                        )}
                    </Grid>
                </Grid>

                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={2000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                >
                    <Alert
                        severity={
                            snackbar["props"]["variant"] ? snackbar["props"]["variant"] : "success"
                        }
                        style={{
                            width: 250
                        }}
                    >
                        {snackbar["message"]}
                    </Alert>
                </Snackbar>
            </DialogContent>
        </Dialog>
    );
}
export default ViewPreviewDialog;
