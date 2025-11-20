# Assets Folder

This folder contains static assets for the application.

## Structure

- **images/** - Image files (PNG, JPG, SVG, etc.)
- **styles/** - CSS/SCSS stylesheets
- **fonts/** - Font files (TTF, OTF, WOFF, etc.)

## Usage

Import assets in your Vue components or JavaScript files:

```javascript
// Importing images
import logo from '@/assets/images/logo.png';

// Importing styles
import '@/assets/styles/main.css';

// Using in templates
<img :src="logo" alt="Logo" />
```
