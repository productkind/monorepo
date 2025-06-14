import { $ } from 'zx'
import fs from 'node:fs'
import { DOMParser, XMLSerializer } from '@xmldom/xmldom'
import { createFileSystem } from '@dungarees/fs/service.ts'
import path from 'node:path'
import {rasterizeSvg} from '@dungarees/zx/image.ts'


const imageWidth = 1080;
const imageHeight = 1350;
const gapX = 60;
const gapY = 75;
const cols = 2;
const rows = 2;


const fsService = createFileSystem(fs)

const PRODUCT_BASE_DIR = '../'
const CONTENT_DIR = 'content'
const ASSETS_DIR = 'assets'
const OUTPUT_DIR = 'dist'
const absoluteBaseDir = path.resolve(__dirname, PRODUCT_BASE_DIR);

const contentDir = path.join(absoluteBaseDir, CONTENT_DIR)

const weeks = fsService.readDirSync(contentDir)

weeks.forEach(week => {
  const weekPath = path.join(contentDir, week);
  const days = fsService.readDirSync(weekPath);
  days.forEach(async day => {
    const dayPath = path.join(weekPath, day);
    const dailyFiles = fsService.globSync(path.join(dayPath, '*.svg'), { nodir: true }).sort();
    const distPath = path.join(absoluteBaseDir, ASSETS_DIR, OUTPUT_DIR, week, day);
    await $`mkdir -p ${distPath}`
    await combineSvgFiles(dailyFiles, path.join(distPath, 'strip.svg'), [cols, rows], [imageWidth, imageHeight], [gapX, gapY]);
    dailyFiles.forEach(async (filePath) => {
      const outputPngPath = path.join(distPath, path.basename(filePath).replace('.svg', '.png'));
      await rasterizeSvg({
        inputFilePath: filePath,
        outputFilePath: outputPngPath,
        size: [imageWidth, imageHeight],
      });
      console.log(`Generated PNG for ${filePath} at ${outputPngPath}`);
    })
    await rasterizeSvg({
      inputFilePath: path.join(distPath, 'strip.svg'),
      outputFilePath: path.join(distPath, 'strip.png'),
      size: [imageWidth, imageHeight],
    });
    console.log(`Generated combined PNG for ${day} at ${path.join(distPath, 'strip.png')}`);
  })
})

// Function to recursively update IDs and references
const updateIdsAndReferences = (element, prefix, idMap) => {
  if (element.nodeType === 1) { // Element node
    // Update id attribute
    const id = element.getAttribute('id');
    if (id && idMap[id]) {
      element.setAttribute('id', idMap[id]);
    }

    // Get all attributes and check for ID references
    if (element.attributes) {
      Array.from(element.attributes).forEach(attr => {
        const value = attr.value;

        // Handle url(#id) references
        const urlMatches = value.match(/url\(#([^)]+)\)/g);
        if (urlMatches) {
          let newValue = value;
          urlMatches.forEach(match => {
            const idMatch = match.match(/url\(#([^)]+)\)/);
            if (idMatch) {
              const referencedId = idMatch[1];
              if (idMap[referencedId]) {
                newValue = newValue.replace(`url(#${referencedId})`, `url(#${idMap[referencedId]})`);
              }
            }
          });
          if (newValue !== value) {
            element.setAttribute(attr.name, newValue);
          }
        }
        // Handle direct #id references
        else if (value.startsWith('#')) {
          const referencedId = value.substring(1);
          if (idMap[referencedId]) {
            element.setAttribute(attr.name, `#${idMap[referencedId]}`);
          }
        }
      });
    }

    // Update child elements
    Array.from(element.childNodes).forEach(child => {
      updateIdsAndReferences(child, prefix, idMap);
    });
  }
};

const combineSvgFiles = async (inputPaths: string[], outputPath: string, [cols, rows]: [number, number], [imageWidth, imageHeight]: [number, number], [gapX, gapY]: [number, number]) => {
  const svgNS = 'http://www.w3.org/2000/svg';
  const parser = new DOMParser();
  const serializer = new XMLSerializer();

  const totalWidth = gapX + (imageWidth + gapX) * cols;
  const totalHeight = gapY + (imageHeight + gapY) * rows;

  const combinedDoc = parser.parseFromString(`<svg xmlns="${svgNS}" width="${totalWidth}" height="${totalHeight}"></svg>`, 'image/svg+xml');
  const combinedRoot = combinedDoc.documentElement;

  // Create a combined defs section
  const combinedDefs = combinedDoc.createElementNS(svgNS, 'defs');
  combinedRoot.appendChild(combinedDefs);

  inputPaths.forEach((filePath, index) => {
    const svgContent = fsService.readFileSync(filePath, 'utf-8');
    const doc = parser.parseFromString(svgContent, 'image/svg+xml');
    const originalSvg = doc.documentElement;

    // Create unique prefix for this SVG's IDs
    const prefix = `svg${index}`;
    const idMap = {};

    // First pass: collect all IDs and create mapping
    const collectIds = (element) => {
      if (element.nodeType === 1) {
        const id = element.getAttribute('id');
        if (id) {
          idMap[id] = `${prefix}_${id}`;
        }
        Array.from(element.childNodes).forEach(child => collectIds(child));
      }
    };
    collectIds(originalSvg);

    // Clone the entire SVG content
    const clonedSvg = originalSvg.cloneNode(true);

    // Update all IDs and references with the prefix
    updateIdsAndReferences(clonedSvg, prefix, idMap);

    // Extract and move defs to the combined defs section
    const defs = Array.from(clonedSvg.childNodes).find(child =>
      child.nodeType === 1 && child.nodeName === 'defs'
    );
    if (defs) {
      Array.from(defs.childNodes).forEach(child => {
        if (child.nodeType === 1) { // Element node
          combinedDefs.appendChild(child.cloneNode(true));
        }
      });
    }

    // Create a group for this SVG's content (excluding defs)
    const g = combinedDoc.createElementNS(svgNS, 'g');

    // Calculate position
    const isThirdAndLast = index === inputPaths.length - 1 && inputPaths.length % (cols * rows) === 3;
    const col = index % cols;
    const row = Math.floor(index / cols);
    const x = gapX + col * (imageWidth + gapX) + (isThirdAndLast ? (imageWidth + gapX) / 2 : 0);
    const y = gapY + row * (imageHeight + gapY);

    // Get the original viewBox to understand the coordinate system
    const viewBox = clonedSvg.getAttribute('viewBox');
    let scaleX = 1, scaleY = 1, translateX = 0, translateY = 0;

    if (viewBox) {
      const [vbX, vbY, vbWidth, vbHeight] = viewBox.split(/\s+/).map(Number);
      scaleX = imageWidth / vbWidth;
      scaleY = imageHeight / vbHeight;
      translateX = -vbX;
      translateY = -vbY;
    } else {
      // If no viewBox, try to get width/height from the SVG element
      const originalWidth = parseFloat(clonedSvg.getAttribute('width') || '1080');
      const originalHeight = parseFloat(clonedSvg.getAttribute('height') || '1350');
      scaleX = imageWidth / originalWidth;
      scaleY = imageHeight / originalHeight;
    }

    // Apply transformation
    g.setAttribute('transform', `translate(${x}, ${y}) scale(${scaleX}, ${scaleY}) translate(${translateX}, ${translateY})`);

    // Copy all child elements except defs
    Array.from(clonedSvg.childNodes).forEach(child => {
      if (child.nodeType === 1 && child.nodeName !== 'defs') { // Element node, not defs
        g.appendChild(child.cloneNode(true));
      }
    });

    combinedRoot.appendChild(g);
  });

  const output = serializer.serializeToString(combinedDoc);
  fsService.writeFileSync(outputPath, output, 'utf-8');
}
