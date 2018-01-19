import * as inquirer from 'inquirer';
import * as path from 'path';
import * as fs from 'fs';
import * as fsExtra from 'fs-extra';

export function getCategorysByDoc (): Array<string> {
  const files = fs.readdirSync(config.BasePath);

  let folders: Array<string> = [];

  files.forEach((item) => {
    const stat = fs.lstatSync(path.join(config.BasePath, `${item}`));
    if (stat.isDirectory()) {
      folders.push(item);
    }
  });

  return folders;
}

export function getCategory (): Promise<inquirer.Answers> {
  return inquirer.prompt([{
    type: 'list',
    name: 'category',
    message: '选择文章的分类',
    choices: [...getCategorysByDoc()]
  }]);
}

export function getTags (category: string): Promise<string[]> {
  const pathTag = path.join(config.BasePath, `${category}/tags.json`);

  return fsExtra.readJson(pathTag).then((data: any) => {
    return Promise.resolve(data);
  }).catch((err) => {
    console.error(err);
    return Promise.reject([]);
  });
}

/**
 * 获取目录下的所有文章，并按照时间降序排列
 */
export function getTitlesOrderByTime(category: string): Promise<Array<object>> {
  const pathCategory = path.join(config.BasePath, `${category}`);
  const files = fs.readdirSync(pathCategory);

  const titles = [];

  for (let i = 0, len = files.length; i < len; i++) {
    const curTitle = files[i];
    const curTitlePath = path.join(pathCategory, curTitle);
    const stat = fs.lstatSync(curTitlePath);
    if (stat.isDirectory() && fsExtra.pathExistsSync(path.join(curTitlePath, `index.md`))) {
      const obj = fsExtra.readJsonSync(path.join(curTitlePath, 'desc.json'), { throws: false });
      if (obj) {
        titles.push(obj);
      }
    }
  }

  titles.sort(function (a, b) {
    const timeA = new Date(a.time).getTime();
    const timeB = new Date(b.time).getTime();
    if (timeA > timeB) {
      return -1;
    } else if (timeA === timeB) {
      return 0;
    } else {
      return 1;
    }
  });

  return Promise.resolve(titles);
}

export const config = {
  BasePath: path.join(__dirname, '../../../WWW/doc'),
  PageSize: 15
};

/**
 * 字符串去掉所有空格
 */
export function trim(str: string) {
  return str.replace(/\s/g, '');
}
