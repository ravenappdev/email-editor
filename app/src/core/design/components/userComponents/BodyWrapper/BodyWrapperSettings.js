import React from "react";
import { useNode } from "@craftjs/core";
import { withTranslation } from "react-i18next";
import { AccordionHeader, BackgroundAccordion } from "../UtilComponents";

export const BodyWrapperSettings = withTranslation()(({ t }) => {
  const {
    actions: { setProp },
    props
  } = useNode(node => ({
    props: node.data.props
  }));

  return (
    <>
      <AccordionHeader title={t("decoration")} />
      <BackgroundAccordion
        props={props}
        setProp={setProp}
        isSelfBg={true}
        defaultImage={BodyWrapperDefaultProps.style.backgroundImage}
      />
    </>
  );
});

export const BodyWrapperDefaultProps = {
  style: {
    backgroundColor: "#e0e0e0",
    backgroundImage: ""
  }
};
