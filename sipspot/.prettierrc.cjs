module.exports = {
    printWidth: 120,
    useTabs: false,
    tabWidth: 4,
    trailingComma: "es5",
    semi: true,
    singleQuote: false,
    bracketSpacing: true,
    arrowParens: "always",
    jsxSingleQuote: false,
    bracketSameLine: false,
    endOfLine: "lf",
    overrides: [
        {
            files: ["*.js", "*.ts", "*.jsx", "*.tsx"],
            options: {
                parser: "typescript",
            },
        },
        {
            files: ["*.scss", "*.css"],
            options: {
                parser: "scss",
            },
        },
        {
            files: ["*.html"],
            options: {
                parser: "html",
            },
        },
    ],
};