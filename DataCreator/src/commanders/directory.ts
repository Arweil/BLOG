import * as path from 'path';
import * as fs from 'fs';
import * as fsExtra from 'fs-extra';

import { getCategory, getDescOrderByTime, config } from '../utils/index';
import { TypeBlog } from '../types/index';

let pathCategory = '';

/**
 * 分页，根据pagesize
 */
function paging(titles: Array<any>): Promise<object> {
  const arr = [];
  const pageSize = config.PageSize;
  for (let i = 0, len = titles.length; i < len; i = i + pageSize) {
    let newArr = titles.slice(i, i + pageSize);
    arr.push(newArr);
  }

  return Promise.resolve(arr);
}

/**
 * 把分页后的内容添加进文件中
 */
function addIntoFile(pagedTitles: Array<any>): void {
  pagedTitles.forEach((item, index) => {
    fsExtra.writeJson(path.join(pathCategory, `p-${index + 1}.json`), item, (err) => {
      if (err) {
        throw err;
      }

      console.log(`创建分页成功！`);
    });
  });
}

export default function directory () {
  Promise.resolve()
    .then(getCategory)
    .then(function (answers: TypeBlog) {
      pathCategory = path.join(config.BasePath, `${answers.category}`);
      return getDescOrderByTime(answers.category);
    })
    .then(paging)
    .then(addIntoFile);
}
