import { Element, useNode } from "@craftjs/core";
import React from "react";
import { Resizer } from "./Resizer";
import { ContainerDefaultProps, ContainerSettings } from "./ContainerSettings";
import { Grid } from "@material-ui/core";

export const Container = ({ children, style, parentStyle, props }) => {
    const type = props.containerType;
    const w = 12 / type;
    const {
        connectors: { connect, drag }
    } = useNode(node => {
        return {};
    });
    return (
        <Resizer craftRef={connect} style={style} parentStyle={parentStyle} props={props}>
            {type > 1 ? (
                <>
                    {[...Array(type)].map((e, i) => {
                        return (
                            <Grid item key={i} xs={w}>
                                <Element
                                    id={`column${i}`}
                                    canvas
                                    is={Resizer}
                                    key={i}
                                    custom={{
                                        displayName: "Column " + `${i + 1}`
                                    }}
                                ></Element>
                            </Grid>
                        );
                    })}
                </>
            ) : (
                <>{children}</>
            )}
        </Resizer>
    );
};

Container.craft = {
    props: ContainerDefaultProps,

    displayName: "Columns",
    related: {
        settings: ContainerSettings
    },
    rules: {
        canMoveIn: (node, self) => {
            if (node.data.displayName === "Columns" && self.data.custom.displayName !== "Main") {
                return false;
            } else return true;
        }
    }
};
