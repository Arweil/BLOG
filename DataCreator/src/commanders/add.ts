import * as inquirer from 'inquirer';
import * as path from 'path';
import * as fs from 'fs';
import * as fsExtra from 'fs-extra';

import { getCategory, getTags, getTitles, config, trim } from '../utils/index';
import { TypeBlog } from '../types/index';

inquirer.registerPrompt('datetime', require('inquirer-datepicker-prompt'));

type CategoryAndTags = {
  category: string,
  titleList?: string[],
  tagsList: string[]
};

/**
 * 通过分类获取标签
 */
function getTagsByAnswers(answers: TypeBlog): Promise<CategoryAndTags> {
  return getTags(answers.category).then((tagsList) => {
    return Promise.resolve({
      category: answers.category,
      tagsList
    });
  });
}

/**
 * 通过分类获取标题
 */
function getTitleList(data: CategoryAndTags): Promise<CategoryAndTags> {
  return getTitles(data.category).then((titleList) => {
    return Promise.resolve(Object.assign(data, { titleList: titleList }));
  });
}

/**
 * 选择标题
 */
function choiceTitle (data: CategoryAndTags): Promise<inquirer.Answers> {
  return inquirer.prompt([{
    type: 'list',
    name: 'title',
    message: '请选择标题: ',
    choices: [...data.titleList]
  }]).then((answers: TypeBlog) => {
    answers.category = data.category;
    return Promise.resolve(answers);
  });
}

/**
 * 用户选择输入
 */
function makePrompt(data: CategoryAndTags): Promise<inquirer.Answers> {
  return inquirer.prompt([{
    type: 'list',
    name: 'title',
    message: '请选择标题: ',
    choices: [...data.titleList]
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

/**
 * copy 文件从 Doc 到 WWW/doc
 */
function copyFile(answers: TypeBlog) {
  const makePath = path.join;
  const id = new Date().getTime().toString(16);
  answers.id = id;
  const pathDoc = makePath(config.DocPath, `${answers.category}/${answers.title}`);
  const pathBase = makePath(config.BasePath, `${answers.category}/${id}`);

  function copyImage() {
    return fsExtra.pathExists(makePath(pathDoc, `image`))
      .then((exists) => {
        if (exists) {
          return fsExtra.copy(makePath(pathDoc, `image`), makePath(pathBase, `image`));
        }
        return Promise.resolve();
      });
  }

  function copyArt() {
    return fsExtra.copy(makePath(pathDoc, `index.md`), makePath(pathBase, `index.md`));
  }

  return Promise.all([copyImage(), copyArt()])
    .then(() => {
      return Promise.resolve(answers);
    });
}

/**
 * 获取当前博文图片作为配图
 */
function getBlogImg(data: TypeBlog) {
  const pathImg = path.join(config.BasePath, `${data.category}/${data.id}/images`);

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

/**
 * 创建desc.json文件
 */
function addIntoRelationFile(answers: TypeBlog): Promise<void> {
  const pathDesc = path.join(config.BasePath, `${answers.category}/${answers.id}`);
  const fileDesc = path.join(pathDesc, 'desc.json');

  return fsExtra.pathExists(pathDesc).then((exists: boolean) => {
    if (!exists) {
      fsExtra.ensureDirSync(pathDesc);
    }

    return fsExtra.writeJson(fileDesc, {
      id: answers.id,
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
    .then(getTitleList)
    .then(makePrompt)
    .then(copyFile)
    .then(getBlogImg)
    .then(addIntoRelationFile);
}

export function edit () {
  return Promise.resolve()
    .then(getCategory)
    .then(getTitleList)
    .then(choiceTitle)
    .then(copyFile);
}

export function testAdd (answers: TypeBlog) {
  return addIntoRelationFile(answers);
}
