import React, { Component } from "react";
import MiniPalette from "./MiniPalette";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/PaletteListStyles";
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import DialogTitle from "@material-ui/core/DialogTitle";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";

class PaletteList extends Component {
  state = {
    deleteDialogOpen: false,
    deletingId: ""
  };

  openDialog = id => {
    this.setState({ deleteDialogOpen: true, deletingId: id });
  };
  closeDialog = () => {
    this.setState({ deleteDialogOpen: false, deletingId: "" });
  };

  goToPalette = id => {
    this.props.history.push(`/palette/${id}`);
  };

  handleDelete = () => {
    this.props.deletePalette(this.state.deletingId);
    this.closeDialog();
  };

  render() {
    const { palettes, classes, deletePalette } = this.props;
    const { deleteDialogOpen } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1>React Color</h1>
            <Link to="/palette/new">Create palette</Link>
          </nav>
          <TransitionGroup className={classes.palettes}>
            {palettes.map(palette => (
              <CSSTransition key={palette.id} classNames="fade" timeout={500}>
                <MiniPalette
                  deletePalette={deletePalette}
                  openDialog={this.openDialog}
                  id={palette.id}
                  {...palette}
                  handleClick={this.goToPalette}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
        <Dialog
          open={deleteDialogOpen}
          onClose={this.closeDialog}
          aria-labelledby="delete-dialog-title"
        >
          <DialogTitle id="delete-dialog-title">
            Delete this palette?
          </DialogTitle>
          <List>
            <ListItem button onClick={this.handleDelete}>
              <ListItemAvatar>
                <Avatar
                  style={{ backgroundColor: blue[100], color: blue[600] }}
                >
                  <CheckIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Delete" />
            </ListItem>
            <ListItem button>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                  <CloseIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Cancel" onClick={this.closeDialog} />
            </ListItem>
          </List>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(PaletteList);
