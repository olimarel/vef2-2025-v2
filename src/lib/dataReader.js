// src/lib/dataReader.js
import fs from 'node:fs/promises';
import path from 'node:path';

/**
 * Reads a JSON file and returns its contents, or null on error.
 * @param {string} filePath - Path to the JSON file.
 * @returns {Promise<any|null>}
 */
export async function readJson(filePath) {
  console.log('Reading file:', filePath);
  let data;
  try {
    data = await fs.readFile(path.resolve(filePath), 'utf-8');
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
    return null;
  }
  try {
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error parsing JSON from ${filePath}:`, error.message);
    return null;
  }
}
