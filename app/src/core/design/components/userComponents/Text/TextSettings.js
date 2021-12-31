import { useNode } from "@craftjs/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    AccordionHeader,
    BackgroundAccordion,
    BorderAccordion,
    MarginAccordion,
    PaddingAccordion
} from "../UtilComponents/SettingsUtils";
import { BORDER, MARGIN } from "../Defaults";
const useStyles = makeStyles(theme => ({
    root: {
        width: "100%"
    }
}));

export const TextSettings = () => {
    const {
        actions: { setProp },
        props
    } = useNode(node => ({
        props: node.data.props
    }));
    const classes = useStyles();
    return (
        <div>
            <AccordionHeader title={"Spacing"} />
            <MarginAccordion props={props} setProp={setProp} />
            <PaddingAccordion props={props} setProp={setProp} styleProp={"style"} />
            <AccordionHeader title={"Decoration"} />
            <BackgroundAccordion
                props={props}
                setProp={setProp}
                isSelfBg={false}
                defaultImage={TextDefaultProps.parentStyle.backgroundImage}
            />
            <BorderAccordion props={props} setProp={setProp} styleProp={"style"} />
        </div>
    );
};

export const TextDefaultProps = {
    props: {
        html: "This is a new Text block. Change the text.",
        contentState: "This is a new Text block. Change the text.",
        hideToolbar: false
    },
    style: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 5,
        paddingLeft: 5,
        textAlign: "left",
        ...BORDER,
        height: "auto",
        fontFamily:
            "-apple-system,BlinkMacSystemFont,‘Segoe UI’,Roboto,Helvetica,Arial,sans-serif,‘Apple Color Emoji’,‘Segoe UI Emoji’,‘Segoe UI Symbol’"
    },
    parentStyle: {
        ...MARGIN,

        backgroundImage: "",
        backgroundColor: "#00000000"
    },
    options: {
        paddingOptions: "less",
        borderOptions: "less"
    }
};
