let FrontCoverSvg;
let ElementColor = '#FF5733';
let BackgroundColor = '#33FFBD';
let CoverProportions = 1.5;
let CoverWidth = 300;
let CoverHeight = CoverWidth * CoverProportions;
const BorderGap = CoverWidth / 16;
let FontSize = 16;
const NumColumns = 5;
const MiddleColumnRepeats = 2;
let Mirror = true;
let Rotate = 10;
let SVGText =  `<svg xmlns="http://www.w3.org/2000/svg"> <circle r="20" cx="25" cy="25" /></svg>`

document.getElementById('elementColorInput').addEventListener('change', handleElementColorChange);
document.getElementById('backgroundColorInput').addEventListener('change', handleBackgroundColorChange);
document.getElementById('saveFrontCover').addEventListener('click', saveSvg);
document.getElementById('fileInput').addEventListener('change', handleFileChange);
document.getElementById('mirrorCheckbox').addEventListener('change', handleMirrorChange);
document.getElementById('rotateInput').addEventListener('input', handleRotateChange);
document.getElementById('coverProportionsInput').addEventListener('input', handleCoverProportionsChange);
document.getElementById('fontSizeInput').addEventListener('input', handleFontSizeChange);

window.addEventListener('DOMContentLoaded', () => { 
  generateFrontCover();
});

/**
 * Function to handle changes in the file input.
 * @param {Event} event - The event object representing the fole change.
 */
function handleFileChange(event) {
    // Load user uploaded SVG to tile
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function () {
      SVGText = reader.result;
      generateFrontCover();
    }
    reader.readAsText(file);
}


/**
 * Function to handle changes in the element color input.
 * @param {Event} event - The event object representing the color change.
 */
function handleElementColorChange(event) {
  ElementColor = event.target.value;
  generateFrontCover();
}

/**
 * Function to handle changes in the background color input.
 * @param {Event} event - The event object representing the color change.
 */
function handleBackgroundColorChange(event) {
  BackgroundColor = event.target.value;
  generateFrontCover();
}

// Functions to handle changes in mirror, rotate, CoverProportions, and fontsize controls
function handleMirrorChange(event) {
  Mirror = event.target.checked;
  generateFrontCover();
}

function handleRotateChange(event) {
  Rotate = parseInt(event.target.value);
  generateFrontCover();
}

function handleCoverProportionsChange(event) {
  CoverProportions = parseFloat(event.target.value);
  CoverHeight = CoverWidth * CoverProportions;
  generateFrontCover();
}

function handleFontSizeChange(event) {
  FontSize = parseInt(event.target.value);
  generateFrontCover();
}

/**
 * Function to save the SVG data as a downloadable file.
 */
function saveSvg() {
  if (FrontCoverSvg) {
    // Get the bounding box of the visible content
    const bbox = FrontCoverSvg.getBBox();

    // Create a new SVG element with the same viewBox as the visible content
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`);

    // Clone and append only the visible elements to the new SVG
    Array.from(FrontCoverSvg.childNodes).forEach((node) => {
      const clonedNode = node.cloneNode(true);
      svg.appendChild(clonedNode);
    });

    // Serialize the new SVG and save it
    const svgData = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'front_cover.svg';
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

/**
 * Function to handle changes in the file input.
 * This is the main logic at the moment but should be pulled out at some point
 * @param {Event} event - The event object representing the file change.
 */
function generateFrontCover(event) {

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

  if (SVGText === null) return;

    const parser = new DOMParser();
    const userSvg = parser.parseFromString(SVGText, 'image/svg+xml').documentElement;
    const userSvgBBox = getBBoxAfterRender(FrontCoverSvg, userSvg);
    const scaledWidth = CoverWidth / NumColumns;
    const scaledHeight = scaledWidth * (userSvgBBox.height / userSvgBBox.width);
    userSvg.setAttribute('width', scaledWidth);
    userSvg.setAttribute('height', scaledHeight);
    userSvg.setAttribute('stroke', ElementColor);

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

    for (let columnIndex = 0; columnIndex < NumColumns; columnIndex++) {
      const repeatsInColumn = columnRepeatCounts[columnIndex];
      const evenRepeats = repeatsInColumn % 2 === 0;
      const halfRepeatsInColumn = Math.ceil(repeatsInColumn / 2);

      for (let i = 0; i < halfRepeatsInColumn; i++) {
        const cloneUp = userSvg.cloneNode(true);
        const cloneDown = userSvg.cloneNode(true);
        FrontCoverSvg.appendChild(cloneUp);
        FrontCoverSvg.appendChild(cloneDown);

        let yUp, yDown, xBoth;
        xBoth = columnXCoords[columnIndex] - halfWidth;
        if (evenRepeats) {
          const centerOffset = tileHeight / 2;
          yUp = (Math.floor(maxRepeats / 2) - i) * tileHeight - centerOffset - halfHeight;
          yDown = (Math.floor(maxRepeats / 2) + i + 1) * tileHeight - centerOffset - halfHeight;
        } else {
          yUp = (Math.floor(maxRepeats / 2) - i) * tileHeight - halfHeight;
          yDown = (Math.floor(maxRepeats / 2) + i) * tileHeight - halfHeight;
        }

        // position is measured from top left corner, we want midpoints
        cloneUp.setAttribute('y', yUp);
        cloneUp.setAttribute('x', xBoth);
        cloneDown.setAttribute('y', yDown);
        cloneDown.setAttribute('x', xBoth);

        if (Mirror) {
          if (i % 2 === 0) {
            mirrorUserSvg(cloneUp);
          } else {
            mirrorUserSvg(cloneDown);
          }
        }
        if (Rotate !== 0) {
          if (i % 2 === 0) {
            rotateUserSvg(cloneUp, 180);
          } else {
            rotateUserSvg(cloneDown, 180);
          }
        }
        FrontCoverSvg.appendChild(cloneUp);
        FrontCoverSvg.appendChild(cloneDown);

        // Remove the cloneDown if it's the first iteration in an odd-repeats column
        if (!evenRepeats && i === 0) {
          FrontCoverSvg.removeChild(cloneDown);
        }
      }
    }


}
