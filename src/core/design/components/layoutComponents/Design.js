import { Frame, Element, useEditor, ROOT_NODE } from "@craftjs/core";
import { makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { BodyWrapper, Container } from "../userComponents/index";
import cx from "classnames";
import { ContainerDefaultProps } from "../userComponents/Container/ContainerSettings";
import lz from "lzutf8";

import { decodeJson } from "../../utils/encryptJson";
import { Box } from "@material-ui/core";

const useStyles = makeStyles(() => ({
    design: {
        backgroundColor: "#E0E0E0"
    }
}));

export default function Design({ editorState, onHtmlOpen }) {
    const { actions, enabled, canUndo, canRedo, connectors, rootNode } = useEditor(
        (state, query) => ({
            enabled: state.options.enabled,
            canUndo: query.history.canUndo(),
            canRedo: query.history.canRedo(),
            rootNode: state.nodes[ROOT_NODE]
        })
    );

    const bodyBackgroundColor = rootNode
        ? rootNode.data.props.style.backgroundColor
        : ContainerDefaultProps.style.backgroundColor;
    const bodyBackgroundImage = rootNode
        ? rootNode.data.props.style.backgroundImage
        : ContainerDefaultProps.style.backgroundColor;
    var styleCopy = JSON.parse(JSON.stringify(ContainerDefaultProps));
    styleCopy.style.backgroundColor = "#ffffff";
    styleCopy.parentStyle.paddingTop = 30;
    styleCopy.parentStyle.paddingBottom = 30;
    styleCopy.parentStyle.paddingRight = 30;
    styleCopy.parentStyle.paddingLeft = 30;

    useEffect(() => {
        if (editorState) {
            actions.deserialize(editorState);
        }
    }, [editorState]);

    return (
        <div
            style={{
                backgroundImage: "url(" + bodyBackgroundImage + ")",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundColor: bodyBackgroundColor,
                width: "100%",
                height: "100%",
                overflowX: "hidden",
                overflowY: "scroll"
            }}
            ref={ref => connectors.select(connectors.hover(ref, null), null)}
        >
            <div
                className={cx([
                    "craftjs-renderer h-full w-full transition pb-8",
                    {
                        "overflow-auto": enabled,
                        "overflow-y": "scroll"
                    }
                ])}
            >
                <Box mb={20} mt={3}>
                    <Frame data={editorState}>
                        <BodyWrapper id="wrapper">
                            <Element
                                id="main"
                                canvas
                                is={Container}
                                {...styleCopy}
                                style={{
                                    ...styleCopy.style
                                }}
                                parentStyle={{
                                    ...styleCopy.parentStyle
                                }}
                                props={{
                                    ...ContainerDefaultProps.props,
                                    xs: 7,
                                    id: "Main",
                                    containerType: 1
                                }}
                                custom={{
                                    displayName: "Main"
                                }}
                            >
                                {/* <Button text="Click me" size="small" />

                                <Text />
                                <Element canvas is={Container}>
                                    <Text />
                                    <Button />
                                    <Image />
                                </Element> */}
                            </Element>
                        </BodyWrapper>
                    </Frame>
                </Box>
            </div>
        </div>
    );
}
