// @ts-expect-error no types
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';
import { moduleFederationShared } from '@iobroker/types-vis-2/modulefederation.vis.config';
import { readFileSync } from 'node:fs';
import topLevelAwait from 'vite-plugin-top-level-await';


// The shared modules come from @iobroker/types-vis-2, so they stay in sync with what the vis-2 host provides:
// react, react-dom, the JSX runtime, @emotion/react, @mui/private-theming and @iobroker/gui-components (with
// its i18n files) as singletons, @mui/material, @mui/system and @mui/icons-material versioned by the range in
// package.json. Passing package.json filters the list down to the packages this widget set really depends on.
const pack = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'));


const config = {
    plugins: [
        federation({
            manifest: true,
            name: "vis2WeatherHeatingWidgets",
            filename: "customWidgets.js",
            exposes: {

                

                "./GeneralEChartWidget": "./src/GeneralEChartWidget",

                "./WeatherWidget": "./src/WeatherWidget", // List of all widgets in this package
                "./WeatherDayWidget": "./src/WeatherDayWidget",
                "./WeatherMeteoredWidget": "./src/WeatherMeteoredWidget",

                "./HeatingTimeScheduleWidget": "./src/HeatingTimeScheduleWidget",
                "./HeatingGeneralParamsWidget": "./src/HeatingGeneralParamsWidget",
                "./HeatingRoomWidget": "./src/HeatingRoomWidget",
                "./HeatingRoomsOverviewWidget": "./src/HeatingRoomsOverviewWidget",
                "./HeatingRomProfileParamsWidget": "./src/HeatingRoomProfileParamsWidget",
                "./HeatingWindowStatusOverviewWidget": "./src/HeatingWindowStatusOverviewWidget",

                "./SourceAnalytics2WeeksBarGraphWidget": "./src/SourceAnalytics2WeeksBarGraphWidget",

                "./InformMyLandlordWidget": "./src/InformMyLandlordWidget",

                "./translations": "./src/translations.js",
            },
            remotes: {},
            shared: moduleFederationShared(pack),
            dts: false,
        }),
        topLevelAwait({
            // The export name of top-level awaits promise for each chunk module
            promiseExportName: '__tla',
            // The function to generate import names of top-level awaits promise in each chunk module
            promiseImportName: (i: number): string => `__tla_${i}`,
        }),
        react()
    ],
    server: {
        port: 3000,
        proxy: {
            '/_socket': 'http://localhost:8082',
            '/vis.0': 'http://localhost:8082',
            '/adapter': 'http://localhost:8082',
            '/habpanel': 'http://localhost:8082',
            '/vis': 'http://localhost:8082',
            '/widgets': 'http://localhost:8082/vis',
            '/widgets.html': 'http://localhost:8082/vis',
            '/web': 'http://localhost:8082',
            '/state': 'http://localhost:8082',
        },
    },
    base: './',
    resolve: {
        tsconfigPaths: true,
        dedupe: [
            'react',
            'react-dom',
            'prop-types',
            '@mui/material',
            '@mui/system',
            '@mui/styles',
            '@mui/icons-material',
            '@mui/x-date-pickers',
            '@iobroker/adapter-react-v5',
        ],
    },
    build: {
        target: 'chrome81',
        outDir: './build',
        rollupOptions: {
            onwarn(warning: { code: string }, warn: (warning: { code: string }) => void): void {
                // Suppress "Module level directives cause errors when bundled" warnings
                if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
                    return;
                }
                warn(warning);
            },
        },
    },
};

export default config;
