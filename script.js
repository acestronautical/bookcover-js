// The default SVG
const DefaultSvgText = `<svg xmlns="http://www.w3.org/2000/svg" id="svg3228" xml:space="preserve" viewBox="0 0 700 700" overflow="visible" class="artSVG">
                <g id="g3236" transform="matrix(1.25 0 0 -1.25 0 700)">
                  <g id="g3246" transform="matrix(.88815 0 0 .88815 456.78 214.39)" >
                    <path id="path3248" d="m0 0c-4.942 32.123-20.005 60.481-24.658 69.321-4.652 8.84-10.7 26.519-9.002 51.363 1.699 24.843-9.608 96.585-67.298 142.64-57.69 46.059-111 60.386-118.17 65.134-7.773 5.143-39.08 19.54-46.471 22.983-7.391 3.444-37.273 7.258-50.677 8.968s-27.537-3.105-32.96-3.148c-5.423-0.042-35.984 9.347-40.636 9.347s-1.861-4.652-1.396-7.444c0.466-2.791 10.277-21.046 10.277-21.046s-10.742 0.11-11.207-2.216 12.769-12.274 12.769-12.274-6.256-20.293-6.581-24.874c-0.326-4.582 5.908-20.077 6.839-24.264 0.93-4.187 0-13.958 0-13.958l4.622-4.716s7.939-5.519 9.8-6.449c1.861-0.931 8.132 0.126 8.132 0.126 4.875-1.734 20.713 6.853 29.088 11.97 8.374 5.118 20.005 6.513 23.361 6.539 3.355 0.024 6.414-10.727 6.274-14.241-0.141-3.516 2.932-16.491 3.862-20.678 0.931-4.187-4.332-12.528-4.332-12.528-4.798 2.359-11.486 4.619-15.673 6.015-4.188 1.396-17.214 10.7-20.936 11.631s-6.979 1.396-13.585 3.216c-6.606 1.821-28.287 6.554-32.942 5.95-4.654-0.603-16.746-7.306-18.451-14.149-1.704-6.845 7.753-13.627 11.475-15.023 3.722-1.395 15.353 1.396 19.447 0.973 4.095-0.423 6.71-3.791 6.71-3.791 14.526-0.491 21.298-9.278 29.672-16.722s47.92-29.31 53.503-30.241 20.933 2.981 20.933 2.981 4.655-18.799 6.516-29.964c1.861-11.166-6.048-47.456-6.978-54.434-0.931-6.979-1.163-15.818-2.908-18.145-1.423-1.898-2.908-1.512-10.628-2.678-9.245-1.396-19.409-15.013-19.031-21.049 0.465-7.444 8.536-9.667 12.137-9.667h12.753c5.583 0 21.401 2.223 21.401 2.223l25.124-2.223h151.72c15.146 0 30.171-30.879 32.748-54.071 2.791-25.123-14.669-90.658-25.589-113.99-10.235-21.866-32.824-46.467-54.433-51.176-36.289-7.909-60.947 15.818-79.092 12.562-16.51-2.964-13.027-21.401-5.583-28.846 6.869-6.869 66.112-27.327 105.14-14.887 42.337 13.492 67.63 62.931 81.418 102.82 13.047 37.712 19.095 75.861 13.512 112.15m-198.83 69.434c-8.839-3.256-16.283-8.374-21.866-6.979-5.583 1.396-7.909-2.791-12.562-1.395 0 0 4.653 13.957 9.297 21.925 4.643 7.969 10.918 33.922 10.918 33.922 1.606-9.753 10.957-25.141 17.935-34.446 6.979-9.305 5.118-9.771-3.722-13.027"/>
                  </g>
                </g>
              </svg>`;
// Fonts and fallback fonts
const FontFamilies = "'Adobe Garamond Pro', 'EB Garamond','Cormorant Garamond', Garamond, 'Libre Baskerville', 'Crimson Text', Georgia, Palatino, 'Book Antiqua', 'Times New Roman', Baskerville, serif";

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
        fill: color, 'font-size': size, 'font-family': FontFamilies, 'white-space': 'pre'
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

  static saveAsPng(filename, svgElem, scaleFactor = 10) {
    const svgData = new XMLSerializer().serializeToString(svgElem);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = function () {
      const width = img.width * scaleFactor;
      const height = img.height * scaleFactor;
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      // Convert the canvas to PNG and save it
      canvas.toBlob(function (blob) {
        if (blob) {
          SVGHelper.saveBlobAsFile(blob, filename);
        }
      });
    };

    // Create a data URL from the SVG data and set it as the image source
    img.src = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgData)))}`;
  }
}

class BookCover {
  inchToPx = 72; // Assume 72 DPI for adobe illustrator
  mmToPx = 2.8346;
  backgroundColor = '#a6a6a6';
  elementColor = '#27285f';
  author = 'Felix\nPawsley';
  title = 'Cats Cradle\nChronicles';
  outerWidth = 396; // 5.5 inches
  outerHeight = 648; // 9 inches
  borderGap = 18; // .25 inches
  borderThickness = 3.6; // .5 inches
  set borderGapInches(inches) { this.borderGap = inches * this.inchToPx; }
  set borderThicknessInches(inches) { this.borderThickness = inches * this.inchToPx; }
  set outerWidthInches(inches) { this.outerWidth = inches * this.inchToPx; }
  set outerHeightInches(inches) { this.outerHeight = inches * this.inchToPx; }
  get borderThicknessInches() { return this.borderThickness / this.inchToPx; }
  get borderGapInches() { return this.borderGap / this.inchToPx; }
  get outerWidthInches() { return this.outerWidth / this.inchToPx; }
  get outerHeightInches() { return this.outerHeight / this.inchToPx; }
  set borderThicknessMilli(mm) { this.borderThickness = mm * this.mmToPx; }
  set borderGapMilli(mm) { this.borderGap = mm * this.mmToPx; }
  set outerWidthMilli(mm) { this.outerWidth = mm * this.mmToPx; }
  set outerHeightMilli(mm) { this.outerHeight = mm * this.mmToPx; }
  get borderThicknessMilli() { return this.borderThickness / this.mmToPx; }
  get borderGapMilli() { return this.borderGap / this.mmToPx; }
  get outerWidthMilli() { return this.outerWidth / this.mmToPx; }
  get outerHeightMilli() { return this.outerHeight / this.mmToPx; }
  // getters automatically update when other properties change
  get scale() { return (this.outerWidth * 2 + this.spine.outerWidth) / 360; }
  get proportions() { return this.outerHeight / this.outerWidth; }
  get innerWidth() { return (this.outerWidth - this.borderGap * 2); }
  get innerHeight() { return (this.outerHeight - this.borderGap * 2); }
  art = {
    increasePerColumn: 1,
    maxPerColumn: 5,
    numColumns: 5,
    rotateAngle: 0,
    scale: 1.7,
    defaultImages: [{ svg: SVGHelper.fromString(DefaultSvgText) }],
    images: [],
    // determines which image to choose for multi-image placement
    get step() { return this.images.length > 2 ? Math.floor(Math.random() * 13) : 2; },
    flip: false,
    mirror: true,
    vertLines: false,
    xStretch: true,
    yStretch: true,
  };
  front = (() => {
    // This is haunted but the only way to make the getters close over 'this'
    // We want shared properties to be available on BookCover and on relevant children
    const _bookCover = this;
    return {
      disabled: false,
      fontSize: 26,
      htmlElem: document.getElementById('front-cover'),
      initialCopies: 3,
      svgElem: null,
      get outerHeight() { return _bookCover.outerHeight; },
      get outerWidth() { return _bookCover.outerWidth; },
      get innerHeight() { return _bookCover.innerHeight; },
      get innerWidth() { return _bookCover.innerWidth; },
      get proportions() { return _bookCover.proportions; },
    };
  })();
  back = (() => {
    const _bookCover = this;
    return {
      disabled: false,
      htmlElem: document.getElementById('back-cover'),
      initialCopies: 4,
      svgElem: null,
      get outerHeight() { return _bookCover.outerHeight; },
      get outerWidth() { return _bookCover.outerWidth; },
      get innerHeight() { return _bookCover.innerHeight; },
      get innerWidth() { return _bookCover.innerWidth; },
      get proportions() { return _bookCover.proportions; },
    };
  })();
  spine = (() => {
    const _bookCover = this;
    return {
      disabled: false,
      artStyle: 4,
      textStyle: 1,
      fontSize: 18,
      htmlElem: document.getElementById('spine-cover'),
      svgElem: null,
      outerWidth: 108, // 1.5 inches
      get outerWidthInches() { return this.outerWidth / _bookCover.inchToPx; },
      get outerWidthMilli() { return this.outerWidth / _bookCover.mmToPx; },
      set outerWidthInches(inches) { this.outerWidth = inches * _bookCover.inchToPx; },
      set outerWidthMilli(mm) { this.outerWidth = mm * _bookCover.mmToPx; },
      get outerHeight() { return _bookCover.outerHeight; },
      get proportions() { return _bookCover.outerHeight / this.outerWidth; },
      get innerHeight() { return _bookCover.innerHeight; },
      get innerWidth() { return this.outerWidth - _bookCover.borderGap; },
    };
  })();

  generateCovers() {
    if (!this.front.disabled) this.genFront();
    if (!this.back.disabled) this.genBack();
    if (!this.spine.disabled) this.genSpine();
  }

  updateCovers() {
    if (!this.front.disabled) this.tesselate('front');
    if (!this.back.disabled) this.tesselate('back');
    if (!this.spine.disabled) this.genSpine();
  }

  genFront() {
    this.genCoverFrame('front');
    this.tesselate('front');
  }

  genBack() {
    this.genCoverFrame('back');
    this.tesselate('back');
  }

  sizeImage(image, parent, maxHeight, maxWidth) {
    if (!image.BBox) {
      image.BBox = SVGHelper.getBBoxAfterRender(parent, image.svg);
    }
    const size = Math.min(maxHeight, maxWidth);
    if (image.BBox.width > image.BBox.height) {
      image.width = size;
      image.height = image.width * (image.BBox.height / image.BBox.width);

    } else {
      image.height = size;
      image.width = image.height * (image.BBox.width / image.BBox.height);
    }
    image.svg.setAttribute('width', image.width);
    image.svg.setAttribute('height', image.height);
    SVGHelper.color(image.svg, this.elementColor);
    image.halfHeight = image.height / 2;
    image.halfWidth = image.width / 2;
  }

  // Size divs and populate borders and text, but not art
  genCoverFrame(side) {

    // Create div which shows background color margin for cover SVG
    this[side].htmlElem.innerHTML = '';
    this[side].htmlElem.style.backgroundColor = this.backgroundColor;
    this[side].htmlElem.style.width = `${this[side].outerWidth}px`;
    this[side].htmlElem.style.height = `${this[side].outerHeight}px`;

    // Create cover Svg
    this[side].svgElem = SVGHelper.create('svg', {
      width: this[side].innerWidth,
      height: this[side].innerHeight,
      overflow: 'hidden',
    });
    this[side].htmlElem.appendChild(this[side].svgElem);

    // Create border rectangle
    const borderHeight = this.genBorderRectangle(side).height;

    if (side == 'front') {
      // Create centered title
      const titleY = (this[side].innerHeight / 16) + this.borderThickness;
      const titleString = this.title;
      const titleSvg = SVGHelper.createCenteredText({
        color: this.elementColor,
        size: this[side].fontSize,
        string: titleString,
        y: titleY,
        parent: this[side].svgElem,
        parentWidth: this[side].innerWidth,
        reposition: false,
      });
      this[side].svgElem.appendChild(titleSvg);

      // Create centered author
      const authorY = borderHeight - this[side].innerHeight / 16;
      const authorString = this.author;
      const authorSvg = SVGHelper.createCenteredText({
        color: this.elementColor,
        size: this[side].fontSize,
        string: authorString,
        y: authorY,
        parent: this[side].svgElem,
        parentWidth: this[side].innerWidth,
        reposition: true,
      });
      this[side].svgElem.appendChild(authorSvg);
    }
    return this[side].svgElem;
  }


  // Create rectangle border slightly inset from cover SVG as per penguin style
  genBorderRectangle(side) {
    const group = SVGHelper.create('g', { id: `${side}Border` });
    const outerHeight = this[side].innerHeight;
    const outerWidth = this[side].innerWidth;
    const outerRectangle = SVGHelper.create('rect', {
      fill: 'none', stroke: this.elementColor, 'stroke-width': this.borderThickness * 2,
      x: 0, y: 0,
      width: outerWidth, height: outerHeight,
      id: `${side}OuterBorder`
    });
    group.appendChild(outerRectangle);
    const innerHeight = this[side].innerHeight - this.borderThickness * 2;
    const innerWidth = this[side].innerWidth - this.borderThickness * 2;
    const innerRectangle = SVGHelper.create('rect', {
      fill: 'none', stroke: this.elementColor,
      x: this.borderThickness, y: this.borderThickness,
      width: innerWidth, height: innerHeight,
      id: `${side}InnerBorder`
    });
    group.appendChild(innerRectangle);
    this[side].svgElem.appendChild(group);
    return { height: innerHeight, width: innerWidth };
  }

  genSpine() {

    this.genCoverFrame('spine');

    // Some placement calculations
    const yTileCount = 12;
    const yTileHeight = this.spine.innerHeight / yTileCount;
    const xCenter = this.spine.innerWidth / 2;
    const yCenter = this.spine.innerHeight / 2;
    const commonTextAttrs = {
      y: yCenter, fill: this.elementColor, 'font-size': this.spine.fontSize,
      'font-family': FontFamilies, 'text-anchor': 'middle', 'white-space': 'pre'
    };

    if (this.spine.textStyle == 1) {
      // center title and author
      const textY = this.spine.innerHeight / 2;
      let text = this.title.split(/[ \n]+/).join('\n');
      text += '\n\n';
      text += this.author.split(/[ \n]+/).join('\n');
      const textSvg = SVGHelper.createCenteredText({
        color: this.elementColor,
        size: this.spine.fontSize,
        string: text,
        y: textY,
        parent: this.spine.svgElem,
        parentWidth: this.spine.innerWidth,
        reposition: true,
      });
      this.spine.svgElem.appendChild(textSvg);
    } else if (this.spine.textStyle == 2) {
      // Rotated title and author
      const titleSvg = SVGHelper.create('text', {
        x: xCenter + this.spine.fontSize / 2,
        transform: `rotate(90 ${xCenter + this.spine.fontSize / 2},${yCenter})`,
        ...commonTextAttrs
      });
      titleSvg.textContent = this.title.split(/[\n]+/).join(' ');
      this.spine.svgElem.appendChild(titleSvg);

      const authorSvg = SVGHelper.create('text', {
        x: xCenter - this.spine.fontSize,
        transform: `rotate(90 ${xCenter - this.spine.fontSize},${yCenter})`,
        ...commonTextAttrs
      });
      authorSvg.textContent = this.author.split(/[\n]+/).join(' ');
      this.spine.svgElem.appendChild(authorSvg);
    } else if (this.spine.textStyle == 3 || this.spine.textStyle == 4) {
      // center rotated title
      const titleSvg = SVGHelper.create('text', {
        x: xCenter,
        transform: `rotate(90 ${xCenter},${yCenter - this.spine.fontSize / 4})`,
        'letter-spacing': 3,
        ...commonTextAttrs
      });
      titleSvg.textContent = this.title.split(/[\n]+/).join(' ');
      this.spine.svgElem.appendChild(titleSvg);
    }
    if (this.spine.textStyle == 4) {
      // author at top
      const text = this.author.split(/[ \n]+/).join('\n');
      const longest = text.split(/[ \n]+/).reduce((acc, item) => Math.max(acc, item.length), 0);
      const textSvg = SVGHelper.createCenteredText({
        color: this.elementColor,
        size: 4 * this.spine.innerWidth / (Math.log2(longest) * longest - 1),
        string: text,
        y: this.spine.innerHeight / 12,
        parent: this.spine.svgElem,
        parentWidth: this.spine.innerWidth,
        reposition: false,
      });
      this.spine.svgElem.appendChild(textSvg);

    }

    // Add a couple graphics
    const images = this.art.defaultImages || this.art.images;
    const maxWidth = this.art.scale * (this.spine.innerWidth);
    const maxHeight = this.art.scale * (this.spine.innerHeight / 8);
    images.forEach((image) => {
      this.sizeImage(image, this.spine.svgElem, maxHeight, maxWidth);
    });

    const artStyles = {
      // offset
      0: [0, 0, false], 2: [2, 2, false],
      3: [3, 3, false], 4: [4, 4, false],
      // centered
      5: [1, 1, true], 6: [2, 2, true],
      // top heavy offset
      7: [3, 2, false], 8: [4, 3, false],
      // bottom heavy offset
      9: [2, 3, false], 10: [3, 4, false],
      // top only
      11: [1, 0, true],
      // bottom only
      12: [0, 1, true]

    };
    const [topRepeats, bottomRepeats, centered] = artStyles[this.spine.artStyle];
    const topSpacing = 4 / topRepeats;
    const bottomSpacing = 4 / bottomRepeats;
    const xNudge = .65 + this.spine.innerWidth / 200;
    let right = false;
    // Add art to top spine
    let yPos = yTileHeight * (topSpacing / 2) / (topRepeats == 1 ? 2 : 1);
    for (let i = 1; i <= topRepeats; i++) {
      const image = images.at(-i % images.length);
      let xPos = right ? 2 * xCenter - image.halfWidth * xNudge : -image.halfWidth * (2 - xNudge);
      xPos = centered ? xCenter - image.halfWidth : xPos;
      const clone = image.svg.cloneNode(true);
      clone.setAttribute('y', yPos - image.halfHeight);
      clone.setAttribute('x', xPos);
      this.spine.svgElem.appendChild(clone);
      if (!right) SVGHelper.mirror(clone);
      SVGHelper.rotate(clone, this.art.rotateAngle);
      right = !right;
      yPos += yTileHeight * topSpacing;
    }
    right = bottomRepeats % 2 == 0 ? !right : right;
    // Add art to bottom spine
    yPos = yTileHeight * (yTileCount - (bottomSpacing / 2 / (bottomRepeats == 1 ? 2 : 1)));
    for (let i = 1; i <= bottomRepeats; i++) {
      const image = images.at(-i % images.length);
      let xPos = right ? 2 * xCenter - image.halfWidth * xNudge : -image.halfWidth * (2 - xNudge);
      xPos = centered ? xCenter - image.halfWidth : xPos;
      const clone = image.svg.cloneNode(true);
      clone.setAttribute('y', yPos - image.halfHeight);
      clone.setAttribute('x', xPos);
      this.spine.svgElem.appendChild(clone);
      if (!right) SVGHelper.mirror(clone);
      SVGHelper.rotate(clone, this.art.rotateAngle);
      right = !right;
      yPos -= yTileHeight * bottomSpacing;
    }
  }

  transformDecider({ x, y, grid, style }) {
    switch (style) {
      case 'diagonals':
        // every other diagonal
        return !((x + y) % 4 === 1 || (x + y) % 4 === 2);
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
    const xOverhang = this.art.xStretch && this.art.numColumns > 1;
    const xTileCount = xOverhang ? this.art.numColumns - 1 : this.art.numColumns;
    const xOffset = xOverhang ? 0 : 0.5;
    const xTileWidth = this[side].innerWidth / xTileCount;

    // Calculate Y tiling units
    const yOverhang = this.art.yStretch && numRows > 1;
    const yTileCount = yOverhang ? numRows - 1 : numRows + 1;
    const yOffset = yOverhang ? 0 : 1;
    const yTileHeight = this[side].innerHeight / yTileCount;

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
            x: (index1 + xOffset) * xTileWidth,
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

    const placement = this.createPlacementGrid(side);

    // set art sizing
    const images = this.art.defaultImages || this.art.images;
    const maxHeight = this.art.scale * (this[side].innerHeight / placement.rows);
    const maxWidth = this.art.scale * (this[side].innerWidth / this.art.numColumns);
    images.forEach((image) => {
      this.sizeImage(image, this[side].svgElem, maxHeight, maxWidth);
    });

    // tesselate art and apply transformations
    const imageCounter = { odd: 1, even: 0 };
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
            y2: this[side].innerHeight,
            stroke: this.elementColor,
            'stroke-width': this.borderThickness * 0.5,
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
  document.getElementById('rotateInput').value = Cover.art.rotateAngle;
  document.getElementById('spineTextStyleInput').value = Cover.spine.textStyle;
  document.getElementById('spineArtStyleInput').value = Cover.spine.artStyle;
  document.getElementById('verticalLinesCheckbox').checked = Cover.art.vertLines;
  document.getElementById('xOverhangCheckbox').checked = Cover.art.xStretch;
  document.getElementById('yOverhangCheckbox').checked = Cover.art.yStretch;
  Cover.generateCovers();
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
      const coverSection = document.getElementById('coverSection');
      const widthScale = 12 - Math.floor((Cover.outerWidthInches + 1) / 2);
      const heightScale = 14 - Math.floor((Cover.outerHeightInches + 1) / 2);
      coverSection.style.scale = Math.min(widthScale, heightScale, 9) / 10;
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
      const coverSection = document.getElementById('coverSection');
      const widthScale = 12 - Math.floor((Cover.outerWidthInches + 1) / 2);
      const heightScale = 14 - Math.floor((Cover.outerHeightInches + 1) / 2);
      coverSection.style.scale = Math.min(widthScale, heightScale, 9) / 10;
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
    if (target.matches('#mirrorCheckbox')) {
      Cover.art.mirror = target.checked;
    } else if (target.matches('#flipCheckbox')) {
      Cover.art.flip = target.checked;
    } else if (target.matches('#yOverhangCheckbox')) {
      Cover.art.yStretch = target.checked;
    } else if (target.matches('#xOverhangCheckbox')) {
      Cover.art.xStretch = target.checked;
    } else if (target.matches('#verticalLinesCheckbox')) {
      Cover.art.vertLines = target.checked;
    } else if (target.matches('#endpaperCheckbox')) {
      if (target.checked) {
        document.getElementById('frontCoverSection').classList.add('hidden');
        Cover.front.disabled = true;
        document.getElementById('spineCoverSection').classList.add('hidden');
        Cover.spine.disabled = true;
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
        SVGHelper.saveAsPng(`${lastTitle}_endpaper.png`, Cover.back.svgElem);
      else
        SVGHelper.saveAsPng(`${lastTitle}_cover_back.png`, Cover.back.svgElem);
    } else if (target.matches('#saveSpinePNG')) {
      SVGHelper.saveAsPng(`${lastTitle}_cover_spine.png`, Cover.spine.svgElem);
    } else if (target.matches('#saveFrontPNG')) {
      SVGHelper.saveAsPng(`${lastTitle}_cover_front.png`, Cover.front.svgElem);
    } else if (target.matches('#saveBackSVG')) {
      if (isEndpaper)
        SVGHelper.save(`${lastTitle}_endpaper.svg`, Cover.back.svgElem);
      else
        SVGHelper.save(`${lastTitle}_cover_back.svg`, Cover.back.svgElem);
    } else if (target.matches('#saveSpineSVG')) {
      SVGHelper.save(`${lastTitle}_cover_spine.svg`, Cover.spine.svgElem);
    } else if (target.matches('#saveFrontSVG')) {
      SVGHelper.save(`${lastTitle}_cover_front.svg`, Cover.front.svgElem);
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
