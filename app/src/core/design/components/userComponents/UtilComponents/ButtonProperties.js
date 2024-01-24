import { MenuItem, Box, Button as MaterialButton } from "@material-ui/core";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { CustomAccordion } from "./Accordion";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { withTranslation } from "react-i18next";

const myStyle = {
  box: {
    display: "flex",
    alignItems: "center"
  },
  select: {
    width: "50%"
  },
  button: {
    marginLeft: "auto",
    order: "2"
  }
};
export const ButtonSizeAccordion = withTranslation()(({ t, props, setProp }) => {
  const handleClick = value => {
    setProp(props => {
      props.style.size = value;
    });
  };
  return (
    <CustomAccordion
      title={t("size")}
      preview={
        <Box px={1} bgcolor="#f1f1f1" borderRadius={5}>
          <Typography variant="caption" color="textSecondary">
            {props.style.size}
          </Typography>
        </Box>
      }
      children={
        <React.Fragment>
          <Box m={1} style={myStyle.box}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={props.style.size}
              label={t("size")}
              margin="dense"
              input={<OutlinedInput />}
              style={myStyle.select}
            >
              <MenuItem value={"small"} onClick={() => handleClick("small")}>
                {t("small")}
              </MenuItem>
              <MenuItem value={"medium"} onClick={() => handleClick("medium")}>
                {t("medium")}
              </MenuItem>
              <MenuItem value={"large"} onClick={() => handleClick("large")}>
                {t("large")}
              </MenuItem>
            </Select>
            <MaterialButton
              variant={"contained"}
              size={props.style.size}
              style={myStyle.button}
            >
              {props.style.size}
            </MaterialButton>
          </Box>
        </React.Fragment>
      }
    />
  );
});

export const ButtonVariantAccordion = withTranslation()(({ t, props, setProp }) => {
  const handleClick = value => {
    setProp(props => {
      props.style.variant = value;
    });
  };

  return (
    <CustomAccordion
      title={t("type")}
      preview={
        <Box px={1} bgcolor="#f1f1f1" borderRadius={5}>
          {props.style.variant === "text" ? (
            <Typography variant="caption" color="textSecondary">
              {"default"}
            </Typography>
          ) : (
            <Typography variant="caption" color="textSecondary">
              {props.style.variant}
            </Typography>
          )}
        </Box>
      }
      children={
        <React.Fragment>
          <Box m={1} style={myStyle.box}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={props.style.variant == "text" ? "default" : props.style.variant}
              label={t("type")}
              margin="dense"
              input={<OutlinedInput />}
              style={myStyle.select}
            >
              <MenuItem value={"default"} onClick={() => handleClick("text")}>
                {t("default")}
              </MenuItem>
              <MenuItem value={"contained"} onClick={() => handleClick("contained")}>
                {t("contained")}
              </MenuItem>
              <MenuItem value={"outlined"} onClick={() => handleClick("outlined")}>
                {t("outlined")}
              </MenuItem>
            </Select>
            <MaterialButton
              onClick={() => handleClick("outlined")}
              variant={props.style.variant}
              style={myStyle.button}
            >
              {props.style.variant == "text" ? "default" : props.style.variant}
            </MaterialButton>
          </Box>
        </React.Fragment>
      }
    />
  );
});
