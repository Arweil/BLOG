import * as fs from 'fs';
import * as fsExtra from 'fs-extra';
import * as path from 'path';

import { getCategory, config } from '../utils/index';
import { TypeBlog } from '../types/index';

function getTags(answers: TypeBlog): Promise<Array<string>> {
  return new Promise((resolve, reject) => {
    const pathTag = path.join(config.BasePath, `${answers.category}`, `tags.json`);
    const stat = fs.lstatSync(pathTag);
    if (stat.isFile()) {
      fsExtra.readJson(pathTag, (err, data) => {
        if (err) {
          reject(err);
        }

        if (data) {
          resolve(data);
        } else {
          reject(new Error('tags.json 没有标签数据'));
        }
      });
    } else {
      reject(new Error('tags.json 不存在'));
    }
  });
}

function showTags (tags: Array<string>): void {
  console.log(tags.join(','));
}

export default function tagsList () {
  Promise.resolve()
    .then(getCategory)
    .then(getTags)
    .then(showTags);
}
