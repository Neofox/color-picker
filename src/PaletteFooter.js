import React from "react";
import { withStyles } from "@material-ui/styles";

const styles = {
  footer: {
    backgroundColor: "white",
    height: "5vh",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    fontWeight: "bold"
  },
  emoji: {
    fontSize: "1.5rem",
    margin: "1rem"
  }
};

const PaletteFooter = ({ name, emoji, classes }) => {
  return (
    <footer className={classes.footer}>
      {name} <span className={classes.emoji}>{emoji}</span>
    </footer>
  );
};

export default withStyles(styles)(PaletteFooter);
