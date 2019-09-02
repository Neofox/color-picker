import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/DeleteForever";
import styles from "./styles/MiniPaletteStyles";

class MiniPalette extends PureComponent {
  removePalette = evt => {
    evt.stopPropagation();
    this.props.openDialog(this.props.id);
  };

  render() {
    const { classes, paletteName, emoji, colors, handleClick, id } = this.props;
    return (
      <div className={classes.root} onClick={() => handleClick(id)}>
        <DeleteIcon
          className={classes.deleteIcon}
          onClick={this.removePalette}
        />
        <div className={classes.colors}>
          {colors.map(c => (
            <div
              className={classes.miniColor}
              style={{ backgroundColor: c.color }}
              key={c.name}
            />
          ))}
        </div>
        <h5 className={classes.title}>
          {paletteName} <span className={classes.emoji}>{emoji}</span>
        </h5>
      </div>
    );
  }
}

export default withStyles(styles)(MiniPalette);
