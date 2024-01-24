import _ from "lodash";
import { colors, createTheme as createMuiTheme, responsiveFontSizes } from "@material-ui/core";
import typography from "./typography";
import { softShadows } from "./shadows";
import { THEMES } from "../context/SettingsContext";

const baseConfig = {
  direction: "ltr",
  typography,
  overrides: {
    MuiLinearProgress: {
      root: {
        borderRadius: 3,
        overflow: "hidden"
      }
    },
    MuiListItemIcon: {
      root: {
        minWidth: 32
      }
    },
    MuiChip: {
      root: {
        backgroundColor: "rgba(0,0,0,0.075)"
      }
    }
  }
};

const getThemeConfigs = (theme) => {
  return {
    name: THEMES.LIGHT,
    overrides: {
      MuiInputBase: {
        input: {
          "&::placeholder": {
            opacity: 1,
            color: colors.blueGrey[600]
          }
        }
      },
      MuiButton: {
        containedPrimary: {
          color: colors.common.white,
        }
      }
    },
    palette: {
      type: "light",
      action: {
        active: theme.primary ?? "#a3bc1d"
      },
      background: theme.palette?.background ?? {
        default: colors.common.white,
        dark: "#f4f6f8",
        paper: colors.common.white
      },
      primary: theme.palette?.primary ?? {
        main: theme.primary ?? "#a3bc1d",
      },
      secondary: {
        main: theme.primary ?? "#a3bc1d",
      },
      text: {
        primary: theme.primary_text ?? colors.blueGrey[900],
        secondary: colors.blueGrey[600]
      }
    },
    shadows: softShadows
  };
};

export function createTheme(settings = {}) {
  let themeConfig = getThemeConfigs(settings.theme);

  if (!themeConfig) {
    console.warn(new Error(`The theme ${settings.theme?.theme} is not valid`));
    [themeConfig] = getThemeConfigs();
  }

  let theme = createMuiTheme(
    _.merge({}, baseConfig, themeConfig, { direction: settings.direction })
  );

  if (settings.responsiveFontSizes) {
    theme = responsiveFontSizes(theme);
  }

  return theme;
}
