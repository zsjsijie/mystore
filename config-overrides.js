const { override, addWebpackAlias, useEslintRc,fixBabelImports,addDecoratorsLegacy} = require('customize-cra')

const path = require('path')
//覆盖ceeate-react-app的默认配置

module.exports = override(
    addWebpackAlias({
        '@': path.resolve(__dirname, 'src/'),
    }),
    useEslintRc(),
    fixBabelImports('import', {
        libraryName: 'antd-mobile',
        style: 'css',
    }),
    addDecoratorsLegacy()
)