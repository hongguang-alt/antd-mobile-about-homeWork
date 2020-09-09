const { override, fixBabelImports, addWebpackModuleRule } = require('customize-cra');
const path = require('path');

module.exports = override(
    addWebpackModuleRule({
        test: /\.(svg)$/i,
        loader: 'svg-sprite-loader',
        include: [
            require.resolve('antd-mobile').replace(/warn\.js$/, ''),
            path.resolve(__dirname, 'src/static/img')
        ]
    }),
    fixBabelImports('import', {
        libraryName: 'antd-mobile',
        style: 'css',
    }),
);
