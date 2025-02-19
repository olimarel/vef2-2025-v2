import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { readJson } from '../src/lib/dataReader.js';
import fs from 'node:fs/promises';
import path from 'node:path';

const tempDir = path.resolve('test/temp');

describe('readJson', () => {
  beforeAll(async () => {
    await fs.mkdir(tempDir, { recursive: true });
  });

  afterAll(async () => {
    await fs.rm(tempDir, { recursive: true, force: true });
  });

  it('should read a valid JSON file', async () => {
    const filePath = path.join(tempDir, 'valid.json');
    const data = { foo: 'bar' };
    await fs.writeFile(filePath, JSON.stringify(data), 'utf8');

    const result = await readJson(filePath);
    expect(result).toEqual(data);
  });

  it('should return null for a non-existent file', async () => {
    const result = await readJson(path.join(tempDir, 'nonexistent.json'));
    expect(result).toBeNull();
  });

  it('should return null for a file with invalid JSON', async () => {
    const filePath = path.join(tempDir, 'invalid.json');
    await fs.writeFile(filePath, 'not a json', 'utf8');

    const result = await readJson(filePath);
    expect(result).toBeNull();
  });
});
