const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

// Eslint
module.exports = {
  mode: 'development',
  entry: [
    './src/scripts/index.js',
    './src/styles/main.scss'
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/assets')
  },
  module: {
    rules: [
      // Babel
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // Url loader: Base64 image
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader'
          },
        ],
      },
      {
				test: /\.scss$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'kmacoders-style.css',
						}
					},
					{
						loader: 'extract-loader'
					},
					{
            loader: 'css-loader?-url',
            options: { sourceMap: true }
					},
					{
            loader: 'sass-loader',
            options: { sourceMap: true }
					}
				]
			}
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  watch: true,
  resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.json']
  }
}
