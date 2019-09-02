import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import classNames from "classnames";
import styles from "./styles/ColorBoxStyles";

class ColorBox extends Component {
  state = {
    copied: false
  };

  static defaultProps = {
    showLink: false
  };

  changeCopyState = () => {
    this.setState({ copied: true }, () => {
      setTimeout(() => this.setState({ copied: false }), 1000);
    });
  };

  render() {
    const {
      background,
      name,
      id,
      paletteId,
      showFullPalette,
      classes
    } = this.props;
    const { copied } = this.state;

    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div className={classes.colorBox} style={{ background }}>
          <div
            style={{ background }}
            className={classNames(classes.copyOverlay, {
              [classes.showOverlay]: copied
            })}
          />
          <div
            className={classNames(classes.copyMessage, {
              [classes.showMessage]: copied
            })}
          >
            <h1 className={classes.copyText}>Copied!</h1>
            <p className={classes.copyText}>{background}</p>
          </div>
          <div>
            <div className={classes.boxContent}>
              <span className={classes.colorName}>{name}</span>
            </div>
            <button className={classes.copyButton}>Copy</button>
          </div>
          {showFullPalette && (
            <Link
              to={`/palette/${paletteId}/${id}`}
              onClick={e => e.stopPropagation()}
            >
              <span className={classes.seeMore}>More</span>
            </Link>
          )}
        </div>
      </CopyToClipboard>
    );
  }
}

export default withStyles(styles)(ColorBox);
