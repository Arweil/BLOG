import * as path from 'path';
import * as fs from 'fs';
import { config } from '../utils/index';

function getFiles(src: string, maxLevel: number, level: number = 0): void {
  ++level;
  const files = fs.readdirSync(src);
  for (let i = 0, len = files.length; i < len; i++) {
    const cur = files[i];
    const curSrc = path.join(src, cur);
    const stat = fs.lstatSync(curSrc);
    if (stat.isDirectory()) {
      let levelStr = '|';
      for (let j = 0; j < 2 * level - 1; j++) {
        levelStr += '-';
      }
      console.log(`${levelStr}${cur}`);
      if (maxLevel && level === maxLevel) {
        continue;
      }
      getFiles(curSrc, maxLevel, level);
    }
  }
}

export default function artlist () {
  getFiles(config.BasePath, 2);
}
