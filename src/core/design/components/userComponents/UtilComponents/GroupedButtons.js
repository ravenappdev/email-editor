import { Button as MaterialButton, ButtonGroup } from "@material-ui/core";
import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Input } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%"
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        margin: 2
    },
    disabledButtons: {
        color: "#eeeeee"
    }
}));

export function GroupedButtons({ displayProp, handleChange, mode }) {
    const classes = useStyles();
    const validateProp = displayProp => {
        if (!displayProp || displayProp === "") {
            return "0";
        }
        return String(displayProp);
    };
    const [state, setState] = React.useState(() => {
        return validateProp(displayProp);
    });

    useEffect(() => {
        if (parseFloat(state) !== parseFloat(validateProp(displayProp))) {
            setState(parseFloat(displayProp));
        }
    }, [validateProp(displayProp)]);
    const regEx = {
        int: /^[0-9]*$/,
        float: /^([0-9]*[.])?[0-9]*$/
    };
    const handleInputChange = e => {
        let value = e.target.value;
        value.replace(" ", "");
        if (value === "") {
            setState("0");
            handleChange(0);
        } else if (regEx[mode].test(value)) {
            value = value.replace(/^0+(?![.])/, "");
            if (value === "") value = "0";
            setState(value);
            handleChange(parseFloat(value));
        }
    };
    const handleOperations = op => {
        let value = parseFloat(state, 2);
        if (value - 1 < 0 && op === "-") {
            value = 0;
            setState("0");
            handleChange(value);
            return;
        }
        op === "-" ? (value -= 1.0) : (value += 1.0);
        value = parseFloat(value.toFixed(2));
        setState(String(value));
        handleChange(value);
    };

    return (
        <ButtonGroup
            size="small"
            color="default"
            disableRipple
            aria-label="outlined primary button group"
        >
            <MaterialButton
                onClick={() => {
                    handleOperations("-");
                }}
            >
                {"-"}
            </MaterialButton>
            <MaterialButton>
                <Input
                    disableUnderline
                    style={{
                        width: "30px",
                        height: "20px",
                        fontSize: "14px"
                    }}
                    inputProps={{
                        style: {
                            textAlign: "center"
                        }
                    }}
                    value={mode === "int" ? String(displayProp) : state}
                    onChange={handleInputChange}
                />
            </MaterialButton>
            <MaterialButton
                onClick={() => {
                    handleOperations("+");
                }}
            >
                {"+"}
            </MaterialButton>
        </ButtonGroup>
    );
}
GroupedButtons.defaultProps = {
    mode: "float"
};
