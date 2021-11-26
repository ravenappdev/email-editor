import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import { Box, useTheme } from "@material-ui/core";
const useStyles = makeStyles(theme => ({
    appBar: {
        position: "fixed",
        backgroundColor: "white"
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1
    },
    formLabel: {
        color: "black"
    },
    toggleContainer: {
        margin: theme.spacing(0, 0)
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
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Laptop({ children }) {
    const classes = useStyles();
    const theme = useTheme();
    return (
        <Box
            display="flex"
            flexDirection="column"
            style={{
                borderRadius: "4px",
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: theme.palette.text.secondary + "88"
            }}
            alignContent="stretch"
            width="98%"
            height="70vh"
        >
            <Box
                display="flex"
                style={{
                    backgroundColor: theme.palette.background.dark,
                    borderRadius: "4px"
                }}
                alignItems="center"
                height="5%"
                p={1}
            >
                <span className={classes.dot} style={{ backgroundColor: "#E35353" }}></span>
                <span className={classes.dot} style={{ backgroundColor: "#FFD725" }}></span>
                <span className={classes.dot} style={{ backgroundColor: "#37A80B" }}></span>
            </Box>
            <Box
                height="95%"
                style={{
                    borderBottomLeftRadius: "4px",
                    borderBottomRightRadius: "4px",
                    backgroundColor: "#fff"
                }}
            >
                {children}
            </Box>
        </Box>
    );
}

export function HtmlPreview({ className, html, format, ...rest }) {
    return (
        <>
            {format !== "browser" && (
                <>
                    {format === "mobile" && (
                        <div className="marvel-device iphone-x">
                            <div class="notch">
                                <div class="camera"></div>
                                <div class="speaker"></div>
                            </div>
                            <div class="top-bar"></div>
                            <div class="sleep"></div>
                            <div class="bottom-bar"></div>
                            <div class="volume"></div>
                            <div class="overflow">
                                <div class="shadow shadow--tr"></div>
                                <div class="shadow shadow--tl"></div>
                                <div class="shadow shadow--br"></div>
                                <div class="shadow shadow--bl"></div>
                            </div>
                            <div class="inner-shadow"></div>
                            <div class="screen">
                                <iframe
                                    frameBorder={0}
                                    srcDoc={html}
                                    width="100%"
                                    height="100%"
                                    style={{ marginTop: 20 }}
                                />
                            </div>
                        </div>
                    )}
                    {format === "laptop" && (
                        <Laptop>
                            <iframe frameBorder={0} srcDoc={html} width="100%" height="100%" />
                        </Laptop>
                    )}
                </>
            )}
            {format === "browser" && (
                <iframe frameBorder={0} srcDoc={html} width="100%" height="100%" />
            )}
        </>
    );
}
