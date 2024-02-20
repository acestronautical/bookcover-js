// make eslint happy
/* global JSZip */

// The default SVG
const DefaultSvgText = `<svg xmlns="http://www.w3.org/2000/svg" id="svg3228" xml:space="preserve" viewBox="0 0 700 700" overflow="visible" class="artSVG">
                <g id="g3236" transform="matrix(1.25 0 0 -1.25 0 700)">
                  <g id="g3246" transform="matrix(.88815 0 0 .88815 456.78 214.39)" >
                    <path id="path3248" d="m0 0c-4.942 32.123-20.005 60.481-24.658 69.321-4.652 8.84-10.7 26.519-9.002 51.363 1.699 24.843-9.608 96.585-67.298 142.64-57.69 46.059-111 60.386-118.17 65.134-7.773 5.143-39.08 19.54-46.471 22.983-7.391 3.444-37.273 7.258-50.677 8.968s-27.537-3.105-32.96-3.148c-5.423-0.042-35.984 9.347-40.636 9.347s-1.861-4.652-1.396-7.444c0.466-2.791 10.277-21.046 10.277-21.046s-10.742 0.11-11.207-2.216 12.769-12.274 12.769-12.274-6.256-20.293-6.581-24.874c-0.326-4.582 5.908-20.077 6.839-24.264 0.93-4.187 0-13.958 0-13.958l4.622-4.716s7.939-5.519 9.8-6.449c1.861-0.931 8.132 0.126 8.132 0.126 4.875-1.734 20.713 6.853 29.088 11.97 8.374 5.118 20.005 6.513 23.361 6.539 3.355 0.024 6.414-10.727 6.274-14.241-0.141-3.516 2.932-16.491 3.862-20.678 0.931-4.187-4.332-12.528-4.332-12.528-4.798 2.359-11.486 4.619-15.673 6.015-4.188 1.396-17.214 10.7-20.936 11.631s-6.979 1.396-13.585 3.216c-6.606 1.821-28.287 6.554-32.942 5.95-4.654-0.603-16.746-7.306-18.451-14.149-1.704-6.845 7.753-13.627 11.475-15.023 3.722-1.395 15.353 1.396 19.447 0.973 4.095-0.423 6.71-3.791 6.71-3.791 14.526-0.491 21.298-9.278 29.672-16.722s47.92-29.31 53.503-30.241 20.933 2.981 20.933 2.981 4.655-18.799 6.516-29.964c1.861-11.166-6.048-47.456-6.978-54.434-0.931-6.979-1.163-15.818-2.908-18.145-1.423-1.898-2.908-1.512-10.628-2.678-9.245-1.396-19.409-15.013-19.031-21.049 0.465-7.444 8.536-9.667 12.137-9.667h12.753c5.583 0 21.401 2.223 21.401 2.223l25.124-2.223h151.72c15.146 0 30.171-30.879 32.748-54.071 2.791-25.123-14.669-90.658-25.589-113.99-10.235-21.866-32.824-46.467-54.433-51.176-36.289-7.909-60.947 15.818-79.092 12.562-16.51-2.964-13.027-21.401-5.583-28.846 6.869-6.869 66.112-27.327 105.14-14.887 42.337 13.492 67.63 62.931 81.418 102.82 13.047 37.712 19.095 75.861 13.512 112.15m-198.83 69.434c-8.839-3.256-16.283-8.374-21.866-6.979-5.583 1.396-7.909-2.791-12.562-1.395 0 0 4.653 13.957 9.297 21.925 4.643 7.969 10.918 33.922 10.918 33.922 1.606-9.753 10.957-25.141 17.935-34.446 6.979-9.305 5.118-9.771-3.722-13.027"/>
                  </g>
                </g>
              </svg>`;
// Fonts and fallback fonts
const FontFamilies = "'EB Garamond', Garamond, 'Libre Baskerville', 'Crimson Text', 'Cormorant Garamond', Georgia, Palatino, 'Book Antiqua', 'Times New Roman', Baskerville, serif";

// Static helper class, does not need to be instantiated it's just a namespace
class SVGHelper {
  // Create an SVG element with specified tag and attributes
  static create(tag, attributes) {
    const element = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (const attr in attributes) {
      element.setAttribute(attr, attributes[attr]);
    }
    return element;
  }

  // Parse SVG text and return the SVG element
  static fromString(svgText) {
    const parser = new DOMParser();
    return parser.parseFromString(svgText, 'image/svg+xml').documentElement;
  }

  // Traverse from svg -> g -> path
  // Currently can't handle simple shapes like circle and rect
  static getChild(el) {
    const tagName = el.tagName.toLowerCase();
    if (tagName === 'svg') {
      return el.querySelector('g') || el.querySelector('path') || el;
    } else if (tagName === 'g') {
      return el.querySelector('path') || el;
    } else if (tagName === 'path') {
      return el;
    } else {
      console.log('Element is neither <g>, <path>, nor <svg>.');
      return el;
    }
  }

  // Get the bounding box of an SVG element after rendering
  static getBBoxAfterRender(parent, child) {
    parent.appendChild(child);
    const childBBox = child.getBBox();
    parent.removeChild(child);
    return childBBox;
  }

  // Rotate an SVG element by a specified angle around its center
  static rotate(svgElem, angle) {
    const childElement = SVGHelper.getChild(svgElem);
    const bbox = childElement.getBBox();
    const cx = bbox.x + bbox.width / 2;
    const cy = bbox.y + bbox.height / 2;
    const rotateTransform = `rotate(${angle} ${cx} ${cy})`;
    const prevTransform = childElement.getAttribute('transform') || '';
    childElement.setAttribute('transform', `${prevTransform} ${rotateTransform}`);
  }

  // Mirror an SVG element horizontally
  static mirror(svgElem) {
    const childElement = SVGHelper.getChild(svgElem);
    const bbox = childElement.getBBox();
    const cx = bbox.x + bbox.width / 2;
    const cy = bbox.y + bbox.height / 2;
    const mirrorTransform = `translate(${cx} ${cy}) scale(-1 1) translate(${-cx} ${-cy})`;
    const prevTransform = childElement.getAttribute('transform') || '';
    childElement.setAttribute('transform', `${prevTransform} ${mirrorTransform}`);
  }

  // Color an SVG element with a specified color
  // This is a bit brute force because SVG images can have arbitrary nesting
  // and 'style="stroke: fill:' attribute will override the stroke and fill attributes.
  static color(svgElem, color) {
    const elements = svgElem.querySelectorAll('*');
    elements.forEach((element) => {
      element.setAttribute('fill', color);
      element.setAttribute('stroke', color);
      element.removeAttribute('style');
    });
  }

  static createCenteredText({ color, size, string, y, parent, parentWidth, reposition }) {
    const lines = string.split('\n'); // Split string by line breaks
    const group = SVGHelper.create('g', {});
    const padding = size / 6; // Adjust to increase or decrease vertical spacing
    const lineSvgArr = [];
    let lineY;
    lines.forEach((line, index) => {
      const text = SVGHelper.create('text', {
        fill: color, 'font-size': size, 'font-family': FontFamilies
      });
      text.textContent = line;
      lineSvgArr[index] = text;

      const textBBox = SVGHelper.getBBoxAfterRender(parent, text);
      const textWidth = textBBox.width;

      const lineX = (parentWidth - textWidth) / 2;
      lineY = y + index * (size + padding);
      text.setAttribute('x', lineX);
      text.setAttribute('y', lineY);

      group.appendChild(text);
    });
    const height = lineY - y;

    if (reposition) {
      lineSvgArr.forEach((line) => {
        const y = parseFloat(line.getAttribute('y'));
        line.setAttribute('y', y - height / 2);
      });
    }
    return group;
  }

  static saveBlobAsFile(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  static save(fileName, svgElem) {
    if (svgElem) {
      const svgData = new XMLSerializer().serializeToString(svgElem);
      const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      SVGHelper.saveBlobAsFile(blob, fileName);
    }
  }

  static saveZip(downloads, filename) {
    const zip = new JSZip();
    for (const [file, svgElem] of Object.entries(downloads)) {
      const svgData = new XMLSerializer().serializeToString(svgElem);
      zip.file(file, svgData);
    }
    zip.generateAsync({ type: 'blob' }).then((content) => {
      SVGHelper.saveBlobAsFile(content, filename);
    });
  }
}

class BookCover {
  backgroundColor = '#aeb2b1';
  elementColor = '#292a5a';
  author = 'Felix\nPawsley';
  title = 'Cats Cradle\nChronicles';
  proportions = 1.5;
  width = 360; // Spine has it's own width
  // getters automatically update when other properties change
  get height() { return this.width * this.proportions; }
  borderGap = this.width / 18;
  borderThickness = 2.2;
  art = {
    increasePerColumn: 1,
    maxPerColumn: 4,
    numColumns: 5,
    rotateAngle: 0,
    scale: 1.5,
    defaultImages: [{ svg: SVGHelper.fromString(DefaultSvgText) }],
    images: [],
    step: 2, // determines which image to choose for multi-image placement
    flip: false,
    mirror: true,
    vertLines: false,
    xOverhang: true,
    yOverhang: false,
  };
  front = (() => {
    // This is haunted but the only way to make the getters close over 'this'
    // We want shared properties to be available on BookCover and on relevant children
    const _bookCover = this;
    return {
      fontSize: 18,
      htmlElem: document.getElementById('front-cover'),
      initialCopies: 2,
      svgElem: null,
      get height() { return _bookCover.height; },
      get width() { return _bookCover.width; },
      get proportions() { return _bookCover.proportions; },
    };
  })();
  back = (() => {
    const _bookCover = this;
    return {
      htmlElem: document.getElementById('back-cover'),
      initialCopies: 4,
      svgElem: null,
      get height() { return _bookCover.height; },
      get width() { return _bookCover.width; },
      get proportions() { return _bookCover.proportions; },
    };
  })();
  spine = (() => {
    const _bookCover = this;
    return {
      fontRotation: false,
      fontSize: 12,
      htmlElem: document.getElementById('spine-cover'),
      proportions: 8,
      svgElem: null,
      get height() { return _bookCover.height; },
      get width() { return _bookCover.height / this.proportions; },
    };
  })();

  generateCovers() {
    this.genFront();
    this.genBack();
    this.genSpine();
  }

  updateCovers() {
    this.tesselate('back');
    this.tesselate('front');
    this.genSpine();
  }

  genFront() {
    this.genCoverFrame('front');
    this.tesselate('front');
  }

  genBack() {
    this.genCoverFrame('back');
    this.tesselate('back');
  }

  saveCovers() {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    const covers = [this.back.svgElem, this.spine.svgElem, this.front.svgElem];
    const files = ['back_cover.svg', 'spine_cover.svg', 'front_cover.svg'];
    const downloads = files.reduce((result, key, index) => {
      result[key] = covers[index];
      return result;
    }, {});

    if (!isSafari) {
      for (const [key, value] of Object.entries(downloads)) {
        SVGHelper.save(key, value);
      }
    } else {
      SVGHelper.saveZip(downloads, 'covers.zip');
    }
  }

  sizeImage(image, parent, height) {
    image.BBox = SVGHelper.getBBoxAfterRender(parent, image.svg);
    image.height = height;
    image.width = image.height * (image.BBox.width / image.BBox.height);
    image.svg.setAttribute('width', image.width);
    image.svg.setAttribute('height', image.height);
    SVGHelper.color(image.svg, this.elementColor);
    image.halfHeight = image.height / 2;
    image.halfWidth = image.width / 2;
  }
  // Create rectangle border slightly inset from cover SVG as per penguin style
  genBorderRectangle(side) {
    const borderHeight = this[side].height - this.borderThickness;
    const borderWidth = this[side].width - this.borderThickness;
    const borderRectangle = SVGHelper.create('rect', {
      fill: 'none', stroke: this.elementColor, 'stroke-width': this.borderThickness,
      x: this.borderThickness / 2, y: this.borderThickness / 2,
      width: borderWidth, height: borderHeight,
    });
    this[side].svgElem.appendChild(borderRectangle);
    return { height: borderHeight, width: borderWidth };
  }

  genSpine() {

    this.genCoverFrame('spine');

    // Some placement calculations
    const yTileCount = 12;
    const yTileHeight = this.spine.height / yTileCount;
    const xCenter = this.spine.width / 2;
    const yCenter = this.spine.height / 2;
    const thinSpine = this.spine.proportions > 12;

    if (this.spine.fontRotation) {
      const commonTextAttrs = {
        y: yCenter, fill: this.elementColor, 'font-size': this.spine.fontSize,
        'font-family': FontFamilies, 'text-anchor': 'middle',
      };

      const titleSvg = SVGHelper.create('text', {
        x: xCenter + this.spine.fontSize / 2,
        transform: `rotate(90 ${xCenter + this.spine.fontSize / 2},${yCenter})`,
        ...commonTextAttrs
      });
      titleSvg.textContent = this.title;
      this.spine.svgElem.appendChild(titleSvg);

      const authorSvg = SVGHelper.create('text', {
        x: xCenter - this.spine.fontSize,
        transform: `rotate(90 ${xCenter - this.spine.fontSize},${yCenter})`,
        ...commonTextAttrs
      });
      authorSvg.textContent = this.author;
      this.spine.svgElem.appendChild(authorSvg);
    } else {
      const textY = this.spine.height / 2;
      let text = this.title.split(/[ \n]+/).join('\n');
      text += '\n\n';
      text += this.author.split(/[ \n]+/).join('\n');
      const textSvg = SVGHelper.createCenteredText({
        color: this.elementColor,
        size: this.spine.fontSize,
        string: text,
        y: textY,
        parent: this.spine.svgElem,
        parentWidth: this.spine.width,
        reposition: true,
      });
      this.spine.svgElem.appendChild(textSvg);
    }

    // Add a couple graphics
    const images = this.art.defaultImages || this.art.images;
    const artHeight = this.spine.height / (thinSpine ? 9 : 6);
    images.forEach((image) => {
      this.sizeImage(image, this.spine.svgElem, artHeight);
    });

    // Add art to top spine
    const image1 = images.at(-1);
    const image2 = images.at(-(2 % images.length));
    const image3 = images.at(-(3 % images.length));
    const image4 = images.at(-(4 % images.length));
    let clone = image1.svg.cloneNode(true);
    clone.setAttribute('y', yTileHeight * 1 - image1.halfHeight);
    clone.setAttribute('x', xCenter - image1.halfWidth);
    this.spine.svgElem.appendChild(clone);
    clone = image2.svg.cloneNode(true);
    clone.setAttribute('y', yTileHeight * 3 - image2.halfHeight);
    clone.setAttribute('x', xCenter - image2.halfWidth);
    this.spine.svgElem.appendChild(clone);
    SVGHelper.mirror(clone);
    // Add art to bottom spine
    clone = image3.svg.cloneNode(true);
    clone.setAttribute('y', yTileHeight * (yTileCount - 3) - image3.halfHeight);
    clone.setAttribute('x', xCenter - image3.halfWidth);
    this.spine.svgElem.appendChild(clone);
    clone = image4.svg.cloneNode(true);
    clone.setAttribute('y', yTileHeight * (yTileCount - 1) - image4.halfHeight);
    clone.setAttribute('x', xCenter - image4.halfWidth);
    this.spine.svgElem.appendChild(clone);
    SVGHelper.mirror(clone);
  }

  // Size divs and populate borders and text, but not art
  genCoverFrame(side) {
    // Create cover Svg
    this[side].svgElem = SVGHelper.create('svg', {
      width: this[side].width,
      height: this[side].height,
      overflow: 'hidden',
      style: `background-color: ${this.backgroundColor};`,
    });

    // Create div which shows background color margin for cover SVG
    this[side].htmlElem.innerHTML = '';
    this[side].htmlElem.appendChild(this[side].svgElem);
    this[side].htmlElem.style.backgroundColor = this.backgroundColor;
    // spine doesn't have as much width gap
    const htmlElemWidth = (side == 'spine') ?
      this[side].width + this.borderGap / 2 :
      this[side].width + this.borderGap * 2;
    this[side].htmlElem.style.width = `${htmlElemWidth}px`;
    this[side].htmlElem.style.height = `${this[side].height + this.borderGap * 2}px`;

    const borderHeight = this.genBorderRectangle(side).height;

    if (side == 'front') {
      // Create centered title
      const titleY = this.borderGap * 1.5;
      const titleString = this.title;
      const titleSvg = SVGHelper.createCenteredText({
        color: this.elementColor,
        size: this[side].fontSize,
        string: titleString,
        y: titleY,
        parent: this[side].svgElem,
        parentWidth: this[side].width,
        reposition: false,
      });
      this[side].svgElem.appendChild(titleSvg);

      // Create centered author
      const authorY = borderHeight - this.borderGap * 1.5;
      const authorString = this.author;
      const authorSvg = SVGHelper.createCenteredText({
        color: this.elementColor,
        size: this[side].fontSize,
        string: authorString,
        y: authorY,
        parent: this[side].svgElem,
        parentWidth: this[side].width,
        reposition: true,
      });
      this[side].svgElem.appendChild(authorSvg);
    }
    return this[side].svgElem;
  }

  transformDecider({ x, y, grid, style }) {
    switch (style) {
      case 'diagonals':
        return (x + y) % 4 === 1 || (x + y) % 4 === 2;
      case 'symmetric':
        if (grid.oddCols) {
          if (x < Math.floor(grid.cols / 2)) return true;
          else if (x > Math.floor(grid.cols / 2)) return false;
          else return y % 4 == 1 || y % 4 == 2 ? false : true;
        } else {
          return x < grid.cols / 2 ? true : false;
        }
    }
  }

  createPlacementGrid(side) {
    // Calculate column/row counts and middle
    const middleColumnIndex = Math.floor(this.art.numColumns / 2);
    let max = this[side].initialCopies + this.art.increasePerColumn * middleColumnIndex;
    if (max > this.art.maxPerColumn) max = this.art.maxPerColumn;
    const maxColumnCopyCount = Math.max(max, this[side].initialCopies);
    const numRows = maxColumnCopyCount * 2 - 1;
    const middleRowIndex = Math.floor(numRows / 2);

    // Calculate X tiling units
    const xTileCount = this.art.xOverhang ? this.art.numColumns - 1 : this.art.numColumns;
    const xOffset = this.art.xOverhang ? 0 : 0.5;
    const xTileWidth = (this[side].width - this.borderThickness * 2) / xTileCount;

    // Calculate Y tiling units
    const yTileCount = this.art.yOverhang ? numRows - 1 : numRows + 1;
    const yOffset = this.art.yOverhang ? 0 : 1;
    const yTileHeight = this[side].height / yTileCount;

    // Columns x rows 2d array with elements either null or an object containing coordinates
    const placementGrid = {
      rows: numRows,
      oddRows: this.art.numRows % 2 != 0,
      cols: this.art.numColumns,
      oddCols: this.art.numColumns % 2 != 0,
      grid: [],
    };
    // Decides which elements to mirror/flip/rotate
    const style = placementGrid.oddCols ? 'diagonals' : 'symmetric';
    let copies = this[side].initialCopies;
    // Iterate through columns starting in the middle and working outwards
    for (let i = 0; i <= middleColumnIndex; i++) {
      const rightIndex = middleColumnIndex + i;
      const leftIndex = middleColumnIndex - (placementGrid.oddCols ? i : i + 1);
      placementGrid.grid[rightIndex] = [];
      placementGrid.grid[leftIndex] = [];
      // If odd we start in the middle, if even on either side of middle
      const jStart = copies % 2 == 0 ? 1 : 0;
      // iterate over rows in both columns starting from middle and working outwards
      for (let j = jStart; j < copies; j += 2) {
        const upIndex = middleRowIndex + j;
        const downIndex = middleRowIndex - j;
        const fillGrid = (index1, index2) => {
          placementGrid.grid[index1][index2] = {
            applyTransform: this.transformDecider({ x: index1, y: index2, grid: placementGrid, style: style }),
            x: (index1 + xOffset) * xTileWidth + this.borderThickness,
            y: (index2 + yOffset) * yTileHeight,
          };
        };
        fillGrid(rightIndex, upIndex);
        fillGrid(leftIndex, upIndex);
        fillGrid(rightIndex, downIndex);
        fillGrid(leftIndex, downIndex);
      }
      copies = copies + this.art.increasePerColumn;
      if (copies > this.art.maxPerColumn)
        if (copies - this.art.increasePerColumn == this.art.maxPerColumn) copies = this.art.maxPerColumn - 1;
        else copies = this.art.maxPerColumn;
    }

    return placementGrid;
  }

  // Decorate the cover as per settings
  tesselate(side) {
    const childrenToRemove = this[side].svgElem.querySelectorAll('.artSVG');
    childrenToRemove.forEach((child) => {
      child.remove();
    });

    // set art sizing
    const images = this.art.defaultImages || this.art.images;
    const artHeight = this.art.scale * (this[side].width / this.art.numColumns);
    images.forEach((image) => {
      this.sizeImage(image, this[side].svgElem, artHeight);
    });

    // tesselate art and apply transformations
    const imageCounter = { odd: 1, even: 0 };
    const placement = this.createPlacementGrid(side);
    const leftOfMiddle = placement.oddCols ? Math.floor(placement.cols / 2) - 1 : placement.cols / 2 - 2;
    const rightOfMiddle = placement.oddCols ? Math.floor(placement.cols / 2) + 1 : placement.cols / 2 + 1;
    for (let columnIndex = 0; columnIndex < placement.cols; columnIndex++) {
      let lineAdded = false;
      for (let rowIndex = 0; rowIndex < placement.rows; rowIndex++) {
        const place = placement.grid[columnIndex][rowIndex];
        if (!place) continue;

        // Add vertical lines on either side of the middle
        if (this.art.vertLines && !lineAdded && [leftOfMiddle, rightOfMiddle].includes(columnIndex)) {
          const lineLeft = SVGHelper.create('line', {
            x1: place.x,
            y1: 0,
            x2: place.x,
            y2: this[side].height,
            stroke: this.elementColor,
            'stroke-width': this.borderThickness / 1.5,
            class: 'artSVG',
          });
          this[side].svgElem.appendChild(lineLeft);
          lineAdded = true;
        }
        // Add the art at position, correcting for midpoint not top left
        const count = place.applyTransform ? imageCounter.even : imageCounter.odd;
        place.applyTransform ? (imageCounter.even += this.art.step) : (imageCounter.odd += this.art.step);
        const image = images.at(-(count % images.length));
        const clone = image.svg.cloneNode(true);
        clone.setAttribute('y', place.y - image.halfHeight);
        clone.setAttribute('x', place.x - image.halfWidth);
        this[side].svgElem.appendChild(clone);

        // Apply transformations
        let rotateAngle = this.art.rotateAngle;
        if (place.applyTransform) {
          if (this.art.flip) rotateAngle += 180;
          if (this.art.mirror) {
            SVGHelper.mirror(clone);
            rotateAngle = -rotateAngle;
          }
          rotateAngle = -rotateAngle;
        }
        SVGHelper.rotate(clone, rotateAngle);

        // Update element with transformations
        this[side].svgElem.appendChild(clone);
      }
    }
  }
}

function initializePage() {
  document.getElementById('backgroundColorInput').value = Cover.backgroundColor;
  document.getElementById('coverProportionsInput').value = Cover.proportions;
  document.getElementById('elementColorInput').value = Cover.elementColor;
  document.getElementById('authorInput').value = Cover.author;
  document.getElementById('coverFontSizeInput').value = Cover.front.fontSize;
  document.getElementById('spineFontSizeInput').value = Cover.spine.fontSize;
  document.getElementById('frontCoverInitialCopiesInput').value = Cover.front.initialCopies;
  document.getElementById('titleInput').value = Cover.title;
  document.getElementById('backCoverInitialCopiesInput').value = Cover.back.initialCopies;
  document.getElementById('spineProportionsInput').value = Cover.spine.proportions;
  document.getElementById('flipCheckbox').checked = Cover.art.flip;
  document.getElementById('imageScale').value = Cover.art.scale;
  document.getElementById('increasePerColumnInput').value = Cover.art.increasePerColumn;
  document.getElementById('maxPerColumnInput').value = Cover.art.maxPerColumn;
  document.getElementById('numColumnsInput').value = Cover.art.numColumns;
  document.getElementById('mirrorCheckbox').checked = Cover.art.mirror;
  document.getElementById('rotateInput').value = Cover.art.rotateAngle;
  document.getElementById('verticalLinesCheckbox').checked = Cover.art.vertLines;
  document.getElementById('xOverhangCheckbox').checked = Cover.art.xOverhang;
  document.getElementById('yOverhangCheckbox').checked = Cover.art.yOverhang;
  Cover.generateCovers();
}

function addEventListeners() {
  document.getElementById('settings').addEventListener('change', function (event) {
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
    } else if (target.matches('#coverProportionsInput')) {
      Cover.proportions = parseFloat(target.value);
      Cover.generateCovers();
      return;
    } else if (target.matches('#spineProportionsInput')) {
      Cover.spine.proportions = parseFloat(target.value);
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

  document.getElementById('settings').addEventListener('input', function (event) {
    const target = event.target;
    if (target.matches('#elementColorInput')) {
      Cover.elementColor = target.value;
    } else if (target.matches('#backgroundColorInput')) {
      Cover.backgroundColor = target.value;
    }
    Cover.generateCovers();
  });

  document.getElementById('settings').addEventListener('change', function (event) {
    const target = event.target;
    if (target.matches('#mirrorCheckbox')) {
      Cover.art.mirror = target.checked;
    } else if (target.matches('#flipCheckbox')) {
      Cover.art.flip = target.checked;
    } else if (target.matches('#yOverhangCheckbox')) {
      Cover.art.yOverhang = target.checked;
    } else if (target.matches('#xOverhangCheckbox')) {
      Cover.art.xOverhang = target.checked;
    } else if (target.matches('#verticalLinesCheckbox')) {
      Cover.art.vertLines = target.checked;
    } else if (target.matches('#spineFontRotationInput')) {
      Cover.spine.fontRotation = target.checked;
    }
    Cover.updateCovers();
  });

  document.getElementById('save-cover').addEventListener('click', function () {
    Cover.saveCovers();
  });

  document.getElementById('fileDelete').addEventListener('click', function () {
    Cover.art.images.shift();
    if (Cover.art.images.length == 0) {
      Cover.art.defaultImages = [{ svg: SVGHelper.fromString(DefaultSvgText) }];
      splitFileButtons(false);
    }
    Cover.updateCovers();
  });

  function splitFileButtons(split) {
    if (split) {
      document.getElementById('fileDelete').classList.remove('hidden');
      document.getElementById('fileInputWrapper').classList.remove('button');
      document.getElementById('fileInputWrapper').classList.add('button-split-left');
      document.getElementById('fileInputLabel').innerHTML = 'Another';
    } else {
      document.getElementById('fileDelete').classList.add('hidden');
      document.getElementById('fileInputWrapper').classList.add('button');
      document.getElementById('fileInputWrapper').classList.remove('button-split-left');
      document.getElementById('fileInputLabel').innerHTML = 'Upload An SVG';
    }
  }

  document.getElementById('fileInput').addEventListener('change', function (event) {
    // Load user uploaded SVG to tile
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
      if (Cover.art.images.length > 2) Cover.art.step = Math.floor(Math.random() * 100);
      Cover.generateCovers();
    };
    reader.readAsText(file);
  });

  document.querySelector('main').addEventListener('dragover', function (event) {
    event.preventDefault();
  });
}

const Cover = new BookCover();

function main() {
  initializePage();
  addEventListeners();
}

document.addEventListener('DOMContentLoaded', main);
