import { Switch, Box } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { GroupedButtons } from "./GroupedButtons";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%"
    }
}));

export function PaddingComponent({ props, setProp, styleProp }) {
    return (
        <SpacingChange props={props} setProp={setProp} propType={"Padding"} styleProp={styleProp} />
    );
}
PaddingComponent.defaultProps = {
    styleProp: "parentStyle"
};
export function MarginComponent({ props, setProp, styleProp }) {
    return (
        <SpacingChange props={props} setProp={setProp} propType={"Margin"} styleProp={styleProp} />
    );
}
MarginComponent.defaultProps = {
    styleProp: "parentStyle"
};

function SingleSpacingChange({ propKey, propName, setProp, props, propType, styleProp }) {
    const classes = useStyles();

    function getSpacing() {
        let val = props[styleProp][propKey];
        return val;
    }

    function setSpacing(props, newValue) {
        let Top = propType.toLowerCase() + "Top";
        let Bottom = propType.toLowerCase() + "Bottom";
        let Right = propType.toLowerCase() + "Right";
        let Left = propType.toLowerCase() + "Left";

        if (propName === "All Sides") {
            props[styleProp][Top] = newValue;
            props[styleProp][Bottom] = newValue;
            props[styleProp][Right] = newValue;
            props[styleProp][Left] = newValue;
        } else {
            props[styleProp][propKey] = newValue;
        }
    }

    const handleSetProp = newValue => {
        setProp(props => {
            setSpacing(props, newValue);
        });
    };

    return (
        <Box my={2} display="flex" flexDirection="column">
            <Typography variant="caption" color="textSecondary">
                {propName}
            </Typography>
            <GroupedButtons displayProp={getSpacing()} handleChange={handleSetProp} />
        </Box>
    );
}
function SpacingChange({ props, setProp, propType, styleProp }) {
    function getSpacing() {
        return props[styleProp];
    }

    function setSpacing(props, value) {
        props[styleProp] = {
            ...props[styleProp],
            [Top]: value,
            [Bottom]: value,
            [Right]: value,
            [Left]: value
        };
    }

    const classes = useStyles();
    const options = propType.toLowerCase() + "Options";
    let Top = propType.toLowerCase() + "Top";
    let Bottom = propType.toLowerCase() + "Bottom";
    let Right = propType.toLowerCase() + "Right";
    let Left = propType.toLowerCase() + "Left";

    const handleOptionChange = () => {
        let value = getSpacing()[Top];

        setProp(props => {
            setSpacing(props, value);
            props.options[options] = props.options[options] === "more" ? "less" : "more";
        });
    };

    let isMore = props.options[options] === "more";

    return (
        <Box justifyContent="center" alignItems="center" m={1}>
            <Box display="flex" alignItems="center" mb={1}>
                <Typography variant="subtitle2" color="textSecondary">
                    Uniform
                </Typography>
                <Box flexGrow={1} />
                <Switch
                    checked={props.options[options] !== "more"}
                    size="small"
                    onChange={handleOptionChange}
                />
            </Box>
            {isMore ? (
                <>
                    <Box display="flex" alignItems="center">
                        <SingleSpacingChange
                            propType={propType}
                            propKey={Top}
                            propName="Top"
                            setProp={setProp}
                            props={props}
                            styleProp={styleProp}
                        />
                        <Box flexGrow={1} />
                        <SingleSpacingChange
                            propType={propType}
                            propKey={Right}
                            propName="Right"
                            setProp={setProp}
                            props={props}
                            styleProp={styleProp}
                        />
                    </Box>
                    <Box display="flex" alignItems="center">
                        <SingleSpacingChange
                            propType={propType}
                            propKey={Bottom}
                            propName="Bottom"
                            setProp={setProp}
                            props={props}
                            styleProp={styleProp}
                        />
                        <Box flexGrow={1} />
                        <SingleSpacingChange
                            propType={propType}
                            propKey={Left}
                            propName="Left"
                            setProp={setProp}
                            props={props}
                            styleProp={styleProp}
                        />
                    </Box>
                </>
            ) : (
                <SingleSpacingChange
                    propType={propType}
                    propKey={Top}
                    propName="All Sides"
                    setProp={setProp}
                    props={props}
                    styleProp={styleProp}
                />
            )}
        </Box>
    );
}
