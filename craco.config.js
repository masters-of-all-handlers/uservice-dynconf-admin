const MonacoEditorWebpackPlugin = require("monaco-editor-webpack-plugin");
const CracoLessPlugin = require("craco-less");
const path = require("path");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {'@primary-color': 'rgb(241,129,39)'},
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  webpack: {
    plugins: {
      add: [
        new MonacoEditorWebpackPlugin({
          languages: ['json'],
          monacoEditorPath: path.resolve(__dirname, "./node_modules/monaco-editor/")
        }),
        //new BundleAnalyzerPlugin() для тестов размера сборки
      ]
    }
  }
}
