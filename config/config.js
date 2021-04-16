export default {
  hash: true,
  mode: 'site',
  title: 'yforms',
  favicon: '/favicon.ico',
  logo: '/logo.png',
  analytics: {
    baidu: 'e371ec7cfcef646cea084692d993074f',
  },
  menus: {
    '/guide': [
      {
        title: '介绍',
        children: ['guide/index', 'guide/getting-started'],
      },
    ],
  },
  theme: {
    // ['primary-color']: 'red',
    // ['ant-prefix']: 'ant-v4',
  },
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
  plugins: [`${__dirname}/plugin/index.ts`],
};
