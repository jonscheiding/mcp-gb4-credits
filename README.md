# MCP Gender Bender 4 Credits Generator

This program generates a PNG of the credits for MCP's Gender Bender Revue. This was implemented because Premiere Pro's built-in scrolling responsive graphics feature couldn't seem to handle the number of text elements being used, so we're scrolling a static PNG instead.

## Available Scripts

In the project directory, you can run:

### `yarn import-data <filename.csv>`

Loads the data for the credits from the provided CSV file (exported from Google Sheets). Must be run at least once before rendering the image or starting in development mode.

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view the generated credits in the browser, in SVG format.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn render-image --output-png <filename.png>`

Generates the credits as a PNG image at the provided location. See [scripts/renderImage.js](scripts/renderImage.js) for  additional command-line options.