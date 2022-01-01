import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { Box } from '@material-ui/core';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formLabel: {
    color: 'black',
  },
  appBar: {
    position: 'fixed',
    backgroundColor: 'white',
    alignContent: 'center',
  },
}));

export function Header({}) {
  const classes = useStyles();

  return (
    <>
      <AppBar className={classes.appBar} elevation={5}>
        <Toolbar>
          <Box display="flex" alignItems="center">
            <IconButton aria-label="close">
              <CloseIcon />
            </IconButton>
            <Box mx={1} />

            <Typography variant="h4" color="textPrimary">
              Email Design
            </Typography>
          </Box>
          <Box flexGrow={1} />

          <Button variant="contained" color="secondary">
            Save Template
          </Button>
        </Toolbar>
      </AppBar>
      {/* {cnfOpen && <ConfirmationDialog {...cnfArgs} />} */}
    </>
  );
}
