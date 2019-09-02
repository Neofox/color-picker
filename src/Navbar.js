import React, { Component } from "react";
import Slider from "rc-slider";
import { Link } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/styles";
import "rc-slider/assets/index.css";
import styles from "./styles/NavbarStyles";

class Navbar extends Component {
  state = {
    format: "hex",
    open: false
  };

  static defaultProps = {
    showAllColors: false
  };

  handleFormatChange = event => {
    this.setState({ format: event.target.value, open: true });
    this.props.changeFormat(event.target.value);
  };

  closeSnackbar = () => {
    this.setState({ open: false });
  };

  render() {
    const { level, changeLevel, showAllColors, classes } = this.props;
    const { format, open } = this.state;

    return (
      <header className={classes.navbar}>
        <div className={classes.logo}>
          <Link to="/">React Color Picker</Link>
        </div>
        {showAllColors && (
          <div>
            <span>Level: {level}</span>
            <div className={classes.slider}>
              <Slider
                defaultValue={level}
                min={100}
                max={900}
                step={100}
                onChange={changeLevel}
              />
            </div>
          </div>
        )}
        <div className={classes.selectContainer}>
          <Select value={format} onChange={this.handleFormatChange}>
            <MenuItem value="hex">HEX - #ffffff</MenuItem>
            <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
            <MenuItem value="rgba">RBA - rgb(255,255,255, 1.0)</MenuItem>
          </Select>
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            open={open}
            onClose={this.closeSnackbar}
            autoHideDuration={1000}
            ContentProps={{
              "aria-describedby": "message-id"
            }}
            action={[
              <IconButton
                onClick={this.closeSnackbar}
                color="inherit"
                key="close"
                aria-label="close"
              />
            ]}
            message={
              <span id="message-id">
                Format changed to {format.toUpperCase()}!
              </span>
            }
          />
        </div>
      </header>
    );
  }
}

export default withStyles(styles)(Navbar);
