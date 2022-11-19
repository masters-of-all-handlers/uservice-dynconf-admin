const MonacoEditorWebpackPlugin = require("monaco-editor-webpack-plugin")
const path = require("path");

module.exports = {
  webpack: {
    plugins: {
      add: [new MonacoEditorWebpackPlugin({
        monacoEditorPath: path.resolve(__dirname, "./node_modules/monaco-editor/")
      })
      ]
    }
  }
}
