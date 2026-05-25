
// Windows temporarily needs this file, https://github.com/module-federation/vite/issues/68

    import {loadShare} from "@module-federation/runtime";
    const importMap = {
      
        "@iobroker/adapter-react-v5": async () => {
          let pkg = await import("__mf__virtual/__mfe_internal__vis2WeatherHeatingWidgets__prebuild___mf_0_iobroker_mf_1_adapter_mf_2_react_mf_2_v5__prebuild__.js");
            return pkg;
        }
      ,
        "@iobroker/adapter-react-v5/i18n/de.json": async () => {
          let pkg = await import("__mf__virtual/__mfe_internal__vis2WeatherHeatingWidgets__prebuild___mf_0_iobroker_mf_1_adapter_mf_2_react_mf_2_v5_mf_1_i18n_mf_1_de_mf_3_json__prebuild__.json");
            return pkg;
        }
      ,
        "@iobroker/adapter-react-v5/i18n/en.json": async () => {
          let pkg = await import("__mf__virtual/__mfe_internal__vis2WeatherHeatingWidgets__prebuild___mf_0_iobroker_mf_1_adapter_mf_2_react_mf_2_v5_mf_1_i18n_mf_1_en_mf_3_json__prebuild__.json");
            return pkg;
        }
      ,
        "@iobroker/adapter-react-v5/i18n/es.json": async () => {
          let pkg = await import("__mf__virtual/__mfe_internal__vis2WeatherHeatingWidgets__prebuild___mf_0_iobroker_mf_1_adapter_mf_2_react_mf_2_v5_mf_1_i18n_mf_1_es_mf_3_json__prebuild__.json");
            return pkg;
        }
      ,
        "@iobroker/adapter-react-v5/i18n/fr.json": async () => {
          let pkg = await import("__mf__virtual/__mfe_internal__vis2WeatherHeatingWidgets__prebuild___mf_0_iobroker_mf_1_adapter_mf_2_react_mf_2_v5_mf_1_i18n_mf_1_fr_mf_3_json__prebuild__.json");
            return pkg;
        }
      ,
        "@iobroker/adapter-react-v5/i18n/it.json": async () => {
          let pkg = await import("__mf__virtual/__mfe_internal__vis2WeatherHeatingWidgets__prebuild___mf_0_iobroker_mf_1_adapter_mf_2_react_mf_2_v5_mf_1_i18n_mf_1_it_mf_3_json__prebuild__.json");
            return pkg;
        }
      ,
        "@iobroker/adapter-react-v5/i18n/nl.json": async () => {
          let pkg = await import("__mf__virtual/__mfe_internal__vis2WeatherHeatingWidgets__prebuild___mf_0_iobroker_mf_1_adapter_mf_2_react_mf_2_v5_mf_1_i18n_mf_1_nl_mf_3_json__prebuild__.json");
            return pkg;
        }
      ,
        "@iobroker/adapter-react-v5/i18n/pl.json": async () => {
          let pkg = await import("__mf__virtual/__mfe_internal__vis2WeatherHeatingWidgets__prebuild___mf_0_iobroker_mf_1_adapter_mf_2_react_mf_2_v5_mf_1_i18n_mf_1_pl_mf_3_json__prebuild__.json");
            return pkg;
        }
      ,
        "@iobroker/adapter-react-v5/i18n/pt.json": async () => {
          let pkg = await import("__mf__virtual/__mfe_internal__vis2WeatherHeatingWidgets__prebuild___mf_0_iobroker_mf_1_adapter_mf_2_react_mf_2_v5_mf_1_i18n_mf_1_pt_mf_3_json__prebuild__.json");
            return pkg;
        }
      ,
        "@iobroker/adapter-react-v5/i18n/ru.json": async () => {
          let pkg = await import("__mf__virtual/__mfe_internal__vis2WeatherHeatingWidgets__prebuild___mf_0_iobroker_mf_1_adapter_mf_2_react_mf_2_v5_mf_1_i18n_mf_1_ru_mf_3_json__prebuild__.json");
            return pkg;
        }
      ,
        "@iobroker/adapter-react-v5/i18n/uk.json": async () => {
          let pkg = await import("__mf__virtual/__mfe_internal__vis2WeatherHeatingWidgets__prebuild___mf_0_iobroker_mf_1_adapter_mf_2_react_mf_2_v5_mf_1_i18n_mf_1_uk_mf_3_json__prebuild__.json");
            return pkg;
        }
      ,
        "@iobroker/adapter-react-v5/i18n/zh-cn.json": async () => {
          let pkg = await import("__mf__virtual/__mfe_internal__vis2WeatherHeatingWidgets__prebuild___mf_0_iobroker_mf_1_adapter_mf_2_react_mf_2_v5_mf_1_i18n_mf_1_zh_mf_2_cn_mf_3_json__prebuild__.json");
            return pkg;
        }
      ,
        "@mui/icons-material": async () => {
          let pkg = await import("__mf__virtual/__mfe_internal__vis2WeatherHeatingWidgets__prebuild___mf_0_mui_mf_1_icons_mf_2_material__prebuild__.js");
            return pkg;
        }
      ,
        "@mui/material": async () => {
          let pkg = await import("__mf__virtual/__mfe_internal__vis2WeatherHeatingWidgets__prebuild___mf_0_mui_mf_1_material__prebuild__.js");
            return pkg;
        }
      ,
        "@mui/styles": async () => {
          let pkg = await import("__mf__virtual/__mfe_internal__vis2WeatherHeatingWidgets__prebuild___mf_0_mui_mf_1_styles__prebuild__.js");
            return pkg;
        }
      ,
        "@mui/system": async () => {
          let pkg = await import("__mf__virtual/__mfe_internal__vis2WeatherHeatingWidgets__prebuild___mf_0_mui_mf_1_system__prebuild__.js");
            return pkg;
        }
      ,
        "@mui/x-date-pickers": async () => {
          let pkg = await import("__mf__virtual/__mfe_internal__vis2WeatherHeatingWidgets__prebuild___mf_0_mui_mf_1_x_mf_2_date_mf_2_pickers__prebuild__.js");
            return pkg;
        }
      ,
        "prop-types": async () => {
          let pkg = await import("__mf__virtual/__mfe_internal__vis2WeatherHeatingWidgets__prebuild__prop_mf_2_types__prebuild__.js");
            return pkg;
        }
      ,
        "react": async () => {
          let pkg = await import("__mf__virtual/__mfe_internal__vis2WeatherHeatingWidgets__prebuild__react__prebuild__.js");
            return pkg;
        }
      ,
        "react-dom": async () => {
          let pkg = await import("__mf__virtual/__mfe_internal__vis2WeatherHeatingWidgets__prebuild__react_mf_2_dom__prebuild__.js");
            return pkg;
        }
      ,
        "react-dom/client": async () => {
          let pkg = await import("__mf__virtual/__mfe_internal__vis2WeatherHeatingWidgets__prebuild__react_mf_2_dom_mf_1_client__prebuild__.js");
            return pkg;
        }
      
    }
      const usedShared = {
      
          "@iobroker/adapter-react-v5": {
            name: "@iobroker/adapter-react-v5",
            version: "8.2.2",
            scope: ["default"],
            loaded: false,
            from: "__mfe_internal__vis2WeatherHeatingWidgets",
            async get () {
              if (false) {
                throw new Error(`[Module Federation] Shared module '${"@iobroker/adapter-react-v5"}' must be provided by host`);
              }
              usedShared["@iobroker/adapter-react-v5"].loaded = true
              const {"@iobroker/adapter-react-v5": pkgDynamicImport} = importMap
              const res = await pkgDynamicImport()
              const exportModule = false && "@iobroker/adapter-react-v5" === "react"
                ? (res?.default ?? res)
                : {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "*",
              
            }
          }
        ,
          "@iobroker/adapter-react-v5/i18n/de.json": {
            name: "@iobroker/adapter-react-v5/i18n/de.json",
            version: "8.2.2",
            scope: ["default"],
            loaded: false,
            from: "__mfe_internal__vis2WeatherHeatingWidgets",
            async get () {
              if (false) {
                throw new Error(`[Module Federation] Shared module '${"@iobroker/adapter-react-v5/i18n/de.json"}' must be provided by host`);
              }
              usedShared["@iobroker/adapter-react-v5/i18n/de.json"].loaded = true
              const {"@iobroker/adapter-react-v5/i18n/de.json": pkgDynamicImport} = importMap
              const res = await pkgDynamicImport()
              const exportModule = false && "@iobroker/adapter-react-v5/i18n/de.json" === "react"
                ? (res?.default ?? res)
                : {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "*",
              
            }
          }
        ,
          "@iobroker/adapter-react-v5/i18n/en.json": {
            name: "@iobroker/adapter-react-v5/i18n/en.json",
            version: "8.2.2",
            scope: ["default"],
            loaded: false,
            from: "__mfe_internal__vis2WeatherHeatingWidgets",
            async get () {
              if (false) {
                throw new Error(`[Module Federation] Shared module '${"@iobroker/adapter-react-v5/i18n/en.json"}' must be provided by host`);
              }
              usedShared["@iobroker/adapter-react-v5/i18n/en.json"].loaded = true
              const {"@iobroker/adapter-react-v5/i18n/en.json": pkgDynamicImport} = importMap
              const res = await pkgDynamicImport()
              const exportModule = false && "@iobroker/adapter-react-v5/i18n/en.json" === "react"
                ? (res?.default ?? res)
                : {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "*",
              
            }
          }
        ,
          "@iobroker/adapter-react-v5/i18n/es.json": {
            name: "@iobroker/adapter-react-v5/i18n/es.json",
            version: "8.2.2",
            scope: ["default"],
            loaded: false,
            from: "__mfe_internal__vis2WeatherHeatingWidgets",
            async get () {
              if (false) {
                throw new Error(`[Module Federation] Shared module '${"@iobroker/adapter-react-v5/i18n/es.json"}' must be provided by host`);
              }
              usedShared["@iobroker/adapter-react-v5/i18n/es.json"].loaded = true
              const {"@iobroker/adapter-react-v5/i18n/es.json": pkgDynamicImport} = importMap
              const res = await pkgDynamicImport()
              const exportModule = false && "@iobroker/adapter-react-v5/i18n/es.json" === "react"
                ? (res?.default ?? res)
                : {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "*",
              
            }
          }
        ,
          "@iobroker/adapter-react-v5/i18n/fr.json": {
            name: "@iobroker/adapter-react-v5/i18n/fr.json",
            version: "8.2.2",
            scope: ["default"],
            loaded: false,
            from: "__mfe_internal__vis2WeatherHeatingWidgets",
            async get () {
              if (false) {
                throw new Error(`[Module Federation] Shared module '${"@iobroker/adapter-react-v5/i18n/fr.json"}' must be provided by host`);
              }
              usedShared["@iobroker/adapter-react-v5/i18n/fr.json"].loaded = true
              const {"@iobroker/adapter-react-v5/i18n/fr.json": pkgDynamicImport} = importMap
              const res = await pkgDynamicImport()
              const exportModule = false && "@iobroker/adapter-react-v5/i18n/fr.json" === "react"
                ? (res?.default ?? res)
                : {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "*",
              
            }
          }
        ,
          "@iobroker/adapter-react-v5/i18n/it.json": {
            name: "@iobroker/adapter-react-v5/i18n/it.json",
            version: "8.2.2",
            scope: ["default"],
            loaded: false,
            from: "__mfe_internal__vis2WeatherHeatingWidgets",
            async get () {
              if (false) {
                throw new Error(`[Module Federation] Shared module '${"@iobroker/adapter-react-v5/i18n/it.json"}' must be provided by host`);
              }
              usedShared["@iobroker/adapter-react-v5/i18n/it.json"].loaded = true
              const {"@iobroker/adapter-react-v5/i18n/it.json": pkgDynamicImport} = importMap
              const res = await pkgDynamicImport()
              const exportModule = false && "@iobroker/adapter-react-v5/i18n/it.json" === "react"
                ? (res?.default ?? res)
                : {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "*",
              
            }
          }
        ,
          "@iobroker/adapter-react-v5/i18n/nl.json": {
            name: "@iobroker/adapter-react-v5/i18n/nl.json",
            version: "8.2.2",
            scope: ["default"],
            loaded: false,
            from: "__mfe_internal__vis2WeatherHeatingWidgets",
            async get () {
              if (false) {
                throw new Error(`[Module Federation] Shared module '${"@iobroker/adapter-react-v5/i18n/nl.json"}' must be provided by host`);
              }
              usedShared["@iobroker/adapter-react-v5/i18n/nl.json"].loaded = true
              const {"@iobroker/adapter-react-v5/i18n/nl.json": pkgDynamicImport} = importMap
              const res = await pkgDynamicImport()
              const exportModule = false && "@iobroker/adapter-react-v5/i18n/nl.json" === "react"
                ? (res?.default ?? res)
                : {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "*",
              
            }
          }
        ,
          "@iobroker/adapter-react-v5/i18n/pl.json": {
            name: "@iobroker/adapter-react-v5/i18n/pl.json",
            version: "8.2.2",
            scope: ["default"],
            loaded: false,
            from: "__mfe_internal__vis2WeatherHeatingWidgets",
            async get () {
              if (false) {
                throw new Error(`[Module Federation] Shared module '${"@iobroker/adapter-react-v5/i18n/pl.json"}' must be provided by host`);
              }
              usedShared["@iobroker/adapter-react-v5/i18n/pl.json"].loaded = true
              const {"@iobroker/adapter-react-v5/i18n/pl.json": pkgDynamicImport} = importMap
              const res = await pkgDynamicImport()
              const exportModule = false && "@iobroker/adapter-react-v5/i18n/pl.json" === "react"
                ? (res?.default ?? res)
                : {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "*",
              
            }
          }
        ,
          "@iobroker/adapter-react-v5/i18n/pt.json": {
            name: "@iobroker/adapter-react-v5/i18n/pt.json",
            version: "8.2.2",
            scope: ["default"],
            loaded: false,
            from: "__mfe_internal__vis2WeatherHeatingWidgets",
            async get () {
              if (false) {
                throw new Error(`[Module Federation] Shared module '${"@iobroker/adapter-react-v5/i18n/pt.json"}' must be provided by host`);
              }
              usedShared["@iobroker/adapter-react-v5/i18n/pt.json"].loaded = true
              const {"@iobroker/adapter-react-v5/i18n/pt.json": pkgDynamicImport} = importMap
              const res = await pkgDynamicImport()
              const exportModule = false && "@iobroker/adapter-react-v5/i18n/pt.json" === "react"
                ? (res?.default ?? res)
                : {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "*",
              
            }
          }
        ,
          "@iobroker/adapter-react-v5/i18n/ru.json": {
            name: "@iobroker/adapter-react-v5/i18n/ru.json",
            version: "8.2.2",
            scope: ["default"],
            loaded: false,
            from: "__mfe_internal__vis2WeatherHeatingWidgets",
            async get () {
              if (false) {
                throw new Error(`[Module Federation] Shared module '${"@iobroker/adapter-react-v5/i18n/ru.json"}' must be provided by host`);
              }
              usedShared["@iobroker/adapter-react-v5/i18n/ru.json"].loaded = true
              const {"@iobroker/adapter-react-v5/i18n/ru.json": pkgDynamicImport} = importMap
              const res = await pkgDynamicImport()
              const exportModule = false && "@iobroker/adapter-react-v5/i18n/ru.json" === "react"
                ? (res?.default ?? res)
                : {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "*",
              
            }
          }
        ,
          "@iobroker/adapter-react-v5/i18n/uk.json": {
            name: "@iobroker/adapter-react-v5/i18n/uk.json",
            version: "8.2.2",
            scope: ["default"],
            loaded: false,
            from: "__mfe_internal__vis2WeatherHeatingWidgets",
            async get () {
              if (false) {
                throw new Error(`[Module Federation] Shared module '${"@iobroker/adapter-react-v5/i18n/uk.json"}' must be provided by host`);
              }
              usedShared["@iobroker/adapter-react-v5/i18n/uk.json"].loaded = true
              const {"@iobroker/adapter-react-v5/i18n/uk.json": pkgDynamicImport} = importMap
              const res = await pkgDynamicImport()
              const exportModule = false && "@iobroker/adapter-react-v5/i18n/uk.json" === "react"
                ? (res?.default ?? res)
                : {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "*",
              
            }
          }
        ,
          "@iobroker/adapter-react-v5/i18n/zh-cn.json": {
            name: "@iobroker/adapter-react-v5/i18n/zh-cn.json",
            version: "8.2.2",
            scope: ["default"],
            loaded: false,
            from: "__mfe_internal__vis2WeatherHeatingWidgets",
            async get () {
              if (false) {
                throw new Error(`[Module Federation] Shared module '${"@iobroker/adapter-react-v5/i18n/zh-cn.json"}' must be provided by host`);
              }
              usedShared["@iobroker/adapter-react-v5/i18n/zh-cn.json"].loaded = true
              const {"@iobroker/adapter-react-v5/i18n/zh-cn.json": pkgDynamicImport} = importMap
              const res = await pkgDynamicImport()
              const exportModule = false && "@iobroker/adapter-react-v5/i18n/zh-cn.json" === "react"
                ? (res?.default ?? res)
                : {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "*",
              
            }
          }
        ,
          "@mui/icons-material": {
            name: "@mui/icons-material",
            version: "6.5.0",
            scope: ["default"],
            loaded: false,
            from: "__mfe_internal__vis2WeatherHeatingWidgets",
            async get () {
              if (false) {
                throw new Error(`[Module Federation] Shared module '${"@mui/icons-material"}' must be provided by host`);
              }
              usedShared["@mui/icons-material"].loaded = true
              const {"@mui/icons-material": pkgDynamicImport} = importMap
              const res = await pkgDynamicImport()
              const exportModule = false && "@mui/icons-material" === "react"
                ? (res?.default ?? res)
                : {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "*",
              
            }
          }
        ,
          "@mui/material": {
            name: "@mui/material",
            version: "6.5.0",
            scope: ["default"],
            loaded: false,
            from: "__mfe_internal__vis2WeatherHeatingWidgets",
            async get () {
              if (false) {
                throw new Error(`[Module Federation] Shared module '${"@mui/material"}' must be provided by host`);
              }
              usedShared["@mui/material"].loaded = true
              const {"@mui/material": pkgDynamicImport} = importMap
              const res = await pkgDynamicImport()
              const exportModule = false && "@mui/material" === "react"
                ? (res?.default ?? res)
                : {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "*",
              
            }
          }
        ,
          "@mui/styles": {
            name: "@mui/styles",
            version: "6.5.0",
            scope: ["default"],
            loaded: false,
            from: "__mfe_internal__vis2WeatherHeatingWidgets",
            async get () {
              if (false) {
                throw new Error(`[Module Federation] Shared module '${"@mui/styles"}' must be provided by host`);
              }
              usedShared["@mui/styles"].loaded = true
              const {"@mui/styles": pkgDynamicImport} = importMap
              const res = await pkgDynamicImport()
              const exportModule = false && "@mui/styles" === "react"
                ? (res?.default ?? res)
                : {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "*",
              
            }
          }
        ,
          "@mui/system": {
            name: "@mui/system",
            version: "6.5.0",
            scope: ["default"],
            loaded: false,
            from: "__mfe_internal__vis2WeatherHeatingWidgets",
            async get () {
              if (false) {
                throw new Error(`[Module Federation] Shared module '${"@mui/system"}' must be provided by host`);
              }
              usedShared["@mui/system"].loaded = true
              const {"@mui/system": pkgDynamicImport} = importMap
              const res = await pkgDynamicImport()
              const exportModule = false && "@mui/system" === "react"
                ? (res?.default ?? res)
                : {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "*",
              
            }
          }
        ,
          "@mui/x-date-pickers": {
            name: "@mui/x-date-pickers",
            version: "8.28.7",
            scope: ["default"],
            loaded: false,
            from: "__mfe_internal__vis2WeatherHeatingWidgets",
            async get () {
              if (false) {
                throw new Error(`[Module Federation] Shared module '${"@mui/x-date-pickers"}' must be provided by host`);
              }
              usedShared["@mui/x-date-pickers"].loaded = true
              const {"@mui/x-date-pickers": pkgDynamicImport} = importMap
              const res = await pkgDynamicImport()
              const exportModule = false && "@mui/x-date-pickers" === "react"
                ? (res?.default ?? res)
                : {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "*",
              
            }
          }
        ,
          "prop-types": {
            name: "prop-types",
            version: "15.8.1",
            scope: ["default"],
            loaded: false,
            from: "__mfe_internal__vis2WeatherHeatingWidgets",
            async get () {
              if (false) {
                throw new Error(`[Module Federation] Shared module '${"prop-types"}' must be provided by host`);
              }
              usedShared["prop-types"].loaded = true
              const {"prop-types": pkgDynamicImport} = importMap
              const res = await pkgDynamicImport()
              const exportModule = false && "prop-types" === "react"
                ? (res?.default ?? res)
                : {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "*",
              
            }
          }
        ,
          "react": {
            name: "react",
            version: "18.3.1",
            scope: ["default"],
            loaded: false,
            from: "__mfe_internal__vis2WeatherHeatingWidgets",
            async get () {
              if (false) {
                throw new Error(`[Module Federation] Shared module '${"react"}' must be provided by host`);
              }
              usedShared["react"].loaded = true
              const {"react": pkgDynamicImport} = importMap
              const res = await pkgDynamicImport()
              const exportModule = false && "react" === "react"
                ? (res?.default ?? res)
                : {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "*",
              
            }
          }
        ,
          "react-dom": {
            name: "react-dom",
            version: "18.3.1",
            scope: ["default"],
            loaded: false,
            from: "__mfe_internal__vis2WeatherHeatingWidgets",
            async get () {
              if (false) {
                throw new Error(`[Module Federation] Shared module '${"react-dom"}' must be provided by host`);
              }
              usedShared["react-dom"].loaded = true
              const {"react-dom": pkgDynamicImport} = importMap
              const res = await pkgDynamicImport()
              const exportModule = false && "react-dom" === "react"
                ? (res?.default ?? res)
                : {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "*",
              
            }
          }
        ,
          "react-dom/client": {
            name: "react-dom/client",
            version: "18.3.1",
            scope: ["default"],
            loaded: false,
            from: "__mfe_internal__vis2WeatherHeatingWidgets",
            async get () {
              if (false) {
                throw new Error(`[Module Federation] Shared module '${"react-dom/client"}' must be provided by host`);
              }
              usedShared["react-dom/client"].loaded = true
              const {"react-dom/client": pkgDynamicImport} = importMap
              const res = await pkgDynamicImport()
              const exportModule = false && "react-dom/client" === "react"
                ? (res?.default ?? res)
                : {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "*",
              
            }
          }
        
    }
      const usedRemotes = [
      ]
      export {
        usedShared,
        usedRemotes
      }
      