import { useNode } from "@craftjs/core";
import React from "react";
import { AccordionHeader, BackgroundAccordion } from "../UtilComponents";
export function BodyWrapperSettings() {
    const {
        actions: { setProp },
        props
    } = useNode(node => ({
        props: node.data.props
    }));
    return (
        <>
            <AccordionHeader title={"Decoration"} />
            <BackgroundAccordion
                props={props}
                setProp={setProp}
                isSelfBg={true}
                defaultImage={BodyWrapperDefaultProps.style.backgroundImage}
            />
        </>
    );
}
export const BodyWrapperDefaultProps = {
    style: {
        backgroundColor: "#e0e0e0",
        backgroundImage: ""
    }
};
