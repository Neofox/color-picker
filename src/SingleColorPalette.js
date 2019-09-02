import React, { Component } from "react";
import ColorBox from "./ColorBox";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/PaletteStyles";

class SingleColorPalette extends Component {
  state = {
    format: "hex"
  };

  changeFormat = format => {
    this.setState({ format });
  };

  render() {
    const { colors, paletteName, paletteId, emoji, classes } = this.props;
    const { format } = this.state;

    return (
      <div className={classes.palette}>
        <Navbar changeFormat={this.changeFormat} />
        <div className={classes.colors}>
          {colors.map(color => (
            <ColorBox
              key={color.name}
              name={color.name}
              background={color[format]}
            />
          ))}
          <div className={classes.goBack}>
            <Link to={`/palette/${paletteId}`}>Go back</Link>
          </div>
        </div>
        <PaletteFooter name={paletteName} emoji={emoji} />
      </div>
    );
  }
}

export default withStyles(styles)(SingleColorPalette);
