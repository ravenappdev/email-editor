import { Box, useTheme } from "@material-ui/core";
import ImageIcon from "@material-ui/icons/Image";

export const ImagePlaceholder = () => {
  const theme = useTheme();

  return (
    <Box display="flex" alignContent="center" justifyContent="center" flexWrap="wrap" height={100} width="100"
      sx={{
        bgcolor: theme.palette.primary.main + "30"
      }}
    >
      <ImageIcon color="primary" fontSize="large"/>
    </Box>
  )
}
