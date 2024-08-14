/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

// https://github.com/acestronautical/bookcover-js


import { SVGHelper } from "./svghelper.js";
import { PenguinCover, DefaultSvgText, DefaultFontFamilies } from "./penguinstyle.js";

const Cover = new PenguinCover();

function initializePage() {
  document.getElementById('backgroundColorInput').value = Cover.backgroundColor;
  document.getElementById('lengthUnitInput').value = 'inches';
  document.getElementById('coverWidthInput').value = Cover.outerWidthInches;
  document.getElementById('coverHeightInput').value = Cover.outerHeightInches;
  document.getElementById('spineWidthInput').value = Cover.spine.outerWidthInches;
  document.getElementById('borderThicknessInput').value = Cover.borderThicknessInches;
  document.getElementById('borderGapInput').value = Cover.borderGapInches;
  document.getElementById('elementColorInput').value = Cover.elementColor;
  document.getElementById('authorInput').value = Cover.author;
  document.getElementById('coverFontSizeInput').value = Cover.front.fontSize;
  document.getElementById('spineFontSizeInput').value = Cover.spine.fontSize;
  document.getElementById('frontCoverInitialCopiesInput').value = Cover.front.initialCopies;
  document.getElementById('titleInput').value = Cover.title;
  document.getElementById('backCoverInitialCopiesInput').value = Cover.back.initialCopies;
  document.getElementById('flipCheckbox').checked = Cover.art.flip;
  document.getElementById('imageScale').value = Cover.art.scale;
  document.getElementById('increasePerColumnInput').value = Cover.art.increasePerColumn;
  document.getElementById('maxPerColumnInput').value = Cover.art.maxPerColumn;
  document.getElementById('numColumnsInput').value = Cover.art.numColumns;
  document.getElementById('mirrorCheckbox').checked = Cover.art.mirror;
  document.getElementById('endpaperCheckbox').checked = false;
  document.getElementById('transparentCheckbox').checked = Cover.saveTransparent;
  document.getElementById('rotateInput').value = Cover.art.rotateAngle;
  document.getElementById('spineTextStyleInput').value = Cover.spine.textStyle;
  document.getElementById('spineArtStyleInput').value = Cover.spine.artStyle;
  document.getElementById('verticalLinesCheckbox').checked = Cover.art.vertLines;
  document.getElementById('xStretchInput').value = Cover.art.xStretch;
  document.getElementById('yStretchInput').value = Cover.art.yStretch;
  Cover.generateCovers();
}

function calcCoverScaling() {
  const isEndpaper = document.getElementById('endpaperCheckbox').checked;
  const width = isEndpaper ? Cover.outerWidthInches / 2 : Cover.outerWidthInches;
  const height = Cover.outerHeightInches;
  const widthScale = 12 - Math.floor((width + 1) / 2);
  const heightScale = 14 - Math.floor((height + 1) / 2);
  const scale = Math.min(widthScale, heightScale, 9);
  return scale / 10;
}

function addEventListeners() {
  document.getElementById('settingsSection').addEventListener('change', function (event) {
    const target = event.target;
    if (target.matches('#titleInput')) {
      Cover.title = target.value;
      Cover.genCoverFrame('front');
    } else if (target.matches('#authorInput')) {
      Cover.author = target.value;
      Cover.genCoverFrame('front');
    } else if (target.matches('#rotateInput')) {
      Cover.art.rotateAngle = parseInt(target.value);
    } else if (target.matches('#imageScale')) {
      Cover.art.scale = parseFloat(target.value);
    } else if (target.matches('#spineTextStyleInput')) {
      Cover.spine.textStyle = parseFloat(target.value);
    } else if (target.matches('#spineArtStyleInput')) {
      Cover.spine.artStyle = parseFloat(target.value);
    } else if (target.matches('#lengthUnitInput')) {
      const borderThicknessElem = document.getElementById('borderThicknessInput');
      const borderGapElem = document.getElementById('borderGapInput');
      const coverWidthElem = document.getElementById('coverWidthInput');
      const coverHeightElem = document.getElementById('coverHeightInput');
      const spineWidthElem = document.getElementById('spineWidthInput');
      if (target.value == 'inches') {
        borderThicknessElem.value = Cover.borderThicknessInches.toPrecision(3);
        borderGapElem.value = Cover.borderGapInches.toPrecision(3);
        coverWidthElem.value = Cover.outerWidthInches.toPrecision(3);
        coverHeightElem.value = Cover.outerHeightInches.toPrecision(3);
        spineWidthElem.value = Cover.spine.outerWidthInches.toPrecision(3);
      } else if (target.value == 'millimeters') {
        borderThicknessElem.value = Cover.borderThicknessMilli.toPrecision(3);
        borderGapElem.value = Cover.borderGapMilli.toPrecision(3);
        coverWidthElem.value = Cover.outerWidthMilli.toPrecision(3);
        coverHeightElem.value = Cover.outerHeightMilli.toPrecision(3);
        spineWidthElem.value = Cover.spine.outerWidthMilli.toPrecision(3);
      }
    } else if (target.matches('#borderThicknessInput')) {
      const unitType = document.getElementById('lengthUnitInput').value;
      const width = parseFloat(target.value);
      if (unitType == 'inches') {
        Cover.borderThicknessInches = width;
      } else if (unitType == 'millimeters') {
        Cover.borderThicknessMilli = width;
      }
      Cover.generateCovers();
      return;
    } else if (target.matches('#borderGapInput')) {
      const unitType = document.getElementById('lengthUnitInput').value;
      const width = parseFloat(target.value);
      if (unitType == 'inches') {
        Cover.borderGapInches = width;
      } else if (unitType == 'millimeters') {
        Cover.borderGapMilli = width;
      }
      Cover.generateCovers();
      return;
    } else if (target.matches('#coverWidthInput')) {
      const unitType = document.getElementById('lengthUnitInput').value;
      const width = parseFloat(target.value);
      if (unitType == 'inches') {
        Cover.outerWidthInches = width;
      } else if (unitType == 'millimeters') {
        Cover.outerWidthMilli = width;
      }
      document.getElementById('coverSection').style.scale = calcCoverScaling();
      Cover.generateCovers();
      return;
    } else if (target.matches('#coverHeightInput')) {
      const unitType = document.getElementById('lengthUnitInput').value;
      const width = parseFloat(target.value);
      if (unitType == 'inches') {
        Cover.outerHeightInches = width;
      } else if (unitType == 'millimeters') {
        Cover.outerHeightMilli = width;
      }
      document.getElementById('coverSection').style.scale = calcCoverScaling();
      Cover.generateCovers();
      return;
    } else if (target.matches('#spineWidthInput')) {
      const unitType = document.getElementById('lengthUnitInput').value;
      const width = parseFloat(target.value);
      if (unitType == 'inches') {
        Cover.spine.outerWidthInches = width;
      } else if (unitType == 'millimeters') {
        Cover.spine.outerWidthMilli = width;
      }
      Cover.generateCovers();
      return;
    } else if (target.matches('#coverFontSizeInput')) {
      Cover.front.fontSize = parseFloat(target.value);
      Cover.genCoverFrame('front');
    } else if (target.matches('#spineFontSizeInput')) {
      Cover.spine.fontSize = parseFloat(target.value);
    } else if (target.matches('#maxPerColumnInput')) {
      Cover.art.maxPerColumn = parseInt(target.value);
    } else if (target.matches('#numColumnsInput')) {
      Cover.art.numColumns = parseInt(target.value);
    } else if (target.matches('#increasePerColumnInput')) {
      Cover.art.increasePerColumn = parseInt(target.value);
    } else if (target.matches('#backCoverInitialCopiesInput')) {
      Cover.back.initialCopies = parseInt(target.value);
    } else if (target.matches('#frontCoverInitialCopiesInput')) {
      Cover.front.initialCopies = parseInt(target.value);
    }
    Cover.updateCovers();
  });

  document.getElementById('settingsSection').addEventListener('input', function (event) {
    const target = event.target;
    if (target.matches('#elementColorInput')) {
      Cover.elementColor = target.value;
    } else if (target.matches('#backgroundColorInput')) {
      Cover.backgroundColor = target.value;
    }
    Cover.generateCovers();
  });

  document.getElementById('settingsSection').addEventListener('change', function (event) {
    const target = event.target;
    if (target.matches('#transparentCheckbox')) {
      Cover.saveTransparent = target.checked;
    } else if (target.matches('#mirrorCheckbox')) {
      Cover.art.mirror = target.checked;
    } else if (target.matches('#flipCheckbox')) {
      Cover.art.flip = target.checked;
    } else if (target.matches('#yStretchInput')) {
      Cover.art.yStretch = target.value;
    } else if (target.matches('#xStretchInput')) {
      Cover.art.xStretch = target.value;
    } else if (target.matches('#verticalLinesCheckbox')) {
      Cover.art.vertLines = target.checked;
    } else if (target.matches('#endpaperCheckbox')) {
      if (target.checked) {
        document.getElementById('frontCoverSection').classList.add('hidden');
        Cover.front.disabled = true;
        document.getElementById('spineCoverSection').classList.add('hidden');
        Cover.spine.disabled = true;
        document.getElementById('coverSectionHeader').classList.add('hidden');
        document.getElementById('saveBackSVGLabel').innerHTML = 'Save Endpaper';
        Cover.outerWidth *= 2;
        Cover.outerHeight -= 0.5 * Cover.inchToPx;
        Cover.art.numColumns *= 2;
        Cover.art.numColumns += 1;
        Cover.art.numColumns = Math.floor(Cover.art.numColumns);
        Cover.borderGap = 0;
        Cover.borderThickness = 0;
      } else {
        document.getElementById('frontCoverSection').classList.remove('hidden');
        Cover.front.disabled = false;
        document.getElementById('spineCoverSection').classList.remove('hidden');
        Cover.spine.disabled = false;
        document.getElementById('coverSectionHeader').classList.remove('hidden');
        document.getElementById('saveBackSVGLabel').innerHTML = 'Save Back';
        Cover.outerWidth /= 2;
        Cover.outerHeight += 0.5 * Cover.inchToPx;
        Cover.art.numColumns -= 1;
        Cover.art.numColumns /= 2;
        Cover.art.numColumns = Math.floor(Cover.art.numColumns);
      }
      const numColsElem = document.getElementById('numColumnsInput');
      numColsElem.value = Cover.art.numColumns;
      const coverWidthElem = document.getElementById('coverWidthInput');
      const coverHeightElem = document.getElementById('coverHeightInput');
      const unitType = document.getElementById('lengthUnitInput').value;
      if (unitType == 'inches') {
        coverWidthElem.value = Cover.outerWidthInches.toPrecision(3);
        coverHeightElem.value = Cover.outerHeightInches.toPrecision(3);
        if (!target.checked) {
          Cover.borderGapInches = document.getElementById('borderGapInput').value;
          Cover.borderThicknessInches = document.getElementById('borderThicknessInput').value;
        }
      } else if (unitType == 'millimeters') {
        coverWidthElem.value = Cover.outerHeightMilli.toPrecision(3);
        coverHeightElem.value = Cover.outerHeightMilli.toPrecision(3);
        if (!target.checked) {
          Cover.borderGapMilli = document.getElementById('borderGapInput').value;
          Cover.borderThicknessMilli = document.getElementById('borderThicknessInput').value;
        }
      }
      document.getElementById('coverSection').style.scale = calcCoverScaling();
      Cover.generateCovers();
      return;
    }
    Cover.updateCovers();
  });

  document.getElementById('coverSection').addEventListener('click', function (event) {
    const target = event.target;
    const lastTitle = Cover.title.split(/[\s,]+/).at(-1).toLowerCase();
    const isEndpaper = document.getElementById('endpaperCheckbox').checked;
    if (target.matches('#saveBackPNG')) {
      if (isEndpaper)
        Cover.saveBack(`${lastTitle}_endpaper.png`);
      else
        Cover.saveBack(`${lastTitle}_cover_back.png`);
    } else if (target.matches('#saveSpinePNG')) {
      Cover.saveSpine(`${lastTitle}_cover_spine.png`);
    } else if (target.matches('#saveFrontPNG')) {
      Cover.saveFront(`${lastTitle}_cover_front.png`);
    } else if (target.matches('#saveBackSVG')) {
      if (isEndpaper)
        Cover.saveBack(`${lastTitle}_endpaper.svg`);
      else
        Cover.saveBack(`${lastTitle}_cover_back.svg`);
    } else if (target.matches('#saveSpineSVG')) {
      Cover.saveSpine(`${lastTitle}_cover_spine.svg`);
    } else if (target.matches('#saveFrontSVG')) {
      Cover.saveFront(`${lastTitle}_cover_front.svg`);
    }
    else if (target.matches('#saveCombinedSVG')) {
      Cover.saveCombined(`${lastTitle}_cover_combined.svg`);
    } else if (target.matches('#saveCombinedPNG')) {
      Cover.saveCombined(`${lastTitle}_cover_combined.png`);
    }
  });

  document.getElementById('fileDelete').addEventListener('click', function () {
    Cover.art.images.pop();
    if (Cover.art.images.length == 0) {
      Cover.art.defaultImages = [{ svg: SVGHelper.fromString(DefaultSvgText) }];
      splitFileButtons(false);
    }
    Cover.updateCovers();
  });

  function splitFileButtons(split) {
    if (split) {
      document.getElementById('fileDelete').classList.remove('hidden');
      document.getElementById('fileInputLabel').classList.remove('button');
      document.getElementById('fileInputLabel').removeAttribute('title');
      document.getElementById('fileInputLabel').classList.add('button-split-left');
      document.getElementById('fileInputLabel').innerHTML = 'Another';
    } else {
      document.getElementById('fileDelete').classList.add('hidden');
      document.getElementById('fileInputLabel').classList.add('button');
      document.getElementById('fileInputLabel').classList.remove('button-split-left');
      document.getElementById('fileInputLabel').innerHTML = 'Upload An SVG';
    }
  }

  document.getElementById('fileInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function () {
      const svgText = reader.result;
      if (Cover.art.defaultImages != null) {
        splitFileButtons(true);
      }
      Cover.art.defaultImages = null;
      Cover.art.images.push({ svg: SVGHelper.fromString(svgText) });
      Cover.art.images.at(-1).svg.setAttribute('overflow', `visible`);
      Cover.art.images.at(-1).svg.setAttribute('class', 'artSVG');
      Cover.generateCovers();
    };
    reader.readAsText(file);
  });

  document.getElementById('fontInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      const fontData = e.target.result;
      const fileName = file.name.split('.')[0]; // Get file name without extension
      const baseName = fileName.split('-')[0]; // Ignore everything after hyphen

      // Split the base name by capital letters
      const formattedName = baseName
        .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space before capital letters
        .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2') // Handle cases like "PDFDocument"
        .trim();
      const fontFace = new FontFace(formattedName, `url(${fontData})`);
      fontFace.load().then(function (loadedFontFace) {
        document.fonts.add(loadedFontFace);
        Cover.fontData = fontData;
        Cover.fontFamilies = formattedName;
        Cover.generateCovers();
      }).catch(function (error) {
        Cover.fontData = undefined;
        Cover.fontFamilies = DefaultFontFamilies;
        console.error('Failed to load font:', error);
        alert(`Failed to load the font. Please check the file format and try again.\nError: ${error.message}`);
      });
    };
    reader.readAsDataURL(file);
  });


  document.querySelector('main').addEventListener('dragover', function (event) {
    event.preventDefault();
  });
}

function main() {
  initializePage();
  addEventListeners();
}

document.addEventListener('DOMContentLoaded', main);
