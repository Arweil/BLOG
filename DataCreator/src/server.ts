import * as program from 'commander';
import * as commanders from './commanders/index';

program
  .version('1.0.0')
  .option('-i, --init', '初始化博客目录')
  .option('-a, --add', '添加，修改博客相关描述')
  .option('-e, --edit', '更新博客内容')
  .option('-r, --remove', '删除博客文章')
  .option('-d, --directory', '创建目录')
  .option('-t, --tagsindex', '整理标签，创建标签索引')
  .option('-r, --run', '添加文章 => 创建目录 => 整理标签')
  .option('--tagsremove', '删除标签')
  .option('--tagsadd', '添加标签')
  .option('--artlist', '获取文章列表')
  .option('--tagslist', '获取标签列表')
  .parse(process.argv);

if (program.init) {
  commanders.init();
}

if (program.add) {
  commanders.add().then(() => {
    console.log('添加成功');
  }, (err) => {
    console.log(err);
  });
}

if (program.edit) {
  commanders.edit().then(() => {
    console.log('更新成功');
  }, (err) => {
    console.log(err);
  });
}

if (program.remove) {
  commanders.remove().then(() => {
    console.log('删除成功');
  }, (err) => {
    console.log(err);
  });
}

if (program.directory) {
  commanders.directory();
}

if (program.artlist) {
  commanders.artlist();
}

if (program.tagsindex) {
  commanders.tagsIndex();
}

if (program.tagslist) {
  commanders.tagsList();
}

if (program.tagsAdd) {
  commanders.tagsAdd();
}

if (program.tagsremove) {
  commanders.tagsRemove();
}
