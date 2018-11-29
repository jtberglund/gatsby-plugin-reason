module.exports = {
    presets: [
        ['@babel/env', {
            targets: {
                node: 8,
            },
            loose: true,
            useBuiltIns: 'usage',
            shippedProposals: true,
        }],
    ],
}
