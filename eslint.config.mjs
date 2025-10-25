import config from "@iobroker/eslint-config";

// disable temporary the rule 'jsdoc/require-param' and enable 'jsdoc/require-jsdoc'
config.forEach(rule => {
    if (rule?.plugins?.jsdoc) {
        rule.rules["jsdoc/require-jsdoc"] = "off";
        rule.rules["jsdoc/require-param"] = "off";
    }
});

export default [
    ...config,
    {
        files: ["**/*.js"],
        rules: {
            "@typescript-eslint/no-require-imports": "off",
        },
    },
    {
        // disable temporary the rule 'jsdoc/require-param' and enable 'jsdoc/require-jsdoc'
        rules: {

            "prettier/prettier": "off",
            "no-else-return": "off",
            "jsdoc/require-jsdoc": "off",
            "jsdoc/require-returns-description": "off",
            "jsdoc/require-param-description": "off",
            "jsdoc/require-param": "off",
            "no-constant-binary-expression": "off",
            "valid-typeof": "off"


            //"prettier/prettier": "off",
            //"jsdoc/require-jsdoc": "off",
            //"jsdoc/require-param": "off",
            //"prettier/prettier": [
            //    "error",
            //    {
            //        endOfLine: "auto",
            //    },
            //],
        },
    },
    {
        ignores: [
            "src-widgets/.__mf__temp/**/*",
            "src-widgets/build/**/*",
            "src-widgets/node_modules/**/*",
            "widgets/**/*",
            "test/**/*",
            "node_modules/**/*",
            "obj/**/*",
            "tmp/**/*",
        ],
    },
];











