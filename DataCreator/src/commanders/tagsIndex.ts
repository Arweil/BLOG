import * as path from 'path';
import * as inquirer from 'inquirer';
import * as fsExtra from 'fs-extra';
import { TypeBlog } from '../types/index';

import { getCategory, getDescOrderByTime, config } from '../utils/index';

let category = '';

function makeTagsIndex(blogs: Array<TypeBlog>): Promise<any> {
  let tagsIndex: any = {};
  blogs.forEach((blog) => {
    const year = new Date(blog.time).getFullYear();
    const tags = blog.tags;

    tags.forEach((tag) => {
      // 判断是否有此标签
      if (!tagsIndex[tag]) {
        tagsIndex[tag] = {};
      }
      // 判断是否有此年份
      if (!tagsIndex[tag][year]) {
        tagsIndex[tag][year] = [];
      }

      tagsIndex[tag][year].push(blog);
    });
  });

  return Promise.resolve(tagsIndex);
}

function writeIntoFile (tagsIndex: any): void {
  fsExtra.writeJson(path.join(config.BasePath, `${category}/tagsIndex.json`), tagsIndex)
    .then(() => {
      console.log('索引添加成功');
    })
    .catch((err) => {
      console.log(err);
    });
}

export default function tagsIndex () {
  Promise.resolve()
    .then(getCategory)
    .then(function (answers: inquirer.Answers) {
      category = answers.category;
      return getDescOrderByTime(answers.category);
    })
    .then(makeTagsIndex)
    .then(writeIntoFile);
}
