const { deleteFoldersRecursive, buildReact, npmInstall, copyFiles } = require('@iobroker/build-tools');


function copyAllFiles() {
    copyFiles(
        [
            'src-widgets/build/**/*',
            '!src-widgets/build/static/js/*node_modules*.*',
            '!src-widgets/build/static/js/node_modules_*',
        ],
        'widgets/vis-2-widgets-material/',
    );
    copyFiles(
        [
            `src-widgets/build/static/js/*echarts-for-react_lib_core*.*`,
            `src-widgets/build/static/js/*spectrum_color_dist_import_mjs*.*`,
            `src-widgets/build/static/js/*uiw_react-color-shade-slider*.*`,
            `src-widgets/build/static/js/*lottie-react_build*.*`,
            `src-widgets/build/static/js/*runtime_js-src_sketch_css*.*`,
            `src-widgets/build/static/js/*node_modules_babel_runtime_helpers_createForOfItera*.*`,
        ],
        'widgets/vis-2-widgets-material/static/js',
    );
}

if (process.argv.includes('--copy-files')) {
    copyAllFiles();
} else if (process.argv.includes('--build')) {
    buildReact(`${__dirname}/src-widgets`, { rootDir: __dirname, vite: true }).catch(() =>
        console.error('Error by build'),
    );
} else {
    deleteFoldersRecursive('src-widgets/build');
    deleteFoldersRecursive('widgets');
    npmInstall('src-widgets')
        .then(() => buildReact(`${__dirname}/src-widgets`, { rootDir: __dirname, vite: true }))
        .then(() => copyAllFiles());
}
