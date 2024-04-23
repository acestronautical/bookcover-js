
# <img src="bookcover-js-favicon.png" width="28"> Book Cover JS

![Application Screenshot](bookcover-js-screenshot.png)

 Bookcover-js is a web application that allows users to generate penguin clothbound classics style book covers with their own SVG images. The generated covers may be saved in either SVG or PNG format for use with cricut, silhoutte, or other cutting plotters.

click --> [HERE](https://acestronautical.github.io/bookcover-js/) <-- to use

## Tips and Gotchas

Cricut Design Space:
* For import into cricut design space PNG is preferred
* Size will be 10x the correct dimensions on import, so divide by ten

Silhoutte Studio:
* Should size correctly on import
* Spine text placement may be incorrect on import due to SS not respecting text-anchor: middle
* To crop SVG select all shapes crossing the border and the INNER border and then crop

Endpapers:
* Select 'Show Endpaper Mode' and then save as PNG to create printable endpapers
* Endpapers will save with color and a transparent background

General:
* When more than two images have been uploaded the image placement selection becomes random
* Image sizing attempts to scale correctly using 72 DPI or 72 PPI (not 96)
* Font selection is based on your installed system fonts in this order:
    * Adobe Garamond Pro, EB Garamond, Garamond, Cormorant Garamond, Libre Baskerville, Crimson Text, Georgia, Palatino, Book Antiqua, Times New Roman, Baskerville, serif
  

## Offline Usage

1. Download the repository with this [link](https://github.com/acestronautical/bookcover-js/archive/refs/heads/main.zip)
2. Decompress the zip file
3. Open `index.html` in any web browser.

## Dependencies

The project does not have any external dependencies and can be run directly in a web browser without additional setup.

## Contributing

Contributions are welcome! If you'd like to contribute to the project, please fork the repository, make your changes, and submit a pull request. If you have any features you desire, or notice any bugs please create an issue. Thanks!

## License

This project is licensed under the Mozilla Public License. See the [LICENSE](LICENSE) file for details.

## Disclaimer

This project is provided as open-source software free of charge. Its main objective is to automate the tessellation of SVG images onto a book cover format. Any similarity to trademarked content owned by Penguin Random House LLC or its usage for the creation of covers resembling those owned by Penguin Random House LLC is solely at the discretion of the user. The creator of this project disclaims any ownership or affiliation with the intellectual property of Penguin Random House LLC.
