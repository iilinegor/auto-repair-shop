var webpack = require('webpack');

module.exports = {
	entry: "./src/main.js",
	output: {
		path: __dirname + "/public/build",
		publicPath: "build/",
		filename: "bundle.js"
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: "babel",
				exclude: [/node_modules/, /public/],
				query:
				      {	
				        presets:['es2015','react']
				      }
			},

			{
				test: /\.jsx$/,
				loader: "babel",
				exclude: [/node_modules/, /public/],
				query:
				      {
				        presets:['es2015','react']
				      }
			},

			{
				test: /\.css$/,
				loader: "style-loader!css-loader!autoprefixer-loader",
				exclude: [/node_modules/, /public/]
			},

            {
                test: /\.styl$/,
                loader: "style-loader!css-loader!autoprefixer-loader!stylus	-loader",
                exclude: [/node_modules/, /public/]
            },

			{
				test: /\.gif$/,
				loader: "url-loader&limit=10000&mimetype=image/gif"
			},

			{
				test: /\.jpg$/,
				loader: "url-loader&limit=10000&mimetype=image/jpg"
			},

			{
				test: /\.png$/,
				loader: "url-loader&limit=10000&mimetype=image/png"
			},

			{
				test: /\.(png|woff|woff2|eot|ttf|svg)$/,
				loader: 'url-loader?limit=100000'
			},

			{
				test: /\.json$/,
				loader: "json-loader"
			}
		]
	}
}