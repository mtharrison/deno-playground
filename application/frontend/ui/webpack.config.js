module.exports = {
    entry: "./src/main.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/static/js"
    },

    devtool: "source-map",

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },

    externals: {
        'react': 'React',
        'redux': 'Redux',
        'react-dom': 'ReactDOM',
        'react-redux': 'ReactRedux',
        'redux-thunk': 'ReduxThunk',
        'ace-builds': 'ace'
    }
};
