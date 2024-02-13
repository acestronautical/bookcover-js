let FrontCoverSvg;
let BackCoverSvg;
let SpineCoverSvg;
let ElementColor = '#292a5a';
let BackgroundColor = '#aeb2b1';
let CoverProportions = 1.5;
let CoverWidth = 360;
let CoverHeight = CoverWidth * CoverProportions;
let SpineProportions = 8;
let SpineHeight = CoverHeight;
let SpineWidth = SpineHeight / SpineProportions;
const BorderGap = CoverWidth / 16;
let FontSize = 18;
let ImageScale = 1;
const NumColumns = 5;
const MiddleColumnRepeats = 2;
let Mirror = false;
let RotateAngle = 0;
let SVGText = `<svg xmlns="http://www.w3.org/2000/svg"> <circle r="20" cx="25" cy="25" /></svg>`;

window.addEventListener('DOMContentLoaded', () => {
  generateCovers();
});

document.getElementById('elementColorInput').addEventListener('change', handleElementColorChange);
function handleElementColorChange(event) {
  ElementColor = event.target.value;
  generateCovers();
}

document.getElementById('backgroundColorInput').addEventListener('change', handleBackgroundColorChange);
function handleBackgroundColorChange(event) {
  BackgroundColor = event.target.value;
  generateCovers();
}

document.getElementById('fileInput').addEventListener('change', handleFileChange);
function handleFileChange(event) {
  // Load user uploaded SVG to tile
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = function () {
    SVGText = reader.result;
    generateCovers();
  };
  reader.readAsText(file);
}

document.getElementById('mirrorCheckbox').addEventListener('change', handleMirrorChange);
function handleMirrorChange(event) {
  Mirror = event.target.checked;
  generateCovers();
}

document.getElementById('rotateInput').addEventListener('input', handleRotateChange);
function handleRotateChange(event) {
  RotateAngle = parseInt(event.target.value);
  generateCovers();
}

document.getElementById('coverProportionsInput').addEventListener('input', handleCoverProportionsChange);
function handleCoverProportionsChange(event) {
  CoverProportions = parseFloat(event.target.value);
  CoverHeight = CoverWidth * CoverProportions;
  SpineHeight = CoverHeight;
  generateCovers();
}

document.getElementById('fontSizeInput').addEventListener('input', handleFontSizeChange);
function handleFontSizeChange(event) {
  FontSize = parseInt(event.target.value);
  generateCovers();
}

document.getElementById('imageScale').addEventListener('input', handleImageScaleChange);
function handleImageScaleChange(event) {
  ImageScale = parseFloat(event.target.value);
  generateCovers();
}

document.getElementById('save-cover').addEventListener('click', saveCovers);
function saveCovers() {
  covers = { 'front_cover.svg': FrontCoverSvg, 'back_cover.svg': BackCoverSvg, 'spine_cover.svg': SpineCoverSvg };
  for (const [key, value] of Object.entries(covers)) {
    saveSvg(key, value);
  }
}
function saveSvg(fileName, svgElem) {
  if (svgElem) {
    // Get the bounding box of the visible content
    const bbox = svgElem.getBBox();

    // Create a new SVG element with the same viewBox as the visible content
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`);

    // Clone and svgElem only the visible elements to the new SVG
    Array.from(svgElem.childNodes).forEach((node) => {
      const clonedNode = node.cloneNode(true);
      svg.appendChild(clonedNode);
    });

    // Serialize the new SVG and save it
    const svgData = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

/**
 * In order to get the bounding box of an element it has to actually be rendered
 * This function append the element to a container, gets the BBox and then removes the element
 * This may cause a brief flicker, but is the only solution i'm aware of
 * @param {HTMLElement} parent - The parent element to append the child to.
 * @param {SVGElement} child - The child element whose bounding box is to be calculated.
 * @returns {DOMRect} The bounding box of the child element.
 */
function getBBoxAfterRender(parent, child) {
  parent.appendChild(child);
  // Calculate the width of the text using its bounding box
  const childBBox = child.getBBox();
  // Remove the text after getting the BBox
  parent.removeChild(child);
  return childBBox;
}

/**
 * Creates an SVG text element with x position centered within parent.
 * @param {string} elementColor - The color of the text.
 * @param {number} fontSize - The font size of the text.
 * @param {string} textString - The text content.
 * @param {number} textY - The Y-coordinate of the text.
 * @param {number} parentWidth - The width of the parent container.
 * @returns {SVGTextElement} The created SVG text element.
 */
function createCenteredSvgText(elementColor, fontSize, textString, textY, parentWidth) {
  const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  text.setAttribute('fill', elementColor);
  text.setAttribute('font-size', fontSize);
  text.setAttribute('font-family', 'Garamond');
  text.textContent = textString;
  const textBBox = getBBoxAfterRender(FrontCoverSvg, text);
  const textWidth = textBBox.width;
  // Calculate the x-coordinate to center the text horizontally
  const textX = (parentWidth - textWidth) / 2;
  // Set attributes for the text
  text.setAttribute('x', textX);
  text.setAttribute('y', textY);
  return text;
}

function rotateUserSvg(svgElem, angle) {
  // For user uploaded SVGs the transformations often won't apply at the top level
  let childElement = svgElem.querySelector('g') || svgElem.querySelector('path') || svgElem;
  // This should be changed to getBBoxAfterRender
  const bbox = childElement.getBBox();
  const cx = bbox.x + bbox.width / 2;
  const cy = bbox.y + bbox.height / 2;

  const rotateTransform = `rotate(${angle} ${cx} ${cy})`;
  const prevTransform = childElement.getAttribute('transform') || '';
  childElement.setAttribute('transform', `${prevTransform} ${rotateTransform}`);
}

function mirrorUserSvg(svgElem) {
  // For user uploaded SVGs the transformations often won't apply at the top level
  let childElement = svgElem.querySelector('g') || svgElem.querySelector('path') || svgElem;
  // This should be changed to getBBoxAfterRender
  const bbox = childElement.getBBox();
  const cx = bbox.x + bbox.width / 2;
  const cy = bbox.y + bbox.height / 2;

  // You don't want to know
  const mirrorTransform = `translate( ${cx} ${cy}) scale(-1 1) translate( ${-cx} ${-cy})`;
  const prevTransform = childElement.getAttribute('transform') || '';
  childElement.setAttribute('transform', `${prevTransform} ${mirrorTransform}`);
}

function colorUserSvg(svgElem, color) {
  // Color at multiple levels in multiple ways
  const newStyle = `fill:${color} stroke:${color}`;
  let childElement = svgElem.querySelector('g') || svgElem.querySelector('path') || svgElem;
  let prevStyle = childElement.getAttribute('style') || '';
  childElement.setAttribute('fill', color);
  childElement.setAttribute('stroke', `${prevStyle} ${newStyle}`);
  childElement.setAttribute('style', color);
  childElement = svgElem.querySelector('path') || svgElem.querySelector('g') || svgElem;
  childElement.setAttribute('fill', color);
  childElement.setAttribute('stroke', color);
  childElement.setAttribute('style', `${prevStyle} ${newStyle}`);
}

function tesselateUserSvg(parentElem, svgText) {
  const parser = new DOMParser();
  const userSvg = parser.parseFromString(svgText, 'image/svg+xml').documentElement;
  const userSvgBBox = getBBoxAfterRender(parentElem, userSvg);
  const scaledWidth = (ImageScale * CoverWidth) / NumColumns;
  const scaledHeight = scaledWidth * (userSvgBBox.height / userSvgBBox.width);
  userSvg.setAttribute('width', scaledWidth);
  userSvg.setAttribute('height', scaledHeight);
  colorUserSvg(userSvg, ElementColor);

  let columnXCoords = [];
  for (let i = 0; i < NumColumns; i++) {
    columnXCoords[i] = i * (CoverWidth / (NumColumns - 1));
  }

  const middleColumnIndex = Math.floor(NumColumns / 2);

  const columnRepeatCounts = [];
  for (let i = 0; i < NumColumns; i++) {
    const distanceFromMiddle = Math.abs(i - middleColumnIndex);
    columnRepeatCounts[i] = MiddleColumnRepeats + distanceFromMiddle;
  }

  const maxRepeats = Math.max(...columnRepeatCounts);
  const tileHeight = CoverHeight / maxRepeats;
  const halfHeight = scaledHeight / 2;
  const halfWidth = scaledWidth / 2;
  let mirrorState = true;

  for (let columnIndex = 0; columnIndex < NumColumns; columnIndex++) {
    const repeatsInColumn = columnRepeatCounts[columnIndex];
    const oddRepeats = repeatsInColumn % 2 === 1;
    const halfRepeatsInColumn = Math.ceil(repeatsInColumn / 2);
    if (columnIndex == middleColumnIndex + 1) mirrorState = !mirrorState;
    mirrorState = !mirrorState;
    for (let i = 0; i < halfRepeatsInColumn; i++) {
      mirrorState = !mirrorState;
      const centerMost = oddRepeats && i === 0;
      const cloneUp = userSvg.cloneNode(true);
      const cloneDown = userSvg.cloneNode(true);
      parentElem.appendChild(cloneUp);
      parentElem.appendChild(cloneDown);

      let yUp, yDown, xBoth;
      xBoth = columnXCoords[columnIndex] - halfWidth;
      if (oddRepeats) {
        yUp = (Math.floor(maxRepeats / 2) - i) * tileHeight - halfHeight;
        yDown = (Math.floor(maxRepeats / 2) + i) * tileHeight - halfHeight;
      } else {
        const centerOffset = tileHeight / 2;
        yUp = (Math.floor(maxRepeats / 2) - i) * tileHeight - centerOffset - halfHeight;
        yDown = (Math.floor(maxRepeats / 2) + i + 1) * tileHeight - centerOffset - halfHeight;
      }

      // position is measured from top left corner, we want midpoints
      cloneUp.setAttribute('y', yUp);
      cloneUp.setAttribute('x', xBoth);
      cloneDown.setAttribute('y', yDown);
      cloneDown.setAttribute('x', xBoth);

      if (mirrorState) {
        Mirror && mirrorUserSvg(cloneUp);
        rotateUserSvg(cloneUp, -RotateAngle);
      } else {
        rotateUserSvg(cloneUp, RotateAngle);
      }
      oddRepeats ? null : (mirrorState = !mirrorState);
      if (mirrorState && !(oddRepeats && i == 0)) {
        Mirror && mirrorUserSvg(cloneDown);
        rotateUserSvg(cloneDown, -RotateAngle);
      } else {
        rotateUserSvg(cloneDown, RotateAngle);
      }
      mirrorState = !mirrorState;

      parentElem.appendChild(cloneUp);
      parentElem.appendChild(cloneDown);

      // Remove the cloneDown if it's the first iteration in an odd-repeats column
      if (oddRepeats && i === 0) {
        parentElem.removeChild(cloneDown);
        mirrorState = !mirrorState;
      }
    }
  }
}

function generateCovers() {
  generateFrontCover();
  generateBackCover();
  generateSpineCover();
}

function generateSpineCover() {
  // Create cover Svg
  SpineCoverSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  SpineCoverSvg.setAttribute('width', SpineWidth);
  SpineCoverSvg.setAttribute('height', SpineHeight);
  SpineCoverSvg.style.backgroundColor = BackgroundColor;

  // Create div which shows background color margin for cover SVG
  const spineCoverDiv = document.getElementById('spine-cover');
  spineCoverDiv.innerHTML = '';
  spineCoverDiv.appendChild(SpineCoverSvg);
  spineCoverDiv.style.backgroundColor = BackgroundColor;
  spineCoverDiv.style.width = SpineWidth + BorderGap / 2 + 'px';
  spineCoverDiv.style.height = SpineHeight + BorderGap * 2 + 'px';

  // Create rectangle border slightly inset from cover SVG as per penguin style
  const coverRectangle = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  const rectangleStroke = 2;
  const rectangleWidth = SpineWidth - rectangleStroke;
  const rectangleHeight = SpineHeight - rectangleStroke;
  coverRectangle.setAttribute('x', rectangleStroke / 2); // X-coordinate of the top-left corner
  coverRectangle.setAttribute('y', rectangleStroke / 2); // Y-coordinate of the top-left corner
  coverRectangle.setAttribute('width', rectangleWidth); // Width of the rectangle
  coverRectangle.setAttribute('height', rectangleHeight); // Height of the rectangle
  coverRectangle.setAttribute('fill', 'none');
  coverRectangle.setAttribute('stroke', ElementColor);
  coverRectangle.setAttribute('stroke-width', rectangleStroke);
  SpineCoverSvg.appendChild(coverRectangle);
}

function generateFrontCover() {
  // Create cover Svg
  FrontCoverSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  FrontCoverSvg.setAttribute('width', CoverWidth);
  FrontCoverSvg.setAttribute('height', CoverHeight);
  FrontCoverSvg.style.backgroundColor = BackgroundColor;

  // Create div which shows background color margin for cover SVG
  const frontCoverDiv = document.getElementById('front-cover');
  frontCoverDiv.innerHTML = '';
  frontCoverDiv.appendChild(FrontCoverSvg);
  frontCoverDiv.style.backgroundColor = BackgroundColor;
  frontCoverDiv.style.width = CoverWidth + BorderGap * 2 + 'px';
  frontCoverDiv.style.height = CoverHeight + BorderGap * 2 + 'px';

  // Create rectangle border slightly inset from cover SVG as per penguin style
  const coverRectangle = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  const rectangleStroke = 2;
  const rectangleWidth = CoverWidth - rectangleStroke;
  const rectangleHeight = CoverHeight - rectangleStroke;
  coverRectangle.setAttribute('x', rectangleStroke / 2); // X-coordinate of the top-left corner
  coverRectangle.setAttribute('y', rectangleStroke / 2); // Y-coordinate of the top-left corner
  coverRectangle.setAttribute('width', rectangleWidth); // Width of the rectangle
  coverRectangle.setAttribute('height', rectangleHeight); // Height of the rectangle
  coverRectangle.setAttribute('fill', 'none');
  coverRectangle.setAttribute('stroke', ElementColor);
  coverRectangle.setAttribute('stroke-width', rectangleStroke);
  FrontCoverSvg.appendChild(coverRectangle);

  // Create centered title
  const titleY = BorderGap * 2;
  const titleString = document.getElementById('titleInput').value || 'Title'; // Using user input for title
  const titleSvg = createCenteredSvgText(ElementColor, FontSize, titleString, titleY, CoverWidth);
  FrontCoverSvg.appendChild(titleSvg);

  // Create centered author
  const authorY = rectangleHeight - BorderGap * 2;
  const authorString = document.getElementById('authorInput').value || 'Author'; // Using user input for author
  const authorSvg = createCenteredSvgText(ElementColor, FontSize, authorString, authorY, CoverWidth);
  FrontCoverSvg.appendChild(authorSvg);

  tesselateUserSvg(FrontCoverSvg, SVGText);
}

function generateBackCover() {
  // Create cover Svg
  BackCoverSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  BackCoverSvg.setAttribute('width', CoverWidth);
  BackCoverSvg.setAttribute('height', CoverHeight);
  BackCoverSvg.style.backgroundColor = BackgroundColor;

  // Create div which shows background color margin for cover SVG
  const backCoverDiv = document.getElementById('back-cover');
  backCoverDiv.innerHTML = '';
  backCoverDiv.appendChild(BackCoverSvg);
  backCoverDiv.style.backgroundColor = BackgroundColor;
  backCoverDiv.style.width = CoverWidth + BorderGap * 2 + 'px';
  backCoverDiv.style.height = CoverHeight + BorderGap * 2 + 'px';

  // Create rectangle border slightly inset from cover SVG as per penguin style
  const coverRectangle = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  const rectangleStroke = 2;
  const rectangleWidth = CoverWidth - rectangleStroke;
  const rectangleHeight = CoverHeight - rectangleStroke;
  coverRectangle.setAttribute('x', rectangleStroke / 2); // X-coordinate of the top-left corner
  coverRectangle.setAttribute('y', rectangleStroke / 2); // Y-coordinate of the top-left corner
  coverRectangle.setAttribute('width', rectangleWidth); // Width of the rectangle
  coverRectangle.setAttribute('height', rectangleHeight); // Height of the rectangle
  coverRectangle.setAttribute('fill', 'none');
  coverRectangle.setAttribute('stroke', ElementColor);
  coverRectangle.setAttribute('stroke-width', rectangleStroke);
  BackCoverSvg.appendChild(coverRectangle);

  tesselateUserSvg(BackCoverSvg, SVGText);
}
