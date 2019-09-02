import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

export class PaletteMetaForm extends Component {
  state = {
    stage: "form",
    newPaletteName: ""
  };

  componentDidMount() {
    ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
      this.props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  }

  showEmojiPicker = () => {
    this.setState({ stage: "emoji" });
  };

  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  savePalette = obj => {
    this.props.handleSubmit({
      name: this.state.newPaletteName,
      emoji: obj.native
    });
    this.setState({ stage: "" });
  };

  render() {
    const { stage, newPaletteName } = this.state;
    const { hideForm } = this.props;
    return (
      <div>
        <Dialog open={stage === "emoji"}>
          <DialogTitle id="form-dialog-title">
            Choose a palette emoji
          </DialogTitle>
          <Picker onSelect={this.savePalette} title="Choose a palette emoji" />
        </Dialog>
        <Dialog
          open={stage === "form"}
          onClose={hideForm}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Choose a palette name
          </DialogTitle>
          <ValidatorForm onSubmit={this.showEmojiPicker}>
            <DialogContent>
              <DialogContentText>
                please enter a unique name for the palette
              </DialogContentText>
              <TextValidator
                value={newPaletteName}
                fullWidth
                margin="normal"
                label="Palette Name"
                name="newPaletteName"
                onChange={this.handleChange}
                validators={["required", "isPaletteNameUnique"]}
                errorMessages={[
                  "Enter Palette Name",
                  "Palette name already taken"
                ]}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={hideForm} color="primary">
                Cancel
              </Button>
              <Button variant="contained" type="submit" color="primary">
                Save palette
              </Button>
            </DialogActions>
          </ValidatorForm>
        </Dialog>
      </div>
    );
  }
}

export default PaletteMetaForm;
