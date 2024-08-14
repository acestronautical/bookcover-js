
// Static helper class, does not need to be instantiated it's just a namespace
export class SVGHelper {
    // Create an SVG element with specified tag and attributes
    static create(tag, attributes) {
        const element = document.createElementNS('http://www.w3.org/2000/svg', tag);
        for (const attr in attributes) {
            element.setAttribute(attr, attributes[attr]);
        }
        return element;
    }

    static fromString(svgText) {
        const parser = new DOMParser();
        return parser.parseFromString(svgText, 'image/svg+xml').documentElement;
    }

    static toString(svgElem) {
        const serializer = new XMLSerializer();
        return serializer.serializeToString(svgElem);
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

    static createCenteredText({ color, size, string, y, parent, parentWidth, reposition, fontFamilies }) {
        const lines = string.split('\n'); // Split string by line breaks
        const group = SVGHelper.create('g', {});
        const padding = size / 6; // Adjust to increase or decrease vertical spacing
        const lineSvgArr = [];
        let lineY;
        lines.forEach((line, index) => {
            const text = SVGHelper.create('text', {
                fill: color, 'font-size': size, 'font-family': fontFamilies, 'white-space': 'pre'
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

    static combineSVGs(svgs, spacing = 0) {
        const parser = new DOMParser();
        const svgElements = svgs.map(svgElement => {
            const svgText = this.toString(svgElement);
            return this.fromString(svgText);
        });
        const height = parseFloat(svgElements[0].getAttribute('height'));
        let totalWidth = (svgElements.length - 1) * spacing;
        svgElements.forEach(svg => {
            totalWidth += parseFloat(svg.getAttribute('width'));
        });
        let combinedSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="${height}">`;
        let currentX = 0;
        svgElements.forEach(svg => {
            combinedSVG += `<g transform="translate(${currentX}, 0)">${svg.outerHTML}</g>`;
            currentX += parseFloat(svg.getAttribute('width')) + spacing;
        });
        combinedSVG += `</svg>`;
        return parser.parseFromString(combinedSVG, 'image/svg+xml').documentElement;
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

    static embedFonts(svgData, fontName, fontData) {
        const fontCss = `@font-face { font-family: '${fontName}'; src: url('${fontData}'); }\n`;
        // Append a new <style> element before the closing </svg> tag
        return svgData.replace(/<\/svg>/, `<style>${fontCss}</style></svg>`);
    }

    static saveAsSvg(fileName, svgElem, fontName, fontData) {
        if (svgElem) {
            let svgData = new XMLSerializer().serializeToString(svgElem);
            svgData = this.embedFonts(svgData, fontName, fontData);
            const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
            SVGHelper.saveBlobAsFile(blob, fileName);
        }
    }

    static saveAsPng(filename, svgElem, fontName, fontData, { scaleFactor = 10, paddingX = 20, paddingY = 20, backgroundColor = null }) {
        let svgData = new XMLSerializer().serializeToString(svgElem);
        svgData = this.embedFonts(svgData, fontName, fontData);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        paddingX = paddingX * scaleFactor;
        paddingY = paddingY * scaleFactor;

        img.onload = function () {
            const width = img.width * scaleFactor;
            const height = img.height * scaleFactor;

            // Adjust canvas size to include horizontal and vertical padding
            canvas.width = width + 2 * paddingX;
            canvas.height = height + 2 * paddingY;

            // Fill the background with the specified color, if provided
            if (backgroundColor) {
                ctx.fillStyle = backgroundColor;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            // Draw the image with horizontal and vertical padding offset
            ctx.drawImage(img, paddingX, paddingY, width, height);

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