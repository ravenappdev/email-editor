import { useNode } from "@craftjs/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    AccordionHeader,
    ActionAccordion,
    AlignmentAccordion,
    BackgroundAccordion,
    BorderAccordion,
    MarginAccordion,
    MediaAccordion,
    PaddingAccordion,
    SizeAccordion
} from "../UtilComponents/SettingsUtils";
import { BORDER, MARGIN, PADDING } from "../Defaults";

const DEFAULT_URL =
    "https://res.cloudinary.com/ravenapp/image/upload/c_scale,l_photo-album-icon-png-14_qetrv8,w_150/o_50/v1642597408/cvshvvdzkhrlob4rkfdo_jc3xpx.png";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%"
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        padding: 2
    }
}));
export const ImageSettings = () => {
    const {
        actions: { setProp },
        props
    } = useNode(node => ({
        props: node.data.props
    }));
    const classes = useStyles();

    return (
        <div>
            <AccordionHeader title={"Basic"} />
            <MediaAccordion
                props={props}
                setProp={setProp}
                src={ImageDefaultProps.props.src}
                type={"image"}
            />
            <ActionAccordion props={props} setProp={setProp} />
            <AccordionHeader title={"Size"} />
            <SizeAccordion props={props} setProp={setProp} type={"Width"} />
            <AccordionHeader title={"Spacing"} />
            <AlignmentAccordion props={props} setProp={setProp} />
            <PaddingAccordion props={props} setProp={setProp} />
            <MarginAccordion props={props} setProp={setProp} />
            <AccordionHeader title={"Decoration"} />
            <BackgroundAccordion
                props={props}
                setProp={setProp}
                isSelfBg={false}
                defaultImage={ImageDefaultProps.parentStyle.backgroundImage}
            />
            <BorderAccordion props={props} setProp={setProp} />
        </div>
    );
};

export const ImageDefaultProps = {
    props: {
        path: "#",
        linkTarget: "_self",
        src: DEFAULT_URL,
        altText: "Not found"
    },
    style: {
        width: "100%",
        ...BORDER
    },
    parentStyle: {
        align: "center",
        backgroundImage: "",
        backgroundColor: "#00000000",

        ...PADDING,

        ...MARGIN
    },
    options: {
        paddingOptions: "less",
        borderOptions: "less"
    }
};
