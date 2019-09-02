import React, { Component } from "react";
import classNames from "classnames";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import PaletteMetaForm from "./PaletteMetaForm";
import styles from "./styles/PaletteFormNavStyles";

export class PaletteFormNav extends Component {
  state = {
    formShowing: false
  };

  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  handleFormOpen = () => {
    this.setState({ formShowing: true });
  };

  handleFormClose = () => {
    this.setState({ formShowing: false });
  };

  render() {
    const { classes, open, palettes, handleSubmit } = this.props;
    const { formShowing } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          color="default"
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.props.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Create a Palette
            </Typography>
          </Toolbar>
          <div className={classes.navBtn}>
            <Link to="/">
              <Button
                className={classes.button}
                variant="contained"
                color="secondary"
              >
                Go back
              </Button>
            </Link>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={this.handleFormOpen}
            >
              Save
            </Button>
            {formShowing && (
              <PaletteMetaForm
                hideForm={this.handleFormClose}
                palettes={palettes}
                handleSubmit={handleSubmit}
              />
            )}
          </div>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav);
