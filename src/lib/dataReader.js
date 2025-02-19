import fs from 'node:fs/promises';
import path from 'node:path';

/**
 * les JSON skrá og skilar gögnum eða villu
 * @param {string} filePath - path í JSON file
 * @returns {Promise<unknown|null>}
 */
export async function readJson(filePath) {
  console.log('Reading file:', filePath);
  let data;
  try {
    data = await fs.readFile(path.resolve(filePath), 'utf-8');
  } catch (error) {
    console.error(`Error during reading ${filePath}:`, error.message);
    return null;
  }
  try {
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error parsing JSON from ${filePath}:`, error.message);
    return null;
  }
}