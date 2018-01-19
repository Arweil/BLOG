import * as inquirer from 'inquirer';
import * as path from 'path';
import * as fs from 'fs';
import * as fsExtra from 'fs-extra';

import { getCategory, getTags, config, trim } from '../utils/index';
import { TypeBlog } from '../types/index';

inquirer.registerPrompt('datetime', require('inquirer-datepicker-prompt'));

type CategoryAndTags = {
  category: string,
  tagsList: string[]
};

function getTagsByAnswers(answers: TypeBlog): Promise<CategoryAndTags> {
  return getTags(answers.category).then((tagsList) => {
    return Promise.resolve({
      category: answers.category,
      tagsList
    });
  });
}

function makePrompt(data: CategoryAndTags): Promise<inquirer.Answers> {
  return inquirer.prompt([{
    type: 'input',
    name: 'title',
    message: '请输入标题: ',
    validate: (title) => {
      if (trim(title)) {
        return true;
      } else {
        throw new Error('标题不能为空');
      }
    }
  }, {
    type: 'input',
    name: 'desc',
    message: '请输入描述: ',
  }, {
    type: 'datetime',
    name: 'time',
    message: '请输入时间: ',
    format: ['yyyy', '/', 'mm', '/', 'dd'],
    initial: new Date()
  }, {
    type: 'checkbox',
    name: 'tags',
    message: '请选择标签: ',
    choices: [...data.tagsList]
  }]).then((answers: TypeBlog) => {
    answers.category = data.category;
    return Promise.resolve(answers);
  });
}

function getBlogImg(data: TypeBlog) {
  const pathImg = path.join(config.BasePath, `${data.category}/${data.title}/images`);

  let files: string[] = [];
  if (fsExtra.pathExistsSync(pathImg)) {
    files = fs.readdirSync(pathImg);
  }

  if (!files.length) {
    return Promise.resolve(data);
  }

  let imgs: Array<string> = [];

  files.forEach((item) => {
    const stat = fs.lstatSync(path.join(pathImg, `${item}`));
    if (!stat.isDirectory()) {
      imgs.push(item);
    }
  });

  return inquirer.prompt([{
    type: 'list',
    name: 'descImg',
    message: '请选择描述配图: ',
    choices: [...imgs, {
      name: '不使用图片',
      value: ''
    }]
  }]).then((answers) => {
    Object.assign(answers, data);
    return Promise.resolve(answers);
  });
}

function addIntoRelationFile(answers: TypeBlog): Promise<void> {
  const pathDesc = path.join(config.BasePath, `${answers.category}/${answers.title}`);
  const fileDesc = path.join(pathDesc, 'desc.json');

  return fsExtra.pathExists(pathDesc).then((exists: boolean) => {
    if (!exists) {
      fsExtra.ensureDirSync(pathDesc);
    }

    return fsExtra.writeJson(fileDesc, {
      id: new Date().getTime().toString(16),
      title: answers.title,
      desc: answers.desc,
      descImg: answers.descImg,
      time: answers.time,
      tags: answers.tags
    }).then(() => {
      return Promise.resolve();
    }).catch((err) => {
      return Promise.reject(err);
    });
  });
}

export function add () {
  return Promise.resolve()
    .then(getCategory)
    .then(getTagsByAnswers)
    .then(makePrompt)
    .then(getBlogImg)
    .then(addIntoRelationFile);
}

export function testAdd (answers: TypeBlog) {
  return addIntoRelationFile(answers);
}
