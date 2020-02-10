module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 8,
                },
                corejs: 3,
                loose: true,
                useBuiltIns: 'usage',
                shippedProposals: true,
            },
        ],
    ],
}
