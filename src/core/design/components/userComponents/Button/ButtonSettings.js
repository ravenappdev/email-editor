import { useNode } from "@craftjs/core";
import { TextField, Box } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {
    PaddingAccordion,
    MarginAccordion,
    BorderAccordion,
    ColorAccordion,
    AlignmentAccordion,
    SizeAccordion,
    ActionAccordion,
    AccordionHeader,
    BackgroundAccordion
} from "../UtilComponents/SettingsUtils";
import { CustomAccordion } from "../UtilComponents/Accordion";
import { GroupedButtons } from "../UtilComponents/GroupedButtons";
import { PADDING, MARGIN, BORDER } from "../Defaults";
const useStyles = makeStyles(theme => ({
    root: {
        width: "100%"
    }
}));

export const ButtonSettings = () => {
    const {
        actions: { setProp },
        props
    } = useNode(node => ({
        props: node.data.props
    }));
    const classes = useStyles();

    let fontSize = props.style.fontSize;

    return (
        <div>
            <AccordionHeader title={"Basic"} />
            <ActionAccordion props={props} setProp={setProp} />
            <CustomAccordion
                title="Text"
                preview={
                    <Box px={1} bgcolor="#f1f1f1" borderRadius={5}>
                        <Typography variant="caption" color="textSecondary">
                            {props.props.text}
                        </Typography>
                    </Box>
                }
                children={
                    <>
                        <Box m={1}>
                            <Typography variant="subtitle2" color="textSecondary">
                                Button Text
                            </Typography>
                            <TextField
                                variant="outlined"
                                value={props.props.text}
                                onChange={e => {
                                    e.persist();
                                    setProp(prop => {
                                        prop.props.text = e.target.value;
                                    });
                                }}
                                fullWidth
                                margin="dense"
                            />
                        </Box>
                        <Box m={1} mt={2}>
                            <Typography
                                variant="subtitle2"
                                color="textSecondary"
                                style={{ marginBottom: 8 }}
                            >
                                Font Size
                            </Typography>
                            <GroupedButtons
                                displayProp={fontSize}
                                handleChange={newValue => {
                                    setProp(props => {
                                        props.style.fontSize = newValue;
                                    });
                                }}
                            />
                        </Box>
                    </>
                }
            />
            <AccordionHeader title={"Size"} />
            <SizeAccordion props={props} setProp={setProp} type={"Width"} />
            <SizeAccordion props={props} setProp={setProp} type={"Height"} />
            <AccordionHeader title={"Spacing"} />
            <AlignmentAccordion props={props} setProp={setProp} />
            <MarginAccordion props={props} setProp={setProp} />
            <PaddingAccordion props={props} setProp={setProp} />
            <AccordionHeader title={"Decoration"} />
            <BackgroundAccordion
                props={props}
                setProp={setProp}
                isSelfBg={false}
                defaultImage={ButtonDefaultProps.parentStyle.backgroundImage}
            />
            <BorderAccordion props={props} setProp={setProp} />
            <ColorAccordion props={props} setProp={setProp} types={["Text", "Button"]} />
        </div>
    );
};

export const ButtonDefaultProps = {
    props: {
        text: "Click me",
        path: "#",
        linkTarget: "_self"
    },
    style: {
        width: "auto",
        height: "auto",
        color: "#ffffff",
        backgroundColor: "#757de8",
        fontSize: 16,
        fontFamily:
            "-apple-system,BlinkMacSystemFont,‘Segoe UI’,Roboto,Helvetica,Arial,sans-serif,‘Apple Color Emoji’,‘Segoe UI Emoji’,‘Segoe UI Symbol’",

        ...BORDER
    },
    parentStyle: {
        align: "center",
        backgroundImage: "",
        backgroundColor: "#00000000",

        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 5,
        paddingLeft: 5,

        ...MARGIN
    },
    options: {
        paddingOptions: "less",
        borderOptions: "less",
        marginOptions: "less"
    }
};
