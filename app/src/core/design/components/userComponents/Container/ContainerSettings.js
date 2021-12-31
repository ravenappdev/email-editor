import { useEditor, useNode } from "@craftjs/core";
import React, { useState } from "react";
import { Button as MaterialButton, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { PADDING, MARGIN, BORDER } from "../Defaults";
import { ConfirmationDialog } from "../../../../components/ConfirmationDialog";

import { CustomAccordion, AccordionHeader } from "../UtilComponents";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { ResizerSettings } from "./ResizerSettings";
import lodash from "lodash";
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

let cnfContent = "";
function Columns({ type, handleColumns, props }) {
    const {
        query: { node }
    } = useEditor();
    const { id } = useNode();
    const children = node(id).descendants();
    let w = 100 / type;
    const [cnfOpen, setCnfOpen] = React.useState(false);
    var normalColumnStyle = {
        border: "thin solid #b4bec3",
        padding: 0,
        height: "4vh",
        background: "#fafafa",
        margin: 2,
        marginRight: 10,
        width: "50%",
        borderRadius: 0
    };

    if (props.props.containerType === type) {
        normalColumnStyle["boxShadow"] = "0 2px 4px 0 rgba(0,0,0,0.2)";
    }

    return (
        <>
            <MaterialButton
                onClick={() => {
                    if (props.props.containerType !== type) {
                        if (props.props.containerType > type) {
                            cnfContent =
                                type === 1
                                    ? "You will lose the content of all the columns. Are you sure?"
                                    : `You will lose the content of last ${props.props
                                          .containerType - type} columns. Are you sure?`;
                            setCnfOpen(true);
                        } else if (props.props.containerType < type) {
                            if (props.props.containerType === 1) {
                                setCnfOpen(true);
                                cnfContent =
                                    "You will lose the content of column 1. Are you sure to add new columns?";
                            } else {
                                handleColumns(type);
                            }
                        }
                    }
                }}
                style={normalColumnStyle}
            >
                <Box display="flex" alignItems="center" width="100%">
                    {[...Array(type)].map((e, i) => {
                        return (
                            <Box
                                key={i}
                                style={{
                                    borderRight: i < type - 1 ? "thin solid #b4bec3" : "none",
                                    width: `${w}` + "%",
                                    height: "4vh"
                                }}
                            />
                        );
                    })}
                </Box>
            </MaterialButton>
            {cnfOpen && (
                <ConfirmationDialog
                    onYes={() => {
                        setCnfOpen(false);
                        handleColumns(type);
                    }}
                    onNo={() => {
                        setCnfOpen(false);
                    }}
                    title="Change Columns"
                    content={cnfContent}
                />
            )}
        </>
    );
}
export const ContainerSettings = () => {
    const { actions, query } = useEditor();

    const {
        id,
        actions: { setProp },
        props,
        name,
        nodes,
        linkedNodes,
        customDisplayName
    } = useNode(node => {
        return {
            props: node.data.props,
            name: node.data.displayName,
            customDisplayName: node.data.custom.displayName,
            nodes: node.data.nodes,
            linkedNodes: node.data.linkedNodes
        };
    });

    const classes = useStyles();
    const [tabValue, setTabValue] = useState(0);
    const handleColumns = value => {
        if (Object.values(linkedNodes).length) {
            let a = [...Object.values(linkedNodes)];

            let n = a.length - (value > 1 ? value : 0);

            while (n > 0 && n--) {
                let tmp = query.node(a[a.length - 1]).toNodeTree()["nodes"];
                tmp = Object.values(tmp);

                if (tmp && tmp.length && tmp[0].data && tmp[0].data.nodes) {
                    let b = [...tmp[0].data.nodes];
                    let n1 = b.length;
                    while (n1 > 0 && n1--) {
                        actions["delete"](b[b.length - 1]);
                        b.pop();
                    }
                }
                actions.setProp(a[a.length - 1], props => {
                    const tmp = lodash.cloneDeep(ContainerDefaultProps);
                    lodash.assignIn(props, tmp);
                });
                a.pop();
            }
        }
        let a = [...nodes];
        let n = a.length;
        while (n > 0 && n--) {
            actions["delete"](a[a.length - 1]);
            a.pop();
        }
        setProp(props => {
            props.props.containerType = value;
        });
    };

    const areaProps = index => {
        return {
            id: `simple-tab-${index}`,
            "aria-controls": `simple-tabpanel-${index}`
        };
    };

    const handleTabs = (e, newValue) => {
        setTabValue(newValue);
    };

    const getNodeId = value => {
        const columnsIds = query.node(id).descendants(false, "linkedNodes");

        if (props && props.props && props.props.containerType > 1 && columnsIds.length) {
            return columnsIds[value];
        } else return id;
    };

    return (
        <>
            <AccordionHeader title={"Basic"} />
            <CustomAccordion
                title="Columns"
                preview={
                    <Box px={1} bgcolor="#f1f1f1" borderRadius={5}>
                        <Typography variant="caption" color="textSecondary">
                            {props.props.containerType +
                                (props.props.containerType === 1 ? " column" : " columns")}
                        </Typography>
                    </Box>
                }
                children={
                    <>
                        <Box
                            display="flex"
                            alignItems="center"
                            mt={2}
                            mb={2}
                            style={{ width: "inherit" }}
                        >
                            <Columns type={1} handleColumns={handleColumns} props={props} />
                            <Box flexGrow={1} />
                            <Columns type={2} handleColumns={handleColumns} props={props} />
                        </Box>
                        <Box display="flex" alignItems="center" mt={2} mb={2}>
                            <Columns type={3} handleColumns={handleColumns} props={props} />
                            <Box flexGrow={1} />
                            <Columns type={4} handleColumns={handleColumns} props={props} />
                        </Box>
                    </>
                }
            />
            {props.props.containerType > 1 && (
                <CustomAccordion
                    title="Column Properties"
                    defaultExpanded={true}
                    children={
                        <>
                            <Tabs
                                value={tabValue}
                                onChange={handleTabs}
                                aria-label="simple tabs example"
                                variant="scrollable"
                                style={{
                                    marginBottom: 10
                                }}
                            >
                                {[...Array(props.props.containerType)].map((e, i) => {
                                    return <Tab key={i} label={`Col ${i + 1}`} {...areaProps(i)} />;
                                })}
                            </Tabs>

                            <ResizerSettings id={getNodeId(tabValue)} />
                        </>
                    }
                />
            )}
            <ResizerSettings id={id} isParent={true} />
        </>
    );
};

export const ContainerDefaultProps = {
    props: {
        containerType: 2,
        xs: 12,
        alignItems: "center"
    },
    style: {
        backgroundImage: "",
        backgroundColor: "#FFFFFF00",
        width: "100%",
        height: "100%",

        ...BORDER
    },
    parentStyle: {
        ...PADDING,
        ...MARGIN
    },
    options: {
        paddingOptions: "less",
        borderOptions: "less"
    }
};
