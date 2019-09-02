import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { generatePalette, generateShades } from "./colorHelper";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Page from "./Page";
import NewPaletteForm from "./NewPaletteForm";
import SingleColorPalette from "./SingleColorPalette";
import PaletteList from "./PaletteList";
import Palette from "./Palette";
import seedColors from "./seedColors";

const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));

class App extends Component {
  state = {
    palettes: savedPalettes || seedColors
  };

  findPalette = routeProps => {
    let id = routeProps.match.params.paletteId;
    let palette = this.state.palettes.find(palette => palette.id === id);

    return (
      <Page>
        <Palette palette={generatePalette(palette)} />
      </Page>
    );
  };

  savePalette = newPalette => {
    this.setState(
      st => ({ palettes: [...st.palettes, newPalette] }),
      this.syncLocalStorage
    );
  };

  deletePalette = id => {
    this.setState(
      ({ palettes }) => ({
        palettes: palettes.filter(palette => palette.id !== id)
      }),
      this.syncLocalStorage
    );
  };

  syncLocalStorage = () => {
    window.localStorage.setItem(
      "palettes",
      JSON.stringify(this.state.palettes)
    );
  };

  findSinglePalette = routeProps => {
    let id = routeProps.match.params.paletteId;
    let colorId = routeProps.match.params.colorId;
    let palette = this.state.palettes.find(palette => palette.id === id);

    return (
      <Page>
        <SingleColorPalette
          paletteName={palette.paletteName}
          paletteId={palette.id}
          emoji={palette.emoji}
          colors={generateShades(generatePalette(palette), colorId)}
        />
      </Page>
    );
  };

  render() {
    const { palettes } = this.state;
    return (
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition key={location.key} classNames="page" timeout={500}>
              <Switch location={location}>
                <Route
                  exact
                  path="/"
                  render={routeProps => (
                    <Page>
                      <PaletteList
                        {...routeProps}
                        deletePalette={this.deletePalette}
                        palettes={palettes}
                      />
                    </Page>
                  )}
                />
                <Route
                  exact
                  path="/palette/new"
                  render={routeProps => (
                    <Page>
                      <NewPaletteForm
                        {...routeProps}
                        palettes={palettes}
                        savePalette={this.savePalette}
                      />
                    </Page>
                  )}
                />
                <Route
                  exact
                  path="/palette/:paletteId"
                  render={this.findPalette}
                />
                <Route
                  exact
                  path="/palette/:paletteId/:colorId"
                  render={this.findSinglePalette}
                />
                <Route
                  render={routeProps => (
                    <Page>
                      <PaletteList
                        {...routeProps}
                        deletePalette={this.deletePalette}
                        palettes={palettes}
                      />
                    </Page>
                  )}
                />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    );
  }
}

export default App;
