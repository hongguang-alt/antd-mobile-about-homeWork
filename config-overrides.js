const { override, fixBabelImports } = require('customize-cra');
const path = require('path');

const svgDirs = [
    require.resolve('antd-mobile').replace(/warn\.js$/, ''),  // 1. 属于 antd-mobile 内置 svg 文件
    path.resolve(__dirname, 'src/static/img'),  // 2. 自己私人的 svg 存放目录
];

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd-mobile',
        style: 'css',
    }),
);
