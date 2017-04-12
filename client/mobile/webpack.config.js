const ConsoleNotifierPlugin = function () {}

ConsoleNotifierPlugin.prototype.compilationDone = (stats) => {
  const log = (error) => {
    console.log(error.error && error.error.toString())
    error.module.fileDependencies.map(d => console.log(d))
  }
  stats.compilation.errors.forEach(log)
}

ConsoleNotifierPlugin.prototype.apply = function (compiler) {
  compiler.plugin('done', this.compilationDone.bind(this))
}

const config = {
    entry: [
        __dirname + '/src/entry.js'
    ],
    output: {
        path: __dirname + '/../../server/emcit/static',
        filename: 'mobile.js'
    },
	module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: __dirname + '/../node_modules/babel-loader',
                query: {
                    presets: ['react', 'latest'],
                    plugins: ['transform-class-properties']
                }
            },
            {
                test: /\.css$/,
                loader: __dirname + '/../node_modules/style-loader!'+ __dirname + '/../node_modules/css-loader?localIdentName=[path][name]---[local]---[hash:base64:5]&modules!postcss'
            },
            { test: /\.(png|jpg|jpeg)$/, loader: __dirname + '/../node_modules/file-loader' },
            { test: /\.(woff|woff2|eot|ttf|svg)$/, loader: __dirname + '/../node_modules/url-loader?limit=100000' },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: __dirname + "/../node_modules/url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: __dirname + "/../node_modules/url-loader" }
        ]
    },
    postcss: require('./../postcss.config.js'),
    resolve: {
        alias: {
            common: __dirname + '/../common',
            common_form: __dirname + '/../common/components/form',
            common_views: __dirname + '/../common/components/views',
            c: __dirname + '/src/components',
            reducers: __dirname + '/src/reducers',
            actions: __dirname + '/src/actions',
            api: __dirname + '/src/api',
            form: __dirname + '/src/components/form'
        },
        extensions: ['', '.js', '.jsx', '.css'],
        modulesDirectories: [
          'node_modules'
        ]
    },
    stats: {
        errors: false
    },
    plugins: [new ConsoleNotifierPlugin()]
};

module.exports = config;
