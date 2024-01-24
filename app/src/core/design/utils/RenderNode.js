import React, { useEffect, useRef, useCallback, useState } from "react";
import { withTranslation } from "react-i18next";
import { useNode, useEditor } from "@craftjs/core";
import styled from "styled-components";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import DeleteIcon from "@material-ui/icons/Delete";
import ReactDOM from "react-dom";
import { ROOT_NODE } from "@craftjs/utils";
import { IconButton, makeStyles, Tooltip, useTheme } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import AddIcon from "@material-ui/icons/Add";
import { Toolbox } from "./Toolbox";
import ZoomOutMapIcon from "@material-ui/icons/ZoomOutMap";
import { renderNodeUtils } from "./renderNodeUtils";
import FilterNoneIcon from "@material-ui/icons/FilterNone";

// import cx from "classnames";
const useStyles = makeStyles(theme => ({
  componentSelected: {
    position: "relative",
    border: "thin dashed blue"
  },
  indicatorIcons: {
    marginRight: theme.spacing(1)
  }
}));
const IndicatorDiv = styled.div`
    height: 30px;
    margin-top: -29px;
    font-size: 12px;

    svg {
        fill: #fff;
        width: 15px;
        height: 15px;
    }
`;

let keysDown = {};
function titleCase(str) {
  if (str === "sms" || str === "SMS") {
    return "SMS";
  }

  if (str === "whatsapp" || str === "WHATSAPP") {
    return "WhatsApp";
  }

  if (str == null) {
    return "";
  }

  return str.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
}
export const RenderNode = withTranslation()(({ t, render }) => {
  const { actions, query } = useEditor();
  const classes = useStyles();
  const theme = useTheme();
  const {
    id,
    isActive,
    isHover,
    dom,
    name,
    moveable,
    deletable,
    parent,
    actions: { setProp }
  } = useNode(node => {
    return {
      isActive: Boolean(node.events.selected),
      isHover: node.events.hovered,
      dom: node.dom,
      name: node.data.custom.displayName || node.data.displayName,
      moveable: query.node(node.id).isDraggable(),
      deletable: query.node(node.id).isDeletable(),
      parent: node.data.parent,
      props: node.data.props,
      componentName: node.data.name
    };
  });

  const { src, isSelected } = useEditor(state => {
    const curNodeId = state.events.selected;
    return {
      src: curNodeId ? query.node(curNodeId).get() : {},
      isSelected: Boolean(state.events.selected)
    };
  });

  const [popoverAchorEl, setPopOverAnchorEl] = useState(null);

  useEffect(() => {
    if (!isActive) setPopOverAnchorEl(null);
  }, [isActive]);

  const currentRef = useRef();
  const primaryTransparent = theme.palette.primary.main + "DD";

  useEffect(
    function () {
      if (dom && id !== ROOT_NODE) {
        dom.style.position = "relative";
        dom.style.transition = "all 100ms ease-out";

        // dom.style.borderStyle = "solid";
        // dom.style.borderColor = "transparent";
        // dom.style.borderWidth = "2px";
        // dom.style.transition = "all 100ms ease-out";
        // dom.style.boxShadow = null;
        // dom.style.borderRadius = null;
        // if (isHover || isActive) {
        //     dom.style.borderRadius = "2px";
        //     if (isActive) {
        //         dom.style.borderColor = primaryTransparent;
        //         // dom.style.boxShadow = "0 0 6px " + theme.palette.primary.main + "AA";
        //     } else {
        //         dom.style.borderColor = theme.palette.text.secondary + "DD";
        //         // dom.style.boxShadow = "0 0 6px " + theme.palette.text.primary + "AA";
        //     }
        // }
      }
    },
    [dom, isHover, isActive]
  );

  const getPos = useCallback(function (dom) {
    var _a = dom ? dom.getBoundingClientRect() : { top: 0, left: 0, bottom: 0 };

    return {
      top: `${_a.top}px`,
      left: `${_a.left}px`,
      right: `${_a.right}px`,
      bottom: `${_a.bottom}px`,
      width: _a.width,
      height: _a.height
    };
  }, []);

  const scroll = useCallback(
    function () {
      var currentDOM = currentRef.current;
      if (!currentDOM) return;
      var _a = getPos(dom),
        top = _a.top,
        left = _a.left;
      currentDOM.style.top = top;
      currentDOM.style.left = left;
    },
    [dom]
  );

  useEffect(
    function () {
      document.querySelector(".craftjs-renderer").addEventListener("scroll", scroll);
      return function () {
        document.querySelector(".craftjs-renderer").removeEventListener("scroll", scroll);
      };
    },
    [scroll]
  );

  const { moveUp, moveDown, addNode, duplicateNode } = renderNodeUtils({
    isSelected: isSelected,
    query: query,
    actions: actions,
    src: src
  });

  window.onkeydown = function (e) {
    keysDown[e.key] = true;
    if (isSelected && keysDown["ArrowUp"] && keysDown["Shift"]) {
      moveUp();
    } else if (isSelected && keysDown["ArrowDown"] && keysDown["Shift"]) {
      moveDown();
    }
  };

  window.onkeyup = function (e) {
    keysDown[e.key] = false;
  };
  const border = ({ top, bottom, right, left, height, width, name }) => {
    const borderLabel = `border${titleCase(name)}`;
    return (
      <IndicatorDiv
        ref={currentRef}
        style={{
          position: "absolute",
          zIndex: 1000,
          top: top,
          bottom: bottom,
          left: left,
          right: right,
          height: height,
          width: width,

          alignItems: "center",
          display: "flex",
          [`${borderLabel}Style`]: isHover || isActive ? "solid" : null,
          [`${borderLabel}Width`]: isHover || isActive ? "2px" : null,
          boxShadow: null,

          [`${borderLabel}Radius`]: isHover || isActive ? "2px" : null,
          [`${borderLabel}Color`]:
            isHover || isActive
              ? isActive
                ? primaryTransparent
                : theme.palette.text.secondary + "DD"
              : null
        }}
      />
    );
  };

  return (
    <React.Fragment>
      {(isHover || isActive) && id !== ROOT_NODE
        ? ReactDOM.createPortal(
          <React.Fragment>
            {isActive && id != ROOT_NODE && name !== "Main" && (
              <IndicatorDiv
                ref={currentRef}
                style={{
                  right: -155,
                  top: 27,
                  zIndex: 1000,
                  color: "white",
                  position: "absolute",
                  alignItems: "center",
                  display: "flex",
                  paddingLeft: 10,
                  borderTopRightRadius: 4,
                  borderBottomRightRadius: 4,
                  backgroundColor: primaryTransparent,
                  width: "fit-content"
                }}
              >
                <React.Fragment>
                  {moveable && (
                    <React.Fragment>
                      <Tooltip arrow title={t("moveUp") + " (Shift + ↑)"}>
                        <IconButton
                          className={classes.indicatorIcons}
                          size="small"
                          onClick={moveUp}
                        >
                          <ArrowUpwardIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip arrow title={t("moveDown") + " (Shift + ↓)"}>
                        <IconButton
                          className={classes.indicatorIcons}
                          size="small"
                          onClick={moveDown}
                        >
                          <ArrowDownwardIcon />
                        </IconButton>
                      </Tooltip>
                    </React.Fragment>
                  )}

                  <Tooltip arrow title={t("selectParent")}>
                    <IconButton
                      className={classes.indicatorIcons}
                      size="small"
                      onClick={() => {
                        try {
                          let parentNode = query.node(parent).get();
                          while (
                            parentNode &&
                            parentNode["data"] &&
                            parentNode["data"]["parent"] &&
                            !parentNode["dom"]
                          ) {
                            parentNode = query
                              .node(parentNode["data"]["parent"])
                              .get();
                          }
                          if (parentNode && parentNode["dom"]) {
                            actions.selectNode(parentNode.id);
                          }
                        } catch (err) {
                          return;
                        }
                      }}
                    >
                      <ZoomOutMapIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip arrow title={t("duplicate")}>
                    <IconButton
                      className={classes.indicatorIcons}
                      size="small"
                      onClick={duplicateNode}
                    >
                      <FilterNoneIcon />
                    </IconButton>
                  </Tooltip>
                  {deletable && (
                    <Tooltip arrow title={t("delete")}>
                      <IconButton
                        className={classes.indicatorIcons}
                        size="small"
                        onClick={() => {
                          actions["delete"](id);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </React.Fragment>
              </IndicatorDiv>
            )}
            {(isActive || isHover) && (
              <IndicatorDiv
                ref={currentRef}
                style={{
                  right: -2,
                  top: 7,
                  zIndex: 1000,
                  color: "white",
                  position: "absolute",
                  alignItems: "center",
                  display: "flex",
                  //   visibility: `${getPos(dom).width}`,
                  backgroundColor: isActive
                    ? primaryTransparent
                    : theme.palette.text.secondary + "DD",
                  borderTopLeftRadius: 4,
                  borderTopRightRadius: 4,
                  height: "20px",
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 2,
                  justifyContent: "center",
                  cursor: "pointer"
                }}
              >
                <Typography variant="caption">{name}</Typography>
              </IndicatorDiv>
            )}
            {isActive && id != ROOT_NODE && name !== "Main" && (
              <React.Fragment>
                <Tooltip arrow title={t("addContentAbove")} placement="top">
                  <IndicatorDiv
                    ref={currentRef}
                    style={{
                      left: "42%",
                      top: 7,
                      zIndex: 1000,
                      color: "white",
                      position: "absolute",
                      alignItems: "center",
                      display: "flex",
                      backgroundColor: primaryTransparent,
                      width: "16%",
                      height: "20px",
                      borderTopLeftRadius: 4,
                      borderTopRightRadius: 4,
                      justifyContent: "center",
                      cursor: "pointer"
                    }}
                    onClick={e => {
                      setPopOverAnchorEl({
                        element: e.currentTarget,
                        position: "top",
                        targetNode: src.data.parent
                      });
                      if (name === "Text") {
                        setProp(props => {
                          props.props.hideToolbar = true;
                        });
                      }
                    }}
                  >
                    <AddIcon />
                  </IndicatorDiv>
                </Tooltip>
                <Tooltip arrow title={t("addContentBelow")}>
                  <IndicatorDiv
                    ref={currentRef}
                    style={{
                      left: "42%",
                      bottom: "-20px",
                      zIndex: 1000,
                      color: "white",
                      position: "absolute",
                      alignItems: "center",
                      display: "flex",
                      backgroundColor: primaryTransparent,
                      width: "16%",
                      height: "20px",
                      borderBottomLeftRadius: 4,
                      borderBottomRightRadius: 4,
                      justifyContent: "center",
                      cursor: "pointer"
                    }}
                    onClick={e => {
                      setPopOverAnchorEl({
                        element: e.currentTarget,
                        position: "bottom",
                        targetNode: src.data.parent
                      });
                      if (name === "Text") {
                        setProp(props => {
                          props.props.hideToolbar = true;
                        });
                      }
                    }}
                  >
                    <AddIcon />
                  </IndicatorDiv>
                </Tooltip>
              </React.Fragment>
            )}
            {dom && id !== ROOT_NODE && (
              <React.Fragment>
                <React.Fragment>
                  {border({
                    top: 27,
                    left: 0,
                    width: "100%",
                    height: 0,
                    name: "top"
                  })}
                </React.Fragment>
                <React.Fragment>
                  {border({
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: 0,
                    name: "bottom"
                  })}
                </React.Fragment>
                <React.Fragment>
                  {border({
                    top: 27,
                    bottom: 0,
                    left: 0,
                    width: 0,
                    height: "100%",
                    name: "left"
                  })}
                </React.Fragment>
                <React.Fragment>
                  {border({
                    top: 27,
                    right: 0,
                    width: 0,
                    height: "100%",
                    name: "right"
                  })}
                </React.Fragment>
              </React.Fragment>
            )}

            <Toolbox
              anchorEl={
                isSelected && popoverAchorEl ? popoverAchorEl.element : null
              }
              origin={popoverAchorEl ? popoverAchorEl.position : "top"}
              onClose={() => {
                setPopOverAnchorEl(null);
              }}
              onClick={val => {
                addNode({ ...val, trg: popoverAchorEl.targetNode });
                setPopOverAnchorEl(null);
              }}
            />
          </React.Fragment>,
          dom
        )
        : null}
      {render}
    </React.Fragment>
  );
});
