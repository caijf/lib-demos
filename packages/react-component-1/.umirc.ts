import { defineConfig } from 'dumi';

const publicPath = process.env.NODE_ENV === 'production' ? '/lib-demos/demo04/docs-dist/' : '/';

export default defineConfig({
  title: 'demo04',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  mode: 'site',
  hash: true,
  publicPath,
  history: {
    type: 'hash'
  }
  // more config: https://d.umijs.org/config
});
