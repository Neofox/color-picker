import React, { Component } from "react";
import { ChromePicker } from "react-color";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { withStyles } from "@material-ui/styles";

const styles = {
  picker: {
    width: "100% !important",
    marginTop: "2rem"
  },
  addColor: {
    width: "100%",
    padding: "1rem",
    marginTop: "1rem",
    fontSize: "2rem"
  },
  colorNameInput: {
    width: "100%",
    height: "70px"
  }
};

export class ColorPickerForm extends Component {
  state = {
    currentColor: "teal",
    newColorName: ""
  };

  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  updateCurrentColor = newColorName => {
    this.setState({ currentColor: newColorName.hex });
  };

  handleSubmit = () => {
    const newColor = {
      color: this.state.currentColor,
      name: this.state.newColorName
    };
    this.props.addNewColor(newColor);
    this.setState({ name: "" });
  };

  componentDidMount() {
    ValidatorForm.addValidationRule("isColorNameUnique", value =>
      this.props.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      )
    );

    ValidatorForm.addValidationRule("isColorUnique", () =>
      this.props.colors.every(({ color }) => color !== this.state.currentColor)
    );
  }

  render() {
    const { paletteFull, classes } = this.props;
    const { currentColor, newColorName } = this.state;
    return (
      <div>
        <ChromePicker
          color={currentColor}
          onChangeComplete={this.updateCurrentColor}
          className={classes.picker}
        />
        <ValidatorForm onSubmit={this.handleSubmit} instantValidate={false}>
          <TextValidator
            placeholder="Color Name"
            variant="filled"
            margin="normal"
            validators={["required", "isColorNameUnique", "isColorUnique"]}
            errorMessages={[
              "this field is required",
              "Color name must be unique",
              "Color already used"
            ]}
            className={classes.colorNameInput}
            value={newColorName}
            name="newColorName"
            onChange={this.handleChange}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ backgroundColor: paletteFull ? "grey" : currentColor }}
            type="submit"
            disabled={paletteFull}
            className={classes.addColor}
          >
            {paletteFull ? "Palette Full" : "Add color"}
          </Button>
        </ValidatorForm>
      </div>
    );
  }
}

export default withStyles(styles)(ColorPickerForm);
