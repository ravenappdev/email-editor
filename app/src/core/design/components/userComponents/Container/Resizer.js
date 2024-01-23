import React, { useState } from "react";
import { useEditor, useNode } from "@craftjs/core";
import { withTranslation } from "react-i18next";
import { Box, Grid, Button as MaterialButton, Tooltip, useTheme } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { ContainerDefaultProps, ContainerSettings } from "./ContainerSettings";
import { Toolbox } from "../../../utils/Toolbox";
import { renderNodeUtils } from "../../../utils/renderNodeUtils";
import AddIcon from "@material-ui/icons/Add";

export const Resizer = ({ children, style, parentStyle, props, craftRef }) => {
  const theme = useTheme();
  const { id, src } = useNode(node => {
    return { src: node };
  });
  const { query, actions } = useEditor();
  const { addNode } = renderNodeUtils({
    isSelected: true,
    query: query,
    actions: actions,
    src: src
  });
  const [popoverAnchorEl, setPopOverAnchorEl] = useState(null);
  return (
    <Grid item ref={craftRef} style={parentStyle} xs={props.xs} id={id}>
      <Grid
        container
        style={{
          ...style,
          backgroundImage: "url(" + style.backgroundImage + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover"
        }}
        alignItems={props.alignItems}
      >
        {children && children.props && children.props.children ? (
          <>{children}</>
        ) : (
          <Box
            //p={8}
            bgcolor={theme.palette.primary.main + "30"}
            width="100%"
            minHeight="25vh"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            style={{
              borderWidth: "thin",
              borderStyle: "dashed",
              borderColor: theme.palette.primary.main,
            }}
          >
            <NoContentLabel />
            <ButtonAddContent setPopOverAnchorEl={element => {
              setPopOverAnchorEl({
                element,
                position: "bottom",
                targetNode: src.id
              });
            }} />
            <Toolbox
              anchorEl={popoverAnchorEl ? popoverAnchorEl.element : null}
              origin={popoverAnchorEl ? popoverAnchorEl.position : "top"}
              onClose={() => {
                setPopOverAnchorEl(null);
              }}
              onClick={val => {
                addNode({ ...val, trg: popoverAnchorEl.targetNode });
                setPopOverAnchorEl(null);
              }}
            />
          </Box>
        )}
      </Grid>
    </Grid>
  );
};
Resizer.craft = {
  props: ContainerDefaultProps,
  displayName: "Block",
  related: {
    settings: ContainerSettings
  }
};

const NoContentLabel = withTranslation()(({ t }) => (
  <Typography variant="body2">{t("noContentPresent")}</Typography>
));

const ButtonAddContent = withTranslation()(({ t, setPopOverAnchorEl }) => (
  <Tooltip title={t("addContent")} placement="bottom" arrow>
    <MaterialButton
      startIcon={<AddIcon />}
      onClick={e => {
        setPopOverAnchorEl(e.currentTarget);
      }}
      style={{ marginTop: 20 }}
      color="secondary"
      size="small"
      variant="outlined"
    >
      {t("add")}
    </MaterialButton>
  </Tooltip>
));
