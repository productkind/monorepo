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

const combineSvgFiles = async (inputPaths: string[], outputPath: string, [cols, rows]: [number, number], [imageWidth, imageHeight]: [number, number], [gapX, gapY]: [number, number]) => {
  const svgNS = 'http://www.w3.org/2000/svg';
  const parser = new DOMParser();
  const serializer = new XMLSerializer();

  const totalWidth = gapX + (imageWidth + gapX) * cols;
  const totalHeight = gapY + (imageHeight + gapY) * rows;

  const combinedDoc = parser.parseFromString(`<svg xmlns="${svgNS}" width="${totalWidth}" height="${totalHeight}"></svg>`, 'image/svg+xml');
  const combinedRoot = combinedDoc.documentElement;

  inputPaths.forEach((filePath, index) => {
    const svgContent = fsService.readFileSync(filePath, 'utf-8');
    const doc = parser.parseFromString(svgContent, 'image/svg+xml');
    const originalSvg = doc.documentElement;

    const g = combinedDoc.createElementNS(svgNS, 'g');
    const viewBox = originalSvg.getAttribute('viewBox');

    const col = index % cols;
    const row = Math.floor(index / cols);
    const x = gapX + col * (imageWidth + gapX);
    const y = gapY + row * (imageHeight + gapY);
    g.setAttribute('transform', `translate(${x}, ${y})`);

    if (viewBox) {
      const [vbX, vbY, vbWidth, vbHeight] = viewBox.split(/\s+/).map(Number);
      const scaleX = imageWidth / vbWidth;
      const scaleY = imageHeight / vbHeight;

      const innerG = combinedDoc.createElementNS(svgNS, 'g');
      innerG.setAttribute('transform', `scale(${scaleX} ${scaleY}) translate(${-vbX}, ${-vbY})`);
      Array.from(originalSvg.childNodes).forEach(child => {
        innerG.appendChild(child.cloneNode(true));
      });
      g.appendChild(innerG);
    } else {
      Array.from(originalSvg.childNodes).forEach(child => {
        innerG.appendChild(child.cloneNode(true));
      });
    }
    combinedRoot.appendChild(g);
  });

  const output = serializer.serializeToString(combinedDoc);
  fsService.writeFileSync(outputPath, output, 'utf-8');
}
