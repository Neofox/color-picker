import chroma from "chroma-js";

const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

export const generatePalette = starterPalette => {
  let newPalette = { ...starterPalette, colors: {} };

  for (let level of levels) {
    newPalette.colors[level] = [];
  }
  for (let color of starterPalette.colors) {
    let scale = generateScale(color.color, 10).reverse();

    for (let i in scale) {
      newPalette.colors[levels[i]].push({
        name: `${color.name} ${levels[i]}`,
        id: color.name.toLowerCase().replace(/ /g, "-"),
        hex: scale[i],
        rgb: chroma(scale[i]).css(),
        rgba: chroma(scale[i])
          .css()
          .replace("rgb", "rgba")
          .replace(")", ",1.0)")
      });
    }
  }

  return newPalette;
};

export const generateShades = (palette, colorToFilterBy) => {
  let colors = { ...palette.colors };
  let shades = [];
  delete colors[50]; // We don't need this color

  for (let luminance in colors) {
    shades = shades.concat(
      colors[luminance].filter(color => color.id === colorToFilterBy)
    );
  }

  // for (let luminance in colors) {
  //   colors[luminance] = colors[luminance].find(c => c.id === colorToFilterBy);
  // }

  return shades;
};

const getRange = hex => {
  const end = "#fff";
  return [
    chroma(hex)
      .darken(1.4)
      .hex(),
    hex,
    end
  ];
};

const generateScale = (hex, numberOfColors) => {
  return chroma
    .scale(getRange(hex))
    .mode("lab")
    .colors(numberOfColors);
};
