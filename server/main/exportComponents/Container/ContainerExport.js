import React from "react";
import { Grid } from "../Grid";
import { ResizerExport } from "./ResizerExport";

export const ContainerExport = ({ children, id, style, parentStyle, props }) => {
    const type = props.containerType;
    const w = 12 / type;
    const childArray = children.filter(child => child["props"]["children"].length > 0);
    return (
        <ResizerExport id={id} style={style} parentStyle={parentStyle} props={props}>
            {type > 1 ? (
                <tr>
                    {childArray.map((child, i) => {
                        return (
                            <td
                                key={child.props.id}
                                width={`${100 / type}%`}
                                style={{ padding: 0 }}
                                id="containerCol"
                            >
                                <Grid container>{child}</Grid>
                            </td>
                        );
                    })}
                </tr>
            ) : (
                <>{children}</>
            )}
        </ResizerExport>
    );
};
