import React from "react";

import { makeStyles, Typography, Box } from "@material-ui/core";
import parse, { attributesToProps, domToReact } from "html-react-parser";
import { Grid } from "../Grid";
const useStyles = makeStyles(theme => ({}));
export function TextExport({ props, style, parentStyle }) {
    const classes = useStyles();
    //bgimage/bgcolor
    var pstyleCopy = { ...parentStyle };

    pstyleCopy.backgroundImage = "url(" + pstyleCopy.backgroundImage + ")";

    const typographyElements = ["p", "h1", "h2", "h3", "h4", "h5", "h6"];
    const spacing = {
        "<p></p>": "<p><br/></p>",
        "<br/></br>": "<br/><br/><br/>"
    };
    let html = props.html;
    // html = html.replace(
    //     new RegExp(Object.keys(spacing).join("|"), "gi"),
    //     matched => spacing[matched]
    // );
    const options = {
        replace: ({ attribs, children, name }) => {
            if (attribs) {
                let props = attributesToProps(attribs);
                if (typographyElements.includes(name)) {
                    let styleObj = {
                        ...props.style,
                        whiteSpace: "pre-wrap",
                        wordBreak: "normal",
                        wordWrap: "normal"
                    };
                    return (
                        <Typography variant={name === "p" ? "body2" : name} style={styleObj}>
                            {domToReact(children, options)}
                        </Typography>
                    );
                } else if (name === "hr" || name === "br") {
                    return React.createElement(name, props);
                } else {
                    return React.createElement(name, props, domToReact(children, options));
                }
            }
        }
    };
    return (
        <Grid item xs={12} style={pstyleCopy}>
            <Box className="braft-output-content" style={style}>
                {parse(html, options)}
            </Box>
        </Grid>
    );
}
