/*!
 * ioBroker gulpfile
 * Date: 2023-03-22
 */
'use strict';

const gulp = require('gulp');
const fs = require('fs');
const adapterName = require('./package.json').name.replace('iobroker.', '');
const gulpHelper = require('@iobroker/vis-2-widgets-react-dev/gulpHelper');

const SRC = 'src-widgets/';
const src = `${__dirname}/${SRC}`;

gulp.task('widget-0-clean', done => {
    gulpHelper.deleteFoldersRecursive(`${src}build`);
    gulpHelper.deleteFoldersRecursive(`${__dirname}/widgets`);
    done();
});
gulp.task('widget-1-npm', async () => gulpHelper.npmInstall(src));

gulp.task('widget-2-compile', async () => gulpHelper.buildWidgets(__dirname, src));

gulp.task('widget-3-copy', () => Promise.all([
    gulp.src([`${SRC}build/*.js`]).pipe(gulp.dest(`widgets/${adapterName}`)),
    gulp.src([`${SRC}build/img/*`]).pipe(gulp.dest(`widgets/${adapterName}/img`)),
    //gulp.src([`${SRC}build/img/icons/*`]).pipe(gulp.dest(`widgets/${adapterName}/img/icons`)),
    //gulp.src([`${SRC}build/img/icons/viento-wind/*`]).pipe(gulp.dest(`widgets/${adapterName}/img/icons/viento-wind`)),
    //gulp.src([`${SRC}build/img/icons/viento-wind/Beaufort-White/*`]).pipe(gulp.dest(`widgets/${adapterName}/img/icons/viento-wind/Beaufort-White`)),
    //gulp.src([`${SRC}build/img/icons/viento-wind/galeria1/*`]).pipe(gulp.dest(`widgets/${adapterName}/img/icons/viento-wind/galeria1`)),
    //gulp.src([`${SRC}build/img/icons/viento-wind/galeria2-Beaufort/*`]).pipe(gulp.dest(`widgets/${adapterName}/img/icons/viento-wind/galeria2-Beaufort`)),

    //gulp.src([`${SRC}build/img/icons/tiempo-weather/*`]).pipe(gulp.dest(`widgets/${adapterName}/img/icons/tiempo-weather`)),
    //gulp.src([`${SRC}build/img/icons/tiempo-weather/galeria1/*`]).pipe(gulp.dest(`widgets/${adapterName}/img/icons/tiempo-weather/galeria1`)),
    //gulp.src([`${SRC}build/img/icons/tiempo-weather/galeria2/*`]).pipe(gulp.dest(`widgets/${adapterName}/img/icons/tiempo-weather/galeria2`)),
    //gulp.src([`${SRC}build/img/icons/tiempo-weather/galeria3/*`]).pipe(gulp.dest(`widgets/${adapterName}/img/icons/tiempo-weather/galeria3`)),
    //gulp.src([`${SRC}build/img/icons/tiempo-weather/galeria4/*`]).pipe(gulp.dest(`widgets/${adapterName}/img/icons/tiempo-weather/galeria4`)),
    //gulp.src([`${SRC}build/img/icons/tiempo-weather/galeria5/*`]).pipe(gulp.dest(`widgets/${adapterName}/img/icons/tiempo-weather/galeria5`)),
    //gulp.src([`${SRC}build/img/icons/tiempo-weather/galeria6/*`]).pipe(gulp.dest(`widgets/${adapterName}/img/icons/tiempo-weather/galeria6`)),

    //gulp.src([`${SRC}build/img/icons/luna-moon/*`]).pipe(gulp.dest(`widgets/${adapterName}/img/icons/luna-moon`)),
    gulp.src([`${SRC}build/*.map`]).pipe(gulp.dest(`widgets/${adapterName}`)),
    gulp.src([
        `${SRC}build/static/**/*`,
        ...gulpHelper.ignoreFiles(SRC),
    ]).pipe(gulp.dest(`widgets/${adapterName}/static`)),
    gulp.src([
        ...gulpHelper.copyFiles(SRC),
    ]).pipe(gulp.dest(`widgets/${adapterName}/static/js`)),

    gulp.src([
        ...gulpHelper.copyFiles(SRC),
        `${src}build/static/js/*node_modules_echarts-for-react_esm_index_js.*.*`,
        `${src}build/static/js/*echarts-for-react_esm_index_js-node_modules_babel_runtime_helpers_esm*.*.*`,
        `${src}build/static/js/*echarts-for-react_esm_index_js-node_modules_react*.*.*`,
        `${src}build/static/js/*iobroker_vis-2-widgets-react-dev_index*.*.*`,

    ]).pipe(gulp.dest(`widgets/${adapterName}/static/js`)),

    gulp.src([
        ...gulpHelper.copyFiles(SRC),
        ...[
            `${SRC}build/static/js/*mui_icons*.*`,
            `${SRC}build/static/js/*mui_material_FormControl*.*`,
            `${SRC}build/static/js/*mui_material_Avatar*.*`,
            `${SRC}build/static/js/*mui_material_styles_styled*.*`,
            `${SRC}build/static/js/*mui_material_Grid_Grid*.*`,
            `${src}build/static/js/*mui_material_TableBody*.*.*`,
            `${src}build/static/js/*mui_material_ButtonBase*.*.*`,
            `${src}build/static/js/*mui_material_Paper*.*.*`,
            `${src}build/static/js/*mui_material_Box*.*.*`,
            `${src}build/static/js/*mui_material_colors_blue*.*.*`,

            `${src}build/static/js/*mui_material_utils*.*.*`,
            `${SRC}build/static/js/*mui_material_utils_createSvgIcon*.*.*`,

            `${src}build/static/js/*mui_utils_useControlled*.*.*`,

            `${SRC}build/static/js/*mui_styled-engine_index_js-node_modules_mui_system_esm*.*`

        ],
        ...[`!${SRC}build/static/js/*.map`, `!${SRC}build/static/js/*.txt`],
    ]).pipe(gulp.dest(`widgets/${adapterName}/static/js`)),

    gulp.src([`${SRC}src/i18n/*.json`]).pipe(gulp.dest(`widgets/${adapterName}/i18n`)),
    new Promise(resolve =>
        setTimeout(() => {
            if (fs.existsSync(`widgets/${adapterName}/static/media`) &&
                !fs.readdirSync(`widgets/${adapterName}/static/media`).length
            ) {
                fs.rmdirSync(`widgets/${adapterName}/static/media`)
            }
            resolve();
        }, 500)
    )
]));

gulp.task('widget-build', gulp.series(['widget-0-clean', 'widget-1-npm', 'widget-2-compile', 'widget-3-copy']));

gulp.task('default', gulp.series('widget-build'));
