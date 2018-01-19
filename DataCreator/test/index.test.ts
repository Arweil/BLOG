import {} from 'jest';
import { testAdd, testRemove } from '../src/commanders/index';
import { TypeBlog } from '../src/types/index';
import * as path from 'path';
import * as fsExtra from 'fs-extra';
import { config } from '../src/utils/index';

describe('', () => {
  test('test article handle', (done) => {
    const mockBlogDesc: TypeBlog = {
      category: 'work',
      title: 'test-title',
      desc: 'test-desc',
      descImg: [''],
      time: 'test-time',
      tags: ['']
    };

    const pathBlog = path.join(config.BasePath, `${mockBlogDesc.category}/${mockBlogDesc.title}`);
    const pathDesc = path.join(pathBlog, `desc.json`);

    /**
     * 测试添加功能
     */
    function blogAdd (): Promise<void> {
      function checkPathExists(): Promise<string> {
        const hasFile = fsExtra.pathExistsSync(pathDesc);
        expect(hasFile).toBe(true);
        return Promise.resolve(pathDesc);
      }

      function checkDescFile(data): Promise<void> {
        expect(data.title).toBe(mockBlogDesc.title);
        expect(data.desc).toBe(mockBlogDesc.desc);
        expect(data.descImg).toEqual(mockBlogDesc.descImg);
        expect(data.time).toBe(mockBlogDesc.time);
        expect(data.tags).toEqual(mockBlogDesc.tags);
        return Promise.resolve();
      }

      return Promise.resolve(mockBlogDesc)
        .then(testAdd)
        .then(checkPathExists, done)
        .then(fsExtra.readJson)
        .then(checkDescFile);
    }

    /**
     * 测试删除功能
     */
    function blogRemove(): Promise<void> {
      function checkPathExists(): Promise<void> {
        const hasFile = fsExtra.pathExistsSync(pathBlog);
        expect(hasFile).toBe(false);
        return Promise.resolve();
      }

      return Promise.resolve(mockBlogDesc)
        .then(testRemove)
        .then(checkPathExists, done);
    }

    Promise.resolve()
      .then(blogAdd)
      .then(blogRemove)
      .then(done);
  });
});
