import * as inquirer from 'inquirer';
import * as path from 'path';
import * as fs from 'fs';
import * as fsExtra from 'fs-extra';

import { getCategory, config } from '../utils/index';
import { TypeBlog } from '../types/index';

function checkTitle(answers: TypeBlog): Promise<any> {
  const category = answers.category;
  const pathCategory = path.join(config.BasePath, `${category}`);
  const files = fs.readdirSync(pathCategory);

  let titles = [];

  for (let i = 0, len = files.length; i < len; i++) {
    const curTitle = files[i];
    const curTitlePath = path.join(pathCategory, curTitle);
    const stat = fs.lstatSync(curTitlePath);
    if (stat.isDirectory()) {
      titles.push(curTitle);
    }
  }

  return inquirer.prompt([{
    type: 'list',
    name: 'title',
    message: '选择标题',
    choices: [...titles]
  }]).then((answers: TypeBlog) => {
    return Promise.resolve({
      category,
      title: answers.title
    });
  });
}

function removeTitle(answers: TypeBlog): Promise<void> {
  const pathTitle = path.join(config.BasePath, `${answers.category}/${answers.title}`);
  return fsExtra.remove(pathTitle).then((err) => {
    return Promise.resolve();
  }).catch((err) => {
    return Promise.reject(err);
  });
}

export function remove () {
  return Promise.resolve()
    .then(getCategory)
    .then(checkTitle)
    .then(removeTitle);
}

export function testRemove (answers: TypeBlog) {
  return Promise.resolve(answers)
    .then(removeTitle);
}
