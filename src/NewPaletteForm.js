import React, { Component } from "react";
import Drawer from "@material-ui/core/Drawer";
import classNames from "classnames";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DraggableColorList from "./DraggableColorList";
import arrayMove from "array-move";
import PaletteFormNav from "./PaletteFormNav";
import ColorPickerForm from "./ColorPickerForm";
import styles from "./styles/NewPaletteFormStyles";
import seedColors from "./seedColors";

const theme = createMuiTheme();

class NewPaletteForm extends Component {
  state = {
    open: true,
    colors: [...seedColors[0].colors],
    newPaletteName: ""
  };

  static defaultProps = {
    maxColors: 20
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  addNewColor = newColor => {
    this.setState(st => ({ colors: [...st.colors, newColor], newName: "" }));
  };

  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ colors }) => ({
      colors: arrayMove(colors, oldIndex, newIndex)
    }));
  };

  handleSubmit = paletteProp => {
    let newPalette = {
      paletteName: paletteProp.name,
      emoji: paletteProp.emoji,
      id: paletteProp.name.toLowerCase().replace(/ /g, "-"),
      colors: this.state.colors
    };
    this.props.savePalette(newPalette);
    this.props.history.push("/");
  };

  deleteColor = colorName => {
    this.setState(st => ({
      colors: st.colors.filter(color => color.name !== colorName)
    }));
  };

  addRandomColor = () => {
    const allColors = seedColors.map(p => p.colors).flat();
    let randColor = {};

    let colorIsDuplicate = true;
    while (colorIsDuplicate) {
      randColor = allColors[Math.floor(Math.random() * allColors.length)];
      colorIsDuplicate = this.state.colors.some(
        color => color.name === randColor.name
      );
    }

    this.setState(({ colors }) => ({ colors: [...colors, randColor] }));
  };

  clearColor = () => {
    this.setState({ colors: [] });
  };

  render() {
    const { classes, maxColors, palettes } = this.props;
    const { open, colors } = this.state;
    const paletteFull = colors.length >= maxColors;

    return (
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <PaletteFormNav
            open={open}
            palettes={palettes}
            handleSubmit={this.handleSubmit}
            handleDrawerOpen={this.handleDrawerOpen}
          />
          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper
            }}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <div className={classes.container}>
              <Typography gutterBottom variant="h4">
                Design your palette
              </Typography>
              <div className={classes.buttons}>
                <Button
                  className={classes.button}
                  onClick={this.clearColor}
                  variant="contained"
                  color="secondary"
                >
                  Clear palette
                </Button>
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  onClick={this.addRandomColor}
                  disabled={paletteFull}
                >
                  Random color
                </Button>
              </div>
              <ColorPickerForm
                paletteFull={paletteFull}
                addNewColor={this.addNewColor}
                colors={colors}
              />
            </div>
          </Drawer>
          <main
            className={classNames(classes.content, {
              [classes.contentShift]: open
            })}
          >
            <div className={classes.drawerHeader} />
            <DraggableColorList
              colors={colors}
              deleteColor={this.deleteColor}
              onSortEnd={this.onSortEnd}
              axis="xy"
            />
          </main>
        </div>
      </ThemeProvider>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
