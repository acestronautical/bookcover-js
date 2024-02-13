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
let ImageScale = 1.5;
const NumColumns = 5;
let Mirror = false;
let RotateAngle = 180;
let TitleText = 'Tales of the Feline';
let AuthorText = 'Felix Pawsley';
// This is gross but it works for now
let SVGText = `<svg xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ns1="http://sozi.baierouge.fr" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" id="svg3228" xml:space="preserve" viewBox="0 0 700 700">
                <g id="g3236" transform="matrix(1.25 0 0 -1.25 0 700)">
                  <g id="g3246" transform="matrix(.88815 0 0 .88815 456.78 214.39)" >
                    <path id="path3248" d="m0 0c-4.942 32.123-20.005 60.481-24.658 69.321-4.652 8.84-10.7 26.519-9.002 51.363 1.699 24.843-9.608 96.585-67.298 142.64-57.69 46.059-111 60.386-118.17 65.134-7.773 5.143-39.08 19.54-46.471 22.983-7.391 3.444-37.273 7.258-50.677 8.968s-27.537-3.105-32.96-3.148c-5.423-0.042-35.984 9.347-40.636 9.347s-1.861-4.652-1.396-7.444c0.466-2.791 10.277-21.046 10.277-21.046s-10.742 0.11-11.207-2.216 12.769-12.274 12.769-12.274-6.256-20.293-6.581-24.874c-0.326-4.582 5.908-20.077 6.839-24.264 0.93-4.187 0-13.958 0-13.958l4.622-4.716s7.939-5.519 9.8-6.449c1.861-0.931 8.132 0.126 8.132 0.126 4.875-1.734 20.713 6.853 29.088 11.97 8.374 5.118 20.005 6.513 23.361 6.539 3.355 0.024 6.414-10.727 6.274-14.241-0.141-3.516 2.932-16.491 3.862-20.678 0.931-4.187-4.332-12.528-4.332-12.528-4.798 2.359-11.486 4.619-15.673 6.015-4.188 1.396-17.214 10.7-20.936 11.631s-6.979 1.396-13.585 3.216c-6.606 1.821-28.287 6.554-32.942 5.95-4.654-0.603-16.746-7.306-18.451-14.149-1.704-6.845 7.753-13.627 11.475-15.023 3.722-1.395 15.353 1.396 19.447 0.973 4.095-0.423 6.71-3.791 6.71-3.791 14.526-0.491 21.298-9.278 29.672-16.722s47.92-29.31 53.503-30.241 20.933 2.981 20.933 2.981 4.655-18.799 6.516-29.964c1.861-11.166-6.048-47.456-6.978-54.434-0.931-6.979-1.163-15.818-2.908-18.145-1.423-1.898-2.908-1.512-10.628-2.678-9.245-1.396-19.409-15.013-19.031-21.049 0.465-7.444 8.536-9.667 12.137-9.667h12.753c5.583 0 21.401 2.223 21.401 2.223l25.124-2.223h151.72c15.146 0 30.171-30.879 32.748-54.071 2.791-25.123-14.669-90.658-25.589-113.99-10.235-21.866-32.824-46.467-54.433-51.176-36.289-7.909-60.947 15.818-79.092 12.562-16.51-2.964-13.027-21.401-5.583-28.846 6.869-6.869 66.112-27.327 105.14-14.887 42.337 13.492 67.63 62.931 81.418 102.82 13.047 37.712 19.095 75.861 13.512 112.15m-198.83 69.434c-8.839-3.256-16.283-8.374-21.866-6.979-5.583 1.396-7.909-2.791-12.562-1.395 0 0 4.653 13.957 9.297 21.925 4.643 7.969 10.918 33.922 10.918 33.922 1.606-9.753 10.957-25.141 17.935-34.446 6.979-9.305 5.118-9.771-3.722-13.027"/>
                  </g>
                </g>
              </svg>`;

window.addEventListener('DOMContentLoaded', () => {
  generateCovers();
});

document.getElementById('titleInput').addEventListener('change', handleTitleInputChange);
function handleTitleInputChange(event) {
  TitleText = event.target.value;
  generateCovers();
}

document.getElementById('authorInput').addEventListener('change', handleAuthorInputChange);
function handleAuthorInputChange(event) {
  AuthorText = event.target.value;
  generateCovers();
}

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
  childElement.setAttribute('stroke', color);
  childElement.setAttribute('style', `${prevStyle} ${newStyle}`);
  childElement = svgElem.querySelector('path') || svgElem.querySelector('g') || svgElem;
  childElement.setAttribute('fill', color);
  childElement.setAttribute('stroke', color);
  childElement.setAttribute('style', `${prevStyle} ${newStyle}`);
}

function cropLeftUserSvg(svgElem) {
  // set the viewbox x-min to half the viewbox width and then set the x to be the previous x plus half the svg width
  const viewBox = svgElem.getAttribute('viewBox') || '0 0 700 700';
  const viewBoxArray = viewBox.split(' ');
  const viewBoxY = parseFloat(viewBoxArray[1]);
  const viewBoxWidth = parseFloat(viewBoxArray[2]);
  const viewBoxHeight = parseFloat(viewBoxArray[3]);
  svgElem.setAttribute('viewBox', `${viewBoxWidth / 2} ${viewBoxY} ${viewBoxWidth} ${viewBoxHeight}`);
  const x = parseFloat(svgElem.getAttribute('x'));
  const width = parseFloat(svgElem.getAttribute('width'));
  svgElem.setAttribute('x', x + width / 2);
}

function cropRightUserSvg(svgElem) {
  // set the viewbox x-min to half the viewbox width and then set the x to be the previous x plus half the svg width
  const viewBox = svgElem.getAttribute('viewBox') || '0 0 700 700';
  const viewBoxArray = viewBox.split(' ');
  const viewBoxY = parseFloat(viewBoxArray[1]);
  const viewBoxWidth = parseFloat(viewBoxArray[2]);
  const viewBoxHeight = parseFloat(viewBoxArray[3]);
  svgElem.setAttribute('viewBox', `${-(viewBoxWidth / 2)} ${viewBoxY} ${viewBoxWidth} ${viewBoxHeight}`);
  const x = parseFloat(svgElem.getAttribute('x'));
  const width = parseFloat(svgElem.getAttribute('width'));
  svgElem.setAttribute('x', x - width / 2);
}

function tesselateUserSvg(parentElem, svgText, middleColumnRepeats) {
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
  let repeats = middleColumnRepeats;
  for (let i = 0; i <= middleColumnIndex; i++) {
    columnRepeatCounts[middleColumnIndex + i] = repeats;
    columnRepeatCounts[middleColumnIndex - i] = repeats;
    repeats == MaxRepeats ? (repeats = MaxRepeats - 1) : (repeats = repeats + 1);
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
        Mirror ? rotateUserSvg(cloneUp, RotateAngle) : rotateUserSvg(cloneUp, -RotateAngle);
      } else {
        rotateUserSvg(cloneUp, RotateAngle % 180);
      }
      oddRepeats ? null : (mirrorState = !mirrorState);
      if (mirrorState && !(oddRepeats && i == 0)) {
        Mirror && mirrorUserSvg(cloneDown);
        Mirror ? rotateUserSvg(cloneDown, RotateAngle) : rotateUserSvg(cloneDown, -RotateAngle);
      } else {
        rotateUserSvg(cloneDown, RotateAngle % 180);
      }
      mirrorState = !mirrorState;

      // Trim Svg's on border edges
      if (columnIndex === 0) {
        cropLeftUserSvg(cloneUp);
        cropLeftUserSvg(cloneDown);
      } else if (columnIndex === NumColumns - 1) {
        cropRightUserSvg(cloneUp);
        cropRightUserSvg(cloneDown);
      }

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
  const titleString = TitleText;
  const titleSvg = createCenteredSvgText(ElementColor, FontSize, titleString, titleY, CoverWidth);
  FrontCoverSvg.appendChild(titleSvg);

  // Create centered author
  const authorY = rectangleHeight - BorderGap * 2;
  const authorString = AuthorText;
  const authorSvg = createCenteredSvgText(ElementColor, FontSize, authorString, authorY, CoverWidth);
  FrontCoverSvg.appendChild(authorSvg);

  tesselateUserSvg(FrontCoverSvg, SVGText, 2);
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

  tesselateUserSvg(BackCoverSvg, SVGText, 4);
}
