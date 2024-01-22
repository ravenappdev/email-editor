import { Box, useTheme } from "@material-ui/core";
import PlayCircleFilledOutlinedIcon from "@material-ui/icons/PlayCircleFilledOutlined";

export const VideoPlaceholder = () => {
  const theme = useTheme();

  return (
    <Box display="flex" alignContent="center" justifyContent="center" flexWrap="wrap" height={100} width="100"
      sx={{
        bgcolor: theme.palette.primary.main + "30"
      }}
    >
      <PlayCircleFilledOutlinedIcon color="primary" fontSize="large"/>
    </Box>
  )
}
