import { useNode } from "@craftjs/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    AccordionHeader,
    AlignmentAccordion,
    BackgroundAccordion,
    BorderAccordion,
    MarginAccordion,
    PaddingAccordion,
    SizeAccordion
} from "../UtilComponents/SettingsUtils";
import { MediaAccordion } from "../UtilComponents/VideoProperties";
import { BORDER, MARGIN, PADDING } from "../Defaults";

export const DEFAULT_VALUES = {
    height: 360,
    width: 600
};

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
export const VideoSettings = () => {
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
                src={VideoDefaultProps.src}
                thumbnailSrc={VideoDefaultProps.thumbnailSrc}
                defaultThumbnail={VideoDefaultProps.defaultThumbnail}
                defaultValues={DEFAULT_VALUES}
            />
            <AccordionHeader title={"Size"} />
            <SizeAccordion props={props} setProp={setProp} type={"Width"} />
            <AccordionHeader title={"Spacing"} />
            <AlignmentAccordion props={props} setProp={setProp} />
            <MarginAccordion props={props} setProp={setProp} />
            <PaddingAccordion props={props} setProp={setProp} />
            <AccordionHeader title={"Decoration"} />
            <BackgroundAccordion
                props={props}
                setProp={setProp}
                isSelfBg={false}
                defaultImage={VideoDefaultProps.parentStyle.backgroundImage}
            />
            <BorderAccordion props={props} setProp={setProp} />
        </div>
    );
};

export const VideoDefaultProps = {
    props: {
        linkPath: "#",
        linkTarget: "_blank",
        src: "",
        altText: "Not found",
        thumbnailSrc: "",
        thumbnailPublicId: "",
        width: 0,
        height: 0
    },
    defaultThumbnail:
        "https://res.cloudinary.com/ravenapp/image/upload/c_scale,h_{0},w_{1}/c_scale,l_pgs9syqbfhoomsixxirp_yo6xfx,w_100/o_50/v1642597408/cvshvvdzkhrlob4rkfdo_jc3xpx.png",
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
        borderOptions: "less",
        paddingOptions: "less",
        marginOptions: "less"
    }
};
