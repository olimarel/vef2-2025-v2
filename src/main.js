import fs from 'node:fs/promises';
import path from 'node:path';
import { readJson } from './lib/dataReader.js';
import { cleanCategoryData } from './lib/validator.js';
import { generateIndexHTML, generateCategoryHTML } from './lib/htmlGenerator.js';
import { copyFile } from 'node:fs/promises';

const INDEX_PATH = './data/index.json';
const DIST_DIR = './dist';

async function writeFile(filePath, content) {
  try {
    await fs.writeFile(filePath, content, 'utf8');
    console.log(`Wrote ${filePath}`);
  } catch (error) {
    console.error(`Error writing ${filePath}:`, error.message);
  }
}

/**
 * Hjálparfall til að afrita quiz.js og styles.css í output
 * @param {*} src 
 * @param {*} dest 
 */
async function copyAsset(src, dest) {
  try {
    await copyFile(src, dest);
    console.log(`Copied ${src} to ${dest}`);
  } catch (error) {
    console.error(`Error copying ${src}:`, error.message);
  }
}

async function main() {
  await fs.mkdir(DIST_DIR, { recursive: true });

  const indexJson = await readJson(INDEX_PATH);
  if (!indexJson || !Array.isArray(indexJson)) {
    console.error('Invalid index.json; expected an array.');
    return;
  }

  // Til að safna gildum flokkum
  const validIndexEntries = [];

  for (const entry of indexJson) {
    if (!entry.file || typeof entry.file !== 'string') {
      console.error('Skipping entry with invalid file property:', entry);
      continue;
    }
    const categoryFilePath = `./data/${entry.file}`;
    const categoryDataRaw = await readJson(categoryFilePath);
    if (!categoryDataRaw) {
      console.error(`Skipping category ${entry.title}: unable to read file ${entry.file}`);
      continue;
    }
    
    const categoryData = cleanCategoryData(categoryDataRaw, entry.file);
    if (!categoryData) {
      console.error(`Skipping category ${entry.title}: no valid questions.`);
      continue;
    }
    
    validIndexEntries.push({
      title: entry.title,
      file: entry.file,
    });
    
    const categoryHTML = generateCategoryHTML(categoryData);
    const outFileName = entry.file.replace('.json', '.html');
    await writeFile(path.join(DIST_DIR, outFileName), categoryHTML);
  }

  
  const indexHTML = generateIndexHTML(validIndexEntries);
  await writeFile(path.join(DIST_DIR, 'index.html'), indexHTML);
 
  // Afrita quiz.jz og styles.css í output
  await copyAsset('./public/quiz.js', path.join(DIST_DIR, 'quiz.js'));
  await copyAsset('./public/styles.css', path.join(DIST_DIR, 'styles.css'));
}

main();
