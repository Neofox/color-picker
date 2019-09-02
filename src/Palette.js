import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import ColorBox from "./ColorBox";
import styles from "./styles/PaletteStyles";

class Palette extends Component {
  state = {
    level: 500,
    format: "hex"
  };

  changeLevel = level => {
    this.setState({ level });
  };

  changeFormat = format => {
    this.setState({ format });
  };

  render() {
    const { classes } = this.props;
    const { colors, paletteName, emoji, id } = this.props.palette;
    const { level, format } = this.state;

    return (
      <div className={classes.palette}>
        <Navbar
          level={level}
          changeFormat={this.changeFormat}
          changeLevel={this.changeLevel}
          showAllColors
        />
        <div className={classes.colors}>
          {colors[level].map(color => (
            <ColorBox
              background={color[format]}
              key={color.id}
              name={color.name}
              id={color.id}
              paletteId={id}
              showFullPalette
            />
          ))}
        </div>
        <PaletteFooter name={paletteName} emoji={emoji} />
      </div>
    );
  }
}

export default withStyles(styles)(Palette);
