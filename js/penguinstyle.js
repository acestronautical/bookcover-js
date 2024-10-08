import { SVGHelper } from "./svghelper.js";


// The default SVG
export const DefaultSvgText = `<svg xmlns="http://www.w3.org/2000/svg" id="svg3228" xml:space="preserve" viewBox="0 0 700 700" overflow="visible" class="artSVG">
                <g id="g3236" transform="matrix(1.25 0 0 -1.25 0 700)">
                  <g id="g3246" transform="matrix(.88815 0 0 .88815 456.78 214.39)" >
                    <path id="path3248" d="m0 0c-4.942 32.123-20.005 60.481-24.658 69.321-4.652 8.84-10.7 26.519-9.002 51.363 1.699 24.843-9.608 96.585-67.298 142.64-57.69 46.059-111 60.386-118.17 65.134-7.773 5.143-39.08 19.54-46.471 22.983-7.391 3.444-37.273 7.258-50.677 8.968s-27.537-3.105-32.96-3.148c-5.423-0.042-35.984 9.347-40.636 9.347s-1.861-4.652-1.396-7.444c0.466-2.791 10.277-21.046 10.277-21.046s-10.742 0.11-11.207-2.216 12.769-12.274 12.769-12.274-6.256-20.293-6.581-24.874c-0.326-4.582 5.908-20.077 6.839-24.264 0.93-4.187 0-13.958 0-13.958l4.622-4.716s7.939-5.519 9.8-6.449c1.861-0.931 8.132 0.126 8.132 0.126 4.875-1.734 20.713 6.853 29.088 11.97 8.374 5.118 20.005 6.513 23.361 6.539 3.355 0.024 6.414-10.727 6.274-14.241-0.141-3.516 2.932-16.491 3.862-20.678 0.931-4.187-4.332-12.528-4.332-12.528-4.798 2.359-11.486 4.619-15.673 6.015-4.188 1.396-17.214 10.7-20.936 11.631s-6.979 1.396-13.585 3.216c-6.606 1.821-28.287 6.554-32.942 5.95-4.654-0.603-16.746-7.306-18.451-14.149-1.704-6.845 7.753-13.627 11.475-15.023 3.722-1.395 15.353 1.396 19.447 0.973 4.095-0.423 6.71-3.791 6.71-3.791 14.526-0.491 21.298-9.278 29.672-16.722s47.92-29.31 53.503-30.241 20.933 2.981 20.933 2.981 4.655-18.799 6.516-29.964c1.861-11.166-6.048-47.456-6.978-54.434-0.931-6.979-1.163-15.818-2.908-18.145-1.423-1.898-2.908-1.512-10.628-2.678-9.245-1.396-19.409-15.013-19.031-21.049 0.465-7.444 8.536-9.667 12.137-9.667h12.753c5.583 0 21.401 2.223 21.401 2.223l25.124-2.223h151.72c15.146 0 30.171-30.879 32.748-54.071 2.791-25.123-14.669-90.658-25.589-113.99-10.235-21.866-32.824-46.467-54.433-51.176-36.289-7.909-60.947 15.818-79.092 12.562-16.51-2.964-13.027-21.401-5.583-28.846 6.869-6.869 66.112-27.327 105.14-14.887 42.337 13.492 67.63 62.931 81.418 102.82 13.047 37.712 19.095 75.861 13.512 112.15m-198.83 69.434c-8.839-3.256-16.283-8.374-21.866-6.979-5.583 1.396-7.909-2.791-12.562-1.395 0 0 4.653 13.957 9.297 21.925 4.643 7.969 10.918 33.922 10.918 33.922 1.606-9.753 10.957-25.141 17.935-34.446 6.979-9.305 5.118-9.771-3.722-13.027"/>
                  </g>
                </g>
              </svg>`;
// Fonts and fallback fonts
export const DefaultFontFamilies = "'Adobe Garamond Pro', 'EB Garamond','Cormorant Garamond', Garamond, 'Libre Baskerville', 'Crimson Text', Georgia, Palatino, 'Book Antiqua', 'Times New Roman', Baskerville, serif";


export class PenguinCover {
    inchToPx = 72; // Assume 72 DPI for adobe illustrator
    mmToPx = 2.8346;
    backgroundColor = '#a6a6a6';
    elementColor = '#27285f';
    author = 'Felix\nPawsley';
    title = 'Cats Cradle\nChronicles';
    outerWidth = 396; // 5.5 inches
    outerHeight = 648; // 9 inches
    borderGap = 18; // .25 inches
    shoulderGap = 18; // .25 inches
    borderThickness = 3.6; // .5 inches
    fontData = undefined;
    fontFamilies = DefaultFontFamilies;
    saveTransparent = true;

    // Set Inches
    set borderGapInches(inches) { this.borderGap = inches * this.inchToPx; }
    set borderThicknessInches(inches) { this.borderThickness = inches * this.inchToPx; }
    set outerWidthInches(inches) { this.outerWidth = inches * this.inchToPx; }
    set outerHeightInches(inches) { this.outerHeight = inches * this.inchToPx; }
    get borderThicknessInches() { return this.borderThickness / this.inchToPx; }
    // Get Inches
    get borderGapInches() { return this.borderGap / this.inchToPx; }
    get outerWidthInches() { return this.outerWidth / this.inchToPx; }
    get outerHeightInches() { return this.outerHeight / this.inchToPx; }
    // Set Milli
    set borderThicknessMilli(mm) { this.borderThickness = mm * this.mmToPx; }
    set borderGapMilli(mm) { this.borderGap = mm * this.mmToPx; }
    set outerWidthMilli(mm) { this.outerWidth = mm * this.mmToPx; }
    set outerHeightMilli(mm) { this.outerHeight = mm * this.mmToPx; }
    // Get Milli
    get borderThicknessMilli() { return this.borderThickness / this.mmToPx; }
    get borderGapMilli() { return this.borderGap / this.mmToPx; }
    get outerWidthMilli() { return this.outerWidth / this.mmToPx; }
    get outerHeightMilli() { return this.outerHeight / this.mmToPx; }
    // Other Getters
    get scale() { return (this.outerWidth * 2 + this.spine.outerWidth) / 360; }
    get proportions() { return this.outerHeight / this.outerWidth; }
    get innerWidth() { return (this.outerWidth - this.borderGap * 2); }
    get innerHeight() { return (this.outerHeight - this.borderGap * 2); }
    // Image placement and properties
    art = {
        increasePerColumn: 1,
        maxPerColumn: 5,
        numColumns: 5,
        rotateAngle: 0,
        scale: 1.25,
        defaultImages: [{ svg: SVGHelper.fromString(DefaultSvgText) }],
        images: [],
        // determines which image to choose for multi-image placement
        get step() { return this.images.length > 2 ? this.images.length + 1 : 2; },
        flip: false,
        mirror: true,
        vertLines: false,
        xStretch: 1,
        yStretch: 1,
    };
    // Front Cover Properties
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
            get paddingX() { return (_bookCover.outerWidth - _bookCover.innerWidth) / 2; },
            get paddingY() { return (_bookCover.outerHeight - _bookCover.innerHeight) / 2; },
        };
    })();
    // Back Cover Properties
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
            get paddingX() { return (_bookCover.outerWidth - _bookCover.innerWidth) / 2; },
            get paddingY() { return (_bookCover.outerHeight - _bookCover.innerHeight) / 2; },
        };
    })();
    // Spine 'Cover' Properties
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
            get paddingX() { return (this.outerWidth - this.innerWidth) / 2; },
            get paddingY() { return (_bookCover.outerHeight - _bookCover.innerHeight) / 2; },
        };
    })();

    save(filename, svgElem, padX = 0, padY = 0) {
        const color = this.saveTransparent ? null : this.backgroundColor;
        const scaleFactor = 10;
        if (filename.endsWith('.svg')) {
            SVGHelper.saveAsSvg(filename, svgElem, this.fontFamilies, this.fontData);
        } else if (filename.endsWith('.png')) {
            SVGHelper.saveAsPng(filename, svgElem, this.fontFamilies, this.fontData, {
                scaleFactor: scaleFactor,
                paddingX: padX,
                paddingY: padY,
                backgroundColor: color
            });
        } else {
            console.error('Unsupported file type. Please use .svg or .png extension.');
        }
    }
    saveFront(filename) { this.save(filename, this.front.svgElem, this.borderGap, this.borderGap); }
    saveBack(filename) { this.save(filename, this.back.svgElem, this.borderGap, this.borderGap); }
    saveSpine(filename) { this.save(filename, this.spine.svgElem, this.borderGap / 2, this.borderGap); }
    saveCombined(filename) {
        this.save(filename,
            SVGHelper.combineSVGs(
                [this.back.svgElem, this.spine.svgElem, this.front.svgElem],
                this.shoulderGap + this.borderGap * 1.5),
            this.borderGap,
            this.borderGap
        );
    }


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

    // Attempt to normalize the size of uploaded SVG
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
        image.svg.setAttribute("viewBox", `${image.BBox.x} ${image.BBox.y} ${image.BBox.width} ${image.BBox.height}`);
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
                fontFamilies: this.fontFamilies
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
                fontFamilies: this.fontFamilies
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
            fill: 'none', stroke: this.elementColor, 'stroke-width': this.borderThickness / 10,
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
        const xCenter = this.spine.innerWidth / 2;
        const yCenter = this.spine.innerHeight / 2;
        const commonTextAttrs = {
            y: yCenter, fill: this.elementColor, 'font-size': this.spine.fontSize,
            'font-family': this.fontFamilies, 'text-anchor': 'middle', 'white-space': 'pre'
        };

        if (this.spine.textStyle == 1 || this.spine.textStyle == 5) {
            // center title and author
            const changeBreaks = this.spine.textStyle == 1;
            const textY = this.spine.innerHeight / 2;
            let text = changeBreaks ? this.title.split(/[ \n]+/).join('\n') : this.title;
            text += '\n\n';
            text += changeBreaks ? this.author.split(/[ \n]+/).join('\n') : this.author;
            const textSvg = SVGHelper.createCenteredText({
                color: this.elementColor,
                size: this.spine.fontSize,
                string: text,
                y: textY,
                parent: this.spine.svgElem,
                parentWidth: this.spine.innerWidth,
                reposition: true,
                fontFamilies: this.fontFamilies
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
                'letter-spacing': 2,
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
                fontFamilies: this.fontFamilies
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
        const topSpacing = 3 / topRepeats;
        const bottomSpacing = 3 / bottomRepeats;
        const xNudge = .65 + this.spine.innerWidth / 200;
        let right = false;
        // Add art to top spine
        const yTileCount = 10;
        const yTileHeight = this.spine.innerHeight / yTileCount;
        let yPos = yTileHeight * (topSpacing / 2);
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
        yPos = yTileHeight * (yTileCount - (bottomSpacing / 2));
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
        const numColumns = this.art.numColumns;
        const middleRowIndex = Math.floor(numRows / 2);

        // Calculate X tiling units
        const xStretch = this.art.xStretch;
        const xCanStretch = numColumns > 1;
        const xTileCount = xCanStretch ? numColumns - xStretch : numColumns;
        const xOffset = xCanStretch ? (-xStretch / 2) + 0.5 : 0.5;
        const xTileWidth = this[side].innerWidth / xTileCount;

        // Calculate Y tiling units
        const yStretch = this.art.yStretch;
        const yCanStretch = numRows > 1;
        const yTileCount = yCanStretch ? numRows - (yStretch - 0.5) * 2 : numRows + 1;
        const yOffset = yCanStretch ? -yStretch + 1 : 1;
        const yTileHeight = this[side].innerHeight / yTileCount;

        // Columns x rows 2d array with elements either null or an object containing coordinates
        const placementGrid = {
            rows: numRows,
            oddRows: numRows % 2 != 0,
            cols: numColumns,
            oddCols: numColumns % 2 != 0,
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