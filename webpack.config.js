const path = require('path')

// Eslint
module.exports = {
  mode: 'development',
  entry: [
    './src/scripts/index.js'
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
  watch: true,
  resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.json']
  }
}


