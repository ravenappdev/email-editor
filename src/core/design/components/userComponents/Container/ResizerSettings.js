import { useEditor } from "@craftjs/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
    AccordionHeader,
    BackgroundAccordion,
    BorderAccordion,
    MarginAccordion,
    PaddingAccordion
} from "../UtilComponents";

import { ContainerDefaultProps } from "./ContainerSettings";
const useStyles = makeStyles(theme => ({
    root: {
        width: "100%"
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        padding: 2
    },
    Accordion: {
        backgroundColor: "#e0e0e0"
    }
}));

export const ResizerSettings = ({ id, isParent }) => {
    // console.log(id);
    const {
        actions: { setProp },
        state,
        query: { node }
    } = useEditor((state, query) => {
        return {
            state: state
        };
    });
    const props =
        state &&
        state.nodes &&
        state.nodes[id] &&
        state.nodes[id].data &&
        state.nodes[id].data.props
            ? state.nodes[id].data.props
            : ContainerDefaultProps;
    const handleSetProp = val => {
        setProp(id, props => {
            val(props);
        });
    };

    return (
        <>
            {isParent && <AccordionHeader title={"Spacing"} />}
            <MarginAccordion props={props} setProp={handleSetProp} />
            <PaddingAccordion props={props} setProp={handleSetProp} />
            {isParent && <AccordionHeader title={"Decoration"} />}
            <BackgroundAccordion
                props={props}
                setProp={handleSetProp}
                isSelfBg={true}
                defaultImage={ContainerDefaultProps.style.backgroundImage}
            />
            <BorderAccordion props={props} setProp={handleSetProp} />
            {/* <CustomAccordion
                title="Display"
                children={
                    <Box my={2} mr={1} display="flex" flexDirection="column">
                        <Typography variant="caption" color="textSecondary">
                            Display
                        </Typography>
                        <TextField
                            variant="outlined"
                            value={props.style.display}
                            onChange={e => {
                                e.persist();
                                const newValue = e.target.value.toLowerCase();
                                setProp(props => {
                                    if (newValue === "block") {
                                        props.style.display = "block";
                                        props.style.flexWrap = "nowrap";
                                    } else {
                                        props.style.display = "flex";
                                        props.style.flexWrap = "wrap";
                                    }
                                });
                            }}
                            fullWidth
                            margin="dense"
                            size="small"
                            select
                        >
                            <MenuItem key={1} value={"block"}>
                                {"Block"}
                            </MenuItem>
                            <MenuItem key={2} value={"flex"}>
                                {"Flex"}
                            </MenuItem>
                        </TextField>
                    </Box>
                }
            /> */}
        </>
    );
};
