let catSvg = `<svg xmlns="http://www.w3.org/2000/svg" id="svg3228" xml:space="preserve" viewBox="0 0 700 700" overflow="visible" class="artSVG">
                <g id="g3236" transform="matrix(1.25 0 0 -1.25 0 700)">
                  <g id="g3246" transform="matrix(.88815 0 0 .88815 456.78 214.39)" >
                    <path id="path3248" d="m0 0c-4.942 32.123-20.005 60.481-24.658 69.321-4.652 8.84-10.7 26.519-9.002 51.363 1.699 24.843-9.608 96.585-67.298 142.64-57.69 46.059-111 60.386-118.17 65.134-7.773 5.143-39.08 19.54-46.471 22.983-7.391 3.444-37.273 7.258-50.677 8.968s-27.537-3.105-32.96-3.148c-5.423-0.042-35.984 9.347-40.636 9.347s-1.861-4.652-1.396-7.444c0.466-2.791 10.277-21.046 10.277-21.046s-10.742 0.11-11.207-2.216 12.769-12.274 12.769-12.274-6.256-20.293-6.581-24.874c-0.326-4.582 5.908-20.077 6.839-24.264 0.93-4.187 0-13.958 0-13.958l4.622-4.716s7.939-5.519 9.8-6.449c1.861-0.931 8.132 0.126 8.132 0.126 4.875-1.734 20.713 6.853 29.088 11.97 8.374 5.118 20.005 6.513 23.361 6.539 3.355 0.024 6.414-10.727 6.274-14.241-0.141-3.516 2.932-16.491 3.862-20.678 0.931-4.187-4.332-12.528-4.332-12.528-4.798 2.359-11.486 4.619-15.673 6.015-4.188 1.396-17.214 10.7-20.936 11.631s-6.979 1.396-13.585 3.216c-6.606 1.821-28.287 6.554-32.942 5.95-4.654-0.603-16.746-7.306-18.451-14.149-1.704-6.845 7.753-13.627 11.475-15.023 3.722-1.395 15.353 1.396 19.447 0.973 4.095-0.423 6.71-3.791 6.71-3.791 14.526-0.491 21.298-9.278 29.672-16.722s47.92-29.31 53.503-30.241 20.933 2.981 20.933 2.981 4.655-18.799 6.516-29.964c1.861-11.166-6.048-47.456-6.978-54.434-0.931-6.979-1.163-15.818-2.908-18.145-1.423-1.898-2.908-1.512-10.628-2.678-9.245-1.396-19.409-15.013-19.031-21.049 0.465-7.444 8.536-9.667 12.137-9.667h12.753c5.583 0 21.401 2.223 21.401 2.223l25.124-2.223h151.72c15.146 0 30.171-30.879 32.748-54.071 2.791-25.123-14.669-90.658-25.589-113.99-10.235-21.866-32.824-46.467-54.433-51.176-36.289-7.909-60.947 15.818-79.092 12.562-16.51-2.964-13.027-21.401-5.583-28.846 6.869-6.869 66.112-27.327 105.14-14.887 42.337 13.492 67.63 62.931 81.418 102.82 13.047 37.712 19.095 75.861 13.512 112.15m-198.83 69.434c-8.839-3.256-16.283-8.374-21.866-6.979-5.583 1.396-7.909-2.791-12.562-1.395 0 0 4.653 13.957 9.297 21.925 4.643 7.969 10.918 33.922 10.918 33.922 1.606-9.753 10.957-25.141 17.935-34.446 6.979-9.305 5.118-9.771-3.722-13.027"/>
                  </g>
                </g>
              </svg>`;
const Parser = new DOMParser();
const CatSvg = Parser.parseFromString(catSvg, 'image/svg+xml').documentElement;
const SVG_NS = 'http://www.w3.org/2000/svg';

const DefaultCoverWidth = 360;
const DefaultCoverProportions = 1.5;
const DefaultSpineProportions = 8;
const DefaultCoverHeight = DefaultCoverWidth * DefaultCoverProportions;

const DefaultCover = {
  // front, back, and spine shared properties
  backgroundColor: '#aeb2b1',
  elementColor: '#292a5a',
  width: DefaultCoverWidth,
  borderGap: DefaultCoverWidth / 18,
  borderThickness: 2.2,
  height: DefaultCoverWidth * DefaultCoverProportions,
  proportions: DefaultCoverProportions,
  // tesselation settings and art svg image
  pattern: {
    flip: false,
    imageScale: 0.6,
    increasePerColumn: 1,
    maxPerColumn: 4,
    mirror: true,
    numColumns: 5,
    rotateAngle: 0,
    svg: CatSvg,
    xOverhang: true,
    yOverhang: false,
  },
  // front cover specific properties
  front: {
    author: 'Felix\nPawsley',
    fontSize: 18,
    htmlElem: document.getElementById('front-cover'),
    initialCopies: 2,
    svgElem: null,
    title: 'Cats Cradle\nChronicles',
  },
  // back cover specific properties
  back: {
    htmlElem: document.getElementById('back-cover'),
    initialCopies: 4,
    svgElem: null,
  },
  // spine cover specific properties
  spine: {
    htmlElem: document.getElementById('spine-cover'),
    proportions: DefaultSpineProportions,
    svgElem: null,
    // note that Cover.width is for front and back, spine has it's own width
    width: DefaultCoverHeight / DefaultSpineProportions,
  },
};

let Cover = { ...DefaultCover };

document.addEventListener('DOMContentLoaded', function () {
  function initialize() {
    document.getElementById('backgroundColorInput').value = Cover.backgroundColor;
    document.getElementById('coverProportionsInput').value = Cover.proportions;
    document.getElementById('elementColorInput').value = Cover.elementColor;
    // front cover
    document.getElementById('authorInput').value = Cover.front.author;
    document.getElementById('fontSizeInput').value = Cover.front.fontSize;
    document.getElementById('frontCoverInitialCopiesInput').value = Cover.front.initialCopies;
    document.getElementById('titleInput').value = Cover.front.title;
    // back cover
    document.getElementById('backCoverInitialCopiesInput').value = Cover.back.initialCopies;
    // spine cover
    document.getElementById('spineProportionsInput').value = Cover.spine.proportions;
    // pattern
    document.getElementById('flipCheckbox').checked = Cover.pattern.flip;
    document.getElementById('imageScale').value = Cover.pattern.imageScale;
    document.getElementById('increasePerColumnInput').value = Cover.pattern.increasePerColumn;
    document.getElementById('maxPerColumnInput').value = Cover.pattern.maxPerColumn;
    document.getElementById('mirrorCheckbox').checked = Cover.pattern.mirror;
    document.getElementById('rotateInput').value = Cover.pattern.rotateAngle;
    document.getElementById('xOverhangCheckbox').checked = Cover.pattern.xOverhang;
    document.getElementById('yOverhangCheckbox').checked = Cover.pattern.yOverhang;
    generateCovers();
  }
  initialize();

  document.getElementById('settings').addEventListener('change', function (event) {
    const target = event.target;
    if (target.matches('#titleInput')) {
      Cover.front.title = target.value;
      generateCoverFrame(Cover, 'front');
    } else if (target.matches('#authorInput')) {
      Cover.front.author = target.value;
      generateCoverFrame(Cover, 'front');
    } else if (target.matches('#rotateInput')) {
      Cover.pattern.rotateAngle = parseInt(target.value);
    } else if (target.matches('#imageScale')) {
      Cover.pattern.imageScale = parseFloat(target.value);
    } else if (target.matches('#coverProportionsInput')) {
      Cover.proportions = parseFloat(target.value);
      Cover.height = Cover.width * Cover.proportions;
      generateCovers();
      return;
    } else if (target.matches('#spineProportionsInput')) {
      Cover.spine.proportions = parseFloat(target.value);
      Cover.spine.width = Cover.height / Cover.spine.proportions;
    } else if (target.matches('#fontSizeInput')) {
      Cover.front.fontSize = parseInt(target.value);
      generateCoverFrame(Cover, 'front');
    } else if (target.matches('#maxPerColumnInput')) {
      Cover.pattern.maxPerColumn = parseInt(target.value);
    } else if (target.matches('#increasePerColumnInput')) {
      Cover.pattern.increasePerColumn = parseInt(target.value);
    } else if (target.matches('#backCoverInitialCopiesInput')) {
      Cover.back.initialCopies = parseInt(target.value);
    } else if (target.matches('#frontCoverInitialCopiesInput')) {
      Cover.front.initialCopies = parseInt(target.value);
    }
    updateCovers();
  });

  document.getElementById('settings').addEventListener('input', function (event) {
    const target = event.target;
    if (target.matches('#elementColorInput')) {
      Cover.elementColor = target.value;
    } else if (target.matches('#backgroundColorInput')) {
      Cover.backgroundColor = target.value;
    }
    generateCovers();
  });

  document.getElementById('settings').addEventListener('change', function (event) {
    const target = event.target;
    if (target.matches('#mirrorCheckbox')) {
      Cover.pattern.mirror = target.checked;
    } else if (target.matches('#flipCheckbox')) {
      Cover.pattern.flip = target.checked;
    } else if (target.matches('#yOverhangCheckbox')) {
      Cover.pattern.yOverhang = target.checked;
    } else if (target.matches('#xOverhangCheckbox')) {
      Cover.pattern.xOverhang = target.checked;
    }
    updateCovers();
  });

  document.getElementById('save-cover').addEventListener('click', saveCovers);

  document.getElementById('fileInput').addEventListener('change', function (event) {
    // Load user uploaded SVG to tile
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function () {
      svgText = reader.result;
      Cover.pattern.svg = Parser.parseFromString(svgText, 'image/svg+xml').documentElement;
      Cover.pattern.svg.setAttribute('overflow', `visible`);
      Cover.pattern.svg.setAttribute('class', 'artSVG');
      generateCovers();
    };
    reader.readAsText(file);
  });

  document.querySelector('main').addEventListener('dragover', function (event) {
    event.preventDefault();
  });
});

function generateCovers() {
  generateFrontCover();
  generateBackCover();
  generateSpineCover();
}

function updateCovers() {
  tesselateCover('back');
  tesselateCover('front');
  generateSpineCover();
}

function generateFrontCover() {
  generateCoverFrame('front');
  tesselateCover('front');
}

function generateBackCover() {
  generateCoverFrame('back');
  tesselateCover('back');
}

function saveCovers() {
  const covers = {
    'front_cover.svg': Cover.front.svgElem,
    'back_cover.svg': Cover.back.svgElem,
    'spine_cover.svg': Cover.spine.svgElem,
  };
  for (const [key, value] of Object.entries(covers)) {
    saveSvg(key, value);
  }
}

function saveSvg(fileName, svgElem) {
  if (svgElem) {
    // Get the bounding box of the visible content
    const bbox = svgElem.getBBox();

    // Create a new SVG element with the same viewBox as the visible content
    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('viewBox', `${bbox.x - 5} ${bbox.y - 5} ${bbox.width + 10} ${bbox.height + 10}`);

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
function createCenteredSvgText(elementColor, fontSize, textString, textY, parentWidth, reposition) {
  const lines = textString.split('\n'); // Split textString by line breaks
  const group = document.createElementNS(SVG_NS, 'g');
  const padding = fontSize / 6; // Adjust this value to increase or decrease vertical spacing
  let lineSvgArr = [];
  let lineY;
  const fontFamilies =
    "'EB Garamond', Garamond, 'Libre Baskerville', 'Crimson Text', 'Cormorant Garamond', Georgia, Palatino, 'Book Antiqua', 'Times New Roman', Baskerville, serif";
  lines.forEach((line, index) => {
    const text = document.createElementNS(SVG_NS, 'text');
    lineSvgArr[index] = text;
    text.setAttribute('fill', elementColor);
    text.setAttribute('font-size', fontSize);
    text.setAttribute('font-family', fontFamilies);
    text.textContent = line;

    const textBBox = getBBoxAfterRender(Cover.front.svgElem, text);
    const textWidth = textBBox.width;

    const lineX = (parentWidth - textWidth) / 2;
    lineY = textY + index * (fontSize + padding);
    text.setAttribute('x', lineX);
    text.setAttribute('y', lineY);

    group.appendChild(text);
  });
  const height = lineY - textY;

  if (reposition) {
    lineSvgArr.forEach((line, index) => {
      y = parseFloat(line.getAttribute('y'));
      line.setAttribute('y', y - height / 2);
    });
  }
  return group;
}

function getSvgChild(svgElem) {
  return svgElem.querySelector('g') || svgElem.querySelector('path') || svgElem;
}

function rotateArtSvg(svgElem, angle) {
  // For user uploaded SVGs the transformations often won't apply at the top level
  let childElement = getSvgChild(svgElem);
  // This should be changed to getBBoxAfterRender
  const bbox = childElement.getBBox();
  const cx = bbox.x + bbox.width / 2;
  const cy = bbox.y + bbox.height / 2;

  const rotateTransform = `rotate(${angle} ${cx} ${cy})`;
  const prevTransform = childElement.getAttribute('transform') || '';
  childElement.setAttribute('transform', `${prevTransform} ${rotateTransform}`);
}

function mirrorArtSvg(svgElem) {
  // For user uploaded SVGs the transformations often won't apply at the top level
  let childElement = getSvgChild(svgElem);
  // This should be changed to getBBoxAfterRender
  const bbox = childElement.getBBox();
  const cx = bbox.x + bbox.width / 2;
  const cy = bbox.y + bbox.height / 2;

  // You don't want to know
  const mirrorTransform = `translate( ${cx} ${cy}) scale(-1 1) translate( ${-cx} ${-cy})`;
  const prevTransform = childElement.getAttribute('transform') || '';
  childElement.setAttribute('transform', `${prevTransform} ${mirrorTransform}`);
  return svgElem;
}

function colorArtSvg(svgElem, color) {
  // Color at multiple levels in multiple ways
  const newStyle = `fill:${color} stroke:${color}`;
  let childElement = getSvgChild(svgElem);
  let prevStyle = childElement.getAttribute('style') || '';
  childElement.setAttribute('fill', color);
  childElement.setAttribute('stroke', color);
  childElement.setAttribute('style', `${prevStyle} ${newStyle}`);
  childElement = getSvgChild(svgElem);
  childElement.setAttribute('fill', color);
  childElement.setAttribute('stroke', color);
  childElement.setAttribute('style', `${prevStyle} ${newStyle}`);
}

function generateSpineCover() {
  // Create cover Svg
  Cover.spine.svgElem = document.createElementNS(SVG_NS, 'svg');
  Cover.spine.svgElem.setAttribute('width', Cover.spine.width);
  Cover.spine.svgElem.setAttribute('height', Cover.height);
  Cover.spine.svgElem.setAttribute('overflow', `hidden`);
  Cover.spine.svgElem.style.backgroundColor = Cover.backgroundColor;

  // Create div which shows background color margin for cover SVG
  Cover.spine.htmlElem.innerHTML = '';
  Cover.spine.htmlElem.appendChild(Cover.spine.svgElem);
  Cover.spine.htmlElem.style.backgroundColor = Cover.backgroundColor;
  Cover.spine.htmlElem.style.width = Cover.spine.width + Cover.borderGap / 2 + 'px';
  Cover.spine.htmlElem.style.height = Cover.height + Cover.borderGap * 2 + 'px';

  // Create rectangle border slightly inset from cover SVG as per penguin style
  const borderHeight = Cover.height - Cover.borderThickness;
  const borderRectangle = createSVGElement('rect', {
    x: Cover.borderThickness / 2,
    y: Cover.borderThickness / 2,
    width: Cover.spine.width - Cover.borderThickness,
    height: borderHeight,
    fill: 'none',
    stroke: Cover.elementColor,
    'stroke-width': Cover.borderThickness,
  });
  Cover.spine.svgElem.appendChild(borderRectangle);

  // Create centered title and author
  const textY = Cover.height / 2;
  let text = Cover.front.title.split(/[ \n]+/).join('\n');
  text += '\n\n';
  text += Cover.front.author.split(/[ \n]+/).join('\n');
  const textSvg = createCenteredSvgText(
    Cover.elementColor,
    Cover.spine.width / 5,
    text,
    textY,
    Cover.spine.width,
    true
  );
  Cover.spine.svgElem.appendChild(textSvg);

  // Add a couple graphics
  const artSvgBBox = getBBoxAfterRender(Cover.spine.svgElem, Cover.pattern.svg);
  const artHeight = Cover.height / 9;
  const artWidth = artHeight * (artSvgBBox.width / artSvgBBox.height);
  const halfArtHeight = artHeight / 2;
  const halfArtWidth = artWidth / 2;
  const yTileCount = 12;
  const yTileHeight = Cover.height / yTileCount;
  const xCenter = Cover.spine.width / 2 - halfArtWidth;
  Cover.pattern.svg.setAttribute('width', artWidth);
  Cover.pattern.svg.setAttribute('height', artHeight);
  colorArtSvg(Cover.pattern.svg, Cover.elementColor);

  // Add art to top spine
  let clone = Cover.pattern.svg.cloneNode(true);
  clone.setAttribute('y', yTileHeight * 1 - halfArtHeight);
  clone.setAttribute('x', xCenter);
  Cover.spine.svgElem.appendChild(clone);
  clone = Cover.pattern.svg.cloneNode(true);
  clone.setAttribute('y', yTileHeight * 3 - halfArtHeight);
  clone.setAttribute('x', xCenter);
  Cover.spine.svgElem.appendChild(clone);
  mirrorArtSvg(clone);
  // Add art to bottom spine
  clone = Cover.pattern.svg.cloneNode(true);
  clone.setAttribute('y', yTileHeight * (yTileCount - 3) - halfArtHeight);
  clone.setAttribute('x', xCenter);
  Cover.spine.svgElem.appendChild(clone);
  clone = Cover.pattern.svg.cloneNode(true);
  clone.setAttribute('y', yTileHeight * (yTileCount - 1) - halfArtHeight);
  clone.setAttribute('x', xCenter);
  Cover.spine.svgElem.appendChild(clone);
  mirrorArtSvg(clone);
}

function createSVGElement(tag, attributes) {
  const element = document.createElementNS(SVG_NS, tag);
  for (let attr in attributes) {
    element.setAttribute(attr, attributes[attr]);
  }
  return element;
}

function generateCoverFrame(side) {
  // Create cover Svg
  Cover[side].svgElem = createSVGElement('svg', {
    width: Cover.width,
    height: Cover.height,
    overflow: 'hidden',
    style: `background-color: ${Cover.backgroundColor};`,
  });

  // Create div which shows background color margin for cover SVG
  Cover[side].htmlElem.innerHTML = '';
  Cover[side].htmlElem.appendChild(Cover[side].svgElem);
  Cover[side].htmlElem.style.backgroundColor = Cover.backgroundColor;
  Cover[side].htmlElem.style.width = Cover.width + Cover.borderGap * 2 + 'px';
  Cover[side].htmlElem.style.height = Cover.height + Cover.borderGap * 2 + 'px';

  // Create rectangle border slightly inset from cover SVG as per penguin style
  const borderHeight = Cover.height - Cover.borderThickness;
  const borderRectangle = createSVGElement('rect', {
    x: Cover.borderThickness / 2,
    y: Cover.borderThickness / 2,
    width: Cover.width - Cover.borderThickness,
    height: borderHeight,
    fill: 'none',
    stroke: Cover.elementColor,
    'stroke-width': Cover.borderThickness,
  });
  Cover[side].svgElem.appendChild(borderRectangle);

  if (side == 'front') {
    // Create centered title
    const titleY = Cover.borderGap * 1.5;
    const titleString = Cover[side].title;
    const titleSvg = createCenteredSvgText(
      Cover.elementColor,
      Cover[side].fontSize,
      titleString,
      titleY,
      Cover.width,
      false
    );
    Cover[side].svgElem.appendChild(titleSvg);

    // Create centered author
    const authorY = borderHeight - Cover.borderGap * 1.5;
    const authorString = Cover[side].author;
    const authorSvg = createCenteredSvgText(
      Cover.elementColor,
      Cover[side].fontSize,
      authorString,
      authorY,
      Cover.width,
      true
    );
    Cover[side].svgElem.appendChild(authorSvg);
  }
  return Cover[side].svgElem;
}

// Used to calculate how to apply transformation along diagonal
function everyOtherOtherDiagonal(x, y) {
  return (x + y) % 4 === 1 || (x + y) % 4 === 2;
}

function createPlacementGrid(side) {
  // Calculate column/row counts and middle
  const middleColumnIndex = Math.floor(Cover.pattern.numColumns / 2);
  let max = Cover[side].initialCopies + Cover.pattern.increasePerColumn * middleColumnIndex;
  if (max > Cover.pattern.maxPerColumn) max = Cover.pattern.maxPerColumn;
  const maxColumnCopyCount = Math.max(max, Cover[side].initialCopies);
  const numRows = maxColumnCopyCount * 2 - 1;
  const middleRowIndex = Math.floor(numRows / 2);

  // Calculate X tiling units
  const xTileCount = Cover.pattern.xOverhang ? Cover.pattern.numColumns - 1 : Cover.pattern.numColumns;
  const xOffset = Cover.pattern.xOverhang ? 0 : 0.5;
  const xTileWidth = Cover.width / xTileCount;

  // Calculate Y tiling units
  const yTileCount = Cover.pattern.yOverhang ? numRows - 1 : numRows + 1;
  const yOffset = Cover.pattern.yOverhang ? 0 : 1;
  const yTileHeight = Cover.height / yTileCount;

  // set art sizing
  const artSvgBBox = getBBoxAfterRender(getSvgChild(Cover[side].svgElem), Cover.pattern.svg);
  const artHeight = Cover.pattern.imageScale * (Cover.height / Cover.pattern.numColumns);
  const artWidth = artHeight * (artSvgBBox.width / artSvgBBox.height);
  Cover.pattern.svg.setAttribute('width', artWidth);
  Cover.pattern.svg.setAttribute('height', artHeight);
  Cover.pattern.svg.setAttribute('viewBox', `${artSvgBBox.x} ${artSvgBBox.y} ${artSvgBBox.width} ${artSvgBBox.height}`);
  colorArtSvg(Cover.pattern.svg, Cover.elementColor);
  const halfArtWidth = artWidth / 2;
  const halfArtHeight = artHeight / 2;

  // Columns x rows 2d array with elements either null or an object containing coordinates
  let placementGrid = {};
  placementGrid.grid = [];
  let copies = Cover[side].initialCopies;
  // Iterate through columns starting in the middle and working outwards
  for (let i = 0; i <= middleColumnIndex; i++) {
    let rightIndex = middleColumnIndex + i;
    let leftIndex = middleColumnIndex - i;
    placementGrid.grid[rightIndex] = [];
    placementGrid.grid[leftIndex] = [];
    // If odd we start in the middle, if even on either side of middle
    let jStart = copies % 2 == 0 ? 1 : 0;
    // iterate over rows in both columns starting from middle and working outwards
    for (let j = jStart; j < copies; j += 2) {
      let upIndex = middleRowIndex + j;
      let downIndex = middleRowIndex - j;
      placementGrid.grid[rightIndex][upIndex] = {
        evenDiagonal: everyOtherOtherDiagonal(rightIndex, upIndex),
        x: (rightIndex + xOffset) * xTileWidth - halfArtWidth,
        y: (upIndex + yOffset) * yTileHeight - halfArtHeight,
      };
      placementGrid.grid[leftIndex][upIndex] = {
        evenDiagonal: everyOtherOtherDiagonal(leftIndex, upIndex),
        x: (leftIndex + xOffset) * xTileWidth - halfArtWidth,
        y: (upIndex + yOffset) * yTileHeight - halfArtHeight,
      };
      placementGrid.grid[rightIndex][downIndex] = {
        evenDiagonal: everyOtherOtherDiagonal(rightIndex, downIndex),
        x: (rightIndex + xOffset) * xTileWidth - halfArtWidth,
        y: (downIndex + yOffset) * yTileHeight - halfArtHeight,
      };
      placementGrid.grid[leftIndex][downIndex] = {
        evenDiagonal: everyOtherOtherDiagonal(leftIndex, downIndex),
        x: (leftIndex + xOffset) * xTileWidth - halfArtWidth,
        y: (downIndex + yOffset) * yTileHeight - halfArtHeight,
      };
    }
    copies = copies + Cover.pattern.increasePerColumn;
    if (copies > Cover.pattern.maxPerColumn)
      if (copies - Cover.pattern.increasePerColumn == Cover.pattern.maxPerColumn)
        copies = Cover.pattern.maxPerColumn - 1;
      else copies = Cover.pattern.maxPerColumn;
  }

  placementGrid.rows = numRows;
  placementGrid.cols = Cover.pattern.numColumns;

  return placementGrid;
}

// Calculate placements, append cloned svg arts, and apply transformations
function tesselateCover(side) {
  const childrenToRemove = Cover[side].svgElem.querySelectorAll('.artSVG');
  childrenToRemove.forEach((child) => {
    child.remove();
  });

  const placementGrid = createPlacementGrid(side);

  for (let columnIndex = 0; columnIndex < placementGrid.cols; columnIndex++) {
    for (let rowIndex = 0; rowIndex < placementGrid.rows; rowIndex++) {
      const placement = placementGrid.grid[columnIndex][rowIndex];
      if (!placement) continue;
      const clone = Cover.pattern.svg.cloneNode(true);
      clone.setAttribute('y', placement.y);
      clone.setAttribute('x', placement.x);
      Cover[side].svgElem.appendChild(clone);
      let rotateAngle = Cover.pattern.rotateAngle;
      if (placement.evenDiagonal) {
        if (Cover.pattern.flip) rotateAngle += 180;
        if (Cover.pattern.mirror) {
          mirrorArtSvg(clone);
          rotateAngle = -rotateAngle;
        }
        rotateAngle = -rotateAngle;
      }
      rotateArtSvg(clone, rotateAngle);
      Cover[side].svgElem.appendChild(clone);
    }
  }
}
