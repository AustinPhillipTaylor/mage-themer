# Mage Themer

Theme color styles generation plugin for Figma

## Description

Generate color styles in Figma without the hassle of manual color mixing, or the time-consuming task of updating each individual color variation. Simply create color palettes, then generate your color themes based on customizable color combinations. Instantly generate hundreds of color variations, ready to be turned into your centralized color library for your entire design system. Need a color change? No problem! Mage Themer makes it simple to update your palette colors. Once updated, you can regenerate your styles and any corresponding style names will be effortlessly updated within Figma!

## Getting Started

### Disclaimer

Mage Themer is currently in an alpha release stage. No warranties or guarantees are made to the stability of the program. To avoid the unintended/accidental loss of color data, we recommend creating a backup of your Figma document before running Mage Themer, or use in a new document.
**Use at your own risk.**

### Installing

To install the alpha version of Mage Themer, follow the steps below:

 1. Clone this directory (example uses SSH)
```
 git clone git@github.com:Illubyte/mage-themer.git
```
 2. cd into the cloned directory and then install the NPM packages
```
 cd ./mage-themer
```
```
 npm install
```
 3. Build the plugin
```
 npm run build
```

### Executing program

That's all you need to do on the command line, now open Figma and navigate to the file where you'd like to use Mage Themer (Must be on desktop version). Next, click `Plugins` in the menubar at the top of the app. Navigate to `Development` > `Import plugin from manifest...`, then select the `manifest.json` file from your root `mage-themer` directory. Figma will save the plugin in the list under `Plugins` > `Development` for easy access the next time you'd like to run Mage Themer.

## License

This project is licensed under the GPL-3.0 License - see the LICENSE.md file for details